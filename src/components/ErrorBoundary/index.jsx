import React from 'react';
import { Typography } from '@/components';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred';
  let errorDetails = '';
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    errorDetails = error.data?.message || '';
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack;
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-90 flex p-4">
      <div className="bg-[#191919] text-tbase rounded-xl p-8  w-full shadow-lg">
        <div className="flex flex-col space-y-4 text-tbase w-fit">
          <BiError className="w-20 h-20 text-red-500" />
          
          <Typography variant="h3" color="error" className="mt-4 text-red-500">
            Oops! Something went wrong
          </Typography>
          
          <Typography variant="body1" color="secondary" className="mt-2 text-white">
            {errorMessage}
          </Typography>
          
          {errorDetails && (
            <div className="mt-4 p-4 bg-input rounded-md w-full overflow-auto">
              <Typography variant="caption" className="text-left whitespace-pre-wrap font-mono text-white leading-6">
                {errorDetails}
              </Typography>
            </div>
          )}
          
          <div className="mt-8 space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-secondary  text-tbase rounded-md hover:bg-gray-100 transition-colors"
            >
              {/* <Typography variant="body2"> */}
                Refresh Page
              {/* </Typography> */}
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 bg-tertiary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              {/* <Typography variant="body2"> */}
                Go Back
              {/* </Typography> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary; 
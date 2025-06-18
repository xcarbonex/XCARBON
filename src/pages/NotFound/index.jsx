import React from 'react';
import { Typography } from '@/components';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCompass } from 'react-icons/fa';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-4">
      <div className="bg-secondary rounded-xl p-8 max-w-2xl w-full shadow-lg border text-center">
        <div className="flex flex-col items-center space-y-6">
          <FaRegCompass className="w-24 h-24 text-tertiary animate-pulse" />
          
          <div className="space-y-2">
            <Typography variant="h2" className="text-tbase">
              404
            </Typography>
            <Typography variant="h4" color="secondary">
              Page Not Found
            </Typography>
          </div>
          
          <Typography variant="body1" color="secondary" className="max-w-md">
            The page <span className="font-mono bg-input px-2 py-1 rounded">{location.pathname}</span> could not be found.
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/"
              className="px-6 py-3 bg-btn text-white rounded-md hover:bg-opacity-90 transition-colors text-center"
            >
              <Typography variant="body2">
                Back to Home
              </Typography>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-tertiary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              <Typography variant="body2">
                Go Back
              </Typography>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 
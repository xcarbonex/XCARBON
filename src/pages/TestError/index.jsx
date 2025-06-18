import React, { useEffect } from 'react';

const TestError = () => {
  useEffect(() => {
    throw new Error('This is a test error to demonstrate the error boundary');
  }, []);

  return null;
};

export default TestError; 
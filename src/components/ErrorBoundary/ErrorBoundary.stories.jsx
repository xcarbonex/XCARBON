import React from 'react';
import ErrorBoundary from './index.jsx';

export default {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
};

const Template = (args) => <ErrorBoundary {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
import React from 'react';
import ThemeProvider from './index.jsx';

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
};

const Template = (args) => <ThemeProvider {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
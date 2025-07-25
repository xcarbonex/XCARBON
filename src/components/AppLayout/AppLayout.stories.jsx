import React from 'react';
import AppLayout from './index.jsx';

export default {
  title: 'Components/AppLayout',
  component: AppLayout,
};

const Template = (args) => <AppLayout {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
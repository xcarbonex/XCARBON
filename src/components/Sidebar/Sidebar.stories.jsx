import React from 'react';
import Sidebar from './index.jsx';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
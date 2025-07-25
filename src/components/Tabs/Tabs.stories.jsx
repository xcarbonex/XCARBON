import React from 'react';
import Tabs from './index.jsx';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

const Template = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
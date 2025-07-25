import React from 'react';
import Model from './index.jsx';

export default {
  title: 'Components/Model',
  component: Model,
};

const Template = (args) => <Model {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
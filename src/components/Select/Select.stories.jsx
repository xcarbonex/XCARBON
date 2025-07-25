import React from 'react';
import Select from './index.jsx';

export default {
  title: 'Components/Select',
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
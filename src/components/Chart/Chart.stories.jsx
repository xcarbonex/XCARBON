import React from 'react';
import Line from './Line.jsx';

export default {
  title: 'Components/Chart/Line',
  component: Line,
};

const Template = (args) => <Line {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
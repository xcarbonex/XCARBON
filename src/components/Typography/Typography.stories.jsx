import React from 'react';
import Typography from './index.jsx';

export default {
  title: 'Components/Typography',
  component: Typography,
};

const Template = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
import React from 'react';
import ScrollBarWrapper from './index.jsx';

export default {
  title: 'Components/ScrollBarWrapper',
  component: ScrollBarWrapper,
};

const Template = (args) => <ScrollBarWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
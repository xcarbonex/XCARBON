import React from 'react';
import Accordion from './index.jsx';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
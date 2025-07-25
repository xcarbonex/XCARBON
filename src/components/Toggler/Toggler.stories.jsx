import React from 'react';
import Toggler from './index.jsx';

export default {
  title: 'Components/Toggler',
  component: Toggler,
};

const Template = (args) => <Toggler {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
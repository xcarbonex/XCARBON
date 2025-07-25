import React from 'react';
import Breadcrumb from './index.jsx';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

const Template = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
import React from 'react';
import Table from './index.jsx';

export default {
  title: 'Components/Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
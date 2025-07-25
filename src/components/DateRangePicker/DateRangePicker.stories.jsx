import React from 'react';
import DateRangePicker from './index.jsx';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
};

const Template = (args) => <DateRangePicker {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
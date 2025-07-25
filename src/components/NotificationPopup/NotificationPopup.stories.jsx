import React from 'react';
import NotificationPopup from './index.jsx';

export default {
  title: 'Components/NotificationPopup',
  component: NotificationPopup,
};

const Template = (args) => <NotificationPopup {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
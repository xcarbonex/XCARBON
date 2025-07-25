import React from 'react';
import PWAInstallPrompt from './PWAInstallPrompt.jsx';

export default {
  title: 'Components/PWA/PWAInstallPrompt',
  component: PWAInstallPrompt,
};

const Template = (args) => <PWAInstallPrompt {...args} />;

export const Default = Template.bind({});
Default.args = {}; 
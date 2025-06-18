import React from 'react';
import { Modal, Typography, Button } from '@/components';
import { useTheme } from '@/components/ThemeProvider';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import clsx from 'clsx';

const AppearanceModal = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: MdLightMode,
      description: 'Clean and bright interface for daytime use',
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: MdDarkMode,
      description: 'Easy on the eyes, perfect for night time',
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Appearance"
      className={clsx(
        'w-full max-w-md p-6',
        'bg-secondary',
        'text-tbase',
        'border'
      )}
    >
      <div className="space-y-6">
        <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
          Choose how X Carbon looks to you. Select a theme preference.
        </Typography>

        <div className="space-y-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.id;

            return (
              <button
                key={themeOption.id}
                onClick={() => {
                  if (theme !== themeOption.id) {
                    toggleTheme();
                  }
                }}
                className={clsx(
                  'w-full flex items-center p-4 rounded-lg border transition-all',
                  'hover:bg-[#4C666326] dark:hover:bg-[#FFFFFF14]',
                  {
                    'border-[#C2A57B] bg-[#4C666326] dark:bg-[#FFFFFF14]': isSelected,
                    'border-[#D8D8D8] dark:border-[#363638]': !isSelected
                  }
                )}
              >
                <div className="flex-1 flex items-center gap-3">
                  <Icon className={clsx(
                    'w-6 h-6',
                    'text-black dark:text-white'
                  )} />
                  <div className="text-left">
                    <Typography 
                      variant="body1" 
                      className={clsx(
                        'font-medium',
                        'text-black dark:text-white'
                      )}
                    >
                      {themeOption.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {themeOption.description}
                    </Typography>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-[#C2A57B]"></div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AppearanceModal; 
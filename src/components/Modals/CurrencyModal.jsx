import React, { useState } from 'react';
import { Modal, Typography, Button } from '@/components';
import clsx from 'clsx';
import { FiCheck } from 'react-icons/fi';

const currencies = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    status:true
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    status:false
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    status:false
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    flag: '🇯🇵',
    status:false
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    flag: '🇨🇳',
    status:false
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: '🇦🇺',
    status:false
  }
];

const CurrencyModal = ({ isOpen, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    // TODO: Implement currency change logic here
    // console.log('Currency changed to:', currencyCode);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Preferred Currency"
      className={clsx(
        'w-full max-w-md p-6',
        
      )}
    >
      <div className="space-y-6">
        <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
          Select your preferred currency for displaying prices and balances.
        </Typography>

        <div className="grid gap-2">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencySelect(currency.code)}
              disabled={!currency.status}
              className={clsx(
                'relative w-full p-3 rounded-lg border flex items-center justify-between',
                'transition-colors duration-200',
                selectedCurrency === currency.code
                  ? 'border-[#C2A57B] bg-[#4C666326] dark:bg-[#FFFFFF14]'
                  : 'border-[#D8D8D8] dark:border-[#363638] ',
                {'hover:bg-[#4c666311] dark:hover:bg-[#ffffff1c]': selectedCurrency === currency.code && currency.status}
              )}
            >
              <p className={clsx('absolute top-1 right-1 bg-[#C2A57B] dark:bg-white dark:text-black text-bolder text-xs rounded-full px-1 hover:bg-opacity-90 text-white',{hidden: currency.status})}>Coming Soon</p>
              <div className="flex items-center gap-3">
                <span className="text-xl">{currency.flag}</span>
                <div className="text-left">
                  <Typography variant="body1" className="font-medium text-black dark:text-white">
                    {currency.name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                    {currency.symbol} {currency.code}
                  </Typography>
                </div>
              </div>
              {selectedCurrency === currency.code && (
                <FiCheck className="w-5 h-5 text-[#C2A57B]" />
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="bg-[#C2A57B] hover:bg-opacity-90 text-white dark:bg-[#3B3B3B]"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CurrencyModal; 
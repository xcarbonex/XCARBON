import React, { useState, useEffect } from 'react';
import { Input, Typography, SelectField } from '@/components';
import Modal from '@/components/Model';
import clsx from 'clsx';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IoWalletOutline } from 'react-icons/io5';

const BuyCarbonCreditModal = ({ isOpen, onClose, creditData }) => {
  const [paymentMethod, setPaymentMethod] = useState('fiat');
  const [quantity, setQuantity] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState('');

  // TODO: Replace these with actual wallet balances from your state management
  const walletBalances = {
    fiat: 100000, // $100,000 USD
    xcb: 50000 // 50,000 XCB
  };

  const availableQuantity = parseInt(creditData?.availableVolume?.replace(/,/g, '') || 0);
  const pricePerCredit = parseFloat(creditData?.price?.replace('$', '') || 0);

  useEffect(() => {
    const parsedQuantity = parseInt(quantity) || 0;
    setTotalCost(parsedQuantity * pricePerCredit);

    if (parsedQuantity > availableQuantity) {
      setError(`Maximum available quantity is ${availableQuantity.toLocaleString()} credits`);
    } else if (parsedQuantity < 0) {
      setError('Quantity cannot be negative');
    } else if (parsedQuantity === 0 && quantity !== '') {
      setError('Please enter a valid quantity');
    } else if (totalCost > walletBalances[paymentMethod]) {
      setError(`Insufficient ${paymentMethod.toUpperCase()} balance`);
    } else {
      setError('');
    }
  }, [quantity, pricePerCredit, availableQuantity, paymentMethod, totalCost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;

    // console.log('Processing payment:', {
  };

  const paymentOptions = [
    { value: 'fiat', label: 'Pay with Fiat (USD)' },
    { value: 'xcb', label: 'Pay with XCB Token' }
  ];

  const formatCurrency = (amount, currency = 'USD') => {
    // Handle undefined, null or NaN amounts
    if (amount === undefined || amount === null || isNaN(amount)) {
      return currency === 'USD' ? '$0.00' : '0 ' + currency;
    }
    
    try {
      return currency === 'USD' 
        ? `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : `${amount.toLocaleString()} ${currency}`;
    } catch (error) {
      console.error('Error formatting currency:', error);
      return currency === 'USD' ? '$0.00' : '0 ' + currency;
    }
  };

  const remainingBalance = walletBalances[paymentMethod] - totalCost;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(
        'w-full max-w-xl p-6',
        'bg-[#FDFDFB] dark:bg-[#191919]',
        'text-black dark:text-white',
        'border border-[#D8D8D8] dark:border-[#363638]'
      )}
      title={
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <Typography variant="h5" className="font-medium">Purchase Carbon Assets</Typography>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              {creditData?.name}
            </Typography>
          </div>
          <div className="text-right">
            <Typography variant="subtitle2" className="text-tertiary font-medium">
              {creditData?.price}
            </Typography>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              per asset
            </Typography>
          </div>
        </div>
      }
    >
      <div className="space-y-6 mt-4">
        {/* Project Information */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-4 bg-secondary/30 rounded-lg border border-secondary/50">
          <div className="col-span-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              Available Assets
            </Typography>
            <div className="flex items-baseline gap-2">
              <Typography variant="h5" className="text-green-600 dark:text-green-400 font-medium">
                {(availableQuantity || 0).toLocaleString()}
              </Typography>
    
            </div>
          </div>
          <div>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              Project Type
            </Typography>
            <Typography variant="subtitle2">{creditData?.projectType}</Typography>
          </div>
          <div>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              Location
            </Typography>
            <Typography variant="subtitle2">{creditData?.location}</Typography>
          </div>
          <div>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              Registry
            </Typography>
            <Typography variant="subtitle2">{creditData?.registry}</Typography>
          </div>
          <div>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              Price Per Asset
            </Typography>
            <Typography variant="subtitle2" className="text-tertiary font-medium">
              {creditData?.price}
            </Typography>
          </div>
        </div>

        {/* Purchase Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            {/* Payment Method with Balance */}
            <div>
              <Typography variant="subtitle2" className="mb-1.5">Payment Method</Typography>
              <div className='space-y-2'>
                <SelectField
                  options={paymentOptions}
                  value={paymentMethod}
                  onChange={(value) => setPaymentMethod(value)}
                  className="w-full h-full"
                />
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <IoWalletOutline className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                      Available Balance
                    </Typography>
                    <Typography variant="subtitle2" className="text-blue-600 dark:text-blue-400 font-medium">
                      {formatCurrency(walletBalances?.[paymentMethod] || 0, paymentMethod === 'xcb' ? 'XCB' : 'USD')}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="subtitle2" className="mb-1.5">Quantity</Typography>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={`Max ${(availableQuantity || 0).toLocaleString()}`}
                min="1"
                max={availableQuantity}
                required
                error={error}
                className="h-9"
                suffix={
                  <Typography variant="caption" className="text-gray-500">
                    Assets
                  </Typography>
                }
              />
              {error && (
                <Typography variant="caption" className="text-red-500 mt-1">
                  {error}
                </Typography>
              )}
            </div>

            {/* Cost and Balance Summary */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-3 bg-secondary/20">
                <div className="flex justify-between items-center">
                  <Typography variant="subtitle2" className="text-gray-600 dark:text-gray-300">
                    Total Cost
                  </Typography>
                  <Typography variant="subtitle2" className="font-medium">
                    {formatCurrency(totalCost || 0, paymentMethod === 'xcb' ? 'XCB' : 'USD')}
                  </Typography>
                </div>
              </div>
              <div className={clsx(
                "p-3",
                (remainingBalance || 0) < 0 
                  ? "bg-red-50 dark:bg-red-900/20" 
                  : "bg-green-50 dark:bg-green-900/20"
              )}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="caption" className={clsx(
                      (remainingBalance || 0) < 0 
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    )}>
                      Remaining Balance
                    </Typography>
                    <Typography variant="subtitle2" className={clsx(
                      "font-medium",
                      (remainingBalance || 0) < 0 
                        ? "text-red-600 dark:text-red-400" 
                        : "text-green-600 dark:text-green-400"
                    )}>
                      {formatCurrency(remainingBalance || 0, paymentMethod === 'xcb' ? 'XCB' : 'USD')}
                    </Typography>
                  </div>
                  <div className={clsx(
                    "px-2 py-1 rounded text-xs font-medium",
                    (remainingBalance || 0) < 0 
                      ? "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200" 
                      : "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                  )}>
                    {(remainingBalance || 0) < 0 ? 'Insufficient Balance' : 'Sufficient Balance'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className={clsx(
            "p-3 rounded flex items-start gap-2.5 text-xs",
            paymentMethod === 'xcb' 
              ? "bg-yellow-50 dark:bg-yellow-900/20" 
              : "bg-blue-50 dark:bg-blue-900/20"
          )}>
            <IoInformationCircleOutline className={clsx(
              "w-4 h-4 mt-0.5",
              paymentMethod === 'xcb'
                ? "text-yellow-700 dark:text-yellow-300"
                : "text-blue-700 dark:text-blue-300"
            )} />
            <div className="space-y-0.5">
              <Typography variant="caption" className="font-medium">
                {paymentMethod === 'xcb' 
                  ? 'XCB Token Payment Information'
                  : 'Fiat Payment Information'
                }
              </Typography>
              <Typography variant="caption" className={clsx(
                "block",
                paymentMethod === 'xcb'
                  ? "text-yellow-700 dark:text-yellow-300"
                  : "text-blue-700 dark:text-blue-300"
              )}>
                {paymentMethod === 'xcb'
                  ? 'XCB token payments are subject to network fees and current market rates. The transaction may take a few minutes to process.'
                  : 'Fiat payments are processed immediately through our secure payment gateway. Additional processing fees may apply.'
                }
              </Typography>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!!error || !quantity}
              className={clsx(
                "px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors",
                error || !quantity
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-tertiary hover:bg-tertiary/90"
              )}
            >
              Confirm Purchase
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BuyCarbonCreditModal; 
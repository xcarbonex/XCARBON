import React, { useState } from 'react';
import { Modal, Typography, Button } from '@/components';
import clsx from 'clsx';
import { FiCopy, FiTrash2, FiPlus } from 'react-icons/fi';

const APIKeyModal = ({ isOpen, onClose }) => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Development API Key',
      key: 'xc_dev_123456789',
      created: '2024-03-15',
      lastUsed: '2024-03-20'
    },
    {
      id: '2',
      name: 'Production API Key',
      key: 'xc_prod_987654321',
      created: '2024-03-10',
      lastUsed: '2024-03-21'
    }
  ]);

  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDeleteKey = (id) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `xc_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: '-'
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setShowNewKeyForm(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="API Keys"
      className={clsx(
        'w-full max-w-3xl p-6',
        'bg-[#FDFDFB] dark:bg-[#191919]',
        'text-black dark:text-white',
        'border border-[#D8D8D8] dark:border-[#363638]'
      )}
    >
      <div className="space-y-6">
        <div>
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
            Manage your API keys for accessing xCarbon programmatically.
          </Typography>
        </div>

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className={clsx(
                'p-4 rounded-lg border',
                'bg-[#4C666326] dark:bg-[#FFFFFF14]',
                'border-[#D8D8D8] dark:border-[#363638]'
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <Typography variant="body1" className="font-medium text-black dark:text-white">
                    {apiKey.name}
                  </Typography>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-sm">
                      {apiKey.key}
                    </code>
                    <button
                      onClick={() => handleCopyKey(apiKey.key)}
                      className={clsx(
                        'p-1 rounded hover:bg-black/5 dark:hover:bg-white/5',
                        'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                    {copiedKey === apiKey.key && (
                      <Typography variant="caption" className="text-green-600 dark:text-green-400">
                        Copied!
                      </Typography>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteKey(apiKey.id)}
                  className={clsx(
                    'p-2 rounded-lg',
                    'hover:bg-red-50 dark:hover:bg-red-900/20',
                    'text-red-600 dark:text-red-400'
                  )}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Created: {apiKey.created}</span>
                <span>Last used: {apiKey.lastUsed}</span>
              </div>
            </div>
          ))}
        </div>

        {/* New Key Form */}
        {showNewKeyForm ? (
          <div className="space-y-4">
            <Typography variant="body2" className="text-black dark:text-white">
              New API Key Name
            </Typography>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter a name for your API key"
              className={clsx(
                'w-full px-4 py-2 rounded-lg',
                'bg-[#4C666326] dark:bg-[#FFFFFF14]',
                'border border-[#D8D8D8] dark:border-[#363638]',
                'text-black dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-[#C2A57B]'
              )}
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowNewKeyForm(false)}
                className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateKey}
                disabled={!newKeyName.trim()}
                className={clsx(
                  'bg-[#C2A57B] hover:bg-opacity-90 text-white dark:bg-[#3B3B3B]',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                Create API Key
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowNewKeyForm(true)}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Create New API Key
          </Button>
        )}

        <div className="pt-4 border-t border-[#D8D8D8] dark:border-[#363638]">
          <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
            Note: Keep your API keys secure. They provide full access to your account.
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default APIKeyModal; 
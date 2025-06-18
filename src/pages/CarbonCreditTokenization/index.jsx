import React, { useState } from 'react';
import { Typography, Input, SelectField } from '@/components';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { HiDocumentText } from 'react-icons/hi';
import clsx from 'clsx';

const CarbonCreditTokenization = () => {
  const [selectedRegistry, setSelectedRegistry] = useState('');
  const [projectId, setProjectId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [vintage, setVintage] = useState('');
  const [file, setFile] = useState(null);

  const registryOptions = [
    { value: 'verra', label: 'Verra Registry' },
    { value: 'goldstandard', label: 'Gold Standard' },
    { value: 'americancarbonregistry', label: 'American Carbon Registry' },
    { value: 'climateactionreserve', label: 'Climate Action Reserve' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedRegistry,
      projectId,
      creditAmount,
      vintage,
      file
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-1">
          <Typography variant="h4" className="font-medium">
            Tokenize Carbon Credits
          </Typography>
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
            Convert your registry carbon credits into XCB tokens. Please ensure you have the required documentation ready.
          </Typography>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-secondary/30 p-6 rounded-xl border border-secondary/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Typography variant="subtitle2" className="mb-1.5">
                      Carbon Credit Registry
                    </Typography>
                    <SelectField
                      options={registryOptions}
                      value={selectedRegistry}
                      onChange={setSelectedRegistry}
                      placeholder="Select registry"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Typography variant="subtitle2" className="mb-1.5">
                      Project ID
                    </Typography>
                    <Input
                      type="text"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      placeholder="Enter project ID from registry"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography variant="subtitle2" className="mb-1.5">
                        Credit Amount
                      </Typography>
                      <Input
                        type="number"
                        value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="mb-1.5">
                        Vintage Year
                      </Typography>
                      <Input
                        type="number"
                        value={vintage}
                        onChange={(e) => setVintage(e.target.value)}
                        placeholder="YYYY"
                        required
                        min="2000"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>

                  <div>
                    <Typography variant="subtitle2" className="mb-1.5">
                      Verification Documents
                    </Typography>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="file-upload"
                        className={clsx(
                          "flex flex-col items-center justify-center w-full",
                          "p-6 border-2 border-dashed rounded-lg cursor-pointer",
                          "transition-colors duration-200",
                          file
                            ? "border-tertiary/50 bg-tertiary/5"
                            : "border-gray-300 dark:border-gray-600 hover:border-tertiary/50"
                        )}
                      >
                        {file ? (
                          <div className="flex items-center gap-2 text-tertiary">
                            <HiDocumentText className="w-6 h-6" />
                            <Typography variant="body2">{file.name}</Typography>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <IoCloudUploadOutline className="w-8 h-8 text-gray-400" />
                            <div className="text-center">
                              <Typography variant="body2">
                                Drop your verification documents here or{' '}
                                <span className="text-tertiary">browse</span>
                              </Typography>
                              <Typography variant="caption" className="text-gray-500">
                                Supports PDF, DOC, DOCX (max 10MB)
                              </Typography>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={clsx(
                    "w-full px-4 py-2.5 rounded-lg text-white font-medium",
                    "bg-tertiary hover:bg-tertiary/90 transition-colors",
                    "disabled:bg-gray-400 disabled:cursor-not-allowed"
                  )}
                  disabled={!selectedRegistry || !projectId || !creditAmount || !vintage || !file}
                >
                  Submit for Tokenization
                </button>
              </form>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <Typography variant="subtitle1" className="text-blue-700 dark:text-blue-300 mb-2">
                Tokenization Process
              </Typography>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    1
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Submit your carbon credit details and verification documents
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    2
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Our team verifies the submitted information
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    3
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Upon approval, credits are converted to XCB tokens
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-sm font-medium">
                    4
                  </div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-400">
                    Tokens are transferred to your wallet
                  </Typography>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-100 dark:border-yellow-800">
              <Typography variant="subtitle1" className="text-yellow-700 dark:text-yellow-300 mb-2">
                Important Notes
              </Typography>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Ensure all submitted documents are clear and valid
                </li>
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Verification process may take 2-3 business days
                </li>
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Keep your registry credentials handy for verification
                </li>
                <li className="text-yellow-600 dark:text-yellow-400 text-sm">
                  Make sure your wallet is ready to receive XCB tokens
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditTokenization; 
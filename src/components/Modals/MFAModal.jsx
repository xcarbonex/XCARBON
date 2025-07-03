import React, { useState, useEffect } from "react";
import { Modal, Typography, Button, Toggle } from "@/components";
import clsx from "clsx";
import QRCode from "react-qr-code";

const MFAModal = ({ isOpen, onClose }) => {
  const [mfaEnabled, setMfaEnabled] = useState(false); // Global MFA state
  const [showQRCode, setShowQRCode] = useState(false); // Local UI state
  const [verificationCode, setVerificationCode] = useState("");

  const mockQRCodeData =
    "otpauth://totp/QuantumApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=QuantumApp&algorithm=SHA1&digits=6&period=30";

  // Reset state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      if (mfaEnabled) {
        setShowQRCode(false); // show toggler UI
      } else {
        setShowQRCode(true); // show QR setup UI
      }
      setVerificationCode("");
    }
  }, [isOpen]);

  const handleVerifyCode = () => {
    // Normally you would verify this with backend
    console.log("Verifying code:", verificationCode);
    setMfaEnabled(true);
    setShowQRCode(false);
    setVerificationCode("");
  };

  const handleToggleChange = (enabled) => {
    if (!enabled) {
      // User is disabling MFA
      setMfaEnabled(false);
      onClose(); // Close modal immediately
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Multi-Factor Authentication"
      className={clsx(
        "w-full max-w-md p-4",
        "min-h-fit",
        "bg-[#FDFDFB] dark:bg-[#191919]",
        "text-black dark:text-white",
        "border border-[#D8D8D8] dark:border-[#363638]"
      )}
    >
      <div className="space-y-6">
        {/* QR Setup Screen */}
        {!mfaEnabled && showQRCode && (
          <>
            <Typography variant="body2" className="text-black dark:text-white">
              1. Install an authenticator app like Google Authenticator or Authy
            </Typography>

            <div className="flex justify-center bg-white p-4 rounded-lg">
              <QRCode
                value={mockQRCodeData}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 256 256"
                level="H"
              />
            </div>

            <Typography variant="body2" className="text-black dark:text-white">
              2. Scan the QR code with your authenticator app
            </Typography>

            <div>
              <Typography
                variant="body2"
                className="mb-2 text-black dark:text-white"
              >
                3. Enter the 6-digit code from your authenticator app
              </Typography>
              <input
                type="text"
                maxLength="6"
                className={clsx(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-[#4C666326] dark:bg-[#FFFFFF14]",
                  "border border-[#D8D8D8] dark:border-[#363638]",
                  "text-black dark:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-[#C2A57B]"
                )}
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
          </>
        )}

        {/* MFA Enabled View (after successful verification) */}
        {mfaEnabled && !showQRCode && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  variant="body1"
                  className="font-medium text-black dark:text-white"
                >
                  Two-Factor Authentication is enabled
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-500 dark:text-gray-400"
                >
                  Add and extra layer of security
                </Typography>
              </div>
              <Toggle defaultActive={true} onToggle={handleToggleChange} />
            </div>

            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <Typography
                variant="body2"
                className="text-green-800 dark:text-green-200"
              >
                Your account is protected by two-factor authentication.
              </Typography>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            Cancel
          </Button>
          {!mfaEnabled && showQRCode && (
            <Button
              variant="primary"
              onClick={handleVerifyCode}
              disabled={verificationCode.length !== 6}
              className={clsx(
                "bg-[#C2A57B] hover:bg-opacity-90 text-white dark:bg-[#3B3B3B]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Verify
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MFAModal;

import React, { useState } from "react";
import { Input } from "..";

interface ToggleProps {
  onToggle: (checked: boolean) => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, label }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onToggle(e.target.checked);
  };

  return (
    <div className="flex items-center space-x-2">
      {label && <span className="text-secondary">{label}</span>}
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <Input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div className={`box block h-6 w-10 rounded-full bg-tbase`}></div>
          <div
            className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Toggle;

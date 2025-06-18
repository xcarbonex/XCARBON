
import { clsx } from 'clsx';
import { HiDotsVertical } from 'react-icons/hi';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  options = [],
  selectedOption = null,
  onSelect,
  className,
  customInput = false,
  buttonClassName = '',
  dropdownClassName = '',
  itemClassName = '',
  placeholder = 'Custom',
  onCustomSelect,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
const [selectedOptionState, setSelectedOptionState] = useState(
  selectedOption ?? (options.length > 0 ? options[0] : null)
);
  const dropdownRef = useRef(null);

  const getButtonLabel = () => {
    const selected = options.find((option) => option.value === selectedOptionState?.value);
    return selected?.label ;
};
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setCustomValue('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

const handleOptionSelect = (value) => {
  setSelectedOptionState(value);
  getButtonLabel()
  onSelect(value);
  setIsOpen(false);
  setCustomValue('');
};

const handleCustomSubmit = () => {
  const value = Number(customValue);
  if (customInput && value > 0 && Number.isInteger(value)) {
    setSelectedOptionState(value);
    onCustomSelect(value);
    setIsOpen(false);
    setCustomValue('');
  } else {
    alert('Please enter a valid positive integer');
  }
};

  return (
    <div className={clsx("relative  text-tbase min-w-[2.8rem]", className)}  ref={dropdownRef} style={{ userSelect: 'none' }}>
      <button
        type="button"
        className={clsx(
          'rounded p-1 cursor-pointer border focus:outline-none ',
          {'w-full': !icon},
          buttonClassName
        )}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {icon ? <span>{icon}</span> : getButtonLabel()}
      </button>
      <div
        className={clsx(
          'absolute right-0 bg-secondary border rounded shadow-lg z-20 p-1',
          { hidden: !isOpen },
          dropdownClassName
        )}
      >
        <ul className="space-y-1 w-fit text-center">
            {options.map((option, index) => (
                <li
                    key={index}
                    className={clsx(
                    'px-1 py-1 w-full cursor-pointer hover:bg-input rounded',
                    { 'bg-input': selectedOptionState === option.value },
                    itemClassName
                    )}
                    onClick={() => handleOptionSelect(option)}
                    style={{ userSelect: 'none' }}
                >
                    {option.label}
                </li>
            ))}     
          {customInput && (
            <li className="pt-2">
              <input
                type="number"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder={placeholder}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={handleCustomSubmit}
                className="mt-1 w-full px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                Apply
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};


Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ),
  selectedOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf([null])]),
  onSelect: PropTypes.func.isRequired,
  customInput: PropTypes.bool,
  buttonClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onCustomSelect: PropTypes.func,
};

Dropdown.defaultProps = {
  options: [],
  selectedOption: null,
  customInput: false,
  buttonClassName: '',
  dropdownClassName: '',
  itemClassName: '',
  placeholder: 'Custom',
  onCustomSelect: () => {},
};

export default Dropdown
import React, { useState } from 'react';
import Dropdown from './index.jsx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ],
  onSelect: () => {},
};

export const VirtualizedLargeList = Template.bind({});
VirtualizedLargeList.args = {
  options: Array.from({ length: 1000 }, (_, i) => ({ label: `Option ${i + 1}`, value: i + 1 })),
  onSelect: () => {},
};

export const CustomRenderOption = (args) => {
  const [checked, setChecked] = useState({});
  const options = Array.from({ length: 100 }, (_, i) => ({ label: `Checkbox ${i + 1}`, value: i + 1 }));
  return (
    <Dropdown
      {...args}
      options={options}
      onSelect={(option) => {
        setChecked((prev) => ({ ...prev, [option.value]: !prev[option.value] }));
      }}
      renderOption={({ option, onSelect }) => (
        <div className="flex items-center px-2 py-1 cursor-pointer hover:bg-input rounded" onClick={onSelect}>
          <input
            type="checkbox"
            checked={!!checked[option.value]}
            onChange={() => onSelect(option)}
            className="mr-2"
            onClick={e => e.stopPropagation()}
          />
          <span>{option.label}</span>
        </div>
      )}
    />
  );
};
CustomRenderOption.storyName = 'Custom Option (Checkbox)';

export const MultiSelectWithCheckboxes = (args) => {
  const initialOptions = Array.from({ length: 20 }, (_, i) => ({
    label: `Item ${i + 1}`,
    value: i + 1,
  }));

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (selected) => {
    setSelectedItems(selected);
    console.log("Selected items:", selected);
  };

  return (
    <Dropdown
      {...args}
      options={initialOptions}
      multiSelect={true}
      selectedOption={selectedItems}
      onSelect={handleSelect}
      buttonClassName="w-48"
      renderOption={({ option, isSelected, onSelect }) => {
        const isSelectAll = option.value === "_select_all_";
        const isAllSelected = selectedItems.length === initialOptions.length;

        return (
          <div
            className="flex items-center px-2 py-1 cursor-pointer hover:bg-input rounded"
            onClick={onSelect}
          >
            <input
              type="checkbox"
              checked={isSelectAll ? isAllSelected : isSelected}
              onChange={() => onSelect(option)}
              className="mr-2"
              onClick={(e) => e.stopPropagation()}
            />
            <span>{option.label}</span>
          </div>
        );
      }}
    />
  );
};
MultiSelectWithCheckboxes.storyName = 'Multi-Select with Checkboxes'; 
import React, { memo, CSSProperties } from "react";
import { clsx } from "clsx";

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface RenderOptionParams {
  option: DropdownOption;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

interface DropdownRowData {
  options: DropdownOption[];
  selectedOptionState: DropdownOption | DropdownOption[] | null;
  handleOptionSelect: (option: DropdownOption) => void;
  renderOption?: (params: RenderOptionParams) => React.ReactNode;
  multiSelect: boolean;
}

interface DropdownRowProps {
  data: DropdownRowData;
  index: number;
  style: CSSProperties;
}

const DropdownRow = memo<DropdownRowProps>(({ data, index, style }) => {
  const { options, selectedOptionState, handleOptionSelect, renderOption, multiSelect } = data;
  const option = options[index];

  const isSelected = multiSelect
    ? Array.isArray(selectedOptionState) &&
      selectedOptionState.some((selected: DropdownOption) => selected.value === option.value)
    : !Array.isArray(selectedOptionState) && selectedOptionState?.value === option.value;

  return (
    <div style={style}>
      {renderOption ? (
        renderOption({
          option,
          index,
          isSelected,
          onSelect: () => handleOptionSelect(option),
        })
      ) : (
        <li
          className={clsx("px-1 py-1 w-full cursor-pointer hover:bg-input rounded", {
            "bg-input": isSelected,
          })}
          onClick={() => handleOptionSelect(option)}
          style={{ userSelect: "none" }}
        >
          {option.label}
        </li>
      )}
    </div>
  );
});

export default DropdownRow;

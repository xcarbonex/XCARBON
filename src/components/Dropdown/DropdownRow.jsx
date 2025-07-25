import {clsx} from "clsx";
import {memo} from "react";

const DropdownRow = memo(({data, index, style}) => {
  const {
    options,
    selectedOptionState,
    handleOptionSelect,
    renderOption,
    multiSelect,
  } = data;
  const option = options[index];

  const isSelected = multiSelect
    ? selectedOptionState.some((selected) => selected.value === option.value)
    : selectedOptionState?.value === option.value;

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
          className={clsx(
            "px-1 py-1 w-full cursor-pointer hover:bg-input rounded",
            {"bg-input": isSelected}
          )}
          onClick={() => handleOptionSelect(option)}
          style={{userSelect: "none"}}
        >
          {option.label}
        </li>
      )}
    </div>
  );
});

export default DropdownRow;

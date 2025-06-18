import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useTheme } from "../ThemeProvider";
import clsx from "clsx";

const DateRangeCalander = ({
  onChange=()=>{},
  ...rest
}) => {
  const {theme} = useTheme()
  const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }
]);

  const handleDataRangeChange = (item) => {
    setState([item.selection]);
    onChange(state);
  };
  return (
    <DateRangePicker
      showSelectionPreview={true}
      onChange={handleDataRangeChange}
      direction="vertical"
      scroll={{ enabled: false }}
      ranges={state}
      calendarFocus="backwards"
      rangeColors={['var(--bg-tertiary)']}
      className={clsx("border", theme)}
      {...rest}
    />
  );
};

export default DateRangeCalander;

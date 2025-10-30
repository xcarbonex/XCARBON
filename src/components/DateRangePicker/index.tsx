import React, { useState } from "react";
// @ts-expect-error - react-date-range doesn't have TypeScript definitions
import { DateRangePicker, Range } from "react-date-range";
import { useTheme } from "../ThemeProvider";
import clsx from "clsx";

interface DateRangeCalanderProps {
  onChange?: (ranges: Range[]) => void;
  [key: string]: unknown;
}

const DateRangeCalander: React.FC<DateRangeCalanderProps> = ({ onChange = () => {}, ...rest }) => {
  const { theme } = useTheme();
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDataRangeChange = (item: { selection: Range }) => {
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
      rangeColors={["var(--bg-tertiary)"]}
      className={clsx("border", theme)}
      {...rest}
    />
  );
};

export default DateRangeCalander;

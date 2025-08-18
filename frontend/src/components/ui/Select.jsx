import React from "react";

// components/ui/Select.jsx
export function Select({ value, onChange, options }) {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
  
  // Optional named exports (if you want to mimic headless UI style)
  export const SelectTrigger = ({ children }) => <div>{children}</div>;
  export const SelectValue = ({ value }) => <span>{value}</span>;
  export const SelectContent = ({ children }) => <div>{children}</div>;
  export const SelectItem = ({ children }) => <div>{children}</div>;
  
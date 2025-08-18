import React from "react";

import { colors } from "../../utils/colors";

export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl font-bold text-white transition hover:opacity-90 ${className}`}
      style={{ backgroundColor: colors.purpleDark }}
    >
      {children}
    </button>
  );
}

import React from "react";

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
      {children}
    </table>
  );
}

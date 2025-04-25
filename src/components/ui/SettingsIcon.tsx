import React from "react";

export default function SettingsIcon({ className = "" }: { className?: string }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m13.94 4a10.96 10.96 0 01-1.36 2.49l-2.12-2.12a7.963 7.963 0 00-3.36 0l-2.12 2.12a10.96 10.96 0 01-2.49-1.36l2.12-2.12a7.963 7.963 0 000-3.36l-2.12-2.12a10.96 10.96 0 011.36-2.49l2.12 2.12a7.963 7.963 0 003.36 0l2.12-2.12a10.96 10.96 0 011.36 2.49l-2.12 2.12a7.963 7.963 0 000 3.36l2.12 2.12z" />
      </svg>
    );
  }
  
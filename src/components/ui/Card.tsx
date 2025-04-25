import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">{children}</div>
  );
}

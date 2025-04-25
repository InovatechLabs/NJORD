import React, { useState } from "react";

export default function Tabs({ defaultValue, children }: { defaultValue: string, children: React.ReactNode }) {
  const [active, setActive] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

const TabsContext = React.createContext<{ active: string, setActive: (val: string) => void }>({ active: "", setActive: () => {} });

export function TabsList({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string, children: React.ReactNode }) {
  const { active, setActive } = React.useContext(TabsContext);
  return (
    <button
      className={`px-4 py-2 rounded ${active === value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

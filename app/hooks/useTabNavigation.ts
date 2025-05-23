import { useState } from 'react';

export function useTabNavigation(initialTab: string = 'overview') {
  const [activeTab, setActiveTab] = useState(initialTab);

  return {
    activeTab,
    setActiveTab
  };
}

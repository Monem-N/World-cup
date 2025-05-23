import React from 'react';
import { Plane, Calendar, Luggage } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Plane, description: 'Trip summary' },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar, description: 'Daily schedule' },
    { id: 'essentials', label: 'Essentials', icon: Luggage, description: 'Travel checklist' }
  ];

  return (
    <div className="mb-12 flex justify-center">
      <div className="relative">
        <div className="absolute -inset-1 tab-nav-glow rounded-3xl blur opacity-50" />
        <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-3 border border-white/20 inline-flex shadow-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                activeTab === tab.id
                  ? 'tab-active text-black shadow-2xl scale-105 transform'
                  : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-102'
              }`}
            >
              <div className="relative">
                <tab.icon className={`w-6 h-6 transition-all duration-300 ${
                  activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                {activeTab === tab.id && (
                  <div className="absolute -inset-2 bg-black/20 rounded-full blur-sm animate-pulse" />
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold tracking-wide">{tab.label}</span>
                <span className={`text-xs font-medium ${
                  activeTab === tab.id ? 'text-black/70' : 'text-white/50'
                }`}>
                  {tab.description}
                </span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

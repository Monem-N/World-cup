import React from 'react';
import SupabaseTest from '../components/SupabaseTest';

export default function SupabaseTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Integration Test</h1>
      <SupabaseTest />
    </div>
  );
}

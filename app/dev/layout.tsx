import { redirect } from 'next/navigation';
import React from 'react';

export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-[#010409] text-white">
      {/* A simple nav header for dev tools */}
      <header className="border-b border-[#30363d] p-4 bg-[#0d1117] flex justify-between items-center">
        <h1 className="font-mono text-primary text-sm tracking-widest uppercase">
          [Developer Tools]
        </h1>
        <div className="text-xs font-mono opacity-50">Local Env Only</div>
      </header>
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}


import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-[100dvh] flex w-full bg-background overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto p-3 md:p-6 pb-20 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;

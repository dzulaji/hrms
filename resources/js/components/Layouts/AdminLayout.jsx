import Sidebar from './Sidebar';
import { Navbar } from '@/components/pouf/navbar';
import { Breadcrumb } from '@/components/pouf/breadcrumb';
import { Button } from '@/components/pouf/Button';

export default function AdminLayout({ children, breadcrumb = [] }) {
  return (
    <div className="flex min-h-screen bg-bg font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pr-4 pb-4">
        <div className="py-4">
          <Navbar 
            brand={<div className="font-black text-xl text-ink">HRMS Admin</div>}
            actions={
              <div className="flex items-center gap-4">
                <div className="text-muted font-bold text-sm">Admin</div>
                <Button tone="pink">
                  Logout
                </Button>
              </div>
            }
          />
        </div>
        <main className="flex-1 flex flex-col gap-4">
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="px-4">
              <Breadcrumb items={breadcrumb} />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

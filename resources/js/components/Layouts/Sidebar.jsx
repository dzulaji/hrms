import { Link, usePage } from '@inertiajs/react';
import { NavLink } from '@/components/pouf/NavLink';

// Adapter to forward Inertia Link properties properly to NavLink's custom link component
function InertiaLinkAdapter(props) {
  return <Link {...props} />;
}

export default function Sidebar() {
  const { url } = usePage();

  return (
    <aside className="w-64 flex flex-col bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] m-4 p-4 gap-2">
      <div className="font-black text-2xl px-4 py-2 text-ink mb-4">HRMS</div>
      
      <NavLink 
        href="/admin/dashboard" 
        currentPath={url} 
        icon="overview" 
        tone="purple"
        link={InertiaLinkAdapter}
      >
        Dashboard
      </NavLink>
      
      <NavLink 
        href="/admin/karyawan" 
        currentPath={url} 
        icon="users" 
        tone="orange"
        link={InertiaLinkAdapter}
      >
        Karyawan
      </NavLink>
    </aside>
  );
}

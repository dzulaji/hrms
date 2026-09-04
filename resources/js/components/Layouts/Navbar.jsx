export default function Navbar({ title = 'Dashboard' }) {
  return (
    <nav className="flex items-center justify-between bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] mx-4 mt-4 p-4">
      <div className="font-bold text-xl text-ink ml-2">{title}</div>
      <div className="flex items-center gap-4">
        <div className="text-muted font-bold">Admin</div>
        <button className="bg-pink text-on-accent hover:bg-mint px-4 py-2 rounded-[var(--r-control)] font-bold transition-colors shadow-[var(--pouf-control)]">
          Logout
        </button>
      </div>
    </nav>
  );
}

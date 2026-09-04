import AdminLayout from '@/Components/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { buttonClasses } from '@/components/pouf/Button';

export default function Index({ karyawan = [] }) {
  return (
    <AdminLayout breadcrumb={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Data Karyawan' }]}>
      <Head title="Data Karyawan" />
      
      <div className="bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-ink">List Karyawan</h1>
          <Link 
            href="/admin/karyawan/create"
            className={buttonClasses({ tone: 'purple' })}
          >
            + Tambah Karyawan
          </Link>
        </div>

        {karyawan.length === 0 ? (
          <div className="text-center py-12 bg-bg rounded-2xl text-muted font-bold">
            Belum ada data karyawan.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {karyawan.map(k => (
              <div key={k.id} className="flex justify-between items-center p-4 bg-surface rounded-[var(--r-control)] shadow-[var(--pouf-row)] hover:shadow-[var(--pouf-row-hover)] transition-shadow">
                <div className="font-bold text-ink">{k.nama}</div>
                <Link 
                  href={`/admin/karyawan/${k.id}/edit`}
                  className={buttonClasses({ tone: 'blue', size: 'sm' })}
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

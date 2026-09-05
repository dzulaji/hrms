import AdminLayout from '@/Components/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { buttonClasses } from '@/components/pouf/Button';
import { Table } from '@/components/pouf/table';

export default function Index({ karyawan = [] }) {
  const columns = [
    { key: 'nama', header: 'Nama', render: (k) => <div className="font-bold text-ink">{k.nama}</div> },
    { key: 'jabatan', header: 'Jabatan', render: (k) => k.jabatan },
    { key: 'status', header: 'Status', render: (k) => (
        <span className={`px-2 py-1 text-[11px] font-bold uppercase rounded-pill ${k.status === 'Aktif' ? 'bg-mint text-ink' : 'bg-pink text-ink'}`}>
          {k.status}
        </span>
    )},
    { key: 'actions', header: '', align: 'right', render: (k) => (
        <Link 
          href={`/admin/karyawan/${k.id}/edit`}
          className={buttonClasses({ tone: 'blue', size: 'sm' })}
        >
          Edit
        </Link>
    )},
  ];

  return (
    <AdminLayout title="Data Karyawan" breadcrumb={[{ label: 'Karyawan' }]}>
      <Head title="Data Karyawan" />
      
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-ink">List Karyawan</h1>
          <Link 
            href="/admin/karyawan/create"
            className={buttonClasses({ tone: 'purple' })}
          >
            + Tambah Karyawan
          </Link>
        </div>

        <div className="bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] overflow-hidden">
          <Table 
            columns={columns}
            rows={karyawan}
            getKey={(k) => k.id.toString()}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

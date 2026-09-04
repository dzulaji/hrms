import AdminLayout from '@/Components/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/pouf/Button';

export default function Create() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    router.post('/admin/karyawan', data);
  };

  return (
    <AdminLayout breadcrumb={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Data Karyawan', href: '/admin/karyawan' }, { label: 'Tambah' }]}>
      <Head title="Tambah Karyawan" />
      
      <div className="bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-black text-ink mb-6">Tambah Data Karyawan</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-ink">Nama Lengkap</label>
            <input 
              {...register('nama', { required: 'Nama wajib diisi' })}
              className="bg-surface border-none shadow-[var(--pouf-field)] focus:shadow-[var(--pouf-field-focus)] rounded-[var(--r-control)] px-4 py-3 font-bold text-ink outline-none transition-shadow"
              placeholder="Masukkan nama"
            />
            {errors.nama && <span className="text-pink font-bold text-sm">{errors.nama.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-ink">Jabatan</label>
            <input 
              {...register('jabatan', { required: 'Jabatan wajib diisi' })}
              className="bg-surface border-none shadow-[var(--pouf-field)] focus:shadow-[var(--pouf-field-focus)] rounded-[var(--r-control)] px-4 py-3 font-bold text-ink outline-none transition-shadow"
              placeholder="Masukkan jabatan"
            />
            {errors.jabatan && <span className="text-pink font-bold text-sm">{errors.jabatan.message}</span>}
          </div>

          <Button type="submit" tone="purple" size="lg" className="mt-4">
            Simpan Data
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

import AdminLayout from '@/Components/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/pouf/Button';
import { Field, inputClasses } from '@/components/pouf/Input';
import { Icon } from '@/components/pouf/Icon';

export default function Create() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    router.post('/admin/karyawan', data);
  };

  return (
    <AdminLayout breadcrumb={[{ label: 'Karyawan', href: '/admin/karyawan' }, { label: 'Tambah' }]}>
      <Head title="Tambah Karyawan" />
      
      <div className="flex flex-col gap-6 p-4">
        {/* Tombol kembali */}
        <div className="flex items-center gap-4">
          <Link href="/admin/karyawan" className="flex items-center gap-2 text-muted font-bold text-sm hover:text-ink transition-colors">
            <Icon name="prev" size="sm" />
            Kembali
          </Link>
        </div>

        <div className="bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] p-8 max-w-2xl">
          <h1 className="text-2xl font-black text-ink mb-6">Tambah Data Karyawan</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Field label="Nama Lengkap" error={errors.nama?.message}>
              {(id, describedBy) => (
                <input
                  id={id}
                  type="text"
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.nama}
                  className={inputClasses({ invalid: !!errors.nama })}
                  placeholder="Masukkan nama"
                  {...register('nama', { required: 'Nama wajib diisi' })}
                />
              )}
            </Field>

            <Field label="Jabatan" error={errors.jabatan?.message}>
              {(id, describedBy) => (
                <input
                  id={id}
                  type="text"
                  aria-describedby={describedBy}
                  aria-invalid={!!errors.jabatan}
                  className={inputClasses({ invalid: !!errors.jabatan })}
                  placeholder="Masukkan jabatan"
                  {...register('jabatan', { required: 'Jabatan wajib diisi' })}
                />
              )}
            </Field>

            <div className="flex items-center gap-3 mt-4">
              <Button type="submit" tone="purple" size="lg">
                Simpan Data
              </Button>
              <Link href="/admin/karyawan">
                <Button type="button" variant="quiet" size="lg">
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

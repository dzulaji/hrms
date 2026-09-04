import AdminLayout from '@/Components/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Stat } from '@/components/pouf/readout';
import { Table } from '@/components/pouf/table';
import { PieChart } from '@/components/pouf/charts';

const tableColumns = [
  { key: 'nama', header: 'Nama', render: (r) => r.nama },
  { key: 'jabatan', header: 'Jabatan', render: (r) => r.jabatan },
  { key: 'status', header: 'Status', render: (r) => (
      <span className={`px-2 py-1 text-[11px] font-bold uppercase rounded-pill ${r.status === 'Aktif' ? 'bg-mint text-ink' : 'bg-pink text-ink'}`}>
        {r.status}
      </span>
  )},
];

const tableRows = [
  { id: 1, nama: 'Budi Santoso', jabatan: 'Software Engineer', status: 'Aktif' },
  { id: 2, nama: 'Siti Aminah', jabatan: 'HR Manager', status: 'Aktif' },
  { id: 3, nama: 'Andi Wijaya', jabatan: 'Marketing', status: 'Cuti' },
  { id: 4, nama: 'Rina Marlina', jabatan: 'Designer', status: 'Aktif' },
];

const chartData = [
  { key: 'engineering', label: 'Engineering', value: 45, tone: 'purple' },
  { key: 'marketing', label: 'Marketing', value: 25, tone: 'mint' },
  { key: 'hr', label: 'HR', value: 10, tone: 'pink' },
  { key: 'design', label: 'Design', value: 20, tone: 'yellow' },
];
export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard" breadcrumb={[{ label: 'Dashboard' }]}>
      <Head title="Dashboard" />
      
      <div className="flex flex-col gap-6 p-4">
        <h1 className="text-3xl font-black text-ink">Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat 
            label="USERS" 
            value="1,284" 
            icon="users" 
            tone="purple" 
          />
          <Stat 
            label="ACTIVE" 
            value="312" 
            icon="target" 
            tone="mint" 
          />
          <Stat 
            label="REVENUE" 
            value="+$4,290" 
            icon="up" 
            tone="yellow" 
          />
          <Stat 
            label="CHURN" 
            value="-0.4%" 
            icon="down" 
            tone="pink" 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex-1 bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] p-6">
            <h2 className="text-xl font-black text-ink mb-6">Recent Employees</h2>
            <Table 
              columns={tableColumns}
              rows={tableRows}
              getKey={(row) => row.id.toString()}
            />
          </div>

          <div className="w-full lg:w-1/3 bg-surface shadow-[var(--pouf-card)] rounded-[var(--r-card)] p-6 flex flex-col">
            <h2 className="text-xl font-black text-ink mb-6">Department Distribution</h2>
            <div className="flex-1 flex items-center justify-center">
              <PieChart data={chartData} donut={true} labelled={true} height={250} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

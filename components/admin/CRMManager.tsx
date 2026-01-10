
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

interface CRMData {
  appointments: any[];
  preorders: any[];
  inquiries: any[];
  corporate: any[];
}

export const CRMManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [data, setData] = useState<CRMData>({ appointments: [], preorders: [], inquiries: [], corporate: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [apps, pre, inq, corp] = await Promise.all([
        supabase.from('appointments').select('*').order('created_at', { ascending: false }),
        supabase.from('preorders').select('*').order('created_at', { ascending: false }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('corporate_requests').select('*').order('created_at', { ascending: false })
      ]);
      
      setData({
        appointments: apps.data || [],
        preorders: pre.data || [],
        inquiries: inq.data || [],
        corporate: corp.data || []
      });
    } catch (err) {
      console.error("Error fetching CRM data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TABS = [
    { id: 'appointments', label: 'Appointments' },
    { id: 'preorders', label: 'Pre-Orders' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'inquiries', label: 'Inquiries' },
  ];

  const renderTable = () => {
    if (loading) return <div className="p-8 text-center text-slate-500">Loading CRM data...</div>;

    let items: any[] = [];
    let columns: any[] = [];
    
    switch (activeTab) {
      case 'appointments':
        items = data.appointments;
        columns = [
          { header: 'Name', accessor: (i:any) => i.full_name },
          { header: 'Date', accessor: (i:any) => i.appointment_date ? new Date(i.appointment_date).toLocaleDateString() : 'Pending' },
          { header: 'Type', accessor: (i:any) => i.visit_type },
          { header: 'Contact', accessor: (i:any) => i.email }
        ];
        break;
      case 'preorders':
        items = data.preorders;
        columns = [
          { header: 'Customer', accessor: (i:any) => i.full_name },
          { header: 'Vehicle', accessor: (i:any) => `${i.brand} ${i.model || ''}` },
          { header: 'Color', accessor: (i:any) => i.color || '-' },
          { header: 'Date', accessor: (i:any) => new Date(i.created_at).toLocaleDateString() }
        ];
        break;
      case 'corporate':
        items = data.corporate;
        columns = [
          { header: 'Company', accessor: (i:any) => i.company_name },
          { header: 'Contact', accessor: (i:any) => i.contact_person },
          { header: 'Fleet Size', accessor: (i:any) => i.fleet_size_interest },
          { header: 'Status', accessor: (i:any) => i.status }
        ];
        break;
      case 'inquiries':
        items = data.inquiries;
        columns = [
          { header: 'From', accessor: (i:any) => i.name },
          { header: 'Subject', accessor: (i:any) => i.subject || 'General' },
          { header: 'Status', accessor: (i:any) => i.status },
          { header: 'Date', accessor: (i:any) => new Date(i.created_at).toLocaleDateString() }
        ];
        break;
    }

    if (items.length === 0) return <div className="p-12 text-center text-slate-500 bg-white/5 rounded-xl border border-dashed border-white/10">No records found.</div>;

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-xs text-slate-400 uppercase tracking-widest">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 font-medium">{col.header}</th>
              ))}
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {items.map((item: any) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="p-4 text-slate-300">{col.accessor(item)}</td>
                ))}
                <td className="p-4 text-right">
                   <button className="text-empathon-rust hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
                      Details
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-empathon-navy/50 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-empathon-rust text-white shadow-lg shadow-empathon-rust/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
        {renderTable()}
      </div>
    </div>
  );
};

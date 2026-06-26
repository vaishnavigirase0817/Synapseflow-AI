import React, { useState } from 'react';

const MOCK_REPORTS = Array.from({ length: 45 }).map((_, i) => ({
  id: `REP-${1000 + i}`,
  name: `Export Data Batch ${i + 1}`,
  status: i % 5 === 0 ? 'Failed' : i % 3 === 0 ? 'Processing' : 'Completed',
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  size: `${(Math.random() * 10 + 1).toFixed(2)} MB`,
}));

export default function Reports() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const itemsPerPage = 10;

  // Search
  let filtered = MOCK_REPORTS.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  filtered.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-glow-emerald bg-glow-emerald/10 border-glow-emerald/20';
      case 'Processing': return 'text-primary-400 bg-primary-500/10 border-primary-500/20';
      case 'Failed': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-main/60 bg-glass/5 border-glass/10';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Reports</h1>
          <p className="text-sm text-main/50">View, search, and download your generated data.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-main/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-xl text-sm text-main placeholder-main/30 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
          />
        </div>
      </div>

      <div className="glass rounded-xl border border-glass/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-main/70">
            <thead className="bg-glass/[0.02] border-b border-glass/[0.06] text-main/40 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                {['ID', 'Name', 'Status', 'Date', 'Size'].map((col) => (
                  <th 
                    key={col} 
                    className="px-6 py-4 cursor-pointer hover:text-main transition-colors group"
                    onClick={() => requestSort(col.toLowerCase())}
                  >
                    <div className="flex items-center gap-2">
                      {col}
                      {sortConfig.key === col.toLowerCase() && (
                        <svg className="w-3 h-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sortConfig.direction === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((report) => (
                <tr key={report.id} className="hover:bg-glass/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-main/50">{report.id}</td>
                  <td className="px-6 py-4 font-medium text-main/90">{report.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-main/50">{report.date}</td>
                  <td className="px-6 py-4 text-main/50">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-main/40">
                    No reports found matching "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-glass/[0.06] bg-glass/[0.01]">
            <span className="text-sm text-main/40">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-3 py-1 rounded-lg border border-glass/[0.08] text-sm text-main/70 hover:bg-glass/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-1 rounded-lg border border-glass/[0.08] text-sm text-main/70 hover:bg-glass/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

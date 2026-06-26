import React from 'react';

export default function Team() {
  const teamMembers = [
    { name: 'Jane Smith', role: 'Administrator', email: 'jane.smith@company.com', status: 'Active' },
    { name: 'John Doe', role: 'Editor', email: 'john.doe@company.com', status: 'Active' },
    { name: 'Alice Johnson', role: 'Viewer', email: 'alice.j@company.com', status: 'Invited' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Team Management</h1>
          <p className="text-sm text-main/50">Manage your team members and their roles.</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary-600 text-sm font-medium text-main hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/25">
          Invite Member
        </button>
      </div>

      <div className="glass rounded-xl border border-glass/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-main/70">
            <thead className="bg-glass/[0.02] border-b border-glass/[0.06] text-main/40 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {teamMembers.map((member, i) => (
                <tr key={i} className="hover:bg-glass/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-main/90 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 p-0.5">
                      <div className="w-full h-full rounded-full bg-surface-500 flex items-center justify-center">
                        <span className="text-xs font-medium text-main">{member.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                    </div>
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-main/50">{member.email}</td>
                  <td className="px-6 py-4 text-main/50">{member.role}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${member.status === 'Active' ? 'text-glow-emerald bg-glow-emerald/10 border-glow-emerald/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-main/40 hover:text-main transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

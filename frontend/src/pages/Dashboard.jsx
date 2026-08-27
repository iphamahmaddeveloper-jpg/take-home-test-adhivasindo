import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import ModuleCard from "../components/ModuleCard";
import ContentFormModal from "../components/ContentFormModal";
import Footer from "../components/Footer";
import { contentAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const leaderboard = [
  { rank: 1, name: "Panjia Faiza", class: "PEMROGRAMAN", modul: "L1", point: "1,234 Point" },
  { rank: 2, name: "Adit Setiawan", class: "PEMROGRAMAN", modul: "L2", point: "1,100 Point" },
  { rank: 3, name: "Rina Kartika", class: "CREATIVE MARKETING", modul: "L1", point: "980 Point" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const fetchContents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await contentAPI.list({ search, page, limit: 6 });
      setContents(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const handleCreate = () => {
    setEditingContent(null);
    setModalOpen(true);
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setModalOpen(true);
  };

  const handleDelete = async (content) => {
    if (!window.confirm(`Hapus modul "${content.title}"?`)) return;
    try {
      await contentAPI.remove(content.id);
      fetchContents();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingContent) {
        await contentAPI.update(editingContent.id, formData);
      } else {
        await contentAPI.create(formData);
      }
      setModalOpen(false);
      fetchContents();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan");
    }
  };

  return (
    /* Application Viewport Lock: h-screen overflow-hidden guarantees fixed sidebar */
    <div className="flex h-screen w-screen bg-[#f8fafc] overflow-hidden text-slate-800 antialiased">
      {/* Sidebar fixed to full viewport height */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Workspace - Independent Scrollable Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Mobile Header Bar */}
          <div className="flex md:hidden items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-xs mb-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-indigo-600 focus:outline-none text-xl"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                A
              </div>
              <span className="font-bold text-base text-slate-800">adhivasindo</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-xs text-indigo-600">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>

          {/* Top bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                Learning Management System
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                Selamat datang, <span className="font-semibold text-slate-700">{user?.name}</span> di LMS by Adhivasindo
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Cari modul..."
                className="border border-slate-200 rounded-full px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow-2xs"
              />
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-indigo-100 items-center justify-center font-semibold text-indigo-700 shrink-0 border border-indigo-200/50">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          </div>

          {/* Banner Hero Slate/Navy Modern */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between overflow-hidden relative shadow-sm"
          >
            <div className="max-w-md z-10">
              <span className="text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
                PEMROGRAMAN
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mt-2 leading-snug tracking-tight text-white">
                Pemrograman Frontend Modern dengan React dan Angular
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Materi kompetensi pemrograman untuk mengembangkan skill frontend modern.
              </p>
              <button className="mt-4 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition shadow-xs">
                Mulai Learning
              </button>
            </div>
          </motion.div>

          {/* Modul Kompetensi Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-slate-800 text-lg">Modul Kompetensi</h3>
            <button
              onClick={handleCreate}
              className="w-full sm:w-auto bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition text-center shadow-xs"
            >
              + Tambah Modul
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 border border-red-100">{error}</div>
          )}

          {loading ? (
            <p className="text-sm text-slate-400">Memuat data...</p>
          ) : contents.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada modul. Klik "Tambah Modul" untuk membuat.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contents.map((c) => (
                <ModuleCard key={c.id} content={c} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium ${
                    p === page ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Nilai Peserta */}
          <div className="bg-white rounded-2xl shadow-2xs border border-slate-200 p-4 sm:p-5">
            <h3 className="font-bold text-slate-800 mb-4 text-base sm:text-lg">Nilai Peserta</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-medium">Rank</th>
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Class</th>
                    <th className="pb-2 font-medium">Modul</th>
                    <th className="pb-2 font-medium">Point</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row) => (
                    <tr key={row.rank} className="border-b border-slate-50 last:border-0">
                      <td className="py-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs">
                        {row.rank}
                      </span>
                    </td>
                      <td className="py-3 font-medium text-slate-700">{row.name}</td>
                      <td className="py-3 text-slate-500">{row.class}</td>
                      <td className="py-3 text-slate-500">{row.modul}</td>
                      <td className="py-3 font-semibold text-indigo-600">{row.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      <ContentFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingContent}
      />
    </div>
  );
}

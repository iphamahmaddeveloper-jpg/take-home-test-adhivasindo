import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContentFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail_url: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "",
        description: initialData.description || "",
        thumbnail_url: initialData.thumbnail_url || "",
      });
    } else {
      setForm({ title: "", category: "", description: "", thumbnail_url: "" });
    }
  }, [initialData, open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {initialData ? "Edit Modul" : "Tambah Modul"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="title"
                required
                placeholder="Judul modul"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                name="category"
                required
                placeholder="Kategori (Pemrograman, dll)"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                name="description"
                placeholder="Deskripsi"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                name="thumbnail_url"
                placeholder="URL thumbnail (opsional)"
                value={form.thumbnail_url}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

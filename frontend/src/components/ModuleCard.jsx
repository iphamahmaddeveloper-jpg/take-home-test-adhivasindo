import { motion } from "framer-motion";

const categoryBadgeStyles = {
  PEMROGRAMAN: "bg-indigo-50 text-indigo-700 border-indigo-100",
  "CREATIVE MARKETING": "bg-amber-50 text-amber-700 border-amber-100",
  "MANAGEMENT SDM": "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default function ModuleCard({ content, onEdit, onDelete }) {
  const categoryKey = content.category?.toUpperCase();
  const badgeStyle =
    categoryBadgeStyles[categoryKey] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className="bg-white rounded-xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-sm p-5 flex flex-col justify-between transition-all group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${badgeStyle}`}
          >
            {content.category || "General"}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {content.author?.name ? `By ${content.author.name}` : "Modul Skill"}
          </span>
        </div>

        <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
          {content.title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
          {content.description || "Tidak ada deskripsi modul."}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <span>📖</span> Modul Pembelajaran
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(content)}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-slate-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(content)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-100 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </motion.div>
  );
}

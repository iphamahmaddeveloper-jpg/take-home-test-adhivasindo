export default function Footer() {
  return (
    <footer className="mt-12 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              A
            </div>
            <span className="font-extrabold text-base text-slate-900 tracking-tight">adhivasindo</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Learning Management System terdepan untuk pengembangan kompetensi & keahlian IT profesional.
          </p>
        </div>

        {/* Kontak */}
        <div className="space-y-2 text-xs text-slate-600">
          <h4 className="font-bold text-slate-900 text-sm mb-2 tracking-tight">Kontak Kami</h4>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8M3.6 15h16.8" />
            </svg>
            <a
              href="https://adhivasindo.co.id"
              target="_blank"
              rel="noreferrer"
              className="text-slate-900 hover:underline font-semibold"
            >
              adhivasindo.co.id
            </a>
          </p>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium text-slate-700">022-7508499</span>
          </p>
          <p className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-slate-700">admin@adhivasindo.co.id</span>
          </p>
        </div>

        {/* Alamat */}
        <div className="space-y-2 text-xs text-slate-600">
          <h4 className="font-bold text-slate-900 text-sm mb-2 tracking-tight">Alamat Kantor</h4>
          <p className="leading-relaxed flex items-start gap-2">
            <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-slate-600 leading-relaxed font-medium">
              Jln. Edelweiss CRC 011 Ruko Crystal Summarecon, Kec. Gedebage, Kota Bandung
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 mt-6 pt-4 text-center text-xs font-medium text-slate-400">
        &copy; {new Date().getFullYear()} Adhivasindo. All rights reserved.
      </div>
    </footer>
  );
}

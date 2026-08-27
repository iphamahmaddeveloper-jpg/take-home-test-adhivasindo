import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Clean SVG Monochrome Icons
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SpeakerIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: HomeIcon, badge: null },
  { id: "modul", label: "Modul", icon: BookIcon, badge: "12" },
  { id: "peserta", label: "Peserta", icon: UsersIcon, badge: "240+" },
  { id: "chat", label: "Group Chat", icon: ChatIcon, badge: "3" },
  { id: "pemateri", label: "Pemateri", icon: SpeakerIcon, badge: null },
];

const profileItems = [
  { id: "settings", label: "Settings", icon: SettingsIcon },
  { id: "kalender", label: "Kalender", icon: CalendarIcon },
];

export default function Sidebar({ mobileOpen, onClose, isCollapsed, onToggleCollapse }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Monochrome */}
      <aside
        className={`h-full shrink-0 bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          mobileOpen
            ? "fixed inset-y-0 left-0 w-64 z-50 translate-x-0 shadow-2xl"
            : "hidden md:flex"
        }`}
      >
        {/* Header */}
        <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
              A
            </div>
            {(!isCollapsed || mobileOpen) && (
              <div className="leading-tight min-w-0">
                <span className="font-extrabold text-slate-900 text-base block truncate tracking-tight">
                  adhivasindo
                </span>
                <span className="text-[10px] font-semibold text-slate-400 block tracking-wider uppercase">
                  LMS Portal
                </span>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-lg transition text-xs font-bold"
            title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
          >
            {isCollapsed ? "➔" : "⬅"}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-900 p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            {(!isCollapsed || mobileOpen) && (
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-2 mb-2">
                Menu Utama
              </p>
            )}
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                    title={isCollapsed && !mobileOpen ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    } ${isCollapsed && !mobileOpen ? "justify-center" : ""}`}
                  >
                    <span className="shrink-0">
                      <IconComponent />
                    </span>
                    {(!isCollapsed || mobileOpen) && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {(!isCollapsed || mobileOpen) && item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          isActive
                            ? "bg-slate-800 text-slate-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {(!isCollapsed || mobileOpen) && (
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-2 mb-2">
                Pengaturan
              </p>
            )}
            <div className="space-y-1">
              {profileItems.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                    title={isCollapsed && !mobileOpen ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    } ${isCollapsed && !mobileOpen ? "justify-center" : ""}`}
                  >
                    <span className="shrink-0">
                      <IconComponent />
                    </span>
                    {(!isCollapsed || mobileOpen) && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Bottom User Card & Logout */}
        <div className="p-3 border-t border-slate-100 shrink-0 space-y-2">
          {(!isCollapsed || mobileOpen) ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user?.email || "user@adhivasindo.co.id"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div
                className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs"
                title={user?.name}
              >
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            title={isCollapsed && !mobileOpen ? "Log Out" : undefined}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition ${
              isCollapsed && !mobileOpen ? "px-0" : ""
            }`}
          >
            <span>
              <LogOutIcon />
            </span>
            {(!isCollapsed || mobileOpen) && <span>Keluar Akun</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

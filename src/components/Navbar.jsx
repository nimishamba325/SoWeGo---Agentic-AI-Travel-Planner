import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' 
import { LogOut, ChevronDown, User, Settings } from 'lucide-react'
import logo from '../assets/logo.png' 

const Navbar = () => {
  const { currentUser, logout } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-2 pointer-events-none bg-black/50 backdrop-blur-2xl border-b border-white/10"
    >
      <style>{`
        @keyframes neon-underline {
          0%, 100% { 
            box-shadow: 0 3px 10px rgba(20, 255, 236, 0.5), 
                        inset 0 -2px 5px rgba(20, 255, 236, 0.2);
            border-bottom-color: rgba(20, 255, 236, 0.6);
          }
          50% { 
            box-shadow: 0 3px 15px rgba(20, 255, 236, 0.8), 
                        inset 0 -2px 8px rgba(20, 255, 236, 0.3);
            border-bottom-color: rgba(20, 255, 236, 1);
          }
        }
        
        @keyframes neon-glow-strong {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(20, 255, 236, 0.5), 
                        0 0 20px rgba(20, 255, 236, 0.3),
                        inset 0 0 12px rgba(20, 255, 236, 0.12);
            border-color: rgba(20, 255, 236, 0.6);
          }
          50% { 
            box-shadow: 0 0 18px rgba(20, 255, 236, 0.7), 
                        0 0 30px rgba(20, 255, 236, 0.4),
                        inset 0 0 15px rgba(20, 255, 236, 0.18);
            border-color: rgba(20, 255, 236, 0.9);
          }
        }
        
        .nav-underline-active {
          animation: neon-underline 3s ease-in-out infinite;
          border-bottom: 2px solid rgba(20, 255, 236, 0.6);
        }
        
        .nav-item-strong {
          animation: neon-glow-strong 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* 🛡️ LEFT WING: Logo Capsule (Unchanged) */}
        <motion.div 
          className="pointer-events-auto backdrop-blur-2xl bg-black/40 border border-white/10 px-6 py-2 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          whileHover={{ scale: 1.02, border: '1px solid rgba(20,255,236,0.3)' }}
        >
          <Link to="/" className="flex items-center hover:opacity-100 transition-opacity">
            <img 
              src={logo} 
              alt="SoWeGo" 
              className="h-14 w-auto object-contain logo-glow" 
            />
          </Link>
        </motion.div>
        
        {/* 🛡️ RIGHT WING: Neon Nav Items */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Home Button */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-3 rounded-lg bg-black/30 backdrop-blur-md hover:bg-black/50 transition-all duration-300 text-sm font-bold uppercase tracking-wider text-white ${
              location.pathname === '/' ? 'nav-underline-active' : ''
            }`}
          >
            Home
          </motion.a>

          {/* Features Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/features"
              className={`px-6 py-3 rounded-lg bg-black/30 backdrop-blur-md hover:bg-black/50 transition-all duration-300 text-sm font-bold uppercase tracking-wider text-white block ${
                location.pathname === '/features' ? 'nav-underline-active' : ''
              }`}
            >
              Features
            </Link>
          </motion.div>

          {/* Get Started Button - Stronger Glow */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="nav-item-strong px-8 py-3 rounded-lg border border-[#14FFEC] bg-gradient-to-r from-[#14FFEC]/20 to-[#00D4D4]/20 backdrop-blur-md hover:from-[#14FFEC]/30 hover:to-[#00D4D4]/30 transition-all duration-300 text-sm font-black uppercase tracking-wider text-white shadow-lg"
          >
            Get Started
          </motion.button>

          {/* User Profile Dropdown */}
          {currentUser && (
            <div className="relative border-l border-[#14FFEC]/30 pl-6" ref={dropdownRef}>
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 hover:opacity-100 transition-opacity"
              >
                <img
                  src={currentUser.photoURL}
                  referrerPolicy="no-referrer"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#14FFEC]/50 shadow-[0_0_20px_rgba(20,255,236,0.5)]"
                />
                <ChevronDown size={18} className={`text-[#14FFEC] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-6 w-72 glass-card border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="p-6 border-b border-white/5 bg-white/5">
                      <p className="text-sm font-black text-white truncate mb-1">{currentUser.displayName}</p>
                      <p className="text-[10px] text-[#14FFEC] truncate font-bold uppercase tracking-widest">{currentUser.email}</p>
                    </div>
                    <div className="p-3 space-y-1">
                      <button className="flex w-full items-center gap-4 px-4 py-4 text-[10px] font-black text-slate-300 hover:bg-[#14FFEC]/10 hover:text-[#14FFEC] rounded-xl transition-all uppercase tracking-widest">
                        <User size={16} /> Fiduciary Profile
                      </button>
                      <button className="flex w-full items-center gap-4 px-4 py-4 text-[10px] font-black text-slate-300 hover:bg-[#14FFEC]/10 hover:text-[#14FFEC] rounded-xl transition-all uppercase tracking-widest">
                        <Settings size={16} /> System Prefs
                      </button>
                      <div className="h-[1px] bg-white/5 my-2" />
                      <button
                        onClick={async () => { await logout(); navigate('/'); }}
                        className="flex w-full items-center gap-4 px-4 py-4 text-[10px] font-black text-red-500 hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-widest"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
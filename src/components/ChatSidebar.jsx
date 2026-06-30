import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Plus, Edit2, Trash2, Menu, MoreHorizontal, MessageSquare } from 'lucide-react'

// Helper for saving (can be kept here or moved to a utility file)
const saveChatStorage = (chats) => localStorage.setItem('cyber_chats', JSON.stringify(chats))

const ChatSidebar = ({ isOpen, setIsOpen, chats, onNewIntent }) => {
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const navigate = useNavigate()
  const { chatId: activeChatId } = useParams()
  const dropdownRef = useRef(null)

  // Click outside listener for the 3-dot menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRenameSave = (chatId) => {
    // We update the local storage and then navigate to force a refresh if needed,
    // though in a perfect state setup, you'd pass setChats as a prop too.
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, title: renameValue } : chat
    )
    saveChatStorage(updatedChats);
    setRenamingId(null);
    // Refresh page to sync or better: call a setChats prop if you add it to App.jsx
    window.location.reload(); 
  };

  const handleDelete = (e, chatIdToDelete) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this intent history?')) {
      const updatedChats = chats.filter((chat) => chat.id !== chatIdToDelete);
      saveChatStorage(updatedChats);
      setOpenDropdownId(null);

      if (activeChatId === chatIdToDelete) {
        navigate('/assistant');
      }
      // Refresh to sync global state
      window.location.reload();
    }
  }

  return (
    <div className={`flex h-full flex-col bg-[#050505] border-r border-white/5 p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8 pt-6 px-1">
        {isOpen && <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] opacity-80">Neural History</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-[#14FFEC] transition-colors p-1">
          <Menu size={20} />
        </button>
      </div>

      {/* 🛡️ FIXED NEW INTENT BUTTON */}
      <button
        onClick={onNewIntent}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-white transition-all hover:bg-[#14FFEC]/5 hover:border-[#14FFEC]/30 group"
      >
        <Plus size={18} className="text-[#14FFEC] group-hover:rotate-90 transition-transform" />
        {isOpen && <span className="font-bold tracking-tight">New Intent</span>}
      </button>

      {/* History List */}
      <div className="mt-6 flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {chats?.map((chat) => (
          <div 
            key={chat.id} 
            className={`group relative flex items-center rounded-lg transition-all ${
              chat.id === activeChatId ? 'bg-[#14FFEC]/10 text-[#14FFEC]' : 'hover:bg-white/5 text-slate-400'
            }`}
          >
            <Link to={`/assistant/${chat.id}`} className="flex-1 px-3 py-3 text-xs truncate">
              {isOpen && renamingId === chat.id ? (
                <input
                  value={renameValue}
                  className="bg-transparent border-b border-[#14FFEC] outline-none w-full text-[#14FFEC]"
                  onChange={(e) => setRenameValue(e.target.value)}
                  autoFocus
                  onBlur={() => handleRenameSave(chat.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameSave(chat.id)}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <MessageSquare size={14} className={chat.id === activeChatId ? 'text-[#14FFEC]' : 'text-slate-500'} />
                  {isOpen && <span className="truncate">{chat.title}</span>}
                </div>
              )}
            </Link>

            {/* 3-DOT MENU */}
            {isOpen && (
              <div className="relative pr-2" ref={openDropdownId === chat.id ? dropdownRef : null}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDropdownId(openDropdownId === chat.id ? null : chat.id);
                  }}
                  className="p-1 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
                >
                  <MoreHorizontal size={14} />
                </button>

                {openDropdownId === chat.id && (
                  <div className="absolute right-0 top-full mt-1 z-[100] w-32 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                    <button
                      onClick={() => { setRenamingId(chat.id); setRenameValue(chat.title); setOpenDropdownId(null); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-[10px] uppercase font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Edit2 size={12} /> Rename
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, chat.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-[10px] uppercase font-bold text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
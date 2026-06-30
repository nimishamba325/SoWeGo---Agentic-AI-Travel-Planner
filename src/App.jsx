import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, useParams, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from './context/AuthContext' 
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Features from './components/Features'
// 🛡️ Footer import completely removed
import AssistantPage from './components/AssistantPage'
import ChatSidebar from './components/ChatSidebar'
import LoginPage from './components/LoginPage' 

// 🛡️ PUBLIC LAYOUT: Shares the Navbar between Hero (Landing) and Login
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

// 🛡️ CHAT APP LAYOUT: Enforces security and manages travel intent history
const ChatAppLayout = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();

  // 1. GATEKEEPER: Redirect to Hero if session is terminated or invalid
  if (!currentUser) return <Navigate to="/" />;

  // 2. Load Neural History from LocalStorage
  useEffect(() => {
    const savedChats = localStorage.getItem('cyber_chats');
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
    }
    setIsLoaded(true);
  }, []);

  // 3. Sync history updates to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cyber_chats', JSON.stringify(chats));
    }
  }, [chats, isLoaded]);

  // 4. Centralized New Intent Handler
  const handleNewIntent = () => {
    const newId = uuidv4();
    const newChat = {
      id: newId,
      title: `Intent ${chats.length + 1}`,
      timestamp: new Date().toISOString(),
      messages: [], 
    };

    setChats(prev => [newChat, ...prev]);
    navigate(`/assistant/${newId}`);
  };

  return (
    <div className="flex h-screen pt-[68px] overflow-hidden bg-black"> 
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        chats={chats}
        onNewIntent={handleNewIntent}
      />
      
      <div className="flex-1 h-full overflow-hidden">
        <Outlet context={{ chats, setChats }} />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 🛡️ Entrance Workflow */}
          <Route element={<PublicLayout />}>
            <Route 
              path="/" 
              element={
                <main>
                  <HomePage />
                  {/* 🛡️ HomePage includes CityBackground, Hero, and ZoomEarthSection */}
                </main>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          
          {/* 🛡️ IMMERSIVE FEATURES ROUTE: Standalone page without the Navbar */}
          <Route path="/features" element={<Features />} />
          
          {/* 🛡️ Protected Execution Layer (Assistant) */}
          <Route element={<ChatAppLayout />}>
            <Route path="/assistant/:chatId" element={<AssistantPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
          </Route>

          {/* 🛡️ Fallback: Redirect unknown paths to Landing Page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom' // 🛡️ Import Link for routing
import { ArrowLeft } from 'lucide-react' // 🛡️ Import back arrow icon

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
      className="relative group cursor-pointer h-full"
    >
      <div className="relative backdrop-blur-xl bg-slate-800/40 border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-[#14FFEC]/20 hover:bg-slate-800/60">
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#14FFEC]/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, rgba(20, 255, 236, 0.5), rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px'
          }}
        />
        
        <div className="relative z-10">
          <motion.div 
            className="text-5xl mb-4"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#14FFEC] group-hover:to-blue-400 transition-all duration-300">
            {title}
          </h3>
          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const Features = () => {
  const features = [
    {
      icon: '🧠',
      title: 'Agentic ReAct Loop',
      description: 'Moves beyond passive search to autonomous execution. Utilizing the ReAct framework, our agents engage in multi-step reasoning; Thought, Action, and Observation; to orchestrate complex travel logistics.',
    },
    {
      icon: '🧬',
      title: 'Traveler DNA',
      description: 'A gamified behavioral profiling engine that maps implicit user choices into a high-dimensional vector space. This solves the user cold-start problem by understanding your unique travel genome.',
    },
    {
      icon: '🏛️',
      title: 'Fiduciary Orchestration',
      description: 'An orchestration layer that acts as a financial gatekeeper. It enforces strict data rules to provide structured JSON schemas for optimized itineraries and accurate budget breakdowns.',
    },
    {
      icon: '🔍',
      title: 'Hyper-Local RAG',
      description: 'Grounds AI agents in regional authenticity via FAISS vector databases. We bypass generic tourist traps by indexing hidden gems specifically for the Mangalore-to-Goa coastal corridor.',
    },
    {
      icon: '🛡️',
      title: 'Neural History',
      description: 'Maintains a persistent state of past intents via LocalStorage. This ensures seamless session continuity, allowing the AI to remember your preferences and previous interactions across every journey.',
    },
    {
      icon: '⚡',
      title: 'Resilient Intelligence',
      description: 'Built for high-concurrency with a dedicated Resiliency Loop. Our backend utilizes exponential backoff strategies to handle API demand, ensuring 24/7 availability for critical planning.',
    },
  ]

  const topRowFeatures = features.slice(0, 3);
  const bottomRowFeatures = features.slice(3, 6);

  const scrollToNextStage = (e) => {
    e.preventDefault();
    document.getElementById('stage-2').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative bg-gradient-to-b from-black via-slate-900 to-navy-900 text-white selection:bg-[#14FFEC]/30">
      
      {/* 🛡️ NAVIGATE BACK BUTTON */}
      <div className="fixed top-8 left-8 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#14FFEC]/50 hover:bg-white/10 transition-all group shadow-xl"
        >
          <ArrowLeft size={18} className="text-slate-400 group-hover:text-[#14FFEC] transition-colors" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">
            Back to Hub
          </span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* =========================================================
            STAGE 1: Perfect Full-Screen Centering
            ========================================================= */}
        <div className="min-h-screen flex flex-col justify-center pt-24 pb-8 relative">
          
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-white uppercase tracking-tighter"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative inline-block">
                  Autonomous Systems
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-[#14FFEC] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
              </motion.h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto italic mt-6">
                Transitioning from passive information retrieval to Intent Execution
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topRowFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* 🛡️ Scroll Indicator cleanly anchored at the bottom of the screen */}
          <motion.button 
            onClick={scrollToNextStage}
            className="flex flex-col items-center justify-center mx-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer group mt-12 pb-4"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#14FFEC] mb-2 group-hover:text-white transition-colors">
              System Architecture
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14FFEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.button>
        </div>

        {/* =========================================================
            STAGE 2: Full Screen for Bottom Row
            ========================================================= */}
        <div id="stage-2" className="min-h-screen flex items-center justify-center border-t border-white/5 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {bottomRowFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}

export default Features
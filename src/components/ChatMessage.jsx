import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import DayCard from './DayCard'
import BudgetPieChart from './BudgetPieChart'
import { MapPin, Calendar, IndianRupee, ArrowRight, ExternalLink } from 'lucide-react'

// Avatar component with updated colors
const Avatar = ({ role }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg ${
    role === 'user' ? 'bg-purple-600' : 'bg-[#14FFEC]/10 border border-[#14FFEC]/30'
  }`}>
    {role === 'user' ? 
      <span className="text-xs font-bold">U</span> : 
      <span className="text-[10px] font-bold text-[#14FFEC]">AI</span>
    }
  </div>
)

const LoadingDots = () => (
  <div className="flex space-x-1.5 py-2">
    {[0, 0.15, 0.3].map((delay, i) => (
      <motion.div 
        key={i}
        className="w-2 h-2 bg-[#14FFEC] rounded-full" 
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }} 
        transition={{ duration: 1, repeat: Infinity, delay }} 
      />
    ))}
  </div>
)

const ItineraryHeader = ({ data }) => {
  const destination = data.destination || data.itinerary_title?.split(' ').pop() || 'travel';
  const bgImageUrl = `https://source.unsplash.com/400x200/?${destination},city`;
  const showBudget = data.estimated_budget && !data.estimated_budget.toLowerCase().includes('not provided');

  return (
    <motion.div
      className="relative overflow-hidden mb-4 rounded-[24px] border border-white/10 shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImageUrl})` }} />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      <div className="relative z-10 p-6">
        <h2 className="text-xl font-bold text-white mb-3 tracking-tight">{data.itinerary_title}</h2>
        {data.start_location && (
          <div className="flex items-center gap-2 text-[#14FFEC] font-medium mb-4 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{data.start_location}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-50" />
            <span className="truncate">{data.destination}</span>
          </div>
        )}
        <div className="flex gap-5 text-slate-300 text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-[#14FFEC]" />
            <span>{data.total_days} Days</span>
          </div>
          {showBudget && (
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
              <IndianRupee className="w-3.5 h-3.5 text-[#14FFEC]" />
              <span>{data.estimated_budget}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const ChatMessage = ({ role, content, isLoading = false }) => {
  const isUser = role === 'user'
  
  let contentToShow;

  if (isLoading) {
    contentToShow = <LoadingDots />
  } else if (isUser) {
    contentToShow = (
      <div className="prose prose-invert max-w-none text-black font-semibold">
        <ReactMarkdown>{typeof content === 'string' ? content : content.reply}</ReactMarkdown>
      </div>
    )
  } else if (content.itinerary_title) {
    contentToShow = (
      <div className="space-y-4">
        <ItineraryHeader data={content} />
        
        <motion.a
          href="https://www.skyscanner.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-4 bg-[#14FFEC]/10 border border-[#14FFEC]/30 text-[#14FFEC] rounded-[20px] transition-all hover:bg-[#14FFEC]/20 hover:shadow-[0_0_20px_rgba(20,255,236,0.15)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ExternalLink size={16} />
          <span className="font-bold text-xs uppercase tracking-wider">Book Flights & Hotels on Skyscanner</span>
        </motion.a>

        <div className="space-y-3">
          {content.days.map((day, index) => (
            <DayCard key={day.day} dayData={day} index={index} />
          ))}
        </div>
      </div>
    )
  } else if (content.budget_plan) {
    contentToShow = <BudgetPieChart data={content} />
  } else {
    contentToShow = (
      <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed">
        <ReactMarkdown>{content.reply || content}</ReactMarkdown>
      </div>
    )
  }

  return (
    <motion.div
      className={`flex gap-4 mb-8 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {!isUser && <Avatar role={role} />}
      
      <div className={`relative px-6 py-4 max-w-[85%] md:max-w-[70%] transition-all duration-300 ${
        isUser 
          ? 'bg-[#14FFEC] text-black rounded-[24px] rounded-tr-none shadow-[0_0_25px_rgba(20,255,236,0.25)]' 
          : 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] rounded-tl-none shadow-2xl'
      }`}>
        {contentToShow}
      </div>
      
      {isUser && <Avatar role={role} />}
    </motion.div>
  )
}

export default ChatMessage
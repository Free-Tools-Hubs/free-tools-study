import { Zap, X, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const StreakBanner = () => {
  const { streak } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (streak > 0) {
      setIsVisible(true);
    }
  }, [streak]);

  if (!isVisible || streak === 0) return null;

  return (
    <div className="bg-primary text-white py-3 px-6 flex items-center justify-between animate-fade-in relative overflow-hidden">
      <div className="flex items-center gap-3 relative z-10">
        <div className="bg-white/20 p-1.5 rounded-lg">
          <Zap className="w-5 h-5 fill-white" />
        </div>
        <p className="font-bold text-sm md:text-base">
          {streak} Day Study Streak! {streak > 3 ? 'You are on fire! 🔥' : 'Keep it going!'}
        </p>
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-32 h-32 bg-white/10 blur-[40px] rounded-full"></div>
    </div>
  );
};

export default StreakBanner;

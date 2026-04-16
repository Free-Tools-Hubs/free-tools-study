import { useEffect } from 'react';

interface AdSlotProps {
  id: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

/**
 * AdSense Placeholder component
 * In production, this would initialize Google AdSense
 */
const AdSlot = ({ id, format = 'auto', className = '' }: AdSlotProps) => {
  useEffect(() => {
    // In a real environment with AdSense:
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={`ad-container my-8 overflow-hidden flex flex-col items-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">Advertisement</span>
      <div 
        className="ad-placeholder w-full flex items-center justify-center min-h-[100px]"
        id={id}
        data-ad-format={format}
      >
        <div className="flex flex-col items-center opacity-40">
          <div className="w-12 h-12 border-2 border-slate-300 rounded animate-pulse mb-2"></div>
          <div className="w-32 h-2 bg-slate-300 rounded mb-1"></div>
          <div className="w-24 h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default AdSlot;

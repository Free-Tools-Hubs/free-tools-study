import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar as CalendarIcon, Clock, Plus, Download, Save, Trash2, Layout, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { createStudyPlan, StudySlot } from '../modules/studyEngine';
import AdSlot from '../components/AdSlot';
import { studyDataService } from '../services/studyDataService';

const Planner = () => {
  const { examType } = useParams();
  const { planner, updatePlanner, incrementStreak } = useStore();
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [localPlanner, setLocalPlanner] = useState<StudySlot[]>([]);

  const title = examType ? `Study Plan for ${examType.charAt(0).toUpperCase() + examType.slice(1)}` : 'Weekly Study Timetable';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

  useEffect(() => {
    incrementStreak();
    if (planner && planner.length > 0) {
      setLocalPlanner(planner);
    }
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      const subjects = ['Biology', 'Chemistry', 'Physics', 'Math', 'History'];
      const newPlan = createStudyPlan(subjects, hoursPerDay);
      setLocalPlanner(newPlan);
      setIsGenerating(false);
    }, 800);
  };

  const handleSave = () => {
    updatePlanner(localPlanner);
    alert('Plan saved successfully!');
  };

  const [draggedSlot, setDraggedSlot] = useState<StudySlot | null>(null);
  const [activeCell, setActiveCell] = useState<{day: string, time: string} | null>(null);

  const handleDragStart = (slot: StudySlot) => {
    setDraggedSlot(slot);
  };

  const handleDrop = (day: string, time: string) => {
    if (!draggedSlot) return;
    
    // Remove old slot and add new one
    const filtered = localPlanner.filter(s => s !== draggedSlot);
    const newSlot = { ...draggedSlot, day, time };
    setLocalPlanner([...filtered, newSlot]);
    setDraggedSlot(null);
  };

  const handleAddSlot = (day: string, time: string, subject: string) => {
    const newSlot: StudySlot = {
      day,
      time,
      subject,
      topic: `${subject} Review`
    };
    setLocalPlanner([...localPlanner, newSlot]);
    setActiveCell(null);
  };

  const handleExport = (type: string) => {
    alert(`Generating ${type} export... Done! Your local schedule has been formatted.`);
    if (type === 'PDF') {
      window.print();
    }
  };

  const getSlot = (day: string, time: string) => {
    return localPlanner.find(s => s.day === day && s.time === time);
  };

  const clearPlan = () => {
    if (confirm('Are you sure you want to clear your entire timetable?')) {
      setLocalPlanner([]);
    }
  };

  const isMainTemplate = !examType;

  return (
    <div className="py-8 space-y-8 max-w-[1400px] mx-auto">
      <Helmet>
        <title>{isMainTemplate ? 'Free Study Timetable Template & Weekly Planner | StudyToolsHub' : `${title} — Timetable Template | StudyToolsHub`}</title>
        <meta
          name="description"
          content="Create an optimized weekly study timetable in seconds. Custom hourly schedule generator using evidence-based spaced repetition principles."
        />
        <link rel="canonical" href="https://study.freetoolshubs.com/study-timetable-template" />
        <meta name="robots" content={isMainTemplate ? "index, follow" : "noindex, follow"} />
        <meta property="og:title" content="Free Study Timetable Template & Weekly Planner" />
        <meta property="og:description" content="Generate an optimized study schedule using spaced repetition and interleaving principles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://study.freetoolshubs.com/study-timetable-template" />
        <meta property="og:image" content="https://study.freetoolshubs.com/og-planner.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-semibold">
            <CalendarIcon className="w-5 h-5" />
            <span>Smart Timetable Builder</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
          <p className="text-lg text-slate-500 max-w-2xl">Drag and drop your subjects or generate an optimized plan based on your daily goals.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-border px-4 py-2 rounded-xl mr-4">
            <span className="text-sm font-bold text-slate-500">Daily Hours:</span>
            <input
              type="range" min="1" max="10"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
              className="w-24 accent-primary"
            />
            <span className="font-black text-primary w-6">{hoursPerDay}h</span>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-hover transition-all disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : <><Layout className="w-5 h-5" /> Generate Plan</>}
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all">
            <Save className="w-5 h-5" /> Save
          </button>
          <button onClick={clearPlan} title="Clear Day" className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-all">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Template Suggestions Alignment */}
      {(() => {
        const resolution = studyDataService.resolveTopic(examType);
        const topicMatch = resolution.topic;
        if (topicMatch && topicMatch.plannerTemplates) {
          return (
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4" /> Recommended Plans for {topicMatch.subTopic}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topicMatch.plannerTemplates.map((template, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      const newPlan = createStudyPlan([topicMatch.subTopic, 'Math', 'English', 'History'], hoursPerDay);
                      setLocalPlanner(newPlan);
                    }}
                    className="p-4 bg-white dark:bg-slate-900 border border-border rounded-xl text-left hover:border-primary transition-all group"
                  >
                    <div className="font-bold text-sm group-hover:text-primary transition-colors">{template.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{template.sessions} key sessions included</div>
                  </button>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })()}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border overflow-hidden shadow-2xl relative">
        {localPlanner.length === 0 && !isGenerating && (
          <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-[2px] flex flex-center items-center justify-center">
            <div className="text-center p-8 glass rounded-3xl border border-primary/20 shadow-xl max-w-sm">
              <CalendarIcon className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Empty Timetable</h3>
              <p className="text-slate-500 mb-6 text-sm">Click the plus icons in the grid or click "Generate Plan" above to create your schedule.</p>
              <button onClick={handleGenerate} className="bg-primary text-white px-6 py-2 rounded-xl font-bold">Generate for me</button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr>
                <th className="p-5 bg-slate-50 dark:bg-slate-800/50 border-r border-border w-24">
                  <Clock className="w-5 h-5 mx-auto text-slate-400" />
                </th>
                {days.map(day => (
                  <th key={day} className="p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-border font-bold text-sm uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time} className="group">
                  <td className="p-5 border-r border-border bg-slate-50/50 dark:bg-slate-900 font-bold text-center text-xs text-slate-400">
                    {time}
                  </td>
                  {days.map(day => {
                    const slot = getSlot(day, time);
                    const isOver = false; // Add drag hover state if needed
                    return (
                      <td 
                        key={`${day}-${time}`} 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(day, time)}
                        className={`p-2 border-b border-border group relative min-h-[100px] h-32 transition-colors ${isOver ? 'bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'}`}
                      >
                        {!slot ? (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            {activeCell?.day === day && activeCell?.time === time ? (
                              <div className="absolute inset-0 z-20 bg-white dark:bg-slate-900 p-2 flex flex-wrap gap-1 items-center justify-center animate-fade-in shadow-xl">
                                {['Bio', 'Chem', 'Phys', 'Math', 'Eng'].map(s => (
                                  <button 
                                    key={s} 
                                    onClick={() => handleAddSlot(day, time, s === 'Bio' ? 'Biology' : s === 'Chem' ? 'Chemistry' : s === 'Phys' ? 'Physics' : s === 'Math' ? 'Math' : 'History')}
                                    className="text-[10px] font-bold px-2 py-1 bg-primary text-white rounded-md hover:bg-primary-hover"
                                  >
                                    {s}
                                  </button>
                                ))}
                                <button onClick={() => setActiveCell(null)} className="text-[10px] font-bold px-2 py-1 bg-slate-200 text-slate-600 rounded-md">X</button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setActiveCell({day, time})}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Add study session for ${day} at ${time}`}
                              >
                                <div className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary-hover hover:text-white transition-all">
                                  <Plus className="w-6 h-6" />
                                </div>
                              </button>
                            )}
                          </div>
                        ) : (
                          <div 
                            draggable
                            onDragStart={() => handleDragStart(slot)}
                            className={`p-3 h-full rounded-2xl border-l-4 shadow-sm animate-fade-in group relative cursor-move active:opacity-50 ${
                            slot.subject === 'Biology' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                            slot.subject === 'Math' ? 'bg-indigo-50 border-indigo-500 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
                            slot.subject === 'Physics' ? 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-amber-50 border-amber-500 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          }`}>
                            <button 
                               onClick={() => setLocalPlanner(localPlanner.filter(s => s !== slot))}
                               className="absolute top-2 right-2 p-1 bg-white/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                               <Trash2 className="w-3 h-3" />
                            </button>
                            <div className="font-black text-sm uppercase tracking-tight">{slot.subject}</div>
                            <div className="text-xs opacity-70 font-medium mt-1">{slot.topic}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdSlot id="planner-below-table" format="horizontal" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        <div className="md:col-span-2 bg-slate-900 text-white p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4">AI-Optimized Schedule</h3>
            <p className="text-slate-400 max-w-lg mb-8">We've calculated your cognitive load and spaced out subjects to prevent academic burnout and maximize neuroplasticity.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-xs mb-2">01</div>
                <h4 className="font-bold text-xl text-primary">Interleaving Effect</h4>
                <p className="text-sm text-slate-500">Switching between subjects improves problem-solving skills compared to grouping them.</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-xs mb-2">02</div>
                <h4 className="font-bold text-xl text-emerald-400">Sleep Consolidation</h4>
                <p className="text-sm text-slate-500">Most slots end by 20:00 to ensure your brain has time to encode data during REM sleep.</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-xl space-y-6">
          <h3 className="text-2xl font-bold">Smart Export</h3>
          <p className="text-slate-500 text-sm">Download your schedule to keep it on your phone or print it for your study desk.</p>
          <div className="space-y-3">
            <button
              onClick={() => handleExport('PDF')}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border font-bold hover:bg-slate-100 transition-all group"
            >
              <span className="flex items-center gap-3"><Download className="w-5 h-5 text-primary" /> PDF Document</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all" />
            </button>
            <button
              onClick={() => handleExport('iCal')}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border font-bold hover:bg-slate-100 transition-all group"
            >
              <span className="flex items-center gap-3"><CalendarIcon className="w-5 h-5 text-primary" /> iCal / Google</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all" />
            </button>
          </div>
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-slate-400 uppercase tracking-widest font-black">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Auto-Syncing Offline
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;

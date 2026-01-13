
import React, { useState, useEffect } from 'react';
import { Section, Quest } from './types';
import { 
  MANIFESTO_TEXT, 
  AGENT_SCHEMAS, 
  CORE_QUESTS, 
  PERFECT_DAY_FLOW 
} from './constants';
import { getOrchestratorAdvice } from './services/gemini';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// --- Sidebar Component ---
const Sidebar: React.FC<{ current: Section; set: (s: Section) => void }> = ({ current, set }) => {
  const items: { id: Section; icon: string; label: string }[] = [
    { id: 'MANIFESTO', icon: 'fa-book-open', label: 'Manifesto' },
    { id: 'PLAYBOOK', icon: 'fa-chess', label: 'Playbook' },
    { id: 'AGENTS', icon: 'fa-robot', label: 'Agent Schema' },
    { id: 'PERFECT_DAY', icon: 'fa-calendar-day', label: 'Perfect Day' },
    { id: 'XP_MATH', icon: 'fa-calculator', label: 'XP Math' },
    { id: 'QUESTS', icon: 'fa-trophy', label: 'Quests' },
    { id: 'TRACKER', icon: 'fa-database', label: 'Notion Tracker' },
  ];

  return (
    <div className="w-64 h-screen bg-[#111] border-r border-[#222] flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-[#222]">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-crown text-amber-500"></i> ARCHITECT
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => set(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              current === item.id ? 'bg-[#333] text-white' : 'text-gray-400 hover:bg-[#222]'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-[#222]">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <i className="fa-solid fa-bolt text-amber-500"></i>
          <span className="text-xs font-bold text-amber-500 uppercase">System Active</span>
        </div>
      </div>
    </div>
  );
};

// --- XP Math Section ---
const XPMath: React.FC = () => {
  const [effort, setEffort] = useState(5);
  const xpValue = Math.round(Math.pow(effort, 2) * 10);
  
  const data = Array.from({ length: 10 }, (_, i) => ({
    effort: i + 1,
    xp: Math.round(Math.pow(i + 1, 2) * 10)
  }));

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">XP Algorithms</h2>
        <p className="text-gray-400">Defining the relationship between deep work and meta-progression.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#222]">
          <h3 className="text-lg font-semibold mb-4 text-amber-500">Effort Calculator</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Perceived Effort (1-10)</label>
              <input 
                type="range" min="1" max="10" 
                value={effort} 
                onChange={(e) => setEffort(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-[#333] h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Maintenance</span>
                <span>Ascension</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[#222]">
              <div className="text-sm text-gray-400">Potential XP Reward</div>
              <div className="text-5xl font-black text-white">{xpValue} <span className="text-xl text-gray-500">XP</span></div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#222]">
          <h3 className="text-lg font-semibold mb-4 text-blue-500">Progression Curve</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="effort" stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="xp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-[#111] border border-[#222] p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">The Logic</h3>
        <p className="text-gray-400 leading-relaxed mb-4">
          Rewards are non-linear. To encourage mastery and "Legendary" output, XP is calculated as <code className="text-amber-500">Effort² * 10</code>. 
          A simple task requires almost zero cognitive overhead, while high-effort "Deep Work" provides exponentially more growth.
        </p>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('MANIFESTO');
  const [quests, setQuests] = useState<Quest[]>(CORE_QUESTS);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const toggleQuest = (id: string) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const handleAskAI = async () => {
    setLoadingAi(true);
    const advice = await getOrchestratorAdvice("How do I handle an agent disagreement regarding the family calendar vs professional deep work?");
    setAiResponse(advice);
    setLoadingAi(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'MANIFESTO':
        return (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-1000">
            <div className="prose prose-invert prose-amber">
              <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-300 font-light">
                {MANIFESTO_TEXT.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('#') ? 'text-3xl font-bold text-white mt-8 mb-4' : 'mb-4'}>
                    {line.startsWith('#') ? line.replace(/#/g, '').trim() : line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      case 'AGENTS':
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold">Agent Orchestration Schema</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {AGENT_SCHEMAS.map((agent, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-[#222] rounded-2xl overflow-hidden notion-shadow">
                  <div className="bg-[#222] px-6 py-4 flex justify-between items-center">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <i className="fa-solid fa-microchip text-blue-500"></i> {agent.name}
                    </h3>
                    <span className="text-xs font-mono px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">v1.0.4</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-400 italic">"{agent.primaryDirective}"</p>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Notion Database Schema</h4>
                      <div className="flex flex-wrap gap-2">
                        {agent.notionProperties.map((prop, j) => (
                          <span key={j} className="text-xs bg-[#333] px-3 py-1 rounded-full text-gray-300 border border-[#444]">{prop}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#222]">
                      <h4 className="text-xs font-bold uppercase text-red-500 mb-1">Failure Protocol</h4>
                      <p className="text-sm text-gray-400">{agent.failureHandling}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'PLAYBOOK':
        return (
          <div className="max-w-4xl space-y-8 animate-in zoom-in-95 duration-500">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold mb-2">The AI Playbook</h2>
                <p className="text-gray-400">Step-by-step orchestration for the modern architect.</p>
              </div>
              <button 
                onClick={handleAskAI}
                disabled={loadingAi}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all flex items-center gap-2"
              >
                {loadingAi ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                AI Consulting
              </button>
            </header>

            {aiResponse && (
              <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-xl text-amber-100 text-sm leading-relaxed whitespace-pre-wrap">
                <div className="font-bold mb-2 flex items-center gap-2 text-amber-500">
                  <i className="fa-solid fa-brain"></i> AI ADVICE:
                </div>
                {aiResponse}
              </div>
            )}

            <div className="space-y-4">
              {[
                { step: 1, title: 'Directive Definition', desc: 'Identify a repetitive task and define its success parameters clearly.' },
                { step: 2, title: 'Context Construction', desc: 'Package essential knowledge (PC folders, manuals) into compressed context blocks.' },
                { step: 3, title: 'Agent Selection', desc: 'Assign the task to the appropriate specialized agent schema.' },
                { step: 4, title: 'Human-in-the-Loop Handshake', desc: 'Establish the exact moment the agent must pause for manual sovereign review.' },
                { step: 5, title: 'Audit & Iterate', desc: 'Review the last 10 tasks and refine the prompt or schema properties.' }
              ].map((s) => (
                <div key={s.step} className="flex gap-6 p-6 bg-[#1a1a1a] border border-[#222] rounded-xl hover:border-[#333] transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'PERFECT_DAY':
        return (
          <div className="max-w-4xl animate-in slide-in-from-top-4 duration-500">
            <h2 className="text-3xl font-bold mb-6">The "Perfect Day" Flow</h2>
            <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden notion-shadow">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#222] text-gray-400 border-b border-[#333]">
                    <th className="px-6 py-3 font-medium uppercase tracking-wider w-24">Time</th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 font-medium uppercase tracking-wider w-32">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222]">
                  {PERFECT_DAY_FLOW.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-amber-500">{item.time}</td>
                      <td className="px-6 py-4 text-gray-200">{item.activity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          item.category === 'Body' ? 'bg-green-500/10 text-green-400' :
                          item.category === 'Mind' ? 'bg-purple-500/10 text-purple-400' :
                          item.category === 'Family' ? 'bg-rose-500/10 text-rose-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-gray-500 italic">Note: This protocol is for offline execution. All digital distractions are minimized during Deep Work periods.</p>
          </div>
        );
      case 'QUESTS':
        return (
          <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-2">Core Quests (MVP)</h2>
            <div className="grid gap-4">
              {quests.map((q) => (
                <div 
                  key={q.id} 
                  onClick={() => toggleQuest(q.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                    q.completed 
                      ? 'bg-green-500/5 border-green-500/30' 
                      : 'bg-[#1a1a1a] border-[#222] hover:border-[#444]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center border ${
                    q.completed ? 'bg-green-500 border-green-500 text-black' : 'border-[#444]'
                  }`}>
                    {q.completed && <i className="fa-solid fa-check text-xs"></i>}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm ${q.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{q.title}</h4>
                    <span className="text-[10px] uppercase font-bold text-gray-500">{q.category} • {q.difficulty}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-mono font-bold ${q.completed ? 'text-green-500' : 'text-amber-500'}`}>+{q.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'XP_MATH':
        return <XPMath />;
      case 'TRACKER':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold">Notion Operational Tracker</h2>
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#222] border-dashed flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center text-gray-500">
                <i className="fa-solid fa-table-list text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">External Database Synced</h3>
                <p className="text-gray-400 max-w-sm">Connect your Notion workspace to mirror your Quest status and Agent schemas in real-time.</p>
              </div>
              <button className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                Connect Notion API
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar current={activeSection} set={setActiveSection} />
      <main className="ml-64 flex-1 p-10 pb-24 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Global XP Progress Bar Fixed Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-[#111]/80 backdrop-blur-md border-t border-[#222] p-4 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-500">Level 12 Architect</span>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2 bg-[#222] rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-amber-500 rounded-full"></div>
              </div>
              <span className="text-xs font-mono text-amber-500 font-bold">2,450 / 3,000 XP</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-gray-500">Active Quests</span>
            <div className="text-sm font-bold text-white">{quests.filter(q => q.completed).length} / {quests.length}</div>
          </div>
          <div className="text-right border-l border-[#222] pl-4">
            <span className="text-[10px] font-bold uppercase text-gray-500">Current Phase</span>
            <div className="text-sm font-bold text-blue-500 uppercase">Empire Expansion</div>
          </div>
        </div>
      </div>
    </div>
  );
}

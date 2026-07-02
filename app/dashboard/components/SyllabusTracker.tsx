"use client";

import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Target } from 'lucide-react';

// THE MASTER SYLLABUS DATABASE
const SYLLABUS_DB: Record<string, any[]> = {
  "JEE": [
    { subject: "Physics", color: "text-blue-400", chapters: ["Kinematics", "Rotational Dynamics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"] },
    { subject: "Chemistry", color: "text-amber-400", chapters: ["Stoichiometry", "Chemical Bonding", "Equilibrium", "Coordination Compounds", "GOC", "Aldehydes & Ketones"] },
    { subject: "Mathematics", color: "text-rose-400", chapters: ["Complex Numbers", "Calculus (Limits to Integrals)", "Coordinate Geometry", "Vectors & 3D", "Matrices & Determinants"] }
  ],
  "NEET": [
    { subject: "Biology", color: "text-emerald-400", chapters: ["Human Physiology", "Genetics & Evolution", "Plant Physiology", "Cell Structure", "Ecology", "Biotechnology"] },
    { subject: "Physics", color: "text-blue-400", chapters: ["Mechanics", "Thermodynamics", "Electrostatics", "Optics", "Electronic Devices"] },
    { subject: "Chemistry", color: "text-amber-400", chapters: ["Chemical Bonding", "Equilibrium", "p-Block Elements", "Organic: Hydrocarbons", "Biomolecules"] }
  ],
  "UPSC": [
    { subject: "Polity & Governance", color: "text-purple-400", chapters: ["Constitution", "Parliament", "Judiciary", "Panchayati Raj", "Rights Issues"] },
    { subject: "History & Culture", color: "text-orange-400", chapters: ["Ancient India", "Art & Architecture", "Modern Freedom Struggle", "Post-Independence"] },
    { subject: "Geography & Environment", color: "text-emerald-400", chapters: ["Physical Geography", "Indian Climate", "Biodiversity", "Climate Change"] }
  ],
  "SAT": [
    { subject: "Reading & Writing", color: "text-indigo-400", chapters: ["Information & Ideas", "Craft & Structure", "Expression of Ideas", "Standard English Conventions"] },
    { subject: "Math", color: "text-rose-400", chapters: ["Algebra", "Advanced Math", "Problem-Solving & Data", "Geometry & Trigonometry"] }
  ]
};

// Now the component takes the student's specific exam as a prop
export default function SyllabusTracker({ targetExam }: { targetExam: string }) {
  // Fallback to JEE if somehow the exam isn't in our DB yet
  const syllabusData = SYLLABUS_DB[targetExam] || SYLLABUS_DB["JEE"];
  
  // Default open to the first subject of their specific exam
  const [expandedSubject, setExpandedSubject] = useState<string | null>(syllabusData[0].subject);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topic: string) => {
    const newSet = new Set(completedTopics);
    if (newSet.has(topic)) {
      newSet.delete(topic);
    } else {
      newSet.add(topic);
    }
    setCompletedTopics(newSet);
  };

  const calculateProgress = () => {
    const total = syllabusData.reduce((acc, subj) => acc + subj.chapters.length, 0);
    if (total === 0) return 0;
    return Math.round((completedTopics.size / total) * 100);
  };

  return (
    <div className="w-full bg-[#0a0d12] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
            <Target className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Target {targetExam}</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Micro-Syllabus Tracker</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-xl font-black text-white">{calculateProgress()}%</span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500">Completed</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {syllabusData.map((subj) => {
          const isExpanded = expandedSubject === subj.subject;
          const subjCompleted = subj.chapters.filter((c: string) => completedTopics.has(c)).length;
          const subjTotal = subj.chapters.length;

          return (
            <div key={subj.subject} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-gray-700 bg-[#11161d]' : 'border-gray-800 bg-transparent'}`}>
              <button 
                onClick={() => setExpandedSubject(isExpanded ? null : subj.subject)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
                  <span className={`text-xs font-bold uppercase tracking-widest ${subj.color}`}>
                    {subj.subject}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider">
                  {subjCompleted} / {subjTotal}
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-2">
                  {subj.chapters.map((chapter: string) => {
                    const isDone = completedTopics.has(chapter);
                    return (
                      <button 
                        key={chapter}
                        onClick={() => toggleTopic(chapter)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${isDone ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-[#0a0d12] border border-gray-800 hover:border-gray-600'}`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-600 shrink-0" />
                        )}
                        <span className={`text-xs text-left transition-colors ${isDone ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                          {chapter}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
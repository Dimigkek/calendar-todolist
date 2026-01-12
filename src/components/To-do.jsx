import React, { useState } from 'react';
import { format } from "date-fns";
import API from '../api/axiosConfig';

const TodoModal = ({ date, onClose }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!taskTitle.trim()) return;

        setIsSaving(true);
        try {
            await API.post('/tasks', {
                title: taskTitle,
                date: date,
                category: 'Personal'
            });
            onClose();
        } catch (err) {
            console.error("Error saving task:", err);
            alert("Failed to save task. Please check your connection.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
            <div className="relative bg-slate-900/90 w-full max-w-lg rounded-[40px] p-10 shadow-[0_0_100px_rgba(79,70,229,0.2)] border border-white/10 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />

                <header className="flex justify-between items-start mb-10 relative z-10">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                            <div className={`w-1.5 h-1.5 rounded-full bg-indigo-400 ${isSaving ? 'animate-ping' : 'animate-pulse'}`} />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                {isSaving ? 'Saving...' : 'New Entry'}
                            </span>
                        </div>
                        <h3 className="text-4xl font-black text-white tracking-tighter">
                            {format(date, 'MMM d')}
                            <span className="text-slate-500 font-light ml-3">{format(date, 'yyyy')}</span>
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="group bg-white/5 p-4 rounded-2xl hover:bg-red-500/20 transition-all active:scale-90 border border-white/5"
                    >
                        <svg className="text-slate-400 group-hover:text-red-400 transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </header>

                <div className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.3em] mb-4 ml-2">
                            What are we achieving?
                        </label>
                        <textarea
                            autoFocus
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full bg-black/40 border-2 border-white/5 rounded-[30px] p-6 h-48 focus:bg-black/60 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-white text-xl placeholder-slate-600 shadow-inner resize-none"
                            placeholder="Type your task here..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-10 relative z-10">
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="py-5 text-slate-400 font-black hover:text-white hover:bg-white/5 rounded-[24px] transition-all active:scale-95 uppercase text-xs tracking-[0.2em]"
                    >
                        Nevermind
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isSaving || !taskTitle.trim()}
                        className="relative py-5 bg-indigo-600 text-white font-black rounded-[24px] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all active:scale-95 overflow-hidden group disabled:opacity-50"
                    >
                        <span className="relative z-10 uppercase text-xs tracking-[0.2em]">
                            {isSaving ? 'Storing...' : 'Save Task'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoModal;
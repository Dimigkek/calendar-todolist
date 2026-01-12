import React, { useState } from 'react';
import TodoModal from './To-do';
import { Logout } from "./Logout";
import {
    format, startOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, endOfMonth
} from 'date-fns';

const Calendar = ({ onLogout }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
            <div className={`flex-1 overflow-y-auto p-8 custom-scrollbar transition-all duration-500 ease-in-out ${isSidebarOpen ? 'mr-[450px]' : 'mr-0'}`}>
                <div className="max-w-5xl mx-auto">
                    <header className="flex justify-between items-center mb-12 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-md">
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="group flex items-center justify-center w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500 transition-all duration-300 active:scale-90"
                            title="Log Out"
                        >
                            <svg className="text-red-500 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                        </button>

                        <div>
                            <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-2 text-center">Schedule</p>
                            <h2 className="text-5xl font-black tracking-tighter text-white">
                                {format(currentMonth, 'MMMM')} <span className="text-slate-500 font-light">{format(currentMonth, 'yyyy')}</span>
                            </h2>
                        </div>

                        <div className="flex gap-3 bg-black/20 p-2 rounded-2xl border border-white/5">
                            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-6 py-2 bg-indigo-500/10 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 rounded-xl transition-all font-black text-xs uppercase tracking-widest text-indigo-400 active:scale-90">Prev</button>
                            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-6 py-2 bg-indigo-500/10 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 rounded-xl transition-all font-black text-xs uppercase tracking-widest text-indigo-400 active:scale-90">Next</button>
                        </div>
                    </header>

                    <div className="grid grid-cols-7 gap-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest pb-4">{d}</div>
                        ))}
                        {days.map((day, idx) => {
                            const isToday = isSameDay(day, new Date());
                            const isSelected = isSameDay(day, selectedDate);
                            return (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        setSelectedDate(day);
                                    }}
                                    className={`h-36 p-5 rounded-[30px] transition-all duration-300 border-2 cursor-pointer relative group
                                    ${!isSameMonth(day, currentMonth) ? 'opacity-10 scale-95' : 'opacity-100'}
                                    ${isSelected ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'}
                                    ${isToday ? 'after:content-[""] after:absolute after:top-3 after:right-3 after:w-2 after:h-2 after:bg-indigo-400 after:rounded-full after:animate-ping' : ''}`}
                                >
                                    <span className={`text-2xl font-black ${isSelected ? 'text-indigo-400' : 'text-slate-100'}`}>{format(day, 'd')}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`fixed top-1/2 -translate-y-1/2 z-[60] w-10 h-20 bg-indigo-600 border border-white/10 rounded-l-2xl flex items-center justify-center transition-all duration-500 ease-in-out hover:bg-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.4)]
                ${isSidebarOpen ? 'right-[450px]' : 'right-0 rounded-l-2xl rounded-r-none'}`}
            >
                <svg
                    className={`text-white transition-transform duration-500 ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="m15 18-6-6 6-6"/>
                </svg>
            </button>

            <div className={`fixed top-0 right-0 h-full w-[450px] bg-slate-900/40 backdrop-blur-3xl border-l border-white/10 flex flex-col p-10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out z-50 
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        Selected Date
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
                        {format(selectedDate, 'EEEE')}<br/>
                        <span className="text-indigo-400 italic text-2xl font-light">{format(selectedDate, 'MMMM do')}</span>
                    </h3>
                </div>

                <div className="flex-1">
                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-white/5 to-transparent border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 text-2xl">⚡</div>
                        <p className="text-slate-500 font-medium text-sm">No plans yet.<br/>Start by adding a new goal!</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative mt-8 w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-3xl transition-all active:scale-95 overflow-hidden shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
                        <span className="text-2xl">+</span> Add New Task
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>
            </div>

            {isModalOpen && <TodoModal date={selectedDate} onClose={() => setIsModalOpen(false)} />}

            <Logout
                isOpen={isLogoutModalOpen}
                onConfirm={onLogout}
                onCancel={() => setIsLogoutModalOpen(false)}
            />
        </div>
    );
};

export default Calendar;
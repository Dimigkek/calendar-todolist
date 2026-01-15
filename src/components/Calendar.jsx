import React, { useState, useEffect, useContext } from 'react';
import TodoModal from './To-do';
import { Logout } from "./Logout";
import { AuthContext } from "../context/AuthContext";
import {
    format, startOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, endOfMonth
} from 'date-fns';
import API from "../api/axiosConfig";

const Calendar = ({ onLogout }) => {

    const { user } = useContext(AuthContext);
    const username = user?.username || 'User';

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [tasks, setTasks] = useState([]);
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = eachDayOfInterval({ start, end });

    const fetchTasks = async () => {
        try {
            const res = await API.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error("Error loading tasks", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            fetchTasks(); // Refresh the list
        } catch (err) {
            console.error("Error deleting task", err);
        }
    };

    const toggleTask = async (id) => {
        try {
            await API.patch(`/tasks/${id}/toggle`);
            fetchTasks(); // Refresh UI
        } catch (err) {
            console.error("Error toggling task", err);
        }
    };


    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative">

            <div className={`fixed top-8 z-[70] transition-all duration-500 ease-in-out ${isSidebarOpen ? 'right-[480px]' : 'right-8'}`}>
                <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="group flex items-center gap-3 pl-4 pr-2 py-2 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 rounded-full backdrop-blur-xl transition-all duration-300 active:scale-95 shadow-2xl"
                >
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">
                        Log Out
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center bg-red-500/20 rounded-full group-hover:bg-red-500 transition-all">
                        <svg
                            className="text-red-500 group-hover:text-white transition-colors"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18" height="18"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </div>
                </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-8 custom-scrollbar transition-all duration-500 ease-in-out ${isSidebarOpen ? 'mr-[450px]' : 'mr-0'}`}>

                <div className="mb-10 pl-4 animate-in fade-in slide-in-from-left duration-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[2px] bg-indigo-500 rounded-full" />
                        <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Overview</span>
                    </div>
                    <h2 className="text-6xl font-black text-white tracking-tighter">
                        Welcome, <span className="text-indigo-500">{username}</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium mt-1">Ready to crush your goals today?</p>
                </div>

                <div className="max-w-5xl mx-auto">

                    <header className="relative flex justify-between items-center mb-12 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-md shadow-2xl">

                        <div className="w-[120px]" />

                        <div className="flex flex-col items-center justify-center flex-1">
                            <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-2 text-center">
                                Schedule
                            </p>
                            <h2 className="text-5xl font-black tracking-tighter text-white text-center whitespace-nowrap">
                                {format(currentMonth, 'MMMM')} <span className="text-slate-500 font-light">{format(currentMonth, 'yyyy')}</span>
                            </h2>
                        </div>

                        {/* NAVIGATION BUTTONS (RIGHT) */}
                        <div className="flex gap-3 bg-black/20 p-2 rounded-2xl border border-white/5 w-[120px] justify-end">
                            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="w-10 h-10 flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 rounded-xl transition-all font-black text-xs active:scale-90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="w-10 h-10 flex items-center justify-center bg-indigo-500/10 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 rounded-xl transition-all font-black text-xs active:scale-90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-7 gap-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest pb-4">{d}</div>
                        ))}
                        {days.map((day, idx) => {
                            const isToday = isSameDay(day, new Date());
                            const isSelected = isSameDay(day, selectedDate);
                            // Logic for task dots
                            const hasTasks = tasks.some(task => isSameDay(new Date(task.date), day));

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedDate(day)}
                                    className={`h-36 p-5 rounded-[30px] transition-all duration-300 border-2 cursor-pointer relative group
                                    ${!isSameMonth(day, currentMonth) ? 'opacity-10 scale-95' : 'opacity-100'}
                                    ${isSelected ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'}
                                    ${isToday ? 'after:content-[""] after:absolute after:top-3 after:right-3 after:w-2 after:h-2 after:bg-indigo-400 after:rounded-full after:animate-ping' : ''}`}
                                >
                                    <span className={`text-2xl font-black ${isSelected ? 'text-indigo-400' : 'text-slate-100'}`}>{format(day, 'd')}</span>

                                    {hasTasks && (
                                        <div className="absolute bottom-4 left-5 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                    )}
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

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {tasks.filter(t => isSameDay(new Date(t.date), selectedDate)).map(task => (
                        <div key={task._id} className={`p-6 rounded-[32px] border transition-all group flex items-center justify-between gap-4 mb-4
        ${task.completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-white/10 hover:border-indigo-500/30'}`}>

                            <div className="flex items-center gap-4 flex-1">
                                <button
                                    onClick={() => toggleTask(task._id)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border
                    ${task.completed
                                        ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white'}`}
                                    title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                >
                                    {task.completed ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    )}
                                </button>

                                <div className="flex-1">
                                    <p className={`font-medium leading-relaxed transition-all ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                        {task.title}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md 
                        ${task.completed ? 'bg-slate-500/10 text-slate-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                        {task.category || 'Goal'}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteTask(task._id)}
                                className="p-3 rounded-xl text-slate-600 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </button>
                        </div>
                    ))}
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

            {isModalOpen && (
                <TodoModal
                    date={selectedDate}
                    onClose={() => {
                        setIsModalOpen(false);
                        fetchTasks();
                    }}
                />
            )}

            <Logout
                isOpen={isLogoutModalOpen}
                onConfirm={onLogout}
                onCancel={() => setIsLogoutModalOpen(false)}
            />
        </div>
    );
};

export default Calendar;
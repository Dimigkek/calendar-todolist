import React, { useState } from 'react';
import API from '../../api/axiosConfig';

const Register = ({ onRegister, onSwitchToLogin }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/auth/register', formData);

            alert(response.data.message || "Registration Successful! Check your email.");
            onRegister();

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            alert(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
            <div className="relative bg-slate-900/60 backdrop-blur-2xl w-full max-w-md rounded-[40px] p-10 border border-white/10 shadow-2xl">
                <button
                    onClick={onSwitchToLogin}
                    className="absolute top-8 left-8 p-3 bg-white/5 hover:bg-indigo-500/20 rounded-2xl border border-white/5 transition-all active:scale-90 group"
                >
                    <svg
                        className="text-slate-400 group-hover:text-indigo-400 transition-colors"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Create Account</h1>
                    <p className="text-slate-500 text-sm">Join the premium planning experience</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 ml-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-4 text-white focus:border-indigo-500/50 outline-none transition-all"
                            placeholder="johndoe"
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 ml-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-4 text-white focus:border-indigo-500/50 outline-none transition-all"
                            placeholder="name@email.com"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 ml-2">Password</label>
                            <input
                                type="password"
                                className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-4 text-white focus:border-indigo-500/50 outline-none transition-all"
                                placeholder="••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 mt-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-500 transition-all active:scale-95 uppercase tracking-widest text-xs"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        Already have an account?
                        <span
                            onClick={onSwitchToLogin}
                            className="text-indigo-400 ml-2 cursor-pointer hover:underline"
                        >
                            Log In
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
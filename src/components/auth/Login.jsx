import React, { useState } from 'react';
import API from '../../api/axiosConfig';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/auth/login', formData);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            alert("Login Successful!");

            onLogin();

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Check your credentials.";
            alert(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
            <div className="relative bg-slate-900/60 backdrop-blur-2xl w-full max-w-md rounded-[40px] p-12 border border-white/10 shadow-2xl overflow-hidden">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Welcome Back</h1>
                    <p className="text-slate-500 text-sm font-medium">Log in to your calendar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3 ml-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-4 text-white focus:border-indigo-500/50 outline-none transition-all shadow-inner"
                            placeholder="name@company.com"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3 ml-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-black/40 border-2 border-white/5 rounded-2xl p-4 text-white focus:border-indigo-500/50 outline-none transition-all shadow-inner"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-500 transition-all active:scale-95 uppercase tracking-widest text-xs"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        Don't have an account?
                        <span
                            onClick={onSwitchToRegister}
                            className="text-indigo-400 ml-2 cursor-pointer hover:underline decoration-2 underline-offset-4 transition-all"
                        >
                            Create One
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
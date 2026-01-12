import React from 'react';

export const VerifyEmailView=({onBackToLogin})=>{
    return(
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
            <div className="relative bg-slate-900/60 backdrop-blur-2xl w-full max-w-md rounded-[40px] p-12 border border-white/10 shadow-2xl text-center overflow-hidden">

                <div className="relative mx-auto w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-8 border border-indigo-500/20">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>

                <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Check your inbox</h2>
                <p className="text-slate-400 font-medium leading-relaxed mb-10">
                    We've sent a verification link to your email. Please click it to activate your insane new dashboard.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => window.open('https://mail.google.com', '_blank')}
                        className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-500 transition-all active:scale-95 uppercase tracking-widest text-xs"
                    >
                        Open Gmail
                    </button>

                    <button
                        onClick={onBackToLogin}
                        className="w-full py-5 text-slate-500 font-black hover:text-white transition-all uppercase tracking-widest text-[10px]"
                    >
                        Back to Login
                    </button>
                </div>

                <p className="mt-8 text-xs text-slate-600 font-bold uppercase tracking-widest">
                    Didn't get it? <span className="text-indigo-400 cursor-pointer hover:underline">Resend Email</span>
                </p>
            </div>
        </div>
    );

};
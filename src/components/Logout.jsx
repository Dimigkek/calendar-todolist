export const Logout = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="bg-[#111827] w-full max-w-md rounded-[60px] p-12 relative shadow-2xl animate-in fade-in zoom-in-90 border border-white/5">

                <div className="text-center">
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-4">
                        Wait a second...
                    </h3>
                    <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                        Are you sure you want to end your session? You'll need to log back in to see your tasks.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onConfirm}
                        className="w-full py-5 bg-[#e11d48] text-white font-black rounded-[30px] shadow-lg hover:bg-red-500 transition-all active:scale-95 uppercase tracking-widest text-xs"
                    >
                        Yes, Sign Me Out
                    </button>

                    <button
                        onClick={onCancel}
                        className="w-full py-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};
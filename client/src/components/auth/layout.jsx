import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[url('/fashion-bg.jpg')] bg-cover bg-center relative font-sans">
      {/* Soft White Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[4px]"></div>

      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative z-10">
        <div className="relative space-y-8 text-center w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-12 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-slate-900"
          >
            <div className="flex justify-center mb-8">
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 className="p-5 bg-primary text-white rounded-2xl shadow-lg"
               >
                 <span className="text-4xl">👕</span>
               </motion.div>
            </div>
            
            <h1 className="text-6xl font-black tracking-tighter text-slate-950 mb-4">
              StyleTee Hub
            </h1>
            <p className="text-2xl text-slate-600 font-medium italic mb-10">
              "Where Fashion Meets Comfort"
            </p>
            
            <div className="space-y-6 text-left border-t border-slate-200/50 pt-10">
               <div className="flex items-center gap-4 text-slate-700 font-semibold">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                 </div>
                 <span>Premium Quality Fabric</span>
               </div>
               <div className="flex items-center gap-4 text-slate-700 font-semibold">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                 </div>
                 <span>Free Global Delivery</span>
               </div>
               <div className="flex items-center gap-4 text-slate-700 font-semibold">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                 </div>
                 <span>Easy 30-Day Returns</span>
               </div>

               {/* Social Proof Section */}
               <div className="mt-12 flex items-center justify-between px-6 py-5 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 leading-none">10k+ Happy Users</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">Join the club</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-3xl border border-white/60 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-slate-900">
            <Outlet />
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/shop/home" 
              className="group text-slate-600 hover:text-primary transition-all text-sm font-bold flex items-center justify-center gap-2"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to StyleTee Hub Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;


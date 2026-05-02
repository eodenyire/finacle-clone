import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '@/src/components/common/Logo';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    language: 'INFENG'
  });

  const [isNewUser, setIsNewUser] = useState(true);

  // Check if user has already completed setup
  const checkUserStatus = (userId: string) => {
    // If username is "emmanuel.anyira" (demo default) or in localStorage, it's an existing user
    const setupCompleted = localStorage.getItem(`setup_${userId}`);
    if (setupCompleted || userId.toLowerCase().includes('anyira')) {
      setIsNewUser(false);
    } else {
      setIsNewUser(true);
    }
  };

  const handleUserChange = (val: string) => {
    setFormData({ ...formData, userId: val });
    checkUserStatus(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNewUser) {
      if (!formData.password || !formData.newPassword || !formData.confirmPassword) {
        alert('Please fill in all password fields for initial setup.');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        alert('New Password and Confirm New Password do not match.');
        return;
      }
      // Save setup completion
      localStorage.setItem(`setup_${formData.userId}`, 'true');
    } else {
      if (!formData.password) {
        alert('Please enter your password.');
        return;
      }
    }

    if (formData.userId) {
      onLogin();
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="w-full h-screen bg-[#cccccc] flex items-center justify-center p-0 font-sans select-none overflow-hidden">
      <div className="w-full max-w-[800px] h-[500px] bg-[#efefef] border border-[#7f7f7f] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Left Decorative Red Triangle */}
        <div 
          className="absolute left-[-40px] bottom-[-20px] w-48 h-[110%] bg-[#ed1c20] z-0"
          style={{ clipPath: 'polygon(20% 0%, 100% 100%, 0% 100%)' }}
        ></div>

        {/* Top Right Logo Section */}
        <div className="absolute top-8 right-8 flex flex-col items-end">
          <Logo variant="combined-color" className="scale-75 origin-top-right transform-gpu" />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-8">
          <div className="text-center mb-10 ml-20">
            <h1 className="text-5xl font-medium text-black tracking-tight mb-0">Core Banking Solution</h1>
            <p className="text-2xl text-black font-normal mr-2">Version 7.0.9</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-fit ml-24">
            <div className="flex items-center gap-6">
              <label className="text-sm font-bold w-44 text-right whitespace-nowrap text-black">User Name:</label>
              <input 
                type="text"
                value={formData.userId}
                onChange={(e) => handleUserChange(e.target.value)}
                className="w-48 border border-[#7f7f7f] bg-white px-2 py-0.5 text-sm font-mono outline-none focus:bg-yellow-50 transition-colors"
                placeholder="User name"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="text-sm font-bold w-44 text-right whitespace-nowrap text-black">Password:</label>
              <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-48 border border-[#7f7f7f] bg-white px-2 py-0.5 text-sm font-mono outline-none focus:bg-yellow-50 transition-colors"
                placeholder={isNewUser ? "Initial Password" : "Password"}
              />
            </div>

            {isNewUser && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-6">
                  <label className="text-sm font-bold w-44 text-right whitespace-nowrap text-black">New Password:</label>
                  <input 
                    type="password"
                    placeholder="######"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className="w-48 border border-[#7f7f7f] bg-white px-2 py-0.5 text-sm font-mono outline-none focus:bg-yellow-50 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <label className="text-sm font-bold w-44 text-right whitespace-nowrap text-black">Confirm New Password:</label>
                  <input 
                    type="password"
                    placeholder="######"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-48 border border-[#7f7f7f] bg-white px-2 py-0.5 text-sm font-mono outline-none focus:bg-yellow-50 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            <div className="flex items-center gap-6 mt-1">
              <label className="text-sm font-bold w-44 text-right text-black">Language:</label>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select 
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-44 border border-[#7f7f7f] bg-white px-1 py-0.5 pr-6 text-xs font-mono outline-none appearance-none"
                  >
                    <option value="INFENG">INFENG</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none border-l border-[#7f7f7f] bg-slate-100">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-black"></div>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-[#d4d4d4] border border-[#7f7f7f] px-3 py-1 text-xs font-bold text-black shadow-[1px_1px_0px_rgba(255,255,255,0.7)_inset] active:shadow-inner hover:bg-[#c0c0c0] transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer with Infosys Logo */}
        <div className="p-4 flex items-end justify-between relative mt-auto">
          <div className="flex flex-col gap-1 z-10">
            <div className="h-px w-full bg-[#999999]/30 mb-2"></div>
            <p className="text-[10px] text-[#666666] ml-64 tracking-tight">
              Copyright © 2004-2005 Infosys Technologies Limited. All rights reserved. www.finacle.com
            </p>
          </div>
          
          <div className="flex flex-col items-end z-10">
            <Logo variant="infosys" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

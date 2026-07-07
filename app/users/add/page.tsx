"use client";
import { API_BASE_URL } from '@/utils/api';


import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    uuid: '',
    profilePic: '',
    password: '',
    confirmPassword: '',
    diamonds: 0,
    beans: 0,
  });

  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePreview(URL.createObjectURL(file));
      // ফাইলটি স্টেটে সেভ করা হচ্ছে, যাতে সাবমিটের সময় ব্যাকএন্ডে পাঠানো যায়। 
      setProfilePicFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // পাসওয়ার্ড ভ্যালিডেশন (পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড যেন সমান হয়)
    if (formData.password !== formData.confirmPassword) {
      alert('পাসওয়ার্ড মিলছে না!');
      return;
    }

    setIsLoading(true);
    
    // FormData তৈরি করা হচ্ছে কারণ আমরা ছবি আপলোড করবো
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('uuid', formData.uuid);
    data.append('password', formData.password);
    data.append('diamonds', formData.diamonds.toString());
    data.append('beans', formData.beans.toString());

    // যদি ইউজার ছবি সিলেক্ট করে থাকে
    if (profilePicFile) {
      data.append('profilePic', profilePicFile);
    } else if (formData.profilePic) {
      // যদি URL দিয়ে থাকে
      data.append('profilePic', formData.profilePic);
    }

    try {
      // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('সফলভাবে নতুন ইউজার তৈরি হয়েছে!');
        router.push('/users'); // সফল হলে ইউজার পেজে নিয়ে যাবে
      } else {
        const errorData = await response.text();
        alert('ইউজার তৈরি করতে সমস্যা হয়েছে: ' + errorData);
      }
    } catch (error) {
      alert('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
          <Link href="/users" className="hover:text-white transition">Users</Link>
          <span>/</span>
          <span className="text-gray-200 font-medium">Add New</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Create New User</h1>
        <p className="text-[var(--text-secondary)] text-sm">Add a new user manually to the platform.</p>
      </div>

      {/* Form Card */}
      <div className="bg-[#151520] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">Username <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="johndoe123"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              {/* UUID */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">UUID (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <input 
                    type="text" 
                    name="uuid"
                    value={formData.uuid}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Leave blank to auto-generate"
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-2 group md:col-span-2">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">Profile Picture</label>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-24 h-24 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center bg-[#0c0c1a] overflow-hidden group-hover:border-indigo-500 transition-colors">
                    {profilePreview ? (
                      <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      Choose Image
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-800 my-8" />
            <h3 className="text-lg font-bold text-white mb-4">Wallet Balance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diamonds */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-pink-400 transition-colors">Diamonds</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-pink-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <input 
                    type="number" 
                    name="diamonds"
                    value={formData.diamonds}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all duration-300"
                    min="0"
                  />
                </div>
              </div>

              {/* Beans */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-yellow-400 transition-colors">Beans</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-yellow-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <input 
                    type="number" 
                    name="beans"
                    value={formData.beans}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-800 my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-300 ml-1 group-focus-within:text-indigo-400 transition-colors">Confirm Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0c0c1a] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-800 mt-8">
              <Link 
                href="/users"
                className="px-6 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Create User
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

import React from 'react'

export default function TabButtonProfile({ active, onClick, icon, label }) {
  return (
    <button 
    onClick={onClick}
    className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 sm:py-4 text-xs sm:text-sm font-bold transition-all ${
      active ? 'border-t-2 sm:border-t border-black text-black' : 'text-gray-400 border-t-2 border-transparent'
    }`}
  >
    {icon} <span className="hidden md:inline uppercase">{label} </span>
  </button>
  )
}

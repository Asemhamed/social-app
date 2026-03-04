import React from 'react'

export default function TabButton({ label, count, active, onClick }) {
  return (
    <div>
      <button 
      onClick={onClick}
      className={`pb-3 cursor-pointer text-sm font-bold transition-all relative ${active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
    >
      {label}
      {count > 0 && <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${active ? "bg-blue-100" : "bg-gray-100 text-gray-500"}`}>{count}</span>}
      {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />}
    </button>
    </div>
  )
}

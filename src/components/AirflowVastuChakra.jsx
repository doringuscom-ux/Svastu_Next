'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AirflowVastuChakra() {
  const [acState, setAcState] = useState(false); // false = OFF, true = ON
  const [windowsState, setWindowsState] = useState(false); // false = Closed, true = Open
  const [selectedRoom, setSelectedRoom] = useState(null);

  const roomDetails = {
    "Entryway": { title: "Entryway", desc: "The main entrance should ideally be in the North, East, or Northeast for positive energy inflow." },
    "Living Room": { title: "Living Room", desc: "A central place for family. Best placed in the East, North, or Northwest. Ensure proper cross-ventilation." },
    "Kitchen": { title: "Kitchen", desc: "The element of fire. Southeast is the ideal location according to Vastu principles. Keep windows open while cooking." },
    "Bathroom": { title: "Bathroom", desc: "Best located in the West or Northwest. Needs good ventilation to clear negative energy." },
    "Bedroom 1": { title: "Master Bedroom", desc: "Southwest is best for the master bedroom, providing stability and peace." },
    "Bedroom 2": { title: "Guest/Kids Bedroom", desc: "Northwest or West is suitable. Ensure AC vents do not blow directly onto the bed." },
    "Hallway": { title: "Hallway", desc: "Keep hallways clear and clutter-free to allow unobstructed energy flow (Prana)." }
  };

  const handleReset = () => {
    setAcState(false);
    setWindowsState(false);
    setSelectedRoom(null);
  };

  // Particles generator for AC (cold air, blue)
  const acParticles = Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={`ac-${i}`}
      className="absolute w-2 h-2 rounded-full bg-blue-400/60 blur-[1px]"
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        x: [0, Math.random() * 60 - 30, Math.random() * 100 - 50],
        y: [0, Math.random() * 60 + 20, Math.random() * 120 + 40],
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 2],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeOut"
      }}
    />
  ));

  // Particles generator for Windows (fresh air, green)
  const windowParticles = Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={`win-${i}`}
      className="absolute w-2 h-2 rounded-full bg-green-400/60 blur-[1px]"
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        x: [0, Math.random() * 80 - 40, Math.random() * 120 - 60],
        y: [0, Math.random() * -60 - 20, Math.random() * -120 - 40],
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 2],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeOut"
      }}
    />
  ));

  const vastuZones = [
    { id: 'nw', name: 'Northwest', subtitle: '(Vayavya)', color: 'bg-[#98cf5a]', text: 'text-white' },
    { id: 'n', name: 'North', subtitle: '(Ishanya)', color: 'bg-[#3bc4d6]', text: 'text-white' }, // Wait, Ishanya is NE usually, but following image
    { id: 'ne', name: 'Northeast', subtitle: '(Eshanya)', color: 'bg-[#31a3b1]', text: 'text-white' },
    { id: 'w', name: 'West', subtitle: '(Paschim)', color: 'bg-[#a3d663]', text: 'text-white' },
    { id: 'c', name: 'Brahmasthan', subtitle: '', color: 'bg-[#ffed5f]', text: 'text-[#1e293b]', isCenter: true },
    { id: 'e', name: 'East', subtitle: '(Purva)', color: 'bg-[#a5cf4a]', text: 'text-white' },
    { id: 'sw', name: 'Southwest', subtitle: '(Nairutya)', color: 'bg-[#c5a26c]', text: 'text-white' },
    { id: 's', name: 'South', subtitle: '(Dakshina)', color: 'bg-[#816550]', text: 'text-white' },
    { id: 'se', name: 'Southeast', subtitle: '(Agneya)', color: 'bg-[#f45d65]', text: 'text-white' },
  ];

  return (
    <section className="py-16 bg-[#0B152A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Home Airflow</h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4 text-center">Visualization System</h2>
            <p className="text-gray-300 mb-8 text-center">Interactive simulation of air circulation and ventilation efficiency</p>
            
            {/* Floor Plan Container */}
            <div className="relative w-full max-w-[500px] aspect-square bg-[#e0e9f0] rounded-lg p-4 shadow-inner overflow-hidden border border-gray-200">
              
              {/* Rooms Map */}
              
              {/* Entryway */}
              <div onClick={() => setSelectedRoom("Entryway")} className={`absolute top-[2%] left-[25%] right-[25%] h-[12%] text-sm font-semibold p-2 text-slate-700 cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Entryway' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                Entryway
              </div>
              
              {/* Living Room */}
              <div onClick={() => setSelectedRoom("Living Room")} className={`absolute top-[14%] left-[5%] w-[48%] h-[40%] p-2 cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Living Room' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                <span className="text-sm font-semibold text-slate-700 pointer-events-none">Living Room</span>
                
                {/* Always-on Gray Vents */}
                <div className="absolute -top-2 left-[20%] w-10 h-4 bg-slate-400 z-0" />
                <div className="absolute top-[30%] -right-2 w-4 h-10 bg-slate-400 z-0" />

                {/* Vents & Arrows (AC ON or Windows Open) */}
                <AnimatePresence>
                  {(acState || windowsState) && (
                    <>
                      {/* Top Vent & Arrow */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`absolute -top-2 left-[20%] w-10 h-4 z-10 ${acState ? 'bg-cyan-300/60 shadow-[0_0_15px_rgba(103,232,249,0.8)]' : 'bg-green-300/60 shadow-[0_0_15px_rgba(74,222,128,0.8)]'}`} />
                      
                      {windowsState && (
                        <>
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, 5, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-2 left-[25%] text-blue-500 z-20">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
                          </motion.div>

                          {/* Middle Arrow */}
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, 5, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="absolute top-[45%] left-[45%] text-blue-500 z-20">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
                          </motion.div>
                        </>
                      )}

                      {/* Right Vent */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`absolute top-[30%] -right-2 w-4 h-10 z-10 ${acState ? 'bg-cyan-300/60 shadow-[0_0_15px_rgba(103,232,249,0.8)]' : 'bg-green-300/60 shadow-[0_0_15px_rgba(74,222,128,0.8)]'}`} />
                    </>
                  )}
                </AnimatePresence>
                
                {/* Dark Circle */}
                <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-slate-500" />
              </div>

              {/* Kitchen */}
              <div onClick={() => setSelectedRoom("Kitchen")} className={`absolute top-[14%] right-[5%] w-[40%] h-[30%] p-2 cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Kitchen' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                <span className="text-sm font-semibold text-slate-700 pointer-events-none">Kitchen</span>
                
                {/* Always-on Vent */}
                <div className="absolute -top-2 left-[55%] w-10 h-4 bg-slate-400 z-0" />

                {/* Blue Arrow (Active state) */}
                <AnimatePresence>
                  {!acState && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[40%] right-[30%] text-blue-500 z-20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {(acState || windowsState) && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`absolute -top-2 left-[55%] w-10 h-4 z-10 ${acState ? 'bg-cyan-300/60 shadow-[0_0_15px_rgba(103,232,249,0.8)]' : 'bg-green-300/60 shadow-[0_0_15px_rgba(74,222,128,0.8)]'}`} />
                    </>
                  )}
                </AnimatePresence>
                
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-slate-500" />
              </div>

              {/* Bathroom */}
              <div onClick={() => setSelectedRoom("Bathroom")} className={`absolute top-[44%] right-[5%] w-[30%] h-[20%] p-2 cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Bathroom' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                <span className="text-sm font-semibold text-slate-700 pointer-events-none">Bathroom</span>
                
                <AnimatePresence>
                  {windowsState && (
                    <>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, 5, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="absolute top-2 left-[45%] text-blue-500 z-20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              </div>

              {/* Bedroom 1 */}
              <div onClick={() => setSelectedRoom("Bedroom 1")} className={`absolute top-[54%] left-[5%] w-[30%] h-[30%] p-2 cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Bedroom 1' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                <span className="text-sm font-semibold text-slate-700 pointer-events-none">Bedroom 1</span>
                
                {/* Always-on Gray Vent */}
                <div className="absolute -top-2 left-[30%] w-10 h-4 bg-slate-400 z-0" />

                <AnimatePresence>
                  {(acState || windowsState) && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`absolute -top-2 left-[30%] w-10 h-4 z-10 ${acState ? 'bg-cyan-300/60 shadow-[0_0_15px_rgba(103,232,249,0.8)]' : 'bg-green-300/60 shadow-[0_0_15px_rgba(74,222,128,0.8)]'}`} />
                      {windowsState && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, 5, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }} className="absolute top-2 left-[35%] text-blue-500 z-20">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Bedroom 2 */}
              <div onClick={() => setSelectedRoom("Bedroom 2")} className={`absolute top-[54%] left-[35%] w-[30%] h-[30%] p-2 cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Bedroom 2' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                <span className="text-sm font-semibold text-slate-700 pointer-events-none">Bedroom 2</span>
                
                {/* Always-on Gray Vent */}
                <div className="absolute -top-2 left-[50%] w-10 h-4 bg-slate-400 z-0" />

                <AnimatePresence>
                  {(acState || windowsState) && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`absolute -top-2 left-[50%] w-10 h-4 z-10 ${acState ? 'bg-cyan-300/60 shadow-[0_0_15px_rgba(103,232,249,0.8)]' : 'bg-green-300/60 shadow-[0_0_15px_rgba(74,222,128,0.8)]'}`} />
                      {windowsState && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, 5, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="absolute top-2 left-[55%] text-blue-500 z-20">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Hallway */}
              <div onClick={() => setSelectedRoom("Hallway")} className={`absolute top-[84%] left-[35%] w-[30%] h-[10%] p-2 flex items-center justify-between cursor-pointer transition-all duration-300 z-30 ${selectedRoom === 'Hallway' ? 'bg-white shadow-lg border-2 border-green-400 scale-[1.02]' : 'bg-[#f0f4f8] border border-gray-300 hover:bg-white'}`}>
                <span className="text-sm font-semibold text-slate-700 pointer-events-none">Hallway</span>
                
                {/* Hallway Blue Arrow Removed as per request */}

                <div className="w-6 h-6 rounded-full bg-slate-500 mr-2 pointer-events-none" />
              </div>

              {/* External Gray Arrow (Below Bathroom) */}
              <div className="absolute top-[65%] right-[10%] text-gray-400 z-20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M2 17h12v4l8-9-8-9v4H2z"/></svg>
              </div>

              {/* Selected Room Details Card (Overlapping tooltip) */}
              <AnimatePresence mode="wait">
                {selectedRoom && (
                  <motion.div 
                    key={selectedRoom}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-4 -left-4 w-72 bg-white p-5 rounded-xl shadow-2xl border border-gray-100 z-50 cursor-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-green-600 text-xl">Airflow Information</h3>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedRoom(null); }} className="text-gray-400 hover:text-gray-700 ml-2 -mt-1 -mr-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{roomDetails[selectedRoom].desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <button 
                onClick={() => setAcState(true)}
                className={`px-4 py-2 rounded font-semibold text-white transition-colors shadow-sm ${acState ? 'bg-[#4ade80]' : 'bg-[#64748b]'}`}
              >
                AC ON
              </button>
              <button 
                onClick={() => setAcState(false)}
                className={`px-4 py-2 rounded font-semibold text-white transition-colors shadow-sm ${!acState ? 'bg-[#4ade80]' : 'bg-[#64748b]'}`}
              >
                AC OFF
              </button>
              <button 
                onClick={() => setWindowsState(true)}
                className={`px-4 py-2 rounded font-semibold text-white transition-colors shadow-sm ${windowsState ? 'bg-[#4ade80]' : 'bg-[#64748b]'}`}
              >
                Open Windows
              </button>
              <button 
                onClick={() => setWindowsState(false)}
                className={`px-4 py-2 rounded font-semibold text-white transition-colors shadow-sm ${!windowsState ? 'bg-[#4ade80]' : 'bg-[#64748b]'}`}
              >
                Close Windows
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2 rounded font-semibold text-white bg-[#64748b] transition-colors shadow-sm"
              >
                Reset Vents
              </button>
            </div>
          </div>

          {/* Right Column: Vastu Energy Chakra */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Vastu Energy <span className="text-[#D4AF37]">Chakra</span></h2>
            <p className="text-gray-300 mb-8 text-center max-w-md">Explore the energy flow in your living space according to ancient Vastu principles</p>
            
            {/* Vastu Grid */}
            <div className="relative w-[85%] sm:w-[90%] md:w-full max-w-[500px] aspect-square mx-auto mt-6 mb-4">
              
              {/* Outer Direction Pills */}
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 md:px-6 md:py-1.5 rounded-full shadow-md text-slate-800 font-black text-xs md:text-base lg:text-lg border border-gray-200 z-20">North</div>
              <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 md:px-6 md:py-1.5 rounded-full shadow-md text-slate-800 font-black text-xs md:text-base lg:text-lg border border-gray-200 z-20">South</div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-white px-3 py-1 md:px-6 md:py-1.5 rounded-full shadow-md text-slate-800 font-black text-xs md:text-base lg:text-lg border border-gray-200 z-20">West</div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-white px-3 py-1 md:px-6 md:py-1.5 rounded-full shadow-md text-slate-800 font-black text-xs md:text-base lg:text-lg border border-gray-200 z-20">East</div>

              {/* Grid Container */}
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1 bg-white border-[4px] border-[#2A3642] rounded-xl overflow-hidden shadow-2xl relative z-10">
                
                {/* Dashed Circle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-10">
                  <motion.div 
                    className="absolute w-[85%] h-[85%] rounded-full border-2 border-dashed border-green-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* NW */}
                <div className="bg-[#bde871] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight">Northwest</p>
                    <p className="text-white font-bold text-[8px] sm:text-sm leading-tight mt-0.5">(Vayavya)</p>
                  </motion.div>
                </div>

                {/* N */}
                <div className="bg-[#2fccdd] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <div className="absolute -top-[8px] sm:-top-[12px] left-1/2 -translate-x-1/2 text-green-500 pointer-events-none"><svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 16H4z"/></svg></div>
                    <p className="text-white font-bold text-[10px] sm:text-lg leading-tight">North</p>
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight mt-0.5">(Ishanya)</p>
                  </motion.div>
                </div>

                {/* NE */}
                <div className="bg-[#2fccdd] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight">Northeast</p>
                    <p className="text-white font-bold text-[8px] sm:text-sm leading-tight mt-0.5">(Eshanya)</p>
                  </motion.div>
                </div>

                {/* W */}
                <div className="bg-[#96cc41] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <div className="absolute top-1/2 -left-[8px] sm:-left-[12px] -translate-x-0 -translate-y-1/2 text-green-500 pointer-events-none"><svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 16H4z"/></svg></div>
                    <p className="text-white font-bold text-[10px] sm:text-lg leading-tight">West</p>
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight mt-0.5">(Paschim)</p>
                  </motion.div>
                </div>

                {/* Center */}
                <div className="bg-gradient-to-br from-[#fffa8a] to-[#ffdb3b] flex items-center justify-center p-1 sm:p-2 relative z-0 hover:z-50">
                  <motion.p 
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}
                    className="text-[#2A3642] font-black text-[10px] sm:text-lg lg:text-xl tracking-wide md:tracking-wide z-20 cursor-pointer select-none text-center"
                  >
                    Brahmasthan
                  </motion.p>
                </div>

                {/* E */}
                <div className="bg-[#96cc41] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <div className="absolute top-1/2 -right-[8px] sm:-right-[12px] -translate-y-1/2 text-green-500 pointer-events-none"><svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 16H4z"/></svg></div>
                    <p className="text-white font-bold text-[10px] sm:text-lg leading-tight">East</p>
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight mt-0.5">(Purva)</p>
                  </motion.div>
                </div>

                {/* SW */}
                <div className="bg-[#cba25b] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.15 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight">Southwest</p>
                    <p className="text-white font-bold text-[8px] sm:text-sm leading-tight mt-0.5">(Nairutya)</p>
                  </motion.div>
                </div>

                {/* S */}
                <div className="bg-[#b88c4f] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <div className="absolute -bottom-[8px] sm:-bottom-[12px] left-1/2 -translate-x-1/2 text-green-500/80 pointer-events-none"><svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 16H4z"/></svg></div>
                    <p className="text-white font-bold text-[10px] sm:text-lg leading-tight">South</p>
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight mt-0.5">(Dakshina)</p>
                  </motion.div>
                </div>

                {/* SE */}
                <div className="bg-[#f45656] flex items-center justify-center p-1 sm:p-2 relative z-0">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="bg-black/30 rounded-md flex flex-col items-center justify-center text-center shadow-inner w-[90%] h-[80%] relative cursor-pointer"
                  >
                    <p className="text-white font-bold text-[9px] sm:text-base leading-tight">Southeast</p>
                    <p className="text-white font-bold text-[8px] sm:text-sm leading-tight mt-0.5">(Agneya)</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


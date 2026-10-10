'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Info, Navigation2, RefreshCw } from 'lucide-react';

const directionInfo = {
  NW: { name: 'Northwest (Vayavya)', desc: 'Ruled by Vayu (Wind god). Good for guest bedroom, toilets, and garage. Connected with travel and relationships.', color: 'bg-stone-500' },
  N: { name: 'North (Kubera)', desc: 'Ruled by Kubera (God of Wealth). Ideal for living room, safe, and entrance. Brings prosperity and wealth.', color: 'bg-red-500' },
  NE: { name: 'Northeast (Eshanya)', desc: 'Ruled by Shiva. Best for pooja room, meditation, and entrance. Brings spiritual growth and clarity.', color: 'bg-amber-500' },
  E: { name: 'East (Indra)', desc: 'Ruled by Indra. Ideal for living room, study, and entrance. Brings health, wealth, and success.', color: 'bg-emerald-500' },
  SE: { name: 'Southeast (Agneya)', desc: 'Ruled by Agni (Fire god). Best for kitchen and electrical equipment. Represents energy and vitality.', color: 'bg-rose-500' },
  S: { name: 'South (Yama)', desc: 'Ruled by Yama. Good for master bedroom and heavy storage. Provides stability and grounding.', color: 'bg-blue-500' },
  SW: { name: 'Southwest (Nairutya)', desc: 'Ruled by Pitru (Ancestors). Ideal for master bedroom and heavy items. Represents stability and strength.', color: 'bg-indigo-500' },
  W: { name: 'West (Varuna)', desc: 'Ruled by Varuna (Water god). Good for dining room, children\'s bedroom, and overhead water tank.', color: 'bg-orange-500' }
};

const directions = [
  { id: 'N', label: 'North', sub: 'Kubera', deg: 0, textClass: 'text-red-600' },
  { id: 'NE', label: 'Northeast', sub: 'Eshanya', deg: 45, textClass: 'text-amber-600' },
  { id: 'E', label: 'East', sub: 'Indra', deg: 90, textClass: 'text-emerald-600' },
  { id: 'SE', label: 'Southeast', sub: 'Agneya', deg: 135, textClass: 'text-rose-600' },
  { id: 'S', label: 'South', sub: 'Yama', deg: 180, textClass: 'text-blue-600' },
  { id: 'SW', label: 'Southwest', sub: 'Nairutya', deg: 225, textClass: 'text-indigo-600' },
  { id: 'W', label: 'West', sub: 'Varuna', deg: 270, textClass: 'text-orange-600' },
  { id: 'NW', label: 'Northwest', sub: 'Vayavya', deg: 315, textClass: 'text-stone-600' }
];

export default function VastuChakra() {
  const [selectedDir, setSelectedDir] = useState('N');
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  // New states for idle animation and real compass
  const [isIdleAnimating, setIsIdleAnimating] = useState(true);
  const [isRealCompassMode, setIsRealCompassMode] = useState(false);
  const [compassError, setCompassError] = useState('');

  // Idle Animation Effect
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRotation((prev) => (prev + 0.2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };

    if (isIdleAnimating && !isRealCompassMode) {
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isIdleAnimating, isRealCompassMode]);

  const handleDirClick = (dir) => {
    setIsIdleAnimating(false);
    setIsRealCompassMode(false);
    setSelectedDir(dir.id);

    // Calculate shortest path for smooth spring rotation
    let currentRotation = rotation;
    let targetRotation = dir.deg;

    let diff = targetRotation - (currentRotation % 360);
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setRotation(currentRotation + diff);
  };

  const updateDirectionFromHeading = (heading) => {
    // Determine closest direction
    const normalized = heading < 0 ? heading + 360 : heading % 360;
    const closest = directions.reduce((prev, curr) => {
      return (Math.abs(curr.deg - normalized) < Math.abs(prev.deg - normalized) ? curr : prev);
    });
    if (closest.id !== selectedDir) setSelectedDir(closest.id);
  };

  const enableRealCompass = async () => {
    if (isRealCompassMode) {
      // Toggle off
      setIsRealCompassMode(false);
      setIsIdleAnimating(true);
      return;
    }

    setIsIdleAnimating(false);
    setCompassError('');

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      // iOS 13+ permission request
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            startCompassListener();
          } else {
            alert('Compass permission was denied.');
            setIsIdleAnimating(true);
          }
        } catch (error) {
          alert('An error occurred while requesting compass permission.');
          setIsIdleAnimating(true);
        }
      } else {
        // Non-iOS or older devices
        startCompassListener();
      }
    } else {
      alert('Your device browser does not support compass sensors.');
      setIsIdleAnimating(true);
    }
  };

  const startCompassListener = () => {
    let sensorFired = false;

    const handleOrientation = (event) => {
      let heading = null;
      if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
        heading = event.webkitCompassHeading; // iOS
      } else if (event.alpha !== null && event.alpha !== undefined) {
        heading = Math.abs(event.alpha - 360); // Android
      }

      if (heading !== null) {
        sensorFired = true;
        if (!isRealCompassMode) setIsRealCompassMode(true);
        setRotation(-heading);
        updateDirectionFromHeading(heading);
      } else {
        // Event fired but no data
        sensorFired = true;
        window.removeEventListener('deviceorientationabsolute', handleOrientation);
        window.removeEventListener('deviceorientation', handleOrientation);
        setIsRealCompassMode(false);
        setIsIdleAnimating(true);
        alert('Your device does not have a hardware compass sensor (typically missing on laptops/desktops).');
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation);
    window.addEventListener('deviceorientation', handleOrientation);

    // Timeout if event never fires
    setTimeout(() => {
      if (!sensorFired) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation);
        window.removeEventListener('deviceorientation', handleOrientation);
        setIsRealCompassMode(false);
        setIsIdleAnimating(true);
        alert('Could not connect to compass sensor. Please try on a mobile device.');
      }
    }, 1500);
  };

  return (
    <section className="pt-10 pb-20 bg-gradient-to-b from-[#f8f9fa] to-[#eef1f4] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#cba25b]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8b4513]/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Text Content */}
          <div className="pr-0 lg:pr-12 space-y-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cba25b]/10 text-[#a9813c] font-semibold text-sm mb-4 border border-[#cba25b]/20"
              >
                <Compass size={16} /> Ancient Wisdom
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.15]"
              >
                Vastu Chakra <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cba25b] to-[#8b4513]">
                  Directional Energy
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                The Vastu Chakra represents directional energies in Vastu Shastra, guiding architecture and interior design. It balances natural elements, enhancing positivity, prosperity, and well-being in your living and working spaces.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={enableRealCompass}
                className={`px-8 py-3.5 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 ${isRealCompassMode ? 'bg-gradient-to-r from-green-600 to-green-500 shadow-green-500/30' : 'bg-gradient-to-r from-[#0b66c2] to-[#09519c] shadow-blue-500/30'}`}
              >
                <Navigation2 size={18} className={isRealCompassMode ? "animate-pulse" : ""} />
                {isRealCompassMode ? 'Real Compass Active' : 'Enable Real Compass'}
              </button>
              <button
                onClick={() => { setIsIdleAnimating(true); setIsRealCompassMode(false); }}
                className={`px-6 py-3.5 bg-white text-[#8b4513] border border-[#8b4513]/20 font-semibold rounded-full hover:bg-[#8b4513]/5 transition-all duration-300 flex items-center justify-center gap-2 ${isIdleAnimating ? 'hidden' : 'flex'}`}
              >
                <RefreshCw size={18} /> Resume Animation
              </button>
            </motion.div>
            {compassError && <p className="text-red-500 text-sm font-medium">{compassError}</p>}
          </div>

          {/* Right Interactive Map */}
          <div className="flex flex-col items-center justify-center relative">

            {/* The Compass Dial */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-white shadow-2xl flex items-center justify-center mb-8 border-[12px] border-[#f8f5f0]"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-[#cba25b]/30 m-2"></div>

              {/* Center Pivot */}
              <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#cba25b] to-[#8b4513] z-30 flex items-center justify-center shadow-lg border-4 border-white">
                <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
              </div>

              {/* Compass Needle (Animated) */}
              <motion.div
                className="absolute w-full h-full z-20 flex items-center justify-center"
                animate={{ rotate: rotation }}
                transition={{
                  type: isIdleAnimating ? 'tween' : 'spring',
                  stiffness: 40, damping: 12, mass: 1,
                  duration: isIdleAnimating ? 0 : undefined // Immediate for idle loop to avoid snapping
                }}
              >
                {/* Needle shape */}
                <div className="relative w-[14px] h-[220px] sm:h-[280px] flex flex-col items-center justify-center drop-shadow-xl">
                  {/* North pointer (Red) */}
                  <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-b-[110px] sm:border-b-[140px] border-l-transparent border-r-transparent border-b-[#ef4444]"></div>
                  {/* South pointer (Gray) */}
                  <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[110px] sm:border-t-[140px] border-l-transparent border-r-transparent border-t-[#94a3b8]"></div>

                  {/* Center accent on needle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-10 border-2 border-[#ef4444]"></div>
                </div>
              </motion.div>

              {/* Tick marks around the circle */}
              {Array.from({ length: 72 }).map((_, i) => (
                <div
                  key={`tick-${i}`}
                  className="absolute w-full h-full flex justify-center py-2 z-0"
                  style={{ transform: `rotate(${i * 5}deg)` }}
                >
                  <div className={`w-0.5 ${i % 9 === 0 ? 'h-4 bg-[#8b4513]/40' : 'h-2 bg-[#8b4513]/15'} rounded-full`}></div>
                </div>
              ))}

              {/* Upright Text Directions */}
              {directions.map((dir) => {
                const isActive = selectedDir === dir.id;
                return (
                  <div
                    key={dir.id}
                    className="absolute z-40 flex items-center justify-center"
                    style={{
                      // Place items in a circle but keep them completely upright
                      transform: `rotate(${dir.deg}deg) translateY(-145px) rotate(-${dir.deg}deg)`
                    }}
                    onClick={() => handleDirClick(dir)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        cursor-pointer flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300
                        ${isActive ? 'bg-white shadow-lg border border-gray-100 scale-110' : 'hover:bg-white/80'}
                      `}
                    >
                      <span className={`font-black text-sm sm:text-base leading-none ${dir.textClass}`}>
                        {dir.id}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-semibold mt-1 px-1.5 py-0.5 rounded-full ${isActive ? 'bg-gray-100 text-gray-800' : 'text-gray-500'}`}>
                        {dir.sub}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Information Card (Animated underneath) */}
            <AnimatePresence mode="wait">
              {showInfo && (
                <motion.div
                  key={selectedDir}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-16 sm:-bottom-24 w-[90%] max-w-[480px] z-50 pointer-events-none"
                >
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100/50 backdrop-blur-sm relative overflow-hidden pointer-events-auto">
                    {/* Color accent line */}
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${directionInfo[selectedDir].color}`}></div>

                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {directionInfo[selectedDir].name}
                      </h3>
                      <button
                        onClick={() => setShowInfo(false)}
                        className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {directionInfo[selectedDir].desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Show Info Button if hidden */}
            <AnimatePresence>
              {!showInfo && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => setShowInfo(true)}
                  className="absolute -bottom-10 bg-white shadow-lg text-[#8b4513] border border-[#8b4513]/20 px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-[#8b4513]/5 transition-colors z-50"
                >
                  <Info size={16} /> Show Information
                </motion.button>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}



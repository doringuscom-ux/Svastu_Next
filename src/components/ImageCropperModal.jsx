'use client';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

// Helper to create the cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const ASPECT_OPTIONS = [
  { label: '3:4 (Portrait)', value: 3 / 4, tip: 'Best for tall text sections' },
  { label: '4:5 (Extra Tall)', value: 4 / 5, tip: 'For long sections' },
  { label: '1:1 (Square)', value: 1, tip: 'Balanced' },
  { label: '4:3 (Landscape)', value: 4 / 3, tip: 'Standard horizontal' },
  { label: '16:9 (Wide)', value: 16 / 9, tip: 'Widescreen' },
];

export default function ImageCropperModal({ isOpen, onClose, imageSrc, onCropComplete, aspect = 3 / 4 }) {
  const [selectedAspect, setSelectedAspect] = useState(aspect);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedAspect(aspect || 3 / 4);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [isOpen, aspect]);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx || !croppedAreaPixels) return null;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // 1. Draw blurred background
      ctx.filter = 'blur(15px) brightness(0.8)';
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Reset filter for the main image
      ctx.filter = 'none';

      // 2. Draw the actual cropped image
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((file) => {
          if (file) {
            file.name = 'cropped.jpeg';
            resolve(file);
          }
        }, 'image/jpeg', 0.95);
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const saveCroppedImage = async () => {
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
      const previewUrl = URL.createObjectURL(croppedBlob);
      onCropComplete(croppedFile, previewUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Crop Image for Section</h3>
            <p className="text-xs text-gray-500">Crop image to match your section height</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>

        {/* Aspect Ratio Selector Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-gray-600 mr-1 uppercase tracking-wider">Ratio:</span>
            {ASPECT_OPTIONS.map((item) => {
              const isSelected = Math.abs(selectedAspect - item.value) < 0.01;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setSelectedAspect(item.value);
                    setCrop({ x: 0, y: 0 });
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-300'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  title={item.tip}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Cropper Area */}
        <div className="relative h-80 sm:h-96 w-full bg-slate-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={selectedAspect}
            minZoom={0.5}
            maxZoom={3}
            restrictPosition={false}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        
        {/* Controls Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600 w-12">Zoom:</span>
            <button
              type="button"
              onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
              className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 text-sm"
            >
              -
            </button>
            <input
              type="range"
              value={zoom}
              min={0.5}
              max={3}
              step={0.05}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <button
              type="button"
              onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}
              className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 text-sm"
            >
              +
            </button>
          </div>
          
          <div className="flex justify-end items-center gap-3 pt-1">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={saveCroppedImage}
              className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold text-sm shadow-md shadow-orange-500/20 transition-all"
            >
              Save Cropped Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


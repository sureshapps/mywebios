import { useRef, useState, useCallback } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Photo } from '@/types';
import { Camera as CameraIcon, SwitchCamera, Circle } from 'lucide-react';

export const CameraApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useLocalStorage<Photo[]>('ios-photos', []);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (stream) stream.getTracks().forEach(t => t.stop());
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      console.log('Camera not available');
    }
  }, [facingMode]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d')?.drawImage(v, 0, 0);
    const src = c.toDataURL('image/jpeg', 0.8);
    const photo: Photo = { id: Date.now().toString(), src, timestamp: Date.now() };
    setPhotos(prev => [photo, ...prev]);
    setLastPhoto(src);
  };

  const switchCamera = () => {
    setFacingMode(f => f === 'user' ? 'environment' : 'user');
  };

  return (
    <AppLayout title="Camera" bgClass="bg-black" noPadding>
      <div className="flex flex-col h-full">
        <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
          {stream ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <CameraIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <button onClick={startCamera} className="bg-white/20 text-white px-6 py-2 rounded-full text-sm">
                Open Camera
              </button>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="bg-black py-6 flex items-center justify-around">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/30">
            {lastPhoto ? <img src={lastPhoto} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-800" />}
          </div>
          <button onClick={takePhoto} className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
            <Circle className="w-12 h-12 text-white fill-white" />
          </button>
          <button onClick={switchCamera}>
            <SwitchCamera className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

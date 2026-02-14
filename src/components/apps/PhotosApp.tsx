import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Photo } from '@/types';
import { X, ZoomIn } from 'lucide-react';

const SAMPLE_PHOTOS: Photo[] = [
  { id: 's1', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop', timestamp: Date.now() - 86400000 },
  { id: 's2', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop', timestamp: Date.now() - 172800000 },
  { id: 's3', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop', timestamp: Date.now() - 259200000 },
  { id: 's4', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop', timestamp: Date.now() - 345600000 },
  { id: 's5', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop', timestamp: Date.now() - 432000000 },
  { id: 's6', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop', timestamp: Date.now() - 518400000 },
];

export const PhotosApp = () => {
  const [captured] = useLocalStorage<Photo[]>('ios-photos', []);
  const allPhotos = [...captured, ...SAMPLE_PHOTOS];
  const [viewing, setViewing] = useState<Photo | null>(null);

  return (
    <AppLayout title="Photos">
      <div className="grid grid-cols-3 gap-0.5">
        {allPhotos.map(p => (
          <button key={p.id} onClick={() => setViewing(p)} className="aspect-square overflow-hidden">
            <img src={p.src} className="w-full h-full object-cover" alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {viewing && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={() => setViewing(null)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img src={viewing.src} className="max-w-full max-h-full object-contain" alt="" />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

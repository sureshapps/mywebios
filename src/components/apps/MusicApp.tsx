import { useState } from 'react';
import { AppLayout } from '@/components/ios/AppLayout';
import { Play, Pause, SkipBack, SkipForward, Heart, MoreHorizontal, Home, Library, Search, Radio } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  image: string;
}

const NOW_PLAYING: Song = {
  title: 'Midnight Dreams',
  artist: 'The Velvet Notes',
  image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
};

const RECENTLY_PLAYED: Song[] = [
  { title: 'Electric Sunrise', artist: 'Neon Lights', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80' },
  { title: 'Ocean Waves', artist: 'Coastal Breeze', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&q=80' },
  { title: 'Downtown Rhythm', artist: 'Urban Collective', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80' },
];

const PLAYLISTS = [
  { name: 'Chill Vibes', count: 24, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80' },
  { name: 'Workout Mix', count: 18, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80' },
  { name: 'Road Trip', count: 32, image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80' },
  { name: 'Focus Flow', count: 15, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
];

const ALBUMS = [
  { name: 'Echoes of Time', artist: 'Sarah James', image: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=400&q=80' },
  { name: 'Neon Nights', artist: 'Digital Dreams', image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&q=80' },
  { name: 'Summer Sessions', artist: 'The Beach Boys', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80' },
  { name: 'Midnight City', artist: 'M83', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
];

export const MusicApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress] = useState(35);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <AppLayout title="Music" noPadding>
      <div className="flex flex-col h-full bg-background">
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Now Playing Card */}
          <div className="px-5 pt-4 pb-6">
            <div className="bg-card rounded-[20px] shadow-lg overflow-hidden">
              <div className="aspect-square relative">
                <img src={NOW_PLAYING.image} alt="Album Artwork" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-[20px] font-semibold tracking-[-0.2px] text-foreground truncate mb-1">
                      {NOW_PLAYING.title}
                    </h1>
                    <p className="text-[17px] tracking-[-0.4px] text-muted-foreground truncate">
                      {NOW_PLAYING.artist}
                    </p>
                  </div>
                  <button className="ml-3 mt-1">
                    <MoreHorizontal className="w-6 h-6 text-primary" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 mb-2">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[13px] text-muted-foreground">1:24</span>
                    <span className="text-[13px] text-muted-foreground">3:47</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-6">
                  <button><SkipBack className="w-8 h-8 text-foreground" /></button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 text-background" />
                    ) : (
                      <Play className="w-7 h-7 text-background ml-1" />
                    )}
                  </button>
                  <button><SkipForward className="w-8 h-8 text-foreground" /></button>
                </div>

                {/* Extra Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <button><Library className="w-6 h-6 text-muted-foreground" /></button>
                  <button onClick={() => setLiked(!liked)}>
                    <Heart className={`w-6 h-6 ${liked ? 'text-primary fill-primary' : 'text-primary'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Played */}
          <div className="px-5 mb-6">
            <h2 className="text-[22px] font-semibold tracking-[-0.3px] text-foreground mb-4">Recently Played</h2>
            <div className="space-y-3">
              {RECENTLY_PLAYED.map((song, i) => (
                <div key={i} className="flex items-center bg-card rounded-xl p-3 shadow-sm">
                  <img src={song.image} alt="Album" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-[15px] font-medium text-foreground truncate">{song.title}</p>
                    <p className="text-[13px] text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  <Play className="w-5 h-5 text-primary ml-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Playlists */}
          <div className="px-5 mb-6">
            <h2 className="text-[22px] font-semibold tracking-[-0.3px] text-foreground mb-4">Your Playlists</h2>
            <div className="grid grid-cols-2 gap-3">
              {PLAYLISTS.map((pl, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-square">
                    <img src={pl.image} alt="Playlist" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-[15px] font-medium text-foreground truncate">{pl.name}</p>
                    <p className="text-[13px] text-muted-foreground">{pl.count} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Albums */}
          <div className="px-5 mb-6">
            <h2 className="text-[22px] font-semibold tracking-[-0.3px] text-foreground mb-4">Albums</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
              {ALBUMS.map((album, i) => (
                <div key={i} className="flex-shrink-0 w-40">
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                    <img src={album.image} alt="Album" className="w-full aspect-square object-cover" />
                    <div className="p-3">
                      <p className="text-[13px] font-medium text-foreground truncate">{album.name}</p>
                      <p className="text-[12px] text-muted-foreground truncate">{album.artist}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border pb-6">
          <div className="flex items-center justify-around h-14">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'library', icon: Library, label: 'Library' },
              { id: 'search', icon: Search, label: 'Search' },
              { id: 'radio', icon: Radio, label: 'Browse' },
            ].map(tab => (
              <button
                key={tab.id}
                className="flex flex-col items-center justify-center gap-1 flex-1"
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[11px] font-medium ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';

// Mock data
const mockFeaturedPlaylists = [
  {
    id: 'playlist1',
    name: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }]
  },
  {
    id: 'playlist2',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these smooth tracks',
    images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }]
  },
  {
    id: 'playlist3',
    name: 'Rock Classics',
    description: 'Legendary rock anthems that never get old',
    images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop' }]
  },
  {
    id: 'playlist4',
    name: 'Electronic Dreams',
    description: 'Futuristic beats and electronic masterpieces',
    images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop' }]
  },
  {
    id: 'playlist5',
    name: 'Jazz & Blues',
    description: 'Smooth jazz and soulful blues selections',
    images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop' }]
  },
  {
    id: 'playlist6',
    name: 'Workout Pump',
    description: 'High-energy tracks to fuel your workout',
    images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }]
  }
];

const mockNewReleases = [
  {
    id: 'album1',
    name: 'Midnight Reflections',
    artists: [{ name: 'Luna Martinez', id: 'artist1' }],
    images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }],
    release_date: '2024-01-15'
  },
  {
    id: 'album2',
    name: 'Electric Nights',
    artists: [{ name: 'Neon Pulse', id: 'artist2' }],
    images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop' }],
    release_date: '2024-01-12'
  },
  {
    id: 'album3',
    name: 'Urban Stories',
    artists: [{ name: 'City Beats', id: 'artist3' }],
    images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop' }],
    release_date: '2024-01-10'
  },
  {
    id: 'album4',
    name: 'Acoustic Sessions',
    artists: [{ name: 'River Stone', id: 'artist4' }],
    images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop' }],
    release_date: '2024-01-08'
  },
  {
    id: 'album5',
    name: 'Synthwave Dreams',
    artists: [{ name: 'Retro Future', id: 'artist5' }],
    images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }],
    release_date: '2024-01-05'
  },
  {
    id: 'album6',
    name: 'Soul Revival',
    artists: [{ name: 'Maya Johnson', id: 'artist6' }],
    images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }],
    release_date: '2024-01-03'
  }
];

const mockUserPlaylists = [
  {
    id: 'user_playlist1',
    name: 'My Favorites',
    description: 'Songs I love and play on repeat',
    images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop' }]
  },
  {
    id: 'user_playlist2',
    name: 'Discover Weekly',
    description: 'Your weekly music discovery mix',
    images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop' }]
  },
  {
    id: 'user_playlist3',
    name: 'Road Trip Mix',
    description: 'Perfect songs for long drives',
    images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop' }]
  },
  {
    id: 'user_playlist4',
    name: 'Focus & Study',
    description: 'Concentration music for productivity',
    images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }]
  },
  {
    id: 'user_playlist5',
    name: 'Party Hits',
    description: 'Get the party started with these bangers',
    images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }]
  },
  {
    id: 'user_playlist6',
    name: 'Late Night Vibes',
    description: 'Smooth tracks for evening relaxation',
    images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop' }]
  }
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for realistic experience
    const loadMockData = () => {
      setTimeout(() => {
        setFeaturedPlaylists(mockFeaturedPlaylists);
        setNewReleases(mockNewReleases);
        setUserPlaylists(mockUserPlaylists);
        setLoading(false);
      }, 1000);
    };

    loadMockData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 bg-gray-800 rounded w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="bg-gray-800 rounded-lg p-4 space-y-3">
                      <div className="w-full aspect-square bg-gray-700 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const PlaylistCard = ({ playlist, onClick }: { playlist: any; onClick: () => void }) => (
    <Card 
      className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={playlist.images?.[0]?.url || '/placeholder.svg'}
            alt={playlist.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Playing playlist:', playlist.name);
            }}
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
        </div>
        <h3 className="font-semibold text-white truncate mb-1">{playlist.name}</h3>
        <p className="text-sm text-gray-400 truncate">
          {playlist.description || playlist.artists?.[0]?.name || 'SoundFlow'}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
          </h1>
          <p className="text-xl text-gray-400">Ready to discover your next favorite song?</p>
        </div>

        {/* Featured Playlists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => {
                  console.log('Navigating to playlist:', playlist.name);
                  navigate(`/playlist/${playlist.id}`);
                }}
              />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">New Releases</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newReleases.map((album) => (
              <PlaylistCard
                key={album.id}
                playlist={album}
                onClick={() => {
                  console.log('Navigating to artist:', album.artists[0].name);
                  navigate(`/artist/${album.artists[0].id}`);
                }}
              />
            ))}
          </div>
        </section>

        {/* Your Playlists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Made for You</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Show all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => {
                  console.log('Navigating to user playlist:', playlist.name);
                  navigate(`/playlist/${playlist.id}`);
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;

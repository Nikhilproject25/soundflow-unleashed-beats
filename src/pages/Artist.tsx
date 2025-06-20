import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, MoreHorizontal } from 'lucide-react';
import { mockArtists, mockTopTracks, mockAlbums } from '@/data/mockData';

const Artist = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = () => {
      // Simulate API call delay
      setTimeout(() => {
        const mockArtist = mockArtists[id as keyof typeof mockArtists] || mockArtists.artist1;
        const artistTopTracks = mockTopTracks[id as keyof typeof mockTopTracks] || mockTopTracks.artist1;
        const artistAlbums = mockAlbums[id as keyof typeof mockAlbums] || mockAlbums.artist1;
        
        setArtist(mockArtist);
        setTopTracks(artistTopTracks);
        setAlbums(artistAlbums);
        setLoading(false);
        
        console.log('Loaded artist:', mockArtist.name);
      }, 800);
    };

    fetchArtistData();
  }, [id]);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 animate-pulse">
          <div className="flex items-end space-x-6 mb-8">
            <div className="w-60 h-60 bg-gray-800 rounded-full"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-800 rounded w-80"></div>
              <div className="h-6 bg-gray-800 rounded w-48"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!artist) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Artist not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-b from-blue-800 to-blue-900 p-8">
          <div className="flex items-end space-x-6">
            <img
              src={artist.images?.[0]?.url || '/placeholder.svg'}
              alt={artist.name}
              className="w-60 h-60 rounded-full shadow-2xl object-cover"
            />
            <div className="space-y-4">
              <p className="text-sm font-medium text-white uppercase tracking-wide">
                Artist
              </p>
              <h1 className="text-5xl font-bold text-white">{artist.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>{artist.followers?.total?.toLocaleString()} followers</span>
                {artist.genres?.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{artist.genres.slice(0, 3).join(', ')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Content */}
        <div className="bg-gradient-to-b from-blue-900/20 to-black p-8">
          <div className="flex items-center space-x-6 mb-8">
            <Button
              size="icon"
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full"
              onClick={() => console.log('Playing artist:', artist.name)}
            >
              <Play className="h-6 w-6 fill-current ml-1" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>

          {/* Popular Tracks */}
          {topTracks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
              <div className="space-y-1">
                {topTracks.slice(0, 5).map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
                    onClick={() => console.log('Playing track:', track.name)}
                  >
                    <span className="text-gray-400 w-6 text-center group-hover:hidden">
                      {index + 1}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hidden group-hover:flex h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Playing track:', track.name);
                      }}
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </Button>
                    <img
                      src={track.album.images?.[0]?.url || '/placeholder.svg'}
                      alt={track.name}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{track.name}</h3>
                      <p className="text-sm text-gray-400">
                        {track.album.name}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {albums.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Albums</h2>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Show all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {albums.slice(0, 10).map((album) => (
                  <Card
                    key={album.id}
                    className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => console.log('Viewing album:', album.name)}
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={album.images?.[0]?.url || '/placeholder.svg'}
                          alt={album.name}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <Button
                          size="icon"
                          className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Playing album:', album.name);
                          }}
                        >
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-white truncate mb-1">
                        {album.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(album.release_date).getFullYear()} • {album.album_type}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Artist;

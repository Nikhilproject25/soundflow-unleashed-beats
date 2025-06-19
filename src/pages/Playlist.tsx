
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Play, Clock, MoreHorizontal } from 'lucide-react';

const Playlist = () => {
  const { id } = useParams();
  const { isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchPlaylist = async () => {
      if (!accessToken || !id) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylist(data);
        setTracks(data.tracks?.items || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id, accessToken, isAuthenticated, navigate]);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-8 animate-pulse">
          <div className="flex items-end space-x-6 mb-8">
            <div className="w-60 h-60 bg-gray-800 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-800 rounded w-64"></div>
              <div className="h-6 bg-gray-800 rounded w-48"></div>
              <div className="h-4 bg-gray-800 rounded w-32"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!playlist) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Playlist not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-b from-green-800 to-green-900 p-8">
          <div className="flex items-end space-x-6">
            <img
              src={playlist.images?.[0]?.url || '/placeholder.svg'}
              alt={playlist.name}
              className="w-60 h-60 rounded-lg shadow-2xl"
            />
            <div className="space-y-4">
              <p className="text-sm font-medium text-white uppercase tracking-wide">
                Playlist
              </p>
              <h1 className="text-5xl font-bold text-white">{playlist.name}</h1>
              {playlist.description && (
                <p className="text-gray-300 max-w-2xl">{playlist.description}</p>
              )}
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="font-semibold">{playlist.owner.display_name}</span>
                <span>•</span>
                <span>{playlist.tracks.total} songs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-b from-green-900/20 to-black p-8">
          <div className="flex items-center space-x-6 mb-8">
            <Button
              size="icon"
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full"
            >
              <Play className="h-6 w-6 fill-current ml-1" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>

          {/* Track List */}
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
              <div className="col-span-1">#</div>
              <div className="col-span-6">Title</div>
              <div className="col-span-3">Album</div>
              <div className="col-span-1">Date added</div>
              <div className="col-span-1 flex justify-end">
                <Clock className="h-4 w-4" />
              </div>
            </div>

            {/* Tracks */}
            {tracks.map((item, index) => {
              const track = item.track;
              if (!track) return null;

              return (
                <div
                  key={track.id || index}
                  className="grid grid-cols-12 gap-4 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
                >
                  <div className="col-span-1 flex items-center">
                    <span className="text-gray-400 group-hover:hidden">
                      {index + 1}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hidden group-hover:flex h-8 w-8"
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </Button>
                  </div>

                  <div className="col-span-6 flex items-center space-x-3">
                    <img
                      src={track.album?.images?.[2]?.url || '/placeholder.svg'}
                      alt={track.name}
                      className="w-10 h-10 rounded"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-white truncate">
                        {track.name}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {track.artists?.map((artist: any) => artist.name).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <span className="text-gray-400 truncate text-sm">
                      {track.album?.name}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <span className="text-gray-400 text-sm">
                      {formatDate(item.added_at)}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-end">
                    <span className="text-gray-400 text-sm">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Playlist;

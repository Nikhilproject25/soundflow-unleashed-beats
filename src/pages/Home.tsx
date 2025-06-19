
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, accessToken, setTokenFromUrl } = useAuth();
  const navigate = useNavigate();
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTokenFromUrl();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      if (!accessToken) return;

      try {
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };

        // Fetch featured playlists
        const featuredResponse = await fetch(
          'https://api.spotify.com/v1/browse/featured-playlists?limit=6',
          { headers }
        );
        const featuredData = await featuredResponse.json();

        // Fetch new releases
        const releasesResponse = await fetch(
          'https://api.spotify.com/v1/browse/new-releases?limit=6',
          { headers }
        );
        const releasesData = await releasesResponse.json();

        // Fetch user playlists
        const userPlaylistsResponse = await fetch(
          'https://api.spotify.com/v1/me/playlists?limit=6',
          { headers }
        );
        const userPlaylistsData = await userPlaylistsResponse.json();

        setFeaturedPlaylists(featuredData.playlists?.items || []);
        setNewReleases(releasesData.albums?.items || []);
        setUserPlaylists(userPlaylistsData.items || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, accessToken, navigate]);

  if (!isAuthenticated) {
    return null;
  }

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
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
        </div>
        <h3 className="font-semibold text-white truncate mb-1">{playlist.name}</h3>
        <p className="text-sm text-gray-400 truncate">
          {playlist.description || playlist.artists?.[0]?.name || 'Spotify'}
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
        {featuredPlaylists.length > 0 && (
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
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* New Releases */}
        {newReleases.length > 0 && (
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
                  onClick={() => navigate(`/artist/${album.artists[0].id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Your Playlists */}
        {userPlaylists.length > 0 && (
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
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Home;

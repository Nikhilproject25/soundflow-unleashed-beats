
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon, Play, Clock } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const Search = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (debouncedQuery && accessToken) {
      searchSpotify(debouncedQuery);
    } else {
      setResults({});
    }
  }, [debouncedQuery, accessToken]);

  const searchSpotify = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track,artist,album,playlist&limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="What do you want to listen to?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="tracks" className="data-[state=active]:bg-green-600">Songs</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-green-600">Artists</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-green-600">Albums</TabsTrigger>
              <TabsTrigger value="playlists" className="data-[state=active]:bg-green-600">Playlists</TabsTrigger>
            </TabsList>

            <TabsContent value="tracks" className="mt-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg animate-pulse">
                      <div className="w-12 h-12 bg-gray-700 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {results.tracks?.items?.map((track: any) => (
                    <div
                      key={track.id}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </Button>
                      <img
                        src={track.album.images?.[2]?.url || '/placeholder.svg'}
                        alt={track.name}
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">{track.name}</h3>
                        <p className="text-sm text-gray-400 truncate">
                          {track.artists.map((artist: any) => artist.name).join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDuration(track.duration_ms)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="artists" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.artists?.items?.map((artist: any) => (
                  <Card
                    key={artist.id}
                    className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    <CardContent className="p-4 text-center">
                      <img
                        src={artist.images?.[0]?.url || '/placeholder.svg'}
                        alt={artist.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold text-white">{artist.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{artist.type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="albums" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.albums?.items?.map((album: any) => (
                  <Card
                    key={album.id}
                    className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <img
                        src={album.images?.[0]?.url || '/placeholder.svg'}
                        alt={album.name}
                        className="w-full aspect-square object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-white truncate">{album.name}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        {album.artists.map((artist: any) => artist.name).join(', ')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="playlists" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.playlists?.items?.map((playlist: any) => (
                  <Card
                    key={playlist.id}
                    className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/playlist/${playlist.id}`)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={playlist.images?.[0]?.url || '/placeholder.svg'}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        By {playlist.owner.display_name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* No Results */}
        {!loading && query && !results.tracks?.items?.length && (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;

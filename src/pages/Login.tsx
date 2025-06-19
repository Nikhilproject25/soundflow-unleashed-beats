
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Music className="h-12 w-12 text-green-500" />
            <h1 className="text-4xl font-bold text-white">SoundFlow</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-white">
            Welcome to Your Music Universe
          </h2>
          <p className="text-gray-300 text-lg">
            Discover, stream, and enjoy millions of songs from Spotify
          </p>
        </div>

        <div className="space-y-6">
          <Button
            onClick={login}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            Login with Spotify
          </Button>
          
          <p className="text-sm text-gray-400">
            Connect your Spotify account to access your music library
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

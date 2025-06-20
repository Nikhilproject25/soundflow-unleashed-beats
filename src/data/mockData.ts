
export const mockPlaylists = {
  playlist1: {
    id: 'playlist1',
    name: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    owner: { display_name: 'SoundFlow' },
    images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }],
    tracks: {
      total: 50,
      items: [
        {
          track: {
            id: 'track1',
            name: 'Starlight Dreams',
            artists: [{ name: 'Luna Martinez', id: 'artist1' }],
            album: {
              name: 'Midnight Reflections',
              images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=64&h=64&fit=crop' }]
            },
            duration_ms: 210000
          },
          added_at: '2024-01-15T10:30:00Z'
        },
        {
          track: {
            id: 'track2',
            name: 'Electric Pulse',
            artists: [{ name: 'Neon Pulse', id: 'artist2' }],
            album: {
              name: 'Electric Nights',
              images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=64&h=64&fit=crop' }]
            },
            duration_ms: 195000
          },
          added_at: '2024-01-14T15:20:00Z'
        },
        {
          track: {
            id: 'track3',
            name: 'City Lights',
            artists: [{ name: 'City Beats', id: 'artist3' }],
            album: {
              name: 'Urban Stories',
              images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=64&h=64&fit=crop' }]
            },
            duration_ms: 225000
          },
          added_at: '2024-01-13T09:15:00Z'
        },
        {
          track: {
            id: 'track4',
            name: 'Acoustic Soul',
            artists: [{ name: 'River Stone', id: 'artist4' }],
            album: {
              name: 'Acoustic Sessions',
              images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop' }]
            },
            duration_ms: 180000
          },
          added_at: '2024-01-12T14:45:00Z'
        },
        {
          track: {
            id: 'track5',
            name: 'Retro Wave',
            artists: [{ name: 'Retro Future', id: 'artist5' }],
            album: {
              name: 'Synthwave Dreams',
              images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=64&h=64&fit=crop' }]
            },
            duration_ms: 240000
          },
          added_at: '2024-01-11T11:30:00Z'
        }
      ]
    }
  }
};

export const mockArtists = {
  artist1: {
    id: 'artist1',
    name: 'Luna Martinez',
    followers: { total: 125000 },
    genres: ['indie pop', 'alternative', 'dream pop'],
    images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=face' }]
  },
  artist2: {
    id: 'artist2',
    name: 'Neon Pulse',
    followers: { total: 89000 },
    genres: ['electronic', 'synthwave', 'dance'],
    images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop' }]
  },
  artist3: {
    id: 'artist3',
    name: 'City Beats',
    followers: { total: 67000 },
    genres: ['hip hop', 'urban', 'rap'],
    images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }]
  }
};

export const mockTopTracks = {
  artist1: [
    {
      id: 'track1',
      name: 'Starlight Dreams',
      album: {
        name: 'Midnight Reflections',
        images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=64&h=64&fit=crop' }]
      },
      duration_ms: 210000
    },
    {
      id: 'track6',
      name: 'Moonlit Highway',
      album: {
        name: 'Midnight Reflections',
        images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=64&h=64&fit=crop' }]
      },
      duration_ms: 195000
    },
    {
      id: 'track7',
      name: 'Whispered Secrets',
      album: {
        name: 'Echoes of Time',
        images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop' }]
      },
      duration_ms: 203000
    }
  ]
};

export const mockAlbums = {
  artist1: [
    {
      id: 'album1',
      name: 'Midnight Reflections',
      release_date: '2024-01-15',
      album_type: 'album',
      images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }]
    },
    {
      id: 'album7',
      name: 'Echoes of Time',
      release_date: '2023-09-10',
      album_type: 'album',
      images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop' }]
    },
    {
      id: 'album8',
      name: 'Dawn Chorus',
      release_date: '2023-05-22',
      album_type: 'EP',
      images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }]
    }
  ]
};

export const mockSearchResults = {
  tracks: {
    items: [
      {
        id: 'search_track1',
        name: 'Dancing in the Moonlight',
        artists: [{ name: 'Stella Rivers', id: 'search_artist1' }],
        album: {
          name: 'Nocturnal Vibes',
          images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=64&h=64&fit=crop' }]
        },
        duration_ms: 218000
      },
      {
        id: 'search_track2',
        name: 'Neon Dreams',
        artists: [{ name: 'Cyber Knights', id: 'search_artist2' }],
        album: {
          name: 'Digital Realm',
          images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=64&h=64&fit=crop' }]
        },
        duration_ms: 185000
      },
      {
        id: 'search_track3',
        name: 'Ocean Waves',
        artists: [{ name: 'Nature\'s Symphony', id: 'search_artist3' }],
        album: {
          name: 'Elements',
          images: [{ url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop' }]
        },
        duration_ms: 267000
      }
    ]
  },
  artists: {
    items: [
      {
        id: 'search_artist1',
        name: 'Stella Rivers',
        type: 'artist',
        images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face' }]
      },
      {
        id: 'search_artist2',
        name: 'Cyber Knights',
        type: 'artist',
        images: [{ url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop' }]
      }
    ]
  },
  albums: {
    items: [
      {
        id: 'search_album1',
        name: 'Nocturnal Vibes',
        artists: [{ name: 'Stella Rivers', id: 'search_artist1' }],
        images: [{ url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop' }]
      }
    ]
  },
  playlists: {
    items: [
      {
        id: 'search_playlist1',
        name: 'Midnight Moods',
        owner: { display_name: 'MusicLover92' },
        images: [{ url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' }]
      }
    ]
  }
};

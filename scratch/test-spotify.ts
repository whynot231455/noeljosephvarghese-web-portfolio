import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

async function testAuth() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const userId = process.env.SPOTIFY_USER_ID;

  console.log('Testing with:');
  console.log('Client ID:', clientId?.substring(0, 5) + '...');
  console.log('Client Secret:', clientSecret?.substring(0, 5) + '...');
  console.log('User ID:', userId);

  if (!clientId || !clientSecret || !userId) {
    console.error('Missing credentials in .env');
    return;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    // 1. Get token
    const authRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await authRes.json();
    console.log('Token Status:', authRes.status);

    if (!tokenData.access_token) {
      console.error('Failed to get token:', tokenData);
      return;
    }

    // 2. Fetch user playlists
    const playlistRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const playlistData = await playlistRes.json();
    console.log('Playlist Status:', playlistRes.status);
    console.log('Playlists count:', playlistData.items?.length ?? 0);
    if (playlistData.items?.length > 0) {
      console.log('First Playlist:', playlistData.items[0].name);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testAuth();

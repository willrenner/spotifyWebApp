export default function () {
    let token = window.location.hash.substr(1);
    if (token) {
        const o = Object.fromEntries(new URLSearchParams(token));
        return o.access_token;
    } else {
        // If there is no token, redirect to Spotify authorization
        redirectToSpotifyAuthentication();
    }
}

function redirectToSpotifyAuthentication() {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = 'ab6f479ca0604e74b187d6860b68b1a5';
    const redirectUri = `${window.location.protocol}//${window.location.host}/`;
    const scope = 'user-top-read'; //playlist-read-private
    let query = `client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&scope=${scope}`;
    window.location = `${authEndpoint}?${query}`;

}

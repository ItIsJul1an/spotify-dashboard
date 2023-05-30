const authEndpoint: string = 'https://accounts.spotify.com/authorize'

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-follow-read',
    'user-follow-modify',
    'user-library-read',
    'user-library-modify',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played'
]

export const getAuthorizeHref = (): string => {
    const clientId: string | undefined = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirectUri: string | undefined = process.env.REACT_APP_REDIRECT_URI

    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`
}

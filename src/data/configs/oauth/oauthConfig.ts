const authEndpoint: string = 'https://accounts.spotify.com/authorize'

const scopes = [
    'user-read-private'
]

export const getAuthorizeHref = (): string => {
    const clientId: string | undefined = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirectUri: string | undefined = process.env.REACT_APP_REDIRECT_URI

    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`
}

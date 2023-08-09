
# Spotify Dashboard

This project is a dashboard that provides a comprehensive music search and playback system for users. Users can search for playlists, artists, tracks, albums, and more within the dashboard interface. The dashboard allows users to modify the playback state of the selected music, such as playing or stopping a track or album. 

Additionally, users have the ability to create and manage their favorite songs list within the dashboard. They can add songs to their playlist, create new playlists, and organize their music collection according to their preferences.

This project is designed for music enthusiasts who want a centralized platform to search for and manage their music. It caters to individuals who enjoy exploring playlists, discovering new artists, and customizing their listening experience. Whether users want to find specific songs, enjoy curated playlists, or create their own personalized music collections, this dashboard provides a user-friendly interface to facilitate these actions efficiently and effortlessly.


## Authors

- [@ItIsJul1an](https://www.github.com/ItIsJul1an)


## Tech Stack

**Dashboard:** React, Zustand, CSS

**Authentification:** OAuth2.0
## Color Reference

| Color                     | Hsl                                                                                  |
| --------------------------| -------------------------------------------------------------------------------------|
| Accent Color              | ![hsl(258, 28%, 9%)](https://via.placeholder.com/10/110e18?text=+) hsl(258, 28%, 9%) |
| Primary Color             | ![hsl(255, 5%, 16%)](https://via.placeholder.com/10/222124?text=+) hsl(255, 5%, 16%) |
| Secondary Color           | ![hsl(252, 2%, 49%)](https://via.placeholder.com/10/68676b?text=+) hsl(252, 2%, 49%) |
| Navigation Color 1        | ![hsl(234, 83%, 98%)](https://via.placeholder.com/10/cfd0d6?text=+) hsl(234, 83%, 98%) |
| Navigation Color 2        | ![hsl(0, 0%, 100%)](https://via.placeholder.com/10/7c7c7e?text=+) hsl(0, 0%, 100%) |
| Navigation Hover Color    | ![hsl(258, 28%, 9%)](https://via.placeholder.com/10/110e18?text=+) hsl(258, 28%, 9%) |
| Input Hover Color    | ![hsl(239, 84%, 67%)](https://via.placeholder.com/10/5457cc?text=+) hsl(239, 84%, 67%) |
| Input Active Color    | ![hsl(228, 96%, 89%)](https://via.placeholder.com/10/a9b2d6?text=+) hsl(228, 96%, 89%) |
| Menu Item Color    | ![hsl(0, 0%, 100%)](https://via.placeholder.com/10/ffffff?text=+) hsl(0, 0%, 100%) |
| Scrollbar Thumb Color    | ![hsl(196, 15%, 86%)](https://via.placeholder.com/10/b4bbbe?text=+) hsl(196, 15%, 86%) |
| Scrollbar Thumb Hover Color    | ![hsl(190, 15%, 70%)](https://via.placeholder.com/10/8d9da0?text=+) hsl(190, 15%, 70%) |

## Contributing

Contributions are always welcome!

### Reporting Issues

If you have found what you think is a bug, please don't be shy to open an issue.

### Suggesting new features

If you are here to suggest a feature, first create an issue if it does not already exist. From there,I will manage to implement it.

## Local Installation

Before getting started, clone the project and install the npm dependencies by running `npm i`

```bash
git clone https://github.com/ItIsJul1an/spotify-dashboard.git
cd spotify-dashboard
npm i
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

- `REACT_APP_SPOTIFY_CLIENT_ID`
- `REACT_APP_REDIRECT_URI`

\
**Example Usage**

```
REACT_APP_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID
REACT_APP_REDIRECT_URI=http://localhost:3000/login *
```
* is required

## Deployment

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

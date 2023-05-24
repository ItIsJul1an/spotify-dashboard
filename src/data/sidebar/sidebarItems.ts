import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded'
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'

export const SidebarItems = [
    {
        name: '',
        items: [
            {
                title: 'Home',
                url: 'dashboard',
                image: HomeRoundedIcon
            },
            {
                title: 'Trends',
                url: 'dashboard/trends',
                image: WhatshotRoundedIcon
            }
        ]
    },
    {
        name: 'Discover',
        items: [
            {
                title: 'New and Notable',
                url: 'dashboard/new',
                image: NewReleasesRoundedIcon
            },
            {
                title: 'Events',
                url: 'dashboard/events',
                image: LocalActivityRoundedIcon
            }
        ]
    },
    {
        name: 'Your Collection',
        items: [
            {
                title: 'Songs',
                url: 'dashboard/fav/songs',
                image: FavoriteBorderRoundedIcon
            },
            {
                title: 'Artists',
                url: 'dashboard/fav/artists',
                image: GroupsRoundedIcon
            },
            {
                title: 'Albums',
                url: 'dashboard/fav/albums',
                image: StarBorderRoundedIcon
            }
        ]
    }
]
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded'
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'

export const SidebarItems = [
    {
        name: '',
        items: [
            {
                title: 'Home',
                url: '',
                image: HomeRoundedIcon
            },
            {
                title: 'Trends',
                url: 'trends',
                image: WhatshotRoundedIcon
            },
            {
                title: 'History',
                url: 'history',
                image: HistoryRoundedIcon
            }
        ]
    },
    {
        name: 'Discover',
        items: [
            {
                title: 'New and Notable',
                url: 'new',
                image: NewReleasesRoundedIcon
            },
            {
                title: 'Events',
                url: 'events',
                image: LocalActivityRoundedIcon
            }
        ]
    },
    {
        name: 'Your Collection',
        items: [
            {
                title: 'Songs',
                url: 'fav/songs',
                image: FavoriteBorderRoundedIcon
            },
            {
                title: 'Artists',
                url: 'fav/artists',
                image: GroupsRoundedIcon
            },
            {
                title: 'Albums',
                url: 'fav/albums',
                image: StarBorderRoundedIcon
            }
        ]
    }
]
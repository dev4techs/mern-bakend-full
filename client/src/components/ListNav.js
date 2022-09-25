import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';

export const NavList =[
    {
        id: 0,
        icon: <PeopleIcon />,
        label: 'Users',
        route: '/api/users',
    },
    {
        id: 1,
        icon: <InputIcon/>,
        label: 'Sign Up',
        route: '/api/users/signup',
    },
    {
        id: 2,
        icon: <LoginIcon />,
        label: 'Sign In',
        route: '/auth/signin',
    },
    {
        id: 3,
        icon: <LogoutIcon />,
        label: 'Sign Out',
        route: '/auth/signout',
    }
    ,
    {
        id: 4,
        icon: <LogoutIcon />,
        label: 'My Profile',
        route: '/api/users/:userId',
    }

]
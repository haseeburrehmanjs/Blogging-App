import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { signOutUser } from '../Config/firebase/FirebaseMethod';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Config/firebase/FirebaseMethod'
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

export default function AccountMenu() {
    let navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // get data from firebase 
    React.useEffect(() => {

    }, [])

    const [SingalUserData, setSingalUserData] = React.useState([])

    React.useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(collection(db, "users"), where("id", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        setSingalUserData(doc.data())
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('user logout ho giya ha');
            }
        })
    }, [])


    // logout user
    function userLogout() {
        Swal.fire({
            title: 'Success!',
            text: 'Your are Logout Successfully',
            icon: 'success',
            confirmButtonText: 'Logout',
            confirmButtonColor: '#234e94'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashbord')
                }
            });
        signOutUser()
        console.log('user logout ho giya ha');
        navigate('/login')
    }

    // add another account
    function addAnotherAccount() {
        navigate('/register')
    }

    // page navigate to profile page
    function profilePage() {
        navigate('/profile')
    }
    function dashbordPage() {
        navigate('/dashbord')
    }
    function allBlogsPage() {
        navigate('/')
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}><img
                            alt="hero"
                            src={SingalUserData.userProfile}
                        /></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={profilePage}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={allBlogsPage}>
                    <Avatar /> All Blogs
                </MenuItem>
                <MenuItem onClick={dashbordPage}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Dashbord
                </MenuItem>
                <Divider />
                <MenuItem onClick={addAnotherAccount}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={userLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

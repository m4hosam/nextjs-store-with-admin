"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
// import photo from '../Images/logo.jpg'

const drawerWidth = 290;
const navItems = ['Get Started', 'Men', 'Women'];



const navButtonCommonStyle = {
    color: "var(--text-color-darkest)", backgroundColor: "var(--nav-buttons-color)",
    ':hover': {
        bgcolor: "var(--nav-buttons-hover-color)",
        color: "var(--text-color-lightest"
    }
}



const theme = createTheme({
    typography: {
        fontFamily: [
            'Open Sans',
            '-apple-system',
            'Roboto',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const variants = {
    open: { rotate: 0, y: 0 },
    closed: { rotate: -180, y: -8 },
}

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: "var(--text-color-lightest)" }}>

            <List sx={{ mt: 5 }}>
                {navItems.map((item) => (

                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{
                            borderRadius: '7px',
                            margin: '.5rem',
                            alignItems: 'center', justifyContent: 'center',
                            ':hover': {
                                bgcolor: "var(--nav-buttons-hover-color)",
                            }
                        }}>
                            <Button key={item} sx={{
                                width: 'inherit',
                                px: 8,
                                textTransform: 'none',
                                fontSize: '16px',
                                color: "var(--text-color-darkest)", backgroundColor: "var(--nav-drawer-bg-color)",
                                ':hover': {
                                    bgcolor: "var(--nav-buttons-hover-color)",
                                }
                            }}
                                href={'#' + item.toLowerCase().replace(/\s/g, '')}
                            >
                                {item}
                            </Button>
                            {/* <ListItemText primary={item} href={'#' + item.toLowerCase()} /> */}
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>


            <Button variant="contained" sx={{
                px: 10,
                mt: 5,
                textTransform: 'none',
                ...navButtonCommonStyle
            }}>
                Login
            </Button>
            <Button variant="contained" sx={{
                px: 9.3,
                my: 3,
                textTransform: 'none',
                ...navButtonCommonStyle
            }}>
                Sign Up
            </Button>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <AppBar component="nav" sx={{
                    backgroundColor: "var(--nav-bg-color)",
                    // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3), 0px 0px 5px 0 var(--aispherePurple)'
                }}>
                    <Toolbar sx={{ justifyContent: 'space-between', mx: { xs: 0, sm: 3 } }}>
                        <a href='/' style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            textDecoration: 'none',
                        }}>
                            <Typography style={{ color: "var(--text-color-darkest)", fontSize: 28 }}>
                                A & M
                            </Typography>
                        </a>

                        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                            {navItems.map((item, index) => (
                                <Button key={item} sx={{
                                    px: 2,
                                    textTransform: 'none',
                                    marginRight: '1rem',
                                    fontSize: '15px',
                                    color: 'var(--nav-text-color)',

                                    // backgroundColor: 'var(--navy)',
                                    ':hover': {
                                        bgcolor: "--nav-items-hover-color",
                                    }
                                }}

                                >
                                    {item}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                            <Button variant="contained" sx={{
                                mr: 2,
                                px: 2,
                                display: { xs: 'none', sm: 'block' },
                                textTransform: 'none',
                                ...navButtonCommonStyle
                            }}>
                                Login
                            </Button>
                            <Button variant="contained" sx={{
                                px: 2,
                                display: { xs: 'none', sm: 'block' },
                                textTransform: 'none',
                                ...navButtonCommonStyle
                            }}>
                                Sign Up
                            </Button>
                        </Box>


                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { lg: 'none' }, fontSize: '30px' }}
                        >
                            {!mobileOpen ? (
                                <motion.nav
                                    color='white'
                                    animate={!mobileOpen ? "open" : "closed"}
                                    variants={variants}
                                >
                                    <HiOutlineMenuAlt4 style={{ fontSize: '32px', color: 'var(--nav-menu-color)' }} />
                                </motion.nav>
                            ) : (
                                <motion.nav
                                    color='white'
                                    animate={!mobileOpen ? "open" : "closed"}
                                    variants={variants}
                                >
                                    <AiOutlineClose style={{ color: 'var(--nav-menu-color)' }} />
                                </motion.nav>
                            )}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box component="nav" >
                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: "var(--nav-drawer-bg-color)"
                            }
                        }}
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ p: 3 }}>
                    <Toolbar />

                </Box>
            </Box>
        </ThemeProvider>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;
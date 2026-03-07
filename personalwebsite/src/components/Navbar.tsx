import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';

// Define Props for the NavigationBar
interface NavigationBarProps {
  navBarColor: string; // Pass-in parameter for navbar background color
}

const pages = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

const NavigationBar: React.FC<NavigationBarProps> = ({ navBarColor }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: `linear-gradient(120deg, rgba(6, 19, 34, 0.78), ${navBarColor})`,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 10px 30px rgba(9, 17, 28, 0.22)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} component="a" href={`#${page.toLowerCase()}`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" fontWeight={700}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Centered Menu for Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`#${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: '#f8fafc',
                  display: 'block',
                  mx: 1.5,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  borderRadius: 999,
                  px: 2.2,
                  transition: 'all 220ms ease',
                  '&:hover': {
                    backgroundColor: 'rgba(8, 145, 178, 0.2)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;

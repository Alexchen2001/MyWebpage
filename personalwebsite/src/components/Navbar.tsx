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
      position="fixed"
      sx={{
        background: `linear-gradient(160deg, rgba(6, 19, 34, 0.9), ${navBarColor})`,
        backdropFilter: 'blur(12px)',
        borderRight: { md: '1px solid rgba(255, 255, 255, 0.15)' },
        borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.15)', md: 'none' },
        boxShadow: '0 10px 30px rgba(9, 17, 28, 0.22)',
        width: { xs: '100%', md: 220 },
        height: { xs: 'auto', md: '100vh' },
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 1.25 }, height: '100%' }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: { xs: 'center', md: 'flex-start' },
            minHeight: { xs: 64, md: '100%' },
            py: { xs: 0, md: 2 },
            flexDirection: { xs: 'row', md: 'column' },
          }}
        >
          <Typography
            sx={{
              display: { xs: 'block', md: 'none' },
              color: '#eaf2ff',
              fontWeight: 800,
              letterSpacing: '0.06em',
              mr: 1,
            }}
          >
            ALEX CHEN
          </Typography>

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

          {/* Menu for Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexGrow: 1,
              width: '100%',
            }}
          >
            <Box sx={{ px: 1, py: 1 }}>
              <Typography sx={{ color: '#eaf2ff', fontWeight: 800, letterSpacing: '0.07em', fontSize: '0.95rem' }}>
                ALEX CHEN
              </Typography>
              <Typography sx={{ color: 'rgba(234, 242, 255, 0.72)', fontSize: '0.78rem', mt: 0.4 }}>
                Software Engineer
              </Typography>
            </Box>

            <Box sx={{ width: '100%', pt: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  href={`#${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 0.4,
                    color: '#f8fafc',
                    justifyContent: 'flex-start',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    borderRadius: 999,
                    px: 2,
                    py: 1,
                    width: '100%',
                    transition: 'all 220ms ease',
                    '&:hover': {
                      backgroundColor: 'rgba(14, 165, 164, 0.25)',
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ px: 1, pb: 1.5 }}>
              <Typography sx={{ color: 'rgba(234, 242, 255, 0.62)', fontSize: '0.72rem', lineHeight: 1.5 }}>
                Atlanta, GA
                <br />
                Open to software engineering roles.
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;

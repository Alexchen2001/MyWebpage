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
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

// Define Props for the NavigationBar
interface NavigationBarProps {
  navBarColor: string; // Pass-in parameter for navbar background color
  onNavigate: (sectionId: string) => void;
}

const pages = ['Home', 'About', 'Experience', 'Projects', 'Blog', 'Contact'];

const pageIcons: Record<string, React.ReactNode> = {
  Home: <HomeRoundedIcon fontSize="small" />,
  About: <PersonRoundedIcon fontSize="small" />,
  Experience: <WorkRoundedIcon fontSize="small" />,
  Projects: <RocketLaunchRoundedIcon fontSize="small" />,
  Contact: <MailRoundedIcon fontSize="small" />,
  Blog: <ArticleRoundedIcon fontSize="small" />,
};

const NavigationBar: React.FC<NavigationBarProps> = ({ navBarColor, onNavigate }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLElement>, sectionId: string) => {
    event.preventDefault();
    onNavigate(sectionId);
    handleCloseNavMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: `linear-gradient(160deg, var(--nav-bg-start), ${navBarColor})`,
        color: 'var(--nav-text)',
        backdropFilter: 'blur(12px)',
        borderRight: { md: '1px solid var(--panel-border)' },
        borderBottom: { xs: '1px solid var(--panel-border)', md: 'none' },
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
              color: 'var(--nav-text)',
              fontWeight: 800,
              letterSpacing: '0.06em',
              mr: 1,
            }}
          >
            ALEXANDER CHEN
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
                <MenuItem
                  key={page}
                  component="a"
                  href={`#${page.toLowerCase()}`}
                  onClick={(event) => handleNavClick(event, page.toLowerCase())}
                >
                  <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8 }} textAlign="center" fontWeight={700}>
                    {pageIcons[page]}
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
              <Typography sx={{ color: 'var(--nav-text)', fontWeight: 800, letterSpacing: '0.07em', fontSize: '0.95rem' }}>
                ALEXANDER CHEN
              </Typography>
              <Typography sx={{ color: 'var(--nav-subtle)', fontSize: '0.78rem', mt: 0.4 }}>
                Software Engineer
              </Typography>
            </Box>

            <Box sx={{ width: '100%', pt: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  href={`#${page.toLowerCase()}`}
                  onClick={(event) => handleNavClick(event, page.toLowerCase())}
                  startIcon={pageIcons[page]}
                  sx={{
                    my: 0.4,
                    color: 'var(--nav-text)',
                    justifyContent: 'flex-start',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    borderRadius: 999,
                    px: 2,
                    py: 1,
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'var(--nav-hover)',
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ px: 1, pb: 1.5 }}>
              <Typography sx={{ color: 'var(--nav-subtle)', fontSize: '0.72rem', lineHeight: 1.5 }}>
                Seattle, WA
                <br />
                Open to work
              </Typography>
              <Typography sx={{ color: 'var(--nav-subtle)', fontSize: '0.68rem', lineHeight: 1.5, mt: 1.4 }}>
                © 2026 Alexander Chen. All rights reserved.
                <br />
                Built with Material-UI and React.
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;

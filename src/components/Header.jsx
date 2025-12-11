import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

export function Header() {
    const { pathname } = useLocation();

    const isActive = (path) => pathname === path;

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#8ab4f8'
            }}
        >

            <Container maxWidth={false} disableGutters sx={{ px: 3 }}>
                <Toolbar disableGutters sx={{ color: '#3c5271ff' }}>

                    <Box
                        component="img"
                        src="/italo-logo.png"
                        alt="Italo Logo"
                        sx={{ height: 40, mr: 3, display: { xs: 'none', md: 'block' } }}
                    />

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: '#3c5271ff', mr: 4 }}
                    >
                        Pesquisa de preços
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack direction="row" spacing={2}>
                        <Button
                            component={RouterLink}
                            to="/group"
                            variant={isActive('/group') ? 'contained' : 'outlined'}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                backgroundColor: isActive('/group') ? '#3c5271ff' : 'transparent',
                                color: isActive('/group') ? 'white' : 'primary.main'
                            }}
                        >
                            Dashboard Grupos
                        </Button>

                        <Button
                            component={RouterLink}
                            to="/"
                            variant={isActive('/') ? 'contained' : 'outlined'}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                backgroundColor: isActive('/') ? '#3c5271ff' : 'transparent',
                                color: isActive('/') ? 'white' : 'primary.main'
                            }}
                        >
                            Dashboard Geral
                        </Button>
                    </Stack>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

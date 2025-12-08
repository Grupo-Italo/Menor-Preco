import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export function Header() {

    return (
        <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
            <Container maxWidth={false} disableGutters sx={{ px: 2 }}>
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        src="/italo-logo.png"
                        alt="Italo Logo"
                        sx={{
                            height: 40,
                            mr: 6,
                            display: { xs: 'none', md: 'block' },
                        }}
                    />
                    <Typography
                        variant="h5"
                        component="a"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            color: 'rgb(60, 82, 113)',
                        }}
                    >
                        Pesquisa de preços - Dashborad
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
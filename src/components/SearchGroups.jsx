import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Snackbar, Alert, Backdrop, CircularProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useApi, useManualApi } from '../hooks/useApi';
import { largeInputStyles, loadingStyles, buttonSearchStyles, boxSearchStyles } from '../styles/inputStyles';

export function SearchGroups({ onDataFetched }) {
    const [selectedCidade, setSelectedCidade] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [selectedMarca, setSelectedMarca] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    console.log('Selected Marca:', selectedMarca);

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const { data: cidades = [], isLoading: loadingCidades } = useApi(
        'cidades',
        import.meta.env.VITE_CITIES_URL || 'http://localhost:3000/italoBases/cities',
        { enabled: true }
    );

    const { data: bases = [], isLoading: loadingBases } = useApi(
        'bases',
        import.meta.env.VITE_BASES_URL || 'http://localhost:3000/italoBases/bases',
        {
            enabled: !!selectedCidade,
            params: { name: selectedCidade?.cidade }
        }
    );

    const { data: grupos = [], isLoading: loadingGrupos } = useApi(
        'grupos',
        import.meta.env.VITE_GRUPOS_URL || 'http://localhost:3000/italoGroups/groups',
        { enabled: true }
    );

    const { data: brands = [], isLoading: loadingBrands } = useApi(
        'marcas',
        import.meta.env.VITE_MARCAS_URL || 'http://localhost:3000/italoGroups/brands',
        { enabled: true }
    );

    const { data: produtosData = [], isLoading: loadingData, error, refetch } = useManualApi(
        'produtosComConcorrentes',
        import.meta.env.VITE_DATA_URL || 'http://localhost:3000/italoGroups/groupsSearch',
        {
            enabled: false,
            params: {
                grupoCodigo: selectedGrupo?.grup_codigo,
                italoBasesId: selectedBase?.id,
                cidade: selectedCidade?.cidade,
                geohash: selectedBase?.geohash,
                marca: selectedMarca ? selectedMarca.marca : undefined
            }
        }
    );

    const handleBuscar = async () => {
        if (!selectedCidade || !selectedBase || !selectedGrupo) {
            showSnackbar('Preencha todos os campos', 'warning');
            return;
        }

        const result = await refetch();

        if (result.data && result.data.length > 0) {
            showSnackbar('Dados carregados com sucesso!', 'success');
            if (onDataFetched) {
                onDataFetched(result.data);
            }
        } else if (result.data && result.data.length === 0) {
            showSnackbar('Nenhum produto encontrado com concorrentes', 'warning');
        }
    };

    return (
        <>
            <Backdrop open={loadingData || loadingBases || loadingCidades} sx={loadingStyles}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box sx={boxSearchStyles}>
                {error && <Box sx={{ width: '100%', color: 'red' }}>Erro ao buscar dados.</Box>}

                <Autocomplete
                    disablePortal
                    options={cidades}
                    loading={loadingCidades}
                    getOptionLabel={(option) => option.cidade || ''}
                    isOptionEqualToValue={(option, value) => option.cidade === value.cidade}
                    sx={largeInputStyles}
                    value={selectedCidade}
                    onChange={(_, newValue) => {
                        setSelectedCidade(newValue);
                        setSelectedBase(null);
                    }}
                    renderInput={(params) => <TextField {...params} label="Cidade" />}
                />

                <Autocomplete
                    disablePortal
                    disabled={!selectedCidade}
                    options={bases}
                    loading={loadingBases}
                    getOptionLabel={(option) => option.nome || ''}
                    isOptionEqualToValue={(option, value) => option.geohash === value.geohash}
                    sx={largeInputStyles}
                    value={selectedBase}
                    onChange={(_, newValue) => setSelectedBase(newValue)}
                    renderInput={(params) => <TextField {...params} label="Base" />}
                />

                <Autocomplete
                    disablePortal
                    options={grupos}
                    loading={loadingGrupos}
                    getOptionLabel={(option) => option.grup_descricao || ''}
                    isOptionEqualToValue={(option, value) => option.grup_codigo === value.grup_codigo}
                    sx={largeInputStyles}
                    value={selectedGrupo}
                    onChange={(_, newValue) => setSelectedGrupo(newValue)}
                    renderInput={(params) => <TextField {...params} label="Grupo do produto" />}
                />

                <Autocomplete
                    disablePortal
                    options={brands}
                    loading={loadingBrands}
                    getOptionLabel={(option) => option.marca || ''}
                    sx={largeInputStyles}
                    value={selectedMarca}
                    onChange={(_, newValue) => setSelectedMarca(newValue)}
                    renderInput={(params) => <TextField {...params} label="Marca" />}
                />

                <Button variant="contained" onClick={handleBuscar} sx={buttonSearchStyles}>
                    Executar busca
                </Button>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

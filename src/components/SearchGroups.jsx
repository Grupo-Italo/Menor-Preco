import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Snackbar, Alert, Backdrop, CircularProgress, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { largeInputStyles, loadingStyles, buttonSearchStyles, boxSearchStyles } from '../styles/inputStyles';

export function SearchGroups({ onDataFetched }) {
    const [selectedCidade, setSelectedCidade] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);
    const [codigoLocalidade, setCodigoLocalidade] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [selectedMarca, setSelectedMarca] = useState(null);

    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [shouldFetchBases, setShouldFetchBases] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const { data: cidades = [], isLoading: loadingCidades } = useApi(
        'cidades',
        import.meta.env.VITE_CITIES_URL || 'http://localhost:3000/italoBases/cities',
        { enabled: openAutocomplete }
    );

    const { data: bases = [], isLoading: loadingBases } = useApi(
        'bases',
        import.meta.env.VITE_BASES_URL || 'http://localhost:3000/italoBases/bases',
        {
            enabled: shouldFetchBases && !!selectedCidade,
            params: { name: selectedCidade?.cidade }
        }
    );

    const { data: grupos = [], isLoading: loadingGrupos } = useApi(
        'grupos',
        import.meta.env.VITE_GRUPOS_URL || 'http://localhost:3000/italoGroups/groups',
        { enabled: openAutocomplete }
    );

    const { data: brands = [], isLoading: loadingBrands } = useApi(
        'marcas',
        import.meta.env.VITE_MARCAS_URL || 'http://localhost:3000/italoGroups/brands',
        { enabled: openAutocomplete }
    );

    // const { data, isLoading, error } = useApi(
    //     'menor-preco',
    //     import.meta.env.VITE_NOTA_PARANA_URL || 'http://localhost:3000/menorPreco',
    //     {
    //         enabled: shouldFetch && !!codigoLocalidade,
    //         params: { local: codigoLocalidade }
    //     }
    // );

    const handleCidadeChange = (_, newValue) => {
        setSelectedCidade(newValue);
        setSelectedBase(null);
        setCodigoLocalidade('');
        setShouldFetchBases(!!newValue);
    };

    const handleBaseChange = (_, newValue) => {
        setSelectedBase(newValue);
        setCodigoLocalidade(newValue ? newValue.geohash : '');
    };

    const handleBuscar = () => {
        if (!selectedCidade || !selectedBase) {
            showSnackbar('Por favor, preencha a cidade e a base', 'warning');
            return;
        }
        setShouldFetch(true);
    };

    useEffect(() => {
        const onExecute = () => handleBuscar();
        window.addEventListener('executarBusca', onExecute);
        return () => window.removeEventListener('executarBusca', onExecute);
    }, [selectedCidade, selectedBase, codigoLocalidade]);

    // useEffect(() => {
    //     if (shouldFetch && data) {
    //         if (onDataFetched) onDataFetched(data);
    //         setShouldFetch(false);
    //     }
    // }, [data, shouldFetch, onDataFetched]);

    return (
        <>
            {/* <Backdrop open={isLoading || loadingBases || loadingCidades} sx={loadingStyles}>
                <CircularProgress color="inherit" />
            </Backdrop> */}

            <Box sx={boxSearchStyles}>

                {/* {error && <Box sx={{ width: '100%', color: 'red' }}>Erro ao buscar dados.</Box>} */}

                <Autocomplete
                    disablePortal
                    options={cidades}
                    loading={loadingCidades}
                    getOptionLabel={(option) => option.cidade || ''}
                    isOptionEqualToValue={(option, value) => option.cidade === value.cidade}
                    onOpen={() => setOpenAutocomplete(true)}
                    onClose={() => setOpenAutocomplete(false)}
                    sx={largeInputStyles}
                    value={selectedCidade}
                    onChange={handleCidadeChange}
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
                    onChange={handleBaseChange}
                    renderInput={(params) => <TextField {...params} label="Base" />}
                />

                <Autocomplete
                    disablePortal
                    options={grupos}
                    loading={loadingGrupos}
                    onClose={() => setOpenAutocomplete(false)}
                    onOpen={() => setOpenAutocomplete(true)}
                    getOptionLabel={(option) => option.grup_descricao || ''}
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
                    onClose={() => setOpenAutocomplete(false)}
                    onOpen={() => setOpenAutocomplete(true)}
                    sx={largeInputStyles}
                    value={selectedMarca}
                    onChange={(_, newValue) => setSelectedMarca(newValue)}
                    renderInput={(params) => <TextField {...params} label="Marca" />}
                />

                <Button
                    variant="contained"
                    onClick={() => window.dispatchEvent(new CustomEvent('executarBusca'))}
                    sx={buttonSearchStyles}
                >
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

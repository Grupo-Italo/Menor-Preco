import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Box, Snackbar, Alert, Backdrop, CircularProgress, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { inputStyles, readOnlyInputStyles, largeInputStyles, smallInputStyles, loadingStyles, buttonSearchStyles } from '../styles/inputStyles';

export function Search({ onDataFetched }) {
    const [selectedCidade, setSelectedCidade] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);
    const [codigoLocalidade, setCodigoLocalidade] = useState('');
    const [gtin, setGtin] = useState('');
    const [termoProduto, setTermoProduto] = useState('');
    const [raio, setRaio] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [shouldFetchBases, setShouldFetchBases] = useState(false);

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
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

    const { data, isLoading, error } = useApi(
        'menor-preco',
        import.meta.env.VITE_NOTA_PARANA_URL || 'http://localhost:3000/nota-parana/search',
        {
            enabled: shouldFetch && !!codigoLocalidade && (!!gtin || !!termoProduto),
            params: {
                local: codigoLocalidade,
                ...(gtin && { gtin }),
                ...(termoProduto && { termo: termoProduto }),
                ...(raio && { raio })
            }
        }
    );

    const handleCidadeChange = (event, newValue) => {
        setSelectedCidade(newValue);
        setSelectedBase(null);
        setCodigoLocalidade('');
        setShouldFetchBases(!!newValue);
    };

    const handleBaseChange = (event, newValue) => {
        setSelectedBase(newValue);
        setCodigoLocalidade(newValue ? newValue.geohash : '');
    };

    const handleGtinChange = (event) => {
        const value = event.target.value;
        setGtin(value);
        if (value) setTermoProduto('');
    };

    const handleTermoChange = (event) => {
        const value = event.target.value;
        setTermoProduto(value);
        if (value) setGtin('');
    };

    const handleRaioChange = (event) => {
        setRaio(event.target.value);
    };

    useEffect(() => {
        if (shouldFetch && data && (gtin || termoProduto)) {
            if (onDataFetched) onDataFetched(data);
            setShouldFetch(false);
        }
    }, [data, gtin, termoProduto, shouldFetch, onDataFetched]);

    const handleBuscar = () => {
        if (!selectedCidade || !selectedBase) {
            showSnackbar('Por favor, preencha a cidade e a base', 'warning');
            return;
        }
        if (!gtin && !termoProduto) {
            showSnackbar('Por favor, preencha o GTIN ou o nome do produto', 'warning');
            return;
        }
        setShouldFetch(true);
    };

    useEffect(() => {
        const onExecute = () => {
            handleBuscar();
        };
        window.addEventListener('executarBusca', onExecute);
        return () => window.removeEventListener('executarBusca', onExecute);
    }, [selectedCidade, selectedBase, gtin, termoProduto, codigoLocalidade]);

    return (
        <>
            <Backdrop open={isLoading} sx={loadingStyles}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                alignItems: 'flex-end', 
                flexWrap: 'wrap', 
                padding: 2,
                '& > *': {
                    flex: '1 1 auto',
                    minWidth: '150px',
                    maxWidth: '350px'
                }
            }}>
                {error && <Box sx={{ width: '100%', color: 'red' }}>Erro ao buscar dados. Tente novamente.</Box>}

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

            <TextField
                label="Gtin"
                variant="outlined"
                value={gtin}
                onChange={handleGtinChange}
                disabled={!!termoProduto}
                sx={smallInputStyles}
            />

            <TextField
                label="Nome do Produto"
                variant="outlined"
                value={termoProduto}
                onChange={handleTermoChange}
                disabled={!!gtin}
                sx={inputStyles}
            />

            <TextField
                label="Código de localidade"
                variant="outlined"
                value={codigoLocalidade}
                InputProps={{ readOnly: true }}
                sx={{ ...smallInputStyles, ...readOnlyInputStyles }}
            />

            <TextField
                select
                label="Raio de busca"
                value={raio}
                onChange={handleRaioChange}
                sx={inputStyles}
            >
                <MenuItem value={5000}>5000 Metros</MenuItem>
                <MenuItem value={2000}>2000 Metros</MenuItem>
                <MenuItem value={1000}>1000 Metros</MenuItem>
                <MenuItem value={500}>500 Metros</MenuItem>
                <MenuItem value={100}>100 Metros</MenuItem>
            </TextField>

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

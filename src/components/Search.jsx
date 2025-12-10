import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { inputStyles, autocompleteStyles, readOnlyInputStyles } from '../styles/inputStyles';

export function Search({ onDataFetched }) {
    const [selectedCidade, setSelectedCidade] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);
    const [codigoLocalidade, setCodigoLocalidade] = useState('');
    const [gtin, setGtin] = useState('');
    const [termoProduto, setTermoProduto] = useState('');
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
        'http://localhost:3000/italoBases/cities',
        { enabled: openAutocomplete }
    );

    const { data: bases = [], isLoading: loadingBases } = useApi(
        'bases',
        'http://localhost:3000/italoBases/bases',
        {
            enabled: shouldFetchBases && !!selectedCidade,
            params: { name: selectedCidade?.cidade }
        }
    );

    const { data, isLoading, error } = useApi(
        'menor-preco',
        'http://localhost:3000/nota-parana/search',
        {
            enabled: shouldFetch && !!codigoLocalidade && (!!gtin || !!termoProduto),
            params: {
                local: codigoLocalidade,
                ...(gtin && { gtin }),
                ...(termoProduto && { termo: termoProduto })
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

    useEffect(() => {
        // Quando a busca for concluída (por GTIN ou termo), notificamos o parent
        // O backend já está persistindo os dados, então o frontend não precisa mais
        // enviar nada para gravação.
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

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap', padding: 2 }}>
            {isLoading && <Box sx={{ width: '100%', color: 'white' }}>Carregando...</Box>}
            {error && <Box sx={{ width: '100%', color: 'red' }}>Erro ao buscar dados. Tente novamente.</Box>}

            <Autocomplete
                disablePortal
                options={cidades}
                loading={loadingCidades}
                getOptionLabel={(option) => option.cidade || ''}
                isOptionEqualToValue={(option, value) => option.cidade === value.cidade}
                onOpen={() => setOpenAutocomplete(true)}
                onClose={() => setOpenAutocomplete(false)}
                sx={autocompleteStyles}
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
                sx={autocompleteStyles}
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
                sx={{ ...inputStyles, minWidth: 200 }}
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
                sx={readOnlyInputStyles}
            />

            <Button
                variant="contained"
                onClick={handleBuscar}
                sx={{ height: 56, minWidth: 150, textTransform: 'none', fontSize: '1rem' }}
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
    );
}

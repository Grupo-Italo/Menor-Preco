import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

export function Search({ onDataFetched }) {
    const [selectedCidade, setSelectedCidade] = useState(null);
    const [selectedBase, setSelectedBase] = useState(null);
    const [codigoLocalidade, setCodigoLocalidade] = useState('');
    const [gtin, setGtin] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [shouldFetchBases, setShouldFetchBases] = useState(false);

    const { data: cidades = [], isLoading: loadingCidades } = useApi(
        'cidades',
        'http://localhost:5432/italoBases/cities',
        { enabled: openAutocomplete }
    );

    const { data: bases = [], isLoading: loadingBases } = useApi(
        'bases',
        'http://localhost:5432/italoBases/bases',
        { 
            enabled: shouldFetchBases && !!selectedCidade,
            params: { name: selectedCidade?.cidade }
        }
    );

    const { data, isLoading, error } = useApi(
        'menor-preco',
        'https://menorpreco.notaparana.pr.gov.br/api/v1/produtos',
        {
            enabled: shouldFetch && !!codigoLocalidade && !!gtin,
            params: { local: codigoLocalidade, gtin }
        }
    );

    const handleCidadeChange = (event, newValue) => {
        setSelectedCidade(newValue);
        setSelectedBase(null);
        setCodigoLocalidade('');
        if (newValue) {
            setShouldFetchBases(true);
        } else {
            setShouldFetchBases(false);
        }
    };

    const handleBaseChange = (event, newValue) => {
        setSelectedBase(newValue);
        setCodigoLocalidade(newValue ? newValue.geohash : '');
    };

    const handleGtinChange = (event) => {
        setGtin(event.target.value);
    };

    useEffect(() => {
        if (data && onDataFetched) {
            onDataFetched(data);
        }
    }, [data, onDataFetched]);

    const handleBuscar = () => {
        if (!selectedCidade || !selectedBase || !gtin) {
            alert('Por favor, preencha a cidade, base e o GTIN');
            return;
        }
        setShouldFetch(true);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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
                sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    }
                }}
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
                sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    }
                }}
                value={selectedBase}
                onChange={handleBaseChange}
                renderInput={(params) => <TextField {...params} label="Base" />}
            />
            <TextField
                id="outlined-basic"
                label="Gtin"
                variant="outlined"
                value={gtin}
                onChange={handleGtinChange}
                sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    }
                }}
            />
            <TextField
                id="filled-basic"
                label="Código de localidade"
                variant="filled"
                value={codigoLocalidade}
                InputProps={{
                    readOnly: true,
                }}
                sx={{
                    width: 300,
                    '& .MuiFilledInput-root': {
                        backgroundColor: 'white',
                    }
                }}
            />
            <Button variant="contained" onClick={handleBuscar}>Executar busca</Button>
        </Box>
    );
}
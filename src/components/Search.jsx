import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Box } from '@mui/material';
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
        const value = event.target.value;
        setGtin(value);
        if (value) {
            setTermoProduto('');
        }
    };

    const handleTermoChange = (event) => {
        const value = event.target.value;
        setTermoProduto(value);
        if (value) {
            setGtin('');
        }
    };

    useEffect(() => {
        if (data && onDataFetched) {
            onDataFetched(data);
        }
    }, [data, onDataFetched]);

    const handleBuscar = () => {
        if (!selectedCidade || !selectedBase) {
            alert('Por favor, preencha a cidade e a base');
            return;
        }
        if (!gtin && !termoProduto) {
            alert('Por favor, preencha o GTIN ou o nome do produto');
            return;
        }
        setShouldFetch(true);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'flex-end', 
            flexWrap: 'wrap',
            padding: 2
        }}>
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
                InputProps={{
                    readOnly: true,
                }}
                sx={readOnlyInputStyles}
            />

            <Button 
                variant="contained" 
                onClick={handleBuscar}
                sx={{
                    height: 56,
                    minWidth: 150,
                    textTransform: 'none',
                    fontSize: '1rem'
                }}
            >
                Executar busca
            </Button>
        </Box>
    );
}
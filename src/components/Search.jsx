import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import baselocais from '../data/baselocais';
import { Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export function Search({ onDataFetched }) {
    const [selectedLocal, setSelectedLocal] = useState(null);
    const [codigoLocalidade, setCodigoLocalidade] = useState('');
    const [gtin, setGtin] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false);
    const [dataFetched, setDataFetched] = useState(null);

    const handleLocalChange = (event, newValue) => {
        setSelectedLocal(newValue);
        setCodigoLocalidade(newValue ? newValue.local : '');
    };

    const handleGtinChange = (event) => {
        setGtin(event.target.value);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['menor-preco', codigoLocalidade, gtin],
        queryFn: async () => {
            const url = `https://menorpreco.notaparana.pr.gov.br/api/v1/produtos?local=${codigoLocalidade}&gtin=${gtin}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            return response.json();
        },
        enabled: shouldFetch && !!codigoLocalidade && !!gtin,
    });

    useEffect(() => {
        if (data && onDataFetched) {
            onDataFetched(data);
        }
    }, [data, onDataFetched]);

    const handleBuscar = () => {
        if (!selectedLocal || !gtin) {
            alert('Por favor, preencha o local e o GTIN');
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
                options={baselocais}
                sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    }
                }}
                value={selectedLocal}
                onChange={handleLocalChange}
                renderInput={(params) => <TextField {...params} label="Local" />}
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
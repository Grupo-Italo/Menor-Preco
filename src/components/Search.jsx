import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import baselocais from '../data/baselocais';
import { Button, Box } from '@mui/material';
import { useState } from 'react';

export function Search() {
    const [selectedLocal, setSelectedLocal] = useState(null);
    const [codigoLocalidade, setCodigoLocalidade] = useState('');

    const handleLocalChange = (event, newValue) => {
        setSelectedLocal(newValue);
        setCodigoLocalidade(newValue ? newValue.local : '');
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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
            <Button variant="contained">Executar busca</Button>
        </Box>
    );
}
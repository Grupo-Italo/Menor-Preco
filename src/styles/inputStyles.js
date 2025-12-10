export const inputStyles = {
    minWidth: '150px',
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#2c2c2c',
        color: 'white',
        '& fieldset': {
            borderColor: '#444',
        },
        '&:hover fieldset': {
            borderColor: '#8ab4f8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#8ab4f8',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#9e9e9e',
        '&.Mui-focused': {
            color: '#8ab4f8',
        }
    }
};

export const autocompleteStyles = {
    ...inputStyles,
    '& .MuiAutocomplete-popupIndicator': {
        color: '#9e9e9e',
    }
};

export const readOnlyInputStyles = {
    minWidth: '150px',
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#2c2c2c',
        color: '#9e9e9e',
        '& fieldset': {
            borderColor: '#444',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#9e9e9e',
    }
};
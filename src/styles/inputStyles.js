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

export const largeInputStyles = {
    ...autocompleteStyles,
    minWidth: '200px',
    maxWidth: '370px',
    flex: '1.1 1 auto'
};

export const buttonSearchStyles = {
    backgroundColor: '#3c5271ff',
    color: 'white',
    textTransform: 'none',
    padding: '6px 10px',
    fontWeight: 600,
    flex: '0.5 1 auto',
    minWidth: '100px',
    alignSelf: 'center',
    '&:hover': {
        backgroundColor: '#1565c0'
    }
};

export const smallInputStyles = {
    ...inputStyles,
    minWidth: '100px',
    maxWidth: '150px',
    flex: '0.6 1 auto'
};

export const loadingStyles = {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1400,
    backgroundColor: 'rgba(0,0,0,0.55)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiCircularProgress-root': {
        color: '#8ab4f8'
    }
};

export const boxSearchStyles = {
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
}
import React from 'react'
import { styled, Autocomplete, TextField, Box } from '@mui/material'
import { countries } from '../Register/nationalities';

const CustomAutocomplete = styled(Autocomplete)({
    '&': {
        width: '100%',
    },

    '& .MuiFilledInput-root': {
        height: '55px',
        width: '100%',
        backgroundColor: '#E7F3FF !important'
    },
    // '& .Mui-Focused': {
    //     backgroundColor: 'blue'
    // },
    // '& .MuiFilledInput-root:focus': {
    //     backgroundColor: '#E7F3FF'
    // },
    '& .MuiFilledInput-root:active': {
        backgroundColor: '#E7F3FF'
    },

    '& .MuiFilledInput-input': {
        fontFamily: 'Work Sans',
        fontWeight: '500',
        fontSize: '14px',
    }
});


function FormAutoComplete({
    options,
    value,
    handleChange,
    label,
    disabled
}) {

    return (
        <CustomAutocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: '48%', }}
            size="small"
            value={value}
            onChange={(e, newValue) => {
                handleChange(newValue)
            }}
            disabled={disabled}

            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                    variant="filled"
                    InputLabelProps={{
                        style: {
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            fontSize: '15px',
                            marginTop: '4px'
                        }
                    }}
                    required
                />
            }

            renderOption={(props, option) => (
                <Box style={{
                    fontSize: 14,
                    fontFamily: 'Work Sans',
                    paddingLeft: '10px',
                    letterSpacing: '-0.5px'
                }} {...props}>
                    {option}
                </Box>
            )}

            ListboxProps={
                {
                    style: {
                        maxHeight: '200px',
                    }
                }
            }
        />
    )
}

export default FormAutoComplete
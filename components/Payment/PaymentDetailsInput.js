import { CircularProgress, InputAdornment, TextField, styled } from '@mui/material'
import React from 'react'
import styles from '../../styles/Payment/Payment.module.scss'
import { TiTick } from 'react-icons/ti'

export const CustomTextField = styled(TextField)({
    // '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //     borderColor: '#00BB6D'
    // },
    // "& .MuiInputLabel-root": {
    //     color: '#00BB6D'
    // },

    '& .MuiInputBase-root.Mui-disabled': {
        color: 'black'
    },
    '& .MuiInputBase-root.Mui-disabled .MuiInputBase-input': {
        textFillColor: "#777"
    },
    '& .MuiFormHelperText-root': {
        margin: '2px 0px -10px 0px',
        letterSpacing: '0px'
    },
});

export const SuccessTextField = styled(TextField)({
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#00AE71',
        borderWidth: '2px'
    },
    "& .MuiInputLabel-root": {
        color: '#00AE71'
    },
});

function PaymentDetailsInput({
    label,
    width,
    loading,
    value,
    onChange,
    locked,
    error,
    errorText,
    success,
    required,
    noTick
}) {
    const InputProps = loading ? {
        endAdornment: (
            <InputAdornment position="end">
                <div style={{
                    transform: 'translate(12px, 2px)',
                }}>
                    <CircularProgress style={{
                        padding: '12px',
                        color: '#29b6f6'
                    }} />
                </div>

            </InputAdornment>
        )
    } : locked && !noTick && {
        endAdornment: (
            <InputAdornment position="end">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TiTick style={{ fontSize: '20px' }} />
                </div>

            </InputAdornment>
        )
    }

    const inputProps = {
        style: {
            fontFamily: 'Work Sans',
            fontWeight: '500',
            fontSize: '14px',
        }
    }

    const InputLabelProps = {
        style: {
            fontFamily: 'Poppins',
            fontWeight: '500',
            fontSize: '13px',
            marginTop: '4px'
        }
    }

    if (success) {
        return (
            <SuccessTextField
                variant='outlined'
                label={label}
                size='small'
                style={{ width: width }}
                className={styles.emailTextField}
                value={value}
                onChange={onChange}
                error={error}
                helperText={error && errorText}
                inputProps={inputProps}
                disabled={locked}
                required={required}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TiTick style={{ fontSize: '20px', color: '#00AE71' }} />
                            </div>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={InputLabelProps}
            />
        )
    }
    return (
        <CustomTextField
            variant='outlined'
            label={label}
            size='small'
            style={{ width: width }}
            className={styles.emailTextField}
            value={value}
            onChange={onChange}
            error={error}
            required={required}
            helperText={error && errorText}
            inputProps={InputProps}
            disabled={locked}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
        />
    )
}

export default PaymentDetailsInput
import React from 'react';
import styles from '../../../styles/Register/DetailsInput.module.scss';
import TextField from '@mui/material/TextField';

function RegisterInput({
    error,
    index,
    label,
    width,
    type,
    inputRefs,
    value,
    setValue,
    required,
    onKeyDown,
    marginLeft
}) {
    const handleKeyPress = (e) => {
        if (e.key == "Enter") {
            const event = e;
            console.log(inputRefs.current)
            if (inputRefs.current[index + 1])
                inputRefs.current[index + 1].focus();
            event.preventDefault();
        }
    }
    return (
        <TextField
            error={error}
            inputRef={(ref) => {
                if (inputRefs) inputRefs.current[index] = ref
            }}
            className={styles.detailInput}
            label={label}
            required={required}
            variant="filled"
            size='medium'
            value={value}
            onChange={setValue}
            type={type && type}

            style={{
                width: width,
                marginLeft: marginLeft && marginLeft
            }}

            onKeyDown={onKeyDown ? onKeyDown : (e) => {
                handleKeyPress(e);
            }}

            inputProps={{
                style: {
                    fontFamily: 'Work Sans',
                    fontWeight: '500',
                    fontSize: '15px',
                }
            }}
            InputLabelProps={{
                style: {
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    fontSize: '15px',
                }
            }}
        />
    )
}

export default RegisterInput
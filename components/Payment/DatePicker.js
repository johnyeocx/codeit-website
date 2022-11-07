import { InputAdornment, styled, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useContext } from 'react'
import { TiTick } from 'react-icons/ti';
import AppContext from '../../AppContext';
import styles from '../../styles/Payment/Payment.module.scss'
import { breakpoints } from '../constants';
import { CustomTextField } from './PaymentDetailsInput';

const CustomMobileDatePicker = styled(MobileDatePicker)({
    '& .MuiOutlinedInput-root.Mui-disabled': {
        color: 'black',
        backgroundColor: 'black'
    },
    '& .MuiInputBase-root.Mui-disabled .MuiInputBase-input': {
        backgroundColor: 'black',
        textFillColor: "#777"
    },
});

function DatePicker({ date, onChange, locked }) {
    const value = useContext(AppContext);
    let { dimensions } = value.state;

    const isMobile = () => {
        return dimensions.width < breakpoints.tablet
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CustomMobileDatePicker
                label="Date Of Birth"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={onChange}
                disabled={locked}

                renderInput={
                    (params) =>
                        <CustomTextField
                            variant='outlined'
                            required
                            size='small'

                            style={{
                                marginLeft: '20px',
                                width: '48%',
                            }
                            }

                            sx={{
                                svg: { width: "18px", height: "18px", marginRight: '10px' }
                            }}
                            className={styles.datePickerTextField}

                            {...params}

                            InputLabelProps={{
                                style: {
                                    fontFamily: 'Poppins',
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    top: '2px'
                                }
                            }}

                            InputProps={
                                locked && {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: '0px'
                                            }}>
                                                <TiTick style={{ fontSize: '25px', transform: 'translateX(9px)' }} />
                                            </div>

                                        </InputAdornment>
                                    )
                                }
                            }
                        />
                }
            />
            {/* {isMobile() ? (
                <DatePicker
                    label="Date Of Birth"
                    inputFormat="dd/MM/yyyy"
                    value={date}
                    onChange={onChange}
                    // disabled={true}
                    renderInput={(params) =>
                        <TextField
                            variant='outlined'
                            required
                            size='small'

                            style={{
                                marginLeft: '20px',
                                width: '48%',
                            }}

                            sx={{
                                svg: { width: "18px", height: "18px" }
                            }}
                            className={styles.datePickerTextField}

                            {...params}

                            InputLabelProps={{
                                style: {
                                    fontFamily: 'Poppins',
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    top: '2px'
                                }
                            }}
                        />
                    }
                />
            ) : (
                <MobileDatePicker
                    label="Date Of Birth"
                    inputFormat="dd/MM/yyyy"
                    // value={value}
                    // onChange={handleChange}
                    renderInput={
                        (params) =>
                            <TextField
                                variant='outlined'
                                required
                                size='small'

                                style={{
                                    marginLeft: '20px',
                                    width: '48%',
                                }
                                }

                                sx={{
                                    svg: { width: "18px", height: "18px", marginRight: '10px' }
                                }}
                                className={styles.datePickerTextField}

                                {...params}

                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '13px',
                                        top: '2px'
                                    }
                                }}
                            />
                    }
                />
            )} */}


        </LocalizationProvider>
    )
}

export default DatePicker
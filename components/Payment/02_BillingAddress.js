import { Button, FormControl, styled, InputLabel, Select, MenuItem, Autocomplete, TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../styles/Payment/Payment.module.scss'
import { countries } from '../Register/nationalities';
import PaymentDetailsInput from './PaymentDetailsInput'

const CustomAutocomplete = styled(Autocomplete)({
    '& .MuiInputBase-root.Mui-disabled .MuiInputBase-input': {
        textFillColor: "#777"
    },

    '& .MuiOutlinedInput-root': {
        height: '45px'
    },

    '& .MuiOutlinedInput-input': {
        fontFamily: 'Work Sans',
        fontWeight: '500',
        fontSize: '14px',
    }
});

function BillingAddress({
    setPage,
    page,
    paymentDetails,
    billingAddressDetails,
    setBillingAddressDetails
}) {
    const [fadeOut, setFadeOut] = useState(false)

    const handleBackClicked = () => {
        setFadeOut(true)
        setTimeout(() => {
            setPage(page - 1)
            setFadeOut(false)
        }, 150)
    }

    return (
        <div className={`${styles.billingAddressContainer} ${fadeOut && styles.fadeOutRight}`}>
            <div className={styles.header}>
                <h3>
                    Billing Address
                </h3>

            </div>

            <div className={styles.inputsContainer}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>
                    <PaymentDetailsInput
                        label="Address"
                        width="100%"
                        required
                        value={billingAddressDetails.address}
                        onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, address: e.target.value })}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                }}>

                    <CustomAutocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={countries}
                        sx={{ width: '48%', }}
                        size="small"
                        value={billingAddressDetails.country}
                        onChange={(e, newValue) => {
                            setBillingAddressDetails({ ...billingAddressDetails, country: newValue })
                        }}

                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Country"
                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Poppins',
                                        fontWeight: '500',
                                        fontSize: '13px',
                                        marginTop: '4px'
                                    }
                                }}
                                required
                            />
                        }
                        getOptionLabel={(option) => option && option.label}

                        renderOption={(props, option) => (
                            <Box style={{
                                fontSize: 14,
                                fontFamily: 'Work Sans',
                                paddingLeft: '10px',
                                letterSpacing: '-0.5px'
                            }} {...props}>
                                {option && option.label}
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

                    <PaymentDetailsInput
                        label="Postal Code"
                        width="48%"
                        required
                        value={billingAddressDetails.postal_code}
                        onChange={(e) => setBillingAddressDetails({ ...billingAddressDetails, postal_code: e.target.value })}
                    />
                </div>
                <div className={styles.separator} />




                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#8F90F7',
                            width: 50,
                            height: 35,
                        }}
                        disableElevation
                        onClick={() => handleBackClicked()}
                    >
                        <p style={{ fontSize: '14px' }}>Back</p>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default BillingAddress
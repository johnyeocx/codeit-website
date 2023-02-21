import React from 'react'
import styles from '../../styles/Deposit/Deposit.module.scss'
import { FaPen } from 'react-icons/fa'
import { TextField } from '@mui/material'

function DetailsContainer({
    field,
    label,
    depositDetails,
    setDepositDetails,
    fieldEditing,
    setFieldEditing
}) {
    // console.log(field, fieldEditing)
    console.log()
    return (
        <>
            {
                fieldEditing[field] ? (
                    <div className={styles.infoTextContainer} style={{ marginTop: '20px' }}>
                        <div className={styles.left}>
                            <span>{`${label}: `}</span>
                            <TextField
                                className={styles.detailInput}
                                variant="filled"
                                size='small'
                                style={{
                                    width: "70%",
                                }}
                                inputProps={{
                                    style: {
                                        fontFamily: 'Work Sans',
                                        fontWeight: '500',
                                        fontSize: '15px',
                                        marginBottom: '15px'
                                    }
                                }}
                                value={depositDetails[field]}
                                onChange={(e) => {
                                    let newDepositDetails = { ...depositDetails }
                                    newDepositDetails[field] = e.target.value
                                    setDepositDetails(newDepositDetails)
                                }}
                            />
                        </div>


                    </div>
                ) : (
                    <div className={styles.infoTextContainer} style={{ marginTop: '15px' }}>
                        <div className={styles.left}>
                            <span>{`${label}:`}</span>
                            <p>{depositDetails[field]}</p>
                        </div>

                        <button
                            className={styles.right}
                            onClick={
                                () => {
                                    let newFieldEditing = { ...fieldEditing }
                                    newFieldEditing[field] = !newFieldEditing[field]
                                    setFieldEditing(newFieldEditing)
                                }
                            }
                        >
                            <FaPen style={{ fontSize: 14 }} />
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default DetailsContainer
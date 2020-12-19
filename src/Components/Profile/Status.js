import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateStatus } from '../../redux/profileReducer'
import styles from './Status.module.css'

const Status = (props) => {
    const [statusInput, setStatusInput] = useState(props.status)
    const [editMode, toggleEditMode] = useState(false)
    const onStatusInputChange = (e) => {
        setStatusInput(e.target.value)
    }
    useEffect(() => {
        setStatusInput(props.status)
    }, [props.status])

    const dispatch = useDispatch()

    const setStatus = (e) => {
        e.preventDefault()
        dispatch(updateStatus(statusInput))
        toggleEditMode(!editMode)
    }

    return (
        <div className={styles.status}>
            {!editMode
            ? <div>
                { props.status || 'No status :(' }
                { props.isPageOwner && <i onClick={() => toggleEditMode(!editMode)} className="fas fa-pencil-alt"></i>}
            </div>
            : <form className={styles.form} onSubmit={setStatus}>
                    <input autoFocus type='text' name='status' onChange={onStatusInputChange} onBlur={() => toggleEditMode(!editMode)} placeholder={statusInput} value={statusInput}/>
                    <i className="far fa-check-circle" onMouseDown={setStatus}></i>
            </form> 
            }
        </div>
    )
}

export default Status
import React from 'react'
import styles from './Settings.module.css'
import {Formik, Form, Field} from 'formik'
import { setProfileAC, updateProfile } from '../../redux/profileReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'

const Settings = () => {
    const loggedUserID = useSelector(state => state.auth.id)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setProfileAC(loggedUserID))
    }, [dispatch, loggedUserID])
    const [isUpdated, setUpdated] = useState(false)

    return (
        <div className={styles.settingsPage}>
            <div className={styles.title}>Settings</div>
            <Formik
                enableReinitialize
                initialValues={{
                    aboutMe: profile.aboutMe,
                    lookingForAJobDescription: profile.lookingForAJobDescription,
                    fullName: profile.fullName,
                    lookingForAJob: profile.lookingForAJob,
                    contacts: profile.contacts
                }}
                onSubmit={(values, { setSubmitting, setStatus }) => {
                    setStatus(null)
                    setSubmitting(true)
                    dispatch(updateProfile(values, setSubmitting, setStatus, setUpdated))
                }}
            >
                {({ isSubmitting, status }) => (
                <Form>
                    <label htmlFor='fullName'>Full name:</label>
                    <Field name='fullName' id='fullName' />
                    <label htmlFor='aboutMe'>About me:</label>
                    <Field name='aboutMe' id='aboutMe' />
                    <label htmlFor='lookingForAJobDescription'>Tech stack:</label>
                    <Field name='lookingForAJobDescription' id='lookingForAJobDescription' />
                    <label htmlFor='lookingForAJob' className={styles.job}>Lookin for a job: <Field name='lookingForAJob' id='lookingForAJob' type='checkbox' /></label>
                    { Object.keys(profile.contacts).map(key => {
                        return <div key={key}>
                            <label htmlFor={`contacts.${key}`} className={styles.contact}>{key}:</label>
                            <Field name={`contacts.${key}`} id={`contacts.${key}`} />
                        </div>
                    })}
                    <button className={styles.btn} type='submit' disabled={isSubmitting}>Save</button>
                    { status && status.map(el => (
                        <div key='el' className={styles.errorMessage}>{el}</div>
                    ))}
                    {isUpdated && <div className={styles.successMessage}>Settings updated!</div>}
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Settings
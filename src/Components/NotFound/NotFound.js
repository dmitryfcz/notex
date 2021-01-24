import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {
    let location = useLocation().pathname
    return (
        <div className={styles.notfound}>
            {
                location === '/dialogs'
                ? <p>Sorry!<br />This section is under development.</p>
                : <p>404<br />Sorry! Page not found.</p>
            }
            <img src='/img/404.gif' alt='' />
        </div>
    )
}

export default NotFound
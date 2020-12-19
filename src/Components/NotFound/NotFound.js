import React from 'react'
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <p>404<br />Sorry! Page not found.</p>
            <img src="/img/404.gif" alt="" />
        </div>
    )
}

export default NotFound
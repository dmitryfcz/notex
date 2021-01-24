import React from 'react'
import styles from './About.module.css'

const About = () => {
    return (
        <div className={styles.aboutPage}>
            <h1><span role='img' aria-label='title'>🔥❤️</span></h1>
            A social network for React developers. It's like VK and LinkedIn in one place. At the moment it's still under development. The entire network backend is implemented and provided for public use by <a href='https://www.youtube.com/channel/UCTW0FUhT0m-Bqg2trTbSs0g' target='_blank'>Dmitry from IT-KAMASUTRA</a>. The frontend is implemented by me.
            <br/>
            <b>dmitry.fcz@gmail.com</b>
        </div>
    )
}

export default About
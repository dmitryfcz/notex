import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './../../redux/usersReducer'
import styles from './Users.module.css'
import Avatar from 'react-avatar';

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getUsers(1))
    }, [dispatch])
    return (
        <div className={styles.users}>
            {users.users.map(el => {
                return <div className={styles.user} key={el.id}>
                    {el.photos.large
                        ? <img src={el.photos.large} alt=""/>
                        : <Avatar name={el.name} size="100" maxInitials="2" round="50%" />
                    }
                    <p>{el.name}</p>
                    <button className={styles.btn}>Follow</button>
                </div>
            })}
        </div>
    )
}

export default Users
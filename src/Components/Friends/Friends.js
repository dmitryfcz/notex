import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './../../redux/usersReducer'
import styles from './../Users/Users.module.css'
import Avatar from 'react-avatar';
import Pagination from 'react-js-pagination';
import { Link, useHistory, useParams } from 'react-router-dom'

const Friends = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const history = useHistory()
    let {currentPage} = useParams()
    useEffect(() => {
        dispatch(getUsers(currentPage || 1, users.pageSize, '', true))
    }, [dispatch, users.pageSize, currentPage])
    const onPageChange = page => {
        history.push(`/friends/${page}`)
    }
    return (
        <>
        <div className={styles.users}>
            {users.users.map(el => {
                return <div className={styles.user} key={el.id}>
                    <Link to={`/profile/${el.id}`}>{el.photos.large
                        ? <img src={el.photos.large} alt=''/>
                        : <Avatar name={el.name} size='100' maxInitials={2} round='50%' className={styles.sbAvatar} />
                    }</Link>
                    <Link to={`/profile/${el.id}`} className={styles.userName}>{el.name}</Link>
                    <Link to='/dialogs' className={styles.btn + ' ' + styles.btnMessage} >Send message</Link>
                </div>
            })}
        </div>
        {users.usersCount > 9 &&
            <Pagination
                activePage={parseInt(currentPage) || 1}
                onChange={onPageChange}
                getPageUrl={page => page.toString()}
                totalItemsCount={users.usersCount || 0}
                itemsCountPerPage={users.pageSize}
                hideDisabled
                innerClass={styles.pagination}
                itemClass={styles.navItem}
                activeClass={styles.navActive}
            />
        }
        </>
    )
}

export default Friends
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { follow, getUsers, unfollow } from './../../redux/usersReducer'
import styles from './Users.module.css'
import Avatar from 'react-avatar';
import Pagination from "react-js-pagination";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const history = useHistory()
    let {currentPage} = useParams()
    const query = new URLSearchParams(useLocation().search)
    let term = query.get('term')
    useEffect(() => {
        dispatch(getUsers(currentPage || 1, users.pageSize, term || ''))
    }, [dispatch, users.pageSize, currentPage, term])
    const onPageChange = page => {
        term
        ? history.push(`/users/${page}?term=${term}`)
        : history.push(`/users/${page}`)
    }
    const onFollow = id => {
        dispatch(follow(id))
    }
    const onUnfollow = id => {
        dispatch(unfollow(id))
    }
    const onSearch = search => {
        search
        ? history.push(`/users/?term=${search}`)
        : history.push(`/users/`)
    }
    return (
        <>
        <Formik
            enableReinitialize
            initialValues={{
                search: term || ''
            }}
            onSubmit={values => {
                onSearch(values.search)
            }}
        >
            <Form className={styles.search}>
                <Field name='search' id='search' />
                <button type='submit'>Search</button>
            </Form>
        </Formik>
        <div className={styles.users}>
            {users.users.map(el => {
                return <div className={styles.user} key={el.id}>
                    <Link to={`/profile/${el.id}`}>{el.photos.large
                        ? <img src={el.photos.large} alt=""/>
                        : <Avatar name={el.name} size="100" maxInitials={2} round="50%" className={styles.sbAvatar} />
                    }</Link>
                    <Link to={`/profile/${el.id}`} className={styles.userName}>{el.name}</Link>
                    { el.followed
                        ? <button onClick={() => onUnfollow(el.id)} className={styles.btn + ' ' + styles.btnUnfollow} disabled={users.isFollowProcessing.some(id => id === el.id)}>Unfollow</button>
                        : <button onClick={() => onFollow(el.id)} className={styles.btn} disabled={users.isFollowProcessing.some(id => id === el.id)}>Follow</button>
                    }
                </div>
            })}
        </div>
            <Pagination
                activePage={parseInt(currentPage) || 1}
                onChange={onPageChange}
                getPageUrl={page => query.toString()
                    ? page.toString() + '?' + query.toString()
                    : page.toString()
                }
                totalItemsCount={users.usersCount || 0}
                itemsCountPerPage={users.pageSize}
                hideDisabled
                innerClass={styles.pagination}
                itemClass={styles.navItem}
                activeClass={styles.navActive}
            />
        </>
    )
}

export default Users
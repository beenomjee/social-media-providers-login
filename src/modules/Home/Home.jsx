import React, { useState } from 'react'
import { Loader } from '../../components';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase';
import styles from './Home.module.scss';

const Home = (user) => {
    user = user ? user.user.providerData[0] : null;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const handleLogout = async () => {
        setIsLoading(true);
        signOut(auth);
        navigate('/login');
    }
    return (
        isLoading ? <Loader /> :
            <div className={styles.container}>
                {
                    user && (
                        <>
                            <p>Name : {user.displayName}</p>
                            <p>Email : {user.email}</p>
                            <img src={user.photoURL} alt="AVATAR" />
                        </>
                    )
                }
                <button onClick={handleLogout}>Logout</button>
            </div>
    )
}

export default Home
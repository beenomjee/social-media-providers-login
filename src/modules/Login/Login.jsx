import React, { useEffect, useState } from 'react'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import styles from './Login.module.scss'
import { auth, facebookProvider, githubProvider, googleProvider } from '../../firebase'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components'
const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const handleClick = async (e) => {
        const id = e.target.id;
        setIsLoading(true);
        try {
            if (id === 'fb') {
                await signInWithPopup(auth, facebookProvider);
                setIsLoading(false);
                navigate('/');
            }
            else if (id === 'go') {
                await signInWithPopup(auth, googleProvider);
                setIsLoading(false);
                navigate('/');
            }
            else if (id === 'gh') {
                await signInWithPopup(auth, githubProvider);
                setIsLoading(false);
                navigate('/');
            }
        } catch (err) {
            setIsLoading(false);
            alert(err.message);
        }
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
            else {
                setIsLoading(false);
            }
        });

        return () => {
            unSubscribe();
        }
    }, [])
    return (
        isLoading ? <Loader /> :
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <button onClick={handleClick} id='fb'>
                        <span className={styles.icon}><FaFacebook /></span>
                        <span className={styles.text}>Continue with Facebook</span>
                    </button>
                    <button onClick={handleClick} id='go'>
                        <span className={styles.icon}><FcGoogle /></span>
                        <span className={styles.text}>Continue with Google</span>
                    </button>
                    <button onClick={handleClick} id='gh'>
                        <span className={styles.icon}><FaGithub /></span>
                        <span className={styles.text}>Continue with Github</span>
                    </button>
                </div>
            </div>
    )
}

export default Login
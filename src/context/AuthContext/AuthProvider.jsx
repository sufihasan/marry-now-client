import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const email = 'has@gmail.com';

    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //signin in user with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // update user 
    const updateUserProfile = (profileInfo) => {
        //not use setLoading here
        return updateProfile(auth.currentUser, profileInfo);
    }

    //observer 
    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, (currentUser) => {
            SetUser(currentUser);
            setLoading(false);
        });


        return () => {
            unSubsCribe();
        }

    }, []);

    const authInfo = {
        user,
        loading,
        email,
        createUser,
        updateUserProfile,
        signIn,
        signInWithGoogle,
        logOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
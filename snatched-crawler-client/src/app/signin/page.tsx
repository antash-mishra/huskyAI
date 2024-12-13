"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';

import { useUser } from '../../context/UserContext';


// Define types for user and error
  
interface ApiError {
    error: string;
}

const GoogleSignIn = () => {
    const router = useRouter()
    const {user, setUser} = useUser();
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>  {
        const token = localStorage.getItem('auth_token');
        if (token) {
            verifyToken(token);
        }
    }, [])

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        
        if (!credentialResponse.credential) {
            setError('No credential found');
            return;
        }
        
        try {

            const response = await fetch('http://localhost:5000/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: credentialResponse.credential})
            });

            if (!response.ok) {
              const errorData: ApiError = await response.json();
              throw new Error(errorData.error || 'Authentication failed');
            }
            
            const data = await response.json()
            console.log("Data: ", data)
            localStorage.setItem('auth_token', data.token)

            // Set user information
            setUser(data.user);
            router.push('/history')
        }
        
        catch (error) {
            console.log("Google Sign-In failed: ", error)
        }
    };

    const verifyToken = async (token: string) => {
        try {
            const response = await fetch('http://localhost:5000/auth/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Token verification failed');
            }
            
            const data = await response.json()
            
            setUser(data.user);
        }
        catch (err) {
            localStorage.removeItem('auth_token');
            setError(err instanceof Error ? err.message : 'Token verification failed');
        }
    }

    const handleGoogleFailure = () => {
        console.log("Google Sign-In Failed")
    }

    const handleLogout = () => {
        localStorage.removeItem('auth_token')
        setUser(null)
        router.push('/');
    };

    return (
        <div className="p-4">
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
  
        {!user ? (
            <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
          </GoogleOAuthProvider>
        ) : (
          <div>
            <p>Welcome, {user.name}</p>
            <button 
              onClick={handleLogout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
  
    )
}

export default GoogleSignIn;
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';

import { useUser } from '../../context/UserContext';
import { base_url, token_store, user_detail_store } from '@/shared/consts';


// Define types for user and error
  
interface ApiError {
    error: string;
}

const GoogleSignIn = () => {
    const router = useRouter()
    const {user, setUser} = useUser();
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>  {
        const token = localStorage.getItem(token_store);
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

            const response = await fetch(base_url + '/auth/google', {
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
            localStorage.setItem(token_store, data.token)
	    localStorage.setItem(user_detail_store, data.user.email)
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
            const response = await fetch( base_url + '/auth/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Token verification failed');
            }
            
            const data = await response.json()

            localStorage.setItem(user_detail_store, data.user);
            setUser(data.user);
        }
        catch (err) {
            localStorage.removeItem(token_store);
            setError(err instanceof Error ? err.message : 'Token verification failed');
        }
    }

    const handleGoogleFailure = () => {
        console.log("Google Sign-In Failed")
    }

    const handleLogout = () => {
        localStorage.removeItem(token_store)
        localStorage.removeItem(user_detail_store)
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
            <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
            
            <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              theme="filled_black"
              shape="rectangular"
              size="large"
              text="continue_with"
              locale="en"
              width="300"
            />
            </div>
          
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
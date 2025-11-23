'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useOAuthSignInMutation } from '@/services/auth'

export default function AuthCallbackPage() {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const oauthMutation = useOAuthSignInMutation()
    const hasRun = useRef(false)

    useEffect(() => {
        // Prevent running twice in development strict mode
        if (hasRun.current) return
        hasRun.current = true

        const handleCallback = async () => {
            try {
                // Get the session from Supabase after OAuth redirect
                const { data: { session }, error: sessionError } = await supabase.auth.getSession()

                if (sessionError) {
                    throw sessionError
                }

                if (!session) {
                    throw new Error('No session found after OAuth')
                }

                // Get the access token from Supabase session
                const supabaseToken = session.access_token

                // Send the token to our backend
                await oauthMutation.mutateAsync({
                    token: supabaseToken,
                })

                // Redirect to dashboard after successful authentication
                router.replace('/dashboard')
            } catch (error) {
                console.error('OAuth callback error:', error)
                setError(error instanceof Error ? error.message : 'Authentication failed')

                // Redirect to auth page after 3 seconds
                setTimeout(() => {
                    router.replace('/auth')
                }, 3000)
            }
        }

        handleCallback()
    }, []) // Empty dependency array - only run once

    if (error) {
        return (
            <div className="min-h-screen bg-custom-green flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 p-4 border-2 border-red-500 bg-red-50 rounded-lg max-w-md">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                    <p className="text-black/60">Redirecting to login...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-custom-green flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                <p className="mt-4 text-[clamp(14px,1.5vw,16px)] text-black/60">
                    Completing sign in...
                </p>
            </div>
        </div>
    )
}

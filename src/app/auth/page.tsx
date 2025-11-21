'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSignInMutation, useSignUpMutation, authKeys, type User } from '@/services/auth'
import { resolveErrorMessage } from '@/lib/helper/error-helper'

type AuthMode = 'signin' | 'signup'

export default function AuthPage() {
    const [mode, setMode] = useState<AuthMode>('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const queryClient = useQueryClient()

    const signInMutation = useSignInMutation()
    const signUpMutation = useSignUpMutation()

    // Redirect to dashboard if user is already logged in
    useEffect(() => {
        const user = queryClient.getQueryData<User>(authKeys.me())
        if (user) {
            router.replace('/dashboard')
        }
    }, [queryClient, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            if (mode === 'signup') {
                // Sign up with email, password, and fullname
                await signUpMutation.mutateAsync({
                    email,
                    password,
                    fullname
                })
            } else {
                // Sign in with email and password
                await signInMutation.mutateAsync({
                    email,
                    password
                })
            }

            // Session cookie is set automatically by backend
            // Navigate to dashboard
            router.push('/dashboard')
        } catch (unknownError) {
            // Handle errors with centralized error resolver
            setError(resolveErrorMessage(unknownError))
        }
    }

    const handleDemo = () => {
        router.push('/dashboard')
    }

    const isLoading = signInMutation.isPending || signUpMutation.isPending

    return (
        <div className="min-h-screen bg-custom-green flex items-center justify-center p-[clamp(20px,4vw,40px)]">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-black/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-[480px] relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-[clamp(30px,6vw,40px)] flex flex-col items-center">
                    <h1 className="font-family-logo font-bold tracking-tightest-custom text-[clamp(48px,10vw,80px)] leading-[0.85] mb-4 text-center">
                        ORCHESTOR
                    </h1>
                    <p className="text-[clamp(14px,1.5vw,18px)] opacity-70 text-center">
                        AI-Powered Social Media Scheduling
                    </p>
                </div>

                <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <CardHeader className="space-y-1 ">
                        <CardTitle className="text-[clamp(24px,3vw,32px)] font-bold">
                            {mode === 'signin' ? 'Welcome back' : 'Create account'}
                        </CardTitle>
                        <CardDescription className="text-[clamp(14px,1.5vw,16px)]">
                            {mode === 'signin'
                                ? 'Enter your credentials to access your dashboard'
                                : 'Sign up to start automating your content'}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Error Display */}
                        {error && (
                            <div className="mb-4 p-4 border-2 border-red-500 bg-red-50 rounded-lg">
                                <p className="text-[clamp(14px,1.5vw,16px)] text-red-700 font-medium">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Google Sign In */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-[52px] text-[clamp(16px,1.5vw,18px)] font-medium mb-6"
                            disabled
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </Button>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-black/10" />
                            </div>
                            <div className="relative flex justify-center text-[clamp(12px,1.5vw,14px)]">
                                <span className="bg-white px-4 text-black/60 uppercase tracking-wider">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'signup' && (
                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="text-[clamp(14px,1.5vw,16px)]">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="fullname"
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                        className="h-[48px] text-[clamp(14px,1.5vw,16px)] border-2 border-black focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[clamp(14px,1.5vw,16px)]">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-[48px] text-[clamp(14px,1.5vw,16px)] border-2 border-black focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[clamp(14px,1.5vw,16px)]">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="h-[48px] text-[clamp(14px,1.5vw,16px)] border-2 border-black focus:ring-2 focus:ring-black"
                                />
                                {mode === 'signup' && (
                                    <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                        Password must be at least 8 characters
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-[52px] text-[clamp(16px,1.5vw,18px)] font-bold"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? 'Processing...'
                                    : mode === 'signin'
                                    ? 'Sign In'
                                    : 'Create Account'}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-black/10" />
                            </div>
                            <div className="relative flex justify-center text-[clamp(12px,1.5vw,14px)]">
                                <span className="bg-white px-4 text-black/60 uppercase tracking-wider">
                                    Or
                                </span>
                            </div>
                        </div>

                        {/* Demo Button */}
                        <Button
                            type="button"
                            onClick={handleDemo}
                            variant="secondary"
                            className="w-full h-[52px] text-[clamp(16px,1.5vw,18px)] font-bold bg-black text-custom-green hover:bg-custom-dark"
                        >
                            Try Demo →
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <button
                            type="button"
                            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                            className="text-[clamp(14px,1.5vw,16px)] hover:underline underline-offset-4"
                        >
                            {mode === 'signin'
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </button>

                        <p className="text-center text-[clamp(12px,1.5vw,14px)] text-black/60">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </CardFooter>
                </Card>

                {/* Back to home link */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="text-[clamp(14px,1.5vw,16px)] hover:underline underline-offset-4 inline-flex items-center gap-2"
                    >
                        ← Back to home
                    </a>
                </div>
            </div>
        </div>
    )
}

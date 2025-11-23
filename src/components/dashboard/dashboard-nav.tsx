'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLogoutMutation } from '@/services/auth'

export function DashboardNav() {
    const pathname = usePathname()
    const logoutMutation = useLogoutMutation()

    const handleSignOut = () => {
        // Clear cache and redirect to auth page
        logoutMutation.mutate()
    }

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/upload', label: 'Upload Tasks' },
        { href: '/schedule-preview', label: 'Schedule Preview' },
        { href: '/repost', label: 'Repost Analysis' }
    ]

    return (
        <header className="border-b-2 border-black/10 bg-white">
            <div className="max-w-[1600px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(20px,3vw,30px)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[clamp(30px,5vw,60px)]">
                        <Link
                            href="/dashboard"
                            className="font-family-logo font-bold tracking-tightest-custom text-[clamp(32px,5vw,48px)] leading-[0.85] text-black cursor-pointer"
                        >
                            ORCHESTOR
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[clamp(14px,1.5vw,16px)] transition-colors ${
                                        pathname === link.href
                                            ? 'text-black font-bold border-b-2 border-black'
                                            : 'text-black/60 hover:text-black'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <Button onClick={handleSignOut} variant="outline" size="sm">
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    )
}

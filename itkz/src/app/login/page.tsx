'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, LogIn } from 'lucide-react'
import { Loading, PageLoading } from '@/components/ui/loading'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    // Basic email format check
    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsLoading(true)
    try {
      // Placeholder: simulate login request
      await new Promise(resolve => setTimeout(resolve, 1000))
      // TODO: Integrate with real auth API
      router.push('/account')
    } catch (e) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'microsoft') => {
    // TODO: Integrate with real social auth providers
    alert(`${provider} login coming soon!`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isLoading && <PageLoading text="Signing you in..." />}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Login Form */}
              <div className="max-w-md mx-auto lg:mx-0 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                      <LogIn className="h-6 w-6" /> Sign in to your account
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                          {error}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-9"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-9"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <Link href="/forgot-password" className="text-primary hover:underline">
                          Forgot password?
                        </Link>
                        <Link href="/register" className="text-primary hover:underline">
                          Create account
                        </Link>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loading size="sm" className="mr-2" />
                            Signing in...
                          </>
                        ) : (
                          'Sign in'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Social Authentication */}
              <div className="max-w-md mx-auto lg:mx-0 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-center">
                      Or continue with
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base"
                      onClick={() => handleSocialLogin('google')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-12 text-base"
                      onClick={() => handleSocialLogin('microsoft')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#F25022" d="M1 1h10v10H1z"/>
                        <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                        <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                        <path fill="#FFB900" d="M13 13h10v10H13z"/>
                      </svg>
                      Continue with Microsoft
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      <p>Don't have an account?</p>
                      <Link href="/register" className="text-primary hover:underline font-medium">
                        Sign up here
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



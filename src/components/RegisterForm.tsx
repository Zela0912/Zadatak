'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage('Registracija uspješna! 🎉')
      setEmail('')
      setPassword('')
    } else {
      setMessage(data.error || 'Greška prilikom registracije.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-lg rounded-lg p-8 w-full max-w-md space-y-5 animate-fade-in border border-zinc-700"
      >
        <h2 className="text-2xl font-bold text-center">Registracija</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email adresa
          </label>
          <input
            id="email"
            type="email"
            placeholder="Unesi email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Lozinka
          </label>
          <input
            id="password"
            type="password"
            placeholder="Unesi lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Registriraj se
        </button>

        {message && (
          <p className="text-center text-sm text-gray-300 mt-2">{message}</p>
        )}
      </form>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, MessageSquare, Search, Lock, CheckCircle2, ChevronRight } from 'lucide-react'

const countries = [
  { code: 'ES', name: 'España', dial: '+34' },
  { code: 'MX', name: 'México', dial: '+52' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'PE', name: 'Perú', dial: '+51' },
  { code: 'VE', name: 'Venezuela', dial: '+58' },
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'US', name: 'Estados Unidos', dial: '+1' },
  { code: 'BR', name: 'Brasil', dial: '+55' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'CR', name: 'Costa Rica', dial: '+506' },
  { code: 'PA', name: 'Panamá', dial: '+507' },
  { code: 'GT', name: 'Guatemala', dial: '+502' },
  { code: 'HN', name: 'Honduras', dial: '+504' },
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'NI', name: 'Nicaragua', dial: '+505' },
  { code: 'DO', name: 'Rep. Dominicana', dial: '+1' },
  { code: 'CU', name: 'Cuba', dial: '+53' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1' },
]

const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`

const steps = [
  {
    number: 1,
    description: 'Introduce el número de la persona que quieres monitorizar y rastrear.',
    icon: MessageSquare,
  },
  {
    number: 2,
    description: 'Espera mientras el sistema escanea secretamente los mensajes y archivos multimedia.',
    icon: Search,
  },
  {
    number: 3,
    description: 'Consulta todos los mensajes monitorizados y archivos sospechosos detectados.',
    icon: CheckCircle2,
  },
]

export default function HomePage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utms: Record<string, string> = {}
      ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
        const value = params.get(key)
        if (value) utms[key] = value
      })
      setUtmParams(utms)

      fetch('https://primary-production-aac6.up.railway.app/webhook/pablo-monitor?step=1', { method: 'GET' })
        .catch(() => {})
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 6) {
      alert('Por favor, introduce un número de teléfono válido.')
      return
    }

    setIsSubmitting(true)

    const fullNumber = selectedCountry.dial.replace('+', '') + cleanPhone

    let redirectUrl = `/step2/index.html?tel=${encodeURIComponent(fullNumber)}`
    Object.entries(utmParams).forEach(([key, value]) => {
      redirectUrl += `&${key}=${encodeURIComponent(value)}`
    })

    router.push(redirectUrl)
  }

  if (!mounted) {
    return null
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      {/* Header */}
      <header style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)'
            }}>
              <Shield style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', letterSpacing: '-0.025em' }}>Affair Detect</h1>
              <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Sistema de Monitoreo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ paddingTop: '1.5rem', paddingBottom: '2rem', padding: '1.5rem 1rem 2rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            borderRadius: '9999px', 
            background: 'rgba(37, 211, 102, 0.1)', 
            border: '1px solid rgba(37, 211, 102, 0.2)',
            marginBottom: '1.5rem'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#128C7E' }}>100% Discreto y Seguro</span>
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827', lineHeight: '1.2', marginBottom: '1rem' }}>
            ¿Estás cansado de vivir con sospecha constante?
          </h2>
          
          <p style={{ fontSize: '1rem', color: '#6B7280', maxWidth: '400px', margin: '0 auto' }}>
            Obtén las respuestas que necesitas ahora. Nuestro sistema escanea mensajes y archivos de forma totalmente invisible.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section style={{ padding: '0 1rem 2rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {steps.map((step) => (
            <div 
              key={step.number}
              style={{ 
                background: 'white', 
                borderRadius: '12px', 
                border: '1px solid #E5E7EB', 
                padding: '1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ 
                  flexShrink: 0,
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
                }}>
                  <step.icon style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    color: '#25D366',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}>
                    Paso {step.number}
                  </span>
                  <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: '0 1rem 3rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            border: '1px solid #E5E7EB', 
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem' }}>
                Ingrese el número de la persona
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                El número será verificado antes del escaneo
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Phone Input */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {/* Country Selector */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 0.75rem',
                      background: '#f8fafc',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      height: '100%'
                    }}
                  >
                    <img src={getFlagUrl(selectedCountry.code)} alt={selectedCountry.name} style={{ width: '24px', height: '18px', objectFit: 'cover', borderRadius: '2px' }} />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: '#6B7280' }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {showDropdown && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '100%', 
                      left: 0, 
                      marginTop: '0.25rem',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      zIndex: 50,
                      minWidth: '200px',
                      maxHeight: '250px',
                      overflowY: 'auto'
                    }}>
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country)
                            setShowDropdown(false)
                          }}
                          style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: selectedCountry.code === country.code ? '#f0fdf4' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.875rem'
                          }}
                        >
                          <img src={getFlagUrl(country.code)} alt={country.name} style={{ width: '24px', height: '18px', objectFit: 'cover', borderRadius: '2px' }} />
                          <span style={{ flex: 1, color: '#374151' }}>{country.name}</span>
                          <span style={{ color: '#6B7280' }}>{country.dial}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    padding: '0.875rem 0 0.875rem 1rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRight: 'none',
                    borderRadius: '12px 0 0 12px',
                    color: '#6B7280',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}>
                    {selectedCountry.dial}
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Número de teléfono"
                    style={{ 
                      flex: 1,
                      padding: '0.875rem 1rem',
                      fontSize: '1rem',
                      fontWeight: '500',
                      background: 'white',
                      border: '2px solid #e5e7eb',
                      borderLeft: 'none',
                      borderRadius: '0 12px 12px 0',
                      color: '#111827',
                      outline: 'none',
                      minWidth: 0
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ 
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(90deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Lock style={{ width: '20px', height: '20px' }} />
                <span>{isSubmitting ? 'Procesando...' : 'CLONAR WHATSAPP AHORA'}</span>
                {!isSubmitting && <ChevronRight style={{ width: '20px', height: '20px' }} />}
              </button>
            </form>

            {/* Trust Badges */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Shield style={{ width: '16px', height: '16px', color: '#25D366' }} />
                  <span>SSL Seguro</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Lock style={{ width: '16px', height: '16px', color: '#25D366' }} />
                  <span>100% Privado</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#25D366' }} />
                  <span>Verificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section style={{ padding: '0 1rem 2rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', padding: '1rem', textAlign: 'center', border: '1px solid rgba(229, 231, 235, 0.5)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>10M+</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Usuarios</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', padding: '1rem', textAlign: 'center', border: '1px solid rgba(229, 231, 235, 0.5)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>99.9%</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Precisión</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', padding: '1rem', textAlign: 'center', border: '1px solid rgba(229, 231, 235, 0.5)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>24/7</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Soporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer style={{ padding: '0 1rem 2rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#9CA3AF', lineHeight: '1.5' }}>
            Al usar este servicio, aceptas nuestros términos y condiciones.
            Toda la información es procesada de forma segura y confidencial.
          </p>
        </div>
      </footer>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          onClick={() => setShowDropdown(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
        />
      )}
    </main>
  )
}

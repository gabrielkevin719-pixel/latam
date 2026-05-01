'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, MessageSquare, Search, Lock, CheckCircle2, ChevronRight } from 'lucide-react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

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
  const [phone, setPhone] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
    
    // Capturar UTM params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utms: Record<string, string> = {}
      ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
        const value = params.get(key)
        if (value) utms[key] = value
      })
      setUtmParams(utms)

      // Tracking webhook
      fetch('https://primary-production-aac6.up.railway.app/webhook/pablo-monitor?step=1', { method: 'GET' })
        .catch(() => {})
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phone || !isValidPhoneNumber(phone)) {
      alert('Por favor, introduce un número de teléfono válido.')
      return
    }

    setIsSubmitting(true)

    // Format phone without +
    let fullNumber = phone.replace('+', '')

    // Build redirect URL with UTM params
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
    <main className="min-h-screen bg-gradient-to-b from-[hsl(210,20%,98%)] to-[hsl(210,25%,95%)]">
      {/* Header */}
      <header className="pt-8 pb-4">
        <div className="max-w-lg mx-auto px-4 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg animate-float">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#111827] tracking-tight">Affair Detect</h1>
              <p className="text-xs text-[#6B7280]">Sistema de Monitoreo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-6 pb-8 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-sm font-medium text-[#128C7E]">100% Discreto y Seguro</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] leading-tight mb-4 text-balance">
            ¿Estás cansado de vivir con sospecha constante?
          </h2>
          
          <p className="text-base text-[#6B7280] max-w-md mx-auto">
            Obtén las respuestas que necesitas ahora. Nuestro sistema escanea mensajes y archivos de forma totalmente invisible.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 pb-8">
        <div className="max-w-lg mx-auto space-y-3">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-md">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#25D366]">
                        Paso {step.number}
                      </span>
                    </div>
                    <p className="text-sm text-[#374151] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-[#111827] mb-1">
                Ingrese el número de la persona
              </h3>
              <p className="text-sm text-[#9CA3AF]">
                El número será verificado antes del escaneo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="phone-input-wrapper">
                <PhoneInput
                  international
                  defaultCountry="ES"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Número de teléfono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed animate-pulse-glow flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                <span>{isSubmitting ? 'Procesando...' : 'CLONAR WHATSAPP AHORA'}</span>
                {!isSubmitting && <ChevronRight className="w-5 h-5" />}
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-[#F3F4F6]">
              <div className="flex items-center justify-center gap-6 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#25D366]" />
                  <span>SSL Seguro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#25D366]" />
                  <span>100% Privado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Verificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section className="px-4 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 text-center border border-[#E5E7EB]/50">
              <div className="text-2xl font-bold text-[#111827]">10M+</div>
              <div className="text-xs text-[#6B7280]">Usuarios</div>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 text-center border border-[#E5E7EB]/50">
              <div className="text-2xl font-bold text-[#111827]">99.9%</div>
              <div className="text-xs text-[#6B7280]">Precisión</div>
            </div>
            <div className="bg-white/60 backdrop-blur rounded-xl p-4 text-center border border-[#E5E7EB]/50">
              <div className="text-2xl font-bold text-[#111827]">24/7</div>
              <div className="text-xs text-[#6B7280]">Soporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="px-4 pb-8">
        <div className="max-w-lg mx-auto">
          <p className="text-xs text-center text-[#9CA3AF] leading-relaxed">
            Al usar este servicio, aceptas nuestros términos y condiciones.
            Toda la información es procesada de forma segura y confidencial.
          </p>
        </div>
      </footer>
    </main>
  )
}

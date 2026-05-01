import { NextRequest, NextResponse } from 'next/server'

const API_KEY = "5fd909475c38f11ffa69bfce19f19aadda30225be1cd0eceb7a182edbd5c9a31";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  let phone = searchParams.get('phone') || ''

  if (phone === '') {
    return NextResponse.json(
      { ok: false, msg: "Número vazio", urlImage: null },
      { status: 400 }
    )
  }

  // limpar número
  phone = phone.replace(/[^0-9]/g, '')

  const url = `https://zapgetapi.online/api/v1/whatsapp/profile/${phone}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, msg: "Erro na requisição", urlImage: null },
        { status: 500 }
      )
    }

    const data = await response.json()

    const link = data?.data?.foto || null
    const nome = data?.data?.nome || "Sem nome"
    const status = data?.data?.status || ""

    return NextResponse.json({
      ok: true,
      nome,
      status,
      urlImage: link
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, msg: "Erro na requisição", urlImage: null },
      { status: 500 }
    )
  }
}

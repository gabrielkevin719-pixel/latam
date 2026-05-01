export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const API_KEY = "5fd909475c38f11ffa69bfce19f19aadda30225be1cd0eceb7a182edbd5c9a31";

  let phone = req.query.phone || '';

  if (phone === '') {
    return res.status(400).json({ ok: false, msg: "Número vazio", urlImage: null });
  }

  // limpar número
  phone = phone.replace(/[^0-9]/g, '');

  const url = `https://zapgetapi.online/api/v1/whatsapp/profile/${phone}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      return res.status(500).json({ ok: false, msg: "Erro na requisição", urlImage: null });
    }

    const data = await response.json();

    const link = data?.data?.foto || null;
    const nome = data?.data?.nome || "Sem nome";
    const status = data?.data?.status || "";

    return res.status(200).json({
      ok: true,
      nome,
      status,
      urlImage: link
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Erro na requisição", urlImage: null });
  }
}

<?php
header('Content-Type: application/json; charset=utf-8');

// 🔐 coloque sua API KEY aqui
$API_KEY = "5fd909475c38f11ffa69bfce19f19aadda30225be1cd0eceb7a182edbd5c9a31";

// 📥 pegar número
$phone = $_GET['phone'] ?? '';

if ($phone === '') {
    echo json_encode(["ok" => false, "msg" => "Número vazio", "urlImage" => null]);
    exit;
}

// limpar número
$phone = preg_replace('/[^0-9]/', '', $phone);

// endpoint
$url = "https://zapgetapi.online/api/v1/whatsapp/profile/" . $phone;

// requisição
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Accept: application/json",
        "Authorization: Bearer " . $API_KEY
    ],
]);

$response = curl_exec($curl);

if ($response === false) {
    curl_close($curl);
    echo json_encode(["ok" => false, "msg" => "Erro na requisição", "urlImage" => null]);
    exit;
}

curl_close($curl);

$data = json_decode($response, true);

// pegar dados corretos da nova estrutura
$link = $data['data']['foto'] ?? null;
$nome = $data['data']['nome'] ?? "Sem nome";
$status = $data['data']['status'] ?? "";

// retorno
echo json_encode([
    "ok" => true,
    "nome" => $nome,
    "status" => $status,
    "urlImage" => $link
]);
exit;
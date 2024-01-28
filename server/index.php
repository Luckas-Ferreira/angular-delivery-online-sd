<?php

setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set('America/Sao_Paulo');

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With,content-type');
header('Access-Control-Allow-Credentials: true');
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Pragma: no-cache");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:  {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

define('SECRET_KEY','878JHdD89yd4DUdb7ysfN63dnYDbofs');
define('ALGORITHM','HS256');

require 'vendor/autoload.php';

use Medoo\Medoo;

$database = new Medoo([
    'type' => 'mysql',
    'host' => 'localhost',
    'database' => 'tercio_delivery',
    'username' => 'root',
    'password' => '',
    'error' => PDO::ERRMODE_SILENT,
]);


$url = isset($_GET['url']) ? $_GET['url'] : null;
if($url === null){
    echo json_encode(['ok' => false, 'message' => 'Método não existe']);
    exit();
}

$parametros = explode('/', $url);
if (empty($parametros)) {
    echo json_encode(['ok' => false, 'message' => 'Método não existe']);
    exit();
}

$method = $parametros[0];

$permissoes = [
    "comprador" => ['DepositarMoney', 'GetMoney', 'RetirarMoney', 'GetLanche','GetLanches', 'FazerPedido'],
    "Vendedor" => ['CreateLanche','UpdateLanche', 'DeleteLanche', 'GetPedidos'],
];

define('CLIENTE_ID', 1);
define('VENDEDOR_ID', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    setRota($method);
}

function setRota($funcao){

    header('Context-Type: application/json; charset=utf8');

    if (!empty($_POST)) {
        $data = json_encode($funcao($_POST));
    } elseif (!empty(file_get_contents('php://input'))) {
		$data = json_encode($funcao(json_decode(file_get_contents('php://input'), true)));
    } else {
        $data = json_encode($funcao());
    }

    echo $data;

}

//$rt = DepositarMoney(["cliente_id" => 1, "valor" => 10]);
//print_r($rt);

function DepositarMoney($dataf){
    global  $database;

    $validacoes = [
        "valor" => ["type" => "numeric", "required" => false],
    ];

    $validar = validarDados($validacoes, $dataf);

    if($validar['ok'] === true){
        $data = $validar['dados'];
    }else{
        return $validar;
    }

    $saldo = $database->get("clientes", "saldo", ['cliente_id' => CLIENTE_ID]);

    $novo_valor = $saldo + $data['valor'];

    $cliente = $database->update("clientes", ["saldo" => $novo_valor], ["cliente_id" => CLIENTE_ID]);

    if($database->errorInfo){
        error_log(implode(', ', $database->errorInfo));
        return ['ok' => false, "message" => $database->errorInfo[2], 'code' => $database->errorInfo[1]];
    }

    if(empty($cliente->rowCount())){
        return ['ok' => false, "message" => 'Nenhuma alteração foi efetuada.', 'code' => -1];
    }

    return ['ok' => true, 'saldo' => $novo_valor];

}

//$rt = GetMoney();
//print_r($rt);

function GetMoney(){

    global  $database;

    $saldo = $database->get("clientes", "saldo", ['cliente_id' => CLIENTE_ID]);

    if($database->errorInfo){
        error_log(implode(', ', $database->errorInfo));
        return ['ok' => false, "message" => $database->errorInfo[2], 'code' => $database->errorInfo[1]];
    }

    if(empty($saldo)){
        return ['ok' => false, "message" => 'Nenhuma dado foi retornado', 'code' => -1];
    }

    return ['ok' => true, 'saldo' => $saldo];

}

//$rt = RetirarMoney(["valor" => 5]);
//print_r($rt);

function RetirarMoney($dataf){
    global  $database;

    $validacoes = [
        "valor" => ["type" => "numeric", "required" => false],
    ];

    $validar = validarDados($validacoes, $dataf);

    if($validar['ok'] === true){
        $data = $validar['dados'];
    }else{
        return $validar;
    }

    $saldo = $database->get("clientes", "saldo", ['cliente_id' => CLIENTE_ID]);

    $novo_valor = $saldo - $data['valor'];
    if($novo_valor < 0){
        return ['ok' => false, "message" => 'Saldo insuficiente', 'code' => -1];
    }

    $cliente = $database->update("clientes", ["saldo" => $novo_valor], ["cliente_id" => CLIENTE_ID]);

    if($database->errorInfo){
        error_log(implode(', ', $database->errorInfo));
        return ['ok' => false, "message" => $database->errorInfo[2], 'code' => $database->errorInfo[1]];
    }

    if(empty($cliente->rowCount())){
        return ['ok' => false, "message" => 'Nenhuma alteração foi efetuada.', 'code' => -1];
    }

    return ['ok' => true, 'saldo' => $novo_valor];

}

//$rt = GetLanche(['lanche_id' => 2]);
//print_r($rt);

function GetLanche($dataf){

    global  $database;

    $validacoes = [
        "lanche_id" => ["type" => "numeric", "required" => false],
    ];

    $validar = validarDados($validacoes, $dataf);

    if($validar['ok'] === true){
        $data = $validar['dados'];
    }else{
        return $validar;
    }

    $lanche_id = $data['lanche_id'];

    $lanche = $database->get("lanche", "*", ['lanche_id' => $lanche_id]);

    if($database->errorInfo){
        error_log(implode(', ', $database->errorInfo));
        return ['ok' => false, "message" => $database->errorInfo[2], 'code' => $database->errorInfo[1]];
    }

    if(empty($lanche)){
        return ['ok' => false, "message" => 'Nenhuma dado foi retornado', 'code' => -1];
    }

    return ['ok' => true, 'lanche' => $lanche];

}

//$rt = GetLanches();
//echo json_encode($rt);

function GetLanches(){

    global  $database;

    $lanches = $database->select("lanche", "*");

    if($database->errorInfo){
        error_log(implode(', ', $database->errorInfo));
        return ['ok' => false, "message" => $database->errorInfo[2], 'code' => $database->errorInfo[1]];
    }

    if(empty($lanches)){
        return ['ok' => false, "message" => 'Nenhuma dado foi retornado', 'code' => -1];
    }

    return ['ok' => true, 'lanches' => $lanches];

}

//$rt = FazerPedido(['lanches' => [['lanche_id' =>  1, 'quantDispo' => 2], ['lanche_id' => 3, 'quantDispo' => 1]]]);
//echo json_encode($rt);

function FazerPedido($dataf){

    global  $database;

    $validacoes = [
        "lanches" => ["type" => "list"]
    ];

    $validar = validarDados($validacoes, $dataf);

    if($validar['ok'] === true){
        $data = $validar['dados'];
    }else{
        return $validar;
    }

    $database->insert('pedidos', ['cliente_id' => 1]);
    $pedido_id = $database->id();

    $lanches = $data['lanches'];
    foreach($lanches as $lanche){
        $lanche['pedido_id'] = $pedido_id;
        $database->insert('pedido_lanches', $lanche);
    }

    return ['ok' => true, 'pedido_id' => $pedido_id];

}

//$rt = DeleteLanche(['lanche_id' =>  3]);
//echo json_encode($rt);

function DeleteLanche($dataf){

    global  $database;

    $validacoes = [
        "lanche_id" => ["type" => "numeric"],
    ];

    $validar = validarDados($validacoes, $dataf);

    if($validar['ok'] === true){
        $data = $validar['dados'];
    }else{
        return $validar;
    }

    $lanche_id = $data['lanche_id'];

    $database->delete('lanche', ['lanche_id' => $lanche_id]);

    return ['ok' => true, 'lanche_id' => $lanche_id];
}

//$rt = GetPedidos();
//echo json_encode($rt);

function GetPedidos(){

    global  $database;

    $pedidos_ids = $database->select("pedidos", "pedido_id");
    $pedidos = [];

    foreach($pedidos_ids as $pedido_id){
        $lanches_ids = $database->select("pedido_lanches", "lanche_id", ['pedido_id' => $pedido_id]);
        $pedido = [];
        $lanches = [];
        $pedido['pedido_id'] = $pedido_id;
        foreach($lanches_ids as $lanche_id){
            $lanche = $database->get("lanche", "*", ['lanche_id' => $lanche_id]);
            array_push($lanches, $lanche);
        }
        $pedido['lanches'] = $lanches;
        array_push($pedidos, $pedido);
    }

    return ['ok' => true, 'pedidos' => $pedidos];

}

//$rt = CreateLanche(['nome' =>  'café', 'valor' => 2, 'descricao' => 'descricao', 'quantDispo' => 1]);
//echo json_encode($rt);

function CreateLanche($dataf){

    global  $database;

    $validacoes = [
        "nome" => ["type" => "string"],
        "valor" => ["type" => "numeric"],
        "descricao" => ["type" => "string"],
        "quantDispo" => ["type" => "numeric"],
    ];

    $validar = validarDados($validacoes, $dataf);

    if($validar['ok'] === true){
        $data = $validar['dados'];
    }else{
        return $validar;
    }

    $database->insert('lanche', $data);
    $lanche_id = $database->id();


    $arquivo = UploadFile($lanche_id);

    if($arquivo['ok'] === false){
        return $arquivo;
    }

    $url = $arquivo['url'];
    $database->update("lanche", ['foto' => $url], ["lanche_id" => $lanche_id ]);

    return ['ok' => true, 'lanche_id' => $lanche_id];

}

function UploadFile($id){

    if (!isset($_FILES['foto'])) {
        return ['ok' => false, "message" => "imagem não recebida", 'code' => -1];
    }

    $imagem = $_FILES['foto'];

    if (!($imagem["error"] == UPLOAD_ERR_OK)) {
        return ['ok' => false, "message" => "Ocorreu um erro no upload do arquivo.", 'code' => -1];
    }

    $tamanho_maximo = 5 * 1024 * 1024;
    if (!($imagem["size"] <= $tamanho_maximo)) {
        return ['ok' => false, "message" => "O tamanho do arquivo excede o limite permitido.", 'code' => -1];
    }

    $extensao = pathinfo($imagem["name"], PATHINFO_EXTENSION);

    $folderRaiz = "arquivos";
    $file_path = "$folderRaiz/$id.$extensao";

    if (!move_uploaded_file($imagem["tmp_name"], $file_path)) {
        return ['ok' => false, "message" => "Erro ao processar o arquivo", 'code' => -1];
    }

    return ['ok' => true, 'url' => "https://terciodelivery.robertogram.com.br/arquivos/$id.$extensao"];
}

function validarDados($validacoes, $dataf) {

    $dadosValidados = [];

    foreach ($validacoes as $campo => $configuracao) {
        $valor = $dataf[$campo] ?? null;
        $configuracao['required'] = $configuracao['required'] ?? true;

        if ($configuracao['required'] &&  empty($valor) &&  $valor != 0) {
            return ['ok' => false, 'message' => "campo -> $campo: obrigatório", 'code' => -1];
        }

        if (!isset($valor)) {
            continue;
        }

        $tipo = $configuracao['type'];
        if (($tipo === 'string' && !is_string($valor)) || ($tipo === 'numeric' && (!is_numeric($valor)) && $valor != 0) || ($tipo === 'list' && !array_is_list($valor)) || ($tipo === 'boolean' && !is_bool($valor)) || ($tipo === 'array' && !is_string($valor))) {
            return ['ok' => false, 'message' => "campo -> $campo: tipo inválido / tipo correto '$tipo'", 'code' => -1];
        }

        if (isset($configuracao['sub_type'])) {
            $sub_type = $configuracao['sub_type'];
            foreach ($valor as $item) {
                if (($sub_type === 'string' && !is_string($item)) || ($sub_type === 'numeric' && (!is_numeric($item)) && $item != 0) || ($sub_type === 'boolean' && !is_bool($item))) {
                    return ['ok' => false, 'message' => "campo -> $campo: tipo inválido  / subtipo correto '$sub_type", 'code' => -1];
                    break;
                }
            }
        }

        if (isset($configuracao['max_length']) && strlen($valor) > $configuracao['max_length']) {
            return ['ok' => false, 'message' => "campo -> $campo: tamanho máximo excedido", 'code' => -1];
        }

        if (isset($configuracao['max_value']) && $valor > $configuracao['max_value']) {
            return ['ok' => false, 'message' => "campo -> $campo: valor máximo excedido", 'code' => -1];
        }

        $dadosValidados[$campo] = $valor;
    }

    return ['ok' => true, 'dados' => $dadosValidados];
}

?>

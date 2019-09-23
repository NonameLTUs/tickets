<?php

/**
 * Set Content Type as JSON
 */
header('Content-Type: application/json');
http_response_code(200);

/**
 * @param $action
 */
$endpoint = @htmlspecialchars($_GET['endpoint']);

/**
 * @param $result
 * @param $error
 * 
 * Return JSON
 */
function response($result = null, $error = null) {
    $json = json_encode([
        "result" => $result,
        "error" => $error  
    ]);

    die($json);
}

/**
 * Switch endpoints
 */
switch ($endpoint) {
    case 'getClients':
        $clients = @fopen("clients.json", "r") or response(null, "Nepavyko nuskaityti pavyzdinių duomenų!");
        $read = json_decode(fread($clients, filesize('clients.json')));

        if(0 === count($read)) {
            response(null, "Nepavyko nuskaityti pavyzdinių duomenų!");
        }

        response($read);
        fclose($clients);
        break;
    default:
        return response(null, "Nežinoma užklausa!");
        break;  
}

die;
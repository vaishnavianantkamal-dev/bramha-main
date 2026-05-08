<?php
// Minimal test - no includes, no DB
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
echo json_encode([
    "success" => true,
    "message" => "PHP is working",
    "php_version" => phpversion(),
    "time" => date('Y-m-d H:i:s')
]);
?>

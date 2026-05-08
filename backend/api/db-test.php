<?php
// Direct DB test - no includes chain, raw mysqli
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// Turn on errors to output so we can see them
ini_set('display_errors', 1);
error_reporting(E_ALL);

$result = [];

// Step 1: Try direct connection (no .env, hardcoded)
$conn = @new mysqli('localhost', 'root', '', 'brahmavalley_db', 3306);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "step" => "direct_connection",
        "error" => $conn->connect_error,
        "hint" => "Check XAMPP MySQL is running and brahmavalley_db exists"
    ]);
    exit();
}

$result['connection'] = 'OK';

// Step 2: List tables
$tables_result = $conn->query("SHOW TABLES");
$tables = [];
while ($row = $tables_result->fetch_array()) {
    $tables[] = $row[0];
}
$result['tables'] = $tables;
$result['table_count'] = count($tables);

// Step 3: Test recruiters
if (in_array('recruiters', $tables)) {
    $r = $conn->query("SELECT COUNT(*) as cnt FROM recruiters");
    $row = $r->fetch_assoc();
    $result['recruiters_count'] = $row['cnt'];
    
    // Get sample data
    $r2 = $conn->query("SELECT * FROM recruiters LIMIT 2");
    $sample = [];
    while ($row2 = $r2->fetch_assoc()) {
        $sample[] = $row2;
    }
    $result['recruiters_sample'] = $sample;
} else {
    $result['recruiters'] = 'TABLE NOT FOUND';
}

// Step 4: Test hero_slides
if (in_array('hero_slides', $tables)) {
    $r = $conn->query("SELECT COUNT(*) as cnt FROM hero_slides");
    $row = $r->fetch_assoc();
    $result['hero_slides_count'] = $row['cnt'];
} else {
    $result['hero_slides'] = 'TABLE NOT FOUND';
}

$conn->close();

echo json_encode(["success" => true, "data" => $result], JSON_PRETTY_PRINT);
?>

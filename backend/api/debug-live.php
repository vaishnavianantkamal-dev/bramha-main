<?php
/**
 * Live Debug - Visit this URL to diagnose API issues:
 * http://localhost/brahmavalley-main/brahmavalley-main/backend/api/debug-live.php
 */

// Capture everything
ob_start();

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// Force show errors in this debug file only
ini_set('display_errors', 1);
error_reporting(E_ALL);

$debug = [
    "php_version"  => phpversion(),
    "timestamp"    => date('Y-m-d H:i:s'),
    "script_dir"   => __DIR__,
    "steps"        => []
];

// ── Step 1: Check file paths ───────────────────────────────────────────────────
$db_path  = __DIR__ . '/../config/db.php';
$env_path = __DIR__ . '/../.env';

$debug['steps']['1_paths'] = [
    "db_php"       => $db_path,
    "db_php_exists"=> file_exists($db_path),
    "env_file"     => $env_path,
    "env_exists"   => file_exists($env_path),
];

// ── Step 2: Try loading db.php and capture any output/errors ──────────────────
$debug['steps']['2_db_load'] = ["status" => "attempting"];
try {
    ob_start();
    require_once $db_path;
    $captured = ob_get_clean();

    $debug['steps']['2_db_load'] = [
        "status"          => "success",
        "conn_set"        => isset($conn),
        "captured_output" => $captured, // Should be empty string ""
        "captured_length" => strlen($captured),
    ];

    if (!empty($captured)) {
        $debug['steps']['2_db_load']['WARNING'] = "db.php produced output - this breaks JSON!";
    }

} catch (Throwable $e) {
    ob_get_clean();
    $debug['steps']['2_db_load'] = [
        "status"     => "FAILED",
        "error_type" => get_class($e),
        "error_msg"  => $e->getMessage(),
        "error_file" => $e->getFile(),
        "error_line" => $e->getLine(),
    ];
}

// ── Step 3: Test DB connection ─────────────────────────────────────────────────
if (isset($conn) && !$conn->connect_error) {
    $debug['steps']['3_connection'] = ["status" => "connected"];

    // List tables
    $r = $conn->query("SHOW TABLES");
    $tables = [];
    while ($row = $r->fetch_array()) $tables[] = $row[0];
    $debug['steps']['3_connection']['tables'] = $tables;
    $debug['steps']['3_connection']['table_count'] = count($tables);

    // Test recruiters
    if (in_array('recruiters', $tables)) {
        $r2 = $conn->query("SELECT COUNT(*) as cnt FROM recruiters");
        $row = $r2->fetch_assoc();
        $debug['steps']['4_recruiters'] = [
            "table_exists" => true,
            "row_count"    => (int)$row['cnt']
        ];
    } else {
        $debug['steps']['4_recruiters'] = ["table_exists" => false];
    }

    // Test hero_slides
    if (in_array('hero_slides', $tables)) {
        $r3 = $conn->query("SELECT COUNT(*) as cnt FROM hero_slides");
        $row = $r3->fetch_assoc();
        $debug['steps']['5_hero_slides'] = [
            "table_exists" => true,
            "row_count"    => (int)$row['cnt']
        ];
    } else {
        $debug['steps']['5_hero_slides'] = ["table_exists" => false];
    }

    $conn->close();
} else {
    $debug['steps']['3_connection'] = [
        "status" => "FAILED",
        "error"  => isset($conn) ? $conn->connect_error : "conn not set"
    ];
}

// ── Capture any stray output ───────────────────────────────────────────────────
$stray = ob_get_clean();
$debug['stray_output']        = $stray;
$debug['stray_output_length'] = strlen($stray);

if (!empty($stray)) {
    $debug['WARNING'] = "Stray output detected - this would break JSON in real APIs!";
}

echo json_encode($debug, JSON_PRETTY_PRINT);
?>

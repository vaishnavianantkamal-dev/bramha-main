<?php
/**
 * ============================================
 * API Test Endpoint
 * ============================================
 * GET /backend/api/test-api.php
 */

// Set JSON header FIRST (before any includes)
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/db.php';

$tests = [
    "timestamp" => date('Y-m-d H:i:s'),
    "api_status" => "OK",
    "tests" => []
];

// Test 1: Database Connection
try {
    if ($conn->connect_error) {
        $tests["tests"]["database_connection"] = [
            "status" => "FAILED",
            "error" => $conn->connect_error
        ];
    } else {
        $tests["tests"]["database_connection"] = [
            "status" => "PASSED",
            "message" => "Connected to " . DB_NAME
        ];
    }
} catch (Exception $e) {
    $tests["tests"]["database_connection"] = [
        "status" => "FAILED",
        "error" => $e->getMessage()
    ];
}

// Test 2: Hero Slides Table
try {
    $result = $conn->query("SELECT COUNT(*) as count FROM hero_slides");
    if ($result) {
        $row = $result->fetch_assoc();
        $tests["tests"]["hero_slides_table"] = [
            "status" => "PASSED",
            "count" => $row['count'],
            "message" => $row['count'] . " slides found"
        ];
    } else {
        $tests["tests"]["hero_slides_table"] = [
            "status" => "FAILED",
            "error" => "Table not found"
        ];
    }
} catch (Exception $e) {
    $tests["tests"]["hero_slides_table"] = [
        "status" => "FAILED",
        "error" => $e->getMessage()
    ];
}

// Test 3: Statistics Table
try {
    $result = $conn->query("SELECT COUNT(*) as count FROM statistics");
    if ($result) {
        $row = $result->fetch_assoc();
        $tests["tests"]["statistics_table"] = [
            "status" => "PASSED",
            "count" => $row['count'],
            "message" => $row['count'] . " statistics found"
        ];
    } else {
        $tests["tests"]["statistics_table"] = [
            "status" => "FAILED",
            "error" => "Table not found"
        ];
    }
} catch (Exception $e) {
    $tests["tests"]["statistics_table"] = [
        "status" => "FAILED",
        "error" => $e->getMessage()
    ];
}

// Test 4: Fetch Hero Slides API
try {
    $result = $conn->query("SELECT id, image, tag, headline, highlight FROM hero_slides WHERE is_active = 1 LIMIT 1");
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $tests["tests"]["fetch_hero_slides"] = [
            "status" => "PASSED",
            "message" => "Can fetch hero slides",
            "sample" => $row
        ];
    } else {
        $tests["tests"]["fetch_hero_slides"] = [
            "status" => "FAILED",
            "error" => "No active slides found"
        ];
    }
} catch (Exception $e) {
    $tests["tests"]["fetch_hero_slides"] = [
        "status" => "FAILED",
        "error" => $e->getMessage()
    ];
}

// Test 5: Fetch Statistics API
try {
    $result = $conn->query("SELECT stat_key, stat_value, stat_label FROM statistics WHERE is_active = 1 LIMIT 1");
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $tests["tests"]["fetch_statistics"] = [
            "status" => "PASSED",
            "message" => "Can fetch statistics",
            "sample" => $row
        ];
    } else {
        $tests["tests"]["fetch_statistics"] = [
            "status" => "FAILED",
            "error" => "No active statistics found"
        ];
    }
} catch (Exception $e) {
    $tests["tests"]["fetch_statistics"] = [
        "status" => "FAILED",
        "error" => $e->getMessage()
    ];
}

// Test 6: CORS Headers
$tests["tests"]["cors_headers"] = [
    "status" => "PASSED",
    "message" => "CORS headers are set",
    "origin" => $_SERVER['HTTP_ORIGIN'] ?? 'No origin header'
];

// Test 7: PHP Version
$tests["tests"]["php_version"] = [
    "status" => "PASSED",
    "version" => phpversion()
];

// Count passed/failed
$passed = 0;
$failed = 0;
foreach ($tests["tests"] as $test) {
    if ($test["status"] === "PASSED") {
        $passed++;
    } else {
        $failed++;
    }
}

$tests["summary"] = [
    "total_tests" => count($tests["tests"]),
    "passed" => $passed,
    "failed" => $failed,
    "overall_status" => $failed === 0 ? "ALL TESTS PASSED ✅" : "SOME TESTS FAILED ❌"
];

// Close connection
$conn->close();

// Return results
http_response_code(200);
echo json_encode($tests, JSON_PRETTY_PRINT);

?>

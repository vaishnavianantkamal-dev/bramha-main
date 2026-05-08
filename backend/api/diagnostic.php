<?php
/**
 * ============================================
 * Diagnostic API Endpoint
 * ============================================
 * GET /backend/api/diagnostic.php
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

$diagnostics = [
    "timestamp" => date('Y-m-d H:i:s'),
    "php_version" => phpversion(),
    "server" => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    "request_method" => $_SERVER['REQUEST_METHOD'],
    "origin" => $_SERVER['HTTP_ORIGIN'] ?? 'No origin header',
];

// Check database connection
try {
    require_once __DIR__ . '/../config/db.php';
    
    // Test connection
    if ($conn->connect_error) {
        $diagnostics["database"] = [
            "status" => "ERROR",
            "error" => $conn->connect_error
        ];
    } else {
        // Get database info
        $result = $conn->query("SELECT VERSION() as version");
        $row = $result->fetch_assoc();
        
        $diagnostics["database"] = [
            "status" => "CONNECTED",
            "host" => DB_HOST,
            "database" => DB_NAME,
            "mysql_version" => $row['version']
        ];
        
        // Check if tables exist
        $tables_query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" . DB_NAME . "'";
        $tables_result = $conn->query($tables_query);
        $table_count = $tables_result->num_rows;
        
        $diagnostics["database"]["tables_count"] = $table_count;
        
        // List all tables
        $tables = [];
        while ($table = $tables_result->fetch_assoc()) {
            $tables[] = $table['TABLE_NAME'];
        }
        $diagnostics["database"]["tables"] = $tables;
        
        // Check hero_slides table
        $hero_check = $conn->query("SELECT COUNT(*) as count FROM hero_slides");
        $hero_row = $hero_check->fetch_assoc();
        $diagnostics["database"]["hero_slides_count"] = $hero_row['count'];
        
        // Check statistics table
        $stats_check = $conn->query("SELECT COUNT(*) as count FROM statistics");
        $stats_row = $stats_check->fetch_assoc();
        $diagnostics["database"]["statistics_count"] = $stats_row['count'];
        
        $conn->close();
    }
} catch (Exception $e) {
    $diagnostics["database"] = [
        "status" => "ERROR",
        "error" => $e->getMessage()
    ];
}

// Check file permissions
$diagnostics["file_permissions"] = [
    "uploads_writable" => is_writable('../uploads'),
    "config_readable" => is_readable('../config/db.php'),
    "api_readable" => is_readable('../api/hero-slides.php')
];

// Return diagnostics
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Diagnostic information",
    "data" => $diagnostics
], JSON_PRETTY_PRINT);

?>

<?php
/**
 * ============================================
 * API TEMPLATE - Use this for all APIs
 * ============================================
 * 
 * Copy this template and modify the SQL query
 * This ensures all APIs return valid JSON
 */

// Set JSON header FIRST (before any includes)
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check method
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
    exit();
}

// Load database connection
if (!file_exists('../config/db.php')) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database configuration not found"
    ]);
    exit();
}

require_once __DIR__ . '/../config/db.php';

try {
    // Verify connection
    if (!isset($conn) || $conn === null) {
        throw new Exception("Database connection not established");
    }
    
    // ============================================
    // MODIFY THIS SQL QUERY FOR YOUR API
    // ============================================
    $sql = "SELECT * FROM your_table WHERE is_active = 1 ORDER BY display_order ASC";
    
    $result = $conn->query($sql);
    
    if ($result === false) {
        throw new Exception("Database query failed: " . $conn->error);
    }
    
    $data = array();
    
    while ($row = $result->fetch_assoc()) {
        // Convert IDs to integers
        if (isset($row['id'])) {
            $row['id'] = (int)$row['id'];
        }
        $data[] = $row;
    }
    
    http_response_code(200);
    
    echo json_encode([
        "success" => true,
        "message" => "Data fetched successfully",
        "data" => $data,
        "count" => count($data)
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    
    echo json_encode([
        "success" => false,
        "message" => "An error occurred",
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

if (isset($conn)) {
    $conn->close();
}

?>

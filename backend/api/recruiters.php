<?php
/**
 * Recruiters API Endpoint
 * GET /backend/api/recruiters.php
 */

// Buffer ALL output - catch any stray PHP warnings/notices
ob_start();

// Set JSON header FIRST
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Suppress errors from output
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

if (!file_exists(__DIR__ . '/../config/db.php')) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database config not found at: " . __DIR__ . '/../config/db.php']);
    exit();
}

require_once __DIR__ . '/../config/db.php';

// Discard any output produced by db.php (warnings etc.)
ob_end_clean();

try {
    if (!isset($conn) || $conn->connect_error) {
        throw new Exception("Database connection not established");
    }

    $sql = "SELECT id, company_name, logo, industry_sector, website_url, recruitment_year, display_order
            FROM recruiters
            WHERE is_active = 1
            ORDER BY display_order ASC";

    $result = $conn->query($sql);

    if ($result === false) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $recruiters = [];
    while ($row = $result->fetch_assoc()) {
        $row['id']            = (int)$row['id'];
        $row['display_order'] = (int)$row['display_order'];
        $recruiters[] = $row;
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Recruiters fetched successfully",
        "data"    => $recruiters,
        "count"   => count($recruiters)
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error fetching recruiters",
        "error"   => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

if (isset($conn)) {
    $conn->close();
}
?>

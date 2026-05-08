<?php
/**
 * Top Header Links API Endpoint
 * GET /backend/api/top-header.php
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
ini_set('display_errors', 0); ini_set('log_errors', 1); error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'GET') { ob_end_clean(); http_response_code(405); echo json_encode(["success"=>false,"message"=>"Method not allowed"]); exit(); }
if (!file_exists(__DIR__ . '/../config/db.php')) { ob_end_clean(); http_response_code(500); echo json_encode(["success"=>false,"message"=>"DB config not found"]); exit(); }

require_once __DIR__ . '/../config/db.php';
ob_end_clean();

try {
    if (!isset($conn) || $conn->connect_error) throw new Exception("DB connection failed");

    // Check if table exists
    $tableCheck = $conn->query("SHOW TABLES LIKE 'top_header_links'");
    if (!$tableCheck || $tableCheck->num_rows === 0) {
        // Table doesn't exist yet - return empty data (not an error)
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Top header links fetched",
            "data"    => ["menuLinks"=>[],"socialLinks"=>[],"actionLinks"=>[]],
            "counts"  => ["menuLinks"=>0,"socialLinks"=>0,"actionLinks"=>0]
        ], JSON_PRETTY_PRINT);
        exit();
    }

    $result = $conn->query("SELECT id, type, title, icon, url, target, display_order FROM top_header_links WHERE is_active = 1 ORDER BY display_order ASC");
    if ($result === false) throw new Exception("Query failed: " . $conn->error);

    $menuLinks = []; $socialLinks = []; $actionLinks = [];
    while ($row = $result->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['display_order'] = (int)$row['display_order'];
        switch ($row['type']) {
            case 'menu':   $menuLinks[]   = $row; break;
            case 'social': $socialLinks[] = $row; break;
            case 'action': $actionLinks[] = $row; break;
        }
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Top header links fetched",
        "data"    => ["menuLinks"=>$menuLinks,"socialLinks"=>$socialLinks,"actionLinks"=>$actionLinks],
        "counts"  => ["menuLinks"=>count($menuLinks),"socialLinks"=>count($socialLinks),"actionLinks"=>count($actionLinks)]
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching top header links","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

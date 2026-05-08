<?php
/**
 * Why Choose Us API
 * GET /backend/api/why-choose-us.php
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

    $result = $conn->query("SELECT id, title, description, icon, display_order FROM why_choose_us WHERE is_active = 1 ORDER BY display_order ASC");
    if (!$result) throw new Exception("Query failed: " . $conn->error);

    $cards = [];
    while ($row = $result->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['display_order'] = (int)$row['display_order'];
        $cards[] = $row;
    }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Why choose us fetched","data"=>$cards,"count"=>count($cards)], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching why choose us","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

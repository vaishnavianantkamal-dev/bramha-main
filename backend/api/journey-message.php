<?php
/**
 * Journey Message API
 * GET /backend/api/journey-message.php?slug=president-message
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

    $slug = isset($_GET['slug']) ? trim($_GET['slug']) : 'president-message';
    $stmt = $conn->prepare("SELECT * FROM journey_messages WHERE slug = ? AND is_active = 1 LIMIT 1");
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
    $stmt->bind_param("s", $slug);
    if (!$stmt->execute()) throw new Exception("Execute failed: " . $stmt->error);
    $result = $stmt->get_result();
    $row    = $result->fetch_assoc();
    $stmt->close();

    if (!$row) { http_response_code(404); echo json_encode(["success"=>false,"message"=>"Journey message not found: ".htmlspecialchars($slug)]); exit(); }

    $row['id'] = (int)$row['id'];
    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Journey message fetched","data"=>$row], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching journey message","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

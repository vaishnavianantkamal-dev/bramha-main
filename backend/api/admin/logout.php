<?php
/**
 * Admin Logout API
 * POST /backend/api/admin/logout.php
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 0); ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }

require_once __DIR__ . '/../../config/db.php';
ob_end_clean();

try {
    $token = null;
    $headers = getallheaders();
    if (isset($headers['Authorization'])) $token = str_replace('Bearer ', '', $headers['Authorization']);
    elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);

    if ($token) {
        $stmt = $conn->prepare("DELETE FROM admin_sessions WHERE session_token = ?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->close();
    }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Logged out successfully"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Logout failed"]);
}
if (isset($conn)) $conn->close();
?>

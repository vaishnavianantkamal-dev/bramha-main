<?php
/**
 * Change Admin Password
 * POST /backend/api/admin/change-password.php
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 0); ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { ob_end_clean(); http_response_code(405); echo json_encode(["success"=>false,"message"=>"POST only"]); exit(); }

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
ob_end_clean();

$session = requireAdminAuth();

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $current = $input['current_password'] ?? '';
    $new     = $input['new_password'] ?? '';

    if (!$current || !$new) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"Both passwords required"]); exit(); }
    if (strlen($new) < 6) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"New password must be at least 6 characters"]); exit(); }

    $stmt = $conn->prepare("SELECT password_hash FROM admin_users WHERE id=?");
    $stmt->bind_param("i", $session['user_id']); $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc(); $stmt->close();

    if (!$user || !password_verify($current, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(["success"=>false,"message"=>"Current password is incorrect"]);
        exit();
    }

    $newHash = password_hash($new, PASSWORD_DEFAULT);
    $stmt2 = $conn->prepare("UPDATE admin_users SET password_hash=? WHERE id=?");
    $stmt2->bind_param("si", $newHash, $session['user_id']); $stmt2->execute(); $stmt2->close();

    echo json_encode(["success"=>true,"message"=>"Password changed successfully"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

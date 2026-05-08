<?php
/**
 * Admin Login API
 * POST /backend/api/admin/login.php
 * Body: { "username": "admin", "password": "Admin@123" }
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 0); ini_set('log_errors', 1); error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { ob_end_clean(); http_response_code(405); echo json_encode(["success"=>false,"message"=>"POST only"]); exit(); }

require_once __DIR__ . '/../../config/db.php';
ob_end_clean();

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['username']) || empty($input['password'])) {
        http_response_code(400);
        echo json_encode(["success"=>false,"message"=>"Username and password required"]);
        exit();
    }

    $username = trim($input['username']);
    $password = $input['password'];

    $stmt = $conn->prepare("SELECT id, username, email, password_hash, full_name, role, avatar, is_active FROM admin_users WHERE (username = ? OR email = ?) AND is_active = 1");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(["success"=>false,"message"=>"Invalid username or password"]);
        exit();
    }

    // Generate session token
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));
    $ip = $_SERVER['REMOTE_ADDR'] ?? null;
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? null;

    $stmt2 = $conn->prepare("INSERT INTO admin_sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)");
    $stmt2->bind_param("issss", $user['id'], $token, $ip, $ua, $expiresAt);
    $stmt2->execute();
    $stmt2->close();

    // Update last login
    $conn->query("UPDATE admin_users SET last_login = NOW() WHERE id = " . (int)$user['id']);

    unset($user['password_hash']);
    $user['id'] = (int)$user['id'];

    http_response_code(200);
    echo json_encode([
        "success"    => true,
        "message"    => "Login successful",
        "token"      => $token,
        "expires_at" => $expiresAt,
        "user"       => $user
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Login failed","error"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

<?php
/**
 * Admin Authentication Helper
 * Validates session token from Authorization header or cookie
 */

function requireAdminAuth() {
    // Get token from Authorization header or cookie
    $token = null;

    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
    } elseif (isset($_COOKIE['admin_token'])) {
        $token = $_COOKIE['admin_token'];
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
    }

    if (!$token) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Unauthorized: No token provided"]);
        exit();
    }

    // Validate token against DB
    global $conn;
    if (!isset($conn)) {
        require_once __DIR__ . '/db.php';
    }

    $stmt = $conn->prepare(
        "SELECT s.user_id, s.expires_at, u.username, u.full_name, u.role, u.is_active
         FROM admin_sessions s
         JOIN admin_users u ON s.user_id = u.id
         WHERE s.session_token = ? AND s.expires_at > NOW()"
    );
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Auth check failed"]);
        exit();
    }

    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $session = $result->fetch_assoc();
    $stmt->close();

    if (!$session) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Unauthorized: Invalid or expired token"]);
        exit();
    }

    if (!$session['is_active']) {
        http_response_code(403);
        echo json_encode(["success" => false, "message" => "Account is disabled"]);
        exit();
    }

    return $session;
}

function logActivity($conn, $userId, $action, $module, $recordId = null, $details = null) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? null;
    $stmt = $conn->prepare(
        "INSERT INTO admin_activity_log (user_id, action, module, record_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)"
    );
    if ($stmt) {
        $stmt->bind_param("ississ", $userId, $action, $module, $recordId, $details, $ip);
        $stmt->execute();
        $stmt->close();
    }
}
?>

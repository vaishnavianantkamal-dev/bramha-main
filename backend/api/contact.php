<?php
/**
 * ============================================
 * Contact Form API Endpoint
 * ============================================
 * POST /backend/api/contact.php
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Only POST requests are accepted."]);
    exit();
}

if (!file_exists(__DIR__ . '/../config/db.php')) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database configuration not found"]);
    exit();
}

require_once __DIR__ . '/../config/db.php';

try {
    if (!isset($conn) || $conn === null) {
        throw new Exception("Database connection not established");
    }

    $input = file_get_contents('php://input');
    $data  = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON format in request body");
    }

    $required_fields = ['name', 'email', 'subject', 'message'];
    $missing_fields  = [];

    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            $missing_fields[] = $field;
        }
    }

    if (!empty($missing_fields)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Missing required fields: " . implode(', ', $missing_fields)
        ]);
        exit();
    }

    $name    = trim($data['name']);
    $email   = trim($data['email']);
    $subject = trim($data['subject']);
    $message = trim($data['message']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit();
    }

    $ip_address = $_SERVER['REMOTE_ADDR']     ?? null;
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;

    $sql  = "INSERT INTO contact_submissions 
             (name, email, subject, message, ip_address, user_agent, status, submitted_at) 
             VALUES (?, ?, ?, ?, ?, ?, 'new', NOW())";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }

    $stmt->bind_param("ssssss", $name, $email, $subject, $message, $ip_address, $user_agent);

    if ($stmt->execute()) {
        $submission_id = $stmt->insert_id;
        $stmt->close();

        http_response_code(201);
        echo json_encode([
            "success"       => true,
            "message"       => "Thank you for contacting us! We will get back to you within 24 hours.",
            "submission_id" => $submission_id
        ], JSON_PRETTY_PRINT);
    } else {
        throw new Exception("Failed to save submission: " . $stmt->error);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to submit contact form",
        "error"   => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

if (isset($conn)) {
    $conn->close();
}
?>

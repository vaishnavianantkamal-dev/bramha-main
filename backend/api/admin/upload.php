<?php
/**
 * Image Upload API
 * POST /backend/api/admin/upload.php
 * Form-data: file (image)
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 0); ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
ob_end_clean();

$session = requireAdminAuth();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        $filePath = $input['file_path'] ?? null;
        if (!$filePath) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"file_path required"]); exit(); }

        // Security: only allow deleting from uploads folder
        $realPath = realpath(__DIR__ . '/../../' . ltrim($filePath, '/'));
        $uploadsDir = realpath(__DIR__ . '/../../uploads');
        if (!$realPath || strpos($realPath, $uploadsDir) !== 0) {
            http_response_code(403);
            echo json_encode(["success"=>false,"message"=>"Invalid file path"]);
            exit();
        }

        if (file_exists($realPath)) unlink($realPath);

        $stmt = $conn->prepare("DELETE FROM uploaded_files WHERE file_path = ?");
        $stmt->bind_param("s", $filePath);
        $stmt->execute();
        $stmt->close();

        echo json_encode(["success"=>true,"message"=>"File deleted"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success"=>false,"message"=>"POST only"]);
    exit();
}

try {
    if (empty($_FILES['file'])) {
        http_response_code(400);
        echo json_encode(["success"=>false,"message"=>"No file uploaded"]);
        exit();
    }

    $file = $_FILES['file'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["success"=>false,"message"=>"Upload error code: " . $file['error']]);
        exit();
    }

    // Validate type
    $allowedTypes = ['image/jpeg','image/jpg','image/png','image/gif','image/webp','image/svg+xml'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mimeType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(["success"=>false,"message"=>"Invalid file type: $mimeType. Allowed: JPG, PNG, GIF, WebP, SVG"]);
        exit();
    }

    // Max 5MB
    if ($file['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(["success"=>false,"message"=>"File too large. Max 5MB allowed"]);
        exit();
    }

    // Create upload directory
    $subfolder = $_POST['folder'] ?? 'general';
    $subfolder = preg_replace('/[^a-zA-Z0-9_-]/', '', $subfolder);
    $uploadDir = __DIR__ . '/../../uploads/' . $subfolder . '/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

    // Generate unique filename
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $storedName = uniqid('img_', true) . '.' . strtolower($ext);
    $fullPath = $uploadDir . $storedName;

    if (!move_uploaded_file($file['tmp_name'], $fullPath)) {
        http_response_code(500);
        echo json_encode(["success"=>false,"message"=>"Failed to save file"]);
        exit();
    }

    // URL path (relative to backend root)
    $urlPath = '/brahmavalley-main/brahmavalley-main/backend/uploads/' . $subfolder . '/' . $storedName;

    // Save to DB
    $stmt = $conn->prepare("INSERT INTO uploaded_files (original_name, stored_name, file_path, file_type, file_size, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssii", $file['name'], $storedName, $urlPath, $mimeType, $file['size'], $session['user_id']);
    $stmt->execute();
    $fileId = $stmt->insert_id;
    $stmt->close();

    http_response_code(200);
    echo json_encode([
        "success"       => true,
        "message"       => "File uploaded successfully",
        "file_id"       => $fileId,
        "file_path"     => $urlPath,
        "original_name" => $file['name'],
        "file_size"     => $file['size'],
        "mime_type"     => $mimeType
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

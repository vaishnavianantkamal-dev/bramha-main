<?php
/**
 * Gallery Images API
 * GET /backend/api/gallery-images.php
 * GET /backend/api/gallery-images.php?category=brahmautsav
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

    $category = isset($_GET['category']) ? trim($_GET['category']) : null;

    if ($category) {
        $stmt = $conn->prepare("SELECT gi.id, gi.category_id, gi.image_path, gi.caption, gi.event_date, gi.photographer, gi.display_order, gc.slug FROM gallery_images gi JOIN gallery_categories gc ON gi.category_id = gc.id WHERE gi.is_active = 1 AND gc.slug = ? ORDER BY gi.display_order ASC");
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("s", $category);
        if (!$stmt->execute()) throw new Exception("Execute failed: " . $stmt->error);
        $result = $stmt->get_result();
        $stmt->close();
    } else {
        $result = $conn->query("SELECT id, category_id, image_path, caption, event_date, photographer, display_order FROM gallery_images WHERE is_active = 1 ORDER BY display_order ASC");
        if ($result === false) throw new Exception("Query failed: " . $conn->error);
    }

    $images = [];
    while ($row = $result->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['category_id'] = (int)$row['category_id'];
        $row['display_order'] = (int)$row['display_order'];
        $images[] = $row;
    }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Gallery images fetched","data"=>$images,"count"=>count($images)], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching gallery images","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

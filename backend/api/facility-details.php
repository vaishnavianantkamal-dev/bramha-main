<?php
/**
 * Facility Details API
 * GET /backend/api/facility-details.php?slug=sports-facilities
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

    $slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;
    if (!$slug) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"Slug required. Use ?slug=sports-facilities"]); exit(); }

    $tableCheck = $conn->query("SHOW TABLES LIKE 'facility_details'");
    if (!$tableCheck || $tableCheck->num_rows === 0) {
        http_response_code(200);
        echo json_encode(["success"=>false,"message"=>"Table 'facility_details' not found. Run facility_details.sql to create it."]);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, slug, title, subtitle, hero_image, overview, points FROM facility_details WHERE slug = ? AND is_active = 1 LIMIT 1");
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
    $stmt->bind_param("s", $slug);
    if (!$stmt->execute()) throw new Exception("Execute failed: " . $stmt->error);
    $result   = $stmt->get_result();
    $facility = $result->fetch_assoc();
    $stmt->close();

    if (!$facility) { http_response_code(404); echo json_encode(["success"=>false,"message"=>"Facility not found: ".htmlspecialchars($slug)]); exit(); }

    $facility['id'] = (int)$facility['id'];
    if (!empty($facility['points'])) {
        $decoded = json_decode($facility['points'], true);
        $facility['points'] = (json_last_error() === JSON_ERROR_NONE) ? $decoded : [];
    } else { $facility['points'] = []; }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Facility details fetched","data"=>$facility], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching facility details","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

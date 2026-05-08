<?php
/**
 * Courses API
 * GET /backend/api/courses.php
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

    $sql    = "SELECT id, name, code, level, duration, campus, institution, description, eligibility, fees FROM courses WHERE is_active = 1";
    $params = [];
    $types  = "";

    foreach (['level','duration','campus','institution'] as $filter) {
        if (!empty($_GET[$filter])) {
            $sql .= " AND $filter = ?";
            $params[] = $_GET[$filter];
            $types   .= "s";
        }
    }
    $sql .= " ORDER BY level, name ASC";

    if (!empty($params)) {
        $stmt = $conn->prepare($sql);
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param($types, ...$params);
        if (!$stmt->execute()) throw new Exception("Execute failed: " . $stmt->error);
        $result = $stmt->get_result();
        $stmt->close();
    } else {
        $result = $conn->query($sql);
        if ($result === false) throw new Exception("Query failed: " . $conn->error);
    }

    $courses = [];
    while ($row = $result->fetch_assoc()) {
        $row['id']   = (int)$row['id'];
        $row['fees'] = $row['fees'] ? (float)$row['fees'] : null;
        $courses[] = $row;
    }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Courses fetched","data"=>$courses,"count"=>count($courses)], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching courses","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

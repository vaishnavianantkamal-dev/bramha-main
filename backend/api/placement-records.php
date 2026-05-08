<?php
/**
 * Placement Records API
 * GET /backend/api/placement-records.php
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

    $result = $conn->query("SELECT id, campus_name, academic_year, average_package, highest_package, total_students, students_placed, placement_percentage FROM placement_records ORDER BY academic_year DESC, campus_name ASC");
    if ($result === false) throw new Exception("Query failed: " . $conn->error);

    $records = [];
    while ($row = $result->fetch_assoc()) {
        $row['id']                   = (int)$row['id'];
        $row['average_package']      = (float)$row['average_package'];
        $row['highest_package']      = (float)$row['highest_package'];
        $row['total_students']       = (int)$row['total_students'];
        $row['students_placed']      = (int)$row['students_placed'];
        $row['placement_percentage'] = (float)$row['placement_percentage'];
        $records[] = $row;
    }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Placement records fetched","data"=>$records,"count"=>count($records)], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching placement records","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

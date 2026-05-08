<?php
/**
 * Admin Courses CRUD
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 0); ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
ob_end_clean();

$session = requireAdminAuth();
$method  = $_SERVER['REQUEST_METHOD'];
$id      = isset($_GET['id']) ? (int)$_GET['id'] : null;

try {
    if ($method === 'GET') {
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM courses WHERE id=?");
            $stmt->bind_param("i", $id); $stmt->execute();
            $row = $stmt->get_result()->fetch_assoc(); $stmt->close();
            if (!$row) { http_response_code(404); echo json_encode(["success"=>false,"message"=>"Not found"]); exit(); }
            $row['id']=(int)$row['id'];
            echo json_encode(["success"=>true,"data"=>$row]);
        } else {
            $result = $conn->query("SELECT * FROM courses ORDER BY level, name ASC");
            $rows = [];
            while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $r['is_active']=(int)$r['is_active']; $rows[] = $r; }
            echo json_encode(["success"=>true,"data"=>$rows,"count"=>count($rows)]);
        }

    } elseif ($method === 'POST') {
        $d = json_decode(file_get_contents('php://input'), true);
        if (empty($d['name'])) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"name required"]); exit(); }
        $stmt = $conn->prepare("INSERT INTO courses (name, code, level, duration, campus, institution, description, eligibility, fees, brochure_url, is_active) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
        $n=$d['name']; $c=$d['code']??''; $l=$d['level']??'UG'; $du=$d['duration']??''; $ca=$d['campus']??''; $in=$d['institution']??''; $de=$d['description']??''; $el=$d['eligibility']??''; $fe=(float)($d['fees']??0); $br=$d['brochure_url']??''; $ac=(int)($d['is_active']??1);
        $stmt->bind_param("ssssssssdsi", $n,$c,$l,$du,$ca,$in,$de,$el,$fe,$br,$ac);
        $stmt->execute(); $newId=$stmt->insert_id; $stmt->close();
        logActivity($conn, $session['user_id'], 'CREATE', 'courses', $newId, "Created course: $n");
        http_response_code(201);
        echo json_encode(["success"=>true,"message"=>"Course created","id"=>$newId]);

    } elseif ($method === 'PUT') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE courses SET name=?, code=?, level=?, duration=?, campus=?, institution=?, description=?, eligibility=?, fees=?, brochure_url=?, is_active=? WHERE id=?");
        $n=$d['name']??''; $c=$d['code']??''; $l=$d['level']??'UG'; $du=$d['duration']??''; $ca=$d['campus']??''; $in=$d['institution']??''; $de=$d['description']??''; $el=$d['eligibility']??''; $fe=(float)($d['fees']??0); $br=$d['brochure_url']??''; $ac=(int)($d['is_active']??1);
        $stmt->bind_param("ssssssssdsii", $n,$c,$l,$du,$ca,$in,$de,$el,$fe,$br,$ac,$id);
        $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'UPDATE', 'courses', $id, "Updated course ID: $id");
        echo json_encode(["success"=>true,"message"=>"Course updated"]);

    } elseif ($method === 'DELETE') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $stmt = $conn->prepare("DELETE FROM courses WHERE id=?");
        $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'DELETE', 'courses', $id, "Deleted course ID: $id");
        echo json_encode(["success"=>true,"message"=>"Course deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

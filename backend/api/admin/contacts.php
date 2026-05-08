<?php
/**
 * Admin Contact Submissions (read + status update)
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS");
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
        $page   = max(1, (int)($_GET['page'] ?? 1));
        $limit  = min(50, (int)($_GET['limit'] ?? 20));
        $offset = ($page - 1) * $limit;
        $status = $_GET['status'] ?? null;
        $where  = $status ? "WHERE status = '" . $conn->real_escape_string($status) . "'" : "";
        $total  = (int)$conn->query("SELECT COUNT(*) as cnt FROM contact_submissions $where")->fetch_assoc()['cnt'];
        $result = $conn->query("SELECT * FROM contact_submissions $where ORDER BY submitted_at DESC LIMIT $limit OFFSET $offset");
        $rows = [];
        while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $rows[] = $r; }
        echo json_encode(["success"=>true,"data"=>$rows,"total"=>$total,"page"=>$page]);

    } elseif ($method === 'PUT') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $d = json_decode(file_get_contents('php://input'), true);
        $status = $d['status'] ?? 'read';
        $stmt = $conn->prepare("UPDATE contact_submissions SET status=? WHERE id=?");
        $stmt->bind_param("si", $status, $id); $stmt->execute(); $stmt->close();
        echo json_encode(["success"=>true,"message"=>"Status updated"]);

    } elseif ($method === 'DELETE') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $stmt = $conn->prepare("DELETE FROM contact_submissions WHERE id=?");
        $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
        echo json_encode(["success"=>true,"message"=>"Submission deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

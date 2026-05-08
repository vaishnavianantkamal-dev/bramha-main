<?php
/**
 * Admin Recruiters CRUD
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
        $result = $conn->query("SELECT * FROM recruiters ORDER BY display_order ASC");
        $rows = [];
        while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $r['is_active']=(int)$r['is_active']; $rows[] = $r; }
        echo json_encode(["success"=>true,"data"=>$rows,"count"=>count($rows)]);

    } elseif ($method === 'POST') {
        $d = json_decode(file_get_contents('php://input'), true);
        if (empty($d['company_name'])) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"company_name required"]); exit(); }
        $stmt = $conn->prepare("INSERT INTO recruiters (company_name, logo, industry_sector, website_url, recruitment_year, display_order, is_active) VALUES (?,?,?,?,?,?,?)");
        $cn=$d['company_name']; $lo=$d['logo']??''; $is=$d['industry_sector']??''; $wu=$d['website_url']??''; $ry=$d['recruitment_year']??date('Y'); $ord=(int)($d['display_order']??0); $ac=(int)($d['is_active']??1);
        $stmt->bind_param("sssssii", $cn,$lo,$is,$wu,$ry,$ord,$ac);
        $stmt->execute(); $newId=$stmt->insert_id; $stmt->close();
        logActivity($conn, $session['user_id'], 'CREATE', 'recruiters', $newId, "Created recruiter: $cn");
        http_response_code(201);
        echo json_encode(["success"=>true,"message"=>"Recruiter created","id"=>$newId]);

    } elseif ($method === 'PUT') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE recruiters SET company_name=?, logo=?, industry_sector=?, website_url=?, recruitment_year=?, display_order=?, is_active=? WHERE id=?");
        $cn=$d['company_name']??''; $lo=$d['logo']??''; $is=$d['industry_sector']??''; $wu=$d['website_url']??''; $ry=$d['recruitment_year']??date('Y'); $ord=(int)($d['display_order']??0); $ac=(int)($d['is_active']??1);
        $stmt->bind_param("sssssiii", $cn,$lo,$is,$wu,$ry,$ord,$ac,$id);
        $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'UPDATE', 'recruiters', $id, "Updated recruiter ID: $id");
        echo json_encode(["success"=>true,"message"=>"Recruiter updated"]);

    } elseif ($method === 'DELETE') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $stmt = $conn->prepare("DELETE FROM recruiters WHERE id=?");
        $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'DELETE', 'recruiters', $id, "Deleted recruiter ID: $id");
        echo json_encode(["success"=>true,"message"=>"Recruiter deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

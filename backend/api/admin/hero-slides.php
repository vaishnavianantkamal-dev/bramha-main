<?php
/**
 * Admin Hero Slides CRUD
 * GET    /admin/hero-slides.php         - list all
 * POST   /admin/hero-slides.php         - create
 * PUT    /admin/hero-slides.php?id=N    - update
 * DELETE /admin/hero-slides.php?id=N   - delete
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
        $result = $conn->query("SELECT * FROM hero_slides ORDER BY display_order ASC");
        $rows = [];
        while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $r['display_order']=(int)$r['display_order']; $r['is_active']=(int)$r['is_active']; $rows[] = $r; }
        echo json_encode(["success"=>true,"data"=>$rows,"count"=>count($rows)]);

    } elseif ($method === 'POST') {
        $d = json_decode(file_get_contents('php://input'), true);
        if (empty($d['headline'])) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"headline required"]); exit(); }
        $stmt = $conn->prepare("INSERT INTO hero_slides (image, tag, headline, highlight, subtitle, display_order, is_active) VALUES (?,?,?,?,?,?,?)");
        $img = $d['image'] ?? ''; $tag = $d['tag'] ?? ''; $hl = $d['headline']; $hi = $d['highlight'] ?? ''; $sub = $d['subtitle'] ?? ''; $ord = (int)($d['display_order'] ?? 0); $act = (int)($d['is_active'] ?? 1);
        $stmt->bind_param("sssssii", $img, $tag, $hl, $hi, $sub, $ord, $act);
        $stmt->execute(); $newId = $stmt->insert_id; $stmt->close();
        logActivity($conn, $session['user_id'], 'CREATE', 'hero_slides', $newId, "Created slide: $hl");
        http_response_code(201);
        echo json_encode(["success"=>true,"message"=>"Slide created","id"=>$newId]);

    } elseif ($method === 'PUT') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE hero_slides SET image=?, tag=?, headline=?, highlight=?, subtitle=?, display_order=?, is_active=? WHERE id=?");
        $img = $d['image'] ?? ''; $tag = $d['tag'] ?? ''; $hl = $d['headline'] ?? ''; $hi = $d['highlight'] ?? ''; $sub = $d['subtitle'] ?? ''; $ord = (int)($d['display_order'] ?? 0); $act = (int)($d['is_active'] ?? 1);
        $stmt->bind_param("sssssiii", $img, $tag, $hl, $hi, $sub, $ord, $act, $id);
        $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'UPDATE', 'hero_slides', $id, "Updated slide ID: $id");
        echo json_encode(["success"=>true,"message"=>"Slide updated"]);

    } elseif ($method === 'DELETE') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $stmt = $conn->prepare("DELETE FROM hero_slides WHERE id=?");
        $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'DELETE', 'hero_slides', $id, "Deleted slide ID: $id");
        echo json_encode(["success"=>true,"message"=>"Slide deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

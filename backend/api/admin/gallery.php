<?php
/**
 * Admin Gallery CRUD (categories + images)
 * ?type=categories or ?type=images
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
$type    = $_GET['type'] ?? 'images'; // 'categories' or 'images'

try {
    if ($type === 'categories') {
        $table = 'gallery_categories';
        if ($method === 'GET') {
            $result = $conn->query("SELECT * FROM gallery_categories ORDER BY display_order ASC");
            $rows = [];
            while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $rows[] = $r; }
            echo json_encode(["success"=>true,"data"=>$rows]);

        } elseif ($method === 'POST') {
            $d = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO gallery_categories (name, slug, description, cover_image, display_order, is_active) VALUES (?,?,?,?,?,?)");
            $n=$d['name']??''; $sl=$d['slug']??strtolower(preg_replace('/[^a-z0-9]+/','-',$n)); $de=$d['description']??''; $ci=$d['cover_image']??''; $ord=(int)($d['display_order']??0); $ac=(int)($d['is_active']??1);
            $stmt->bind_param("ssssii", $n,$sl,$de,$ci,$ord,$ac);
            $stmt->execute(); $newId=$stmt->insert_id; $stmt->close();
            http_response_code(201);
            echo json_encode(["success"=>true,"message"=>"Category created","id"=>$newId]);

        } elseif ($method === 'PUT') {
            if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
            $d = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("UPDATE gallery_categories SET name=?, slug=?, description=?, cover_image=?, display_order=?, is_active=? WHERE id=?");
            $n=$d['name']??''; $sl=$d['slug']??''; $de=$d['description']??''; $ci=$d['cover_image']??''; $ord=(int)($d['display_order']??0); $ac=(int)($d['is_active']??1);
            $stmt->bind_param("ssssiiii", $n,$sl,$de,$ci,$ord,$ac,$id);
            $stmt->execute(); $stmt->close();
            echo json_encode(["success"=>true,"message"=>"Category updated"]);

        } elseif ($method === 'DELETE') {
            if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
            $conn->query("DELETE FROM gallery_images WHERE category_id=$id");
            $stmt = $conn->prepare("DELETE FROM gallery_categories WHERE id=?");
            $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
            echo json_encode(["success"=>true,"message"=>"Category and its images deleted"]);
        }

    } else {
        // Images
        if ($method === 'GET') {
            $catId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;
            $where = $catId ? "WHERE gi.category_id=$catId" : "";
            $result = $conn->query("SELECT gi.*, gc.name as category_name FROM gallery_images gi LEFT JOIN gallery_categories gc ON gi.category_id=gc.id $where ORDER BY gi.display_order ASC");
            $rows = [];
            while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $rows[] = $r; }
            echo json_encode(["success"=>true,"data"=>$rows]);

        } elseif ($method === 'POST') {
            $d = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("INSERT INTO gallery_images (category_id, image_path, caption, event_date, photographer, display_order, is_active) VALUES (?,?,?,?,?,?,?)");
            $ci=(int)($d['category_id']??0); $ip=$d['image_path']??''; $ca=$d['caption']??''; $ed=$d['event_date']??null; $ph=$d['photographer']??''; $ord=(int)($d['display_order']??0); $ac=(int)($d['is_active']??1);
            $stmt->bind_param("issssii", $ci,$ip,$ca,$ed,$ph,$ord,$ac);
            $stmt->execute(); $newId=$stmt->insert_id; $stmt->close();
            http_response_code(201);
            echo json_encode(["success"=>true,"message"=>"Image added","id"=>$newId]);

        } elseif ($method === 'PUT') {
            if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
            $d = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("UPDATE gallery_images SET category_id=?, image_path=?, caption=?, event_date=?, photographer=?, display_order=?, is_active=? WHERE id=?");
            $ci=(int)($d['category_id']??0); $ip=$d['image_path']??''; $ca=$d['caption']??''; $ed=$d['event_date']??null; $ph=$d['photographer']??''; $ord=(int)($d['display_order']??0); $ac=(int)($d['is_active']??1);
            $stmt->bind_param("issssiii", $ci,$ip,$ca,$ed,$ph,$ord,$ac,$id);
            $stmt->execute(); $stmt->close();
            echo json_encode(["success"=>true,"message"=>"Image updated"]);

        } elseif ($method === 'DELETE') {
            if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
            $stmt = $conn->prepare("DELETE FROM gallery_images WHERE id=?");
            $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
            echo json_encode(["success"=>true,"message"=>"Image deleted"]);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

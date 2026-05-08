<?php
/**
 * Admin Blogs CRUD
 * GET    /admin/blogs.php         - list all
 * GET    /admin/blogs.php?id=N    - get single
 * POST   /admin/blogs.php         - create
 * PUT    /admin/blogs.php?id=N    - update
 * DELETE /admin/blogs.php?id=N   - delete
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
            $stmt = $conn->prepare("SELECT * FROM blog_posts WHERE id=?");
            $stmt->bind_param("i", $id); $stmt->execute();
            $row = $stmt->get_result()->fetch_assoc(); $stmt->close();
            if (!$row) { http_response_code(404); echo json_encode(["success"=>false,"message"=>"Not found"]); exit(); }
            $row['id']=(int)$row['id'];
            echo json_encode(["success"=>true,"data"=>$row]);
        } else {
            $page  = max(1, (int)($_GET['page'] ?? 1));
            $limit = min(50, (int)($_GET['limit'] ?? 20));
            $offset = ($page - 1) * $limit;
            $search = isset($_GET['search']) ? '%' . $conn->real_escape_string($_GET['search']) . '%' : null;

            $where = $search ? "WHERE title LIKE '$search' OR author_name LIKE '$search'" : "";
            $total = $conn->query("SELECT COUNT(*) as cnt FROM blog_posts $where")->fetch_assoc()['cnt'];
            $result = $conn->query("SELECT id, title, slug, author_name, category, published_date, is_published, views FROM blog_posts $where ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
            $rows = [];
            while ($r = $result->fetch_assoc()) { $r['id']=(int)$r['id']; $r['views']=(int)$r['views']; $r['is_published']=(int)$r['is_published']; $rows[] = $r; }
            echo json_encode(["success"=>true,"data"=>$rows,"total"=>(int)$total,"page"=>$page,"limit"=>$limit]);
        }

    } elseif ($method === 'POST') {
        $d = json_decode(file_get_contents('php://input'), true);
        if (empty($d['title'])) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"title required"]); exit(); }
        $slug = $d['slug'] ?? strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $d['title']));
        $stmt = $conn->prepare("INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_name, author_avatar, category, published_date, is_published) VALUES (?,?,?,?,?,?,?,?,?,?)");
        $t=$d['title']; $sl=$slug; $ex=$d['excerpt']??''; $co=$d['content']??''; $fi=$d['featured_image']??''; $an=$d['author_name']??'Admin'; $aa=$d['author_avatar']??''; $ca=$d['category']??'General'; $pd=$d['published_date']??date('Y-m-d'); $ip=(int)($d['is_published']??0);
        $stmt->bind_param("sssssssssi", $t,$sl,$ex,$co,$fi,$an,$aa,$ca,$pd,$ip);
        $stmt->execute(); $newId=$stmt->insert_id; $stmt->close();
        logActivity($conn, $session['user_id'], 'CREATE', 'blog_posts', $newId, "Created blog: $t");
        http_response_code(201);
        echo json_encode(["success"=>true,"message"=>"Blog created","id"=>$newId]);

    } elseif ($method === 'PUT') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, featured_image=?, author_name=?, author_avatar=?, category=?, published_date=?, is_published=? WHERE id=?");
        $t=$d['title']??''; $sl=$d['slug']??''; $ex=$d['excerpt']??''; $co=$d['content']??''; $fi=$d['featured_image']??''; $an=$d['author_name']??''; $aa=$d['author_avatar']??''; $ca=$d['category']??''; $pd=$d['published_date']??date('Y-m-d'); $ip=(int)($d['is_published']??0);
        $stmt->bind_param("sssssssssii", $t,$sl,$ex,$co,$fi,$an,$aa,$ca,$pd,$ip,$id);
        $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'UPDATE', 'blog_posts', $id, "Updated blog ID: $id");
        echo json_encode(["success"=>true,"message"=>"Blog updated"]);

    } elseif ($method === 'DELETE') {
        if (!$id) { http_response_code(400); echo json_encode(["success"=>false,"message"=>"id required"]); exit(); }
        $stmt = $conn->prepare("DELETE FROM blog_posts WHERE id=?");
        $stmt->bind_param("i", $id); $stmt->execute(); $stmt->close();
        logActivity($conn, $session['user_id'], 'DELETE', 'blog_posts', $id, "Deleted blog ID: $id");
        echo json_encode(["success"=>true,"message"=>"Blog deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

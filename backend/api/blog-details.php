<?php
/**
 * Blog Details API
 * GET /backend/api/blog-details.php?id=1
 * GET /backend/api/blog-details.php?slug=my-blog
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

    $blog_id   = isset($_GET['id'])   ? (int)$_GET['id']   : null;
    $blog_slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;

    if (!$blog_id && !$blog_slug) {
        http_response_code(400);
        echo json_encode(["success"=>false,"message"=>"Blog ID or slug required. Use ?id=1 or ?slug=my-blog"]);
        exit();
    }

    $sql  = "SELECT id, title, slug, excerpt, content, featured_image, author_name, author_avatar, category, published_date, views, created_at FROM blog_posts WHERE " . ($blog_id ? "id = ?" : "slug = ?") . " AND is_published = 1";
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
    if ($blog_id) { $stmt->bind_param("i", $blog_id); } else { $stmt->bind_param("s", $blog_slug); }
    if (!$stmt->execute()) throw new Exception("Execute failed: " . $stmt->error);

    $result = $stmt->get_result();
    $blog   = $result->fetch_assoc();
    $stmt->close();

    if (!$blog) { http_response_code(404); echo json_encode(["success"=>false,"message"=>"Blog post not found"]); exit(); }

    $blog['id']    = (int)$blog['id'];
    $blog['views'] = (int)$blog['views'];

    $upd = $conn->prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?");
    if ($upd) { $upd->bind_param("i", $blog['id']); $upd->execute(); $upd->close(); $blog['views']++; }

    http_response_code(200);
    echo json_encode(["success"=>true,"message"=>"Blog post fetched","data"=>$blog], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching blog post","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

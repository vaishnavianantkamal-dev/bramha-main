<?php
/**
 * Blogs API Endpoint
 * GET /backend/api/blogs.php
 * GET /backend/api/blogs.php?slug=my-blog
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

    if ($slug) {
        $stmt = $conn->prepare("SELECT id, title, slug, excerpt, content, featured_image, author_name, author_avatar, category, published_date, views FROM blog_posts WHERE is_published = 1 AND slug = ?");
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("s", $slug);
        if (!$stmt->execute()) throw new Exception("Execute failed: " . $stmt->error);
        $result = $stmt->get_result();
        if ($result->num_rows === 0) { http_response_code(404); echo json_encode(["success"=>false,"message"=>"Blog not found"]); exit(); }
        $blog = $result->fetch_assoc();
        $blog['id'] = (int)$blog['id'];
        $blog['views'] = (int)$blog['views'];
        $stmt->close();
        http_response_code(200);
        echo json_encode(["success"=>true,"message"=>"Blog fetched","data"=>$blog], JSON_PRETTY_PRINT);
    } else {
        $result = $conn->query("SELECT id, title, slug, excerpt, featured_image, author_name, author_avatar, category, published_date, views FROM blog_posts WHERE is_published = 1 ORDER BY published_date DESC");
        if ($result === false) throw new Exception("Query failed: " . $conn->error);
        $blogs = [];
        while ($row = $result->fetch_assoc()) {
            $row['id'] = (int)$row['id'];
            $row['views'] = (int)$row['views'];
            $blogs[] = $row;
        }
        http_response_code(200);
        echo json_encode(["success"=>true,"message"=>"Blogs fetched","data"=>$blogs,"count"=>count($blogs)], JSON_PRETTY_PRINT);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>"Error fetching blogs","error"=>$e->getMessage()], JSON_PRETTY_PRINT);
}
if (isset($conn)) $conn->close();
?>

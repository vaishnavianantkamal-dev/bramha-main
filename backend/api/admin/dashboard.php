<?php
/**
 * Admin Dashboard Stats
 * GET /backend/api/admin/dashboard.php
 */
ob_start();
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 0); ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_end_clean(); http_response_code(200); exit(); }

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
ob_end_clean();

requireAdminAuth();

try {
    $stats = [];

    // Helper to count table rows safely
    $countTable = function($table) use ($conn) {
        $r = $conn->query("SHOW TABLES LIKE '$table'");
        if (!$r || $r->num_rows === 0) return 0;
        $r2 = $conn->query("SELECT COUNT(*) as cnt FROM `$table`");
        if (!$r2) return 0;
        return (int)$r2->fetch_assoc()['cnt'];
    };

    $stats['total_blogs']        = $countTable('blog_posts');
    $stats['total_courses']      = $countTable('courses');
    $stats['total_recruiters']   = $countTable('recruiters');
    $stats['total_gallery']      = $countTable('gallery_images');
    $stats['total_hero_slides']  = $countTable('hero_slides');
    $stats['total_contacts']     = $countTable('contact_submissions');
    $stats['new_contacts']       = 0;
    $stats['total_faculty']      = $countTable('board_members');

    // New contact submissions
    $r = $conn->query("SHOW TABLES LIKE 'contact_submissions'");
    if ($r && $r->num_rows > 0) {
        $r2 = $conn->query("SELECT COUNT(*) as cnt FROM contact_submissions WHERE status = 'new'");
        if ($r2) $stats['new_contacts'] = (int)$r2->fetch_assoc()['cnt'];
    }

    // Recent contact submissions
    $recent_contacts = [];
    $r = $conn->query("SHOW TABLES LIKE 'contact_submissions'");
    if ($r && $r->num_rows > 0) {
        $r2 = $conn->query("SELECT id, name, email, subject, status, submitted_at FROM contact_submissions ORDER BY submitted_at DESC LIMIT 5");
        if ($r2) { while ($row = $r2->fetch_assoc()) { $row['id'] = (int)$row['id']; $recent_contacts[] = $row; } }
    }

    // Recent activity log
    $recent_activity = [];
    $r = $conn->query("SHOW TABLES LIKE 'admin_activity_log'");
    if ($r && $r->num_rows > 0) {
        $r2 = $conn->query("SELECT l.action, l.module, l.created_at, u.full_name FROM admin_activity_log l LEFT JOIN admin_users u ON l.user_id = u.id ORDER BY l.created_at DESC LIMIT 10");
        if ($r2) { while ($row = $r2->fetch_assoc()) $recent_activity[] = $row; }
    }

    http_response_code(200);
    echo json_encode([
        "success"          => true,
        "stats"            => $stats,
        "recent_contacts"  => $recent_contacts,
        "recent_activity"  => $recent_activity
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success"=>false,"message"=>$e->getMessage()]);
}
if (isset($conn)) $conn->close();
?>

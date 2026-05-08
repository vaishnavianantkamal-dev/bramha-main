<?php
/**
 * ============================================
 * Create Top Header Links Table
 * ============================================
 * This script creates the top_header_links table and inserts sample data
 * Run this once to set up the top header module
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/../config/db.php';

try {
    // Start transaction
    $conn->begin_transaction();
    
    // Drop existing table if it exists
    $conn->query("DROP TABLE IF EXISTS top_header_links");
    
    // Create table
    $create_sql = "CREATE TABLE top_header_links (
        id INT PRIMARY KEY AUTO_INCREMENT,
        type ENUM('menu', 'social', 'action') NOT NULL,
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(100),
        url VARCHAR(500) NOT NULL,
        target ENUM('_self', '_blank') DEFAULT '_self',
        display_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($create_sql)) {
        throw new Exception("Create table failed: " . $conn->error);
    }
    
    // Insert menu links
    $menu_links = [
        ['Download E-Brochures', 'download', '/brochures', '_self', 1],
        ['Alumni', 'users', '/alumni', '_self', 2],
        ['Careers', 'briefcase', '/careers', '_self', 3],
        ['Admission', 'clipboard', '/admission', '_self', 4],
    ];
    
    foreach ($menu_links as $link) {
        $insert_sql = "INSERT INTO top_header_links (type, title, icon, url, target, display_order, is_active) 
                      VALUES ('menu', ?, ?, ?, ?, ?, 1)";
        $stmt = $conn->prepare($insert_sql);
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("ssssi", $link[0], $link[1], $link[2], $link[3], $link[4]);
        if (!$stmt->execute()) throw new Exception("Insert failed: " . $stmt->error);
        $stmt->close();
    }
    
    // Insert social links
    $social_links = [
        ['WhatsApp', 'whatsapp', 'https://wa.me/919876543210', '_blank', 1],
        ['Facebook', 'facebook', 'https://facebook.com/brahmavalley', '_blank', 2],
        ['LinkedIn', 'linkedin', 'https://linkedin.com/company/brahmavalley', '_blank', 3],
        ['Instagram', 'instagram', 'https://instagram.com/brahmavalley', '_blank', 4],
        ['YouTube', 'youtube', 'https://youtube.com/@brahmavalley', '_blank', 5],
    ];
    
    foreach ($social_links as $link) {
        $insert_sql = "INSERT INTO top_header_links (type, title, icon, url, target, display_order, is_active) 
                      VALUES ('social', ?, ?, ?, ?, ?, 1)";
        $stmt = $conn->prepare($insert_sql);
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("ssssi", $link[0], $link[1], $link[2], $link[3], $link[4]);
        if (!$stmt->execute()) throw new Exception("Insert failed: " . $stmt->error);
        $stmt->close();
    }
    
    // Insert action links
    $action_links = [
        ['Get Connected', 'send', '/contact', '_self', 1],
        ['360 Virtual Tour', 'camera', '/virtual-tour', '_self', 2],
    ];
    
    foreach ($action_links as $link) {
        $insert_sql = "INSERT INTO top_header_links (type, title, icon, url, target, display_order, is_active) 
                      VALUES ('action', ?, ?, ?, ?, ?, 1)";
        $stmt = $conn->prepare($insert_sql);
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("ssssi", $link[0], $link[1], $link[2], $link[3], $link[4]);
        if (!$stmt->execute()) throw new Exception("Insert failed: " . $stmt->error);
        $stmt->close();
    }
    
    // Commit transaction
    $conn->commit();
    
    // Verify data
    $verify_result = $conn->query("SELECT type, COUNT(*) as count FROM top_header_links WHERE is_active = 1 GROUP BY type");
    $counts = [];
    while ($row = $verify_result->fetch_assoc()) {
        $counts[$row['type']] = $row['count'];
    }
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Top header links table created successfully!",
        "details" => [
            "table_created" => true,
            "menu_links" => $counts['menu'] ?? 0,
            "social_links" => $counts['social'] ?? 0,
            "action_links" => $counts['action'] ?? 0,
            "total_links" => array_sum($counts)
        ],
        "next_step" => "Test the API at: /backend/api/top-header.php"
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Rollback on error
    $conn->rollback();
    
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to create top header links table",
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

$conn->close();

?>

<?php
/**
 * Debug API - Check what tables exist in database
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../config/db.php';

try {
    // Get all tables
    $sql = "SHOW TABLES FROM brahmavalley_db";
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
    $tables = [];
    while ($row = $result->fetch_row()) {
        $tables[] = $row[0];
    }
    
    // Check if facility_details exists
    $facility_exists = in_array('facility_details', $tables);
    
    // If facility_details exists, count rows
    $facility_count = 0;
    if ($facility_exists) {
        $count_sql = "SELECT COUNT(*) as total FROM facility_details";
        $count_result = $conn->query($count_sql);
        if ($count_result) {
            $count_row = $count_result->fetch_assoc();
            $facility_count = $count_row['total'];
        }
    }
    
    echo json_encode([
        "success" => true,
        "database" => "brahmavalley_db",
        "total_tables" => count($tables),
        "tables" => $tables,
        "facility_details_exists" => $facility_exists,
        "facility_details_rows" => $facility_count,
        "message" => $facility_exists ? "facility_details table exists with $facility_count rows" : "facility_details table NOT FOUND"
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

$conn->close();
?>

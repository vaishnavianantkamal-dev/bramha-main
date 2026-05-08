<?php
/**
 * ============================================
 * Create Commitment Sections Table
 * ============================================
 * This script creates the commitment_sections table and inserts sample data
 * Run this once to set up the Our Commitment module
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/../config/db.php';

try {
    // Start transaction
    $conn->begin_transaction();
    
    // Drop existing table if it exists
    $conn->query("DROP TABLE IF EXISTS commitment_sections");
    
    // Create table
    $create_sql = "CREATE TABLE commitment_sections (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tags JSON,
        display_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($create_sql)) {
        throw new Exception("Create table failed: " . $conn->error);
    }
    
    // Insert commitment data
    $commitments = [
        [
            'title' => 'Academic Excellence',
            'description' => 'Define goals around curriculum quality, teaching standards, and academic outcomes. We are committed to providing world-class education that prepares students for global challenges and opportunities.',
            'tags' => ['Outcome-based learning', 'Industry relevance', 'Continuous improvement'],
            'display_order' => 1
        ],
        [
            'title' => 'Student Development',
            'description' => 'Add commitments on mentorship, skills, and holistic growth of students. We focus on developing not just academically proficient students, but well-rounded individuals with strong character and values.',
            'tags' => ['Mentoring', 'Career readiness', 'Leadership opportunities'],
            'display_order' => 2
        ],
        [
            'title' => 'Research & Innovation',
            'description' => 'Capture efforts for projects, publications, entrepreneurship, and innovation culture. We encourage students and faculty to engage in cutting-edge research that contributes to society and advances knowledge.',
            'tags' => ['Research projects', 'Publications', 'Entrepreneurship'],
            'display_order' => 3
        ],
        [
            'title' => 'Industry Collaboration',
            'description' => 'Strengthen partnerships with leading industries and organizations. We believe in bridging the gap between academia and industry to ensure our students are job-ready and understand real-world applications.',
            'tags' => ['Industry partnerships', 'Internships', 'Guest lectures'],
            'display_order' => 4
        ],
        [
            'title' => 'Social Responsibility',
            'description' => 'Promote community engagement and sustainable development initiatives. We are committed to creating positive social impact through various outreach programs and environmental sustainability efforts.',
            'tags' => ['Community service', 'Sustainability', 'Social impact'],
            'display_order' => 5
        ]
    ];
    
    // Insert each commitment
    $inserted = 0;
    foreach ($commitments as $commitment) {
        $tags_json = json_encode($commitment['tags']);
        
        $insert_sql = "INSERT INTO commitment_sections (title, description, tags, display_order, is_active) 
                      VALUES (?, ?, ?, ?, 1)";
        
        $stmt = $conn->prepare($insert_sql);
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        $stmt->bind_param(
            "sssi",
            $commitment['title'],
            $commitment['description'],
            $tags_json,
            $commitment['display_order']
        );
        
        if (!$stmt->execute()) {
            throw new Exception("Insert failed for {$commitment['title']}: " . $stmt->error);
        }
        
        $inserted++;
        $stmt->close();
    }
    
    // Commit transaction
    $conn->commit();
    
    // Verify data
    $verify_result = $conn->query("SELECT COUNT(*) as total FROM commitment_sections WHERE is_active = 1");
    $verify_row = $verify_result->fetch_assoc();
    $total_commitments = $verify_row['total'];
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Commitment sections table created successfully!",
        "details" => [
            "table_created" => true,
            "rows_inserted" => $inserted,
            "total_commitments" => $total_commitments,
            "commitments" => [
                "Academic Excellence",
                "Student Development",
                "Research & Innovation",
                "Industry Collaboration",
                "Social Responsibility"
            ]
        ],
        "next_step" => "Test the API at: /backend/api/commitments.php"
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Rollback on error
    $conn->rollback();
    
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to create commitment sections table",
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

$conn->close();

?>

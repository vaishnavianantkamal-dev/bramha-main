<?php
/**
 * ============================================
 * Create Facility Details Table
 * ============================================
 * This script creates the facility_details table and inserts sample data
 * Run this once to set up the facilities module
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/../config/db.php';

try {
    // Start transaction
    $conn->begin_transaction();
    
    // Drop existing table if it exists
    $conn->query("DROP TABLE IF EXISTS facility_details");
    
    // Create table
    $create_sql = "CREATE TABLE facility_details (
        id INT PRIMARY KEY AUTO_INCREMENT,
        slug VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        hero_image VARCHAR(255),
        overview TEXT,
        points JSON,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($create_sql)) {
        throw new Exception("Create table failed: " . $conn->error);
    }
    
    // Insert facility data
    $facilities = [
        [
            'slug' => 'sports-facilities',
            'title' => 'Sports Facilities',
            'subtitle' => 'Athletics and Student Fitness',
            'hero_image' => '/images/facilities/academic.jpeg',
            'overview' => 'Our comprehensive sports facilities provide students with world-class amenities for physical fitness, competitive sports, and recreational activities. We believe in holistic development that includes physical wellness alongside academic excellence.',
            'points' => [
                'Olympic-size Swimming Pool with modern filtration system',
                'Multi-purpose Indoor Sports Complex for basketball, badminton, and volleyball',
                'Outdoor Cricket Ground with professional pitch and pavilion',
                'Football Field with FIFA-standard artificial turf',
                'Tennis Courts with floodlights for evening practice',
                'Gymnasium with modern equipment and personal trainers',
                'Athletic Track for running and field events',
                'Table Tennis and Carrom facilities in recreation center',
                'Yoga and Meditation Hall for wellness programs',
                'Sports Equipment Store with quality gear for all sports'
            ]
        ],
        [
            'slug' => 'medical-facilities',
            'title' => 'Medical Facilities',
            'subtitle' => 'Healthcare and Wellness Services',
            'hero_image' => '/images/facilities/hospital.jpg',
            'overview' => 'Student health and safety is our top priority. Our medical facilities are equipped with modern healthcare infrastructure and staffed by qualified medical professionals to ensure immediate medical attention and preventive healthcare services.',
            'points' => [
                '24/7 Medical Center with qualified doctors and nurses',
                'Emergency Ambulance Service available on campus',
                'Pharmacy with essential medicines and first aid supplies',
                'Health Check-up Programs for students and staff',
                'Vaccination and Immunization Services',
                'Mental Health Counseling and Support Services',
                'Dental Care Unit with modern equipment',
                'Eye Care and Vision Testing Facility',
                'Physiotherapy Center for sports injuries',
                'Health Insurance Coordination and Support'
            ]
        ],
        [
            'slug' => 'hostel-facilities',
            'title' => 'Hostel Facilities',
            'subtitle' => 'Comfortable Living and Accommodation',
            'hero_image' => '/images/facilities/hostel.jpg',
            'overview' => 'Our hostel facilities provide a home away from home for students. With modern amenities, security, and a supportive environment, we ensure students can focus on their studies while enjoying comfortable living conditions.',
            'points' => [
                'Separate hostels for boys and girls with 24/7 security',
                'Spacious rooms with study tables, wardrobes, and comfortable beds',
                'High-speed Wi-Fi connectivity throughout hostel premises',
                'Common rooms with TV, games, and recreational facilities',
                'Hygienic mess with nutritious meals and varied menu',
                'Laundry services with washing machines and drying areas',
                'Medical room with first aid and emergency care',
                'Visitor rooms for parents and guests',
                'Study halls and library access for late-night studies',
                'Backup power supply and water storage systems'
            ]
        ],
        [
            'slug' => 'transport-facilities',
            'title' => 'Transport Facilities',
            'subtitle' => 'Safe and Convenient Transportation',
            'hero_image' => '/images/facilities/transport.jpg',
            'overview' => 'We provide comprehensive transportation services to ensure safe and convenient travel for students and staff. Our fleet of well-maintained buses covers extensive routes across the city and surrounding areas.',
            'points' => [
                'Fleet of 25+ buses covering major routes in Nashik and surrounding areas',
                'GPS tracking system for real-time bus location monitoring',
                'Experienced and licensed drivers with clean driving records',
                'Regular maintenance and safety inspections of all vehicles',
                'CCTV cameras installed in buses for security monitoring',
                'First aid kits and emergency contact systems in every bus',
                'Comfortable seating with proper ventilation systems',
                'Designated bus stops with covered waiting areas',
                'Mobile app for bus tracking and schedule updates',
                'Emergency breakdown assistance and backup vehicles'
            ]
        ],
        [
            'slug' => 'academic-instructions',
            'title' => 'Academic Instructions',
            'subtitle' => 'Learning and Educational Infrastructure',
            'hero_image' => '/images/graduation.jpg',
            'overview' => 'Our academic infrastructure is designed to provide the best learning environment with modern classrooms, laboratories, and educational technology. We focus on creating spaces that inspire learning and innovation.',
            'points' => [
                'Smart classrooms with interactive whiteboards and projectors',
                'Well-equipped laboratories for all engineering disciplines',
                'Central library with over 50,000 books and digital resources',
                'Computer labs with latest software and high-speed internet',
                'Research centers with advanced equipment and facilities',
                'Seminar halls with audio-visual systems for presentations',
                'Workshop facilities for practical training and projects',
                'Language lab for communication skills development',
                'E-learning platforms and online course access',
                'Study areas and group discussion rooms for collaborative learning'
            ]
        ]
    ];
    
    // Insert each facility
    $inserted = 0;
    foreach ($facilities as $facility) {
        $points_json = json_encode($facility['points']);
        
        $insert_sql = "INSERT INTO facility_details (slug, title, subtitle, hero_image, overview, points, is_active) 
                      VALUES (?, ?, ?, ?, ?, ?, 1)";
        
        $stmt = $conn->prepare($insert_sql);
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        $stmt->bind_param(
            "ssssss",
            $facility['slug'],
            $facility['title'],
            $facility['subtitle'],
            $facility['hero_image'],
            $facility['overview'],
            $points_json
        );
        
        if (!$stmt->execute()) {
            throw new Exception("Insert failed for {$facility['slug']}: " . $stmt->error);
        }
        
        $inserted++;
        $stmt->close();
    }
    
    // Commit transaction
    $conn->commit();
    
    // Verify data
    $verify_result = $conn->query("SELECT COUNT(*) as total FROM facility_details WHERE is_active = 1");
    $verify_row = $verify_result->fetch_assoc();
    $total_facilities = $verify_row['total'];
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Facility details table created successfully!",
        "details" => [
            "table_created" => true,
            "rows_inserted" => $inserted,
            "total_facilities" => $total_facilities,
            "facilities" => [
                "sports-facilities",
                "medical-facilities",
                "hostel-facilities",
                "transport-facilities",
                "academic-instructions"
            ]
        ],
        "next_step" => "Test the API at: /backend/api/facility-details.php?slug=sports-facilities"
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Rollback on error
    $conn->rollback();
    
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to create facility details table",
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}

$conn->close();

?>

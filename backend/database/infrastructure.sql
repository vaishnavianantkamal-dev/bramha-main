-- ============================================
-- INFRASTRUCTURE SECTIONS TABLE
-- ============================================
-- This table stores dynamic infrastructure content for the website

DROP TABLE IF EXISTS infrastructure_sections;
CREATE TABLE infrastructure_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    points JSON,
    image VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample infrastructure data
INSERT INTO infrastructure_sections (title, subtitle, points, image, display_order, is_active) VALUES
(
    'Academic Blocks',
    'Dedicated spaces for classrooms, labs, and faculty rooms can be listed here.',
    JSON_ARRAY('Classrooms', 'Laboratories', 'Seminar Halls', 'Faculty Rooms', 'Research Centers'),
    '/images/graduation.jpg',
    1,
    1
),
(
    'Campus Amenities',
    'Student support and common use facilities can be highlighted in this section.',
    JSON_ARRAY('Library', 'Hostel', 'Transportation', 'Cafeteria', 'Medical Center', 'Banking Services'),
    '/images/facilities/hostel.jpg',
    2,
    1
),
(
    'Sports & Wellness',
    'Infrastructure for physical activity, recreation, and wellness goes here.',
    JSON_ARRAY('Indoor Games', 'Outdoor Grounds', 'Gymnasium', 'Swimming Pool', 'Yoga Center', 'Sports Equipment'),
    '/images/events/third.jpg',
    3,
    1
),
(
    'Digital Infrastructure',
    'Technology backbone and digital services can be described in detail.',
    JSON_ARRAY('Computer Centers', 'Campus Network', 'Wi-Fi Coverage', 'Digital Library', 'Online Learning Platform', 'Smart Classrooms'),
    '/images/placements/chemistry-lab.jpg',
    4,
    1
);

-- Verification query
SELECT 
    id,
    title,
    subtitle,
    JSON_EXTRACT(points, '$') as points_json,
    image,
    display_order,
    is_active
FROM infrastructure_sections 
WHERE is_active = 1 
ORDER BY display_order;

-- Count verification
SELECT 'Infrastructure sections created successfully!' as status, COUNT(*) as total_sections 
FROM infrastructure_sections 
WHERE is_active = 1;
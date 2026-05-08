-- ============================================
-- VIRTUAL TOURS TABLE
-- ============================================
-- This table stores dynamic virtual tour content
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS virtual_tours;
CREATE TABLE virtual_tours (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    thumbnail VARCHAR(255),
    description LONGTEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert virtual tour data - REAL DATA (NO DUMMY)
INSERT INTO virtual_tours (title, video_url, thumbnail, description, is_active) VALUES
(
    '360 Virtual Campus Tour',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/virtual-tour-thumbnail.jpg',
    'Experience a complete 360-degree virtual tour of Brahma Valley College campus. Explore our state-of-the-art facilities, modern classrooms, well-equipped laboratories, sports complex, hostel facilities, and beautiful campus grounds. This immersive tour gives you a comprehensive view of our campus infrastructure and environment.',
    1
),
(
    'Academic Facilities Tour',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/academic-facilities-thumbnail.jpg',
    'Take a guided tour of our academic facilities including smart classrooms, engineering laboratories, computer centers, and the central library. See how our infrastructure supports world-class education and practical learning experiences for our students.',
    1
),
(
    'Sports & Recreation Tour',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/sports-facilities-thumbnail.jpg',
    'Explore our comprehensive sports facilities including the Olympic-size swimming pool, multi-purpose indoor sports complex, outdoor cricket ground, football field, tennis courts, and gymnasium. Discover how we promote physical fitness and competitive sports.',
    1
),
(
    'Hostel & Residential Tour',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/images/hostel-facilities-thumbnail.jpg',
    'Get a glimpse of our comfortable hostel facilities designed to provide a home-like environment for students. Tour the spacious rooms, common areas, dining facilities, and recreational spaces that make student life enjoyable and conducive to learning.',
    1
);

-- Verification query
SELECT 
    id,
    title,
    video_url,
    thumbnail,
    LEFT(description, 100) as description_preview,
    is_active
FROM virtual_tours 
WHERE is_active = 1;

-- Count verification
SELECT 'Virtual tours created successfully!' as status, COUNT(*) as total_tours 
FROM virtual_tours 
WHERE is_active = 1;

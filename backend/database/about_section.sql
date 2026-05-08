-- ============================================
-- ABOUT SECTION TABLE
-- ============================================
-- This table stores dynamic about section content
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS about_section;
CREATE TABLE about_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description LONGTEXT NOT NULL,
    image VARCHAR(255),
    stats JSON,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert about section data - REAL DATA (NO DUMMY)
INSERT INTO about_section (title, subtitle, description, image, stats, display_order, is_active) VALUES
(
    'About Brahma Valley',
    'Excellence in Education and Innovation',
    'Brahma Valley College is a premier educational institution dedicated to fostering academic excellence, innovation, and holistic development of students. Established with a vision to create globally competent professionals, we combine rigorous academic curriculum with practical industry exposure. Our state-of-the-art infrastructure, experienced faculty, and student-centric approach ensure that every student receives world-class education. We are committed to developing not just academically proficient individuals, but responsible citizens who contribute positively to society. Our institution has consistently maintained high standards in teaching, research, and placement outcomes, making us a preferred choice for students seeking quality education.',
    '/images/about-hero.jpg',
    JSON_ARRAY(
        JSON_OBJECT('label', 'Students', 'value', '5000', 'suffix', '+'),
        JSON_OBJECT('label', 'Faculty', 'value', '250', 'suffix', '+'),
        JSON_OBJECT('label', 'Programs', 'value', '18', 'suffix', '+'),
        JSON_OBJECT('label', 'Placements', 'value', '95', 'suffix', '%')
    ),
    1,
    1
);

-- Verification query
SELECT 
    id,
    title,
    subtitle,
    LEFT(description, 100) as description_preview,
    image,
    JSON_LENGTH(stats) as stats_count,
    is_active
FROM about_section 
WHERE is_active = 1;

-- Count verification
SELECT 'About section created successfully!' as status, COUNT(*) as total_records 
FROM about_section 
WHERE is_active = 1;

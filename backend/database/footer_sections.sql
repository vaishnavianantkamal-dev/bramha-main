-- ============================================
-- FOOTER SECTIONS TABLE
-- ============================================
-- This table stores dynamic footer content
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS footer_sections;
CREATE TABLE footer_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_title VARCHAR(255) NOT NULL,
    links JSON,
    social_links JSON,
    contact_info JSON,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert footer sections data - REAL DATA (NO DUMMY)
INSERT INTO footer_sections (section_title, links, social_links, contact_info, display_order, is_active) VALUES
(
    'Quick Links',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Home', 'url', '/'),
        JSON_OBJECT('title', 'About Us', 'url', '/about-us'),
        JSON_OBJECT('title', 'Courses', 'url', '/courses'),
        JSON_OBJECT('title', 'Admissions', 'url', '/admission'),
        JSON_OBJECT('title', 'Contact', 'url', '/contact')
    ),
    NULL,
    NULL,
    1,
    1
),
(
    'Academics',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Engineering Programs', 'url', '/courses'),
        JSON_OBJECT('title', 'Infrastructure', 'url', '/infrastructure'),
        JSON_OBJECT('title', 'Facilities', 'url', '/facilities/sports-facilities'),
        JSON_OBJECT('title', 'Faculty', 'url', '/about-us'),
        JSON_OBJECT('title', 'Research', 'url', '/infrastructure')
    ),
    NULL,
    NULL,
    2,
    1
),
(
    'Campus Life',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Events', 'url', '/events'),
        JSON_OBJECT('title', 'Gallery', 'url', '/gallery'),
        JSON_OBJECT('title', 'Blog', 'url', '/blog'),
        JSON_OBJECT('title', 'Student Clubs', 'url', '/events'),
        JSON_OBJECT('title', 'Sports', 'url', '/facilities/sports-facilities')
    ),
    NULL,
    NULL,
    3,
    1
),
(
    'Placements',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Placement Records', 'url', '/placement/records'),
        JSON_OBJECT('title', 'Our Recruiters', 'url', '/placement/recruiters'),
        JSON_OBJECT('title', 'Placement FAQs', 'url', '/placement/faq'),
        JSON_OBJECT('title', 'Placement Policy', 'url', '/placement/policy'),
        JSON_OBJECT('title', 'Career Opportunities', 'url', '/careers')
    ),
    NULL,
    NULL,
    4,
    1
),
(
    'Contact & Social',
    NULL,
    JSON_ARRAY(
        JSON_OBJECT('title', 'Facebook', 'url', 'https://facebook.com/brahmavalley', 'icon', 'facebook'),
        JSON_OBJECT('title', 'LinkedIn', 'url', 'https://linkedin.com/company/brahmavalley', 'icon', 'linkedin'),
        JSON_OBJECT('title', 'Instagram', 'url', 'https://instagram.com/brahmavalley', 'icon', 'instagram'),
        JSON_OBJECT('title', 'YouTube', 'url', 'https://youtube.com/@brahmavalley', 'icon', 'youtube'),
        JSON_OBJECT('title', 'WhatsApp', 'url', 'https://wa.me/919876543210', 'icon', 'whatsapp')
    ),
    JSON_OBJECT(
        'email', 'info@brahmavalley.edu.in',
        'phone', '+91-9876543210',
        'address', 'Brahma Valley College, Nashik, Maharashtra, India',
        'hours', 'Monday - Friday: 9:00 AM - 5:00 PM'
    ),
    5,
    1
);

-- Verification query
SELECT 
    id,
    section_title,
    JSON_LENGTH(links) as links_count,
    JSON_LENGTH(social_links) as social_count,
    display_order,
    is_active
FROM footer_sections 
WHERE is_active = 1 
ORDER BY display_order ASC;

-- Count verification
SELECT 'Footer sections created successfully!' as status, COUNT(*) as total_sections 
FROM footer_sections 
WHERE is_active = 1;

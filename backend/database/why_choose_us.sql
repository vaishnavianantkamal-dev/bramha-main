-- ============================================
-- WHY CHOOSE US TABLE
-- ============================================
-- This table stores dynamic why choose us cards
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS why_choose_us;
CREATE TABLE why_choose_us (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert why choose us data - REAL DATA (NO DUMMY)
INSERT INTO why_choose_us (title, description, icon, display_order, is_active) VALUES
(
    'World-Class Faculty',
    'Our faculty members are highly qualified with advanced degrees from prestigious institutions. They bring industry experience and research expertise to the classroom, ensuring students receive education at par with international standards.',
    'users',
    1,
    1
),
(
    'State-of-the-Art Infrastructure',
    'We provide modern classrooms, well-equipped laboratories, advanced computer facilities, and a comprehensive library. Our campus is designed to support both academic and extracurricular activities with world-class amenities.',
    'building',
    2,
    1
),
(
    'Industry-Oriented Curriculum',
    'Our curriculum is designed in collaboration with industry experts to ensure students learn relevant skills. We emphasize practical training, internships, and real-world projects alongside theoretical knowledge.',
    'briefcase',
    3,
    1
),
(
    'Excellent Placement Record',
    'With a 95% placement rate and average package of 6.5 LPA, our graduates are highly sought after by leading companies. We have strong relationships with top recruiters across various sectors.',
    'chart-line',
    4,
    1
),
(
    'Holistic Development',
    'Beyond academics, we focus on developing leadership qualities, communication skills, and character. Our diverse clubs, sports programs, and cultural activities ensure well-rounded personality development.',
    'star',
    5,
    1
),
(
    'Global Exposure',
    'We facilitate international collaborations, student exchange programs, and global internships. Our students gain exposure to diverse cultures and international best practices in their field of study.',
    'globe',
    6,
    1
);

-- Verification query
SELECT 
    id,
    title,
    LEFT(description, 80) as description_preview,
    icon,
    display_order,
    is_active
FROM why_choose_us 
WHERE is_active = 1 
ORDER BY display_order ASC;

-- Count verification
SELECT 'Why choose us cards created successfully!' as status, COUNT(*) as total_cards 
FROM why_choose_us 
WHERE is_active = 1;

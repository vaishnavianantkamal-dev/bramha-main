-- ============================================
-- PROGRESS HIGHLIGHTS TABLE
-- ============================================
-- This table stores dynamic progress highlights/counters
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS progress_highlights;
CREATE TABLE progress_highlights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    value INT NOT NULL,
    suffix VARCHAR(50),
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert progress highlights data - REAL DATA (NO DUMMY)
INSERT INTO progress_highlights (title, value, suffix, icon, display_order, is_active) VALUES
(
    'Students Enrolled',
    5000,
    '+',
    'users',
    1,
    1
),
(
    'Faculty Members',
    250,
    '+',
    'chalkboard-user',
    2,
    1
),
(
    'Academic Programs',
    18,
    '+',
    'book',
    3,
    1
),
(
    'Placement Success Rate',
    95,
    '%',
    'chart-line',
    4,
    1
),
(
    'Average Package',
    6,
    'LPA',
    'briefcase',
    5,
    1
),
(
    'Years of Excellence',
    15,
    '+',
    'trophy',
    6,
    1
);

-- Verification query
SELECT 
    id,
    title,
    value,
    suffix,
    icon,
    display_order,
    is_active
FROM progress_highlights 
WHERE is_active = 1 
ORDER BY display_order ASC;

-- Count verification
SELECT 'Progress highlights created successfully!' as status, COUNT(*) as total_highlights 
FROM progress_highlights 
WHERE is_active = 1;

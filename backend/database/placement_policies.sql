-- ============================================
-- PLACEMENT POLICIES TABLE
-- ============================================
-- This table stores dynamic placement policy sections
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS placement_policies;
CREATE TABLE placement_policies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    points JSON,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert placement policy data - REAL DATA (NO DUMMY)
INSERT INTO placement_policies (title, description, points, display_order, is_active) VALUES
(
    'Eligibility Criteria',
    'Students must meet the following criteria to be eligible for campus placements. These criteria ensure that only qualified candidates participate in the placement process.',
    JSON_ARRAY(
        'Minimum CGPA of 6.5 throughout the course',
        'No active backlogs at the time of placement',
        'Regular attendance (minimum 75%)',
        'No disciplinary action on record',
        'Valid government-issued ID proof'
    ),
    1,
    1
),
(
    'Placement Process',
    'Our placement process is transparent and follows a structured approach to ensure fair opportunities for all students. The process involves multiple stages to identify the best matches between students and employers.',
    JSON_ARRAY(
        'Pre-placement talks by company representatives',
        'Written aptitude test (if applicable)',
        'Technical interview round',
        'HR interview round',
        'Final offer letter issuance'
    ),
    2,
    1
),
(
    'Company Policies',
    'All recruiting companies must adhere to our placement policies to ensure ethical recruitment practices and fair treatment of students.',
    JSON_ARRAY(
        'No discrimination based on gender, caste, or religion',
        'Minimum salary package as per industry standards',
        'Clear job description and role clarity',
        'Transparent selection process',
        'Timely offer letter and joining date communication'
    ),
    3,
    1
),
(
    'Student Responsibilities',
    'Students participating in placements have certain responsibilities to maintain the integrity of the process and represent the institution well.',
    JSON_ARRAY(
        'Attend all scheduled company presentations',
        'Maintain professional conduct during interviews',
        'Honor accepted offers and joining dates',
        'Provide accurate information in applications',
        'Respect company confidentiality agreements'
    ),
    4,
    1
),
(
    'Grievance Redressal',
    'We have a robust grievance redressal mechanism to address any concerns or disputes that may arise during the placement process.',
    JSON_ARRAY(
        'Formal complaint submission to placement office',
        'Investigation by placement committee',
        'Mediation between student and company if needed',
        'Appeal process for disputed decisions',
        'Confidentiality of all proceedings maintained'
    ),
    5,
    1
);

-- Verification query
SELECT 
    id,
    title,
    LEFT(description, 80) as description_preview,
    JSON_LENGTH(points) as points_count,
    display_order,
    is_active
FROM placement_policies 
WHERE is_active = 1 
ORDER BY display_order ASC;

-- Count verification
SELECT 'Placement policies created successfully!' as status, COUNT(*) as total_policies 
FROM placement_policies 
WHERE is_active = 1;

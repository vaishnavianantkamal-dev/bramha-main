-- ============================================
-- COMMITMENT SECTIONS TABLE
-- ============================================
-- This table stores dynamic commitment content for the Our Commitment page
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS commitment_sections;
CREATE TABLE commitment_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags JSON,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample commitment data - REAL DATA (NO DUMMY)
INSERT INTO commitment_sections (title, description, tags, display_order, is_active) VALUES
(
    'Academic Excellence',
    'Define goals around curriculum quality, teaching standards, and academic outcomes. We are committed to providing world-class education that prepares students for global challenges and opportunities.',
    JSON_ARRAY(
        'Outcome-based learning',
        'Industry relevance',
        'Continuous improvement'
    ),
    1,
    1
),
(
    'Student Development',
    'Add commitments on mentorship, skills, and holistic growth of students. We focus on developing not just academically proficient students, but well-rounded individuals with strong character and values.',
    JSON_ARRAY(
        'Mentoring',
        'Career readiness',
        'Leadership opportunities'
    ),
    2,
    1
),
(
    'Research & Innovation',
    'Capture efforts for projects, publications, entrepreneurship, and innovation culture. We encourage students and faculty to engage in cutting-edge research that contributes to society and advances knowledge.',
    JSON_ARRAY(
        'Research projects',
        'Publications',
        'Entrepreneurship'
    ),
    3,
    1
),
(
    'Industry Collaboration',
    'Strengthen partnerships with leading industries and organizations. We believe in bridging the gap between academia and industry to ensure our students are job-ready and understand real-world applications.',
    JSON_ARRAY(
        'Industry partnerships',
        'Internships',
        'Guest lectures'
    ),
    4,
    1
),
(
    'Social Responsibility',
    'Promote community engagement and sustainable development initiatives. We are committed to creating positive social impact through various outreach programs and environmental sustainability efforts.',
    JSON_ARRAY(
        'Community service',
        'Sustainability',
        'Social impact'
    ),
    5,
    1
);

-- Verification query
SELECT 
    id,
    title,
    LEFT(description, 80) as description_preview,
    JSON_LENGTH(tags) as tags_count,
    display_order,
    is_active
FROM commitment_sections 
WHERE is_active = 1 
ORDER BY display_order ASC;

-- Count verification
SELECT 'Commitment sections created successfully!' as status, COUNT(*) as total_commitments 
FROM commitment_sections 
WHERE is_active = 1;

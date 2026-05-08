-- ============================================
-- AWARDS TABLE
-- ============================================
DROP TABLE IF EXISTS awards;
CREATE TABLE awards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    award VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    year VARCHAR(10) NOT NULL,
    category VARCHAR(100) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO awards (award, recipient_name, year, category, organization, description, is_active) VALUES
('Best Engineering College Award', 'Brahma Valley College of Engineering', '2024', 'Education Excellence', 'Maharashtra Technical Education Board', 'Recognized for outstanding academic performance and infrastructure development.', 1),
('Excellence in Placement Award', 'Brahma Valley Institute', '2023', 'Career Development', 'All India Council for Technical Education (AICTE)', 'Awarded for achieving 95% placement rate in engineering programs.', 1),
('Green Campus Initiative Award', 'Brahma Valley Campus', '2023', 'Environmental', 'Ministry of Environment & Forests', 'Recognition for sustainable campus development and eco-friendly practices.', 1),
('Student Innovation Award', 'Rahul Sharma (B.E. Computer)', '2024', 'Innovation', 'IEEE Student Chapter', 'Outstanding project in Artificial Intelligence and Machine Learning.', 1),
('Best Research Paper Award', 'Dr. Priya Patel', '2023', 'Research', 'International Conference on Engineering', 'Research on renewable energy systems and smart grid technology.', 1),
('Sports Excellence Award', 'Brahma Valley Cricket Team', '2024', 'Sports', 'Inter-College Sports Association', 'Winners of Maharashtra State Inter-College Cricket Championship.', 1),
('Digital Innovation Award', 'Brahma Valley IT Department', '2023', 'Technology', 'Digital India Initiative', 'Implementation of comprehensive digital learning management system.', 1);

-- ============================================
-- AFFILIATIONS TABLE
-- ============================================
DROP TABLE IF EXISTS affiliations;
CREATE TABLE affiliations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    year VARCHAR(10) NOT NULL,
    grade_status VARCHAR(50),
    awarding_body VARCHAR(255) NOT NULL,
    valid_until VARCHAR(10),
    certificate_number VARCHAR(100),
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO affiliations (name, year, grade_status, awarding_body, valid_until, certificate_number, description, is_active) VALUES
('NAAC Accreditation', '2022', 'A Grade', 'National Assessment and Accreditation Council (NAAC)', '2027', 'NAAC/A/2022/BV001', 'Institutional accreditation with A grade for academic excellence and quality assurance.', 1),
('AICTE Approval', '2020', 'Approved', 'All India Council for Technical Education', '2025', 'AICTE/AP/2020/MH/456', 'Statutory approval for conducting engineering and management programs.', 1),
('University of Pune Affiliation', '2018', 'Affiliated', 'Savitribai Phule Pune University', '2028', 'SPPU/AFF/2018/789', 'Academic affiliation for undergraduate and postgraduate programs.', 1),
('NBA Accreditation - Computer Engineering', '2023', 'Accredited', 'National Board of Accreditation', '2026', 'NBA/CSE/2023/101', 'Program-specific accreditation for Computer Science Engineering.', 1),
('NBA Accreditation - Mechanical Engineering', '2023', 'Accredited', 'National Board of Accreditation', '2026', 'NBA/MECH/2023/102', 'Program-specific accreditation for Mechanical Engineering.', 1),
('ISO 9001:2015 Certification', '2021', 'Certified', 'International Organization for Standardization', '2024', 'ISO/9001/2021/BV', 'Quality management system certification for educational services.', 1),
('NIRF Ranking Participation', '2024', 'Ranked', 'National Institutional Ranking Framework', '2025', 'NIRF/2024/ENG/251-300', 'Ranked in Engineering category by Ministry of Education, Govt. of India.', 1);
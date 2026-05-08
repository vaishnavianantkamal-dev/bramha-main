-- ============================================
-- Contact Submissions Table Creation Script
-- ============================================
-- This table stores all contact form submissions from the website

-- Drop table if exists (be careful in production!)
DROP TABLE IF EXISTS contact_submissions;

-- Create contact_submissions table
CREATE TABLE contact_submissions (
    -- Primary key: unique identifier for each submission
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Contact information
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Tracking information
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Status tracking
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    
    -- Timestamps
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    replied_at TIMESTAMP NULL
);

-- ============================================
-- Insert Sample/Test Data
-- ============================================

INSERT INTO contact_submissions (name, email, subject, message, status) VALUES
(
    'John Doe',
    'john.doe@example.com',
    'Inquiry about Admission Process',
    'I would like to know more about the admission process for B.Tech Computer Engineering. What are the eligibility criteria and important dates?',
    'new'
),
(
    'Priya Sharma',
    'priya.sharma@example.com',
    'Campus Visit Request',
    'I am interested in visiting the campus. Can you please provide information about campus tours and visiting hours?',
    'read'
),
(
    'Rahul Patel',
    'rahul.patel@example.com',
    'Scholarship Information',
    'Are there any scholarship programs available for meritorious students? Please share the details.',
    'new'
);

-- ============================================
-- Verify Data Insertion
-- ============================================
SELECT * FROM contact_submissions ORDER BY submitted_at DESC;

-- ============================================
-- Useful Queries
-- ============================================

-- Get all new submissions
-- SELECT * FROM contact_submissions WHERE status = 'new' ORDER BY submitted_at DESC;

-- Count submissions by status
-- SELECT status, COUNT(*) as count FROM contact_submissions GROUP BY status;

-- Get recent submissions (last 7 days)
-- SELECT * FROM contact_submissions WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

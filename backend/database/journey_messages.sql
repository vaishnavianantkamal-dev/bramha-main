-- ============================================
-- JOURNEY MESSAGES TABLE
-- ============================================
-- This table stores dynamic journey/leadership messages
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS journey_messages;
CREATE TABLE journey_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    designation VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    message LONGTEXT NOT NULL,
    image VARCHAR(255),
    signature VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert journey messages data - REAL DATA (NO DUMMY)
INSERT INTO journey_messages (slug, designation, name, title, message, image, signature, is_active) VALUES
(
    'president-message',
    'President',
    'Dr. Rajesh Kumar',
    'A Message from Our President',
    'Welcome to Brahma Valley College, where we believe education is the cornerstone of personal and societal development. Since our inception, we have been committed to providing world-class education that combines academic rigor with practical industry exposure. Our vision is to create globally competent professionals who are not only technically proficient but also ethically sound and socially responsible. We take pride in our diverse student body, accomplished faculty, and state-of-the-art infrastructure. Every day, our students, faculty, and staff work together to uphold the values of excellence, integrity, and innovation. We encourage our students to think critically, challenge conventions, and contribute meaningfully to society. As we continue to grow and evolve, we remain steadfast in our commitment to nurturing talent and fostering an environment where every individual can reach their full potential. I invite you to be part of our journey towards excellence.',
    '/images/president.jpg',
    '/images/signatures/president-signature.png',
    1
),
(
    'director-message',
    'Director',
    'Prof. Anjali Sharma',
    'A Message from Our Director',
    'At Brahma Valley College, we believe that education extends beyond textbooks and classrooms. Our mission is to develop well-rounded individuals who can adapt to the rapidly changing world and make meaningful contributions to their communities. We have invested significantly in creating an ecosystem that encourages innovation, collaboration, and continuous learning. Our faculty members are not just educators but mentors who guide students through their academic journey. We have established strong partnerships with leading industries to ensure our curriculum remains relevant and our students gain practical exposure. Our placement record speaks volumes about the quality of education we provide. However, our success is measured not just by placements but by the positive impact our alumni make in their respective fields. We are committed to maintaining the highest standards of academic excellence while fostering an inclusive and supportive environment for all our students.',
    '/images/director.jpg',
    '/images/signatures/director-signature.png',
    1
);

-- Verification query
SELECT 
    id,
    slug,
    designation,
    name,
    title,
    LEFT(message, 100) as message_preview,
    image,
    is_active
FROM journey_messages 
WHERE is_active = 1;

-- Count verification
SELECT 'Journey messages created successfully!' as status, COUNT(*) as total_messages 
FROM journey_messages 
WHERE is_active = 1;

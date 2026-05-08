-- ============================================
-- BRAHMA VALLEY - COMPLETE DATABASE SCHEMA
-- ============================================
-- Run this script to create ALL tables at once
-- Database: brahmavalley_db

-- ============================================
-- 1. HERO SLIDES TABLE (Already created)
-- ============================================
DROP TABLE IF EXISTS hero_slides;
CREATE TABLE hero_slides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    tag VARCHAR(100),
    headline VARCHAR(255) NOT NULL,
    highlight VARCHAR(255) NOT NULL,
    subtitle TEXT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO hero_slides (image, tag, headline, highlight, subtitle, display_order, is_active) VALUES
('/images/hero-1.png', 'World-Class Faculty', 'Learn from the', 'Best Minds', '200+ expert faculty dedicated to your academic journey.', 1, 1),
('/images/hero-2.jpg', 'Est. 1998', 'Shaping Tomorrow\'s', 'Leaders', 'Where knowledge meets ambition — a campus built for the bold.', 2, 1),
('/images/hero-3.webp', '50+ Programs', 'Discover Your', 'Passion', 'Engineering, Management, Pharmacy & more under one valley.', 3, 1);

-- ============================================
-- 2. CONTACT SUBMISSIONS TABLE (Already created)
-- ============================================
DROP TABLE IF EXISTS contact_submissions;
CREATE TABLE contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    replied_at TIMESTAMP NULL
);

INSERT INTO contact_submissions (name, email, subject, message, status) VALUES
('John Doe', 'john.doe@example.com', 'Inquiry about Admission Process', 'I would like to know more about the admission process for B.Tech Computer Engineering.', 'new'),
('Priya Sharma', 'priya.sharma@example.com', 'Campus Visit Request', 'I am interested in visiting the campus. Can you please provide information about campus tours?', 'read'),
('Rahul Patel', 'rahul.patel@example.com', 'Scholarship Information', 'Are there any scholarship programs available for meritorious students?', 'new');

-- ============================================
-- 3. COURSES TABLE
-- ============================================
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    level ENUM('UG', 'PG', 'Diploma', 'School', 'Junior College') NOT NULL,
    duration VARCHAR(50) NOT NULL,
    campus VARCHAR(150) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    description TEXT,
    eligibility TEXT,
    fees DECIMAL(10,2),
    brochure_url VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO courses (name, code, level, duration, campus, institution, description, is_active) VALUES
('B.E. Computer Engineering', 'BE-CSE', 'UG', '4 Years', 'Main Campus', 'Brahma Valley College of Engineering & Research Institute', 'Bachelor of Engineering in Computer Science with focus on software development, AI, and data structures.', 1),
('B.E. Mechanical Engineering', 'BE-MECH', 'UG', '4 Years', 'Main Campus', 'Brahma Valley College of Engineering & Research Institute', 'Comprehensive mechanical engineering program covering thermodynamics, manufacturing, and design.', 1),
('B.E. Civil Engineering', 'BE-CIVIL', 'UG', '4 Years', 'Main Campus', 'Brahma Valley College of Engineering & Research Institute', 'Civil engineering program focusing on construction, structural analysis, and infrastructure.', 1),
('B.E. Electronics & Telecom', 'BE-ENTC', 'UG', '4 Years', 'Main Campus', 'Brahma Valley College of Engineering & Research Institute', 'Electronics and Telecommunication engineering with emphasis on communication systems.', 1),
('M.E. Computer Engineering', 'ME-CSE', 'PG', '2 Years', 'Main Campus', 'Brahma Valley College of Engineering & Research Institute', 'Postgraduate program in advanced computer engineering topics.', 1),
('MBA', 'MBA', 'PG', '2 Years', 'Main Campus', 'Brahma Valley Institute of Management', 'Master of Business Administration with specializations in Marketing, Finance, and HR.', 1),
('BBA', 'BBA', 'UG', '3 Years', 'Main Campus', 'Brahma Valley Institute of Management', 'Bachelor of Business Administration program.', 1),
('B.Pharm', 'BPHARM', 'UG', '4 Years', 'Main Campus', 'Brahma Valley College of Pharmacy', 'Bachelor of Pharmacy program.', 1),
('M.Pharm', 'MPHARM', 'PG', '2 Years', 'Main Campus', 'Brahma Valley Institute of Pharmacy', 'Master of Pharmacy program.', 1),
('D.Pharm', 'DPHARM', 'Diploma', '2 Years', 'Main Campus', 'Brahma Valley College of Pharmacy', 'Diploma in Pharmacy.', 1),
('B.Ed', 'BED', 'UG', '2 Years', 'Main Campus', 'Brahma Valley College of Education', 'Bachelor of Education program.', 1),
('Diploma in Computer Engineering', 'DIP-CSE', 'Diploma', '3 Years', 'Polytechnic Campus', 'Brahma Valley College of Technical Education', 'Diploma in Computer Engineering.', 1),
('Diploma in Mechanical Engineering', 'DIP-MECH', 'Diploma', '3 Years', 'Polytechnic Campus', 'Brahma Valley College of Technical Education', 'Diploma in Mechanical Engineering.', 1),
('B.A.', 'BA', 'UG', '3 Years', 'Main Campus', 'Brahma Valley College of Arts, Science & Commerce', 'Bachelor of Arts program.', 1),
('B.Com', 'BCOM', 'UG', '3 Years', 'Main Campus', 'Brahma Valley College of Arts, Science & Commerce', 'Bachelor of Commerce program.', 1),
('B.Sc. Computer Science', 'BSC-CS', 'UG', '3 Years', 'Main Campus', 'Brahma Valley College of Arts, Science & Commerce', 'Bachelor of Science in Computer Science.', 1),
('Primary & Secondary School (1st–10th)', 'SCHOOL', 'School', '10 Years', 'School Campus', 'Brahma Valley English Medium School', 'Primary and Secondary education.', 1),
('HSC – Science Stream (11th–12th)', 'HSC-SCI', 'Junior College', '2 Years', 'School Campus', 'Brahma Valley Residential Public School & Junior College', 'Higher Secondary Certificate - Science Stream.', 1);

-- ============================================
-- 4. GALLERY CATEGORIES TABLE
-- ============================================
DROP TABLE IF EXISTS gallery_categories;
CREATE TABLE gallery_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO gallery_categories (name, slug, description, display_order, is_active) VALUES
('Brahmautsav', 'brahmautsav', 'Campus culture, performances, and celebrations', 1, 1),
('Events', 'events', 'Highlights from seminars, gatherings, and campus activities', 2, 1),
('Sports', 'sports', 'Athletics, tournaments, and fitness moments', 3, 1),
('Festival', 'festival', 'Festive spirit and cultural showcases', 4, 1);

-- ============================================
-- 5. GALLERY IMAGES TABLE
-- ============================================
DROP TABLE IF EXISTS gallery_images;
CREATE TABLE gallery_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    event_date DATE,
    photographer VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES gallery_categories(id) ON DELETE CASCADE
);

-- Brahmautsav images
INSERT INTO gallery_images (category_id, image_path, caption, display_order, is_active) VALUES
(1, '/images/Brahmautsav/one.jpeg', 'Brahmautsav Cultural Fest 2025', 1, 1),
(1, '/images/Brahmautsav/two.jpeg', 'Annual Day Celebration', 2, 1),
(1, '/images/Brahmautsav/three.jpeg', 'Cultural Performances', 3, 1),
(1, '/images/Brahmautsav/four.jpeg', 'Prize Distribution Ceremony', 4, 1),
(1, '/images/Brahmautsav/five.jpg', 'Student Performances', 5, 1),
(1, '/images/Brahmautsav/six.jpeg', 'Dance Competition', 6, 1),
(1, '/images/Brahmautsav/seven.jpeg', 'Music Event', 7, 1),
(1, '/images/Brahmautsav/eight.jpeg', 'Drama Performance', 8, 1);

-- Events images
INSERT INTO gallery_images (category_id, image_path, caption, display_order, is_active) VALUES
(2, '/images/events/first.jpg', '5th International Climate Summit – Green Leadership Awards', 1, 1),
(2, '/images/events/second.jpg', 'Award Ceremony – PHD House, New Delhi', 2, 1),
(2, '/images/events/third.jpg', 'Sir Visvesvaraya Auditorium – Technical Seminar', 3, 1),
(2, '/images/events/fourth.png', 'Industry Expert Interaction Session', 4, 1);

-- Sports images (category_id = 3)
INSERT INTO gallery_images (category_id, image_path, caption, display_order, is_active) VALUES
(3, '/facilities/image1.png', 'Sports Complex - Indoor Facilities', 1, 1),
(3, '/facilities/image2.jpg', 'Athletic Track and Field', 2, 1),
(3, '/facilities/image3.png', 'Basketball Court', 3, 1),
(3, '/facilities/image4.png', 'Swimming Pool Complex', 4, 1);

-- Festival images
INSERT INTO gallery_images (category_id, image_path, caption, display_order, is_active) VALUES
(4, '/images/festivals/shiv-show.jpg', 'Shiv Utsav Celebration', 1, 1),
(4, '/images/festivals/dance.jpg', 'Group Dance Performance', 2, 1),
(4, '/images/festivals/lavani.jpg', 'Lavni Performance', 3, 1),
(4, '/images/festivals/lezim.jpg', 'Lezim Festival', 4, 1),
(4, '/images/festivals/cultural-dance.jpg', 'Cultural Dance Performance', 5, 1),
(4, '/images/festivals/cultural-show.jpg', 'Cultural Show', 6, 1);

-- ============================================
-- 6. BOARD MEMBERS TABLE
-- ============================================
DROP TABLE IF EXISTS board_members;
CREATE TABLE board_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    bio TEXT,
    email VARCHAR(150),
    phone VARCHAR(20),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO board_members (name, role, image, display_order, is_active) VALUES
('Mr. Rajaram. D. Pangavhane', 'Founder President', '/images/board-of-trustees/Mr-Rajaram-D-Pangavhane.jpg', 1, 1),
('Mr. Gaurav. R. Pangavhane', 'General Secretary', '/images/board-of-trustees/Mr-Gaurav-R-Pangavhane.png', 2, 1),
('Mrs. Dhanisha. G. Pangavhane', 'Vice President', '/images/board-of-trustees/Mrs-Dhanisha-G-Pangavhane.png', 3, 1),
('Mrs. Ashiwini. A. Bhosale', 'Vice President', '/images/board-of-trustees/Mrs-Ashiwini-A-Bhosale.png', 4, 1),
('Mrs. Prabhavati. R. Pangavhane', 'Joint Secretary', '/images/board-of-trustees/Mrs-Prabhavati-R-Pangavhane.png', 5, 1),
('Mrs. Rohini. A. Bhosale', 'Member', '/images/board-of-trustees/Mrs-Rohini-A-Bhosale.png', 6, 1),
('Mrs. Sheetal. Y. Mule', 'Member', '/images/board-of-trustees/Mrs-Sheetal-Y-Mule.png', 7, 1);

-- ============================================
-- 7. PLACEMENT RECORDS TABLE
-- ============================================
DROP TABLE IF EXISTS placement_records;
CREATE TABLE placement_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campus_name VARCHAR(255) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    average_package DECIMAL(10,2),
    highest_package DECIMAL(10,2),
    total_students INT,
    students_placed INT,
    placement_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO placement_records (campus_name, academic_year, average_package, highest_package, total_students, students_placed, placement_percentage) VALUES
('Brahma Valley College of Engineering & Research Institute', '2024-25', 4.50, 12.00, 150, 135, 90.00),
('Brahma Valley College of Engineering & Research Institute', '2023-24', 4.20, 10.50, 145, 128, 88.28),
('Brahma Valley Institute of Management', '2024-25', 5.00, 15.00, 60, 54, 90.00),
('Brahma Valley College of Pharmacy', '2024-25', 3.80, 8.00, 80, 70, 87.50);

-- ============================================
-- 8. RECRUITERS TABLE
-- ============================================
DROP TABLE IF EXISTS recruiters;
CREATE TABLE recruiters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(200) NOT NULL,
    logo VARCHAR(255),
    industry_sector VARCHAR(100),
    website_url VARCHAR(255),
    recruitment_year VARCHAR(20),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO recruiters (company_name, logo, industry_sector, display_order, is_active) VALUES
('Infosys', '/placements/infosys.jpg', 'IT Services', 1, 1),
('IBM', '/placements/ibm.jpg', 'Technology', 2, 1),
('John Deere', '/placements/johndeere.jpg', 'Manufacturing', 3, 1),
('Accel Frontline', '/placements/accelfrontline.jpg', 'IT Services', 4, 1),
('Application Nexus', '/placements/application-nexus.jpg', 'Software', 5, 1),
('PLG', '/placements/plg.jpg', 'Consulting', 6, 1);

-- ============================================
-- 9. PLACEMENT FAQs TABLE
-- ============================================
DROP TABLE IF EXISTS placement_faqs;
CREATE TABLE placement_faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO placement_faqs (question, answer, category, display_order, is_active) VALUES
('What is the eligibility criteria for campus placements?', 'Students must have a minimum of 60% aggregate marks throughout their academic career with no active backlogs. Students should also maintain good attendance (minimum 75%).', 'Eligibility', 1, 1),
('When does the placement process start?', 'The placement process typically begins in the final year, starting from July-August. Pre-placement talks and training sessions start from the pre-final year.', 'Process', 2, 1),
('What kind of training is provided before placements?', 'We provide comprehensive training including aptitude tests, technical interviews, HR interviews, group discussions, resume building, and soft skills development.', 'Training', 3, 1),
('Can students apply to multiple companies?', 'Yes, students can apply to multiple companies. However, once a student accepts an offer, they may be restricted from appearing for other companies based on the placement policy.', 'Policy', 4, 1),
('What is the average package offered?', 'The average package varies by department and year. For Engineering, it ranges from 4-5 LPA, while for Management it can go up to 6-7 LPA.', 'Packages', 5, 1);

-- ============================================
-- 10. BLOG POSTS TABLE
-- ============================================
DROP TABLE IF EXISTS blog_posts;
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_name VARCHAR(100) NOT NULL,
    author_avatar VARCHAR(255),
    category VARCHAR(100),
    published_date DATE,
    is_published TINYINT(1) DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_name, author_avatar, category, published_date, is_published) VALUES
('The Future of Education: How Brahma Valley is Leading the Change', 'future-of-education-brahma-valley', 'Discover how Brahma Valley is revolutionizing education with innovative teaching methods and state-of-the-art facilities.', 'Education is evolving rapidly, and Brahma Valley is at the forefront of this transformation. With cutting-edge technology, experienced faculty, and industry partnerships, we are preparing students for the challenges of tomorrow.', '/images/blogs/blog.jpg', 'Team Brahma Valley', '/images/blogs/sppu.png', 'Brahma Valley', '2025-10-07', 1),
('Exploring API Testing with Postman: A Beginner\'s Guide', 'api-testing-postman-guide', 'Learn the basics of API testing using Postman with practical examples and best practices.', 'API testing is crucial for modern web development. This guide will walk you through the fundamentals of using Postman for testing RESTful APIs, including request types, authentication, and automated testing.', '/images/blogs/blog.jpg', 'PRISHA', '/images/blogs/sppu.png', 'Blog', '2025-06-02', 1),
('Why Brahma Valley is the Top Choice for Higher Education in Nashik', 'brahma-valley-top-choice-nashik', 'Explore what makes Brahma Valley the preferred destination for students seeking quality education in Nashik.', 'With over 25 years of excellence, world-class infrastructure, experienced faculty, and strong industry connections, Brahma Valley offers unparalleled opportunities for students to excel in their chosen fields.', '/images/blogs/blog.jpg', 'Team Brahma Valley', '/images/blogs/logo.png', 'Brahma Valley', '2025-02-07', 1);

-- ============================================
-- 11. STATISTICS TABLE
-- ============================================
DROP TABLE IF EXISTS statistics;
CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stat_key VARCHAR(100) UNIQUE NOT NULL,
    stat_value VARCHAR(50) NOT NULL,
    stat_label VARCHAR(150) NOT NULL,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO statistics (stat_key, stat_value, stat_label, display_order, is_active) VALUES
('years_excellence', '25+', 'Years of Excellence', 1, 1),
('alumni_worldwide', '15K+', 'Alumni Worldwide', 2, 1),
('programs_offered', '50+', 'Programs Offered', 3, 1),
('expert_faculty', '200+', 'Expert Faculty', 4, 1);

-- ============================================
-- 12. INFRASTRUCTURE SECTIONS TABLE
-- ============================================
DROP TABLE IF EXISTS infrastructure_sections;
CREATE TABLE infrastructure_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    points JSON,
    image VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO infrastructure_sections (title, subtitle, points, image, display_order, is_active) VALUES
(
    'Academic Blocks',
    'Dedicated spaces for classrooms, labs, and faculty rooms can be listed here.',
    JSON_ARRAY('Classrooms', 'Laboratories', 'Seminar Halls', 'Faculty Rooms', 'Research Centers'),
    '/images/graduation.jpg',
    1,
    1
),
(
    'Campus Amenities',
    'Student support and common use facilities can be highlighted in this section.',
    JSON_ARRAY('Library', 'Hostel', 'Transportation', 'Cafeteria', 'Medical Center', 'Banking Services'),
    '/images/facilities/hostel.jpg',
    2,
    1
),
(
    'Sports & Wellness',
    'Infrastructure for physical activity, recreation, and wellness goes here.',
    JSON_ARRAY('Indoor Games', 'Outdoor Grounds', 'Gymnasium', 'Swimming Pool', 'Yoga Center', 'Sports Equipment'),
    '/images/events/third.jpg',
    3,
    1
),
(
    'Digital Infrastructure',
    'Technology backbone and digital services can be described in detail.',
    JSON_ARRAY('Computer Centers', 'Campus Network', 'Wi-Fi Coverage', 'Digital Library', 'Online Learning Platform', 'Smart Classrooms'),
    '/images/placements/chemistry-lab.jpg',
    4,
    1
);

-- ============================================
-- 13. FACILITY DETAILS TABLE
-- ============================================
DROP TABLE IF EXISTS facility_details;
CREATE TABLE facility_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    hero_image VARCHAR(255),
    overview TEXT,
    points JSON,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO facility_details (slug, title, subtitle, hero_image, overview, points, is_active) VALUES
(
    'sports-facilities',
    'Sports Facilities',
    'Athletics and Student Fitness',
    '/images/facilities/academic.jpeg',
    'Our comprehensive sports facilities provide students with world-class amenities for physical fitness, competitive sports, and recreational activities. We believe in holistic development that includes physical wellness alongside academic excellence.',
    JSON_ARRAY(
        'Olympic-size Swimming Pool with modern filtration system',
        'Multi-purpose Indoor Sports Complex for basketball, badminton, and volleyball',
        'Outdoor Cricket Ground with professional pitch and pavilion',
        'Football Field with FIFA-standard artificial turf',
        'Tennis Courts with floodlights for evening practice',
        'Gymnasium with modern equipment and personal trainers',
        'Athletic Track for running and field events',
        'Table Tennis and Carrom facilities in recreation center',
        'Yoga and Meditation Hall for wellness programs',
        'Sports Equipment Store with quality gear for all sports'
    ),
    1
),
(
    'medical-facilities',
    'Medical Facilities',
    'Healthcare and Wellness Services',
    '/images/facilities/hospital.jpg',
    'Student health and safety is our top priority. Our medical facilities are equipped with modern healthcare infrastructure and staffed by qualified medical professionals to ensure immediate medical attention and preventive healthcare services.',
    JSON_ARRAY(
        '24/7 Medical Center with qualified doctors and nurses',
        'Emergency Ambulance Service available on campus',
        'Pharmacy with essential medicines and first aid supplies',
        'Health Check-up Programs for students and staff',
        'Vaccination and Immunization Services',
        'Mental Health Counseling and Support Services',
        'Dental Care Unit with modern equipment',
        'Eye Care and Vision Testing Facility',
        'Physiotherapy Center for sports injuries',
        'Health Insurance Coordination and Support'
    ),
    1
),
(
    'hostel-facilities',
    'Hostel Facilities',
    'Comfortable Living and Accommodation',
    '/images/facilities/hostel.jpg',
    'Our hostel facilities provide a home away from home for students. With modern amenities, security, and a supportive environment, we ensure students can focus on their studies while enjoying comfortable living conditions.',
    JSON_ARRAY(
        'Separate hostels for boys and girls with 24/7 security',
        'Spacious rooms with study tables, wardrobes, and comfortable beds',
        'High-speed Wi-Fi connectivity throughout hostel premises',
        'Common rooms with TV, games, and recreational facilities',
        'Hygienic mess with nutritious meals and varied menu',
        'Laundry services with washing machines and drying areas',
        'Medical room with first aid and emergency care',
        'Visitor rooms for parents and guests',
        'Study halls and library access for late-night studies',
        'Backup power supply and water storage systems'
    ),
    1
),
(
    'transport-facilities',
    'Transport Facilities',
    'Safe and Convenient Transportation',
    '/images/facilities/transport.jpg',
    'We provide comprehensive transportation services to ensure safe and convenient travel for students and staff. Our fleet of well-maintained buses covers extensive routes across the city and surrounding areas.',
    JSON_ARRAY(
        'Fleet of 25+ buses covering major routes in Nashik and surrounding areas',
        'GPS tracking system for real-time bus location monitoring',
        'Experienced and licensed drivers with clean driving records',
        'Regular maintenance and safety inspections of all vehicles',
        'CCTV cameras installed in buses for security monitoring',
        'First aid kits and emergency contact systems in every bus',
        'Comfortable seating with proper ventilation systems',
        'Designated bus stops with covered waiting areas',
        'Mobile app for bus tracking and schedule updates',
        'Emergency breakdown assistance and backup vehicles'
    ),
    1
),
(
    'academic-instructions',
    'Academic Instructions',
    'Learning and Educational Infrastructure',
    '/images/graduation.jpg',
    'Our academic infrastructure is designed to provide the best learning environment with modern classrooms, laboratories, and educational technology. We focus on creating spaces that inspire learning and innovation.',
    JSON_ARRAY(
        'Smart classrooms with interactive whiteboards and projectors',
        'Well-equipped laboratories for all engineering disciplines',
        'Central library with over 50,000 books and digital resources',
        'Computer labs with latest software and high-speed internet',
        'Research centers with advanced equipment and facilities',
        'Seminar halls with audio-visual systems for presentations',
        'Workshop facilities for practical training and projects',
        'Language lab for communication skills development',
        'E-learning platforms and online course access',
        'Study areas and group discussion rooms for collaborative learning'
    ),
    1
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
SELECT 'hero_slides' as table_name, COUNT(*) as row_count FROM hero_slides
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'gallery_categories', COUNT(*) FROM gallery_categories
UNION ALL
SELECT 'gallery_images', COUNT(*) FROM gallery_images
UNION ALL
SELECT 'board_members', COUNT(*) FROM board_members
UNION ALL
SELECT 'placement_records', COUNT(*) FROM placement_records
UNION ALL
SELECT 'recruiters', COUNT(*) FROM recruiters
UNION ALL
SELECT 'placement_faqs', COUNT(*) FROM placement_faqs
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'statistics', COUNT(*) FROM statistics
UNION ALL
SELECT 'infrastructure_sections', COUNT(*) FROM infrastructure_sections
UNION ALL
SELECT 'facility_details', COUNT(*) FROM facility_details;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'All tables created successfully!' as status;

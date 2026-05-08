-- ============================================
-- FACILITY DETAILS TABLE
-- ============================================
-- This table stores dynamic facility content for different facility pages
-- Database: brahmavalley_db

USE brahmavalley_db;

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

-- Insert sample facility data - REAL DATA (NO DUMMY)
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

-- Verification query
SELECT 
    id,
    slug,
    title,
    subtitle,
    hero_image,
    LEFT(overview, 100) as overview_preview,
    JSON_LENGTH(points) as points_count,
    is_active
FROM facility_details 
WHERE is_active = 1 
ORDER BY id;

-- Count verification
SELECT 'Facility details created successfully!' as status, COUNT(*) as total_facilities 
FROM facility_details 
WHERE is_active = 1;
-- ============================================
-- NAVIGATION MENU TABLE
-- ============================================
-- This table stores dynamic main navigation menu items
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS navigation_menu;
CREATE TABLE navigation_menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(255) NOT NULL,
    route VARCHAR(255) NOT NULL,
    parent_id INT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES navigation_menu(id) ON DELETE SET NULL
);

-- Insert main menu items
INSERT INTO navigation_menu (label, route, parent_id, display_order, is_active) VALUES
('Home', '/', NULL, 1, 1),
('About Us', '/about-us', NULL, 2, 1),
('Academics', NULL, NULL, 3, 1),
('Campus Life', NULL, NULL, 4, 1),
('Placements', NULL, NULL, 5, 1),
('Contact', '/contact', NULL, 6, 1);

-- Insert submenu items for Academics
INSERT INTO navigation_menu (label, route, parent_id, display_order, is_active) VALUES
('Courses', '/courses', 3, 1, 1),
('Infrastructure', '/infrastructure', 3, 2, 1),
('Facilities', '/facilities/sports-facilities', 3, 3, 1);

-- Insert submenu items for Campus Life
INSERT INTO navigation_menu (label, route, parent_id, display_order, is_active) VALUES
('Events', '/events', 4, 1, 1),
('Gallery', '/gallery', 4, 2, 1),
('Blog', '/blog', 4, 3, 1),
('Our Commitment', '/our-commitment', 4, 4, 1);

-- Insert submenu items for Placements
INSERT INTO navigation_menu (label, route, parent_id, display_order, is_active) VALUES
('Placement Records', '/placement/records', 5, 1, 1),
('Our Recruiters', '/placement/recruiters', 5, 2, 1),
('Placement FAQs', '/placement/faq', 5, 3, 1);

-- Verification query - Main menu items
SELECT 
    id,
    label,
    route,
    parent_id,
    display_order,
    is_active
FROM navigation_menu 
WHERE is_active = 1 AND parent_id IS NULL
ORDER BY display_order ASC;

-- Verification query - All menu items
SELECT 
    id,
    label,
    route,
    parent_id,
    display_order,
    is_active
FROM navigation_menu 
WHERE is_active = 1
ORDER BY parent_id, display_order ASC;

-- Count verification
SELECT 'Navigation menu created successfully!' as status, COUNT(*) as total_items 
FROM navigation_menu 
WHERE is_active = 1;

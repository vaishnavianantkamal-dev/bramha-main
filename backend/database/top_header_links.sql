-- ============================================
-- TOP HEADER LINKS TABLE
-- ============================================
-- This table stores all top header links (menu, social, action)
-- Database: brahmavalley_db

USE brahmavalley_db;

DROP TABLE IF EXISTS top_header_links;
CREATE TABLE top_header_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('menu', 'social', 'action') NOT NULL,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(100),
    url VARCHAR(500) NOT NULL,
    target ENUM('_self', '_blank') DEFAULT '_self',
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert menu links
INSERT INTO top_header_links (type, title, icon, url, target, display_order, is_active) VALUES
('menu', 'Download E-Brochures', 'download', '/brochures', '_self', 1, 1),
('menu', 'Alumni', 'users', '/alumni', '_self', 2, 1),
('menu', 'Careers', 'briefcase', '/careers', '_self', 3, 1),
('menu', 'Admission', 'clipboard', '/admission', '_self', 4, 1);

-- Insert social links
INSERT INTO top_header_links (type, title, icon, url, target, display_order, is_active) VALUES
('social', 'WhatsApp', 'whatsapp', 'https://wa.me/919876543210', '_blank', 1, 1),
('social', 'Facebook', 'facebook', 'https://facebook.com/brahmavalley', '_blank', 2, 1),
('social', 'LinkedIn', 'linkedin', 'https://linkedin.com/company/brahmavalley', '_blank', 3, 1),
('social', 'Instagram', 'instagram', 'https://instagram.com/brahmavalley', '_blank', 4, 1),
('social', 'YouTube', 'youtube', 'https://youtube.com/@brahmavalley', '_blank', 5, 1);

-- Insert action links
INSERT INTO top_header_links (type, title, icon, url, target, display_order, is_active) VALUES
('action', 'Get Connected', 'send', '/contact', '_self', 1, 1),
('action', '360 Virtual Tour', 'camera', '/virtual-tour', '_self', 2, 1);

-- Verification query
SELECT 
    type,
    COUNT(*) as count,
    GROUP_CONCAT(title) as titles
FROM top_header_links 
WHERE is_active = 1 
GROUP BY type
ORDER BY type;

-- Count verification
SELECT 'Top header links created successfully!' as status, COUNT(*) as total_links 
FROM top_header_links 
WHERE is_active = 1;

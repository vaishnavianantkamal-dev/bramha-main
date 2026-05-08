-- ============================================
-- BRAHMA VALLEY CMS - ADMIN TABLES
-- Run this in phpMyAdmin on brahmavalley_db
-- ============================================

-- Admin Users Table
DROP TABLE IF EXISTS admin_users;
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
    avatar VARCHAR(255) DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Default admin: username=admin, password=Admin@123
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@brahmavalley.edu.in', '$2y$10$hBJYNBwkNIbCHZC0qacpvuATAujUZ1yYVOHwL5Cds2GSDembWLH9u', 'Super Administrator', 'super_admin');

-- Admin Sessions Table
DROP TABLE IF EXISTS admin_sessions;
CREATE TABLE admin_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Activity Log Table
DROP TABLE IF EXISTS admin_activity_log;
CREATE TABLE admin_activity_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    record_id INT DEFAULT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Uploaded Files Table
DROP TABLE IF EXISTS uploaded_files;
CREATE TABLE uploaded_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(100),
    file_size INT,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL
);

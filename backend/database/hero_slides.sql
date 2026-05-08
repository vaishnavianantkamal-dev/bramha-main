-- ============================================
-- Hero Slides Table Creation Script
-- ============================================
-- This table stores hero slider data for the homepage
-- Each slide contains image, text content, and display settings

-- Drop table if exists (be careful in production!)
DROP TABLE IF EXISTS hero_slides;

-- Create hero_slides table
CREATE TABLE hero_slides (
    -- Primary key: unique identifier for each slide
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Image path: relative path to the slide image
    -- Example: /images/hero-1.png
    image VARCHAR(255) NOT NULL,
    
    -- Tag: small label text shown above headline
    -- Example: "World-Class Faculty", "Est. 1998"
    tag VARCHAR(100),
    
    -- Headline: main text line (first part)
    -- Example: "Learn from the", "Shaping Tomorrow's"
    headline VARCHAR(255) NOT NULL,
    
    -- Highlight: emphasized text (second part, usually colored)
    -- Example: "Best Minds", "Leaders"
    highlight VARCHAR(255) NOT NULL,
    
    -- Subtitle: descriptive text below headline
    -- Example: "200+ expert faculty dedicated to your academic journey."
    subtitle TEXT,
    
    -- Display order: controls the sequence of slides (lower number = shown first)
    -- Example: 1, 2, 3
    display_order INT DEFAULT 0,
    
    -- Active status: 1 = active (shown), 0 = inactive (hidden)
    is_active TINYINT(1) DEFAULT 1,
    
    -- Timestamp: automatically records when slide was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Timestamp: automatically updates when slide is modified
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Insert Sample/Dummy Data
-- ============================================
-- These are the 3 slides currently used in the frontend

INSERT INTO hero_slides (image, tag, headline, highlight, subtitle, display_order, is_active) VALUES
(
    '/images/hero-1.png',
    'World-Class Faculty',
    'Learn from the',
    'Best Minds',
    '200+ expert faculty dedicated to your academic journey.',
    1,
    1
),
(
    '/images/hero-2.jpg',
    'Est. 1998',
    'Shaping Tomorrow\'s',
    'Leaders',
    'Where knowledge meets ambition — a campus built for the bold.',
    2,
    1
),
(
    '/images/hero-3.webp',
    '50+ Programs',
    'Discover Your',
    'Passion',
    'Engineering, Management, Pharmacy & more under one valley.',
    3,
    1
);

-- ============================================
-- Verify Data Insertion
-- ============================================
-- Run this query to check if data was inserted successfully
SELECT * FROM hero_slides ORDER BY display_order ASC;

-- ============================================
-- Useful Queries for Testing
-- ============================================

-- Get only active slides (what the API will return)
-- SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY display_order ASC;

-- Count total slides
-- SELECT COUNT(*) as total_slides FROM hero_slides;

-- Get slides by specific order
-- SELECT * FROM hero_slides WHERE display_order = 1;

-- ============================================
-- Notes:
-- ============================================
-- 1. Run this script in phpMyAdmin or MySQL command line
-- 2. Make sure database 'brahmavalley_db' exists first
-- 3. Image paths should match your public folder structure
-- 4. display_order allows you to reorder slides without changing IDs
-- 5. is_active allows you to hide slides without deleting them

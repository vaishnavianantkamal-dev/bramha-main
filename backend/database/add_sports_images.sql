-- ============================================
-- ADD SPORTS IMAGES TO GALLERY
-- ============================================
-- Run this script to add sports images to the gallery_images table
-- This fixes the empty Sports gallery issue

-- Add sports images (category_id = 3 for Sports)
INSERT INTO gallery_images (category_id, image_path, caption, display_order, is_active) VALUES
(3, '/images/facilities/image1.png', 'Sports Complex - Indoor Facilities', 1, 1),
(3, '/images/facilities/image2.jpg', 'Athletic Track and Field', 2, 1),
(3, '/images/facilities/image3.png', 'Basketball Court', 3, 1),
(3, '/images/facilities/image4.png', 'Swimming Pool Complex', 4, 1);

-- Verify the insertion
SELECT 
    gi.id, 
    gi.image_path, 
    gi.caption, 
    gc.name as category_name,
    gc.slug as category_slug
FROM gallery_images gi
JOIN gallery_categories gc ON gi.category_id = gc.id
WHERE gc.slug = 'sports'
ORDER BY gi.display_order;

-- Show count of images per category
SELECT 
    gc.name as category_name,
    gc.slug as category_slug,
    COUNT(gi.id) as image_count
FROM gallery_categories gc
LEFT JOIN gallery_images gi ON gc.id = gi.category_id AND gi.is_active = 1
WHERE gc.is_active = 1
GROUP BY gc.id, gc.name, gc.slug
ORDER BY gc.display_order;
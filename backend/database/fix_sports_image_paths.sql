-- ============================================
-- FIX SPORTS IMAGE PATHS
-- ============================================
-- The sports images exist in /facilities/ not /images/facilities/
-- This script updates the correct paths

-- Update sports images to correct paths
UPDATE gallery_images 
SET image_path = '/facilities/image1.png'
WHERE category_id = 3 AND image_path = '/images/facilities/image1.png';

UPDATE gallery_images 
SET image_path = '/facilities/image2.jpg'
WHERE category_id = 3 AND image_path = '/images/facilities/image2.jpg';

UPDATE gallery_images 
SET image_path = '/facilities/image3.png'
WHERE category_id = 3 AND image_path = '/images/facilities/image3.png';

UPDATE gallery_images 
SET image_path = '/facilities/image4.png'
WHERE category_id = 3 AND image_path = '/images/facilities/image4.png';

-- Verify the changes
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
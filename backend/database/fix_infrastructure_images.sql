-- ============================================
-- FIX INFRASTRUCTURE IMAGES
-- ============================================
-- Update infrastructure sections with better, more appropriate images

-- Academic Blocks - Use graduation image (more academic)
UPDATE infrastructure_sections 
SET image = '/images/graduation.jpg'
WHERE title = 'Academic Blocks';

-- Campus Amenities - Keep hostel image (appropriate)
UPDATE infrastructure_sections 
SET image = '/images/facilities/hostel.jpg'
WHERE title = 'Campus Amenities';

-- Sports & Wellness - Use a better sports-related image
UPDATE infrastructure_sections 
SET image = '/images/events/third.jpg'
WHERE title = 'Sports & Wellness';

-- Digital Infrastructure - Use a more tech-appropriate image
UPDATE infrastructure_sections 
SET image = '/images/placements/chemistry-lab.jpg'
WHERE title = 'Digital Infrastructure';

-- Verify the changes
SELECT 
    id,
    title,
    image,
    display_order
FROM infrastructure_sections 
WHERE is_active = 1 
ORDER BY display_order;

-- Success message
SELECT 'Infrastructure images updated successfully!' as status;
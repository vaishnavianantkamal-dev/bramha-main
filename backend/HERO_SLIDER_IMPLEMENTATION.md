# Hero Slider Backend Implementation Guide

## 📋 Overview

This document explains the complete implementation of the Hero Slider backend module, including database setup, API creation, and frontend integration.

---

## 🗄️ Database Structure

### Table: `hero_slides`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (Primary Key) | Unique identifier for each slide |
| `image` | VARCHAR(255) | Path to slide image (e.g., /images/hero-1.png) |
| `tag` | VARCHAR(100) | Small label text above headline |
| `headline` | VARCHAR(255) | First part of main text |
| `highlight` | VARCHAR(255) | Emphasized text (usually colored) |
| `subtitle` | TEXT | Descriptive text below headline |
| `display_order` | INT | Controls slide sequence (1, 2, 3...) |
| `is_active` | TINYINT(1) | 1 = active, 0 = hidden |
| `created_at` | TIMESTAMP | Auto-generated creation time |
| `updated_at` | TIMESTAMP | Auto-updated modification time |

### Sample Data Structure

```json
{
  "id": 1,
  "image": "/images/hero-1.png",
  "tag": "World-Class Faculty",
  "headline": "Learn from the",
  "highlight": "Best Minds",
  "subtitle": "200+ expert faculty dedicated to your academic journey.",
  "display_order": 1
}
```

---

## 📁 Files Created

### 1. `backend/database/hero_slides.sql`
**Purpose**: SQL script to create table and insert sample data

**What it does**:
- Drops existing table (if any)
- Creates `hero_slides` table with all fields
- Inserts 3 sample slides matching current frontend data
- Includes helpful comments and test queries

**How to use**:
1. Open phpMyAdmin
2. Select `brahmavalley_db` database
3. Go to SQL tab
4. Copy-paste entire file content
5. Click "Go"

### 2. `backend/api/hero-slides.php`
**Purpose**: GET API endpoint to fetch hero slides

**What it does**:
- Accepts only GET requests
- Connects to database
- Fetches all active slides ordered by display_order
- Returns JSON response
- Handles errors gracefully
- Includes CORS headers for React frontend

**API Details**:
- **URL**: `http://localhost/brahmavalley-main/brahmavalley-main/backend/api/hero-slides.php`
- **Method**: GET
- **Response**: JSON

### 3. `backend/database/README.md`
**Purpose**: Instructions for running SQL scripts

**Contains**:
- Step-by-step guide for phpMyAdmin
- MySQL command line instructions
- Verification steps
- Troubleshooting tips

---

## 🚀 Installation Steps

### Step 1: Create Database Table

1. **Start XAMPP**
   - Start Apache
   - Start MySQL

2. **Open phpMyAdmin**
   - Go to: `http://localhost/phpmyadmin`
   - Click on `brahmavalley_db` in left sidebar

3. **Run SQL Script**
   - Click "SQL" tab at top
   - Open `backend/database/hero_slides.sql`
   - Copy all content
   - Paste in SQL query box
   - Click "Go" button

4. **Verify Table Creation**
   - You should see "Query executed successfully"
   - Click on `hero_slides` table in left sidebar
   - Click "Browse" tab
   - You should see 3 rows of data

### Step 2: Test API Endpoint

1. **Open Browser**
   - Navigate to: `http://localhost/brahmavalley-main/brahmavalley-main/backend/api/hero-slides.php`

2. **Expected Response**
   ```json
   {
     "success": true,
     "message": "Hero slides fetched successfully",
     "data": [
       {
         "id": 1,
         "image": "/images/hero-1.png",
         "tag": "World-Class Faculty",
         "headline": "Learn from the",
         "highlight": "Best Minds",
         "subtitle": "200+ expert faculty dedicated to your academic journey.",
         "display_order": 1
       },
       {
         "id": 2,
         "image": "/images/hero-2.jpg",
         "tag": "Est. 1998",
         "headline": "Shaping Tomorrow's",
         "highlight": "Leaders",
         "subtitle": "Where knowledge meets ambition — a campus built for the bold.",
         "display_order": 2
       },
       {
         "id": 3,
         "image": "/images/hero-3.webp",
         "tag": "50+ Programs",
         "headline": "Discover Your",
         "highlight": "Passion",
         "subtitle": "Engineering, Management, Pharmacy & more under one valley.",
         "display_order": 3
       }
     ],
     "count": 3
   }
   ```

3. **If You See Errors**
   - Check if Apache and MySQL are running
   - Verify database connection in `config/db.php`
   - Check if table exists in phpMyAdmin
   - Look at Apache error logs in XAMPP

---

## 🔌 Frontend Integration

### Step 1: Create API Service (Recommended)

Create a new file: `src/services/api.js`

```javascript
// Base API URL
const API_BASE_URL = 'http://localhost/brahmavalley-main/brahmavalley-main/backend/api';

// Fetch hero slides
export const fetchHeroSlides = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides.php`);
    const data = await response.json();
    
    if (data.success) {
      return data.data; // Return slides array
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    throw error;
  }
};
```

### Step 2: Update Hero Component

Modify `src/pages/Home/components/Hero.jsx`:

```javascript
import { useEffect, useState } from "react";
import { fetchHeroSlides } from "../../../services/api";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  // Fetch slides from API on component mount
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data = await fetchHeroSlides();
        setSlides(data);
      } catch (error) {
        console.error('Failed to load hero slides:', error);
        // Fallback to hardcoded slides if API fails
        setSlides([
          // ... your existing hardcoded slides
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  // Rest of your component code...
  // Use slides[current] instead of hardcoded data
}
```

### Step 3: Alternative - Direct Fetch in Component

If you don't want a separate service file:

```javascript
useEffect(() => {
  fetch('http://localhost/brahmavalley-main/brahmavalley-main/backend/api/hero-slides.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setSlides(data.data);
      }
    })
    .catch(error => console.error('Error:', error))
    .finally(() => setLoading(false));
}, []);
```

---

## 🧪 Testing Guide

### Test 1: Database Query
Run in phpMyAdmin SQL tab:
```sql
SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY display_order ASC;
```
**Expected**: 3 rows returned

### Test 2: API Response
Open in browser:
```
http://localhost/brahmavalley-main/brahmavalley-main/backend/api/hero-slides.php
```
**Expected**: JSON with success=true and 3 slides

### Test 3: CORS Headers
Open browser console on React app and check Network tab:
- Should see successful API call
- No CORS errors
- Status 200 OK

### Test 4: Error Handling
Temporarily stop MySQL in XAMPP:
- API should return error response
- Status 500
- Error message in JSON

---

## 🔧 API Code Explanation

### Headers Section
```php
header("Access-Control-Allow-Origin: *");
```
- Allows React (running on port 5173) to call this API
- In production, replace `*` with your actual domain

### Database Query
```php
$sql = "SELECT id, image, tag, headline, highlight, subtitle, display_order
        FROM hero_slides 
        WHERE is_active = 1 
        ORDER BY display_order ASC";
```
- Only fetches active slides (`is_active = 1`)
- Orders by `display_order` (1, 2, 3...)
- Excludes `created_at` and `updated_at` (not needed in frontend)

### Response Format
```php
$response = [
    "success" => true,
    "message" => "Hero slides fetched successfully",
    "data" => $slides,
    "count" => count($slides)
];
```
- `success`: Boolean indicating if request succeeded
- `message`: Human-readable message
- `data`: Array of slide objects
- `count`: Total number of slides returned

---

## 🎨 Managing Slides

### Add New Slide
```sql
INSERT INTO hero_slides (image, tag, headline, highlight, subtitle, display_order, is_active)
VALUES ('/images/hero-4.jpg', 'New Tag', 'New Headline', 'Highlight', 'Subtitle text', 4, 1);
```

### Update Slide
```sql
UPDATE hero_slides 
SET headline = 'Updated Headline', highlight = 'Updated Highlight'
WHERE id = 1;
```

### Hide Slide (Don't Delete)
```sql
UPDATE hero_slides SET is_active = 0 WHERE id = 2;
```

### Reorder Slides
```sql
UPDATE hero_slides SET display_order = 1 WHERE id = 3;
UPDATE hero_slides SET display_order = 2 WHERE id = 1;
UPDATE hero_slides SET display_order = 3 WHERE id = 2;
```

### Delete Slide
```sql
DELETE FROM hero_slides WHERE id = 1;
```

---

## 🐛 Troubleshooting

### Issue 1: "Connection failed" Error
**Solution**: 
- Check if MySQL is running in XAMPP
- Verify database credentials in `config/db.php`
- Ensure `brahmavalley_db` database exists

### Issue 2: Empty Response (count: 0)
**Solution**:
- Check if data exists: `SELECT * FROM hero_slides;`
- Check if slides are active: `SELECT * FROM hero_slides WHERE is_active = 1;`
- Run the SQL script again to insert sample data

### Issue 3: CORS Error in React
**Solution**:
- Check if `.htaccess` file exists in backend folder
- Verify CORS headers in `hero-slides.php`
- Try accessing API directly in browser first

### Issue 4: 404 Not Found
**Solution**:
- Verify file path: `backend/api/hero-slides.php`
- Check Apache is running
- Verify URL matches your folder structure

### Issue 5: JSON Parse Error
**Solution**:
- Check for PHP errors before JSON output
- View API response in browser to see actual output
- Check Apache error logs

---

## 📊 Database Best Practices

### 1. Always Use display_order
- Allows reordering without changing IDs
- Easier to manage slide sequence

### 2. Use is_active Instead of Deleting
- Preserves data history
- Easy to restore hidden slides
- Better for analytics

### 3. Keep Image Paths Relative
- Store: `/images/hero-1.png`
- Not: `http://localhost/images/hero-1.png`
- Makes migration easier

### 4. Regular Backups
Export table regularly:
```sql
SELECT * FROM hero_slides INTO OUTFILE '/tmp/hero_slides_backup.csv';
```

---

## 🚀 Next Steps

1. ✅ Database table created
2. ✅ Sample data inserted
3. ✅ GET API working
4. ⏳ Integrate with React frontend
5. ⏳ Test on frontend
6. ⏳ Create admin panel for slide management (future)
7. ⏳ Add POST/PUT/DELETE APIs (future)

---

## 📝 Notes

- This implementation focuses on GET API only
- POST, PUT, DELETE APIs will be added later for admin panel
- Current sample data matches existing frontend slides
- API is production-ready for read operations
- Consider adding image upload API in future

---

**Implementation Date**: May 7, 2026  
**Status**: ✅ Complete and Ready for Frontend Integration  
**Next Module**: Contact Form or Courses Catalog

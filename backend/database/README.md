# Database SQL Scripts

This folder contains SQL scripts for creating database tables and inserting sample data.

## 📁 Files

### `hero_slides.sql`
Creates the `hero_slides` table and inserts 3 sample slides for the homepage hero section.

## 🚀 How to Run SQL Scripts

### Method 1: Using phpMyAdmin (Easiest)

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Select database `brahmavalley_db` from left sidebar
3. Click on "SQL" tab at the top
4. Copy the entire content of `hero_slides.sql`
5. Paste it in the SQL query box
6. Click "Go" button at bottom right
7. You should see "Query executed successfully" message

### Method 2: Using MySQL Command Line

```bash
# Navigate to this folder
cd backend/database

# Run the SQL file
mysql -u root -p brahmavalley_db < hero_slides.sql

# Enter your MySQL password when prompted (default is empty for XAMPP)
```

### Method 3: Import in phpMyAdmin

1. Open phpMyAdmin
2. Select `brahmavalley_db` database
3. Click "Import" tab
4. Click "Choose File" and select `hero_slides.sql`
5. Click "Go" at the bottom

## ✅ Verify Installation

After running the script, verify the data:

1. In phpMyAdmin, select `brahmavalley_db`
2. Click on `hero_slides` table in left sidebar
3. Click "Browse" tab
4. You should see 3 rows of sample data

Or run this query:
```sql
SELECT * FROM hero_slides ORDER BY display_order ASC;
```

## 📝 Sample Data Included

The script includes 3 hero slides:
1. "Learn from the Best Minds" - World-Class Faculty
2. "Shaping Tomorrow's Leaders" - Est. 1998
3. "Discover Your Passion" - 50+ Programs

## 🔧 Troubleshooting

### Error: "Table already exists"
- The script includes `DROP TABLE IF EXISTS` to handle this
- Or manually delete the table first in phpMyAdmin

### Error: "Database not found"
- Make sure `brahmavalley_db` database exists
- Create it first: `CREATE DATABASE brahmavalley_db;`

### Error: "Access denied"
- Check your MySQL username and password in `config/db.php`
- Default XAMPP credentials: username=root, password=(empty)

## 🎯 Next Steps

After running this script:
1. Test the API: `http://localhost/brahmavalley-main/brahmavalley-main/backend/api/hero-slides.php`
2. You should see JSON response with 3 slides
3. Integrate with React frontend

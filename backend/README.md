# Brahma Valley Backend - PHP + MySQL

## 📁 Folder Structure

```
backend/
├── config/           # Configuration files
│   └── db.php       # Database connection file
├── api/             # API endpoints (to be created)
├── uploads/         # File uploads directory
├── .htaccess        # Apache configuration
├── test-connection.php  # Database connection test file
└── README.md        # This file
```

## 🚀 Setup Instructions

### Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** server
3. Start **MySQL** server

### Step 2: Create Database
1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click on "New" in the left sidebar
3. Enter database name: `brahmavalley_db`
4. Select collation: `utf8mb4_general_ci`
5. Click "Create"

### Step 3: Configure Database Connection
The database connection is already configured in `config/db.php` with these default settings:
- **Host:** localhost
- **Username:** root
- **Password:** (empty)
- **Database:** brahmavalley_db

If your MySQL has a different username or password, edit `config/db.php` and update the constants.

### Step 4: Test Database Connection
1. Open your browser
2. Navigate to: `http://localhost/brahmavalley-main/brahmavalley-main/backend/test-connection.php`
3. You should see a success message with connection details

**Note:** The exact URL depends on where you placed the project in your XAMPP htdocs folder.

## 📝 File Explanations

### config/db.php
This is your database connection file. It:
- Defines database credentials as constants
- Creates a mysqli connection object (`$conn`)
- Checks if connection is successful
- Sets character encoding to utf8mb4
- Can be included in any PHP file that needs database access

**Usage in other files:**
```php
require_once '../config/db.php';
// Now you can use $conn to query the database
```

### test-connection.php
A visual test page to verify your database connection is working. Shows:
- Connection status
- Database details
- MySQL version
- Character set

**Important:** Delete or secure this file before deploying to production!

### .htaccess
Apache configuration file that:
- Enables CORS for React frontend
- Sets error reporting for development
- Protects sensitive files

## 🔧 Common Issues & Solutions

### Issue 1: "Connection failed: Access denied"
**Solution:** Check your MySQL username and password in `config/db.php`

### Issue 2: "Unknown database 'brahmavalley_db'"
**Solution:** Create the database in phpMyAdmin (see Step 2 above)

### Issue 3: Page shows blank or errors
**Solution:** 
- Make sure Apache is running in XAMPP
- Check if PHP is enabled
- Look at Apache error logs in XAMPP

### Issue 4: CORS errors from React
**Solution:** The `.htaccess` file handles CORS. Make sure Apache has mod_headers enabled.

## 📚 Next Steps

1. ✅ Database connection is set up
2. ⏳ Create database tables (schemas)
3. ⏳ Build API endpoints in `api/` folder
4. ⏳ Connect React frontend to backend APIs

## 🔐 Security Notes (For Production)

Before deploying to production:
- [ ] Remove or secure `test-connection.php`
- [ ] Disable error display in `.htaccess`
- [ ] Use environment variables for database credentials
- [ ] Implement proper authentication
- [ ] Validate and sanitize all user inputs
- [ ] Use prepared statements for all queries
- [ ] Set proper CORS origins (not "*")

## 💡 Tips for Beginners

1. **Always use `require_once`** when including db.php to avoid multiple connections
2. **Close connections** when done: `$conn->close();`
3. **Use prepared statements** to prevent SQL injection
4. **Check for errors** after every database query
5. **Test in browser** frequently during development

## 📞 Need Help?

If you encounter issues:
1. Check XAMPP Apache and MySQL are running
2. Verify database exists in phpMyAdmin
3. Check Apache error logs in XAMPP
4. Ensure file paths are correct

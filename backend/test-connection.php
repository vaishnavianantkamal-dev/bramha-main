<?php
/**
 * Database Connection Test File
 * Use this file to test if your database connection is working properly
 * Access this file in browser: http://localhost/brahmavalley-main/brahmavalley-main/backend/test-connection.php
 */

// Include the database configuration file
require_once 'config/db.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Connection Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .success {
            color: #28a745;
            padding: 15px;
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            margin: 20px 0;
        }
        .error {
            color: #dc3545;
            padding: 15px;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            margin: 20px 0;
        }
        .info {
            background-color: #e7f3ff;
            padding: 15px;
            border-left: 4px solid #2196F3;
            margin: 20px 0;
        }
        h1 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        table td:first-child {
            font-weight: bold;
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔌 Database Connection Test</h1>
        
        <?php if ($conn): ?>
            <div class="success">
                <strong>✓ Success!</strong> Database connection established successfully.
            </div>
            
            <h2>Connection Details:</h2>
            <table>
                <tr>
                    <td>Database Host:</td>
                    <td><?php echo DB_HOST; ?></td>
                </tr>
                <tr>
                    <td>Database Name:</td>
                    <td><?php echo DB_NAME; ?></td>
                </tr>
                <tr>
                    <td>Database User:</td>
                    <td><?php echo DB_USER; ?></td>
                </tr>
                <tr>
                    <td>MySQL Version:</td>
                    <td><?php echo $conn->server_info; ?></td>
                </tr>
                <tr>
                    <td>Character Set:</td>
                    <td><?php echo $conn->character_set_name(); ?></td>
                </tr>
                <tr>
                    <td>Connection Status:</td>
                    <td><span style="color: #28a745;">● Connected</span></td>
                </tr>
            </table>
            
            <div class="info">
                <strong>ℹ️ Next Steps:</strong>
                <ul>
                    <li>Your database connection is working properly</li>
                    <li>You can now create database tables</li>
                    <li>Start building your API endpoints in the <code>api/</code> folder</li>
                    <li>Remember to delete or secure this test file before going to production</li>
                </ul>
            </div>
        <?php endif; ?>
        
        <?php
        // Close the database connection
        $conn->close();
        ?>
    </div>
</body>
</html>

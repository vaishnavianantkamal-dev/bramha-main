<?php
/**
 * CORS Configuration Helper
 * 
 * NOTE: This file is kept for backward compatibility but is no longer
 * required by the fixed APIs. Each API sets its own headers directly.
 * 
 * If included, it will NOT override headers already set by the API file.
 */

// Only set CORS headers if not already sent
if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
}

// Handle preflight OPTIONS request
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>

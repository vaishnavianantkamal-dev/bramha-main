<?php
/**
 * Database Configuration
 * Uses variables instead of constants to avoid redefinition fatal errors
 * Safe to include multiple times via include_once / require_once
 */

// Guard against multiple inclusions
if (isset($GLOBALS['_DB_LOADED']) && $GLOBALS['_DB_LOADED'] === true) {
    return;
}

// Suppress PHP notices/warnings from appearing in output
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// ── Load .env file directly (no function dependency) ──────────────────────────
$_envFile = dirname(__DIR__) . '/.env';
$_dbHost  = 'localhost';
$_dbUser  = 'root';
$_dbPass  = '';
$_dbName  = 'brahmavalley_db';
$_dbPort  = 3306;
$_dbCharset = 'utf8mb4';

if (file_exists($_envFile)) {
    $lines = file($_envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') === false) continue;

        list($k, $v) = explode('=', $line, 2);
        $k = trim($k);
        $v = trim($v);

        // Strip surrounding quotes
        if (strlen($v) >= 2 && (
            ($v[0] === '"'  && $v[strlen($v)-1] === '"')  ||
            ($v[0] === "'"  && $v[strlen($v)-1] === "'")
        )) {
            $v = substr($v, 1, -1);
        }

        switch ($k) {
            case 'DB_HOST':     $_dbHost    = $v; break;
            case 'DB_USER':     $_dbUser    = $v; break;
            case 'DB_PASSWORD': $_dbPass    = $v; break;
            case 'DB_NAME':     $_dbName    = $v; break;
            case 'DB_PORT':     $_dbPort    = (int)$v; break;
            case 'DB_CHARSET':  $_dbCharset = $v; break;
        }
    }
}

// ── Create connection ──────────────────────────────────────────────────────────
$conn = new mysqli($_dbHost, $_dbUser, $_dbPass, $_dbName, $_dbPort);

// Define constants for global use in APIs
if (!defined('DB_HOST')) define('DB_HOST', $_dbHost);
if (!defined('DB_USER')) define('DB_USER', $_dbUser);
if (!defined('DB_PASSWORD')) define('DB_PASSWORD', $_dbPass);
if (!defined('DB_NAME')) define('DB_NAME', $_dbName);
if (!defined('DB_PORT')) define('DB_PORT', $_dbPort);
if (!defined('DB_CHARSET')) define('DB_CHARSET', $_dbCharset);

if ($conn->connect_error) {
    // Headers already set by the calling API file
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed",
        "error"   => $conn->connect_error,
        "hint"    => "Check XAMPP MySQL is running and database '" . $_dbName . "' exists"
    ]);
    exit();
}

$conn->set_charset($_dbCharset);

// Mark as loaded
$GLOBALS['_DB_LOADED'] = true;

// Clean up temp vars
unset($_envFile, $_dbHost, $_dbUser, $_dbPass, $_dbName, $_dbPort, $_dbCharset, $lines, $line, $k, $v);
?>

<?php
/**
 * Environment Configuration Loader
 * Safe to include multiple times
 */

// Prevent re-loading
if (defined('ENV_LOADED')) {
    return;
}

// Get the backend directory path (two levels up from config/)
$backendDir = dirname(dirname(__FILE__));
$envFile    = $backendDir . '/.env';

// Load .env file if it exists
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        // Skip comments and blank lines
        if (strpos(trim($line), '#') === 0 || trim($line) === '') {
            continue;
        }

        // Parse KEY=VALUE
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key   = trim($key);
            $value = trim($value);

            // Remove surrounding quotes
            if (strlen($value) >= 2) {
                $first = $value[0];
                $last  = $value[strlen($value) - 1];
                if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                    $value = substr($value, 1, -1);
                }
            }

            putenv("$key=$value");
            $_ENV[$key]    = $value;
            $_SERVER[$key] = $value;
        }
    }
}

// Helper function - only define if not already defined
if (!function_exists('getEnv')) {
    function getEnv($key, $default = null) {
        // Check $_ENV first, then getenv()
        if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
            return $_ENV[$key];
        }
        $value = getenv($key);
        return ($value !== false && $value !== '') ? $value : $default;
    }
}

define('ENV_LOADED', true);
?>

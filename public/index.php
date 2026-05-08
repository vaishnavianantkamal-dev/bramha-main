<?php

// Check PHP version.
if (version_compare(PHP_VERSION, '7.4', '<')) {
    exit('Your PHP version must be 7.4 or higher to run CodeIgniter. Current version: ' . PHP_VERSION);
}

// Path to the front controller (this file)
define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR);

// Ensure the current directory is pointing to the front controller's directory
if (getcwd() !== FCPATH) {
    chdir(FCPATH);
}

/*
 *---------------------------------------------------------------
 * BOOTSTRAP THE APPLICATION
 *---------------------------------------------------------------
 * This process sets up the path constants, loads and registers
 * our autoloader, along with Composer's, loads our constants
 * and fires up an instance of the main application.
 */

// Load our paths config file
// This is the line you might need to change
require FCPATH . '../app/Config/Paths.php';
// ^^^ This is the correct path for a standard install

$paths = new Config\Paths();

// Location of the framework bootstrap file.
require $paths->systemDirectory . '/Boot.php';

// Launch the application!
CodeIgniter\Boot::bootWeb($paths);
<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('api/hero-slides', 'Home::heroSlides');
$routes->get('api/blogs', 'Blog::index');
$routes->get('api/blogs/(:any)', 'Blog::show/$1');
$routes->get('api/courses', 'Course::index');
$routes->get('api/gallery/categories', 'Gallery::categories');
$routes->get('api/gallery/images', 'Gallery::images');
$routes->post('api/contact', 'Contact::submit');
$routes->get('api/placement/records', 'Placement::records');
$routes->get('api/placement/recruiters', 'Placement::recruiters');
$routes->get('api/placement/faqs', 'Placement::faqs');
$routes->get('api/board-members', 'PublicController::boardMembers');
$routes->get('api/leadership', 'PublicController::leadership');
$routes->get('api/leadership/(:any)', 'PublicController::leadership/$1');
$routes->get('api/facilities', 'PublicController::facilities');
$routes->get('api/facilities/(:any)', 'PublicController::facilities/$1');
$routes->get('api/infrastructure', 'PublicController::infrastructure');
$routes->get('api/awards', 'PublicController::awards');
$routes->get('api/affiliations', 'PublicController::affiliations');
$routes->get('api/statistics', 'PublicController::statistics');
$routes->get('api/top-header', 'PublicController::topHeader');
$routes->get('api/about', 'PublicController::about');
$routes->get('api/why-choose-us', 'PublicController::whyChooseUs');
$routes->get('api/progress-highlights', 'PublicController::progressHighlights');
$routes->get('api/placement-policy', 'PublicController::placementPolicy');
$routes->get('api/navigation', 'PublicController::navigation');
$routes->get('api/footer', 'PublicController::footer');
$routes->get('api/virtual-tour', 'PublicController::virtualTour');
$routes->get('api/commitments', 'PublicController::commitments');

// Admin Auth
$routes->post('api/admin/login', 'Admin\Auth::login');
$routes->get('api/admin/logout', 'Admin\Auth::logout');
$routes->get('api/admin/me', 'Admin\Auth::me');

// Protected Admin Dashboard Routes
$routes->group('api/admin/dashboard', ['filter' => 'adminAuth'], function($routes) {
    // Blogs
    $routes->get('blogs', 'Admin\Dashboard::getBlogs');
    $routes->post('blogs/save', 'Admin\Dashboard::saveBlog');
    $routes->delete('blogs/delete/(:num)', 'Admin\Dashboard::deleteBlog/$1');

    // Courses
    $routes->get('courses', 'Admin\Dashboard::getCourses');
    $routes->post('courses/save', 'Admin\Dashboard::saveCourse');
    $routes->delete('courses/delete/(:num)', 'Admin\Dashboard::deleteCourse/$1');

    // Hero Slides
    $routes->get('hero-slides', 'Admin\Dashboard::getHeroSlides');
    $routes->post('hero-slides/save', 'Admin\Dashboard::saveHeroSlide');
    $routes->delete('hero-slides/delete/(:num)', 'Admin\Dashboard::deleteHeroSlide/$1');
});

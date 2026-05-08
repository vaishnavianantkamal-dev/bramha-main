/**
 * ============================================
 * API Service Layer
 * ============================================
 * 
 * This file centralizes all API calls to the PHP backend.
 * Benefits:
 * - Single place to manage API URLs
 * - Reusable fetch functions
 * - Consistent error handling
 * - Easy to update API endpoints
 */

// ============================================
// API Configuration
// ============================================

// Base URL for all API endpoints
// Uses environment variable from .env.local
// Fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/brahmavalley-main/brahmavalley-main/backend/api';

// API Timeout (in milliseconds)
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

// Log API configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:');
  console.log('📍 Base URL:', API_BASE_URL);
  console.log('⏱️ Timeout:', API_TIMEOUT, 'ms');
}

// ============================================
// Helper Function: Generic API Fetch
// ============================================

/**
 * Generic fetch function with error handling and timeout
 * @param {string} endpoint - API endpoint (e.g., 'hero-slides.php')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} - Resolves with data or rejects with error
 */
const apiFetch = async (endpoint, options = {}) => {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get raw text first to diagnose empty/invalid responses
    const text = await response.text();

    if (!text || text.trim() === '') {
      throw new Error(`Empty response from ${endpoint} - check PHP error logs`);
    }

    // Parse JSON response
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      // Log the raw response to help debug
      console.error(`Invalid JSON from ${endpoint}:`, text.substring(0, 500));
      throw new Error(`Invalid JSON from ${endpoint}: ${parseError.message}`);
    }

    // Check if API returned success
    if (data.success === false) {
      throw new Error(data.message || data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ============================================
// Hero Slider API
// ============================================

/**
 * Fetch all active hero slides
 * @returns {Promise<Array>} - Array of slide objects
 */
export const fetchHeroSlides = async () => {
  try {
    const response = await apiFetch('hero-slides.php');
    return response.data; // Return the slides array
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    throw error;
  }
};

// ============================================
// Contact Form API (Future)
// ============================================

/**
 * Submit contact form
 * @param {object} formData - { name, email, subject, message }
 * @returns {Promise<object>} - Response from server
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.message || data.error || 'Failed to submit form');
    }

    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// ============================================
// Courses API
// ============================================

/**
 * Fetch all courses
 * @param {object} filters - { level, duration, campus, institution }
 * @returns {Promise<Array>} - Array of course objects
 */
export const fetchCourses = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'All') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `courses.php?${queryString}` : 'courses.php';
    
    const response = await apiFetch(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// ============================================
// Gallery API
// ============================================

/**
 * Fetch gallery images by category
 * @param {string} category - Category slug (e.g., 'brahmautsav')
 * @returns {Promise<Array>} - Array of image objects
 */
export const fetchGalleryImages = async (category) => {
  try {
    console.log(`🔄 fetchGalleryImages called for category: ${category}`);
    const endpoint = category ? `gallery-images.php?category=${category}` : 'gallery-images.php';
    console.log(`🌐 API URL will be: ${API_BASE_URL}/${endpoint}`);
    
    const response = await apiFetch(endpoint);
    
    console.log(`📦 Gallery images response for ${category}:`, response);
    console.log(`📊 Images data:`, response.data);
    console.log(`📏 Images count: ${response.data ? response.data.length : 'No data field'}`);
    
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching gallery images for ${category}:`, error);
    throw error;
  }
};

/**
 * Fetch all gallery categories
 * @returns {Promise<Array>} - Array of category objects
 */
export const fetchGalleryCategories = async () => {
  try {
    console.log('🔄 fetchGalleryCategories called');
    console.log(`🌐 API URL will be: ${API_BASE_URL}/gallery-categories.php`);
    
    const response = await apiFetch('gallery-categories.php');
    
    console.log('📦 Gallery categories response:', response);
    console.log('📊 Categories data:', response.data);
    console.log(`📏 Categories count: ${response.data ? response.data.length : 'No data field'}`);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching gallery categories:', error);
    throw error;
  }
};

// ============================================
// Board Members API
// ============================================

/**
 * Fetch all board members
 * @returns {Promise<Array>} - Array of board member objects
 */
export const fetchBoardMembers = async () => {
  try {
    const response = await apiFetch('board-members.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching board members:', error);
    throw error;
  }
};

// ============================================
// Placement APIs
// ============================================

/**
 * Fetch placement records
 * @returns {Promise<Array>} - Array of placement record objects
 */
export const fetchPlacementRecords = async () => {
  try {
    const response = await apiFetch('placement-records.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching placement records:', error);
    throw error;
  }
};

/**
 * Fetch recruiters
 * @returns {Promise<Array>} - Array of recruiter objects
 */
export const fetchRecruiters = async () => {
  try {
    const response = await apiFetch('recruiters.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    throw error;
  }
};

/**
 * Fetch placement FAQs
 * @returns {Promise<Array>} - Array of FAQ objects
 */
export const fetchPlacementFAQs = async () => {
  try {
    const response = await apiFetch('placement-faqs.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching placement FAQs:', error);
    throw error;
  }
};

// ============================================
// Blog API
// ============================================

/**
 * Fetch all blog posts
 * @returns {Promise<Array>} - Array of blog post objects
 */
export const fetchBlogPosts = async () => {
  try {
    const response = await apiFetch('blogs.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch single blog post by ID or slug
 * @param {string|number} identifier - Blog ID or slug
 * @returns {Promise<object>} - Blog post object
 */
export const fetchBlogPost = async (identifier) => {
  try {
    console.log('🔄 fetchBlogPost called with identifier:', identifier);
    
    // Determine if identifier is ID (number) or slug (string)
    const isId = !isNaN(identifier) && !isNaN(parseFloat(identifier));
    const queryParam = isId ? `id=${identifier}` : `slug=${identifier}`;
    const endpoint = `blogs.php?${queryParam}`;
    
    console.log('🌐 Blog details API URL will be:', `${API_BASE_URL}/${endpoint}`);
    
    const response = await apiFetch(endpoint);
    
    console.log('📦 Blog details response:', response);
    console.log('📊 Blog data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    throw error;
  }
};

/**
 * Fetch single blog post by ID (alternative endpoint)
 * @param {number} id - Blog ID
 * @returns {Promise<object>} - Blog post object
 */
export const fetchBlogDetails = async (id) => {
  try {
    console.log('🔄 fetchBlogDetails called with ID:', id);
    console.log('🌐 Blog details API URL will be:', `${API_BASE_URL}/blog-details.php?id=${id}`);
    
    const response = await apiFetch(`blog-details.php?id=${id}`);
    
    console.log('📦 Blog details response:', response);
    console.log('📊 Blog data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching blog details:', error);
    throw error;
  }
};

// ============================================
// Statistics API
// ============================================

/**
 * Fetch statistics
 * @returns {Promise<Array>} - Array of statistic objects
 */
export const fetchStatistics = async () => {
  try {
    const response = await apiFetch('statistics.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

// ============================================
// Awards API
// ============================================

/**
 * Fetch awards
 * @returns {Promise<Array>} - Array of award objects
 */
export const fetchAwards = async () => {
  try {
    console.log('🔄 fetchAwards called');
    console.log('🌐 API URL will be:', `${API_BASE_URL}/awards.php`);
    
    const response = await apiFetch('awards.php');
    
    console.log('📦 apiFetch response:', response);
    console.log('📊 Response data field:', response.data);
    console.log('📏 Response data length:', response.data ? response.data.length : 'No data field');
    
    return response.data;
  } catch (error) {
    console.error('❌ Error in fetchAwards:', error);
    throw error;
  }
};

// ============================================
// Affiliations API
// ============================================

/**
 * Fetch affiliations
 * @returns {Promise<Array>} - Array of affiliation objects
 */
export const fetchAffiliations = async () => {
  try {
    const response = await apiFetch('affiliations.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching affiliations:', error);
    throw error;
  }
};

// ============================================
// Infrastructure API
// ============================================

/**
 * Fetch infrastructure sections
 * @returns {Promise<Array>} - Array of infrastructure section objects
 */
export const fetchInfrastructure = async () => {
  try {
    console.log('🔄 fetchInfrastructure called');
    console.log('🌐 API URL will be:', `${API_BASE_URL}/infrastructure.php`);
    
    const response = await apiFetch('infrastructure.php');
    
    console.log('📦 Infrastructure response:', response);
    console.log('📊 Infrastructure data:', response.data);
    console.log('📏 Infrastructure count:', response.data ? response.data.length : 'No data field');
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching infrastructure:', error);
    throw error;
  }
};

// ============================================
// Facility Details API
// ============================================

/**
 * Fetch facility details by slug
 * @param {string} slug - Facility slug (e.g., 'sports-facilities')
 * @returns {Promise<object>} - Facility details object
 */
export const fetchFacilityDetails = async (slug) => {
  try {
    console.log('🔄 fetchFacilityDetails called for slug:', slug);
    console.log('🌐 API URL will be:', `${API_BASE_URL}/facility-details.php?slug=${slug}`);
    
    const response = await apiFetch(`facility-details.php?slug=${slug}`);
    
    console.log('📦 Facility details response:', response);
    console.log('📊 Facility data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching facility details:', error);
    throw error;
  }
};

// ============================================
// Commitments API
// ============================================

/**
 * Fetch all commitment sections
 * @returns {Promise<Array>} - Array of commitment section objects
 */
export const fetchCommitments = async () => {
  try {
    console.log('🔄 fetchCommitments called');
    console.log('🌐 API URL will be:', `${API_BASE_URL}/commitments.php`);
    
    const response = await apiFetch('commitments.php');
    
    console.log('📦 Commitments response:', response);
    console.log('📊 Commitments data:', response.data);
    console.log('📏 Commitments count:', response.count);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching commitments:', error);
    throw error;
  }
};

// ============================================
// Top Header Links API
// ============================================

/**
 * Fetch all top header links organized by type
 * @returns {Promise<object>} - Object with menuLinks, socialLinks, actionLinks
 */
export const fetchTopHeaderLinks = async () => {
  try {
    console.log('🔄 fetchTopHeaderLinks called');
    console.log('🌐 API URL will be:', `${API_BASE_URL}/top-header.php`);
    
    const response = await apiFetch('top-header.php');
    
    console.log('📦 Top header links response:', response);
    console.log('📊 Links data:', response.data);
    console.log('📏 Links counts:', response.counts);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching top header links:', error);
    throw error;
  }
};

// ============================================
// ABOUT SECTION
// ============================================
/**
 * Fetch about section content
 * @returns {Promise<object>} - About section data with stats
 */
export const fetchAboutSection = async () => {
  try {
    console.log('🔄 fetchAboutSection called');
    const response = await apiFetch('about.php');
    console.log('✅ About section loaded:', response.data.title);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching about section:', error);
    throw error;
  }
};

// ============================================
// WHY CHOOSE US
// ============================================
/**
 * Fetch why choose us cards
 * @returns {Promise<array>} - Array of why choose us cards
 */
export const fetchWhyChooseUs = async () => {
  try {
    console.log('🔄 fetchWhyChooseUs called');
    const response = await apiFetch('why-choose-us.php');
    console.log('✅ Why choose us loaded:', response.data.length, 'cards');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching why choose us:', error);
    throw error;
  }
};

// ============================================
// PROGRESS HIGHLIGHTS
// ============================================
/**
 * Fetch progress highlights/counters
 * @returns {Promise<array>} - Array of progress highlights
 */
export const fetchProgressHighlights = async () => {
  try {
    console.log('🔄 fetchProgressHighlights called');
    const response = await apiFetch('progress-highlights.php');
    console.log('✅ Progress highlights loaded:', response.data.length, 'items');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching progress highlights:', error);
    throw error;
  }
};

// ============================================
// JOURNEY MESSAGE
// ============================================
/**
 * Fetch journey/leadership message
 * @param {string} slug - Message slug (e.g., 'president-message')
 * @returns {Promise<object>} - Journey message data
 */
export const fetchJourneyMessage = async (slug = 'president-message') => {
  try {
    console.log('🔄 fetchJourneyMessage called with slug:', slug);
    const response = await apiFetch(`journey-message.php?slug=${slug}`);
    console.log('✅ Journey message loaded:', response.data.name);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching journey message:', error);
    throw error;
  }
};

// ============================================
// PLACEMENT POLICY
// ============================================
/**
 * Fetch placement policy sections
 * @returns {Promise<array>} - Array of placement policy sections
 */
export const fetchPlacementPolicy = async () => {
  try {
    console.log('🔄 fetchPlacementPolicy called');
    const response = await apiFetch('placement-policy.php');
    console.log('✅ Placement policy loaded:', response.data.length, 'sections');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching placement policy:', error);
    throw error;
  }
};

// ============================================
// NAVIGATION MENU
// ============================================
/**
 * Fetch navigation menu structure
 * @returns {Promise<array>} - Hierarchical navigation menu
 */
export const fetchNavigationMenu = async () => {
  try {
    console.log('🔄 fetchNavigationMenu called');
    const response = await apiFetch('navigation.php');
    console.log('✅ Navigation menu loaded:', response.data.length, 'main items');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching navigation menu:', error);
    throw error;
  }
};

// ============================================
// FOOTER
// ============================================
/**
 * Fetch footer sections
 * @returns {Promise<array>} - Array of footer sections with links
 */
export const fetchFooterSections = async () => {
  try {
    console.log('🔄 fetchFooterSections called');
    const response = await apiFetch('footer.php');
    console.log('✅ Footer sections loaded:', response.data.length, 'sections');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching footer sections:', error);
    throw error;
  }
};

// ============================================
// VIRTUAL TOUR
// ============================================
/**
 * Fetch virtual tours
 * @returns {Promise<array>} - Array of virtual tours
 */
export const fetchVirtualTours = async () => {
  try {
    console.log('🔄 fetchVirtualTours called');
    const response = await apiFetch('virtual-tour.php');
    console.log('✅ Virtual tours loaded:', response.data.length, 'tours');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching virtual tours:', error);
    throw error;
  }
};

// ============================================
// Export all functions
// ============================================

export default {
  fetchHeroSlides,
  submitContactForm,
  fetchCourses,
  fetchGalleryImages,
  fetchGalleryCategories,
  fetchBoardMembers,
  fetchPlacementRecords,
  fetchRecruiters,
  fetchPlacementFAQs,
  fetchBlogPosts,
  fetchBlogPost,
  fetchBlogDetails,
  fetchStatistics,
  fetchAwards,
  fetchAffiliations,
  fetchInfrastructure,
  fetchFacilityDetails,
  fetchCommitments,
  fetchTopHeaderLinks,
  fetchAboutSection,
  fetchWhyChooseUs,
  fetchProgressHighlights,
  fetchJourneyMessage,
  fetchPlacementPolicy,
  fetchNavigationMenu,
  fetchFooterSections,
  fetchVirtualTours,
};

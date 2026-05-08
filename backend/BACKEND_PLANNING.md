# Brahma Valley - Backend Planning Document

## 📋 Executive Summary

This document provides a comprehensive analysis of the React frontend and maps out the required backend infrastructure, database schema, and API endpoints needed to transform static content into a dynamic, database-driven application.

---

## 🎯 Project Analysis Overview

### Current State
- **Frontend Framework**: React + Vite
- **Routing**: React Router DOM
- **Content Type**: Mostly static (hardcoded arrays and objects)
- **Forms**: Contact form (currently mock submission)
- **Images**: Static files in public folder

### Target State
- **Backend**: PHP + MySQL
- **API Architecture**: RESTful APIs
- **Content Management**: Database-driven dynamic content
- **File Management**: Upload system for images and documents
- **Admin Panel**: (Future consideration)

---

## 📊 Frontend Analysis & Backend Mapping

### 1. **HOME PAGE** (`/`)

#### Components Analyzed:
- `Hero.jsx` - Hero slider with 3 slides
- `BlogSection.jsx` - Blog posts display (3 posts)
- `ContactSection.jsx` - Contact form with info
- `GallerySection.jsx` - Image gallery with categories
- `CampusPlacements.jsx` - Placement highlights
- `AboutSection.jsx` - About content
- `ProgramsSection.jsx` - Programs overview

#### Dynamic Sections Identified:

**A. Hero Slider**
- **Current**: 3 hardcoded slides with image, tag, headline, highlight, sub
- **Needs**: Database storage for dynamic slide management
- **Admin Need**: Add/Edit/Delete/Reorder slides

**B. Blog Posts**
- **Current**: 3 hardcoded blog posts
- **Needs**: Full blog management system
- **Features**: Title, excerpt, author, date, category, featured image, full content

**C. Contact Form**
- **Current**: Mock submission (no backend)
- **Needs**: Form submission storage, email notification
- **Fields**: Name, Email, Subject, Message

**D. Gallery**
- **Current**: Hardcoded images by category
- **Needs**: Dynamic image upload and categorization
- **Categories**: Brahmautsav, Events, Sports, Festivals

**E. Statistics**
- **Current**: Hardcoded stats (25+ Years, 15K+ Alumni, etc.)
- **Needs**: Editable statistics from database

---

### 2. **ABOUT US SECTION**

#### Pages Analyzed:
- `Overview.jsx` - About content
- `BoardOfTrusties.jsx` - Board members (7 members)
- `Affilations.jsx` - Affiliations list
- `Awards.jsx` - Awards and achievements
- `ProgressHighlight.jsx` - Progress milestones

#### Dynamic Sections Identified:

**A. Board of Trustees**
- **Current**: 7 hardcoded board members
- **Data Structure**: id, name, role, image
- **Needs**: CRUD operations for board members
- **Features**: Photo upload, name, designation, bio (optional)

**B. Affiliations**
- **Current**: Static content
- **Needs**: List of affiliated organizations with logos
- **Features**: Organization name, logo, description, link

**C. Awards & Achievements**
- **Current**: Static content
- **Needs**: Timeline of awards with images
- **Features**: Award name, date, description, certificate image

**D. Progress Highlights**
- **Current**: Static milestones
- **Needs**: Year-wise progress tracking
- **Features**: Year, milestone title, description, image

---

### 3. **COURSES PAGE** (`/courses`)

#### Analysis:
- **Current**: Empty array `coursesData = []`
- **Structure**: Comprehensive filtering system already built
- **Filter Categories**: Level, Duration, Campus, Institution

#### Dynamic Sections Identified:

**A. Courses/Programs**
- **Current**: Empty - ready for backend integration
- **Data Structure**: id, name, level, duration, campus, institution
- **Needs**: Complete course catalog management
- **Features**: 
  - Course name, code, level (UG/PG/Diploma/School)
  - Duration, campus location, institution
  - Description, eligibility, fees, syllabus
  - Brochure upload

**Suggested Course Levels**:
- UG (Undergraduate)
- PG (Postgraduate)
- Diploma
- School
- Junior College

---

### 4. **EVENTS/LIFE @BV** (`/life-at-bv/:slug`)

#### Analysis:
- **Current**: 4 categories with hardcoded images
- **Categories**: brahmautsav, events, sports, festival
- **Structure**: Category-based image gallery with lightbox

#### Dynamic Sections Identified:

**A. Event Categories**
- **Current**: 4 hardcoded categories
- **Needs**: Dynamic category management
- **Features**: Category name, slug, description, cover image

**B. Event Gallery Images**
- **Current**: Hardcoded image paths
- **Needs**: Image upload system with categorization
- **Features**: 
  - Image upload (multiple)
  - Category assignment
  - Caption/description
  - Date of event
  - Photographer credit (optional)

---

### 5. **PLACEMENT SECTION** (`/placement/*`)

#### Pages Analyzed:
- `Overview.jsx` - Placement overview
- `PlacementRecord.jsx` - Empty placement data table
- `OurRecruiters.jsx` - Empty recruiters list
- `FAQ.jsx` - Empty FAQ section
- `PlacementPolicy.jsx` - Static policy content

#### Dynamic Sections Identified:

**A. Placement Records**
- **Current**: Empty array with table structure ready
- **Table Columns**: Campus, Year, Average Package, Highest Package, No. of Students
- **Needs**: Year-wise placement statistics
- **Features**: 
  - Institution/Campus name
  - Academic year
  - Placement statistics
  - Company-wise breakdown (optional)

**B. Our Recruiters**
- **Current**: "No recruiters found" message
- **Needs**: Recruiter company showcase
- **Features**: 
  - Company name
  - Company logo
  - Industry sector
  - Website link
  - Recruitment year

**C. Placement FAQ**
- **Current**: Empty section
- **Needs**: FAQ management system
- **Features**: 
  - Question
  - Answer (rich text)
  - Category (Eligibility, Process, Training, etc.)
  - Display order

---

### 6. **FACILITIES** (`/facilities/:slug`)

#### Analysis:
- **Current**: Uses `facilitiesData` from data file
- **Categories**: Medical, Transport, Hostel, Academic, etc.
- **Structure**: Navigation + detailed content per facility

#### Dynamic Sections Identified:

**A. Facility Categories**
- **Needs**: Facility type management
- **Features**: 
  - Facility name, slug
  - Description
  - Key points (bullet list)
  - Images (multiple)
  - Contact info (if applicable)

---

### 7. **JOURNEY/MESSAGES** (`/journey/:slug`)

#### Analysis:
- **Current**: Uses `journeyBySlug` data
- **Leaders**: President, Principal, Director messages
- **Structure**: Profile + message content

#### Dynamic Sections Identified:

**A. Leadership Messages**
- **Needs**: Message management for leadership
- **Features**: 
  - Name, designation, organization
  - Profile photo
  - Message title
  - Message content (multiple paragraphs)
  - Display order

---

### 8. **INFRASTRUCTURE** (`/infrastructure`)

#### Analysis:
- **Current**: Static page
- **Needs**: Infrastructure showcase with images

#### Dynamic Sections Identified:

**A. Infrastructure Items**
- **Features**: 
  - Item name (Library, Labs, Auditorium, etc.)
  - Description
  - Specifications
  - Image gallery
  - Capacity/Area details

---

## 🗄️ DATABASE SCHEMA DESIGN

### Table 1: `hero_slides`
```sql
CREATE TABLE hero_slides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    tag VARCHAR(100),
    headline VARCHAR(255) NOT NULL,
    highlight VARCHAR(255) NOT NULL,
    subtitle TEXT,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 2: `blog_posts`
```sql
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_name VARCHAR(100) NOT NULL,
    author_avatar VARCHAR(255),
    category VARCHAR(100),
    published_date DATE,
    is_published TINYINT(1) DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 3: `contact_submissions`
```sql
CREATE TABLE contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    replied_at TIMESTAMP NULL
);
```

### Table 4: `board_members`
```sql
CREATE TABLE board_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    bio TEXT,
    email VARCHAR(150),
    phone VARCHAR(20),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 5: `courses`
```sql
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    level ENUM('UG', 'PG', 'Diploma', 'School', 'Junior College') NOT NULL,
    duration VARCHAR(50) NOT NULL,
    campus VARCHAR(150) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    description TEXT,
    eligibility TEXT,
    fees DECIMAL(10,2),
    brochure_url VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 6: `gallery_categories`
```sql
CREATE TABLE gallery_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 7: `gallery_images`
```sql
CREATE TABLE gallery_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    event_date DATE,
    photographer VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES gallery_categories(id) ON DELETE CASCADE
);
```

### Table 8: `placement_records`
```sql
CREATE TABLE placement_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campus_name VARCHAR(255) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    average_package DECIMAL(10,2),
    highest_package DECIMAL(10,2),
    total_students INT,
    students_placed INT,
    placement_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 9: `recruiters`
```sql
CREATE TABLE recruiters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(200) NOT NULL,
    logo VARCHAR(255),
    industry_sector VARCHAR(100),
    website_url VARCHAR(255),
    recruitment_year VARCHAR(20),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 10: `placement_faqs`
```sql
CREATE TABLE placement_faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 11: `facilities`
```sql
CREATE TABLE facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    nav_label VARCHAR(100) NOT NULL,
    kicker VARCHAR(255),
    description TEXT NOT NULL,
    image VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 12: `facility_points`
```sql
CREATE TABLE facility_points (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id INT NOT NULL,
    point_text TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE
);
```

### Table 13: `leadership_messages`
```sql
CREATE TABLE leadership_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    nav_label VARCHAR(100) NOT NULL,
    page_title VARCHAR(200) NOT NULL,
    name VARCHAR(150) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    organization VARCHAR(255),
    image VARCHAR(255),
    intro_title VARCHAR(255),
    message_content LONGTEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 14: `affiliations`
```sql
CREATE TABLE affiliations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_name VARCHAR(200) NOT NULL,
    logo VARCHAR(255),
    description TEXT,
    website_url VARCHAR(255),
    affiliation_date DATE,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 15: `awards`
```sql
CREATE TABLE awards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    award_name VARCHAR(255) NOT NULL,
    award_date DATE,
    description TEXT,
    certificate_image VARCHAR(255),
    awarded_by VARCHAR(200),
    category VARCHAR(100),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 16: `statistics`
```sql
CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stat_key VARCHAR(100) UNIQUE NOT NULL,
    stat_value VARCHAR(50) NOT NULL,
    stat_label VARCHAR(150) NOT NULL,
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Table 17: `infrastructure_items`
```sql
CREATE TABLE infrastructure_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(200) NOT NULL,
    description TEXT,
    specifications TEXT,
    capacity VARCHAR(100),
    area VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table 18: `infrastructure_images`
```sql
CREATE TABLE infrastructure_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    infrastructure_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    display_order INT DEFAULT 0,
    FOREIGN KEY (infrastructure_id) REFERENCES infrastructure_items(id) ON DELETE CASCADE
);
```

---

## 🔌 API ENDPOINTS REQUIRED

### **1. Hero Slider APIs**
```
GET    /api/hero-slides.php              - Get all active slides
GET    /api/hero-slides.php?id={id}      - Get single slide
POST   /api/hero-slides.php              - Create new slide (Admin)
PUT    /api/hero-slides.php?id={id}      - Update slide (Admin)
DELETE /api/hero-slides.php?id={id}      - Delete slide (Admin)
```

### **2. Blog APIs**
```
GET    /api/blogs.php                    - Get all published blogs
GET    /api/blogs.php?slug={slug}        - Get single blog by slug
GET    /api/blogs.php?category={cat}     - Get blogs by category
POST   /api/blogs.php                    - Create blog (Admin)
PUT    /api/blogs.php?id={id}            - Update blog (Admin)
DELETE /api/blogs.php?id={id}            - Delete blog (Admin)
```

### **3. Contact Form API**
```
POST   /api/contact.php                  - Submit contact form
GET    /api/contact.php                  - Get all submissions (Admin)
PUT    /api/contact.php?id={id}          - Update status (Admin)
```

### **4. Board Members APIs**
```
GET    /api/board-members.php            - Get all active members
POST   /api/board-members.php            - Create member (Admin)
PUT    /api/board-members.php?id={id}    - Update member (Admin)
DELETE /api/board-members.php?id={id}    - Delete member (Admin)
```

### **5. Courses APIs**
```
GET    /api/courses.php                  - Get all active courses
GET    /api/courses.php?level={level}    - Filter by level
GET    /api/courses.php?campus={campus}  - Filter by campus
POST   /api/courses.php                  - Create course (Admin)
PUT    /api/courses.php?id={id}          - Update course (Admin)
DELETE /api/courses.php?id={id}          - Delete course (Admin)
```

### **6. Gallery APIs**
```
GET    /api/gallery-categories.php       - Get all categories
GET    /api/gallery-images.php?category={slug} - Get images by category
POST   /api/gallery-images.php           - Upload images (Admin)
DELETE /api/gallery-images.php?id={id}   - Delete image (Admin)
```

### **7. Placement APIs**
```
GET    /api/placement-records.php        - Get all placement records
GET    /api/recruiters.php               - Get all recruiters
GET    /api/placement-faqs.php           - Get all FAQs
POST   /api/placement-records.php        - Create record (Admin)
POST   /api/recruiters.php               - Add recruiter (Admin)
POST   /api/placement-faqs.php           - Add FAQ (Admin)
```

### **8. Facilities APIs**
```
GET    /api/facilities.php               - Get all facilities
GET    /api/facilities.php?slug={slug}   - Get facility by slug
POST   /api/facilities.php               - Create facility (Admin)
PUT    /api/facilities.php?id={id}       - Update facility (Admin)
```

### **9. Leadership Messages APIs**
```
GET    /api/leadership.php               - Get all messages
GET    /api/leadership.php?slug={slug}   - Get message by slug
POST   /api/leadership.php               - Create message (Admin)
PUT    /api/leadership.php?id={id}       - Update message (Admin)
```

### **10. Affiliations & Awards APIs**
```
GET    /api/affiliations.php             - Get all affiliations
GET    /api/awards.php                   - Get all awards
POST   /api/affiliations.php             - Add affiliation (Admin)
POST   /api/awards.php                   - Add award (Admin)
```

### **11. Statistics API**
```
GET    /api/statistics.php               - Get all statistics
PUT    /api/statistics.php?key={key}     - Update statistic (Admin)
```

### **12. Infrastructure APIs**
```
GET    /api/infrastructure.php           - Get all infrastructure items
GET    /api/infrastructure.php?id={id}   - Get single item with images
POST   /api/infrastructure.php           - Create item (Admin)
```

### **13. File Upload API**
```
POST   /api/upload.php                   - Upload files (images, PDFs)
```

---

## 📁 CONTENT CLASSIFICATION

### **Static Content (No Backend Needed)**
- Header/Footer navigation
- About Us overview text (unless you want it editable)
- Placement policy text
- Terms & Conditions
- Privacy Policy

### **Dynamic Content (Backend Required)**
✅ Hero slider
✅ Blog posts
✅ Contact form submissions
✅ Board members
✅ Courses catalog
✅ Event galleries
✅ Placement records
✅ Recruiters list
✅ Placement FAQs
✅ Facilities
✅ Leadership messages
✅ Affiliations
✅ Awards
✅ Statistics
✅ Infrastructure

---

## 🎨 FORMS REQUIRING BACKEND

### 1. **Contact Form** (Home Page)
- **Fields**: Name, Email, Subject, Message
- **Action**: Store in database + Send email notification
- **Validation**: Required fields, email format
- **Response**: Success/Error message

### 2. **Future Forms** (Recommendations)
- Admission Inquiry Form
- Placement Registration Form
- Alumni Registration Form
- Feedback Form
- Newsletter Subscription

---

## 🔐 SECURITY CONSIDERATIONS

### Input Validation
- Sanitize all user inputs
- Validate email formats
- Prevent SQL injection (use prepared statements)
- Prevent XSS attacks

### File Upload Security
- Validate file types (images, PDFs only)
- Limit file sizes
- Rename uploaded files
- Store outside public directory when possible
- Scan for malware (if possible)

### API Security
- Implement CORS properly
- Rate limiting for contact form
- Admin authentication for write operations
- Use HTTPS in production

---

## 📈 IMPLEMENTATION PRIORITY

### **Phase 1: Essential (High Priority)**
1. Contact form submission
2. Courses catalog
3. Gallery images
4. Board members
5. Placement records

### **Phase 2: Important (Medium Priority)**
6. Blog system
7. Hero slider
8. Recruiters
9. Placement FAQs
10. Facilities

### **Phase 3: Enhancement (Low Priority)**
11. Leadership messages
12. Affiliations
13. Awards
14. Statistics
15. Infrastructure

---

## 🚀 NEXT STEPS

1. ✅ Backend folder structure created
2. ✅ Database connection configured
3. ⏳ Create database tables (SQL scripts)
4. ⏳ Build API endpoints (start with Phase 1)
5. ⏳ Implement file upload system
6. ⏳ Test APIs with Postman
7. ⏳ Integrate APIs with React frontend
8. ⏳ Build admin panel (optional)

---

## 📝 NOTES

- All timestamps use MySQL TIMESTAMP type
- All active/inactive flags use TINYINT(1)
- Foreign keys use ON DELETE CASCADE for automatic cleanup
- Display order fields allow manual sorting
- Image paths store relative paths from uploads folder
- Slugs are used for SEO-friendly URLs

---

## 🤝 RECOMMENDATIONS

1. **Admin Panel**: Consider building a simple admin panel for content management
2. **Authentication**: Implement JWT or session-based auth for admin APIs
3. **Caching**: Use caching for frequently accessed data (courses, galleries)
4. **Image Optimization**: Compress images before storing
5. **Backup**: Regular database backups
6. **Logging**: Log all admin actions and errors
7. **Email Service**: Use PHPMailer for contact form emails
8. **Search**: Implement search functionality for courses and blogs
9. **Pagination**: Add pagination for large datasets
10. **API Documentation**: Document all APIs with examples

---

**Document Version**: 1.0  
**Created**: May 7, 2026  
**Last Updated**: May 7, 2026  
**Status**: Ready for Implementation

# 📊 Complete API Requirements for Brahma Valley Frontend

## 🎯 Goal
Transform the entire React frontend from **static hardcoded data** to **dynamic database-driven content**.

**Database**: `brahmavalley_db` (Already created in phpMyAdmin)  
**Backend**: PHP + MySQL  
**Frontend**: React + Vite

---

## 📈 TOTAL API COUNT: **25 APIs**

### Breakdown by Priority:

| Priority | APIs | Status |
|----------|------|--------|
| **Phase 1 (Critical)** | 8 APIs | 1 Done, 7 Pending |
| **Phase 2 (Important)** | 10 APIs | 0 Done, 10 Pending |
| **Phase 3 (Enhancement)** | 7 APIs | 0 Done, 7 Pending |
| **TOTAL** | **25 APIs** | **1 Done, 24 Pending** |

---

## 🔥 PHASE 1: CRITICAL APIs (8 APIs)

### ✅ 1. Hero Slider API
- **File**: `backend/api/hero-slides.php`
- **Status**: ✅ **COMPLETED**
- **Method**: GET
- **Frontend**: `src/pages/Home/components/Hero.jsx`
- **Data**: 3 slides (image, tag, headline, highlight, subtitle)
- **Table**: `hero_slides`

### ⏳ 2. Contact Form Submission API
- **File**: `backend/api/contact.php`
- **Status**: ⏳ Pending
- **Method**: POST
- **Frontend**: `src/pages/Home/components/ContactSection.jsx`
- **Data**: name, email, subject, message
- **Table**: `contact_submissions`
- **Priority**: HIGH (Form currently doesn't work)

### ⏳ 3. Courses Catalog API
- **File**: `backend/api/courses.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Courses.jsx`
- **Data**: Empty array - ready for backend
- **Table**: `courses`
- **Filters**: level, duration, campus, institution
- **Priority**: HIGH (Page shows "No courses available")

### ⏳ 4. Gallery Categories API
- **File**: `backend/api/gallery-categories.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Events.jsx`
- **Data**: 4 categories (Brahmautsav, Events, Sports, Festival)
- **Table**: `gallery_categories`

### ⏳ 5. Gallery Images API
- **File**: `backend/api/gallery-images.php`
- **Status**: ⏳ Pending
- **Method**: GET (with category filter)
- **Frontend**: `src/pages/Events.jsx`, `src/pages/Home/components/GallerySection.jsx`
- **Data**: 50+ hardcoded images
- **Table**: `gallery_images`
- **Query**: `?category=brahmautsav`

### ⏳ 6. Board Members API
- **File**: `backend/api/board-members.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/AboutUs/BoardOfTrusties.jsx`
- **Data**: 7 board members (name, role, image)
- **Table**: `board_members`

### ⏳ 7. Placement Records API
- **File**: `backend/api/placement-records.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Placement/PlacementRecord.jsx`
- **Data**: Empty array - table structure ready
- **Table**: `placement_records`
- **Priority**: HIGH (Shows "No placement records found")

### ⏳ 8. Recruiters API
- **File**: `backend/api/recruiters.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Placement/OurRecruiters.jsx`
- **Data**: Empty - shows "No recruiters found"
- **Table**: `recruiters`

---

## 📌 PHASE 2: IMPORTANT APIs (10 APIs)

### ⏳ 9. Blog Posts API
- **File**: `backend/api/blogs.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Home/components/BlogSection.jsx`
- **Data**: 3 hardcoded blog posts
- **Table**: `blog_posts`

### ⏳ 10. Blog Single Post API
- **File**: `backend/api/blogs.php?slug={slug}`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: Future blog detail page
- **Table**: `blog_posts`

### ⏳ 11. Placement FAQs API
- **File**: `backend/api/placement-faqs.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Placement/FAQ.jsx`
- **Data**: Empty - shows "FREQUENTLY ASKED QUESTIONS"
- **Table**: `placement_faqs`

### ⏳ 12. Facilities List API
- **File**: `backend/api/facilities.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/components/Facilities.jsx`
- **Data**: Uses `facilitiesData` from data file
- **Table**: `facilities`

### ⏳ 13. Facility Details API
- **File**: `backend/api/facilities.php?slug={slug}`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/components/Facilities.jsx`
- **Table**: `facilities` + `facility_points`

### ⏳ 14. Leadership Messages List API
- **File**: `backend/api/leadership.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/components/Journey.jsx`
- **Data**: Uses `journeyLeaders` from data file
- **Table**: `leadership_messages`

### ⏳ 15. Leadership Message Details API
- **File**: `backend/api/leadership.php?slug={slug}`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/components/Journey.jsx`
- **Table**: `leadership_messages`

### ⏳ 16. Affiliations API
- **File**: `backend/api/affiliations.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/AboutUs/Affilations.jsx`
- **Data**: Static content currently
- **Table**: `affiliations`

### ⏳ 17. Awards API
- **File**: `backend/api/awards.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/AboutUs/Awards.jsx`
- **Data**: Static content currently
- **Table**: `awards`

### ⏳ 18. Statistics API
- **File**: `backend/api/statistics.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Home/components/Hero.jsx` (stats section)
- **Data**: 4 hardcoded stats (25+ Years, 15K+ Alumni, etc.)
- **Table**: `statistics`

---

## 🎨 PHASE 3: ENHANCEMENT APIs (7 APIs)

### ⏳ 19. Infrastructure Items API
- **File**: `backend/api/infrastructure.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Infrastructure.jsx`
- **Data**: Static page currently
- **Table**: `infrastructure_items`

### ⏳ 20. Infrastructure Images API
- **File**: `backend/api/infrastructure-images.php?id={id}`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Infrastructure.jsx`
- **Table**: `infrastructure_images`

### ⏳ 21. Progress Highlights API
- **File**: `backend/api/progress-highlights.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/AboutUs/ProgressHighlight.jsx`
- **Data**: Static content currently
- **Table**: `progress_highlights`

### ⏳ 22. Campus Placements API
- **File**: `backend/api/campus-placements.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Home/components/CampusPlacements.jsx`
- **Data**: Hardcoded placement highlights
- **Table**: `placement_highlights`

### ⏳ 23. Programs Section API
- **File**: `backend/api/programs.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Home/components/ProgramsSection.jsx`
- **Data**: Hardcoded programs overview
- **Table**: `programs_overview`

### ⏳ 24. About Section API
- **File**: `backend/api/about-section.php`
- **Status**: ⏳ Pending
- **Method**: GET
- **Frontend**: `src/pages/Home/components/AboutSection.jsx`
- **Data**: Static about content
- **Table**: `about_content`

### ⏳ 25. File Upload API
- **File**: `backend/api/upload.php`
- **Status**: ⏳ Pending
- **Method**: POST
- **Purpose**: Upload images, PDFs, documents
- **Used By**: Admin panel (future)
- **Storage**: `backend/uploads/`

---

## 📊 API Summary by Frontend Page

### Home Page (`/`)
1. ✅ Hero Slider API
2. ⏳ Blog Posts API
3. ⏳ Contact Form API
4. ⏳ Gallery Images API (preview)
5. ⏳ Statistics API
6. ⏳ Campus Placements API
7. ⏳ Programs Section API
8. ⏳ About Section API

**Total**: 8 APIs

### Courses Page (`/courses`)
9. ⏳ Courses Catalog API

**Total**: 1 API

### Events/Life @BV (`/life-at-bv/:slug`)
10. ⏳ Gallery Categories API
11. ⏳ Gallery Images API

**Total**: 2 APIs

### About Us Section
12. ⏳ Board Members API
13. ⏳ Affiliations API
14. ⏳ Awards API
15. ⏳ Progress Highlights API

**Total**: 4 APIs

### Placement Section
16. ⏳ Placement Records API
17. ⏳ Recruiters API
18. ⏳ Placement FAQs API

**Total**: 3 APIs

### Facilities (`/facilities/:slug`)
19. ⏳ Facilities List API
20. ⏳ Facility Details API

**Total**: 2 APIs

### Journey/Leadership (`/journey/:slug`)
21. ⏳ Leadership Messages List API
22. ⏳ Leadership Message Details API

**Total**: 2 APIs

### Infrastructure (`/infrastructure`)
23. ⏳ Infrastructure Items API
24. ⏳ Infrastructure Images API

**Total**: 2 APIs

### Utility
25. ⏳ File Upload API

**Total**: 1 API

---

## 🎯 Implementation Roadmap

### Week 1: Phase 1 (Critical) - 8 APIs
- ✅ Day 1: Hero Slider (DONE)
- ⏳ Day 2: Contact Form + Courses
- ⏳ Day 3: Gallery (Categories + Images)
- ⏳ Day 4: Board Members + Placement Records
- ⏳ Day 5: Recruiters + Testing

### Week 2: Phase 2 (Important) - 10 APIs
- ⏳ Day 1-2: Blog System (List + Single)
- ⏳ Day 3: Placement FAQs
- ⏳ Day 4: Facilities (List + Details)
- ⏳ Day 5: Leadership Messages (List + Details)
- ⏳ Day 6: Affiliations + Awards
- ⏳ Day 7: Statistics + Testing

### Week 3: Phase 3 (Enhancement) - 7 APIs
- ⏳ Day 1: Infrastructure (Items + Images)
- ⏳ Day 2: Progress Highlights
- ⏳ Day 3: Campus Placements + Programs
- ⏳ Day 4: About Section
- ⏳ Day 5: File Upload API
- ⏳ Day 6-7: Complete Testing + Bug Fixes

---

## 📁 Backend Folder Structure

```
backend/
├── config/
│   └── db.php                          ✅ Done
├── api/
│   ├── hero-slides.php                 ✅ Done
│   ├── contact.php                     ⏳ Pending
│   ├── courses.php                     ⏳ Pending
│   ├── gallery-categories.php          ⏳ Pending
│   ├── gallery-images.php              ⏳ Pending
│   ├── board-members.php               ⏳ Pending
│   ├── placement-records.php           ⏳ Pending
│   ├── recruiters.php                  ⏳ Pending
│   ├── blogs.php                       ⏳ Pending
│   ├── placement-faqs.php              ⏳ Pending
│   ├── facilities.php                  ⏳ Pending
│   ├── leadership.php                  ⏳ Pending
│   ├── affiliations.php                ⏳ Pending
│   ├── awards.php                      ⏳ Pending
│   ├── statistics.php                  ⏳ Pending
│   ├── infrastructure.php              ⏳ Pending
│   ├── infrastructure-images.php       ⏳ Pending
│   ├── progress-highlights.php         ⏳ Pending
│   ├── campus-placements.php           ⏳ Pending
│   ├── programs.php                    ⏳ Pending
│   ├── about-section.php               ⏳ Pending
│   └── upload.php                      ⏳ Pending
├── database/
│   ├── hero_slides.sql                 ✅ Done
│   ├── contact_submissions.sql         ⏳ Pending
│   ├── courses.sql                     ⏳ Pending
│   ├── gallery.sql                     ⏳ Pending
│   ├── board_members.sql               ⏳ Pending
│   ├── placement.sql                   ⏳ Pending
│   ├── blogs.sql                       ⏳ Pending
│   ├── facilities.sql                  ⏳ Pending
│   ├── leadership.sql                  ⏳ Pending
│   ├── affiliations_awards.sql         ⏳ Pending
│   ├── statistics.sql                  ⏳ Pending
│   ├── infrastructure.sql              ⏳ Pending
│   └── README.md                       ✅ Done
└── uploads/                            ✅ Done (folder exists)
```

---

## 🔢 Statistics

- **Total APIs Needed**: 25
- **Completed**: 1 (4%)
- **Remaining**: 24 (96%)
- **Database Tables**: 18
- **Frontend Pages**: 15+
- **Dynamic Sections**: 30+

---

## 🎯 Current Status

### ✅ Completed (1/25)
1. Hero Slider API

### 🔥 Next Priority (Recommended Order)
2. Contact Form API (Form doesn't work)
3. Courses API (Page is empty)
4. Gallery APIs (50+ hardcoded images)
5. Board Members API (7 hardcoded members)
6. Placement Records API (Empty table)

---

## 💡 Recommendations

1. **Start with Phase 1** - These are critical user-facing features
2. **Test Each API** - Use Postman or browser before frontend integration
3. **One API at a Time** - Complete database → API → frontend for each
4. **Keep Fallbacks** - Always have fallback data if API fails
5. **Document Everything** - Update this file as you complete APIs

---

**Last Updated**: May 7, 2026  
**Next API to Build**: Contact Form (after Hero Slider integration)

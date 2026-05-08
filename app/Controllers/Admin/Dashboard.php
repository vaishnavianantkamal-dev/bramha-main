<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\BlogModel;
use App\Models\CourseModel;
use App\Models\HeroSliderModel;
use CodeIgniter\API\ResponseTrait;

class Dashboard extends BaseController
{
    use ResponseTrait;

    // --- BLOGS CRUD ---

    public function getBlogs()
    {
        $model = new BlogModel();
        return $this->respond(["success" => true, "data" => $model->findAll()]);
    }

    public function saveBlog()
    {
        $model = new BlogModel();
        $data = $this->request->getJSON(true);
        
        if (isset($data['id'])) {
            $model->update($data['id'], $data);
            $message = "Blog updated successfully";
        } else {
            $model->insert($data);
            $message = "Blog created successfully";
        }

        return $this->respond(["success" => true, "message" => $message]);
    }

    public function deleteBlog($id)
    {
        $model = new BlogModel();
        $model->delete($id);
        return $this->respond(["success" => true, "message" => "Blog deleted successfully"]);
    }

    // --- COURSES CRUD ---

    public function getCourses()
    {
        $model = new CourseModel();
        return $this->respond(["success" => true, "data" => $model->findAll()]);
    }

    public function saveCourse()
    {
        $model = new CourseModel();
        $data = $this->request->getJSON(true);

        if (isset($data['id'])) {
            $model->update($data['id'], $data);
            $message = "Course updated successfully";
        } else {
            $model->insert($data);
            $message = "Course created successfully";
        }

        return $this->respond(["success" => true, "message" => $message]);
    }

    public function deleteCourse($id)
    {
        $model = new CourseModel();
        $model->delete($id);
        return $this->respond(["success" => true, "message" => "Course deleted successfully"]);
    }

    // --- HERO SLIDES CRUD ---

    public function getHeroSlides()
    {
        $model = new HeroSliderModel();
        return $this->respond(["success" => true, "data" => $model->findAll()]);
    }

    public function saveHeroSlide()
    {
        $model = new HeroSliderModel();
        $data = $this->request->getJSON(true);

        if (isset($data['id'])) {
            $model->update($data['id'], $data);
            $message = "Slide updated successfully";
        } else {
            $model->insert($data);
            $message = "Slide created successfully";
        }

        return $this->respond(["success" => true, "message" => $message]);
    }

    public function deleteHeroSlide($id)
    {
        $model = new HeroSliderModel();
        $model->delete($id);
        return $this->respond(["success" => true, "message" => "Slide deleted successfully"]);
    }

    // --- GALLERY CRUD ---

    public function getGalleryCategories()
    {
        return $this->respond(["success" => true, "data" => (new \App\Models\GalleryCategoryModel())->findAll()]);
    }

    public function saveGalleryCategory()
    {
        $model = new \App\Models\GalleryCategoryModel();
        $data = $this->request->getJSON(true);
        if (isset($data['id'])) { $model->update($data['id'], $data); $msg = "Category updated"; }
        else { $model->insert($data); $msg = "Category created"; }
        return $this->respond(["success" => true, "message" => $msg]);
    }

    public function deleteGalleryCategory($id)
    {
        (new \App\Models\GalleryCategoryModel())->delete($id);
        return $this->respond(["success" => true, "message" => "Category deleted"]);
    }

    // --- BOARD MEMBERS CRUD ---

    public function getBoardMembers()
    {
        return $this->respond(["success" => true, "data" => (new \App\Models\BoardMemberModel())->findAll()]);
    }

    public function saveBoardMember()
    {
        $model = new \App\Models\BoardMemberModel();
        $data = $this->request->getJSON(true);
        if (isset($data['id'])) { $model->update($data['id'], $data); $msg = "Member updated"; }
        else { $model->insert($data); $msg = "Member created"; }
        return $this->respond(["success" => true, "message" => $msg]);
    }

    public function deleteBoardMember($id)
    {
        (new \App\Models\BoardMemberModel())->delete($id);
        return $this->respond(["success" => true, "message" => "Member deleted"]);
    }

    // --- LEADERSHIP CRUD ---

    public function getLeadership()
    {
        return $this->respond(["success" => true, "data" => (new \App\Models\LeadershipModel())->findAll()]);
    }

    public function saveLeadership()
    {
        $model = new \App\Models\LeadershipModel();
        $data = $this->request->getJSON(true);
        if (isset($data['id'])) { $model->update($data['id'], $data); $msg = "Leadership updated"; }
        else { $model->insert($data); $msg = "Leadership created"; }
        return $this->respond(["success" => true, "message" => $msg]);
    }

    public function deleteLeadership($id)
    {
        (new \App\Models\LeadershipModel())->delete($id);
        return $this->respond(["success" => true, "message" => "Leadership deleted"]);
    }

    // --- FACILITIES CRUD ---

    public function getFacilities()
    {
        return $this->respond(["success" => true, "data" => (new \App\Models\FacilityModel())->findAll()]);
    }

    public function saveFacility()
    {
        $model = new \App\Models\FacilityModel();
        $data = $this->request->getJSON(true);
        if (isset($data['id'])) { $model->update($data['id'], $data); $msg = "Facility updated"; }
        else { $model->insert($data); $msg = "Facility created"; }
        return $this->respond(["success" => true, "message" => $msg]);
    }

    public function deleteFacility($id)
    {
        (new \App\Models\FacilityModel())->delete($id);
        return $this->respond(["success" => true, "message" => "Facility deleted"]);
    }

    // --- STATISTICS CRUD ---

    public function getStatistics()
    {
        return $this->respond(["success" => true, "data" => (new \App\Models\StatisticModel())->findAll()]);
    }

    public function saveStatistic()
    {
        $model = new \App\Models\StatisticModel();
        $data = $this->request->getJSON(true);
        if (isset($data['id'])) { $model->update($data['id'], $data); $msg = "Stat updated"; }
        else { $model->insert($data); $msg = "Stat created"; }
        return $this->respond(["success" => true, "message" => $msg]);
    }
}

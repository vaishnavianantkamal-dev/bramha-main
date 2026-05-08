<?php

namespace App\Controllers;

use App\Models\CourseModel;
use CodeIgniter\API\ResponseTrait;

class Course extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new CourseModel();
        
        $filters = [
            'level' => $this->request->getGet('level'),
            'campus' => $this->request->getGet('campus'),
            'institution' => $this->request->getGet('institution')
        ];

        $courses = $model->getFilteredCourses($filters);

        return $this->respond([
            "success" => true,
            "data" => $courses
        ]);
    }
}

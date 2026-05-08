<?php

namespace App\Models;

use CodeIgniter\Model;

class CourseModel extends Model
{
    protected $table            = 'courses';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = [
        'name', 'code', 'description', 'duration', 'level', 'campus', 'institution', 'eligibility', 'fees', 'brochure_url', 'is_active'
    ];

    protected $useTimestamps = true;

    public function getFilteredCourses($filters = [])
    {
        $builder = $this->where('is_active', 1);

        if (!empty($filters['level'])) {
            $builder->where('level', $filters['level']);
        }
        if (!empty($filters['campus'])) {
            $builder->where('campus', $filters['campus']);
        }
        if (!empty($filters['institution'])) {
            $builder->where('institution', $filters['institution']);
        }

        return $builder->findAll();
    }
}

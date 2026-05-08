<?php

namespace App\Models;

use CodeIgniter\Model;

class PlacementRecordModel extends Model
{
    protected $table            = 'placement_records';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['student_name', 'company_name', 'package', 'year', 'image', 'course_id'];
}

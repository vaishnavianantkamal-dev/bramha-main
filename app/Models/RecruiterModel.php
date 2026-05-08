<?php

namespace App\Models;

use CodeIgniter\Model;

class RecruiterModel extends Model
{
    protected $table            = 'recruiters';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['name', 'logo', 'website', 'is_active'];
}

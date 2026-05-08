<?php

namespace App\Models;

use CodeIgniter\Model;

class AwardModel extends Model
{
    protected $table            = 'awards';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['title', 'year', 'description', 'image', 'is_active'];
}

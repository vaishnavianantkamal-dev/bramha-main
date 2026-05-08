<?php

namespace App\Models;

use CodeIgniter\Model;

class InfrastructureModel extends Model
{
    protected $table            = 'infrastructure_sections';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['name', 'description', 'image', 'is_active'];
}

<?php

namespace App\Models;

use CodeIgniter\Model;

class LeadershipModel extends Model
{
    protected $table            = 'leadership_messages';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['name', 'role', 'slug', 'image', 'message', 'is_active'];
}

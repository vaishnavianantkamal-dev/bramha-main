<?php

namespace App\Models;

use CodeIgniter\Model;

class AffiliationModel extends Model
{
    protected $table            = 'affiliations';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['name', 'logo', 'description', 'is_active'];
}

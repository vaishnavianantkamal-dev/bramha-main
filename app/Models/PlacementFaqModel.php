<?php

namespace App\Models;

use CodeIgniter\Model;

class PlacementFaqModel extends Model
{
    protected $table            = 'placement_faqs';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['question', 'answer', 'display_order', 'is_active'];
}

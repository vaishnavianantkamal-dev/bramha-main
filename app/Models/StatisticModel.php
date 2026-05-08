<?php

namespace App\Models;

use CodeIgniter\Model;

class StatisticModel extends Model
{
    protected $table            = 'statistics';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['label', 'value', 'icon', 'display_order', 'is_active'];
}

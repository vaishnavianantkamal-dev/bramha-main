<?php

namespace App\Models;

use CodeIgniter\Model;

class BoardMemberModel extends Model
{
    protected $table            = 'board_members';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['name', 'role', 'image', 'bio', 'display_order', 'is_active'];
}

<?php

namespace App\Models;

use CodeIgniter\Model;

class GalleryCategoryModel extends Model
{
    protected $table            = 'gallery_categories';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['name', 'slug', 'description', 'image', 'is_active'];

    public function getActiveCategories()
    {
        return $this->where('is_active', 1)->findAll();
    }
}

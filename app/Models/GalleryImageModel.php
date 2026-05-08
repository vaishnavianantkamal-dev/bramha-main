<?php

namespace App\Models;

use CodeIgniter\Model;

class GalleryImageModel extends Model
{
    protected $table            = 'gallery_images';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['category_id', 'image', 'caption', 'is_active'];

    public function getImagesByCategory($categorySlug)
    {
        $db = \Config\Database::connect();
        return $this->select('gallery_images.*')
                    ->join('gallery_categories', 'gallery_categories.id = gallery_images.category_id')
                    ->where('gallery_categories.slug', $categorySlug)
                    ->where('gallery_images.is_active', 1)
                    ->findAll();
    }
}

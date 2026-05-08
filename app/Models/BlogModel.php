<?php

namespace App\Models;

use CodeIgniter\Model;

class BlogModel extends Model
{
    protected $table            = 'blog_posts';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = [
        'title', 'slug', 'excerpt', 'content', 'featured_image', 'author_name', 'category', 'is_published', 'published_date'
    ];

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getPublishedBlogs($limit = null)
    {
        $builder = $this->where('is_published', 1)
                        ->orderBy('published_date', 'DESC');
        
        if ($limit) {
            $builder->limit($limit);
        }

        return $builder->findAll();
    }
}

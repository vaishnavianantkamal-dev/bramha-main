<?php

namespace App\Controllers;

use App\Models\BlogModel;
use CodeIgniter\API\ResponseTrait;

class Blog extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $model = new BlogModel();
        $blogs = $model->getPublishedBlogs();

        return $this->respond([
            "success" => true,
            "data" => $blogs
        ]);
    }

    public function show($slug)
    {
        $model = new BlogModel();
        $blog = $model->where('slug', $slug)->first();

        if (!$blog) {
            return $this->failNotFound('Blog post not found');
        }

        return $this->respond([
            "success" => true,
            "data" => $blog
        ]);
    }
}

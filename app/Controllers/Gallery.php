<?php

namespace App\Controllers;

use App\Models\GalleryCategoryModel;
use App\Models\GalleryImageModel;
use CodeIgniter\API\ResponseTrait;

class Gallery extends BaseController
{
    use ResponseTrait;

    public function categories()
    {
        $model = new GalleryCategoryModel();
        $categories = $model->getActiveCategories();

        return $this->respond([
            "success" => true,
            "data" => $categories
        ]);
    }

    public function images()
    {
        $model = new GalleryImageModel();
        $category = $this->request->getGet('category');

        if ($category) {
            $images = $model->getImagesByCategory($category);
        } else {
            $images = $model->where('is_active', 1)->findAll();
        }

        return $this->respond([
            "success" => true,
            "data" => $images
        ]);
    }
}

<?php

namespace App\Controllers;

use App\Models\HeroSliderModel;
use CodeIgniter\API\ResponseTrait;

class Home extends BaseController
{
    use ResponseTrait;

    /**
     * Serve the React Frontend
     */
    public function index()
    {
        $filePath = FCPATH . 'dist/index.html';
        return "Brahma Valley LIVE - Version 1.1 - Checked at: " . date('Y-m-d H:i:s');
    }

    /**
     * Get Hero Slider data
     */
    public function heroSlides()
    {
        $model = new HeroSliderModel();
        $slides = $model->getActiveSlides();

        return $this->respond([
            "success" => true,
            "data" => $slides
        ]);
    }
}

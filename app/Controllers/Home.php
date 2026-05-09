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
        return "Antigravity is testing: " . (file_exists($filePath) ? "Dist folder found" : "Dist folder missing at: " . $filePath);
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

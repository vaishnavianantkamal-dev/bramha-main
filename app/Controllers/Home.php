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
        if (file_exists($filePath)) {
            return file_get_contents($filePath);
        }
        return "Frontend build not found. Please run 'npm run build'.";
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

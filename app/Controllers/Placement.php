<?php

namespace App\Controllers;

use App\Models\PlacementRecordModel;
use App\Models\RecruiterModel;
use App\Models\PlacementFaqModel;
use CodeIgniter\API\ResponseTrait;

class Placement extends BaseController
{
    use ResponseTrait;

    public function records()
    {
        $model = new PlacementRecordModel();
        $records = $model->findAll();

        return $this->respond([
            "success" => true,
            "data" => $records
        ]);
    }

    public function recruiters()
    {
        $model = new RecruiterModel();
        $recruiters = $model->where('is_active', 1)->findAll();

        return $this->respond([
            "success" => true,
            "data" => $recruiters
        ]);
    }

    public function faqs()
    {
        $model = new PlacementFaqModel();
        $faqs = $model->where('is_active', 1)
                      ->orderBy('display_order', 'ASC')
                      ->findAll();

        return $this->respond([
            "success" => true,
            "data" => $faqs
        ]);
    }
}

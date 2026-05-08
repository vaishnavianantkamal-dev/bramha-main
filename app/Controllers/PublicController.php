<?php

namespace App\Controllers;

use App\Models\BoardMemberModel;
use App\Models\LeadershipModel;
use App\Models\FacilityModel;
use App\Models\InfrastructureModel;
use App\Models\AwardModel;
use App\Models\AffiliationModel;
use App\Models\StatisticModel;
use App\Models\AboutModel;
use App\Models\CommitmentModel;
use App\Models\FooterModel;
use App\Models\NavigationModel;
use App\Models\PlacementPolicyModel;
use App\Models\ProgressHighlightModel;
use App\Models\TopHeaderModel;
use App\Models\VirtualTourModel;
use App\Models\WhyChooseUsModel;
use CodeIgniter\API\ResponseTrait;

class PublicController extends BaseController
{
    use ResponseTrait;

    public function boardMembers()
    {
        $model = new BoardMemberModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function leadership($slug = null)
    {
        $model = new LeadershipModel();
        if ($slug) {
            $data = $model->where('slug', $slug)->first();
            return $data ? $this->respond(["success" => true, "data" => $data]) : $this->failNotFound();
        }
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->findAll()]);
    }

    public function facilities($slug = null)
    {
        $model = new FacilityModel();
        if ($slug) {
            $data = $model->where('slug', $slug)->first();
            return $data ? $this->respond(["success" => true, "data" => $data]) : $this->failNotFound();
        }
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->findAll()]);
    }

    public function infrastructure()
    {
        $model = new InfrastructureModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->findAll()]);
    }

    public function awards()
    {
        $model = new AwardModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('year', 'DESC')->findAll()]);
    }

    public function affiliations()
    {
        $model = new AffiliationModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->findAll()]);
    }

    public function statistics()
    {
        $model = new StatisticModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function topHeader()
    {
        $model = new TopHeaderModel();
        $links = $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll();
        
        $data = [
            'menuLinks' => array_filter($links, fn($l) => $l['type'] === 'menu'),
            'socialLinks' => array_filter($links, fn($l) => $l['type'] === 'social'),
            'actionLinks' => array_filter($links, fn($l) => $l['type'] === 'action')
        ];
        
        return $this->respond(["success" => true, "data" => $data]);
    }

    public function about()
    {
        $model = new AboutModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->first()]);
    }

    public function whyChooseUs()
    {
        $model = new WhyChooseUsModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function progressHighlights()
    {
        $model = new ProgressHighlightModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function placementPolicy()
    {
        $model = new PlacementPolicyModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function navigation()
    {
        $model = new NavigationModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function footer()
    {
        $model = new FooterModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function virtualTour()
    {
        $model = new VirtualTourModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }

    public function commitments()
    {
        $model = new CommitmentModel();
        return $this->respond(["success" => true, "data" => $model->where('is_active', 1)->orderBy('display_order', 'ASC')->findAll()]);
    }
}

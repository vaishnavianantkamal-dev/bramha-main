<?php

namespace App\Controllers;

use App\Models\ContactModel;
use CodeIgniter\API\ResponseTrait;

class Contact extends BaseController
{
    use ResponseTrait;

    public function submit()
    {
        $model = new ContactModel();

        $rules = [
            'name'    => 'required|min_length[3]',
            'email'   => 'required|valid_email',
            'subject' => 'required',
            'message' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = [
            'name'    => $this->request->getVar('name'),
            'email'   => $this->request->getVar('email'),
            'subject' => $this->request->getVar('subject'),
            'message' => $this->request->getVar('message'),
        ];

        if ($model->insert($data)) {
            return $this->respondCreated([
                "success" => true,
                "message" => "Message sent successfully"
            ]);
        }

        return $this->fail('Failed to send message');
    }
}

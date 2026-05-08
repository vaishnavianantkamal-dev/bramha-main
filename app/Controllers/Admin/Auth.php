<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\AdminModel;
use CodeIgniter\API\ResponseTrait;

class Auth extends BaseController
{
    use ResponseTrait;

    public function login()
    {
        $model = new AdminModel();
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        $user = $model->authenticate($username, $password);

        if ($user) {
            $session = session();
            $session->set([
                'admin_id' => $user['id'],
                'admin_name' => $user['full_name'],
                'admin_role' => $user['role'],
                'is_admin_logged_in' => true
            ]);

            // Update last login
            $model->update($user['id'], ['last_login' => date('Y-m-d H:i:s')]);

            return $this->respond([
                "success" => true,
                "message" => "Login successful",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['full_name'],
                    "role" => $user['role']
                ]
            ]);
        }

        return $this->failUnauthorized('Invalid username or password');
    }

    public function logout()
    {
        session()->destroy();
        return $this->respond([
            "success" => true,
            "message" => "Logged out successfully"
        ]);
    }

    public function me()
    {
        if (session()->get('is_admin_logged_in')) {
            return $this->respond([
                "success" => true,
                "user" => [
                    "id" => session()->get('admin_id'),
                    "name" => session()->get('admin_name'),
                    "role" => session()->get('admin_role')
                ]
            ]);
        }

        return $this->failUnauthorized('Not logged in');
    }
}

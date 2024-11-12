<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomerController extends Controller {

    public function index(): \Inertia\Response{
        $data['title'] = 'Dashboard';

        return Inertia::render('Dashboard', $data);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientStoreRequest;
use App\Service\ClientService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClientController extends Controller {

    public function __construct(protected ClientService $service){}

    public function index(): \Inertia\Response{
        $data['title']  = 'Client List';
        $data['data']   = $this->service->all(Auth::user()->id);

        return Inertia::render('Client/ClientIndex', $data);
    }

    public function form($id = null): \Inertia\Response{
        $data['title'] = 'Form Client';
        $data['form']  = null;

        if ($id){
            $data['form']   = $this->service->findById($id);
        }

        return Inertia::render('Client/ClientForm', $data);
    }

    public function store(ClientStoreRequest $request): \Illuminate\Http\RedirectResponse{
        $body = $request->validated();
        $body['user_id']    = Auth::user()->id;

        $this->service->create($body);

        return Redirect::route('client.index')->with([
            'type'      => 'success',
            'message'   => 'Saved Client Successfully!',
        ]);
    }

    public function update(ClientStoreRequest $request, $id): \Illuminate\Http\RedirectResponse{
        $body = (array) $request->validated();

        $this->service->update($body, $id);

        return Redirect::route('client.index')->with([
            'type'      => 'success',
            'message'   => 'Updated Client Successfully!',
        ]);
    }

    public function delete($id): \Illuminate\Http\RedirectResponse{
        $this->service->delete($id);

        return Redirect::route('client.index')->with([
            'type'      => 'success',
            'message'   => 'Deleted Client Successfully!',
        ]);
    }
}

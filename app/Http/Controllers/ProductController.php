<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Service\ProductService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller{

    public function __construct(protected ProductService $service){}

    public function index(): \Inertia\Response{
        $data['title']  = 'Product List';
        $data['data']   = $this->service->all(Auth::user()->id);

        return Inertia::render('Product/ProductIndex', $data);
    }

    public function form($id = null): \Inertia\Response{
        $data['title']  = 'Create Product';
        $data['form']   = null;

        if ($id != null){
            $data['form']   = $this->service->findById($id);
        }

        return Inertia::render('Product/ProductForm', $data);
    }

    public function show($id): \Illuminate\Http\JsonResponse{
        $data = $this->service->findById($id);

        return response()->json($data);
    }

    public function store(ProductRequest $request): \Illuminate\Http\RedirectResponse{
        $body = $request->validated();
        $body['user_id']    = Auth::user()->id;

        $this->service->create($body);

        return Redirect::route('product.index')->with([
            'type'      => 'success',
            'message'   => 'Saved Product Successfully!',
        ]);
    }

    public function update(ProductRequest $request, string $id): \Illuminate\Http\RedirectResponse{
        $body = $request->validated();

        $this->service->update($body, $id);

        return Redirect::route('product.index')->with([
            'type'      => 'success',
            'message'   => 'Updated Product Successfully!',
        ]);
    }

    public function delete(string $id): \Illuminate\Http\RedirectResponse{
        $this->service->delete($id);

        return Redirect::route('product.index')->with([
            'type'      => 'success',
            'message'   => 'Deleted Product Successfully!',
        ]);
    }
}

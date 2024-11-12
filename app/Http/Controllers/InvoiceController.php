<?php

namespace App\Http\Controllers;

use App\Helper\Constant;
use App\Http\Requests\InvoiceStoreRequest;
use App\Service\ClientService;
use App\Service\InvoiceService;
use App\Service\ProductService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InvoiceController extends Controller {

    public function __construct(
        protected InvoiceService $invoiceService,
        protected ClientService $clientService,
        protected ProductService $productService
    ){}

    public function index(): \Inertia\Response{
        $data['title']  = 'Invoice List';
        $data['data']   = $this->invoiceService->all(Auth::user()->id);

        return Inertia::render('Invoice/InvoiceIndex', $data);
    }

    public function form($id = null): \Inertia\Response{
        $user = Auth::user();

        $data['title']      = 'Create Invoice';
        $data['clients']    = $this->clientService->all($user->id);
        $data['products']   = $this->productService->all($user->id);
        $data['disctypes']  = Constant::DISC_TYPES;

        $form['id']             = '';
        $form['code']           = '';
        $form['contact_id']     = '';
        $form['date']           = null;
        $form['due_date']       = null;
        $form['ref_no']         = '';
        $form['subtotal']       = 0;
        $form['disc_type']      = '';
        $form['disc_amount']    = 0;
        $form['disc_percent']   = 0;
        $form['total']          = 0;
        $form['description']    = '';
        $form['items']          = [];

        if ($id != null){
            $search   = $this->invoiceService->findById($id);

            $data['title']          = 'Edit Invoice';
            $form['id']             = $search->id;
            $form['code']           = $search->code;
            $form['contact_id']     = $search->contact_id;
            $form['date']           = $search->date;
            $form['due_date']       = $search->due_date;
            $form['ref_no']         = $search->ref_no ?? '';
            $form['subtotal']       = $search->subtotal;
            $form['disc_type']      = $search->disc_type ?? '';
            $form['disc_amount']    = $search->disc_amount;
            $form['disc_percent']   = $search->disc_percent;
            $form['total']          = $search->total;
            $form['description']    = $search->description ?? '';
            $form['items']          = $search->items;
        }

        $data['form']   = $form;
        return Inertia::render('Invoice/InvoiceForm', $data);
    }

    public function store(InvoiceStoreRequest $request): \Illuminate\Http\RedirectResponse{
        $body = $request->validated();
        $body['user_id']    = Auth::user()->id;

        $this->invoiceService->create($body);

        return Redirect::route('invoice.index')->with([
            'type'      => 'success',
            'message'   => 'Saved Invoice Successfully!',
        ]);
    }

    public function update(InvoiceStoreRequest $request, $id): \Illuminate\Http\RedirectResponse{
        $body = $request->validated();

        $this->invoiceService->update($body, $id);

        return Redirect::route('invoice.index')->with([
            'type'      => 'success',
            'message'   => 'Updated Invoice Successfully!',
        ]);
    }

    public function delete($id): \Illuminate\Http\RedirectResponse{
        $this->invoiceService->delete($id);

        return Redirect::route('invoice.index')->with([
            'type'      => 'success',
            'message'   => 'Deleted Invoice Successfully!',
        ]);
    }
}

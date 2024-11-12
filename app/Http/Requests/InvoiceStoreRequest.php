<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceStoreRequest extends FormRequest {

    public function rules(): array
    {
        return [
            'date' => ['required', 'date',],
            'contact_id' => ['required', 'string',],
            'ref_no' => ['nullable', 'string',],
            'due_date' => ['nullable', 'date',],
            'subtotal' => ['required', 'numeric',],
            'disc_type' => ['nullable', 'string',],
            'disc_percent' => ['nullable', 'numeric',],
            'disc_amount' => ['nullable', 'numeric',],
            'total' => ['required', 'numeric',],
            'description' => ['nullable', 'string',],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'string',],
            'items.*.qty' => ['required', 'numeric',],
            'items.*.price' => ['required', 'numeric',],
            'items.*.subtotal' => ['required', 'numeric',],
        ];
    }
}

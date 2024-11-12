<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientStoreRequest extends FormRequest{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'lowercase'],
            'phone' => ['required', 'string',],
            'address' => ['nullable', 'string',],
            'city' => ['nullable', 'string',],
            'province' => ['nullable', 'string',],
            'country' => ['nullable', 'string',],
        ];
    }
}

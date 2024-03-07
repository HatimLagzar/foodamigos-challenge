<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{

    public function rules(): array
    {
        return [
          'ids.*' => ['integer', 'required'],
          'quantities.*' => ['min: 1', 'integer', 'required'],
          'notes' => ['string', 'nullable'],
        ];
    }

}

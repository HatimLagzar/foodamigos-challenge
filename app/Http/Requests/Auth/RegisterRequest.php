<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function rules(): array
    {
        return [
          'name' => ['string', 'max:100', 'required'],
          'phone_number' => ['max:20', 'required'],
          'password' => ['string', 'max:255', 'required'],
          'address' => ['string', 'max:255', 'required'],
        ];
    }

}

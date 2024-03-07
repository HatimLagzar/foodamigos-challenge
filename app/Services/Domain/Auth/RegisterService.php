<?php

namespace App\Services\Domain\Auth;

use App\Models\User;
use App\Services\Core\User\UserService;
use App\Services\Domain\Auth\Exceptions\PhoneNumberAlreadyUsedException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegisterService
{

    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @throws PhoneNumberAlreadyUsedException
     */
    public function register(
      string $name,
      string $phoneNumber,
      string $password,
      string $address,
    ): User {
        $name = htmlspecialchars($name);
        $phoneNumber = str_replace(' ', '', $phoneNumber);
        $password = $password;
        $address = htmlspecialchars($address);

        $existingAccount = $this->userService->findByPhoneNumber($phoneNumber);
        if ($existingAccount instanceof User) {
            throw new PhoneNumberAlreadyUsedException();
        }

        return $this->userService->create([
          User::NAME_COLUMN => $name,
          User::PHONE_NUMBER_COLUMN => $phoneNumber,
          User::PASSWORD_COLUMN => Hash::make($password),
          User::ADDRESS_COLUMN => $address,
        ]);
    }

}

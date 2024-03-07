<?php

namespace App\Services\Domain\Auth;

use App\Models\User;
use App\Services\Core\User\UserService;
use App\Services\Domain\Auth\Exceptions\IncorrectCredentialsException;

use function auth;

class LoginService {

    /**
     * @var \App\Services\Core\User\UserService
     */
    private UserService $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    /**
     * @throws IncorrectCredentialsException
     */
    public function tokenLogin(string $phoneNumber, string $password): string {
        $isCorrect = auth()->attempt([
            User::PHONE_NUMBER_COLUMN => $phoneNumber,
            'password' => $password,
        ]);

        if ($isCorrect === false) {
            throw new IncorrectCredentialsException();
        }

        $user = $this->userService->findByPhoneNumber($phoneNumber);

        return $user->createToken('auth')->plainTextToken;
    }
}

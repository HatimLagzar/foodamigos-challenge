<?php

namespace App\Services\Core\User;

use App\Models\User;
use App\Repositories\User\UserRepository;
use Illuminate\Support\Arr;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function findById(string $id): ?User
    {
        return $this->userRepository->findById($id);
    }

    public function findByPhoneNumber(string $phoneNumber): ?User
    {
        return $this->userRepository->findByPhoneNumber($phoneNumber);
    }

    public function update(User $user, array $attributes): bool
    {
        return $this->userRepository->update($user->getId(), $attributes);
    }

    public function create(array $attributes): User
    {
        $attributes = Arr::only($attributes, [
            User::NAME_COLUMN,
            User::PHONE_NUMBER_COLUMN,
            User::PASSWORD_COLUMN,
        ]);

        return $this->userRepository->create($attributes);
    }
}

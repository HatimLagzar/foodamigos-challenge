<?php

namespace App\Repositories\User;

use App\Models\User;

class UserRepository
{
    public function findById(string $id): ?User
    {
        return User::query()
            ->where(User::ID_COLUMN, $id)
            ->first();
    }

    public function findByPhoneNumber(string $phoneNumbere): ?User
    {
        return User::query()
            ->where(User::PHONE_NUMBER_COLUMN, $phoneNumbere)
            ->first();
    }

    public function update(string $id, array $attributes): bool
    {
        return User::query()
            ->where(User::ID_COLUMN, $id)
            ->update($attributes) > 0;
    }

    public function create(array $attributes): User
    {
        return User::query()
            ->create($attributes);
    }
}

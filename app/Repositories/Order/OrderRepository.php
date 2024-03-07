<?php

namespace App\Repositories\Order;

use App\Models\Order;

class OrderRepository
{

    public function create(array $attributes): Order
    {
        return Order::query()
          ->create($attributes);
    }

    public function update(Order $order, array $attributes): bool
    {
        return Order::query()
            ->where(Order::ID_COLUMN, $order->getId())
            ->update($attributes) > 0;
    }

    public function findById(int $id): ?Order
    {
        return Order::find($id);
    }

}
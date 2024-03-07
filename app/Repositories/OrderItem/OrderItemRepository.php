<?php

namespace App\Repositories\OrderItem;

use App\Models\OrderItem;

class OrderItemRepository
{
    public function create(array $attributes): OrderItem
    {
        return OrderItem::query()
          ->create($attributes);
    }
}
<?php

namespace App\Repositories\OrderItem;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Collection;

class OrderItemRepository
{
    public function create(array $attributes): OrderItem
    {
        return OrderItem::query()
          ->create($attributes);
    }

    public function findAllByOrder(int $id): Collection
    {
        return OrderItem::query()
          ->where(OrderItem::ORDER_ID_COLUMN, $id)
          ->get();
    }
}
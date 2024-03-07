<?php

namespace App\Services\Core\OrderItem;

use App\Models\OrderItem;
use App\Repositories\OrderItem\OrderItemRepository;

class OrderItemService
{

    private OrderItemRepository $orderItemRepository;

    public function __construct(OrderItemRepository $orderItemRepository)
    {
        $this->orderItemRepository = $orderItemRepository;
    }

    public function create(array $attributes): OrderItem
    {
        return $this->orderItemRepository->create($attributes);
    }
}
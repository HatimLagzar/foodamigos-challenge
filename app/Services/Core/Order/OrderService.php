<?php

namespace App\Services\Core\Order;

use App\Models\Order;
use App\Repositories\Order\OrderRepository;
use App\Repositories\OrderItem\OrderItemRepository;

class OrderService
{
    private OrderRepository $orderRepository;
    private OrderItemRepository $orderItemRepository;

    public function __construct(OrderRepository $orderRepository, OrderItemRepository $orderItemRepository) {
        $this->orderRepository = $orderRepository;
        $this->orderItemRepository = $orderItemRepository;
    }

    public function create(array $attributes): Order
    {
        return $this->orderRepository->create($attributes);
    }

    public function update(Order $order, array $attributes): bool
    {
        return $this->orderRepository->update($order, $attributes);
    }

    public function findById(int $id): ?Order
    {
        $order = $this->orderRepository->findById($id);
        if (!$order instanceof Order) {
            return null;
        }

        $order->setItems($this->orderItemRepository->findAllByOrder($id)); // Reason to not use left join is to keep ability to add caching here

        return $order;
    }
}
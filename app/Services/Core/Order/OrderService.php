<?php

namespace App\Services\Core\Order;

use App\Models\Order;
use App\Models\OrderItem;
use App\Repositories\Order\OrderRepository;
use App\Repositories\OrderItem\OrderItemRepository;
use App\Repositories\Product\ProductRepository;

class OrderService
{
    private OrderRepository $orderRepository;
    private OrderItemRepository $orderItemRepository;
    private ProductRepository $productRepository;

    public function __construct(
      OrderRepository $orderRepository,
      OrderItemRepository $orderItemRepository,
      ProductRepository $productRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->orderItemRepository = $orderItemRepository;
        $this->productRepository = $productRepository;
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

        $items = $this->orderItemRepository->findAllByOrder($id);
        $items = $items->transform(function (OrderItem $orderItem) {
            $orderItem->setProduct($this->productRepository->findById($orderItem->getProductId()));

            return $orderItem;
        });

        $order->setItems($items); // Reason to not use left join is to keep ability to add caching here

        return $order;
    }
}
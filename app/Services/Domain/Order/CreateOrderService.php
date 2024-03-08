<?php

namespace App\Services\Domain\Order;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Services\Core\Order\OrderService;
use App\Services\Core\OrderItem\OrderItemService;
use App\Services\Core\Product\ProductService;
use App\Services\Domain\Order\Exceptions\OrderBelowMinimumTotalException;
use App\Services\Domain\Order\Exceptions\ProductNotFoundException;

class CreateOrderService
{
    private ProductService $productService;

    /**
     * @var \App\Services\Core\Order\OrderService
     */
    private OrderService $orderService;

    /**
     * @var \App\Services\Core\OrderItem\OrderItemService
     */
    private OrderItemService $orderItemService;

    public function __construct(ProductService $productService, OrderService $orderService, OrderItemService $orderItemService) {
        $this->productService = $productService;
        $this->orderService = $orderService;
        $this->orderItemService = $orderItemService;
    }

    /**
     * @throws ProductNotFoundException
     * @throws \App\Services\Domain\Order\Exceptions\OrderBelowMinimumTotalException
     */
    public function create(User $user, array $productIds, array $quantities, ?string $notes): bool
    {
        $order = $this->orderService->create([Order::USER_ID_COLUMN => $user->getId(), Order::NOTES_COLUMN => $notes, Order::TOTAL_COLUMN => 0]);
        $total = 0;
        foreach ($productIds as $index => $productId) {
            $quantity = $quantities[$index];
            $product = $this->productService->findById($productId);
            if (!$product instanceof Product) {
                throw new ProductNotFoundException();
            }

            $total += $product->getPrice() * $quantity;
        }

        if ($total < 15) {
            throw new OrderBelowMinimumTotalException();
        }

        foreach ($productIds as $index => $productId) {
            $quantity = $quantities[$index];
            $product = $this->productService->findById($productId);
            if (!$product instanceof Product) {
                throw new ProductNotFoundException();
            }

            $total += $product->getPrice() * $quantity;

            $this->orderItemService->create([
              OrderItem::ORDER_ID_COLUMN => $order->getId(),
              OrderItem::PRODUCT_ID_COLUMN => $product->getId(),
              OrderItem::QUANTITY_COLUMN => $quantity,
            ]);
        }

        $this->orderService->update($order, [Order::TOTAL_COLUMN => $total]);

        return true;
    }
}
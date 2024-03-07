<?php

namespace App\Http\Controllers\Api\Orders;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Models\Order;
use App\Services\Core\Order\OrderService;
use App\Services\Domain\Order\CreateOrderService;
use App\Services\Domain\Order\Exceptions\OrderBelowMinimumTotalException;
use App\Services\Domain\Order\Exceptions\ProductNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetOrderController extends BaseController
{

    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    // Didn't use directly the model here ($id) to benefit from hydration and caching later if you want
    public function __invoke(int $id): JsonResponse
    {
        try {
            $order = $this->orderService->findById($id);
            if (!$order instanceof Order) {
                return $this->withError(
                  'Product not found!',
                  Response::HTTP_NOT_FOUND
                );
            }

            return $this->withSuccess([
              'order' => $order,
            ]);
        } catch (Throwable $e) {
            Log::error('failed to create order', [
              'error_message' => $e->getMessage(),
              'error_trace' => $e->getTraceAsString(),
            ]);

            return $this->withError('Error occurred, please retry later!');
        }
    }

}

<?php

namespace App\Http\Controllers\Api\Orders;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Services\Domain\Order\CreateOrderService;
use App\Services\Domain\Order\Exceptions\ProductNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class StoreOrderController extends BaseController
{

    private CreateOrderService $createOrderService;

    public function __construct(CreateOrderService $createOrderService)
    {
        $this->createOrderService = $createOrderService;
    }

    public function __invoke(StoreOrderRequest $request): JsonResponse
    {
        try {
            $this->createOrderService->create(
              $request->user(),
              $request->get('ids'),
              $request->get('quantities'),
              $request->get('notes'),
            );

            return $this->withSuccess([
              'message' => 'Order created successfully.',
            ]);
        } catch (ProductNotFoundException $e) {
            return $this->withError('One of the product on the basket wasn\'t found!', Response::HTTP_NOT_FOUND);
        } catch (Throwable $e) {
            Log::error('failed to create order', [
              'error_message' => $e->getMessage(),
              'error_trace' => $e->getTraceAsString(),
            ]);

            return $this->withError('Error occurred, please retry later!');
        }
    }

}

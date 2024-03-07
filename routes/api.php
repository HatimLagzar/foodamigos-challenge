<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Orders\GetOrderController;
use App\Http\Controllers\Api\Orders\StoreOrderController;
use App\Http\Controllers\Api\Products\IndexController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', RegisterController::class);
Route::post('login', LoginController::class);

Route::get('products', IndexController::class);

Route::prefix('orders')->middleware('auth:sanctum')->group(function () {
    Route::get('{id}', GetOrderController::class);
    Route::post('/', StoreOrderController::class);
});

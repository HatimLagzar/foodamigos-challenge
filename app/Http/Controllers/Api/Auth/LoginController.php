<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Services\Core\User\UserService;
use App\Services\Domain\Auth\Exceptions\IncorrectCredentialsException;
use App\Services\Domain\Auth\LoginService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class LoginController extends BaseController
{

    private LoginService $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    public function __invoke(LoginRequest $request): JsonResponse
    {
        try {
            $phoneNumber = str_replace(
              ' ',
              '',
              $request->input('phone_number')
            );
            $password = $request->input('password');

            $token = $this->loginService->tokenLogin($phoneNumber, $password);

            return $this->withSuccess([
              'message' => 'Logged in successfully.',
              'token' => $token,
            ]);
        } catch (IncorrectCredentialsException $e) {
            return $this->withError(
              'Incorrect credentials!',
              Response::HTTP_UNAUTHORIZED
            );
        } catch (Throwable $e) {
            Log::error('failed to login', [
              'error_message' => $e->getMessage(),
              'error_trace' => $e->getTraceAsString(),
              'email' => $request->input('email'),
            ]);

            return $this->withError('Error occurred, please retry later!');
        }
    }

}

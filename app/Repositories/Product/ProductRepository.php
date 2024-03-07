<?php

namespace App\Repositories\Product;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ProductRepository
{

    /**
     * @return Collection|Product[]
     */
    public function getAll(): Collection
    {
        return Product::query()
          ->orderBy(Product::CREATED_AT_COLUMN, 'DESC')
          ->get();
    }

    public function findById(string $id): ?Product
    {
        return Product::query()
          ->where(Product::ID_COLUMN, $id)
          ->first();
    }

}

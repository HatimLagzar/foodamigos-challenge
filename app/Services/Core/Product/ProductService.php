<?php

namespace App\Services\Core\Product;

use App\Models\Product;
use App\Repositories\Product\ProductRepository;
use App\Repositories\ProductImage\ProductImageRepository;
use App\Repositories\ProductVariant\ProductVariantRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ProductService
{

    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * @return Collection|Product[]
     */
    public function getAll(): Collection
    {
        return $this->productRepository->getAll();
    }

    public function findById(string $id): ?Product
    {
        return $this->productRepository->findById($id);
    }

}

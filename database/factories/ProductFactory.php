<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          Product::NAME_COLUMN => $this->faker->name,
          Product::THUMBNAIL_COLUMN => $this->faker->imageUrl(),
          Product::PRICE_COLUMN => $this->faker->numberBetween(
            3 * 1000,
            5 * 1000
          ),
          Product::DESCRIPTION_COLUMN => $this->faker->paragraph,
        ];
    }

}

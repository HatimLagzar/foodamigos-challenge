<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    public const ORDER_ID_COLUMN = 'order_id';
    public const QUANTITY_COLUMN = 'quantity';
    public const PRODUCT_ID_COLUMN = 'product_id';

    public const TABLE = 'orders_items';

    protected $table = self::TABLE;

    protected $fillable = [
      self::ORDER_ID_COLUMN,
      self::QUANTITY_COLUMN,
      self::PRODUCT_ID_COLUMN,
    ];
}

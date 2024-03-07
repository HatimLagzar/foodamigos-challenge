<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public const NAME_COLUMN = 'name';
    public const PRICE_COLUMN = 'price';
    public const DESCRIPTION_COLUMN = 'description';

    public const CREATED_AT_COLUMN = 'created_at';

    protected $fillable = [
      self::NAME_COLUMN,
      self::PRICE_COLUMN,
      self::DESCRIPTION_COLUMN,
    ];
}

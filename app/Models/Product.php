<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public const NAME_COLUMN = 'name';
    public const THUMBNAIL_COLUMN = 'thumbnail';
    public const PRICE_COLUMN = 'price';
    public const DESCRIPTION_COLUMN = 'description';


    protected $fillable = [
      self::NAME_COLUMN,
      self::THUMBNAIL_COLUMN,
      self::PRICE_COLUMN,
      self::DESCRIPTION_COLUMN,
    ];
}

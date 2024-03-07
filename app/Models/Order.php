<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    use HasFactory;

    public const ID_COLUMN = 'id';
    public const USER_ID_COLUMN = 'user_id';
    public const NOTES_COLUMN = 'notes';
    public const TOTAL_COLUMN = 'total';

    protected $fillable = [
      self::USER_ID_COLUMN,
      self::NOTES_COLUMN,
      self::TOTAL_COLUMN,
    ];

    public function getId(): int
    {
        return $this->getAttribute(self::ID_COLUMN);
    }

}

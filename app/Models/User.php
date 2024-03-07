<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {

    use HasApiTokens, HasFactory, Notifiable;

    public const ID_COLUMN = 'id';
    public const PHONE_NUMBER_COLUMN = 'phone_number';
    public const PHONE_VERIFIED_AT_COLUMN = 'phone_verified_at';
    public const NAME_COLUMN = 'name';
    public const PASSWORD_COLUMN = 'password';
    public const CREATED_AT_COLUMN = 'created_at';
    public const UPDATED_AT_COLUMN = 'udpated_at';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        self::NAME_COLUMN,
        self::PHONE_NUMBER_COLUMN,
        self::PASSWORD_COLUMN,
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        self::PASSWORD_COLUMN,
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        self::PHONE_VERIFIED_AT_COLUMN => 'datetime',
        self::CREATED_AT_COLUMN => 'datetime',
        self::UPDATED_AT_COLUMN => 'datetime',
        self::PASSWORD_COLUMN => 'hashed',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'user_id',
        'name',
        'price',
        'min_qty',
        'max_qty',
        'description',
        'image',
    ];

    protected function casts(): array{
        return [
            'price' => 'double',
            'min_qty' => 'double',
            'max_qty' => 'double',
        ];
    }
}

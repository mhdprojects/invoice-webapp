<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceItem extends Model{
    /** @use HasFactory<\Database\Factories\InvoiceItemFactory> */
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'invoice_id',
        'product_id',
        'qty',
        'price',
        'subtotal',
    ];

    protected function casts(): array{
        return [
            'qty' => 'double',
            'price' => 'double',
            'subtotal' => 'double',
        ];
    }

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo{
        return $this->belongsTo(Product::class);
    }
}

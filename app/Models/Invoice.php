<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'user_id',
        'code',
        'date',
        'contact_id',
        'ref_no',
        'due_date',
        'subtotal',
        'disc_type',
        'disc_amount',
        'disc_percent',
        'total',
        'description',
    ];

    protected function casts(): array{
        return [
            'subtotal' => 'double',
            'disc_amount' => 'double',
            'disc_percent' => 'double',
            'total' => 'double',
        ];
    }

    public function items(): \Illuminate\Database\Eloquent\Relations\HasMany{
        return $this->hasMany(InvoiceItem::class);
    }

    public function contact(): \Illuminate\Database\Eloquent\Relations\BelongsTo{
        return $this->belongsTo(Contact::class);
    }
}

<?php

namespace App\Repositories\Invoice;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Collection;

interface InvoiceRepositoryInterface{
    public function all($userId) : Collection;
    public function findById($id): ?Invoice;
    public function create(array $data): ?Invoice;
    public function update(array $data, $id): ?Invoice;
    public function delete($id): void;
}

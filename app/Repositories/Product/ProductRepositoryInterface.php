<?php

namespace App\Repositories\Product;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

interface ProductRepositoryInterface{
    public function all($userId) : Collection;
    public function findById($id): ?Product;
    public function create(array $data): ?Product;
    public function update(array $data, $id): ?Product;
    public function delete($id): void;
}

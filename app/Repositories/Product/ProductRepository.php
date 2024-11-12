<?php

namespace App\Repositories\Product;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository implements ProductRepositoryInterface {

    public function all($userId): Collection{
        return Product::query()
            ->where('user_id', $userId)
            ->orderBy('name')
            ->get();
    }

    public function findById($id): ?Product{
        return Product::query()->findOrFail($id);
    }

    public function create(array $data): ?Product{

        return Product::query()->create($data);
    }

    public function update(array $data, $id): ?Product{
        $query = Product::query()->findOrFail($id);
        $query->update($data);

        return $query;
    }

    public function delete($id): void{
        $query = Product::query()->findOrFail($id);
        $query->delete();
    }
}

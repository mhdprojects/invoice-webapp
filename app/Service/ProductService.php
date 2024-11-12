<?php

namespace App\Service;

use App\Models\Product;
use App\Repositories\Product\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ProductService{
    public function __construct(protected ProductRepositoryInterface $repository){
    }

    public function all($userId): Collection{
        return $this->repository->all($userId);
    }

    public function findById($id): ?Product{
        return $this->repository->findById($id);
    }

    public function create(array $data): ?Product{
        return $this->repository->create($data);
    }

    public function update(array $data, $id): ?Product{
        return $this->repository->update($data, $id);
    }

    public function delete($id): void{
        $this->repository->delete($id);
    }
}

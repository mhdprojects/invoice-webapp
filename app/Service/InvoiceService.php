<?php

namespace App\Service;

use App\Models\Invoice;
use App\Repositories\Invoice\InvoiceRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class InvoiceService {

    public function __construct(protected InvoiceRepositoryInterface $repository){}

    public function all($userId): Collection{
        return $this->repository->all($userId);
    }

    public function findById($id): ?Invoice{
        return $this->repository->findById($id);
    }

    public function create(array $data): ?Invoice{
        return $this->repository->create($data);
    }

    public function update(array $data, $id): ?Invoice{
        return $this->repository->update($data, $id);
    }

    public function delete($id): void{
        $this->repository->delete($id);
    }
}

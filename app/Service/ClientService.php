<?php

namespace App\Service;

use App\Repositories\Client\ClientRepositoryInterface;

class ClientService{
    public function __construct(
        protected ClientRepositoryInterface $clientRepository
    ){}

    public function all($userId): \Illuminate\Database\Eloquent\Collection{
        return $this->clientRepository->all($userId);
    }

    public function findById($id): ?\App\Models\Contact{
        return $this->clientRepository->findById($id);
    }

    public function create(array $data): ?\App\Models\Contact{
        return $this->clientRepository->create($data);
    }

    public function update(array $data ,$id): ?\App\Models\Contact{
        return $this->clientRepository->update($data, $id);
    }

    public function delete($id): void{
        $this->clientRepository->delete($id);
    }
}

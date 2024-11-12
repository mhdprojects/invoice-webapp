<?php

namespace App\Repositories\Client;

use App\Models\Contact;

class ClientRepository implements ClientRepositoryInterface {

    public function all($userId): \Illuminate\Database\Eloquent\Collection{
        return Contact::query()
            ->where('user_id', $userId)
            ->orderBy('name')
            ->get();
    }

    public function findById($id): ?Contact{
        return Contact::query()->findOrFail($id);
    }

    public function create(array $data): ?Contact{

        return Contact::query()->create($data);
    }

    public function update(array $data, $id): ?Contact{
        $query = Contact::query()->findOrFail($id);
        $query->update($data);

        return $query;
    }

    public function delete($id): void{
        $data = Contact::query()->findOrFail($id);
        $data->delete();
    }
}

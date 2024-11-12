<?php

namespace App\Repositories\Client;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;

interface ClientRepositoryInterface{
    public function all($userId) : Collection;
    public function findById($id): ?Contact;
    public function create(array $data): ?Contact;
    public function update(array $data, $id): ?Contact;
    public function delete($id): void;
}

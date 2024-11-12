<?php

namespace App\Repositories\Invoice;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InvoiceRepository implements InvoiceRepositoryInterface {

    public function all($userId): Collection{
        return Invoice::query()
            ->where('user_id', $userId)
            ->with('items.product')
            ->with('contact')
            ->orderByDesc('created_at')
            ->get();
    }

    public function findById($id): ?Invoice{
        return Invoice::query()->where('id', $id)
            ->with('items.product')
            ->with('contact')
            ->firstOrFail();
    }

    public function create(array $data): ?Invoice{
        try {
            DB::beginTransaction();

            $inv = new Invoice();
            $inv->user_id       = $data['user_id'];
            $inv->date          = date('Y-m-d', strtotime($data['date']));
            $inv->code          = Str::random(10);
            $inv->contact_id    = $data['contact_id'];
            $inv->ref_no        = $data['ref_no'] ?? null;
            $inv->due_date      = isset($data['due_date']) ? date('Y-m-d', strtotime($data['due_date'])) : null;
            $inv->subtotal      = $data['subtotal'];
            $inv->disc_type     = $data['disc_type'] ?? null;
            $inv->disc_percent  = $data['disc_percent'];
            $inv->disc_amount   = $data['disc_amount'];
            $inv->total         = $data['total'];
            $inv->description   = $data['description'] ?? null;
            $inv->save();

            foreach ($data['items'] as $item) {
                $detail = new InvoiceItem();
                $detail->invoice_id     = $inv->id;
                $detail->product_id     = $item['product_id'];
                $detail->qty            = $item['qty'];
                $detail->price          = $item['price'];
                $detail->subtotal       = $item['subtotal'];
                $detail->save();
            }

            DB::commit();
            return $inv->fresh();
        }catch (\Exception $exception){
            DB::rollBack();

            throw $exception;
        }
    }

    public function update(array $data, $id): ?Invoice{
        try {
            DB::beginTransaction();

            $inv = Invoice::query()->findOrFail($id);
            $inv->date          = date('Y-m-d', strtotime($data['date']));
            $inv->contact_id    = $data['contact_id'];
            $inv->ref_no        = $data['ref_no'] ?? null;
            $inv->due_date      = isset($data['due_date']) ? date('Y-m-d', strtotime($data['due_date'])) : null;
            $inv->subtotal      = $data['subtotal'];
            $inv->disc_type     = $data['disc_type'] ?? null;
            $inv->disc_percent  = $data['disc_percent'];
            $inv->disc_amount   = $data['disc_amount'];
            $inv->total         = $data['total'];
            $inv->description   = $data['description'] ?? null;
            $inv->save();

            $listIn = [];
            foreach ($data['items'] as $item) {
                if (isset($item['id'])){
                    $detail = InvoiceItem::query()->findOrFail($item['id']);
                    $detail->product_id     = $item['product_id'];
                    $detail->qty            = $item['qty'];
                    $detail->price          = $item['price'];
                    $detail->subtotal       = $item['subtotal'];
                    $detail->save();
                }else{
                    $detail = new InvoiceItem();
                    $detail->invoice_id     = $inv->id;
                    $detail->product_id     = $item['product_id'];
                    $detail->qty            = $item['qty'];
                    $detail->price          = $item['price'];
                    $detail->subtotal       = $item['subtotal'];
                    $detail->save();
                }

                $listIn[] = $detail->id;
            }

            InvoiceItem::query()
                ->where('invoice_id', $inv->id)
                ->whereNotIn('id', $listIn)
                ->delete();

            DB::commit();
            return $inv->fresh();
        }catch (\Exception $exception){
            DB::rollBack();

            throw $exception;
        }
    }

    public function delete($id): void{
        $inv = Invoice::query()->findOrFail($id);
        $inv->delete();
    }
}

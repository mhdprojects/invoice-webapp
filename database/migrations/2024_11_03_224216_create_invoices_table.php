<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('user_id')->index()->unsigned()->constrained();
            $table->string('code', 30);
            $table->date('date');
            $table->foreignUlid('contact_id')->unsigned()->constrained();
            $table->string('ref_no', 30)->nullable();
            $table->date('due_date')->nullable();
            $table->decimal('subtotal', 12)->default(0);
            $table->string('disc_type', 30);
            $table->decimal('disc_amount', 12)->default(0);
            $table->decimal('disc_percent', 12)->default(0);
            $table->decimal('total', 12)->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

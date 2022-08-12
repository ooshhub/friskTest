<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->timestamp('created_at');
        $table->string('username');
        $table->string('email', 48);
        $table->string('pin', 4);
        $table->string('message', 48);
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};

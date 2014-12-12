<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users',function(Blueprint $table)
		{
			$table->increments('id'); // auto increment, primary key
			$table->string('username',32);
			$table->string('email',255);
			$table->string('password',60);			
            $table->string('photo')->nullable;
			$table->float('lat',10,6); // default -> 0
			$table->float('long',10,6);
			$table->integer('points');
			$table->integer('role');
			$table->dateTime('logged_out')->nullable;
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
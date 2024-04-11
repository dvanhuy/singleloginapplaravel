<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('12345'),
        ]);

        User::create([
            'name' => 'huydinhvan',
            'email' => 'huydinhvan13@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('12345'),
        ]);
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'username' => fake()->name(),
      'email' => fake()->unique()->safeEmail(),
      'created_at' => now(),
      'pin' => fake()->randomNumber(4, true),
      'message' => substr(fake()->sentence(),0,47)
    ];
  }

}

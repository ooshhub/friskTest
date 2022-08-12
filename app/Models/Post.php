<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  use HasFactory;

  // Protected table columns
  protected $guarded = ['id', 'created_at'];

  public $timestamps = false;

  // Accessors and mutators
  // Make sure created_at is Carbon
  protected $dates = [
    'created_at',
  ];
  protected function createdAt(): Attribute
  {
    return Attribute::make(
      get: fn($date) => (new Carbon($date))->getTimestampMs(),
      set: fn($date) => new Carbon($date)
    );
  }
}

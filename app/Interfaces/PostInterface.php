<?php

namespace App\Interfaces;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

interface PostInterface {

  // Get all Posts
  public function getAll(): Collection;

  // Get list of Posts without comments for frontend list view
  public function getList(): Collection;

  // Get a Post by id
  public function getById(mixed $id): ?Post;

  // Get a Post's comment by id for frontend
  // public function getCommentById(mixed $id, string $pin): ?Post;
  // MOVED to PostService

}
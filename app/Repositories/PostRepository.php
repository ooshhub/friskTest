<?php

namespace App\Repositories;

use App\Interfaces\PostInterface;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

use Request;

class PostRepository implements PostInterface
{

  private $post;

  public function __construct(Post $post)
  {
    $this->post = $post;
  }

  public function getAll(): Collection
  {
    return Post::all();
  }

  public function getList(): Collection
  {
    $allPosts = Post::all('id', 'username', 'created_at');
    return $allPosts;
  }

  public function getById($id): ?Post
  {
    $post = Post::where('id', $id)
      ->first()
      ->get();
    return $post;
  }

}
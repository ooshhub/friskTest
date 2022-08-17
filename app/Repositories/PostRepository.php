<?php

namespace App\Repositories;

use App\Interfaces\PostInterface;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Basic Repository for Post
 * Not extended from base repository as only one Model/Table required
 * Inject => Post model
 */

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
      ->first();
    return $post;
  }

  public function create(array $postData): ?Post
  {
    $newPost = new Post;
    $newPost->fill($postData);
    $newPost->created_at = now(); 
    $newPost->save();
    return $newPost;
  }

}
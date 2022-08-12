<?php

namespace App\Services;

use App\Repositories\PostRepository;

class PostService {

  private $postRepository;

  public function __construct(PostRepository $postRepository)
  {
    $this->postRepository = $postRepository;
  }

  // Submit a PIN to grab a post's content
  public function getPostComment(mixed $postId, string $postPin): array
  {
    $post = $this->postRepository->getById($postId);
    if ($post) {
      if ($post->pin === $postPin) {
        return ['data' => $post->comment];
      }
      else return ['error' => 'PIN does not match!'];
    }
    else return ['error' => "Could not find post '${postId}'"];
  }
}
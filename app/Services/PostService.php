<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\PostRepository;
use App\Validators\PostValidator;
use Illuminate\Http\Request;

class PostService {

  private $postRepository;
  private $postValidator;

  public function __construct(PostRepository $postRepository, PostValidator $postValidator)
  {
    $this->postRepository = $postRepository;
    $this->postValidator = $postValidator;
  }

  // Submit a PIN to grab a post's content
  public function getPostComment(mixed $postId, string $postPin): array
  {
    $post = $this->postRepository->getById($postId);
    // return $post;
    if ($post) {
      if ($post->pin === $postPin) {
        return ['message' => $post->message];
      }
      else return ['error' => 'PIN does not match!'];
    }
    else return ['error' => "Could not find post '${postId}'"];
  }

  public function validateAndCreatePost(Request $request)
  {
    $validData = $this->postValidator->validate($request);
    if (isset($validData['errors'])) return $validData;
    else {
      $newPost = $this->postRepository->create($validData['data']);
      return ['id' => $newPost->id];
    }
  }
}
<?php

namespace App\Http\Controllers;

use App\Interfaces\PostInterface;
use App\Repositories\PostRepository;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Main controller class for the app
 * Inject => Repository for CRUD access
 * Inject => Service for logic
 */

class PostController extends Controller
{

  private $postRepository;
  private $postService;

  public function __construct(PostRepository $postRepository, PostService $postService)
  {
    $this->postRepository = $postRepository;
    $this->postService = $postService;

  }

  public function getPostList(): Collection
  {
    return $this->postRepository->getList();
  }

  public function getPostComment(Request $request, mixed $id): array
  {
    $pin = $request->input('pin');
    if ($pin && $id) {
      $response = $this->postService->getPostComment($id, $pin);
      return $response;
    }
    else return ['error' => 'something went wrong'];
  }

  public function submitPost(Request $request)
  {
    $returnData = $this->postService->validateAndCreatePost($request);
    return $returnData;
  }

  public function getPostSummary()
  {
    $csvData = $this->postService->getMessageCountByEmail();
    return $csvData->toJson();
  }
}

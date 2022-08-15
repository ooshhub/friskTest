<?php

namespace App\Validators;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostValidator
{

  public function __construct()
  {
    $this->name = 'Validator';
  }
  private $rules = [
    'username' => 'required|max:24',
    'email' => 'required|email|max:24',
    'pin' => 'required|numeric|digits_between:4,4',
    'message' => 'required|max:48'
  ];

  public function validate(Request $request)
  {
    $validator = Validator::make($request->all(), $this->rules);
    if ($validator->fails()) {
      return ['errors' => $validator->errors()];
    }
    else {
      return ['data' => $validator->valid()];
    }
  }
}
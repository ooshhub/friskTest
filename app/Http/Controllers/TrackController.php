<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function postTrackerData(Request $request, string $any)
    {
      $any = preg_replace('/\.png$/', '', $any);
      $decodedData = $any ? base64_decode(urldecode($any)) : '{}';
      $newTrack = new Track;
      $newTrack->detail = $decodedData;
      $newTrack->save();
      return response()
        ->file(public_path("fremen.png"));
    }
}

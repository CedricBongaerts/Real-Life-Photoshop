<?php

class GameController extends BaseController {

    public function getHighscores()
    {
        $users = User::orderBy('points','DESC')->take(10)->get();
        return Response::json($users);
    }

    public function getHighscoresCriminals()
    {
        $criminals = Criminal::leftJoin('users', 'criminals.userId', '=', 'users.id')
                     ->orderBy('criminals.points','DESC')
                     ->take(10)
                     ->get(array('criminals.points','users.username'));
        return Response::json($criminals);
    }

    public function getHighscoresOfficers()
    {
        $officers = Officer::leftJoin('users', 'officers.userId', '=', 'users.id')
                     ->orderBy('officers.points','DESC')
                     ->take(10)
                     ->get(array('officers.points','users.username'));
        return Response::json($officers);
    }

    public function postNearbyCriminalHighscores()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $userRank = DB::table('criminals')
                    ->where('points','>=',$user->criminal->points)
                    ->count();
        return Response::json(array('user_rank'=>$userRank,'user_name'=>$user->username,'user_points'=>$user->criminal->points));
    }

    public function postLatLong()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $latitude = Input::get('lat');
        $longitude = Input::get('long');
        $user->lat = $latitude;
        $user->long = $longitude;
        $user->save();

        return Response::json(array('lat'=>$latitude,'long'=>$longitude));
    }

    public function postExplode()
    {
        $userId = Input::get('userId');
        $pointsExtra = Input::get('buildingPoints');
        $bombsNeeded = Input::get('bombsNeeded');
        $user = User::find($userId);
        if($user->criminal->bombs >= $bombsNeeded)
        {
            $user->criminal->points += $pointsExtra;
            $user->criminal->bombs -= $bombsNeeded;
            // highscores total
            $user->points += $pointsExtra;
        }
        else if($user->criminal->bombs < 10)
        {
            $user->criminal->points += $pointsExtra;
            $user->criminal->bombs = 0;
            // highscores total
            $user->points += $pointsExtra;
        }
        else if($user->criminal->bombs <= 0)
        {
            $user->criminal->points += 0;
            $user->criminal->bombs = 0;
        }
        $user->save();
        $user->criminal->save(); 

        return Response::json(array('points'=>$user->criminal->points,'bombs'=>$user->criminal->bombs));
    }

    public function postShootCriminal()
    {
        $userId = Input::get('criminalId');
        $user = User::find($userId);
        $pointsWorth = Input::get('scoreIfShot');
        $thisUserId = Input::get('userId');
        $thisUser = User::find($thisUserId);
        if($user->criminal->bombs > 1)
        {
            $user->criminal->bombs -= 10;
            $thisUser->points += $pointsWorth;
            $thisUser->officer->points += $pointsWorth;
            $thisUser->officer->bullets -=1;
            $user->criminal->save();
            $thisUser->save();
            $thisUser->officer->save();

            $bulletsOfficer = $thisUser->officer->bullets;
            $pointsOfficer = $thisUser->officer->points;
            $bombsCriminal = $user->criminal->bombs;

            return Response::json(array('bulletsOfficer'=>$bulletsOfficer,'pointsOfficer'=>$pointsOfficer,'bombsCriminal'=>$bombsCriminal));
        }
        else
        {
            $user->criminal->bombs = 0;
            return Response::json(array('user'=>$user->username));
        }
        
    }

    public function postBombPickUp()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $bomb = new Bomb;
        $bomb->userId = $user->id;
        $bomb->placeId = Input::get('placeId');
        $bomb->save();
        $user->criminal->bombs += 1;
        $user->criminal->save();
        $bombs = $user->bomb->toArray();
        return Response::json(array('numberOfBombs'=>$user->criminal->bombs,'bombs'=>$bombs));
    }

    public function postBulletPickUp()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $bullet = new Bullet;
        $bullet->userId = $user->id;
        $bullet->placeId = Input::get('placeId');
        $bullet->save();
        $user->officer->bullets += 1;
        $user->officer->save();
        $bullets = $user->bullet->toArray();
        return Response::json(array('numberOfBullets'=>$user->officer->bullets,'bullets'=>$bullets));
    }

    public function postBombs()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $bombs = Bomb::where('created_at', '>=', new DateTime('today'))->where('userId', '=', $userId)->get()->toArray();
        return Response::json(array('bombs'=>$bombs));
    }

    public function postBullets()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $bullets = Bullet::where('created_at', '>=', new DateTime('today'))->where('userId', '=', $userId)->get()->toArray();
        return Response::json(array('bullets'=>$bullets));
    }

    public function postBombsCriminal()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $numberOfBombs = $user->criminal->bombs;
        return Response::json(array('numberOfBombs'=>$numberOfBombs));
    }
}
?>
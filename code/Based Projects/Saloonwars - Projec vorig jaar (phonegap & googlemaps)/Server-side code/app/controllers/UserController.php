<?php

use Carbon\Carbon;

class UserController extends BaseController {

	public function postCreate() 
    {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) 
        {
            $user = new User;
            $user->username = Input::get('username');
            $user->email = Input::get('email');
            $user->password = Hash::make(Input::get('password'));
            $user->lat = 0;
            $user->long = 0;
            $user->save();
            $criminal = new Criminal;
            $criminal->userId = $user->id;
            $criminal->bombs = 0;
            $criminal->points = 0;
            $criminal->save();
            $officer = new Officer;
            $officer->userId = $user->id;
            $officer->bullets = 0;
            $officer->points = 0;
            $officer->save();
            
            if(Auth::attempt(array('email'=>Input::get('email'), 'password'=>Input::get('password'))));
            {   
                $response = array(
                    'userId'=>Auth::user()->id,
                    'userName'=>Auth::user()->username,
                    'email'=>Auth::user()->email,
                    'lat'=>Auth::user()->lat,
                    'lon'=>Auth::user()->long,
                    'points'=>Auth::user()->points,
                    'logged_out'=>Auth::user()->logged_out,
                    'role'=>Auth::user()->role,
                    'changed_role'=>Auth::user()->changed_role,
                    'bombs'=>Auth::user()->criminal->bombs,
                    'criminal_points'=>Auth::user()->criminal->points,
                    'bullets'=>Auth::user()->officer->bullets,
                    'officer_points'=>Auth::user()->officer->points);
                return Response::json($response);
            }
        } 
        else 
        {
            $error = $validator->messages();
        	return Response::json($error, 400);
        }
    }

	public function postSignin() 
    {
    	$remember = Input::get('remember');
    	$rememberbool = false;
    	if(!empty($remember))
    	{
    		$rememberbool = true;
    	}
        if (Auth::attempt(array('email'=>Input::get('email'), 'password'=>Input::get('password')),$rememberbool))
        {
        	$response = array(
        		'userId'=>Auth::user()->id,
        		'userName'=>Auth::user()->username,
        		'email'=>Auth::user()->email,
        		'lat'=>Auth::user()->lat,
        		'lon'=>Auth::user()->long,
        		'points'=>Auth::user()->points,
        		'logged_out'=>Auth::user()->logged_out,
        		'role'=>Auth::user()->role,
                'changed_role'=>Auth::user()->changed_role,
                'bombs'=>Auth::user()->criminal->bombs,
                'criminal_points'=>Auth::user()->criminal->points,
                'bullets'=>Auth::user()->officer->bullets,
                'officer_points'=>Auth::user()->officer->points);
        	return Response::json($response);
	 		//return Redirect::to_action('user@index'); you'd use this if it's not AJAX request
           //  $user = Auth::user();
           //  $user->logged_out = null;
           //  $user->save();
          	// return Redirect::to('game/play')->with('message', 'You are now logged in!');
        } 
        else 
        {
        	return Response::json('Your username/password combination was incorrect.', 400);
			/*return Redirect::to_action('home@login')
			-> with_input('only', array('new_username')) 
			-> with('login_errors', true);*/
           	// return Redirect::to('user/login')
            //     ->with('message', 'Your username/password combination was incorrect')
            //     ->withInput();
        }
    }

    public function postLoginFb()
    {
        $facebook = new Facebook(Config::get('facebook'));
        $params = array(
            'redirect_uri' => url('/user/fb-callback'),
            'scope' => 'email',
        );
        return Redirect::to($facebook->getLoginUrl($params));
    }

    public function getFbCallback()
    {
        $code = Input::get('code');
        if (strlen($code) == 0) return Response::json('There was an error communicating with Facebook');
     
        $facebook = new Facebook(Config::get('facebook'));
        $uid = $facebook->getUser();
     
        if ($uid == 0) return Response::json('There was an error');
     
        $me = $facebook->api('/me');

        $profile = Profile::whereUid($uid)->first();
        if (empty($profile)) {
     
            $user = new User;
            $user->username = $me['first_name'].' '.$me['last_name'];
            $user->email = $me['email'];
            $user->photo = 'https://graph.facebook.com/'.$me['username'].'/picture?type=large';
            $user->password = Hash::make($me['first_name']);
            $user->lat = 0;
            $user->long = 0;
            $user->points = 0;
     
            $user->save();
     
            $profile = new Profile();
            $profile->uid = $uid;
            $profile->username = $me['username'];
            $profile = $user->profiles()->save($profile);

            $criminal = new Criminal;
            $criminal->userId = $user->id;
            $criminal->bombs = 0;
            $criminal->save();
            $officer = new Officer;
            $officer->userId = $user->id;
            $officer->bullets = 0;
            $officer->save();
        }
     
        $profile->access_token = $facebook->getAccessToken();
        $profile->save();
     
        $user = $profile->user;
              
        Auth::login($user);
        return Response::json('Logged in with Facebook');
    }

    public function postRole()
    {
        $role = Input::get('role');
        $userId = Input::get('userId');
        $user = User::find($userId);
        $user->role = $role;
        $user->changed_role = Carbon::now();
        $changed_role = $user->changed_role;
        $user->save();

        return Response::json(array('changedRole'=>$changed_role));
    }

    public function postChanged()
    {
        $userId = Input::get('userId');
        $user = User::find($userId);
        $changed_role = $user->changed_role;
        return Response::json(array('changedRole'=>$changed_role));
    }
	
    public function postLogout() 
	{
	    $userId = Input::get('userId');
	    $user = User::find($userId);
	    $user->logged_out = Carbon::now();
	    $user->save();
	    Auth::logout();

	   	return Response::json('You are now logged out!');
	}
}
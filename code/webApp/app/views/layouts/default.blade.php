<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="keywords" content="Run, Track, App">
    <title>Trackerapp</title>
    <meta name="description" content="Trackerapp"/>
    <meta name="viewport" content="width=1000, initial-scale=1.0, maximum-scale=1.0">

    <!-- CSS -->
    <link href="normalize.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">


    <!-- <link rel="shortcut icon" href="img/icon.ico"> -->

    <link href='http://fonts.googleapis.com/css?family=Sanchez:400italic,400' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,900' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:600,700,400' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Merriweather:400,700,300' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Questrial' rel='stylesheet' type='text/css'>
  
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  </head>
  <body>
    <div class="wrapper-for-content-outside-of-footer">
      <!-- <header class="centered-navigation">
        <div class="centered-navigation-wrapper">
          <a href="" class="centered-navigation-menu-button">MENU</a>
          <ul class="centered-navigation-menu">
            <li class="nav-link "><a href="#">??</a></li>
            <li class="nav-link">
              <a id="active-link" href="#">TrackerApp</a>
            </li>
            <li class="nav-link"><a href="#">Login</a></li>
          </ul>
        </div>
      </header> -->
      @yield('body')
    </div><!-- wrapper-for-content-outside-of-footer -->
    <footer class="footer-2">
      <div class="footer-logo">
        <a href="#" class="footer-txt">Trackerapp</a>
      </div>
    </footer>
    <script type="text/javascript">
    $(document).ready(function() {
      var menu = $('.centered-navigation-menu');
      var menuToggle = $('.centered-navigation-menu-button');
      var signUp = $('.sign-up');

      $(menuToggle).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle(function(){
          if(menu.is(':hidden')) {
            menu.removeAttr('style');
          }
        });
      });
    });
    </script>
  </body>
</html>
@extends('layouts.default')
@section('body')
<div id="band1">
	<div class="inner-div">
		<!-- <h1>Band 1</h1> -->
		<img src="img/v1.png">
		<p id="tagline">"Experience a new way of running and creating."</p>
	</div>
</div>

<div id="band2">
	<div class="inner-div">
		<h1>Watch the movie</h1>
		<div class="video">
		  <div class="video-wrapper">
		      <iframe src="http://www.youtube.com/embed/8ItNE_DX6Cc?showinfo=0&iv_load_policy=3&controls=0" frameborder="0" allowfullscreen></iframe>
		  </div>
		</div>
	</div>
</div>

<div id="band3">
	<div class="inner-div">
		<!-- <h1>Download</h1> -->
		<div class="device-background">
		  <div class="device-text">
		    <h1>Download the App</h1>
		    <p>Experience a new way of running and creating. But the most important part is to have a lot of fun. Share your creations.</p>
		    <!-- <button class="btn btn-8 btn-8g">Download for Android</button> -->
		    
<!-- 		    <img id="android" src="img/android.png">
 -->		    <a href="#" class="btn btn-8 btn-8g">Download for Android</a>
		  	
		  </div>
		  <div class="device">
		    <div class="screen"></div>
		  </div>
		</div>
	</div>
</div>

<div id="band4">
	<div class="inner-div">
<!-- 		<h1>Comments? How to?</h1>
 -->	</div>
</div>

<div id="band5">
	<div class="inner-div">
		<div id="left-ftr">
			<h2>Contact</h2>
			<p>Cedric Bongaerts</p>
			<a href="mailto:cedric.bongaerts@student.kdg.be">cedric.bongaerts@student.kdg.be</a>
			<p>Verena Vertonghen</p>
			<a href="mailto:verena.vertonghen@student.kdg.be">verena.vertonghen@student.kdg.be</a>
		</div>
		<div id="right-ftr">
			<img class="social-icon" src="img/grey/facebook.png">
			<img class="social-icon" src="img/grey/twitter.png">
			<img class="social-icon" src="img/grey/you_tube.png">
			<img class="social-icon" src="img/grey/vimeo.png">
		</div>
	</div>
</div>

@stop

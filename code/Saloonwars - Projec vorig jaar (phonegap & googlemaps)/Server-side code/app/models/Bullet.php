<?php
 
class Bullet extends Eloquent {
 
    protected $table = 'bullets';
 
    public function user()
    {
        return $this->belongsTo('User');
    }
 
}
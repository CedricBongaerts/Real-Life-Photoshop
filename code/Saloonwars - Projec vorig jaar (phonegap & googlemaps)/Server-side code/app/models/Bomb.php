<?php
 
class Bomb extends Eloquent {
 
    protected $table = 'bombs';
 
    public function user()
    {
        return $this->belongsTo('User');
    }
 
}
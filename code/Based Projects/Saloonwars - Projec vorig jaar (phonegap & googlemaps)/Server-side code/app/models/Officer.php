<?php
 
class Officer extends Eloquent {
 
    protected $table = 'officers';
 
    public function user()
    {
        return $this->belongsTo('User');
    }
 
}
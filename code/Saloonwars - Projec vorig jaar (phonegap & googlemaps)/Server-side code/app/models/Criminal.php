<?php
 
class Criminal extends Eloquent {
 
    protected $table = 'criminals';
 
    public function user()
    {
        return $this->belongsTo('User');
    }
 
}
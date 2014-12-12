<?php
 
class Building extends Eloquent {
 
    protected $table = 'buildings';
 
    public function user()
    {
        return $this->belongsTo('User');
    }
 
}
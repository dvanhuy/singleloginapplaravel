<?php

namespace App\Providers;

use App\Extensions\CustomDBSessionHandle;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;

class CustomDBSessionProvider extends ServiceProvider
{
    protected $config;
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.E
     */
    public function boot(): void
    {   
        Session::extend('customsession', function (Application $app) {
            // Return an implementation of SessionHandlerInterface...
            $this->config = $app->make('config');
            $table = $this->config->get('session.table');
            $lifetime = $this->config->get('session.lifetime');
            $connection = $this->config->get('session.connection');
            $getconnect = $app->make('db')->connection($connection);
            return new CustomDBSessionHandle($getconnect, $table, $lifetime, $app);
        });
    }
}

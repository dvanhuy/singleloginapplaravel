<?php

namespace App\Extensions;

use Illuminate\Session\DatabaseSessionHandler;

class CustomDBSessionHandle extends DatabaseSessionHandler
{
    protected function getDefaultPayload($data)
    {
        $request = app('request');
        $payload = [
            'payload' => base64_encode($data),
            'last_activity' => $this->currentTime(),
            'page_login' => $request->header('Origin'),
        ];

        if (! $this->container) {
            return $payload;
        }

        return tap($payload, function (&$payload) {
            $this->addUserInformation($payload)
                 ->addRequestInformation($payload);
        });
    }
}

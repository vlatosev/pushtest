<?php

namespace ED\WebsocketBundle\Controller;

use Guzzle\Http\Client;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/test-push/{name}", name="test_push")
     * @Template()
     */
    public function indexAction($name)
    {
        $client = new Client('http://localhost');
        $request = $client->createRequest('POST', '/', [
            'body' => [
                'message' => 'hello'
            ]]);
        $request->setPort(3017);
        $response = $request->send();
        return array(
            'name' => $name,
            'response' => $response->getBody()
        );
    }
}

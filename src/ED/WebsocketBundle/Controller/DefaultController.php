<?php

namespace ED\WebsocketBundle\Controller;

use GuzzleHttp\Client;
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
    $session = $this->get('session')->getId();
//        $session = $this->get('session.storage')->getBag($this->container->getParameter('session.storage.options'));
    $client = new Client([
        'base_url' => 'http://localhost:3017',
    ]);
    $request = $client->createRequest('POST', '/register-user', [
        'json' => [
            'session_id' => $session,
            'message' => 'hello'
        ]]);
    $response = $client->send($request);
    return array(
        'name' => $name,
        'response' => $response->getBody()
    );
  }
}

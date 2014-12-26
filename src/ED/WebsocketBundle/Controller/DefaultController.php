<?php

namespace ED\WebsocketBundle\Controller;

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
        return array(
            'name' => $name
        );
    }
}

<?php

namespace ED\WebsocketBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class NodeController extends Controller
{
  /**
   * @param $type
   * @param array $receiver_user_ids
   * @param array $data
   *
   * @Route("/node-contact/{type}/{receiver_user_ids}/{data}")
   */
  function emit($type, $receiver_user_ids = array(), $data = array())
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1');

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:'));
    curl_setopt($ch, CURLOPT_PORT, 8001);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
    // curl_setopt($ch, CURLOPT_VERBOSE, 1);

    curl_setopt($ch, CURLOPT_POST, true);

    $pf = array('recv_id' => $receiver_user_ids, 'type' => $type, 'data' => $data);
    // $pf = array('recv_id' => $receiver_user_id, 'type' => $type, 'data' => array());

    // foreach($data as $k => $v) {
    // $pf['data'][$k] = $v;
    // }

    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($pf));

    curl_exec($ch);
    // $info = curl_getinfo($ch);
    // var_dump($info);
    curl_close($ch);

  }

}

<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
  /**
   * @Route("", name="app_default_default")
   */
  public function defaultAction()
  {
    return $this->render('pages/default.html.twig', array());
  }
}

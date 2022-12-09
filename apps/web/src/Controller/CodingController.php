<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/coding")
 */
class CodingController extends AbstractController
{
  /**
   * @Route("", name="app_coding_default")
   */
  public function defaultAction()
  {
    return $this->render('pages/coding/default.html.twig', array());
  }

  /**
   * @Route("/typography", name="app_coding_typography")
   */
  public function typographyAction()
  {
    return $this->render('pages/coding/typography.html.twig', array());
  }
}

<?php


namespace App\Controller;


use App\Entity\PageModal\PageModal;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiController
 * @package App\Controller
 * @Route("/api-modal")
 */
class ApiModalController extends AbstractController
{

  /**
   * @param Request $request
   * @return Response
   * @Route("/page-modal-preview/{id}", name="app_api_page_modal")
   */
  public function pageModalPreviewAction(PageModal $pageModal)
  {
      return $this->render('pageModal/pageModalBase.html.twig', array(
          'pageModal' => $pageModal
      ));
  }
}

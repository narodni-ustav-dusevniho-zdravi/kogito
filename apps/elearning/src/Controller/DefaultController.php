<?php


namespace App\Controller;


use App\Entity\Blog\BlogArticle;
use App\Entity\Contact\Question;
use App\Entity\Page;
use App\Form\Contact\QuestionType;
use App\Service\LocaleService;
use App\Service\ResenderService;
use Swift_Mailer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{

  /**
   * @Route("", name="app_default_default")
   */
  public function homepageAction(Request $request): Response
  {
    return $this->pageAction($request,'');
  }

  /**
   * @Route("/sitemap.xml", name="app_sitemap")
   */
  public function sitemapAction(): Response
  {
    $em = $this->getDoctrine()->getManager();
    $pages = $em->getRepository(Page::class)->findBy(array(
      'enabled' => true,
    ));

    $blogArticles = $em->getRepository(BlogArticle::class)->findBy(array(
      'enable' => true
    ));

    $response = new Response();
    $response->headers->add(array('Content-Type' => 'application/xml'));

    return $this->render('sitemap/sitemap.xml.twig', array(
      'pages' => $pages,
      'blogArticles' => $blogArticles
    ), $response);
  }

  /**
   * @Route("/kontakt", name="app_contact")
   */
  public function contactPageAction(Request $request): Response
  {
    $em = $this->getDoctrine()->getManager();
    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlug($request->getLocale(), 'kontakt');

    if ($page === null || $page->isEnabled() === false || $page->isSubpage()) {
      throw new NotFoundHttpException();
    }

    $form = $this->createForm(QuestionType::class);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
      $question = $form->getData();
      $em->persist($question);
      $em->flush();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page,
      'form' => $form->createView(),
    ));
  }

  /**
   * @Route("/{slug}", name="app_default_pageAction")
   */
  public function pageAction(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlug($request->getLocale(), $slug);

    if($page === null || $page->isEnabled() === false || $page->isSubpage()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-zeny/{slug}", name="app_default_pageAction_forWomen")
   */
  public function pageActionForWomen(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forWomen', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomenPostpartum() || $page->isForWomenPregnancy() || $page->isForProfessionals() || $page->isForProfessionalsPostpartum() || $page->isForProfessionalsPregnancy() || $page->isForLovedOnes()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-zeny/po-porodu/{slug}", name="app_default_pageAction_forWomen_postpartum")
   */
  public function pageActionForWomenPostpartum(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forWomenPostpartum', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomen() || $page->isForWomenPregnancy() || $page->isForProfessionals() || $page->isForProfessionalsPostpartum() || $page->isForProfessionalsPregnancy() || $page->isForLovedOnes()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-zeny/tehotenstvi/{slug}", name="app_default_pageAction_forWomen_pregnancy")
   */
  public function pageActionForWomenPregnancy(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forWomenPregnancy', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomen() || $page->isForWomenPostpartum() || $page->isForProfessionals() || $page->isForProfessionalsPostpartum() || $page->isForProfessionalsPregnancy() || $page->isForLovedOnes()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-odborniky/{slug}", name="app_default_pageAction_forProfessionals")
   */
  public function pageActionForProfessionals(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forProfessionals', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomen() || $page->isForWomenPostpartum() || $page->isForWomenPregnancy() || $page->isForProfessionalsPostpartum() || $page->isForProfessionalsPregnancy() || $page->isForLovedOnes()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-odborniky/po-porodu/{slug}", name="app_default_pageAction_forProfessionals_postpartum")
   */
  public function pageActionForProfessionalsPostpartum(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forProfessionalsPostpartum', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomen() || $page->isForWomenPregnancy() || $page->isForWomenPostpartum() || $page->isForProfessionals() || $page->isForProfessionalsPregnancy() || $page->isForLovedOnes()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-odborniky/tehotenstvi/{slug}", name="app_default_pageAction_forProfessionals_pregnancy")
   */
  public function pageActionForProfessionalsPregnancy(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forProfessionalsPregnancy', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomen() || $page->isForWomenPregnancy() || $page->isForWomenPostpartum() || $page->isForProfessionals() || $page->isForProfessionalsPostpartum() || $page->isForLovedOnes()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/pro-blizke/{slug}", name="app_default_pageAction_forLovedOnes")
   */
  public function pageActionForLovedOnes(Request $request, string $slug): Response
  {
    $em = $this->getDoctrine()->getManager();

    /** @var Page $page */
    $page = $em->getRepository(Page::class)->findByLocaleAndSlugAndCustomParam($request->getLocale(), $slug, 'forLovedOnes', true);

    if($page === null || $page->isEnabled() === false || $page->isSubpage() === false || $page->isForWomen() || $page->isForWomenPostpartum() || $page->isForWomenPregnancy() || $page->isForProfessionals() || $page->isForProfessionalsPostpartum() || $page->isForProfessionalsPregnancy()){
      throw new NotFoundHttpException();
    }

    return $this->render($page->getTemplate(), array(
      'page' => $page
    ));
  }

  /**
   * @Route("/locale/{locale}", name="app_locale")
   *
   * set locale as en or cs
   *
   * @param $locale
   * @param Request $request
   * @param LocaleService $localService
   *
   * @return Response
   */
  public function locale(
    $locale,
    Request $request,
    LocaleService $localService
  ): Response
  {
    $localService->switchLocale($locale, $request);

    return $this->redirectToRoute('app_default_default');
  }

}

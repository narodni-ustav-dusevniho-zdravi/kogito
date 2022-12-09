<?php


namespace App\Controller;

use App\Entity\Blog\BlogArticle;
use App\Entity\Page;
use App\Form\Blog\BlogSearchType;
use App\Model\Blog\BlogSearch;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * Class BlogController
 * @package App\Controller
 * @Route("/aktuality")
 * @Route({
 *     "en": "/news"
 *     })
 */
class BlogController extends AbstractController
{

  /**
   * @Route("", name="app_blog_default")
   * @Route("/", name="app_blog_default_slash")
   */
  public function listAction(Request $request): Response
  {
    $entityManager = $this->getDoctrine()->getManager();

    $blogSearch = new BlogSearch();
    $blogSearchForm = $this->createForm(BlogSearchType::class, $blogSearch);
    $blogSearchForm->submit($request->query->get($blogSearchForm->getName()));

    $blogSearchResult = $entityManager->getRepository(BlogArticle::class)
        ->findBySearch($blogSearch);

    $page = $entityManager->getRepository(Page::class)->findOneBy(array('handle' => 'blog'));

    $headerArticles = $entityManager->getRepository(BlogArticle::class)->findForBlogHeaderSection();

    return $this->render('pages/articleList.html.twig', array(
        'blogSearchForm'    => $blogSearchForm->createView(),
        'blogSearchResult'  => $blogSearchResult,
        'page'              => $page,
        'headerArticles'    => $headerArticles
    ));
  }

  /**
   * @Route("/{id}/{categorySlug}/{slug}", name="app_blog_detail")
   * @Route({"en": "/{id}/{categorySlugEn}/{slugEn}"}, name="app_blog_detail")
   * @ParamConverter("category", options={"mapping":{"categorySlug" = "slug"}})
   */
  public function detailAction(BlogArticle $blogArticle, Request $request): Response
  {
    $entityManager = $this->getDoctrine()->getManager();

    if (!$blogArticle->isEnable()) {
        return $this->redirectToRoute('app_blog_default');
    }

    $nextArticle = $entityManager->getRepository(BlogArticle::class)->findNext($blogArticle);
    $prevArticle = $entityManager->getRepository(BlogArticle::class)->findPrev($blogArticle);

    $page = $entityManager->getRepository(Page::class)->findOneBy(array('handle' => 'blog-detail'));

    return $this->render('pages/article.html.twig', array(
        'article'       => $blogArticle,
        'nextArticle'   => $nextArticle,
        'prevArticle'   => $prevArticle,
        'page'          => $page,
    ));
  }
}

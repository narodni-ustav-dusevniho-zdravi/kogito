<?php

namespace App\Twig;

use App\Entity\Component;
use App\Entity\Menu;
use App\Entity\MenuItem;
use App\Service\ComponentManager;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\RouterInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class HelperExtension extends AbstractExtension
{
  /** @var RouterInterface */
  private $router;

  /** @var ComponentManager*/
  private $componentManager;

  /** @var ManagerRegistry */
  private $registry;

  /** @var Request */
  private $masterRequest;

  /** @var array  */
  private $loadedComponents = array();

  /**
   * HelperExtension constructor.
   */
  public function __construct(
    RouterInterface $router,
    ComponentManager $componentManager,
    ManagerRegistry $registry,
    RequestStack $requestStack
  )
  {
    $this->router = $router;
    $this->componentManager = $componentManager;
    $this->registry = $registry;
    $this->masterRequest = $requestStack->getMasterRequest();
  }

  public function getFunctions()
  {
    return array(
      new TwigFunction('generatePathToPage', array($this, 'generatePathToPage')),
      new TwigFunction('renderComponent', array($this, 'renderComponent'), array('needs_environment' => true, 'is_safe' => array('html'))),
      new TwigFunction('getMenu', array($this, 'getMenu')),
      new TwigFunction('getComponent', array($this, 'getComponent')),
    );
  }

  public function generatePathToPage(MenuItem $menuItem): string
  {
    $locale = $this->masterRequest->getLocale();

    $page = $menuItem->getTargetPage();
    if ($page === null) {
        return $menuItem->getTargetHrefForLanguage($locale);
    }

    if ($page->isHomepage()) {
        return $this->router->generate('app_default_default');
    }

    if ($page->isForWomen()) {
      return $this->router->generate('app_default_pageAction_forWomen', array('slug' => $page->getSlugByLocale($locale)));
    }

    if ($page->isForWomenPostpartum()) {
      return $this->router->generate('app_default_pageAction_forWomen_postpartum', array('slug' => $page->getSlugByLocale($locale)));
    }

    if ($page->isForWomenPregnancy()) {
      return $this->router->generate('app_default_pageAction_forWomen_pregnancy', array('slug' => $page->getSlugByLocale($locale)));
    }

    if ($page->isForProfessionals()) {
      return $this->router->generate('app_default_pageAction_forProfessionals', array('slug' => $page->getSlugByLocale($locale)));
    }

    if ($page->isForProfessionalsPostpartum()) {
      return $this->router->generate('app_default_pageAction_forProfessionals_postpartum', array('slug' => $page->getSlugByLocale($locale)));
    }

    if ($page->isForProfessionalsPregnancy()) {
      return $this->router->generate('app_default_pageAction_forProfessionals_pregnancy', array('slug' => $page->getSlugByLocale($locale)));
    }

    if ($page->isForLovedOnes()) {
      return $this->router->generate('app_default_pageAction_forLovedOnes', array('slug' => $page->getSlugByLocale($locale)));
    }

    return $this->router->generate('app_default_pageAction', array('slug' => $page->getSlugByLocale($locale)));
  }

  public function renderComponent(Environment $enviroment, Component $component): string
  {
    return $this->componentManager->renderComponent($enviroment, $component);
  }

  public function getMenu(string $handle): ?Menu
  {
    return $this->registry->getRepository(Menu::class)->findOneBy(array(
        'handle' => $handle
    ));
  }

  public function getComponent(string $type): ?Component
  {
    if(!isset($this->loadedComponents[$type])){
        $this->loadedComponents[$type] = $this->registry->getRepository(Component::class)->findOneBy(array(
            'type' => $type
        ));
    }

    return $this->loadedComponents[$type] ?? null;
  }
}

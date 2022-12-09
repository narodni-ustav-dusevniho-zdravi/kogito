<?php

namespace App\Service\PageModal;

use App\Entity\PageModal\PageModal;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig\Environment;

class PageModalHelper extends AbstractExtension
{
    protected $formFactory;
    protected $router;
    protected $registry;

    /**
     * ServiceRequestFormHelper constructor.
     */
    public function __construct(FormFactoryInterface $formFactory, RouterInterface $router, ManagerRegistry $registry)
    {
        $this->formFactory = $formFactory;
        $this->router = $router;
        $this->registry = $registry;
    }

    public function getFunctions()
    {
        return array(
            new TwigFunction('displayModal',
                array($this, 'renderModal'),
                array('needs_environment' => true,'is_safe' => ['html'])),
            new TwigFunction('displayModalOnAllPages',
                array($this, 'renderModalOnAllPages'),
                array('needs_environment' => true,'is_safe' => ['html']))
        );
    }

    public function renderModal(Environment $environment, PageModal $pageModal, Request $request)
    {
        if ($this->isPageModalActive($pageModal, $request)) {

            return $environment->render('pageModal/pageModal.html.twig', array(
                'pageModal' => $pageModal
            ));
        }
    }

    public function renderModalOnAllPages(Environment $environment, Request $request)
    {
        $pageModals = $this->registry->getRepository(PageModal::class)
            ->findActiveOnAllPages();

        $displayPageModals = [];
        foreach ($pageModals as $pageModal) {
            if ($pageModal && !$request->cookies->has($pageModal->getPageModalId())) {
                $displayPageModals[] = $pageModal;
            }
        }

        if (!empty($displayPageModals)) {
            return $environment->render('pageModal/pageModals.html.twig', array(
                'pageModals' => $displayPageModals
            ));
        }
    }

    private function isPageModalActive(PageModal $pageModal, Request $request): bool
    {
        $now = new \DateTime();
        if (($pageModal->getStart() < $now && $now < $pageModal->getEnd())
            && $pageModal->isEnable()
            && !$pageModal->isDisplayOnAllPages()
            && !$request->cookies->has($pageModal->getPageModalId()))
        {
            return true;
        }

        return false;
    }
}

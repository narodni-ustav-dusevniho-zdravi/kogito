<?php

namespace App\Service;

use App\Entity\Component;
use App\Service\Component\BaseComponent;
use App\Service\Component\Blog\BlogHeader;
use App\Service\Component\Common\BannerTop;
use App\Service\Component\Common\GlobalInformation;
use App\Service\Component\Homepage\FaqBlock;
use App\Service\Component\Homepage\HomepageHeader;
use Twig\Environment;

class ComponentManager
{
    private $components = array();

    public function __construct(
      GlobalInformation $commonGlobalInformation,

      HomepageHeader $homepageHeader,
      FaqBlock $faqBlock,
      BannerTop $bannerTop,
      BlogHeader $blogHeader
    )
    {
      $this->components = [
        GlobalInformation::$SYSTEM_COMPONENT_NAME    => $commonGlobalInformation,

        HomepageHeader::$SYSTEM_COMPONENT_NAME       => $homepageHeader,
        FaqBlock::$SYSTEM_COMPONENT_NAME             => $faqBlock,
        BannerTop::$SYSTEM_COMPONENT_NAME            => $bannerTop,
        BlogHeader::$SYSTEM_COMPONENT_NAME           => $blogHeader
      ];
    }

    public function getComponentSettings(Component $component): BaseComponent
    {
        if (isset($this->components[$component->getType()])) {
            return $this->components[$component->getType()];
        }

        throw new \Exception('Missing component');
    }

    public function renderComponent(Environment $enviroment, Component $component): string
    {
        return $this->getComponentSettings($component)->render($enviroment, $component);
    }
}

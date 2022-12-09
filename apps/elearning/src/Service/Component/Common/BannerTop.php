<?php


namespace App\Service\Component\Common;


use App\Entity\Component;
use App\Form\Content\BannerSliderItem;
use App\Service\Component\BaseComponent;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;

class BannerTop extends BaseComponent
{
  static  $SYSTEM_COMPONENT_NAME = 'commonBannerTop';

  public function getTemplateName(): string
  {
      return '';
  }

  public function prepareForm(FormBuilderInterface $builder)
  {
    $builder
        ->add('displayDesktopBanner', CheckboxType::class, array(
            'label' => 'Zobrazit banner na desktopu',
            'required' => false
        ))
        ->add('displayMobileBanner', CheckboxType::class, array(
            'label' => 'Zobrazit banner na mobilu',
            'required' => false
        ))
        ->add('time', NumberType::class)
        ->add('slides', CollectionType::class, array(
            'label' => 'Slidy',
            'entry_type' => BannerSliderItem::class,
            'allow_add' => true,
            'allow_delete' => true,
            'prototype' => true,
            'by_reference' => true,
            'attr' => array(
                'class' => 'change-order'
            )
        ))
        ;
  }

  public static function prepareDefaultData(array $options = array()): Component
  {
    return Component::create(
      'commonBannerTop', array(
        'displayDesktopBanner' => false,
        'displayMobileBanner' => false,
        'time' => 5,
        'slides'     => array(
            array(
                'desktopBanner'     => array(
                    'cs'      => 'Devstack desktop banner',
                    'en'      => 'Devstack desktop banner',
                    '_type'   => 'translated'
                ),
                'mobileBanner'     => array(
                    'cs'      => 'Devstack mobile banner',
                    'en'      => 'Devstack mobile banner',
                    '_type'   => 'translated'
                ),
                'bannerLink' => array(
                  'cs'      => '#',
                  'en'      => '#',
                  '_type'   => 'translated'
                ),
                'position' => 1
            ),
            array(
              'desktopBanner'     => array(
                'cs'      => 'Devstack desktop banner 2',
                'en'      => 'Devstack desktop banner 2',
                '_type'   => 'translated'
              ),
              'mobileBanner'     => array(
                'cs'      => 'Devstack mobile banner 2',
                'en'      => 'Devstack mobile banner 2',
                '_type'   => 'translated'
              ),
              'bannerLink' => array(
                'cs'      => '#',
                'en'      => '#',
                '_type'   => 'translated'
              ),
              'position' => 2
            ),
        )
    ), 'Banner'
    );
  }

  public function handleSaving(Component $component)
  {
    parent::handleSaving($component);

    $data = $component->getData();
    $newSlides = null;
    $maxPosition = count($data['slides']);
    foreach ($data['slides'] as $slide) {
        if($slide['position'] !== null) {
            $newSlides[$slide['position']] = $slide;
        } else {
            $slide['position'] = $maxPosition;
            $newSlides[$maxPosition] = $slide;
        }
    }

    $data['slides'] = $newSlides;

    $component->setData($data);
  }
}

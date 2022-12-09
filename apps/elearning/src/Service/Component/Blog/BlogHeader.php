<?php

namespace App\Service\Component\Blog;

use App\Entity\Component;
use App\Form\Item\TranslatableProperty;
use App\Service\Component\BaseComponent;
use Symfony\Component\Form\FormBuilderInterface;

class BlogHeader extends BaseComponent
{
  static  $SYSTEM_COMPONENT_NAME = 'blogHeader';

  public static function prepareDefaultData(array $options = array()): Component
  {
    return Component::create(self::$SYSTEM_COMPONENT_NAME, array_merge(array(
      'headline' => array(
          'cs'      => 'Seznam článků',
          'en'      => 'Seznam článků',
          '_type'   => 'translated'
      ),
    ), $options), 'Blog header'
    );
  }

  public function getTemplateName(): string
  {
    return '';
  }

  public function prepareForm(FormBuilderInterface $builder)
  {
    $builder
      ->add('headline', TranslatableProperty::class, array(
        'label' => 'Nadpis',
      ))
    ;
  }
}

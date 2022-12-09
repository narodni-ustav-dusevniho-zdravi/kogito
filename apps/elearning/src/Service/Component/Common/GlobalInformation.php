<?php


namespace App\Service\Component\Common;


use App\Entity\Component;
use App\Service\Component\BaseComponent;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class GlobalInformation extends BaseComponent
{
  static  $SYSTEM_COMPONENT_NAME = 'commonGlobalInformation';

  public function getTemplateName(): string
  {
      return '';
  }

  public function prepareForm(FormBuilderInterface $builder)
  {
    $builder
        ->add('contactName', TextType::class)
        ->add('contactEmail', TextType::class)
        ->add('contactPhone', TextType::class)
        ->add('copyrightText', TextType::class)
//        ->add('addressLine1', TextType::class)
//        ->add('addressLine2', TextType::class)
//        ->add('linkFacebook', TextType::class)
//        ->add('linkInstagram', TextType::class)
//        ->add('linkLinkedin', TextType::class)
        ;
  }

  public static function prepareDefaultData(array $options = array()): Component
  {
    return Component::create(
      self::$SYSTEM_COMPONENT_NAME, array(
        'contactName'  => 'Test Test',
        'contactEmail' => 'test@mountainlift.cz',
        'contactPhone' => '+420 777 888 999',
        'copyrightText' => 'Devstack',
//        'addressLine1' => '',
//        'addressLine2' => '',
//        'linkFacebook' => '#',
//        'linkInstagram'=> '#',
//        'linkYoutube'  => '#'
    ), 'Globální kontakty'
    );
  }
}

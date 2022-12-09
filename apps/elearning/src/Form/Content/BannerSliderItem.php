<?php


namespace App\Form\Content;


use App\Form\Item\TranslatableProperty;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;

class BannerSliderItem extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('desktopBanner', TranslatableProperty::class, array(
        'label' => 'Banner na desktopu',
        'attr' => array(
            'class' => 'desktop-banner'
        )
      ))
      ->add('mobileBanner', TranslatableProperty::class, array(
        'label' => 'Banner na mobilu',
        'attr' => array(
            'class' => 'mobile-banner'
        )
      ))
      ->add('bannerLink', TranslatableProperty::class, array(
        'label' => 'Link z baneru (pro prázdný zadejte #)'
      ))
      ->add('position', IntegerType::class, array(
          'attr' => array(
              'readonly' => true,
              'class'    => 'my-position',
          )
      ))
    ;
  }
}

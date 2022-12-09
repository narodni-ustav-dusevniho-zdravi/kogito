<?php

namespace App\Form\Item;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TranslatableProperty extends AbstractType
{
  private $defaultLocale;
  private $appLocales;

  /**
   * TranslatableText constructor.
   */
  public function __construct(string $defaultLocale = 'cs', string $appLocales = 'cs')
  {
    $this->defaultLocale = $defaultLocale;
    $this->appLocales = explode('|', $appLocales);
  }

  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    foreach($this->appLocales as $currentLocale){
      $builder->add($currentLocale, $options['type'], array(
        'label' => $currentLocale,
        'attr' => array(
          'data-lang' => $currentLocale,
          'class' => $options['enableEditor']? 'ckeditor' : ''
        )
      ));
    }

    $builder->addModelTransformer(new CallbackTransformer(
      function($value){
        if(!is_array($value)){
          $ret = array('_type' => 'translated');

          foreach($this->appLocales as $locale){
            $ret[$locale] = $value;
          }

          return $ret;
        }

        return $value;
      },
      static function($value){
        $value['_type'] = 'translated';
        return $value;
      }
    ));
  }

  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults(array(
      'type' => TextType::class,
      'enableEditor' => false
    ));
  }
}
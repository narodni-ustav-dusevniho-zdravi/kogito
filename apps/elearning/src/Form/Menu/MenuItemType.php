<?php

namespace App\Form\Menu;

use App\Entity\MenuItem;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuItemType extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('name', null, array(
        'label' => 'Jméno'
      ))
      ->add('type', ChoiceType::class, array(
        'label'   => 'Typ',
        'choices' => array(
          'Odkaz na stránku (Vyber stránku v listu)' => MenuItem::TYPE_PAGE,
          'Odkaz pryč (Vyplň odkaz)'                 => MenuItem::TYPE_OUTSIDE
        )
      ))
      ->add('openInTargetBlank', null, array(
        'required' => false,
        'label'    => 'Oteřít v nové záložce'
      ))
      ->add('targetHref', TextType::class, array(
        'label'      => 'Odkaz pryč (včetně http/https), musí být vybráno v typu Odkaz pryč, jinak nezáleží',
        'required'   => false,
        'empty_data' => ''
      ))
      ->add('targetPage', null, array(
        'label' => 'Cílová stránka (V případě Odkazu pryč nezáleží na vybrané variantě)'
      ));
  }

  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults([
      'data_class' => MenuItem::class
    ]);
  }
}
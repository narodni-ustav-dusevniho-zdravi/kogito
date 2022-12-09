<?php

declare(strict_types=1);

namespace App\Admin;

use App\Service\GlobalSettingsService;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class GlobalSettingsAdmin extends AbstractAdmin
{
  /** @var GlobalSettingsService */
  private $globalSettingsService;

  /**
   * ContactFormSettingsAdmin constructor.
   */
  public function __construct(string $code, string $class, string $baseControllerName, GlobalSettingsService $globalSettings)
  {
    parent::__construct($code, $class, $baseControllerName);

    $this->globalSettingsService = $globalSettings;
  }

  protected function configureRoutes(RouteCollection $collection)
  {
    $collection->remove('create');
    $collection->remove('delete');
    $collection->remove('export');
  }

  protected function configureFormFields(FormMapper $formMapper): void
  {
    $formMapper
      ->add('enabledLanguages', ChoiceType::class, array(
        'label'    => 'Povolené jazyky (mimo hlavní jazyk)',
        'multiple' => true,
        'expanded' => true,
        'choices'  => array(
          'Angličtina' => 'en'
        )
      ))
      ->add('emailResenderTargetEmail', TextType::class, array(
        'label' => 'Email pro přeposílání zpráv v kontaktním formuláři, pokud není vyplněno, neposílá níc, lze zadat více, oddělit čárkou',
        'required' => false
      ))
      ->add('emailResenderFromEmail', TextType::class, array(
        'label' => 'Email FROM - od koho',
        'required' => false
      ))
      ;
    ;

  }
}

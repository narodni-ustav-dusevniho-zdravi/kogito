<?php

namespace App\Service\Component\Homepage;

use App\Entity\Component;
use App\Form\Content\TableRow;
use App\Form\Item\TranslatableProperty;
use App\Repository\Content\FrequentlyAskedQuestionRepository;
use App\Service\Component\BaseComponent;
use App\Service\DataProviderHelper;
use App\Service\FileResizer;
use App\Service\FileUploader;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class FaqBlock extends BaseComponent
{
  static  $SYSTEM_COMPONENT_NAME = 'faqBlock';

  private $faqRepository;

  public function __construct(FileUploader $fileUploader, FileResizer $fileResizer, RequestStack $requestStack, FrequentlyAskedQuestionRepository $faqRepository)
  {
    parent::__construct($fileUploader, $fileResizer, $requestStack);

    $this->faqRepository = $faqRepository;
  }

  protected function prepareRenderData(Component $component): array
  {
    $renderData = parent::prepareRenderData($component);

    $data = $component->getData();

    $renderData['faqs'] = $this->faqRepository->findBy(array('enable' => true));

    return $renderData;
  }

  public static function prepareDefaultData(array $options = array()): Component
  {
    return Component::create(self::$SYSTEM_COMPONENT_NAME, array_merge(array(
      'headline' => array(
        'cs'    => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
        'en'    => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
        '_type' => 'translated'
      ),
    ), $options), 'FAQs'
    );
  }

  public function getTemplateName(): string
  {
    return 'components/homepage/faq.html.twig';
  }

  public function prepareForm(FormBuilderInterface $builder)
  {
    $builder
      ->add('headline', TranslatableProperty::class, array(
        'label' => 'Nadpis'
      ))
    ;
  }
}

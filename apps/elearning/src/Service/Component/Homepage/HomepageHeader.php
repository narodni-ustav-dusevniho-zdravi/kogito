<?php

namespace App\Service\Component\Homepage;

use App\Entity\Component;
use App\Form\Content\HomepageSliderItem;
use App\Form\Item\TranslatableProperty;
use App\Service\Component\BaseComponent;
use App\Service\DataProviderHelper;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class HomepageHeader extends BaseComponent
{
  static  $SYSTEM_COMPONENT_NAME = 'homepageHeader';

  public static function prepareDefaultData(array $options = array()): Component
  {
    return Component::create(self::$SYSTEM_COMPONENT_NAME, array_merge(array(
      'headline' => array(
        'cs' => 'Headline Test',
        'en' => 'Headline Test',
        '_type'   => 'translated'
      ),
      'text' => array(
        'cs' => '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor porttitor accumsan. Pellentesque pretium lectus id turpis. Cras elementum. Aenean placerat. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Etiam posuere lacus quis dolor. Aenean placerat. Nullam faucibus mi quis velit. Duis condimentum augue id magna semper rutrum. Etiam posuere lacus quis dolor. Aenean vel massa quis mauris vehicula lacinia. Etiam quis quam. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Sed convallis magna eu sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam eget nisl. Praesent vitae arcu tempor neque lacinia pretium.</p>',
        'en' => '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor porttitor accumsan. Pellentesque pretium lectus id turpis. Cras elementum. Aenean placerat. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Etiam posuere lacus quis dolor. Aenean placerat. Nullam faucibus mi quis velit. Duis condimentum augue id magna semper rutrum. Etiam posuere lacus quis dolor. Aenean vel massa quis mauris vehicula lacinia. Etiam quis quam. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Sed convallis magna eu sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam eget nisl. Praesent vitae arcu tempor neque lacinia pretium.</p>',
        '_type'   => 'translated'
      ),
      'sliderItems' => array(
        array(
          'headline' => array(
            'cs' => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
            'en' => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
            '_type'   => 'translated'
          ),
          'text'=> array(
            'cs' => '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
            'en' => '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
            '_type'   => 'translated'
          ),
          'image' => $options['image1'],
          'imageName' => array(
            'cs' => '',
            'en' => '',
            '_type'   => 'translated'
          )
        ),
        array(
          'headline' => array(
            'cs' => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit 2',
            'en' => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit 2',
            '_type'   => 'translated'
          ),
          'text'=> array(
            'cs' => '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
            'en' => '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
            '_type'   => 'translated'
          ),
          'image' => $options['image2'],
          'imageName' => array(
            'cs' => '',
            'en' => '',
            '_type'   => 'translated'
          )
        ),
      )
    ), $options), 'Hlavička homepage'
    );
  }

  public function getTemplateName(): string
  {
    return 'components/homepage/header.html.twig';
  }

  public function prepareForm(FormBuilderInterface $builder)
  {
    $builder
      ->add('headline', TranslatableProperty::class, array(
        'label' => 'Nadpis'
      ))
      ->add('text', TranslatableProperty::class, array(
        'label' => 'Text',
        'type' => TextareaType::class,
        'enableEditor' => true
      ))
      ->add('sliderItems', CollectionType::class, array(
        'label' => 'Položky ve slideru',
        'entry_type' => HomepageSliderItem::class,
        'allow_add' => true,
        'allow_delete' => true
      ))
    ;
  }

  public function handleSaving(Component $component)
  {
    parent::handleSaving($component);

    $data = $component->getData();
    $keys = array_keys($data['sliderItems']);
    foreach ($keys as $i) {
      if ($data['sliderItems'][$i]['imageUpload'] instanceof UploadedFile) {

        $data['sliderItems'][$i]['image'] = $this->fileUploader->saveFile(
          $data['sliderItems'][$i]['imageUpload'],
          array()
        );

        $data['sliderItems'][$i]['imageUpload'] = null;
      }
    }

    $component->setData($data);
  }
}

<?php


namespace App\Form\Content;


use App\Form\ImageFileWithPreviewType;
use App\Form\Item\TranslatableProperty;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

class HomepageSliderItem extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
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
      ->add('imageUpload', ImageFileWithPreviewType::class, array(
        'label' => 'Obrázek, ideálně (900px x 532px) PNG',
        'required'   => false,
        'data_class'    => null,
        'data_attribute' => 'image',
        'attr' => array(
          'class' => 'upload'
        )
      ))
      ->add('imageName', TranslatableProperty::class, array(
        'label' => 'Název obrázku',
        'required' => false
      ))
    ;
  }
}

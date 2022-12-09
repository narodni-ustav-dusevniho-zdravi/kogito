<?php


namespace App\Form\Blog;


use App\Entity\Blog\BlogGalleryImage;
use App\Form\ImageFileWithPreviewType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BlogGalleryImageType extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('nameCs', TextType::class, array(
        'label' => 'Název fotky CZ'
      ))
      ->add('nameEn', TextType::class, array(
        'label' => 'Název fotky EN'
      ))
      ->add('uploadedImage', ImageFileWithPreviewType::class, array(
        'label' => 'Obrázek, ideálně (px x px) PNG',
        'required'   => false,
        'data_class'    => null,
        'data_attribute' => 'image',
        'attr' => array(
          'class' => 'upload'
        )
      ))
    ;
  }

  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults([
        'data_class' => BlogGalleryImage::class,
        'translation_domain' => 'blogArticle'
    ]);
  }
}

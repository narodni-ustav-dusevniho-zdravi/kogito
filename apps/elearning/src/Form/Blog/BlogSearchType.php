<?php


namespace App\Form\Blog;


use App\Entity\Blog\BlogCategory;
use App\Model\Blog\BlogSearch;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

class BlogSearchType extends AbstractType
{
  private $translator;

  public function __construct(TranslatorInterface $translator)
  {
    $this->translator = $translator;
  }

  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    /** @var BlogSearch $currentSearchData */
    $currentSearchData = $options['data'];

    $builder
      ->add('category', EntityType::class, array(
          'label'         => false,
          'required'      => false,
          'multiple'      => false,
          'expanded'      => true,
          'choice_label'  => 'nameCs',
          'class'         => BlogCategory::class,
          'placeholder'   => $this->translator->trans('blogCategoryAll', array(), 'blog')
      ))
      ->add('orderBy', HiddenType::class)
      ->add('offset', HiddenType::class)
      ->add('limit', HiddenType::class);

  }

  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => BlogSearch::class,
      'method'     => 'GET',
      'translation_domain' => 'blog'
    ));
  }
}
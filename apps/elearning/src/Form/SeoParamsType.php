<?php


namespace App\Form;



use App\Entity\SeoParams;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SeoParamsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('robots', ChoiceType::class, array(
                'label' => 'Metatag robots',
                'choices' => SeoParams::$robotsChoices
            ))
            ->add('pageTitle', TextType::class, array(
                'label' => '<title>, doporučený formát <název stránky>| Devstack'
            ))
            ->add('keyWords', TextType::class, array(
                'label' => 'Metatag keywords',
                'required' => false,
                'empty_data' => ''
            ))
            ->add('author', TextType::class, array(
                'label' => 'Metatag author',
                'required' => false,
                'empty_data' => ''
            ))
            ->add('ogTitle', TextType::class, array(
                'label' => 'Metatag og:title',
                'required' => false,
                'empty_data' => ''
            ))
            ->add('ogSiteName', TextType::class, array(
                'label' => 'Metatag og:site-name',
                'required' => false,
                'empty_data' => ''
            ))
            ->add('ogDescription', TextType::class, array(
                'label' => 'Metatag og:description',
                'required' => false,
                'empty_data' => ''
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SeoParams::class,
        ]);
    }
}

<?php

declare(strict_types=1);

namespace App\Admin;

use App\Entity\Content\FrequentlyAskedQuestion;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

final class FrequentlyAskedQuestionAdmin extends AbstractAdmin
{
    protected $translationDomain = 'frequentlyAskedQuestion';

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
        $datagridMapper
//            ->add('id')
//            ->add('added')
//            ->add('updated')
//            ->add('questionCs')
//            ->add('questionEn')
//            ->add('answerCs')
//            ->add('answerEn')
            ;
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('questionCs')
            ->add('_action', null, [
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                ],
            ]);
    }

    protected function configureFormFields(FormMapper $formMapper): void
    {
        $formMapper
            ->add('questionCs', TextareaType::class, array(
              'label' => 'Otázka CZ'
            ))
//            ->add('questionEn', TextareaType::class, array(
//              'label' => 'Otázka EN'
//            ))
            ->add('answerCs', TextareaType::class, array(
              'label' => 'Odpoveď CZ',
              'attr' => array(
                  'class' => 'ckeditor'
              )
            ))
//            ->add('answerEn', TextareaType::class, array(
//              'label' => 'Odpoveď EN',
//              'attr' => array(
//                  'class' => 'ckeditor'
//              )
//            ))

            ->add('enable', CheckboxType::class, array(
              'label' => 'Zobrazit',
              'required' => false,
            ))
            ;
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('questionCs')
//            ->add('questionEn')
            ->add('answerCs')
//            ->add('answerEn')
            ->add('enable')
            ;
    }
}

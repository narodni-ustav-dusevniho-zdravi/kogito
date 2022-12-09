<?php

declare(strict_types=1);

namespace App\Admin;

use App\Constant\Contact\QuestionStatus;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

final class QuestionAdmin extends AbstractAdmin
{
    protected $datagridValues = [
        '_page'       => 1,
        '_per_page'   => 32,
        '_sort_order' => 'ASC',
        '_sort_by'    => 'added',
    ];

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('create');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
        $datagridMapper
            ->add('added',null, array(
                'label' => 'Přídán'
            ))
            ;
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('added',null, array(
                'label' => 'Přídán'
            ))
            ->add('fullName', null, array(
                'label' => 'Jméno'
            ))
            ->add('email', null, array(
                'label' => 'Email'
            ))
            ->add('phoneNumber', null, array(
                'label' => 'Telefon'
            ))
            ->add('message', null, array(
                'label' => 'Zpráva'
            ))
            ->add('getStatusText', null, array(
                'label' => 'Stav'
            ))
            ->add('_action', null, [
                'label' => 'Akce',
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
            ->add('fullName', null, array(
                'label' => 'Jméno'
            ))
            ->add('email', null, array(
                'label' => 'Email'
            ))
            ->add('phoneNumber', null, array(
                'label' => 'Telefon'
            ))
            ->add('message', null, array(
                'label' => 'Zpráva'
            ))
            ->add('status', ChoiceType::class, array(
              'label' => 'Status',
              'choices' => array(
                'created' => QuestionStatus::CREATED,
                'done'    => QuestionStatus::DONE,
              )
            ))
            ;
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('added',null, array(
                'label' => 'Přídán'
            ))
            ->add('fullName', null, array(
                'label' => 'Jméno'
            ))
            ->add('email', null, array(
                'label' => 'Email'
            ))
            ->add('phoneNumber', null, array(
                'label' => 'Telefon'
            ))
            ->add('message', null, array(
                'label' => 'Zpráva'
            ))
            ->add('getStatusText', null, array(
                'label' => 'Stav'
            ))
            ;
    }
}

<?php

declare(strict_types=1);

namespace App\Admin;

use App\Entity\Component;
use App\Form\AdminComponentDataType;
use App\Service\ComponentManager;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

final class CommonComponentAdmin extends AbstractAdmin
{
    const LABELS = array(
        'enabled' => 'Zobrazit',
        'position' => 'Pořadí',
        'group' => 'Skupina',
        'type' => 'Název bloku',
        'data' => 'Data bloku',
        'action' =>'Akce'
    );

    protected $datagridValues = [
        '_page' => 1,
        '_per_page' => 32,
        '_sort_order' => 'ASC',
        '_sort_by' => 'position',
    ];

    private $componentManager;

    public function __construct(string $code, string $class, string $baseControllerName, ComponentManager $componentManager)
    {
        parent::__construct($code, $class, $baseControllerName);

        $this->componentManager = $componentManager;
    }

    public function createQuery($context = 'list')
    {
        $query = parent::createQuery();

        $query->andWhere(
            "{$query->getRootAliases()[0]}.page is null"
        );

        return $query;
    }


    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
    }

    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('create');
        $collection->remove('delete');
        $collection->remove('export');
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('adminDescription', null, [
                'label' => 'Popis'
            ])
            ->add('dataHumanDescription', 'text', [
                'label' => self::LABELS['data'],
                'template' => 'admin/custom.html.twig'
            ])
            ->add('_action', null, [
                'actions' => [
                    'edit' => [],
                ],
                'label' => 'Akce'
            ]);
    }

    protected function configureFormFields(FormMapper $formMapper): void
    {
        $formMapper
            ->add('data', AdminComponentDataType::class, array(
                'label' => 'Obsah datové komponenty',
                'data_class' => null,
                'component' => $this->getSubject()
            ))
        ;
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
    }

    public function preUpdate($component)
    {
        // just to be sure lol
        if($component instanceof Component)
        {
            $this->handleSaving($component);
        }
    }

    public function prePersist($component)
    {
        // just to be sure lol
        if($component instanceof Component)
        {
            $this->handleSaving($component);
        }
    }

    public function handleSaving(Component $component)
    {
//        $componentManager = $this->getConfigurationPool()->getContainer()->get(ComponentManager::class);
        $this->componentManager->getComponentSettings($component)->handleSaving($component);
    }
}

<?php

declare(strict_types=1);

namespace App\Admin;

use App\Entity\Component;
use App\Form\AdminComponentDataType;
use App\Service\ComponentManager;
use Knp\Menu\ItemInterface as MenuItemInterface;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Admin\AdminInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

final class ComponentAdmin extends AbstractAdmin
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

    protected function configureRoutes(RouteCollection $collection)
    {
        if ($this->isChild()) {
            $collection->remove('create');
//            $collection->remove('export');
            return;
        }
        // This is the route configuration as a parent
        $collection->clear();
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
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
            ->add('enabled', null, [
                'label' => self::LABELS['enabled']
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
            ->add('enabled', CheckboxType::class, [
                'label' => self::LABELS['enabled'],
                'help' => 'Zaškrtněte pro zobrazení',
                'required' => false,
            ])
            ->add('data', AdminComponentDataType::class, array(
                'label' => 'Obsah datové komponenty',
                'data_class' => null,
                'component' => $this->getSubject()
            ))
            ;
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('id')
            ->add('enabled', null, [
                'label' => self::LABELS['enabled']
            ])
            ->add('position', null, [
                'label' => self::LABELS['position']
            ])
            ->add('group', null, [
                'label' => self::LABELS['group']
            ])
            ->add('type', null, [
                'label' => self::LABELS['type']
            ])
            ->add('data', null, [
                'label' => self::LABELS['data']
            ])
            ;
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

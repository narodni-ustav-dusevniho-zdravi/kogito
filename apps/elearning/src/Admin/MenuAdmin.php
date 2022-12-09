<?php

declare(strict_types=1);

namespace App\Admin;

use Knp\Menu\ItemInterface as MenuItemInterface;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Admin\AdminInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class MenuAdmin extends AbstractAdmin
{
    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('create');
        $collection->remove('delete');
        $collection->remove('export');
    }

    protected function configureSideMenu(MenuItemInterface $menu, $action, AdminInterface $childAdmin = null)
    {
        if (!$childAdmin && !in_array($action, ['edit', 'show'])) {
            return;
        }

        $admin = $this->isChild() ? $this->getParent() : $this;
        $id = $admin->getRequest()->get('id');

        if ($this->isGranted('EDIT')) {
            $menu->addChild('Upravit stránku', [
                'uri' => $admin->generateUrl('edit', ['id' => $id])
            ]);
        }

        if ($this->isGranted('LIST')) {
            $menu->addChild('Upravit odkazy', [
                'uri' => $admin->generateUrl('App\Admin\MenuItemAdmin.list', ['id' => $id])
            ]);
            $menu->addChild('Přidat odkaz', [
                'uri' => $admin->generateUrl('App\Admin\MenuItemAdmin.create', ['id' => $id])
            ]);
        }
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('adminDescription', null,array(
                'label' => 'Popisek'
            ))
            ->add('_action', null, [
                'label' => 'Akce',
                'actions' => [
                    'edit' => [],
                    'list' => ['template' => 'admin/menuLink.html.twig'],
                ],
            ]);
    }

    protected function configureFormFields(FormMapper $formMapper): void
    {
        $formMapper
            ->add('adminDescription', TextType::class, array(
                'label' => 'Jméno v administraci (pouze pro referenci)'
            ));
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
    }
}

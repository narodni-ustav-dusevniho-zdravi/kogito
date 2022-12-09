<?php

declare(strict_types=1);

namespace App\Admin;

use App\Entity\Component;
use App\Entity\Menu;
use App\Entity\MenuItem;
use App\Entity\Page;
use App\Form\SeoParamsType;
use App\Service\ComponentManager;
use Knp\Menu\ItemInterface as MenuItemInterface;
use phpDocumentor\Reflection\Type;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Admin\AdminInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class PageAdmin extends AbstractAdmin
{
    /** @var Page */
    protected $subject;

    CONST LABELS = array(
        'handle'              => 'Identifikátor',
        'slug'                => 'URL',
        'position'            => 'Pořadí',
        'enabled'             => 'Zobrazit',
        'displayInMainMenu'   => 'Zobrazit v hlavním menu',
        'displayInFooterMenu' => 'Zobrazit ve footer menu',
        'template'            => 'Šablona',
        'mainMenuName'        => 'Název v hlavním menu',
        'footerMenuName'      => 'Název ve footer menu',
        'action'              => 'Akce'
    );

    protected $datagridValues = [
        '_page'       => 1,
        '_per_page'   => 32,
        '_sort_order' => 'ASC',
        '_sort_by'    => 'position',
    ];

    /**
     * @var ManagerRegistry
     */
    private $registry;

    public function __construct(string $code, string $class, string $baseControllerName, ManagerRegistry $registry)
    {
        parent::__construct($code, $class, $baseControllerName);

        $this->registry = $registry;
    }

    protected function configureSideMenu(MenuItemInterface $menu, $action, AdminInterface $childAdmin = null)
    {
        if (!$childAdmin && !in_array($action, ['edit', 'show'])) {
            return;
        }

        $admin = $this->isChild() ? $this->getParent() : $this;
        $id = $admin->getRequest()->get('id');

//        $menu->addChild('Zobrazit stránku', [
//            'uri' => $admin->generateUrl('show', ['id' => $id])
//        ]);

        if ($this->isGranted('EDIT')) {
            $menu->addChild('Upravit stránku', [
                'uri' => $admin->generateUrl('edit', ['id' => $id])
            ]);
        }

        if ($this->isGranted('LIST')) {
            $menu->addChild('Upravit komponenty', [
                'uri' => $admin->generateUrl('App\Admin\ComponentAdmin.list', ['id' => $id])
            ]);
        }
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('handle', null, [
                'label' => self::LABELS['handle'],
            ])
            ->add('adminDescription', null, [
                'label' => 'Admin popisek'
            ])
            ->add('position', null, [
                'label' => self::LABELS['position']
            ])
            ->add('enabled', null, [
                'label' => self::LABELS['enabled']
            ])
            ->add('_action', null, [
                'actions' => [
                    'edit' => [],
                    'list' => ['template' => 'admin/link.html.twig'],
                ],
                'label'   => 'Akce',
            ]);
    }

    protected function configureFormFields(FormMapper $formMapper): void
    {
        $formMapper
            ->with('Stránka')
            ->add('enabled', null, [
                'label'    => self::LABELS['enabled'],
                'required' => false
            ])
        ;

        if ($this->subject->isEnableChangeHandle()) {
            $formMapper->add('handle', null, [
                'label' => 'Identifikátor stránky (nikde se nezobrazuje, použitý v kódu, musí být jedinečný)'
            ]);
        }

        if ($this->subject->isEnableChangeSlug()) {
            $formMapper->add('slug', null, [
                'label' => 'Jméno v URL (část za /), nepoužívat mezery, diakritiku, slova oddělovat pomlčkama'
            ]);
            $formMapper->add('slugEn', null, [
              'label' => 'Jméno v URL (část za /), pro anglický překlad'
            ]);
        }

        $formMapper
            ->add('page_title', TextType::class, array(
                'label' => 'Nadpis CZ'
            ))
            ->add('page_title_en', TextType::class, array(
                'label' => 'Nadpis stránky EN'
            ))
        ;

        $formMapper
            ->add('position', null, [
                'label' => self::LABELS['position']
            ])
        ;
        $formMapper->end();


        if($this->subject->getId() === null){
            $formMapper->with('Prvotní přidání do menu');

            $formMapper
                ->add('addToMainMenu', CheckboxType::class, array(
                    'label' => 'Přidat do hlavního menu',
                    'required' => false
                ))
                ->add('addToFooterMenu', CheckboxType::class, array(
                    'label' => 'Přidat do footer menu',
                    'required' => false
                ));

            $formMapper->end();
        }

        if (!$this->subject->isEnableChangingComponents()) {
            $formMapper->with('Textový obsah stránky');

            $formMapper
                ->add('headline', TextType::class, array(
                    'label' => 'Nadpis',
                ))
                ->add('textContent', null, [
                    'label' => 'Obsah stránky',
                    'enableEditor' => true,
                ]);

            $formMapper->end();
        }

        $formMapper
            ->with('Seo Parametry - Česky')
                ->add('seoParams', SeoParamsType::class)
            ->end()
            ->with('Seo Parametry - Anglicky')
              ->add('seoParamsEn', SeoParamsType::class)
            ->end();
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('id')
            ->add('handle', null, [
                'label' => self::LABELS['handle']
            ])
            ->add('slug', null, [
                'label' => self::LABELS['slug']
            ])
            ->add('position', null, [
                'label' => self::LABELS['position']
            ])
            ->add('enabled', null, [
                'label' => self::LABELS['enabled']
            ])
            ->add('displayInMainMenu', null, [
                'label' => self::LABELS['displayInMainMenu']
            ])
            ->add('displayInFooterMenu', null, [
                'label' => self::LABELS['displayInFooterMenu']
            ])
            ->add('template', null, [
                'label' => self::LABELS['template']
            ])
            ->add('mainMenuName', null, [
                'label' => self::LABELS['mainMenuName']
            ])
            ->add('footerMenuName', null, [
                'label' => self::LABELS['footerMenuName']
            ]);
    }

    public function prePersist($page)
    {
        // just to be sure lol
        if($page instanceof Page)
        {
            if($page->isAddToMainMenu()){
                $mainMenu = $this->registry->getRepository(Menu::class)
                    ->findOneBy(array('handle' => 'main-menu'));

                $menuItem = new MenuItem();
                $menuItem->setMenu($mainMenu);
                $menuItem->setName($page->getHeadline());
                $menuItem->setTargetPage($page);

                $page->addMenuItem($menuItem);
            }

            if($page->isAddToMainMenu()){
                $footerMenu = $this->registry->getRepository(Menu::class)
                    ->findOneBy(array('handle' => 'footer-menu'));

                $menuItem = new MenuItem();
                $menuItem->setMenu($footerMenu);
                $menuItem->setName($page->getHeadline());
                $menuItem->setTargetPage($page);

                $page->addMenuItem($menuItem);
            }
        }
    }
}

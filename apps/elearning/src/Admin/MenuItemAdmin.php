<?php

declare(strict_types=1);

namespace App\Admin;

use App\Entity\Menu;
use App\Entity\MenuItem;
use App\Form\Item\TranslatableProperty;
use App\Form\Menu\MenuItemType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class MenuItemAdmin extends AbstractAdmin
{
  /** @var string */
  private $defaultLocale;
  /** @var array */
  private $appLocales;

  protected $datagridValues = [
    '_page'       => 1,
    '_per_page'   => 32,
    '_sort_order' => 'ASC',
    '_sort_by'    => 'position',
  ];

  /**
   * MenuItemAdmin constructor.
   */
  public function __construct($code, $class, $baseControllerName, string $defaultLocale = 'cs', string $appLocales = 'cs')
  {
    parent::__construct($code, $class, $baseControllerName);

    $this->defaultLocale = $defaultLocale;
    $this->appLocales = explode('|', $appLocales);
  }


  public function createQuery($context = 'list')
  {
    $query = parent::createQuery();

    $query->andWhere(
      "{$query->getRootAliases()[0]}.parent is null"
    );

    return $query;
  }

  public function preUpdate($object)
  {
    if ($object instanceof MenuItem) {
      /** @var MenuItem $subMenuItem */
      foreach ($object->getChildren() as $subMenuItem) {
        $subMenuItem->setMenu($object->getMenu());
      }

      $object->updateOriginalProperties($this->defaultLocale);
    }
  }

  protected function configureRoutes(RouteCollection $collection)
  {
    if ($this->isChild()) {
      $collection->remove('export');
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
      ->add('name', null, array(
        'label' => 'Jm??no'
      ))
      ->add('position', null, array(
        'label' => 'Pozice (??im vy?????? t??m n????e)'
      ))
      ->add('_action', null, [
        'label'   => 'Akce',
        'actions' => [
          'edit'   => [],
          'delete' => [],
        ],
      ]);
  }

  protected function configureFormFields(FormMapper $formMapper): void
  {
    $formMapper
      ->add('nameTranslated', TranslatableProperty::class, array(
        'label' => 'Jm??no'
      ))
      ->add('type', ChoiceType::class, array(
        'label'   => 'Typ',
        'choices' => array(
          'Odkaz na str??nku (Vyber str??nku v listu)' => MenuItem::TYPE_PAGE,
          'Odkaz pry?? (Vypl?? odkaz)'                 => MenuItem::TYPE_OUTSIDE
        )
      ))
      ->add('openInTargetBlank', null, array(
        'required' => false,
        'label'    => 'Ote????t v nov?? z??lo??ce'
      ))
      ->add('targetHrefTranslated', TranslatableProperty::class, array(
        'label'      => 'Odkaz pry?? (v??etn?? http/https), mus?? b??t vybr??no v typu Odkaz pry??, jinak nez??le????',
        'required'   => false,
        'empty_data' => ''
      ))
      ->add('targetPage', null, array(
        'label' => 'C??lov?? str??nka (V p????pad?? Odkazu pry?? nez??le???? na vybran?? variant??)'
      ))
      ->add('position', IntegerType::class, array(
        'label' => 'Pozice v r??mci menu'
      ))
      ->add('children', CollectionType::class, array(
        'entry_type'   => MenuItemType::class,
        'label'        => 'Pododkazy',
        'allow_add'    => true,
        'allow_delete' => true,
        'by_reference' => false,
      ));
  }

  protected function configureShowFields(ShowMapper $showMapper): void
  {
  }
}

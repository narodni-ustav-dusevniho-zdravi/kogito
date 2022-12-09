<?php

declare(strict_types=1);

namespace App\Admin\Blog;

use App\Entity\Blog\BlogCategory;
use Cocur\Slugify\Slugify;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class BlogCategoryAdmin extends AbstractAdmin
{
    protected $translationDomain = 'blogCategory';

    public function __construct($code, $class, $baseControllerName)
    {
        parent::__construct($code, $class, $baseControllerName);
    }

    public function prePersist($download)
    {
        $this->manageFileUpload($download);
    }

    public function preUpdate($download)
    {
        $this->manageFileUpload($download);
    }

    private function manageFileUpload(BlogCategory $blogCategory)
    {
        $slugify = new Slugify();
        $blogCategory->setSlug($slugify->slugify($blogCategory->getNameCs()));
        $blogCategory->setSlugEn($slugify->slugify($blogCategory->getNameEn()));
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
        $datagridMapper
            ->add('id')
            ->add('added')
            ;
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('nameCs')
            ->add('nameEn')
            ->add('slug')
            ->add('slugEn')
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
            ->add('nameCs', TextType::class, array(
              'label' => 'Název CZ'
            ))
            ->add('nameEn', TextType::class, array(
              'label' => 'Název EN'
            ))
            ;
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('added')
            ->add('updated')
            ->add('nameCs')
            ->add('nameEn')
            ->add('slug')
            ->add('slugEn')
            ->add('position')
            ;
    }
}

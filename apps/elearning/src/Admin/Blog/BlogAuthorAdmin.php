<?php

declare(strict_types=1);

namespace App\Admin\Blog;

use App\Entity\Blog\BlogAuthor;
use App\Form\ImageFileWithPreviewType;
use App\Service\FileUploader;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\File\UploadedFile;

final class BlogAuthorAdmin extends AbstractAdmin
{
    private $fileUploader;

    protected $translationDomain = 'blogAuthor';

    public function __construct($code, $class, $baseControllerName, FileUploader $fileUploader)
    {
        parent::__construct($code, $class, $baseControllerName);

        $this->fileUploader = $fileUploader;
    }

    public function prePersist($download)
    {
        $this->manageFileUpload($download);
    }

    public function preUpdate($download)
    {
        $this->manageFileUpload($download);
    }

    private function manageFileUpload(BlogAuthor $blogAuthor)
    {
        if($blogAuthor->getUploadedImage() instanceof UploadedFile) {
            $blogAuthor->setImage($this->fileUploader->saveFile($blogAuthor->getUploadedImage(), array()));
        }
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
            ->add('descriptionCs')
            ->add('descriptionEn')
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
              'label' => 'Jméno CZ'
            ))
            ->add('nameEn', TextType::class, array(
              'label' => 'Jméno EN'
            ))
            ->add('descriptionCs', TextType::class, array(
                'label' => 'Popis CZ'
            ))
            ->add('descriptionEn', TextType::class, array(
                'label' => 'Popis EN'
            ))
            ->add('uploadedImage', ImageFileWithPreviewType::class, [
                'label' => 'Obrázek, ideálně (50px x 50px) PNG',
                'data_attribute' => 'image',
                'required' => false,
                'data_class' => null,
                'attr' => array(
                  'class' => 'upload'
                )
            ])
            ;
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('added')
            ->add('nameCs')
            ->add('nameEn')
            ->add('descriptionCs')
            ->add('descriptionEn')
            ->add('image')
            ;
    }
}

<?php

declare(strict_types=1);

namespace App\Admin\Blog;

use App\Entity\Blog\BlogArticle;
use App\Entity\Blog\BlogAuthor;
use App\Entity\Blog\BlogCategory;
use App\Entity\Blog\BlogGalleryImage;
use App\Entity\SeoParams;
use App\Form\Blog\BlogGalleryImageType;
use App\Form\ImageFileWithPreviewType;
use App\Service\FileUploader;
use Cocur\Slugify\Slugify;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\CollectionType;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Sonata\Form\Type\DateTimePickerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\File\UploadedFile;

final class BlogArticleAdmin extends AbstractAdmin
{
    private $fileUploader;

    protected $perPageOptions = [64, 128, 256, 'All'];

    protected $datagridValues = [
        '_page'       => 1,
        '_per_page'   => 128,
        '_sort_order' => 'ASC',
        '_sort_by'    => 'position',
    ];

    protected $maxPerPage = 128;

    protected $translationDomain = 'blogArticle';

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

    private function manageFileUpload(BlogArticle $blogArticle)
    {
        $slugify = new Slugify();
        $blogArticle->setSlug($slugify->slugify($blogArticle->getTitleCs()));
        $blogArticle->setSlugEn($slugify->slugify($blogArticle->getTitleEn()));

        if($blogArticle->getUploadedImage() instanceof UploadedFile) {
            $blogArticle->setImage($this->fileUploader->saveFile($blogArticle->getUploadedImage(), array()));
        }

        foreach ($blogArticle->getGalleryImages() as $galleryImage){
            /** @var BlogGalleryImage $galleryImage */
            if($galleryImage->getUploadedImage() instanceof UploadedFile){
                $galleryImage->setImage($this->fileUploader->saveFile($galleryImage->getUploadedImage(), array()));
            }

            $galleryImage->setArticle($blogArticle);
        }
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
    {
        $datagridMapper
            ->add('id')
            ->add('titleCs')
            ->add('titleEn')
            ->add('category')
            ->add('enable')
            ->add('displayOnHomepage')
            ->add('displayOnBlogPage')
            ;
    }

    protected function configureListFields(ListMapper $listMapper): void
    {
        $listMapper
            ->add('titleCs')
            ->add('titleEn')
            ->add('enable')
            ->add('displayOnHomepage')
            ->add('displayOnBlogPage')
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
        /** @var BlogArticle $blogArticle */
        $blogArticle = $this->getSubject();

        $imageHelp = null;
        $thumbnailImageHelp = null;
        $mainTextImage = null;
        if ($blogArticle && ($webPath = $blogArticle->getImage())) {
            $imageHelp = '<img src="'.$webPath.'" class="admin-preview"/>';
        }

        $formMapper
            ->add('published', DateTimePickerType::class, array(
                'label' => 'Datum publikace',
                'widget' => 'single_text',
            ))
            ->add('titleCs', TextareaType::class, array(
                'label' => 'Název CZ'
            ))
            ->add('titleEn', TextareaType::class, array(
                'label' => 'Název EN'
            ))
            ->add('smallTitleCs', TextType::class, array(
                'label' => 'Malý název nahoře CZ',
                'required' => false,
                'empty_data' => ''
            ))
            ->add('smallTitleEn', TextType::class, array(
              'label' => 'Malý název nahoře EN',
              'required' => false,
              'empty_data' => ''
            ))
            ->add('seoRobotsCs', ChoiceType::class, array(
                'label' => 'Seo metatag robots CZ',
                'choices' => SeoParams::$robotsChoices
            ))
            ->add('seoRobotsEn', ChoiceType::class, array(
                'label' => 'Seo metatag robots EN',
                'choices' => SeoParams::$robotsChoices
            ))
            ->add('seoPageTitleCs', TextType::class, array(
                'label' => 'CZ : <title>, doporučený formát <název stránky>| Eurotyres Praha'
            ))
            ->add('seoPageTitleEn', TextType::class, array(
                'label' => 'EN : <title>, doporučený formát <název stránky>| Eurotyres Praha'
            ))
            ->add('seoContentCs', TextareaType::class, array(
                'label' => 'Seo metatag description CZ'
            ))
            ->add('seoContentEn', TextareaType::class, array(
                'label' => 'Seo metatag description EN'
            ))
            ->add('uploadedImage', ImageFileWithPreviewType::class, array(
                'label' => 'Obrázek v headeru (ideálně 1088px x 500px)',
                'required' => false,
                'data_class' => null,
                'data_attribute' => 'image',
                'attr' => array(
                  'class' => 'upload'
                )
            ))
            ->add('mainTextCs', TextareaType::class, array(
                'label' => 'Hlavní text CZ',
                'required' => false,
                'empty_data' => '',
                'attr' => array(
                    'class' => 'ckeditor'
                )
            ))
            ->add('mainTextEn', TextareaType::class, array(
                'label' => 'Hlavní text EN',
                'required' => false,
                'empty_data' => '',
                'attr' => array(
                    'class' => 'ckeditor'
                )
            ))
            ->add('category', EntityType::class, array(
                'class' => BlogCategory::class,
                'label' => 'Kategorie',
            ))
            ->add('author', EntityType::class, array(
                'class' => BlogAuthor::class,
                'label' => 'Autor'
            ))
            ->add('enable', CheckboxType::class, array(
                'label' => 'Zobrazit',
                'required' => false,
            ))
            ->add('displayOnBlogPage', CheckboxType::class, array(
                'label' => 'Zobrazit na stránce s články nahoře - zobrazí se pouze 2 články',
                'required' => false,
            ))
            ->add('displayOnHomepage', CheckboxType::class, array(
                'label' => 'Zobrazit na homepage - zobrazí se pouze 2 články',
                'required' => false
            ))
            ->end();

//        $formMapper
//            ->with('Galerie')
//            ->add('galleryImages', CollectionType::class, array(
//                'label' => 'Obrázky v galerii',
//                'entry_type' => BlogGalleryImageType::class,
//                'allow_add' => true,
//                'allow_delete' => true
//            ))
//            ->end();
    }

    protected function configureShowFields(ShowMapper $showMapper): void
    {
        $showMapper
            ->add('added')
            ->add('updated')
            ->add('nameCs')
            ->add('nameEn')
            ->add('mainTextCs', 'html')
            ->add('mainTextEn', 'html')
            ->add('image')
            ->add('category')
            ->add('enable')
            ->add('displayOnBlogPage')
            ->add('displayOnHomepage')
            ;
    }
}

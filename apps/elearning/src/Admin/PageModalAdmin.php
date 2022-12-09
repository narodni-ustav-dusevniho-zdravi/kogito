<?php

declare(strict_types=1);

namespace App\Admin;

use App\Constant\PageModalType;
use App\Entity\PageModal\PageModal;
use App\Form\ImageFileWithPreviewType;
use App\Service\FileUploader;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\File\UploadedFile;

final class PageModalAdmin extends AbstractAdmin
{
  private $fileUploader;

  protected $translationDomain = 'pageModal';

  public function __construct(string $code, string $class, string $baseControllerName, FileUploader $fileUploader)
  {
    parent::__construct($code, $class, $baseControllerName);

    $this->fileUploader = $fileUploader;
  }

  protected function configureDatagridFilters(DatagridMapper $datagridMapper): void
  {
    $datagridMapper
      ->add('added')
      ->add('updated')
      ->add('start')
      ->add('end');
  }

  protected function configureListFields(ListMapper $listMapper): void
  {
    $listMapper
      ->add('id')
      ->add('titleCs')
      ->add('updated')
      ->add('start')
      ->add('end')
      ->add('enable')
      ->add('type')
      ->add('_action', null, [
        'actions' => [
          'show' => [],
          'edit' => [],
          'delete' => [],
          'showModal' => ['template' => 'admin/pageModal.html.twig']
        ],
      ]);
  }

  protected function configureFormFields(FormMapper $formMapper): void
  {
    $formMapper

      ->add('titleCs', TextType::class, array(
        'label' => 'Nadpis CZ'
      ))
      ->add('titleEn', TextType::class, array(
        'label' => 'Nadpis EN'
      ))
      ->add('uploadedImage', ImageFileWithPreviewType::class, array(
        'label' => 'Obrázek (ideálně 672px x 315px)',
        'required' => false,
        'data_class' => null,
        'data_attribute' => 'image',
        'attr' => [
          'class' => 'upload',
        ]
      ))
      ->add('contentCs', TextareaType::class, array(
        'label' => 'Obsah CZ',
        'attr' => array(
            'class' => 'ckeditor'
        )
      ))
      ->add('contentEn', TextareaType::class, array(
        'label' => 'Obsah EN',
        'attr' => array(
            'class' => 'ckeditor'
        )
      ))
      ->add('linkCs', TextType::class, array(
        'label' => 'Odkaz CZ - nechte prázdné, pokud chcete aby uživatel zůstal na stejné stránce',
        'required' => false,
        'empty_data' => ''
      ))
      ->add('linkEn', TextType::class, array(
        'label' => 'Odkaz EN - nechte prázdné, pokud chcete aby uživatel zůstal na stejné stránce',
        'required' => false,
        'empty_data' => ''
      ))
      ->add('textLinkCs', TextType::class, array(
        'label' => 'Text odkazu CZ'
      ))
      ->add('textLinkEn', TextType::class, array(
        'label' => 'Text odkazu EN'
      ))
      ->add('closeTextLinkCs', TextType::class, array(
        'label' => 'Text odkazu zavřít CZ'
      ))
      ->add('closeTextLinkEn', TextType::class, array(
        'label' => 'Text odkazu zavřít EN'
      ))
      ->add('enable', null, array(
        'label' => 'Aktivní'
      ))
      ->add('displayOnAllPages', null, array(
        'label' => 'Zobrazit na všech stránkách - pokud zvolíte tuto možnost, nevybírejte konkrétní stránku'
      ))
      ->add('type', ChoiceType::class, array(
        'choices' => array(
            'Zobrazit při načtení' => PageModalType::DISPLAY_ON_START,
            'Zobrazit při opuštění' => PageModalType::DISPLAY_ON_EXIT
        )
      ))
      ->add('delay', IntegerType::class, array(
        'label' => 'Zpoždění v sekundách - pouze pro modal typu - Zobrazit při načtení'
      ))
      ->add('start', DateTimeType::class, array(
        'label' => 'Zobrazit od:',
        'widget' => 'single_text'
      ))
      ->add('end', DateTimeType::class, array(
        'label' => 'Zobrazit do:',
        'widget' => 'single_text'
      ))
      ->add('pages', null, array(
        'label' => 'Stránky, na kterých se má daný modal zobrazit. Pokud jste vybrali "Zobrazit na všech stránkách" nechte prázdné'
      ))
    ;
  }

  protected function configureShowFields(ShowMapper $showMapper): void
  {
    $showMapper
      ->add('id')
      ->add('pageModalId')
      ->add('added')
      ->add('updated')
      ->add('titleCs')
      ->add('titleEn')
      ->add('image')
      ->add('contentCs')
      ->add('contentEn')
      ->add('linkCs')
      ->add('linkEn')
      ->add('textLinkCs')
      ->add('textLinkEn')
      ->add('closeTextLinkCs')
      ->add('closeTextLinkEn')
      ->add('enable')
      ->add('displayOnAllPages')
      ->add('type')
      ->add('delay')
      ->add('start')
      ->add('end')
      ->add('pages')
    ;
  }

  public function preUpdate($pageModal)
  {
    $this->manageFileUpload($pageModal);
    $this->generatePageModalId($pageModal);
  }

  public function prePersist($pageModal)
  {
    $this->manageFileUpload($pageModal);
    $this->generatePageModalId($pageModal);
  }

  private function manageFileUpload(PageModal $pageModal)
  {
    if ($pageModal->getUploadedImage() instanceof UploadedFile) {
        $pageModal->setImage($this->fileUploader->saveFile($pageModal->getUploadedImage(), array()));
    }
  }

  private function generatePageModalId(PageModal $pageModal)
  {
      $pageModal->setPageModalId($this->generateRandomString());
  }

  private function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    return $randomString;
  }
}

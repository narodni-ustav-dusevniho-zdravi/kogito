<?php

namespace App\Service\Component;

use App\Entity\Component;
use App\Service\DataProviderHelper;
use App\Service\FileResizer;
use App\Service\FileUploader;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\RequestStack;
use Twig\Environment;

abstract class BaseComponent
{
    /** @var FileUploader */
    protected $fileUploader;

    /** @var FileResizer */
    protected $fileResizer;

    /** @var Request */
    protected $request;

    protected $uploadSettings = null;

    /**
     * HomepageSubheader constructor.
     */
    public function __construct(FileUploader $fileUploader, FileResizer $fileResizer, RequestStack $requestStack)
    {
        $this->fileUploader = $fileUploader;
        $this->fileResizer = $fileResizer;
        $this->request = $requestStack->getMasterRequest();
    }

    public abstract function getTemplateName(): string;
    public abstract function prepareForm(FormBuilderInterface $builder);
    public abstract static function prepareDefaultData(array $options = array()): Component;

    protected function prepareRenderData(Component $component): array
    {
      $locale = $this->request->getLocale();

      return array(
        'component' => $component,
        'data' => new DataProviderHelper($component->getData(), $locale)
      );
    }

    public function render(Environment $enviroment, Component $component)
    {
        return $enviroment->render($this->getTemplateName(), $this->prepareRenderData($component));
    }

    public function handleSaving(Component $component)
    {
        if($this->uploadSettings){
            foreach($component->getData() as $key => $value){
                if($value instanceof UploadedFile && array_key_exists($key, $this->uploadSettings))
                {
                    $newFilePath = $this->fileUploader->saveFile($value, array($component->getId(), $key));

                    if($newFilePath){
                        $keyToSave = $this->uploadSettings[$key]['saveTo'];

                        if($component->getDataValue($keyToSave, false)){
                            $this->fileUploader->removeOldFile($component->getDataValue($keyToSave));
                        }

                        $component->setDataValue($keyToSave, $newFilePath);

                        if(isset($this->uploadSettings[$key]['resizeOptions']) && count($this->uploadSettings[$key]['resizeOptions']) > 0)
                        {
                            foreach($this->uploadSettings[$key]['resizeOptions'] as $resizeOption)
                            {
                                $newResizedFile = $this->fileResizer->handleFile($newFilePath, $resizeOption);

                                if($newResizedFile){
                                    if($component->getDataValue($resizeOption['saveTo'], false)){
                                        $this->fileUploader->removeOldFile($component->getDataValue($resizeOption['saveTo']));
                                    }

                                    $component->setDataValue($resizeOption['saveTo'], $newResizedFile);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

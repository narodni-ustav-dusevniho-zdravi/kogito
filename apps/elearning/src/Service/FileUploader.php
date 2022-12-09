<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $settings;

    /**
     * FileUploader constructor.
     */
    public function __construct(array $settings)
    {
        $this->settings = $settings;
    }

    public function removeOldFile(string $fileName)
    {
        // todo check zda to je ve slozce uploads
    }

    public function saveFile(UploadedFile $file, array $fileNameParts): ?string
    {
        $now = new \DateTime();

        $directory = "/{$now->format('Y')}/{$now->format('m')}/{$now->format('d')}/". substr(md5(random_bytes(10)), 0, 10);
        $fileName = $file->getClientOriginalName();

        $file->move($this->settings['target_path'] . $directory, $fileName);

        return "{$this->settings['web_path']}{$directory}/{$fileName}";
    }

    public function getFileSize(string $path)
    {
        $file = new File($path);

        return $file->getSize();
    }
}

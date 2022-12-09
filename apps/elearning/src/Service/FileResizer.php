<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileResizer
{
  private $settings;

  /**
   * FileUploader constructor.
   */
  public function __construct(array $settings)
  {
    $this->settings = $settings;
  }

  public function handleFile(string $originalFileName, array $options): ?string
  {
    $fileNameOriginal = $this->settings['base_dir'] . $originalFileName;

    $now = new \DateTime();
    $directory = "/{$now->format('Y')}/{$now->format('m')}/{$now->format('d')}";
    $fileName = substr(md5(random_bytes(10)), 0, 10) . ".{$options['extension']}";


    $image = $this->createImage($fileNameOriginal);

    list($imageWidth, $imageHeight) = $this->getImageSize($fileNameOriginal);

    $resizedImage = $this->resizeToMax($image, $imageWidth, $imageHeight, $options['width'], $options['height']);

    imagejpeg($resizedImage, $this->settings['target_path'] . "{$directory}/{$fileName}", 100);

    imagedestroy($image);
    imagedestroy($resizedImage);

    return "{$this->settings['web_path']}{$directory}/{$fileName}";
  }

  private function createImage($filePath)
  {
    $type = \exif_imagetype($filePath);

    switch ($type) {
      case 1 :
        return \imagecreatefromgif($filePath);
      case 2 :
        return \imagecreatefromjpeg($filePath);
      case 3 :
        return \imagecreatefrompng($filePath);
      case 6 :
        return \imagecreatefrombmp($filePath);
    }

    throw new \Exception('Not an image');
  }

  private function getImageSize($image)
  {
    $imageSize = getimagesize($image);

    return array($imageSize[0], $imageSize[1]);
  }

  private function resizeToFitWidth($image, $imageWidht, $imageHeight, $targetWidth, $targetHeight)
  {
    $cropX = $imageWidht / 2 - $targetWidth / 2;
    $cropY = $imageHeight / 2 - $targetHeight / 2;
    $newImgResource = imagecreatetruecolor($targetWidth, $targetHeight);

    imagecopyresampled($newImgResource, $image, 0, 0, $cropX, $cropY, $targetWidth, $targetHeight, $targetWidth, $targetHeight);

    return $newImgResource;
  }

  private function resizeToMax($image, $width, $height, int $maxWidth, int $maxHeight)
  {
    if ($width > $height) {
      if ($width < $maxWidth)
        $newWidth = $width;

      else

        $newWidth = $maxWidth;


      $divisor = $width / $newWidth;
      $newHeight = floor($height / $divisor);
    } else {

      if ($height < $maxHeight)
        $newHeight = $height;
      else
        $newHeight = $maxHeight;

      $divisor = $height / $newHeight;
      $newWidth = floor($width / $divisor);
    }
    $newImgResource = imagecreatetruecolor($newWidth, $newHeight);

    imagealphablending($newImgResource, false);
    imagesavealpha($newImgResource, true);

    imagecopyresampled($newImgResource, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
//    imagedestroy($image);

    return $newImgResource;
  }

}

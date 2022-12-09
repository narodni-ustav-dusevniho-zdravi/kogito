<?php

namespace App\Entity\Blog;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Entity()
 */
class BlogGalleryImage
{

  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @var \DateTime
   * @ORM\Column(name="added", type="datetime")
   */
  private $added;

  /**
   * @ORM\Column(name="name_cs", type="text")
   */
  private $nameCs = '';

  /**
   * @ORM\Column(name="name_en", type="text")
   */
  private $nameEn = '';

  /**
   * @var null|UploadedFile
   */
  private $uploadedImage;

  /**
   * @var null|string
   * @ORM\Column(type="text", nullable=true)
   */
  private $image = '';

  /**
   * @var BlogArticle|null
   * @ORM\ManyToOne(targetEntity="BlogArticle", inversedBy="galleryImages")
   * @ORM\JoinColumn(name="article_id", referencedColumnName="id")
   */
  private $article;

  /**
   * Reference constructor.
   */
  public function __construct()
  {
    $this->added = new \DateTime();
  }

  public function __toString()
  {
    return $this->nameCs;
  }

  /**
   * @return mixed
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * @return \DateTime
   */
  public function getAdded(): \DateTime
  {
    return $this->added;
  }

  /**
   * @param \DateTime $added
   */
  public function setAdded(\DateTime $added): void
  {
    $this->added = $added;
  }

  /**
   * @return string
   */
  public function getNameCs(): string
  {
    return $this->nameCs;
  }

  /**
   * @param string $nameCs
   */
  public function setNameCs(string $nameCs): void
  {
    $this->nameCs = $nameCs;
  }

  /**
   * @return string
   */
  public function getNameEn(): string
  {
    return $this->nameEn;
  }

  /**
   * @param string $nameEn
   */
  public function setNameEn(string $nameEn): void
  {
    $this->nameEn = $nameEn;
  }

  public function getNameByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->nameEn;
    }

    return $this->nameCs;
  }

  /**
   * @return null|UploadedFile
   */
  public function getUploadedImage(): ?UploadedFile
  {
    return $this->uploadedImage;
  }

  /**
   * @param null|UploadedFile $uploadedImage
   */
  public function setUploadedImage(?UploadedFile $uploadedImage): void
  {
    $this->uploadedImage = $uploadedImage;
  }

  /**
   * @return null|string
   */
  public function getImage(): ?string
  {
    return $this->image;
  }

  /**
   * @param null|string $image
   */
  public function setImage(?string $image): void
  {
    $this->image = $image;
  }

  /**
   * @return BlogArticle|null
   */
  public function getArticle(): ?BlogArticle
  {
    return $this->article;
  }

  /**
   * @param BlogArticle|null $article
   */
  public function setArticle(?BlogArticle $article): void
  {
    $this->article = $article;
  }
}

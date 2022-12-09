<?php

namespace App\Entity\Blog;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class BlogCategory
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
   * @var \DateTime
   * @ORM\Column(name="updated", type="datetime")
   */
  private $updated;

  /**
   * @ORM\Column(name="name_cs", type="text")
   */
  private $nameCs = '';

  /**
   * @ORM\Column(name="name_en", type="text")
   */
  private $nameEn = '';

  /**
   * @ORM\Column(name="slug", type="text")
   */
  private $slug = '';

  /**
   * @ORM\Column(name="slug_en", type="text")
   */
  private $slugEn = '';

  /**
   * @var int
   * @ORM\Column(name="position", type="integer")
   */
  private $position = 0;

  /**
   * Reference constructor.
   */
  public function __construct()
  {
    $this->added = new \DateTime();
    $this->updated = new \DateTime();
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
   * @return \DateTime
   */
  public function getUpdated(): \DateTime
  {
    return $this->updated;
  }

  /**
   * @param \DateTime $updated
   */
  public function setUpdated(\DateTime $updated): void
  {
    $this->updated = $updated;
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
   * @return mixed
   */
  public function getSlug()
  {
    return $this->slug;
  }

  /**
   * @param mixed $slug
   */
  public function setSlug($slug): void
  {
    $this->slug = $slug;
  }

  /**
   * @return mixed
   */
  public function getSlugEn()
  {
    return $this->slugEn;
  }

  /**
   * @param mixed $slugEn
   */
  public function setSlugEn($slugEn): void
  {
    $this->slugEn = $slugEn;
  }

  public function getSlugByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->slugEn;
    }

    return $this->slug;
  }

  /**
   * @return int
   */
  public function getPosition(): int
  {
    return $this->position;
  }

  /**
   * @param int $position
   */
  public function setPosition(int $position): void
  {
    $this->position = $position;
  }

}

<?php

namespace App\Entity\Blog;

use Doctrine\Common\Collections\ArrayCollection;
use App\Repository\Blog\BlogRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Entity(repositoryClass=BlogRepository::class)
 */
class BlogArticle
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
   * @var \DateTime
   * @ORM\Column(name="published", type="datetime")
   */
  private $published;

  /**
   * @ORM\Column(name="title_cs", type="text")
   */
  private $titleCs = '';

  /**
   * @ORM\Column(name="title_en", type="text")
   */
  private $titleEn = '';

  /**
   * @ORM\Column(name="small_title_cs", type="text")
   */
  private $smallTitleCs = '';

  /**
   * @ORM\Column(name="small_title_en", type="text")
   */
  private $smallTitleEn = '';

  /**
   * @ORM\Column(name="slug", type="text")
   */
  private $slug = '';

  /**
   * @ORM\Column(name="slug_en", type="text")
   */
  private $slugEn = '';

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
   * @ORM\Column(name="main_text_cs", type="text")
   */
  private $mainTextCs = '';

  /**
   * @ORM\Column(name="main_text_en", type="text")
   */
  private $mainTextEn = '';

  /**
   * @var bool
   * @ORM\Column(name="enable", type="boolean", options={"default":true})
   */
  private $enable = true;

  /**
   * @var bool
   * @ORM\Column(name="display_on_blog_page", type="boolean", options={"default":true})
   */
  private $displayOnBlogPage = true;

  /**
   * @ORM\Column(name="seo_robots_cs", type="text")
   */
  private $seoRobotsCs = '';

  /**
   * @ORM\Column(name="seo_robots_en", type="text")
   */
  private $seoRobotsEn = '';

  /**
   * @ORM\Column(name="seo_page_title_cs", type="text")
   */
  private $seoPageTitleCs = '';

  /**
   * @ORM\Column(name="seo_page_title_en", type="text")
   */
  private $seoPageTitleEn = '';

  /**
   * @ORM\Column(name="seo_content_cs", type="text")
   */
  private $seoContentCs = '';

  /**
   * @ORM\Column(name="seo_content_en", type="text")
   */
  private $seoContentEn = '';

  /**
   * @var bool
   * @ORM\Column(name="display_on_homepage", type="boolean", options={"default":false})
   */
  private $displayOnHomepage = false;

  /**
   * @var BlogCategory|null
   * @ORM\ManyToOne(targetEntity="BlogCategory", inversedBy="articles")
   * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
   */
  private $category;

  /**
   * @var BlogAuthor|null
   * @ORM\ManyToOne(targetEntity="BlogAuthor", inversedBy="articles")
   * @ORM\JoinColumn(name="author_id", referencedColumnName="id")
   */
  private $author;

  /**
   * @var iterable
   * @ORM\OneToMany(targetEntity="BlogGalleryImage", mappedBy="article", cascade={"PERSIST"}, orphanRemoval=true)
   */
  private $galleryImages;

  /**
   * Reference constructor.
   */
  public function __construct()
  {
    $this->added = new \DateTime();
    $this->updated = new \DateTime();
    $this->published = new \DateTime();
    $this->galleryImages = new ArrayCollection();
  }

  public function __toString()
  {
    return $this->titleCs;
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
   * @return \DateTime
   */
  public function getPublished(): \DateTime
  {
    return $this->published;
  }

  /**
   * @param \DateTime $published
   */
  public function setPublished(\DateTime $published): void
  {
    $this->published = $published;
  }

  /**
   * @return string
   */
  public function getTitleCs(): string
  {
    return $this->titleCs;
  }

  /**
   * @param string $titleCs
   */
  public function setTitleCs(string $titleCs): void
  {
    $this->titleCs = $titleCs;
  }

  /**
   * @return string
   */
  public function getTitleEn(): string
  {
    return $this->titleEn;
  }

  /**
   * @param string $titleEn
   */
  public function setTitleEn(string $titleEn): void
  {
    $this->titleEn = $titleEn;
  }

  public function getTitleByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->titleEn;
    }

    return $this->titleCs;
  }

  /**
   * @return string
   */
  public function getSmallTitleCs(): string
  {
    return $this->smallTitleCs;
  }

  /**
   * @param string $smallTitleCs
   */
  public function setSmallTitleCs(string $smallTitleCs): void
  {
    $this->smallTitleCs = $smallTitleCs;
  }

  /**
   * @return string
   */
  public function getSmallTitleEn(): string
  {
    return $this->smallTitleEn;
  }

  /**
   * @param string $smallTitleEn
   */
  public function setSmallTitleEn(string $smallTitleEn): void
  {
    $this->smallTitleEn = $smallTitleEn;
  }

  public function getSmallTitleByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->smallTitleEn;
    }

    return $this->smallTitleCs;
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
   * @return mixed
   */
  public function getMainTextCs()
  {
    return $this->mainTextCs;
  }

  /**
   * @param mixed $mainTextCs
   */
  public function setMainTextCs($mainTextCs): void
  {
    $this->mainTextCs = $mainTextCs;
  }

  /**
   * @return mixed
   */
  public function getMainTextEn()
  {
    return $this->mainTextEn;
  }

  /**
   * @param mixed $mainTextEn
   */
  public function setMainTextEn($mainTextEn): void
  {
    $this->mainTextEn = $mainTextEn;
  }

  public function getMainTextByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->mainTextEn;
    }

    return $this->mainTextCs;
  }

  /**
   * @return bool
   */
  public function isEnable(): bool
  {
    return $this->enable;
  }

  /**
   * @param bool $enable
   */
  public function setEnable(bool $enable): void
  {
    $this->enable = $enable;
  }

  /**
   * @return bool
   */
  public function isDisplayOnBlogPage(): bool
  {
    return $this->displayOnBlogPage;
  }

  /**
   * @param bool $displayOnBlogPage
   */
  public function setDisplayOnBlogPage(bool $displayOnBlogPage): void
  {
    $this->displayOnBlogPage = $displayOnBlogPage;
  }

  /**
   * @return mixed
   */
  public function getSeoRobotsCs()
  {
    return $this->seoRobotsCs;
  }

  /**
   * @param mixed $seoRobotsCs
   */
  public function setSeoRobotsCs($seoRobotsCs): void
  {
    $this->seoRobotsCs = $seoRobotsCs;
  }

  /**
   * @return mixed
   */
  public function getSeoRobotsEn()
  {
    return $this->seoRobotsEn;
  }

  /**
   * @param mixed $seoRobotsEn
   */
  public function setSeoRobotsEn($seoRobotsEn): void
  {
    $this->seoRobotsEn = $seoRobotsEn;
  }

  public function getSeoRobotsByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->seoRobotsEn;
    }

    return $this->seoRobotsCs;
  }

  /**
   * @return mixed
   */
  public function getSeoPageTitleCs()
  {
    return $this->seoPageTitleCs;
  }

  /**
   * @param mixed $seoPageTitleCs
   */
  public function setSeoPageTitleCs($seoPageTitleCs): void
  {
    $this->seoPageTitleCs = $seoPageTitleCs;
  }

  /**
   * @return mixed
   */
  public function getSeoPageTitleEn()
  {
    return $this->seoPageTitleEn;
  }

  /**
   * @param mixed $seoPageTitleEn
   */
  public function setSeoPageTitleEn($seoPageTitleEn): void
  {
    $this->seoPageTitleEn = $seoPageTitleEn;
  }

  public function getSeoPageTitleByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->seoPageTitleEn;
    }

    return $this->seoPageTitleCs;
  }

  /**
   * @return mixed
   */
  public function getSeoContentCs()
  {
    return $this->seoContentCs;
  }

  /**
   * @param mixed $seoContentCs
   */
  public function setSeoContentCs($seoContentCs): void
  {
    $this->seoContentCs = $seoContentCs;
  }

  /**
   * @return mixed
   */
  public function getSeoContentEn()
  {
    return $this->seoContentEn;
  }

  /**
   * @param mixed $seoContentEn
   */
  public function setSeoContentEn($seoContentEn): void
  {
    $this->seoContentEn = $seoContentEn;
  }

  public function getSeoContentByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->seoContentEn;
    }

    return $this->seoContentCs;
  }

  /**
   * @return bool
   */
  public function isDisplayOnHomepage(): bool
  {
    return $this->displayOnHomepage;
  }

  /**
   * @param bool $displayOnHomepage
   */
  public function setDisplayOnHomepage(bool $displayOnHomepage): void
  {
    $this->displayOnHomepage = $displayOnHomepage;
  }

  /**
   * @return BlogCategory|null
   */
  public function getCategory(): ?BlogCategory
  {
    return $this->category;
  }

  /**
   * @param BlogCategory|null $category
   */
  public function setCategory(?BlogCategory $category): void
  {
    $this->category = $category;
  }

  /**
   * @return BlogAuthor|null
   */
  public function getAuthor(): ?BlogAuthor
  {
    return $this->author;
  }

  /**
   * @param BlogAuthor|null $author
   */
  public function setAuthor(?BlogAuthor $author): void
  {
    $this->author = $author;
  }

  /**
   * @return iterable
   */
  public function getGalleryImages(): iterable
  {
    return $this->galleryImages;
  }

  /**
   * @param iterable $galleryImages
   */
  public function setGalleryImages(iterable $galleryImages): void
  {
    $this->galleryImages = $galleryImages;
  }

  public function getShortContentByLocale(string $locale, $maxLength = 100): string
  {
    if ($locale === 'en') {
      return $this->html_cut($this->mainTextEn, $maxLength);
    }

    return $this->html_cut($this->mainTextCs, $maxLength);
  }

  private function html_cut($text, $max_length)
  {
    $tags   = array();
    $result = "";

    $is_open   = false;
    $grab_open = false;
    $is_close  = false;
    $in_double_quotes = false;
    $in_single_quotes = false;
    $tag = "";

    $i = 0;
    $stripped = 0;

    $stripped_text = strip_tags($text);

    while ($i < strlen($text) && $stripped < strlen($stripped_text) && $stripped < $max_length)
    {
      $symbol  = $text{$i};
      $result .= $symbol;

      switch ($symbol)
      {
        case '<':
          $is_open   = true;
          $grab_open = true;
          break;

        case '"':
          if ($in_double_quotes)
            $in_double_quotes = false;
          else
            $in_double_quotes = true;

          break;

        case "'":
          if ($in_single_quotes)
            $in_single_quotes = false;
          else
            $in_single_quotes = true;

          break;

        case '/':
          if ($is_open && !$in_double_quotes && !$in_single_quotes)
          {
            $is_close  = true;
            $is_open   = false;
            $grab_open = false;
          }

          break;

        case ' ':
          if ($is_open)
            $grab_open = false;
          else
            $stripped++;

          break;

        case '>':
          if ($is_open)
          {
            $is_open   = false;
            $grab_open = false;
            array_push($tags, $tag);
            $tag = "";
          }
          else if ($is_close)
          {
            $is_close = false;
            array_pop($tags);
            $tag = "";
          }

          break;

        default:
          if ($grab_open || $is_close)
            $tag .= $symbol;

          if (!$is_open && !$is_close)
            $stripped++;
      }

      $i++;
    }

    $result .= '...';

    while ($tags)
      $result .= "</".array_pop($tags).">";

    return $result;
  }
}

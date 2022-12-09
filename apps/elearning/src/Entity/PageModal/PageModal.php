<?php

namespace App\Entity\PageModal;

use App\Constant\PageModalType;
use App\Entity\Page;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageModal\PageModalRepository")
 */
class PageModal
{

  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @ORM\Column(name="page_modal_id", type="text")
   */
  private $pageModalId;

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
   * @ORM\Column(name="title_cs", type="text")
   */
  private $titleCs = '';

  /**
   * @ORM\Column(name="title_en", type="text")
   */
  private $titleEn = '';

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
   * @ORM\Column(name="content_cs", type="text")
   */
  private $contentCs = '';

  /**
   * @ORM\Column(name="content_en", type="text")
   */
  private $contentEn = '';

  /**
   * @ORM\Column(name="link_cs", type="text")
   */
  private $linkCs = '';

  /**
   * @ORM\Column(name="link_en", type="text")
   */
  private $linkEn = '';

  /**
   * @ORM\Column(name="text_link_cs", type="text")
   */
  private $textLinkCs = '';

  /**
   * @ORM\Column(name="text_link_en", type="text")
   */
  private $textLinkEn = '';

  /**
   * @ORM\Column(name="close_text_link_cs", type="text")
   */
  private $closeTextLinkCs = '';

  /**
   * @ORM\Column(name="close_text_link_en", type="text")
   */
  private $closeTextLinkEn = '';

  /**
   * @var bool
   * @ORM\Column(name="enable", type="boolean", options={"default":false})
   */
  private $enable = false;

  /**
   * @var bool
   * @ORM\Column(name="display_on_all_pages", type="boolean", options={"default":false})
   */
  private $displayOnAllPages = false;

  /**
   * @var int
   * @ORM\Column(name="type", type="integer")
   */
  private $type = PageModalType::DISPLAY_ON_START;

  /**
   * @var \DateTime
   * @ORM\Column(name="start", type="datetime")
   */
  private $start;

  /**
   * @var \DateTime
   * @ORM\Column(name="end", type="datetime")
   */
  private $end;

  /**
   * @var iterable
   * @ORM\ManyToMany(targetEntity="App\Entity\Page")
   * @ORM\JoinTable(name="modal_on_page",
   *      joinColumns={@ORM\JoinColumn(name="page_modal_id", referencedColumnName="id")},
   *      inverseJoinColumns={@ORM\JoinColumn(name="page_id", referencedColumnName="id")}
   *      )
   */
  private $pages;

  /**
   * @var int
   * @ORM\Column(name="delay", type="integer", options={"default":0})
   */
  private $delay = 0;

  /**
   * Reference constructor.
   */
  public function __construct()
  {
    $this->added = new \DateTime();
    $this->updated = new \DateTime();
    $this->pages = new ArrayCollection();
    $this->start = new \DateTime();
    // set default end to 1 month
    $now = new \DateTime();
    $now->add(new \DateInterval('P1M'));
    $this->end = $now;
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
   * @return mixed
   */
  public function getPageModalId()
  {
    return $this->pageModalId;
  }

  /**
   * @param mixed $pageModalId
   */
  public function setPageModalId($pageModalId): void
  {
    $this->pageModalId = $pageModalId;
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
  public function getContentCs()
  {
    return $this->contentCs;
  }

  /**
   * @param mixed $contentCs
   */
  public function setContentCs($contentCs): void
  {
    $this->contentCs = $contentCs;
  }

  /**
   * @return mixed
   */
  public function getContentEn()
  {
    return $this->contentEn;
  }

  /**
   * @param mixed $contentEn
   */
  public function setContentEn($contentEn): void
  {
    $this->contentEn = $contentEn;
  }

  public function getContentByLocale(string $locale): string
  {
    if($locale === 'en'){
        return $this->contentEn;
    }

    return $this->contentCs;
  }

  /**
   * @return mixed
   */
  public function getLinkCs()
  {
    return $this->linkCs;
  }

  /**
   * @param mixed $linkCs
   */
  public function setLinkCs($linkCs): void
  {
    $this->linkCs = $linkCs;
  }

  /**
   * @return mixed
   */
  public function getLinkEn()
  {
    return $this->linkEn;
  }

  /**
   * @param mixed $linkEn
   */
  public function setLinkEn($linkEn): void
  {
    $this->linkEn = $linkEn;
  }

  public function getLinkByLocale(string $locale): string
  {
    if($locale === 'en'){
        return $this->linkEn;
    }

    return $this->linkCs;
  }

  /**
   * @return mixed
   */
  public function getTextLinkCs()
  {
    return $this->textLinkCs;
  }

  /**
   * @param mixed $textLinkCs
   */
  public function setTextLinkCs($textLinkCs): void
  {
    $this->textLinkCs = $textLinkCs;
  }

  /**
   * @return mixed
   */
  public function getTextLinkEn()
  {
    return $this->textLinkEn;
  }

  /**
   * @param mixed $textLinkEn
   */
  public function setTextLinkEn($textLinkEn): void
  {
    $this->textLinkEn = $textLinkEn;
  }

  public function getTextLinkByLocale(string $locale): string
  {
    if($locale === 'en'){
        return $this->textLinkEn;
    }

    return $this->textLinkCs;
  }

  /**
   * @return mixed
   */
  public function getCloseTextLinkCs()
  {
    return $this->closeTextLinkCs;
  }

  /**
   * @param mixed $closeTextLinkCs
   */
  public function setCloseTextLinkCs($closeTextLinkCs): void
  {
    $this->closeTextLinkCs = $closeTextLinkCs;
  }

  /**
   * @return mixed
   */
  public function getCloseTextLinkEn()
  {
    return $this->closeTextLinkEn;
  }

  /**
   * @param mixed $closeTextLinkEn
   */
  public function setCloseTextLinkEn($closeTextLinkEn): void
  {
    $this->closeTextLinkEn = $closeTextLinkEn;
  }

  public function getCloseTextLinkByLocale(string $locale): string
  {
    if($locale === 'en'){
        return $this->closeTextLinkEn;
    }

    return $this->closeTextLinkCs;
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
  public function isDisplayOnAllPages(): bool
  {
    return $this->displayOnAllPages;
  }

  /**
   * @param bool $displayOnAllPages
   */
  public function setDisplayOnAllPages(bool $displayOnAllPages): void
  {
    $this->displayOnAllPages = $displayOnAllPages;
  }

  /**
   * @return int
   */
  public function getType(): int
  {
    return $this->type;
  }

  /**
   * @param int $type
   */
  public function setType(int $type): void
  {
    $this->type = $type;
  }

  /**
   * @return iterable
   */
  public function getPages(): iterable
  {
    return $this->pages;
  }

  /**
   * @return \DateTime
   */
  public function getStart(): \DateTime
  {
    return $this->start;
  }

  /**
   * @param \DateTime $start
   */
  public function setStart(\DateTime $start): void
  {
    $this->start = $start;
  }

  /**
   * @return \DateTime
   */
  public function getEnd(): \DateTime
  {
    return $this->end;
  }

  /**
   * @param \DateTime $end
   */
  public function setEnd(\DateTime $end): void
  {
    $this->end = $end;
  }

  /**
   * @param iterable $pages
   */
  public function setPages(iterable $pages): void
  {
    $this->pages = $pages;
  }

  public function addPage(Page $page): void
  {
    $this->pages->add($page);
  }

  public function removePage(Page $page): void
  {
    $this->pages->removeElement($page);
  }

  /**
   * @return int
   */
  public function getDelay(): int
  {
    return $this->delay;
  }

  /**
   * @param int $delay
   */
  public function setDelay(int $delay): void
  {
    $this->delay = $delay;
  }
}

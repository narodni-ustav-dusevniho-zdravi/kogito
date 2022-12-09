<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MenuItemRepository")
 */
class MenuItem
{
  public const TYPE_PAGE = 0;
  public const TYPE_OUTSIDE = 1;
  public const TYPE_SPACER = 2;

  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @var bool
   * @ORM\Column(name="enabled", type="boolean", options={"default":true})
   */
  private $enabled = true;

  /**
   * @var integer
   * @ORM\Column(name="type", type="integer")
   */
  private $type = self::TYPE_PAGE;

  /**
   * @ORM\ManyToOne(targetEntity="App\Entity\Menu", inversedBy="menuItems")
   * @ORM\JoinColumn(nullable=false)
   */
  private $menu;

  /**
   * @var int
   * @ORM\Column(name="position", type="integer")
   */
  private $position = 99;

  /**
   * @var string
   * @ORM\Column(name="name", type="string", length=100)
   */
  private $name = '';

  /**
   * @var array
   * @ORM\Column(name="name_translated", type="json_array")
   */
  private $nameTranslated = array();

  /**
   * @var bool
   * @ORM\Column(name="open_in_target_blank", type="boolean", options={"default":false})
   */
  private $openInTargetBlank = false;

  /**
   * @var string
   * @ORM\Column(name="target_href", type="text")
   */
  private $targetHref = '';

  /**
   * @var array
   * @ORM\Column(name="target_href_translated", type="json_array")
   */
  private $targetHrefTranslated = array();

  /**
   * @var iterable
   * @ORM\OneToMany(targetEntity="MenuItem", mappedBy="parent", cascade={"persist","remove"})
   */
  private $children;

  /**
   * @var MenuItem|null
   * @ORM\ManyToOne(targetEntity="MenuItem", inversedBy="children")
   * @ORM\JoinColumn(name="parent", referencedColumnName="id", nullable=true, onDelete="SET NULL")
   */
  private $parent;

  /**
   * @var Page|null
   * @ORM\ManyToOne(targetEntity="App\Entity\Page", inversedBy="menuItems")
   * @ORM\JoinColumn(name="target_page_id", referencedColumnName="id", nullable=true)
   */
  private $targetPage;

  /**
   * MenuItem constructor.
   */
  public function __construct()
  {
    $this->children = new ArrayCollection();
  }

  public function updateOriginalProperties(string $defaultLanguage): void
  {
    $this->name = $this->nameTranslated[$defaultLanguage]?? '';
    $this->targetHref = $this->targetTranslated[$defaultLanguage]?? '';
  }

  public function __toString()
  {
    return "Položka menu - {$this->name}";
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getMenu(): ?Menu
  {
    return $this->menu;
  }

  public function setMenu(?Menu $menu): self
  {
    $this->menu = $menu;

    return $this;
  }

  /**
   * @return bool
   */
  public function isOpenInTargetBlank(): bool
  {
    return $this->openInTargetBlank;
  }

  /**
   * @param bool $openInTargetBlank
   */
  public function setOpenInTargetBlank(bool $openInTargetBlank): void
  {
    $this->openInTargetBlank = $openInTargetBlank;
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

  /**
   * @return string
   */
  public function getName(): string
  {
    return $this->name;
  }

  /**
   * @param string $name
   */
  public function setName(string $name): void
  {
    $this->name = $name;
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
   * @return string
   */
  public function getTargetHref(): string
  {
    return $this->targetHref;
  }

  /**
   * @param string $targetHref
   */
  public function setTargetHref(string $targetHref): void
  {
    $this->targetHref = $targetHref;
  }

  /**
   * @return Page|null
   */
  public function getTargetPage(): ?Page
  {
    return $this->targetPage;
  }

  /**
   * @param Page|null $targetPage
   */
  public function setTargetPage(?Page $targetPage): void
  {
    $this->targetPage = $targetPage;
  }

  /**
   * @return bool
   */
  public function isEnabled(): bool
  {
    return $this->enabled;
  }

  /**
   * @param bool $enabled
   */
  public function setEnabled(bool $enabled): void
  {
    $this->enabled = $enabled;
  }

  /**
   * @return MenuItem|null
   */
  public function getParent()
  {
    return $this->parent;
  }

  public function setParent(?MenuItem $parent): self
  {
    $this->parent = $parent;

    return $this;
  }

  /**
   * @return iterable
   */
  public function getChildren(): iterable
  {
    return $this->children;
  }

  public function removeChild(MenuItem $child): self
  {
    if ($this->children->contains($child)) {
      $this->children->removeElement($child);
      $child->setParent(null);
    }

    return $this;
  }

  public function addChild(MenuItem $child): self
  {
    $this->children[] = $child;
    $child->setParent($this);

    return $this;
  }

  /**
   * @return array
   */
  public function getNameTranslated(): array
  {
    return $this->nameTranslated?? array();
  }

  /**
   * @param array $nameTranslated
   */
  public function setNameTranslated(array $nameTranslated): void
  {
    $this->nameTranslated = $nameTranslated;
  }

  public function getNameForLanguage(string $language): string
  {
    return $this->nameTranslated[$language]?? $this->name;
  }

  /**
   * @return array
   */
  public function getTargetHrefTranslated(): array
  {
    return $this->targetHrefTranslated?? array();
  }

  /**
   * @param array $targetHrefTranslated
   */
  public function setTargetHrefTranslated(array $targetHrefTranslated): void
  {
    $this->targetHrefTranslated = $targetHrefTranslated;
  }

  public function getTargetHrefForLanguage(string $language): string
  {
    return $this->targetHrefTranslated[$language]?? $this->targetPage;
  }
}

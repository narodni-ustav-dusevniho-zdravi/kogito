<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 */
class Page
{
  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @var string
   * @ORM\Column(name="admin_description", type="text")
   */
  private $adminDescription = '';

  /**
   * @var string
   * @ORM\Column(type="string", length=100)
   */
  private $handle = '';

  /**
   * @var string
   * @ORM\Column(type="string", length=100)
   */
  private $slug = '';

  /**
   * @var string
   * @ORM\Column(type="string", length=100)
   */
  private $slugEn = '';

  /**
   * @var string
   * @ORM\Column(name="page_title", type="string", length=75)
   */
  private $pageTitle = '';
  /**
   * @var string
   * @ORM\Column(name="page_title_en", type="string", length=75)
   */
  private $pageTitleEn = '';

  /**
   * @var int
   * @ORM\Column(name="position", type="integer")
   */
  private $position = 0;

  /**
   * @var bool
   * @ORM\Column(name="enabled", type="boolean", options={"default":false})
   */
  private $enabled = false;

  /**
   * @var bool
   * @ORM\Column(name="for_women", type="boolean", options={"default":false})
   */
  private $forWomen = false;

  /**
   * @var bool
   * @ORM\Column(name="for_women_postpartum", type="boolean", options={"default":false})
   */
  private $forWomenPostpartum = false;

  /**
   * @var bool
   * @ORM\Column(name="for_women_pregnancy", type="boolean", options={"default":false})
   */
  private $forWomenPregnancy = false;

  /**
   * @var bool
   * @ORM\Column(name="for_professionals", type="boolean", options={"default":false})
   */
  private $forProfessionals = false;

  /**
   * @var bool
   * @ORM\Column(name="for_professionals_postpartum", type="boolean", options={"default":false})
   */
  private $forProfessionalsPostpartum = false;

  /**
   * @var bool
   * @ORM\Column(name="for_professionals_pregnancy", type="boolean", options={"default":false})
   */
  private $forProfessionalsPregnancy = false;

  /**
   * @var bool
   * @ORM\Column(name="for_loved_ones", type="boolean", options={"default":false})
   */
  private $forLovedOnes = false;

  /**
   * @var SeoParams
   * @ORM\OneToOne(targetEntity="App\Entity\SeoParams", cascade={"persist", "remove"})
   * @ORM\JoinColumn(nullable=false)
   */
  private $seoParams;

  /**
   * @var SeoParams|null
   * @ORM\OneToOne(targetEntity="App\Entity\SeoParams", cascade={"persist", "remove"})
   * @ORM\JoinColumn()
   */
  private $seoParamsEn;

  /**
   * @var string
   * @ORM\Column(name="template", type="text")
   */
  private $template = 'newPages/contentPage.html.twig';

  /**
   * @ORM\OneToMany(targetEntity="App\Entity\Component", mappedBy="page", orphanRemoval=true, cascade={"ALL"})
   * @ORM\OrderBy({"position" = "ASC"})
   */
  private $components;

  /**
   * @var string
   * @ORM\Column(name="headline", type="text", nullable=true)
   */
  private $headline;

  /**
   * @var string|null
   * @ORM\Column(name="text_content", type="text", nullable=true)
   */
  private $textContent;

  /**
   * @var bool
   * @ORM\Column(name="enable_change_handle", type="boolean", options={"default":true})
   */
  private $enableChangeHandle = true;

  /**
   * @var bool
   * @ORM\Column(name="enable_change_slug", type="boolean", options={"default":true})
   */
  private $enableChangeSlug = true;

  /**
   * @var bool
   * @ORM\Column(name="enable_changing_components", type="boolean", options={"default":false})
   */
  private $enableChangingComponents = false;

  /**
   * @var ArrayCollection
   * @ORM\OneToMany(targetEntity="App\Entity\MenuItem", mappedBy="targetPage", cascade={"ALL"})
   */
  private $menuItems;

  private $addToMainMenu = false;
  private $addToFooterMenu = false;

  /**
   * @ORM\ManyToMany(targetEntity="App\Entity\PageModal\PageModal", mappedBy="pages")
   */
  private $pageModals;

  public function __construct()
  {
    $this->seoParams = new SeoParams();
    $this->seoParamsEn = new SeoParams();
    $this->components = new ArrayCollection();
    $this->menuItems = new ArrayCollection();
  }

  public function __toString()
  {
    return "Stránka {$this->adminDescription}";
  }

  public function getSeoParamsByLocale(string $locale): SeoParams
  {
    if ($locale === 'en' && $this->seoParamsEn) {
      return $this->seoParamsEn;
    }

    return $this->seoParams;
  }

  public function getSlugByLocale(string $locale): string
  {
    if ($locale === 'en' && $this->slugEn) {
      return $this->slugEn;
    }

    return $this->slug;
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getHandle(): ?string
  {
    return $this->handle;
  }

  public function setHandle(string $handle): self
  {
    $this->handle = $handle;

    return $this;
  }

  public function getSeoParams(): ?SeoParams
  {
    return $this->seoParams;
  }

  public function setSeoParams(SeoParams $seoParams): self
  {
    $this->seoParams = $seoParams;

    return $this;
  }

  /**
   * @return Collection|Component[]
   */
  public function getComponents(): Collection
  {
    return $this->components;
  }

  public function addComponent(Component $component): self
  {
    if (!$this->components->contains($component)) {
      $this->components[] = $component;
      $component->setPage($this);
      $component->setPosition(count($this->components));
    }

    return $this;
  }

  public function removeComponent(Component $component): self
  {
    if ($this->components->contains($component)) {
      $this->components->removeElement($component);
      // set the owning side to null (unless already changed)
      if ($component->getPage() === $this) {
        $component->setPage(null);
      }
    }

    return $this;
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
  public function getSlug(): string
  {
    return $this->slug;
  }

  /**
   * @param string $slug
   */
  public function setSlug(string $slug): void
  {
    $this->slug = $slug;
  }

  /**
   * @return string
   */
  public function getTemplate(): string
  {
    return $this->template;
  }

  /**
   * @param string $template
   */
  public function setTemplate(string $template): void
  {
    $this->template = $template;
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
   * @return bool
   */
  public function isSubpage(): bool
  {
    if ($this->isForWomen() || $this->isForWomenPostpartum() || $this->isForWomenPregnancy() || $this->isForProfessionals() || $this->isForProfessionalsPostpartum() || $this->isForProfessionalsPregnancy() || $this->isForLovedOnes()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @return bool
   */
  public function isForWomen(): bool
  {
    return $this->forWomen;
  }

  /**
   * @param bool $forWomen
   */
  public function setForWomen(bool $forWomen): void
  {
    $this->forWomen = $forWomen;
  }

  /**
   * @return bool
   */
  public function isForWomenPostpartum(): bool
  {
    return $this->forWomenPostpartum;
  }

  /**
   * @param bool $forWomenPostpartum
   */
  public function setForWomenPostpartum(bool $forWomenPostpartum): void
  {
    $this->forWomenPostpartum = $forWomenPostpartum;
  }

  /**
   * @return bool
   */
  public function isForWomenPregnancy(): bool
  {
    return $this->forWomenPregnancy;
  }

  /**
   * @param bool $forWomenPregnancy
   */
  public function setForWomenPregnancy(bool $forWomenPregnancy): void
  {
    $this->forWomenPregnancy = $forWomenPregnancy;
  }

  /**
   * @return bool
   */
  public function isForProfessionals(): bool
  {
    return $this->forProfessionals;
  }

  /**
   * @param bool $forProfessionals
   */
  public function setForProfessionals(bool $forProfessionals): void
  {
    $this->forProfessionals = $forProfessionals;
  }

  /**
   * @return bool
   */
  public function isForProfessionalsPostpartum(): bool
  {
    return $this->forProfessionalsPostpartum;
  }

  /**
   * @param bool $forProfessionalsPostpartum
   */
  public function setForProfessionalsPostpartum(bool $forProfessionalsPostpartum): void
  {
    $this->forProfessionalsPostpartum = $forProfessionalsPostpartum;
  }

  /**
   * @return bool
   */
  public function isForProfessionalsPregnancy(): bool
  {
    return $this->forProfessionalsPregnancy;
  }

  /**
   * @param bool $forProfessionalsPregnancy
   */
  public function setForProfessionalsPregnancy(bool $forProfessionalsPregnancy): void
  {
    $this->forProfessionalsPregnancy = $forProfessionalsPregnancy;
  }

  /**
   * @return bool
   */
  public function isForLovedOnes(): bool
  {
    return $this->forLovedOnes;
  }

  /**
   * @param bool $forLovedOnes
   */
  public function setForLovedOnes(bool $forLovedOnes): void
  {
    $this->forLovedOnes = $forLovedOnes;
  }

  public function isHomepage()
  {
    return $this->handle === 'homepage';
  }

  /**
   * @return bool
   */
  public function isEnableChangeHandle(): bool
  {
    return $this->enableChangeHandle;
  }

  /**
   * @param bool $enableChangeHandle
   */
  public function setEnableChangeHandle(bool $enableChangeHandle): void
  {
    $this->enableChangeHandle = $enableChangeHandle;
  }

  /**
   * @return bool
   */
  public function isEnableChangeSlug(): bool
  {
    return $this->enableChangeSlug;
  }

  /**
   * @param bool $enableChangeSlug
   */
  public function setEnableChangeSlug(bool $enableChangeSlug): void
  {
    $this->enableChangeSlug = $enableChangeSlug;
  }

  /**
   * @return string|null
   */
  public function getTextContent(): ?string
  {
    return $this->textContent;
  }

  /**
   * @param string|null $textContent
   */
  public function setTextContent(?string $textContent): void
  {
    $this->textContent = $textContent;
  }

  /**
   * @return bool
   */
  public function isEnableChangingComponents(): bool
  {
    return $this->enableChangingComponents;
  }

  /**
   * @param bool $enableChangingComponents
   */
  public function setEnableChangingComponents(bool $enableChangingComponents): void
  {
    $this->enableChangingComponents = $enableChangingComponents;
  }

  /**
   * @return string
   */
  public function getHeadline(): ?string
  {
    return $this->headline;
  }

  /**
   * @param string $headline
   */
  public function setHeadline(string $headline = null): void
  {
    $this->headline = $headline;
  }

  /**
   * @return ArrayCollection
   */
  public function getMenuItems(): ArrayCollection
  {
    return $this->menuItems;
  }

  /**
   * @param ArrayCollection $menuItems
   */
  public function setMenuItems(ArrayCollection $menuItems): void
  {
    $this->menuItems = $menuItems;
  }

  public function addMenuItem(MenuItem $menuItem): void
  {
    $this->menuItems->add($menuItem);
  }

  /**
   * @return string
   */
  public function getAdminDescription(): string
  {
    return $this->adminDescription;
  }

  /**
   * @param string $adminDescription
   */
  public function setAdminDescription(string $adminDescription): void
  {
    $this->adminDescription = $adminDescription;
  }

  /**
   * @return bool
   */
  public function isAddToMainMenu(): bool
  {
    return $this->addToMainMenu;
  }

  /**
   * @param bool $addToMainMenu
   */
  public function setAddToMainMenu(bool $addToMainMenu): void
  {
    $this->addToMainMenu = $addToMainMenu;
  }

  /**
   * @return bool
   */
  public function isAddToFooterMenu(): bool
  {
    return $this->addToFooterMenu;
  }

  /**
   * @param bool $addToFooterMenu
   */
  public function setAddToFooterMenu(bool $addToFooterMenu): void
  {
    $this->addToFooterMenu = $addToFooterMenu;
  }

  /**
   * @return string
   */
  public function getSlugEn(): string
  {
    return $this->slugEn;
  }

  /**
   * @param string $slugEn
   */
  public function setSlugEn(string $slugEn): void
  {
    $this->slugEn = $slugEn;
  }

  /**
   * @return SeoParams|null
   */
  public function getSeoParamsEn(): ?SeoParams
  {
    return $this->seoParamsEn;
  }

  /**
   * @param SeoParams|null $seoParamsEn
   */
  public function setSeoParamsEn(?SeoParams $seoParamsEn): void
  {
    $this->seoParamsEn = $seoParamsEn;
  }

  /**
   * @return string
   */
  public function getPageTitle(): string
  {
    return $this->pageTitle;
  }

  /**
   * @param string $pageTitle
   */
  public function setPageTitle(string $pageTitle): void
  {
    $this->pageTitle = $pageTitle;
  }

  /**
   * @return string
   */
  public function getPageTitleEn(): string
  {
    return $this->pageTitleEn;
  }

  /**
   * @param string $pageTitleEn
   */
  public function setPageTitleEn(string $pageTitleEn): void
  {
    $this->pageTitleEn = $pageTitleEn;
  }

  public function getPageTitleByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->pageTitleEn;
    }

    return $this->pageTitle;
  }

  /**
   * @return mixed
   */
  public function getPageModals()
  {
    return $this->pageModals;
  }

  /**
   * @param mixed $pageModals
   */
  public function setPageModals($pageModals): void
  {
    $this->pageModals = $pageModals;
  }
}

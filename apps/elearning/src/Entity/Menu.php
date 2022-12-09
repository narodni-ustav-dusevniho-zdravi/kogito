<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MenuRepository")
 */
class Menu
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $handle;

    /**
     * @var string
     * @ORM\Column(name="admin_description", type="text")
     */
    private $adminDescription = '';

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MenuItem", mappedBy="menu", cascade={"ALL"})
     * @ORM\OrderBy({"position" = "ASC"})
     */
    private $menuItems;

    public function __construct()
    {
        $this->menuItems = new ArrayCollection();
    }

    public function __toString()
    {
        return "Menu - {$this->handle}";
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

    /**
     * @return Collection|MenuItem[]
     */
    public function getMenuItems(): Collection
    {
        return $this->menuItems;
    }

    public function addMenuItem(MenuItem $menuItem): self
    {
        if (!$this->menuItems->contains($menuItem)) {
            $this->menuItems[] = $menuItem;
            $menuItem->setMenu($this);
            $menuItem->setPosition(count($this->menuItems));
        }

        return $this;
    }

    public function removeMenuItem(MenuItem $menuItem): self
    {
        if ($this->menuItems->contains($menuItem)) {
            $this->menuItems->removeElement($menuItem);
            // set the owning side to null (unless already changed)
            if ($menuItem->getMenu() === $this) {
                $menuItem->setMenu(null);
            }
        }

        return $this;
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

}

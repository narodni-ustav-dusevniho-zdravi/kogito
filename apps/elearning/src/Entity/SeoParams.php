<?php
/**
 * Created by PhpStorm.
 * User: Ondřej
 * Date: 22.01.2019
 * Time: 23:48
 */

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class SeoParams
{
    public static $robotsChoices = array(
        'INDEX, FOLLOW' => 'INDEX, FOLLOW',
        'NOINDEX, FOLLOW' => 'NOINDEX, FOLLOW',
        'INDEX, NOFOLLOW' => 'INDEX, NOFOLLOW',
        'NOINDEX, NOFOLLOW' => 'NOINDEX, NOFOLLOW',
    );

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var \DateTime
     * @ORM\Column(name="last_update", type="datetime", nullable=true)
     */
    private $lastUpdate;

    /**
     * @var string
     * @ORM\Column(name="page_title", type="text")
     */
    private $pageTitle = ' | Perinatal';

    /**
     * @var string
     * @ORM\Column(name="admin_description", type="text")
     */
    private $adminDescription = '';

    /**
     * @var string
     *
     * @ORM\Column(name="robots", type="text")
     */
    private $robots = 'INDEX, FOLLOW';

    /**
     * @var boolean
     * @ORM\Column(name="display_in_site_map", type="boolean", options={"default"=true})
     */
    private $displayInSiteMap = true;

    /**
     * @var string
     * @ORM\Column(name="site_map_priority", type="string", length=50)
     */
    private $siteMapPriority = '';

    /**
     * @var string
     * @ORM\Column(name="description", type="text")
     */
    private $description = '';

    /**
     * @var string
     * @ORM\Column(name="key_words", type="text")
     */
    private $keyWords = '';

    /**
     * @var string
     * @ORM\Column(name="author", type="text")
     */
    private $author = '';

    /**
     * @var string
     * @ORM\Column(name="og_title", type="text")
     */
    private $ogTitle = '';

    /**
     * @var string
     * @ORM\Column(name="og_site_name", type="text")
     */
    private $ogSiteName = '';

    /**
     * @var string
     * @ORM\Column(name="og_description", type="text")
     */
    private $ogDescription = '';

    /**
     * @var string
     * @ORM\Column(name="og_image", type="text", nullable=true)
     */
    private $ogImage = '';

    /**
     * @var string
     * @ORM\Column(name="og_image_alt", type="text", nullable=true)
     */
    private $ogImageAlt = '';

    /**
     * SeoParams constructor.
     */
    public function __construct()
    {
        $this->lastUpdate = new \DateTime();
    }

    public function updateLastUpdate()
    {
        $this->lastUpdate = new \DateTime();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
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
     * @return string
     */
    public function getRobots(): string
    {
        return $this->robots;
    }

    /**
     * @param string $robots
     */
    public function setRobots(string $robots): void
    {
        $this->robots = $robots;
    }

    /**
     * @return bool
     */
    public function isDisplayInSiteMap(): bool
    {
        return $this->displayInSiteMap;
    }

    /**
     * @param bool $displayInSiteMap
     */
    public function setDisplayInSiteMap(bool $displayInSiteMap): void
    {
        $this->displayInSiteMap = $displayInSiteMap;
    }

    /**
     * @return string
     */
    public function getSiteMapPriority(): string
    {
        return $this->siteMapPriority;
    }

    /**
     * @param string $siteMapPriority
     */
    public function setSiteMapPriority(string $siteMapPriority): void
    {
        $this->siteMapPriority = $siteMapPriority;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getKeyWords(): string
    {
        return $this->keyWords;
    }

    /**
     * @param string $keyWords
     */
    public function setKeyWords(string $keyWords): void
    {
        $this->keyWords = $keyWords;
    }

    /**
     * @return string
     */
    public function getAuthor(): string
    {
        return $this->author;
    }

    /**
     * @param string $author
     */
    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    /**
     * @return string
     */
    public function getOgTitle(): string
    {
        return $this->ogTitle;
    }

    /**
     * @param string $ogTitle
     */
    public function setOgTitle(string $ogTitle): void
    {
        $this->ogTitle = $ogTitle;
    }

    /**
     * @return string
     */
    public function getOgSiteName(): string
    {
        return $this->ogSiteName;
    }

    /**
     * @param string $ogSiteName
     */
    public function setOgSiteName(string $ogSiteName): void
    {
        $this->ogSiteName = $ogSiteName;
    }

    /**
     * @return string
     */
    public function getOgDescription(): string
    {
        return $this->ogDescription;
    }

    /**
     * @param string $ogDescription
     */
    public function setOgDescription(string $ogDescription): void
    {
        $this->ogDescription = $ogDescription;
    }

    /**
     * @return string
     */
    public function getOgImage()
    {
        return $this->ogImage;
    }

    /**
     * @param string $ogImage
     */
    public function setOgImage($ogImage): void
    {
        $this->ogImage = $ogImage;
    }

    /**
     * @return string
     */
    public function getOgImageAlt()
    {
        return $this->ogImageAlt;
    }

    /**
     * @param string $ogImageAlt
     */
    public function setOgImageAlt($ogImageAlt): void
    {
        $this->ogImageAlt = $ogImageAlt;
    }

    /**
     * @return \DateTime
     */
    public function getLastUpdate(): \DateTime
    {
        return $this->lastUpdate;
    }

    /**
     * @param \DateTime $lastUpdate
     */
    public function setLastUpdate(\DateTime $lastUpdate): void
    {
        $this->lastUpdate = $lastUpdate;
    }
}

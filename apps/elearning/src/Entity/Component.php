<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ComponentRepository")
 */
class Component
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
     * @var bool
     * @ORM\Column(name="enabled", type="boolean", options={"default":false})
     */
    private $enabled = true;

    /**
     * @var int
     * @ORM\Column(name="position", type="integer", options={"default":0})
     */
    private $position = 0;

    /**
     * @var int
     * @ORM\Column(name="`group`", type="integer", options={"default":0})
     */
    private $group = 0;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $type;

    /**
     * @ORM\Column(type="json_array")
     */
    private $data = [];

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Page", inversedBy="components")
     * @ORM\JoinColumn(nullable=true)
     */
    private $page;

    public function __toString()
    {
        return "Komponenta - {$this->adminDescription}";
    }

    public function dataHumanDescription(): string
    {
        $final = '';
        $images = array();

        foreach($this->data as $key => $row)
        {
            if(strpos($key, '_3x') !== false || strpos($key, '_2x')){
                continue;
            }

            if(strpos($key, 'imageName') !== false){
                continue;
            }

            if(strpos($key, 'image') !== false){
                $image = is_array($row)? (isset($row['cs'])? $row['cs']: null) : $row;

                if($image){
                  $images[] = "<img style='max-height: 100px' src='{$image}'>";
                }

                continue;
            }

            if(is_array($row)){
              if(isset($row['_type']) && $row['_type'] === 'translated'){
                $items = array_values($row);
                $items = array_diff($items, array('translated'));
                $items = array_unique($items);
                $final .= (implode(' | ', $items) . '<br>');
              }else{
                $final .= '[...]';
              }
            }else{
                $value = strip_tags($row);

                if(strlen($value) > 100){
                    $value = substr($value, 0, 100) . '...';
                }

                $final .= "{$value}\n";
            }
        }

        $final .= implode('', $images);

        return $final;
    }

    public static function create(string $type, array $data, string $adminDescription = ''): self
    {
        $component = new self;

        $component->setType($type);
        $component->setData($data);
        $component->setAdminDescription($adminDescription);

        return $component;
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getData(): ?array
    {
        return $this->data;
    }

    public function setData(array $data): self
    {
        $this->data = $data;

        return $this;
    }

    public function getDataValue(string $key, $default = null)
    {
        return isset($this->data[$key])? $this->data[$key] : $default;
    }

    public function setDataValue(string $key, $value)
    {
        $this->data[$key] = $value;
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page): self
    {
        // dirty fix, for somehow it removed original page when form was saved
        if($this->page != null && $page === null){
            return $this;
        }
        $this->page = $page;

        return $this;
    }

    /**
     * @return int
     */
    public function getGroup(): int
    {
        return $this->group;
    }

    /**
     * @param int $group
     */
    public function setGroup(int $group): void
    {
        $this->group = $group;
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
}

<?php

namespace App\Entity;

use App\Repository\ContactPhoneRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContactPhoneRepository::class)
 */
class ContactPhone
{
  /**
   * @ORM\Id
   * @ORM\GeneratedValue
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @ORM\Column(type="datetime")
   */
  private \DateTime $created;

  /**
   * @ORM\Column(type="string", length=50)
   */
  private string $ipAddress = '';

  /**
   * @ORM\Column(type="string", length=15)
   */
  private string $phoneNumber = '';

  public function __construct()
  {
    $this->created = new \DateTime();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getCreated(): ?\DateTime
  {
    return $this->created;
  }

  public function setCreated(\DateTime $created): self
  {
    $this->created = $created;

    return $this;
  }

  public function getIpAddress(): ?string
  {
    return $this->ipAddress;
  }

  public function setIpAddress(string $ipAddress): self
  {
    $this->ipAddress = $ipAddress;

    return $this;
  }

  public function getPhoneNumber(): ?string
  {
    return $this->phoneNumber;
  }

  public function setPhoneNumber(string $phoneNumber): self
  {
    $this->phoneNumber = $phoneNumber;

    return $this;
  }
}

<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GlobalSettingsRepository")
 */
class GlobalSettings
{
  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @var \DateTime
   * @ORM\Column(name="created", type="datetime")
   */
  private $created;

  /**
   * @var string|null
   * @ORM\Column(name="email_resender_target_email", type="string", length=100, nullable=true)
   */
  private $emailResenderTargetEmail;

  /**
   * @var string|null
   * @ORM\Column(name="email_resender_from_email", type="string", length=100, nullable=true)
   */
  private $emailResenderFromEmail;

  /**
   * @var array
   * @ORM\Column(name="enabled_languages", type="json_array")
   */
  private $enabledLanguages = array();

  /**
   * GlobalSettings constructor.
   */
  public function __construct()
  {
    $this->created = new \DateTime();
  }

  public function __toString()
  {
    return 'Globální nastavení';
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
  public function getCreated(): \DateTime
  {
    return $this->created;
  }

  /**
   * @param \DateTime $created
   */
  public function setCreated(\DateTime $created): void
  {
    $this->created = $created;
  }

  /**
   * @return string|null
   */
  public function getEmailResenderTargetEmail(): ?string
  {
    return $this->emailResenderTargetEmail;
  }

  /**
   * @param string|null $emailResenderTargetEmail
   */
  public function setEmailResenderTargetEmail(?string $emailResenderTargetEmail): void
  {
    $this->emailResenderTargetEmail = $emailResenderTargetEmail;
  }

  /**
   * @return string|null
   */
  public function getEmailResenderFromEmail(): ?string
  {
    return $this->emailResenderFromEmail;
  }

  /**
   * @param string|null $emailResenderFromEmail
   */
  public function setEmailResenderFromEmail(?string $emailResenderFromEmail): void
  {
    $this->emailResenderFromEmail = $emailResenderFromEmail;
  }

  /**
   * @return array
   */
  public function getEnabledLanguages(): array
  {
    return $this->enabledLanguages?? array();
  }

  /**
   * @param array $enabledLanguages
   */
  public function setEnabledLanguages(array $enabledLanguages): void
  {
    $this->enabledLanguages = $enabledLanguages;
  }
}
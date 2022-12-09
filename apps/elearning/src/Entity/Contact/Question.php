<?php

namespace App\Entity\Contact;

use App\Constant\Contact\QuestionStatus;
use App\Interfaces\Resendable;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class Question implements Resendable
{
  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @var \DateTime
   * @ORM\Column(type="datetime")
   */
  private $added;

  /**
   * @var \DateTime
   * @ORM\Column(type="datetime")
   */
  private $updated;

  /**
   * @var string
   * @ORM\Column(type="string", length=50)
   */
  private $ipAddress = '';

  /**
   * @var string
   * @ORM\Column(type="string", length=200)
   */
  private $fullName = '';

  /**
   * @var string
   * @ORM\Column(type="text")
   */
  private $email = '';

  /**
   * @var string
   * @ORM\Column(type="text")
   */
  private $message = '';

  /**
   * @var int
   * @ORM\Column(type="integer")
   */
  private $status = QuestionStatus::CREATED;

  /**
   * Question constructor.
   */
  public function __construct()
  {
    $this->added = new \DateTime();
    $this->updated = new \DateTime();
  }

  public function __toString()
  {
    return $this->fullName;
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
  public function getIpAddress(): string
  {
    return $this->ipAddress;
  }

  /**
   * @param string $ipAddress
   */
  public function setIpAddress(string $ipAddress): void
  {
    $this->ipAddress = $ipAddress;
  }

  /**
   * @return string
   */
  public function getFullName(): string
  {
    return $this->fullName;
  }

  /**
   * @param string $fullName
   */
  public function setFullName(string $fullName): void
  {
    $this->fullName = $fullName;
  }

  /**
   * @return string
   */
  public function getEmail(): string
  {
    return $this->email;
  }

  /**
   * @param string $email
   */
  public function setEmail(string $email): void
  {
    $this->email = $email;
  }

  /**
   * @return string
   */
  public function getMessage(): string
  {
    return $this->message;
  }

  /**
   * @param string $message
   */
  public function setMessage(string $message): void
  {
    $this->message = $message;
  }

  /**
   * @return int
   */
  public function getStatus(): int
  {
    return $this->status;
  }

  /**
   * @param int $status
   */
  public function setStatus(int $status): void
  {
    $this->status = $status;
  }

  public function getStatusText()
  {
    switch ($this->status) {
        case QuestionStatus::CREATED:
            return 'CREATED';
        case QuestionStatus::DONE:
            return 'DONE';
        default:
            return 'OTHER';
    }
  }

  public function getTemplate(): string
  {
    return 'emails/question.html.twig';
  }

  public function getSubject(): string
  {
    return 'Nová zpráva z kontaktního formuláře';
  }


}

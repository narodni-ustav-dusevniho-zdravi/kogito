<?php

namespace App\Entity\Content;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\Content\FrequentlyAskedQuestionRepository")
 */
class FrequentlyAskedQuestion
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
   * @ORM\Column(name="question_cs", type="text")
   */
  private $questionCs = '';

  /**
   * @var string
   * @ORM\Column(name="question_en", type="text")
   */
  private $questionEn = '';

  /**
   * @var string
   * @ORM\Column(name="answer_cs", type="text")
   */
  private $answerCs = '';

  /**
   * @var string
   * @ORM\Column(name="answer_en", type="text")
   */
  private $answerEn = '';

  /**
   * @var bool
   * @ORM\Column(name="enable", type="boolean", options={"default":true})
   */
  private $enable = true;

  /**
   * FrequentlyAskedQuestion constructor.
   */
  public function __construct()
  {
    $this->added = new \DateTime();
    $this->updated = new \DateTime();
  }

  public function __toString()
  {
    return $this->questionCs;
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getAdded(): ?\DateTimeInterface
  {
    return $this->added;
  }

  public function setAdded(\DateTimeInterface $added): self
  {
    $this->added = $added;

    return $this;
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
  public function getQuestionCs(): string
  {
    return $this->questionCs;
  }

  /**
   * @param string $questionCs
   */
  public function setQuestionCs(string $questionCs): void
  {
    $this->questionCs = $questionCs;
  }

  /**
   * @return string
   */
  public function getQuestionEn(): string
  {
    return $this->questionEn;
  }

  /**
   * @param string $questionEn
   */
  public function setQuestionEn(string $questionEn): void
  {
    $this->questionEn = $questionEn;
  }

  public function getQuestionByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->questionEn;
    }

    return $this->questionCs;
  }

  /**
   * @return string
   */
  public function getAnswerCs(): string
  {
    return $this->answerCs;
  }

  /**
   * @param string $answerCs
   */
  public function setAnswerCs(string $answerCs): void
  {
    $this->answerCs = $answerCs;
  }

  public function getAnswerByLocale(string $locale): string
  {
    if($locale === 'en'){
      return $this->answerEn;
    }

    return $this->answerCs;
  }

  /**
   * @return string
   */
  public function getAnswerEn(): string
  {
    return $this->answerEn;
  }

  /**
   * @param string $answerEn
   */
  public function setAnswerEn(string $answerEn): void
  {
    $this->answerEn = $answerEn;
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
}

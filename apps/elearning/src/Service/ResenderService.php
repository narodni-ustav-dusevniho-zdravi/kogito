<?php


namespace App\Service;


use App\Interfaces\Resendable;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class ResenderService
{
  /** @var Environment */
  private $twigEngine;
  /** @var \Swift_Mailer */
  private $mailer;
  /** @var GlobalSettingsService  */
  private $globalSettingsService;
  /** @var TranslatorInterface */
  private $translator;
  /** @var ManagerRegistry */
  private $registry;
  /** @var LoggerInterface */
  private $emailLogger;
  private $settings;

  /**
   * ResenderService constructor.
   * @param Environment $twigEngine
   * @param \Swift_Mailer $mailer
   */
  public function __construct(Environment $twigEngine,
                              \Swift_Mailer $mailer,
                              GlobalSettingsService $globalSettings,
                              TranslatorInterface $translator,
                              ManagerRegistry $registry,
                              LoggerInterface $emailLogger)
  {
    $this->twigEngine = $twigEngine;
    $this->mailer = $mailer;
    $this->globalSettingsService = $globalSettings;
    $this->translator = $translator;
    $this->registry = $registry;
    $this->emailLogger = $emailLogger;
  }

  public function postPersist(LifecycleEventArgs $args)
  {
    $entity = $args->getEntity();

    if($entity instanceof Resendable)
      {
        $this->handleSend($entity);
      }
  }

  public function handleSend(Resendable $resendable)
  {
    $globalSettings = $this->globalSettingsService->getSettings();

    if($globalSettings->getEmailResenderTargetEmail())
    {
      $mail = new \Swift_Message();

      $mail->setFrom(array($globalSettings->getEmailResenderFromEmail()));
      $mail->setTo(explode(',', $globalSettings->getEmailResenderTargetEmail()));
      $mail->setSubject($resendable->getSubject());

      $mail->setBody($this->twigEngine->render($resendable->getTemplate(), array(
          'resendable' => $resendable,
        )),'text/html');

      $this->mailer->send($mail);
    }
  }
}

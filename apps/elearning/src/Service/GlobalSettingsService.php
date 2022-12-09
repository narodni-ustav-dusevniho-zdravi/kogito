<?php


namespace App\Service;


use App\Entity\GlobalSettings;
use Doctrine\Persistence\ManagerRegistry;

class GlobalSettingsService
{
  /** @var ManagerRegistry */
  private $registry;

  /**
   * GlobalSettings constructor.
   * @param ManagerRegistry $registry
   */
  public function __construct(ManagerRegistry $registry)
  {
    $this->registry = $registry;
  }

  public function getSettings() : GlobalSettings
  {
      $em = $this->registry->getManager();

      $globalSettings = $em->getRepository(GlobalSettings::class)->findNewest();

      if($globalSettings === null){
        $globalSettings = new GlobalSettings();

        $em->persist($globalSettings);
        $em->flush();
      }

      return $globalSettings;
  }
}

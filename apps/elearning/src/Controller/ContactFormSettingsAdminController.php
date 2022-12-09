<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\GlobalSettingsService;
use Sonata\AdminBundle\Controller\CRUDController;

final class ContactFormSettingsAdminController extends CRUDController
{
  public function listAction()
  {
    $settings = $this->get(GlobalSettingsService::class)->getSettings();

    return $this->redirect($this->admin->generateUrl('edit', array('id' => $settings->getId())));
  }
}

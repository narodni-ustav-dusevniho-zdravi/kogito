<?php
declare(strict_types=1);

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class LocaleService
{
  private $session;

  public function __construct(SessionInterface $session)
  {
    $this->session = $session;
  }

  /**
   * switch locale from en to cs and conversely.
   *
   * @param string $locale
   * @param Request $request
   *
   * @return string
   */
  public function switchLocale(
    string $locale,
    Request $request
  ): string
  {
    if ($locale !== 'en'  && $locale !== 'cs') {
      return 'cs';
    }

    // set local in session if it is not set
    if ($locale !== $request->getLocale()) {
      $this->session->set('_locale', $locale);
    }

    return $locale;
  }
}

<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use JMS\Serializer\SerializerBuilder;

final class PassQuestionsApiController extends AbstractController
{
  public const ResultA = '<p>Výborně! Dle Vašich odpovědí, to vypadá, že aktuálně není úzkost nebo strach Vaším nepřítelem.</p>';
  public const ResultB = '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel úzkost a příznaky s ní spojené. Zkuste pracovat s aplikací <a href="https://kogito.cz/" target="_blank">Kogito</a>, ta Vám může pomoci pracovat na Vašich myšlenkách a emocích a jejich tělesných příznacích. Také se naučíme, jak správně relaxovat a poznáte, jak podobnou situaci prožívaly jiné ženy.</p>
                <p>V případě potřeby koukněte na web <a href="https://usmevmamy.cz" target="_blank">usmevmamy.cz</a> nebo kontaktujte peer konzultantky přímo na <a href="https://centru-um.cz" target="_blank">centr-um.cz</a>.</p>';
  public const ResultC = '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel silná úzkost a příznaky s ní spojené. Pokud Vy nebo Vaše okolí cítíte, že Vám úzkosti silně ovlivňují Vaše každodenní bytí, doporučujeme vyhledat konzultaci u odborníka ve Vašem okolí. Váš praktický lékař by Vám měl pomoci někoho najít.</p>
                <p>V případě potřeby koukněte na web <a href="https://usmevmamy.cz" target="_blank">usmevmamy.cz</a> nebo kontaktujte peer konzultantky přímo na <a href="https://centru-um.cz" target="_blank">centr-um.cz</a>.</p>
                <p>Nebojte, nejste na to teď ale sama.</p>
                <p>Již teď můžete začít pracovat s aplikací <a href="https://kogito.cz/" target="_blank">Kogito</a>.  Naučíte se, jak pracovat na Vašich myšlenkách, emocích a tělesných projevech úzkosti.  Dále budete mít možnost pravidelně relaxovat a také poznáte, jak podobné příznaky prožívaly jiné ženy.</p>';

  /**
   * @Route("/api/pass", methods={"POST"})
   */
  public function __invoke(Request $request): JsonResponse
  {
    $serializer = SerializerBuilder::create()->build();
    $values = [];
    for ($i = 1; $i <= 31; $i++) {
      $values[$i] = $request->get('pass-question-'.$i);
    }

    $totalPoints = 0;
    foreach ($values as $value){
      $totalPoints += (int)$value;
    }

    if ($totalPoints < 21) {
      return new JsonResponse($serializer->serialize(self::ResultA,'json'));
    }

    if($totalPoints < 42) {
      return new JsonResponse($serializer->serialize(self::ResultB,'json'));
    }

    return new JsonResponse($serializer->serialize(self::ResultC,'json'));
  }
}

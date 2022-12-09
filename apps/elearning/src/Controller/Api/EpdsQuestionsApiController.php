<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use JMS\Serializer\SerializerBuilder;

final class EpdsQuestionsApiController extends AbstractController
{
  public const ResultA = '<p>Výborně! Dle Vašich odpovědí, to vypadá, že aktuálně není smutek nebo špatná nálada Vaším nepřítelem.</p>';
  public const ResultB = '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel špatná až depresivní nálada a příznaky s ní spojené.</p>
                <p>V případě potřeby koukněte na web <a href="https://usmevmamy.cz" target="_blank">usmevmamy.cz</a> nebo kontaktujte svého praktického lékaře.</p>
                <p>Můžete také zkusit aplikaci <a href="https://kogito.cz/" target="_blank">Kogito</a>, ta Vám může pomoci pracovat na Vašich myšlenkách a emocích. Také se naučíte, jak správně relaxovat a poznáte, jak podobnou situaci prožívaly jiné ženy.</p>';
  public const ResultC = '<p>Dle Vašich odpovědí, to vypadá, že aktuálně je Váš hlavní nepřítel depresivní nálada a příznaky s ní spojené. Pokud Vy nebo Vaše okolí cítíte, že Vám depresivní příznaky silně ovlivňují Vaše každodenní bytí, doporučujeme vyhledat konzultaci u odborníka ve Vašem okolí. Váš praktický lékař by Vám měl pomoci někoho najít.</p>
                <p>V případě potřeby koukněte na web <a href="https://usmevmamy.cz" target="_blank">usmevmamy.cz</a> nebo kontaktujte peer konzultantky přímo na <a href="https://centru-um.cz" target="_blank">centr-um.cz</a>.</p>
                <p>Můžete také zkusit aplikaci <a href="https://kogito.cz/" target="_blank">Kogito</a>, ta Vám může pomoci pracovat na Vašich myšlenkách a emocích. Také se naučíte, jak správně relaxovat a poznáte, jak podobnou situaci prožívaly jiné ženy.</p>';
  public const ResultD = '<p>Při vyplňování otázek jste uvedla, že Vás velmi často napadají myšlenky, že si nějak ublížíte. Pokud aktuálně přemýšlíte, že byste si nějak ublížila, či dokonce šáhla na život. Zkuste zavolat na Linku důvěry krizového centra: <a href="tel:284016666">284 016 666</a>.</p>
                <p>Tam Vám mohou poskytnout telefonickou krizovou intervenci.</p>';

  /**
   * @Route("/api/epds", methods={"POST"})
   */
  public function __invoke(Request $request): JsonResponse
  {
    $serializer = SerializerBuilder::create()->build();

    $values = [];
    for ($i = 1; $i <= 10; $i++) {
      $values[$i] = $request->get('epds-question-'.$i);
    }

    if ((int)$values[10] === 3){
      return new JsonResponse($serializer->serialize(self::ResultD,'json'));
    }

    $totalPoints = 0;
    foreach ($values as $value){
      $totalPoints += (int)$value;
    }

    if ($totalPoints < 10) {
      return new JsonResponse($serializer->serialize(self::ResultA,'json'));
    }

    if($totalPoints < 19) {
      return new JsonResponse($serializer->serialize(self::ResultB,'json'));
    }

    return new JsonResponse($serializer->serialize(self::ResultC,'json'));
  }
}

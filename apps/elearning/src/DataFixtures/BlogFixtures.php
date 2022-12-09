<?php


namespace App\DataFixtures;

use App\Entity\Blog\BlogArticle;
use App\Entity\Blog\BlogAuthor;
use App\Entity\Blog\BlogCategory;
use Cocur\Slugify\Slugify;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class BlogFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $blogCategory = new BlogCategory();
        $blogCategory->setNameCs('OBECNÉ');
        $blogCategory->setNameEn('General');
        $blogCategory->setSlug('obecne');
        $blogCategory->setSlugEn('general');
        $manager->persist($blogCategory);

        $blogAuthor = new BlogAuthor();
        $blogAuthor->setImage('https://via.placeholder.com/50x50.png');
        $blogAuthor->setNameCs('John Doe');
        $blogAuthor->setNameEn('John Doe');
        $blogAuthor->setDescriptionCs('Fiktivní autor tohoto článku');
        $blogAuthor->setDescriptionEn('Fiktivní autor tohoto článku');
        $manager->persist($blogAuthor);

        for ($i = 0; $i <= 7; $i++) {
          $blogArticle = $this->createBlog('Nadpis článku může být i dlouhý jak 14 dní', $blogCategory, $blogAuthor, 'https://via.placeholder.com/728x300.png');
          $manager->persist($blogArticle);
        }

        $manager->flush();
    }

    private function createBlog(string $title, BlogCategory $blogCategory, BlogAuthor $blogAuthor, string $image): BlogArticle
    {
        $slugify = new Slugify();

        $blogArticle = new BlogArticle();
        $blogArticle->setTitleCs($title);
        $blogArticle->setTitleEn($title);
        $blogArticle->setSlug($slugify->slugify($title));
        $blogArticle->setSlugEn($slugify->slugify($title));
        $blogArticle->setCategory($blogCategory);
        $blogArticle->setAuthor($blogAuthor);
        $blogArticle->setImage($image);
        $blogArticle->setMainTextCs('<p>Sotva&nbsp;odezněl shon po svátcích klidu Vánoc, i když někdy vás může napadnout, že svátky klidu jsou to pouze “obrazně”, jistě ještě všichni máte v paměti urputné shánění dárků pro své nejbližší <strong>provázeno nekončícím stresem</strong>…. a už je tady další rok. Pomalu mizí sníh a jaro je tady co nevidět. Začínají se <strong>krásně zelenat greeny</strong> a milovníci “<strong>gentlemanského</strong>” sportu, pomalu začnou leštit své hole a už se nemohou dočkat, jak opět pokoří <strong>svých 18 jamek</strong>.&nbsp;<br><br>Ovšem s novým rokem „pokud si pojištění nesjednal v průběhu sezóny“ by <a href="/proc-se-pojistit"><strong>každý golfista</strong></a>, zodpovědný za sebe i svému okolí, měl myslet na <strong>každoroční pojištění</strong> svého zdraví, svého golfového vybavení a možnosti, jak předejít nečekaným nehodám, které mohou na <a href="/aktuality/104/vse-o-golfu/co-je-to-footgolf-pravidla-a-kde-si-ho-muzete-zahrat">golfu</a> nastat. A věřte, nemusí jich být málo. Kromě toho, že můžete špatným odpalem zlomit třeba svou hůl, může také vaším odpalem vzniknout <a href="/aktuality/1/pojisteni/proc-mit-uzavreno-golfove-pojisteni-na-golfovou-sezonu"><strong>škoda na zdraví </strong></a>nebo majetku, či v horším případě zraníte někoho jiného. A to by zrovna ta nová <a href="/aktuality/99/vse-o-golfu/12-tipu-na-golf-v-zime-nebo-chladnem-pocasi"><strong>sezóna golfu</strong></a> moc optimisticky nezačala. Co myslíte?<br><br>Když máte uzavřeno <strong>golfové pojištění GolfPlan</strong>, na nic jiného už při golfu myslet nemusíte. Ať se vám stane jakákoliv <a href="/aktuality/4/pojisteni/pojisteni-golfistu-site-na-miru">nehoda</a>, způsobena vám, či vámi, <strong>GolfPlan</strong> vám vždy a v každé situaci kryje záda. Golfové pojištění <strong>GolfPlan je pojištěním</strong>, které za vás řeší nejen nepříjemné nehody, ale slaví s vámi i vaše úspěchy. Ptáte se jak? Přece vám vždy uhradí oslavu <strong>vašeho <a href="/aktuality/19/pojisteni/kdyz-zahrajete-hole-in-one-zaplatime-vam-paradni-oslavu">Hole in One</a></strong> s přáteli a to je přeci skvělá zpráva!</p>
                <h2>Možné slevy na golfové pojištění</h2>
                <p>Pokud chcete ušetřit, můžete se pojistit jako rodina, kde můžete získat slevu <strong>až do výše 20%</strong>, nebo sjednat <strong>pojištění na dobu 24 – 36 měsíců</strong>, kde získáte další slevu <strong>až do výše 10%</strong>. Neméně zajímavé je i možnost “flotilového pojištění”, kde se můžete domluvit s přáteli a tak využít <strong>zvýhodněné ceny</strong> pojištění (platné pro 5 osob a více).</p>
                <h2>Míti sjednané pojištění GolfPlan vám přináší spoustu dalších benefitů!</h2>
                <p>Nejlepším <a href="/benefity">benefitem</a>, samozřejmě kromě <strong>vaší ochrany a hry </strong>bez zbytečných starostí, je možnost využití velkého množství nabízených <strong>benefitů</strong> v GolfPlan Premium Clubu. Zde pochopíte, že mít sjednané golfové pojištění GolfPlan sebou přináší jedinečnou možnost, jak zažít spousty nových zážitků v <a href="/aktuality/106/golfova-hriste/golf-resort-monachus-golfove-hriste-mnich-a-nova-bystrice"><strong>golfových resortech</strong></a> po celé České republice i na Slovensku za <strong>zvýhodněnou</strong> cenu, nebo dokonce zdarma! Součástí <strong><a href="/aktuality/15/premium-club/jak-funguje-a-jak-vznikl-premium-club-golfplan">Premium Club GolfPlan</a></strong> jsou zvýhodněné i <strong>zdarma green fee</strong>, slevy do eshopů nebo pro shopů, neveřejné <strong>golfové balíčky</strong> na ubytování a mnoho dalších <strong>benefitů</strong>. S GolfPlanem můžete zažít hodně a na golfu ušetřit ještě víc!<br><br><strong>GolfPlan</strong> jako pojištění je velice flexibilní a nabízí mnoho možností pojistných krytí tak, aby jste si mohli vybrat jen to nejlepší a byli <strong>maximálně spokojeni</strong>. V dlouhodobém horizontu nabízí nejen výhodné slevy k samotnému <a href="/aktuality/8/pojisteni/co-je-to-golfove-pojisteni"><strong>pojištění</strong></a>, ale také dynamicky se měnící výhodné benefity, které můžete při uzavření <strong>golfového pojištění GolfPlan</strong> plně využít a nad tím byste se měli zamyslet, když budete zvažovat jestli <a href="/aktuality/51/pojisteni/proc-si-golfiste-oblibili-golfove-pojisteni">pojištění</a> mít či nikoli.</p>
                <h3>Být součástí GolfPlan rodiny se vyplatí!</h3>
                <p>Zkuste to vzít trošku s <strong>hravostí</strong> a nadhledem. S golfovým <a href="/aktuality/61/pojisteni/nejlevnejsi-pojisteni-golfplan-zacina-jiz-od-1-800-kc-za-rok"><strong>pojištěním GolfPlan</strong></a> už nemusíte plakat nad zlomenou holí, <strong>zničeným vozíkem či ukradeným <a href="/aktuality/21/pojisteni/vite-jake-jmeni-uz-mate-v-golfovem-vybaveni">bagem</a></strong> nebo věcí v něm. Nemusíte se schovávat v křoví, když nechtěně trefíte hráče na druhé fairway tak, že mu prasknou brýle, v tom lepším případě… a Hole in One nemusíte slavit přece sami, můžete se “rozšoupnout” a <a href="/aktuality/66/pojisteni/nejde-o-to-byt-pouze-pojisteny-ale-o-to-byt-spravne-pojisteny">GolfPlan</a> vám to zaplatí. Toto je jen zlomek situací co GolfPlan <a href="/aktuality/43/pojisteni/mate-sve-clenstvi-v-golfovem-klubu-pojisteno">pojištění</a> pokrývá. Tak buďte v každé sezóně součástí <strong>veliké GolfPlan rodiny</strong> a pochopíte…..jak dobré je míti <a href="/aktuality/62/pojisteni/kazdy-golfista-to-s-pojistenim-ma-jinak">GolfPlan</a> jako parťáka, o kterého se <strong>můžete kdykoli opřít</strong>!<br><br><strong>Sjednat pojištění</strong> si můžete jednoduše a online přímo na našich stránkách, kliknutím na "<a href="/kalkulace-golfoveho-pojisteni">Spočítat pojištění</a>".<br>&nbsp;</p>');
        $blogArticle->setMainTextEn('<p>Sotva&nbsp;odezněl shon po svátcích klidu Vánoc, i když někdy vás může napadnout, že svátky klidu jsou to pouze “obrazně”, jistě ještě všichni máte v paměti urputné shánění dárků pro své nejbližší <strong>provázeno nekončícím stresem</strong>…. a už je tady další rok. Pomalu mizí sníh a jaro je tady co nevidět. Začínají se <strong>krásně zelenat greeny</strong> a milovníci “<strong>gentlemanského</strong>” sportu, pomalu začnou leštit své hole a už se nemohou dočkat, jak opět pokoří <strong>svých 18 jamek</strong>.&nbsp;<br><br>Ovšem s novým rokem „pokud si pojištění nesjednal v průběhu sezóny“ by <a href="/proc-se-pojistit"><strong>každý golfista</strong></a>, zodpovědný za sebe i svému okolí, měl myslet na <strong>každoroční pojištění</strong> svého zdraví, svého golfového vybavení a možnosti, jak předejít nečekaným nehodám, které mohou na <a href="/aktuality/104/vse-o-golfu/co-je-to-footgolf-pravidla-a-kde-si-ho-muzete-zahrat">golfu</a> nastat. A věřte, nemusí jich být málo. Kromě toho, že můžete špatným odpalem zlomit třeba svou hůl, může také vaším odpalem vzniknout <a href="/aktuality/1/pojisteni/proc-mit-uzavreno-golfove-pojisteni-na-golfovou-sezonu"><strong>škoda na zdraví </strong></a>nebo majetku, či v horším případě zraníte někoho jiného. A to by zrovna ta nová <a href="/aktuality/99/vse-o-golfu/12-tipu-na-golf-v-zime-nebo-chladnem-pocasi"><strong>sezóna golfu</strong></a> moc optimisticky nezačala. Co myslíte?<br><br>Když máte uzavřeno <strong>golfové pojištění GolfPlan</strong>, na nic jiného už při golfu myslet nemusíte. Ať se vám stane jakákoliv <a href="/aktuality/4/pojisteni/pojisteni-golfistu-site-na-miru">nehoda</a>, způsobena vám, či vámi, <strong>GolfPlan</strong> vám vždy a v každé situaci kryje záda. Golfové pojištění <strong>GolfPlan je pojištěním</strong>, které za vás řeší nejen nepříjemné nehody, ale slaví s vámi i vaše úspěchy. Ptáte se jak? Přece vám vždy uhradí oslavu <strong>vašeho <a href="/aktuality/19/pojisteni/kdyz-zahrajete-hole-in-one-zaplatime-vam-paradni-oslavu">Hole in One</a></strong> s přáteli a to je přeci skvělá zpráva!</p>
                <h2>Možné slevy na golfové pojištění</h2>
                <p>Pokud chcete ušetřit, můžete se pojistit jako rodina, kde můžete získat slevu <strong>až do výše 20%</strong>, nebo sjednat <strong>pojištění na dobu 24 – 36 měsíců</strong>, kde získáte další slevu <strong>až do výše 10%</strong>. Neméně zajímavé je i možnost “flotilového pojištění”, kde se můžete domluvit s přáteli a tak využít <strong>zvýhodněné ceny</strong> pojištění (platné pro 5 osob a více).</p>
                <h2>Míti sjednané pojištění GolfPlan vám přináší spoustu dalších benefitů!</h2>
                <p>Nejlepším <a href="/benefity">benefitem</a>, samozřejmě kromě <strong>vaší ochrany a hry </strong>bez zbytečných starostí, je možnost využití velkého množství nabízených <strong>benefitů</strong> v GolfPlan Premium Clubu. Zde pochopíte, že mít sjednané golfové pojištění GolfPlan sebou přináší jedinečnou možnost, jak zažít spousty nových zážitků v <a href="/aktuality/106/golfova-hriste/golf-resort-monachus-golfove-hriste-mnich-a-nova-bystrice"><strong>golfových resortech</strong></a> po celé České republice i na Slovensku za <strong>zvýhodněnou</strong> cenu, nebo dokonce zdarma! Součástí <strong><a href="/aktuality/15/premium-club/jak-funguje-a-jak-vznikl-premium-club-golfplan">Premium Club GolfPlan</a></strong> jsou zvýhodněné i <strong>zdarma green fee</strong>, slevy do eshopů nebo pro shopů, neveřejné <strong>golfové balíčky</strong> na ubytování a mnoho dalších <strong>benefitů</strong>. S GolfPlanem můžete zažít hodně a na golfu ušetřit ještě víc!<br><br><strong>GolfPlan</strong> jako pojištění je velice flexibilní a nabízí mnoho možností pojistných krytí tak, aby jste si mohli vybrat jen to nejlepší a byli <strong>maximálně spokojeni</strong>. V dlouhodobém horizontu nabízí nejen výhodné slevy k samotnému <a href="/aktuality/8/pojisteni/co-je-to-golfove-pojisteni"><strong>pojištění</strong></a>, ale také dynamicky se měnící výhodné benefity, které můžete při uzavření <strong>golfového pojištění GolfPlan</strong> plně využít a nad tím byste se měli zamyslet, když budete zvažovat jestli <a href="/aktuality/51/pojisteni/proc-si-golfiste-oblibili-golfove-pojisteni">pojištění</a> mít či nikoli.</p>
                <h3>Být součástí GolfPlan rodiny se vyplatí!</h3>
                <p>Zkuste to vzít trošku s <strong>hravostí</strong> a nadhledem. S golfovým <a href="/aktuality/61/pojisteni/nejlevnejsi-pojisteni-golfplan-zacina-jiz-od-1-800-kc-za-rok"><strong>pojištěním GolfPlan</strong></a> už nemusíte plakat nad zlomenou holí, <strong>zničeným vozíkem či ukradeným <a href="/aktuality/21/pojisteni/vite-jake-jmeni-uz-mate-v-golfovem-vybaveni">bagem</a></strong> nebo věcí v něm. Nemusíte se schovávat v křoví, když nechtěně trefíte hráče na druhé fairway tak, že mu prasknou brýle, v tom lepším případě… a Hole in One nemusíte slavit přece sami, můžete se “rozšoupnout” a <a href="/aktuality/66/pojisteni/nejde-o-to-byt-pouze-pojisteny-ale-o-to-byt-spravne-pojisteny">GolfPlan</a> vám to zaplatí. Toto je jen zlomek situací co GolfPlan <a href="/aktuality/43/pojisteni/mate-sve-clenstvi-v-golfovem-klubu-pojisteno">pojištění</a> pokrývá. Tak buďte v každé sezóně součástí <strong>veliké GolfPlan rodiny</strong> a pochopíte…..jak dobré je míti <a href="/aktuality/62/pojisteni/kazdy-golfista-to-s-pojistenim-ma-jinak">GolfPlan</a> jako parťáka, o kterého se <strong>můžete kdykoli opřít</strong>!<br><br><strong>Sjednat pojištění</strong> si můžete jednoduše a online přímo na našich stránkách, kliknutím na "<a href="/kalkulace-golfoveho-pojisteni">Spočítat pojištění</a>".<br>&nbsp;</p>');
        $blogArticle->setSeoContentCs('Nadpis článku může být i dlouhý jak 14 dní');
        $blogArticle->setSeoContentEn('Nadpis článku může být i dlouhý jak 14 dní');
        $blogArticle->setSeoPageTitleCs('Nadpis článku může být i dlouhý jak 14 dní');
        $blogArticle->setSeoPageTitleEn('Nadpis článku může být i dlouhý jak 14 dní');
        $blogArticle->setSmallTitleCs('Doplňkový nadpis');
        $blogArticle->setSmallTitleEn('Doplňkový nadpis');

        return $blogArticle;
    }
}

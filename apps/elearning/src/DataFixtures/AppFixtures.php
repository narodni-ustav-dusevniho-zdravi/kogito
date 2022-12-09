<?php

namespace App\DataFixtures;

use App\Application\Sonata\UserBundle\Entity\User;
use App\Constant\PageModalType;
use App\Entity\Component;
use App\Entity\GlobalSettings;
use App\Entity\Menu;
use App\Entity\MenuItem;
use App\Entity\Page;
use App\Entity\PageModal\PageModal;
use App\Service\Component\Blog\BlogHeader;
use App\Service\Component\Common\BannerTop;
use App\Service\Component\Common\FooterBlock;
use App\Service\Component\Common\GlobalInformation;
use App\Service\Component\Homepage\FaqBlock;
use App\Service\Component\Homepage\HomepageHeader;
use App\Service\Component\Homepage\ImageBlockWithText;
use App\Service\Component\Homepage\InfoTableBlock;
use App\Service\Component\Homepage\LeftImageRightText;
use App\Service\Component\Homepage\ReferenceBlock;
use App\Service\Component\Homepage\TwoColumnTextBlock;
use App\Service\Component\Homepage\TwoColumnTextBlockWithList;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Templating\Helper\AssetsHelper;
use Symfony\Component\Asset\Packages;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Twig\Environment;

class AppFixtures extends Fixture
{
  private $encoder;
  private $packages;

  public function __construct(UserPasswordEncoderInterface $encoder, Packages $packages)
  {
    $this->encoder = $encoder;
    $this->packages = $packages;
  }

  public function load(ObjectManager $manager)
  {
    $user = new User();
    $user->setUsername('admin');
    $user->setUsernameCanonical('admin');
    $user->setEmail('admin@mountainlift.cz');
    $user->setEmailCanonical('admin@mountainlift.cz');
    $user->setPassword($this->encoder->encodePassword($user, 'test'));
    $user->setRoles(array('ROLE_SUPER_ADMIN'));

    $manager->persist($user);
    $manager->flush();

    $page = array();

    $pages[] = $homePage = $this->createHomepage();
    $pages[] = $contactPage = $this->createContact();
    $pages[] = $aboutUsPage = $this->createAboutUs();
    $pages[] = $aboutProjectPage = $this->createAboutProject();

    $pages[] = $conferences = $this->createConferences();

    $pages[] = $forWoman = $this->createForWoman();

    $pages[] = $forWomanPostpartum = $this->createForWomanPostpartum();
    $pages[] = $forWomanPostpartumPostpartumDepression = $this->createForWomanPostpartumPostpartumDepression();
    $pages[] = $forWomanPostpartumMixedFeelingsAfterChildbirth = $this->createForWomanPostpartumMixedFeelingsAfterChildbirth();
    $pages[] = $forWomanPostpartumSleepAfterChildbirth = $this->createForWomanPostpartumSleepAfterChildbirth();
    $pages[] = $forWomanPostpartumPostpartumAnxiety = $this->createForWomanPostpartumPostpartumAnxiety();
    $pages[] = $forWomanPostpartumPostpartumPsychosis = $this->createForWomanPostpartumPostpartumPsychosis();
    $pages[] = $forWomanPostpartumRecoveryFromDifficultChildbirth = $this->createForWomanPostpartumRecoveryFromDifficultChildbirth();
    $pages[] = $forWomanPostpartumMedicationInBreastfeeding = $this->createForWomanPostpartumMedicationInBreastfeeding();
    $pages[] = $forWomanPostpartumMedicationMyBaby = $this->createForWomanPostpartumMyBaby();
    $pages[] = $forWomanPostpartumHowToFindHelp = $this->createForWomanPostpartumHowToFindHelp();

    $pages[] = $forWomanPregnancy = $this->createForWomanPregnancy();
    $pages[] = $forWomanPregnancyMixedFeelingsInPregnancy = $this->createForWomanPregnancyMixedFeelingsInPregnancy();
    $pages[] = $forWomanPregnancyAnxietyAndPanicDisorders = $this->createForWomanPregnancyAnxietyAndPanicDisorders();
    $pages[] = $forWomanPregnancyFearOfBirth = $this->createForWomanPregnancyFearOfBirth();
    $pages[] = $forWomanPregnancyDepressionInPregnancy = $this->createForWomanPregnancyDepressionInPregnancy();
    $pages[] = $forWomanPregnancyOtherMentalDisordersInPregnancy = $this->createForWomanPregnancyOtherMentalDisordersInPregnancy();
    $pages[] = $forWomanPregnancyMedicationInPregnancy = $this->createForWomanPregnancyMedicationInPregnancy();
    $pages[] = $forWomanPregnancyHowToFindHelp = $this->createForWomanPregnancyHowToFindHelp();

    $pages[] = $forProfessionals = $this->createForProfessionals();

    $pages[] = $forProfessionalsPostpartum = $this->createForProfessionalsPostpartum();
    $pages[] = $forProfessionalsPostpartumPostpartumPsychosis = $this->createForProfessionalsPostpartumPostpartumPsychosis();
    $pages[] = $forProfessionalsPostpartumPostpartumDepression = $this->createForProfessionalsPostpartumPostpartumDepression();
    $pages[] = $forProfessionalsPostpartumAntidepressantsAndBreastfeeding = $this->createForProfessionalsPostpartumAntidepressantsAndBreastfeeding();
    $pages[] = $forProfessionalsPostpartumAntipsychoticsAndBreastfeeding = $this->createForProfessionalsPostpartumAntipsychoticsAndBreastfeeding();
    $pages[] = $forProfessionalsPostpartumBenzodiazepinesFromGypnoticsAndBreastfeeding = $this->createForProfessionalsPostpartumBenzodiazepinesFromGypnoticsAndBreastfeeding();
    $pages[] = $forProfessionalsPostpartumBipolarDisorderAfterBirth = $this->createForProfessionalsPostpartumBipolarDisorderAfterBirth();
    $pages[] = $forProfessionalsPostpartumGeneralPsychopharmacologyInLactation = $this->createForProfessionalsPostpartumGeneralPsychopharmacologyInLactation();
    $pages[] = $forProfessionalsPostpartumSchizophreniaPostpartum = $this->createForProfessionalsPostpartumSchizophreniaPostpartum();
    $pages[] = $forProfessionalsPostpartumMoodStabilizersAndBreastfeeding = $this->createForProfessionalsPostpartumMoodStabilizersAndBreastfeeding();
    $pages[] = $forProfessionalsPostpartumAnxietyDisordersAfterBirth = $this->createForProfessionalsPostpartumAnxietyDisordersAfterBirth();

    $pages[] = $forProfessionalsPregnancy = $this->createForProfessionalsPregnancy();
    $pages[] = $forProfessionalsPregnancyAntidepressantsAndPregnancy = $this->createForProfessionalsPregnancyAntidepressantsAndPregnancy();
    $pages[] = $forProfessionalsPregnancyAntipsychoticsAndPregnancy = $this->createForProfessionalsPregnancyAntipsychoticsAndPregnancy();
    $pages[] = $forProfessionalsPregnancyAnxiolyticsAndPregnancy = $this->createForProfessionalsPregnancyAnxiolyticsAndPregnancy();
    $pages[] = $forProfessionalsPregnancyBipolarDisorderAndPregnancy = $this->createForProfessionalsPregnancyBipolarDisorderAndPregnancy();
    $pages[] = $forProfessionalsPregnancyDepressiveDisorderAndPregnancy = $this->createForProfessionalsPregnancyDepressiveDisorderAndPregnancy();
    $pages[] = $forProfessionalsPregnancyGeneralPsychopharmacologyInPregnancy = $this->createForProfessionalsPregnancyGeneralPsychopharmacologyInPregnancy();
    $pages[] = $forProfessionalsPregnancyPsychoticDisordersAndPregnancy = $this->createForProfessionalsPregnancyPsychoticDisordersAndPregnancy();
    $pages[] = $forProfessionalsPregnancyMoodStabilizersAndPregnancy = $this->createForProfessionalsPregnancyMoodStabilizersAndPregnancy();

    $pages[] = $forLovedOnes = $this->createForLovedOnes();
    $pages[] = $forLovedOnesWhatCanIDo = $this->createForLovedOnesWhatCanIDo();
    $pages[] = $forLovedOnesWhereToContact = $this->createForLovedOnesWhereToContact();
    $pages[] = $forLovedOnesMentalHealthOfFathers = $this->createForLovedOnesMentalHealthOfFathers();

    $pages[] = $testYourself = $this->createTestYourself();

    $pages[] = $gdpr = $this->createGdpr();

    for ($i = 0; $i < count($pages); $i++) {
        /** @var Page $page */
        $page = $pages[$i];
        $page->setPosition($i + 1);
        $page->setEnabled(true);
        $page->setEnableChangeHandle(false);
        $page->setEnableChangeSlug(false);
        $page->setEnableChangingComponents(true);

        $manager->persist($page);
    }

    $manager->persist(GlobalInformation::prepareDefaultData());
//    $manager->persist(BannerTop::prepareDefaultData());

//    $mainMenu = $this->createTopMenu();
//    $mainMenu->addMenuItem($this->createMenuItem($homePage, 'Homepage', 'Homepage'));

//    $parentMenuItem = $this->createMenuItem($forWoman, 'Pro ženy', 'Pro ženy');
//    $mainMenu->addMenuItem($parentMenuItem);

//    $subMenuItem = $this->createMenuItem($forWomanPostpartum, 'Po porodu', 'Po porodu', $parentMenuItem);
//    $subMenuItem->setMenu($mainMenu);

//    $manager->persist($mainMenu);
//    $manager->persist($subMenuItem);

//    $footerMenu = $this->createFooterMenu();
//    $footerMenu->addMenuItem($this->createMenuItem($homePage, 'Homepage', 'Homepage'));
//    $footerMenu->addMenuItem($this->createMenuItem($blogPage, 'Blog', 'Blog'));
//    $footerMenu->addMenuItem($this->createMenuItem(null, 'Kontakt', 'Contact', null, '#kontakt'));

//    $manager->persist($footerMenu);

    $pageModal = new PageModal();
    $pageModal->setTitleCs('Test');
    $pageModal->setTitleEn('Test');
    $pageModal->setType(PageModalType::DISPLAY_ON_EXIT);
    $pageModal->setImage('https://via.placeholder.com/728x300.png');
    $pageModal->setContentCs('<p>Test test</p>');
    $pageModal->setContentEn('<p>Test test</p>');
    $pageModal->setLinkCs('#');
    $pageModal->setLinkEn('#');
    $pageModal->setTextLinkCs('Button');
    $pageModal->setTextLinkEn('Button');
    $pageModal->setCloseTextLinkCs('Close');
    $pageModal->setCloseTextLinkEn('Close');
    $pageModal->setEnable(false);
    $pageModal->setDisplayOnAllPages(true);
    $pageModal->setStart(new \DateTime());
    $month = new \DateTime();
    $month->add(new \DateInterval('P1M'));
    $pageModal->setEnd($month);
    $pageModal->setPageModalId('1234ABC');

    $manager->persist($pageModal);

    $manager->flush();

    $settings = new GlobalSettings();
    $settings->setEmailResenderTargetEmail('kristyna.hrdlickova@nudz.cz');
    $settings->setEmailResenderFromEmail('formular@nudz.cz');
    $settings->setEnabledLanguages(["en"]);
    $manager->persist($settings);
    $manager->flush();
  }

  private function createHomepage(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Hlavní stránka');
    $page->setHandle('homepage');
    $page->setTemplate('pages/homepage.html.twig');

//    $page->addComponent(HomepageHeader::prepareDefaultData(array(
//        'image1' => $this->packages->getUrl('https://via.placeholder.com/728x300.png'),
//        'image2' => $this->packages->getUrl('https://via.placeholder.com/728x300.png'),
//      )
//    ));
//    $page->addComponent(FaqBlock::prepareDefaultData());

    return $page;
  }

  public function createContact(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Kontakt');
    $page->setHandle('contact');
    $page->setSlug('kontakt');
    $page->setSlugEn('contact');
    $page->setPageTitle('Kontakt');
    $page->setPageTitleEn('Contact');
    $page->setTemplate('pages/contact.html.twig');

    return $page;
  }

  public function createAboutUs(): Page
  {
    $page = new Page();

    $page->setAdminDescription('O nás');
    $page->setHandle('about-us');
    $page->setSlug('o-nas');
    $page->setSlugEn('about-us');
    $page->setPageTitle('O nás');
    $page->setPageTitleEn('About us');
    $page->setTemplate('pages/about-us.html.twig');

    return $page;
  }

  public function createAboutProject(): Page
  {
    $page = new Page();

    $page->setAdminDescription('O projektu');
    $page->setHandle('about-project');
    $page->setSlug('o-projektu');
    $page->setSlugEn('about-project');
    $page->setPageTitle('O projektu');
    $page->setPageTitleEn('About Project');
    $page->setTemplate('pages/about-project.html.twig');

    return $page;
  }

  public function createConferences(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Konference');
    $page->setHandle('conferences');
    $page->setSlug('konference');
    $page->setSlugEn('conferences');
    $page->setPageTitle('Konference');
    $page->setTemplate('pages/conferences/default.html.twig');

    return $page;
  }

  public function createForWoman(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Pro ženy');
    $page->setHandle('for-woman');
    $page->setSlug('pro-zeny');
    $page->setSlugEn('for-woman');
    $page->setPageTitle('Pro ženy');
    $page->setTemplate('pages/for-woman/default.html.twig');

    return $page;
  }

  public function createForWomanPostpartum(): Page
  {
    $page = new Page();

    $page->setForWomen(true);
    $page->setAdminDescription('Po porodu');
    $page->setHandle('for-woman-postpartum');
    $page->setSlug('po-porodu');
    $page->setSlugEn('for-woman-postpartum');
    $page->setPageTitle('Po porodu');
    $page->setTemplate('pages/for-woman/postpartum/default.html.twig');

    return $page;
  }

  public function createForWomanPostpartumMixedFeelingsAfterChildbirth(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Smíšené pocity po porodu');
    $page->setHandle('for-woman-postpartum-mixed-feelings-after-childbirth');
    $page->setSlug('smisene-pocity-po-porodu');
    $page->setSlugEn('for-woman-postpartum-mixed-feelings-after-childbirth');
    $page->setPageTitle('Smíšené pocity po porodu');
    $page->setTemplate('pages/for-woman/postpartum/mixed-feelings-after-childbirth.html.twig');

    return $page;
  }

  public function createForWomanPostpartumSleepAfterChildbirth(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Spánek po porodu');
    $page->setHandle('for-woman-postpartum-sleep-after-childbirth');
    $page->setSlug('spanek-po-porodu');
    $page->setSlugEn('for-woman-postpartum-sleep-after-childbirth');
    $page->setPageTitle('Spánek po porodu');
    $page->setTemplate('pages/for-woman/postpartum/sleep-after-childbirth.html.twig');

    return $page;
  }

  public function createForWomanPostpartumPostpartumAnxiety(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Poporodní úzkosti');
    $page->setHandle('for-woman-postpartum-postpartum-anxiety');
    $page->setSlug('poporodni-uzkosti');
    $page->setSlugEn('for-woman-postpartum-postpartum-anxiety');
    $page->setPageTitle('Poporodní úzkosti');
    $page->setTemplate('pages/for-woman/postpartum/postpartum-anxiety.html.twig');

    return $page;
  }

  public function createForWomanPostpartumPostpartumDepression(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Poporodní deprese');
    $page->setHandle('for-woman-postpartum-postpartum-depression');
    $page->setSlug('poporodni-deprese');
    $page->setSlugEn('for-woman-postpartum-postpartum-depression');
    $page->setPageTitle('Poporodní deprese');
    $page->setTemplate('pages/for-woman/postpartum/postpartum-depression.html.twig');

    return $page;
  }

  public function createForWomanPostpartumPostpartumPsychosis(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Poporodní psychóza');
    $page->setHandle('for-woman-postpartum-postpartum-psychosis');
    $page->setSlug('poporodni-psychoza');
    $page->setSlugEn('for-woman-postpartum-postpartum-psychosis');
    $page->setPageTitle('Poporodní psychóza');
    $page->setTemplate('pages/for-woman/postpartum/postpartum-psychosis.html.twig');

    return $page;
  }

  public function createForWomanPostpartumRecoveryFromDifficultChildbirth(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Zotavení z těžkého porodu');
    $page->setHandle('for-woman-postpartum-recovery-from-difficult-childbirth');
    $page->setSlug('zotaveni-z-tezkeho-porodu');
    $page->setSlugEn('for-woman-postpartum-recovery-from-difficult-childbirth');
    $page->setPageTitle('Zotavení z těžkého porodu');
    $page->setTemplate('pages/for-woman/postpartum/recovery-from-difficult-childbirth.html.twig');

    return $page;
  }

  public function createForWomanPostpartumMedicationInBreastfeeding(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Léky v kojení');
    $page->setHandle('for-woman-postpartum-medication-in-breastfeeding');
    $page->setSlug('leky-v-kojeni');
    $page->setSlugEn('for-woman-postpartum-medication-in-breastfeeding');
    $page->setPageTitle('Léky v kojení');
    $page->setTemplate('pages/for-woman/postpartum/medication-in-breastfeeding.html.twig');

    return $page;
  }

  public function createForWomanPostpartumMyBaby(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Moje dítě');
    $page->setHandle('for-woman-postpartum-my-baby');
    $page->setSlug('moje-dite');
    $page->setSlugEn('for-woman-postpartum-my-baby');
    $page->setPageTitle('Moje dítě');
    $page->setTemplate('pages/for-woman/postpartum/my-baby.html.twig');

    return $page;
  }

  public function createForWomanPostpartumHowToFindHelp(): Page
  {
    $page = new Page();

    $page->setForWomenPostpartum(true);
    $page->setAdminDescription('Jak vyhledat pomoc');
    $page->setHandle('for-woman-postpartum-how-to-find-help');
    $page->setSlug('jak-vyhledat-pomoc');
    $page->setSlugEn('for-woman-postpartum-how-to-find-help');
    $page->setPageTitle('Jak vyhledat pomoc');
    $page->setTemplate('pages/for-woman/postpartum/how-to-find-help.html.twig');

    return $page;
  }

  public function createForWomanPregnancy(): Page
  {
    $page = new Page();

    $page->setForWomen(true);
    $page->setAdminDescription('Těhotenství');
    $page->setHandle('for-woman-pregnancy');
    $page->setSlug('tehotenstvi');
    $page->setSlugEn('for-woman-pregnancy');
    $page->setPageTitle('Těhotenství');
    $page->setTemplate('pages/for-woman/pregnancy/default.html.twig');

    return $page;
  }

  public function createForWomanPregnancyMixedFeelingsInPregnancy(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Smíšené pocity v těhotenství');
    $page->setHandle('for-woman-pregnancy-mixed-feelings-in-pregnancy');
    $page->setSlug('smisene-pocity-v-tehotenstvi');
    $page->setSlugEn('for-woman-pregnancy-mixed-feelings-in-pregnancy');
    $page->setPageTitle('Smíšené pocity v těhotenství');
    $page->setTemplate('pages/for-woman/pregnancy/mixed-feelings-in-pregnancy.html.twig');

    return $page;
  }

  public function createForWomanPregnancyAnxietyAndPanicDisorders(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Úzkosti a panické poruchy');
    $page->setHandle('for-woman-pregnancy-anxiety-and-panic-disorders');
    $page->setSlug('uzkosti-a-panické-poruchy');
    $page->setSlugEn('for-woman-pregnancy-anxiety-and-panic-disorders');
    $page->setPageTitle('Úzkosti a panické poruchy');
    $page->setTemplate('pages/for-woman/pregnancy/anxiety-and-panic-disorders.html.twig');

    return $page;
  }

  public function createForWomanPregnancyFearOfBirth(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Strach z porodu');
    $page->setHandle('for-woman-pregnancy-fear-of-birth');
    $page->setSlug('strach-z-porodu');
    $page->setSlugEn('for-woman-pregnancy-fear-of-birth');
    $page->setPageTitle('Strach z porodu');
    $page->setTemplate('pages/for-woman/pregnancy/fear-of-birth.html.twig');

    return $page;
  }

  public function createForWomanPregnancyDepressionInPregnancy(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Deprese v těhotenství');
    $page->setHandle('for-woman-pregnancy-depression-in-pregnancy');
    $page->setSlug('deprese-v-tehotenstvi');
    $page->setSlugEn('for-woman-pregnancy-depression-in-pregnancy');
    $page->setPageTitle('Deprese v těhotenství');
    $page->setTemplate('pages/for-woman/pregnancy/depression-in-pregnancy.html.twig');

    return $page;
  }

  public function createForWomanPregnancyOtherMentalDisordersInPregnancy(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Další duševní potíže v těhotenství');
    $page->setHandle('for-woman-pregnancy-other-mental-disorders-in-pregnancy');
    $page->setSlug('dalsi-dusevni-potize-v-tehotenstvi');
    $page->setSlugEn('for-woman-pregnancy-other-mental-disorders-in-pregnancy');
    $page->setPageTitle('Další duševní potíže v těhotenství');
    $page->setTemplate('pages/for-woman/pregnancy/other-mental-disorders-in-pregnancy.html.twig');

    return $page;
  }

  public function createForWomanPregnancyMedicationInPregnancy(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Léky v těhotenství');
    $page->setHandle('for-woman-pregnancy-medication-in-pregnancy');
    $page->setSlug('leky-v-tehotenstvi');
    $page->setSlugEn('for-woman-pregnancy-medication-in-pregnancy');
    $page->setPageTitle('Léky v těhotenství');
    $page->setTemplate('pages/for-woman/pregnancy/medication-in-pregnancy.html.twig');

    return $page;
  }

  public function createForWomanPregnancyHowToFindHelp(): Page
  {
    $page = new Page();

    $page->setForWomenPregnancy(true);
    $page->setAdminDescription('Jak vyhledat pomoc');
    $page->setHandle('for-woman-pregnancy-how-to-find-help');
    $page->setSlug('jak-vyhledat-pomoc');
    $page->setSlugEn('for-woman-pregnancy-how-to-find-help');
    $page->setPageTitle('Jak vyhledat pomoc');
    $page->setTemplate('pages/for-woman/pregnancy/how-to-find-help.html.twig');

    return $page;
  }

  public function createForProfessionals(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Pro odborníky');
    $page->setHandle('for-professionals');
    $page->setSlug('pro-odborniky');
    $page->setSlugEn('for-professionals');
    $page->setPageTitle('Pro odborníky');
    $page->setTemplate('pages/for-professionals/default.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartum(): Page
  {
    $page = new Page();

    $page->setForProfessionals(true);
    $page->setAdminDescription('Po porodu');
    $page->setHandle('for-professionals-postpartum');
    $page->setSlug('po-porodu');
    $page->setSlugEn('for-professionals-postpartum');
    $page->setPageTitle('Po porodu');
    $page->setTemplate('pages/for-professionals/postpartum/default.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumPostpartumDepression(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Poporodní deprese');
    $page->setHandle('for-professionals-postpartum-postpartum-depression');
    $page->setSlug('poporodni-deprese');
    $page->setSlugEn('for-professionals-postpartum-postpartum-depression');
    $page->setPageTitle('Poporodní deprese');
    $page->setTemplate('pages/for-professionals/postpartum/postpartum-depression.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumPostpartumPsychosis(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Poporodní psychóza');
    $page->setHandle('for-professionals-postpartum-postpartum-psychosis');
    $page->setSlug('poporodni-psychoza');
    $page->setSlugEn('for-professionals-postpartum-postpartum-psychosis');
    $page->setPageTitle('Poporodní psychóza');
    $page->setTemplate('pages/for-professionals/postpartum/postpartum-psychosis.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumAntidepressantsAndBreastfeeding(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Antidepresiva a kojení');
    $page->setHandle('for-professionals-postpartum-antidepressants-and-breastfeeding');
    $page->setSlug('antidepresiva-a-kojeni');
    $page->setSlugEn('for-professionals-postpartum-antidepressants-and-breastfeeding');
    $page->setPageTitle('Antidepresiva a kojení');
    $page->setTemplate('pages/for-professionals/postpartum/antidepressants-and-breastfeeding.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumAntipsychoticsAndBreastfeeding(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Antipsychotika a kojení');
    $page->setHandle('for-professionals-postpartum-antipsychotics-and-breastfeeding');
    $page->setSlug('antipsychotika-a-kojeni');
    $page->setSlugEn('for-professionals-postpartum-antipsychotics-and-breastfeeding');
    $page->setPageTitle('Antipsychotika a kojení');
    $page->setTemplate('pages/for-professionals/postpartum/antipsychotics-and-breastfeeding.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumBenzodiazepinesFromGypnoticsAndBreastfeeding(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Benzodiazepiny, z-hypnotika a kojení');
    $page->setHandle('for-professionals-postpartum-benzodiazepines-from-hypnotics-and-breastfeeding');
    $page->setSlug('benzodiazepiny-z-hypnotika-a-kojeni');
    $page->setSlugEn('for-professionals-postpartum-benzodiazepines-from-hypnotics-and-breastfeeding');
    $page->setPageTitle('Benzodiazepiny, z-hypnotika a kojení');
    $page->setTemplate('pages/for-professionals/postpartum/benzodiazepines-from-hypnotics-and-breastfeeding.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumBipolarDisorderAfterBirth(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Bipolární porucha po porodu');
    $page->setHandle('for-professionals-postpartum-bipolar-disorder-after-birth');
    $page->setSlug('bipolarni-porucha-po-porodu');
    $page->setSlugEn('for-professionals-postpartum-bipolar-disorder-after-birth');
    $page->setPageTitle('Bipolární porucha po porodu');
    $page->setTemplate('pages/for-professionals/postpartum/bipolar-disorder-after-birth.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumGeneralPsychopharmacologyInLactation(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Obecná psychofarmakologie v laktaci');
    $page->setHandle('for-professionals-postpartum-general-psychopharmacology-in-lactation');
    $page->setSlug('obecna-psychofarmakologie-v-laktaci');
    $page->setSlugEn('for-professionals-postpartum-general-psychopharmacology-in-lactation');
    $page->setPageTitle('Obecná psychofarmakologie v laktaci');
    $page->setTemplate('pages/for-professionals/postpartum/general-psychopharmacology-in-lactation.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumSchizophreniaPostpartum(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Schizofrenie po porodu');
    $page->setHandle('for-professionals-postpartum-schizophrenia-postpartum');
    $page->setSlug('schizofrenie-po-porodu');
    $page->setSlugEn('for-professionals-postpartum-schizophrenia-postpartum');
    $page->setPageTitle('Schizofrenie po porodu');
    $page->setTemplate('pages/for-professionals/postpartum/schizophrenia-postpartum.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumMoodStabilizersAndBreastfeeding(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Stabilizátory nálady a kojení');
    $page->setHandle('for-professionals-postpartum-mood-stabilizers-and-breastfeeding');
    $page->setSlug('stabilizatory-nalady-a-kojeni');
    $page->setSlugEn('for-professionals-postpartum-mood-stabilizers-and-breastfeeding');
    $page->setPageTitle('Stabilizátory nálady a kojení');
    $page->setTemplate('pages/for-professionals/postpartum/mood-stabilizers-and-breastfeeding.html.twig');

    return $page;
  }

  public function createForProfessionalsPostpartumAnxietyDisordersAfterBirth(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPostpartum(true);
    $page->setAdminDescription('Úzkostné poruchy po porodu');
    $page->setHandle('for-professionals-postpartum-anxiety-disorders-after-birth');
    $page->setSlug('uzkostne-poruchy-po-porodu');
    $page->setSlugEn('for-professionals-postpartum-anxiety-disorders-after-birth');
    $page->setPageTitle('Úzkostné poruchy po porodu');
    $page->setTemplate('pages/for-professionals/postpartum/anxiety-disorders-after-birth.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancy(): Page
  {
    $page = new Page();

    $page->setForProfessionals(true);
    $page->setAdminDescription('Těhotenství');
    $page->setHandle('for-professionals-pregnancy');
    $page->setSlug('tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy');
    $page->setPageTitle('Těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/default.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyAntidepressantsAndPregnancy(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Antidepresiva a těhotenství');
    $page->setHandle('for-professionals-pregnancy-antidepressants-and-pregnancy');
    $page->setSlug('antidepresiva-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-antidepressants-and-pregnancy');
    $page->setPageTitle('Antidepresiva a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/antidepressants-and-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyAntipsychoticsAndPregnancy(): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Antipsychotika a těhotenství');
    $page->setHandle('for-professionals-pregnancy-antipsychotics-and-pregnancy');
    $page->setSlug('antipsychotika-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-antipsychotics-and-pregnancy');
    $page->setPageTitle('Antipsychotika a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/antipsychotics-and-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyAnxiolyticsAndPregnancy (): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Anxiolytika a těhotenství');
    $page->setHandle('for-professionals-pregnancy-anxiolytics-and-pregnancy');
    $page->setSlug('anxiolytika-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-anxiolytics-and-pregnancy');
    $page->setPageTitle('Anxiolytika a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/anxiolytics-and-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyBipolarDisorderAndPregnancy (): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Bipolární porucha a těhotenství');
    $page->setHandle('for-professionals-pregnancy-bipolar-disorder-and-pregnancy');
    $page->setSlug('bipolarni-porucha-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-bipolar-disorder-and-pregnancy');
    $page->setPageTitle('Bipolární porucha a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/bipolar-disorder-and-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyDepressiveDisorderAndPregnancy (): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Depresivní porucha a těhotenství');
    $page->setHandle('for-professionals-pregnancy-depressive-disorder-and-pregnancy');
    $page->setSlug('depresivni-porucha-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-depressive-disorder-and-pregnancy');
    $page->setPageTitle('Depresivní porucha a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/depressive-disorder-and-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyGeneralPsychopharmacologyInPregnancy (): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Obecná psychofarmakologie v těhotenství');
    $page->setHandle('for-professionals-pregnancy-general-psychopharmacology-in-pregnancy');
    $page->setSlug('obecna-psychofarmakologie-v-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-general-psychopharmacology-in-pregnancy');
    $page->setPageTitle('Obecná psychofarmakologie v těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/general-psychopharmacology-in-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyPsychoticDisordersAndPregnancy (): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Psychotické poruchy a těhotenství');
    $page->setHandle('for-professionals-pregnancy-psychotic-disorders-and-pregnancy');
    $page->setSlug('psychoticke-poruchy-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-psychotic-disorders-and-pregnancy');
    $page->setPageTitle('Psychotické poruchy a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/psychotic-disorders-and-pregnancy.html.twig');

    return $page;
  }

  public function createForProfessionalsPregnancyMoodStabilizersAndPregnancy (): Page
  {
    $page = new Page();

    $page->setForProfessionalsPregnancy(true);
    $page->setAdminDescription('Stabilizátory nálady a těhotenství');
    $page->setHandle('for-professionals-pregnancy-mood-stabilizers-and-pregnancy');
    $page->setSlug('stabilizatory-nalady-a-tehotenstvi');
    $page->setSlugEn('for-professionals-pregnancy-mood-stabilizers-and-pregnancy');
    $page->setPageTitle('Stabilizátory nálady a těhotenství');
    $page->setTemplate('pages/for-professionals/pregnancy/mood-stabilizers-and-pregnancy.html.twig');

    return $page;
  }

  public function createForLovedOnes(): Page
  {
    $page = new Page();

//    $page->setForLovedOnes(true);
    $page->setAdminDescription('Pro blízké');
    $page->setHandle('for-loved-ones');
    $page->setSlug('pro-blizke');
    $page->setSlugEn('for-loved-ones');
    $page->setPageTitle('Pro blízké');
    $page->setTemplate('pages/for-loved-ones/default.html.twig');

    return $page;
  }

  public function createForLovedOnesWhatCanIDo(): Page
  {
    $page = new Page();

    $page->setForLovedOnes(true);
    $page->setAdminDescription('Co mohu dělat');
    $page->setHandle('for-loved-ones-what-can-i-do');
    $page->setSlug('co-mohu-delat');
    $page->setSlugEn('for-loved-ones-what-can-i-do');
    $page->setPageTitle('Co mohu dělat');
    $page->setTemplate('pages/for-loved-ones/what-can-i-do.html.twig');

    return $page;
  }

  public function createForLovedOnesWhereToContact(): Page
  {
    $page = new Page();

    $page->setForLovedOnes(true);
    $page->setAdminDescription('Kam se obrátit');
    $page->setHandle('for-loved-ones-where-to-contact');
    $page->setSlug('kam-se-obratit');
    $page->setSlugEn('for-loved-ones-where-to-contact');
    $page->setPageTitle('Kam se obrátit');
    $page->setTemplate('pages/for-loved-ones/where-to-contact.html.twig');

    return $page;
  }

  public function createForLovedOnesMentalHealthOfFathers(): Page
  {
    $page = new Page();

    $page->setForLovedOnes(true);
    $page->setAdminDescription('Duševní zdraví otců');
    $page->setHandle('for-loved-ones-mental-health-of-fathers');
    $page->setSlug('dusevni-zdravi-otcu');
    $page->setSlugEn('for-loved-ones-mental-health-of-fathers');
    $page->setPageTitle('Duševní zdraví otců');
    $page->setTemplate('pages/for-loved-ones/mental-health-of-fathers.html.twig');

    return $page;
  }

  public function createTestYourself(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Otestuj se');
    $page->setHandle('test-yourself');
    $page->setSlug('otestuj-se');
    $page->setSlugEn('test-yourself');
    $page->setPageTitle('Otestuj se');
    $page->setTemplate('pages/test-yourself.html.twig');

    return $page;
  }

  public function createGdpr(): Page
  {
    $page = new Page();

    $page->setAdminDescription('Ochrana osobních údajů');
    $page->setHandle('gdpr');
    $page->setSlug('ochrana-osobnich-udaju');
    $page->setSlugEn('gdpr');
    $page->setPageTitle('Ochrana osobních údajů');
    $page->setTemplate('pages/gdpr.html.twig');

    return $page;
  }

//  public function createBlogPage(): Page
//  {
//    $page = new Page();
//
//    $page->setAdminDescription('Blog');
//    $page->setHandle('blog');
//    $page->setSlug('aktuality');
//    $page->setSlugEn('news');
//    $page->setPageTitle('Blog');
//    $page->setPageTitleEn('Blog');
//    $page->setTemplate('pages/base.html.twig');
//
//    $page->addComponent(BlogHeader::prepareDefaultData());
//
//    return $page;
//  }

//  public function createBlogDetailPage(): Page
//  {
//    $page = new Page();
//
//    $page->setAdminDescription('Blog Detail');
//    $page->setHandle('blog-detail');
//    $page->setSlug('blog-detail');
//    $page->setSlugEn('blog-detail');
//    $page->setPageTitle('Blog Detail');
//    $page->setPageTitleEn('Blog Detail');
//    $page->setTemplate('pages/base.html.twig');
//
//    return $page;
//  }

  private function createTopMenu(): Menu
  {
    $menu = new Menu();
    $menu->setHandle('main-menu');
    $menu->setAdminDescription('Hlavni menu nahoře');

    return $menu;
  }

  private function createFooterMenu(): Menu
  {
    $menu = new Menu();
    $menu->setHandle('footer-menu');
    $menu->setAdminDescription('Footer menu');

    return $menu;
  }

  private function createMenuItem(?Page $page, string $nameCs, string $nameEn, MenuItem $parent = null, $href = ''): MenuItem
  {
    $menuItem = new MenuItem();
    $menuItem->setName($nameCs);
    $menuItem->setNameTranslated(array(
        'cs' => $nameCs, 'en' => $nameEn,
    ));

    if ($page) {
        $menuItem->setTargetPage($page);
    }

    if ($parent) {
        $menuItem->setParent($parent);
    }

    if ($href !== '') {
      $menuItem->setTargetHrefTranslated(array(
        'cs' => $href, 'en' => $href
      ));
    }

    return $menuItem;
  }
}

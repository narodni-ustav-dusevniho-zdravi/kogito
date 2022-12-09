<?php


namespace App\DataFixtures;

use App\Entity\Content\FrequentlyAskedQuestion;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class FaqFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
      $faq1 = $this->createFaq('Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
      $faq2 = $this->createFaq('Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');

      $manager->persist($faq1);
      $manager->persist($faq2);

      $manager->flush();
    }

    private function createFaq(string $question): FrequentlyAskedQuestion
    {
      $faq = new FrequentlyAskedQuestion();
      $faq->setQuestionCs($question);
      $faq->setQuestionEn($question);
      $faq->setAnswerCs('<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor porttitor accumsan. Pellentesque pretium lectus id turpis. Cras elementum. Aenean placerat. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Etiam posuere lacus quis dolor. Aenean placerat. Nullam faucibus mi quis velit. Duis condimentum augue id magna semper rutrum. Etiam posuere lacus quis dolor. Aenean vel massa quis mauris vehicula lacinia. Etiam quis quam. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Sed convallis magna eu sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam eget nisl. Praesent vitae arcu tempor neque lacinia pretium.</p>');
      $faq->setAnswerEn('<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer vulputate sem a nibh rutrum consequat. Mauris tincidunt sem sed arcu. Praesent in mauris eu tortor porttitor accumsan. Pellentesque pretium lectus id turpis. Cras elementum. Aenean placerat. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Etiam posuere lacus quis dolor. Aenean placerat. Nullam faucibus mi quis velit. Duis condimentum augue id magna semper rutrum. Etiam posuere lacus quis dolor. Aenean vel massa quis mauris vehicula lacinia. Etiam quis quam. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Sed convallis magna eu sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam eget nisl. Praesent vitae arcu tempor neque lacinia pretium.</p>');

      return $faq;
    }
}

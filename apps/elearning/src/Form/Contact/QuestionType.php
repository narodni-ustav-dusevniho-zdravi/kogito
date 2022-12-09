<?php


namespace App\Form\Contact;


use App\Entity\Contact\Question;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuestionType extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
      $builder
          ->add('fullName', TextType::class, array(
              'attr' => array(
                  'placeholder' => 'Jan Novák',
              ),
              'label_format' => '%name%',
              'label' => 'Jméno a příjmení',
          ))
          ->add('email', EmailType::class, [
              'attr' => array(
                  'placeholder' => 'jan.novak@email.cz',
              ),
              'label_format' => '%name%',
              'label' => 'E-mail',
          ])
          ->add('message', TextareaType::class, [
              'label_format' => '%name%',
              'label' => 'Vaše zpráva',
              'attr' => array(
                'placeholder' => 'Pokud se chcete zúčastnit našeho výzkumu nebo se dozvědět více, kontaktujte nás!',
                'cols' => 30,
                'rows' => 10,
              ),
          ])
          ->add('submit', SubmitType::class, [
            'label' => 'Odeslat zprávu',
            'label_format' => '%name%',
            'attr' => ['class' => 'button button--gradient button--bigger forms--submit']
          ])
      ;
  }

  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults([
      'data_class' => Question::class,
      'translation_domain' => 'question'
    ]);
  }
}

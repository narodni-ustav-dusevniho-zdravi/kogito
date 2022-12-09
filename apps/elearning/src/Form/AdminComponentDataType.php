<?php


namespace App\Form;


use App\Entity\Component;
use App\Service\ComponentManager;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AdminComponentDataType extends AbstractType
{
    /**
     * @var ComponentManager
     */
    private $componentManager;

    /**
     * AdminComponentDataType constructor.
     */
    public function __construct(ComponentManager $componentManager)
    {
        $this->componentManager = $componentManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /** @var Component $component */
        $component = $options['component'];
        $componentData = $this->componentManager->getComponentSettings($component);

        $componentData->prepareForm($builder);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Component::class,
            'component' => null
        ]);
    }
}

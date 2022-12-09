<?php


namespace App\Controller;


use App\Entity\ContactPhone;
use App\Form\ContactPhoneType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 *  @Route("/api")
 */
class ApiController extends AbstractController
{
  /**
   *  @Route("/contact", name="app_api_contact_phone")
   */
  public function contactPhoneAction(Request $request): Response
  {
    $contactPhone = new ContactPhone();
    $contactPhone->setIpAddress($request->getClientIp());

    $form = $this->createForm(ContactPhoneType::class, $contactPhone);

    $form->submit($request->request->all());

    if($form->isSubmitted() && $form->isValid()){

      $em = $this->getDoctrine()->getManager();

      $em->persist($contactPhone);
      $em->flush();

      return new JsonResponse(array('ok' => true));
    }

    return new JsonResponse(array('ok' => false, 'errors' =>$this->getErrorsFromForm($form)));
  }

  private function getErrorsFromForm(FormInterface $form)
  {
    $errors = array();
    foreach ($form->getErrors() as $error) {
      $errors[] = $error->getMessage();
    }
    foreach ($form->all() as $childForm) {
      if ($childForm instanceof FormInterface) {
        if ($childErrors = $this->getErrorsFromForm($childForm)) {
          $errors[$childForm->getName()] = $childErrors;
        }
      }
    }
    return $errors;
  }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin")
 */
class AdminUploadController extends AbstractController
{
    /**
     * @Route("/upload-file", name="admin_upload")
     */
    public function index(Request $request)
    {
        $response = new Response();

        try{
          /** @var UploadedFile $file */
          $file = $request->files->get('upload');

          if($file){
            $now = new \DateTime();

            $fileName = $this->generateRandomString() . '.' . $file->guessExtension();
            $directory =  "{$now->format('Y')}/{$now->format('m')}/{$now->format('d')}/";

            $file->move($this->getParameter('editor_file_upload_folder') . $directory, $fileName);

            $response->setContent(json_encode([
              'uploaded' => true,
              'url' => $this->getParameter('editor_file_upload_url') . $directory . $fileName
            ]));
            $response->setStatusCode(Response::HTTP_OK);
          }
        }catch (\Exception $exception) {
          $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
          $response->setContent(json_encode([
            'uploaded' => false,
            'error' => ['message' => $exception->getMessage()]
          ]));
        } finally {
          return $response;
        }
    }

    private function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }
}

<?php

namespace App\Repository;

use App\Entity\Component;
use App\Entity\GlobalSettings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method GlobalSettings|null find($id, $lockMode = null, $lockVersion = null)
 * @method GlobalSettings|null findOneBy(array $criteria, array $orderBy = null)
 * @method GlobalSettings[]    findAll()
 * @method GlobalSettings[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GlobalSettingsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GlobalSettings::class);
    }

    public function findNewest(): ?GlobalSettings
    {
      return $this->createQueryBuilder('g')
        ->orderBy('g.created','DESC')
        ->setMaxResults(1)
        ->getQuery()
        ->getOneOrNullResult();
    }
}

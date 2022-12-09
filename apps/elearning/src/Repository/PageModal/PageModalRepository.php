<?php

namespace App\Repository\PageModal;

use App\Entity\PageModal\PageModal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method PageModal|null find($id, $lockMode = null, $lockVersion = null)
 * @method PageModal|null findOneBy(array $criteria, array $orderBy = null)
 * @method PageModal[]    findAll()
 * @method PageModal[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PageModalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PageModal::class);
    }

    public function findActiveOnAllPages()
    {
        $now = new \DateTime();

        $query = $this->createQueryBuilder('m')
            ->where('m.displayOnAllPages = true')
            ->andWhere('m.enable = true')
            ->andWhere('m.start < :now')
            ->andWhere('m.end > :now')
            ->setParameter(':now', $now)
            ->orderBy('m.id', 'ASC');

        return $query->getQuery()->getResult();
    }
}

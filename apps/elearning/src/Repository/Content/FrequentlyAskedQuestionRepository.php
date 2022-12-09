<?php

namespace App\Repository\Content;

use App\Entity\Content\FrequentlyAskedQuestion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method FrequentlyAskedQuestion|null find($id, $lockMode = null, $lockVersion = null)
 * @method FrequentlyAskedQuestion|null findOneBy(array $criteria, array $orderBy = null)
 * @method FrequentlyAskedQuestion[]    findAll()
 * @method FrequentlyAskedQuestion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FrequentlyAskedQuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FrequentlyAskedQuestion::class);
    }

    // /**
    //  * @return FrequentlyAskedQuestion[] Returns an array of FrequentlyAskedQuestion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FrequentlyAskedQuestion
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

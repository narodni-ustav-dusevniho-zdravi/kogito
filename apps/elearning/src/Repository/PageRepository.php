<?php

namespace App\Repository;

use App\Entity\Page;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Page|null find($id, $lockMode = null, $lockVersion = null)
 * @method Page|null findOneBy(array $criteria, array $orderBy = null)
 * @method Page[]    findAll()
 * @method Page[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Page::class);
    }

    public function findByLocaleAndSlug(string $locale, string $slug): ?Page
    {
      $qb = $this->createQueryBuilder('p');

      if($locale === 'en'){
        $qb->andWhere('p.slugEn = :slug');
        $qb->orWhere('p.slug = :slug');
      }else{
        $qb->andWhere('p.slug = :slug');
      }

      $qb->setParameter('slug', $slug);

      $qb->setMaxResults(1);

      return $qb->getQuery()->getOneOrNullResult();
    }

    public function findByLocaleAndSlugAndCustomParam(string $locale, string $slug, string $paramName, bool $paramValue): ?Page
    {
      $qb = $this->createQueryBuilder('p');

      if($locale === 'en'){
        $qb->andWhere('p.slugEn = :slug');
        $qb->orWhere('p.slug = :slug');
      }else{
        $qb->andWhere('p.slug = :slug');
      }

      $qb->andWhere("p.{$paramName} = :paramValue");

      $qb->setParameter('paramValue', $paramValue);

      $qb->setParameter('slug', $slug);

      $qb->setMaxResults(1);

      return $qb->getQuery()->getOneOrNullResult();
    }
}

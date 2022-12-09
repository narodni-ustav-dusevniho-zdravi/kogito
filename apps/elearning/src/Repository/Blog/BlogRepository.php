<?php

namespace App\Repository\Blog;

use App\Entity\Blog\BlogArticle;
use App\Helper\Paginator;
use App\Model\Blog\BlogSearch;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method BlogArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method BlogArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method BlogArticle[]    findAll()
 * @method BlogArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BlogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BlogArticle::class);
    }

    public function findBySearch(BlogSearch $blogSearch) : Paginator
    {
        $queryBuilder = $this->createQueryBuilder('b');

        if($blogSearch->getCategory())
        {
            $queryBuilder->andWhere('b.category = :category');
            $queryBuilder->setParameter('category', $blogSearch->getCategory());
        }

        $queryBuilder->andWhere('b.enable = true');
        $queryBuilder->orderBy('b.published', 'DESC');

        $queryBuilder->setFirstResult($blogSearch->getOffset());
        $queryBuilder->setMaxResults($blogSearch::DEFAULT_LIMIT);

        $blogArticles = $queryBuilder->getQuery()->getResult();

        if(empty($blogArticles)) {
            $queryBuilder->setFirstResult($blogSearch::DEFAULT_OFFSET);
            $blogArticles = $queryBuilder->getQuery()->getResult();
        }

        $totalBlogArticles  = $queryBuilder->select('count(b)')
            ->setMaxResults(null)
            ->setFirstResult(null)
            ->getQuery()->getSingleScalarResult();

        if ($totalBlogArticles <= $blogSearch::DEFAULT_LIMIT) {
            $queryBuilder->setFirstResult($blogSearch::DEFAULT_OFFSET);
        }

        return new Paginator($blogArticles, $totalBlogArticles, $blogSearch->getLimit(), $blogSearch->getOffset());
    }

    public function findNext(BlogArticle $blogArticle)
    {
        $nextArticle = $this->createQueryBuilder('b')
            ->where('b.published > :published')
            ->andWhere('b.enable = true')
            ->setParameter('published', $blogArticle->getPublished())
            ->orderBy('b.published', 'ASC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if ($nextArticle === null) {
            $nextArticle = $this->createQueryBuilder('b')
                ->where('b.enable = true')
                ->orderBy('b.published', 'ASC')
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();
        }

        return $nextArticle;
    }

    public function findPrev(BlogArticle $blogArticle)
    {
        $prevArticle = $this->createQueryBuilder('b')
            ->where('b.published < :published')
            ->andWhere('b.enable = true')
            ->setParameter('published', $blogArticle->getPublished())
            ->orderBy('b.published', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if ($prevArticle === null) {
            $prevArticle = $this->createQueryBuilder('b')
                ->where('b.enable = true')
                ->orderBy('b.published', 'DESC')
                ->setMaxResults(1)
                ->getQuery()
                ->getOneOrNullResult();
        }

        return $prevArticle;
    }

    public function findForBlogHeaderSection()
    {
        return $this->createQueryBuilder('b')
            ->where('b.displayOnBlogPage = :displayOnBlogPage')
            ->setParameter('displayOnBlogPage', true)
            ->andWhere('b.enable = :enable')
            ->setParameter('enable', true)
            ->orderBy('b.published', 'DESC')
            ->setMaxResults(2)
            ->getQuery()
            ->getResult();
    }

    public function findForHomepageSection()
    {
      return $this->createQueryBuilder('b')
        ->where('b.displayOnHomepage = :displayOnHomepage')
        ->setParameter('displayOnHomepage', true)
        ->andWhere('b.enable = :enable')
        ->setParameter('enable', true)
        ->orderBy('b.published', 'DESC')
        ->setMaxResults(2)
        ->getQuery()
        ->getResult();
    }
}

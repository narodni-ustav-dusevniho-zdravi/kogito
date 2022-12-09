<?php

namespace App\Model\Blog;

use App\Entity\Blog\BlogCategory;
use App\Model\DefaultSearch;

class BlogSearch extends DefaultSearch
{
  public const SORT_BY_PUBLISH = 3;

  /** @var null|BlogCategory */
  private $blogCategory;

  /**
   * @return null|BlogCategory
   */
  public function getCategory(): ?BlogCategory
  {
    return $this->blogCategory;
  }

  /**
   * @param null|BlogCategory $blogCategory
   */
  public function setCategory(BlogCategory $blogCategory): void
  {
    $this->blogCategory = $blogCategory;
  }

}
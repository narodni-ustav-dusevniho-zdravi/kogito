<?php


namespace App\Model;


class DefaultSearch
{
    public const SORT_BY_OLDEST = 1;
    public const SORT_BY_NEWEST = 2;

    public const DEFAULT_OFFSET = 0;
    public const DEFAULT_LIMIT = 6;

    protected $orderBy = self::SORT_BY_OLDEST;
    protected $limit = self::DEFAULT_OFFSET;
    protected $offset = self::DEFAULT_LIMIT;

    /**
     * @return mixed
     */
    public function getLimit()
    {
        return $this->limit?: self::DEFAULT_LIMIT;
    }

    /**
     * @param mixed $limit
     */
    public function setLimit($limit): void
    {
        $this->limit = $limit;
    }

    /**
     * @return mixed
     */
    public function getOffset()
    {
        return $this->offset?: self::DEFAULT_OFFSET;
    }

    /**
     * @param mixed $offset
     */
    public function setOffset($offset): void
    {
        $this->offset = $offset;
    }

    /**
     * @return mixed
     */
    public function getOrderBy()
    {
        return $this->orderBy;
    }

    /**
     * @param mixed $orderBy
     */
    public function setOrderBy($orderBy): void
    {
        $this->orderBy = $orderBy;
    }
}

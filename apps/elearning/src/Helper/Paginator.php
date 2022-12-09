<?php


namespace App\Helper;


class Paginator
{
    private $objects;
    private $totalResults;
    private $offset;
    private $maxResults;

    /**
     * Paginator constructor.
     * @param $objects
     * @param $totalResults
     */
    public function __construct(array $objects, int $totalResults, int $maxResults, int $offset)
    {
        $this->objects = $objects;
        $this->totalResults = $totalResults;
        $this->maxResults = $maxResults;
        $this->offset = $offset;
    }

    /**
     * @return array
     */
    public function getObjects(): array
    {
        return $this->objects;
    }

    public function displayBeforeButton() : bool
    {
        return $this->getCurrentPage() > 1;
    }

    public function displayNextButton() : bool
    {
        return $this->getCurrentPage() < $this->getTotalPages();
    }

    /**
     * @return int
     */
    public function getTotalResults(): int
    {
        return $this->totalResults;
    }

    public function getTotalPages() : int
    {
        if($this->totalResults === 0){
            return 1;
        }

        return ceil($this->totalResults/$this->maxResults);
    }

    public function getCurrentPage() : int
    {
        return $this->getTotalPages() * ($this->offset/($this->maxResults * $this->getTotalPages())) + 1;
    }

    public function getOffsetForPage(int $page) : int
    {
        return ($this->maxResults * $this->getTotalPages()) * ($page / $this->getTotalPages()) - $this->maxResults;
    }

    public function getPagesToDisplay() : array
    {
        $pageBefore = $this->getCurrentPage() !== 1? $this->getCurrentPage() - 1 : 1;
        $pageNext = $this->getCurrentPage() > $this->getTotalPages()? $this->getTotalPages() : $this->getCurrentPage() + 1;

        $pager = array(
            1
        );

        if($this->getTotalPages() < 10){
            for($i = 2; $i <= $this->getTotalPages(); $i++){
                $pager[] = $i;
            }
        }else{
            if($pageBefore > 2){
                $pager[] = '-';
            }

            if(!in_array($pageBefore, $pager, true)){
                $pager[] = $pageBefore;
            }

            if(!in_array($this->getCurrentPage(), $pager, true)){
                $pager[] = $this->getCurrentPage();
            }

            if(!in_array($pageNext, $pager, true)){
                $pager[] = $pageNext;
            }

            if($pageNext + 1 !== $this->getTotalPages()){
                $pager[] = '-';
            }

            if(!in_array($this->getTotalPages(), $pager, true))
            {
                $pager[] = $this->getTotalPages();
            }
        }

        return $pager;
    }

    public function prepareRouteParameters(array $currentParams, string $formName, int $pageNumber) : array
    {
        $currentParams[$formName]['offset'] = $this->getOffsetForPage($pageNumber);

        unset($currentParams[$formName]['submit']);

        return $currentParams;
    }
}

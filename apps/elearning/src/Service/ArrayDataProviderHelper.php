<?php


namespace App\Service;


class ArrayDataProviderHelper extends \ArrayIterator
{
  /** @var string */
  private $selectedLanguage;

  /**
   * ArrayDataProviderHelper constructor.
   */
  public function __construct($array = array(), $flags = 0, string $selectedLanguage)
  {
    parent::__construct($array, $flags);

    $this->selectedLanguage = $selectedLanguage;
  }

  public function current()
  {
    $current = parent::current();

    if(is_array($current)){
      return new DataProviderHelper(parent::current(), $this->selectedLanguage);
    }

    return $current;
  }

  public function offsetGet($index)
  {
    $offset = parent::offsetGet($index);

    if(is_array($offset)){
      return new DataProviderHelper(parent::offsetGet($index), $this->selectedLanguage);
    }

    return $offset;
  }
}
<?php


namespace App\Service;


use Exception;
use IteratorAggregate;
use Traversable;

class DataProviderHelper implements IteratorAggregate
{
  /** @var array */
  private $data;
  /** @var string */
  private $selectedLanguage;

  /**
   * DataProviderHelper constructor.
   */
  public function __construct(array $data, string $selectedLanguage)
  {
    $this->data = $data;
    $this->selectedLanguage = $selectedLanguage;
  }

  public static function create(array $data): array
  {
    $data['_type'] = 'translated';

    return $data;
  }

  public function __get($name)
  {
    if(isset($this->data[$name]['_type']) && $this->data[$name]['_type'] === 'translated'){
      if(isset($this->data[$name][$this->selectedLanguage])){
        return $this->data[$name][$this->selectedLanguage];
      }

      $keys = array_keys($this->data[$name]);
      if(count($keys) > 0){
        return $this->data[$name][$keys[0]];
      }

      return '';
    }

    if (is_array($this->data[$name])){
      return new DataProviderHelper($this->data[$name], $this->selectedLanguage);
    }

    return $this->data[$name];
  }

  public function __set($name, $value)
  {
    throw new \Exception('Data provider cant update fields');
  }

  public function __isset($name)
  {
    return isset($this->data[$name]);
  }

  /**
   * @inheritDoc
   */
  public function getIterator()
  {
    return new ArrayDataProviderHelper($this->data, 0, $this->selectedLanguage);
  }
}
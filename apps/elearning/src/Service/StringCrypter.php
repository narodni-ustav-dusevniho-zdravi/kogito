<?php


namespace App\Service;


class StringCrypter
{
    /**
     * @var string
     */
    protected $key;

    /**
     * StringCrypter constructor.
     * @param string $key
     */
    public function __construct(string $key)
    {
        $this->key = $key;
    }

    public function encrypt(string $data) : string
    {
        return openssl_encrypt($data, 'AES-128-ECB', $this->key);
    }

    public function decrypt(string $data): string
    {
        return openssl_decrypt($data, 'AES-128-ECB', $this->key);
    }
}

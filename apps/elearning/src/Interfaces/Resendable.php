<?php

namespace App\Interfaces;

interface Resendable
{
  public function getTemplate(): string;
  public function getSubject(): string;
}
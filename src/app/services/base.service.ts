import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
export abstract class BaseService {

  protected apiDomain: string = "https://localhost:4000/api/";

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'auth-token',
      'X-Requested-With': 'XMLHttpRequest'
    })
  };

  constructor() {}
}

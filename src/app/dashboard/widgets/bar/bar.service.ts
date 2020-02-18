import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  constructor() {
    console.log('BarService');
  }
}

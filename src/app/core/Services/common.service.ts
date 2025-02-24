import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getSameValueOf(list: any[], criteria: string, value: any): any[] {
    return list.filter(item => item[criteria] === value);
  }
}

import { Injectable } from '@angular/core';
import { Residence } from '../models/residence';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residenceUrl = 'http://localhost:3000/residences'; // URL de l'API

  constructor(private http: HttpClient) { }

  getResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.residenceUrl);
  }

  addResidence(residence: Residence): Observable<Residence> {
    return this.http.post<Residence>(this.residenceUrl, residence);
  }

  updateResidence(id: number, residence: Residence): Observable<Residence> {
    return this.http.put<Residence>(`${this.residenceUrl}/${id}`, residence);
  }

  deleteResidence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.residenceUrl}/${id}`);
  }

  deleteApartmentsByResidenceId(residenceId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/apartments?residenceId=${residenceId}`);
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/Services/residence.service';
import { CommonService } from 'src/app/core/Services/common.service';
@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})


export class ResidencesComponent implements OnInit {

  filteredResidences: any[] = [];


  listResidencesFavorite: Residence[]=[];
  listResidencesFiltered: Residence[]=[];
  listResidences: Residence[] = [];

  constructor(private router: Router, private residenceService : ResidenceService,private commonService: CommonService) { 
  } 

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe( (data) => {
      console.log('Données reçues :', data); // Vérifiez les données ici
      this.listResidences = data;
      this.listResidencesFiltered = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des données :', error);
    }
  );
    this.listResidencesFiltered = this.listResidences;
    this.filteredResidences = this.commonService.getSameValueOf(this.listResidences, 'adresse', 'Tunis');
    console.log('Résidences à Tunis:', this.filteredResidences);

    this.loadResidences();
  }



/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Affiche ou cache l'adresse d'une résidence
   * @param id Identifiant de la résidence
   */
/******  5ebcf240-6c4f-4cb3-b9c0-ce158065704b  *******/
   ShowLocation(id: number){
      this.listResidences[id-1].locationShown = !this.listResidences[id-1].locationShown;
      console.log(this.listResidences[id-1].locationShown);
      if (this.listResidences[id-1].address=="inconnu"){
        alert("Adresse inconnue");
      } 
   }

   LikeRes(id: number){
    console.log(this.listResidencesFavorite);
    this.listResidencesFavorite.push(this.listResidences[id-1]);
   }

   filterResults(text: string) {
    if (!text) {
      this.listResidencesFiltered = this.listResidences;
      return;
    }
  
    this.listResidencesFiltered = this.listResidences.filter(
      Residence => Residence?.address.toLowerCase().includes(text.toLowerCase())
    );
  }

  OnSelect(res : Residence){
    this.router.navigate(['/residences', res.id]);
  }

  ListApartments(res : Residence){
    this.router.navigate(['/apartments', res.id]);
  }

  deleteResidence(id: number): void {
    this.residenceService.deleteResidence(id).subscribe(() => {
      this.residenceService.deleteApartmentsByResidenceId(id).subscribe(() => {
        this.listResidences = this.listResidences.filter(residence => residence.id !== id);
      });
    });
  }


  loadResidences(): void {
    this.residenceService.getResidences().subscribe(
      (data) => {
        console.log('Données reçues :', data); // Vérifiez les données ici
        this.listResidences = data;
        this.listResidencesFiltered = data; // Initialiser la liste filtrée
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }


}

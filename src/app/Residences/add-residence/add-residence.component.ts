import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResidenceService } from 'src/app/core/Services/residence.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;
  residenceService: any;
  router: any;

  constructor(private fb: FormBuilder) {
    this.residenceForm = this.fb.group({});

  }

 ngOnInit(): void {
    this.residenceForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
      status: ['Disponible', Validators.required],
      apartments: this.fb.array([]) // Tableau dynamique d'appartements
    });

    // Ajouter un appartement par défaut
    this.addApartment();
  }

  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  createApartment(): FormGroup {
    return this.fb.group({
      apartmentNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      floorNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      surface: ['', Validators.required],
      terrace: [false],
      surfaceTerrace: ['']
    });
  }

  addApartment(): void {
    this.apartments.push(this.createApartment());
  }

  removeApartment(index: number): void {
    this.apartments.removeAt(index);
  }

  onSubmit(): void {
    if (this.residenceForm.valid) {
      this.residenceService.addResidence(this.residenceForm.value).subscribe({
        next: (response: any) => { // Déclarer 'response' comme 'any'
          console.log('Résidence ajoutée avec succès !', response);
          this.router.navigate(['/residences']);
        },
        error: (error: any) => { // Déclarer 'error' comme 'any'
          console.error('Erreur lors de l\'ajout de la résidence :', error);
        }
      });
    }
  }
  
  
  
  
}
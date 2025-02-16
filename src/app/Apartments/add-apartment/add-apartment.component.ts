import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.apartForm = this.fb.group({
      apartmentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      surface: ['', Validators.required],
      terrace: ['no'],
      surfaceTerrace: [{ value: '', disabled: true }, Validators.required],
      category: ['', Validators.required],
      residence: ['', Validators.required]
    });
  }

  // Gérer l'activation du champ Surface Terrace
  onTerraceChange(value: string) {
    if (value === 'yes') {
      this.apartForm.get('surfaceTerrace')?.enable();
    } else {
      this.apartForm.get('surfaceTerrace')?.disable();
      this.apartForm.get('surfaceTerrace')?.reset();
    }
  }

  onSubmit() {
    if (this.apartForm.valid) {
      console.log('Formulaire soumis avec succès !', this.apartForm.value);
    }
  }
}

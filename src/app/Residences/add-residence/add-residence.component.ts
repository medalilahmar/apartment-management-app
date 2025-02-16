import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.residenceForm = this.fb.group({});

  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Initializes the residence form with its default values
   * and the required validators.
   */
/******  cb3cf982-d2b7-491b-9c08-02c4867535c4  *******/  ngOnInit(): void {
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
      const newResidence = this.residenceForm.value;
      console.log(newResidence);
    }
  }
}
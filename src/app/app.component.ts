import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PairNumbersComponent } from './components/pair-numbers/pair-numbers.component';
import { PairNumbersService } from './services/pair-numbers.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PairNumbersComponent, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private pairService = inject(PairNumbersService);
  private fb = inject(FormBuilder);
  // FormGroup for handling the form input
  fg: FormGroup = this.fb.group({
    description: ['', Validators.required],  // Description field (not used directly in this code)
    pairsNum: [null, Validators.required]  // Field for the number of pairs
  });

  // Modal instance for Bootstrap modal
  modalInstance!: Modal;
  @ViewChild('myModal') modal!: ElementRef;

  maxX = signal<number>(100);
  maxY = signal<number>(100);
  modalText = signal('');
  savedPairs = computed(() => this.pairService.pairs());

  // Initializing the modal instance after the view is initialized
  ngAfterViewInit() {
    this.modalInstance = new Modal(this.modal.nativeElement);
  }

  // Function to save data (pairs) from the form
  saveData() {
    this.modalText.set("");
    // Check if the form is valid and modal exists
    if (this.fg.valid && this.modalInstance) {
      // Include description when saving the pair
      if (this.pairService.savePair({
        x: this.fg.value.pairsNum.x,
        y: this.fg.value.pairsNum.y,
        description: this.fg.value.description
      })) {
        this.modalText.set("Pair saved successfully!");
        this.fg.reset();
      } else {
        this.modalText.set("Pair already exists!");
      }
      this.modalInstance.show();
    }
  }
}

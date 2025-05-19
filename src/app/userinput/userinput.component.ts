import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-userinput',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './userinput.component.html',
  styleUrl: './userinput.component.css'
})



export class UserinputComponent {
  @Input({required:true}) calculationResult!: {isNisabMet: string}

}

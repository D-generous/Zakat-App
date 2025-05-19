import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface QuickLinks{
  label:string,
  path:string
}

@Component({
  selector: 'app-footer',
  imports: [ CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear =''
  quickLinks: QuickLinks[]=[
    {
      label: "FAQ",
      path: 'https://www.google.com/'
    },
    {
      label: "About",
      path: 'www.google.com'
    },
    {
      label: "Zakat Calculator",
      path: 'www.google.com'
    },
    {
      label: "Privacy Policy",
      path: 'www.google.com'
    }
    
  ]
}

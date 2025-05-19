import { Component} from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { UserinputComponent } from '../userinput/userinput.component';
import {FormsModule} from '@angular/forms'
import { CommonModule, DecimalPipe } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";



interface ZakatCard{
  icon: string,
      title: string,
      description: string

}
interface ImpactCard{
  icon: string,
      title: string,
      description: string,
      importance: string

}

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentYear: number = new Date().getFullYear();
 
  
  assets = {
    gold: 0,
    silver: 0,
    cash: 0,
    bankDeposits: 0,
    investments: 0,
    businessMerchandise: 0,
    debtsOwed: 0
  };
  
  deductions = {
    debtsYouOwe: 0,
    businessExpenses: 0
  };
  
  totalAssets: number = 0;
  totalDeductions: number = 0;
  netZakatableAmount: number = 0;
  zakatPayable: number = 0;
  showResults: boolean = false;
  belowNisab: boolean = false;
  
  // Current Nisab value in Naira (approx. value of 85g of gold)
  nisabThreshold: number = 3000000; // Update this value regularly
  
  ngOnInit() {
    // Initialize component
  }
  
  calculateZakat() {
    // Calculate total assets
    this.totalAssets = 
      this.assets.gold + 
      this.assets.silver + 
      this.assets.cash + 
      this.assets.bankDeposits + 
      this.assets.investments + 
      this.assets.businessMerchandise + 
      this.assets.debtsOwed;
    
    // Calculate total deductions
    this.totalDeductions = 
      this.deductions.debtsYouOwe + 
      this.deductions.businessExpenses;
    
    // Calculate net zakatable amount
    this.netZakatableAmount = this.totalAssets - this.totalDeductions;
    
    // Check if wealth is below Nisab
    this.belowNisab = this.netZakatableAmount < this.nisabThreshold;
    
    // Calculate Zakat (2.5% of net zakatable amount)
    this.zakatPayable = this.netZakatableAmount * 0.025;
    
    // Show results section
    this.showResults = true;
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.querySelector('.results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  printCalculation() {
    window.print();
  }


  zakatCards: ZakatCard[] = [
    {
      icon: "fas fa-book",
      title: "What is Zakat?",
      description: "Zakat is one of the Five Pillars of Islam. It is an obligatory act of charity, requiring eligible Muslims to donate a portion (typically 2.5%) of their wealth to those in need."
    },
    {
      icon: "fas fa-question-circle",
      title: "Why is it Important?",
      description: "Zakat purifies one's wealth, fosters compassion, reduces inequality, and strengthens the community bond, fulfilling a divine command."
    },
    {
      icon: "fas fa-users",
      title: "Who Receives Zakat?",
      description: "Funds are distributed among eight categories specified in the Quran, including the poor, the needy, Zakat administrators, new converts, freeing captives, those in debt, for Allah's cause, and travelers."
    },
    {
      icon: "fa-solid fa-handshake",
      title: "Your Impact",
      description: "By giving Zakat through Zakat Bloom, you directly contribute to uplifting lives and fulfilling this essential pillar, ensuring your contribution reaches those genuinely eligible."
    }
  ]

  impactCards: ImpactCard[]=[
    {
      icon:"fa-solid fa-utensils",
      title: "600",
      description:"Meals Served",
      importance:"Providing nutritious meals to families facing hunger."
    },
    {
      icon:"fa-solid fa-house",
      title: "350",
      description:"Families Housed",
      importance:"Offering safe shelter and support to displaced families."
    },
    {
      icon:"fa-solid fa-book-open",
      title: "1,200",
      description:"Students Supported",
      importance:"Funding education and resources for underprivileged children."
    },
    {
      icon:"fa-solid fa-hand-holding-heart",
      title: "25,000",
      description:"Lives Touched",
      importance:"Overall reach of our combined Zakat initiatives."
    },
  ]
}

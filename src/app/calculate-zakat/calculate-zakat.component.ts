import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faClock, faLandmark, faCoins, faChartLine, faFileInvoiceDollar, faBuildingColumns,
  faHouseChimneyWindow, faCreditCard, faCalculator, faSpinner, faShieldHalved, faCircleInfo
} from '@fortawesome/free-solid-svg-icons';

// Interfaces (keep these as they are)
interface FormFieldConfig {
  name: string;
  label: string;
  placeholder: string;
  icon: IconDefinition;
  tooltip?: string;
}

interface InputSectionConfig {
  title: string;
  icon: IconDefinition;
  fields: FormFieldConfig[];
}

interface ZakatResults {
  nisabThreshold: number;
  totalZakatableAssets: number;
  totalDeductibles: number;
  netZakatableWealth: number;
  isZakatDue: boolean;
  zakatAmount?: number;
}
@Component({
  selector: 'app-calculate-zakat',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    // CurrencyPipe
  ],
  templateUrl: './calculate-zakat.component.html',
  styleUrl: './calculate-zakat.component.css'
})
export class CalculateZakatComponent {
  faClock = faClock;
  faCalculator = faCalculator;
  faSpinner = faSpinner;
  faShieldHalved = faShieldHalved;
  faCircleInfo = faCircleInfo;
  // ... (other icons used in inputSections will be referenced via section.icon or field.icon)

  zakatForm: FormGroup; // Using Reactive Forms
  isLoading = false;

  inputSections: InputSectionConfig[] = [
    {
      title: 'Personal Wealth',
      icon: faBuildingColumns,
      fields: [
        { name: 'cash', label: 'Cash & Bank Balances', placeholder: 'e.g., 10000', icon: faLandmark, tooltip: 'All cash, checking, and savings accounts.' },
        { name: 'gold', label: 'Value of Gold', placeholder: 'e.g., 5000', icon: faCoins, tooltip: 'Current market value of gold you own.' },
        { name: 'silver', label: 'Value of Silver', placeholder: 'e.g., 1000', icon: faCoins, tooltip: 'Current market value of silver you own.' },
        { name: 'shares', label: 'Shares & Investments', placeholder: 'e.g., 15000', icon: faChartLine, tooltip: 'Market value of stocks, mutual funds, etc.' },
        { name: 'otherAssets', label: 'Other Liquid Assets', placeholder: 'e.g., 2000', icon: faFileInvoiceDollar, tooltip: 'Any other assets easily convertible to cash.' },
      ]
    },
    {
      title: 'Business & Income',
      icon: faLandmark,
      fields: [
        { name: 'businessAssets', label: 'Net Business Assets', placeholder: 'e.g., 25000', icon: faBuildingColumns, tooltip: 'Zakat-eligible assets in your business.' },
        { name: 'rentalIncome', label: 'Net Rental Income (Annual)', placeholder: 'e.g., 6000', icon: faHouseChimneyWindow, tooltip: 'Annual rental income after expenses.' },
      ]
    },
    {
      title: 'Debts & Liabilities',
      icon: faCreditCard,
      fields: [
        { name: 'personalDebts', label: 'Deductible Personal Debts', placeholder: 'e.g., 3000', icon: faCreditCard, tooltip: 'Debts that are due within the next year.' },
      ]
    }
  ];

  zakatResults: ZakatResults | null = null;
  // For testing design of results:
  // zakatResults: ZakatResults | null = {
  //   nisabThreshold: 5000,
  //   totalZakatableAssets: 30000,
  //   totalDeductibles: 3000,
  //   netZakatableWealth: 27000,
  //   isZakatDue: true,
  //   zakatAmount: 675
  // };

  constructor(private fb: FormBuilder) {
    const formControls: { [key: string]: any } = {};
    this.inputSections.forEach(section => {
      section.fields.forEach(field => {
        // Only allow numbers, optionally with a single decimal point
        formControls[field.name] = [null, [Validators.pattern(/^\d*\.?\d*$/)]];
      });
    });
    this.zakatForm = this.fb.group(formControls);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.zakatForm.invalid) {
      this.zakatForm.markAllAsTouched(); // Show validation errors
      console.log('Form is invalid');
      // Clear previous results if form is now invalid
      this.zakatResults = null;
      return;
    }

    this.isLoading = true;
    console.log('Form Submitted', this.zakatForm.value);

    // --- Actual Zakat Calculation Logic Would Go Here ---
    // For demonstration, let's create some dummy data from form values
    const values = this.zakatForm.value;
    let totalAssets = 0;
    let totalDebts = 0;

    Object.keys(values).forEach(key => {
      const val = parseFloat(values[key]) || 0;
      if (key === 'personalDebts') {
        totalDebts += val;
      } else {
        totalAssets += val;
      }
    });

    const nisab = 5000; // Illustrative Nisab value
    const netWealth = totalAssets - totalDebts;
    const isDue = netWealth >= nisab;
    const zakatAmount = isDue ? netWealth * 0.025 : 0;
    // --- End Zakat Calculation Logic ---


    // Simulate API call or complex calculation
    setTimeout(() => {
      this.zakatResults = {
        nisabThreshold: nisab,
        totalZakatableAssets: totalAssets,
        totalDeductibles: totalDebts,
        netZakatableWealth: netWealth,
        isZakatDue: isDue,
        zakatAmount: zakatAmount > 0 ? zakatAmount : undefined
      };
      this.isLoading = false;
    }, 1500);
  }

  // Using Angular's CurrencyPipe if available, otherwise custom
  formatCurrency(value: number | undefined, currencyCode: string = 'USD', display: string = 'symbol', digitsInfo: string = '1.2-2'): string | null {
    if (value === undefined) return 'N/A';
    // This requires CurrencyPipe to be in `imports` array of the component
    // For direct use in template: {{ value | currency:'USD':'symbol':'1.2-2' }}
    // If using this helper:
    // return new CurrencyPipe('en-US').transform(value, currencyCode, display, digitsInfo);

    // Or the previous simple custom formatter:
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.zakatForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}

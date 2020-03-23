import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-charts';
  chartData: Array<any>;
  marketData: Array<any>;
  stateData: Array<any>;

  stateOrders = [
    { state: 'Alabama', value: 0 },
    { state: 'Alaska', value: 0 },
    { state: 'Arkansas', value: 0 },
    { state: 'Arizona', value: 0 },
    { state: 'California', value: 0 },
    { state: 'Colorado', value: 0 },
    { state: 'Connecticut', value: 0 },
    { state: 'Delaware', value: 0 },
    { state: 'Florida', value: 0 },
    { state: 'Georgia', value: 0 },
    { state: 'Hawaii', value: 0 },
    { state: 'Iowa', value: 0 },
    { state: 'Idaho', value: 0 },
    { state: 'Illinois', value: 0 },
    { state: 'Indiana', value: 0 },
    { state: 'Kansas', value: 0 },
    { state: 'Kentucky', value: 0 },
    { state: 'Louisiana', value: 0 },
    { state: 'Maine', value: 0 },
    { state: 'Maryland', value: 0 },
    { state: 'Massachusetts', value: 0 },
    { state: 'Michigan', value: 0 },
    { state: 'Minnesota', value: 0 },
    { state: 'Missouri', value: 0 },
    { state: 'Mississippi', value: 0 },
    { state: 'Montana', value: 0 },
    { state: 'North Carolina', value: 0 },
    { state: 'North Dakota', value: 0 },
    { state: 'Nebraska', value: 0 },
    { state: 'New Hampshire', value: 0 },
    { state: 'New Jersey', value: 0 },
    { state: 'New Mexico', value: 0 },
    { state: 'Nebraska', value: 0 },
    { state: 'Nevada', value: 0 },
    { state: 'New York', value: 0 },
    { state: 'Ohio', value: 0 },
    { state: 'Oklahoma', value: 0 },
    { state: 'Oregon', value: 0 },
    { state: 'Pennsylvania', value: 0 },
    { state: 'Rhode Island', value: 0 },
    { state: 'South Carolina', value: 0 },
    { state: 'South Dakota', value: 0 },
    { state: 'Tennessee', value: 0 },
    { state: 'Texas', value: 0 },
    { state: 'Utah', value: 0 },
    { state: 'Virginia', value: 0 },
    { state: 'Vermont', value: 0 },
    { state: 'Washington', value: 0 },
    { state: 'Wisconsin', value: 0 },
    { state: 'West Virginia', value: 0 },
    { state: 'Wyoming', value: 0 },
    { state: 'Puerto Rico', value: 0 }
  ];

  constructor() {}

  ngOnInit() {
    this.generateData();

    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 5000);
    }, 1000);
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < 30; i++) {
      this.chartData.push([
        `${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }

    this.marketData = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      this.marketData.push({
          date: d.setDate(d.getDate() + i),
          value: Math.floor(Math.random() * 1000)
        }
      );
    }

    this.stateData = [];
    for (let i = 0; i < this.stateOrders.length; i++) {
      this.stateData.push({
          state: this.stateOrders[i].state,
          visited: Math.floor(Math.random() * 255)
        }
      );
    }
  }

}

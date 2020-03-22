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
          open: Math.floor(Math.random() * 100),
          close: Math.floor(Math.random() * 100)
        }
      );
    }

    console.table(this.marketData);
  }

}

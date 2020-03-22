import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private element: any;
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    } else {
      this.createChart();
    }
  }

  createChart() {
    this.element = this.chartContainer?.nativeElement;

    if(this.element) {
      this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
      this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
      const svg = d3.select(this.element).append('svg')
        .attr('width', this.element.offsetWidth)
        .attr('height', this.element.offsetHeight);

      // chart plot area
      this.chart = svg.append('g')
        .attr('class', 'bars')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      // bar colors
      // this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]> ['red', 'blue']);

      // define X & Y domains
      const xDomain = this.data.map(d => d[0]);

      const yDomain = [0, d3.max(this.data, d => d[1])];

      // create scales
      this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
      this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

      // x & y axis
      this.xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
        .call(d3.axisBottom(this.xScale));

      this.yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisLeft(this.yScale));
    }
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    //this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', 'red');

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', 'red')
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }
}

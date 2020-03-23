import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Observable} from 'rxjs';
import {formatCurrency} from '@angular/common';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges,  AfterViewInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() data: Array<any>;
  private element: any;

  svgWidth = 600;
  svgHeight = 400;
  margin = { top: 50, right: 20, bottom: 30, left: 50 };
  width = this.svgWidth - this.margin.left - this.margin.right;
  height = this.svgHeight - this.margin.top - this.margin.bottom;

  totalSales: number;
  private svg: any;

  private x: any;
  private y: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.updateChart();
  }

  ngAfterViewInit(): void {
    // this.data = this.parseData(this.maindata);
    this.totalSales = this.data.reduce((acc, val) => {
      return acc + val.value;
    }, 0);
    console.log(this.totalSales);

    this.createChart();

  }

  private make_y_gridlines() {
    return d3.axisLeft(this.y)
      .ticks(9);
  }

  private make_x_gridlines() {
    return d3.axisBottom(this.x)
      .ticks(5);
  }

  private createChart() {

    this.element = this.chartContainer?.nativeElement;

    this.svg = d3.select(this.element).append('svg')
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight);

    const g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'   );

    const xDomain = this.data.map(d => d.date);

    const yDomain = [0, d3.max(this.data, d => d.value)];

    // Scaling Time
    this.x = d3.scaleTime().rangeRound([0, this.width]);

    // Scaling Values
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    this.x.domain(d3.extent(this.data, d => d.date ));
    this.y.domain(d3.extent(this.data, d => d.value ));

    d3.axisBottom(this.x).ticks(5);

    const text = g.append('text');
    let textLabels = text
      .attr('x',  -5)
      .attr('y', -10)
      .text( formatCurrency(this.totalSales, 'en-US', '$', 'USD'))
      .attr('font-family', 'sans-serif')
      .attr('font-size', '28px')
      .attr('fill', 'red');

    const line = d3.line()
      .x((d) => this.x(d['date']))
      .y((d) => this.y(d['value']))
      .curve(d3.curveMonotoneX);

    // add the Y gridlines
    g.append('g')
      .attr('class', 'grid')
      .call(this.make_y_gridlines().tickSize(-this.width));

    // add the X gridlines
    // this.svg.append('g')
    //   .attr('class', 'grid')
    //   .attr('transform', 'translate(0,' + this.height + ')')
    //   .call(this.make_x_gridlines()
    //     .tickSize(-this.height)
    //   );

    // Add Y Axis Label
    g.append('g')
      .call(d3.axisLeft(this.y)
        .tickFormat(d => formatCurrency(Number(d), 'en-US', '$', 'USD'))
      )
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.5em')
      .attr('text-anchor', 'end')
      .text('Price ($)');

    // Add X Axis Label
    g.append('g')
      .call(d3.axisBottom(this.x))
      .attr('transform', 'translate(0,' + this.height + ')')
      .append('text')
      .attr('fill', '#000')
      .attr('x', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');
      // .text('Date');

    // g.append('g')
    //   .attr('transform', 'translate(0,' + this.height + ')')
    //   .call(d3.axisBottom(x))
    //   .select('.domain')
    //   .remove();

    g.append('path').datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);

  }

  private updateChart() {
    // const update = this.svg.selectAll('.path')
    //   .data(this.data);
    //
    // update.exit().remove();
    //
    // this.x.domain(d3.extent(this.data, function(d) { return d.date; }));
    // this.y.domain([0, d3.max(this.data, function(d) { return d.close; })]);
    //
    // this.svg.select(".line")   // change the line
    //   .duration(750)
    //   .attr("d", valueline(data));
    // this.svg.select(".x.axis") // change the x axis
    //   .duration(750)
    //   .call(xAxis);
    // this.svg.select(".y.axis") // change the y axis
    //   .duration(750)
    //   .call(yAxis);
  }
}

import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss']
})
export class UsMapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('worldMap') private chartContainer: ElementRef;
  @Input() data: Array<any>;

  private stateData: any;
  private chart: any;
  private width = 960;
  private height = 500;
  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() { }

  async ngAfterViewInit(): Promise<any>  {
    this.stateData = await d3.json<any>('/assets/us-data.json');
    this.createChart();
  }

  async ngOnInit(): Promise<any> {

  }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.updateChart();
  }

  private async createChart(): Promise<any> {

    const element = this.chartContainer.nativeElement;

    // Define linear scale for output
    const color = d3.scaleLinear<string>().range(['rgb(213,222,217)', 'rgb(69,173,168)', 'rgb(84,36,55)', 'rgb(217,91,67)']);

    this.chart = d3.select(element).append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // D3 Projection
    const projection = d3.geoAlbersUsa()
      .translate([this.width / 2, this.height / 2])    // translate to center of screen
      .scale(1000);          // scale things down so see entire US

    // Define path generator
    const path = d3.geoPath()   // path generator that will convert GeoJSON to SVG paths
      .projection(projection);  // tell path generator to use albersUsa projection
    //
    // if(this.data) {
    //   for (let i = 0; i < this.data.length; i++) {
    //     // Grab State Name
    //     const dataState = this.data[i].state;
    //
    //     // Grab data value
    //     const dataValue = this.data[i].visited;
    //
    //     // Find the corresponding state inside the GeoJSON
    //     // tslint:disable-next-line:prefer-for-of
    //     for (let j = 0; j < this.stateData.features.length; j++) {
    //       const jsonState = this.stateData.features[j].properties.name;
    //
    //       if (dataState === jsonState) {
    //
    //         // Copy the data value into the JSON
    //         this.stateData.features[j].properties.visited = dataValue;
    //
    //         // Stop looking through the JSON
    //         break;
    //       }
    //     }
    //   }
    // }
    //
    // this.chart.selectAll('path')
    //   .data(this.stateData.features)
    //   .enter()
    //   .append('path')
    //   .attr('d', path)
    //   .style('stroke', '#fff')
    //   .style('stroke-width', '1')
    //   .style('fill', (d: any) => d.properties.visited ? color(d.properties.visited) : 'rgb(213,222,217)');

    // d3.json<any>('../../../assets/us-data.json')
    //   .then((json) => {
    //
    //     svg.selectAll('path')
    //       .data(json.features)
    //       .enter()
    //       .append('path')
    //       .attr('d', path)
    //       .style('stroke', '#fff')
    //       .style('stroke-width', '1')
    //       .style('fill', (d) => 'rgb(213,222,217)');
    //   })
    //   .catch((err) => {
    //     console.log('json load error');
    //   });

  }

  private updateChart(): void {

    var max = d3.max(this.data, (d) => d.value);
    const color = d3.scaleLinear<string>().range(['rgb(213,222,217)', 'rgb(69,173,168)', 'rgb(84,36,55)', 'rgb(217,91,67)']);

    // D3 Projection
    const projection = d3.geoAlbersUsa()
      .translate([this.width / 2, this.height / 2])    // translate to center of screen
      .scale(1000);          // scale things down so see entire US

    // Define path generator
    const path = d3.geoPath()   // path generator that will convert GeoJSON to SVG paths
      .projection(projection);  // tell path generator to use albersUsa projection

    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        // Grab State Name
        const dataState = this.data[i].state;

        // Grab data value
        const dataValue = this.data[i].visited;

        // Find the corresponding state inside the GeoJSON
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.stateData.features.length; j++) {
          const jsonState = this.stateData.features[j].properties.name;

          if (dataState === jsonState) {

            // Copy the data value into the JSON
            this.stateData.features[j].properties.visited = dataValue;

            // Stop looking through the JSON
            break;
          }
        }
      }
    }


    const update = this.chart.selectAll('.state')
      .data(this.stateData.features);

    // remove exiting bars
    update.exit().remove();

    this.chart.selectAll('.state')
      .transition()
      .style('fill', (d: any) => {
        console.log(`rgb(${d.properties.visited}, 0, 0)`);
        return d.properties.visited ? `rgb(${d.properties.visited}, 0, 0)` : 'rgb(213,222,217)';
      });

    // add new bars
    update
      .data(this.stateData.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .style('stroke', '#fff')
      .style('stroke-width', '1')
      .style('fill', (d: any) => {
        console.log(`rgb(${d.properties.visited}, 0, 0)`);
        return d.properties.visited ? `rgb(${d.properties.visited}, 0, 0)` : 'rgb(213,222,217)';
      });
  }


  onResize() {
    this.createChart();
  }

}

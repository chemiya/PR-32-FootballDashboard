import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }
  chart:any

  ngOnInit(){
    

    this.chart=new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [        {
          label: 'Ventas',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          data: [12, 19, 3, 5, 2]
        },
        {
          label: 'Gastos',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: [8, 7, 2, 8, 6]
        }]
      },
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }

        }    ,
        plugins: {
     
      datalabels: {
        anchor: 'center',
        align: 'center',
        font: {
          size: 12
        }
      }
    }
      }
    });
  }
}








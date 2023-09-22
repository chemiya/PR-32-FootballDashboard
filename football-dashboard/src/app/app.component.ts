import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ConexionApiService } from './conexion-api/conexion-api.service';
Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



    

    
}








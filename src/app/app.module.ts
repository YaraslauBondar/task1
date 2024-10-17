import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIcon } from "@angular/material/icon";
import { ChartDirective } from './chart.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartWidgetComponent,
    ChartDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HighchartsChartModule,
    AppRoutingModule,
    MatIcon
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

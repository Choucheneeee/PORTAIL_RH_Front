// src/app/admin/logs-activities/activities.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { AdminServiceService } from '../admin-service.service';

// Update the LogEntry interface to match your data structure
export interface LogEntry {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  user: string;
  __v: number;
  description: string;
}


@Component({
  selector: 'app-activities',
  imports: [CommonModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @ViewChild('activityChart') private chartRef!: ElementRef;
  private chart: any;
  private act!:Subscription;
  logEntries: LogEntry[] = [];
  

  constructor(private adminService: AdminServiceService) {
    this.loadLogs();
  }
  ngOnInit() {
    this.loadLogs();
  }
  loadLogs() {
    this.act = this.adminService.getLogs().subscribe(
      (data) => {
        console.log(data);
        this.logEntries = data;
      }
    );
  }
  
 

  // Update chart when data changes

}
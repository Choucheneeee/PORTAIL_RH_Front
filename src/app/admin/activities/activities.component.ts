// src/app/admin/logs-activities/activities.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { AdminServiceService } from '../admin-service.service';

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
  private act!: Subscription;
  logEntries: LogEntry[] = [];
  sortField: string = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';

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
        this.sortLogs();
      }
    );
  }

  Actualiser() {
    this.loadLogs();
  }

  sortLogs() {
    this.logEntries.sort((a, b) => {
      let comparison = 0;
      switch (this.sortField) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'user':
          comparison = a.user.localeCompare(b.user);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  toggleSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortLogs();
  }
}
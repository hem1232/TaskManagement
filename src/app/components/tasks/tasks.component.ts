import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { TaskModel } from 'src/app/model/taskmodel';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LayoutStyleBuilder } from '@angular/flex-layout';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AddtaskComponent } from './component/addtask/addtask.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['isCompleted', 'text', 'creator', 'start', 'end'];
  dataSource = new MatTableDataSource();
  addTaskObservableSub: Subscription;

  filterItemList = [
    { key: 'All Tasks' },
    { key: 'Personal Tasks' },
    { key: 'Leader Tasks' },
    { key: 'Other Engg. Tasks' },
  ];

  selectedFilteritem = { key: 'All Tasks' };

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.taskService.allTaskdata;
    this.dataSource.sort = this.sort;

    this.taskService.updateLeaderTasks();

    this.notificationService.showSuccess(
      'Tasks are loaded succesfully.',
      'TaskStatus'
    );

    this.addTask();
  }

  ngOnDestroy(): void {
    if (this.addTaskObservableSub) {
      this.addTaskObservableSub.unsubscribe();
    }
  }

  setSelectedFilteritem(item: any): void {
    this.selectedFilteritem = item;

    if (item.key === 'Personal Tasks') {
      this.dataSource.data = this.taskService.allTaskdata.filter(
        (data) => data.isGlobal === false
      );
      return;
    } else if (item.key === 'Leader Tasks') {
      this.dataSource.data = this.taskService.allTaskdata.filter(
        (data) => data.isLeader === true
      );
      return;
    } else if (item.key === 'Other Engg. Tasks') {
      this.dataSource.data = this.taskService.allTaskdata.filter(
        (data) => data.isGlobal === true
      );
      return;
    } else if (item.key === 'All Tasks') {
      this.dataSource.data = this.taskService.allTaskdata;
    }
  }

  setTaskStatus(task: TaskModel): void {
    const taskObj = this.taskService.allTaskdata.find((x) => x === task);
    taskObj.isCompleted = !taskObj.isCompleted;
    let msg;
    if (taskObj.isCompleted === true) {
      msg = 'Task marked as done successfully..';
    } else {
      msg = 'Task marked as undone successfully..';
    }
    this.notificationService.showSuccess(msg, 'TaskStatus');
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '640px',
      disableClose: true,
    });
  }

  addTask(): void {
    this.addTaskObservableSub = this.taskService.addTaskObservable$.subscribe(
      (task) => {
        if (task) {
          this.dataSource.data = this.taskService.allTaskdata;
        }
      }
    );
  }
}

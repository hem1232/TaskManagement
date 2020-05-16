import { Injectable } from '@angular/core';
import { TaskModel } from '../model/taskmodel';
import { Subject } from 'rxjs';
import { NotificationService } from '../shared/service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private notificationService: NotificationService) {}
  private taskCountUpdateObservable = new Subject<any>(); // observable for loader show and hide
  taskCountUpdateObservable$ = this.taskCountUpdateObservable.asObservable();

  private addTaskObservable = new Subject<TaskModel>(); // observable for loader show and hide
  addTaskObservable$ = this.addTaskObservable.asObservable();

  allTaskdata: TaskModel[] = [
    {
      id:0,
      text: 'Make Test Plan for New Vehicle',
      isGlobal: true,
      isLeader: true,
      creator: 'Eoin Morgan',
      isCompleted: false,
      start: '2019-09-07',
      end: '2019-09-10',
    },
    {
      id:1,
      text: 'Make Test Items For New Vehicle',
      isGlobal: true,
      isLeader: true,
      creator: 'Eoin Morgan',
      isCompleted: false,
      start: '2019-09-07',
      end: '2019-09-10',
    },
    {
      id:2,
      text: 'Create plan for tire testing',
      isGlobal: false,
      isLeader: false,
      creator: 'Mithali Raj',
      isCompleted: false,
      start: '2019-09-08',
      end: '2019-09-10',
    },
    {
      id:3,
      text: 'Ready the engine testing equipment',
      isGlobal: true,
      isLeader: false,
      creator: 'Sheldon Cotrell',
      isCompleted: false,
      start: '2019-09-12',
      end: '2019-09-15',
    },
    {
      id:4,
      text: 'Test the seat components',
      isGlobal: true,
      isLeader: false,
      creator: 'Ellyse Perry',
      isCompleted: false,
      start: '2019-09-13',
      end: '2019-09-16',
    },
    {
      id:5,
      text: 'Take the car for final examination',
      isGlobal: true,
      isLeader: false,
      creator: 'Babar Azam',
      isCompleted: false,
      start: '2019-09-12',
      end: '2019-09-17',
    },
    {
      id:6,
      text: 'Schedule Tests for engine testing',
      isGlobal: true,
      isLeader: false,
      creator: 'Heather Knight',
      isCompleted: false,
      start: '2019-09-14',
      end: '2019-09-18',
    },
    {
      id:7,
      text: 'Submit reports to committee',
      isGlobal: true,
      isLeader: false,
      creator: 'Trent Boult',
      isCompleted: false,
      start: '2019-09-14',
      end: '2019-09-18',
    },
  ];

  updateLeaderTasks(): void {
    const leaderTasks = this.allTaskdata.filter((data) => data.isLeader === true);
    const obj = {
      key: 'LeaderTask',
      count: leaderTasks.length,
    };
    this.taskCountUpdateObservable.next(obj);
  }

  addTask(task: TaskModel) {
    this.allTaskdata.push(task);
    this.addTaskObservable.next(task);
    this.updateLeaderTasks();
    this.notificationService.showSuccess('Task added successfully.', '');
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { TaskModel } from '../../model/taskmodel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  globalTasks: TaskModel[];
  personalTasks: TaskModel[];
  leaderTasks: TaskModel[];

  ngOnInit(): void {
    this.taskFilter();
  }

  taskFilter(): void {
    this.globalTasks = this.taskService.allTaskdata.filter(
      (data) => data.isGlobal === true
    );

    this.personalTasks = this.taskService.allTaskdata.filter(
      (data) => data.isGlobal === false
    );

    this.leaderTasks = this.taskService.allTaskdata.filter(
      (data) => data.isLeader === true
    );

    this.taskService.updateLeaderTasks();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskModel } from 'src/app/model/taskmodel';
import { TaskService } from 'src/app/service/task.service';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
})
export class AddtaskComponent implements OnInit {
  public addTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private taskService: TaskService
  ) {}

  public ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      startdate: '',
      enddate: '',
      creator: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      text: ['', [Validators.required]],
    });
  }

  public onAddTask(): void {}

  closeDialog(): void {
    this.addTaskForm.reset();
    this.dialog.closeAll();
  }

  saveTask() {
    const startdate = this.datePipe.transform(
      this.addTaskForm.value.startdate,
      'yyyy-MM-dd'
    );
    const enddate = this.datePipe.transform(
      this.addTaskForm.value.enddate,
      'yyyy-MM-dd'
    );

    const task: TaskModel = {
      start: startdate,
      end: enddate,
      text: this.addTaskForm.value.text,
      isCompleted: false,
      isGlobal: true,
      isLeader: false,
      creator: this.addTaskForm.value.creator,
    };

    this.taskService.addTask(task);
    this.dialog.closeAll();
  }
}

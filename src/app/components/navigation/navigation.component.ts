import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  leaderTaskCount;
  teamTaskCount;
  taskCountUpdateObservableSub: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
   this.updateTaskCount();
  }

  ngOnDestroy(): void {
    if (this.taskCountUpdateObservableSub) {
      this.taskCountUpdateObservableSub.unsubscribe();
    }
  }

  updateTaskCount(){
    this.taskCountUpdateObservableSub = this.taskService.taskCountUpdateObservable$.subscribe(
      (data) => {
        if (data && data.key === 'LeaderTask') {
          this.leaderTaskCount = data.count;
          this.teamTaskCount =
            this.taskService.allTaskdata.length - this.leaderTaskCount;
        }
      }
    );
  }
}

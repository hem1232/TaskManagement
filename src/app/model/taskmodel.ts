export interface TaskModel {
  id?:number;
  text: string;
  isGlobal: boolean;
  isLeader: boolean;
  creator: string;
  isCompleted: boolean;
  start: string;
  end: string;
}

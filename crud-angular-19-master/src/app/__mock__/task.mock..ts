import { ITask } from "../features/tasks/model/task.model";

export const tasks: ITask[] = [
    { id: '1', title: 'Go to the gym', isCompleted: false, categoryId: '1' },
    { id: '2', title: 'Buy new Mack Book Pro', isCompleted: true, categoryId: '1' },
    { id: '3', title: 'Drink water', isCompleted: false, categoryId: '2' },
    { id: '4', title: 'Analyze budget', isCompleted: true, categoryId: '2' },
];

export const task: ITask = { id: '1', title: 'Run after work', isCompleted: false, categoryId: '1' };
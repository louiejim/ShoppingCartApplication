import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingListComponent } from './pending-list/pending-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: PendingListComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PendingRoutingModule { }

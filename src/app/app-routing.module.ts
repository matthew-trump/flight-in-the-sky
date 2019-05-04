import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerEventComponent } from './tracker-event/tracker-event.component';


const routes: Routes = [
  { path: '', redirectTo: 'tracker', pathMatch: 'full' },
  {
    path: 'tracker', component: TrackerComponent,
    children: [
      { path: ':event', component: TrackerEventComponent }
    ]
  },
  { path: 'config', loadChildren: './config.module#ConfigModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { HomePageComponent } from './pages/Home/home-page/home-page.component';


const routes: Routes = [
  { path: '', component: InitPageComponent },
  { path: 'home', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

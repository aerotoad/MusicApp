import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const loggedInUser = localStorage.getItem('sampleLoggedInUser');
let entryRoute = 'login';
if (loggedInUser) {
  entryRoute = 'main';
}

const routes: Routes = [
  { path: '', redirectTo: entryRoute, pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

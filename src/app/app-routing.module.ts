import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DocumentsComponent } from './documents/documents.component';
import { UserComponent} from './user/user.component';
import { LoginComponent} from './login/login.component';
const routes: Routes = [
  { path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},
  { path : 'documents', component : DocumentsComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

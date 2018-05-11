import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CasesComponent } from './cases/cases.component';
import { DocumentsComponent, ModalUploadFile } from './documents/documents.component';
import { UserComponent} from './user/user.component';
import { LoginComponent} from './login/login.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path : '', component: LoginComponent},
  { path : 'cases', component: CasesComponent},
  { path : 'documents/:idCase', component: DocumentsComponent},
  { path: 'user/change_password', component: ChangePasswordComponent }
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

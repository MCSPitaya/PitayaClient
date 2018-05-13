import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {DataSource} from '@angular/cdk/table';
import {SelectionModel} from '@angular/cdk/collections';



import 'hammerjs';
import {CdkTableModule} from '@angular/cdk/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatPaginator,
  MatGridListModule,


} from '@angular/material';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DocumentsComponent, ModalUploadFile } from './documents/documents.component';
import { CasesComponent ,ModalCreateCase} from './cases/cases.component';


import { UserService } from './user/user.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { ContentTypeInterceptor } from './shared/contenttype.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ListUploadComponent } from './documents/Upload/list-upload/list-upload.component';
import { DetailsUploadComponent } from './documents/Upload/details-upload/details-upload.component';
import { FormUploadComponent } from './documents/Upload/form-upload/form-upload.component';
import { UploadFileService } from './documents/Upload/upload-file.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DocumentsComponent,
    ModalUploadFile,
    CasesComponent,
<<<<<<< HEAD
    ModalCreateCase,
    ChangePasswordComponent
=======
    ChangePasswordComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    FormUploadComponent
    
>>>>>>> origin/master

  ],
   exports: [
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,

    // Flex-layout
    FlexLayoutModule,

    NgbModule.forRoot(),

    //Routing
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UploadFileService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

  entryComponents: [DocumentsComponent, ModalUploadFile, ModalCreateCase],



})
export class AppModule { }

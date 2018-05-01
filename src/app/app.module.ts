import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';



import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatTableModule,
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
  MatTable,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTooltipModule,
} from '@angular/material';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DocumentsComponent } from './documents/documents.component';


import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DocumentsComponent
  ],
   exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
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
    MatNativeDateModule,

    // Flex-layout
    FlexLayoutModule,

    NgbModule.forRoot(),

    //Routing
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

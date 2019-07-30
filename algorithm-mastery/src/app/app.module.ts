import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlgorithmQuestionListComponent } from './algorithm-question-list/algorithm-question-list/algorithm-question-list.component';
import { AlgorithmQuestionItemComponent } from './algorithm-question-list/algorithm-question-item/algorithm-question-item.component';
import { AlgorithmQuestionEditComponent } from './algorithm-question-list/algorithm-question-edit/algorithm-question-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlgorithmQuestionListComponent,
    AlgorithmQuestionItemComponent,
    AlgorithmQuestionEditComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlgorithmQuestionEditComponent],
})
export class AppModule {}

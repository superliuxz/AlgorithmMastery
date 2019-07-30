import {
  HTTP_INTERCEPTORS,
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
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AlgorithmQuestionsEffects} from './algorithm-questions/store/algorithm-questions.effects';

import { AppComponent } from './app.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { AlgorithmQuestionListComponent } from './algorithm-questions/algorithm-question-list/algorithm-question-list.component';
import { AlgorithmQuestionItemComponent } from './algorithm-questions/algorithm-question-item/algorithm-question-item.component';
import { AlgorithmQuestionEditComponent } from './algorithm-questions/algorithm-question-edit/algorithm-question-edit.component';
import {appReducer} from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmQuestionListComponent,
    AlgorithmQuestionItemComponent,
    AlgorithmQuestionEditComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([AlgorithmQuestionsEffects]),
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatGridListModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlgorithmQuestionEditComponent],
})
export class AppModule {}

import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatDialogRef,
} from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Converter } from 'showdown';

import { AppState } from '../../store/app.reducer';
import { AlgorithmQuestionModel } from '../algorithm-question.model';

@Component({
  selector: 'app-algorithm-question-edit',
  templateUrl: './algorithm-question-edit.component.html',
  styleUrls: ['./algorithm-question-edit.component.css'],
})
export class AlgorithmQuestionEditComponent implements OnInit, OnDestroy {
  constructor(
    private dialogRef: MatDialogRef<AlgorithmQuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AlgorithmQuestionModel,
    private store: Store<AppState>
  ) {}

  form: FormGroup;
  topics: string[];
  techniques: string[];
  filteredTechniques: Observable<string[]>;
  techniquesInputControl = new FormControl();
  @ViewChild('techniquesInput', { static: false }) techniquesInput: ElementRef<
    HTMLInputElement
  >;
  converter = new Converter({disableForced4SpacesIndentedSublists: true});
  sub: Subscription;

  ngOnInit() {
    this.sub = this.store.select('algorithmQuestions').subscribe(state => {
      this.topics = state.filters.topics;
      this.techniques = state.filters.techniques;
    });
    const techniquesArray = new FormArray([]);
    this.data.techniques.forEach(technique => {
      techniquesArray.push(new FormControl(technique, [Validators.required]));
    });
    this.form = new FormGroup({
      title: new FormControl(this.data.title || '', [Validators.required]),
      source: new FormControl(this.data.source),
      topic: new FormControl(this.data.topic, [Validators.required]),
      tags: new FormControl(this.data.tags),
      techniques: techniquesArray,
      input: new FormControl(this.data.input),
      output: new FormControl(this.data.output),
      solution: new FormControl(this.data.solution),
      timeComplexity: new FormControl(this.data.timeComplexity),
      spaceComplexity: new FormControl(this.data.spaceComplexity),
      note: new FormControl(this.data.note),
    });
    this.filteredTechniques = this.techniquesInputControl.valueChanges.pipe(
      startWith(null),
      map(typedTopic => {
        if (!typedTopic) {
          return this.techniques;
        }
        const lowered = typedTopic.toLowerCase();
        return this.techniques.filter(item =>
          item.toLowerCase().includes(lowered)
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getArrayControls(): AbstractControl[] {
    return (this.form.get('techniques') as FormArray).controls;
  }

  onDiscard(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.form.value);
  }

  onRemoveTechnique(idx: number) {
    (this.form.get('techniques') as FormArray).removeAt(idx);
  }

  onSelectTechnique($event: MatAutocompleteSelectedEvent) {
    (this.form.get('techniques') as FormArray).push(
      new FormControl($event.option.viewValue, [Validators.required])
    );
    this.techniquesInput.nativeElement.value = '';
  }
}

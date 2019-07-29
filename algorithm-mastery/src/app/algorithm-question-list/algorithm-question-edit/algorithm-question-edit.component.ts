import { Component, Inject, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AlgorithmQuestionModel } from '../algorithm-question.model';

@Component({
  selector: 'app-algorithm-question-edit',
  templateUrl: './algorithm-question-edit.component.html',
  styleUrls: ['./algorithm-question-edit.component.css'],
})
export class AlgorithmQuestionEditComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AlgorithmQuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AlgorithmQuestionModel
  ) {}

  form: FormGroup;
  // TODO: move it to backend.
  // TODO: separate into topic and techniques.
  topicsAndTechniques = [
    'Array',
    'Hash Table',
    'Linked List',
    'Math',
    'String',
    'Two Pointers',
    'Binary Search',
    'Divide and Conquer',
    'DP',
    'Backtracking',
    'Stack',
    'Heap',
    'Queue',
    'Greedy',
    'Sort',
    'Bit',
    'Binary Tree',
    'N-ary Tree',
    'Graph',
    'DFS',
    'BFS',
    'DFS+MEMO',
    'UF',
    'Topological Sort',
    'Trie',
    'Binary Index Tree',
    'Segment Tree',
    'BST',
    'Recursion',
    'Minmax',
    'Reservoir Sampling',
    'Sliding Window',
    'Sweep Line',
    'Probability',
    'Random',
  ];
  filteredTechniques: Observable<string[]>;
  techniquesInputControl = new FormControl();

  ngOnInit() {
    const techniquesArray = new FormArray([]);
    this.data.techniques.forEach(technique => {
      techniquesArray.push(new FormControl(technique, [Validators.required]));
    });
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required]),
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
          return this.topicsAndTechniques;
        }
        const lowered = typedTopic.toLowerCase();
        return this.topicsAndTechniques.filter(item =>
          item.toLowerCase().includes(lowered)
        );
      })
    );
  }

  private getArrayControls(): AbstractControl[] {
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
    this.techniquesInputControl.setValue(null);
  }
}

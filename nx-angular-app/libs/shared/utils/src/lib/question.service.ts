import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // TODO: get from a remote source of question metadata
  // getQuestions() {
  //   const questions: QuestionBase<string>[] = [
  //     new DropdownQuestion({
  //       key: 'brave',
  //       label: 'Bravery Rating',
  //       options: [
  //         { key: 'solid', value: 'Solid' },
  //         { key: 'great', value: 'Great' },
  //         { key: 'good', value: 'Good' },
  //         { key: 'unproven', value: 'Unproven' },
  //       ],
  //       order: 3,
  //     }),

  //     new TextboxQuestion({
  //       key: 'firstName',
  //       label: 'First name',
  //       value: 'Bombasto',
  //       required: true,
  //       order: 1,
  //     }),

  //     new TextboxQuestion({
  //       key: 'emailAddress',
  //       label: 'Email',
  //       type: 'email',
  //       order: 2,
  //     }),
  //   ];

  //   return of(questions.sort((a, b) => a.order - b.order));
  // }

  // getFocusQuestions(focus: Focus) {
  //   const questions: QuestionBase<string>[] = [
  //     new TextboxQuestion({
  //       key: 'focusId',
  //       label: 'Id',
  //       value: focus.focusId as any,
  //       required: false,
  //       order: 1,
  //       type: 'number'
  //     }),
  //     new TextboxQuestion({
  //       key: 'name',
  //       label: 'Nombre',
  //       value: focus.name,
  //       required: true,
  //       order: 1,
  //     }),
  //     new TextboxQuestion({
  //       key: 'description',
  //       label: 'Descripción',
  //       value: focus.description,
  //       required: true,
  //       order: 2,
  //     }),
  //   ];

  //   return of(questions.sort((a, b) => a.order - b.order));
  // }

  // getAnalyzerQuestions(analyzer: Analyzer) {
  //   const questions: QuestionBase<string>[] = [
  //     new TextboxQuestion({
  //       key: 'manufacturer',
  //       label: 'Fabricante',
  //       value: analyzer.manufacturer,
  //       required: true,
  //       order: 1,
  //     }),
  //     new TextboxQuestion({
  //       key: 'model',
  //       label: 'Modelo',
  //       value: analyzer.model,
  //       required: true,
  //       order: 2,
  //     }),
  //   ];

  //   return of(questions.sort((a, b) => a.order - b.order));
  // }
}

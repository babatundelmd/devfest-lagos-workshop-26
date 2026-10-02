import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { FieldError } from './field-error';
import { emptyDraft, LEVELS, Talk, TalkDraft, toDraft, TRACKS } from './talk';
import { talkSchema } from './talk-schema';
import { TalksApi } from './talks-api';

@Component({
  selector: 'app-talk-form',
  imports: [RouterLink, FormField, FormRoot, FieldError],
  templateUrl: './talk-form.html',
  styleUrl: './talk-form.css',
})
export default class TalkForm {


  protected readonly model = linkedSignal<TalkDraft>(() =>
    this.talk.hasValue() ? toDraft(this.talk.value()) : emptyDraft(),
  );

  protected readonly form = form(this.model, talkSchema, {
    submission: {
      action: async (field) => {
        const draft = field().value();
        const id = this.id();
        try {
          if (id) {
            await this.api.update(id, draft);
          } else {
            await this.api.create(draft);
          }
          await this.router.navigate(['/']);
          return undefined;
        } catch {
          return { kind: 'server', message: 'Could not save the talk. Please try again.' };
        }
      },
    },
  });
}

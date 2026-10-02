import { max, maxLength, min, minLength, required, schema, validate } from '@angular/forms/signals';
import { TalkDraft } from './talk';

export const talkSchema = schema<TalkDraft>((talk) => {
  required(talk.title, { message: 'Give your talk a title' });
  maxLength(talk.title, 80, { message: 'Keep the title under 80 characters' });

  required(talk.speaker, { message: 'Who is giving this talk?' });

  min(talk.duration, 15, { message: 'Talks are at least 15 minutes' });
  max(talk.duration, 90, { message: 'Talks are at most 90 minutes' });

  validate(talk.duration, ({ value, valueOf }) =>
    valueOf(talk.level) === 'Advanced' && value() < 45
      ? { kind: 'tooShort', message: 'Advanced talks need at least 45 minutes' }
      : undefined,
  );

  required(talk.abstract, { message: 'Tell attendees what the talk is about' });
  minLength(talk.abstract, 50, {
    message: ({ value }) => `A little more detail please (${value().length}/50 characters)`,
  });
});

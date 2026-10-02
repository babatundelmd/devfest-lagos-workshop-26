import { Injector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { emptyDraft, TalkDraft } from './talk';
import { talkSchema } from './talk-schema';

function talkForm(overrides: Partial<TalkDraft> = {}) {
  const model = signal<TalkDraft>({ ...emptyDraft(), ...overrides });
  return { model, f: form(model, talkSchema, { injector: TestBed.inject(Injector) }) };
}

const kinds = (errors: readonly { kind: string }[]) => errors.map((e) => e.kind);

describe('talkSchema', () => {
  it('requires a title and a speaker', () => {
    const { f } = talkForm();
    expect(kinds(f.title().errors())).toContain('required');
    expect(kinds(f.speaker().errors())).toContain('required');
  });

  it('asks for an abstract of at least 50 characters', () => {
    const { f } = talkForm({ abstract: 'Too short.' });
    expect(kinds(f.abstract().errors())).toContain('minLength');
  });

  it('keeps the duration between 15 and 90 minutes', () => {
    const { f, model } = talkForm({ duration: 5 });
    expect(kinds(f.duration().errors())).toContain('min');
    model.update((m) => ({ ...m, duration: 120 }));
    expect(kinds(f.duration().errors())).toContain('max');
  });

  it('needs at least 45 minutes for an advanced talk', () => {
    const { f, model } = talkForm({ level: 'Advanced', duration: 30 });
    expect(kinds(f.duration().errors())).toContain('tooShort');
    model.update((m) => ({ ...m, level: 'Beginner' }));
    expect(kinds(f.duration().errors())).not.toContain('tooShort');
  });

  it('accepts a complete talk', () => {
    const { f } = talkForm({
      title: 'Signals in practice',
      speaker: 'Babatunde',
      abstract: 'A practical look at signals, resources and Signal Forms in a real Angular app.',
    });
    expect(f().valid()).toBe(true);
  });
});

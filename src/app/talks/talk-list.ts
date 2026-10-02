import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Talk, Track, TRACKS } from './talk';
import { TalksApi } from './talks-api';

@Component({
  selector: 'app-talk-list',
  imports: [RouterLink],
  templateUrl: './talk-list.html',
  styleUrl: './talk-list.css',
})
export default class TalkList {
  private readonly api = inject(TalksApi);

  protected readonly talks = httpResource<Talk[]>(() => '/api/talks', { defaultValue: [] });

  protected readonly query = signal('');
  protected readonly track = signal<Track | 'All'>('All');
  protected readonly trackOptions: (Track | 'All')[] = ['All', ...TRACKS];

  protected readonly filtered = computed(() => {
    const talks = this.talks.hasValue() ? this.talks.value() : [];
    const query = this.query().trim().toLowerCase();
    const track = this.track();

    return talks.filter(
      (talk) =>
        (track === 'All' || talk.track === track) &&
        `${talk.title} ${talk.speaker}`.toLowerCase().includes(query),
    );
  });

  protected async delete(talk: Talk): Promise<void> {
    if (!confirm(`Delete "${talk.title}"?`)) return;
    this.talks.update((talks) => talks.filter((t) => t.id !== talk.id));
    try {
      await this.api.delete(talk.id);
    } catch {
      this.talks.reload();
    }
  }
}

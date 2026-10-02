import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Talk, TalkDraft } from './talk';

@Injectable({ providedIn: 'root' })
export class TalksApi {
  private readonly http = inject(HttpClient);

  create(draft: TalkDraft): Promise<Talk> {
    return firstValueFrom(this.http.post<Talk>('/api/talks', draft));
  }

  update(id: string, draft: TalkDraft): Promise<Talk> {
    return firstValueFrom(
      this.http.put<Talk>(`/api/talks/${id}`, { id, ...draft }));
  }

  delete(id: string): Promise<unknown> {
    return firstValueFrom(this.http.delete(`/api/talks/${id}`));
  }
}

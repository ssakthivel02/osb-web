'use client';

import { FormEvent, useMemo, useState } from 'react';

export type TrainingSearchEntry = {
  id: string;
  kind: 'TRACK' | 'RECORD';
  title: string;
  summary: string;
  track: string;
  recordType?: string;
  href: string;
};

export default function TrainingAcademySearch({ entries }: { entries: TrainingSearchEntry[] }) {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const normalized = submittedQuery.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return entries.slice(0, 24);
    return entries
      .filter((entry) => [entry.id, entry.title, entry.summary, entry.track, entry.recordType ?? '']
        .some((value) => value.toLowerCase().includes(normalized)))
      .slice(0, 100);
  }, [entries, normalized]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
  }

  return (
    <>
      <form className="searchBox" onSubmit={submit} role="search">
        <label className="srOnly" htmlFor="training-search">Search verified Training Academy content</label>
        <input
          id="training-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search PowerShell, Hyper-V, PMP, ITIL, Azure, troubleshooting..."
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      <p aria-live="polite">
        {normalized ? `${results.length} result${results.length === 1 ? '' : 's'} for “${submittedQuery.trim()}”` : 'Showing a verified starter set. Search to filter the full corpus.'}
      </p>
      <div className="grid">
        {results.map((entry) => (
          <article className="card" key={`${entry.kind}-${entry.id}`}>
            <p className="eyebrow">{entry.kind}{entry.recordType ? ` · ${entry.recordType.replaceAll('_', ' ')}` : ''}</p>
            <h2>{entry.title}</h2>
            <p>{entry.summary}</p>
            <p><strong>{entry.track}</strong></p>
            <a className="textLink" href={entry.href}>Open verified {entry.kind === 'TRACK' ? 'track' : 'record'} →</a>
          </article>
        ))}
      </div>
      {normalized && results.length === 0 ? <p>No verified Training Academy records or tracks matched that search.</p> : null}
    </>
  );
}

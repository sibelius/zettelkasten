import React, {useCallback, useMemo} from 'react';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';

import NoteField from '@site/src/components/Home/NoteField';
import {channels, drawers, offers} from '@site/src/components/Home/homeContent';

import styles from './index.module.css';

type DocEntry = {id: string; path: string};

/** Every note in the box, read from the docs plugin so the counts never lie. */
function useNotes(): DocEntry[] {
  const data = usePluginData('docusaurus-plugin-content-docs', 'default') as
    | {versions?: {docs?: DocEntry[]}[]}
    | undefined;

  return useMemo(() => data?.versions?.[0]?.docs ?? [], [data]);
}

function countFor(notes: DocEntry[], match: string | string[]): number {
  if (Array.isArray(match)) {
    return notes.filter((note) => match.includes(note.id)).length;
  }

  return notes.filter((note) => note.id.startsWith(match)).length;
}

export default function Home(): JSX.Element {
  const notes = useNotes();
  const history = useHistory();

  const atomic = countFor(notes, 'notes/');
  const answers = countFor(notes, 'mentorship/');
  const paths = countFor(notes, 'learning-path/');

  const openRandomNote = useCallback(() => {
    if (notes.length === 0) {
      return;
    }

    const note = notes[Math.floor(Math.random() * notes.length)];

    history.push(note.path);
  }, [notes, history]);

  const ledger: [string, string][] = [
    [String(notes.length || '—'), 'notes filed'],
    [String(atomic || '—'), 'atomic notes'],
    [String(answers || '—'), 'questions answered'],
    [String(paths || '—'), 'learning paths'],
    ['2023', 'filing since'],
  ];

  return (
    <Layout
      wrapperClassName="slipbox-home"
      title="Sibelius Seraphini — a slip-box in public"
      description="The public slip-box of Sibelius Seraphini: notes, mentorship answers, learning paths and essays on building software, plus every channel I publish on."
    >
      <div className={styles.page}>
        {/* ── Hero: the box, drawn as the thing it is ──────────────────── */}
        <header className={styles.hero}>
          <div className={styles.heroField}>
            <NoteField />
          </div>
          <div className={styles.heroVeil} />

          <div className={styles.wrap}>
            <div className={styles.heroInner}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span className={styles.util}>Sibelius Seraphini</span>
                <span className={styles.util}>Cofounder &amp; CTO, Woovi</span>
                <span className={styles.util}>São Paulo</span>
              </div>

              <h1 className={styles.title}>
                Unfinished thoughts,
                <span className={styles.titleAccent}>filed in public.</span>
              </h1>

              <p className={styles.lede}>
                This is my zettelkasten — a slip-box I write into instead of
                keeping notes to myself. One idea per note, linked to the others.
                Every question a developer asks me
                gets answered here once, so I never have to answer it twice.
                Nothing here is finished. That is the point.
              </p>

              <div className={styles.actions}>
                <Link
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  to="/food-for-thought">
                  Start here
                </Link>
                <button
                  className={`${styles.btn} ${styles.btnGhost}`}
                  type="button"
                  onClick={openRandomNote}>
                  <span className={styles.btnDice} aria-hidden="true">
                    🎲
                  </span>
                  Pull a random note
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ── Ledger: the box, counted ─────────────────────────────────── */}
        <div className={styles.ledger}>
          {ledger.map(([value, label]) => (
            <div className={styles.ledgerCell} key={label}>
              <div className={styles.ledgerNum}>{value}</div>
              <div className={styles.ledgerLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Drawers ──────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>The drawers</h2>
              <p className={styles.sectionNote}>
                Six ways into the box. Counts are read from the box itself, so
                they go up as I write.
              </p>
            </div>

            <div className={styles.drawers}>
              {drawers.map((drawer) => {
                const count = countFor(notes, drawer.match);

                return (
                  <div className={styles.drawer} key={drawer.label}>
                    <div className={styles.drawerTop}>
                      <Link className={styles.drawerLabel} to={drawer.to}>
                        {drawer.label}
                      </Link>
                      <span className={styles.drawerCount}>
                        {count || '—'} notes
                      </span>
                    </div>

                    <p className={styles.drawerBlurb}>{drawer.blurb}</p>

                    <ul className={styles.picks}>
                      {drawer.picks.map(([title, to]) => (
                        <li key={to}>
                          <Link className={styles.pick} to={to}>
                            <span className={styles.pickArrow} aria-hidden="true">
                              →
                            </span>
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Channels ─────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Everywhere else</h2>
              <p className={styles.sectionNote}>
                Same person, different rooms. Talks and podcasts are collected
                back here so you do not have to hunt for them.
              </p>
            </div>

            <div className={styles.channels}>
              {channels.map((channel) => {
                const Icon = channel.icon;
                const external = channel.href.startsWith('http');

                return (
                  <Link
                    className={styles.channel}
                    key={channel.name}
                    to={channel.href}
                    style={{['--hue' as string]: channel.hue}}
                    {...(external
                      ? {rel: 'me noopener', target: '_blank'}
                      : {})}>
                    <span className={styles.channelIcon}>
                      <Icon />
                    </span>
                    <span className={styles.channelText}>
                      <span className={styles.channelName}>{channel.name}</span>
                      <span className={styles.channelHandle}>
                        {channel.handle}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Offers ───────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Work with me</h2>
              <p className={styles.sectionNote}>
                The notes are free. If you want the conversation instead, these
                are the three ways to get it.
              </p>
            </div>

            <div className={styles.offers}>
              {offers.map((offer) => (
                <Link className={styles.offer} key={offer.title} to={offer.to}>
                  <span className={styles.offerFor}>For {offer.for_}</span>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>

                  <div className={styles.offerPrice}>
                    <span className={styles.offerPriceNum}>{offer.price}</span>
                    <span className={styles.offerCadence}>
                      {offer.cadence}
                    </span>
                  </div>

                  <ul className={styles.offerList}>
                    {offer.bullets.map((bullet) => (
                      <li className={styles.offerItem} key={bullet}>
                        <span className={styles.offerBullet} aria-hidden="true">
                          ·
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <span className={styles.offerCta}>See how it works →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <section className={styles.closing}>
          <div className={styles.wrap}>
            <p className={styles.closingQuote}>
              Writing is how I scale myself.
            </p>
            <p className={styles.closingNote}>
              For anything that does not fit in a note, ping me on{' '}
              <Link to="https://twitter.com/sseraphini">@sseraphini</Link>. To
              read how I think about all this, start with{' '}
              <Link to="/writing">Writing</Link>.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

import { describe, expect, it } from 'vitest';
import { SubscriberWrapper } from '../../types/session';
import sortByDisplayPriority from './sortByDisplayPriority';

describe('sortByDisplayPriority', () => {
  describe('with screenshare subscribers', () => {
    it('properly prioritizes subA', () => {
      const subA = { id: 'subA', isScreenshare: true } as SubscriberWrapper;
      const subB = { id: 'subB', isScreenshare: false } as SubscriberWrapper;

      const sortedSubs = [subA, subB].sort(sortByDisplayPriority(undefined));
      expect(sortedSubs[0].id).toBe('subA');
    });

    it('properly prioritizes subB', () => {
      const subA = { id: 'subA', isScreenshare: false } as SubscriberWrapper;
      const subB = { id: 'subB', isScreenshare: true } as SubscriberWrapper;

      const sortedSubs = [subA, subB].sort(sortByDisplayPriority(undefined));
      expect(sortedSubs[0].id).toBe('subB');
    });
  });

  describe('with an active speaker', () => {
    it('properly prioritizes subA', () => {
      const subA = { id: 'subA' } as SubscriberWrapper;
      const subB = { id: 'subB' } as SubscriberWrapper;

      const sortedSubs = [subA, subB].sort(sortByDisplayPriority('subA'));
      expect(sortedSubs[0].id).toBe('subA');
    });

    it('properly prioritizes subB', () => {
      const subA = { id: 'subA' } as SubscriberWrapper;
      const subB = { id: 'subB' } as SubscriberWrapper;

      const sortedSubs = [subA, subB].sort(sortByDisplayPriority('subB'));
      expect(sortedSubs[0].id).toBe('subB');
    });
  });

  it('does not change order if neither sub is an active speaker or screenshare', () => {
    const subA = { id: 'subA' } as SubscriberWrapper;
    const subB = { id: 'subB' } as SubscriberWrapper;

    const sortedSubs = [subA, subB].sort(sortByDisplayPriority(undefined));
    expect(sortedSubs[0].id).toBe('subA');
  });
});

import { PRIORITY_TOPICS_PART_1 } from './priorityTopicsPart1.js';
import { PRIORITY_TOPICS_PART_2 } from './priorityTopicsPart2.js';

export const REMEDIATED_PRIORITY_TOPICS = {
  ...PRIORITY_TOPICS_PART_1,
  ...PRIORITY_TOPICS_PART_2
};

export const PRIORITY_SLUGS = Object.keys(REMEDIATED_PRIORITY_TOPICS).sort();

export function getRemediatedTopic(slug) {
  return REMEDIATED_PRIORITY_TOPICS[slug] || null;
}


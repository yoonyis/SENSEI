import { topics } from "../data/topics.js";

const MASTERY_KEY = "sensei_mastery";

export function getMastery() {
  const savedMastery = localStorage.getItem(MASTERY_KEY);

  if (savedMastery) {
    return JSON.parse(savedMastery);
  }

  const initialMastery = {};

  topics.forEach((topic) => {
    initialMastery[topic.id] = topic.mastery;
  });

  localStorage.setItem(
    MASTERY_KEY,
    JSON.stringify(initialMastery)
  );

  return initialMastery;
}

export function updateMastery(topicId, change) {
  const mastery = getMastery();

  const currentValue = mastery[topicId] ?? 0;

  const newValue = Math.max(
    0,
    Math.min(100, currentValue + change)
  );

  mastery[topicId] = newValue;

  localStorage.setItem(
    MASTERY_KEY,
    JSON.stringify(mastery)
  );

  return newValue;
}
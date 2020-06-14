export const commentSubtexts = (text) =>
  text.split(/[{{}}]+/).map((e) => ({
    text: e,
    isRef: text.includes(`{{${e}}}`)
  }));

export const convertToMiliseconds = (timeText) =>
  timeText.split(':').reduce((acc, time) => 60 * acc + +time) * 1000;

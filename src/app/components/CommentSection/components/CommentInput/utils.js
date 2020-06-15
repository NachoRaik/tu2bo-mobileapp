export const parseComment = (text) =>
  text
    .split(' ')
    .map((e) => {
      if (/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/.test(e)) {
        return e.replace(e, `{{${e}}}`);
      }
      return e;
    })
    .join(' ');

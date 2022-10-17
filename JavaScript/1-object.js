'use strict';

const asyncResult = () => ({
  value: undefined,
  onDone: null,

  done(callback) {
    this.onDone = callback;
    return this;
  },

  resolve(value) {
    this.value = value;
    if (this.onDone) this.onDone(value);
    return this;
  }
});

// Usage

const persons = {
  10: 'Marcus Aurelius',
  11: 'Mao Zedong',
  12: 'Rene Descartes',
};

const getPerson = (id) => {
  const result = asyncResult();
  setTimeout(() => {
    result.resolve({ id, name: persons[id] });
  }, 1000);
  return result;
};

// Subscribe
const d1 = getPerson(10);
d1.done((value) => {
  console.log('Resolved d1', value);
});

// Subscribe after resolve
const d2 = getPerson(11);
setTimeout(() => {
  d2.done((value) => {
    console.log('Resolved d2', value);
  });
}, 1500);

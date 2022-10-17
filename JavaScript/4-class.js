'use strict';

const DEFERRED_PENDING = 0;
const DEFERRED_RESOLVED = 1;
const DEFERRED_REJECTED = 2;

class Deferred {
  constructor(onDone = null, onFail = null) {
    this.value = undefined;
    this.onDone = onDone;
    this.onFail = onFail;
    this.status = DEFERRED_PENDING;
  }

  isPending() {
    return this.status === DEFERRED_PENDING;
  }

  isResolved() {
    return this.status === DEFERRED_RESOLVED;
  }

  isRejected() {
    return this.status === DEFERRED_REJECTED;
  }

  done(callback) {
    this.onDone = callback;
    if (this.isResolved()) callback(this.value);
    return this;
  }

  fail(callback) {
    this.onFail = callback;
    if (this.isRejected()) callback(this.value);
    return this;
  }

  resolve(value) {
    this.value = value;
    this.status = DEFERRED_RESOLVED;
    if (this.onDone) this.onDone(value);
    return this;
  }

  reject(value) {
    this.value = value;
    this.status = DEFERRED_REJECTED;
    if (this.onFail) this.onFail(value);
    return this;
  }
}

// Usage

const persons = {
  10: 'Marcus Aurelius',
  11: 'Mao Zedong',
  12: 'Rene Descartes',
};

const getPerson = (id) => {
  const result = new Deferred();
  setTimeout(() => {
    const name = persons[id];
    if (name) result.resolve({ id, name });
    else result.reject(new Error('Person is not found'));
  }, 1000);
  return result;
};

const d1 = getPerson(10)
  .done((value) => console.log('Resolved d1', value))
  .fail((error) => console.log('Resolved d1', error));
console.dir({ d1 });

const d2 = getPerson(20)
  .done((value) => console.log('Resolved d2', value))
  .fail((error) => console.log('Resolved d2', error.message));
console.dir({ d2 });

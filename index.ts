import './style.css';

import { of, map, Observable, timer, Subscriber, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

const subscriber = {
  next: () => {},
  error: () => {},
  complete: () => {},
};

const observable = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error(1);
    subscriber.complete();
  }, 3000);
});

// observable.subscribe((val) => {
//   console.log(val);
// });

const unsub = new Subject<void>();

const promise = new Promise((resolve, reject) => {
  observable.pipe(takeUntil(unsub)).subscribe({
    next: (v) => resolve(v),
    error: (v) => reject(v),
  });
});

async function main() {
  try {
    console.log(await promise);
    console.info('complete');
  } catch (error) {
    console.error(error);
  }
}

main();
// unsub.next();
// unsub.complete();

// Open the console in the bottom right to see results.

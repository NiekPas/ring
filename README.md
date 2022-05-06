# Ring 

A Typescript implementation of a ring, or circular array, data structure. A `Ring<T>` is a data structure defined by a set of elements `T[]` and an focused element `T`. Rotating the ring clockwise sets focus to the next element; if you keep rotating, the focus will eventually return to the original element.

This library is written in a funcional style: methods on `Ring` return new instances of `Ring` rather than modifying `this`.

## Usage

Basic usage:

```
const ring = new Ring([1, 2, 3, 4, 5]);
console.log(ring.focus());  // => 1
console.log(ring.increment().increment().focus());  // => 3
```

## API

TODO docs.

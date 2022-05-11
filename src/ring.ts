class Ring<T> {

    private elements: T[];
    private focusIndex: number;

    constructor(elements: T[] = [], initialFocus: number = 0) {
        if (initialFocus < 0) {
            throw new TypeError("Ring(): cannot set focus to a negative number.");
        }
        if (elements.length > 0 && initialFocus >= elements.length) {
            throw new TypeError("Ring(): cannot set focus to an index that is out of bounds.");
        }

        this.elements = elements;
        this.focusIndex = initialFocus;
    }

    /**
     * isEmpty
     */
    public get isEmpty(): boolean {
        return this.elements.length < 1;
    }

    /**
     * length
     */
    public get length() {
        return this.elements.length;
    }

    /**
     * focus
     */
    public get focus(): T {
        if (this.isEmpty) {
            throw new TypeError("focus(): cannot retrieve focus from an empty ring.");
        }

        return this.elements[this.focusIndex];
    }

    /**
     * elementAt
     */
    public elementAt(i: number): T {
        if (i === 0) {
           return this.focus;
        }

        else if (i > 0) {
            // If the index is greater than the number of elements in the ring, wrap around the ring
            if (i > this.length - 1) {
                return this.elementAt(i - this.length);
            }
            // Return by index
            return this.toArray()[i];
        }

        else if (i < 0) {
            // If the negative index is less than the number of elements in the ring, wrap around the ring
            if (i < (-1 * (this.length - 1))) {
                return this.elementAt(i + this.length);
            }
            // Return by index
            return this.toArray()[this.length + i];
        }
    }

    /**
     * rotate
     */
    public rotate(n: number): Ring<T> {
        if (n === 0) {
            return this;
        }

        // Negative `n` implies counterclockwise rotations
        if (n < 0) {
            // Recurse to allow counterclockwise 'lapping' rotations
            if ((-1) * n >= this.length) {
                return this.rotate(n + this.length);
            }

            return new Ring(this.elements, this.focusIndex + this.length + n);
        }

        // Recurse to allow 'lapping' rotations
        if (n >= this.length) {
            return this.rotate(n - this.length);
        }

        // Base case: simple incrementation
        return new Ring(this.elements, this.focusIndex + n);
    }

    /**
     * rotateRight
     */
    public rotateRight(): Ring<T> {
        return this.rotate(1);
    }

    /**
     * rotateLeft
     */
    public rotateLeft(): Ring<T> {
        return this.rotate(-1);
    }

    /**
     * findAndRotateTo
     */
    public findAndRotateTo(predicate: (value: T, index: number, ring: Ring<T>) => boolean): Ring<T> {
        const found = this.findIndex(predicate);
        if (found === null) {
            return this;
        }

        return new Ring(this.elements, found);
    }

    /**
     * rotateToValue
     */
    public rotateToValue(value: T): Ring<T> {
        const foundIndex = this.findIndex(el => el === value);

        if (foundIndex === null) {
            return this;
        }
        return new Ring(this.elements, foundIndex);
    }

    /**
     * append
     */
    public append(value: T): Ring<T> {
        const elements = this.toArray().concat([value]);
        return new Ring(elements, this.focusIndex);
    }

    /**
     * take
     */
    public take(n: number): Ring<T> {
        if (n === 0) {
            return new Ring<T>();
        }
        const elements = (n > 0) ? this.toArray() : this.reversed().toArray();
        // Return a new ring with a slice of the current ring.
        return new Ring(elements.slice(0, n), 0);
    }


    /**
     * reversed
     */
    public reversed(): Ring<T> {
        const firstHalf = this.elements.slice(0, this.focusIndex);
        const secondHalf = this.elements.slice(this.focusIndex, this.elements.length);
        const reversedElements = secondHalf.reverse().concat(firstHalf.reverse());

        return new Ring(reversedElements, reversedElements.length - this.focusIndex);
    }

    /**
     * map
     */
    public map<U>(callback: (value: T, index: number, ring: Ring<T>) => U): Ring<U> {
        const mappedElements = this.toArray().map((element, i) => callback(element, i, this));
        return new Ring(mappedElements, 0);
    }

    /**
     * filter
     */
    public filter(predicate: (value: T, index: number, ring: Ring<T>) => boolean): Ring<T> {
        const filteredElements = this.toArray().filter((element, i) => predicate(element, i, this));
        return new Ring(filteredElements, 0);
    }

    /**
     * find
     */
    public find(predicate: (value: T, index: number, ring: Ring<T>) => boolean): T | null {
        return this.toArray().find((element, i) => predicate(element, i, this)) ?? null;
    }

    /**
     * findIndex
     */
    public findIndex(predicate: (value: T, index: number, ring: Ring<T>) => boolean): number | null {
        const foundIndex = this.toArray().findIndex((element, i) => predicate(element, i, this));

        // `Array.prototype.find` returns -1 to signify that the element was not found. I will not stand for that.
        if (foundIndex === -1) {
            return null;
        }
        return foundIndex;
    }

    /**
     * every
     */
    public every(predicate: (value: T, index: number, ring: Ring<T>) => boolean): boolean {
        return this.toArray().every((element, i) => predicate(element, i, this));
    }

    /**
     * some
     */
    public some(predicate: (value: T, index: number, ring: Ring<T>) => boolean): boolean {
        return this.toArray().some((element, i) => predicate(element, i, this));
    }

    /**
     * toArray
     */
    public toArray(): T[] {
        const firstElements = this.elements.slice(0, this.focusIndex);
        const nextElements = this.elements.slice(this.focusIndex, this.elements.length);
        return nextElements.concat(firstElements);
    }

}

export default Ring;

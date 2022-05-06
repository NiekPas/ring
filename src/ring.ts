class Ring<T> {

    private elements: T[];
    private focusIndex: number;

    constructor(elements: T[] = [], initialFocus: number = 0) {
        this.elements = elements;
        this.focusIndex = initialFocus;
    }

    /**
     * focus
     */
    public focus(): T {
        if (this.isEmpty()) {
            throw new TypeError("focus(): cannot retrieve focus from an empty ring.")
        }

        return this.elements[this.focusIndex];
    }

    /**
     * rotate
     */
    public rotate(n: number): Ring<T> {
        return new Ring(this.elements, this.focusIndex + n);
    }

    /**
     * rotateRight
     */
    public  rotateRight(): Ring<T> {
        return this.rotate(1);
    }

    /**
     * rotateLfet
     */
    public rotateLfet(): Ring<T> {
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
     *insertAfter
     */
    public insertAfter(value: T, index: number) {
        // TODO should support negative values of `index`
        const elements = [
            ...this.toArray().slice(0, index),
            value,
            this.toArray().slice(index)
        ];

        return new Ring(elements, 0);
    }

    /**
     * insertBefore
     */
    public insertBefore(value: T, index: number) {
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
     * range
     */
    // public range(start: number, end: number): Ring<T> {
    //     if (start > end) {
    //         throw new TypeError("range(): start index cannot be greater than end index.");
    //     }
    // }

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
     * split
     */
    // public split(i: number): [Ring<T>, Ring<T>] {
    //     return [this.range(0, i), this.range(i + 1, this.elements.length - 1)];
    // }

    /**
     * map
     */
    public map<U>(callback: (value: T, index?: number, ring?: Ring<T>) => U): Ring<U> {
        const mappedElements = this.toArray().map((element, i) => callback(element, i, this));
        return new Ring(mappedElements, 0);
    }

    /**
     * filter
     */
    public filter(predicate: (value: T, index?: number, ring?: Ring<T>) => boolean): Ring<T> {
        const filteredElements = this.toArray().filter((element, i) => predicate(element, i, this));
        return new Ring(filteredElements, 0);
    }

    /**
     * reduce
     */
    // public reduce<U>(callback: (previousValue: U, currentValue: T, currentIndex: number, ring: Ring<T>) => U, initialValue?: U): U {
    //     const reduced = this.toArray().reduce((acc, val, i) => {
    //         return callback(acc, val, i, this)
    //     }, initialValue);
    //     return reduced;
    // }

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

    /**
     * isEmpty
     */
    public isEmpty(): boolean {
        return this.elements.length < 1;
    }

    /**
     * length
     */
    public length() {
        return this.elements.length;
    }
}

export default Ring;

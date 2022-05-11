import Ring from "../src";

const testNumbers = [1, 2, 3, 4, 5, 6];
const testStrings = ["a", "b", "c", "d", "e", "f", "g"];

describe("Ring instantiation", () => {
    test("Should instantiate an empty ring", () => {
        expect(new Ring()).toStrictEqual(new Ring());
        expect(new Ring().toArray()).toStrictEqual([]);
    });

    test("Should instantiate a ring with elements", () => {
        const r = new Ring([1, 2, 3, 4]);

        expect(r).toStrictEqual(new Ring([1, 2, 3, 4]));
        expect(r.toArray()).toStrictEqual([1, 2, 3, 4]);
    });

    test("Should instantiate a ring with elements and focus", () => {
        const r = new Ring([1, 2, 3, 4], 2);

        expect(r.toArray()).toStrictEqual([3, 4, 1, 2]);
        expect(r.focus).toBe(3);
    });
});

describe("Retrieving focus", () => {
    test("should retrieve default focus", () => {
        expect(new Ring([0, 1, 2]).focus).toBe(0);
    });

    test("should not retrieve focus from an empty ring", () => {
        expect(() => {new Ring().focus}).toThrow(TypeError);
    });
});

describe("Inserting elements", () => { }); // TODO
describe("Rotations", () => {
    const r = new Ring(testNumbers);

    test("should perform a single clockwise rotation", () => {
        expect(r.rotate(1).focus).toEqual(2);
    });

    test("should perform multiple clockwise rotations", () => {
        expect(r.rotate(4).focus).toEqual(5);
    });

    test("should perform a lapping clockwise rotation", () => {
        expect(r.rotate(27).focus).toEqual(4);
    });

    test("should perform a single counterclockwise rotation", () => {
        expect(r.rotate(-1).focus).toEqual(6);
    });

    test("should perform multiple counterclockwise rotations", () => {
        expect(r.rotate(-4).focus).toEqual(3);
    });

    test("should perform a lapping counterclockwise rotation", () => {
        expect(r.rotate(-27).focus).toEqual(4);
    });
});

describe("elementAt", () => {
    const r = new Ring(testNumbers);

    test("Should return an element by index", () => {
        expect(r.elementAt(3)).toEqual(4);
    });

    test("Should return an element by negative index", () => {
        expect(r.elementAt(-1)).toEqual(6);
    });

    test("Should return an element by index greater than the length of the ring", () => {
        expect(r.elementAt(8)).toEqual(3);
    });

    test("Should return an element by negative index greater than the length of the ring", () => {
        expect(r.elementAt(-7)).toEqual(6);
    });
});

describe("Take", () => {
    const r = new Ring(testNumbers);

    test("Should return an empty ring when taking zero elements ", () => {
        expect(r.take(0)).toEqual([]);
    });

    test("Should take a single element", () => {
        expect(r.take(1)).toEqual([1]);
    });

    test("Should take several elements", () => {
        expect(r.take(3)).toEqual([1, 2, 3]);
    });

    test("Should return all the elements when `n` is greater than the number of elements in the ring", () => {
        expect(r.take(8)).toEqual([1, 2, 3, 4, 5, 6]);
    })

    test("Should take a single element counterclockwise", () => {
        expect(r.take(-1)).toEqual([1]);
    });

    test("Should take several elements counterclockwise", () => {
        expect(r.take(-4)).toEqual([1, 6, 5, 4]);
    });

    test("Should return all the elements counterclockwise when `n` is greater than the number of elements in the ring", () => {
        expect(r.take(-9)).toEqual([1, 6, 5, 4, 3, 2]);
    });
});

describe("Reversed", () => {
    test("Should reverse an empty ring", () => {
        const r = new Ring();
        expect(r.reversed()).toEqual(new Ring());
    });

    test("Should reverse a ring with one element", () => {
        const ring = new Ring([25]);
        expect(ring.reversed()).toEqual(new Ring([25]));
    });

    test("Should reverse a ring with several elements", () => {
        const ring = new Ring([1, 2, 3]);
        expect(ring.reversed().toArray()).toEqual([1, 3, 2]);
    });

    test("Should reverse a ring with several elements and offset focus", () => {
        const ring = new Ring([1, 2, 3], 1);
        expect(ring.reversed().toArray()).toEqual([2, 1, 3]);
    });

    test("Should be symmetrical", () => {
        const ring = new Ring([1, 2, 3, 4, 5], 3);
        expect(ring.reversed().reversed().toArray()).toEqual([4, 5, 1, 2, 3]);
    });
});

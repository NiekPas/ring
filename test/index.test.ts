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
        expect(new Ring().focus).toThrow(TypeError);
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

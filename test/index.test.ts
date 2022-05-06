import Ring from "../src";

describe("Ring instantiation", () => {
    test("Should instantiate an empty ring", () => {
        expect(new Ring()).toStrictEqual(new Ring());
        expect(new Ring().toArray()).toStrictEqual([]);
    });

    test("Should instantiate a ring with elements", () => {
        const r = new Ring([1,2,3,4]);

        expect(r).toStrictEqual(new Ring([1,2,3,4]));
        expect(r.toArray()).toStrictEqual([1,2,3,4]);
    });

    test("Should instantiate a ring with elements and focus", () => {
        const r = new Ring([1,2,3,4], 2);

        expect(r.toArray()).toStrictEqual([3,4,1,2]);
        expect(r.focus()).toBe(3);
    });
});

describe("Retrieving focus", () => {
    test("should retrieve default focus", () => {
        expect(new Ring([0,1,2]).focus()).toBe(0);
    });

    test("should not retrieve focus from an empty ring", () => {
        expect(new Ring().focus).toThrow(TypeError);
    });
});

describe("Inserting elements", () => {})
describe("Rotations", () => {});

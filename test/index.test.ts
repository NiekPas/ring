import Ring from "../src";

describe("Ring test", () => {
    test("Should instantiate an empty ring", () => {
        expect(new Ring()).toStrictEqual(new Ring());
        expect(new Ring().toArray()).toStrictEqual([]);
    })
});

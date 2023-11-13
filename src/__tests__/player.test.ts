import { PlayerGameSim } from "../core/player";
import { genPlayer } from "../core/player/genPlayer";

describe("PlayerGameSim", () => {
    let p = new PlayerGameSim();

    beforeEach(() => {
        p = genPlayer();
    });

    test("should have a name", () => {
        expect(p.name).toBeDefined();
    });

    test("should have a height", () => {
        expect(p.heightInInches).toBeDefined();
    });

    test("should have a position", () => {
        expect(p.pos).toBeDefined();
    });

    test("should have an archetype", () => {
        expect(p.archetype).toBeDefined();
    });

    test("should have ratings", () => {
        expect(p.rating).toBeDefined();
    });

    test("should have a composite rating", () => {
        expect(p.rating.composite).toBeDefined();
    });

    test("should have a composite rating that is an object", () => {
        expect(typeof p.rating.composite).toBe("object");
    });
});
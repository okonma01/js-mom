import { PlayerGameSim } from "../core/player";
import { genPlayer } from "../core/player/genPlayer";

describe("Test player.index", () => {
    let p = new PlayerGameSim();

    test("should have a defined player id", () => {
        expect(p.id).toBeDefined();
    });
    
    test("should have a valid player id", () => {
        expect(typeof p.id).toBe("string");
    });

    test("should have a name", () => {
        expect(p.name).toBeDefined();
    });

    test("should have a name of type string", () => {
        expect(typeof p.name).toBe("string");
    });

    test("should have a height", () => {
        expect(p.heightInInches).toBeDefined();
    });

    test("should have a height of type number", () => {
        expect(typeof p.heightInInches).toBe("number");
    });

    test("should have an archetype", () => {
        expect(p.archetype).toBeDefined();
    });

    test("should have an archetype list", () => {
        expect(typeof p.archetype).toBe("object");
    });

    test("should have a position", () => {
        expect(p.pos).toBeDefined();
    });

    test("should have a ratings object", () => {
        expect(p.rating).toBeDefined();
    });

    test("should have composite ratings", () => {
        expect(p.rating.composite).toBeDefined();
    });

    test("should have a composite rating that is an object", () => {
        expect(typeof p.rating.composite).toBe("object");
    });
});

describe("Test player.genPlayer", () => {
    describe("Test player.genPlayer() with no arguments", () => {
        let p = genPlayer();

        test("should have a defined player id", () => {
            expect(p.id).toBeDefined();
        });
        
        test("should have a valid player id", () => {
            expect(typeof p.id).toBe("string");
        });

        test("should have a name", () => {
            expect(p.name).toBeDefined();
        });

        test("should have a name of type string", () => {
            expect(typeof p.name).toBe("string");
        });

        test("should have a height", () => {
            expect(p.heightInInches).toBeDefined();
        });

        test("should have a height of type number", () => {
            expect(typeof p.heightInInches).toBe("number");
        });

        test("should have an archetype", () => {
            expect(p.archetype).toBeDefined();
        });

        test("should have an archetype list", () => {
            expect(typeof p.archetype).toBe("object");
        });

        test("should have a position", () => {
            expect(p.pos).toBeDefined();
        });

        test("should have a ratings object", () => {
            expect(p.rating).toBeDefined();
        });

        test("each rating should be >= 0", () => {
            for (const key in p.rating) {
                if (key === "composite") continue;
                if (p.rating.hasOwnProperty(key)) {
                    expect(p.rating[key]).toBeGreaterThanOrEqual(0);
                }
            }
        });

        test("each rating should be <= 20", () => {
            for (const key in p.rating) {
                if (key === "composite") continue;
                if (p.rating.hasOwnProperty(key)) {
                    expect(p.rating[key]).toBeLessThanOrEqual(20);
                }
            }
        });

        test("should have composite ratings", () => {
            expect(p.rating.composite).toBeDefined();
        });

        test("should have a composite rating that is an object", () => {
            expect(typeof p.rating.composite).toBe("object");
        });

        test("each composite rating should be >= 0", () => {
            // debugger;
            for (const key in p.rating.composite) {
                if (p.rating.composite.hasOwnProperty(key)) {
                    expect(p.rating.composite[key]).toBeGreaterThanOrEqual(0);
                }
            }
        });

        test("each composite rating should be <= 20", () => {
            for (const key in p.rating.composite) {
                if (p.rating.composite.hasOwnProperty(key)) {
                    expect(p.rating.composite[key]).toBeLessThanOrEqual(20);
                }
            }
        });

    });

    describe("Test player.genPlayer() with invalid argument", () => {
        test("should return error when posNo < 0", () => {
            expect(() => genPlayer(-1)).toThrow();
        });

        test("should return error when posNo > 5", () => {
            expect(() => genPlayer(6)).toThrow();
        });
    });

});
import { TeamGameSim } from "../core/team";
import { genTeam } from "../core/team/genTeam";

describe("Test team.index", () => {
    let t = new TeamGameSim();

    test("should have a defined team id", () => {
        expect(t.id).toBeDefined();
    });

    test("should have a valid team id", () => {
        expect(typeof t.id).toBe("string");
    });

    test("should have a name", () => {
        expect(t.name).toBeDefined();
    });

    test("should have a name of type string", () => {
        expect(typeof t.name).toBe("string");
    });

    test("should have a list of players", () => {
        expect(t.players).toBeDefined();
    });

    test("should have a list of players of type array", () => {
        expect(typeof t.players).toBe("object");
    });

    test("should have a lineup", () => {
        expect(t.lineup).toBeDefined();
    });

    test("should have a lineup of type array", () => {
        expect(typeof t.lineup).toBe("object");
    });

    test("should have a bench", () => {
        expect(t.bench).toBeDefined();
    });

    test("should have a bench of type array", () => {
        expect(typeof t.bench).toBe("object");
    });

    test("should have a stat object", () => {
        expect(t.stat).toBeDefined();
    });

    test("should have a stat object of type object", () => {
        expect(typeof t.stat).toBe("object");
    });
});

describe("Test team.genTeam", () => {
    let t = genTeam();

    test("should have a defined team id", () => {
        expect(t.id).toBeDefined();
    });

    test("should have a valid team id", () => {
        expect(typeof t.id).toBe("string");
    });

    test("should have a name", () => {
        expect(t.name).toBeDefined();
    });

    test("should have a name of type string", () => {
        expect(typeof t.name).toBe("string");
    });

    test("should have a list of players", () => {
        expect(t.players).toBeDefined();
    });

    test("should have a list of players of type array", () => {
        expect(typeof t.players).toBe("object");
    });

    test("should have a lineup", () => {
        expect(t.lineup).toBeDefined();
    });

    test("should have a lineup of type array", () => {
        expect(typeof t.lineup).toBe("object");
    });

    test("should have a bench", () => {
        expect(t.bench).toBeDefined();
    });

    test("should have a bench of type array", () => {
        expect(typeof t.bench).toBe("object");
    });

    test("should have a stat object", () => {
        expect(t.stat).toBeDefined();
    });

    test("should have a stat object of type object", () => {
        expect(typeof t.stat).toBe("object");
    });
});


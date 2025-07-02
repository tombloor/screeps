describe("Smokey Bot Main Loop", () => {
    test("should log the current game tick and message", () => {
        // Mock the Game object
        global.Game = {
            time: 12345,
            cpu: {} as any,
            creeps: {} as any,
            flags: {} as any,
            gcl: {} as any,
            map: {} as any,
            market: {} as any,
            resources: {} as any,
            rooms: {} as any,
            shards: {} as any,
            spawns: {} as any,
            structures: {} as any,
            getObjectById: jest.fn(),
            getRoom: jest.fn(),
            notify: jest.fn(),
        } as any;

        // Import the loop function from main.ts
        const { loop } = require("../src/main");

        // Spy on console.log
        console.log = jest.fn();

        // Call the loop function
        loop();

        // Check if console.log was called with the correct arguments
        expect(console.log).toHaveBeenCalledWith("Current game tick is 12345");
    });
});
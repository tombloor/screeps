import { get_message } from "./test";

export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);

  console.log(get_message());
};
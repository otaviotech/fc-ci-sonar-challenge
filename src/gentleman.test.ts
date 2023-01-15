import { Gentleman } from "./gentleman";

const sut = new Gentleman();

describe("Gentleman", () => {
  const assertions = [
    { input: "Bob", output: "Hello, Bob." },
    { input: undefined, output: "Hello, my friend." },
  ];

  it.each(assertions)("should greet ($input)", (assertion) => {
    const { input, output } = assertion;
    const result = sut.greet(input);

    expect(result).toEqual(output);
  });
});

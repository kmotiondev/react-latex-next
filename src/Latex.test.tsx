import * as React from "react";
import { render } from "@testing-library/react";
import Latex from "./Latex";

describe("Latex", () => {
  it("renders text that has multiple LaTeX formulas with $ delimiter", () => {
    const latex =
      "three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.";
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container).toMatchSnapshot();
  });

  it("renders text that has multiple LaTeX formulas with $$ delimiter", () => {
    const latex =
      "three processes $$e^+e^-$$, gluon-gluon and $$\\gamma\\gamma \\to W t\\bar b$$.";
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container).toMatchSnapshot();
  });

  it("renders text that has a LaTeX formula with custom delimiter", () => {
    const latex = "three processes <math e^+e^- math>";
    const delimiters = [{ left: "<math ", right: " math>", display: true }];
    const { container } = render(
      <Latex delimiters={delimiters}>{latex}</Latex>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders raw LaTeX incase of error by default", () => {
    const latex = "Broken formulate: $\\to W t\\bar b$.";
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container).toMatchSnapshot();
  });

  it("throws error incase of error with strict mode", () => {
    const latex = "Broken formula: $\\invalidCommand$";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<Latex strict>{latex}</Latex>);
    }).toThrow();

    consoleSpy.mockRestore();
  });

  it("renders correctly sequences of $..$", () => {
    const latex = "$hello$$world$$boo$";
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container).toMatchSnapshot();
  });

  it("renders an expression with macros", () => {
    const latex = "$\\R$";
    const { container } = render(
      <Latex macros={{ "\\R": "\\mathbb{R}" }}>{latex}</Latex>,
    );
    expect(container).toMatchSnapshot();
  });

  it("handles multiple children inside the node", () => {
    const latex = "$1 \\times 2$";
    const { container } = render(<Latex>Label: {latex}</Latex>);
    expect(container).toMatchSnapshot();
  });
});

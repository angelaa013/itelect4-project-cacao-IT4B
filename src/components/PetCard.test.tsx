import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PetCard from "./PetCard";
import { Gender, PetType, type Pet } from "../types";

const samplePet: Pet = {
  id: 42,
  name: "Luna",
  type: PetType.Dog,
  breed: "Beagle",
  age: 3,
  gender: Gender.Female,
  description: "A gentle dog who enjoys walks.",
};

describe("PetCard", () => {
  it("shows the compact card text when isCompact is true", () => {
    render(<PetCard pet={samplePet} isCompact />);

    expect(screen.getByRole("heading", { name: "🐕 Luna" })).toBeInTheDocument();
    expect(screen.getByText("Beagle • 3 years")).toBeInTheDocument();
    expect(screen.queryByText("A gentle dog who enjoys walks.")).not.toBeInTheDocument();
  });

  it("shows the full card text when isCompact is false", () => {
    render(<PetCard pet={samplePet} isCompact={false} />);

    expect(screen.getByRole("heading", { name: "Luna" })).toBeInTheDocument();
    expect(screen.getByText('"A gentle dog who enjoys walks."')).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "🐕 Luna" })).not.toBeInTheDocument();
  });
});

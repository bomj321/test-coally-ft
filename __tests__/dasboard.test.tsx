import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Dashboard from "../app/(admin)/dashboard/page";
import { renderWithProviders } from "@lib/utils-for-tests";
import { CleaningConsole } from "@lib/CleaningConsole";

beforeEach(() => {
  CleaningConsole();
});

describe("Basic elements", () => {
  it("renders the image", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByAltText("logo");
      expect(button).not.toBeNull();
    });
  });

  it("renders a button title", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByText("Tarea");
      expect(button).not.toBeNull();
    });
  });

  it("renders the Table", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByRole("table");
      expect(button).not.toBeNull();
    });
  });
});

describe("Click events", () => {
  it("Clicking button to open a modal", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByText("Tarea");
      fireEvent.click(button);
      const modal = screen.getByRole("dialog");
      expect(modal).not.toBeNull();
    });
  });
});

import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import BasicActions from "@components/TableExtensions/BasicActions";
import { renderWithProviders } from "@lib/utils-for-tests";
import { CleaningConsole } from "@lib/CleaningConsole";

beforeEach(() => {
  CleaningConsole();
});

describe("Basic elements", () => {
  it("renders buttons", async () => {
    const { container } = renderWithProviders(
      <BasicActions
        handleEdit={() => console.log("testing")}
        handleDelete={() => console.log("testing")}
      />
    );
    await waitFor(() => {
      const buttons = container.querySelector(`button[data-pc-name="button"]`);
      expect(buttons).not.toBeNull();
    });
  });
});

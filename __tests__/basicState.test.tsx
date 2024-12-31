import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import BasicStates from "@components/TableExtensions/BasicStates";
import { renderWithProviders } from "@lib/utils-for-tests";
import { State } from "@enums/StateEnum";
import { CleaningConsole } from "@lib/CleaningConsole";

beforeEach(() => {
  CleaningConsole();
});

describe("Basic elements", () => {
  it("renders the element", async () => {
    const { container } = renderWithProviders(
      <BasicStates state={State.COMPLETED} />
    );
    await waitFor(() => {
      const span = container.querySelector(`span[data-pc-name="badge"]`);
      expect(span).not.toBeNull();
    });
  });

  it("Verify if is rendering with correct text", async () => {
    const { container } = renderWithProviders(
      <BasicStates state={State.COMPLETED} />
    );
    await waitFor(() => {
      const span = container.querySelector(`span[data-pc-name="badge"]`);
      expect(span).toHaveTextContent("Completado");
    });
  });
});

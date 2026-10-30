import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ReviewPage from "./ReviewPage";

function renderReviewPage() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ReviewPage />
    </QueryClientProvider>,
  );
}

describe("ReviewPage validation", () => {
  it("shows the schema message and does not send a request for invalid input", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderReviewPage();

    await user.type(screen.getByLabelText("Project description"), "Too short");
    await user.click(screen.getByRole("button", { name: "Review my project" }));

    expect(
      await screen.findByText("Describe your project in at least 20 characters."),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

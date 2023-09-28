/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "../App";

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

describe("App - Component Test", () => {
  it("should render properly", () => {
    const appHeading = screen.getByText("Weather app");
    expect(appHeading).toBeTruthy();
  });
});

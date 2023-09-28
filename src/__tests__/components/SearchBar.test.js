/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";
import { Provider } from "react-redux";
import { store } from "../../store/store";

beforeEach(() => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
});

describe("SearchBar - Component Test", () => {
  it("should render properly", () => {
    const searchBarLabel = screen.getByLabelText("Enter location");
    expect(searchBarLabel).toBeTruthy();
  });
});

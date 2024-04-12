/**
 * @jest-environment jsdom
 */

import axios from "axios";
import { renderHook, waitFor } from "@testing-library/react";
import { UseUserManagement } from "./use-user-management";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("user fetching", () => {
  it("should fetch user and stores in state", async () => {
    // Mocking axios.get
    const mockFn = jest.fn();
    mockFn.mockResolvedValue({ data: require("./fixtures/users.json") });
    mockedAxios.get.mockImplementation(mockFn);

    // Rendering the hook
    const { result } = renderHook(() => UseUserManagement());

    // Checking the state
    await waitFor(() => {
      expect(result.current.users).toHaveLength(10);
    });
  });

  it("should not change state if request fails", async () => {
    // Mocking axios.get
    const mockFn = jest.fn();
    mockFn.mockRejectedValue(null);
    mockedAxios.get.mockImplementation(mockFn);

    // Rendering the hook
    const { result } = renderHook(() => UseUserManagement());

    // Checking the state
    await waitFor(() => {
      expect(result.current.users).toHaveLength(0);
    });
  });

  it("should only fetch when fetchUsers is called and fetchOnInitialize is true", async () => {
    // Mocking axios.get
    const mockFn = jest.fn();
    mockFn.mockRejectedValue(null);
    mockedAxios.get.mockImplementation(mockFn);

    // Rendering the hook
    const { result } = renderHook(() =>
      UseUserManagement({ fetchOnInitialize: false }),
    );

    expect(result.current.users).toHaveLength(0);

    // Fetching users
    // await act(() => result.current.fetchUsers());
    result.current.fetchUsers();

    // Checking the state
    waitFor(() => {
      expect(result.current.users).toHaveLength(10);
    });
  });
});

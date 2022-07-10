import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/login";

// 로그인 관련 테스트

describe("로그인 폼 입력 테스트", () => {
  render(<Login />);

  test("아이디나 비밀번호 입력 안하고 로그인 시도", async () => {
    const idInput = screen.getByRole("textbox", { name: /userId/i });
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    const loginBtn = screen.getByRole("button", { name: "로그인" });

    userEvent.clear(idInput);
    userEvent.clear(passwordInput);
    userEvent.click(loginBtn);

    const errorMsg = await screen.findByRole("text", {
      name: /아이디와 비밀번호를 입력해주세요/,
    });
    expect(errorMsg).toBeInTheDocument();
    expect(idInput).toHaveFocus();
  });

  test("로그인 실패 시, 에러 메세지 출력", async () => {
    const idInput = screen.getByRole("textbox", { name: /userId/i });
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    const loginBtn = screen.getByRole("button", { name: "로그인" });

    userEvent.clear(idInput);
    userEvent.type(idInput, "invalidId");
    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, "aaaaaa");
    userEvent.click(loginBtn);

    const errorMsg = await screen.findByRole("text", {
      name: /아이디 또는 비밀번호를 잘못 입력하셨습니다/,
    });
    expect(errorMsg).toBeInTheDocument();
    expect(idInput).toHaveFocus();
  });
});

// 논의 후 추후에..
describe("아이디 찾기, 비밀번호 찾기 테스트", () => {});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/pages/login";
import RegisterForm from "../src/pages/register/registerForm";
import RegisterSetting from "../src/pages/register/registerSetting";

// 회원가입 관련 test code

describe("회원가입 폼 유효성 검사 테스트", () => {
  render(<RegisterForm />);

  test("이미 가입되어 있는 이메일일 경우, 이메일 칸 포커싱되고 경고 문구 출력", async () => {
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    userEvent.clear(emailInput);
    userEvent.type(emailInput, "existingEmail");

    const checkBtn = screen.getByRole("button", { name: "이메일 인증" });
    userEvent.click(checkBtn);

    const errorMsg = await screen.findByRole("text", {
      name: "이미 가입된 이메일입니다.",
    });
    expect(errorMsg).toBeInTheDocument();
  });

  test("아이디 입력 후 중복확인 눌렀을 때 중복이면 아이디 칸 포커싱되고 경고문구 출력", async () => {
    const idInput = screen.getByRole("textbox", { name: /userid/i });
    userEvent.clear(idInput);
    userEvent.type(idInput, "existingId");

    const checkBtn = screen.getByRole("button", { name: /duplicate check/i });
    userEvent.click(checkBtn);

    const errorMsg = await screen.findByRole("text", {
      name: "중복된 아이디입니다.",
    });

    // 아이디 칸 포커스 및 경고문구 비동기적으로 나타나는지
    expect(idInput).toHaveFocus();
    expect(errorMsg).toBeInTheDocument();
  });

  test("아이디 입력 후 중복확인 눌렀을 때 중복 아닌 경우 확인 문구 출력", async () => {
    const idInput = screen.getByRole("textbox", { name: /userid/i });
    userEvent.clear(idInput);
    userEvent.type(idInput, "newId");

    const checkBtn = screen.getByRole("button", { name: /duplicate check/i });
    userEvent.click(checkBtn);

    const confirmMsg = await screen.findByRole("text", {
      name: "사용가능한 아이디입니다.",
    });
    expect(confirmMsg).toBeInTheDocument();
  });

  test("비밀번호와 재확인 비밀번호 불일치할 경우, 비밀번호와 비밀번호 재확인 칸에 포커싱되고 경고문구 출력", async () => {
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    const repeatPassword = screen.getByRole("textbox", {
      name: /repeatPassword/i,
    });

    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, "aaa111!!");
    userEvent.clear(repeatPassword);
    userEvent.type(repeatPassword, "vvvvvvvv");

    const errorMsg = await screen.findByRole("text", {
      name: "비밀번호가 일치하지 않습니다.",
    });
    expect(repeatPassword).toHaveFocus();
    expect(errorMsg).toBeInTheDocument();
  });
});

describe("아바타 설정 및 가입 완료 테스트", () => {
  render(<RegisterSetting />);

  test("성별 및 피부색 선택 시 아바타가 선택사항대로 출력", () => {
    const target = <></>; // 타겟이 될 아바타
    const checkMale = screen.getByRole("checkbox", { name: /male/i });
    userEvent.click(checkMale);

    const checkWhite = screen.getByRole("checkbox", { name: /white/i });
    userEvent.click(checkWhite);

    // 성별 및 피부색 선택 시 아바타 제대로 출력되는지
    const avartar = screen.getByRole("img", { name: /settingAvartar/i });
    expect(avartar).toEqual(target);
  });

  test("가입 완료 시 로그인 페이지로 이동", () => {
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtn);

    expect(render(<Login />)).toBeInTheDocument();
  });
});

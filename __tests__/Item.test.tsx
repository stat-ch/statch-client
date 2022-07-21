import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Inventory from "../src/pages/inventory";
import Mint from "../src/pages/mint";
import RandomBox from "../src/pages/randombox/buyRandombox";
import RandomBoxResult from "../src/pages/randombox/randomboxResult";

// 랜덤박스 관련
describe("랜덤박스 관련 테스트", () => {
  render(<RandomBox />);
  // 뽑기 결과 대로 기존 아바타에 장착되어 출력
  test("랜덤박스 결과가 아바타에 장착되어야 한다", () => {});

  // 다시 뽑기
  test("다시 뽑기 진행 시, 새로운 결과가 나타난다", async () => {
    const screen = render(<RandomBoxResult />);
    const rerollBtn = screen.getByRole("button", { name: /reroll/i });
    const result = screen.getByRole("text", { name: /description of result/i });

    userEvent.click(rerollBtn);
    const newResult = await screen.findByRole("text", {
      name: /description of result/i,
    });
    expect(result.textContent).not.toEqual(newResult.textContent);
  });

  // 인벤토리에 저장
  // 바로 민팅페이지로 이동
});

describe("인벤토리 및 민팅 관련", () => {
  render(<Inventory />);

  // 아이템 장착
  test("인벤토리창에서 아이템 선택 시, 아바타에 장착됨", () => {});

  // 민팅 기능
  test("민팅 버튼 클릭 시, 장착된 아바타 그대로 민팅페이지에 출력된다", () => {
    const mintBtn = screen.getByRole("button", { name: /mint it/i });
    const target = screen.getByRole("text", { name: /item/i });

    userEvent.click(mintBtn);
    expect(render(<Mint />)).toHaveTextContent(String(target.textContent));
  });

  test("민팅 폼 입력 테스트", () => {
    const screen = render(<Mint />);
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const descInput = screen.getByRole("textbox", { name: /description/i });
    const submitBtn = screen.getByRole("button", { name: /mint/i });

    userEvent.clear(nameInput);
    userEvent.click(submitBtn);
    expect(nameInput).toHaveFocus();

    userEvent.type(nameInput, "aaaaaaaa");
    userEvent.clear(descInput);
    userEvent.click(submitBtn);
    expect(descInput).toHaveFocus();
  });
});


import {
  findByRole,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatRoom from "../src/pages/game/[chatRoom]";
import ChatRoomList from "../src/pages/game/chatRoomList";
import Transaction from "../src/pages/transaction";

// 채팅 관련 테스트
describe("채팅 방 관련 테스트", () => {
  render(<ChatRoomList />);
  test("1번 채팅 방 입장", () => {
    const firstRoom = screen.getByRole("button", { name: /firstroom/i });
    userEvent.click(firstRoom);

    expect(render(<ChatRoom />)).toBeInTheDocument();
  });

  test("문자열 입력 시 채팅 화면에 출력되어야 함", async () => {
    const chatInput = screen.getByRole("text", { name: /채팅 입력/ });
    userEvent.clear(chatInput);
    userEvent.type(chatInput, "안녕하세요");

    const newChat = await screen.findByRole("text", { name: "안녕하세요" });
    expect(newChat).toBeInTheDocument();
  });

  test("아바타 이동", () => {});

  test("다른 유저의 아바타 클릭 시, 해당 유저의 프로필 확인 및 친구 신청 가능", async () => {
    const user = screen.getByRole("img", { name: /user/i });
    userEvent.click(user);

    const profile = await screen.findByRole("application", {
      name: /user profile/i,
    });
    expect(profile).toBeInTheDocument();

    const sendFriendReq = await screen.findByRole("button", {
      name: /친구 신청 보내기/,
    });
    userEvent.click(sendFriendReq);

    // 친구 신청 성공, 완료 메세지 출력
    const successMsg = await screen.findByRole("text", {
      name: /친구 신청을 보냈습니다/,
    });
    expect(successMsg).toBeInTheDocument();
  });
});

describe("채팅 내 교환 기능 테스트", () => {
  // 교환을 채팅방 내에 특정 유저에게 신청하기
  test("교환 요청 시, 채팅방 내에 교환 신청 목록이 나타난다", async () => {
    const user = screen.getByRole("img", { name: /user/i });
    userEvent.click(user);

    const requestBtn = await screen.findByRole("button", {
      name: /교환 신청하기/i,
    });
    userEvent.click(requestBtn);

    const requestList = await screen.findByRole("list", {
      name: /교환 신청 목록/,
    });
    expect(requestList).toHaveLength(1);
  });

  // 교환 신청 수락 및 거절
  test("교환 요청을 수락하면, 교환 창이 출력된다.", () => {
    const accept = screen.getByRole("checkbox", { name: /accept reqeust/i });
    userEvent.click(accept);
    expect(render(<Transaction />)).toBeInTheDocument();
  });

  // 교환 기능
  test("아이템 선택 시 교환 창에 올라간다.", () => {});
});

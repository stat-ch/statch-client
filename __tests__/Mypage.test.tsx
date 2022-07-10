import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FriendList from "../pages/friends/friendList";
import FriendRequestList from "../pages/friends/friendReqeustList";
import ChatRoom from "../pages/game/[chatRoom]";
import Created from "../pages/mypage/created";
import MyPage from "../pages/mypage/mypage";
import Profile from "../pages/mypage/profile";

describe("MyPage 관련 테스트", () => {
  render(<MyPage />);

  // profile
  test("Profile에서 닉네임 및 인삿말을 수정할 수 있다", async () => {
    const screen = render(<Profile />);
    const nickName = screen.getByRole("text", { name: /nickname/i });
    userEvent.dblClick(nickName);

    const ninkNameInput = await screen.findByRole("textbox", {
      name: /nickname/i,
    });
    expect(ninkNameInput).toBeInTheDocument();

    const profileMsg = screen.getByRole("text", { name: /profileMsg/i });
    userEvent.dblClick(profileMsg);

    const profileMsgInput = await screen.findByRole("textbox", {
      name: /profileMsg/i,
    });
    expect(profileMsgInput).toBeInTheDocument();
  });

  // created, collected
  // NFT 선택 시 아바타 NFT 모양대로 변경, 버튼 클릭 시 NFTDetail로 이동
  test("created 목록 중 한 NFT 선택 시, 해당 NFT의 아바타, 이름, 설명, owner가 제대로 출력되어야 한다", () => {
    const screen = render(<Created />);
  });

  // 메인 프로필 (collected에서 NFT로 설정하는지 아니면 인벤토리에서 아이템을 장착하여 설정하는지..)
  test("메인 프로필 설정", () => {});
});

describe("친구 관련 테스트", () => {
  // 친구 목록
  render(<FriendList />);

  // 신청 수락 및 거절
  test("친구 신청 수락 시, 친구 리스트에 새로운 친구가 추가된다", async () => {
    const { getByRole } = render(<FriendRequestList />);
    const acceptBtn = getByRole("button", { name: /수락/ });
    userEvent.click(acceptBtn);

    const friends = await screen.findAllByLabelText(/friend/);
    expect(friends).toHaveLength(1);
  });

  // 친구에게 DM으로 채팅 걸기
  test("친구 목록에 있는 친구에게 DM 전송 버튼을 클릭하면 채팅 화면이 나타난다", () => {
    const DMBtn = screen.getByRole("button", { name: /dm/i });
    userEvent.click(DMBtn);

    expect(<ChatRoom />).toBeInTheDocument();
  });
});

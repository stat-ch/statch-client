import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuctionPlace from "../src/pages/nft/auctionPlace";
import NFTDetail from "../src/pages/nft/nftDetail";

// auction place

describe("NFT Auction place 관련 테스트", () => {
  // 검색 기능
  test("검색어 입력 시 이름, 설명에 검색어가 포함된 NFT들이 검색결과로 출력된다", () => {
    render(<AuctionPlace />);
    const search = screen.getByRole("searchbox");
    userEvent.clear(search);
    userEvent.type(search, "example");

    const btn = screen.getByRole("button", { name: /search/i });
    userEvent.click(btn);

    // 검색 결과 서버에서 받아올 경우 핸들러 작성 필요

    const target = <></>; // 결과로 나올 엘리먼트
    const invalidTarget = <></>; // 검색어에 해당하지 않는 엘리먼트
    expect(target).toBeInTheDocument();
    expect(invalidTarget).not.toBeInTheDocument();
  });

  // 필터 기능
  test("필터 목록에서 필터 선택 시, 전제 NFT 리스트에 반영되어 출력된다", () => {
    // 어떤 선택지로 테스트 할 지 결정되면 name 변경
    const check = screen.getByRole("checkbox", { name: /onAcuntion/i });
    userEvent.click(check);

    const target = <></>; // 결과로 나올 엘리먼트
    const invalidTarget = <></>; // 검색어에 해당하지 않는 엘리먼트
    expect(target).toBeInTheDocument();
    expect(invalidTarget).not.toBeInTheDocument();
  });

  // detail
  // 경매 기능
  test("입찰 시 입찰 내역에 새로운 입찰이 출력된다.", async () => {
    const screen = render(<NFTDetail />);
    const bidBtn = screen.getByRole("button", { name: /입찰/ });
    userEvent.click(bidBtn);

    const bidInput = await screen.findByRole("textbox", { name: /입찰 가격/ });
    userEvent.clear(bidInput);
    userEvent.type(bidInput, "0.5");

    const bidList = await screen.findAllByRole("text", { name: /bid/i });
    expect(bidList).toHaveLength(1);
  });

  test("입찰 시, 최고 입찰가 이하의 금액 입력 시 경고 문구가 출력된다", async () => {
    const screen = render(<NFTDetail />);
    const bidBtn = screen.getByRole("button", { name: /입찰/ });
    userEvent.click(bidBtn);

    const bestBid = screen.getByRole("text", { name: /최고 입찰가/i });
    bestBid.textContent = "1";

    const bidInput = await screen.findByRole("textbox", { name: /입찰 가격/ });
    userEvent.clear(bidInput);
    userEvent.type(bidInput, "0.5");

    const errorMsg = await screen.findByRole("text", {
      name: /현재 최고 입찰가 이상의 금액만 입력 가능합니다/,
    });
    expect(errorMsg).toBeInTheDocument();
  });

  test("경매 시간이 종료된 후, ", () => {
    // 경매 관련 자세한 로직 설계 후 테스트 코드 작성 예정
  });
});

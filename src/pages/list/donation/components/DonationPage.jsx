import { useEffect, useState, useRef } from "react";
import { fetchDonations } from "../../../../apis/donationApi";
import Card from "./Card";
import * as S from "../styles/DonationPage.styles";
import BtnArrow from "../../../../components/buttons/BtnArrow";

const ITEMS_PER_PAGE = 4; // 한 번에 보이는 카드 개수
const CARD_WIDTH = 282.5 + 40;

const DonationPage = () => {
  const [donations, setDonations] = useState([]); // API에서 불러온 후원 데이터
  const [cursor, setCursor] = useState(0); // 페이지네이션을 위한 커서 값
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const carouselRef = useRef(null); //useRef 훅을 사용해 carouselRef라는 참조 생성 -> <S.CardGrid> 요소 참조

  // API 호출 -> 후원 목록 가져오기
  useEffect(() => {
    const loadDonations = async () => {
      try {
        setLoading(true);
        const { list, nextCursor } = await fetchDonations(cursor, 200); // 200개 페이지 가져오기
        setDonations(list);
        setCursor(nextCursor || 0); // 다음 커서 값 저장 (없으면 0 유지)
      } catch (error) {
        console.error("후원 데이터를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    loadDonations();
  }, []);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(donations.length / ITEMS_PER_PAGE);

  // 왼쪽 버튼 클릭 시 (이전 4개)
  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        // 현재 스크롤 위치를 기준으로 특정 거리만큼 이동하는 기능의 메서드
        left: -CARD_WIDTH * ITEMS_PER_PAGE, // 왼쪽으로 4개 이동
        behavior: "smooth",
      });
      setCurrentPage((prev) => prev - 1);
    }
  };

  // 오른쪽 버튼 클릭 시 (다음 4개)
  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: CARD_WIDTH * ITEMS_PER_PAGE, // 오른쪽으로 4개 이동
        behavior: "smooth",
      });
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <S.PageContainer>
      <S.Header>후원을 기다리는 조공</S.Header>
      <S.CarouselContainer>
        {currentPage > 0 && <BtnArrow onClick={prevSlide} />}
        <S.CardGrid
          $cardWidth={CARD_WIDTH}
          $itemsPerPage={ITEMS_PER_PAGE}
          ref={carouselRef}
        >
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Card key={index} isLoading={true} />
            ))
          ) : donations.length > 0 ? (
            donations.map((donation) => (
              <Card key={donation.id} donation={donation} />
            ))
          ) : (
            <p>등록된 후원이 없습니다.</p>
          )}
        </S.CardGrid>
        {currentPage < totalPages - 1 && (
          <BtnArrow isRight onClick={nextSlide} />
        )}
      </S.CarouselContainer>
    </S.PageContainer>
  );
};

export default DonationPage;

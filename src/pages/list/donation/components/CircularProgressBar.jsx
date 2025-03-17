import * as S from "../styles/circular-progress-bar.styles.js";
import checkIcon from "../../../../assets/icons/check-icon.png";

function CircularProgressBar({ progress }) {
  const isOver100 = progress >= 100;

  return (
    <S.Container>
      {isOver100 ? (
        <S.CheckImage src={checkIcon} alt="진행률 100% 완료" />
      ) : (
        <svg width="16" height="16" viewBox="0 0 36 36">
          <S.CircleBackground cx="18" cy="18" r="15.915" />
          <S.CircleProgress cx="18" cy="18" r="15.915" progress={progress} />
        </svg>
      )}
    </S.Container>
  );
}

export default CircularProgressBar;

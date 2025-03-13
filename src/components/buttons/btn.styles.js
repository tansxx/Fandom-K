import styled from "styled-components";
import typography from "../../utils/typography";
import colors from "../../utils/colors";

// 공통 스타일
export const BtnBase = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 42px;
    gap: 10px;
    border: none;
    border-radius: 8px;
    padding: 8px;

    ${typography("b14")}
    text-align: center;

    cursor: pointer;
`;

// Btn과 BtnIco 스타일
export const BtnStyled = styled(BtnBase)`
    background: ${(props) =>
        props.disabled === 'disabled' ? colors("gray")(props) : colors("primaryGradient90")(props)};
    color: ${colors("whiteLight")};

    &:hover {
        background: ${(props) =>
            props.disabled === 'disabled' ? colors("gray")(props) : colors("primaryGradient90")(props)};
        filter: brightness(0.8);
        color: ${colors("whiteLight")};
    }
`;

//Basic 스타일
export const BasicStyled = styled(BtnBase)`
    background: rgba(255, 255, 255, 0.1);
    color: ${colors("whiteLight")};

    &:hover {
        background: rgba(255, 255, 255, 0.07);
    }
`;

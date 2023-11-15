import React from "react";
import styled from "styled-components";
import { colors } from "@/styles/color";
import { header26, body14 } from "@/styles/typography";
import GoogleAuthenticationComponent from "@/components/authentication/GoogleAuthentication";
import NaverAuthenticationComponent from "@/components/authentication/NaverAuthentication";
import KakaoAuthenticationComponent from "@/components/authentication/KakaoAuthentication";
import TextButtonComponent from "@/components/guides/button/TextButton";
import { useNavigate } from "react-router-dom";
import loginLogo from "@/assets/logo/loginLogo.svg";

const AuthenticationPage: React.FC = ({}) => {
  const navigate = useNavigate();
  return (
    <StyledAuthenticationPage>
      <div className="brand">
        <img className="brand-main" src={loginLogo} alt="Tax Canvas" />
        <div className="brand-sub">생산적인 세무 서비스를 위한 인공지능 솔루션</div>
        <div className="login-box">
          <div className="login-title">로그인</div>
          <GoogleAuthenticationComponent />
          <NaverAuthenticationComponent />
          <KakaoAuthenticationComponent />
          <div className="first-time-service">
            <div className="first-time-service-question">Tax Canvas가 처음이신가요?</div>
            <TextButtonComponent
              text={"서비스 이용안내"}
              action={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    </StyledAuthenticationPage>
  );
};

const StyledAuthenticationPage = styled.div`
  background-color: ${colors.bg_con};
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .brand {
    .brand-main {
      margin: 0 auto; /* 가로 가운데 정렬 */
      display: block; /* 블록 요소로 설정하여 가로 정렬이 적용되도록 함 */
      margin-bottom: 20px;
    }

    .brand-sub {
      ${body14}
      color: ${colors.neutral_g4};
      opacity: 0.6;
      margin-bottom: 37px;
      text-align: center;
    }

    .login-box {
      background-color: ${colors.white};
      display: block;
      width: 440px;
      height: 460px;
      border-radius: 18px;
      box-shadow: 0px 10px 20px 0px rgba(17, 17, 136, 0.1);
      padding-right: 30px;
      padding-left: 30px;

      .login-title {
        ${header26}
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 50px;
        padding-bottom: 64px;
      }

      .first-time-service {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 84px;

        .first-time-service-question {
          ${body14}
          color: ${colors.black};
          opacity: 0.4;
          margin-right: 6px;
        }
      }
    }
  }
`;

export default AuthenticationPage;

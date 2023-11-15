import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { colors } from "@/styles/color";
import { header26, body14, title14 } from "@/styles/typography";
import loginLogo from "@/assets/logo/loginLogo.svg";
import FormComponent from "@/components/guides/form/Form";
import ButtonComponent from "@/components/guides/button/Button";
import SendMessageComponent from "@/components/authentication/SendMessage";
import ResendMessageComponent from "@/components/authentication/ResendMessage";

const MobileAuthenticationPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationNumber, setVerificationNumber] = useState<string>("");
  const [hasSentMessage, setHasSentMessage] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userType = queryParams.get("type");
  const termsOfUse = queryParams.get("termsOfUse");
  const privacyPolicy = queryParams.get("privacyPolicy");
  const marketing = queryParams.get("marketing");

  const verifyNumber = async () => {
    const clientInformation = await axios.get("https://geolocation-db.com/json/");
    const clientIp = clientInformation.data.IPv4;
    let data;
    try {
      data = await axios.post(
        "http://localhost:5000/v1/user/authentication/mobile/verify",
        {
          ip: clientIp,
          access_token: localStorage.getItem("accessToken"),
          refresh_token: localStorage.getItem("refreshToken") || null,
          login_platform: localStorage.getItem("loginPlatform"),
          phone_number: phoneNumber.split("-").join(""),
          verification_number: verificationNumber,
          terms_of_use: termsOfUse,
          privacy_policy: privacyPolicy,
          marketing: marketing,
        },
      );

      if (data.status === 200) {
        setHasError(false);

        if (userType == "new") {
          // localStorage.removeItem("refreshToken");
          navigate("/authentication/affiliation");
        } else {
          navigate("/search/input");
        }
      }
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (hasSentMessage) {
      setHasError(false);
    }
  }, [hasSentMessage, verificationNumber]);

  return (
    <StyledMobileAuthenticationPage>
      <div className="brand">
        <img
          onClick={() => navigate("/")}
          className="brand-main"
          src={loginLogo}
          alt="Tax Canvas"
        />
        <div className="brand-sub">생산적인 세무 서비스를 위한 인공지능 솔루션</div>
        <div className="login-box">
          <div className="login-title">휴대폰 본인인증</div>
          {userType === "new" ? (
            <div className="mobile-verification-message">
              Tax Canvas에 오신 것을 환영합니다!
              <br />
              신규 회원의 경우 휴대폰 본인인증 절차가 필요합니다!
            </div>
          ) : (
            <div className="mobile-verification-message">
              기존 등록 아이피와 현재 접속 아이피가 달라,
              <br />
              휴대폰 본인인증을 통해 아이피를 현재의 아이피로
              <br />
              변경해야 합니다.
            </div>
          )}
          <div className="mobile-verification-form">
            <FormComponent
              text={phoneNumber}
              textHandler={setPhoneNumber}
              isNumberOnly={true}
              placeholder={"휴대폰 번호 (숫자만 입력해주세요.)"}
              rightElement={
                hasSentMessage ? (
                  <ResendMessageComponent phoneNumber={phoneNumber} />
                ) : (
                  <SendMessageComponent
                    setHasSentMessage={setHasSentMessage}
                    phoneNumber={phoneNumber}
                  />
                )
              }
            />
            {hasSentMessage ? (
              <div style={{ marginTop: 10 }}>
                <FormComponent
                  text={verificationNumber}
                  textHandler={setVerificationNumber}
                  placeholder={"인증번호"}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {hasSentMessage ? (
            <div className="mobile-verification-information">
              - 3분 이내로 인증번호(6자리)를 입력해주세요.
              <br />- 인증번호가 전송되지 않을 경우 “재전송” 버튼을 눌러 주세요.
            </div>
          ) : (
            <div style={{ height: hasError ? 116 : 140 }}></div>
          )}
          <div>
            {hasError ? (
              <div className="error-message">
                {hasSentMessage
                  ? "* 인증번호를 확인해주시기 바랍니다."
                  : "* 휴대폰 번호를 인증해주시기 바랍니다."}
              </div>
            ) : (
              <div></div>
            )}
            <ButtonComponent
              text={"확인"}
              isDisabled={hasError}
              action={() => {
                if (!hasSentMessage) {
                  setHasError(true);
                } else {
                  if (verificationNumber.length == 6) {
                    verifyNumber();
                  } else {
                    setHasError(true);
                  }
                }
              }}
            />
            <div style={{ height: 30 }}></div>
          </div>
        </div>
      </div>
    </StyledMobileAuthenticationPage>
  );
};

const StyledMobileAuthenticationPage = styled.div`
  background-color: ${colors.bg_con};
  height: 100vh;
  width: 100%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;

  .brand {
    .brand-main {
      margin: 0 auto;
      display: block;
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
        padding-bottom: 30px;
      }

      .mobile-verification-message {
        ${body14}
        color: ${colors.neutral_g4};
        text-align: center;

        padding-top: 30px;
        padding-bottom: 30px;
        margin-bottom: 16px;

        border-radius: 12px;
        background-color: rgba(247, 247, 253, 0.6);
      }

      .mobile-verification-form {
        padding-bottom: 10px;
      }

      .mobile-verification-information {
        ${css`
          ${body14} line-height: 150%;
        `}
        color: ${colors.neutral_g4};
        padding-left: 7px;
        margin-bottom: 40px;
      }
    }
  }

  .error-message {
    ${title14}
    height: 24px;
    color: red;
  }
`;

export default MobileAuthenticationPage;

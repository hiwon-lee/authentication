import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { colors } from "@/styles/color";
import FormComponent from "@/components/guides/form/Form";
import loginLogo from "@/assets/logo/loginLogo.svg";
import ButtonComponent from "@/components/guides/button/Button";
import { body14, header26, title14 } from "@/styles/typography";

const AffiliationAuthenticationPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const [affiliationId, setAffiliationId] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const registerAffiliationId = async () => {
    try {
      const responseFromCheck = await axios.post(
        "http://localhost:5000/v1/user/authentication/affiliation/check",
        { affiliation_id: affiliationId },
      );
      const isValidAffiliationId = responseFromCheck.data.is_valid_affiliation_id;

      if (isValidAffiliationId) {
        const response = await axios.post(
          "http://localhost:5000/v1/user/authentication/affiliation/register",
          {
            affiliation_id: affiliationId,
            login_platform: localStorage.getItem("loginPlatform"),
            access_token: localStorage.getItem("accessToken"),
          },
        );
        navigate("/search/input");
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (affiliationId.length == 30) {
      setHasError(false);
    }
  }, [affiliationId]);

  return (
    <StyledAffiliationAuthenticationPage>
      <div className="brand">
        <img
          onClick={() => navigate("/")}
          className="brand-main"
          src={loginLogo}
          alt="Tax Canvas"
        />
        <div className="brand-sub">생산적인 세무 서비스를 위한 인공지능 솔루션</div>
        <div className="login-box">
          <div className="login-title">회사 고유번호 입력</div>
          <div className="mobile-verification-form">
            <FormComponent
              text={affiliationId}
              textHandler={setAffiliationId}
              placeholder={"회사 고유번호 (숫자와 영문을 합친 30글자를 입력해주세요.)"}
            />
          </div>
          <div style={{ height: hasError ? 232 : 256 }}></div>
          <div>
            {hasError ? (
              <div className="error-message">
                * 회사 고유번호를 확인해주시기 바랍니다.
              </div>
            ) : (
              <div></div>
            )}
            <ButtonComponent
              text={"확인"}
              isDisabled={hasError}
              action={() => {
                if (affiliationId.length == 30) {
                  registerAffiliationId();
                } else {
                  setHasError(true);
                }
              }}
            />
            <div style={{ height: 30 }}></div>
          </div>
        </div>
      </div>
    </StyledAffiliationAuthenticationPage>
  );
};

const StyledAffiliationAuthenticationPage = styled.div`
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
    }
  }

  .error-message {
    ${title14}
    height: 24px;
    color: red;
  }
`;

export default AffiliationAuthenticationPage;

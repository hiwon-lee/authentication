import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { colors } from "@/styles/color";
import { header26, body16, body14, title16, title14 } from "@/styles/typography";
import loginLogo from "@/assets/logo/loginLogo.svg";
import ButtonComponent from "@/components/guides/button/Button";
import notCheckedBox from "@/assets/icons/24px/notCheckedBox.svg";
import checkedBox from "@/assets/icons/24px/checkedBox.svg";
import rightArrow from "@/assets/icons/18px/rightArrow.svg";
import ModalComponent from "@/components/guides/modal/Modal";
import TermsOfUseModalComponent from "@/components/authentication/TermsOfUseModal";
import PrivacyPolicyModalComponent from "@/components/authentication/PrivacyPolicyModal";
import MarketingModalComponent from "@/components/authentication/MarketingModal";

const AgreementAuthenticationPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const [termsOfUse, setTermsOfUse] = useState<boolean>(true);
  const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(true);
  const [marketing, setMarketing] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [isTermsOfUseModalOpened, setIsTermsOfUseModalOpened] = useState<boolean>(false);
  const [isPrivacyPolicyModalOpened, setIsPrivacyPolicyModalOpened] =
    useState<boolean>(false);
  const [isMarketingModalOpened, setIsMarketingModalOpened] = useState<boolean>(false);

  useEffect(() => {
    if (termsOfUse && privacyPolicy) {
      setHasError(false);
    }
  }, [termsOfUse, privacyPolicy]);

  return (
    <StyledAgreementAuthenticationPage>
      <div className="brand">
        <img
          onClick={() => navigate("/")}
          className="brand-main"
          src={loginLogo}
          alt="Tax Canvas"
        />
        <div className="brand-sub">생산적인 세무 서비스를 위한 인공지능 솔루션</div>
        <div className="login-box">
          <div className="login-title">약관 동의</div>
          <div className="agreement">
            <div
              className="agreement-all"
              onClick={() => {
                if (termsOfUse && privacyPolicy && marketing) {
                  setTermsOfUse(false);
                  setPrivacyPolicy(false);
                  setMarketing(false);
                } else {
                  setTermsOfUse(true);
                  setPrivacyPolicy(true);
                  setMarketing(true);
                }
              }}
            >
              <img
                style={{ paddingRight: 8 }}
                src={
                  termsOfUse && privacyPolicy && marketing ? checkedBox : notCheckedBox
                }
              />
              <div>약관 전체 동의</div>
            </div>
            <div className="agreement-element">
              <img
                style={{ paddingRight: 8 }}
                src={termsOfUse ? checkedBox : notCheckedBox}
                onClick={() => {
                  termsOfUse ? setTermsOfUse(false) : setTermsOfUse(true);
                }}
              />
              <div
                className="agreement-text"
                onClick={() => {
                  setIsTermsOfUseModalOpened(true);
                }}
              >
                {"이용약관 동의"}&nbsp;
                <div className="agreement-necessary">{"(필수)"}</div>
                <img className="agreement-inner-icon" src={rightArrow} />
              </div>
              <ModalComponent
                isOpened={isTermsOfUseModalOpened}
                setIsOpened={setIsTermsOfUseModalOpened}
                content={<TermsOfUseModalComponent />}
              />
            </div>
            <div className="agreement-element">
              <img
                style={{ paddingRight: 8 }}
                src={privacyPolicy ? checkedBox : notCheckedBox}
                onClick={() => {
                  privacyPolicy ? setPrivacyPolicy(false) : setPrivacyPolicy(true);
                }}
              />
              <div
                className="agreement-text"
                onClick={() => {
                  setIsPrivacyPolicyModalOpened(true);
                }}
              >
                {"개인정보 수집 및 이용 동의"}&nbsp;
                <div className="agreement-necessary">{"(필수)"}</div>
                <img className="agreement-inner-icon" src={rightArrow} />
              </div>
              <ModalComponent
                isOpened={isPrivacyPolicyModalOpened}
                setIsOpened={setIsPrivacyPolicyModalOpened}
                content={<PrivacyPolicyModalComponent />}
              />
            </div>
            <div
              className="agreement-element"
              style={{ marginBottom: hasError ? 78 - 26.8 : 78 }}
            >
              <img
                style={{ paddingRight: 8 }}
                src={marketing ? checkedBox : notCheckedBox}
                onClick={() => {
                  marketing ? setMarketing(false) : setMarketing(true);
                }}
              />
              <div
                className="agreement-text"
                onClick={() => {
                  setIsMarketingModalOpened(true);
                }}
              >
                {"E-mail 및 SMS 광고성 정보 수신 동의"}&nbsp;
                <div className="agreement-optional">{" (선택)"}</div>
                <img className="agreement-inner-icon" src={rightArrow} />
              </div>
              <ModalComponent
                isOpened={isMarketingModalOpened}
                setIsOpened={setIsMarketingModalOpened}
                content={<MarketingModalComponent />}
              />
            </div>
          </div>
          <div>
            {hasError ? (
              <div className="error-message">
                * 필수 항목에 동의하셔야 서비스 이용이 가능합니다.
              </div>
            ) : (
              <div></div>
            )}

            <ButtonComponent
              text={"확인"}
              isDisabled={hasError}
              action={() => {
                if (termsOfUse && privacyPolicy) {
                  navigate(
                    `/authentication/mobile?type=new&termsOfUse=${termsOfUse}&privacyPolicy=${privacyPolicy}&marketing=${marketing}`,
                  );
                } else {
                  setHasError(true);
                }
              }}
            />
          </div>
        </div>
      </div>
    </StyledAgreementAuthenticationPage>
  );
};

const StyledAgreementAuthenticationPage = styled.div`
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
        padding-bottom: 30px;
      }
    }

    .agreement-all {
      ${title16}
      display: flex;
      align-items: center;
      border-radius: 12px;
      border: 1px solid ${colors.neutral_g2};
      padding: 12px;
      margin-bottom: 22px;
    }

    .agreement-element {
      ${body16}
      display: flex;

      align-items: center;
      border-radius: 12px;
      padding-left: 12px;
      border: 1px solid transparent;
      margin-bottom: 24px;

      .agreement-text {
        width: 100%;
        display: flex;
        white-space: nowrap;
        .agreement-necessary {
          ${body16}
          color: ${colors.primary_main};
          width: 100%;
        }
        .agreement-optional {
          ${body16}
          color: ${colors.neutral_g4};
          width: 100%;
        }
      }
    }

    .error-message {
      ${title14}
      height: 24px;
      color: red;
    }
  }
`;

export default AgreementAuthenticationPage;

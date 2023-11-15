import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SpinnerComponent from "@/components/guides/spinner/Spinner";
import { colors } from "@/styles/color";
import { HTTP_STATUS } from "@/http_status";

const LoadingAuthenticationPage: React.FC = ({}) => {
  const navigate = useNavigate();

  const handleExistingUser = () => {
    navigate("/search/input");
  };

  const handleChangedIpUser = () => {
    navigate("/authentication/mobile?type=changed");
  };

  const handleNewUser = () => {
    navigate("/authentication/agreement");
  };

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  const handleLogin = async (code: string) => {
    const clientInformation = await axios.get("https://geolocation-db.com/json/");
    const clientIp = clientInformation.data.IPv4;

    const data = {
      code: code,
      ip: clientIp,
    };

    console.log(clientIp);

    try {
      let response, loginPlatform;
      if (state == "flase") {
        response = await axios.post(
          "http://localhost:5000/v1/user/authentication/naver",
          data,
        );
        loginPlatform = "naver";
        localStorage.setItem("loginPlatform", loginPlatform);
      } else {
        response = await axios.post(
          "http://localhost:5000/v1/user/authentication/google",
          data,
        );
        loginPlatform = "google";
        localStorage.setItem("loginPlatform", loginPlatform);
      }

      if (response.status == HTTP_STATUS[200].CODE) {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const hasSignedUp = response.data.has_signed_up;

        if (hasSignedUp) {
          if (response.data.ip == clientIp) {
            handleExistingUser();
          } else {
            handleChangedIpUser();
          }
        } else {
          handleNewUser();
        }
      } else {
        console.log(response.status);
        alert("로그인을 다시 시도해주시기 바랍니다.");
        navigate("/authentication");
      }
    } catch (error) {
      console.error(error);
      alert("로그인을 다시 시도해주시기 바랍니다.");
      navigate("/authentication");
    }
  };

  useEffect(() => {
    if (code) {
      handleLogin(code);
    } else {
      alert("로그인을 다시 시도해주시기 바랍니다.");
      navigate("/authentication");
    }
  }, []);

  return (
    <StyledLoadingAuthenticationPage>
      <SpinnerComponent />
    </StyledLoadingAuthenticationPage>
  );
};

const StyledLoadingAuthenticationPage = styled.div`
  background-color: ${colors.bg_con};
  min-height: 100vh;
  margin: 0;
`;

export default LoadingAuthenticationPage;

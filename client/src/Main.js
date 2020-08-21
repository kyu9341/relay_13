import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {Title as title} from './Mbti';

const Main = styled.div`
  text-align: center;
  margin-top: calc(50vh - 100px);

`

const MbtiButton = styled.button`
  width: 400px;
  border-radius: 100px;
  outline: none;
  border: none;
  height: 100px;
  font-size: 25px;
  font-weight: bold;
  background-color: #11F;
  box-shadow: 10px 10px 20px #CCC;

  & > a {
      text-decoration: none;
      color: #FFF;
  }
`

const Title = styled(title)`
    margin-bottom: 35px;
    color: #000;
`

export default () => {
  return (
    <Main>
        <Title>당신의 MBTI는 무엇일까요? 👀</Title>
        <MbtiButton><Link to='/mbti'>나의 MBTI 분석하기</Link></MbtiButton>
    </Main>
  );
}


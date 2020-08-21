import React, {useState} from "react";
import styled from 'styled-components';
import cat from './cat.jpg';

const Loading = styled.div`
    text-align: center;
    font-size: 50px;
    letter-spacing: 4px;
    font-weight: 100;
    padding-top: calc(50vh - 25px);
`

const LoadingImg = styled.div`
    & > img {
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
`


const Analyze = () => {
    return (
        <Loading>
            MBTI 결과를 분석하고 있습니다... 🧐
            <LoadingImg><img src={cat} alt='cat'/></LoadingImg>
        </Loading>
    );
}

export default Analyze;
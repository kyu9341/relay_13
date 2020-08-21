import React, {useState} from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import ImageURL from "./ImageURL";
import cat from './cat.jpg';

const Main = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`

const Resultdiv = styled.div`
    text-align: center;
    width: 400px;
    height: 550px;
    border: 6px solid rgba(32,32,255, 0.9);
    padding: 30px;
    margin: 10vh 0 5vh 0;
    box-shadow: 10px 10px 15px #AAE;
`

const Button = styled.button`
    background-color: #11F;
    border: none;
    color: white;
    padding: 15px 32px;
    border-radius: 20px;
    text-decoration: none;
    color: white;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`

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

const MBTIImage = styled.img`
    width: 400px;
    height: 480px;
    align: center;
    margin-bottom: 20px;
`

const returnImageUrl = (mbti) => {
    return ImageURL[mbti];
}

const Result = (props) => {
    const {isArrived = true, mbti_type} = props;
    return (
        <>
        {
            isArrived && (
            <Main>
                <Resultdiv>
                    <h2>당신의 MBTI 타입입니다! 😊</h2>
                    <MBTIImage src={returnImageUrl(mbti_type)} alt={mbti_type} />
                </Resultdiv>
                <Link to="/"><Button>처음으로 돌아가기</Button></Link>
            </Main>
        )}
        {
            !isArrived && (
                <Loading>
                    MBTI 결과를 분석하고 있습니다... 🧐
                    <LoadingImg><img src={cat} alt='cat'/></LoadingImg>
                </Loading>
            )
        }
        </>
    );
}

export default Result;
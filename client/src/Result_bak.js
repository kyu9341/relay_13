import React, {useState} from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import ImageURL from "./ImageURL";

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
    const {mbti_type} = props;
    return (
        <Main>
            <Resultdiv>
                <h2>당신의 MBTI 타입입니다! 😊</h2>
                <MBTIImage src={returnImageUrl(mbti_type)} alt={mbti_type} />
            </Resultdiv>
            <Link to="/"><Button>처음으로 돌아가기</Button></Link>
        </Main>
    );
}

export default Result;
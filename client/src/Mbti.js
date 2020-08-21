import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {postMbti} from './callApi';
import Result from './Result';
import Analyze from './Analyze';
//import { Redirect } from "react-router-dom";

export default (props) => {
    const input = useRef();
    const [error, setError] = useState('');
    const [call, setCall] = useState(false);
    const [isArrived, setIsArrived] = useState(false);
    //const [mbti_type, setMbtiType] = useState(null);

    const checkText = () => {
        const text = input.current.value;
        console.log(text);
        if (text.length < 30) setError('30자 이상 작성하셔야 유의미한 결과가 도출됩니다!');
        else {
            setError('');
            callApi();
        }
    }
    const callApi = async () => {
        setCall(true);
        const {value} = input.current;
        const res = await postMbti({post: value});
        if (res.status) {
            setIsArrived(true)
            //setMbTiType(res.body.mbti?)
        };
    }
    
    return (
        <>
            {
                !call && (
                <>
                <Title>Guess MBTI ?! 🤔</Title>
                <TexareaDiv><TextArea ref={input} placeholder='당신의 성격이 드러나도록 솔직한 글을 작성해보세요!'/></TexareaDiv>
                {error && <Error>{error}</Error>}
                <Button onClick={checkText}>MBTI 검사 시작</Button>
                </>
            )}
            {
                call && (
                    <Result isArrived={isArrived} /*mbti_type={}*//>
                    /**/
            )}  
        </>
    )
}

const Error = styled.div`
    text-align: center;
    margin-top: 30px;
    color: #11F;
    letter-spacing: -0.5px;
    font-size: 18px;
`

export const Title = styled.div`
    font-size: 40px;
    text-align: center;
    margin-top: 10vh;
    color: #11F;
    font-weight: 900;
`

const TexareaDiv = styled.div`
    margin-top: 30px;
    text-align: center;
    margin-bottom: 20px;
`

const TextArea = styled.textarea`
    width: 50vw;
    height: 40vh;
    padding: 15px;
    font-size: 16px;
    outline: none;
    resize: none;
    border: 6px solid rgba(32,32,255, 0.9);
    box-shadow: 10px 10px 15px #AAE;

    &::placeholder {
        font-size: 16px;
    }
`

const Button = styled.button`
    
     display:inline-block;
     padding:1em 1.7em;
     margin: 20px 0.1em 0.1em 43%;
     border:0.16em solid rgba(255,255,255,0);
     border-radius:2em;
     box-sizing: border-box;
     text-decoration:none;
     font-family:'Roboto',sans-serif;
     font-weight:bolder;
     font-size : 1.2em;
     color:#3d1de2;
     text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
     text-align:center;
     transition: all 0.2s;
     text-decoration : none ; 

    :active{
        color:#dfe3ff;
    }
    :hover{
        border-color: #11F;
    }
    :focus{
        outline:0;
    }
    :visited{
        color:#3d1de2;
    }
    .underlined{
        text-decoration:underline;
    }
    @media all and (max-width:30em){
    {
        display:block;
        margin:0.2em auto;
    }
    }
    
`;
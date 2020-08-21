import React from "react";
import {Route} from "react-router-dom";
import Main from './Main';
import Mbti from './Mbti';

export default () => (
    <>
        <Route exact path="/" component={Main}/>
        <Route exact path="/mbti" component={Mbti}/>
    </>
);
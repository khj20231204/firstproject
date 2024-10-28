import React from 'react';
import PharMain from '../components/pharmacy/PharMain';
import Header from '../components/Header/Header';
import LoginContextConsumer from '../contexts/LoginContextConsumer';

const PharmacyPage = () => {
   return (
      <div>
         {/* 
            App.js에서 전체를 <LoginContextProvider>로 감쌌기 때문에 LoginContextProvider에서 제공해주는
            state를 사용할 수 있다
            LoginContextConsumer 에서 timeout으로 3초 뒤에 로그아웃을 로그인으로 바꾸면
            Header에서 useContext로 가져온 isLogin이 true로 바뀌면서 헤더바에 메뉴가 바뀐다
         */}
         <Header/>
         <PharMain></PharMain>
         <LoginContextConsumer />
      </div>
   );
};

export default PharmacyPage;
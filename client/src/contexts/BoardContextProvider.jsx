import React, { createContext, useState } from 'react';

export const BoardContext = createContext();

const BoardContextProvider = ({children}) => {

   let [page, setPage] = useState(1);
   let [search, setSearch] = useState(null);
   let [keyword, setKeyword] = useState(null);

   const setPageFunc = (v) => {
      setPage(v)
   }

   const setSearchFunc = (v) => {
      setSearch(v);
   }

   const setKeywordFunc = (v) => {
      setKeyword(v);
   }
   return (
      <div>
         <BoardContext.Provider value={{page, search, keyword, setPageFunc , setSearchFunc, setKeywordFunc
         }}>
            {children}
         </BoardContext.Provider>
      </div>
   );
};

export default BoardContextProvider;
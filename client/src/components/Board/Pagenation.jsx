import React, { useState } from 'react';
import { Pagination, PaginationItem } from "@mui/material";
import Stack from '@mui/material/Stack';


const Pagenation = (props) => { //Board.jsx에서 넘겨주는 props

   let {getList, totalPage, page} = props;

   const [currentPage, setCurrentPage] = useState(1);

   const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
      getList(page);
      console.log("page:"+page);
   };

   return (
      <div>
         <Stack spacing={2}>
            <Pagination count={totalPage} page={page} color="secondary" onChange={handlePageChange}/>
         </Stack>
         {/* 
            count : 총 페이지수 
            page : 현재 페이지
         */}
      </div>
   );
};

export default Pagenation;
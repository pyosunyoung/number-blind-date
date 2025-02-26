import React, { useState } from 'react'
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NewPostItDialog from './Modal/NewPostItDialog';
  // ★하루에 작성가능한 수량 제한이 필요할듯?, 저번에 말한 열람 제한도 동일 (오른쪽 상단에 배치하면 될듯)
  // 개발 해야 할 사항
  // 1. +포스트잇 붙이기 누를시 모달창 생성, 모달 = 팝업창
  // 2. 폼에 들어갈 내용 (닉네임, 나이, mbti, instagram, bio, 연락처, 키?, 학과?, 취미?, 어필 혹은 하고 싶은 말)
  // 2-1 열람 제한이 있어야하고 포스트잇 썸네일에는 닉네임, 나이, mbti, 학과 등만 표출되어지게 설정하고
  //     포스트잇을 누를시 열람하기, 취소 팝업창이 표출되어지게 설정하여여 잘못누름을 방지해야 할 것
  //     열람 버튼을 누를 시 상세정보인 연락처, 인스타그램, 키 등을 확인 할 수 있게 설정할 것.
  //     그냥 공지사항, 사용방법 같은 곳에 포스트잇 작성시 수정,삭제는 불가능 하다고 못 박아버릴까?
  // 3. 모든 폼 작성 후 붙이기, 취소 버튼 누를 시 모달창 닫힘
  // 4. 몇개는 회원정보를 get으로 가져와도 괜찮을 정보도 있어서 폼에 자동 입력 기능도 생각중
  // 5. 자기가 작성한 postIt만 색깔 다르게 할까? 
  // 사용자가 많아지면 내가 작성한 postIt은 계속 밀려날텐데 이런 것도 생각
  // 6. 페이지네이션 백엔드 작업 필요. (나 할 때는 query란 걸로 작업했는데 스프링은 어케하는지 1도 감이 안옴)
  // 7. 검색기능 구현 생각.
  // 8. 로그인이 안되어있으면 글쓰기 버튼, 포스트잇 열람 누를시 로그인 창으로 이동되는 로직 추가 구현.

const MatchingPage = () => {
  const navigate = useNavigate();
  // const [query] = useSearchParams();
  // const { postList, totalPageNum } = useSelector((state) => state.post);
  const [showDialog, setShowDialog] = useState(false);
  // const [searchQuery, setSearchQuery] = useState({
  //   page: query.get("page") || 1,
  //   name: query.get("name") || "",
  // }); //검색 조건들을 저장하는 객체, 해당 url의 page, name값 들고와라

  //포스트잇 리스트 가져오기 (url쿼리 맞춰서)
  // useEffect(()=>{
  //   dispatch(getPostList({...searchQuery})) // uri 커리가 바뀔 때 마다 호출하고 해당 searchQuery들을 보내겠다.
  // }, [query])

  // useEffect(() => {
  //   //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
  //   if(searchQuery.name === ""){ // 객체의 이름이 없다면 
  //     delete searchQuery.name; // 이름 필드를 삭제 시킴
  //   }
  //   const params = new URLSearchParams(searchQuery); // 검색어를 params url 형태로 바꿔줌 즉 객체를 쿼리 형태로 바꿔줌 page=1&name=jaket 이런식
  //   const queryString = params.toString() // 문자열로 바꿔줘야 적용됨 serarchQuery객체 => url로 바꿔줌
  //   // console.log("qqq",query)
  //   navigate("?" + queryString)// url 변경 완료, useSearchParams를 통해 query값을 익어옴
  // }, [searchQuery]);
  
  const handleClickNewPostIt = () => {
    setShowDialog(true);
  }
  // const handlePageClick = ({ selected }) => { //1페이지를 누르면 
  //   //  쿼리에 페이지값 바꿔주기
  //   setSearchQuery({...searchQuery, page:selected + 1});
  //   console.log("selected", selected);//1페이지를 누르면 0이 나옴 그래서 +1을 해주면 ;됨
  // };
  return (
    <div>
      한번 작성한 포스트잇은 수정 및 삭제가 불가능 하오니 신중하게 작성 부탁드려요!
      <Button className="mt-2 mb-2 buttonColor" variant="secondary" onClick={handleClickNewPostIt}>
          글쓰기 +
        </Button>
        {/* <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5} //몇개의 페이지를 보여줄지
          pageCount={50}//totalPageNum원래 이값들어감감 // 전체 페이지가 몇개인지는 백엔드만 알기 때문에 백엔드에서 알려줘야 함
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="paginate-style list-style-none"
        /> */}
        <NewPostItDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
    </div>
  )
}

export default MatchingPage

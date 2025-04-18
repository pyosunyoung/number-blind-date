import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import NewPostItDialog from './Modal/NewPostItDialog';
import PostitBox from './component/PostitBox';
import { getPostDetail, getPostList } from '../../featueres/post/postSlice';
import PostitDetailModal from './Modal/PostitDetailModal';
import styled from 'styled-components';
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

const PageContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffccd5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
  className: "paginate-style",
  breakLinkClassName: "page-link",
  pageClassName: "page-item",
  pageLinkClassName: "page-link",
  previousClassName: "page-item",
  previousLinkClassName: "page-link",
  nextClassName: "page-item",
  nextLinkClassName: "page-link",
  breakClassName: "page-item",
})`
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 8px;
  list-style: none; /* ✅ 리스트 스타일 제거 */

  .page-item {
    display: inline-block;
    margin: 0 4px;
  }

  .page-link {
    padding: 8px 12px;
    border-radius: 16px;
    background-color: #ffffff;
    color: #002B5B;
    border: 1px solid #002B5B;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      background-color: #002B5B;
      color: #ffffff;
    }
  }

  .active .page-link {
    background-color: #FFB6C1;
    color: #002B5B;
    font-weight: bold;
  }
`;

const FilterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #ffe4e1;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const WriteButton = styled(Button)`
  background-color: #ff6b81;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #ff4757;
  }
`;

const MatchingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const { postList, totalPageNum, selectedPost } = useSelector((state) => state.post);
  const [filter, setFilter] = useState('all'); // 전체, 남자, 여자 필터
  const [showDialog, setShowDialog] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,

    // name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체, 해당 url의 page, name값 들고와라

  // 포스트잇 리스트 가져오기 (url쿼리 맞춰서)
  // useEffect(() => {
  //   // console.log("searchQuery", searchQuery); // searchQuery는 {page:'1'} 이렇게 값이 들어가있음
  //   // console.log("searchquery type", typeof searchQuery.page);
  //   dispatch(getPostList({ ...searchQuery })); // uri 커리가 바뀔 때 마다 호출하고 해당 searchQuery들을 보내겠다.

  // }, [query]);

  // useEffect(() => {
  //   //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
  //   if (searchQuery.name === '') {
  //     // 객체의 이름이 없다면
  //     delete searchQuery.name; // 이름 필드를 삭제 시킴
  //   }
  //   const params = new URLSearchParams(searchQuery); // 검색어를 params url 형태로 바꿔줌 즉 객체를 쿼리 형태로 바꿔줌 page=1&name=jaket 이런식
  //   const queryString = params.toString(); // 문자열로 바꿔줘야 적용됨 serarchQuery객체 => url로 바꿔줌
  //   // console.log("qqq",query)
  //   navigate('?' + queryString); // url 변경 완료, useSearchParams를 통해 query값을 익어옴
  // }, [searchQuery]);


  useEffect(() => {
    // URL 쿼리 동기화
    const params = new URLSearchParams({ page: searchQuery.page });
    navigate('?' + params.toString(), { replace: true });

    // 페이지 번호가 변경될 때 API 호출
    dispatch(getPostList({ ...searchQuery }));
  }, [searchQuery.page]);

  console.log("check", postList);
  console.log("totalPageNum", totalPageNum);



  const handleClickNewPostIt = () => {
    setShowDialog(true);
  };
  const handlePageClick = ({ selected }) => {

    setSearchQuery(prev => ({ ...prev, page: selected + 1 }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const handlePostClick = (id) => {
    console.log("id값", id)
    setSelectedId(id);
    dispatch(getPostDetail(id));
    setShowDetailModal(true);

  };

  // const TestPostList = [
  //   // 이게 data.data? 없으면 전체가 data?
  //   {
  //     user_id: 1,
  //     nickname: '백석대 장원영',
  //     contact: 'kakao1234',
  //     age: 25,
  //     mbti: 'ENFP',
  //     department: '컴퓨터공학부',
  //     height: 173,
  //     hobby: '영화보기, 운동',
  //     highlight: '고양이 상이에요!',
  //     gender: 'female',
  //   },
  //   {
  //     user_id: 2,
  //     nickname: '백석대 차은우',
  //     contact: '01012345678',
  //     age: 24,
  //     mbti: 'INTP',
  //     department: '관광학부',
  //     height: 180,
  //     hobby: '독서, 음악 감상',
  //     highlight: '재미있고 유쾌해요',
  //     gender: 'female',
  //   },
  //   {
  //     user_id: 3,
  //     nickname: '용감한 무지',
  //     contact: 'instagram1234',
  //     age: 22,
  //     department: '간호학과',
  //     mbti: 'ISTP',
  //     height: 160,
  //     hobby: '요리, 베이킹',
  //     highlight: '조용하고 섬세해요',
  //     gender: 'male',
  //   },
  // ]


  const filteredPostList =
  filter === 'all'
    ? postList
    : postList.filter((post) => post.gender === filter);
    
  // const filteredPostList =
  //   filter === 'all'
  //     ? TestPostList
  //     : TestPostList.filter((post) => post.gender === filter);

  return (
    //포스트잇 아이템은 한페이지당 6개만 보여줄것
    <PageContainer>
      <FilterBox>
        <RadioGroup>
          <Form.Check type="radio" label="전체" value="all" checked={filter === 'all'} onChange={handleFilterChange} />
          <Form.Check type="radio" label="남자" value="male" checked={filter === 'male'} onChange={handleFilterChange} />
          <Form.Check type="radio" label="여자" value="female" checked={filter === 'female'} onChange={handleFilterChange} />
        </RadioGroup>
        <WriteButton onClick={handleClickNewPostIt}>포스트잇 작성</WriteButton>
      </FilterBox>

      <div className="postit-container">
        {filteredPostList.map((item) => (
          <div key={item.user_id} className="postit-wrapper" onClick={() => handlePostClick(item.user_id)}>
            <PostitBox item={item} />
          </div>
        ))}
      </div>
      {/* <div className="postit-container">
        {Array.isArray(filteredPostList)
          ? filteredPostList.map((item) => (
              <PostitBox key={item.user_id} item={item} />
            ))
          : Object.values(filteredPostList).map((item) => (
              <PostitBox key={item.user_id} item={item} />
            ))}
      </div> */}
      <MyPaginate
        nextLabel="다음"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPageNum}
        forcePage={searchQuery.page - 1}
        previousLabel="이전"
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
      />
      <NewPostItDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      {showDetailModal &&  (
        <PostitDetailModal show={showDetailModal} onHide={() => setShowDetailModal(false)} post={selectedPost} />
      )}
    </PageContainer>
  );
};

export default MatchingPage;
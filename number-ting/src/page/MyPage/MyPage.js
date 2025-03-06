import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../featueres/user/userSlice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const MyPage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  // 로컬 state로 폼 입력값 관리
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("남성");
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("phone");
  const [location, setLocation] = useState("");

  const placeholders = {
    phone: "전화번호를 입력하세요.",
    instagram: "인스타 ID를 입력하세요.",
    kakao: "카카오톡 ID를 입력하세요.",
  };

  // 컴포넌트가 마운트될 때 사용자 정보 불러오기
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
    // 마이페이지 데이터가 로드되면 콘솔에 출력
    useEffect(() => {
      if (profile) {
        console.log("응답 데이터:", JSON.stringify(profile, null, 2));
      } else {
        console.log("⚠️ 아직 데이터가 로드되지 않았습니다.");
      }
    }, [profile]);

    // 컴포넌트가 마운트될 때 사용자 정보 불러오기
  // 컴포넌트가 마운트될 때 사용자 정보 불러오기
useEffect(() => {
  console.log("📌 Fetching user profile..."); // API 요청 전 로그
  dispatch(fetchUserProfile());
}, [dispatch]);

// 마이페이지 데이터가 로드되면 콘솔에 출력
useEffect(() => {
  if (profile) {
    console.log("응답 데이터:", JSON.stringify(profile, null, 2)); // API 응답 데이터 확인
  } else {
    console.log("⚠️ 아직 데이터가 로드되지 않았습니다.");
  }
}, [profile]);

  // 프로필이 로드되면 로컬 state에 반영
  useEffect(() => {
    if (profile) {
      setUserName(profile.userName || "");
      setEmail(profile.email || "");
      setGender(profile.gender || "남성");
      setAge(profile.age || "");
      setNickname(profile.nickname || "");
      setContact(profile.contact || "");
      setLocation(profile.location || "");
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 시 회원정보 업데이트
    dispatch(
      updateUserProfile({
        userName,
        email,
        nickname,
        gender,
        age,
        contact,
        location,
      })
    );
  };

  

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">마이페이지</h2>

          {/* 에러 메시지 표시 */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>
            <br />

            <Form.Group controlId="formGender">
              <Form.Label>성별</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </Form.Select>
            </Form.Group>
            <br />

            <Form.Group controlId="formAge">
              <Form.Label>나이</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="formNickname">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Group>
            <br />

            {/* 연락수단 선택 */}
            <Form.Group controlId="contactMethod">
              <Form.Label>연락 수단 선택</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="전화번호"
                  name="contactMethod"
                  value="phone"
                  checked={contactMethod === "phone"}
                  onChange={() => setContactMethod("phone")}
                />
                <Form.Check
                  type="radio"
                  label="인스타 ID"
                  name="contactMethod"
                  value="instagram"
                  checked={contactMethod === "instagram"}
                  onChange={() => setContactMethod("instagram")}
                />
                <Form.Check
                  type="radio"
                  label="카카오톡 ID"
                  name="contactMethod"
                  value="kakao"
                  checked={contactMethod === "kakao"}
                  onChange={() => setContactMethod("kakao")}
                />
              </div>
            </Form.Group>
            <br />

            {/* 연락 정보 입력 */}
            <Form.Group controlId="formContact">
              <Form.Label>연락 수단</Form.Label>
              <Form.Control
                type="text"
                placeholder={placeholders[contactMethod]}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="formLocation">
              <Form.Label>지역</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <br />

            <Button variant="primary" type="submit">
              회원정보 수정
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;

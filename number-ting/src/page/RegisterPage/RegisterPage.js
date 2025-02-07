import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const RegisterPage = () => {
  // 🔹 사용자 입력값을 저장하는 state (React의 useState 사용)
  const [nickname, setNickname] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false); // 이용약관 동의 상태
  const [testResponse, setTestResponse] = useState(""); // 🔹 백엔드 응답을 저장할 상태 추가

  // 🔹 학교 이메일 유효성 검사 함수
  const validateSchoolEmail = (email) => {
    return email.endsWith("@bu.ac.kr"); // 학교 도메인 확인 (예: bu.ac.kr)
  };

  // 🔹 회원가입 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 🔹 이메일 형식 확인
    if (!validateSchoolEmail(schoolEmail)) {
      alert("올바른 학교 이메일을 입력하세요 (예: example@bu.ac.kr).");
      return;
    }

    // 🔹 비밀번호 길이 검사 (최소 8자)
    if (password.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    // 🔹 비밀번호 확인 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 🔹 이용약관 동의 확인
    if (!agreeTerms) {
      alert("서비스 이용약관 및 개인정보 처리방침에 동의해야 합니다.");
      return;
    }


    // "/api -> 삭제 필요(진태)"
    try {
      // ✅ 1. `/api/test` 엔드포인트를 호출하여 백엔드 상태 확인
      const testRes = await axios.get("/api/test");
      setTestResponse(testRes.data); // 🔹 백엔드 응답을 상태로 저장하여 화면에 표시

      // ✅ 2. 회원가입 요청 진행
      const registerResponse = await axios.post("/api/register", {
        nickname,
        schoolEmail,
        department,
        password,
      });

      // ✅ 3. 회원가입 요청 성공 시 처리
      if (registerResponse.status === 201 || registerResponse.status === 200) {
        alert("회원가입 성공!");
        window.location.href = "/login"; // 로그인 페이지로 이동
      } else {
        alert(`회원가입 실패: ${registerResponse.data.message}`);
      }
    }catch (error) {
      console.error("API 요청 실패:", error);
      setTestResponse("서버 연결 오류!"); // 🔹 에러 발생 시 화면에 표시
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">회원가입</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNickname">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Form.Group controlId="formSchoolEmail">
              <Form.Label>학교 이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="학교 이메일을 입력하세요 (예: example@bu.ac.kr)"
                value={schoolEmail}
                onChange={(e) => setSchoolEmail(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Form.Group controlId="formDepartment">
              <Form.Label>학과</Form.Label>
              <Form.Control
                type="text"
                placeholder="학과를 입력하세요"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Form.Group controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 (8자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Form.Group controlId="formTerms">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      서비스 이용약관
                    </a>{" "}
                    및{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      개인정보 처리방침
                    </a>{" "}
                    에 동의합니다.
                  </>
                }
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
            </Form.Group><br/>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={!agreeTerms}
            >
              회원가입
            </Button>
          </Form>

          {/* 🔹 백엔드 응답을 화면에 표시 */}
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
            <h4>백엔드 응답 확인:</h4>
            <p><strong>{testResponse}</strong></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
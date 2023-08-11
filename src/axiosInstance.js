import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 서버의 주소
    timeout: 10000, // 요청 타임아웃 설정 (선택)
    withCredentials: true // 크로스 도메인 쿠키 허용
});

// DELETE 요청을 보내는 메서드 추가
instance.deleteRequest = (url, config) => {
    return instance.delete(url, config);
};

export default instance;
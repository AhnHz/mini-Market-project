import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { Link } from "react-router-dom";
import axiosInstance from "./axiosInstance";

function BoardDetail() {
    const [sell, setSell] = useState({});
    const [buy, setBuy] = useState([]);
    const [buyText, setBuyText] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    //console.log(params.id);


    useEffect(() => {
        async function getSell() {
            try {
                const result = await axios.get(`http://localhost:8080/board/${params.id}`);
                console.log(result.data);
                setSell(result.data);
                setBuy(result.data.buylist);
            } catch (error) {
                console.log(error);
            }
        }
        getSell();
    }, [params.id])

    function onChange(event) {
        setBuyText(event.target.value)
    }

    async function onSubmit(event) {
        if (buyText === "") {
            alert("댓글 내용을 입력해주세요.")
        } else {
            event.preventDefault();
            try {
                const result = await axios.post(`http://localhost:8080/buy-create/${params.id}`,{content: buyText});
                
                if (result.status === 200) {
                    navigate(0);
                }
            } catch (error) {
                console.log(error);
            }
        }          
    }

    async function onDelete() {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const result = await axiosInstance.delete(`/sell-delete/${params.id}`);
                if (result.status === 200) {
                    alert("삭제되었습니다.")
                    navigate("/board");
                }         
            } catch (error) {
                alert("서버 문제로 삭제할 수 없습니다.");
            }           
        } else {
            alert("삭제 취소")
        }
    }

    return (
        <div>   
            <h2 className="border-bottom py-2">{sell.subject}</h2>
            <div className="me-3 bg-highlight">가격: {sell.price}원</div>
            <div className="card my-3">
                <div className="card-body">
                    <div className="card-text" style={{whileSpace: "pre-line"}}>{sell.content}</div>
                    <div className="d-flex justify-content-end">
                        <div className="badge bg-light text-dark p-2 text-start">
                            <div>작성: {moment(sell.createDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                            {sell.modifyDate && <div className="mt-3">수정: {moment(sell.modifyDate).format("YYYY-MM-DD HH:mm:ss")}</div>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <Link
                            to={`/sell-modify/${params.id}`}
                            className="btn btn-sm btn-outline-secondary"
                        >
                            수정
                        </Link>
                        <button
                            onClick={onDelete}
                            className="btn btn-sm btn-outline-danger ms-2"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>

            <h5 className="border-bottom my-3 py-2" style={{ color: 'gray' }}>{buy.length}개의 댓글</h5>
            {buy.map((buy, index) => {
                return (
                    <div className="card my-3" key={index}>
                    <div className="card-body">
                        <div className="card-text" style={{whiteSpace: "pre-line"}}>{buy.content}</div>
                        <div className="d-flex justify-content-end">
                            <div className="badge bg-light text-dark p-2 text-start">
                                <div>{moment(buy.createDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                            </div>
                        </div>
                        <div className="mt-3">                  
                        </div>
                    </div>
                </div> 
                )
            })}


            <form onSubmit={onSubmit} className="my-3">
                <textarea onChange={onChange} value={buyText} name="content" id="content" rows="4" className="form-control"></textarea>
                <input type="submit" value="댓글 작성" className="btn btn-dark my-2"/>
            
            </form>
        </div>

        
        
    )
}

export default BoardDetail;
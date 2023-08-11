import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function Board() {
    const [sellList, setSellList] = useState([]);

    useEffect(() => {
        async function getSellList() {
            try {
                const result = await axios.get("http://localhost:8080/board");
                console.log(result.data);
                setSellList(result.data);
            } catch(error) {
                console.log(error);
            }
        }
        getSellList();
    }, [])

    return (
        <div>
            <Link to={"/sell-create"} className="btn btn-dark mb-2">판매글 작성</Link>
            <table className="table text-center">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>날짜</th>

                    </tr>
                </thead>

                <tbody>
                    {sellList.map((sell, index) => {
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <Link 
                                        className="text-decoration-none"
                                        to={`/board/${sell.id}`}>

                                        {sell.subject}
                                        <span className="text-danger ms-2">
                                            <sup>[{sell.buylist.length}]</sup>
                                        </span>
                                    </Link>
                                </td>
                                <td>{sell.price}원</td>
                                <td>{moment(sell.createDate).format("YYYY-MM-DD HH:mm:ss")}</td>
                            </tr>
                        )
                    })}                   
                </tbody>
            </table>
        </div>
    )

    
}

export default Board;
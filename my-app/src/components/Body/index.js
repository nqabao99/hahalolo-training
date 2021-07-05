import React, { useState, useEffect } from "react";
import "./body-style.scss";
import QuestionItems from "./QuestionItems";
import RatingsTable from "./RatingsTable";
import Button from "../../common/Button/index";

function Index() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/question")
            .then((response) => response.json())
            .then((result) => setdata(result));
    }, []);

    // const [answer, setAnswer] = useState([]);

    const question2 = data.map((item) => ({
        id: item.id,
        name: item.name,
        content: item.content,
        answer: null,
    }));

    const handleGetAnswerChange = (data, id) => {
        const index = question2.findIndex((item) => item.id === id);
        question2[index].answer = data;
        console.log(question2);
        // setAnswer(question2);
    };

    // console.log(answer);
    return (
        <main className="body">
            <div className="container">
                <div className="body-container">
                    <div className="body-question">
                        <h2 className="name">Đề thi thử THPT QG năm 2021</h2>
                        <p className="content">
                            Trường THPT Chuyên Bắc Ninh lần 3
                        </p>
                        <div className="body-question__detail">
                            <div className="detail-items">
                                <i className="fa fa-check-square"></i>
                                <span>10 câu</span>
                            </div>
                            <div className="detail-items">
                                <i className="fa fa-history"></i>
                                <span>30 phút</span>
                            </div>
                            <div className="detail-items">
                                <i className="fa fa-user"></i>
                                <span>82 lượt thi</span>
                            </div>
                        </div>
                        <div className="body-question__list">
                            <form className="body-question__form">
                                {data.map((item, index) => (
                                    <QuestionItems
                                        handleGetAnswerChange={
                                            handleGetAnswerChange
                                        }
                                        key={item.id}
                                        data={item}
                                        id={item.id}
                                    />
                                ))}

                                <Button text="Nộp bài" />
                            </form>
                        </div>
                    </div>
                    <RatingsTable />
                </div>
            </div>
        </main>
    );
}

export default Index;

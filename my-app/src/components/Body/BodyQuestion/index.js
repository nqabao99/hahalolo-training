// import React from "react";

// function Index(props) {
//   return (
//     <div className="body-question">
//       <h2 className="name">Đề thi thử THPT QG năm 2021</h2>
//       <p className="content">Trường THPT Chuyên Bắc Ninh lần 3</p>
//       <div className="body-question__detail">
//         <div className="detail-items">
//           <i className="fa fa-check-square"></i>
//           <span>10 câu</span>
//         </div>
//         <div className="detail-items">
//           <i className="fa fa-history"></i>
//           <span>30 phút</span>
//         </div>
//         <div className="detail-items">
//           <i className="fa fa-user"></i>
//           <span>82 lượt thi</span>
//         </div>
//       </div>
//       <div className="body-question__list">
//         <form className="body-question__form" onSubmit={handleQuestionSubmit}>
//           {dataQuestion.map(
//             (item, index) =>
//               index === count && (
//                 <QuestionItems
//                   selectQuestion={selectQuestion}
//                   handleGetAnswerChange={handleGetAnswerChange}
//                   key={item.id}
//                   dataQuestion={item}
//                 />
//               )
//           )}

//           <div className="controlle">
//             <div className="controlle-question">
//               <div>
//                 <p>20:00</p>
//               </div>
//               <div>
//                 <i className="fa fa-caret-left" onClick={prevQuestion}></i>
//                 <i className="fa fa-caret-right" onClick={nextQuestion}></i>
//                 <i
//                   className="fa fa-ellipsis-h"
//                   onClick={handleListQuestionClick}
//                 ></i>
//               </div>
//             </div>

//             {openListQuestion && (
//               <ListQuestion
//                 dataQuestion={dataQuestion}
//                 selectQuestion={selectQuestion}
//                 handleSelectQuestionClick={handleSelectQuestionClick}
//               />
//             )}
//           </div>
//           <Button text="Nộp bài" />
//         </form>
//         {openModal && (
//           <ResultModal
//             closeResultModalClick={closeResultModalClick}
//             selectQuestion={selectQuestion}
//             dataQuestion={dataQuestion}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Index;

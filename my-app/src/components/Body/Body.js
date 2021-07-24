import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { addResult, updateListResult } from "../../redux/actions/result";
import {
  getListQuestion,
  addSelectQuestion,
  reSetSelectQuestion,
  stopTime,
  resetStopTime,
} from "../../redux/actions/question";
import {
  makeSelectListQuestion,
  makeSelectStatusFlags,
  makeSelectQuestion,
  makeSelectTimeOut,
} from "../../redux/selectors/question";
import { makeSelectListResult } from "../../redux/selectors/result";
import "./body-style.scss";
import BodyQuesiton from "./BodyQuestion/BodyQuestion";
import ChooseTopic from "./BodyQuestion/ChooseTopic/ChooseTopic";
import RatingsTable from "./RatingsTable/RatingsTable";
import PropTypes from "prop-types";
function Body({
  triggerUpdateListResult,
  listResult,
  triggerAddResult,
  triggerGetListQuestion,
  listQuestion,
  StatusFlags,
  selectQuestion,
  addSelectQuestion,
  reSetSelectQuestion,
  stopTime,
  resetStopTime,
  timeOut,
}) {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [start, setStart] = useState(true);
  const handleStartClick = () => {
    if (user) {
      setStart(false);
    } else {
      history.push("/login");
    }
  };

  const handleEndClick = (data) => {
    setStart(data);
  };

  return (
    <main className="body">
      <div className="container">
        <div className="body-container">
          {start ? (
            <ChooseTopic handleStartClick={handleStartClick} />
          ) : (
            <BodyQuesiton
              triggerUpdateListResult={triggerUpdateListResult}
              listResult={listResult}
              handleEndClick={handleEndClick}
              triggerAddResult={triggerAddResult}
              triggerGetListQuestion={triggerGetListQuestion}
              listQuestion={listQuestion}
              StatusFlags={StatusFlags}
              selectQuestion={selectQuestion}
              addSelectQuestion={addSelectQuestion}
              reSetSelectQuestion={reSetSelectQuestion}
              stopTime={stopTime}
              resetStopTime={resetStopTime}
              timeOut={timeOut}
            />
          )}

          <RatingsTable />
        </div>
      </div>
    </main>
  );
}

Body.propTypes = {
  triggerUpdateListResult: PropTypes.func,
  listResult: PropTypes.array,
  triggerAddResult: PropTypes.func,
  triggerGetListQuestion: PropTypes.func,
  listQuestion: PropTypes.array,
  StatusFlags: PropTypes.object,
  selectQuestion: PropTypes.array,
  addSelectQuestion: PropTypes.func,
  reSetSelectQuestion: PropTypes.func,
  stopTime: PropTypes.func,
  resetStopTime: PropTypes.func,
  timeOut: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  listResult: makeSelectListResult(),
  listQuestion: makeSelectListQuestion(),
  StatusFlags: makeSelectStatusFlags(),
  selectQuestion: makeSelectQuestion(),
  timeOut: makeSelectTimeOut(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerUpdateListResult: (id, infoAccount) =>
      dispatch(updateListResult(id, infoAccount)),
    triggerAddResult: (infoAccount) => dispatch(addResult(infoAccount)),
    triggerGetListQuestion: () => dispatch(getListQuestion()),
    addSelectQuestion: (question) => dispatch(addSelectQuestion(question)),
    reSetSelectQuestion: (question) => dispatch(reSetSelectQuestion(question)),
    stopTime: () => dispatch(stopTime()),
    resetStopTime: () => dispatch(resetStopTime()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Body);

import { Button } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Question.css"

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(false);

  const history = useHistory();

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError(true);
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1}:</h1>
      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && (
            <span
              style={{
                width: "93%",
                padding: 10,
                marginBottom: 2,
                marginTop: 8,
                borderRadius: 4,
                backgroundColor: "orangered",
                textAlign: "center",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              Please fill all the fields!
            </span>
          )}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;

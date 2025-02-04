function QuizQuestion(props) {
  const question = props.question;
  var answers = [];

  function checkAnswer(timer) {
    var selected_answer;
    try{
      if(timer){
        selected_answer = "no-answer-provided"
        props.onAnswerSubmit(selected_answer, question.correct_answer);
      }
      else{
        selected_answer = document.querySelector('input[name="' + props.index + '"]:checked').value;
        props.onAnswerSubmit(selected_answer, question.correct_answer);
      }
    }
    catch{
      alert("Please select an answer");
      selected_answer = null;
    }
  }

  var time = 30;
  function timer(){
    var x = setInterval(function() {
      document.getElementById("question-timer").innerHTML = "Time Remaining: " + time + "s ";
      if (time < 0) {
        clearInterval(x);
        checkAnswer(true);
        document.getElementById("question-timer").innerHTML = "EXPIRED";
      }
      time--;
    }, 1000);
  }

  answers.push(question.correct_answer);
  answers = answers.concat(question.incorrect_answers);
  shuffle(answers);
  return (
    <div className="question-container">
      <div className="question-title">
        {htmlDecode(question.question)} 
        <br/>
        <span id="question-timer"></span> 
      </div>
      <div id={"question" + props.index} className="question-answers">
        {answers.map((item, index) => (
          <div>
            <input type="radio" id={generateSlug(item)} name={props.index} value={item}/>
            <label for={generateSlug(item)}>{htmlDecode(item)}</label><br/>
          </div>
        ))}
      </div>
      <div className="question-submit">
        <button className="submit-button" onClick={() => {checkAnswer(false)}}>
          Submit
        </button>
      </div>
      {timer()}
    </div>
  );
}

export default QuizQuestion;

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function generateSlug(value){
  var output    = value.normalize('NFKD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .trim()
                      .toLowerCase()
                      .replace(/[^a-z0-9 -]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');
  return output;
}
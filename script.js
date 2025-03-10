// script.js - JavaScript điều khiển logic của hệ thống thi trắc nghiệm và giám sát người dùng

// Biến toàn cục
let currentQuestionIndex = 0;
let currentReviewIndex = 0;
let userAnswers = []; // Lưu đáp án người dùng (index lựa chọn)
let selectedQuestions = [];
let timerInterval;
const totalTime = 10 * 60; // Thời gian làm bài: 10 phút

// DOM elements
const welcomeScreen = document.getElementById("welcome-screen");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionArea = document.getElementById("question-area");
const timeRemainingDisplay = document.getElementById("time-remaining");
const scoreDisplay = document.getElementById("score");
const totalQuestionsDisplay = document.getElementById("total-questions");
const reviewArea = document.getElementById("review-area");
const aggregatedResultsDiv = document.getElementById("aggregated-results");

// ------------------------------
// Hệ thống giám sát và giám sát truy cập
// ------------------------------
function monitorEvent(eventType, details) {
  const payload = {
    eventType,
    timestamp: new Date().toISOString(),
    details
  };
  // Gửi log giám sát đến server giám sát (giả sử endpoint này đã được thiết lập)
  fetch("https://example.com/api/monitor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch((error) => console.error("Monitoring error:", error));
  // Log lên console cho mục đích debug
  console.log("Event logged:", payload);
}

// Ghi nhận truy cập trang thi
monitorEvent("page_access", { url: window.location.href });

// ------------------------------
// Hàm hỗ trợ xử lý tổng hợp kết quả (lưu trên localStorage dưới dạng demo)
function updateAggregatedResults(score, total) {
  const aggregatedKey = "aggregatedResults";
  let results = JSON.parse(localStorage.getItem(aggregatedKey)) || [];
  results.push({ score, total, timestamp: new Date().toISOString() });
  localStorage.setItem(aggregatedKey, JSON.stringify(results));
  return results;
}

function displayAggregatedResults() {
  const aggregatedKey = "aggregatedResults";
  let results = JSON.parse(localStorage.getItem(aggregatedKey)) || [];
  if (results.length === 0) {
    aggregatedResultsDiv.innerHTML = "<h3>Tổng hợp kết quả:</h3><p>Chưa có lượt thi nào.</p>";
    return;
  }
  const totalAttempts = results.length;
  const totalScore = results.reduce((sum, item) => sum + item.score, 0);
  const average = (totalScore / totalAttempts).toFixed(2);
  aggregatedResultsDiv.innerHTML = `<h3>Tổng hợp kết quả:</h3>
    <p>Tổng số lượt thi: ${totalAttempts}</p>
    <p>Điểm trung bình: ${average} / ${selectedQuestions.length}</p>`;
}

// ------------------------------
// Các hàm kiểm tra thi
// ------------------------------
// Hàm trộn mảng: Fisher-Yates Shuffle
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Hàm khởi tạo bài thi: chọn đề ngẫu nhiên từ ngân hàng đề
function initQuiz() {
  monitorEvent("exam_started", { user: "anonymous" }); // Giám sát bắt đầu thi
  selectedQuestions = shuffleArray(questions);
  userAnswers = new Array(selectedQuestions.length).fill(null);
  currentQuestionIndex = 0;
  renderQuestion();
  startTimer();
}

// Hàm render câu hỏi trong quá trình làm bài
function renderQuestion() {
  const questionObj = selectedQuestions[currentQuestionIndex];
  let html = `<div class="question-title"><strong>Câu ${currentQuestionIndex + 1}:</strong> ${questionObj.question}</div>`;
  if (questionObj.image) {
    html += `<div class="question-image"><img src="${questionObj.image}" alt="Minh họa" /></div>`;
  }
  html += `<ul class="choices">`;
  questionObj.choices.forEach((choice, index) => {
    const checked = userAnswers[currentQuestionIndex] === index ? "checked" : "";
    html += `<li>
      <label>
        <input type="radio" name="choice" value="${index}" ${checked} /> ${choice}
      </label>
    </li>`;
  });
  html += `</ul>`;
  
  questionArea.innerHTML = html;
  
  // Gán xử lý sự kiện lựa chọn
  document.querySelectorAll('input[name="choice"]').forEach(input => {
    input.addEventListener("change", (e) => {
      userAnswers[currentQuestionIndex] = parseInt(e.target.value);
      saveState();
      updateNavigationButtons();
    });
  });
  updateNavigationButtons();
  
  // Kích hoạt MathJax nếu cần
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

function updateNavigationButtons() {
  document.getElementById("prev-question").disabled = currentQuestionIndex === 0;
  document.getElementById("next-question").disabled = currentQuestionIndex === selectedQuestions.length - 1;
}

function changeQuestion(delta) {
  currentQuestionIndex += delta;
  renderQuestion();
  saveState();
}

function saveState() {
  const state = {
    currentQuestionIndex,
    userAnswers,
    selectedQuestions
  };
  localStorage.setItem("quizState", JSON.stringify(state));
}

function startTimer() {
  let timeLeft = totalTime;
  updateTimerDisplay(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timeRemainingDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

function submitQuiz() {
  if (!confirm("Bạn có chắc chắn muốn nộp bài thi không?")) return;
  clearInterval(timerInterval);
  localStorage.removeItem("quizState");
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  
  showResult();
  monitorEvent("exam_completed", { score: calculateScore(), total: selectedQuestions.length });
}

function calculateScore() {
  let score = 0;
  selectedQuestions.forEach((q, index) => {
    if (userAnswers[index] === q.correct) score++;
  });
  return score;
}

function showResult() {
  const score = calculateScore();
  scoreDisplay.textContent = score;
  totalQuestionsDisplay.textContent = selectedQuestions.length;
  
  // Thiết lập chế độ xem lại
  currentReviewIndex = 0;
  renderReviewQuestion();
  
  // Cập nhật kết quả tổng hợp (lưu kết quả và hiển thị)
  updateAggregatedResults(score, selectedQuestions.length);
  displayAggregatedResults();
}

// Hàm xem lại từng câu hỏi
function renderReviewQuestion() {
  const questionObj = selectedQuestions[currentReviewIndex];
  let html = `<div class="review-question">
    <div class="question-title"><strong>Câu ${currentReviewIndex + 1}:</strong> ${questionObj.question}</div>`;
  if (questionObj.image) {
    html += `<div class="question-image"><img src="${questionObj.image}" alt="Minh họa" /></div>`;
  }
  const userAnswer = userAnswers[currentReviewIndex];
  const userAnswerText = userAnswer !== null ? questionObj.choices[userAnswer] : "Chưa trả lời";
  html += `<p><em>Lựa chọn của bạn:</em> ${userAnswerText}</p>
    <p><em>Đáp án đúng:</em> ${questionObj.choices[questionObj.correct]}</p>
    <p><em>Giải thích:</em> ${questionObj.explanation}</p>
  </div>`;
  reviewArea.innerHTML = html;
  updateReviewNavigationButtons();
}

function updateReviewNavigationButtons() {
  document.getElementById("prev-review").disabled = currentReviewIndex === 0;
  document.getElementById("next-review").disabled = currentReviewIndex === selectedQuestions.length - 1;
}

function changeReviewQuestion(delta) {
  currentReviewIndex += delta;
  renderReviewQuestion();
}

// Gán sự kiện cho các phần tử
document.getElementById("start-quiz").addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  initQuiz();
});

document.getElementById("prev-question").addEventListener("click", () => {
  if (currentQuestionIndex > 0) changeQuestion(-1);
});

document.getElementById("next-question").addEventListener("click", () => {
  if (currentQuestionIndex < selectedQuestions.length - 1) changeQuestion(1);
});

document.getElementById("submit-quiz").addEventListener("click", submitQuiz);

document.getElementById("prev-review").addEventListener("click", () => {
  if (currentReviewIndex > 0) changeReviewQuestion(-1);
});

document.getElementById("next-review").addEventListener("click", () => {
  if (currentReviewIndex < selectedQuestions.length - 1) changeReviewQuestion(1);
});

document.getElementById("retry-quiz").addEventListener("click", () => {
  localStorage.removeItem("quizState");
  location.reload();
});
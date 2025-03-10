// exam-bank.js - Ngân hàng đề thi chứa danh sách câu hỏi mẫu

// Danh sách câu hỏi mẫu (bao gồm 20 câu hỏi)
const questions = [
  {
    id: 1,
    category: "Toán học",
    question: "Tính giá trị của biểu thức: $$\\frac{2+3}{5}$$",
    choices: ["1", "0.5", "5", "2"],
    correct: 0,
    explanation: "Biểu thức tính: (2+3)/5 = 5/5 = 1."
  },
  {
    id: 2,
    category: "Khoa học",
    question: "Đơn vị đo cường độ dòng điện là gì?",
    choices: ["Vôn", "Ampe", "Ohm", "Watt"],
    correct: 1,
    explanation: "Đơn vị đo cường độ dòng điện là Ampe (Ampere)."
  },
  {
    id: 3,
    category: "Toán học",
    question: "Giá trị của $$\\int_0^1 x^2 \\; dx$$ là bao nhiêu?",
    choices: ["1/2", "1/3", "1/4", "1"],
    correct: 1,
    explanation: "Tích phân tính: \\(\\int_0^1 x^2 dx = \\frac{1}{3}\\)."
  },
  {
    id: 4,
    category: "Lịch sử",
    question: "Năm nào sau đây là năm thành lập nước Việt Nam Dân chủ Cộng hòa?",
    choices: ["1945", "1954", "1975", "1986"],
    correct: 0,
    explanation: "Nước Việt Nam Dân chủ Cộng hòa được thành lập năm 1945."
  },
  {
    id: 5,
    category: "Địa lý",
    question: "Thủ đô của đất nước Pháp là:",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
    explanation: "Thủ đô của Pháp là Paris."
  },
  {
    id: 6,
    category: "Toán học",
    question: "Giải phương trình: $$x^2 - 4 = 0$$",
    choices: ["x = 2", "x = -2", "x = 2 hoặc x = -2", "x = 0"],
    correct: 2,
    explanation: "Phương trình có nghiệm x = 2 và x = -2."
  },
  {
    id: 7,
    category: "Khoa học",
    question: "Ảnh dưới đây minh họa cho loại tế bào nào?",
    choices: ["Tế bào động vật", "Tế bào thực vật", "Tế bào vi khuẩn", "Tế bào nấm"],
    correct: 0,
    image: "https://via.placeholder.com/400x200?text=T%E1%BA%BB+b%E1%BB%87+%C4%91%E1%BB%99ng+v%E1%BA%A5t",
    explanation: "Hình ảnh thể hiện cấu trúc của tế bào động vật."
  },
  {
    id: 8,
    category: "Toán học",
    question: "Nếu $$a=3$$ và $$b=4$$, thì giá trị của $$\\sqrt{a^2+b^2}$$ là bao nhiêu?",
    choices: ["5", "7", "1", "25"],
    correct: 0,
    explanation: "Tính: sqrt(3^2+4^2) = sqrt(9+16) = sqrt(25) = 5."
  },
  {
    id: 9,
    category: "Khoa học",
    question: "Thành phần chính của không khí là:",
    choices: ["Oxy", "Nitơ", "Carbon Dioxide", "Hydro"],
    correct: 1,
    explanation: "Không khí chủ yếu chứa khoảng 78% Nitơ."
  },
  {
    id: 10,
    category: "Lịch sử",
    question: "Ai là người lãnh đạo Cách mạng tháng 8 năm 1945?",
    choices: ["Ho Chi Minh", "Phạm Văn Đồng", "Trần Phú", "Võ Nguyên Giáp"],
    correct: 0,
    explanation: "Ho Chi Minh là lãnh đạo của Cách mạng tháng 8 năm 1945."
  },
  {
    id: 11,
    category: "Địa lý",
    question: "Sông nào dài nhất trên thế giới?",
    choices: ["Sông Nile", "Sông Amazon", "Sông Mississippi", "Sông Yangtze"],
    correct: 0,
    explanation: "Sông Nile thường được xem là sông dài nhất trên thế giới."
  },
  {
    id: 12,
    category: "Toán học",
    question: "Tính giá trị của $$\\lim_{x\\to 0}\\frac{\\sin x}{x}$$?",
    choices: ["0", "1", "Không xác định", "Infinity"],
    correct: 1,
    explanation: "Giới hạn sin(x)/x khi x về 0 bằng 1."
  },
  {
    id: 13,
    category: "Lịch sử",
    question: "Cuộc Cách mạng Công nghiệp lần thứ nhất bắt đầu vào khoảng thời gian nào?",
    choices: ["Thế kỷ 16", "Thế kỷ 17", "Thế kỷ 18", "Thế kỷ 19"],
    correct: 2,
    explanation: "Cách mạng Công nghiệp lần thứ nhất diễn ra chủ yếu vào thế kỷ 18."
  },
  {
    id: 14,
    category: "Địa lý",
    question: "Núi Everest nằm trên biên giới của những quốc gia nào?",
    choices: ["Nepal và Ấn Độ", "Nepal và Trung Quốc", "Ấn Độ và Pakistan", "Trung Quốc và Bhutan"],
    correct: 1,
    explanation: "Núi Everest nằm giữa Nepal và Trung Quốc (Tibet)."
  },
  {
    id: 15,
    category: "Toán học",
    question: "Tính đạo hàm của hàm số $$f(x)=x^3$$ tại điểm x=2.",
    choices: ["12", "8", "6", "4"],
    correct: 0,
    explanation: "Đạo hàm của f(x)=x^3 là f'(x)=3x^2, tại x=2: 3×(2^2)=12."
  },
  {
    id: 16,
    category: "Khoa học",
    question: "Trong hệ mặt trời, hành tinh nào được gọi là 'Hành tinh đỏ'?",
    choices: ["Sao Thổ", "Sao Thủy", "Sao Hỏa", "Sao Kim"],
    correct: 2,
    explanation: "Sao Hỏa được gọi là Hành tinh đỏ do bề mặt chứa nhiều oxit sắt."
  },
  {
    id: 17,
    category: "Địa lý",
    question: "Đại dương lớn nhất trên Trái Đất là:",
    choices: ["Đại Tây Dương", "Đại Bắc Băng Dương", "Ấn Độ Dương", "Thái Bình Dương"],
    correct: 3,
    explanation: "Thái Bình Dương là đại dương lớn nhất."
  },
  {
    id: 18,
    category: "Toán học",
    question: "Tính giá trị của chuỗi số: $$\\sum_{n=1}^{\\infty}\\frac{1}{2^n}$$?",
    choices: ["1", "2", "0.5", "Infinity"],
    correct: 0,
    explanation: "Tổng của chuỗi hình học: 1/2 + 1/4 + 1/8 + ... = 1."
  },
  {
    id: 19,
    category: "Lịch sử",
    question: "Nước nào đã giành chiến thắng trong chiến tranh thế giới thứ hai?",
    choices: ["Đức", "Nhật Bản", "Liên Xô, Mỹ và các đồng minh", "Ý"],
    correct: 2,
    explanation: "Liên Xô, Mỹ và các đồng minh đã giành chiến thắng trong Chiến tranh thế giới thứ hai."
  },
  {
    id: 20,
    category: "Khoa học",
    question: "Thí nghiệm nổi tiếng của Newton về ánh sáng chứng minh điều gì?",
    choices: ["Ánh sáng là sóng", "Ánh sáng phân tách thành các màu", "Ánh sáng là hạt", "Tất cả các đáp án trên"],
    correct: 1,
    explanation: "Newton phát hiện ánh sáng trắng có thể phân tách thành các màu bằng lăng kính."
  }
];
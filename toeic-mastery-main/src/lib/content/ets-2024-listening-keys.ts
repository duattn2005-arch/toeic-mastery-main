import "server-only";
import type { ListeningKeyQuestion } from "@/lib/content/ets-2026-listening-keys";

/** ETS 2024 Listening keys (Test 1–5): answers and English transcripts
 * (Part 1/2 spoken lines, Part 3/4 conversation/talk) from the official
 * ETS 2024 answer book, Vietnamese explanations from "Dr. English — Giải chi
 * tiết ETS 2024". Test 2 Part 2's source explanations duplicated Test 1's,
 * so those 25 were written from the transcripts. Imported into DB questions
 * from /admin/explanations?section=listening-2024. */
export const ETS_2024_LISTENING_KEYS: Record<number, ListeningKeyQuestion[]> = {
 "1": [
  {
   "number": 1,
   "part": 1,
   "answer": "A",
   "textEn": "(A) She's eating in a picnic area. (B) She's waiting in line at a food truck. (C) She's wiping off a bench. (D) She's throwing away a plate.",
   "transcript": "(A) She's eating in a picnic area.\n(B) She's waiting in line at a food truck.\n(C) She's wiping off a bench.\n(D) She's throwing away a plate.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ dap án:\n- CâuB: Đáp án bẫy vì có từ “Truck” và trong tranh có xe tải. Tuy nhiên, xe tải trong tranh không phải xe tải bán thức ăn, và cũng không có người xếp hàng\n- CâuC: Đáp án bẫy có từ “Bench” (băng ghế dài) và trong tranh có hình ảnh này, nhưng nhân vật không lau băng ghế.\n- Câu D: Đáp án sai vì hành động không phù hợp với tranh, nhân vat đang ngồi ăn, không ném bất cứ đồ vật gì."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "B",
   "textEn": "(A) The man is brushing snow off the roof of a car. (B) The man is standing in the snow beside a car. (C) The man is shoveling snow from a walkway. (D) The man is running through the snow.",
   "transcript": "(A) The man is brushing snow off the roof of a car.\n(B) The man is standing in the snow beside a car.\n(C) The man is shoveling snow from a walkway.\n(D) The man is running through the snow.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ đáp án:\n- Câu A: Vì chứa hành động không phù hợp với nội dung tranh - brushing snow off the roof of a car. Đây là phương án bẫy vì trên nóc xe ô tô (roof of a car) có tuyết nhưng người đàn ông không có hành động phủi tuyết\n- CâuC: Vì chứa hành động không đúng với nội dung - shoveling snow from a walkway: Xúc tuyết trên lối đi\n- Câu D: Vì chứa hành động không phù hợp: Running through the snow: Chạy trên tuyết"
  },
  {
   "number": 3,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some workers are hanging art in a gallery. (B) Two of the people are having a conversation. (C) One of the men is rearranging cushions on a sofa. (D) One of the men is painting a picture.",
   "transcript": "(A) Some workers are hanging art in a gallery.\n(B) Two of the people are having a conversation.\n(C) One of the men is rearranging cushions on a sofa.\n(D) One of the men is painting a picture.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ đáp án:\n- Loại câu A: Day là đáp án bẫy vì có hầu hết các từ khóa: “worker - nhân viên”, “art - tác phẩm nghệ thuật”, “gallery - phòng triển lãm”, “hanging - treo”. Tuy nhiên, hành động “hanging - treo” cùng thì hiện tại tiếp diễn, diễn tả hành động treo tranh đang diễn ra, nhưng theo nội dung trong tranh, các bức tranh đã được treo hoàn thiện, không có ai đang treo hay chỉnh sửa lại vị trí các bức tranh, nên đáp án này sai\n- Loại câu C: Vì chứa hành động không phù hợp với nội dung: rearranging cushions on a sofa - sắp xếp lại đệm trên ghế sofa\n- Loại câu D: Vì chứa hành động không phù hợp: “painting - vẽ tranh”."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Vehicles are entering a parking garage. (B) Clothes hangers are scattered on the ground. (C) Empty racks are lined up next to a building. (D) Clothing is being displayed under a tent.",
   "transcript": "(A) Vehicles are entering a parking garage.\n(B) Clothes hangers are scattered on the ground.\n(C) Empty racks are lined up next to a building.\n(D) Clothing is being displayed under a tent.",
   "explanationVi": "Đáp án đúng: D\n\nLoại trừ đáp án:\n- Loại (A) vì dùng sai thì, tranh không có người sẽ không thể dùng thì hiện tại tiếp diễn (are entering), ngoài ra hành động “entering a parking garage - đang tiến vào bãi đỗ xe” không thích hợp với nội dung của bức tranh.\n- Loại (B) vì vị trí các chiếc móc quần áo (clothes hangers) không đúng với nội dung trong tranh: scattered on the ground - nằm rải rác trên mặt đất\n- Loại (C) vì nội dung sai với hình ảnh: Trong tranh không có chiếc kệ nào trống (empty racks) và không có tòa nhà (building)"
  },
  {
   "number": 5,
   "part": 1,
   "answer": "C",
   "textEn": "(A) Potted plants have been suspended from a ceiling. (B) Chairs have been stacked in front of an entryway. (C) A computer station has been set up on a desk. (D) A rug has been rolled up against a wall.",
   "transcript": "(A) Potted plants have been suspended from a ceiling.\n(B) Chairs have been stacked in front of an entryway.\n(C) A computer station has been set up on a desk.\n(D) A rug has been rolled up against a wall.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ đáp án:\n- Loại đáp án (A) vì có nội dung không đúng với nội dung, các chậu cay (potted plants) không được treo trên trần nhà (suspended from a ceiling).\n- Loại đáp án (B) vì có thông tin không phù hợp với tranh: Chairs have been stacked - những chiếc ghế được xếp chồng lên nhau\n- Loại đáp án (D) vì trạng thái của thảm (a rug) không dung: rolled up - được cuộn lại"
  },
  {
   "number": 6,
   "part": 1,
   "answer": "C",
   "textEn": "(A) One of the men is sweeping a patio. (B) One of the men is replacing some flooring. (C) A door has been taken off its frame. (D) A light fixture has been left on the ground",
   "transcript": "(A) One of the men is sweeping a patio.\n(B) One of the men is replacing some flooring.\n(C) A door has been taken off its frame.\n(D) A light fixture has been left on the ground",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ dap án:\n- Loại (A) vì đây là đáp án bẫy, chúng ta có thể thấy có keyword xuất hiện trong tranh: “weeping - quét”, tuy nhiên tân ngữ “a patio - sân, hiên, ban công” không khớp với nội dung trong tranh\n- Loại (B) vì có hành động không phù hợp với nội dung tranh “replacing some flooring - thay thế sàn nhà”\nLoại (D) vì chứa nội dung không phù hợp với tranh: chiếc đèn cố định (light fixture) được gắn trên trần, không bị bỏ trên san (left on the ground)"
  },
  {
   "number": 7,
   "part": 2,
   "answer": "B",
   "textEn": "How old is this building? (A) To ship some materials. (B) About ten years old. (C) Company offices, I think.",
   "transcript": "How old is this building?\n(A) To ship some materials.\n(B) About ten years old.\n(C) Company offices, I think.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương an sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về tudi\nđời của công trình trong khi phương án trả lời cung cấp thông tin về “vận chuyển vat liệu”.\n(C) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về tuổi đời của công trình trong khi phương án trả lời cung cấp thông tin về “văn phòng công ty”."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "C",
   "textEn": "Can you come to my jazz performance tonight? (A) I'm sorry I was late for the meeting. (B) Mostly just local musicians. (C) Sure, I'll be there!",
   "transcript": "Can you come to my jazz performance tonight?\n(A) I'm sorry I was late for the meeting.\n(B) Mostly just local musicians.\n(C) Sure, I'll be there!",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi đối phương “có thể đến xem buổi biểu diễn jazz” hay không trong khi phương án\ncho người trả lời xin lỗi vì đến họp muộn.\n(B) Phương án bẫy. Phương án chứa từ “musicians” liên quan đến từ “jazz performance” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "C",
   "textEn": "Which apartment submitted a work order? (A) It's what you did for a living. (B) Submit your assignment here. (C) It came from the tenants in B23.",
   "transcript": "Which apartment submitted a work order?\n(A) It's what you did for a living.\n(B) Submit your assignment here.\n(C) It came from the tenants in B23.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi về “căn hộ đã gửi lệnh làm việc” trong khi phương án trả lời cung cấp thông tin về “công việc bạn làm để kiếm sống”.\n(B) Phương án bẫy. Phương án lặp lại từ “submit” trong câu hỏi nhưng nội dung không phù hợp ý hỏi."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "A",
   "textEn": "Will you contact the vendor about changing our delivery date? (A) Of course, I'll take care of it. (B) An e-mail receipt. (C) Could I get change for a dollar?",
   "transcript": "Will you contact the vendor about changing our delivery date?\n(A) Of course, I'll take care of it.\n(B) An e-mail receipt.\n(C) Could I get change for a dollar?",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết liệu người nghe “sẽ liên hệ với nhà cung cấp về việc thay đổi ngày giao hàng” hay không trong khi phương án trả lời cung cấp thông tin về “giấy biên nhận qua email”.\n(C) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết liệu người nghe “sẽ liên hệ với nhà cung cấp về việc thay đổi ngày giao hàng” hay không\n5\ntrong khi phương án trả lời cung cấp thông tin về “đổi một đô la lấy tiền lẻ”."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "C",
   "textEn": "Why was the maintenance worker here? (A) No, he didn't. (B) From three o'clock until four (C) Because a light needed to be fixed.",
   "transcript": "Why was the maintenance worker here?\n(A) No, he didn't.\n(B) From three o'clock until four\n(C) Because a light needed to be fixed.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Phương án phù hợp trả lời cho câu hỏi xác nhận thông tin yes/no, không phù hợp với câu hỏi với “Why”.\n(B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về lý do nhân viên bảo trì ở đó trong khi phương án trả lời cung cấp thông tin về một khoảng thời gian."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "C",
   "textEn": "Did management make a hiring decision yet? (A) Put it on the highest shelf. (B) The personnel department. (C) Yes, they chose Jacob Borgman.",
   "transcript": "Did management make a hiring decision yet?\n(A) Put it on the highest shelf.\n(B) The personnel department.\n(C) Yes, they chose Jacob Borgman.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về quyết\nđịnh tuyển dụng của ban quản lý trong khi phương án trả lời cung cấp thông tin về việc đặt cái gì đó trên kệ cao nhất.\n(B) Phương án bẫy. Phương án chứa từ “personnel department” liên quan đến từ “management” và “hiring decision” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "Do you want to eat here in our cafeteria or go Out? (A) He went there yesterday. (B) Well, maybe a sandwich. (C) Let's eat here.",
   "transcript": "Do you want to eat here in our cafeteria or go Out?\n(A) He went there yesterday.\n(B) Well, maybe a sandwich.\n(C) Let's eat here.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án bẫy. Phương án có nội dung “đã đến đó hôm qua” liên quan đến ý hỏi nhưng sai chủ từ. Câu hỏi hỏi về đối tượng là “you” (ngôi thứ hai) nhưng\nphương án có chủ từ là “He” (ngôi thứ ba).\n(B) Phương án bẫy. Phương án chứa từ “sandwich” liên quan đến từ “eat” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "B",
   "textEn": "Didn't you e-mail the employment contract to Mr. Patel yesterday? (A) Yes, I would agree. (B) No, I'll send it now. (C) Check the employee manual.",
   "transcript": "Didn't you e-mail the employment contract to Mr. Patel yesterday?\n(A) Yes, I would agree.\n(B) No, I'll send it now.\n(C) Check the employee manual.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi về email hợp đồng lao động cho ông Patel, không phải muốn xác nhận người nghe có đồng ý hay không.\n(C) Phương án bẫy. Phương án bẫy. Phương án sử dụng từ “employee”, là từ phát sinh của từ “employment” trong câu hỏi, tuy vậy nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "A",
   "textEn": "Our division's picnic is this Saturday, right? (A) There's a lot of rain in the forecast. (B) Sure, I like salad. (C) At the end of this corridor.",
   "transcript": "Our division's picnic is this Saturday, right?\n(A) There's a lot of rain in the forecast.\n(B) Sure, I like salad.\n(C) At the end of this corridor.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án bẫy. Phương án chứa từ “salad” liên quan đến từ “picnic” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi.\n(C) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết có phải “chuyến dã ngoại của sư đoàn chúng ta là vào thứ Bảy tuần này” hay không trong khi phương án trả lời cung cấp thông tin về vị trí của cái gì đó ở cuối hành lang."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "A",
   "textEn": "Would you like coffee or tea? (A) Just water, please. (B) For a few dollars more. (C) A fifteen-minute break.",
   "transcript": "Would you like coffee or tea?\n(A) Just water, please.\n(B) For a few dollars more.\n(C) A fifteen-minute break.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết người nghe thích “trà hay cà phê” trong khi phương án trả lời cung cấp thông tin về “thêm vài đô la”.\n(C) Phương án có nội dung không phù hợp ý hỏi. Câu “Nghỉ giải lao mười lăm phút” không liên quan đến câu hỏi về việc thích “trà hay cà phê”."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "A",
   "textEn": "We achieved our sales targets this month. (A) That's excellent news! (B) A few times a day. (C) To the end of April.",
   "transcript": "We achieved our sales targets this month.\n(A) That's excellent news!\n(B) A few times a day.\n(C) To the end of April.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án có nội dung không phù hợp dé phản hồi cho câu phát biểu. Câu “Một vài lần một ngày” không liên quan đến việc “đạt được mục tiêu bán hàng trong tháng”.\n(C) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu. Câu “Đến cuối tháng Tư” không liên quan đến việc “đạt được mục tiêu bán hàng trong tháng”."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "C",
   "textEn": "How often do you travel for your job? (A) It turned out well. (B) Yes, I did find one. (C) About once a month.",
   "transcript": "How often do you travel for your job?\n(A) It turned out well.\n(B) Yes, I did find one.\n(C) About once a month.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi đối phương “có thường xuyên đi công tác” hay không trong khi phương án trả lời\ncung cấp thông tin về “mọi việc diễn ra tốt đẹp”.\n(B) Phương án trả lời cho câu hỏi xác nhận thông tin yes/no, không phù hợp để trả lời cho câu hỏi về tần suất với “How often”."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "B",
   "textEn": "We should hike the Wildflower Trail today. (A) This seat is available. (B) I didn't bring boots. (C) At the visitors' center.",
   "transcript": "We should hike the Wildflower Trail today.\n(A) This seat is available.\n(B) I didn't bring boots.\n(C) At the visitors' center.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu. Việc “chỗ ngồi này còn trống” không liên quan đến việc “đi bộ trên Đường mòn Hoa Dai”.\n(C) Phương án có nội dung không phù hop để phản hồi cho câu phát biểu. Thông\ntin “tại trung tâm dành cho du khách” không thể dùng để phản hồi cho câu phát biểu “hôm nay chúng ta nên đi bộ trên Đường mòn Hoa Dại.”."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "You've booked a hotel in London, haven't you? (A) Very enjoyable, thanks. (B) He usually takes the train. (C) Yes, I made a reservation last week.",
   "transcript": "You've booked a hotel in London, haven't you?\n(A) Very enjoyable, thanks.\n(B) He usually takes the train.\n(C) Yes, I made a reservation last week.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi đối phương “đã đặt khách sạn ở London” hay chưa trong khi phương án trả lời cung cấp thông tin về việc gì đó “rất thú vị”.\n(B) Phương án có nội dung không phù hợp ý hỏi và sai chủ từ. Người hỏi muốn hỏi đối phương “đã đặt khách sạn ở London” hay chưa trong khi phương án trả lời cung cấp thông tin về người đàn ông nào đó “thường đi tàu”."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "A",
   "textEn": "Are there any tickets left for tonight's concert? (A) It's sold out. (B) He's a concert violinist. (C) They already left.",
   "transcript": "Are there any tickets left for tonight's concert?\n(A) It's sold out.\n(B) He's a concert violinist.\n(C) They already left.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án bẫy. Phương án lặp lại từ “concert” trong câu hỏi nhưng nội dung không phù hợp ý hỏi.\n(C) Phương án có nội dung không phù hợp ý hỏi. Việc “họ đã rời đi” không liên quan đến “vé cho buổi hòa nhạc tối nay”."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "B",
   "textEn": "Haven't you used this software before? (A) Can I take your order? (B) I haven't had the chance. (C) About 40 dollars.",
   "transcript": "Haven't you used this software before?\n(A) Can I take your order?\n(B) I haven't had the chance.\n(C) About 40 dollars.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi rằng liệu người nghe đã “từng sử dụng phần mềm này trước đây” hay chưa trong khi phương án trả lời lại là câu hỏi về “đơn gọi món”.\n(C) Phương án có nội dung không phù hợp ý hỏi. Việc “sử dụng phần mềm” không liên quan đến việc “gọi món”."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "C",
   "textEn": "When is the new blender going to be released? (A) Only with fruits and vegetables. (B) In the kitchen cabinet. (C) The prototype is still being tested.",
   "transcript": "When is the new blender going to be released?\n(A) Only with fruits and vegetables.\n(B) In the kitchen cabinet.\n(C) The prototype is still being tested.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án bẫy. Phương án chứa từ “fruits and vegetables” liên quan đến từ\n“blender” trong câu hỏi nhưng nội dung cả câu không phù hợp trả lời cho câu hỏi với “When”.\n(B) Phương án bẫy. Phương án chứa từ “kitchen cabinet” liên quan đến từ “blender” trong câu hỏi nhưng nội dung cả câu không phù hợp trả lời cho câu hỏi với “When”."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "A",
   "textEn": "Who's picking up our clients at the airport? (A) They decided to drive. (B) At terminal 2. (C) It's a marketing position.",
   "transcript": "Who's picking up our clients at the airport?\n(A) They decided to drive.\n(B) At terminal 2.\n(C) It's a marketing position.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án bẫy. Phương án chứa từ “terminal 2” liên quan đến từ “airport” trong câu hỏi nhưng nội dung cả câu không phù hợp trả lời cho câu hỏi với “Who”.\n(C) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi về việc “ai đang đi đón khách ở sân bay” trong khi phương án trả lời lại cung cấp thông tin về “vị trí tiếp thị”."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "C",
   "textEn": "Where are the red roses that came in this morning? (A) About three liters of water. (B) No, I didn't Check out the sale. (C) I needed some for a large bouquet.",
   "transcript": "Where are the red roses that came in this morning?\n(A) About three liters of water.\n(B) No, I didn't Check out the sale.\n(C) I needed some for a large bouquet.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\nnw\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi về “những bông hồng đỏ” trong khi phương án trả lời cung cấp thông tin về “ba lít nước”.\n(B) Phương án trả lời cho câu hỏi xác nhận thông tin yes/no, không phù hợp để trả lời cho câu hỏi về vị trí, địa điểm với “Where”."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "A",
   "textEn": "This film has been nominated for several awards. (A) Why don't we go see it? (B) After the announcement. (C) He made a great speech.",
   "transcript": "This film has been nominated for several awards.\n(A) Why don't we go see it?\n(B) After the announcement.\n(C) He made a great speech.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án có nội dung không phù hợp dé phản hồi cho câu phát biểu. Câu “Sau thông báo” không liên quan đến việc “bộ phim này đã được đề cử nhiều giải thưởng”.\n(C) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu. Việc “anh ấy đã có một bài phát biểu tuyệt vời” không liên quan đến việc “bộ phim này đã được đề cử nhiều giải thưởng”."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "B",
   "textEn": "Who's interested in starting a car pool program? (A) Thanks, but I can't swim. (B) Clara's already organizing one. (C) It's a very interesting article.",
   "transcript": "Who's interested in starting a car pool program?\n(A) Thanks, but I can't swim.\n(B) Clara's already organizing one.\n(C) It's a very interesting article.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n(A) Phương án bẫy. Phương án chứa từ “swim” có vẻ liên quan đến “car pool”, tuy nhiên “car pool” có nghĩa là “đi chung xe”, không có nghĩa “hồ bơi” như “pool” thường gặp, vì vay không phù hợp với ý hỏi.\n(C) Phương án có nội dung không phù hợp ý hỏi. “Bài viết rất thú vi” không liên quan đến việc “bắt đầu chương trình đi chung xe”."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "Where will I teach my workshop this month? (A) We just sent an e-mail to all instructors. (B) Five to seven months. (C) Yes, it's a beautiful building.",
   "transcript": "Where will I teach my workshop this month?\n(A) We just sent an e-mail to all instructors.\n(B) Five to seven months.\n(C) Yes, it's a beautiful building.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án có nội dung không phù hợp ý hỏi. Thông tin về ý kiến, phù hợp với câu hỏi với “How long”, không phù hợp với câu hỏi cung cấp thông tin về vị trí, địa điểm với “Where”.\n(C) Phương án bẫy. Phương án chứa từ “building” có vẻ trả lời cho câu hỏi cung cấp thông tin về vị trí, địa điểm với “Where” nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "Why are we moving these sweaters to the back of the store? (A) In the new shopping mall. (B) Yes, they come in other colors. (C) Our spring merchandise is arriving soon.",
   "transcript": "Why are we moving these sweaters to the back of the store?\n(A) In the new shopping mall.\n(B) Yes, they come in other colors.\n(C) Our spring merchandise is arriving soon.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về vị trí, địa điểm phù hợp để trả lời cho câu hỏi về thời gian với “where”, không\nphù hợp để trả lời cho câu hỏi về nguyên nhân với “Why”.\n(B) Phương án trả lời cho câu hỏi xác nhận thông tin yes/no, không phù hợp để trả lời cho câu hỏi về nguyên nhân với “Why”."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "C",
   "textEn": "Would you be interested in working on some of these contracts? (A) Thank you for meeting me. (B) A contact lens prescription. (C) I have very limited time.",
   "transcript": "Would you be interested in working on some of these contracts?\n(A) Thank you for meeting me.\n(B) A contact lens prescription.\n(C) I have very limited time.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn hỏi đối phương “có muốn thực hiện một số hợp đồng này” hay không trong khi phương án cho người trả lời cảm ơn người hỏi vì đã gặp mình.\n(B) Phương án bẫy. Phương án chứa từ “contact” có phát âm tương tự với từ “contracts” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "B",
   "textEn": "What type of job are you looking for? (A) No, at ten A.M. (B) I really like working with computers. (C) Just a resume is needed.",
   "transcript": "What type of job are you looking for?\n(A) No, at ten A.M.\n(B) I really like working with computers.\n(C) Just a resume is needed.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n(A) Phương án có nội dung không phù hợp ý hỏi. Phương án phù hợp trả lời cho câu hỏi xác nhận thông tin yes/no, không phù hợp với câu hỏi với “What”.\n(C) Phương án bẫy. Phương án chứa từ “résumé” liên quan đến từ “job” trong câu hỏi nhưng nội dung cả câu cung cấp thông tin phù hợp với câu hỏi với cấu trúc “What is needed”, không phù hợp với câu hỏi với “What type ofjob”."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "32. What event does the woman mention? (A) A job fair (B) A cooking class (C) A fund-raiser (D) A company picnic",
   "transcript": "W: Thank you so much for organizing the annual company picnic, Jingdao. Everybody seemed to enjoy it.\nM: Well, we deserved it after working so hard this year.\nW: I agree. The food was great, by the way. Especially the peach pie you made. Would you mind sharing the recipe? It was delicious.\nM: I found the recipe online. I'll send you a link to the Web page. There's a really helpful video that walks you through all the steps. I recommend you watch it first.\nW: All right, thanks.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: event, woman, mention\n- Dang câu hỏi: thông tin chi tiết\n- O dòng đầu tiên, người phụ nữ nói là “Thank you so much for organizing\nthe annual company picnic, Jingdao.” Đây là thông tin chứa đáp án.\n-> Phương án (D) là phù hợp nhất. Loại phương án sai: Phương án (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "33. What does the woman ask for? (A) A guest list (B) A dessert recipe (C) A business card (D) A promotional code",
   "transcript": "W: Thank you so much for organizing the annual company picnic, Jingdao. Everybody seemed to enjoy it.\nM: Well, we deserved it after working so hard this year.\nW: I agree. The food was great, by the way. Especially the peach pie you made. Would you mind sharing the recipe? It was delicious.\nM: I found the recipe online. I'll send you a link to the Web page. There's a really helpful video that walks you through all the steps. I recommend you watch it first.\nW: All right, thanks.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\npeach pie (bánh đào) ~ dessert (món tráng miệng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, ask for\n- Dang câu hỏi: thông tin chi tiết\n- Ởlời thoại thứ 2, người phụ nữ có đề cập “The food was great, by the way. Especially the peach pie you made.” khen cái bánh người đàn ông làm, rồi sau đó hỏi xin công thức làm nó “Would you mind sharing the recipe?”.\n-> Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nPhương án (A) (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "34. What does the man recommend doing? (A) Returning some merchandise (B) Watching a video (C) Creating an account (D) Reading a review",
   "transcript": "W: Thank you so much for organizing the annual company picnic, Jingdao. Everybody seemed to enjoy it.\nM: Well, we deserved it after working so hard this year.\nW: I agree. The food was great, by the way. Especially the peach pie you made. Would you mind sharing the recipe? It was delicious.\nM: I found the recipe online. I'll send you a link to the Web page. There's a really helpful video that walks you through all the steps. I recommend you watch it first.\nW: All right, thanks.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, recommend\n- Dang câu hỏi: thông tin chi tiết\n- Ở lời thoại cuối cùng của người đàn ông, ông nói là “I found the recipe online. I'll send you a link to the Web page.” để báo hiệu hành động của người đàn ông làm tiếp theo. There's a really helpful video that walks you through all the steps. I recommend you watch it first.” Đây la thông tin chi ra người đàn ông đề nghị người phụ nữ làm gi.\nTathấy có từ khóa “recommend” cho nên đây là thông tin chứa đáp án.\n-> Phương án (B) là phù hợp nhất Loại phương án sai: Phương án (A), (C), (D)chứa thông tin không được đề cập.\nTừ vựng cần lưu ý: organize (v): tổ chức annual (adj): hằng năm especially (adv): đặc biệt là share (v): chia sẻ\nrecipe (n): công thức"
  },
  {
   "number": 35,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "35. What department do the speakers most likely work in? (A) Accounting (B) Research and development (C) Maintenance (D) Marketing",
   "transcript": "M: rid like to finish calculating the company's expense reports for the month. Have you finished reviewing the travel reimbursement forms from all the departments\nW: I'm almost done, but I have a question about a hotel receipt from one of our employees.\nM: What's the problem?\nW: Well, our policy is for emplovees to stay at a hotel that's on our list of approved accommodations. This one isn't on the list.\nM: Who submitted the receipt?\nW: Moritz Ziegler, one of our sales representatives.\nM: Hmm. He's a new employee and may have forgotten the policy. As a supervisor, I can approve the expense this one time.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: department, speakers, work in\n- Dạng câu hỏi: thông tin tổng quát\n- Ở trong lời thoại đầu tiên, người đàn ông muốn hoàn thành báo cáo chỉ trả các phí cua công ty (I'd like to finish calculating the company's expense reports for the month. Have you finished reviewing the travel reimbursement forms from all the departments?). Người phụ nữ tra lời là “I'm almost done”. Nghĩa là hai người này cùng một phòng ban, đó là phòng kế toán.\n-> Phương án (A) là phù hợp nhất\nLoại phương án sai:\nPhương án (B), (C), (D)chứa thông tin không được đề cập."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "36. What problem does the woman mention? (A) A report has not been submitted. (B) An invoice is not accurate. (C) A policy has not been followed. (D) An order has not been delivered.",
   "transcript": "M: rid like to finish calculating the company's expense reports for the month. Have you finished reviewing the travel reimbursement forms from all the departments\nW: I'm almost done, but I have a question about a hotel receipt from one of our employees.\nM: What's the problem?\nW: Well, our policy is for emplovees to stay at a hotel that's on our list of approved accommodations. This one isn't on the list.\nM: Who submitted the receipt?\nW: Moritz Ziegler, one of our sales representatives.\nM: Hmm. He's a new employee and may have forgotten the policy. As a supervisor, I can approve the expense this one time.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: problem, woman, mention\n- Dang câu hỏi: thông tin chi tiết\n- Câu hỏi của người đàn ông báo hiệu sắp đến đáp án vì có chứa từ khóa “What's the problem?”.\n- Ở lời đối thoại thứ 2 của người phụ nữ, cô nói rằng “our policy is for employees to stay at a hotel that's on our list of approved accommodations.” Rac rối ở day là “This one isn't on the list.”(M6t khách sạn cho nhân viên ở không có trong danh sách của công ty.) Day là thông tin chứa đáp án.\n-> Phương án (C) là phù hợp nhất\nLoại phương án sai:\nPhương án (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "37. What does the man say he will do? (A) Delete an electronic file (B) Authorize a reimbursement (C) Set up a sales meeting (D) Review a spreadsheet",
   "transcript": "M: rid like to finish calculating the company's expense reports for the month. Have you finished reviewing the travel reimbursement forms from all the departments\nW: I'm almost done, but I have a question about a hotel receipt from one of our employees.\nM: What's the problem?\nW: Well, our policy is for emplovees to stay at a hotel that's on our list of approved accommodations. This one isn't on the list.\nM: Who submitted the receipt?\nW: Moritz Ziegler, one of our sales representatives.\nM: Hmm. He's a new employee and may have forgotten the policy. As a supervisor, I can approve the expense this one time.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\napprove (chấp thuận) ~ authorize (cho phép) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, will do\n- Dang câu hỏi: thông tin chi tiết\n- Ởlời thoại cuối cùng, người đàn ông nói lên dự định ông sẽ làm tiếp theo “As a supervisor, I can approve the expense this one time.”\n-> Phương án (B) là phù hợp nhất Loại phương án sai: Phương án (B), (C). (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\ncalculate (v): tính toán\nexpense report (n): báo cáo chỉ tiêu reimbursement (n): hoàn trả department (n): phòng ban trong công ty receipt (n): hóa đơn"
  },
  {
   "number": 38,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "38. What industry do the speakers most likely work in? (A) Shipping (B) Manufacturing (C) Hospitality (D) Meteorology",
   "transcript": "M: Good morning, Damilola. How's everything up here on deck?\nW: Hi, Pedro. It was an uneventful night, and our cargo ship still hasn't moved yet.\nM: Hmm, I hope the fog over the harbor lifts soon.\nW: Yeah, me too. The ship won't be able to leave until the weather improves.\nM: I hope we won't get too far behind schedule. I'll be sure to call the port authority soon for an update on when we'll be cleared to leave.\nW: Sounds good.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speakers, work in\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào lời đối thoại, không có thông tin cu thé về ngành nghề của họ. Nhưng ở lời thoại thứ 2, người nói có đề cập “our cargo ship still hasn't moved yet.” (con tàu chở hàng của chúng tôi vẫn chưa di chuyển.) Ta có thể suy ra ngành nghề của họ có thé là chở hàng bằng tàu.\n-> Phương án (A) là phù hợp nhất\nLoại phương án sai:\nPhương án (B), (C), (D) không được đề cập trong lời đối thoại."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "39. What is the reason for a delay? (A) A schedule was written incorrectly. (B) Some equipment is not properly set up. (C) Weather conditions are poor. (D) Several staff members are absent.",
   "transcript": "M: Good morning, Damilola. How's everything up here on deck?\nW: Hi, Pedro. It was an uneventful night, and our cargo ship still hasn't moved yet.\nM: Hmm, I hope the fog over the harbor lifts soon.\nW: Yeah, me too. The ship won't be able to leave until the weather improves.\nM: I hope we won't get too far behind schedule. I'll be sure to call the port authority soon for an update on when we'll be cleared to leave.\nW: Sounds good.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: reason, delay\n- Dang câu hỏi: thông tin chi tiết\n- “The ship won’t be able to leave” là cách diễn đạt tương đương của từ khóa “delay”, báo hiệu sắp đến đáp án - Ở lời đối thoại, người phụ nữ nói \"The ship won't be able to leave until the weather improves.\" Day là lý do chậm trễ. -> Phương án (C) là phù hợp nhất Loại phương án sai: Phương án (A), (B), (D) không được đề cập trong lời đối thoại."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "40. What does the man say he will do? (A) Update a shift schedule (B) Clear a work space (C) Complete a checklist (D) Place a call",
   "transcript": "M: Good morning, Damilola. How's everything up here on deck?\nW: Hi, Pedro. It was an uneventful night, and our cargo ship still hasn't moved yet.\nM: Hmm, I hope the fog over the harbor lifts soon.\nW: Yeah, me too. The ship won't be able to leave until the weather improves.\nM: I hope we won't get too far behind schedule. I'll be sure to call the port authority soon for an update on when we'll be cleared to leave.\nW: Sounds good.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương: call (gọi điện) ~ place a call (thực hiện một cuộc gọi) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, will do\n- Dang câu hỏi: thông tin chi tiết\n- Ở lời đối thoại, người đàn ông nói \"I'll be sure to call the port authority soon for an update on when we'll be cleared to leave.\" Đây là hành động\nma anh ta sé thuc hién.\n- -> Phuong an (D) là phù hợp nhất.\nLoại phương an sai:\n- Phương án (A) là bẫy vi có đoạn hội thoại có nhắc đến “update”, “schedule”. nhưng nó không phải là đáp án vì đây không phải là hành động của người nói mà là hành động của chính quyền cảng.\n- Phươngán (B), (C) không được dé cập trong lời đối thoại.\nTừ vựng cần lưu ý:\ndeck (n) boong tàu\nuneventful (adj): bình yên, không có biến cargo ship (n): tàu chở hàng\nfog (n): sương mù\nharbor (n): bến cảng"
  },
  {
   "number": 41,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "41. Why is the woman at the restaurant? (A) To celebrate a retirement (B) To perform an inspection (C) To meet with some clients (D) To write an article",
   "transcript": "W: Hi. I've made a reservation to meet with some clients for lunch today. It's under Cohen.\nM: Oh, yes. I see your reservation. Welcome, Ms. Cohen.\nW: I know I asked to be seated on your beautiful terrace, but it's very hot today.\nM: Hmm. I can seat you at table four inside. Do you mind waiting a few minutes?\nW: Not at all. By the way. your parking area's nearly full. Where can I tell my clients to park?\nM: Our customers can park for free in the garage across the street. Our cashier will stamp their parking tickets.\nW: Oh, great. Thanks. I'll call them and let them know.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, woman, restaurant\n- Dang câu hỏi: thông tin tổng quan - Ở lời đối thoại, người phụ nữ nói \"I've made a reservation to meet with some clients for lunch today.\" Day là mục đích của việc cô ấy ở nhà hang. -> Phương án (C) là phù hợp nhất. Loại phương án sai: Phương án (A), (B), (D) không được đề cập trong lời đối thoại."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "42. What does the woman mean when she says,, \"it's very hot today\"? (A) She is unable to accept an invitation. (B) A cooling system is not working. (C) A meeting will end soon. (D) She wants to change a seating request.",
   "transcript": "W: Hi. I've made a reservation to meet with some clients for lunch today. It's under Cohen.\nM: Oh, yes. I see your reservation. Welcome, Ms. Cohen.\nW: I know I asked to be seated on your beautiful terrace, but it's very hot today.\nM: Hmm. I can seat you at table four inside. Do you mind waiting a few minutes?\nW: Not at all. By the way. your parking area's nearly full. Where can I tell my clients to park?\nM: Our customers can park for free in the garage across the street. Our cashier will stamp their parking tickets.\nW: Oh, great. Thanks. I'll call them and let them know.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, mean, \"it's very hot today\"\n- Dang cau hỏi: Ngụ ý\n- Ở lời đối thoại, người phụ nữ nói \"I know I asked to be seated on your beautiful terrace, but it's very hot today.\" Cô ấy muốn ngụ ý thay đổi yêu cầu chỗ ngồi vì trời nóng. Cho nên người nghe đối đáp lai rang “I can seat you at table four inside.”. -> Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nPhương án (A), (B), (C) không phản ánh ý nghĩa đúng của người phụ nữ."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "43. What does the man say about a parking garage? (A) It is free for customers. (B) It is under construction. (C) It closes soon. (D) It offers monthly contracts.",
   "transcript": "W: Hi. I've made a reservation to meet with some clients for lunch today. It's under Cohen.\nM: Oh, yes. I see your reservation. Welcome, Ms. Cohen.\nW: I know I asked to be seated on your beautiful terrace, but it's very hot today.\nM: Hmm. I can seat you at table four inside. Do you mind waiting a few minutes?\nW: Not at all. By the way. your parking area's nearly full. Where can I tell my clients to park?\nM: Our customers can park for free in the garage across the street. Our cashier will stamp their parking tickets.\nW: Oh, great. Thanks. I'll call them and let them know.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, parking garage\n- Dang câu hỏi: thông tin chi tiết\n- Ởlời đối thoại, người đàn ông nói \"Our customers can park for free in the garage across the street.\" Đây là thông tin cho khách hàng về bãi đỗ xe.\n-> Phương án (A) là phù hợp nhất. Loại phương án sai: Phương án (B), (C), (D) không đề cập.\nTừ vựng cần lưu ý:\nmake a reservation (v): đặt chỗ trước garage (n): ga ra, chỗ để xe\ncashier (n): thu ngân\nstamp (n): con dấu, tem\nclient (n): khách hàng"
  },
  {
   "number": 44,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "44. Where does the woman most likely work? (A) At a university (B) At a publishing company (C) At an electronics store (D) At a grocery store",
   "transcript": "W: Thank you both for coming here today to demonstrate your company's new compact printer. I know the store will be busy because we're having a big sale on laptop computers and tablets.\nM1: We're happy to be here. Our printers are perfect for students or people with home offices who may have limited space. My partner, Murat, will be setting up the printer station.\nM2: Yes-where can I put our demonstration table?\nW: I'l show you the area. Also, if you brought any brochures with you, itil be helpful to put those out for people to take.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\nlaptop computers and tablets (laptop, máy tính bàn và máy tính bảng) ~ electronics (thiết bị điện tử)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, work, store\n- Dạng câu hỏi: thông tin tổng quát\n- Ởlời đối thoại, người phụ nữ nói \"I know the store will be busy because we're having a big sale on laptop computers and tablets.\" Cô ấy đang ở một nơi làm việc, va từ khóa \"laptop computers and tablets” có nghĩa tương đương với “electronics” cho thấy cô ấy có thể làm việc ở một cửa hàng điện tử.\n-> Phương án (C) là phù hợp nhất.\nLoại phương án sai: Phương án (A), (B), (D) không phản ánh đúng nơi làm việc của người phụ nữ."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "45. What does Murat ask about? (A) How much an item costs (B) When an event will begin (C) How many people will participate (D) Where to set up some equipment",
   "transcript": "W: Thank you both for coming here today to demonstrate your company's new compact printer. I know the store will be busy because we're having a big sale on laptop computers and tablets.\nM1: We're happy to be here. Our printers are perfect for students or people with home offices who may have limited space. My partner, Murat, will be setting up the printer station.\nM2: Yes-where can I put our demonstration table?\nW: I'l show you the area. Also, if you brought any brochures with you, itil be helpful to put those out for people to take.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương: printer (máy in) ~ equipment (thiết bị) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Murat, ask, set up equipment\n- Dang câu hỏi: thông tin chi tiết\n- Ở lời đối thoại, người phụ nữ nói \"My partner, Murat, will be setting up the printer station.\" để báo hiệu đáp án sắp đến, giới thiệu từ khóa “Murat”. Sau đó ông Murat nói “Yes-where can I put our demonstration table?”. Đây là câu hỏi về nơi lắp đặt. -> Phương án (D) là phù hợp nhất. Loại phương án sai: Phương án (A), (B), (C) không đề cập."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "46. What does the woman suggest doing? (A) Offering a discount (B) Displaying informational materials (C) Holding a contest (D) Visiting a registration table",
   "transcript": "W: Thank you both for coming here today to demonstrate your company's new compact printer. I know the store will be busy because we're having a big sale on laptop computers and tablets.\nM1: We're happy to be here. Our printers are perfect for students or people with home offices who may have limited space. My partner, Murat, will be setting up the printer station.\nM2: Yes-where can I put our demonstration table?\nW: I'l show you the area. Also, if you brought any brochures with you, itil be helpful to put those out for people to take.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương: brochures (tờ rơi) ~ informational materials (tài liệu thông tin) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, suggest, do\n- Dang câu hỏi: thông tin chi tiết\n- Ởlời đối thoại, người phụ nữ nói \"ifyou brought any brochures with you, it'll be helpful to put those out for people to take.\" Cô ấy đề xuất việc trưng bày tài liệu thông tin.\n-> Phương án (B) là phù hợp nhất.\nLoại phương án sai: Phương án (A), (C), (D) không đề cập.\nTừ vựng cần lưu ý: demonstrate (v): chứng minh, mô tả\ncompact (adj): nhỏ gọn\nlimited (adj): giới hạn\nsetup (v): thiết lập\nbrochure (n): tờ rơi"
  },
  {
   "number": 47,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "47. What type of industry do the speakers most likely work in? (A) Textile manufacturing (B) Food production (C) Health care (D) . Hospitality",
   "transcript": "W1: Gizem and Hector, I'm very pleased with the sales of our brands of cakes, pies, and cookies this past holiday season. Any thoughts on what we should be concentrating on going forward?\nW2: The biggest trend right now is the reduction of sugar. The public wants healthier products, but the same great taste. That'll be our biggest challenge.\nM: One of our ingredient suppliers recently started offering a sweetener made entirely from natural ingredients.\nW1: Are there similar ones on the market? And how do they compare?\nM: I'd have to do some investigation to find out more about that. I have some time available tomorrow afternoon.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\ncakes, pies, and cookies (những cái bánh ngọt, bánh mứt và bánh quy) ~ food (thức ăn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speakers, work, industry\n- Dạng câu hỏi: thông tin tổng quát - Ởđoạn đối thoại, người phụ nữ nói \"I'm very pleased with the sales of our brands of cakes, pies, and cookies...\". Cô ấy dang nói về doanh số bán các sản phẩm thực phẩm, cho thấy họ làm việc trong ngành sản xuất thực phẩm. -> Phương án (B) là phù hợp nhất. Loại phương án sai: Phương án (A), (C), (D) không được đề cập."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "48. What business challenge are the speakers discussing? (A) Lack of qualified personnel (B) Rising production costs (C) Changes in consumer preferences (D) Increased competition",
   "transcript": "W1: Gizem and Hector, I'm very pleased with the sales of our brands of cakes, pies, and cookies this past holiday season. Any thoughts on what we should be concentrating on going forward?\nW2: The biggest trend right now is the reduction of sugar. The public wants healthier products, but the same great taste. That'll be our biggest challenge.\nM: One of our ingredient suppliers recently started offering a sweetener made entirely from natural ingredients.\nW1: Are there similar ones on the market? And how do they compare?\nM: I'd have to do some investigation to find out more about that. I have some time available tomorrow afternoon.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\nthe public wants healthier products (công chúng muốn những sản phẩm tốt cho sức khỏe) ~ changes in consumer preferences\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: business challenge, speakers, discussing\n- Dang câu hỏi: thông tin chi tiết\n- Ở đoạn đối thoại, người phụ nữ nói \"The biggest trend right now is the reduction of sugar. The public wants healthier products, but the same great taste. That'll be our biggest challenge.\". Cô ấy đang thảo luận về\nthách thức trong kinh doanh liên quan đến thay đối trong sở thích của người tiêu dùng.\n-> Phương án (C) là phù hợp nhất. Loại phương án sai:\nPhương án (A), (B), (D) không phản ánh đúng thách thức kinh doanh mà họ đang thảo luận."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "49. What does the man say he will do? (A) Research more information (B) Negotiate a discount (C) Upgrade some machinery (D) Train a new employee",
   "transcript": "W1: Gizem and Hector, I'm very pleased with the sales of our brands of cakes, pies, and cookies this past holiday season. Any thoughts on what we should be concentrating on going forward?\nW2: The biggest trend right now is the reduction of sugar. The public wants healthier products, but the same great taste. That'll be our biggest challenge.\nM: One of our ingredient suppliers recently started offering a sweetener made entirely from natural ingredients.\nW1: Are there similar ones on the market? And how do they compare?\nM: I'd have to do some investigation to find out more about that. I have some time available tomorrow afternoon.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương: do some investigation (thực hiện một vài cuộc điều tra) ~ research (nghiên cứu) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, say, do\n- Dang câu hỏi: thông tin chi tiết\n- O'doan đối thoại, người đàn ông nói \"I'd have to do some investigation to find out more about that. I have some time available tomorrow\nafternoon.” Anh ta đang nói về việc tiến hành một số cuộc điều tra, tìm hiểu thêm về chất làm ngọt.\n-> Phương án (A) là phù hợp nhất. Loại phương án sai: Phương án (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\nthought (n) suy nghĩ\nconcentrate on (phr.v): tập trung\nvào\ngoing forward (phr.v): tiến liên\nphía trước\nreduction (n): sự giảm\npublic (n): công chúng"
  },
  {
   "number": 50,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "50. Why is the man calling? (A) To explain a business merger (B) To describe a new company policy (C) To offer the woman a work assignment (D) To invite the woman to speak at a conference",
   "transcript": "M: Hi, Bianca. I'm calling to see if you'd have time to work on a project for my marketing firm. We've expanded a lot in the past year, and we need some help.\nW: Thanks for thinking of me. What type of work would I be doing?\nM: Well, I we have a new client in Brazil who's interested in creating a marketing campaign for social media sites. You'd be overseeing the campaign.\nW: Oh, I have experience with that. Why don't you send me a detailed description of the work? That'll give me an idea of how much time this project will take.",
   "explanationVi": "Đáp án đúng: C\n\n50. Tại sao người đàn ông lại gọi điện?\n(A) Để giải thích việc sáp nhập doanh nghiệp\n(B) Để mô tả chính sách mới của công ty\n(C) Giao cho người phụ nữ một công việc\n(D) Mời người phụ nữ phát biểu tại một hội nghị\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, man, calling\n- Dạng câu hỏi: thông tin tổng quát\n- Người đàn ông nói \"I'm calling to ...” báo hiệu đáp án sắp đến. Sau đó, người đàn ông trình bày “... see if you'd have time to work on a project for my marketing firm.\" Anh ta đang gọi để mời người phụ nữ tham gia một dự án làm việc.\n-> Phương án (C) là phù hợp nhất Loại phương án sai: Phương án (A), (B), (D) không phản ánh đúng lý do anh ta gọi."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "51. What does the man say a client is interested in doing? (A) Purchasing another business (B) Finding a new office space (C) Revising a budget proposal (D) Creating a marketing campaign",
   "transcript": "M: Hi, Bianca. I'm calling to see if you'd have time to work on a project for my marketing firm. We've expanded a lot in the past year, and we need some help.\nW: Thanks for thinking of me. What type of work would I be doing?\nM: Well, I we have a new client in Brazil who's interested in creating a marketing campaign for social media sites. You'd be overseeing the campaign.\nW: Oh, I have experience with that. Why don't you send me a detailed description of the work? That'll give me an idea of how much time this project will take.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: client, interested in doing\n- Dang câu hỏi: thông tin chi tiết\n- Người đàn ông nói \"We have a new client in Brazil who's interested in creating a marketing campaign for social media sites.\" Thông tin này có\nchứa tat cả từ khóa của câu hỏi. Anh ta mô tả sự quan tâm của khách hàng là tạo ra một chiến dịch tiếp thị.\n-> Phương án (D) là phù hợp nhất\nLoại phương án sai:\nPhương án (A), (B), (C) không được đề cập."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "52. What does the woman ask the man to send? (A) A project description (B) An event invitation (C) Some social media inks (D) Some contact information",
   "transcript": "M: Hi, Bianca. I'm calling to see if you'd have time to work on a project for my marketing firm. We've expanded a lot in the past year, and we need some help.\nW: Thanks for thinking of me. What type of work would I be doing?\nM: Well, I we have a new client in Brazil who's interested in creating a marketing campaign for social media sites. You'd be overseeing the campaign.\nW: Oh, I have experience with that. Why don't you send me a detailed description of the work? That'll give me an idea of how much time this project will take.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\na detailed description of the work (bản mô tả chỉ tiết về công việc) ~ a project description (bản mô tả dự án)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, ask, send\n- Dang câu hỏi: thông tin chi tiết\n- Người phụ nữ nói \"Why don't you send me a detailed description of the work?\" Cô ấy đang yêu cầu một bản mô tả chi tiết về dự án.\n-> Phương án (A) là phù hợp nhất\nLoại phương án sai:\nPhương án (B), (C), (D) không phản ánh đúng yêu cầu của người phụ nữ.\nTừ vựng cần lưu ý:\nexpand (v): mở rộng\nbe interested in (v): hứng thú về\noversee (v): nhìn trước\nexperience (n): kinh nghiệm\ndetailed (adj): tính chi tiết"
  },
  {
   "number": 53,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "53. What problem does the woman mention? (A) A vehicle is out of service. (B) An employee is late. (C) A shipment was damaged (D) Traffic is heavy.",
   "transcript": "W: Hey, Koji? We were about to pack van number five for the music festival when we noticed it's got a flat tire.\nM: Oh. That's not good.\nW: We're supposed to get there by eleven to set up lunch for the performers. Is there another van we can take?\nM: Let me see what's available. We've got a lot of catering jobs today. Ah, yes-we can use van number three. Do you need help loading?\nW: Yes, thanks. The food's already in coolers, but everything's in the kitchen with the serving utensils and napkins. Itall needs to be brought to the parking area.\nM: All right; I can help with that.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương: van (xe van) ~ a vehicle (phương tiện xe)\ngot a flat tire (bị xẹp lốp) ~ is out of service (không còn hoạt động)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, mention, problem.\n- Dang câu hỏi: thông tin chi tiết »„ Người phụ nữ nói \"We were about to pack van number five for the music\nfestival when we noticed it's got a flat tire.\" Cô ấy đang đề cập đến vấn đề về chiếc xe tải không thé sử dung được.\n-> Phương án (A) là phù hợp nhất Loại phương án sai: Phương án (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "54. Where do the speakers most likely work? (A) At a recording studio (B) At a catering company (C) At a radio station (D) At a car dealership",
   "transcript": "W: Hey, Koji? We were about to pack van number five for the music festival when we noticed it's got a flat tire.\nM: Oh. That's not good.\nW: We're supposed to get there by eleven to set up lunch for the performers. Is there another van we can take?\nM: Let me see what's available. We've got a lot of catering jobs today. Ah, yes-we can use van number three. Do you need help loading?\nW: Yes, thanks. The food's already in coolers, but everything's in the kitchen with the serving utensils and napkins. Itall needs to be brought to the parking area.\nM: All right; I can help with that.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, speakers, work.\n- Dạng câu hỏi: thông tin tổng quát\n- Người đàn ông nói \"We've got a lot of catering jobs today.\" Điều nay cho thấy họ làm việc ở một công ty phục vụ ăn uống. -> Phương án (B) là phù hợp nhất Loại phương án sai: Phương án (A), (C), (D) không phản ánh đúng nơi làm việc của họ."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "55. What does the man say he will do next? (A) Arrange for a car repair (B) Order some kitchen supplies (C) Carry some items (D) Offer a refund",
   "transcript": "W: Hey, Koji? We were about to pack van number five for the music festival when we noticed it's got a flat tire.\nM: Oh. That's not good.\nW: We're supposed to get there by eleven to set up lunch for the performers. Is there another van we can take?\nM: Let me see what's available. We've got a lot of catering jobs today. Ah, yes-we can use van number three. Do you need help loading?\nW: Yes, thanks. The food's already in coolers, but everything's in the kitchen with the serving utensils and napkins. Itall needs to be brought to the parking area.\nM: All right; I can help with that.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\neverything, the serving utensils and napkins (mọi thứ, dụng cụ phục vụ và khan ăn) ~ some items (một số món đồ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, say, next.\n- Dang câu hỏi: thông tin chi tiết\n- Người phụ nữ nói “The food's already in coolers, but everything's in the kitchen with the serving utensils and napkins. It all needs to be brought to the parking.” báo hiệu một yêu cầu cho hành động vật dụng cần được mang đến chỗ đậu xe. Sau đó, người đàn ông nói \"All right; I can help with that.\" Điều này cho thấy anh ta sẽ thực hiện hành động người phụ nữ yêu cầu.\n-> Phương án (C) là phù hợp nhất Loại phương án sai:\n- Phương án (B) là bẫy vì “the serving utensils and napkins” có thể gần tương đương với “kitchen supplies” nhưng người phụ nữ không yêu cầu người đàn ông phải đặt hàng thêm.\n- Phươngán (A), (D) không phản ánh đúng hành động tiếp theo của anh ta.\nTừ vựng cần lưu ý:\npack (v): gói\nnotice (v): thông báo\nget a flat tire (v.phr): bị xep lốp be supposed to (v): lẽ ra phải performer (n): người biểu diễn"
  },
  {
   "number": 56,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "56. Why is the man calling the woman? (A) To plan a company event (B) To confirm a work deadline (C) To discuss a career path (D) To accept a job offer",
   "transcript": "M: Thanks for taking my call. As I mentioned in my e-mail, I'm interested in working in your field. But I'm talking to some professionals first so I can find out more about it.\nW: Happy to help.\nM: So how did you get your start?\nW: Oh, my family always subscribed to three newspapers. So I always thought the news was important. At my university, I joined the newspaper and eventually worked my way up to being an editor.\nM: Wow. Is it true that people in the news business work very long hours? So what's your schedule like?",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương: talking (nói chuyện) ~ discuss (thảo luận) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, man, calling, woman.\n- Dạng câu hỏi: thông tin tổng quát\n- Người đàn ông nói \"Thanks for taking my call.” báo hiệu đáp án sắp đến. Người đàn ông tiếp lời “As I mentioned in my e-mail, I'm interested in working in your field. But I'm talking to some professionals first so I can find out more about it.\" Điều này cho thấy anh ta gọi dé thảo luận về việc làm trong lĩnh vực của người phụ nữ.\n-> Phương án (C) là phù hợp nhất\nLoại phương án sai: Phương án (A), (B), (D) không phản ánh đúng lý do anh ta gọi."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "57. Who most likely is the woman? (A) A newspaper editor (B) A university professor (C) A delivery person (D) A professional actor",
   "transcript": "M: Thanks for taking my call. As I mentioned in my e-mail, I'm interested in working in your field. But I'm talking to some professionals first so I can find out more about it.\nW: Happy to help.\nM: So how did you get your start?\nW: Oh, my family always subscribed to three newspapers. So I always thought the news was important. At my university, I joined the newspaper and eventually worked my way up to being an editor.\nM: Wow. Is it true that people in the news business work very long hours? So what's your schedule like?",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, woman.\n- Dạng câu hỏi: thông tin tổng quát\n- Người phụ nữ nói \"Oh, my family always subscribed to three newspapers.\" va \"At my university, I joined the newspaper and\neventually worked my way up to being an editor.\" Điều này cho thấy cô ấy là biên tập viên tờ báo. -> Phương án (A) là phù hợp nhất Loại phương án sai: Phương án (B), (C), (D) không được đề cập."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "58. What will the woman most likely do next? (A) Negotiate a contract (B) Explain an office policy (C) Review a resume (D) Describe a work schedule",
   "transcript": "M: Thanks for taking my call. As I mentioned in my e-mail, I'm interested in working in your field. But I'm talking to some professionals first so I can find out more about it.\nW: Happy to help.\nM: So how did you get your start?\nW: Oh, my family always subscribed to three newspapers. So I always thought the news was important. At my university, I joined the newspaper and eventually worked my way up to being an editor.\nM: Wow. Is it true that people in the news business work very long hours? So what's your schedule like?",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, do next.\n- Dang câu hỏi: thông tin chi tiết\n- Người đàn ông hỏi nói \"So whats your schedule like?\" có chứa từ “schedule” trong phương án (D). Điều này cho thấy cô ấy sẽ hỏi về lịch trình làm việc của người phụ nữ. Vì vậy nên sau đó cô ấy có thể mô tả lịch trình làm việc cho anh ta. -> Phương án (D) là phù hợp nhất Loại phương án sai:\nPhương án (A), (B), (C) không phản ánh đúng hành động tiếp theo của cô ấy.\nTừ vựng cần lưu ý:\nmention (v): đề cập\nprofessional (adj): chuyện nghiệp\nsubscribe (v): đăng ký\neventually (adv): cuối cùng\nwork one’s way (v): làm việc theo ý một người nào đó editor (n): người chỉnh sửa"
  },
  {
   "number": 59,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "59. What are the speakers mainly discussing? (A) A new transportation route (B) A company merger (C) A public relations initiative (D) A medical facility design",
   "transcript": "M: Hi, Karen! I just read the article on the company Web site about the proposed merger with az Corporation. It looks like we're going ahead with it.\nW: There would be a lot of advantages to merging operations, although they also talked about it last year.\nM: I remember that. But there were a lot of details to work out-like whether our offices would stay in Chicago. Now it looks like we won't be relocating.\nW: Well, I really don't want to move, so that's a relief.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speakers, mainly discussing.\n- Dạng câu hỏi: thông tin tổng quát\n- Người đàn ông nói \"I just read the article on the company Web site about the proposed merger with QZ Corporation.\" Cho thấy cuộc trò chuyện chủ yếu xoay quanh việc sáp nhập công ty.\n-> Phương án (B) là phù hợp nhất\nLoại phương án sai:\nPhương án (A), (C), (D) không phản ánh đúng chủ đề chính của cuộc trò chuyện."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "60. Why does the woman say, “they also talked about it last year”? (A) To express doubt (B) To explain a process (C) To make a recommendation (D) To update some information",
   "transcript": "M: Hi, Karen! I just read the article on the company Web site about the proposed merger with az Corporation. It looks like we're going ahead with it.\nW: There would be a lot of advantages to merging operations, although they also talked about it last year.\nM: I remember that. But there were a lot of details to work out-like whether our offices would stay in Chicago. Now it looks like we won't be relocating.\nW: Well, I really don't want to move, so that's a relief.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, say, \"they also talked about it last year\"\n- Dang cau hỏi: ngụ ý\n- Người đàn ông nói “ It looks like we're going ahead with it.” để báo hiệu sự nối tiếp về chủ đề sắp nhập công ty.\n- Người phụ nữ nói \"There would be a lot of advantages to merging operations, although they also talked about it last year.\" Cho thấy cô ấy nói điều này để nối tiếp thông tin chủ đề của cuộc trò chuyện của họ vào năm ngoái và bày tỏ sự nghi ngờ.\n-> Phương án (A) là phù hợp nhất\nLoại phương án sai:\n- Phương án (B) là bẫy vì dù đoạn hội thoại có đề cập chuyện quá khứ, và hiện tại nhưng nó không phải là quá trình cụ thể.\n- Phươngán (C) chứa thông tin không được đề cập.\n- Phương án (D) là bẫy vi dù cô ấy có nói thêm vài thông tin nhưng không có ý cập nhật bất kỳ tin tức nào mới."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "D",
   "group": "59-61",
   "textEn": "61. What does the woman want to avoid? (A) Paying a certification fee (B) Training additional staff (C) Upgrading some technology (D) Relocating to another city",
   "transcript": "M: Hi, Karen! I just read the article on the company Web site about the proposed merger with az Corporation. It looks like we're going ahead with it.\nW: There would be a lot of advantages to merging operations, although they also talked about it last year.\nM: I remember that. But there were a lot of details to work out-like whether our offices would stay in Chicago. Now it looks like we won't be relocating.\nW: Well, I really don't want to move, so that's a relief.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương: really don’t want (thật sự không muốn) = want to avoid (muốn tránh né) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, want to avoid.\n- Dang câu hỏi: thông tin chi tiết\n- Người phụ nữ nói \"Now it looks like we won't be relocating.\" và \"I really don't want to move, so that's a relief.\" Cho thấy cô ấy muốn tránh việc di chuyén dia diém.\n-> Phương án (D) là phù hợp nhất Loại phương án sai: Phương án (A), (B), (C) không phản ánh đúng nhu cầu cụ thể mà người phụ nữ\nTừ vựng cần lưu ý:\narticle (n): bài báo\npropose (v): đề nghị\nmerger (v): sáp nhập\ngo ahead with (phr.v): tiếp tục với advantage (n): lợi thế"
  },
  {
   "number": 62,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "62. Who is a gift for? (A) Donors (B) Volunteers (C) Employees (D) Clients",
   "transcript": "M: Thanks for calling Customized Concepts. How can I help you?\nW: My company wants to give every employee a gift, something useful but not too big. Since we're about to host our annual staff basketball tournament, I thought a water bottle might be good.\nM: We carry a few drink containers. If you're at our Web site, you'll see them under the Lifestyle tab.\nW: Let me pull it up now... All right.\nM: I recommend the metal bottle with the wide-mouthed lid. It's easier to clean than the one with the straw.\nW: OK, thanks. And you could put our company logo on it, right?\nM: Yes. You'll just need to send me the graphic file.\nW: I can do that.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, gift.\n- Dang câu hỏi: thông tin chi tiết\n- Người phụ nữ nói \"My company wants to give every employee a gift\", cho thấy quà tặng dành cho nhân viên. Ta thấy trong thông tin có từ khóa “gift”.\n-> Phương án (C) là phù hợp nhất\nLoại phương án sai:\nPhương án (A), (B), (D) không phản ánh đúng đối tượng nhận quà."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "63. Look at the graphic. What is the price of the item the man recommends? (A) $21 (B) $18 (C) $24 (D) $15",
   "transcript": "M: Thanks for calling Customized Concepts. How can I help you?\nW: My company wants to give every employee a gift, something useful but not too big. Since we're about to host our annual staff basketball tournament, I thought a water bottle might be good.\nM: We carry a few drink containers. If you're at our Web site, you'll see them under the Lifestyle tab.\nW: Let me pull it up now... All right.\nM: I recommend the metal bottle with the wide-mouthed lid. It's easier to clean than the one with the straw.\nW: OK, thanks. And you could put our company logo on it, right?\nM: Yes. You'll just need to send me the graphic file.\nW: I can do that.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, price, item the man recommends.\n- Dang câu hỏi: liên quan bảng biểu, biểu đồ\n- Người đàn ông giới thiệu chai nước kim loại với nắp miệng rộng “I recommend the metal bottle with the wide-mouthed lid.” Trong thông tin có chứa từ khóa “recommend”. Giá của sản phẩm này nếu xem trong biểu đồ là $24.\n-> Phương án (C) là phù hợp nhất\nLoại phương án sai:\nPhương án (A), (C), (D) không phản ánh đúng giá do sản phẩm khác với ý của người nói."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "64. What is the woman going to send to the man? (A) A graphic file (B) A list of names (C) A delivery address (D) An account number",
   "transcript": "M: Thanks for calling Customized Concepts. How can I help you?\nW: My company wants to give every employee a gift, something useful but not too big. Since we're about to host our annual staff basketball tournament, I thought a water bottle might be good.\nM: We carry a few drink containers. If you're at our Web site, you'll see them under the Lifestyle tab.\nW: Let me pull it up now... All right.\nM: I recommend the metal bottle with the wide-mouthed lid. It's easier to clean than the one with the straw.\nW: OK, thanks. And you could put our company logo on it, right?\nM: Yes. You'll just need to send me the graphic file.\nW: I can do that.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, going to send, graphic file.\n- Dang câu hỏi: thông tin chi tiết\n- Người đàn ông nói \"You'll just need to send me the graphic file.\" cho thấy ông ấy muốn người nghe gửi một tệp đồ họa. Cho nên cô ấy đồng ý với yêu cầu đó “I can do that.”.\n-> Phượng án (A) là phù hợp nhất\nLoại phương án sai: Phương án (B), (C), (D) không chứa thông tin được đề cập.\nTừ vựng cần lưu ý:\nuseful (adj): hữu ích\nannual (adj): hằng năm\ncarry (v): mang\ncontainer (n): vat chứa\npull up (phr.v): kéo lên"
  },
  {
   "number": 65,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "65. What type of art will be displayed in an exhibit? (A) Clay sculptures (B) Oil paintings (C) Black-and-white photographs (D) Pencil drawings",
   "transcript": "W: Yun, I just finished recording the audio guide for the pencil drawings that I be included in our modern art exhibit next week. The files'll be loaded onto the audio devices tomorrow.\nM: That's great. But, unfortunately, we have to make one change. The drawing by Claudia Hoffman will no longer be in the exhibit. There was a scheduling mix-up, and it was promised to another museum starting next week.\nW: Oh, that's too bad. That was one of my favorite pieces. Will you put anything in its place?\nM: No. We'll just remove it.\nW: OK, then I'll make that change to the audio-guide recording. I'll do that right away.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: art, displayed, exhibit.\n- Dang câu hỏi: thông tin chi tiết »„ Người phụ nữ nói \"I just finished recording the audio guide for the pencil drawings\" cho thấy loại nghệ thuật sẽ được trưng bay là bản vẽ bằng bút chì. s ->Phươngán (D) là phù hợp nhất Loại phương án sai: Phương án (A), (B), (C) không được đề cập."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "66. Look at the graphic. Which piece of artwork will no longer be included? (A) A Careful Glance (B) Promises (C) Stormy Sea (D) The Moment",
   "transcript": "W: Yun, I just finished recording the audio guide for the pencil drawings that I be included in our modern art exhibit next week. The files'll be loaded onto the audio devices tomorrow.\nM: That's great. But, unfortunately, we have to make one change. The drawing by Claudia Hoffman will no longer be in the exhibit. There was a scheduling mix-up, and it was promised to another museum starting next week.\nW: Oh, that's too bad. That was one of my favorite pieces. Will you put anything in its place?\nM: No. We'll just remove it.\nW: OK, then I'll make that change to the audio-guide recording. I'll do that right away.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương\nno longer be included (không được bao gồm) ~ no longer be in the exhibit (không được có trong buối triển lãm)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, piece of artwork, no longer included.\n- Dang câu hỏi: liên quan đến bảng biểu, biểu đồ\n- Người đàn ông nói \"The drawing by Claudia Hoffman will no longer be in the exhibit.\" cho thấy tác phẩm của Claudia Hoffman sẽ không còn trong\ntriển lãm. Khi nhìn trong biểu đồ, tác phẩm của ông Claudia Hoffman tên la “Stormy Sea”.\n-> Phương án (C) là phù hợp nhất Loại phương án sai:\nPhương án (B), (C), (D) chứa thông tin không chính xác về tác phẩm bị loại bỏ do tác giả không được đề cập."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "67. What does the woman say she will do right away? (A) Speak with an artist (B) Edit a recording (C) Clean a gallery space (D) Greet some visitors",
   "transcript": "W: Yun, I just finished recording the audio guide for the pencil drawings that I be included in our modern art exhibit next week. The files'll be loaded onto the audio devices tomorrow.\nM: That's great. But, unfortunately, we have to make one change. The drawing by Claudia Hoffman will no longer be in the exhibit. There was a scheduling mix-up, and it was promised to another museum starting next week.\nW: Oh, that's too bad. That was one of my favorite pieces. Will you put anything in its place?\nM: No. We'll just remove it.\nW: OK, then I'll make that change to the audio-guide recording. I'll do that right away.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\nmake that change (tạo ra sự thay đối đó) ~ edit (chỉnh sửa) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: woman, will do right away.\n- Dang câu hỏi: thông tin chi tiết\n- Người phụ nữ nói \"then I'll make that change to the audio-guide recording. I'll do that right away.\" có chứa tất cả từ khóa. Điều này cho thấy cô ấy sẽ chỉnh sửa bản ghi âm ngay lập tức.\n-> Phương án (B) là phù hợp nhất Loại phương án sai:\nPhương án (A), (C), (D) chứa thông tin không phản ánh đúng về hành động ngay lập tức của cô ấy.\nTừ vựng cần lưu ý:\ndrawing (n): bức vẽ\nmodern art (n): tranh hiện đại exhibit (v): triển lãm\ndevice (n): thiết bị\nunfortunately (adv): không may mắn"
  },
  {
   "number": 68,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "68. Who most likely are the speakers? (A) Urban planners (B) Journalists (C) Engineers (D) Environmental scientists",
   "transcript": "M: I'm glad we were assigned to cover the press conference earlier today. I counted seven other major media networks there, in addition to ours.\nW: Well, the offshore wind industry is going to transform the way this region gets its power.\nM: Agreed. Let's compare our facts before we start writing.\nW: So the largest cluster of wind turbines-off the coast of Winston-is already built. The other sites are at different stages of construction, though Lanchester is also close to being done.\nM: Right. And I think it's crucial for us to focus on how many new jobs related to assembling and maintaining the turbines are opening up in the area as a result of this.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, speakers.\n- Dạng câu hỏi: thông tin tổng quát\n- Người đàn ông nói \"I'm glad we were assigned to cover the press\nconference\". Ta có “press conference” (họp báo) cho thấy những người nói là nhà báo. -> Phương án (B) là phù hợp nhất Loại phương án sai: Phương án (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "69. Look at the graphic. Which site has already been completed? (A) Site A (B) Site B (C) Site C (D) Site D",
   "transcript": "M: I'm glad we were assigned to cover the press conference earlier today. I counted seven other major media networks there, in addition to ours.\nW: Well, the offshore wind industry is going to transform the way this region gets its power.\nM: Agreed. Let's compare our facts before we start writing.\nW: So the largest cluster of wind turbines-off the coast of Winston-is already built. The other sites are at different stages of construction, though Lanchester is also close to being done.\nM: Right. And I think it's crucial for us to focus on how many new jobs related to assembling and maintaining the turbines are opening up in the area as a result of this.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, site, already completed.\n- Dang câu hỏi: liên quan đến bảng biểu, biểu đồ\n- Người phụ nữ nói \"So the largest cluster of wind turbines-off the coast of Winston-is already built.\" Nhìn vào biểu đồ cho thấy Địa điểm D ở Winston đã được hoàn thành.\n- ->Phươngán (D) là phù hợp nhất\nLoại phương án sai:\nPhương án (B), (C), (D) chứa thông tin không chính xác về địa điểm đã hoàn thành"
  },
  {
   "number": 70,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "70. What does the man suggest focusing on? (A) Work opportunities (B) Wind turbine costs (C) Supply chain issues (D) Power capacity",
   "transcript": "M: I'm glad we were assigned to cover the press conference earlier today. I counted seven other major media networks there, in addition to ours.\nW: Well, the offshore wind industry is going to transform the way this region gets its power.\nM: Agreed. Let's compare our facts before we start writing.\nW: So the largest cluster of wind turbines-off the coast of Winston-is already built. The other sites are at different stages of construction, though Lanchester is also close to being done.\nM: Right. And I think it's crucial for us to focus on how many new jobs related to assembling and maintaining the turbines are opening up in the area as a result of this.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\nhow many new jobs (có bao nhiêu công việc), are opening up in the area (đang mở trong khu vực) ~ work opportunities (cơ hội làm việc)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, suggest, focus on.\n- Dang câu hỏi: thông tin chi tiết\n- Người đàn ông nói \"And I think it's crucial for us to focus on how many new jobs related to assembling and maintaining the turbines are opening up in the area as a result of this.\" cho thấy ho đề xuất tập trung vào cơ hội viéc lam.\n-> Phương án (A) là phù hợp nhất Loại phương án sai:\nPhương án (B), (C), (D) chứa thông tin không phản ánh đúng về tập trung vào khía cạnh cụ thể.\nTừ vựng cần lưu ý:\nassign (v): gán\ncover (v): che đậy\npress conference(n): hop\nbao\ncount (v): dém\nin addition to (conj.): thém\nnữa la"
  },
  {
   "number": 71,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "71. Who has recorded the message? (A) A city mayor's office (B) A maintenance department (C) An automobile dealership (D) A building management office",
   "transcript": "You have reached the information line for the Cranbury Apartments management office. On Monday, April twelfth, maintenance work will begin to repave the entire parking area adjacent to our building's main entrance. All Cranbury residents should move their vehicles from their designated parking spots before eight A.M. on Monday. Any vehicle still in its spot after eight A.M. will be towed at the owner's expense. A map of alternate parking sites was mailed to residents last week and is also posted in the building lobby.",
   "explanationVi": "Đáp án đúng: D\n\n71. Ai đã ghi âm tin nhắn?\n(A) Văn phòng thị trưởng thành phố\n(B) Phòng bảo trì\n(C) Một đại lý ô tô\n(D) Văn phòng quản lý tòa nhà\nCách diễn đạt tương đương:\n- Cranbury Apartments management office (văn phòng quản ly Căn hộ Cranbury) ~ A building management office (văn phòng quản lý tòa nhà)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, recorded, message\n- Dạng câu hỏi: Thông tin tổng quát\n- Dựa vào lời thoại đầu tiên của người đàn ông, “You have reached the information line for the Cranbury Apartments management office” (Bạn vừa kết nối tới đường dây thông tin của văn phòng quản lý Căn hộ Cranbury). Như vậy, đoạn ghi âm lời nhắn này thuộc văn phòng quản lý toàn nhà.\n- Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (C) thông tin không được đề cập\n\nDịch bài nói:\nM-Au 71 Ban vừa kết nối tới đường day thông tin của văn phòng quan ly Căn hộ Cranbury. Vào thứ Hai, ngày 12 tháng 4, việc bảo trì sẽ bắt đầu để lát lại toàn bộ khu vực đỗ xe cạnh lối vào chính của tòa nhà của chúng tôi. 72 Tất cả cư dân Cranbury nên di chuyển phương tiện của mình khỏi các điểm đỗ xe được chỉ\nđịnh trước 8 giờ sáng thứ Hai. Bất kỳ phương tiện nào vẫn ở vị trí sau 8 giờ sáng sẽ được kéo đi với chi phi do chủ sở hữu phương tiện chiu. 73 Bản đồ các bãi đỗ xe thay thế đã được gửi mail đến người dân vào tuần trước và cũng được dán ở sảnh tòa nhà."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "72. What are the listeners asked to do? (A) Move their vehicles (B) Pay their parking fines (C) Use an alternate entrance (D) Participate in a meeting",
   "transcript": "You have reached the information line for the Cranbury Apartments management office. On Monday, April twelfth, maintenance work will begin to repave the entire parking area adjacent to our building's main entrance. All Cranbury residents should move their vehicles from their designated parking spots before eight A.M. on Monday. Any vehicle still in its spot after eight A.M. will be towed at the owner's expense. A map of alternate parking sites was mailed to residents last week and is also posted in the building lobby.",
   "explanationVi": "Đáp án đúng: A\n\n72. Người nghe được yêu cầu làm gì?\n(A) Di chuyển phương tiện của họ\n(B) Trả tiền phạt đỗ xe\n(C) Sử dụng lối vào thay thế\n(D) Tham gia vào một cuộc họp\nCách diễn đạt tương đương:\nareasked to do (được yêu cầu làm gi) = should (nên làm gì)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: listeners, asked to\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên “All Cranbury residents should ...” (Tất cả cư dân của Branbury nên ...). “Cranbury residents” là đối tượng người nghe đoạn thông báo, tương đương với “listeners” trong đề. Doan thông tin tiếp theo sẽ là việc người nghe cần làm: “move their vehicles from their designated parking spots” (di chuyển phương tiện của mình khỏi các điểm đỗ xe được chỉ định).\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- Có thông tin về việc nộp tiền “at the owner's expense” (phí do chủ sở hữu chịu) nhưng là tiền phải nộp khi xe bị kéo đi do vẫn để xe tại vị trí cũ “any vehicle still in its spot after 8 A.M will be towed”, không phải tiền phạt đậu đỗ xe “parking fines” > Loại (B)\n- Có thông tin bay ở từ “alternate”. Doan thông báo nói về những chỗ đỗ xe thay thế “alternate parking sites”, không phải cổng thay thế “alternate entrance” > Loại (C)\n- (D) thông tin không được đề cập\n\nDịch bài nói:\nM-Au 71 Ban vừa kết nối tới đường day thông tin của văn phòng quan ly Căn hộ Cranbury. Vào thứ Hai, ngày 12 tháng 4, việc bảo trì sẽ bắt đầu để lát lại toàn bộ khu vực đỗ xe cạnh lối vào chính của tòa nhà của chúng tôi. 72 Tất cả cư dân Cranbury nên di chuyển phương tiện của mình khỏi các điểm đỗ xe được chỉ\nđịnh trước 8 giờ sáng thứ Hai. Bất kỳ phương tiện nào vẫn ở vị trí sau 8 giờ sáng sẽ được kéo đi với chi phi do chủ sở hữu phương tiện chiu. 73 Bản đồ các bãi đỗ xe thay thế đã được gửi mail đến người dân vào tuần trước và cũng được dán ở sảnh tòa nhà."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "73. What does the speaker say was mailed last week? (A) An election ballot (B) A maintenance plan (C) A map (D) A coupon",
   "transcript": "You have reached the information line for the Cranbury Apartments management office. On Monday, April twelfth, maintenance work will begin to repave the entire parking area adjacent to our building's main entrance. All Cranbury residents should move their vehicles from their designated parking spots before eight A.M. on Monday. Any vehicle still in its spot after eight A.M. will be towed at the owner's expense. A map of alternate parking sites was mailed to residents last week and is also posted in the building lobby.",
   "explanationVi": "Đáp án đúng: C\n\n73. Người nói nói cái gì đã được gửi vào tuần trước?\n(A) Một lá phiếu bầu cử\n(B) Kế hoạch bảo trì\n(C) Bản đồ\n(D) Một phiếu giảm giá\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, mailed, last week\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại “A map of alternate parking sites was mailed to residents last week” (Một bản đồ về những chỗ đỗ xe thay thế đã được gửi mail đến cư dân vào tuần trước). > Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) thông tin không được đề cập\nTừ vựng cần lưu ý: reach (v) gọi đến, kết nối đến maintaince (n) bảo trì, duy trì repave (v) lát lại (sàn, mặt đường...) adjacent to (adj) sát với, liền kề với designated (adj) được chỉ định tow (v): kéo đi alternate (adj): thay thế mayor (n): thị trưởng department (n): phòng, ban fine (n): tiền phạt election (n) bầu cử ballot (n) lá phiếu coupon (n) phiếu giảm giá\n\nDịch bài nói:\nM-Au 71 Ban vừa kết nối tới đường day thông tin của văn phòng quan ly Căn hộ Cranbury. Vào thứ Hai, ngày 12 tháng 4, việc bảo trì sẽ bắt đầu để lát lại toàn bộ khu vực đỗ xe cạnh lối vào chính của tòa nhà của chúng tôi. 72 Tất cả cư dân Cranbury nên di chuyển phương tiện của mình khỏi các điểm đỗ xe được chỉ\nđịnh trước 8 giờ sáng thứ Hai. Bất kỳ phương tiện nào vẫn ở vị trí sau 8 giờ sáng sẽ được kéo đi với chi phi do chủ sở hữu phương tiện chiu. 73 Bản đồ các bãi đỗ xe thay thế đã được gửi mail đến người dân vào tuần trước và cũng được dán ở sảnh tòa nhà."
  },
  {
   "number": 74,
   "part": 4,
   "answer": "C",
   "group": "74-76",
   "textEn": "74. What is the topic of the episode? (A) Garden landscaping (B) Window installation (C) Roof maintenance (D) Kitchen renovations",
   "transcript": "Welcome to Your House Works. On today's episode, we'll go over how you can maintain and make minor repairs to the roof of your home. The first thing to do is to invest in a few special tools, like a trowel and crowbar. It's important to choose some that are high quality because you'll use them for many years. With your trowel and some roof cement, you can seal any cracks or chips. The crowbar will help you remove loose shingles that you can then replace. Now, I highly recommend you take photos of your roof every year so that you can track its overall condition.",
   "explanationVi": "Đáp án đúng: C\n\nChủ đề của tập này là gì?\n(A) Cảnh quan sân vườn\n(B) Lắp đặt cửa sổ\n(C) Bảo trì mái nhà\n(D) Cải tạo nhà bếp\nCách diễn đạt tương đương:\nsToofmmaintenance (việc bảo trì) = maintain and make minor repairs to the roof (bảo trì và sửa chữa nhỏ cho mái nhà)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, topic, episode\n- Dạng câu hỏi: Thông tin tổng quát\n- Dựa vào lời thoại “On today's episode, we'll go over ...” (Trong tập hôm nay, chúng ta sẽ tìm hiểu...). Đoạn thông tin sau sẽ là chủ đề: “how you can maintain and make minor repairs to the roof of your home” (cách bạn có thể bảo tri va sửa chữa nhỏ cho mái nhà của minh). > Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) thông tin không được đề cập\n\nDịch bài nói:\nW-Am Chào mừng đến với Your House Works. 74 Trong tập hôm nay, chúng ta sẽ tìm hiểu cách bạn có thể bảo trì và sửa chữa nhỏ mái nhà của mình. 75 Điều đầu tiên cần làm là đầu tư vào một số dụng cụ đặc biệt, như cái bay và xà beng. Điều quan trọng là chọn một số loại có chất lượng cao vì bạn sẽ sử dụng chúng trong nhiều năm. Với cái bay và một ít xi măng dành cho mái, bạn có thể bịt kín mọi vết nứt hoặc vết sứt mẻ. Xà beng sẽ giúp bạn loại bỏ các tấm ngói lỏng lẻo mà sau đó bạn có thể thay thế. Bây giờ, 76 tôi thực sự khuyên bạn nên chụp ảnh mái nhà của mình hàng năm để có thể theo dõi tình trạng tổng thể của nó."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "75. What does the speaker emphasize about some tools? (A) They should be cleaned regularly. (B) They should be of high quality. (C) They were recently invented. (D) They can be easily stored.",
   "transcript": "Welcome to Your House Works. On today's episode, we'll go over how you can maintain and make minor repairs to the roof of your home. The first thing to do is to invest in a few special tools, like a trowel and crowbar. It's important to choose some that are high quality because you'll use them for many years. With your trowel and some roof cement, you can seal any cracks or chips. The crowbar will help you remove loose shingles that you can then replace. Now, I highly recommend you take photos of your roof every year so that you can track its overall condition.",
   "explanationVi": "Đáp án đúng: B\n\nNgười nói nhấn mạnh điều gì về một số công cụ?\n(A) Chúng nên được làm sạch thường xuyên.\n(B) Chúng phải có chất lượng cao.\n(C) Chúng mới được phát minh gần đây.\n(D) Chúng có thể được lưu trữ dễ dàng.\nCách diễn đạt tương đương:\n- Emphasize (nhấn mạnh) = it’s important to (việc gì đó thì quan trọng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: emphasize, tools\n- Dang câu hỏi: thông tin chi tiết\n- Người nói đề cập đến dụng cụ “The first thing to do is to invest in a few special tools” (Việc đầu tiên cần làm là đầu tư vào một vài dụng cụ đặc biệt). Sau đó, người nói nhấn mạnh “It's important to choose some that are high quality” (việc chọn những dụng cụ chất lượng cao thì quan trong)— Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) thông tin không được đề cập\n\nDịch bài nói:\nW-Am Chào mừng đến với Your House Works. 74 Trong tập hôm nay, chúng ta sẽ tìm hiểu cách bạn có thể bảo trì và sửa chữa nhỏ mái nhà của mình. 75 Điều đầu tiên cần làm là đầu tư vào một số dụng cụ đặc biệt, như cái bay và xà beng. Điều quan trọng là chọn một số loại có chất lượng cao vì bạn sẽ sử dụng chúng trong nhiều năm. Với cái bay và một ít xi măng dành cho mái, bạn có thể bịt kín mọi vết nứt hoặc vết sứt mẻ. Xà beng sẽ giúp bạn loại bỏ các tấm ngói lỏng lẻo mà sau đó bạn có thể thay thế. Bây giờ, 76 tôi thực sự khuyên bạn nên chụp ảnh mái nhà của mình hàng năm để có thể theo dõi tình trạng tổng thể của nó."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "C",
   "group": "74-76",
   "textEn": "76. What does the speaker recommend doing every year? (A) Treating some wood (B) Consulting an electrician (C) Taking some photos (D) Draining some water",
   "transcript": "Welcome to Your House Works. On today's episode, we'll go over how you can maintain and make minor repairs to the roof of your home. The first thing to do is to invest in a few special tools, like a trowel and crowbar. It's important to choose some that are high quality because you'll use them for many years. With your trowel and some roof cement, you can seal any cracks or chips. The crowbar will help you remove loose shingles that you can then replace. Now, I highly recommend you take photos of your roof every year so that you can track its overall condition.",
   "explanationVi": "Đáp án đúng: C\n\n76. Diễn giả khuyên bạn nên làm gì hàng năm?\n(A) Xử lý một số gỗ\n(B) Tư vấn cho một thợ điện\n(C) Chụp vài bức ảnh\n(D) Xa một ít nước\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, recommend, every year\n- Dang âu hỏi: Thông tin chỉ tiết\n- Dựa vào đoạn thoại “I highly recommend you take photos of your roof every year” (Tôi đặc biệt khuyến nghị ban chụp hình mái nhà của ban hằng năm) > Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (D) thông tin không được đề cập\nTừ vựng cần lưu ý:\nmaintain (v) bảo trì, duy trì\nminor (adj) nhỏ\ntrowel (n) cái bay\ncrowbar (n) cái xa beng\nseal (v) niêm phong, đóng kin\nloose (adj) lỏng lẻo\nrenovation (n) sự cải tiến, cải tạo\nstore (v) lưu trữ, cất giữ\nconsult (v) tham khảo ý kiến, nhờ\ntư vấn\n\nDịch bài nói:\nW-Am Chào mừng đến với Your House Works. 74 Trong tập hôm nay, chúng ta sẽ tìm hiểu cách bạn có thể bảo trì và sửa chữa nhỏ mái nhà của mình. 75 Điều đầu tiên cần làm là đầu tư vào một số dụng cụ đặc biệt, như cái bay và xà beng. Điều quan trọng là chọn một số loại có chất lượng cao vì bạn sẽ sử dụng chúng trong nhiều năm. Với cái bay và một ít xi măng dành cho mái, bạn có thể bịt kín mọi vết nứt hoặc vết sứt mẻ. Xà beng sẽ giúp bạn loại bỏ các tấm ngói lỏng lẻo mà sau đó bạn có thể thay thế. Bây giờ, 76 tôi thực sự khuyên bạn nên chụp ảnh mái nhà của mình hàng năm để có thể theo dõi tình trạng tổng thể của nó."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "77. Who most likely is the speaker? (A) A radio show host (B) A tour guide (C) A sales associate (D) A professor",
   "transcript": "Thanks again for joining me on today's tour of the beautiful Wallingford Conservatory. I hope you enjoyed seeing and learning about the many species of plants and flowers we care for here. As I mentioned at the beginning of the tour, world-renowned botanist Samantha Hughes will be giving a lecture on the care of flowering orchid plants at two o'clock in the community room. I recommend attending. Samantha's work has also been featured in a documentary film called Orchid Caretakers, which you can purchase through the conservatory's online gift shop. I watched it recently and learned many new things about the orchid species we have right here at the conservatory.",
   "explanationVi": "Đáp án đúng: B\n\n77. Ai có khả năng là người nói nhất?\n(A) Người dẫn chương trình radio\n(B) Một hướng dẫn viên du lịch\n(C) Một cộng tác viên bán hàng\n(D) Một giáo sư\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, speaker\n- Dạng câu hỏi: Thông tin tổng quát\n- Dựa vào lời thoại “Thanks again for joining me on today's tour of the beautiful Wallingford Conservatory” (Một lần nữa xin cảm ơn vì đã cùng tôi tham gia chuyến tham quan Nhà kính Wallingford xinh đẹp hôm nay). Như vậy, người nói có khả năng cao là một hướng dẫn viên du lịch. > Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) thông tin không được đề cập\n\nDịch bài nói:\nW-Br 77 Một lần nữa xin cảm ơn vì đã cùng tôi tham gia chuyến tham quan Nhà kính Wallingford xinh đẹp hôm nay. Tôi hy vọng bạn thích thú khi được ngắm nhìn và tìm hiểu về nhiều loài thực vật và hoa mà chúng tôi chăm sóc ở đây. Như tôi đã đề cập ở phần đầu của chuyến tham quan, nhà thực vật học nối tiếng thế giới 78 Samantha Hughes sẽ giảng bài về cách chăm sóc cây lan ra hoa vào lúc hai giờ trong phòng cộng đồng. Tôi khuyên bạn nên tham dự. 79 Tác phẩm của Samantha cũng đã được giới thiệu trong một bộ phim tài liệu có tên Người\nchăm sóc hoa lan mà bạn có thể mua qua cửa hàng quà tặng trực tuyến của nhà kính. Gần đây tôi đã xem nó và học được nhiều điều mới về các loài hoa lan mà chúng tôi có ngay tại nhà kính này."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "78. What will happen at two o'clock? (A) A lecture will begin. (B) A demonstration will be given. (C) An interview will be conducted. (D) A park will close.",
   "transcript": "Thanks again for joining me on today's tour of the beautiful Wallingford Conservatory. I hope you enjoyed seeing and learning about the many species of plants and flowers we care for here. As I mentioned at the beginning of the tour, world-renowned botanist Samantha Hughes will be giving a lecture on the care of flowering orchid plants at two o'clock in the community room. I recommend attending. Samantha's work has also been featured in a documentary film called Orchid Caretakers, which you can purchase through the conservatory's online gift shop. I watched it recently and learned many new things about the orchid species we have right here at the conservatory.",
   "explanationVi": "Đáp án đúng: A\n\nĐiều gì sẽ xảy ra vào lúc hai giờ?\n(A) Một bài giảng sẽ bắt đầu.\n(B) Một cuộc biểu tình sẽ được đưa ra.\n(C) Một cuộc phỏng vấn sẽ được tiến hành.\n(D) Một công viên sẽ đóng cửa.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, happen, two o’clock\n- Dang âu hỏi: Thông tin chỉ tiết\n- Dựavào lời thoại “...will be giving a lecture on the care of flowering orchid plants at two o'clock” (...sẽ có một bài giảng về cách chăm sóc cây lan ra hoa vào lúc hai giờ”. Như vậy, sự kiện xảy ra lúc 2 giờ là có bài giảng. > Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B),(C), (D) thông tin không được đề cập\n\nDịch bài nói:\nW-Br 77 Một lần nữa xin cảm ơn vì đã cùng tôi tham gia chuyến tham quan Nhà kính Wallingford xinh đẹp hôm nay. Tôi hy vọng bạn thích thú khi được ngắm nhìn và tìm hiểu về nhiều loài thực vật và hoa mà chúng tôi chăm sóc ở đây. Như tôi đã đề cập ở phần đầu của chuyến tham quan, nhà thực vật học nối tiếng thế giới 78 Samantha Hughes sẽ giảng bài về cách chăm sóc cây lan ra hoa vào lúc hai giờ trong phòng cộng đồng. Tôi khuyên bạn nên tham dự. 79 Tác phẩm của Samantha cũng đã được giới thiệu trong một bộ phim tài liệu có tên Người\nchăm sóc hoa lan mà bạn có thể mua qua cửa hàng quà tặng trực tuyến của nhà kính. Gần đây tôi đã xem nó và học được nhiều điều mới về các loài hoa lan mà chúng tôi có ngay tại nhà kính này."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "C",
   "group": "77-79",
   "textEn": "79. What is Orchid Caretakers? (A) A book (B) An album (C) A film (D) A magazine",
   "transcript": "Thanks again for joining me on today's tour of the beautiful Wallingford Conservatory. I hope you enjoyed seeing and learning about the many species of plants and flowers we care for here. As I mentioned at the beginning of the tour, world-renowned botanist Samantha Hughes will be giving a lecture on the care of flowering orchid plants at two o'clock in the community room. I recommend attending. Samantha's work has also been featured in a documentary film called Orchid Caretakers, which you can purchase through the conservatory's online gift shop. I watched it recently and learned many new things about the orchid species we have right here at the conservatory.",
   "explanationVi": "Đáp án đúng: C\n\nOrchid Caretakers là gì?\n(A) Một cuốn sách\n(B) Mộtalbum\n(C) Một bộ phim\n(D) Một tạp chí\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, Orchid Caretakers\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại “..featured in a documentary film called Orchid Caretakers” (có trong một bộ phim tài liệu tên “Orchid Caretakers”). Như vay, Orchid Caretakers là tên của một bộ phim. > Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) thông tin không được đề cập\nTừ vựng cần lưu ý: conservatory (n) nhà kính species (n) loài (thực vật, động vật) world-renowned (adj) nối tiếng thế giới sales associate (n.phr) cộng tác viên bán hàng conduct (v) tiến hành\n\nDịch bài nói:\nW-Br 77 Một lần nữa xin cảm ơn vì đã cùng tôi tham gia chuyến tham quan Nhà kính Wallingford xinh đẹp hôm nay. Tôi hy vọng bạn thích thú khi được ngắm nhìn và tìm hiểu về nhiều loài thực vật và hoa mà chúng tôi chăm sóc ở đây. Như tôi đã đề cập ở phần đầu của chuyến tham quan, nhà thực vật học nối tiếng thế giới 78 Samantha Hughes sẽ giảng bài về cách chăm sóc cây lan ra hoa vào lúc hai giờ trong phòng cộng đồng. Tôi khuyên bạn nên tham dự. 79 Tác phẩm của Samantha cũng đã được giới thiệu trong một bộ phim tài liệu có tên Người\nchăm sóc hoa lan mà bạn có thể mua qua cửa hàng quà tặng trực tuyến của nhà kính. Gần đây tôi đã xem nó và học được nhiều điều mới về các loài hoa lan mà chúng tôi có ngay tại nhà kính này."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "80. What event is taking place? (A) A fund-raising concert (B) A sports competition (C) A play rehearsal (D) An awards ceremony",
   "transcript": "Before the benefit concert begins, I want to thank all of you for supporting the Hillcaster Community Center. As you know, our facilities have been in need of some repairs for quite a while. So far, we've raised 5,000 dollars in ticket sales, but we haven't quite reached our goal yet. So during the concert, I want to encourage you to buy food and drinks from the concession stand. Eighty percent of the proceeds will go to construction at the Hillcaster Community Center. Enjoy the music!",
   "explanationVi": "Đáp án đúng: A\n\n80. Sự kiện gì đang diễn ra?\n(A) Budi hòa nhạc gây quỹ\n(B) Một cuộc thi thể thao\n(C) Một buổi diễn tập\n(D) Một lễ trao giải\nCách diễn đạt tương đương:\n- fund-raising concert (buổi hòa nhac gây quỹ) ~ benefit concert (buổi hòa nhạc từ thiện)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what event, taking place\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại “Before the benefit concert begins, I want to thank all of you for supporting the Hillcaster Community Center.” là thông tin chứa dap an. “The benefit conert” là sự kiện dang diễn ra.\n- “benefit concert” là cách diễn đạt tương đương của “fund-raising concert”.\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B),(C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au 80 Trước khi buổi hòa nhạc từ thiện bắt đầu, tôi muốn cảm ơn tất cả các bạn đã ủng hộ Trung tâm Cộng đồng Hillcaster. Như bạn đã biết, 81 cơ sở của chúng ta cần được sửa chữa trong một thời gian khá dài. Cho đến nay, chúng tôi đã quyên góp được 5.000 đô la tiền bán vé, nhưng chúng tôi vẫn chưa đạt được mục tiêu. 82 Vì vậy, trong budi hòa nhạc, tôi muốn khuyến khích các bạn mua đồ ăn và đồ uống từ quầy đồ ăn. 81 Tám mươi phần trăm số tiền thu được\nsẽ được dùng để xây dựng Trung tâm Cộng đồng Hillcaster. Hãy thưởng thức âm nhạc!"
  },
  {
   "number": 81,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "81. What does the organization plan to do? (A) Change a policy (B) Repair a building (C) Select a winner (D) Sponsor a team",
   "transcript": "Before the benefit concert begins, I want to thank all of you for supporting the Hillcaster Community Center. As you know, our facilities have been in need of some repairs for quite a while. So far, we've raised 5,000 dollars in ticket sales, but we haven't quite reached our goal yet. So during the concert, I want to encourage you to buy food and drinks from the concession stand. Eighty percent of the proceeds will go to construction at the Hillcaster Community Center. Enjoy the music!",
   "explanationVi": "Đáp án đúng: B\n\nTổ chức có kế hoạch làm gì?\n(A) Thay đối chính sách\n(B) Sửa chữa một tòa nhà\n(C) Chọn người chiến thắng\n(D) Tài trợ cho một đội\nCách diễn đạt tương đương:\nbuilding (tòa nhà) ~ facilites (cơ sở vật chất)\n- repair (sửa chữa) = reconstruction (việc xây dựng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what feature, business, emphasize\n- Dang câu hỏi: thông tin chi tiết\n- Người nói đề cập “our facilities have been in need of some repairs” (cơ sở của chúng ta cần được sửa chữa). Sau đó có thông tin “Eighty percent of the proceeds will go to construction at the Hillcaster Community Center” (Tám mươi phần trăm số tiền thu được sé được dùng để xây dựng Trung tâm Cộng đồng Hillcaster). Đây là kế hoạch của tổ chức dành cho Trung tâm cộng đồng.\n- Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au 80 Trước khi buổi hòa nhạc từ thiện bắt đầu, tôi muốn cảm ơn tất cả các bạn đã ủng hộ Trung tâm Cộng đồng Hillcaster. Như bạn đã biết, 81 cơ sở của chúng ta cần được sửa chữa trong một thời gian khá dài. Cho đến nay, chúng tôi đã quyên góp được 5.000 đô la tiền bán vé, nhưng chúng tôi vẫn chưa đạt được mục tiêu. 82 Vì vậy, trong budi hòa nhạc, tôi muốn khuyến khích các bạn mua đồ ăn và đồ uống từ quầy đồ ăn. 81 Tám mươi phần trăm số tiền thu được\nsẽ được dùng để xây dựng Trung tâm Cộng đồng Hillcaster. Hãy thưởng thức âm nhạc!"
  },
  {
   "number": 82,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "82. What does the speaker encourage the listeners to do? (A) Order tickets early (B) Visit a community Center (C) Purchase refreshments (D) Donate clothing",
   "transcript": "Before the benefit concert begins, I want to thank all of you for supporting the Hillcaster Community Center. As you know, our facilities have been in need of some repairs for quite a while. So far, we've raised 5,000 dollars in ticket sales, but we haven't quite reached our goal yet. So during the concert, I want to encourage you to buy food and drinks from the concession stand. Eighty percent of the proceeds will go to construction at the Hillcaster Community Center. Enjoy the music!",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói khuyến khích người nghe làm gì?\n(A) Đặt vé sớm\n(B) Thăm một trung tâm cộng đồng\n(C) Mua đồ giải khát\n(D) Tặng quần áo\nCách diễn đạt tương đương: - purchase (mua) ~ buy (mua) s refreshments (đồ ăn vặt, giải khát) ~ food and drinks (đồ ăn và nước uống)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what feature, business, emphasize\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “So during the concert, I want to encourage you to buy food and drinks from the concession stand.” là thông tin chứa dap an.\n- Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nNn. “\n- (A) phương án bẫy vì có nhắc đến “tickets” trong bài thoại nhưng không đề cập đến việc đặt vé sớm, mà là tiền vé thu được từ buổi hòa nhạc.\n- (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý: benefit concert (n.phr) buổi hòa nhạc từ thiện facility (n) cơ sở vật chất concession stand (n.phr) quầy đồ an vặt proceeds (n) tiền thu được (từ sự kiện/ hoạt động) construction (n) việc xây dựng fund-raising (adj) gây quỹ policy (n) chính sách sponsor (v) tài trợ refreshments (n) đồ ăn vặt, giải khát donate (v) quyên góp\n\nDịch bài nói:\nM-Au 80 Trước khi buổi hòa nhạc từ thiện bắt đầu, tôi muốn cảm ơn tất cả các bạn đã ủng hộ Trung tâm Cộng đồng Hillcaster. Như bạn đã biết, 81 cơ sở của chúng ta cần được sửa chữa trong một thời gian khá dài. Cho đến nay, chúng tôi đã quyên góp được 5.000 đô la tiền bán vé, nhưng chúng tôi vẫn chưa đạt được mục tiêu. 82 Vì vậy, trong budi hòa nhạc, tôi muốn khuyến khích các bạn mua đồ ăn và đồ uống từ quầy đồ ăn. 81 Tám mươi phần trăm số tiền thu được\nsẽ được dùng để xây dựng Trung tâm Cộng đồng Hillcaster. Hãy thưởng thức âm nhạc!"
  },
  {
   "number": 83,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "83. What is the topic of the workshop? (A) Time management (B) Public speaking (C) Leadership skills (D) Professional networking",
   "transcript": "Thank you all for attending today's workshop. Erina Kimura and I will be conducting the session, and wwell be focusing on using time efficiently as a business owner. Planning and spending your time wisely is a key factor to business success. During the presentation, Iil be referring to documents from the packet you were handed as you arrived. If you don't have one vet, Erina's at the back of the room. OK then, to start off, wel do an exercise to get to know one another better.",
   "explanationVi": "Đáp án đúng: A\n\nChủ đề của hội thảo là gì?\n(A) Quản lý thời gian\n(B) Nói trước công chúng\n(C) Kỹ nang lãnh dao\n(D) Mạng lưới công việc\nCách diễn đạt tương đương:\n- time management (quản lý thời gian) ~ using time effectively (sử dụng thời gian một cách hiệu quả)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, topic, workshop\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại “we'll be focusing on ...” (Chúng tôi sẽ tập trung vào...) là tín hiệu chứa đáp án. Thông tin sau đó là “using time efficiently as a business owner.” (việc sử dụng thời gian hiệu quả với tư cách là chủ doanh nghiệp). Vì vậy, đây là chủ đề của hội thảo\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B),(C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn Cảm ơn tất cả các bạn đã tham dự workshop ngày hôm nay. Erina Kimura và tôi sé chủ trì buổi học này, và 83 chúng tôi sẽ tập trung vào việc sử dụng thời gian hiệu quả với tư cách là chủ doanh nghiệp. Lập kế hoạch và sử dụng thời gian một cách khôn ngoan là yếu tố then chốt dẫn đến thành công trong kinh doanh. 84 Trong phần trình bày, tôi sẽ đề cập đến các tài liệu trong gói tài liệu mà bạn được trao khi bạn đến. Nếu bạn chưa có, Erina đang ở cuối phòng. Được rồi, 85 để bắt đầu, chúng ta sẽ làm một bài vận động để hiểu nhau hơn."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "84. What does the speaker imply when he says, \"Erina's at the back of the room\"? (A) A guest speaker has just arrived. (B) Assistance is available. (C) Attendees should speak clearly and loudly. (D) An extra chair should be provided.",
   "transcript": "Thank you all for attending today's workshop. Erina Kimura and I will be conducting the session, and wwell be focusing on using time efficiently as a business owner. Planning and spending your time wisely is a key factor to business success. During the presentation, Iil be referring to documents from the packet you were handed as you arrived. If you don't have one vet, Erina's at the back of the room. OK then, to start off, wel do an exercise to get to know one another better.",
   "explanationVi": "Đáp án đúng: B\n\nNgười nói có ý gì khi nói \"Erina ở cuối phòng”?\n(A) Một diễn giả khách mời vừa đến.\n(B) Có sẵn sự hỗ trợ.\n(C) Người tham dự nên nói rõ ràng và to.\n(D) Nên cung cấp thêm một chiếc ghế.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, imply, Erina’s at the back of the room\n- Dang cau hỏi: thông tin ngụ ý\n- Trước khi nói “Erina’s at the back of the room.” (Erina ở cuối phòng), người nói đề cập đến việc “referring to documents from the packet you were handed as you arrived” (đề cập đến các tài liệu trong gói tài liệu mà bạn được trao khi bạn đến) va “If you don't have one yet,” (Nếu bạn chưa có). Vậy ngụ ý ở đây là nếu người tham dự chưa được phát gói tài liệu thì có thể nhờ Erina giúp đỡ.\n- Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn Cảm ơn tất cả các bạn đã tham dự workshop ngày hôm nay. Erina Kimura và tôi sé chủ trì buổi học này, và 83 chúng tôi sẽ tập trung vào việc sử dụng thời gian hiệu quả với tư cách là chủ doanh nghiệp. Lập kế hoạch và sử dụng thời gian một cách khôn ngoan là yếu tố then chốt dẫn đến thành công trong kinh doanh. 84 Trong phần trình bày, tôi sẽ đề cập đến các tài liệu trong gói tài liệu mà bạn được trao khi bạn đến. Nếu bạn chưa có, Erina đang ở cuối phòng. Được rồi, 85 để bắt đầu, chúng ta sẽ làm một bài vận động để hiểu nhau hơn."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "C",
   "group": "83-85",
   "textEn": "85. What will the listeners do next? (A) Sign their names on a list (B) Take a break (C) Participate in an introductory activity (D) Fill out a questionnaire",
   "transcript": "Thank you all for attending today's workshop. Erina Kimura and I will be conducting the session, and wwell be focusing on using time efficiently as a business owner. Planning and spending your time wisely is a key factor to business success. During the presentation, Iil be referring to documents from the packet you were handed as you arrived. If you don't have one vet, Erina's at the back of the room. OK then, to start off, wel do an exercise to get to know one another better.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nghe sẽ làm gì tiếp theo?\n(A) Ký tên của họ vào một danh sách\n(B) Nghỉ ngơi\n(C) Tham gia vào một hoạt động giới thiệu\n(D) Điền vào bảng câu hỏi\nCách diễn đạt tương đương:\n- introductory activity (hoạt động giới thiệu) ~ an exercise to get to know one another better (một hoạt động để hiểu nhau hơn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listeners, do next\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “to start off, we'll do an exercise to get to know one another better.” (để bắt đầu, chúng ta sẽ lam một bài van động để hiểu nhau hơn) là thông tin chứa đáp án. Vì vậy, đây là hoạt động giới thiệu\n- “get to know one another better” là cách diễn đạt khác của “introductory”\n- Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý: conduct (v) tiến hành assisstance (n) sự giúp đỡ, hỗ trợ attendee (n) người tham dự questionaire (n) phiếu câu hỏi\n\nDịch bài nói:\nM-Cn Cảm ơn tất cả các bạn đã tham dự workshop ngày hôm nay. Erina Kimura và tôi sé chủ trì buổi học này, và 83 chúng tôi sẽ tập trung vào việc sử dụng thời gian hiệu quả với tư cách là chủ doanh nghiệp. Lập kế hoạch và sử dụng thời gian một cách khôn ngoan là yếu tố then chốt dẫn đến thành công trong kinh doanh. 84 Trong phần trình bày, tôi sẽ đề cập đến các tài liệu trong gói tài liệu mà bạn được trao khi bạn đến. Nếu bạn chưa có, Erina đang ở cuối phòng. Được rồi, 85 để bắt đầu, chúng ta sẽ làm một bài vận động để hiểu nhau hơn."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "D",
   "group": "86-88",
   "textEn": "86. What is a historical site famous for? (A) Its defensive walls (B) Its royal inhabitants (C) An event that happened there (D) Some artwork",
   "transcript": "At this site, archaeologists have uncovered the remains of a fifth-century marketplace with colorful mosaic tiles on the walls. You'll notice how vibrant the colors are, even after all these centuries. This is what the ruins are most famous for. You can still see intricate details in the artists pictures of scenes from daily life. Now, to protect the mosaics, a roof nas been constructed over the area, and the lights are dim. And I'm sorry, but taking photos is not allowed, as the flash would damage the tiles. As we proceed, please hold on to the handrails on either side. They'll help you stay on the path and protect the ruins around us.",
   "explanationVi": "Đáp án đúng: D\n\n86. Di tích lịch sử nổi tiếng vì điều gì?\n(A) Những bức tường phòng thủ của nó\n(B) Cư dân hoàng gia của nó\n(C) Một sự kiện đã xảy ra ở đó\n(D) Một số tác phẩm nghệ thuật\nCách diễn đạt tương đương:\n- some artwork (một số tác phẩm nghệ thuật) ~ colorful mosaic tiles (những viên gạch khảm đầy màu sắc)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, historical site, famous for\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “This is what the ruins are most famous for” (Đây chính là điều khiến khu di tích nổi tiếng nhất.). “This” đề cập được đề cập ngay trước đó là “archaeologists have uncovered the remains of a fifth- century marketplace with colorful mosaic tiles on the wall” (các nhà khảo cổ đã phát hiện ra tàn tích của một khu chợ của thế kỷ thứ năm với những viên gạch khảm đầy màu sắc trên tường.)\n- “colorful mosaic tiles” là cách diễn đạt khác của “some artwork”\n- Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A) là phương án bẫy vì có nhắc đến “walls” nhưng đoạn băng không đề cập đến “defensive” (phòng ngự, phòng thủ).\n- (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br 86 Tại địa điểm này, các nhà khảo cổ đã phát hiện ra tàn tích của một khu chợ của thế kỷ thứ năm với những viên gạch khảm đầy màu sắc trên tường. Bạn sẽ nhận thấy màu sắc rực rỡ như thế nào, thậm chí sau nhiều thế kỷ. 86 Đây chính là điều khiến khu di tích nổi tiếng nhất. Bạn vẫn có thể thấy những chỉ tiết phức tạp trong những bức tranh của nghệ sĩ về cảnh đời thường. Giờ đây, để bảo vệ những bức tranh khảm, một mái nhà đã được xây dựng trên khu vực này và ánh sáng thì mờ ảo. Và 87 Tôi xin lỗi, nhưng không được phép chụp ảnh vì đèn flash sẽ làm hỏng gạch. 88 Khi chúng ta tiếp tục, vui lòng bám vào tay vin ở hai bên. Họ sẽ giúp bạn đi đúng hướng và bảo vệ những tàn tích xung quanh chúng ta."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "87. Why does the speaker apologize? (A) The listeners cannot take pictures. (B) An area is closed to the listeners. (C) There is no gift shop. (D) A tour started late.",
   "transcript": "At this site, archaeologists have uncovered the remains of a fifth-century marketplace with colorful mosaic tiles on the walls. You'll notice how vibrant the colors are, even after all these centuries. This is what the ruins are most famous for. You can still see intricate details in the artists pictures of scenes from daily life. Now, to protect the mosaics, a roof nas been constructed over the area, and the lights are dim. And I'm sorry, but taking photos is not allowed, as the flash would damage the tiles. As we proceed, please hold on to the handrails on either side. They'll help you stay on the path and protect the ruins around us.",
   "explanationVi": "Đáp án đúng: A\n\nTại sao người nói xin lỗi?\n(A) Người nghe không thể chụp ảnh.\n(B) Một khu vực bị đóng cửa đối với người nghe.\n(C) Không có cửa hàng quà tặng.\n(D) Chuyến tham quan bắt đầu muộn.\nCách diễn đạt tương đương:\ncannottake pictures (không thể chụp ảnh) ~ taking photos is not allowed (chụp ảnh không được cho phép)\n- sorry (xin lỗi) = apologize (xin lỗi)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, apologize\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “I'm sorry, but taking photos is not allowed” (Tôi xin lỗi nhưng chụp ảnh không được cho phép) là thông tin chứa đáp án.\n- “taking photos is not allowed” là cách diễn đạt khác của “cannot take pictures”\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B),(C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br 86 Tại địa điểm này, các nhà khảo cổ đã phát hiện ra tàn tích của một khu chợ của thế kỷ thứ năm với những viên gạch khảm đầy màu sắc trên tường. Bạn sẽ nhận thấy màu sắc rực rỡ như thế nào, thậm chí sau nhiều thế kỷ. 86 Đây chính là điều khiến khu di tích nổi tiếng nhất. Bạn vẫn có thể thấy những chỉ tiết phức tạp trong những bức tranh của nghệ sĩ về cảnh đời thường. Giờ đây, để bảo vệ những bức tranh khảm, một mái nhà đã được xây dựng trên khu vực này và ánh sáng thì mờ ảo. Và 87 Tôi xin lỗi, nhưng không được phép chụp ảnh vì đèn flash sẽ làm hỏng gạch. 88 Khi chúng ta tiếp tục, vui lòng bám vào tay vin ở hai bên. Họ sẽ giúp bạn đi đúng hướng và bảo vệ những tàn tích xung quanh chúng ta."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "88. What does the speaker ask the listeners to do? (A) Show their tickets (B) Put on protective clothing (C) Use some handrails (D) Speak quietly",
   "transcript": "At this site, archaeologists have uncovered the remains of a fifth-century marketplace with colorful mosaic tiles on the walls. You'll notice how vibrant the colors are, even after all these centuries. This is what the ruins are most famous for. You can still see intricate details in the artists pictures of scenes from daily life. Now, to protect the mosaics, a roof nas been constructed over the area, and the lights are dim. And I'm sorry, but taking photos is not allowed, as the flash would damage the tiles. As we proceed, please hold on to the handrails on either side. They'll help you stay on the path and protect the ruins around us.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói yêu cầu người nghe làm gì?\n(A) Xuất trình vé của họ\n(B) Mặc quần áo bảo hộ\n(C) Sử dụng một số tay vịn\n(D) Nói nhỏ nhẹ\nCách diễn đạt tương đương:\n- “hold on to the handrails\"(bám vào tay vin) ~ use some handrails (sử dụng tay vịn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, ask, listeners, to do\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “as we proceed, please hold on the handrails on either side” (Khi chúng ta tiếp tục, vui lòng bám vào tay vin ở hai bên.) là thông tin chứa đáp án.\n- “hold on to the handrails” là cách diễn đạt tương đương với “use some handrails”\n- Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý: archaelogist (n) nhà khảo cổ học uncover (v) khám phá, phát hiện remains (n) tàn tích intricate (adj) phức tạp, tỉ mỉ dim (adj) mập mờ defensive (adj) phòng ngự, phòng thủ inhabitant (n) cư dân protective clothing (n.phr) đồ bảo hộ\n\nDịch bài nói:\nW-Br 86 Tại địa điểm này, các nhà khảo cổ đã phát hiện ra tàn tích của một khu chợ của thế kỷ thứ năm với những viên gạch khảm đầy màu sắc trên tường. Bạn sẽ nhận thấy màu sắc rực rỡ như thế nào, thậm chí sau nhiều thế kỷ. 86 Đây chính là điều khiến khu di tích nổi tiếng nhất. Bạn vẫn có thể thấy những chỉ tiết phức tạp trong những bức tranh của nghệ sĩ về cảnh đời thường. Giờ đây, để bảo vệ những bức tranh khảm, một mái nhà đã được xây dựng trên khu vực này và ánh sáng thì mờ ảo. Và 87 Tôi xin lỗi, nhưng không được phép chụp ảnh vì đèn flash sẽ làm hỏng gạch. 88 Khi chúng ta tiếp tục, vui lòng bám vào tay vin ở hai bên. Họ sẽ giúp bạn đi đúng hướng và bảo vệ những tàn tích xung quanh chúng ta."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "A",
   "group": "89-91",
   "textEn": "89. What is the speaker mainly discussing? (A) An advertising campaign (B) A market expansion (C) Some contract negotiations (D) Some audit procedures",
   "transcript": "As you all know, our agency's just won an important contract with Parker Auto Parts Company. We'll be developing two 30-second ads for local radio stations to be released next month and two additional 20-second ads for the following month. Now, I know it's a tight schedule, but this is a priority. The client has actually started trying to work on this internally, so there's a rough ad we can start editing. Let's work on that now.",
   "explanationVi": "Đáp án đúng: A\n\nNgười nói chủ yếu thảo luận về điều gì?\n(A) Một chiến dịch quảng cáo\n(B) Mở rộng thị trường\n(C) Một số cuộc đàm phán hợp đồng\n(D) Một số thủ tục kiểm toán\nCách diễn đạt tương đương:\n- ads (quảng cáo) ~ advertising campaign (chiến dịch quảng cáo)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, mainly discussing\n- Dạng câu hỏi: thông tin tổng quát\n- Người nói đề cập “won an important contract with Parker Auto Parts Company” (dành được một hợp đồng quan trọng”. Và công việc liên quan đến hợp đồng này là “developing two 30-second ads for local radio stations to be released next month and two additional 20-second ads for the following month.” Vì vậy, chủ đề chính đang bàn luận là việc làm quảng cáo\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (C) chứa thông tin bẫy vì có đề cập đến “contract” nhưng ở đây người nói không đề cập đến việc thỏa thuận (negotiation) vì đã dành được hợp đồng rồi (just won an important contract)\n- (B), (D) chứa thông tin không được dé cập.\n\nDịch bài nói:\nM-Cn 89 Như các bạn đã biết, đại lý chúng tôi vừa giành được một hợp đồng quan trọng với Công ty Parker Auto Parts. 89,90 Chúng tôi sẽ phát triển hai quảng cáo dài 30 giây cho các đài phát thanh địa phương được phát hành vào tháng tới và hai quảng cáo bổ sung dài 20 giây cho tháng tiếp theo. Bây giờ, 90 tôi biết đó là một lịch trình chặt chẽ, nhưng đây là ưu tiên hàng đầu. Khách hàng thực sự đã bắt đầu cố gắng giải quyết vấn đề này trong nội bộ, 91 vì vậy có một quảng cáo thô mà chúng tôi có thể bắt đầu chỉnh sửa. Hãy bắt tay vào việc đó ngay bây giờ."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "90. What does the speaker imply when he says, “this is a priority”? (A) Overtime pay has been approved. (B) A deadline must be met. (C) A client expressed concern. (D) A supervisor will be observing closely.",
   "transcript": "As you all know, our agency's just won an important contract with Parker Auto Parts Company. We'll be developing two 30-second ads for local radio stations to be released next month and two additional 20-second ads for the following month. Now, I know it's a tight schedule, but this is a priority. The client has actually started trying to work on this internally, so there's a rough ad we can start editing. Let's work on that now.",
   "explanationVi": "Đáp án đúng: B\n\n90. Người nói ám chỉ điều gì khi nói \"đây là ưu tiên\"?\n(A) Tiền lương làm thêm giờ đã được phê duyệt.\n(B) Phải đáp ứng thời hạn.\n(C) Một khách hàng bày tỏ mối quan ngại.\n(D) Người giám sát sẽ quan sát chặt chẽ.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, imply, this is a priority\n- Dang âu hỏi: thông tin ngụ ý\n- Người nói nhấn mạnh “this is a priority” (đây là việc ưu tiên). “This” ở đây đề cập cho thông tin trước đó là “it's a tight schedule” (đây là một lịch trình dày đặc). Việc này ngụ ý là cần hoàn thành kịp thời hạn trong lịch trình.\n- Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn 89 Như các bạn đã biết, đại lý chúng tôi vừa giành được một hợp đồng quan trọng với Công ty Parker Auto Parts. 89,90 Chúng tôi sẽ phát triển hai quảng cáo dài 30 giây cho các đài phát thanh địa phương được phát hành vào tháng tới và hai quảng cáo bổ sung dài 20 giây cho tháng tiếp theo. Bây giờ, 90 tôi biết đó là một lịch trình chặt chẽ, nhưng đây là ưu tiên hàng đầu. Khách hàng thực sự đã bắt đầu cố gắng giải quyết vấn đề này trong nội bộ, 91 vì vậy có một quảng cáo thô mà chúng tôi có thể bắt đầu chỉnh sửa. Hãy bắt tay vào việc đó ngay bây giờ."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "91. What will the listeners do next? (A) View a presentation (B) Review a budget (C) Revise some work (D) Do some research",
   "transcript": "As you all know, our agency's just won an important contract with Parker Auto Parts Company. We'll be developing two 30-second ads for local radio stations to be released next month and two additional 20-second ads for the following month. Now, I know it's a tight schedule, but this is a priority. The client has actually started trying to work on this internally, so there's a rough ad we can start editing. Let's work on that now.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nghe sẽ làm gì tiếp theo?\n(A) Xem bản trình bày\n(B) Xem xét ngân sách\n(C) Sửa lại một số công việc\n(D) Thực hiện một số nghiên cứu\nCách diễn đạt tương đương:\n- revise (sửa lại) ~ editting (chỉnh sửa)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listeners, do next\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại “Let's work on that now” (Hãy bắt tay vào việc đó ngay bây giờ), “that” đề cập cho việc trước đó là “there's a rough ad we can start editing” (Có một bản quảng cáo thô mà chúng tay có thể bắt đầu chỉnh sửa).\n- Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được dé cập.\nTừ vựng cần lưu ý: release (v) cho ra mắt, xuất bản priority (n) ưu tiên internally (adv) trong nội bộ expansion (n) sự mở rộng negotiation (n) thương lượng procedure (n) thủ tục overtime pay (n) tiền lương cho làm việc thêm giờ appove (v) thông qua, duyệt budget (n) ngân sách\n\nDịch bài nói:\nM-Cn 89 Như các bạn đã biết, đại lý chúng tôi vừa giành được một hợp đồng quan trọng với Công ty Parker Auto Parts. 89,90 Chúng tôi sẽ phát triển hai quảng cáo dài 30 giây cho các đài phát thanh địa phương được phát hành vào tháng tới và hai quảng cáo bổ sung dài 20 giây cho tháng tiếp theo. Bây giờ, 90 tôi biết đó là một lịch trình chặt chẽ, nhưng đây là ưu tiên hàng đầu. Khách hàng thực sự đã bắt đầu cố gắng giải quyết vấn đề này trong nội bộ, 91 vì vậy có một quảng cáo thô mà chúng tôi có thể bắt đầu chỉnh sửa. Hãy bắt tay vào việc đó ngay bây giờ."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "92. Where do the listeners most likely work? (A) At a hospital (B) At a restaurant (C) At a grocery store (D) At an electronics store",
   "transcript": "Excuse me, nurses. Your attention please. I've been receiving complaints about the free snacks in the hospital break rooms. Some people have mentioned that they don't like the selection of snacks, and some have said that they don't get to eat them at all because they're gone by the time the evening shift starts. So I was thinking about putting some money into each of your staff spending accounts every month so that you can buy the snacks you want at the hospital cafeteria. That will require management approval, but I'll keep you posted.",
   "explanationVi": "Đáp án đúng: A\n\n92. Người nghe thường làm việc ở đâu nhất?\n(A) Tại bệnh viện\n(B) Tại một nhà hàng\n(C) Tại một cửa hàng tạp hóa\n(D) Tại một cửa hàng điện tử\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, listeners, work\n- Dang cau hỏi: thông tin ngụ ý\n- Dựavào lời thoại “Excuse me, nurses” biết được đối tượng người nghe là các y tá. Có thể suy ra, người nghe làm việc ở bệnh viện.\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B),(C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am 92 Xin lỗi, các y tá. Xin vui lòng chú ý. 93 Tôi nhận được nhiều lời phàn nàn về bữa ăn nhẹ miễn phí trong phòng nghỉ của bệnh viện. Một số người đã đề cập rằng họ không thích các đồ ăn nhẹ, và một số người nói rằng họ không được ăn chúng vì chúng đã hết khi ca tối bắt đầu. 94 Vì vậy, tôi đang nghĩ đến việc gửi một số tiền vào tài khoản chi tiêu của mỗi nhân viên mỗi tháng để các\nbạn có thể mua đồ ăn nhẹ mà mình muốn tại căng tin bệnh viện. Điều đó sẽ yêu cầu sự chấp thuận của ban quản lý, nhưng tôi sẽ thông báo cho các bạn."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "93. What is the main purpose of the talk? (A) To make a request (B) To address staff complaints (C) To present a new schedule (D) To explain a technical process",
   "transcript": "Excuse me, nurses. Your attention please. I've been receiving complaints about the free snacks in the hospital break rooms. Some people have mentioned that they don't like the selection of snacks, and some have said that they don't get to eat them at all because they're gone by the time the evening shift starts. So I was thinking about putting some money into each of your staff spending accounts every month so that you can buy the snacks you want at the hospital cafeteria. That will require management approval, but I'll keep you posted.",
   "explanationVi": "Đáp án đúng: B\n\nMục đích chính của bài nói chuyện là gì?\n(A) Để đưa ra một yêu cầu\n(B) Để giải quyết khiếu nại của nhân viên\n(C) Để trình bày một lịch trình mới\n(D) Để giải thích một quy trình kỹ thuật\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: what, main purpose\n- Dang cau hỏi: thông tin ngụ ý\n- Người nói đề cập “I've been receiving complaints about the free snacks in the hospital break rooms.” (Tôi nhận được nhiều lời phan nàn về bữa ăn nhẹ miễn phí trong phòng nghỉ của bệnh viện). Sau đó người nói đưa ra giải pháp “putting some money into each of your staff spending accounts every month so that you can buy the snacks you want at the hospital cafeteria” (gửi một số tiền vào tài khoản chi tiêu của mỗi nhân viên mỗi\ntháng để các bạn có thể mua đồ ăn nhẹ mà mình muốn tại căng tin bệnh viện). Như vậy, mục đích là giải quyết phàn nàn.\n- Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am 92 Xin lỗi, các y tá. Xin vui lòng chú ý. 93 Tôi nhận được nhiều lời phàn nàn về bữa ăn nhẹ miễn phí trong phòng nghỉ của bệnh viện. Một số người đã đề cập rằng họ không thích các đồ ăn nhẹ, và một số người nói rằng họ không được ăn chúng vì chúng đã hết khi ca tối bắt đầu. 94 Vì vậy, tôi đang nghĩ đến việc gửi một số tiền vào tài khoản chi tiêu của mỗi nhân viên mỗi tháng để các\nbạn có thể mua đồ ăn nhẹ mà mình muốn tại căng tin bệnh viện. Điều đó sẽ yêu cầu sự chấp thuận của ban quản lý, nhưng tôi sẽ thông báo cho các bạn."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "94. What does the speaker imply when she says, \"That will require management approval\"? (A) A process has not been followed. (B) The listeners may be asked to work extra shitts. (C) The listeners should contact a manager. (D) A change will not be immediate.",
   "transcript": "Excuse me, nurses. Your attention please. I've been receiving complaints about the free snacks in the hospital break rooms. Some people have mentioned that they don't like the selection of snacks, and some have said that they don't get to eat them at all because they're gone by the time the evening shift starts. So I was thinking about putting some money into each of your staff spending accounts every month so that you can buy the snacks you want at the hospital cafeteria. That will require management approval, but I'll keep you posted.",
   "explanationVi": "Đáp án đúng: D\n\nNgười nói ám chỉ điều gì khi nói \"Điều đó cần có sự chấp thuận của ban quản lý\"?\n(A) Một quy trình chưa được tuân theo.\n(B) Người nghe có thể được yêu cầu làm thêm ca.\n(C) Người nghe nên liên hệ với người quản lý.\n(D) Một sự thay đổi sẽ không xảy ra ngay lập tức.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, imply, That will require management approval\n- Dang cau hỏi: thông tin ngụ ý\n- Người nói nói rằng “That will require management approval” với ý nghĩa là cần có sự thông qua của ban quản lý. Việc này đồng nghĩa với thay đổi sẽ không được thực hiện ngay lập tức.\n- Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được dé cập.\nTừ vựng cần lưu ý: complaint (n): lời phàn nàn, khiếu nại shift (n) calàm approval (n) sự thông qua, duyệt request (n) yêu cầu address (v) giải quyết spending (n) chi tiêu\n\nDịch bài nói:\nW-Am 92 Xin lỗi, các y tá. Xin vui lòng chú ý. 93 Tôi nhận được nhiều lời phàn nàn về bữa ăn nhẹ miễn phí trong phòng nghỉ của bệnh viện. Một số người đã đề cập rằng họ không thích các đồ ăn nhẹ, và một số người nói rằng họ không được ăn chúng vì chúng đã hết khi ca tối bắt đầu. 94 Vì vậy, tôi đang nghĩ đến việc gửi một số tiền vào tài khoản chi tiêu của mỗi nhân viên mỗi tháng để các\nbạn có thể mua đồ ăn nhẹ mà mình muốn tại căng tin bệnh viện. Điều đó sẽ yêu cầu sự chấp thuận của ban quản lý, nhưng tôi sẽ thông báo cho các bạn."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "B",
   "group": "95-97",
   "textEn": "95. According to the speaker, what was recently completed? (A) A company reorganization (B) A park renovation (C) A volunteer training (D) A conservation project",
   "transcript": "As mayor of Lakeville, I'm pleased to welcome you to the celebration for our town's newly renovated Lakeville Park. There are a lot of new areas to explore, so we've planned a short hike. We'll be walking around the pond and along the renovated walking trail. Wel end our walk on the hill on the north side of the park. There we'll be having some free snacks and ice cream. For those of you taking photos, don't forget to post them on the city's Web site. We'd like to commemorate this special day.",
   "explanationVi": "Đáp án đúng: B\n\n95. Theo người nói, điều gì đã được hoàn thành gần đây?\n(A) Việc tổ chức lại công ty\n(B) Cải tạo công viên\n(C) Một khóa đào tạo tình nguyện viên\n(D) Một dự án bảo tồn\nCách diễn đạt tương đương:\n- renovated Lakeville Park (Công viên Lakeville được cải tạo) ~ A park renovation (việc cải tạo công viên)\n- newly (mới) = recently (gần đây)\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: what, recently completed\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại “the celebration for our town's newly renovated\nLakeville Park” ( lễ ky niệm Công viên Lakeville mới được cai tao của thi trấn chúng ta). Vậy cái được hoàn thành là việc cải tại công viên.\n- Phương án (B) là phù hợp nhất. Loại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn Với tư cách là thị trưởng của Lakeville, 95 tôi vui mừng chào đón quý vị đến dự lễ ký niệm Công viên Lakeville mới được cải tạo của thị trấn chúng ta. Có rất nhiều khu vực mới để khám phá, vì vậy chúng tôi đã lên kế hoạch đi bộ một đoạn ngắn. Chúng tôi sẽ đi dạo quanh ao và dọc theo con đường đi bộ đã được cải tạo. 96 Chúng ta sẽ kết thúc chuyến đi bộ trên ngọn đồi ở phía bắc công viên. Ở đó chúng ta sẽ được ăn đồ ăn nhẹ và kem miễn phí. 97 Đối với những bạn chụp ảnh, hãy đừng quên đăng lên Website của thành phố. Chúng tôi muốn kỷ niệm ngày đặc biệt này."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "96. Look at the graphic. Where does the speaker say refreshments will be served? (A) Location 1 (B) Location 2 (C) Location 3 (D) Location 4",
   "transcript": "As mayor of Lakeville, I'm pleased to welcome you to the celebration for our town's newly renovated Lakeville Park. There are a lot of new areas to explore, so we've planned a short hike. We'll be walking around the pond and along the renovated walking trail. Wel end our walk on the hill on the north side of the park. There we'll be having some free snacks and ice cream. For those of you taking photos, don't forget to post them on the city's Web site. We'd like to commemorate this special day.",
   "explanationVi": "Đáp án đúng: A\n\nNhìn vào đồ họa. Người nói nói đồ uống giải khát sẽ được phục vụ ở đâu?\n(A)Vitrí1\n(B) Vi tri 2\n(C) Vitri 3\n(D) Vi trí 4\nCách diễn đạt tương đương:\n- refreshments (đồ ăn nhẹ và nước giải khát) ~ snacks and ice cream (đồ ăn nhẹ và kem)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, refreshments, served\n- Dang câu hỏi: thông tin liên quan bảng biểu, biểu đồ\n- Dựavào lời thoại “We'll end our walk on the hill on the north side of the park”, đây là vi trí số 1 trong bản đồ. Ở vị trí này “There we'll be having some free snacks and ice cream.” (Có đồ ăn nhẹ và kem miễn phí).\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) la vi trí không đúng theo chi dẫn.\n\nDịch bài nói:\nM-Cn Với tư cách là thị trưởng của Lakeville, 95 tôi vui mừng chào đón quý vị đến dự lễ ký niệm Công viên Lakeville mới được cải tạo của thị trấn chúng ta. Có rất nhiều khu vực mới để khám phá, vì vậy chúng tôi đã lên kế hoạch đi bộ một đoạn ngắn. Chúng tôi sẽ đi dạo quanh ao và dọc theo con đường đi bộ đã được cải tạo. 96 Chúng ta sẽ kết thúc chuyến đi bộ trên ngọn đồi ở phía bắc công viên. Ở đó chúng ta sẽ được ăn đồ ăn nhẹ và kem miễn phí. 97 Đối với những bạn chụp ảnh, hãy đừng quên đăng lên Website của thành phố. Chúng tôi muốn kỷ niệm ngày đặc biệt này."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "97. What are the listeners reminded to do? (A) Complete a survey (B) Donate some money (C) Join an organization (D) Post some photographs",
   "transcript": "As mayor of Lakeville, I'm pleased to welcome you to the celebration for our town's newly renovated Lakeville Park. There are a lot of new areas to explore, so we've planned a short hike. We'll be walking around the pond and along the renovated walking trail. Wel end our walk on the hill on the north side of the park. There we'll be having some free snacks and ice cream. For those of you taking photos, don't forget to post them on the city's Web site. We'd like to commemorate this special day.",
   "explanationVi": "Đáp án đúng: D\n\nNgười nghe được nhắc nhở phải làm gì?\n(A) Hoàn thành một cuộc khảo sát\n(B) Đóng góp một số tiền\n(C) Tham gia một tổ chức\n(D) Đăng một số bức ảnh\nCách diễn đạt tương đương:\n- don’t forget to (đừng quên làm gì) ~ reminded to (được nhắc nhở làm gì) - photos (ảnh) ~ photographs (ảnh)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listeners, reminded to do\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại “For those of you taking photos, don't forget to post them on the city's Web site.” Người nói nhắc nhở những ai chụp hình thì hãy đăng lên website của thành phố.\n- Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được dé cập.\nTừ vựng cần lưu ý: mayor (n) thị trưởng renovate (v) cải tạo post (v) đăng tải commemorate (v) kỷ niệm conservation (n) bảo tồn survey (n) khảo sát\n\nDịch bài nói:\nM-Cn Với tư cách là thị trưởng của Lakeville, 95 tôi vui mừng chào đón quý vị đến dự lễ ký niệm Công viên Lakeville mới được cải tạo của thị trấn chúng ta. Có rất nhiều khu vực mới để khám phá, vì vậy chúng tôi đã lên kế hoạch đi bộ một đoạn ngắn. Chúng tôi sẽ đi dạo quanh ao và dọc theo con đường đi bộ đã được cải tạo. 96 Chúng ta sẽ kết thúc chuyến đi bộ trên ngọn đồi ở phía bắc công viên. Ở đó chúng ta sẽ được ăn đồ ăn nhẹ và kem miễn phí. 97 Đối với những bạn chụp ảnh, hãy đừng quên đăng lên Website của thành phố. Chúng tôi muốn kỷ niệm ngày đặc biệt này."
  },
  {
   "number": 98,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "98. What is the topic of today's lecture? (A) When to harvest crops (B) Where to plant trees (C) How to grow vegetables (D) Which flowers need more sun",
   "transcript": "Thanks, everyone, for attending today's free public lecture, sponsored by the Springfield Farmers' Association. So, we've received lots of requests for information on growing a vegetable garden. People want to know how to keep their garden healthy and get the vegetables they want. The first thing we recommend is regular soil testing. Since this is September, all soil samples in the next six weeks should be taken from the same depth, as seen on this chart. Oh, and before you leave today, please sign up for our mailing list to stay informed of future lectures.",
   "explanationVi": "Đáp án đúng: C\n\nChu đề của bài giảng hôm nay là gì?\n(A) Khi nào thu hoạch cây trồng\n(B) Nơi trồng cây\n(C) Cách trồng rau\n(D) Những bông hoa nào cần nhiều ánh nắng hơn\nCách diễn đạt tương đương:\n- information on growing a vegetable garden (thông tin về việc trồng vườn rau) ~ how to grow vegetables (cách trồng rau)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, topic, today’s lecture\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào lời thoại “Thanks, everyone, for attending today's free public lecture, ... So, we've received lots of requests for information on growing a vegetable garden.” (Cảm ơn mọi người đã tham dự buổi diễn thuyết công cộng miễn phí ngày hôm nay,.. Chúng tôi đã nhận được rất nhiều yêu cầu cung cấp thông tin về cách trồng vườn rau.) Vậy chủ đề của bài giảng là cách trồng rau.\n- Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br 98 Cảm ơn mọi người đã tham dự buổi diễn thuyết công cộng miễn phí ngày hôm nay, do Hiệp hội Nông dân Springfield tài trợ. Chúng tôi đã nhận được rất nhiều yêu cầu cung cấp thông tin về cách trồng vườn rau. Mọi người muốn biết cách giữ cho khu vườn của họ khỏe mạnh và có được những loại rau họ muốn. Điều đầu tiên chúng tôi khuyên bạn nên kiểm tra đất thường xuyên. 99 Vì đây là tháng 9 nên tất cả các mẫu đất trong sáu tuần tới phải được lấy từ cùng độ sâu, như được thấy trên biểu đồ này. Ồ, và trước khi rời đi hôm nay, 100 vui lòng đăng ký danh sách gửi thư của chúng tôi để được thông báo về các bài giảng trong tương lai. Bảng thời gian mẫu đất Thời giantrongnăm Loại vụ mùa Chiều sâu 99 Tháng 9 - Tháng 10Tất cả cây trồng 12 inch Tháng11-Tháng8. Hoa 4 inch Rau 6 inch Cây vacaybui 8inch"
  },
  {
   "number": 99,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "99. Look at the graphic. At what depth should samples be collected this month? (A) 12 inches (B) 4 inches (C) 6 inches (D) 8 inches",
   "transcript": "Thanks, everyone, for attending today's free public lecture, sponsored by the Springfield Farmers' Association. So, we've received lots of requests for information on growing a vegetable garden. People want to know how to keep their garden healthy and get the vegetables they want. The first thing we recommend is regular soil testing. Since this is September, all soil samples in the next six weeks should be taken from the same depth, as seen on this chart. Oh, and before you leave today, please sign up for our mailing list to stay informed of future lectures.",
   "explanationVi": "Đáp án đúng: A\n\nNhìn vào đồ họa. Mẫu nên được thu thập ở độ sâu nào trong tháng này?\n(A) 12 inch\n(B) 4 inch\n(C) 6 inch\n(D) 8 inch\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: what depth, samples, collected, this month\n- Dang câu hỏi: thông tin liên quan đến bảng biểu, biểu đồ\n- Dựavào lời thoại “Since this is September, all soil samples in the next six weeks should be taken from the same depth, as seen on this chart.” Nhìn vào hàng tương ứng với thời gian là tháng 9, chiều sâu là 12 inch.\n- Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không khớp với thông tin từ bảng.\n\nDịch bài nói:\nW-Br 98 Cảm ơn mọi người đã tham dự buổi diễn thuyết công cộng miễn phí ngày hôm nay, do Hiệp hội Nông dân Springfield tài trợ. Chúng tôi đã nhận được rất nhiều yêu cầu cung cấp thông tin về cách trồng vườn rau. Mọi người muốn biết cách giữ cho khu vườn của họ khỏe mạnh và có được những loại rau họ muốn. Điều đầu tiên chúng tôi khuyên bạn nên kiểm tra đất thường xuyên. 99 Vì đây là tháng 9 nên tất cả các mẫu đất trong sáu tuần tới phải được lấy từ cùng độ sâu, như được thấy trên biểu đồ này. Ồ, và trước khi rời đi hôm nay, 100 vui lòng đăng ký danh sách gửi thư của chúng tôi để được thông báo về các bài giảng trong tương lai. Bảng thời gian mẫu đất Thời giantrongnăm Loại vụ mùa Chiều sâu 99 Tháng 9 - Tháng 10Tất cả cây trồng 12 inch Tháng11-Tháng8. Hoa 4 inch Rau 6 inch Cây vacaybui 8inch"
  },
  {
   "number": 100,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "100. What does the speaker encourage the listeners to do? (A) Turn off mobile phones (B) Have some refreshments (C) Purchase some seeds (D) Sign up for a mailing list",
   "transcript": "Thanks, everyone, for attending today's free public lecture, sponsored by the Springfield Farmers' Association. So, we've received lots of requests for information on growing a vegetable garden. People want to know how to keep their garden healthy and get the vegetables they want. The first thing we recommend is regular soil testing. Since this is September, all soil samples in the next six weeks should be taken from the same depth, as seen on this chart. Oh, and before you leave today, please sign up for our mailing list to stay informed of future lectures.",
   "explanationVi": "Đáp án đúng: D\n\nNgười nói khuyến khích người nghe làm gì?\n(A) Tắt điện thoại di động\n(B) Thưởng thức đồ uống giải khát\n(C) Mua một số hạt giống\n(D) Đăng ký danh sách gửi thư\nCách diễn đạt tương đương:\n- don’t forget to (đừng quên làm gì) ~ reminded to (được nhắc nhở làm gì) - photos (ảnh) ~ photographs (ảnh)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, encourage, listeners, do\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại “please sign up for our mailing list to stay informed of future lectures.” (vui long đăng ký danh sách gửi thư của chúng tôi để được thông báo về các bài giảng trong tương lai.), việc người nghe được khuyến khích làm là đăng ký vào danh sách gửi thư\n- Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý: sponsor (v) tài trợ association (n) hiệp hội sign up for (v.phr) đăng ký crop (n) mùa vụ harvest (v) thu hoạch seed (n) hạt giống\n\nDịch bài nói:\nW-Br 98 Cảm ơn mọi người đã tham dự buổi diễn thuyết công cộng miễn phí ngày hôm nay, do Hiệp hội Nông dân Springfield tài trợ. Chúng tôi đã nhận được rất nhiều yêu cầu cung cấp thông tin về cách trồng vườn rau. Mọi người muốn biết cách giữ cho khu vườn của họ khỏe mạnh và có được những loại rau họ muốn. Điều đầu tiên chúng tôi khuyên bạn nên kiểm tra đất thường xuyên. 99 Vì đây là tháng 9 nên tất cả các mẫu đất trong sáu tuần tới phải được lấy từ cùng độ sâu, như được thấy trên biểu đồ này. Ồ, và trước khi rời đi hôm nay, 100 vui lòng đăng ký danh sách gửi thư của chúng tôi để được thông báo về các bài giảng trong tương lai. Bảng thời gian mẫu đất Thời giantrongnăm Loại vụ mùa Chiều sâu 99 Tháng 9 - Tháng 10Tất cả cây trồng 12 inch Tháng11-Tháng8. Hoa 4 inch Rau 6 inch Cây vacaybui 8inch"
  }
 ],
 "2": [
  {
   "number": 1,
   "part": 1,
   "answer": "A",
   "textEn": "(A) She's inserting a cord into an outlet. (B) She's pressing a button on a machine. (C) She's gripping the handle of a drawer. (D) She's tacking a notice onto the wall.",
   "transcript": "(A) She's inserting a cord into an outlet.\n(B) She's pressing a button on a machine.\n(C) She's gripping the handle of a drawer.\n(D) She's tacking a notice onto the wall.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- Loại (B) vì chứa hành động không phù hợp với tranh - “pressing a button” (nhấn nút). Phương án bẫy - các đối tượng như người phụ nữ và cái máy đều xuất hiện trong tranh, tuy nhiên người phụ nữ không có nhấn nút trên chiếc máy.\n- Loại (C) vì chứa hành động không phù hợp với tranh - “gripping the handle of a drawer” (nắm chặt tay cầm của ngăn kéo). Phương án bẫy - các đối tượng như người phụ nữ và ngăn kéo đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (D) vì chứa hành động không phù hợp với tranh - “tacking a notice onto the wall” (dán một thông báo lên tường)."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some window shutters are being replaced. (B) A pillow is being arranged on a seat. (C) An outdoor table is being cleared off. (D) Some wooden boards are being painted.",
   "transcript": "(A) Some window shutters are being replaced.\n(B) A pillow is being arranged on a seat.\n(C) An outdoor table is being cleared off.\n(D) Some wooden boards are being painted.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - “Some window shutters are being replaced.” (Một số cửa chớp đang được thay thế.). Phương án bẫy- Có sự xuất hiện của cửa chớp trong tranh nhưng không có ai đang thực hiện hành động thay thế.\n- Loại (C) vì chứa đối tượng không xuất hiện trong tranh - “An outdoor table” (Một chiếc bàn ngoài trời)\n- Loại (D) vì chứa thông tin không được thể hiện trong tranh - “Some wooden boards are being painted.” (Một số tấm gỗ đang được sơn.) Phương án bẫy- Có\nsự xuất hiện của các tấm gỗ trong tranh nhưng không có ai đang thực hiện hành động sơn chúng."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "C",
   "textEn": "(A) Some utensils have been discarded in a bin. (B) Some bottles are being emptied into a sink. (C) A rolling chair has been placed next to a counter. (D) Some drawers have been left open.",
   "transcript": "(A) Some utensils have been discarded in a bin.\n(B) Some bottles are being emptied into a sink.\n(C) A rolling chair has been placed next to a counter.\n(D) Some drawers have been left open.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - “Some utensils have been discarded in a bin.” (Một số đồ dùng bị bỏ vào thùng rác.)\n- Loại (B) vì chứa thông tin không được thể hiện trong tranh - “Some bottles are being emptied into a sink.” (Một số chai đang được đổ vào bồn rửa.). Phương án bẫy- Có sự xuất hiện của một vài cái chai trong tranh nhưng không có ai đang đổ chúng vào bồn rửa.\n- Loại (D) vì chứa thông tin không được thể hiện trong tranh - “ Some drawers have been left open.” (Một số ngăn kéo đã bị mở.). Phương án bẫy- Có sự xuất hiện của những ngăn kéo trong tranh nhưng chúng đang trong trạng thái đóng kín."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "D",
   "textEn": "(A) A man is chopping some wood into pieces. (B) Leaves are scattered across the grass. (C) A man is closing a window. (D) Wood is piled near a fence.",
   "transcript": "(A) A man is chopping some wood into pieces.\n(B) Leaves are scattered across the grass.\n(C) A man is closing a window.\n(D) Wood is piled near a fence.",
   "explanationVi": "Đáp án đúng: D\n\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - “A man is chopping some wood into pieces.” (Một người đàn ông đang chặt gỗ thành từng manh)). Phương án bẫy - các đối tượng như người đàn ông và gỗ đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (B) vì chứa thông tin không được thể hiện trong tranh - “Leaves are scattered across the grass.” (Lá nằm rải rác trên bãi cỏ). Phương án bẫy - các đối tượng như lá và bãi cỏ đều xuất hiện trong tranh, tuy nhiên không có chiếc lá nào đang nằm trên bãi cỏ.\n- Loại (C) vì chứa thông tin không được thể hiện trong tranh - “A man is closing a window.” (Một người đàn ông đang đóng cửa sổ.). Phương án bẫy - các đối tượng như người đàn ông và cửa sổ đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "C",
   "textEn": "(A) People are standing in line in a lobby. (B) Items are being loaded into shopping bags. (C) Tents have been set up in a parking area. (D) A worker is putting up a Canopy.",
   "transcript": "(A) People are standing in line in a lobby.\n(B) Items are being loaded into shopping bags.\n(C) Tents have been set up in a parking area.\n(D) A worker is putting up a Canopy.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- Loại (A) vì chứa đối tượng không có trong tranh - “lobby” (sảnh). Phương án bẫy - một số người đang đứng trong tranh, tuy nhiên họ không xếp hàng và nơi họ đang đứng không phải ở sảnh.\n- Loại (B) vì chứa thông tin không được thể hiện trong tranh - “Items are being loaded into shopping bags.” (Các mặt hàng đang được chất vào túi mua sắm). Phương án bẫy - các đối tượng như mặt hàng và túi mua sắm đều xuất hiện trong tranh, tuy nhiên không có ai đang chất hàng vào trong túi mua sắm cả.\n- Loại (D) vì chứa đối tượng không có trong tranh - “A worker” (Một người công nhân). Phương án bẫy - có sự xuất hiện của mái che trong tranh, tuy nhiên không có ai đang dựng chúng lên cả."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Some luggage is stacked next to an escalator. (B) A suitcase is being lifted onto a shuttle bus. (C) Some suitcases are displayed in a shop window. (D) A luggage rack has two levels.",
   "transcript": "(A) Some luggage is stacked next to an escalator.\n(B) A suitcase is being lifted onto a shuttle bus.\n(C) Some suitcases are displayed in a shop window.\n(D) A luggage rack has two levels.",
   "explanationVi": "Đáp án đúng: D\n\nLoại trừ phương án sai:\n- Loại (A) vì chứa đối tượng không có trong tranh - “escalator” (thang cuốn). Phương án bẫy - có sự xuất hiện của những chiếc hành lý trong tranh nhưng chúng không được xếp cạnh thang cuốn.\n- Loại (B) vì chứa đối tượng không có trong tranh - “a shuttle bus\" (xe dua đón). Phương án bẫy - có sự xuất hiện của những chiếc va li trong tranh nhưng không có cái nào đang được nâng lên xe đưa đón.\n- Loại (C) vì chứa đối tượng không có trong tranh - “a shop window\" (cửa kính bày hàng). Phương án bẫy - có sự xuất hiện của những chiếc va li trong tranh nhưng chúng không được trưng bày trong cửa kính bày hàng."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "A",
   "textEn": "Have the machines on the factory floor been cleaned? (A) No, not yet. (B) It's in the shipping container. (C) I just put it in the trash bin.",
   "transcript": "Have the machines on the factory floor been cleaned?\n(A) No, not yet.\n(B) It's in the shipping container.\n(C) I just put it in the trash bin.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nMáy móc trong xưởng sản xuất đã được lau dọn chưa?\n(A) Chưa, vẫn chưa.\n(B) Nó ở trong công-te-nơ vận chuyển.\n(C) Tôi vừa bỏ nó vào thùng rác.\n\nGiải thích: Câu hỏi Yes/No về việc máy móc đã được lau chưa → (A) trả lời trực tiếp \"chưa\". (B) nói về vị trí đồ vật; (C) bẫy liên tưởng \"cleaned\" – \"trash bin\"."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "A",
   "textEn": "How much will the budget increase next year? (A) About 10 percent. (B) Three hours, I think. (C) At the bank's main branch.",
   "transcript": "How much will the budget increase next year?\n(A) About 10 percent.\n(B) Three hours, I think.\n(C) At the bank's main branch.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nNgân sách năm sau sẽ tăng bao nhiêu?\n(A) Khoảng 10 phần trăm.\n(B) Tôi nghĩ là ba tiếng.\n(C) Ở chi nhánh chính của ngân hàng.\n\nGiải thích: How much hỏi mức tăng → (A) đưa ra con số phần trăm. (B) trả lời thời lượng; (C) trả lời địa điểm, bẫy liên tưởng \"budget\" – \"bank\"."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "B",
   "textEn": "You're going to water the plants before you leave, aren't you? (A) I walked the whole way. (B) Yes, right after lunch. (C) In the breakroom.",
   "transcript": "You're going to water the plants before you leave, aren't you?\n(A) I walked the whole way.\n(B) Yes, right after lunch.\n(C) In the breakroom.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn sẽ tưới cây trước khi về, phải không?\n(A) Tôi đã đi bộ suốt quãng đường.\n(B) Vâng, ngay sau bữa trưa.\n(C) Ở phòng nghỉ.\n\nGiải thích: Câu hỏi đuôi xác nhận việc tưới cây → (B) xác nhận \"Vâng\" và nói thời điểm. (A) không liên quan; (C) trả lời địa điểm."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "B",
   "textEn": "Aren't you going to schedule an eye doctor appointment? (A) Those glasses look nice on you. (B) I already scheduled one. (C) The seminar is three days long.",
   "transcript": "Aren't you going to schedule an eye doctor appointment?\n(A) Those glasses look nice on you.\n(B) I already scheduled one.\n(C) The seminar is three days long.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn không định đặt lịch khám mắt à?\n(A) Cặp kính đó hợp với bạn đấy.\n(B) Tôi đã đặt một lịch rồi.\n(C) Hội thảo kéo dài ba ngày.\n\nGiải thích: Câu hỏi phủ định về việc đặt lịch khám → (B) cho biết đã đặt rồi. (A) bẫy liên tưởng \"eye doctor\" – \"glasses\"; (C) bẫy lặp âm \"schedule\" – \"seminar\"."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "C",
   "textEn": "I'm going to try to fix this printer. (A) You're right, it doesn't fit. (B) Double-sided copies. (C) Are you sure it can be repaired?",
   "transcript": "I'm going to try to fix this printer.\n(A) You're right, it doesn't fit.\n(B) Double-sided copies.\n(C) Are you sure it can be repaired?",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTôi sẽ thử sửa cái máy in này.\n(A) Bạn nói đúng, nó không vừa.\n(B) Bản sao hai mặt.\n(C) Bạn có chắc là nó sửa được không?\n\nGiải thích: Câu trần thuật → (C) đáp lại hợp lý bằng câu hỏi nghi ngờ khả năng sửa. (A) bẫy âm \"fix\" – \"fit\"; (B) bẫy liên tưởng \"printer\" – \"copies\"."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "C",
   "textEn": "What should we do with these brochures? (A) A trip to the seashore. (B) Yes, I found it already. (C) I'll leave them at the front desk.",
   "transcript": "What should we do with these brochures?\n(A) A trip to the seashore.\n(B) Yes, I found it already.\n(C) I'll leave them at the front desk.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nChúng ta nên làm gì với những tờ quảng cáo này?\n(A) Một chuyến đi ra bờ biển.\n(B) Vâng, tôi tìm thấy nó rồi.\n(C) Tôi sẽ để chúng ở quầy lễ tân.\n\nGiải thích: What should we do hỏi cách xử lý → (C) nêu việc sẽ làm với các tờ quảng cáo. (A) không liên quan; (B) trả lời Yes không phù hợp câu hỏi Wh-."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "B",
   "textEn": "Has the policy meeting been rescheduled? (A) We have lots of desk calendar designs. (B) Yes, it's happening tomorrow instead. (C) This soup I ordered is delicious.",
   "transcript": "Has the policy meeting been rescheduled?\n(A) We have lots of desk calendar designs.\n(B) Yes, it's happening tomorrow instead.\n(C) This soup I ordered is delicious.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCuộc họp về chính sách đã được dời lịch chưa?\n(A) Chúng tôi có nhiều mẫu lịch để bàn.\n(B) Vâng, thay vào đó nó sẽ diễn ra vào ngày mai.\n(C) Món súp tôi gọi ngon quá.\n\nGiải thích: Câu hỏi Yes/No về việc dời lịch → (B) xác nhận và nêu thời gian mới. (A) bẫy liên tưởng \"rescheduled\" – \"calendar\"; (C) không liên quan."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "A",
   "textEn": "Why don't we stop by the office cafeteria on our way to the workshop? (A) Sure, we have time for that. (B) A full-service buffet. (C) The topic is professional networking.",
   "transcript": "Why don't we stop by the office cafeteria on our way to the workshop?\n(A) Sure, we have time for that.\n(B) A full-service buffet.\n(C) The topic is professional networking.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nSao chúng ta không ghé căng tin văn phòng trên đường đến hội thảo nhỉ?\n(A) Được chứ, chúng ta có thời gian cho việc đó.\n(B) Một bữa tiệc buffet đầy đủ.\n(C) Chủ đề là xây dựng mạng lưới quan hệ nghề nghiệp.\n\nGiải thích: Why don't we... là lời đề nghị → (A) đồng ý. (B) bẫy liên tưởng \"cafeteria\" – \"buffet\"; (C) bẫy liên tưởng \"workshop\" – \"topic\"."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "B",
   "textEn": "Have you tried our famous pasta dish? (A) We need a table for five. (B) Yes, it was delicious. (C) I'll try to make it on time.",
   "transcript": "Have you tried our famous pasta dish?\n(A) We need a table for five.\n(B) Yes, it was delicious.\n(C) I'll try to make it on time.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn đã thử món mì Ý nổi tiếng của chúng tôi chưa?\n(A) Chúng tôi cần một bàn cho năm người.\n(B) Rồi, ngon lắm.\n(C) Tôi sẽ cố đến kịp giờ.\n\nGiải thích: Câu hỏi Yes/No về việc đã thử món ăn → (B) \"Rồi, ngon lắm\". (A) bẫy liên tưởng nhà hàng; (C) bẫy lặp từ \"try\"."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "B",
   "textEn": "Who's the opening act at tonight’s concert? (A) Could you turn up the volume? (B) A jazz singer from France. (C) The position has been filled.",
   "transcript": "Who's the opening act at tonight’s concert?\n(A) Could you turn up the volume?\n(B) A jazz singer from France.\n(C) The position has been filled.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nAi là nghệ sĩ mở màn cho buổi hòa nhạc tối nay?\n(A) Bạn có thể vặn to âm lượng lên không?\n(B) Một ca sĩ nhạc jazz đến từ Pháp.\n(C) Vị trí đó đã có người.\n\nGiải thích: Who hỏi người → (B) nêu người biểu diễn. (A) bẫy liên tưởng \"concert\" – \"volume\"; (C) bẫy nghĩa \"opening\" (vị trí trống)."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "A",
   "textEn": "When do the product demonstrations start? (A) The schedule was e-mailed last Friday. (B) Some innovative features. (C) In room 202, I think.",
   "transcript": "When do the product demonstrations start?\n(A) The schedule was e-mailed last Friday.\n(B) Some innovative features.\n(C) In room 202, I think.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nKhi nào các buổi trình diễn sản phẩm bắt đầu?\n(A) Lịch trình đã được gửi email vào thứ Sáu tuần trước.\n(B) Một số tính năng đổi mới.\n(C) Ở phòng 202, tôi nghĩ vậy.\n\nGiải thích: When hỏi thời gian → (A) trả lời gián tiếp: xem lịch đã gửi qua email. (B) bẫy liên tưởng \"product\"; (C) trả lời địa điểm (Where)."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "C",
   "textEn": "I tried updating the Web site, but it didn't work. (A) That date works for me. (B) Usually our online reviews. (C) Just send me the changes you want.",
   "transcript": "I tried updating the Web site, but it didn't work.\n(A) That date works for me.\n(B) Usually our online reviews.\n(C) Just send me the changes you want.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTôi đã thử cập nhật trang web nhưng không được.\n(A) Ngày đó tôi rảnh.\n(B) Thường là các đánh giá trực tuyến của chúng ta.\n(C) Cứ gửi cho tôi những thay đổi bạn muốn.\n\nGiải thích: Câu trần thuật nêu vấn đề → (C) đưa ra cách giúp đỡ. (A) bẫy lặp \"work\" (\"works for me\"); (B) bẫy liên tưởng \"Web site\" – \"online\"."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "B",
   "textEn": "Did you hire a new welding specialist? (A) The part's back-ordered. (B) Yes, he starts tomorrow. (C) No, it should be higher.",
   "transcript": "Did you hire a new welding specialist?\n(A) The part's back-ordered.\n(B) Yes, he starts tomorrow.\n(C) No, it should be higher.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn đã thuê chuyên viên hàn mới chưa?\n(A) Bộ phận đó đang chờ hàng về.\n(B) Rồi, anh ấy bắt đầu làm từ ngày mai.\n(C) Không, nó nên cao hơn.\n\nGiải thích: Câu hỏi Yes/No về việc tuyển người → (B) xác nhận và cho biết ngày bắt đầu. (A) không liên quan; (C) bẫy âm \"hire\" – \"higher\"."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "How was the color palette for the lobby chosen? (A) Blue and orange. (B) It was fine, thanks. (C) I wasn't involved.",
   "transcript": "How was the color palette for the lobby chosen?\n(A) Blue and orange.\n(B) It was fine, thanks.\n(C) I wasn't involved.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBảng màu cho sảnh đã được chọn như thế nào?\n(A) Xanh dương và cam.\n(B) Ổn cả, cảm ơn.\n(C) Tôi không tham gia việc đó.\n\nGiải thích: How hỏi cách chọn → (C) trả lời gián tiếp là mình không tham gia nên không biết. (A) bẫy liên tưởng \"color\"; (B) đáp lại câu hỏi thăm (How was...)."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "B",
   "textEn": "When are we ordering more supplies for the Office? (A) In the storage closet. (B) Next week on Monday. (C) The new desk looks great!",
   "transcript": "When are we ordering more supplies for the Office?\n(A) In the storage closet.\n(B) Next week on Monday.\n(C) The new desk looks great!",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nKhi nào chúng ta đặt thêm văn phòng phẩm?\n(A) Trong tủ chứa đồ.\n(B) Thứ Hai tuần sau.\n(C) Cái bàn mới trông đẹp quá!\n\nGiải thích: When hỏi thời gian → (B) nêu thời điểm. (A) trả lời địa điểm; (C) bẫy liên tưởng \"office\" – \"desk\"."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "A",
   "textEn": "The battery for the water pump is going to be solar powered, right? (A) We're still in the planning stages. (B) A hundred and forty dollars per year. (C) Yes, I'd love a glass of water.",
   "transcript": "The battery for the water pump is going to be solar powered, right?\n(A) We're still in the planning stages.\n(B) A hundred and forty dollars per year.\n(C) Yes, I'd love a glass of water.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nPin cho máy bơm nước sẽ chạy bằng năng lượng mặt trời, đúng không?\n(A) Chúng tôi vẫn đang trong giai đoạn lên kế hoạch.\n(B) Một trăm bốn mươi đô la mỗi năm.\n(C) Vâng, tôi muốn một cốc nước.\n\nGiải thích: Câu hỏi xác nhận → (A) trả lời gián tiếp là chưa quyết định. (B) trả lời giá tiền; (C) bẫy lặp \"water\"."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "B",
   "textEn": "Where can I buy a charger for this laptop? (A) Around three o'clock. (B) I can order one for you. (C) A limited return policy.",
   "transcript": "Where can I buy a charger for this laptop?\n(A) Around three o'clock.\n(B) I can order one for you.\n(C) A limited return policy.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi có thể mua bộ sạc cho máy tính xách tay này ở đâu?\n(A) Khoảng ba giờ.\n(B) Tôi có thể đặt mua một cái cho bạn.\n(C) Chính sách đổi trả có giới hạn.\n\nGiải thích: Where hỏi nơi mua → (B) đề nghị đặt giúp (trả lời gián tiếp). (A) trả lời thời gian; (C) bẫy liên tưởng \"buy\" – \"return policy\"."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "A",
   "textEn": "Do I need to reserve a meeting room? (A) Yes, let me show you how. (B) The service Is good. (C) My slide presentation.",
   "transcript": "Do I need to reserve a meeting room?\n(A) Yes, let me show you how.\n(B) The service Is good.\n(C) My slide presentation.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nTôi có cần đặt phòng họp không?\n(A) Có, để tôi chỉ bạn cách làm.\n(B) Dịch vụ tốt lắm.\n(C) Bài thuyết trình bằng slide của tôi.\n\nGiải thích: Câu hỏi Yes/No → (A) \"Có\" và đề nghị hướng dẫn. (B), (C) không liên quan (bẫy liên tưởng \"meeting\" – \"presentation\")."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "When's the new department director supposed to start? (A) It’s an hour long. (B) Ms. Pavlova isn't retiring for several weeks. (C) No, that department's upstairs.",
   "transcript": "When's the new department director supposed to start?\n(A) It’s an hour long.\n(B) Ms. Pavlova isn't retiring for several weeks.\n(C) No, that department's upstairs.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nKhi nào giám đốc bộ phận mới bắt đầu làm việc?\n(A) Nó dài một tiếng.\n(B) Bà Pavlova vài tuần nữa mới nghỉ hưu.\n(C) Không, bộ phận đó ở tầng trên.\n\nGiải thích: When hỏi thời gian → (B) trả lời gián tiếp: giám đốc cũ còn vài tuần nữa mới nghỉ nên người mới chưa bắt đầu. (A) trả lời thời lượng; (C) trả lời No không hợp câu Wh-, bẫy lặp \"department\"."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "C",
   "textEn": "Should I deliver these pizzas, or will you? (A) No thanks—I'm not hungry. (B) Ten dollars for two. (C) They're being picked up.",
   "transcript": "Should I deliver these pizzas, or will you?\n(A) No thanks—I'm not hungry.\n(B) Ten dollars for two.\n(C) They're being picked up.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTôi giao mấy cái pizza này hay bạn giao?\n(A) Không, cảm ơn — tôi không đói.\n(B) Mười đô la hai cái.\n(C) Chúng sẽ được khách đến lấy.\n\nGiải thích: Câu hỏi lựa chọn → (C) trả lời rằng không ai cần giao vì khách tự đến lấy. (A), (B) bẫy liên tưởng \"pizza\"."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "B",
   "textEn": "This month's shipment schedule has been revised. (A) I couldn't find them either. (B) Which dates have been changed? (C) Two dollars per pound",
   "transcript": "This month's shipment schedule has been revised.\n(A) I couldn't find them either.\n(B) Which dates have been changed?\n(C) Two dollars per pound",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nLịch giao hàng tháng này đã được điều chỉnh.\n(A) Tôi cũng không tìm thấy chúng.\n(B) Những ngày nào đã bị thay đổi?\n(C) Hai đô la mỗi pound.\n\nGiải thích: Câu trần thuật → (B) hỏi lại chi tiết thay đổi, phản hồi tự nhiên. (A) không liên quan; (C) bẫy liên tưởng \"shipment\" – giá cước."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "How much will the repairs cost? (A) The work is covered under the warranty plan. (B) Yes, it's also available in red. (C) In about two weeks.",
   "transcript": "How much will the repairs cost?\n(A) The work is covered under the warranty plan.\n(B) Yes, it's also available in red.\n(C) In about two weeks.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nChi phí sửa chữa sẽ là bao nhiêu?\n(A) Công việc này được bảo hành chi trả.\n(B) Vâng, nó cũng có màu đỏ.\n(C) Khoảng hai tuần nữa.\n\nGiải thích: How much hỏi chi phí → (A) trả lời gián tiếp là không mất tiền vì được bảo hành. (B) trả lời Yes không hợp; (C) trả lời thời gian."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "Why don't we provide more samples of the wallpaper patterns? (A) The newspaper is delivered daily. (B) An interior design course. (C) There are plenty in the binders.",
   "transcript": "Why don't we provide more samples of the wallpaper patterns?\n(A) The newspaper is delivered daily.\n(B) An interior design course.\n(C) There are plenty in the binders.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nSao chúng ta không cung cấp thêm mẫu giấy dán tường nhỉ?\n(A) Báo được giao hằng ngày.\n(B) Một khóa học thiết kế nội thất.\n(C) Trong các bìa hồ sơ có rất nhiều rồi.\n\nGiải thích: Lời đề nghị → (C) từ chối gián tiếp vì đã có nhiều mẫu. (A) bẫy âm \"paper\" – \"newspaper\"; (B) bẫy liên tưởng \"wallpaper\" – \"interior design\"."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "A",
   "textEn": "Can you give me a tour of the property this afternoon? (A) Sorry, I won't have time until tomorrow. (B) It has a very modern design. (C) A house on Maple Street.",
   "transcript": "Can you give me a tour of the property this afternoon?\n(A) Sorry, I won't have time until tomorrow.\n(B) It has a very modern design.\n(C) A house on Maple Street.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nChiều nay bạn có thể dẫn tôi đi xem bất động sản không?\n(A) Xin lỗi, đến mai tôi mới có thời gian.\n(B) Nó có thiết kế rất hiện đại.\n(C) Một ngôi nhà trên phố Maple.\n\nGiải thích: Lời yêu cầu → (A) từ chối lịch sự và hẹn ngày khác. (B), (C) bẫy liên tưởng \"property\"."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "A",
   "textEn": "Who's scheduled to test the product today? (A) We're waiting for confirmation. (B) It's a great album, right? (C) About six weeks ago.",
   "transcript": "Who's scheduled to test the product today?\n(A) We're waiting for confirmation.\n(B) It's a great album, right?\n(C) About six weeks ago.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nAi được xếp lịch thử nghiệm sản phẩm hôm nay?\n(A) Chúng tôi đang chờ xác nhận.\n(B) Đó là một album tuyệt vời, nhỉ?\n(C) Khoảng sáu tuần trước.\n\nGiải thích: Who hỏi người → (A) trả lời gián tiếp là chưa biết vì còn chờ xác nhận. (B) không liên quan; (C) trả lời thời gian."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "32. Where does the conversation most likely take place? (A) On a train (B) On a boat (C) At a factory (D) At an airport",
   "transcript": "M: Good morning, captain. We'll be docking at the port in Kolkata this evening, right?\nW: Actually, we had to change course overnight to avoid a storm, so we're running behind schedule. But we should arrive early tomorrow.\nM: Well, that's not too bad.\nW: Oh, Hector has the day off today, so I'll need you to do the morning rounds-starting with checking the machinery in the engine room.\nM: of course-III head there now.",
   "explanationVi": "Đáp án đúng: B\n\n32. Cuộc trò chuyện có khả năng cao là diễn ra ở đâu?\n(A) Trên một chuyển tàu\n(B) Trên một chiếc thuyền\n(C) Tại một nhà máy\n(D) Tại một sân bay\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, conversation, likely, take place.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại của người đàn ông: “Good morning, captain. We'll be docking...” (Chào buổi sáng, đội trưởng. Chúng ta sẽ cập cảng...) là dấu hiệu sắp đến đáp án. “We'll be docking at the port in Kolkata this evening, right?” là thông tin chứa đáp án.\nNgười dan ông hỏi rằng họ sẽ cập cảng vào tối đó, điều này có nghĩa rằng cuộc trò chuyện có khả năng cao là đang diễn ra ở trên một con tàu.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Cn 32 Chào buổi sáng, đội trưởng. Tối nay chúng ta sẽ cập cảng 6 Kolkata phải không? W-Am 33 Thật ra, chúng ta phải đồi hướng trong đêm đề tránh bão nên đã bị chậm tiền độ. Nhưng ngày mai chúng ta sẽ đến sớm.\nM-Cn Chà, điều đó cũng không tệ lắm.\nW-Am Ò, hôm nay Hector được nghỉ, nên 34 tôi cần bạn làm các công việc buổi sáng- bắt đầu bằng việc kiểm tra máy móc trong phòng máy.\nM-Cn 34 Tắt nhiên- Tôi sẽ đến đó ngay bây giờ."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "33. What caused a delay? (A) An electrical failure occurred. (B) A worker was unavailable. (C) Some information was incorrect. (D) The weather was bad.",
   "transcript": "M: Good morning, captain. We'll be docking at the port in Kolkata this evening, right?\nW: Actually, we had to change course overnight to avoid a storm, so we're running behind schedule. But we should arrive early tomorrow.\nM: Well, that's not too bad.\nW: Oh, Hector has the day off today, so I'll need you to do the morning rounds-starting with checking the machinery in the engine room.\nM: of course-III head there now.",
   "explanationVi": "Đáp án đúng: D\n\n33. Điều gì gây ra sự chậm trễ?\n(A) Đã xảy ra sự có về điện.\n(B) Một công nhân không có mặt.\n(C) Một số thông tin không chính xác.\n(D) Thời tiết xấu.\nCách diễn đạt tương đương: - bad weather (thời tiết xấu) = storm (bão) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, caused, delay.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người phụ nữ: “Actually, we had to change course overnight to avoid...\" (Thật ra, chúng ta phải đổi hướng trong đêm để tránh...) là dấu hiệu sắp đến đáp án. “Actually, we had to change course overnight to avoid a storm, so we're running behind schedule.” là thông tin chứa đáp án.\n- “bad weather\" là cách diễn đạt tương đương của “storm”.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- (B) phương án bẫy, bài nói có nhắc đến việc một công nhân tên “Hector” không có mặt nhưng đó không phải lý do gây ra sự chậm trễ.\n- Cac phương án (A), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn 32 Chào buổi sáng, đội trưởng. Tối nay chúng ta sẽ cập cảng 6 Kolkata phải không? W-Am 33 Thật ra, chúng ta phải đồi hướng trong đêm đề tránh bão nên đã bị chậm tiền độ. Nhưng ngày mai chúng ta sẽ đến sớm.\nM-Cn Chà, điều đó cũng không tệ lắm.\nW-Am Ò, hôm nay Hector được nghỉ, nên 34 tôi cần bạn làm các công việc buổi sáng- bắt đầu bằng việc kiểm tra máy móc trong phòng máy.\nM-Cn 34 Tắt nhiên- Tôi sẽ đến đó ngay bây giờ."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "34. What will the man do next? (A) Confirm a schedule (B) Speak to a coworker (C) Check some machinery (D) Clean a storage room",
   "transcript": "M: Good morning, captain. We'll be docking at the port in Kolkata this evening, right?\nW: Actually, we had to change course overnight to avoid a storm, so we're running behind schedule. But we should arrive early tomorrow.\nM: Well, that's not too bad.\nW: Oh, Hector has the day off today, so I'll need you to do the morning rounds-starting with checking the machinery in the engine room.\nM: of course-III head there now.",
   "explanationVi": "Đáp án đúng: C\n\nNgười đàn ông sẽ làm gì tiếp theo?\n(A) Xác nhận lịch trình\n(B) Nói chuyện với đông nghiệp\n(C) Kiêm tra một sô máy móc\n(D) Dọn dẹp phòng chứa đồ\nCách diễn đạt tương đương: s check some machinery = checking the machinery (kiểm tra máy móc)\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, man, do, next.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “I'll need you to do the morning rounds- starting with...” (tôi cần bạn làm các công việc buổi sáng- bắt đầu bằng...) là dấu hiệu sắp đến đáp án. “I'll need you to do the morning rounds- starting with checking the machinery in the engine room.” là thông tin chứa đáp án.\n- “check some machinery” là cách diễn đạt tương đương của “checking the machinery”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “schedule” ở câu trước nhưng đó không phải công việc của người đàn ông.\n- (B) phương án bẫy, bài nói có nhắc đến một người đồng nghiệp tên là “Hector” nhưng người ấy đã nghỉ, không phải sẽ nói chuyện với người đàn ông.\n- (D)phương án bẫy, bài nói có nhắc đến từ “room” nhưng là “engine room\" (phòng máy), không phải “storage room” (phòng chứa đồ).\n\nDịch hội thoại:\nM-Cn 32 Chào buổi sáng, đội trưởng. Tối nay chúng ta sẽ cập cảng 6 Kolkata phải không? W-Am 33 Thật ra, chúng ta phải đồi hướng trong đêm đề tránh bão nên đã bị chậm tiền độ. Nhưng ngày mai chúng ta sẽ đến sớm.\nM-Cn Chà, điều đó cũng không tệ lắm.\nW-Am Ò, hôm nay Hector được nghỉ, nên 34 tôi cần bạn làm các công việc buổi sáng- bắt đầu bằng việc kiểm tra máy móc trong phòng máy.\nM-Cn 34 Tắt nhiên- Tôi sẽ đến đó ngay bây giờ."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "35. Where does the woman most likely work? (A) At a sports stadium (B) At a. fitness center (C) At a doctors office (D) At a library",
   "transcript": "M: Hi. I'm here to schedule some personal training sessions.\nW: OK. What are your fitness goals?\nM: I'd like to lift weights and build strength.\nW: I can work with you on that. Are you currently a member here?\nM: No, I'll also need to sign up for a membership. I saw online that youre running a special for new members-fifty percent off the first month's membership. Can I sign up for that?\nW: Absolutely. But before I get you signed up, let me show you around our facility.",
   "explanationVi": "Đáp án đúng: B\n\n35. Người phụ nữ có khả năng cao là làm việc ở đâu?\n(A) Tại một sân vận động thể thao\n(B) Tại một trung tâm thể hình\n(C) Tại văn phòng bác sĩ\n(D) Tại thư viện\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, woman, likely, work.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại của người đàn ông: “Hi. I'm here to...” (Xin chào. Tôi đến đây để...) là dấu hiệu sắp đến đáp án. “I'm here to schedule some personal training sessions.” va “What are your fitness goals?” là thông tin chứa đáp án.\n- Người đàn ông nói rằng mình đến đó để sắp xếp một số buổi huấn luyện cá nhân, và người phụ nữ hỏi lại về mục tiêu sức khỏe của anh ta, điều này có nghĩa rằng cuộc trò chuyện có khả năng cao là đang diễn ra ở một trung tâm thể hình và người phụ nữ là nhân viên làm việc ở đó.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Các phương an (A), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Cn Xin chao. 35 Tôi đến đây dé sắp xếp một số buổi huấn luyện cá nhân.\nW-Anh OK. 35 Mục tiêu sức khỏe của bạn là gi?\nM-Cn Tôi muốn tập nâng tạ và phát triển sức mạnh.\nW-Br Tôi có thể hỗ trợ bạn trong việc đó. Bạn đã là thành viên ở đây chưa?\nM-Cn Chưa, tôi cũng sẽ can đăng ký làm thành viên. 36 Tôi thầy trên mạng rằng bạn đang thực hiện chương trình đặc biệt dành cho thành viên mới- giảm giá 50% cho thành viên tháng đầu tiên. Tôi có thể đăng ký cái đó không?\nW-Br Chắc chắn rồi. 37 Nhưng trước khi tôi giúp bạn đăng ký, hãy dé tôi dẫn bạn đi tham quan cơ sở vật chất của chúng tôi."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "36. What does the man ask about? (A) A discount (B) A form (C) A business location (D) A parking policy",
   "transcript": "M: Hi. I'm here to schedule some personal training sessions.\nW: OK. What are your fitness goals?\nM: I'd like to lift weights and build strength.\nW: I can work with you on that. Are you currently a member here?\nM: No, I'll also need to sign up for a membership. I saw online that youre running a special for new members-fifty percent off the first month's membership. Can I sign up for that?\nW: Absolutely. But before I get you signed up, let me show you around our facility.",
   "explanationVi": "Đáp án đúng: A\n\nNgười đàn ông hỏi về điều gì?\n(A) Chương trình giảm giá\n(B) Một biểu mẫu\n(C) Địa điêm kinh doanh\n(D) Chính sách đỗ xe\nCách diễn đạt tương đương:\n- discount (chương trình giảm gia) = special (chương trình đặc biệt) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, ask.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người đàn ông: “I saw online that you're running a...” (Tôi thấy trên mạng rằng bạn đang thực hiện một...) là dấu hiệu sắp đến đáp án. “I saw online that you're running a special for new members- fifty percent off the first month's\nmembership. Can | sign up for that?” là thông tin chứa đáp án. s “discount” là cách diễn đạt tương đương của “special” trong ngữ cảnh này.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chao. 35 Tôi đến đây dé sắp xếp một số buổi huấn luyện cá nhân.\nW-Anh OK. 35 Mục tiêu sức khỏe của bạn là gi?\nM-Cn Tôi muốn tập nâng tạ và phát triển sức mạnh.\nW-Br Tôi có thể hỗ trợ bạn trong việc đó. Bạn đã là thành viên ở đây chưa?\nM-Cn Chưa, tôi cũng sẽ can đăng ký làm thành viên. 36 Tôi thầy trên mạng rằng bạn đang thực hiện chương trình đặc biệt dành cho thành viên mới- giảm giá 50% cho thành viên tháng đầu tiên. Tôi có thể đăng ký cái đó không?\nW-Br Chắc chắn rồi. 37 Nhưng trước khi tôi giúp bạn đăng ký, hãy dé tôi dẫn bạn đi tham quan cơ sở vật chất của chúng tôi."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "37. What will the woman do next? (A) Post a sign (B) Confirm an account number (C) Provide a tour (D) Look at a schedule",
   "transcript": "M: Hi. I'm here to schedule some personal training sessions.\nW: OK. What are your fitness goals?\nM: I'd like to lift weights and build strength.\nW: I can work with you on that. Are you currently a member here?\nM: No, I'll also need to sign up for a membership. I saw online that youre running a special for new members-fifty percent off the first month's membership. Can I sign up for that?\nW: Absolutely. But before I get you signed up, let me show you around our facility.",
   "explanationVi": "Đáp án đúng: C\n\n37. Người phụ nữ sẽ làm gì tiếp theo?\n(A) Đặt một biển báo\n(B) Xác nhận số tài khoản\n(C) Cung cấp một chuyền tham quan\n(D) Xem lịch trình\nCách diễn đạt tương đương:\n- provide a tour (cung cấp một chuyến tham quan) = show you around (dẫn ban đi tham quan)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, do, next.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người phụ nữ: “But before | get you signed up, let me...” (Nhưng trước khi tôi giúp bạn đăng ky, hãy để tôi...) là dấu hiệu sắp đến dap án. “But before | get you signed up, let me show you around our facility.” là thông tin chứa dap án.\n- “provide a tour” là cách diễn đạt tương đương của “show you around”.\n→ Phương án (CO) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “sign”, đây là từ có nhiều nghĩa. Từ “sign” trong bài nói là một phan của phrasal verb “sign up”, mang nghĩa “đăng ký”; trong khi đó, từ “sign” trong phương án là danh từ, mang nghĩa “biển báo”. Dù cách viết và phát âm giống nhau nhưng nghĩa của chúng khác nhau.\n- Cac phương án (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chao. 35 Tôi đến đây dé sắp xếp một số buổi huấn luyện cá nhân.\nW-Anh OK. 35 Mục tiêu sức khỏe của bạn là gi?\nM-Cn Tôi muốn tập nâng tạ và phát triển sức mạnh.\nW-Br Tôi có thể hỗ trợ bạn trong việc đó. Bạn đã là thành viên ở đây chưa?\nM-Cn Chưa, tôi cũng sẽ can đăng ký làm thành viên. 36 Tôi thầy trên mạng rằng bạn đang thực hiện chương trình đặc biệt dành cho thành viên mới- giảm giá 50% cho thành viên tháng đầu tiên. Tôi có thể đăng ký cái đó không?\nW-Br Chắc chắn rồi. 37 Nhưng trước khi tôi giúp bạn đăng ký, hãy dé tôi dẫn bạn đi tham quan cơ sở vật chất của chúng tôi."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "38. Who most likely are the speakers? (A) Art restorers (B) Event planners (C) Photographers (D) Interior designers",
   "transcript": "W: As you can see, this Renaissance landscape painting we acquired is in bad condition. We can't display it yet.\nM: Hmm, yes. This painting will need significant restoration work.\nW: I'll begin by investigating the artist's color palette and style to see how we should repair the damaged areas.\nM: You know, this would be a stunning piece to unveil at our anniversary dinner in June. And, since it's a big project to finish by then, we should get started right away.",
   "explanationVi": "Đáp án đúng: A\n\n38. Ai có khả năng cao là những người đang phát biểu?\n(A) Những người phục chế nghệ thuật\n(B) Những người tổ chức sự kiện\n(C) Những nhiếp ảnh gia\n(D) Những nhà thiết kế nội thất\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, likely, speakers.\n- Dạng câu hỏi: thông tin tổng quát.\n- Lời thoại của người phụ nữ: “As you can see, this Renaissance landscape painting we acquired is in bad condition. We can't display it yet.” (Như ban có thé thấy, bức tranh phong cảnh thời Phục hung mà chúng tôi mua được này đang trong tình trạng tồi tệ. Chúng tôi chưa thể trưng bày nó.) là dấu hiệu sắp đến đáp án. “This painting will need significant restoration work.” và “ I'll begin by investigating the artist's color palette and style to see how we should repair the damaged areas.” là thông tin chứa đáp an.\n- oan hội thoại xoay quanh nội dung về công việc phục chế một bức tranh, điều này có nghĩa là những người nói có khả năng cao là những nhà phục chế nghệ thuật.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nW-Am Như bạn có thé thay, bức tranh phong cảnh thời Phục hưng mà chúng tôi mua được này đang trong tình trạng tồi tệ. Chúng tôi chưa thể trưng bay nó.\nM-Cn Hmm, vâng. 38 Bức tranh này sẽ cần phải được phục chế đáng kể.\nW-Am 38,39 Tôi sẽ bắt đầu bằng việc nghiên cứu bang mau và phong cách của nghệ sĩ dé xem chúng tôi nên sửa chữa những khu vực bị hư hỏng như thế nào.\nM-Cn Bạn biết đầy, 40 đây sẽ là một tác phẩm tuyệt vời sẽ ra mắt tại bữa tối kỷ niệm của chúng ta vào tháng 6. Và vì day là một dự án lớn phải hoàn thành trước thời điêm đó nên chúng ta nên băt đâu ngay."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What does the woman say she will do? (A) Hire an intern (B) Review a contract (C) Take some measurements (D) Investigate a problem",
   "transcript": "W: As you can see, this Renaissance landscape painting we acquired is in bad condition. We can't display it yet.\nM: Hmm, yes. This painting will need significant restoration work.\nW: I'll begin by investigating the artist's color palette and style to see how we should repair the damaged areas.\nM: You know, this would be a stunning piece to unveil at our anniversary dinner in June. And, since it's a big project to finish by then, we should get started right away.",
   "explanationVi": "Đáp án đúng: D\n\n39. Người phụ nữ nói cô ấy sẽ làm gì?\n(A) Thuê một thực tập sinh\n(B) Xem lại hợp đồng\n(C) Thực hiện một số phép đo\n(D) Nghiên cứu một vấn đề\nCách diễn đạt tương đương:\n- investigate a problem ~ investigating (nghiên cứu vấn đề)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, ask.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “I'll begin by...” (Tôi sẽ bắt đầu bằng việc...) là dấu hiệu sắp đến đáp án. “I'll begin by investigating the artist's color palette and style to see how we should repair the damaged areas.” là thông tin chứa dap án.\n- “investigate a problem\" là cách diễn đạt tương đương của “investigating”.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Như bạn có thé thay, bức tranh phong cảnh thời Phục hưng mà chúng tôi mua được này đang trong tình trạng tồi tệ. Chúng tôi chưa thể trưng bay nó.\nM-Cn Hmm, vâng. 38 Bức tranh này sẽ cần phải được phục chế đáng kể.\nW-Am 38,39 Tôi sẽ bắt đầu bằng việc nghiên cứu bang mau và phong cách của nghệ sĩ dé xem chúng tôi nên sửa chữa những khu vực bị hư hỏng như thế nào.\nM-Cn Bạn biết đầy, 40 đây sẽ là một tác phẩm tuyệt vời sẽ ra mắt tại bữa tối kỷ niệm của chúng ta vào tháng 6. Và vì day là một dự án lớn phải hoàn thành trước thời điêm đó nên chúng ta nên băt đâu ngay."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "40. Why does the man suggest beginning a project quickly? (A) Payment has already been made. (B) Staff will be on vacation. (C) An important event is approaching (D) A client is in town for a limited time.",
   "transcript": "W: As you can see, this Renaissance landscape painting we acquired is in bad condition. We can't display it yet.\nM: Hmm, yes. This painting will need significant restoration work.\nW: I'll begin by investigating the artist's color palette and style to see how we should repair the damaged areas.\nM: You know, this would be a stunning piece to unveil at our anniversary dinner in June. And, since it's a big project to finish by then, we should get started right away.",
   "explanationVi": "Đáp án đúng: C\n\nTại sao người đàn ông đề nghị bắt đầu một dự án nhanh chóng?\n(A) Đã thanh toán tiên.\n(B) Nhân viên sẽ đi nghỉ. |\n(C) Một sự kiện quan trọng đang đên gân.\n(D) Một khách hàng đang ở lại trong thành phô trong thời gian có hạn.\nCách diễn đạt tương đương:\n- quickly (một cách nhanh chóng) = right away (ngay lập tức) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, man, beginning, project, quickly.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người đàn ông: “this would be a stunning piece to unveil at our...” (đây sẽ là một tác phẩm tuyệt vời sẽ ra mắt tai...) là dấu hiệu sắp đến đáp án. “this would be a stunning piece to unveil at our anniversary dinner in June. And, since it's a big project to finish by then, we should get started right away.” la thông tin chứa dap án. s “right away” là cách diễn đạt tương đương của “quickly” trong ngữ cảnh này. → Phương án (CO) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Như bạn có thé thay, bức tranh phong cảnh thời Phục hưng mà chúng tôi mua được này đang trong tình trạng tồi tệ. Chúng tôi chưa thể trưng bay nó.\nM-Cn Hmm, vâng. 38 Bức tranh này sẽ cần phải được phục chế đáng kể.\nW-Am 38,39 Tôi sẽ bắt đầu bằng việc nghiên cứu bang mau và phong cách của nghệ sĩ dé xem chúng tôi nên sửa chữa những khu vực bị hư hỏng như thế nào.\nM-Cn Bạn biết đầy, 40 đây sẽ là một tác phẩm tuyệt vời sẽ ra mắt tại bữa tối kỷ niệm của chúng ta vào tháng 6. Và vì day là một dự án lớn phải hoàn thành trước thời điêm đó nên chúng ta nên băt đâu ngay."
  },
  {
   "number": 41,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "41. What is the woman preparing? (A) A slide presentation (B) A travel itinerary (C) A guest list (D) A sales contract",
   "transcript": "W: Hi, Ozan. Do you have time to review some slides I'm presenting at a meeting on Thursday?\nM1: Oh. Is that the meeting with Smith Incorporated?\nW: yes. I'm presenting them with our updated marketing plan for their chain of bookstores.\nM2: You know, Smith Incorporated prefers informal meetings. I think just a handout highlighting how our marketing plan will positively impact their book sales would be enough.\nW: Really? Thilo, you've worked with this client before. What do you think?\nM3: Ozan is right. I think they'd prefer a meeting that was more of a conversation than a presentation.",
   "explanationVi": "Đáp án đúng: A\n\n41. Người phy nữ dang chuẩn bj gi?\n(A) Một bài thuyết trình kèm slide\n(B) Một hành trình du lịch\n(C) Một danh sách khách mời\n(D) Hợp đồng mua bán\nCách diễn đạt tương đương:\n- slide presentation (bài thuyết trình kèm slide) = slides (một số slide) Cách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, woman, preparing.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “Do you have time to review some...” (Bạn có thời gian để xem qua một sé...) là dấu hiệu sắp đến đáp án. “Do you have time to review some slides I'm presenting at a meeting on Thursday?” là thông tin chứa dap an.\n- “slide presentation” là cách diễn đạt tương đương của “slides”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Br Chào, Ozan. 41 Bạn có thời gian dé xem qua một sé slide mà tôi sẽ trình bày trong một cuộc họp vào thứ Năm không?\nM-Au Ô. 42 Đó có phải là cuộc họp với Smith Incorporated không?\nW-Br 42 Đúng vậy. Tôi sẽ trình bày về kế hoạch tiếp thị đã được cập nhật của chúng ta cho chuỗi cửa hàng sách của họ.\nM-Au Bạn biết đấy, 43 Smith Incorporated thích những cuộc gặp gỡ thân mật hơn. Tôi nghĩ chỉ cần một tờ rơi nêu bật cách mà kế hoạch tiếp thị của chúng ta sẽ tác động tích cực đến doanh số bán sách của họ là đủ rồi.\nW-Br Thật sao? Thilo, bạn đã làm việc với khách hàng này trước đây. Bạn nghĩ thé nào?\nM-Cn 43 Ozan nói đúng. Tôi nghĩ họ sẽ ưa thích một cuộc họp giống như một cuộc trò chuyện hơn là một bài thuyết trình."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "42. What Kind of business is Smith Incorporated? (A) A law firm (B) A construction company (C) A pharmaceutical manufacturer (D) A bookstore chain",
   "transcript": "W: Hi, Ozan. Do you have time to review some slides I'm presenting at a meeting on Thursday?\nM1: Oh. Is that the meeting with Smith Incorporated?\nW: yes. I'm presenting them with our updated marketing plan for their chain of bookstores.\nM2: You know, Smith Incorporated prefers informal meetings. I think just a handout highlighting how our marketing plan will positively impact their book sales would be enough.\nW: Really? Thilo, you've worked with this client before. What do you think?\nM3: Ozan is right. I think they'd prefer a meeting that was more of a conversation than a presentation.",
   "explanationVi": "Đáp án đúng: D\n\nSmith Incorporated thuộc loại hình kinh doanh nào?\n(A) Một công ty luật\n(B) Một công ty xây dựng\n(C) Một nhà sản xuất dược phẩm\n(D) Một chuỗi hiệu sách\nCách diễn đạt tương đương:\n- bookstore chain = chain of bookstores (chuỗi hiệu sách) Cách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, kind, business, Smith Incorporated.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người đàn ông: “Is that the meeting with Smith Incorporated?” (Đó có phải là cuộc họp với Smith Incorporated không?) là dấu hiệu sắp đến đáp án. “Yes. I'm presenting them with our updated marketing plan for their chain of bookstores.” là thông tin chứa dap an.\n- “bookstore chain” là cách diễn đạt tương đương của “chain of bookstores”.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Cac phương an (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Br Chào, Ozan. 41 Bạn có thời gian dé xem qua một sé slide mà tôi sẽ trình bày trong một cuộc họp vào thứ Năm không?\nM-Au Ô. 42 Đó có phải là cuộc họp với Smith Incorporated không?\nW-Br 42 Đúng vậy. Tôi sẽ trình bày về kế hoạch tiếp thị đã được cập nhật của chúng ta cho chuỗi cửa hàng sách của họ.\nM-Au Bạn biết đấy, 43 Smith Incorporated thích những cuộc gặp gỡ thân mật hơn. Tôi nghĩ chỉ cần một tờ rơi nêu bật cách mà kế hoạch tiếp thị của chúng ta sẽ tác động tích cực đến doanh số bán sách của họ là đủ rồi.\nW-Br Thật sao? Thilo, bạn đã làm việc với khách hàng này trước đây. Bạn nghĩ thé nào?\nM-Cn 43 Ozan nói đúng. Tôi nghĩ họ sẽ ưa thích một cuộc họp giống như một cuộc trò chuyện hơn là một bài thuyết trình."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "43. What do the men agree about? (A) A subscription should be canceled. (B) An advertising campaign should be delayed. (C) A training session should be mandatory. (D) A meeting should be casual.",
   "transcript": "W: Hi, Ozan. Do you have time to review some slides I'm presenting at a meeting on Thursday?\nM1: Oh. Is that the meeting with Smith Incorporated?\nW: yes. I'm presenting them with our updated marketing plan for their chain of bookstores.\nM2: You know, Smith Incorporated prefers informal meetings. I think just a handout highlighting how our marketing plan will positively impact their book sales would be enough.\nW: Really? Thilo, you've worked with this client before. What do you think?\nM3: Ozan is right. I think they'd prefer a meeting that was more of a conversation than a presentation.",
   "explanationVi": "Đáp án đúng: D\n\nCả hai người đàn ông đều đồng ý về điều gì?\n(A) Nên hủy đăng ký.\n(B) Một chiên dịch quảng cáo nên bị trì hoãn.\n(C) Một buôi đào tạo 1a bat buộc.\n(D) Một cuộc họp nên diễn ra một cách không trang trọng.\nCách diễn đạt tương đương:\n- casual = informal (không trang trọng, thân mật) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, men, agree, about.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người đàn ông thứ nhất (tên là Ozan): “Smith Incorporated prefers...” (Smith Incorporated thích...) và lời thoại của người phụ nữ đang hỏi ý\nkiến của người đàn ông thứ hai (tên là Thilo): “Thilo, you've worked with this client before. What do you think?” (Thilo, bạn đã làm việc với khách hàng này trước đây. Bạn nghĩ thế nào?) là dấu hiệu sắp đến đáp án. “Smith Incorporated prefers informal meetings.” và “Ozan is right. | think they'd prefer a meeting that was more of a conversation than a presentation.” là thông tin chứa đáp an.\n- “informal” là cách diễn đạt tương đương cua “casual \".\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (C) chứa thông tin không được đề cập.\n- (B) phương án bẫy, bài nói có nhắc đến từ “marketing plan” liên quan đến từ “advertising campaign” ở phương án, nhưng trong bài không hề nhắc đến việc kế hoạch này nên bị trì hoãn.\n\nDịch hội thoại:\nW-Br Chào, Ozan. 41 Bạn có thời gian dé xem qua một sé slide mà tôi sẽ trình bày trong một cuộc họp vào thứ Năm không?\nM-Au Ô. 42 Đó có phải là cuộc họp với Smith Incorporated không?\nW-Br 42 Đúng vậy. Tôi sẽ trình bày về kế hoạch tiếp thị đã được cập nhật của chúng ta cho chuỗi cửa hàng sách của họ.\nM-Au Bạn biết đấy, 43 Smith Incorporated thích những cuộc gặp gỡ thân mật hơn. Tôi nghĩ chỉ cần một tờ rơi nêu bật cách mà kế hoạch tiếp thị của chúng ta sẽ tác động tích cực đến doanh số bán sách của họ là đủ rồi.\nW-Br Thật sao? Thilo, bạn đã làm việc với khách hàng này trước đây. Bạn nghĩ thé nào?\nM-Cn 43 Ozan nói đúng. Tôi nghĩ họ sẽ ưa thích một cuộc họp giống như một cuộc trò chuyện hơn là một bài thuyết trình."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "44. Why does the woman congratulate the man? (A) He finished a road race. (B) He won a publishing award. (C) His experiment was successful. (D) His research funding was extended.",
   "transcript": "W: I heard that the results of your experiment were better than you expected. Congratulations!\nM: Thanks! I thought we'd have to run that reaction ten times before we got a positive result. But we got it on the third try.\nW: You'll have to write up your results and submit them to the research director. That's Esra, right?\nM: Oh, Esra's leaving the company next week.\nW: Oh, I didn't know that. I wonder if you'll be promoted to fill her position.\nM: I don't think so. I've never managed an entire research group. I hope to get some experience doing that next quarter.",
   "explanationVi": "Đáp án đúng: C\n\n44. Tại sao người phụ nữ chúc mừng người đàn ông?\n(A) Anh ấy đã hoàn thành một cuộc đua đường trường.\n(B) Anh ấy đã giành được một giải thưởng xuất ban.\n(C) Thí nghiệm của anh ấy đã thành công.\n(D) Nguồn tài trợ nghiên cứu của anh ấy đã được gia hạn.\nCách diễn đạt tương đương:\n- successful (thành công) * better than you expected (tốt hơn mong đợi)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, woman, congratulate, man.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “I heard that the results of your experiment...” (Tôi nghe nói kết quả thí nghiệm của ban...) là dấu hiệu sắp đến dap án. “I heard that the results of your experiment were better than you expected. Congratulations!” là thông tin chứa dap an.\n- “successful” là cách diễn dat tương đương của “better than you expected”.\n→ Phương án (CO) là phù hợp nhất. Loại phương án sai:\n- Cac phương an (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am 44 Tôi nghe nói kết qua thí nghiệm của bạn tốt hơn bạn mong đợi. Chúc mừng nhé! M-Au Cảm ơn bạn! Tôi đã nghĩ rằng chúng tôi sẽ phải thực hiện phản ứng đó mười lần trước khi có kết quả tích cực. Nhưng chúng tôi đã thành công ở lần thử thứ ba.\nW-Am 45 Bạn sẽ phái viết ban kết qua và nộp chúng cho giám đốc nghiên cứu. Đó là Esra, phải không?\nM-Au À, Esra sẽ rời công ty vào tuần sau.\nW-Am Oi, tôi không biết điều đó. Tôi tự hỏi liệu bạn có được thăng chức dé dam nhận vị trí của cô ấy hay không.\nM-Au Tôi không nghĩ vậy. 46 Tôi chưa bao giờ quản lý cả một nhóm nghiên cứu hết. Tôi hy vọng sẽ có được một số kinh nghiệm làm điều đó vào quý tới."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "45. What does the man imply when he says, \"Esra's leaving the company next week\"? (A) He needs assistance planning a party for Esra. (B) He will not submit a report to Esra. (C) He will apply for a new position. (D) A larger office has become available.",
   "transcript": "W: I heard that the results of your experiment were better than you expected. Congratulations!\nM: Thanks! I thought we'd have to run that reaction ten times before we got a positive result. But we got it on the third try.\nW: You'll have to write up your results and submit them to the research director. That's Esra, right?\nM: Oh, Esra's leaving the company next week.\nW: Oh, I didn't know that. I wonder if you'll be promoted to fill her position.\nM: I don't think so. I've never managed an entire research group. I hope to get some experience doing that next quarter.",
   "explanationVi": "Đáp án đúng: B\n\nNgười đàn ông có ý gì khi nói \"Esra sẽ rời công ty vào tuần tới\"?\n(A) Anh ấy cần hỗ trợ lập kế hoạch tổ chức tiệc cho Esra.\n(B) Anh ây sẽ không gửi báo cáo cho Esra.\n(C) Anh ây sẽ ứng tuyên vào một vị trí mới.\n(D) Một văn phòng lớn hơn đang có săn.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, imply, Esra's, leaving.\n- Dạng câu hỏi: ngụ ý.\n- Lời thoại của người phụ nữ: “You'll have to write up your results and submit them to the research director.” (Bạn sẽ phải viết bản kết quả và nộp chúng cho giám đốc nghiên cứu.) là dấu hiệu sắp đến đáp án. “That's Esra, right?” và “Esra's leaving the company next week.” là thông tin chứa dap án.\n- Người phụ nữ hỏi rằng người đàn ông sẽ nộp bản kết quả cho giám đốc nghiên cứu là Esra có phải không, nhưng người đàn ông trả lời Esra sẽ rời công ty vào thời gian tới, ngụ ý anh ta sẽ không nộp cho Esra vì cô ấy sẽ không làm việc ở đây nữa.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (D) chứa thông tin không được đề cập.\n- (C) phuong án bẫy, bài nói có nhắc đến từ “position” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am 44 Tôi nghe nói kết qua thí nghiệm của bạn tốt hơn bạn mong đợi. Chúc mừng nhé! M-Au Cảm ơn bạn! Tôi đã nghĩ rằng chúng tôi sẽ phải thực hiện phản ứng đó mười lần trước khi có kết quả tích cực. Nhưng chúng tôi đã thành công ở lần thử thứ ba.\nW-Am 45 Bạn sẽ phái viết ban kết qua và nộp chúng cho giám đốc nghiên cứu. Đó là Esra, phải không?\nM-Au À, Esra sẽ rời công ty vào tuần sau.\nW-Am Oi, tôi không biết điều đó. Tôi tự hỏi liệu bạn có được thăng chức dé dam nhận vị trí của cô ấy hay không.\nM-Au Tôi không nghĩ vậy. 46 Tôi chưa bao giờ quản lý cả một nhóm nghiên cứu hết. Tôi hy vọng sẽ có được một số kinh nghiệm làm điều đó vào quý tới."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "46. What does the man hope to do next quarter? (A) Receive a research grant (B) Publish a book (C) Replace some furniture (D) Gain management experience",
   "transcript": "W: I heard that the results of your experiment were better than you expected. Congratulations!\nM: Thanks! I thought we'd have to run that reaction ten times before we got a positive result. But we got it on the third try.\nW: You'll have to write up your results and submit them to the research director. That's Esra, right?\nM: Oh, Esra's leaving the company next week.\nW: Oh, I didn't know that. I wonder if you'll be promoted to fill her position.\nM: I don't think so. I've never managed an entire research group. I hope to get some experience doing that next quarter.",
   "explanationVi": "Đáp án đúng: D\n\n46. Người đàn ông hy vọng sẽ làm gì trong quý tới?\n(A) Nhận trợ cấp nghiên cứu\n(B) Xuất bản một cuốn sách\n(C) Thay thế một số đồ nội thất\n(D) Tích lũy kinh nghiệm quản lý\nCách diễn đạt tương đương:\n- gain (đạt được, tích lũy) = get (đạt được, tích lũy) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, men, agree, about.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người đàn ông: “I've never managed an entire research group. | hope to...” (Tôi chưa bao giờ quan lý ca một nhóm nghiên cứu hết. Tôi hy vọng sé...) là dấu hiệu sắp đến đáp án. “I've never managed an entire research group. | hope to get some experience doing that next quarter.” là thông tin chứa dap an.\n- “gain” là cách diễn đạt tương đương cua “get”.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “research” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n- Cac phương án (B), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am 44 Tôi nghe nói kết qua thí nghiệm của bạn tốt hơn bạn mong đợi. Chúc mừng nhé! M-Au Cảm ơn bạn! Tôi đã nghĩ rằng chúng tôi sẽ phải thực hiện phản ứng đó mười lần trước khi có kết quả tích cực. Nhưng chúng tôi đã thành công ở lần thử thứ ba.\nW-Am 45 Bạn sẽ phái viết ban kết qua và nộp chúng cho giám đốc nghiên cứu. Đó là Esra, phải không?\nM-Au À, Esra sẽ rời công ty vào tuần sau.\nW-Am Oi, tôi không biết điều đó. Tôi tự hỏi liệu bạn có được thăng chức dé dam nhận vị trí của cô ấy hay không.\nM-Au Tôi không nghĩ vậy. 46 Tôi chưa bao giờ quản lý cả một nhóm nghiên cứu hết. Tôi hy vọng sẽ có được một số kinh nghiệm làm điều đó vào quý tới."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "47. Where most likely are the speakers? (A) At a sporting goods store (B) At a television studio (C) At a sports arena (D) At a gym",
   "transcript": "W: Now we'll move on to a special segment of our news program where we highlight new local businesses for our viewers. Today I'm talking with Dhruv Bajaj-a personal trainer and gym owner. Thanks for coming into the studio today, Dhruv!\nM: Thanks for having me! I'm excited to tell you about the gym I just opened last month. It has state-of-the-art equipment, and my trainers can work with clients at any stage in their fitness journey.\nW: Sounds great. How did you get started in this line of work?\nM: Well, I was an athlete in school, and when I stopped competing, I wanted to continue doing something fitness-related. So I started working as a trainer.",
   "explanationVi": "Đáp án đúng: B\n\n47. Những người nói có khả năng cao là đang ở đâu?\n(A) Tại một cửa hàng bán đồ thể thao\n(B) Tại trường quay truyền hình\n(C) Tại một sân vận động thể thao\n(D) Tại phòng tập thể dục\nCách diễn đạt tương đương:\n- television studio = studio (trường quay truyền hình) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, likely, speakers.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại của người phụ nữ: “Thanks for coming into the...” (Cảm ơn vì đã đến...) là dấu hiệu sắp đến đáp án. “Thanks for coming into the studio today, Dhruv!” là thông tin chứa đáp án.\n- “television studio ” là cách diễn đạt tương đương của “studio”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (C) chứa thông tin không được đề cập. s (D) phuong án bay, bài nói có nhắc đến từ “gym” nhưng người nói đang quay một chương trình tin tức trong trường quay, không phải ở phòng tập.\n\nDịch hội thoại:\nW-Am Bây giờ chúng ta sẽ chuyển sang phần đặc biệt của chương trình tin tức, nơi chúng tôi nêu bật các doanh nghiệp địa phương mới cho người xem. Hôm nay tôi đang nói chuyện với Dhruv Bajaj- một huấn luyện viên cá nhân và chủ phòng tập thé dục. 47 Cảm ơn vì đã đến trường quay ngày hôm nay, Dhruv!\nM-Cn Cảm ơn vì đã mời tôi! 48 Tôi rất hào hứng khi được kể cho bạn nghe về phòng tập thể dục mà tôi vừa mở vào tháng trước. Nó có trang thiết bị hiện đại và các huấn luyện viên của tôi có thể làm việc với khách hàng ở bất kỳ giai đoạn nào trong hành trình tập thể dục của họ. W-Am Nghe có vẻ rất tuyệt day. 49 Bạn bắt đầu công việc này như thé nào?\nM-Cn À, tôi là một vận động viên ở trường, và khi tôi ngừng thi đấu, tôi muốn tiếp tục làm việc gì đó liên quan đến thé dục. Thế là tôi bắt đầu làm huấn luyện viên."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "48. What does the man say he recently did? (A) He retired from his job. (B) He designed a Web site. (C) He opened a new facility. (D) He competed in a sports event.",
   "transcript": "W: Now we'll move on to a special segment of our news program where we highlight new local businesses for our viewers. Today I'm talking with Dhruv Bajaj-a personal trainer and gym owner. Thanks for coming into the studio today, Dhruv!\nM: Thanks for having me! I'm excited to tell you about the gym I just opened last month. It has state-of-the-art equipment, and my trainers can work with clients at any stage in their fitness journey.\nW: Sounds great. How did you get started in this line of work?\nM: Well, I was an athlete in school, and when I stopped competing, I wanted to continue doing something fitness-related. So I started working as a trainer.",
   "explanationVi": "Đáp án đúng: C\n\nNgười đàn ông nói gần đây anh ta đã làm gì?\n(A) Anh ây đã nghỉ việc.\n(B) Anh ay đã thiệt kê một trang web.\n(C) Anh ây đã mở một cơ sở mới. ;\n(D) Anh ay thi dau trong một sự kiện thê thao.\nCách diễn đạt tương đương:\n- recently (gần đây) = last month (tháng trước) s anew facility (một cơ sở mới) = the gym | just opened (phòng tập thể duc mà tôi vừa mở)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, recently, did.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người đàn ông: “I'm excited to tell you about...” (Tôi rất hào hứng khi được kể cho bạn nghe về...) là dấu hiệu sắp đến đáp án. “I'm excited to tell you about the gym | just opened last month.” là thông tin chứa đáp án.\n- “recently” là cách diễn đạt tương đương cua “last month\".\n“anewfacility” là cách diễn đạt tương đương của “the gym | just opened”.\n→ Phương án (CO) là phù hợp nhất. Loại phương án sai:\n- Cac phương an (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Bây giờ chúng ta sẽ chuyển sang phần đặc biệt của chương trình tin tức, nơi chúng tôi nêu bật các doanh nghiệp địa phương mới cho người xem. Hôm nay tôi đang nói chuyện với Dhruv Bajaj- một huấn luyện viên cá nhân và chủ phòng tập thé dục. 47 Cảm ơn vì đã đến trường quay ngày hôm nay, Dhruv!\nM-Cn Cảm ơn vì đã mời tôi! 48 Tôi rất hào hứng khi được kể cho bạn nghe về phòng tập thể dục mà tôi vừa mở vào tháng trước. Nó có trang thiết bị hiện đại và các huấn luyện viên của tôi có thể làm việc với khách hàng ở bất kỳ giai đoạn nào trong hành trình tập thể dục của họ. W-Am Nghe có vẻ rất tuyệt day. 49 Bạn bắt đầu công việc này như thé nào?\nM-Cn À, tôi là một vận động viên ở trường, và khi tôi ngừng thi đấu, tôi muốn tiếp tục làm việc gì đó liên quan đến thé dục. Thế là tôi bắt đầu làm huấn luyện viên."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "49. What does the woman ask the man to talk about? (A) His career path (B) His mentors (C) His future goals (D) His hobbies",
   "transcript": "W: Now we'll move on to a special segment of our news program where we highlight new local businesses for our viewers. Today I'm talking with Dhruv Bajaj-a personal trainer and gym owner. Thanks for coming into the studio today, Dhruv!\nM: Thanks for having me! I'm excited to tell you about the gym I just opened last month. It has state-of-the-art equipment, and my trainers can work with clients at any stage in their fitness journey.\nW: Sounds great. How did you get started in this line of work?\nM: Well, I was an athlete in school, and when I stopped competing, I wanted to continue doing something fitness-related. So I started working as a trainer.",
   "explanationVi": "Đáp án đúng: A\n\nNgười phụ nữ hỏi người dan ông về điều gì?\n(A) Con đường sự nghiệp của anh ây\n(B) Người cố vấn của anh ấy :\n(C) Mục tiêu tương lai của anh ay\n(D) Sở thích của anh ây\nCách diễn đạt tương đương:\n- career path (con đường sự nghiệp) = line of work (loại công việc) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, ask, man, about.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “How did you get started in...” (Bạn bắt đầu như thế nào...) là dấu hiệu sắp đến đáp án. “How did you get started in this line of work?\" là thông tin chứa đáp án.\n- “career path” là cách diễn đạt tương đương của “line of work\".\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Bây giờ chúng ta sẽ chuyển sang phần đặc biệt của chương trình tin tức, nơi chúng tôi nêu bật các doanh nghiệp địa phương mới cho người xem. Hôm nay tôi đang nói chuyện với Dhruv Bajaj- một huấn luyện viên cá nhân và chủ phòng tập thé dục. 47 Cảm ơn vì đã đến trường quay ngày hôm nay, Dhruv!\nM-Cn Cảm ơn vì đã mời tôi! 48 Tôi rất hào hứng khi được kể cho bạn nghe về phòng tập thể dục mà tôi vừa mở vào tháng trước. Nó có trang thiết bị hiện đại và các huấn luyện viên của tôi có thể làm việc với khách hàng ở bất kỳ giai đoạn nào trong hành trình tập thể dục của họ. W-Am Nghe có vẻ rất tuyệt day. 49 Bạn bắt đầu công việc này như thé nào?\nM-Cn À, tôi là một vận động viên ở trường, và khi tôi ngừng thi đấu, tôi muốn tiếp tục làm việc gì đó liên quan đến thé dục. Thế là tôi bắt đầu làm huấn luyện viên."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "50. What has the woman been hired to do? (A) Write articles (B) Update some software (C) Organize a fund-raiser (D) Manage office staff",
   "transcript": "M1: As director, I'm delighted to welcome you to the Redmond Aquatic Institute. We're happy you'll be producing content for our Web site.\nW: I'm looking forward to writing about Redmond's initiatives in marine biology.\nM1: Yes, the more articles the public can read about threats to aquatic ecosystems, the better. Public awareness will help us get funding to meet our aim of preserving these ecosystems. This is Roberto. He's working on our mangrove research project, which is the first one you'll cover.\nM2: It's an interesting project. And what's exciting is that we've started using drones to photograph the area with the mangroves. So we have some great images you could use.",
   "explanationVi": "Đáp án đúng: A\n\n50. Người phụ nữ được thuê đề làm gì?\n(A) Viết các bài báo\n(B) Cập nhật một số phần mềm\n(C) Tổ chức một buổi gây quỹ\n(D) Quản lý nhân viên văn phòng\nCách diễn đạt tương đương:\n- write articles (Viết các bài báo) = writing about Redmond's initiatives in marine biology (viết về những sáng kiến cua Redmond trong sinh học biển)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, hired, do.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người dan ông: “We're happy you'll be producing content for our Web site.” (Chúng tôi rất vui vi bạn sẽ sản xuất nội dung cho trang Web của chúng tôi.) là dấu hiệu sắp đến đáp án. “I'm looking forward to writing about Redmond's initiatives in marine biology.” là thông tin chứa đáp án.\n- “Write articles” là cách diễn đạt tương đương cua “writing about Redmond's initiatives in marine biology”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au 51 Với tư cách là giám đốc, tôi rất vui mừng được chào đón bạn đến với Viện Nghiên cứu Thủy sinh Redmond. Chúng tôi rất vui vì bạn sẽ sản xuất nội dung cho trang Web của chúng tôi.\nW-Br 50 Tôi rất mong đợi được viết về những sáng kiến của Redmond trong sinh học biển. M-Au Vâng, công chúng càng đọc được nhiều bài báo về các mối đe dọa đối với hệ sinh thái dưới nước thì cảng tốt. 51 Nhận thức của công chúng sẽ giúp chúng ta nhận được nguồn tài trợ dé đáp ứng mục tiêu bảo tồn các hệ sinh thái này. Day là Roberto. Anh ấy đang thực hiện dự án nghiên cứu rừng ngập mặn của chúng tôi, đây là dự án đầu tiên bạn sẽ thực hiện.\nM-Cn Đó là một dự án thú vị. Và 52 điều thú vị là chúng tôi đã bắt đầu sử dụng thiết bị bay không người lái dé chụp ảnh khu vực có rừng ngập mặn. Vì vậy, chúng tôi có một số hình ảnh tuyệt vời mà bạn có thể sử dụng."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "51. According to the director, what is the organization's goal? (A) To hire professionals in the field (B) To create educational programs (C) To collect data from other scientific institutes (D) To protect aquatic environments",
   "transcript": "M1: As director, I'm delighted to welcome you to the Redmond Aquatic Institute. We're happy you'll be producing content for our Web site.\nW: I'm looking forward to writing about Redmond's initiatives in marine biology.\nM1: Yes, the more articles the public can read about threats to aquatic ecosystems, the better. Public awareness will help us get funding to meet our aim of preserving these ecosystems. This is Roberto. He's working on our mangrove research project, which is the first one you'll cover.\nM2: It's an interesting project. And what's exciting is that we've started using drones to photograph the area with the mangroves. So we have some great images you could use.",
   "explanationVi": "Đáp án đúng: D\n\n51. Theo giám đốc, mục tiêu của tổ chức là gì?\n(A) Đề thuê các chuyên gia trong lĩnh vực này\n(B) Để tạo ra các chương trình giáo dục\n(C) Dé thu thập dữ liệu từ các viện khoa học khác\n(D) Dé bảo vệ các môi trường thủy sinh\nCách diễn đạt tương đương:\n- protect aquatic environments ~ preserving these ecosystems (bảo vệ các môi trudng thuy sinh)\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: according, director, what, organization's, goal.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người đàn ông đề cập đến “our aim of...” (mục tiêu của chúng tôi...) là dấu hiệu sắp đến đáp án. “Public awareness will help us get funding to meet our aim of preserving these ecosystems.” là thông tin chứa đáp án.\n- “protect aquatic environments” là cách diễn đạt tương đương cua “preserving these ecosystems”.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au 51 Với tư cách là giám đốc, tôi rất vui mừng được chào đón bạn đến với Viện Nghiên cứu Thủy sinh Redmond. Chúng tôi rất vui vì bạn sẽ sản xuất nội dung cho trang Web của chúng tôi.\nW-Br 50 Tôi rất mong đợi được viết về những sáng kiến của Redmond trong sinh học biển. M-Au Vâng, công chúng càng đọc được nhiều bài báo về các mối đe dọa đối với hệ sinh thái dưới nước thì cảng tốt. 51 Nhận thức của công chúng sẽ giúp chúng ta nhận được nguồn tài trợ dé đáp ứng mục tiêu bảo tồn các hệ sinh thái này. Day là Roberto. Anh ấy đang thực hiện dự án nghiên cứu rừng ngập mặn của chúng tôi, đây là dự án đầu tiên bạn sẽ thực hiện.\nM-Cn Đó là một dự án thú vị. Và 52 điều thú vị là chúng tôi đã bắt đầu sử dụng thiết bị bay không người lái dé chụp ảnh khu vực có rừng ngập mặn. Vì vậy, chúng tôi có một số hình ảnh tuyệt vời mà bạn có thể sử dụng."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "52. What does Roberto say is exciting? (A) The use of some equipment (B) The results of a survey (C) The public response to a project (D) A recent donation to the institute",
   "transcript": "M1: As director, I'm delighted to welcome you to the Redmond Aquatic Institute. We're happy you'll be producing content for our Web site.\nW: I'm looking forward to writing about Redmond's initiatives in marine biology.\nM1: Yes, the more articles the public can read about threats to aquatic ecosystems, the better. Public awareness will help us get funding to meet our aim of preserving these ecosystems. This is Roberto. He's working on our mangrove research project, which is the first one you'll cover.\nM2: It's an interesting project. And what's exciting is that we've started using drones to photograph the area with the mangroves. So we have some great images you could use.",
   "explanationVi": "Đáp án đúng: A\n\n52. Điều gì được Robert cho là thú vị?\n(A) Việc sử dụng một số thiết bị\n(B) Kết quả của một cuộc khảo sát\n(C) Phản ứng của công chúng đối với một dự án\n(D) Một khoản đóng góp gần đây tới viện nghiên cứu\nCách diễn đạt tương đương:\n- the use of some equipment (việc sử dụng một số thiết bi) = using drones (sử dụng thiết bị bay không người lái)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, Robert, say, exciting.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người dan ông tên Robert: “what's exciting is that...” (điều thú vị la...) là dấu hiệu sắp đến đáp án. “what's exciting is that we've started using drones to photograph the area with the mangroves.” là thông tin chứa dap an.\n- “the use of some equipment\" là cách diễn dat tương đương của “using drones”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (D) chứa thông tin không được đề cập. s (C) phuong án bẫy, bài nói có nhắc đến từ “project” nhưng không hề nhắc đến phản ứng của công chúng về nó, hay thái độ của Robert về nó.\n\nDịch hội thoại:\nM-Au 51 Với tư cách là giám đốc, tôi rất vui mừng được chào đón bạn đến với Viện Nghiên cứu Thủy sinh Redmond. Chúng tôi rất vui vì bạn sẽ sản xuất nội dung cho trang Web của chúng tôi.\nW-Br 50 Tôi rất mong đợi được viết về những sáng kiến của Redmond trong sinh học biển. M-Au Vâng, công chúng càng đọc được nhiều bài báo về các mối đe dọa đối với hệ sinh thái dưới nước thì cảng tốt. 51 Nhận thức của công chúng sẽ giúp chúng ta nhận được nguồn tài trợ dé đáp ứng mục tiêu bảo tồn các hệ sinh thái này. Day là Roberto. Anh ấy đang thực hiện dự án nghiên cứu rừng ngập mặn của chúng tôi, đây là dự án đầu tiên bạn sẽ thực hiện.\nM-Cn Đó là một dự án thú vị. Và 52 điều thú vị là chúng tôi đã bắt đầu sử dụng thiết bị bay không người lái dé chụp ảnh khu vực có rừng ngập mặn. Vì vậy, chúng tôi có một số hình ảnh tuyệt vời mà bạn có thể sử dụng."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "53. What does the man say about some contacts in China? (A) They submitted some preliminary results. (B) They requested help with a presentation. (C) They are celebrating a holiday. (D) They are coming to visit soon.",
   "transcript": "W: Matthew, you're not planning to cancel Wednesday's budget meeting, are you?\nM: I haven't sent out the cancellation yet, but our research partners in China are off this week for a national holiday, so there's no point in meeting. Why?\nW: Well, I've been looking at the draft budget, and we didn't allocate funds for a project leader.\nM: Uh-oh. I wonder how that happened. You're right. We need to discuss how to fix that.\nW: You know, we allocated money for a trip to Singapore to present our preliminary findings. We don't really need to do that.",
   "explanationVi": "Đáp án đúng: C\n\n53. Người đàn ông nói gì về một số mi liên hệ ở Trung Quốc?\n(A) Họ đã nộp một số kết quả sơ bộ.\n(B) Họ yêu câu trợ giúp với bài thuyết trình.\n(C) Họ đang kỉ niệm một ngày lễ.\n(D) Họ sẽ sớm đến thăm.\nCách diễn đạt tương đương:\n- are celebrating a holiday (dang kỉ niệm một ngày lễ) = are off this week for a national holiday (đang nghỉ làm việc tuần này dé kỉ niệm ngày lễ quốc gia)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, say, about, contacts, China.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người đàn ông đề cập đến: “our research partners in China” (đối tác nghiên cứu của chúng ta ở Trung Quốc) là dấu hiệu sắp đến đáp án. “our research partners in China are off this week for a national holiday” là thông tin chứa dap án.\n- “are celebrating a holiday” là cách diễn đạt tương đương của “are off this week for a national holiday”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “preliminary findings” đồng nghĩa với từ “preliminary results” trong phương án, nhưng những đối tac ở Trung Quốc không phải là người cung cấp những kết quả sơ bộ đó.\n- Cac phương án (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Matthew, 54, bạn không định hủy cuộc họp ngân sách vào thứ Tư chứ?\nM-Au Tôi vẫn chưa gửi thông báo hủy, nhưng 53 đối tác nghiên cứu của chúng ta ở Trung Quốc tuần này đang nghỉ làm việc tuần này dé ki niệm ngày lễ quốc gia nên họp cũng chang ích gì. Sao bạn hỏi vậy?\nW-Am A, 54 tôi đã xem dự thảo ngân sách, và chúng ta đã không phân bồ kinh phí cho người đứng đầu dự án.\nM-Au Ôi trời. Tôi tự hỏi làm thế nào mà điều đó lại xảy ra. Bạn nói đúng. 55 Chúng ta cần thảo luận cách khắc phục vấn đề đó.\nW-Am Bạn biết đấy, 55 chúng ta đã phân bồ tiền cho một chuyền đi đến Singapore đề trình bay những kết quả sơ bộ của mình. Thực sự thì chúng ta không cần phải làm điều đó."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "54. What does the woman imply when she says, \"we didn't allocate funds for a project leader\"? (A) Sne thinks a project deadline should be extended. (B) She is surprised by a suggestion. (C) A scheduled meeting should take place. (D) A project leader will not be hired.",
   "transcript": "W: Matthew, you're not planning to cancel Wednesday's budget meeting, are you?\nM: I haven't sent out the cancellation yet, but our research partners in China are off this week for a national holiday, so there's no point in meeting. Why?\nW: Well, I've been looking at the draft budget, and we didn't allocate funds for a project leader.\nM: Uh-oh. I wonder how that happened. You're right. We need to discuss how to fix that.\nW: You know, we allocated money for a trip to Singapore to present our preliminary findings. We don't really need to do that.",
   "explanationVi": "Đáp án đúng: C\n\n54. Người phụ nữ có ý gì khi nói \"chúng ta đã không phân bồ kinh phi cho người đứng đầu dự án\"?\n(A) Cô ấy nghĩ thời hạn dự án nên được gia hạn.\n(B) Cô ây ngạc nhiên trước một lời đê nghị.\n(C) Một cuộc họp nên diễn ra theo đúng lịch trình.\n(D) Một người lãnh đạo dự án sẽ không được thuê.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, imply, says, didn't, allocate, funds, for, project leader.\n- Dang câu hỏi: ngụ ý.\n- Lời thoại của người đàn ông: “Why?\" (Sao bạn hỏi vậy?) là dấu hiệu sắp đến đáp án. “you're not planning to cancel Wednesday's budget meeting, are you?” và “I've been looking at the draft budget, and we didn't allocate funds for a project leader.” là thông tin chứa đáp án.\n- O dau bài nói, người phụ nữ hỏi rằng người đàn ông sẽ không định hủy cuộc họp ngân sách vào thứ Tư đúng không, và lý do là cô ấy đã xem dự thảo ngân sách, và họ đã không phân bổ kinh phí cho người đứng đầu dự án; có nghĩa là có vấn đề quan trong ho cần phải xử lý và cuộc hop nên diễn ra theo đúng lịch trình để giải quyết nó.\n→ Phương án (CO) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (B) chứa thông tin không được đề cập. s (D) phuong án bẫy, bài nói có nhắc đến từ “project leader” nhưng ho vẫn sẽ thuê một người để lãnh đạo dự án chứ không phải không thuê.\n\nDịch hội thoại:\nW-Am Matthew, 54, bạn không định hủy cuộc họp ngân sách vào thứ Tư chứ?\nM-Au Tôi vẫn chưa gửi thông báo hủy, nhưng 53 đối tác nghiên cứu của chúng ta ở Trung Quốc tuần này đang nghỉ làm việc tuần này dé ki niệm ngày lễ quốc gia nên họp cũng chang ích gì. Sao bạn hỏi vậy?\nW-Am A, 54 tôi đã xem dự thảo ngân sách, và chúng ta đã không phân bồ kinh phí cho người đứng đầu dự án.\nM-Au Ôi trời. Tôi tự hỏi làm thế nào mà điều đó lại xảy ra. Bạn nói đúng. 55 Chúng ta cần thảo luận cách khắc phục vấn đề đó.\nW-Am Bạn biết đấy, 55 chúng ta đã phân bồ tiền cho một chuyền đi đến Singapore đề trình bay những kết quả sơ bộ của mình. Thực sự thì chúng ta không cần phải làm điều đó."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "55. What does the woman say about some travel expenses? (A) They are unnecessary. (B) They have been refunded. (C) They require receipts. (D) They were charged to the company credit card.",
   "transcript": "W: Matthew, you're not planning to cancel Wednesday's budget meeting, are you?\nM: I haven't sent out the cancellation yet, but our research partners in China are off this week for a national holiday, so there's no point in meeting. Why?\nW: Well, I've been looking at the draft budget, and we didn't allocate funds for a project leader.\nM: Uh-oh. I wonder how that happened. You're right. We need to discuss how to fix that.\nW: You know, we allocated money for a trip to Singapore to present our preliminary findings. We don't really need to do that.",
   "explanationVi": "Đáp án đúng: A\n\nNgười phụ nữ nói gì về một số chi phí đi lại?\n(A) Chúng không cân thiệt.\n(B) Chúng đã được hoàn lại tiên.\n(C) Chúng yêu câu biên lai.\n(D) Chúng đã bị tính phí vào thẻ tín dụng của công ty.\nCách diễn đạt tương đương: s unnecessary * don't really need to do that (không cần thiết) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, say, about, travel expenses.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “we allocated money for a trip to Singapore to present our preliminary findings.” (chúng ta đã phân bổ tiền cho một chuyến đi đến Singapore để trình bày những kết quả sơ bộ của minh.) là dấu hiệu sắp đến đáp an. “we allocated money for a trip to Singapore to present our preliminary findings. We don't really need to do that.” là thông tin chứa dap án.\n- “unnecessary” là cách diễn đạt tương đương của “don't really need to do that”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Matthew, 54, bạn không định hủy cuộc họp ngân sách vào thứ Tư chứ?\nM-Au Tôi vẫn chưa gửi thông báo hủy, nhưng 53 đối tác nghiên cứu của chúng ta ở Trung Quốc tuần này đang nghỉ làm việc tuần này dé ki niệm ngày lễ quốc gia nên họp cũng chang ích gì. Sao bạn hỏi vậy?\nW-Am A, 54 tôi đã xem dự thảo ngân sách, và chúng ta đã không phân bồ kinh phí cho người đứng đầu dự án.\nM-Au Ôi trời. Tôi tự hỏi làm thế nào mà điều đó lại xảy ra. Bạn nói đúng. 55 Chúng ta cần thảo luận cách khắc phục vấn đề đó.\nW-Am Bạn biết đấy, 55 chúng ta đã phân bồ tiền cho một chuyền đi đến Singapore đề trình bay những kết quả sơ bộ của mình. Thực sự thì chúng ta không cần phải làm điều đó."
  },
  {
   "number": 56,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "56. Where is the woman calling from? (A) A clothing store (B) A furniture store (C) A restaurant supply company (D) A graphic design firm",
   "transcript": "M: Hello, you've reached tech support.\nW: I'm calling from Rubin Restaurant Equipment. I recently purchased your Software to keep track of my warehouse inventory, and I have a question about setting alerts.\nM: Sure. How can I help?\nW: Well, we've been getting an alert whenever the inventory for our deep fryers drops below ten. But we usually don't stock many of those because restaurants don't often need to replace them. So, can I lower the alert level for just those items?\nM: Yes. In the system, if you click on that product, you'll see a link that says, \"Set Custom Alert.\" And you can set it to any number from there.\nW: I see it. Thanks for your help.",
   "explanationVi": "Đáp án đúng: C\n\n56. Người phụ nữ đang gọi từ đâu?\n(A) Một cửa hàng quân áo\n(B) Một cửa hàng đồ nội thất\n(C) Một công ty cung cấp thiết bị cho nhà hàng\n(D) Một công ty thiết kế đồ họa\nCách diễn đạt tương đương:\n- arestaurant supply company (một công ty cung cấp thiết bị cho nhà hàng) = Rubin Restaurant Equipment (Thiết bị Nhà hàng Rubin)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, woman, call, from.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “I'm calling from...” (Tôi đang gọi từ...) là dấu hiệu sắp đến đáp án. “I'm calling from Rubin Restaurant Equipment.” là thông tin chứa đáp án.\n- “a restaurant supply company” là cách diễn đạt tương đương của “Rubin Restaurant Equipment” trong ngữ cảnh này.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chào, bạn đã liên hệ với bộ phận hỗ trợ kỹ thuật.\nW-Br 56 Tôi đang gọi từ Thiết bị Nhà hang Rubin. 57 Gần đây tôi đã mua phần mềm của bạn dé theo dõi kho hàng của mình và tôi có câu hỏi về cách đặt cảnh báo.\nM-Cn Chắc chắn rồi. Tôi có thể giúp gì?\nW-Br Cha, chúng tôi đã nhận được cảnh báo bat cứ khi nào lượng hàng tồn kho cho nồi chiên ngập dầu của chúng tôi giảm xuống dưới mười cái. Nhưng chúng tôi thường không dự trữ mặt hàng đó nhiều vì các nhà hàng thường không cần thay thế chúng. Vì vậy, tôi có thể hạ mức cảnh báo chỉ cho những mặt hàng đó không?\nM-Cn Vâng. 58 Trong hệ thống, nếu bạn nhấp vào sản phẩm đó, bạn sẽ thấy liên kết có nội dung \"Thiet lập Cảnh báo Tùy chỉnh.\" Và bạn có thê đặt nó thành bat kỳ sô nao từ đó. W-Br Tôi thay roi. Cảm ơn ban đã giúp đỡ."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "57. What is some software being used for? (A) Inventory management (B) Employee performance reviews (C) Sales forecasting (D) Web site design",
   "transcript": "M: Hello, you've reached tech support.\nW: I'm calling from Rubin Restaurant Equipment. I recently purchased your Software to keep track of my warehouse inventory, and I have a question about setting alerts.\nM: Sure. How can I help?\nW: Well, we've been getting an alert whenever the inventory for our deep fryers drops below ten. But we usually don't stock many of those because restaurants don't often need to replace them. So, can I lower the alert level for just those items?\nM: Yes. In the system, if you click on that product, you'll see a link that says, \"Set Custom Alert.\" And you can set it to any number from there.\nW: I see it. Thanks for your help.",
   "explanationVi": "Đáp án đúng: A\n\nPhần mềm đang được sử dụng để làm gì?\n(A) Quản lý kho hàng\n(B) Đánh giá hiệu suât của nhân viên\n(C) Dự báo bán hàng\n(D) Thiêt kê trang web\nCách diễn đạt tương đương:\n- inventory management ~ keep track of my warehouse inventory (quản lý kho hang)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, software, used, for.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “I recently purchased your software to...” (Gần day tôi đã mua phần mềm của ban dé...) là dấu hiệu sắp đến đáp án. “| recently purchased your software to keep track of my warehouse inventory” là thông tin chứa dap án.\n- “inventory management\" là cách diễn đạt tương đương của “keep track of my warehouse inventory”.\n→ Phương án (A) la phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chào, bạn đã liên hệ với bộ phận hỗ trợ kỹ thuật.\nW-Br 56 Tôi đang gọi từ Thiết bị Nhà hang Rubin. 57 Gần đây tôi đã mua phần mềm của bạn dé theo dõi kho hàng của mình và tôi có câu hỏi về cách đặt cảnh báo.\nM-Cn Chắc chắn rồi. Tôi có thể giúp gì?\nW-Br Cha, chúng tôi đã nhận được cảnh báo bat cứ khi nào lượng hàng tồn kho cho nồi chiên ngập dầu của chúng tôi giảm xuống dưới mười cái. Nhưng chúng tôi thường không dự trữ mặt hàng đó nhiều vì các nhà hàng thường không cần thay thế chúng. Vì vậy, tôi có thể hạ mức cảnh báo chỉ cho những mặt hàng đó không?\nM-Cn Vâng. 58 Trong hệ thống, nếu bạn nhấp vào sản phẩm đó, bạn sẽ thấy liên kết có nội dung \"Thiet lập Cảnh báo Tùy chỉnh.\" Và bạn có thê đặt nó thành bat kỳ sô nao từ đó. W-Br Tôi thay roi. Cảm ơn ban đã giúp đỡ."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "B",
   "group": "56-58",
   "textEn": "58. What does the man help the woman do? (A) Return a purchase (B) Customize a setting (C) Repair an engine (D) Inspect a shipment",
   "transcript": "M: Hello, you've reached tech support.\nW: I'm calling from Rubin Restaurant Equipment. I recently purchased your Software to keep track of my warehouse inventory, and I have a question about setting alerts.\nM: Sure. How can I help?\nW: Well, we've been getting an alert whenever the inventory for our deep fryers drops below ten. But we usually don't stock many of those because restaurants don't often need to replace them. So, can I lower the alert level for just those items?\nM: Yes. In the system, if you click on that product, you'll see a link that says, \"Set Custom Alert.\" And you can set it to any number from there.\nW: I see it. Thanks for your help.",
   "explanationVi": "Đáp án đúng: B\n\nNgười đàn ông giúp đỡ người phụ nữ làm gì?\n(A) Trả lại hàng đã mua\n(B) Tùy chỉnh một cài đặt\n(C) Sửa chữa một động cơ\n(D) Kiêm tra một lô hàng\nCách diễn đạt tương đương:\n- customize a setting (tùy chỉnh một cài dat) = set it to any number (đặt nó thành bất kỳ số nào)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, help, woman, do.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “So, can | lower the alert level for just those items?” (Vì vậy, tôi có thể hạ mức cảnh báo chỉ cho những mặt hàng đó không?) là dấu hiệu sắp đến đáp án. “In the system, if you click on that product, you'll see a link that says, \"Set Custom Alert.\" And you can set it to any number from there.” là thông tin chứa dap án.\n- “customize a setting” là cách diễn đạt tương đương của “set it to any number\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chào, bạn đã liên hệ với bộ phận hỗ trợ kỹ thuật.\nW-Br 56 Tôi đang gọi từ Thiết bị Nhà hang Rubin. 57 Gần đây tôi đã mua phần mềm của bạn dé theo dõi kho hàng của mình và tôi có câu hỏi về cách đặt cảnh báo.\nM-Cn Chắc chắn rồi. Tôi có thể giúp gì?\nW-Br Cha, chúng tôi đã nhận được cảnh báo bat cứ khi nào lượng hàng tồn kho cho nồi chiên ngập dầu của chúng tôi giảm xuống dưới mười cái. Nhưng chúng tôi thường không dự trữ mặt hàng đó nhiều vì các nhà hàng thường không cần thay thế chúng. Vì vậy, tôi có thể hạ mức cảnh báo chỉ cho những mặt hàng đó không?\nM-Cn Vâng. 58 Trong hệ thống, nếu bạn nhấp vào sản phẩm đó, bạn sẽ thấy liên kết có nội dung \"Thiet lập Cảnh báo Tùy chỉnh.\" Và bạn có thê đặt nó thành bat kỳ sô nao từ đó. W-Br Tôi thay roi. Cảm ơn ban đã giúp đỡ."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "59. Where are the speakers most likely working? (A) At a flower shop (B) At a botanical garden (C) At a fruit orchard (D) At a hardware store",
   "transcript": "M: I just spoke to the garden director. He wants us to install an irrigation system in the rose garden as well as the magnolia grove. He wants to be sure the flowers get plenty of water during the hot summer months.\nW: OK, let's walk over there now and take some measurements. Then we can figure out what materials we'll need.\nM: Sure. We have some extra parts left over from when we worked on the cherry trees. ril check what we have left after we finish measuring the rose garden.",
   "explanationVi": "Đáp án đúng: B\n\n59. Những người nói có khả năng cao là đang làm việc ở đâu?\n(A) Tại một cửa hàng hoa\n(B) Tại một vườn bách thảo\n(C) Tại một vườn cây ăn trái\n(D) Tại một cửa hàng phần cứng\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, speakers, likely, working.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại của người đàn ông: “I just spoke to the garden director.” (Tôi vừa nói chuyện với giám đốc vườn.) là dấu hiệu sắp đến đáp án. “I just spoke to the garden director. He wants us to install an irrigation system in the rose garden as well as the magnolia grove.” là thông tin chứa dap án.\n- oan hội thoại xoay quanh nội dung liên quan đến cây cối hoa cỏ, điều này có nghĩa là những người nói có khả năng cao là đang làm việc tại một vườn bách thảo.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai: s (A) phương án bẫy, bài nói có nhắc đến từ “rose” va “magnolia” liên quan đến từ “flower” trong phương án, nhưng vi trí của những người nói có cả vườn và rừng\nhoa, quá rộng so với một cửa hàng bán hoa.\n- Các phương án (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Au 59 Tôi vừa nói chuyện với giám đốc vườn. 59,60 Anh ấy muốn chúng ta lắp đặt hệ thống tưới tiêu cho vườn hoa hồng cũng như rừng mộc lan. Anh ấy muốn đảm bảo rằng hoa được tưới thật nhiều nước trong những tháng hè nóng nực.\nW-Br Được rồi, bây giờ chúng ta hãy đến đó va đo một số kích thước. Sau đó thì chúng ta có thé xác định xem chúng ta sẽ cần những vật liệu gì.\nM-Âu Chắc chắn rồi. 61 Chúng ta còn một số bộ phận dư thừa từ khi chúng ta làm việc với cây anh đào. Tôi sẽ kiểm tra xem chúng ta còn lại những gì sau khi đo xong kích thước của vườn hông."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "60. What have the speakers been asked to do? (A) Arrange some flowers (B) Deliver some tools (C) Install a watering system (D) Repair a lawn mower",
   "transcript": "M: I just spoke to the garden director. He wants us to install an irrigation system in the rose garden as well as the magnolia grove. He wants to be sure the flowers get plenty of water during the hot summer months.\nW: OK, let's walk over there now and take some measurements. Then we can figure out what materials we'll need.\nM: Sure. We have some extra parts left over from when we worked on the cherry trees. ril check what we have left after we finish measuring the rose garden.",
   "explanationVi": "Đáp án đúng: C\n\n60. Những người nói được yêu cầu làm gì?\n(A) Sắp xếp một số bông hoa\n(B) Giao một số công cụ\n(C) Lắp đặt hệ thống tưới nước\n(D) Sửa máy cắt cỏ\nCách diễn đạt tương đương:\n- awatering system ~ an irrigation system (hệ thống tưới nước) Cách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, speakers, asked, do.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người đàn ông: “He wants us to...” (Anh ấy muốn chúng ta...) là dấu hiệu sắp đến đáp án. “He wants us to install an irrigation system in the rose garden as well as the magnolia grove.” là thông tin chứa đáp án.\n- “awatering system” là cách diễn dat tương đương của “an irrigation system\".\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “rose” va “magnolia” liên quan đến từ “flowers\" trong phương án, nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n- Cac phương án (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au 59 Tôi vừa nói chuyện với giám đốc vườn. 59,60 Anh ấy muốn chúng ta lắp đặt hệ thống tưới tiêu cho vườn hoa hồng cũng như rừng mộc lan. Anh ấy muốn đảm bảo rằng hoa được tưới thật nhiều nước trong những tháng hè nóng nực.\nW-Br Được rồi, bây giờ chúng ta hãy đến đó va đo một số kích thước. Sau đó thì chúng ta có thé xác định xem chúng ta sẽ cần những vật liệu gì.\nM-Âu Chắc chắn rồi. 61 Chúng ta còn một số bộ phận dư thừa từ khi chúng ta làm việc với cây anh đào. Tôi sẽ kiểm tra xem chúng ta còn lại những gì sau khi đo xong kích thước của vườn hông."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "61. What does the man offer to do? (A) Look for some materials (B) Train an assistant (C) Transplant some trees (D) Work extra hours",
   "transcript": "M: I just spoke to the garden director. He wants us to install an irrigation system in the rose garden as well as the magnolia grove. He wants to be sure the flowers get plenty of water during the hot summer months.\nW: OK, let's walk over there now and take some measurements. Then we can figure out what materials we'll need.\nM: Sure. We have some extra parts left over from when we worked on the cherry trees. ril check what we have left after we finish measuring the rose garden.",
   "explanationVi": "Đáp án đúng: A\n\n61. Người dan ông đề nghị làm gi?\n(A) Tìm kiếm một số vật liệu\n(B) Đào tạo một trợ lý\n(C) Cấy một số cây\n(D) Làm thêm giờ\nCách diễn đạt tương đương:\n- look for some materials (tìm kiếm một số vật liệu) ~ check what we have left (kiểm tra xem chúng ta còn lại những gì)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, offer, do.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người dan ông: “We have some extra parts left over from when we worked on the cherry trees. I'll...\" (Chúng ta còn một số bộ phận dư thừa từ khi chúng ta làm việc với cây anh đào. Tôi sẽ...) là dấu hiệu sắp đến đáp án. “We have some extra parts left over from when we worked on the cherry trees. I'll check what we have left after we finish measuring the rose garden.” là thông tin chứa dap an.\n- “look for some materials” là cách diễn dat tương đương của “check what we have left”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au 59 Tôi vừa nói chuyện với giám đốc vườn. 59,60 Anh ấy muốn chúng ta lắp đặt hệ thống tưới tiêu cho vườn hoa hồng cũng như rừng mộc lan. Anh ấy muốn đảm bảo rằng hoa được tưới thật nhiều nước trong những tháng hè nóng nực.\nW-Br Được rồi, bây giờ chúng ta hãy đến đó va đo một số kích thước. Sau đó thì chúng ta có thé xác định xem chúng ta sẽ cần những vật liệu gì.\nM-Âu Chắc chắn rồi. 61 Chúng ta còn một số bộ phận dư thừa từ khi chúng ta làm việc với cây anh đào. Tôi sẽ kiểm tra xem chúng ta còn lại những gì sau khi đo xong kích thước của vườn hông."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Why does the man apologize? (A) He lost a key. (B) He arrived late. (C) He turned off some equipment. (D) He forgot an instruction manual.",
   "transcript": "M: Good morning, Ms. Aljohani. Sorry I'm a little late. Traffic was terrible.\nW: That's OK, but our rental office will be very busy this morning. There's a big education convention in town starting today, and a lot of attendees from out of town have reserved cars to get to the conference center.\nM: Right. What do you want me to do first?\nW: I'd like you to start by checking the batteries in our electric cars. We want to be sure they're all fully charged.",
   "explanationVi": "Đáp án đúng: B\n\n62. Tại sao người đàn ông lại xin lỗi?\n(A) Anh ấy bị mất chìa khóa.\n(B) Anh ấy đến muộn.\n(C) Anh ấy đã tắt một số thiết bị.\n(D) Anh ấy quên sách hướng dẫn.\nCách diễn đạt tương đương:\n- arrived late = a little late (đến muộn) Cách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: why, man, apologize.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người đàn ông đề cập đến “Sorry” (Xin lỗi) là dấu hiệu sắp đến đáp án. “Sorry I'ma little late. Traffic was terrible.” là thông tin chứa đáp án. s “arrived late\" là cách diễn đạt tương đương của “a little late”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Chào buổi sáng, cô Aljohani. 62 Xin lỗi tôi đến hơi muộn. Giao thông thật khủng khiếp. W-Am Không sao đâu, nhưng 63 sáng nay văn phòng cho thuê của chúng ta sẽ rất bận rộn. Có một hội nghị giáo dục lớn trong thị trần bắt đầu từ hôm nay và rất nhiều người tham dự từ ngoài thị trần đã đặt xe đề đến trung tâm hội nghị.\nM-Au Đúng rồi. 64 Bạn muốn tôi làm gì đầu tiên?\nW-Am 64 Tôi muốn bạn bắt đầu bằng việc kiểm tra pin trong 6 tô điện của chúng ta. Chúng ta muốn chắc chắn rằng tất cả đều đã được sạc đầy."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "63. According to the woman, why will the speakers be very busy today? (A) The agency is offering a discount. (B) A new rental office is opening. (C) There is a conference in town. (D) A sporting event will take place.",
   "transcript": "M: Good morning, Ms. Aljohani. Sorry I'm a little late. Traffic was terrible.\nW: That's OK, but our rental office will be very busy this morning. There's a big education convention in town starting today, and a lot of attendees from out of town have reserved cars to get to the conference center.\nM: Right. What do you want me to do first?\nW: I'd like you to start by checking the batteries in our electric cars. We want to be sure they're all fully charged.",
   "explanationVi": "Đáp án đúng: C\n\nTheo người phụ nữ, tại sao hôm nay những người nói sẽ rất bận rộn?\n(A) Cơ quan này đang giảm giá.\n(B) Một văn phòng cho thuê mới sắp khai trương.\n(C) Có một hội nghị trong thị trân.\n(D) Một sự kiện thể thao sẽ diễn ra.\nCách diễn đạt tương đương:\n- aconference (một hội nghị) = a big education convention (một hội nghị giáo dục lớn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, woman, why, speakers, busy, today.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người phụ nữ: “our rental office will be very busy this morning.” (sáng nay van phòng cho thuê của chúng ta sé rất bận rộn.) là dấu hiệu sắp đến đáp án. “our rental office will be very busy this morning. There's a big education convention in town starting today.” là thông tin chứa đáp án.\n- “a conference” là cách diễn đạt tương đương của “a big education convention’.\n→ Phương án (CO) là phù hợp nhất. Loại phương án sai:\n- (B) phương án bẫy, bài nói có nhắc đến từ “rental office”, nhưng chỉ có văn phòng cho thuê của chính những người nói, không có văn phòng nào khác mới mở.\n- Cac phương án (A), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Chào buổi sáng, cô Aljohani. 62 Xin lỗi tôi đến hơi muộn. Giao thông thật khủng khiếp. W-Am Không sao đâu, nhưng 63 sáng nay văn phòng cho thuê của chúng ta sẽ rất bận rộn. Có một hội nghị giáo dục lớn trong thị trần bắt đầu từ hôm nay và rất nhiều người tham dự từ ngoài thị trần đã đặt xe đề đến trung tâm hội nghị.\nM-Au Đúng rồi. 64 Bạn muốn tôi làm gì đầu tiên?\nW-Am 64 Tôi muốn bạn bắt đầu bằng việc kiểm tra pin trong 6 tô điện của chúng ta. Chúng ta muốn chắc chắn rằng tất cả đều đã được sạc đầy."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "64. Look at the graphic. Where will the man go first? (A) Area 1 (B) Area 2 (C) Area 3 (D) Area 4",
   "transcript": "M: Good morning, Ms. Aljohani. Sorry I'm a little late. Traffic was terrible.\nW: That's OK, but our rental office will be very busy this morning. There's a big education convention in town starting today, and a lot of attendees from out of town have reserved cars to get to the conference center.\nM: Right. What do you want me to do first?\nW: I'd like you to start by checking the batteries in our electric cars. We want to be sure they're all fully charged.",
   "explanationVi": "Đáp án đúng: B\n\nNhìn vào biểu đồ. Người đàn ông sẽ đi đâu đầu tiên?\n(A) Khu vực 1\n(B) Khu vực 2\n(C) Khu vực 3\n(D) Khu vực 4\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Look at, graphic, where, man, go, first.\n- Dạng câu hỏi: liên quan bảng biểu, biểu đồ.\n- Cau hỏi yêu cầu xem biểu đồ để xác định khu vực đầu tiên người đàn ông sẽ di đến.\n- Dựa theo câu hỏi của người đàn ông: “What do you want me to do first?” (Bạn muốn tôi làm gì đầu tiên?) và yêu cầu của người phụ nữ, “I'd like you to start by...” (Tôi muốn bạn bắt đầu bằng viéc...), “ I'd like you to start by checking the batteries in our electric cars.” là thông tin chứa đáp án.\n- Dựa vào biểu đồ, người đàn ông sẽ đến khu vực 2 đầu tiên.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Các phương an (A), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Au Chào buổi sáng, cô Aljohani. 62 Xin lỗi tôi đến hơi muộn. Giao thông thật khủng khiếp. W-Am Không sao đâu, nhưng 63 sáng nay văn phòng cho thuê của chúng ta sẽ rất bận rộn. Có một hội nghị giáo dục lớn trong thị trần bắt đầu từ hôm nay và rất nhiều người tham dự từ ngoài thị trần đã đặt xe đề đến trung tâm hội nghị.\nM-Au Đúng rồi. 64 Bạn muốn tôi làm gì đầu tiên?\nW-Am 64 Tôi muốn bạn bắt đầu bằng việc kiểm tra pin trong 6 tô điện của chúng ta. Chúng ta muốn chắc chắn rằng tất cả đều đã được sạc đầy."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "65. Where do the speakers most ikely work? (A) At a landscaping company (B) At a local government office (C) At a garden store (D) At a lumber yard",
   "transcript": "M: I've been on vacation, so I missed our department's meeting. Can you give me an update?\nW: Well, all our public programs and community events are on schedule.\nM: Great! How about the Jannis Park project? We're still planning on planting trees best suited for residential areas, right?\nW: That's right. I'm working on the public education part now. There'll be a children's poster competition next month, which the city mayor will judge.\nM: Interesting. Is there a prize?\nW: The winner will get a ribbon. But all participants will get a seedling to plant at home. We'll be giving away the tallest of these four varieties, since it was the most popular in a survey of our residents.",
   "explanationVi": "Đáp án đúng: B\n\n65. Những người nói có khả năng cao là đang làm việc ở đâu?\n(A) Tại một công ty thiết kế cảnh quan\n(B) Tại văn phòng chính quyền địa phương\n(C) Tại một cửa hàng làm vườn\n(D) Tại một bãi để gỗ Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, speakers, likely, work.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại của người đàn ông: “Can you give me an update?” (Bạn có thể cập nhật cho tôi nghe được không?) là dấu hiệu sắp đến đáp án. “all our public programs and community events are on schedule.” là thông tin chứa đáp án.\n- Đoạn hội thoại xoay quanh nội dung về công việc công cộng và sự kiện cộng đồng, điều này có nghĩa là những người nói có khả năng cao là đang làm việc tại văn phòng chính quyền địa phương.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương an (A), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Au Tôi đã đi nghỉ mát nên bỏ lỡ cuộc họp của bộ phận chúng ta. Bạn có thể cập nhật cho tôi nghe được không?\nW-Br Vâng, 65 tất cả các chương trình công cộng và sự kiện cộng đồng của chúng ta đều đúng tiền độ.\nM-Au Tuyệt vời! Còn dự án Jannis Park thì sao? Chúng ta vẫn đang lên kế hoạch trồng những loại cây phù hợp nhất cho khu dân cư phải không?\nW-Br Đúng vậy. Bây giờ tôi đang làm phần giáo dục công cộng. 66 Tháng sau sẽ có một cuộc thi thiết kế áp phích cho trẻ em, và thị trưởng thành phố sẽ làm giám khảo.\nM-Âu Thú vị đấy. Có giải thưởng không?\nW-Br Người chiến thắng sẽ nhận được một dải ruy băng. Nhưng tất cả những người tham gia sẽ nhận được một cây giống đề trồng tại nhà. 67 Chúng ta sẽ tặng loại cây giống cao nhất trong số bồn loại này vì nó là loại phổ biến nhất theo cuộc khảo sát cu dân của chúng ta."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "66. What does the woman say will take place next month? (A) A seasonal promotion (B) A product demonstration (C) A poster contest (D) A lecture series",
   "transcript": "M: I've been on vacation, so I missed our department's meeting. Can you give me an update?\nW: Well, all our public programs and community events are on schedule.\nM: Great! How about the Jannis Park project? We're still planning on planting trees best suited for residential areas, right?\nW: That's right. I'm working on the public education part now. There'll be a children's poster competition next month, which the city mayor will judge.\nM: Interesting. Is there a prize?\nW: The winner will get a ribbon. But all participants will get a seedling to plant at home. We'll be giving away the tallest of these four varieties, since it was the most popular in a survey of our residents.",
   "explanationVi": "Đáp án đúng: C\n\nNgười phụ nữ nói điều gì sẽ diễn ra vào tháng tới?\n(A) Chương trình khuyên mãi theo mùa\n(B) Trình diễn sản phẩm\n(C) Một cuộc thi áp phích\n(D) Một chuỗi bài giảng\nCách diễn đạt tương đương:\n- aposter contest (một cuộc thi áp phích) = a children's poster competition (một cuộc thi thiết kế áp phích cho trẻ em)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, say, take place, next month.\n- Dang câu hỏi: thông tin chi tiết.\n- Lời thoại của người phụ nữ: “There'll be a...” (Sẽ có một...) là dấu hiệu sắp đến dap án. “There'll be a children's poster competition next month” là thông tin chứa dap an.\n- “a poster contest” là cách diễn đạt tương đương cua “a children's poster competition”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (B) chứa thông tin không được đề cập.\n- (D) phuong án bẫy, bài nói có nhắc đến từ “education” liên quan đến từ “lecture series” trong phương án, nhưng thông tin này không liên quan đến sự kiện sẽ xảy ra vào tháng sau theo lời nói của người phụ nữ.\n\nDịch hội thoại:\nM-Au Tôi đã đi nghỉ mát nên bỏ lỡ cuộc họp của bộ phận chúng ta. Bạn có thể cập nhật cho tôi nghe được không?\nW-Br Vâng, 65 tất cả các chương trình công cộng và sự kiện cộng đồng của chúng ta đều đúng tiền độ.\nM-Au Tuyệt vời! Còn dự án Jannis Park thì sao? Chúng ta vẫn đang lên kế hoạch trồng những loại cây phù hợp nhất cho khu dân cư phải không?\nW-Br Đúng vậy. Bây giờ tôi đang làm phần giáo dục công cộng. 66 Tháng sau sẽ có một cuộc thi thiết kế áp phích cho trẻ em, và thị trưởng thành phố sẽ làm giám khảo.\nM-Âu Thú vị đấy. Có giải thưởng không?\nW-Br Người chiến thắng sẽ nhận được một dải ruy băng. Nhưng tất cả những người tham gia sẽ nhận được một cây giống đề trồng tại nhà. 67 Chúng ta sẽ tặng loại cây giống cao nhất trong số bồn loại này vì nó là loại phổ biến nhất theo cuộc khảo sát cu dân của chúng ta."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "67. Look at the graphic. What kind of seedlings will be given away? (A) Eastern redbud (B) Japanese maple (C) White fringe tree (D) Panicle hydrangea",
   "transcript": "M: I've been on vacation, so I missed our department's meeting. Can you give me an update?\nW: Well, all our public programs and community events are on schedule.\nM: Great! How about the Jannis Park project? We're still planning on planting trees best suited for residential areas, right?\nW: That's right. I'm working on the public education part now. There'll be a children's poster competition next month, which the city mayor will judge.\nM: Interesting. Is there a prize?\nW: The winner will get a ribbon. But all participants will get a seedling to plant at home. We'll be giving away the tallest of these four varieties, since it was the most popular in a survey of our residents.",
   "explanationVi": "Đáp án đúng: A\n\n67. Nhìn vào bảng biểu. Loại cây giống nào sẽ được tặng?\n(A) Hoa Eastern redbud\n(B) Cây phong Nhật Bản\n(C) Cây lưu tô\n(D) Hoa Tú cầu có chùy\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Look at, graphic, what kind, seedlings, given away.\n- Dang câu hỏi: liên quan bảng biểu, biểu đồ.\n- Cau hỏi yêu cầu xem bảng biểu để xác định loại cây giống sẽ được tặng.\n- Dựa theo lời thoại của người phụ nữ, “ We'll be giving away the tallest of these four varieties” là thông tin chứa đáp án.\n- Dựa vào bảng biểu, loại cây giống của hoa Eastern redbud sẽ được tặng.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Au Tôi đã đi nghỉ mát nên bỏ lỡ cuộc họp của bộ phận chúng ta. Bạn có thể cập nhật cho tôi nghe được không?\nW-Br Vâng, 65 tất cả các chương trình công cộng và sự kiện cộng đồng của chúng ta đều đúng tiền độ.\nM-Au Tuyệt vời! Còn dự án Jannis Park thì sao? Chúng ta vẫn đang lên kế hoạch trồng những loại cây phù hợp nhất cho khu dân cư phải không?\nW-Br Đúng vậy. Bây giờ tôi đang làm phần giáo dục công cộng. 66 Tháng sau sẽ có một cuộc thi thiết kế áp phích cho trẻ em, và thị trưởng thành phố sẽ làm giám khảo.\nM-Âu Thú vị đấy. Có giải thưởng không?\nW-Br Người chiến thắng sẽ nhận được một dải ruy băng. Nhưng tất cả những người tham gia sẽ nhận được một cây giống đề trồng tại nhà. 67 Chúng ta sẽ tặng loại cây giống cao nhất trong số bồn loại này vì nó là loại phổ biến nhất theo cuộc khảo sát cu dân của chúng ta."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "68. Where does the conversation most likely take place? (A) At a cafe (B) At an electronics shop (C) At a stationery store (D) At a clothing store",
   "transcript": "M: Hi, I'd like a large black coffee and an egg-and-cheese croissant, please.\nW: Sure. That'll be eight dollars. Are you a Shelby's preferred customer?\nM: Uh, no I'm not. But I do have an EZ-Cash card.\nW: Great. Let me ring that up for you.\nM: By the way, I'd like to order breakfast for my team tomorrow morning. Can I place that order ahead of time?\nW: Sure. Would you like to do that now?\nM: No, I'll call you later today when I know what everyone wants. Thanks for the information.",
   "explanationVi": "Đáp án đúng: A\n\n68. Cuộc trò chuyện có khả năng cao là đang diễn ra ở đâu?\n(A) Tại một quán cà phê\n(B) Tại một cửa hàng điện tử\n(C) Tại một cửa hàng văn phòng phẩm\n(D) Tại một cửa hàng quần áo\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, conversation, likely, take place.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại của người đàn ông: “Hi, I'd like a...\" (Xin chào, tôi muốn một...) là dấu hiệu sắp đến đáp án. “ I'd like a large black coffee and an egg-and-cheese croissant, please.” là thông tin chứa đáp án.\n- Người đàn ông gọi một cốc cà phê đen cỡ lớn và một chiếc bánh sừng bò trứng và phô mai, điều này có nghĩa rằng cuộc trò chuyện đang diễn ra ở một quán cà phê.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Cn Xin chao, 68 tôi muốn một cốc cà phê đen cỡ lớn và một chiếc bánh sừng bò trứng và phô mai.\nW-Am Chắc chắn rồi. Của bạn hết tám đô la. Bạn có phải là khách hang ưa thích của Shelby không?\nM-Cn O, không, tôi không phải. Nhưng 69 tôi có thẻ EZ- Cash.\nW-Am 69 Tốt lắm. Dé tôi tính tiền cho bạn.\nM-Cn Nhân tiện, tôi muốn đặt bữa sáng cho đội của tôi vào sáng mai. Tôi có thể đặt trước không?\nW-Am Chắc chắn rồi. Ban có muốn làm điều đó ngay bây giờ không?\nM-Cn Không, 70 tôi sẽ gọi lại cho bạn vào cuối ngày sau khi tôi biết mọi người muốn gì. Cảm ơn vì thông tin."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "69. Look at the graphic. How much will the man save on his purchase? (A) 5% (B) 3% (C) 7% (D) 2%",
   "transcript": "M: Hi, I'd like a large black coffee and an egg-and-cheese croissant, please.\nW: Sure. That'll be eight dollars. Are you a Shelby's preferred customer?\nM: Uh, no I'm not. But I do have an EZ-Cash card.\nW: Great. Let me ring that up for you.\nM: By the way, I'd like to order breakfast for my team tomorrow morning. Can I place that order ahead of time?\nW: Sure. Would you like to do that now?\nM: No, I'll call you later today when I know what everyone wants. Thanks for the information.",
   "explanationVi": "Đáp án đúng: D\n\nNhìn vào biểu đồ. Người đàn ông sẽ tiết kiệm bao nhiêu tiền cho giao dịch của mình?\n(A) 5%\n(B) 3%\n(C) 7%\n(D) 2%\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Look at, graphic, how much, man, save, purchase.\n- Dạng câu hỏi: liên quan bảng biểu, biểu đồ.\n- Cau hỏi yêu cầu xem biểu đồ để xác định phần trăm tiền mà người đàn ông sẽ tiết kiệm được.\n- Dựa theo lời thoại của người đàn ông và su đồng ý của người phụ nữ: “Great. Let me ring that up for you.” (Tốt lắm. Để tôi tính tiền cho bạn.), “ | do have an EZ- Cash card.” là thông tin chứa đáp án.\n- Dựa vào biểu đồ, người đàn ông sẽ tiết kiệm 2% cho giao dịch của mình.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai: Các phương án (A), (B), (C) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Cn Xin chao, 68 tôi muốn một cốc cà phê đen cỡ lớn và một chiếc bánh sừng bò trứng và phô mai.\nW-Am Chắc chắn rồi. Của bạn hết tám đô la. Bạn có phải là khách hang ưa thích của Shelby không?\nM-Cn O, không, tôi không phải. Nhưng 69 tôi có thẻ EZ- Cash.\nW-Am 69 Tốt lắm. Dé tôi tính tiền cho bạn.\nM-Cn Nhân tiện, tôi muốn đặt bữa sáng cho đội của tôi vào sáng mai. Tôi có thể đặt trước không?\nW-Am Chắc chắn rồi. Ban có muốn làm điều đó ngay bây giờ không?\nM-Cn Không, 70 tôi sẽ gọi lại cho bạn vào cuối ngày sau khi tôi biết mọi người muốn gì. Cảm ơn vì thông tin."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "70. What does the man say he will do later today? (A) Call a business (B) Return some merchandise (C) Fill out an online survey (D) Hang up some posters",
   "transcript": "M: Hi, I'd like a large black coffee and an egg-and-cheese croissant, please.\nW: Sure. That'll be eight dollars. Are you a Shelby's preferred customer?\nM: Uh, no I'm not. But I do have an EZ-Cash card.\nW: Great. Let me ring that up for you.\nM: By the way, I'd like to order breakfast for my team tomorrow morning. Can I place that order ahead of time?\nW: Sure. Would you like to do that now?\nM: No, I'll call you later today when I know what everyone wants. Thanks for the information.",
   "explanationVi": "Đáp án đúng: A\n\n70. Người đàn ông nói rằng anh ấy sẽ làm gì vào cuối ngày hôm nay?\n(A) Gọi điện cho một doanh nghiệp\n(B) Trả lại một số hàng hóa\n(C) Điền một cuộc khảo sát trực tuyến\n(D) Treo một số áp phích\nCách diễn đạt tương đương:\n- calla business (gọi điện cho một doanh nghiệp) = call you later (gọi lại cho bạn sau)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, say, do, later, today.\n- Dang câu hỏi: thông tin chỉ tiết.\n- Lời thoại của người phụ nữ: “Would you like to do that now?” (Bạn có muốn làm điều đó ngay bây giờ không?) là dấu hiệu sắp đến đáp án. “I'll call you later today” là thông tin chứa dap án.\n- “calla business” là cách diễn đạt tương đương của “call you later’.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chao, 68 tôi muốn một cốc cà phê đen cỡ lớn và một chiếc bánh sừng bò trứng và phô mai.\nW-Am Chắc chắn rồi. Của bạn hết tám đô la. Bạn có phải là khách hang ưa thích của Shelby không?\nM-Cn O, không, tôi không phải. Nhưng 69 tôi có thẻ EZ- Cash.\nW-Am 69 Tốt lắm. Dé tôi tính tiền cho bạn.\nM-Cn Nhân tiện, tôi muốn đặt bữa sáng cho đội của tôi vào sáng mai. Tôi có thể đặt trước không?\nW-Am Chắc chắn rồi. Ban có muốn làm điều đó ngay bây giờ không?\nM-Cn Không, 70 tôi sẽ gọi lại cho bạn vào cuối ngày sau khi tôi biết mọi người muốn gì. Cảm ơn vì thông tin."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "71. Who most likely is the speaker? (A) An art gallery owner (B) A hairstylist (C) A clothing designer (D) A jewelry maker",
   "transcript": "Hi, Amina. This is Sabine calling from Blue Drop Creations. I just put the earrings and necklaces that you ordered from me in the mail. Because you've been a customer for over ten years, I've also included a special gift in the package for you. It's a case for your jewelry. This is a new product that I'm starting to offer, so please call me back after you receive it. I'd really like to hear your thoughts on it.",
   "explanationVi": "Đáp án đúng: D\n\nW-Be Xin chao, Amina. Day là Sabine dang gọi từ Blue Drop Creations. 71 Tôi vừa gửi đôi bông tai va dây chuyén ma ban đặt hang qua đường bưu điện. 72 Vì ban đã là khách hàng hon mười năm nên tôi cũng gửi kèm một món quà đặc biệt trong gói hàng dành cho bạn. Đó là một hộp đựng đồ trang sức của bạn. Đây là sản phẩm mới mình bắt đầu cung cấp, 73 nên bạn vui lòng gọi lại cho mình sau khi nhận được nhé. Tôi thực sự muốn nghe suy nghĩ của bạn về nó. 71. Ai có nhiều khả năng là người nói nhất?\n(A) Một chủ phòng trưng bày nghệ thuật\n(B) Một nhà tạo mâu tóc\n(C) Một nhà thiết kế quần áo\n(D) Một thợ làm đồ trang sức\nCách diễn đạt tương đương\nearings, necklaces (hoa tai, vòng cổ) = jewelry (trang sức)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, speaker\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"| just put the earrings and necklaces that you ordered from me in the mail.\" là thông tin chứa đáp an. Điều này chứng tỏ người này làm việc trong lĩnh vực trang sức.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nPhương án (A), (B), (C): Các phương án này không liên quan đến việc làm đồ trang sức."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "72. Why did the speaker include a special gift? (A) Because the listener is a new customer (B) Because the listener is celebrating a special occasion (C) Because the listener is a loyal customer (D) Because the listener placed a large order",
   "transcript": "Hi, Amina. This is Sabine calling from Blue Drop Creations. I just put the earrings and necklaces that you ordered from me in the mail. Because you've been a customer for over ten years, I've also included a special gift in the package for you. It's a case for your jewelry. This is a new product that I'm starting to offer, so please call me back after you receive it. I'd really like to hear your thoughts on it.",
   "explanationVi": "Đáp án đúng: C\n\n72. Tại sao người nói lại tặng kèm một món quà đặc biệt?\n(A) Bởi vì người nghe là một khách hàng mới\n(B) Bởi vì người nghe đang ăn mừng một dịp đặc biệt\n(C) Bởi vì người nghe là khách hàng trung thành\n(D) Bởi vì người nghe đã đặt một lượng lớn đặt hàng\nCách diễn đạt tương đương\na customer for over ten year (một người khách hàng hơn 10 năm) = a loyal customer (một khách hàng trung thành)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, include, special gift\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"Because you've been a customer for over ten years, I've also included a special gift in the package for you.\" là thông tin chứa dap an. Ta thấy có từ “because” mở ra gợi ý về mệnh đề nguyên nhân, tra lời cho câu hỏi “why”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "73. Why is the listener asked to return a phone call? (A) To give feedback (B) To confirm receipt of an order (C) To update a payment method (D) To provide an address",
   "transcript": "Hi, Amina. This is Sabine calling from Blue Drop Creations. I just put the earrings and necklaces that you ordered from me in the mail. Because you've been a customer for over ten years, I've also included a special gift in the package for you. It's a case for your jewelry. This is a new product that I'm starting to offer, so please call me back after you receive it. I'd really like to hear your thoughts on it.",
   "explanationVi": "Đáp án đúng: A\n\n73. Tại sao người nghe được yêu cầu gọi lại?\n(A) Dé đưa ra phản hồi\n(B) Đề xác nhận việc nhận đơn đặt hàng\n(C) Dé cập nhật phương thức thanh toán\n(D) Đề cung cấp một địa chỉ\nCách diễn đạt tương đương\n- your thoughts (những suy nghĩ của ban) = feedback (nhận xét) - call me back (gọi lại cho tôi) = return a phone call (gọi lại một cuộc điện thoại)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: listener, be asked, return a phone call\n- Dạng câu hỏi: thông tin tổng quan\n- Lời thoại \"so please call me back after you receive it. I'd really like to hear your thoughts on it.\" là thông tin chứa đáp an.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nPhương án (B), (C, (D): Các phương án này không có thông tin đề cập đến việc gọi lại để đưa ra phản hồi.\n- include (v): bao gồm\n- jewelry (n): trang sức\n- thought (n): suy nghĩ\n- order (v): đặt hàng\n- package (n): gói hàng"
  },
  {
   "number": 74,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "74. What does the listener want to do? (A) Hire a caterer (B) Purchase a painting (C) Have a printer repaired (D) Have a photograph framed",
   "transcript": "Good morning, this is Brandon from Dakota Framing Company, returning your call. We received your voicemail about wanting to frame a wedding picture. There is no need to print the photo yourself. We prefer that you e-mail us a digital copy. So, to answer your question, you can complete the whole order online. Just visit our Web site, where you'll fill in your choices for photo size and the frame and upload your photo. And for a small extra cost, wel guarantee to replace your frame in case of damage. Please be sure to check that box when you order.",
   "explanationVi": "Đáp án đúng: D\n\n74. Người nghe muốn làm gì?\n(A) Thuê một người cung cấp thực phẩm\n(B) Mua một bức tranh\n(C) Sửa máy in\n(D) Có một bức ảnh được đóng khung\nCách diễn đạt tương đương\nframe a wedding picture (đóng khung ảnh cưới) ~ have a photograph framed (được ai đó đóng khung một bức ảnh)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listener, want, do\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “We received your voicemail about wanting to frame a wedding picture” là thông tin chứa dap an.\n- \"Have a photograph framed\" là cách diễn dat tương đương của \"frame a wedding picture\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au Chào buổi sáng, đây là Brandon từ Công ty Dakota Framing, đang trả lời cuộc gọi của bạn. 74 Chúng tôi đã nhận được thư thoại của bạn về việc muốn đóng khung một bức ảnh\ncưới. Không cần phải tự in ảnh. Chúng tôi muốn bạn gửi ban sao kỹ thuật số qua email cho chúng tôi. Vì vậy, dé trả lời câu hỏi của bạn, 75 bạn có thể hoàn thành toàn bộ đơn hàng trực tuyến. Chi cần truy cập trang Web của chúng tôi, nơi bạn sẽ điền các lựa chọn về kích thước ảnh và khung rồi tải ảnh của mình lên. Và 76 với một khoản phụ phí nhỏ, chúng tôi đảm bảo sẽ thay thế khung của bạn trong trường hợp bị hư hỏng. Hãy chắc chắn kiểm tra hộp đó khi bạn đặt hàng."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "75. 75\\ What does the speaker expect the listener to do on a Web site? (A) View a list of prices (B) Place an order (C) Schedule a time to meet (D) Read customer reviews",
   "transcript": "Good morning, this is Brandon from Dakota Framing Company, returning your call. We received your voicemail about wanting to frame a wedding picture. There is no need to print the photo yourself. We prefer that you e-mail us a digital copy. So, to answer your question, you can complete the whole order online. Just visit our Web site, where you'll fill in your choices for photo size and the frame and upload your photo. And for a small extra cost, wel guarantee to replace your frame in case of damage. Please be sure to check that box when you order.",
   "explanationVi": "Đáp án đúng: B\n\n75. Người nói mong đợi người nghe làm gì trên một trang Web?\n(A) Xem danh sách giá\n(B) Đặt hàng\n(C) Lên lịch gặp mặt\n(D) Đọc đánh giá của khách hàng\nCách diễn đạt tương đương\nplace an order (đặt hàng) ~ complete the whole order (hoàn thành toàn bộ đơn hàng)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker expect, listener, do, Web site\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “you can complete the whole order online. Just visit our Web site” là thông tin chứa dap án.\n- \"Place an order\" là cách diễn đạt tương đương của \"complete the whole order\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au Chào buổi sáng, đây là Brandon từ Công ty Dakota Framing, đang trả lời cuộc gọi của bạn. 74 Chúng tôi đã nhận được thư thoại của bạn về việc muốn đóng khung một bức ảnh\ncưới. Không cần phải tự in ảnh. Chúng tôi muốn bạn gửi ban sao kỹ thuật số qua email cho chúng tôi. Vì vậy, dé trả lời câu hỏi của bạn, 75 bạn có thể hoàn thành toàn bộ đơn hàng trực tuyến. Chi cần truy cập trang Web của chúng tôi, nơi bạn sẽ điền các lựa chọn về kích thước ảnh và khung rồi tải ảnh của mình lên. Và 76 với một khoản phụ phí nhỏ, chúng tôi đảm bảo sẽ thay thế khung của bạn trong trường hợp bị hư hỏng. Hãy chắc chắn kiểm tra hộp đó khi bạn đặt hàng."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "76. What is included for an extra fee? (A) Shipping (B) An artist's signature (C) A newsletter (D) A warranty",
   "transcript": "Good morning, this is Brandon from Dakota Framing Company, returning your call. We received your voicemail about wanting to frame a wedding picture. There is no need to print the photo yourself. We prefer that you e-mail us a digital copy. So, to answer your question, you can complete the whole order online. Just visit our Web site, where you'll fill in your choices for photo size and the frame and upload your photo. And for a small extra cost, wel guarantee to replace your frame in case of damage. Please be sure to check that box when you order.",
   "explanationVi": "Đáp án đúng: D\n\n76. Phụ phí bao gồm những gì?\n(A) Vận chuyển\n(B) Chữ ký của một nghệ sĩ\n(C) Một bản tin\n(D) Bảo hành\nCách diễn đạt tương đương\nguarantee to replace your frame (bảo đảm để thay thế cho khung ảnh của bạn) = a warranty (bảo hành)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: included, extra fee\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “And for a small extra cost, we'll guarantee to replace your frame in case of damage” là thông tin chứa dap an.\n- \"Awarranty\" là cách diễn đạt tương đương của \"guarantee to replace your frame\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- voicemail (n): tin nhắn bằng giọng nói\n- frame (n): khung ảnh\n- fill in (phr.v): điền vào\n- guarantee (v): đảm bảo\n- replace (v): thay thế\n\nDịch bài nói:\nM-Au Chào buổi sáng, đây là Brandon từ Công ty Dakota Framing, đang trả lời cuộc gọi của bạn. 74 Chúng tôi đã nhận được thư thoại của bạn về việc muốn đóng khung một bức ảnh\ncưới. Không cần phải tự in ảnh. Chúng tôi muốn bạn gửi ban sao kỹ thuật số qua email cho chúng tôi. Vì vậy, dé trả lời câu hỏi của bạn, 75 bạn có thể hoàn thành toàn bộ đơn hàng trực tuyến. Chi cần truy cập trang Web của chúng tôi, nơi bạn sẽ điền các lựa chọn về kích thước ảnh và khung rồi tải ảnh của mình lên. Và 76 với một khoản phụ phí nhỏ, chúng tôi đảm bảo sẽ thay thế khung của bạn trong trường hợp bị hư hỏng. Hãy chắc chắn kiểm tra hộp đó khi bạn đặt hàng."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "77. Who are the listeners? (A) Hotel receptionists (B) Health-care staff (C) Customer-service representatives (D) Fitness trainers",
   "transcript": "Welcome all to this week's training in our series of patient care programs. Our physical therapy center is known for the excellent care we provide to our patients, and that's because of you, our staff. The training today will be about ways to engage the patients who reside in our facility through playing games. rve prepared different types of activities for us to try out, including some games that involve mental stimulation as well as physical exercises. But, I have to let you know that today I must leave at noon. Next week we'll try out more of the games.",
   "explanationVi": "Đáp án đúng: B\n\n77. Ai là người nghe?\n(A) Nhân viên lễ tân khách sạn\n(B) Nhân viên chăm sóc sức khỏe\n(C) Đại diện dịch vụ khách hàng\n(D) Huan luyện viên thé hình\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, listeners\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"Welcome all to this week's training in our series of patient care programs\" là thông tin chứa đáp an.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (C) chứa thông tin không được đề cập.\n- Phương án (D) là phương án gây nhiễu vì trong thông tin chứa đáp án có từ “training” (buổi huấn luyện) làm người nghe liên tưởng đến “trainers” (người huấn luyện), tuy nhiên ở đoạn hội thoại không nhắc đến từ “fitness” (thể hình\").\n\nDịch bài nói:\nM-Cn 77 Chào mừng tất cả các bạn đến với buổi dao tạo tuần này về loạt chương trình chăm sóc bệnh nhân của chúng tôi. Trung tâm vật lý trị liệu của chúng tôi được biết đến với sự chăm sóc tuyệt vời mà chúng tôi cung cấp cho bệnh nhân của mình và đó là nhờ các bạn, nhân viên của chúng tôi. Khóa đào tạo hôm nay sẽ nói về những cách thu hút bệnh nhân cư trú tại cơ sở của chúng tôi thông qua việc chơi trò chơi. 78,79 Tôi đã chuẩn bị nhiều loại hoạt động khác nhau dé chúng ta thử sức, bao gồm một số trò chơi liên quan đến kích thích tinh thần cũng như các bài tập thé chat. Nhưng tôi phải báo cho bạn biết rằng hôm nay tôi phải đi vào buổi trưa. 79 Tuần tới chúng tôi sẽ thử nhiều trò chơi hơn."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "78. What has the speaker prepared? (A) Activities (B) Food (C) Certificates (D) A video",
   "transcript": "Welcome all to this week's training in our series of patient care programs. Our physical therapy center is known for the excellent care we provide to our patients, and that's because of you, our staff. The training today will be about ways to engage the patients who reside in our facility through playing games. rve prepared different types of activities for us to try out, including some games that involve mental stimulation as well as physical exercises. But, I have to let you know that today I must leave at noon. Next week we'll try out more of the games.",
   "explanationVi": "Đáp án đúng: A\n\n78. Người nói đã chuẩn bị những gì?\n(A) Hoạt động\n(B) Thức ăn\n(C) Giấy chứng nhận\n(D) Một đoạn video\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker prepared\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"I've prepared different types of activities for us to try out\" là thông tin chứa dap án.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn 77 Chào mừng tất cả các bạn đến với buổi dao tạo tuần này về loạt chương trình chăm sóc bệnh nhân của chúng tôi. Trung tâm vật lý trị liệu của chúng tôi được biết đến với sự chăm sóc tuyệt vời mà chúng tôi cung cấp cho bệnh nhân của mình và đó là nhờ các bạn, nhân viên của chúng tôi. Khóa đào tạo hôm nay sẽ nói về những cách thu hút bệnh nhân cư trú tại cơ sở của chúng tôi thông qua việc chơi trò chơi. 78,79 Tôi đã chuẩn bị nhiều loại hoạt động khác nhau dé chúng ta thử sức, bao gồm một số trò chơi liên quan đến kích thích tinh thần cũng như các bài tập thé chat. Nhưng tôi phải báo cho bạn biết rằng hôm nay tôi phải đi vào buổi trưa. 79 Tuần tới chúng tôi sẽ thử nhiều trò chơi hơn."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "79. What does the speaker imply when he says, \"I must leave at noon\"? (A) He would like permission to leave. (B) He cannot join a luncheon. (C) A colleague will fill in for him. (D) Some material will not be covered today.",
   "transcript": "Welcome all to this week's training in our series of patient care programs. Our physical therapy center is known for the excellent care we provide to our patients, and that's because of you, our staff. The training today will be about ways to engage the patients who reside in our facility through playing games. rve prepared different types of activities for us to try out, including some games that involve mental stimulation as well as physical exercises. But, I have to let you know that today I must leave at noon. Next week we'll try out more of the games.",
   "explanationVi": "Đáp án đúng: D\n\n79. Người nói có ý gì khi nói “Tôi phải đi vào buổi trưa”?\n(A) Anh ấy muốn được phép rời đi.\n(B) Anh ấy không thể tham gia bữa trưa.\n(C) Một đồng nghiệp sẽ điền thông tin cho anh ấy.\n(D) Một số tài liệu sẽ không được đề cập ngày hôm nay.\nCách định vi vùng thông tin chứa đáp án:\nTừ khóa trong câu hỏi: speaker imply, “I must leave at noon\"\nDạng câu hỏi: ngụ ý\nLời thoại “ I've prepared different types of activities for us to try out” và \"But, | have to let you know that today | must leave at noon. Next week we'll try out more of the games\" là thông tin chứa dap án. Điều này cho thấy anh ta có chuẩn bị nhiều hoạt động nhưng do anh ấy phải về vào buổi trưa nên ngụ ý sẽ có một vài hoạt động không được diễn ra trong hôm đó.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Phương án (A) là bẫy vì có từ “leave” nhưng không phải là ngụ ý của anh ấy.\n- Phương án (B) là bẫy vì có thể anh ta sẽ rời đi vào buổi trưa nhưng không có đề cập đến việc anh ta có tham gia ăn trưa hay không. Từ “luncheon” có nghĩa là “một bữa ăn trưa trang trọng hoặc một từ trang trọng cho bữa trưa”\nPhương án (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý: - patient (n): bệnh nhân - physical therapy (n.phr): trị liệu vật lý - engage (v): tham gia - reside (v): cư trú tại\n- involve (v): liên quan đến\n\nDịch bài nói:\nM-Cn 77 Chào mừng tất cả các bạn đến với buổi dao tạo tuần này về loạt chương trình chăm sóc bệnh nhân của chúng tôi. Trung tâm vật lý trị liệu của chúng tôi được biết đến với sự chăm sóc tuyệt vời mà chúng tôi cung cấp cho bệnh nhân của mình và đó là nhờ các bạn, nhân viên của chúng tôi. Khóa đào tạo hôm nay sẽ nói về những cách thu hút bệnh nhân cư trú tại cơ sở của chúng tôi thông qua việc chơi trò chơi. 78,79 Tôi đã chuẩn bị nhiều loại hoạt động khác nhau dé chúng ta thử sức, bao gồm một số trò chơi liên quan đến kích thích tinh thần cũng như các bài tập thé chat. Nhưng tôi phải báo cho bạn biết rằng hôm nay tôi phải đi vào buổi trưa. 79 Tuần tới chúng tôi sẽ thử nhiều trò chơi hơn."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "80. What is the purpose of the advertisement? (A) To announce a contest (B) To promote an upcoming sale (C) To introduce new services (D) To recruit employees",
   "transcript": "Are you a certified commercial truck driver? Hoffman Oversized Haulers is currently looking for experienced truck drivers to join our team. As our name suggests, we transport oversized cargo throughout the region. With Hoffman, drivers enjoy flexible scheduling. In fact, we're the only company in the region that allows employees to determine their own work hours. If you don't have experience working with oversized loads, training is available. please check out our Web site to learn more about our open positions. We can't wait to work with you.",
   "explanationVi": "Đáp án đúng: D\n\n80. Mục đích của quảng cáo là gì?\n(A) Để thông báo một cuộc thi\n(B) Đề quảng cáo đợt giảm giá sắp tới\n(C) Dé giới thiệu các dịch vụ mới\n(D) Đề tuyển dụng nhân viên\nCách diễn đạt tương đương:\nRecruit employees (thuê nhân viên) = looking for experienced truck drivers to join our team. (tìm kiếm tai xế xe tải có kinh nghiệm gia nhập đội ngũ của chúng tôi.)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: purpose, advertisement\n- Dang câu hỏi: thông tin tổng quát\n- Lời thoại \"Hoffman Oversized Haulers is currently looking for experienced truck drivers to join our team\" là thông tin chứa đáp an.\n- \"Recruit employees\" là cách diễn đạt tương đương cua \"looking for experienced truck drivers to join our team.\"\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au Bạn có phải là tài xế xe tải thương mại được chứng nhận không? 80 Hoffman Oversized Haulers hiện đang tìm kiếm những tài xé xe tải có kinh nghiệm dé gia nhập đội ngũ của chúng tôi. Đúng như tên gọi của chúng tôi, chúng tôi vận chuyên hàng hóa quá khổ trên khắp khu vực. 81 Với Hoffman, người lái xe có thể lên lịch linh hoạt. Trên thực tế, chúng tôi là công ty duy nhất trong khu vực cho phép nhân viên tự quyết định giờ làm việc của mình. Nếu bạn chưa có kinh nghiệm làm việc với tải trọng quá khổ, bạn có thể được đào tạo. 82 Vui lòng xem trang web của chúng tôi dé tìm hiểu thêm về các vị trí đang tuyển dụng của chúng tôi. Chúng tôi rất mong được làm việc với bạn."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "81. How is the speaker's company different from its competitors? (A) It is dependable. (B) It produces innovative products. (C) It offers flexible schedules. (D) It pays employees well.",
   "transcript": "Are you a certified commercial truck driver? Hoffman Oversized Haulers is currently looking for experienced truck drivers to join our team. As our name suggests, we transport oversized cargo throughout the region. With Hoffman, drivers enjoy flexible scheduling. In fact, we're the only company in the region that allows employees to determine their own work hours. If you don't have experience working with oversized loads, training is available. please check out our Web site to learn more about our open positions. We can't wait to work with you.",
   "explanationVi": "Đáp án đúng: C\n\n81. Công ty của diễn gid khác với đối thủ cạnh tranh như thé nào?\n(A) Nó đáng tin cậy.\n(B) Nó tạo ra các sản phẩm sáng tạo.\n(C) Nó cung cấp lịch trình linh hoạt.\n(D) Nó tra lương cho nhân viên rat tốt.\nCách diễn đạt tương đương\nIt offers flexible schedules (Nó cung cấp lịch trình linh hoạt) ~ we're the only company in the region that allows employees to determine their own work hours (chúng tôi là công ty duy nhất trong khu vực cho phép nhân viên xác định giờ làm việc của riêng họ).\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speaker's company different, competitors\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"With Hoffman, drivers enjoy flexible scheduling. In fact, we're the only company in the region that allows employees to determine their own work hours\" là thông tin chứa đáp an.\n- \"It offers flexible schedules” là cách diễn đạt tương đương của \"we're the only company in the region that allows employees to determine their own work hours.\"\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au Bạn có phải là tài xế xe tải thương mại được chứng nhận không? 80 Hoffman Oversized Haulers hiện đang tìm kiếm những tài xé xe tải có kinh nghiệm dé gia nhập đội ngũ của chúng tôi. Đúng như tên gọi của chúng tôi, chúng tôi vận chuyên hàng hóa quá khổ trên khắp khu vực. 81 Với Hoffman, người lái xe có thể lên lịch linh hoạt. Trên thực tế, chúng tôi là công ty duy nhất trong khu vực cho phép nhân viên tự quyết định giờ làm việc của mình. Nếu bạn chưa có kinh nghiệm làm việc với tải trọng quá khổ, bạn có thể được đào tạo. 82 Vui lòng xem trang web của chúng tôi dé tìm hiểu thêm về các vị trí đang tuyển dụng của chúng tôi. Chúng tôi rất mong được làm việc với bạn."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "82. What does the speaker encourage the listeners to do? (A) Complete a survey (B) Fill out an application (C) Place an order (D) Get more information",
   "transcript": "Are you a certified commercial truck driver? Hoffman Oversized Haulers is currently looking for experienced truck drivers to join our team. As our name suggests, we transport oversized cargo throughout the region. With Hoffman, drivers enjoy flexible scheduling. In fact, we're the only company in the region that allows employees to determine their own work hours. If you don't have experience working with oversized loads, training is available. please check out our Web site to learn more about our open positions. We can't wait to work with you.",
   "explanationVi": "Đáp án đúng: D\n\n82. Người nói khuyến khích người nghe làm gì?\n(A) Hoàn thành một cuộc khảo sát\n(B) Điền vào đơn đăng ký\n(C) Đặt hàng\n(D) Nhận thêm thông tin\nCách diễn đạt tương đương\nlearn more about our open positions (tìm hiểu thêm về những vị trí đang mở của chúng tôi) ~ get more information (nhận thêm thông tin)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speaker encourage, listeners\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"Please check out our Web site to learn more about our open positions\" là thông tin chứa dap an.\n- \"Get more information\" là cách diễn đạt tương đương của \"learn more about our open positions.\"\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- certified (adj): được chứng nhận\n- commercial (adj): thuộc về thương mại\n- currently (adv): hiện tại, gần đây\n- transport (n): giao thông\n- determine (v): tự quyết định\n\nDịch bài nói:\nM-Au Bạn có phải là tài xế xe tải thương mại được chứng nhận không? 80 Hoffman Oversized Haulers hiện đang tìm kiếm những tài xé xe tải có kinh nghiệm dé gia nhập đội ngũ của chúng tôi. Đúng như tên gọi của chúng tôi, chúng tôi vận chuyên hàng hóa quá khổ trên khắp khu vực. 81 Với Hoffman, người lái xe có thể lên lịch linh hoạt. Trên thực tế, chúng tôi là công ty duy nhất trong khu vực cho phép nhân viên tự quyết định giờ làm việc của mình. Nếu bạn chưa có kinh nghiệm làm việc với tải trọng quá khổ, bạn có thể được đào tạo. 82 Vui lòng xem trang web của chúng tôi dé tìm hiểu thêm về các vị trí đang tuyển dụng của chúng tôi. Chúng tôi rất mong được làm việc với bạn."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "83. What is the message mainly about? (A) Revising a restaurant menu (B) Filming for a television show (C) Launching an advertising campaign (D) Renovating a kitchen",
   "transcript": "Hi, Jinyu. I have some exciting news! The Farmer's Table television program wants to feature our restaurant in an upcoming episode. They'll be coming on Wednesday to film everyone at work in the kitchen during our dinner service. Since you're the executive chef, I'll need you to come in earlier than usual to get everything prepped and set up. And just as a reminder, I'm still planning to be out of town next week for the Springdale Pastry and Dessert Festival. Thanks!",
   "explanationVi": "Đáp án đúng: B\n\n83. Thông điệp chủ yếu nói về điều gì?\n(A) Sửa lại thực đơn nhà hàng\n(B) Quay phim cho một chương trình truyền hình\n(C) Khởi động một chiến dịch quảng cáo\n(D) Cải tạo nhà bếp\nCách diễn dạt tương đương:\nFilming for a television show (Quay phim cho một chương trình truyền hình) ~ wants to feature our restaurant in an upcoming episode (muốn giới thiệu nhà hàng của chúng tôi trong tập sắp tới.)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: message mainly about\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"The Farmer's Table television program wants to feature our restaurant in an upcoming episode\" là thông tin chứa đáp an.\n- \"Filming for a television show\" là cách diễn dat tương đương của \"wants to feature our restaurant in an upcoming episode.\"\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Xin chào, Jinyu. Tôi có một số tin tức thú vị! 83 Chương trình truyền hình Bàn Nông Dân muốn giới thiệu nhà hàng của chúng ta trong tập sắp tới. 84 Họ sẽ đến vào thứ Tư dé quay phim mọi người đang làm việc trong bếp trong buổi phục vụ bữa tối của chúng tôi. Vì bạn là bếp trưởng nên tôi can bạn đến sớm hơn thường lệ dé chuẩn bị và sắp xếp mọi thứ. Và như một lời nhắc nhớ, 85 tôi vẫn có kế hoạch ra khỏi thành phố vào tuần tới để tham dự Lễ hội Bánh ngọt va Món tráng miệng Springdale. Cảm ơn!"
  },
  {
   "number": 84,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "84. What does the speaker ask the listener to do on Wednesday? (A) Come to work early (B) Experiment with new ingredients (C) Train an employee (D) Prepare for a safety inspection",
   "transcript": "Hi, Jinyu. I have some exciting news! The Farmer's Table television program wants to feature our restaurant in an upcoming episode. They'll be coming on Wednesday to film everyone at work in the kitchen during our dinner service. Since you're the executive chef, I'll need you to come in earlier than usual to get everything prepped and set up. And just as a reminder, I'm still planning to be out of town next week for the Springdale Pastry and Dessert Festival. Thanks!",
   "explanationVi": "Đáp án đúng: A\n\n84. Người nói yêu cầu người nghe làm gì vào thứ Tư?\n(A) Hãy đến làm việc sớm\n(B) Thử nghiệm với các nguyên liệu mới\n(C) Đào tạo nhân viên\n(D) Chuan bị cho cuộc kiểm tra an toàn\nCách diễn đạt tương đương\ncome in earlier than usual (đến sớm hơn bình thường) = come to work early (đến làm việc sớm)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speaker ask, listener, Wednesday\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"They'll be coming on Wednesday to film everyone at work in the kitchen during our dinner service. Since you're the executive chef, I'll need you to come in earlier than usual to get everything prepped and set up\" là thông tin chứa dap án.\n- \"Come to work early\" là cách diễn đạt tương đương của \"come in earlier than usual.\"\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (B), (C) chứa thông tin không được đề cập.\n- Phương án (D) là bẫy vì trong đoạn hội thoại có từ “prepare” tương đương với từ “prep” tuy nhiên ở đây không nói cụ thé ra chuẩn bị gì.\n\nDịch bài nói:\nW-Am Xin chào, Jinyu. Tôi có một số tin tức thú vị! 83 Chương trình truyền hình Bàn Nông Dân muốn giới thiệu nhà hàng của chúng ta trong tập sắp tới. 84 Họ sẽ đến vào thứ Tư dé quay phim mọi người đang làm việc trong bếp trong buổi phục vụ bữa tối của chúng tôi. Vì bạn là bếp trưởng nên tôi can bạn đến sớm hơn thường lệ dé chuẩn bị và sắp xếp mọi thứ. Và như một lời nhắc nhớ, 85 tôi vẫn có kế hoạch ra khỏi thành phố vào tuần tới để tham dự Lễ hội Bánh ngọt va Món tráng miệng Springdale. Cảm ơn!"
  },
  {
   "number": 85,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "85. Where will the speaker go next week? (A) To a food festival (B) To a cooking class (C) To a farmers market (D) To a bakery opening",
   "transcript": "Hi, Jinyu. I have some exciting news! The Farmer's Table television program wants to feature our restaurant in an upcoming episode. They'll be coming on Wednesday to film everyone at work in the kitchen during our dinner service. Since you're the executive chef, I'll need you to come in earlier than usual to get everything prepped and set up. And just as a reminder, I'm still planning to be out of town next week for the Springdale Pastry and Dessert Festival. Thanks!",
   "explanationVi": "Đáp án đúng: A\n\nDiễn gia sẽ đi đâu vào tuần tới?\n(A) Đền một lễ hội ầm thực\n(B) Đên lớp học nâu ăn\n(C) Đên chợ nông sản\n(D) Đên một tiệm bánh mì\nCách diễn đạt tương đương\nthe Springdale Pastry and Dessert Festival (Lễ hội bánh ngọt và món tráng miệng Springdale) ~ a food festival (lễ hội ẩm thực)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speaker go next week\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"I'm still planning to be out of town next week for the Springdale Pastry and Dessert Festival\" là thông tin chứa dap an.\n- \"Toa food festival\" là cách diễn đạt tương đương của \"the Springdale Pastry and Dessert Festival.\"\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- feature (v): miêu tả\n- upcoming (adj): sắp đến\n- executive chef (n.phr): bếp trưởng\n- set up (v.phr): chuẩn bị\n- reminder (n): nhắc nhở\n\nDịch bài nói:\nW-Am Xin chào, Jinyu. Tôi có một số tin tức thú vị! 83 Chương trình truyền hình Bàn Nông Dân muốn giới thiệu nhà hàng của chúng ta trong tập sắp tới. 84 Họ sẽ đến vào thứ Tư dé quay phim mọi người đang làm việc trong bếp trong buổi phục vụ bữa tối của chúng tôi. Vì bạn là bếp trưởng nên tôi can bạn đến sớm hơn thường lệ dé chuẩn bị và sắp xếp mọi thứ. Và như một lời nhắc nhớ, 85 tôi vẫn có kế hoạch ra khỏi thành phố vào tuần tới để tham dự Lễ hội Bánh ngọt va Món tráng miệng Springdale. Cảm ơn!"
  },
  {
   "number": 86,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "86. What is the speaker mainly discussing? (A) A job fair (B) A factory (C) Some traffic patterns (D) A prototype electric vehicle",
   "transcript": "Good evening and thank you for watching Channel Four News. I'm here in Rockville, a suburb in the metropolitan area. Rockville was recently chosen as the site of a multimillion-dollar electric vehicle battery factory. This project promises to bring thousands of jobs, both directly and indirectly, to the surrounding community. At a recent well-attended public comment meeting, residents had a chance to voice any opposition to the project. No one made any comments. To learn more about this exciting development,, artist-rendered images of the project are on display at the city hall building.",
   "explanationVi": "Đáp án đúng: B\n\n86. Người nói chủ yếu thảo luận về điều gì?\n(A) Một hội chợ việc làm\n(B) Một nhà máy\n(C) Một số kiểu giao thông\n(D) Một mẫu xe điện\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speaker, mainly, discussing\nDạng câu hỏi: thông tin tổng quát\n- Lời thoại \"Rockville was recently chosen as the site of a multimillion-dollar electric vehicle battery factory. \" là thông tin chứa đáp an.\n→ Phương án (B) là phù hợp nhất\nLoại phương án sai:\n- Cac phương án (A), (C) chứa thông tin không được dé cập.\n- Phương án (D) là bẫy vì dù nó có chứa cum “electric vehicle” giống với lời thoại nhưng ý của người nói không đề cập đến “a prototype” (mẫu thử).\n\nDịch bài nói:\nM-Cn Chào buổi tối và cảm ơn các bạn đã xem Channel Four News. Tôi đang ở Rockville, một vùng ngoại 6 trong khu vực đô thị. 86 Rockville mới đây được chon làm địa điểm xây dựng nhà máy sản xuất pin xe điện trị giá hàng triệu USD. Dự án này hứa hẹn sẽ mang lại hàng ngàn việc làm, cả trực tiếp và gián tiếp, cho cộng đồng xung quanh. 87 Tại một cuộc họp lấy ý ý kiến công chúng có đông người tham dự gần đây, người dân có cơ hội bay tỏ bat kỳ sự phan đối nào đối với dự án. Không ai đưa ra bất kỳ bình luận nào. Đề tìm hiểu thêm về sự phát triển thú vị này, 88 hình ảnh do nghệ sĩ thể hiện về dự án đang được trưng bày tại tòa nhà tòa thị chính."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "87. What does the speaker imply when he says, “No one made any comments\"? (A) Few people were in attendance. (B) Another meeting will be scheduled. (C) A project has community support. (D) A public comment period has ended.",
   "transcript": "Good evening and thank you for watching Channel Four News. I'm here in Rockville, a suburb in the metropolitan area. Rockville was recently chosen as the site of a multimillion-dollar electric vehicle battery factory. This project promises to bring thousands of jobs, both directly and indirectly, to the surrounding community. At a recent well-attended public comment meeting, residents had a chance to voice any opposition to the project. No one made any comments. To learn more about this exciting development,, artist-rendered images of the project are on display at the city hall building.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói có ý gì khi nói \"Không ai đưa ra ý kiến gì\"?\n(A) Rât ít người tham dự.\n(B) Một cuộc họp khác sẽ được lên lịch.\n(C) Một dự án có sự hỗ trợ của cộng đồng.\n(D) Thời gian lây ý kiên công chúng da ket thúc.\nCách định vi vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: speaker imply, No one made any comments\n- Dang câu hỏi: ngụ ý\n- Lời thoại \"At a recent well-attended public comment meeting, residents had a chance to voice any opposition to the project. No one made any comments\" la thông tin chứa đáp án.\n→ Phương án (CO) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn Chào buổi tối và cảm ơn các bạn đã xem Channel Four News. Tôi đang ở Rockville, một vùng ngoại 6 trong khu vực đô thị. 86 Rockville mới đây được chon làm địa điểm xây dựng nhà máy sản xuất pin xe điện trị giá hàng triệu USD. Dự án này hứa hẹn sẽ mang lại hàng ngàn việc làm, cả trực tiếp và gián tiếp, cho cộng đồng xung quanh. 87 Tại một cuộc họp lấy ý ý kiến công chúng có đông người tham dự gần đây, người dân có cơ hội bay tỏ bat kỳ sự phan đối nào đối với dự án. Không ai đưa ra bất kỳ bình luận nào. Đề tìm hiểu thêm về sự phát triển thú vị này, 88 hình ảnh do nghệ sĩ thể hiện về dự án đang được trưng bày tại tòa nhà tòa thị chính."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "88. What can the public view at the city hall building? (A) An official contract (B) Some images (C) A list of companies (D) Some facts about local politicians",
   "transcript": "Good evening and thank you for watching Channel Four News. I'm here in Rockville, a suburb in the metropolitan area. Rockville was recently chosen as the site of a multimillion-dollar electric vehicle battery factory. This project promises to bring thousands of jobs, both directly and indirectly, to the surrounding community. At a recent well-attended public comment meeting, residents had a chance to voice any opposition to the project. No one made any comments. To learn more about this exciting development,, artist-rendered images of the project are on display at the city hall building.",
   "explanationVi": "Đáp án đúng: B\n\n88. Công chúng có thể xem gì tại tòa nhà tòa thị chính?\n(A) Một hợp đồng chính thức\n(B) Một số hình ảnh\n(C) Danh sách các công ty\n(D) Một số sự thật về các chính trị gia địa phương\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: public view, city hall building\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"artist-rendered images of the project are on display at the city hall building\" là thông tin chứa đáp án.\n- \"Some images\" là cách đề cập ngắn gọn của của \"artist-rendered images of the project.\"\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- suburb (n): ngoại ô\n- metropolitan (n): đô thị\n- indirectly (adv): một cách gián tiếp\n- surrounding (adj): xoay quanh, bao quanh\n- comment (n, v): nhận xét\n\nDịch bài nói:\nM-Cn Chào buổi tối và cảm ơn các bạn đã xem Channel Four News. Tôi đang ở Rockville, một vùng ngoại 6 trong khu vực đô thị. 86 Rockville mới đây được chon làm địa điểm xây dựng nhà máy sản xuất pin xe điện trị giá hàng triệu USD. Dự án này hứa hẹn sẽ mang lại hàng ngàn việc làm, cả trực tiếp và gián tiếp, cho cộng đồng xung quanh. 87 Tại một cuộc họp lấy ý ý kiến công chúng có đông người tham dự gần đây, người dân có cơ hội bay tỏ bat kỳ sự phan đối nào đối với dự án. Không ai đưa ra bất kỳ bình luận nào. Đề tìm hiểu thêm về sự phát triển thú vị này, 88 hình ảnh do nghệ sĩ thể hiện về dự án đang được trưng bày tại tòa nhà tòa thị chính."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "D",
   "group": "89-91",
   "textEn": "89. What type of product is being advertised? (A) A floor lamp (B) A bookshelf (C) An office chair (D) A desk organizer",
   "transcript": "Tired of losing things on your desk because it's too cluttered? If so, the Optimum Space Organizer is the perfect product for you. Designed with office employees like you in mind, this product can make even the messiest of desks look neat again, Best of all, the organizer adjusts to any sized space you may have on your desk. It can be as narrow or as wide as you need it to be-within seconds! If you call in the next ten minutes, you'll receive a 30 percent discount!",
   "explanationVi": "Đáp án đúng: D\n\nW-Br Bạn mệt mỏi vì mat đồ trên bàn vì quá bừa bộn? 89 Nếu vậy thi Optimum Space Organizer là sản phẩm hoàn hảo dành cho bạn. Được thiết kế dành cho những nhân viên văn phòng như bạn, 89 sản phẩm này có thể khiến ngay cả những chiếc bàn bừa bộn nhất cũng trông gon gang trở lại. 90 Điều tuyệt vời nhất là người tổ chức có thể điều chỉnh theo bat kỳ kích thước không gian nào bạn có thể có trên bàn làm việc của mình. Nó có thể hẹp hoặc rộng tùy theo nhu cầu của bạn chỉ trong vài giây! 91 Nếu bạn gọi trong mười phút tới, bạn sẽ được giảm giá 30%!\n89, Loại sản phẩm nào đang được quảng cáo?\n(A) Một chiếc đèn san\n(B) Một giá sách\n(C) Một chiếc ghế văn phòng\n(D) Dụng cụ sắp xếp bàn làm việc\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: type of product\n- Dang câu hỏi: thông tin chi tiết\n- Câu mở đầu ta thấy có “Tired of losing things on your desk because it's too cluttered?” nói khó khăn khi bạn mệt mỏi vì mất đồ trên bàn vì quá bừa bộn?, báo hiệu đáp án sắp đến, một thiết bị để giải quyết vấn đề này.\n- Lời thoại \"the Optimum Space Organizer is the perfect product for you\" là thông tin chứa đáp án.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "90. What special feature does the speaker emphasize? (A) It is durable. (B) It is adjustable. (C) It is easy to assemble. (D) It is available in many colors.",
   "transcript": "Tired of losing things on your desk because it's too cluttered? If so, the Optimum Space Organizer is the perfect product for you. Designed with office employees like you in mind, this product can make even the messiest of desks look neat again, Best of all, the organizer adjusts to any sized space you may have on your desk. It can be as narrow or as wide as you need it to be-within seconds! If you call in the next ten minutes, you'll receive a 30 percent discount!",
   "explanationVi": "Đáp án đúng: B\n\n90. Người nói nhắn mạnh đến đặc điểm gi?\n(A) Nó bền.\n(B) Nó có thể điều chính được.\n(C) Nó rất dễ lắp ráp.\n(D) Nó có nhiều màu sắc.\nCách diễn đạt tương đương\nadjusts to any sized space (điều chỉnh theo mọi không gian có kích thước) ~ adjustable (có thể điều chỉnh)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: special feature\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"the organizer adjusts to any sized space you may have on your desk\" là thông tin chứa dap án.\n- \"It is adjustable\" là cách diễn đạt tương đương của \"the organizer adjusts to any sized space.\" Đều là nhấn mạnh tính năng có thể điều chỉnh được của sản phẩm.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "A",
   "group": "89-91",
   "textEn": "91. How can the listeners receive a discount? (A) By calling within a time limit (B) By entering an e-mail address (C) By referring a product to a friend (D) By using a mobile phone application",
   "transcript": "Tired of losing things on your desk because it's too cluttered? If so, the Optimum Space Organizer is the perfect product for you. Designed with office employees like you in mind, this product can make even the messiest of desks look neat again, Best of all, the organizer adjusts to any sized space you may have on your desk. It can be as narrow or as wide as you need it to be-within seconds! If you call in the next ten minutes, you'll receive a 30 percent discount!",
   "explanationVi": "Đáp án đúng: A\n\n91. Làm thé nào người nghe có thể được giảm giá?\n(A) Bằng cách gọi trong thời gian giới hạn\n(B) Bằng cách nhập địa chi email\n(C) Bằng cách giới thiệu sản phẩm cho bạn bè\n(D) Bằng cách sử dụng ứng dụng điện thoại di động\nCách diễn đạt tương đương\nin the next ten minutes (trong 10 phút tiếp theo) = within a time limit (trong một giới hạn thời gian)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: listeners receive a discount\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"If you call in the next ten minutes, you'll receive a 30 percent discount\" là thông tin chứa dap an.\n- “By calling within a time limit\" là cách diễn đạt tương đương của \"If you call in the next ten minutes.\"\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- tired of (adj.phr): mệt mỏi cái gì đó\n- cluttered (ad)): lộn xộn\n- organizer (n): người tổ chức - messy (adj): bừa bon\n- neat (adj): gon gang"
  },
  {
   "number": 92,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "92. According to the speaker, what is the purpose of the podcast? (A) To discuss the restaurant industry (B) To review new cooking equipment (C) To share information about nutrition (D) To showcase individual ingredients",
   "transcript": "Thanks for listening to this episode of Fabulous Foods. Every week, we discuss a different vegetable and ways to cook with it to maximize flavor. Now, before we get started, I'm excited to announce that I've been collaborating with Cartwell Kitchen Supplies to develop a new line of cookware. It'll be released in November, but it's available for preorder right now. Keep in mind, this product line will not be available for long. OK, let's move on to our program. With us today is renowned chef Rebecca Murray to talk about this week's vegetable: eggplant! Rebecca recently launched a vegetarian restaurant in New York that is getting rave reviews so far.",
   "explanationVi": "Đáp án đúng: D\n\n92. Theo diễn giả, mục đích của podcast là gì?\n(A) Đề thảo luận về ngành nhà hàng\n(B) Dé xem xét thiết bị nâu ăn mới\n(C) Dé chia sẻ thông tin về dinh dưỡng\n(D) Đề giới thiệu các thành phần riêng lẻ\nCách diễn đạt tương đương\ndiscuss a different vegetable (thảo luận về một loại rau khác) ~ showcase individual ingredients (giới thiệu các nguyên liệu riêng lẻ)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: purpose of the podcast\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"Every week, we discuss a different vegetable and ways to cook with it to maximize flavor\" là thông tin chứa dap án.\n- \"To discuss a different vegetable\" và \"To showcase individual ingredients\" là cách diễn đạt tương đương.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Phương án (A) là bẫy vì dù chứa từ “discuss” giống lời thoại nhưng không phải là ý chính của podcast.\n- Phương án (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Cảm on bạn đã nghe tập này của Fabulous Foods. 92 Mỗi tuần, chúng tôi thao luận về một loại rau khác nhau và cách nấu với loại rau đó đề tối đa hóa hương vị. Bây giờ, trước khi chúng ta bắt đầu, 93 Tôi vui mừng thông báo rằng tôi đang cộng tác với Cartwell Kitchen Supplies dé phát triển một dòng dụng cụ nấu ăn mới. Nó sẽ được phát hành vào tháng 11 nhưng hiện da có sẵn dé đặt hàng trước. Hãy nhớ rang, dòng san phẩm nay sẽ không ton tại được lâu. Được rồi, hãy chuyền sang chương trình của chúng ta. Cùng chúng tôi hôm nay, đầu bếp nổi tiếng Rebecca Murray sẽ nói về món rau của tuần này: cà tím! 94 Rebecca gần đây đã khai trương một nhà hàng chay ở New York và nhận được nhiều lời khen ngợi cho đến nay."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "93. Why does the speaker say, “this product line will not be available for long\"? (A) To encourage the listeners to place an order (B) To apologize to the listeners for a product shortage (C) To justify a high price (D) To criticize a business decision",
   "transcript": "Thanks for listening to this episode of Fabulous Foods. Every week, we discuss a different vegetable and ways to cook with it to maximize flavor. Now, before we get started, I'm excited to announce that I've been collaborating with Cartwell Kitchen Supplies to develop a new line of cookware. It'll be released in November, but it's available for preorder right now. Keep in mind, this product line will not be available for long. OK, let's move on to our program. With us today is renowned chef Rebecca Murray to talk about this week's vegetable: eggplant! Rebecca recently launched a vegetarian restaurant in New York that is getting rave reviews so far.",
   "explanationVi": "Đáp án đúng: A\n\n93. Tại sao người nói lại nói “dòng sản phẩm này sẽ không có hàng lau”?\n(A) Dé khuyến khích người nghe đặt hàng\n(B) Đề xin lỗi người nghe vì thiếu sản phẩm\n(C) Đề biện minh cho mức giá cao\n(D) Đề chỉ trích một quyết định kinh doanh\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: this product line will not be available for long\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \" I'm excited to announce that I've been collaborating with Cartwell Kitchen Supplies to develop a new line of cookware. It'll be released in November, but it's available for preorder right now.” là thông tin chứa dap án. Thông tin này nằm trước lời ngụ ý nhằm đưa ra thông tin về sản phẩm và thúc giục người nghe đặt hàng.\n- \"To encourage the listeners to place an order\" là cách diễn đạt chính xác.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Cảm on bạn đã nghe tập này của Fabulous Foods. 92 Mỗi tuần, chúng tôi thao luận về một loại rau khác nhau và cách nấu với loại rau đó đề tối đa hóa hương vị. Bây giờ, trước khi chúng ta bắt đầu, 93 Tôi vui mừng thông báo rằng tôi đang cộng tác với Cartwell Kitchen Supplies dé phát triển một dòng dụng cụ nấu ăn mới. Nó sẽ được phát hành vào tháng 11 nhưng hiện da có sẵn dé đặt hàng trước. Hãy nhớ rang, dòng san phẩm nay sẽ không ton tại được lâu. Được rồi, hãy chuyền sang chương trình của chúng ta. Cùng chúng tôi hôm nay, đầu bếp nổi tiếng Rebecca Murray sẽ nói về món rau của tuần này: cà tím! 94 Rebecca gần đây đã khai trương một nhà hàng chay ở New York và nhận được nhiều lời khen ngợi cho đến nay."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "94. According to the speaker, what did Rebecca Murray recently do? (A) She published a cookbook. (B) Sne launched a culinary training course. (C) She opened a restaurant. (D) She traveled abroad.",
   "transcript": "Thanks for listening to this episode of Fabulous Foods. Every week, we discuss a different vegetable and ways to cook with it to maximize flavor. Now, before we get started, I'm excited to announce that I've been collaborating with Cartwell Kitchen Supplies to develop a new line of cookware. It'll be released in November, but it's available for preorder right now. Keep in mind, this product line will not be available for long. OK, let's move on to our program. With us today is renowned chef Rebecca Murray to talk about this week's vegetable: eggplant! Rebecca recently launched a vegetarian restaurant in New York that is getting rave reviews so far.",
   "explanationVi": "Đáp án đúng: C\n\n94. Theo diễn giả, gần đây Rebecca Murray đã làm gi?\n(A) Cô ấy đã xuất bản một cuốn sách nấu ăn.\n(B) Cô ấy đã khai giảng một khóa dao tạo nấu ăn.\n(C) Cô ấy mở một nhà hàng.\n(D) Cô ấy đi du lịch nước ngoài.\nCách diễn đạt tương đương\nlaunched a vegetarian restaurant (khai trương nhà hàng chay) = opened a restaurant (mở nhà hang)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Rebecca Murray recently\n- Dạng câu hỏi: xác định hành động gần đây của Rebecca Murray\n- Lời thoại \"Rebecca recently launched a vegetarian restaurant in New York\" là thông tin chứa dap án.\n- \"She launched a vegetarian restaurant\" va \"She opened a restaurant\" là cách diễn đạt tương đương.\n→ Phương án (CO) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (D) chứa thông tin không được đề cập.\n- Phương án (B) là bẫy vì dù có chứa từ “launched” nhưng cô ấy không mở khóa học mà là mở cửa hàng.\nTừ vựng cần chú ý:\n- fabulous (adj): tuyệt vời\n- maximize (v): tối đa hóa\n- flavor (n): hương vị\n- collaborate (v): cộng tác\n- kitchen supply (n.phr): vật dụng nhà bếp\n\nDịch bài nói:\nW-Am Cảm on bạn đã nghe tập này của Fabulous Foods. 92 Mỗi tuần, chúng tôi thao luận về một loại rau khác nhau và cách nấu với loại rau đó đề tối đa hóa hương vị. Bây giờ, trước khi chúng ta bắt đầu, 93 Tôi vui mừng thông báo rằng tôi đang cộng tác với Cartwell Kitchen Supplies dé phát triển một dòng dụng cụ nấu ăn mới. Nó sẽ được phát hành vào tháng 11 nhưng hiện da có sẵn dé đặt hàng trước. Hãy nhớ rang, dòng san phẩm nay sẽ không ton tại được lâu. Được rồi, hãy chuyền sang chương trình của chúng ta. Cùng chúng tôi hôm nay, đầu bếp nổi tiếng Rebecca Murray sẽ nói về món rau của tuần này: cà tím! 94 Rebecca gần đây đã khai trương một nhà hàng chay ở New York và nhận được nhiều lời khen ngợi cho đến nay."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "95. Why does the speaker apologize? (A) There is construction noise at the station. (B) There are no more seats available on a train. (C) A printed schedule has incorrect information. (D) A train service has been delayed.",
   "transcript": "Attention passengers. Renovation work to upgrade and modernize our train station is underway. We apologize for the inconvenience the construction noise may cause. Please note that regional train schedules are not affected. Train 133 with service to Washington, D.C., will be arriving Shortly. All passengers to Washington, please proceed to Track 26B. If you need assistance handling your baggage, please speak to a ticket agent immediately. Train 133's next stop will be Wilmington, followed by Baltimore and then Washington, D.C.",
   "explanationVi": "Đáp án đúng: A\n\nW-Br Hành khách chú ý. 95 Công việc cải tạo dé nâng cấp và hiện đại hóa nhà ga xe lửa của chúng tôi đang được tiền hành. Chúng tôi xin lỗi vì sự bất tiện mà tiếng ồn xây dựng có thể gây ra. Xin lưu ý rằng lịch trình tàu khu vực không bị ảnh hưởng. Chuyến tàu 133 với tuyến đến Washington, D.C. sẽ sớm đến nơi. Tat cả hành khách đến Washington, vui lòng đi tới Đường 26B. 96 Nếu bạn cần hỗ trợ xử lý hành lý của mình, vui lòng liên hệ ngay với nhân viên bán vé. 97 Điểm dừng tiếp theo của Chuyến tàu 133 sẽ là Wilmington, tiếp theo là Baltimore và sau đó là Washington, D.C.\n95, Tại sao người nói xin lỗi?\n(A) Có tiếng ồn xây dựng ở ga tàu.\n(B) Không còn chỗ trồng trên chuyền bay xe lửa.\n(C) Lịch in bị sai thông tin.\n(D) Một chuyên tàu đã bị trì hoãn.\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, apologize\nDạng câu hỏi: thông tin tổng quát\n- Lời thoại \"We apologize for the inconvenience the construction noise may cause là thông tin chứa dap an.\n- \"There is construction noise at the station\" là cách diễn đạt chính xác.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "B",
   "group": "95-97",
   "textEn": "96. According to the speaker, why may some listeners need to see an agent? (A) To ask for a refund (B) To request baggage service (C) To purchase a monthly pass (D) To arrange a transfer",
   "transcript": "Attention passengers. Renovation work to upgrade and modernize our train station is underway. We apologize for the inconvenience the construction noise may cause. Please note that regional train schedules are not affected. Train 133 with service to Washington, D.C., will be arriving Shortly. All passengers to Washington, please proceed to Track 26B. If you need assistance handling your baggage, please speak to a ticket agent immediately. Train 133's next stop will be Wilmington, followed by Baltimore and then Washington, D.C.",
   "explanationVi": "Đáp án đúng: B\n\n96. Theo người nói, tại sao một số người nghe có thể cần gặp một người đại diện?\n(A) Dé yêu cầu hoàn lại tiền\n(B) Đề yêu cầu dịch vụ hành lý\n(C) Dé mua vé tháng\n(D) Dé sắp xếp việc chuyền giao\nCách diễn đạt tương đương\nassitance handling your baggage (hỗ trợ xử lý hành lý của bạn) ~ baggage service (dịch vụ hành lý)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, listeners, need to see an agent\n- Dang câu hỏi: thông tin tổng quát\n- Lời thoại \"If you need assistance handling your baggage, please speak to a ticket agent immediately\" là thông tin chứa dap án.\n- \"To request baggage service\" là cách diễn đạt chính xác.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "B",
   "group": "95-97",
   "textEn": "97. Look at the graphic. When is Train 133 scheduled to arrive at its next stop? (A) At 10:45 A.M. (B) At 12:05 P.M. (C) At 1:00 P.M. (D) At 1:30 P.M.",
   "transcript": "Attention passengers. Renovation work to upgrade and modernize our train station is underway. We apologize for the inconvenience the construction noise may cause. Please note that regional train schedules are not affected. Train 133 with service to Washington, D.C., will be arriving Shortly. All passengers to Washington, please proceed to Track 26B. If you need assistance handling your baggage, please speak to a ticket agent immediately. Train 133's next stop will be Wilmington, followed by Baltimore and then Washington, D.C.",
   "explanationVi": "Đáp án đúng: B\n\n97. Nhìn vào đồ họa. Khi nào chuyến tàu 133 dự kiến đến điểm dừng tiếp theo?\n(A) Lúc 10:45 sáng\n(B) Lúc 12:05 trưa.\n(C) Lúc 1 giờ chiều.\n(D) Lúc 1:30 chiều.\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Train 133 scheduled to arrive at its next stop\n- Dạng câu hỏi: liên quan bảng biểu, biểu đồ\n- Lời thoại \"Train 133's next stop will be Wilmington, followed by Baltimore and then Washington, D.C.\" chứa thông tin về bến tiếp theo của chuyển tau 133 là ở Wilmington.\n- Thông tin về thời gian đến điểm dừng tiếp theo được hiển thị trong đồ họa.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không phản ánh chính xác thời gian đến điểm tiếp theo của tàu 133.\nTừ vựng cần chú ý:\n- attention (n): sự chú ý\n- passenger (n): hành khách - renovation (n): sự cải tiến\n- modernize (v): hiện đại hóa\n- inconvenience (adj): bất tiện"
  },
  {
   "number": 98,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "98. Who most likely are the listeners? (A) Civil engineers (B) Urban planners (C) News reporters (D) Safety inspectors",
   "transcript": "Hello, everyone. I'm Carmen Salazar, the airport operations director, and I wanted to thank you for attending this press conference. As of this week, construction on the new regional airport is proceeding on schedule for two of the three terminals. Minor design adjustments to terminal A have put the project slightly behind schedule, and we anticipate about two months will be added to the construction time frame as a result. I'd also like to mention that we now have a 3-D printed model of this project! Please feel free to visit our Web site so you can view it.",
   "explanationVi": "Đáp án đúng: C\n\nW-Am Xin chào mọi người. Tôi là Carmen Salazar, giám đốc điều hành sân bay, 98 và tôi muốn cảm ơn các bạn đã tham dự cuộc họp báo này. Tính đến tuần này, việc xây dựng sân bay khu vực mới đang được tiền hành đúng tiền độ cho hai trong số ba nhà ga. 99 Những điều chỉnh nhỏ về thiết kế đối với nhà ga A đã khiến dự án bị chậm tiền độ một chút và do đó, chúng tôi dự đoán khung thời gian xây dựng sẽ được cộng thêm khoảng hai tháng. 100 Tôi cũng muốn đề cập rằng hiện tại chúng tôi đã có mô hình in 3-D của dự án này! Xin vui lòng truy cập trang web của chúng tôi để bạn có thể xem nó.\n98, Ai có khả năng nhất là người nghe?\n(A) Kỹ sư xây dựng\n(B) Các nhà quy hoạch đô thị\n(C) Phóng viên tin tức\n(D) Thanh tra an toàn\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: listeners\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại \"Hello, everyone. I'm Carmen Salazar, the airport operations director, and | wanted to thank you for attending this press conference\" là thông tin chứa dap an.\n- \"Press conference\" (hop báo) là từ khóa xác định đối tượng người nghe chính là phóng viên tin tức.\n→ Phương án (CO) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "99. Look at the graphic. Which of the following companies will be affected by a delay? (A) Selca Air (B) Trilco Airlines (C) Heathson Airways (D) Bluxtin Airlines",
   "transcript": "Hello, everyone. I'm Carmen Salazar, the airport operations director, and I wanted to thank you for attending this press conference. As of this week, construction on the new regional airport is proceeding on schedule for two of the three terminals. Minor design adjustments to terminal A have put the project slightly behind schedule, and we anticipate about two months will be added to the construction time frame as a result. I'd also like to mention that we now have a 3-D printed model of this project! Please feel free to visit our Web site so you can view it.",
   "explanationVi": "Đáp án đúng: A\n\n99, Nhìn vào đồ họa. Công ty nào sau đây sẽ bị ảnh hưởng bởi sự chậm trễ?\n(A) Selca Air\n(B) Hãng hang không Trilco\n(C) Hãng hang không Heathson\n(D) Hang hang khong Bluxtin\nCách diễn đạt tương đương\nbehind schedule (chậm tiến độ) = a delay (sự chậm trễ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: affected by a delay\n- Dạng câu hỏi: liên quan bảng biểu, biểu đồ\n- Lời thoại \"Minor design adjustments to terminal A have put the project slightly behind schedule, and we anticipate about two months will be added to the construction time frame as a result\" là thông tin chứa đáp an. Terminal A (Nhà ga\nA) sẽ phải sửa chữa lại.\n- Theo biểu đồ tương ứng thì \"Selca Air\" là tên của công ty sẽ bị ảnh hưởng.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không phản ánh đúng công ty sẽ bị ảnh hưởng."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "B",
   "group": "98-100",
   "textEn": "100. What does the speaker invite the listeners to do? (A) Download some designs (B) Look at a model (C) Take a site tour (D) View a Webcam",
   "transcript": "Hello, everyone. I'm Carmen Salazar, the airport operations director, and I wanted to thank you for attending this press conference. As of this week, construction on the new regional airport is proceeding on schedule for two of the three terminals. Minor design adjustments to terminal A have put the project slightly behind schedule, and we anticipate about two months will be added to the construction time frame as a result. I'd also like to mention that we now have a 3-D printed model of this project! Please feel free to visit our Web site so you can view it.",
   "explanationVi": "Đáp án đúng: B\n\n100. Người nói mời người nghe làm gì?\n(A) Tải xuống một số thiết kế\n(B) Nhìn vào một mô hình\n(C) Đi tham quan địa điểm\n(D) Xem webcam\nCách diễn đạt tương đương\nview (nhìn) = look at (nhìn vào)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: speaker, invite the listeners\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại \"I'd also like to mention that we now have a 3-D printed model of this project! Please feel free to visit our Web site so you can view it\" là thông tin chứa dap an.\n- \"Look at a model\" là cách diễn đạt chính xác.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- Operations director (n.phr): giám đốc điều hành - construction (n): xây dựng\n- regional (adj): khu vực\n- terminal (n): nhà ga\n- design adjustments (n.phr): điều chỉnh thiết kế\n- 3-D printed model (n.phr): mô hình in 3-D"
  }
 ],
 "3": [
  {
   "number": 1,
   "part": 1,
   "answer": "D",
   "textEn": "(A) She's cleaning an oven. (B) She's moving a pot. (C) She's opening a cabinet. (D) She's holding a towel.",
   "transcript": "(A) She's cleaning an oven.\n(B) She's moving a pot.\n(C) She's opening a cabinet.\n(D) She's holding a towel.",
   "explanationVi": "Đáp án đúng: D\n\n(A) Cô ấy đang lau chùi lò nướng.\n(B) Cô ấy đang di chuyển một cái nồi.\n(C) Cô ấy đang mở tủ.\n(D) Cô ấy đang cầm một chiếc khăn.\nLoại trừ phương án sai:\n- Loại (A) vì chứa hành động không phù hợp với tranh - \"cleaning an oven\" (lau chùi lò nướng). Phương án bẫy - các đối tượng như người phụ nữ và chiếc lò nướng đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (B) vì chứa hành động không phù hợp với tranh - \"moving a pot\" (di chuyển một cái nồi). Phương án bẫy - các đối tượng như người phụ nữ và cái nồi đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (C) vì chứa hành động không phù hợp với tranh - “opening a cabinet\" (mở tủ). Phương án bẫy - các đối tượng như người phụ nữ và cái tủ (bếp) đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "C",
   "textEn": "(A) They're putting trash in a bag. (B) They're taking off their jackets. (C) They're facing a shelving unit. (D) They're painting a room.",
   "transcript": "(A) They're putting trash in a bag.\n(B) They're taking off their jackets.\n(C) They're facing a shelving unit.\n(D) They're painting a room.",
   "explanationVi": "Đáp án đúng: C\n\n(A) Họ đang bỏ rác vào túi.\n(B) Họ đang cởi áo khoác.\n(C) Họ đang đối mặt với một chiếc kệ.\n(D) Họ đang sơn một căn phòng.\nLoại trừ phương án sai:\n- Loại (A) vì chứa hành động không phù hợp với tranh - “putting trash in a bag\" (bỏ rác vào túi).\n- Loại (B) vì chứa hành động không phù hợp với tranh - “taking off their jackets\" (cởi áo khoác). Phương án bẫy - hai người trong tranh vẫn mặc áo khoác mà không có hành động cởi.\n- Loại (D) vì chứa hành động không phù hợp với tranh - “painting a room\" (sơn một căn phòng)."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "D",
   "textEn": "(A) One of the men is removing his hat. (B) A line of customers extends out a door. (C) Some workers are installing a sign. (D) Musicians have gathered in a circle.",
   "transcript": "(A) One of the men is removing his hat.\n(B) A line of customers extends out a door.\n(C) Some workers are installing a sign.\n(D) Musicians have gathered in a circle.",
   "explanationVi": "Đáp án đúng: D\n\n(A) Một trong những người đàn ông đang cởi mũ của mình.\n(B) Một hàng khách hàng kéo dài ra cửa.\n(C) Một số công nhân đang lắp đặt một biển báo.\n(D) Các nhạc sĩ đã tập hợp thành một vòng tròn.\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - \"one of the men is removing his hat\" (một trong những người đàn ông đang cởi mũ của mình). Phương án bẫy - có một vài người đàn ông đội mũ, nhưng không ai trong số họ đang cởi mũ ra.\n- Loại (B) vì chứa thông tin không được thể hiện trong tranh — \"a line of customers extends out a door\" (một hàng khách hàng kéo dài ra cửa).\n- Loại (C) vì chứa thông tin không được thể hiện trong tranh — \"some workers are installing a sign\" (một số công nhân đang lắp đặt một biển báo)."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some tools have been left on a chair. (B) Some tool sets have been laid out. (C) A cup of coffee has spilled. (D) A table leg is being repaired.",
   "transcript": "(A) Some tools have been left on a chair.\n(B) Some tool sets have been laid out.\n(C) A cup of coffee has spilled.\n(D) A table leg is being repaired.",
   "explanationVi": "Đáp án đúng: B\n\n(A) Một số dụng cụ đã được đề trên ghế.\n(B) Một số bộ công cụ đã được chuẩn bị sẵn.\n(C) Một tách cà phê đã đồ.\n(D) Một chân bàn đang được sửa chữa.\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - \"some tools have been left on a chair\" (một số dụng cụ đã được để trên ghế). Phương án bẫy - trong tranh có các dụng cụ được để trên bàn, không phải trên ghế.\n- Loại (C)) vì chứa thông tin không được thể hiện trong tranh - \"a cup of coffee has spilled\" (một tách cà phê đã đổ). Phương án bẫy - tách cà phê xuất hiện trong tranh đang được đóng nắp và không bị đổ.\n- Loại (D) vì chứa thông tin không được thể hiện trong tranh - \"a table leg is being repaired\" (một chân bàn đang được sửa chữa). Phương án bẫy - trong tranh có hình ảnh chân bàn trong tình trạng nguyện vẹn, thay vì đang được sửa chữa."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "B",
   "textEn": "(A) A railing is being removed. (B) A roof is under construction. (C) Some workers are carrying a ladder. (D) Some workers are holding sheets of metal.",
   "transcript": "(A) A railing is being removed.\n(B) A roof is under construction.\n(C) Some workers are carrying a ladder.\n(D) Some workers are holding sheets of metal.",
   "explanationVi": "Đáp án đúng: B\n\n(A) Một lan can đang được dỡ bỏ.\n(B) Một mái nhà đang được xây dựng.\n(C) Một số công nhân đang mang thang.\n(D) Một số công nhân đang cam những tấm kim loại.\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh — \"a railing is being removed\" (một lan can đang được dỡ bỏ). Phương án bẫy - trong tranh có lan can nhưng chúng đang không được dỡ bỏ.\n- Loại (C) vì chứa hành động không phù hợp với tranh - \"carrying a ladder\" (mang thang). Phương án bẫy - các đối tượng như công nhân và chiếc thang đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (D) vì chứa đối tượng không có trong tranh - “sheets of metal\" (những tấm kim loại)."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "D",
   "textEn": "(A) A ladder has been leaned against a tree. (B) There are piles of tree branches discarded in a field. (C) Wooden benches have been arranged in a circle. (D) A wooden structure has been built near some trees.",
   "transcript": "(A) A ladder has been leaned against a tree.\n(B) There are piles of tree branches discarded in a field.\n(C) Wooden benches have been arranged in a circle.\n(D) A wooden structure has been built near some trees.",
   "explanationVi": "Đáp án đúng: D\n\n(A) Một cái thang được tựa vào một cái cây.\n(B) Có những đồng cành cây bị vứt bỏ trên cánh đồng.\n(C) Những chiếc ghế dài bằng gỗ đã được sắp xếp thành hình tròn.\n(D) Một kiến trúc bằng gỗ đã được xây dựng gần một số cây cối.\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - \"a ladder has been leaned against a tree\" (một cái thang được tựa vào một cái cây). Phương án bẫy — cái thang trong tranh đang được đặt trên mặt đất, không phải tựa vào cái cây.\n- Loại (B) vì chứa đối tượng không có trong tranh - \"piles of tree branches\" (những đống cành cây).\n- Loại (C) vì chứa đối tượng không có trong tranh - “wooden benches\" (những chiếc ghế dài bằng gỗ)."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "A",
   "textEn": "Why is there no flour on the shelf? (A) Because it's out of stock. (B) Those roses smell nice. (C) No, the other cake.",
   "transcript": "Why is there no flour on the shelf?\n(A) Because it's out of stock.\n(B) Those roses smell nice.\n(C) No, the other cake.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “những bông hồng đó có mùi thơm dễ chịu” không thể trả lời cho câu hỏi “tại sao lại không có bột mì trên kệ”.\n- (C) Phương án bẫy. Phương án lặp lại từ “no” trong câu hỏi, tuy nhiên câu trả lời bắt đầu bằng “Yes/No” không phù hợp để trả lời cho câu hỏi bắt đầu bằng từ “Why” để hỏi về lý do dẫn đến một sự việc nào đó."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "A",
   "textEn": "When will the catering company arrive? (A) At four o'clock. (B) That's a delicious flavor. (C) Many vegetarian options.",
   "transcript": "When will the catering company arrive?\n(A) At four o'clock.\n(B) That's a delicious flavor.\n(C) Many vegetarian options.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- _(B) Phương án bẫy. Phương án chứa cụm từ “delicious flavor” liên quan đến từ “catering” trong câu hỏi nhưng nội dung cả câu không phù hợp để trả lời cho ý hỏi “khi nào công ty cung cấp suất ăn sẽ đến”.\n- (C) Phuong án bẫy. Phương án chứa cụm từ “vegetarian options” liên quan đến từ “catering” trong câu hỏi nhưng nội dung cả câu không phù hợp để trả lời cho ý hỏi “khi nào công ty cung cấp suất ăn sẽ đến”."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "C",
   "textEn": "When's the meeting scheduled to start? (A) At a networking event. (B) I started this job six years ago. (C) Right after unch.",
   "transcript": "When's the meeting scheduled to start?\n(A) At a networking event.\n(B) I started this job six years ago.\n(C) Right after unch.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Thông tin “tại một sự kiện kết nối” không thể trả lời cho câu hỏi “khi nào cuộc họp dự kiến bắt đầu”.\n- _(B) Phương án bẫy. Phương án sử dụng từ “started” là hình thức ở thì quá khứ của động từ “start” trong câu hỏi, nhưng nội dung không phù hợp để tra lời cho ý hỏi “khi nào cuộc họp dự kiến bắt đầu”."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "B",
   "textEn": "...... How much will the repairs cost? (A) I have two pairs of shoes. (B) Around 200 dollars. (C) The restaurant downtown.",
   "transcript": "...... How much will the repairs cost?\n(A) I have two pairs of shoes.\n(B) Around 200 dollars.\n(C) The restaurant downtown.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai: s (A) Phương án bẫy. Phương án chứa từ “pairs” có phát âm giống với âm tiết thứ hai của từ “repairs” có trong câu hỏi nhưng nội dung cả câu không phù hợp để trả lời cho ý hỏi “chi phí sửa chữa là bao nhiêu”.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Thông tin “nhà hàng ở trung tâm thành phố” không thể trả lời cho câu hỏi “chi phí sửa chữa là bao nhiêu”."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "B",
   "textEn": "You went to the dentist this morning, didn't you? (A) Oh, I've already had breakfast. (B) Yes, for an annual checkup. (C) Let's take the bus.",
   "transcript": "You went to the dentist this morning, didn't you?\n(A) Oh, I've already had breakfast.\n(B) Yes, for an annual checkup.\n(C) Let's take the bus.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai: s (A) Phương án bẫy. Phương án chứa từ “breakfast” liên quan đến từ “morning” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Lời đề nghị “hãy đi xe buýt” không thể trả lời cho câu hỏi “sáng nay bạn đã đến nha sĩ phải không”."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "A",
   "textEn": "Where should we put the new printer? (A) In the corner by the stairs. (B) The third page of the document. (C) A reusable ink cartridge.",
   "transcript": "Where should we put the new printer?\n(A) In the corner by the stairs.\n(B) The third page of the document.\n(C) A reusable ink cartridge.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “trang thứ ba của tài liệu” không thể trả lời cho câu hỏi “chúng ta nên đặt máy in mới ở đâu”.\n- (C) Phuong án bẫy. Phương án chứa từ “ink cartridge” liên quan đến từ “printer” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "What type of plant do you have in your office? (A) Whenever I sit at my desk. (B) Thanks-I just bought it. (C) One that doesn't require much water.",
   "transcript": "What type of plant do you have in your office?\n(A) Whenever I sit at my desk.\n(B) Thanks-I just bought it.\n(C) One that doesn't require much water.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “desk” liên quan đến từ “office” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “cảm ơn - tôi vừa mua nó” không thể trả lời cho câu hỏi “bạn trồng loại cây gì trong văn phòng của mình”."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "B",
   "textEn": "There was a sale at the furniture store. (A) No, it wasn't in storage. (B) Did you buy anything? (C) Some old receipts.",
   "transcript": "There was a sale at the furniture store.\n(A) No, it wasn't in storage.\n(B) Did you buy anything?\n(C) Some old receipts.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “storage” có âm tiết đầu giống với cách phát âm của từ “store” có trong câu phát biểu. Tuy nhiên, thông tin “không, nó không có trong kho” không phù hợp để đáp lại thông tin “có đợt giảm giá ở cửa hàng nội thất”.\n- (C) Phuong án bẫy. Phương án chứa từ “receipts” liên quan đến từ “sale” trong câu phát biểu trước đó nhưng nội dung cả câu không phù hợp để đáp lại."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "A",
   "textEn": "Can you show me how to submit a tech help ticket? (A) Let me send you the link. (B) A broken power cable. (C) No, over ten minutes.",
   "transcript": "Can you show me how to submit a tech help ticket?\n(A) Let me send you the link.\n(B) A broken power cable.\n(C) No, over ten minutes.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án bẫy. Phương án chứa cụm từ “power cable” liên quan đến từ “tech” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi.\n- (C) Phuong án có nội dung không phù hợp ý hỏi. Thông tin “không, hơn mười phút” không thể trả lời cho câu hỏi “bạn có thể chỉ tôi cách nộp phiếu trợ giúp kỹ thuật không”."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "A",
   "textEn": "Where is the power button on this device? (A) I've never used that model before. (B) Ten euros per hour. (C) We charge more for color photographs.",
   "transcript": "Where is the power button on this device?\n(A) I've never used that model before.\n(B) Ten euros per hour.\n(C) We charge more for color photographs.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai: s _(B) Phương án bẫy. Phương án chứa cụm từ “per hour” có phát âm tương tự với từ “power” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Thông tin “chúng tôi tính phí nhiều hơn cho ảnh màu” không thể trả lời cho câu hỏi “nút nguồn trên máy này nằm ở đâu”."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "B",
   "textEn": "Do you want to take a walk now, or would later be better? (A) A nearby lake. (B) I'm free to walk now. (C) No, I don't use a fitness tracker.",
   "transcript": "Do you want to take a walk now, or would later be better?\n(A) A nearby lake.\n(B) I'm free to walk now.\n(C) No, I don't use a fitness tracker.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “lake” có phát âm tương tự với âm tiết đầu của từ “later” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Thông tin “không, tôi không sử dụng máy theo dõi sức khỏe” không thể trả lời cho câu hỏi “bạn muốn đi dạo bây giờ hay để sau thì tốt hơn”."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "B",
   "textEn": "I ordered some new equipment for the factory. (A) The news program on Channel Ten. (B) Great-I can't wait to use it. (C) The car dealership.",
   "transcript": "I ordered some new equipment for the factory.\n(A) The news program on Channel Ten.\n(B) Great-I can't wait to use it.\n(C) The car dealership.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “news” có phát âm tương tự với từ “new” có trong câu phát biểu nhưng nghĩa của chúng hoàn toàn khác nhau, vì vậy nội dung phương án không phù hợp để đáp lại.\n- (C) Phương án có nội dung không phù hợp để đáp lại câu phát biểu trước đó. Thông tin “đại lý ô tô” không thích hợp để trả lời cho câu “tôi đã đặt mua một số thiết bị mới cho nhà máy”."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "A",
   "textEn": "There's a nice place to rent on Mercer Street. (A) I just renewed my current lease. (B) It was a great show. (C) A standard rental application.",
   "transcript": "There's a nice place to rent on Mercer Street.\n(A) I just renewed my current lease.\n(B) It was a great show.\n(C) A standard rental application.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- _(B) Phương án bẫy. Phương án chứa từ “great” có nghĩa tương đồng với từ “nice” trong câu phát biểu nhưng nội dung cả câu không phù hợp để đáp lại.\n- (C) Phuong án bẫy. Phương án sử dụng từ “rental”, là từ phát sinh của từ “rent” trong câu phát biểu nhưng nội dung cả câu không phù hợp để đáp lại."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "..... Is the heating system working? (A) Yes, that's my Web site. (B) A five-kilometer run. (C) ljust called maintenance.",
   "transcript": "..... Is the heating system working?\n(A) Yes, that's my Web site.\n(B) A five-kilometer run.\n(C) ljust called maintenance.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Thông tin “vâng, đó là trang web của tôi” không thể trả lời cho câu hỏi “hệ thống sưởi ấm có hoạt động không”.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “một cuộc chạy bộ năm ki-lô-mét” không thé trả lời cho câu hỏi “hệ thống sưởi ấm có hoạt động không”."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "C",
   "textEn": "Isn't the roadwork in front of city hall finished yet? (A) I just finished my conference presentation. (B) A lot of traffic in the evening. (C) No, they still have another month to go.",
   "transcript": "Isn't the roadwork in front of city hall finished yet?\n(A) I just finished my conference presentation.\n(B) A lot of traffic in the evening.\n(C) No, they still have another month to go.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án lặp lại từ “finished” trong câu hỏi nhưng nội dung không phù hợp ý hỏi.\n- _(B) Phương án bẫy. Phương án chứa từ “traffic” liên quan đến từ “roadwork” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "A",
   "textEn": "Who will lead the new-employee training today? (A) Were using a recorded video. (B) Yes, right after lunch. (C) Classroom 124.",
   "transcript": "Who will lead the new-employee training today?\n(A) Were using a recorded video.\n(B) Yes, right after lunch.\n(C) Classroom 124.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “Vâng, ngay sau bữa trưa” không thể trả lời cho câu hỏi “ai sẽ lãnh đạo buổi đào tạo nhân viên mới ngày hôm nay”.\n- (C)) Phuong án có nội dung không phù hợp ý hỏi. Thông tin “lớp học 124” không thể trả lời cho câu hỏi “ai sẽ lãnh đạo buổi đào tạo nhân viên mới ngày hôm nay”."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "C",
   "textEn": "Is the safety inspection scheduled for this month or next month? (A) I thought I saved the file. (B) The factory supervisor. (C) It's this Wednesday.",
   "transcript": "Is the safety inspection scheduled for this month or next month?\n(A) I thought I saved the file.\n(B) The factory supervisor.\n(C) It's this Wednesday.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “saved” có phát âm tương tự với âm tiết đầu của từ “safety” có trong câu hỏi nhưng nghĩa của chúng hoàn toàn khác nhau, vì vậy nội dung phương án không phù hợp với ý hỏi.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “người giám sát nhà máy” không thể trả lời cho câu hỏi “việc kiểm tra an toàn được lên lịch vào tháng này hay tháng sau”."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "A",
   "textEn": "when is the harvest festival taking place? (A) It's a week from tomorrow. (B) Sure, I can take it. (C) The park next to the art museum.",
   "transcript": "when is the harvest festival taking place?\n(A) It's a week from tomorrow.\n(B) Sure, I can take it.\n(C) The park next to the art museum.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết “Khi nào lễ hội thu hoạch diễn ra” trong khi phương án trả lời lại là một câu khẳng định “tôi có thể làm nó”.\n- (C)) Phuong án có nội dung không phù hợp ý hỏi. Thông tin “công viên cạnh bao tàng nghệ thuật” phù hợp để trả lời cho câu hỏi cần cung cấp thông tin về địa điểm, không thích hợp để trả lời cho câu hỏi về thời gian (bắt đầu bằng từ “when”)."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "Was your new laptop expensive? (A) Do you have a new password? (B) I had a discount coupon. (C) On top of the cabinet.",
   "transcript": "Was your new laptop expensive?\n(A) Do you have a new password?\n(B) I had a discount coupon.\n(C) On top of the cabinet.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án lặp lại từ “new” trong câu hỏi nhưng nội dung không phù hợp ý hỏi. Người hỏi muốn biết “chiếc máy tính xách tay mới có đắt hay không” nhưng phương án này lại đáp lại bằng một câu hỏi không liên quan là “bạn có mật khẩu mới không”.\n- (C) Phuong án bẫy. Phương án chứa từ “top” có phát âm giống với âm tiết thứ hai trong từ “laptop” có trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "C",
   "textEn": "Why don't we go on our camping trip next weekend? (A) Yes, that table lamp is quite nice. (B) Should we go left or right? (C) I have a performance scheduled with my band.",
   "transcript": "Why don't we go on our camping trip next weekend?\n(A) Yes, that table lamp is quite nice.\n(B) Should we go left or right?\n(C) I have a performance scheduled with my band.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Thông tin “Vâng, chiếc đèn ban đó khá đẹp” không thể trả lời cho lời đề nghị “tại sao chúng ta không đi cắm trại vào cuối tuần tới nhỉ”.\n- _(B) Phương án bẫy. Phương án tuy có lặp lại từ “we” nhưng lại là một câu hỏi không liên quan “chúng ta nên rẽ trái hay rẽ phải”, vì thế nó không phù hợp để đáp lại lời đề nghị cắm trại."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "B",
   "textEn": "The workshop for this afternoon was postponed, wasn't it? (A) At the post office. (B) I haven't checked my e-mail. (C) A ticket for two oclock, please.",
   "transcript": "The workshop for this afternoon was postponed, wasn't it?\n(A) At the post office.\n(B) I haven't checked my e-mail.\n(C) A ticket for two oclock, please.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Thông tin về địa điểm “tại bưu điện” không thể trả lời cho câu hỏi rằng “buổi workshop chiều nay bị hoãn lại phải không”.\n- (C) Phuong án bẫy. Phương án chứa từ “ticket” liên quan đến từ “workshop” trong câu hỏi nhưng nội dung cả câu không phù hợp để trả lời cho ý hỏi."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "C",
   "textEn": "How were our production figures last month? (A) They produce electric cars. (B) Nine o clock in the morning. (C) We were closed down for a week.",
   "transcript": "How were our production figures last month?\n(A) They produce electric cars.\n(B) Nine o clock in the morning.\n(C) We were closed down for a week.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án sử dụng từ “produce” có phát âm gần giống với từ phát sinh “production” trong câu hỏi, nhưng nội dung không phù hợp với ý hỏi.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “chín giờ sáng” phù hợp để phản hồi cho các câu hỏi cần cung cấp thông tin về thời gian bắt đầu với từ “When”, không phù hợp để trả lời cho câu hỏi “Số liệu sản xuất tháng trước của chúng ta thế nào”."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "When can I see the speech therapist? (A) A one-hour session. (B) Just a microphone. (C) How about tomorrow afternoon?",
   "transcript": "When can I see the speech therapist?\n(A) A one-hour session.\n(B) Just a microphone.\n(C) How about tomorrow afternoon?",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết “khi nào có thể gặp nhà trị liệu ngôn ngữ” nhưng phương án này lại đề cập đến thời lượng dành cho một hoạt động cụ thể.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin “chỉ là một chiếc micro” không thể trả lời cho câu hỏi “khi nào có thể gặp nhà trị liệu ngôn ngữ”."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "B",
   "textEn": "Aren't you picking up the clients from the airport? (A) A product demonstration. (B) No, I believe Tomoko is doing that. (C) He prefers an aisle seat.",
   "transcript": "Aren't you picking up the clients from the airport?\n(A) A product demonstration.\n(B) No, I believe Tomoko is doing that.\n(C) He prefers an aisle seat.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn xác nhận liệu người nghe có đón khách hàng ở sân bay hay không, tuy nhiên nội dung của phương án này lại đề cập đến “một sự thuyết minh sản phẩm”.\n- (C) Phuong án bẫy. Phương án chứa từ “aisle seat” liên quan đến từ “airport” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "C",
   "textEn": "How was your morning client meeting? (A) It's great to meet you. (B) No, over in conference room two. (C) The contract is now officially signed.",
   "transcript": "How was your morning client meeting?\n(A) It's great to meet you.\n(B) No, over in conference room two.\n(C) The contract is now officially signed.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án sử dụng từ “meet” có phát âm gần giống với âm tiết đầu của từ phát sinh “meeting” trong câu hỏi, nhưng nội dung không phù hợp với ý hỏi.\n- _(B) Phương án bẫy. Phương án chứa từ “conference” có nghĩa tương đồng với từ “meeting” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "32. What change is a company making? (A) It is lowering some prices. (B) It is hiring more staffers. (C) It is moving to a new location. (D) It is expanding a product line.",
   "transcript": "M: The company's making a big change this year by moving offices. It's exciting that the new space will be much bigger.\nW: Yes. Do you know what the company's planning to do with our meeting tables and chairs?\nM: Well, the new location already has furniture, so we don't need them.\nW: Why don't we donate them? The Jebreen Foundation is a local organization that picks up old furniture for donation.\nM: That's a good idea. Let's talk to our directors to see what they think.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\nmoving to a new location (chuyển đến một địa điểm mới) ~ moving offices (chuyển văn phòng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, change, company\n- Dạng câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người đàn ông, \"The company's making a big change...\" (Công ty đang thực hiện một thay đổi lớn) là dấu hiệu sắp đến đáp án. \"The company's making a big change this year by moving offices.\" (Công ty đang thực hiện một thay đổi lớn trong năm nay bằng cách chuyển văn phòng.) là thông tin chứa đáp án.\ns“\"moving to anew location\" là cách diễn đạt tương đương của \"moving offices\".\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 33,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "33. What suggestion does the woman make? (A) Updating a handbook (B) Donating some furniture (C) Creating a schedule (D) Downloading a software program",
   "transcript": "M: The company's making a big change this year by moving offices. It's exciting that the new space will be much bigger.\nW: Yes. Do you know what the company's planning to do with our meeting tables and chairs?\nM: Well, the new location already has furniture, so we don't need them.\nW: Why don't we donate them? The Jebreen Foundation is a local organization that picks up old furniture for donation.\nM: That's a good idea. Let's talk to our directors to see what they think.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\ndonating some furniture (quyên góp một số đồ nội thất) ~ donate them (quyên góp chúng) (“them” ở đây thay thé cho “furniture” trong câu trước)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, suggestion, woman\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại của người dan ông nhắc đến “furniture” (nội thất) là dấu hiệu sắp đến đáp án. \"Why don't we donate them?\" (Tại sao chúng ta không quyên góp chúng đi?) là thông tin chứa đáp án.\n- \"donating some furniture\" là cách diễn đạt tương đương của “donate them\".\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai: Các phương án (A), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 34,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "34. What will the speakers most likely do next? (A) Train a new employee (B) Review an application (C) Check a list (D) Talk to some directors",
   "transcript": "M: The company's making a big change this year by moving offices. It's exciting that the new space will be much bigger.\nW: Yes. Do you know what the company's planning to do with our meeting tables and chairs?\nM: Well, the new location already has furniture, so we don't need them.\nW: Why don't we donate them? The Jebreen Foundation is a local organization that picks up old furniture for donation.\nM: That's a good idea. Let's talk to our directors to see what they think.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\ntalk to some directors = talk to our directors: nói chuyện với giám đốc\nCách định vi vùng thông tin chứa đáp án:\nTừ khóa trong câu hỏi: what, speaker, most likely\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người đàn ông, “Let's...” (Hãy cùng...) là dấu hiệu sắp đến đáp án. \"Let's talk to our directors to see what they think.\" (Hãy nói chuyện với các giám đốc của chúng ta dé xem họ nghĩ gi.) là thông tin chứa đáp án.\n- \"talk to some directors\" là cách diễn đạt tương đương của \"talk to our directors\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- make a change (collo): tạo ra một sự thay đổi\n- location (n): vị tri\n- furniture (n): nội thất\n- donate (vì: quyên góp\n- foundation (n): nền tảng\n- local (adj): thuộc về địa phương\n- organization (n): sự tổ chức\n- director (n): giám đốc"
  },
  {
   "number": 35,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "35. Who most likely are the women? (A) Company executives (B) Journalists (C) Health-care professionals (D) Safety inspectors",
   "transcript": "M: Welcome! I'm excited to show you both around the Southeast Medical Trade Show.\nW1: Thanks for allowing us to cover the event for our newspaper. We really wanted to interview you as the organizer.\nW2: Yes. How many people are you expecting to attend this trade show?\nM: I'm pleased to report that registration has increased this year. We have over 2,000 participants.\nW2: That's impressive.\nM: It's our best turnout yet.\nW1: Actually, before we go into the main room, can we get a photo of you in front of the poster for the show? The one on that wall?\nM: Certainly!",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, most likely, women\n- Dạng câu hỏi: ngụ ý\n- Lời thoại đầu tiên của người phụ nữ nhắc đến “newspaper” (tờ báo) là dấu hiệu sắp đến đáp án. \"Thanks for allowing us to cover the event for our newspaper. We really wanted to interview you as the organizer. \" (Cảm ơn đã cho phép chúng tôi đưa tin về sự kiện này cho báo của chúng tôi. Chúng tôi thực sự muốn phỏng vấn anh với tư cách là người tổ chức.) là thông tin chứa đáp án.\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) không phù hợp"
  },
  {
   "number": 36,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "36. What does the man say he is pleased about? (A) The number of event participants (B) The amount of money raised (C) The quality of vendors (D) The variety of presentations",
   "transcript": "M: Welcome! I'm excited to show you both around the Southeast Medical Trade Show.\nW1: Thanks for allowing us to cover the event for our newspaper. We really wanted to interview you as the organizer.\nW2: Yes. How many people are you expecting to attend this trade show?\nM: I'm pleased to report that registration has increased this year. We have over 2,000 participants.\nW2: That's impressive.\nM: It's our best turnout yet.\nW1: Actually, before we go into the main room, can we get a photo of you in front of the poster for the show? The one on that wall?\nM: Certainly!",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\nThe number of event participants (số lượng người giam gia sự kiện) = registration (sự dang ki)\nCách định vi vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, man, pleased\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại của người đàn ông, “I'm pleased...” (Tôi hài lòng...) là dấu hiệu sắp đến đáp án. \"I'm pleased to report that registration has increased this year.\" (Tôi rất vui mừng thông báo rằng đăng ký đã tăng lên trong năm nay.) là thông tin chứa đáp án.\n- \"The number of event participants\" là cách diễn đạt tương đương của “registration”.\n→ Phương án (A) la phù hợp nhất.\nLoại phương án sai: Các phương án (B), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 37,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "37. What will the women do next? (A) Watch a demonstration (B) Get some refreshments (C) Register for an event (D) Take a photograph",
   "transcript": "M: Welcome! I'm excited to show you both around the Southeast Medical Trade Show.\nW1: Thanks for allowing us to cover the event for our newspaper. We really wanted to interview you as the organizer.\nW2: Yes. How many people are you expecting to attend this trade show?\nM: I'm pleased to report that registration has increased this year. We have over 2,000 participants.\nW2: That's impressive.\nM: It's our best turnout yet.\nW1: Actually, before we go into the main room, can we get a photo of you in front of the poster for the show? The one on that wall?\nM: Certainly!",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\nTake a photograph = get a photo: chụp một bức ảnh\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, will, women\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người phụ nữ, “before we go into the main room...” (trước khi chúng ta đi vào phòng chính...) là dấu hiệu sắp đến đáp án. \"before we go into the main room, can we get a photo of you in front of the poster for the show?\" (trước khi chúng ta vào phòng chính, chúng tôi có thể chụp một bức ảnh của anh trước poster của triển lãm không?) là thông tin chứa đáp án.\n- \"Take a photograph\" là cách diễn đạt tương đương của \"get a photo\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (C) phuong án bẫy vì có nhắc đến \"register\", “event” trong bài nói nhưng không phù hợp ý hỏi.\n- Cac phương án (A), (B) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- medical trade show (np): triển lãm thương mại y tế - allow (v): cho phép\n- cover (v): che phủ\n- organizer (n): người tổ chức\n- registration (n): sự đăng kí\n- increase (v): tăng\n- participant (n): người tham gia\n- impressive (adj): ấn tượng\n- turnout (n): sự có mặt\n- actually (adv): thực ra\n- certainly (adv): chắc chắn"
  },
  {
   "number": 38,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "38. What most likely is the woman's job? (A) Professional chef (B) Bank executive (C) Administrative assistant (D) Web designer",
   "transcript": "W: Murad, I need your help. Can you spare 30 minutes?\nM: I have some time after lunch. How can I help?\nW: As you know, fve been redesigning Ace Bancorp's Web site to add new online banking functions.\nM: This is the client that wanted streamlined menus on their home page too, right?\nW: Yes. I wonder whether you could test out the redeveloped site for me.\nM: I can do that. Why don't you send me a list of the specific updates you made? I'll make sure I check those.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, most likely, woman, job\n- Dang câu hỏi: ngụ ý\n- Lời thoại của người phụ nữ nhắc đến “redesigning” (thiết kế lại) là dấu hiệu sắp đến đáp an. “I've been redesigning Ace Bancorp's Web site to add new online banking functions.\" (Tôi đã thiết kế lại trang web của Ace Bancorp để bổ sung thêm các chức năng ngân hàng trực tuyến mới.) là thông tin chứa đáp án.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (C) phuong án bẫy vì có nhắc đến \"bank\" liên quan đến “banking functions” trong bài nói nhưng nội dung cả bài không phù hợp ý hỏi.\n- Các phương an (A), (C) không phù hợp"
  },
  {
   "number": 39,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "39. What will the man most likely do? (A) Buy some materials from the woman (B) Check the woman's work (C) List investment options (D) Update some client information",
   "transcript": "W: Murad, I need your help. Can you spare 30 minutes?\nM: I have some time after lunch. How can I help?\nW: As you know, fve been redesigning Ace Bancorp's Web site to add new online banking functions.\nM: This is the client that wanted streamlined menus on their home page too, right?\nW: Yes. I wonder whether you could test out the redeveloped site for me.\nM: I can do that. Why don't you send me a list of the specific updates you made? I'll make sure I check those.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\ncheck the woman's work (kiểm tra công việc của người phụ nữ). = test out the redeveloped site for me (kiểm tra trang web đã được tái phát triển cho tôi) (đây là lời thoại của người phụ nữ)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, will, man, most likely\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người phụ nữ, \"| wonder whether you could test out the redeveloped site for me.” (Tôi tự hỏi liệu bạn có thể kiểm tra trang web được phát triển lại cho tôi không.) là dấu hiệu sắp đến đáp án. Câu trả lời của người đàn ông \"l can do that\" (Tôi có thể làm điều đó.) là thông tin chứa đáp án.\n- “check the woman's work\" là cách diễn đạt tương đương của \"test out the redeveloped site for me”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nnou\n- (D) phuong án bẫy vì có nhắc đến “update”, “client” trong bài nói nhưng nội dung cả bài không đề cập đến việc “cập nhật thông tin khách hàng”.\n- Cac phương án (A), (C) chứa thông tin không được đề cập"
  },
  {
   "number": 40,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "40. What will the woman most likely send to the man? (A) A cost estimate (B) A revised schedule (C) A building plan (D) A list of changes",
   "transcript": "W: Murad, I need your help. Can you spare 30 minutes?\nM: I have some time after lunch. How can I help?\nW: As you know, fve been redesigning Ace Bancorp's Web site to add new online banking functions.\nM: This is the client that wanted streamlined menus on their home page too, right?\nW: Yes. I wonder whether you could test out the redeveloped site for me.\nM: I can do that. Why don't you send me a list of the specific updates you made? I'll make sure I check those.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\na list of changes (một danh sách các thay đổi) ~ a list of specific updates (một danh sách các cập nhật cụ thể)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, women, most likely, send, man\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người đàn ông, “Why don't you send me...” (Sao bạn không gửi cho tôi...” là dấu hiệu sắp đến đáp án. \"Why don't you send me a list of the specific updates you made?\" (Tại sao bạn không gửi cho tôi danh sách các cập nhật cụ thể mà bạn đã thực hiện?) là thông tin chứa đáp án.\n- “a list of changes\" là cách diễn đạt tương đương cua “a list of specific updates” → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- spare (v): dự phòng\n- add (v): thêm vào\n- function (n): chức năng\n- streamline (v): sắp xếp hợp lí s redevelop (v): tái phát triển s specific (adj): cụ thể"
  },
  {
   "number": 41,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "41. Why is a train platform closed? (A) Safety inspections are being conducted. (B) New escalators are being installed. (C) Tracks are being repaired (D) Waiting areas are being remodeled.",
   "transcript": "M: Excuse me. I'm trying to catch a train from this platform, but I've been waiting, and no train has arrived.\nW: Oh, yes. Unfortunately, some tracks are being repaired, so no trains are departing from this platform.\nM: I see. I had no idea this was happening. And I'm upset that now I'm late for an appointment.\nW: Well, they're providing free bus service to the next few stations. You can catch a shuttle bus from the south side of the station.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\nTracks are being repaired ~ some tracks are being repaired: đường ray đang được sửa chữa\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, train platform, closed\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người đàn ông, \" no train has arrived.” (không có chuyến tàu nào đến) là dấu hiệu sắp đến đáp án. \"Unfortunately, some tracks are being repaired, so no trains are departing from this platform.\" (Thật không may, một số đường ray dang được sửa chữa nên không có chuyến tàu nào khởi hành từ sân ga này.) là thông tin chứa đáp án.\n- “Tracks are being repaired” là cách diễn đạt tương đương của “some tracks are being repaired”\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 42,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "42. What does the man say he is upset about? (A) Misunderstanding some instructions (B) Being late for an appointment (C) Losing a travel pass (D) Boarding the wrong train",
   "transcript": "M: Excuse me. I'm trying to catch a train from this platform, but I've been waiting, and no train has arrived.\nW: Oh, yes. Unfortunately, some tracks are being repaired, so no trains are departing from this platform.\nM: I see. I had no idea this was happening. And I'm upset that now I'm late for an appointment.\nW: Well, they're providing free bus service to the next few stations. You can catch a shuttle bus from the south side of the station.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\nlate for an appointment: trễ một cuộc hẹn\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, upset\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại của người đàn ông, “I'm upset that...” (Tôi rất buồn là...) là dấu hiệu sắp đến đáp án. \"I'm upset that now I'm late for an appointment.\" (Tôi rất buồn vì bây giờ tôi đã trễ hẹn.) là thông tin chứa đáp án.\n- Cùng cách diễn đạt \"late for an appointment\".\n~ Phương án (B) là phù hợp nhất. Loại phương án sai: s (D) phuong án bẫy vì có nhắc đến \"train\" trong bài nói nội dung cả bài không đề cập tới việc \"lên nhầm chuyến tàu”.\n- Cac phương án (A), (C) chứa thông tin không được đề cập"
  },
  {
   "number": 43,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "43. What will the man most likely do next? (A) Purchase a snack (B) Take a shuttle bus (C) File a complaint (D) Download a map",
   "transcript": "M: Excuse me. I'm trying to catch a train from this platform, but I've been waiting, and no train has arrived.\nW: Oh, yes. Unfortunately, some tracks are being repaired, so no trains are departing from this platform.\nM: I see. I had no idea this was happening. And I'm upset that now I'm late for an appointment.\nW: Well, they're providing free bus service to the next few stations. You can catch a shuttle bus from the south side of the station.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\ntake a shuttle bus ~ catch a shuttle bus: bắt chuyến xe buýt ngắn\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, most likely\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời gợi ý trong lời thoại cuối cùng của người phụ nữ, “You can catch a shuttle bus from the south side of the station.\" (Bạn có thể bắt xe buýt đưa đón từ phía nam của nhà ga.) là thông tin chứa đáp án.\n- \"take a shuttle bus\" là cách diễn đạt tương đương của \"catch a shuttle bus\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- unfortunately (adv): không may\n- repair (v): sửa chữa\n- depart (v): khởi hành\n- upset (adj): buồn\n- appointment (n): cuộc hen\n- provide (v): cung cấp"
  },
  {
   "number": 44,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "44. Why does the man call the woman? (A) To provide an update on his project (B) To get approval on some design changes (C) To receive the woman's feedback on a prototype (D) To persuade the woman to invest in his business",
   "transcript": "M: Thanks for taking my call, Ms. Hazarika.\nW: I understand from your e-mail that you're looking for investors in your business.\nM: Yes. Storing bikes in small apartments is tough. That's why I've developed this space-saving bicycle rack.\nW: I've seen other indoor bike racks-what's unique about yours?\nM: Most indoor racks are one size. But not all bikes are the same. My product can be adjusted to suit different types of bicycles.\nW: That's interesting. Send me your business model. I need to determine if you have a reasonable plan for expanding production and increasing sales before I make any decisions.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\npersuade the woman to invest in his business (thuyết phục người phụ nữ đầu tư vào doanh nghiệp của anh ấy) = look for investors in your business (tìm kiếm nha đầu tư cho doanh nghiệp của bạn)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, man, call, woman\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người đàn ông, \"Thanks for taking my call, Ms. Hazarika.” (Cảm ơn đã nhận cuộc gọi của tôi, cô Hazarika.) là dấu hiệu sắp đến dap án. \"| understand from your e-mail that you're looking for investors in your business.\" (Qua email của bạn, tôi hiểu rằng bạn dang tim kiếm nhà đầu tu cho doanh nghiệp của mình.) là thông tin chứa đáp án.\n- “persuade the woman to invest in his business” là cách diễn đạt tương đương của “look for investors in your business”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập"
  },
  {
   "number": 45,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "45. According to the man, what is unique about a product? (A) It is inexpensive. (B) It is easy to assemble. (C) It is adjustable. (D) It is lightweight.",
   "transcript": "M: Thanks for taking my call, Ms. Hazarika.\nW: I understand from your e-mail that you're looking for investors in your business.\nM: Yes. Storing bikes in small apartments is tough. That's why I've developed this space-saving bicycle rack.\nW: I've seen other indoor bike racks-what's unique about yours?\nM: Most indoor racks are one size. But not all bikes are the same. My product can be adjusted to suit different types of bicycles.\nW: That's interesting. Send me your business model. I need to determine if you have a reasonable plan for expanding production and increasing sales before I make any decisions.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương: adjustable ~ can be adjusted: có thể điều chỉnh được\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, what, unique, product\n- Dang câu hỏi: thông tin chi tiết\n- Dua vào câu hỏi của người phụ nữ, \"what's unique about yours?” (giá để xe của bạn có gì độc đáo?) là dấu hiệu sắp đến đáp án. \"My product can be adjusted to suit different types of bicycles.\" (Sản phẩm của tôi có thể được điều chỉnh để phù hợp với các loại xe đạp khác nhau.) là thông tin chứa đáp án.\nsổ \"adjustable\" là cách diễn đạt tương đương của \"can be adjusted\".\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai: Các phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 46,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "46. Why does the woman request some documents? (A) To open a customer account (B) To issue a certificate (C) To make some copies (D) To evaluate a proposal",
   "transcript": "M: Thanks for taking my call, Ms. Hazarika.\nW: I understand from your e-mail that you're looking for investors in your business.\nM: Yes. Storing bikes in small apartments is tough. That's why I've developed this space-saving bicycle rack.\nW: I've seen other indoor bike racks-what's unique about yours?\nM: Most indoor racks are one size. But not all bikes are the same. My product can be adjusted to suit different types of bicycles.\nW: That's interesting. Send me your business model. I need to determine if you have a reasonable plan for expanding production and increasing sales before I make any decisions.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\nevaluate a proposal (đánh giá một đề xuất) ~ determine if you have a reasonable plan (xác định xem ban có kế hoạch hợp lí)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, woman, request, documents\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người phụ nữ, “send me your business model” (Gửi cho tôi mô hình kinh doanh của bạn.) là dấu hiệu sắp đến đáp án. \"| need to determine if you have a reasonable plan for expanding production and increasing sales before | make any decisions.\" (Tôi cần xác định xem bạn có kế hoạch hợp lý để mở rộng sản xuất và tăng doanh số bán hàng hay không trước khi tôi đưa ra bất kỳ quyết định nào.) là thông tin chứa đáp án.\n- \"evaluate a proposal\" là cách diễn đạt tương đương của \"determine if you have a reasonable plan\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- investor (n): nha đầu tư\n- store (n): cửa hàng\n- develop (v): phát triển\n- space-saving (adj): tiết kiệm không gian\n- rack(n): giá đỡ\n- indoor (adj): trong nhà\n- adjust (v): điều chỉnh\n- suit (vì: phù hợp\n- determine (v): quyết định\n- reasonable (adj); hợp lí\n- expand (v): mở rộng\n- production (n): sản xuất\n- increase (v): tăng\n- make a decision (collo): đưa ra một quyết định"
  },
  {
   "number": 47,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "47. What are the speakers preparing for? (A) A construction-site visit (B) A safety inspection (C) An interview (D) A film festival",
   "transcript": "W: Alberto, it's time to leave the studio and head over to the central bank for our interview with the director.\nM: Yes, I have all the cameras we'll need today.\nW: Great. And make sure you have the special low-light lenses. I'm concerned about the poor lighting at the bank. It's pretty dark in there, and that can ruin our key interview shots.\nM: Oh, yes. I have those. And by the way. our new intern Marcel Lambert is interested in joining us.\nW: That's a good idea. It'll be a good experience for him.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\nprepare for (chuẩn bị cho) # it’s time to do (đến lúc làm)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speakers, preparing\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người phụ nữ, “it's time to...” (đến lúc...) là dấu hiệu sắp đến đáp án. \"it's time to leave the studio and head over to the central bank for our interview with the director.\" (đã đến lúc rời trường quay và đến ngân hàng trung ương để phỏng vấn đạo diễn.) là thông tin chứa đáp án.\n- “prepare for” là cách diễn đạt tương đương của “it’s time to do”\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 48,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "48. What is the woman concerned about? (A) A lighting issue (B) A script mistake (C) A material shortage (D) A revenue decrease",
   "transcript": "W: Alberto, it's time to leave the studio and head over to the central bank for our interview with the director.\nM: Yes, I have all the cameras we'll need today.\nW: Great. And make sure you have the special low-light lenses. I'm concerned about the poor lighting at the bank. It's pretty dark in there, and that can ruin our key interview shots.\nM: Oh, yes. I have those. And by the way. our new intern Marcel Lambert is interested in joining us.\nW: That's a good idea. It'll be a good experience for him.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\na lighting issue (một vấn đề ánh sang) = the poor lighting (ánh sáng yếu)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, concerned\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại của người phụ nữ, \"I'm concerned about...” (Tôi lo lắng về...) là dấu hiệu sắp đến đáp án. \"I'm concerned about the poor lighting at the bank\" (Tôi lo lắng về ánh sáng kém ở ngân hang.) là thông tin chứa đáp án.\n- \"a lighting issue\" là cách diễn đạt tương đương của \"the poor lighting\".\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 49,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "49. Who is Marcel Lambert? (A) A company accountant (B) A possible client (C) A supervisor (D) An intern",
   "transcript": "W: Alberto, it's time to leave the studio and head over to the central bank for our interview with the director.\nM: Yes, I have all the cameras we'll need today.\nW: Great. And make sure you have the special low-light lenses. I'm concerned about the poor lighting at the bank. It's pretty dark in there, and that can ruin our key interview shots.\nM: Oh, yes. I have those. And by the way. our new intern Marcel Lambert is interested in joining us.\nW: That's a good idea. It'll be a good experience for him.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, Marcel Lambert\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người đàn ông, “our new intern Marcel Lambert is interested in joining us.\" là thông tin chứa đáp án.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- head over to (phr verb): đi đến, hướng tới\n- director (n): giám đốc\n- low-light (adj): ánh sáng yếu\n- ruin (v): phá hủy\n- experience (n): trải nghiệm"
  },
  {
   "number": 50,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "50. What does the woman thank the man for? (A) Distributing some fliers (B) Completing some calculations (C) Placing a catering order (D) Preparing some paper copies",
   "transcript": "W: Waseem, I know you've been very busy this morning, but So did you have time to take care of the photocopies I asked for?\nM: Oh, yes, those are all ready.\nW: Excellent! Thanks. By the way, how are the preparations coming along for Sabine Hoffman's retirement party?\nM: Great. I've booked a room and invited everyone on our team to the event. III call the caterer next.\nW: You know, I'm sure she would love to celebrate with her former colleagues from other teams as well, if it's not too much trouble to invite them.\nM: Sure. I booked conference room B, but I'll go ahead and change that.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\npreparing some paper copies (chuẩn bị một số bản sao giấy) ~ take care of the photocopies (lo liệu các bản sao)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, thank, man\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào câu hỏi đầu tiên của người phụ nữ, “did you have time to take care of the photocopies | asked for?.” ( bạn có thời gian để lo liệu những ban sao tôi yêu cầu được không?) là dấu hiệu sắp đến đáp án. Câu trả lời của người đàn ông \"Oh, yes, those are all ready.\" (O vâng, tất cả đã sẵn sàng rồi) là thông tin chứa đáp án.\n- “preparing some paper copies\" là cách diễn đạt tương đương của “take care of the photocopies”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n(C) phương án bẫy vì có nhắc đến \"a catering order\" liên quan tới các từ \"book a room\", \"catererr\" và “reservation” trong bài nói nhưng không phù hợp ý hỏi.\nCác phương án (A), (B) chứa thông tin không được đề cập"
  },
  {
   "number": 51,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "51. Why is a gathering being planned? (A) A colleague was promoted. (B) The company won an award. (C) A colleague will be retiring (D) The company will be training employees.",
   "transcript": "W: Waseem, I know you've been very busy this morning, but So did you have time to take care of the photocopies I asked for?\nM: Oh, yes, those are all ready.\nW: Excellent! Thanks. By the way, how are the preparations coming along for Sabine Hoffman's retirement party?\nM: Great. I've booked a room and invited everyone on our team to the event. III call the caterer next.\nW: You know, I'm sure she would love to celebrate with her former colleagues from other teams as well, if it's not too much trouble to invite them.\nM: Sure. I booked conference room B, but I'll go ahead and change that.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\na colleague will be retiring (một đồng nghiệp sẽ nghỉ hưu) ~ Sabine Hoffman's retirement party (tiệc nghỉ hưu của Sabine Hoffman)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, gathering, planned\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào câu hỏi của người phụ nữ, \"how are the preparations...” (sự chuẩn bị như thế nào...?) là dấu hiệu sắp đến đáp án. \"how are the preparations coming along for Sabine Hoffman's retirement party?\" (việc chuẩn bị cho bữa tiệc nghỉ hưu của Sabine Hoffman thế nào rồi?) là thông tin chứa đáp án.\n- \"a colleague will be retiring\" là cách diễn đạt tương đương của \"Sabine Hoffman's retirement party\".\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai: Các phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 52,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "52. What does the man imply when he says, \"I booked conference room B\"? (A) A room is too small. (B) An invitation is incorrect. (C) No other conference rooms were available. (D) Another administrative assistant was too busy.",
   "transcript": "W: Waseem, I know you've been very busy this morning, but So did you have time to take care of the photocopies I asked for?\nM: Oh, yes, those are all ready.\nW: Excellent! Thanks. By the way, how are the preparations coming along for Sabine Hoffman's retirement party?\nM: Great. I've booked a room and invited everyone on our team to the event. III call the caterer next.\nW: You know, I'm sure she would love to celebrate with her former colleagues from other teams as well, if it's not too much trouble to invite them.\nM: Sure. I booked conference room B, but I'll go ahead and change that.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, imply, \"| booked conference room B“\n- Dạng câu hỏi: ngụ ý\n- Dựa vào lời thoại cuối cùng của người phụ nữ, “I'm sure she would love to celebrate with her former colleagues from other teams as well” (Tôi chắc rằng cô ấy cũng muốn ăn mừng cùng các đồng nghiệp cũ của mình từ các đội khác), ta có thể rút ra rằng số người dự tiệc có thể nhiều hơn dự kiến ban đầu nên cần đổi một căn phòng lớn hơn.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) không phù hợp\nTừ vựng cần Lưu ý:\n- take care of (phr vern): lo liệu\n- photocopy (n): bản sao\ns_ preparation (n): sự chuẩn bị\n¢« come along (phr verb): đi cùng\n- retirement (n): sự nghỉ hưu\n- book (v): đặt trước\n- celebrate (vì: ăn mừng\n- former (adj): trước đó\n- colleague (n): đồng nghiệp\n- conference room (np): phòng họp"
  },
  {
   "number": 53,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "53. What type of event is the man planning? (A) A retirement banquet (B) A company retreat (C) A press conference (D) A fund-raiser",
   "transcript": "M: Hi. I'm Kota Ogawa from Langston Limited. lhave an appointment with Ms. Ishikawa to view your hotel facilities for my company's upcoming retreat.\nW1: I know that she's been expecting you, and she just wrapped up an urgent phone call. She's on her way now.\nW2: Hi. You must be Mr. Ogawa. I'm Hikaru Ishikawa. Why don't we see our largest conference room first?\nM: Great. And Id also like to look at the guest rooms. All the rooms have a high-speed Internet connection, right?\nW2: Yes, and we have a fully equipped recreation area as well.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\na company rereat (kì nghỉ dưỡng của công ty) ~ my companys upcoming retreat (kì nghỉ dưỡng sắp tới của công ty tôi)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what type, event, man, planning\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người đàn ông, “| have an appointment with Ms. Ishikawa to view your hotel facilities for my company's upcoming retreat.\" (Tôi có hẹn với cô Ishikawa để xem cơ sở vật chất khách san của ban cho kỳ nghỉ dưỡng sắp tới của công ty tôi.) là thông tin chứa đáp án.\n- “acompany retreat” là cách diễn đạt tương đương của “my company’s upcoming retreat”\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 54,
   "part": 3,
   "answer": "D",
   "group": "53-55",
   "textEn": "54. Why was Ms. Ishikawa delayed? (A) She was stuck in traffic. (B) She was at lunch. (C) She was setting up a room. (D) She was on the phone.",
   "transcript": "M: Hi. I'm Kota Ogawa from Langston Limited. lhave an appointment with Ms. Ishikawa to view your hotel facilities for my company's upcoming retreat.\nW1: I know that she's been expecting you, and she just wrapped up an urgent phone call. She's on her way now.\nW2: Hi. You must be Mr. Ogawa. I'm Hikaru Ishikawa. Why don't we see our largest conference room first?\nM: Great. And Id also like to look at the guest rooms. All the rooms have a high-speed Internet connection, right?\nW2: Yes, and we have a fully equipped recreation area as well.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\non the phone (nghe điện thoại) ~ wrapped up an urgent phone call (kết thúc một cuộc gọi khẩn cấp)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, Ms.Ishikawa, delayed\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại của người phụ nữ, “She's on her way now.\" (Cô ấy hiện đang trên đường) là dấu hiệu của đáp án. \"she just wrapped up an urgent phone call.\" (cô ấy mới kết thúc một cuộc gọi khẩn cấp) là thông tin chứa đáp án.\n- \"on the phone\" là cách diễn đạt tương đương của \"wrapped up an urgent phone call\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập"
  },
  {
   "number": 55,
   "part": 3,
   "answer": "D",
   "group": "53-55",
   "textEn": "55. What does the man inquire about? (A) An airport shuttle (B) Late checkout (C) A fitness center (D) Internet capabilities",
   "transcript": "M: Hi. I'm Kota Ogawa from Langston Limited. lhave an appointment with Ms. Ishikawa to view your hotel facilities for my company's upcoming retreat.\nW1: I know that she's been expecting you, and she just wrapped up an urgent phone call. She's on her way now.\nW2: Hi. You must be Mr. Ogawa. I'm Hikaru Ishikawa. Why don't we see our largest conference room first?\nM: Great. And Id also like to look at the guest rooms. All the rooms have a high-speed Internet connection, right?\nW2: Yes, and we have a fully equipped recreation area as well.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\ninternet capabilities (khả năng kết nối mang) = high-speed Internet connection (kết nối mạng tốc độ cao)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, inquire\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào câu hỏi cuối cùng của người đàn ông, “All the rooms have a high-speed Internet connection, right?” (Tất cả các phòng đều có kết nối mạng tốc độ cao phải không?) là thông tin chứa đáp án.\n- \"internet capabilities\" là cách diễn đạt tương đương của \"high-speed Internet connection\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- appointment (n): cuộc hen\n- upcoming (adj): sắp tới\n- retreat (n): sự nghỉ dưỡng\n- expect (vì: mong đợi\n- wrap up (phr verb): kết thúc\n- urgent (adj): cấp thiết\n- connection (n): sự kết nối\n- fully equipped (collo): trang bị đầy đủ"
  },
  {
   "number": 56,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "56. Where does the conversation most likely take place? (A) At a restaurant (B) At a shipping dock (C) At a farm (D) At a supermarket",
   "transcript": "W: Look at these results! Sales of pineapples have gone up a lot this month at our store.\nM: It must be the pineapple-peeling machine we installed in the fruit aisle. Customers ike watching it peel and slice their pineapple for them.\nW: It is a unique experience. I think we should install one in our other two store branches.\nM: I'm not sure about that. I think the novelty will wear off in a few weeks. Let's wait to see if sales numbers stay high before we invest in any more.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\nsupermarket (siêu thi) = store (cửa hang)\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: where, conversation, take place\n- Dạng câu hỏi: ngụ ý\n- Dựa vào lời thoại đầu tiên của người phụ nữ, “Sales of pineapples have gone up a lot this month at our store.\" (Doanh số bán dứa tháng này tại cửa hàng của chúng tôi đã tăng lên rất nhiều.), ta có thể thấy “doanh số bán dứa”, “cửa hàng” liên quan tới “siêu thị”.\n- “supermarket” là cách diễn đạt tương đương của “store”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) không phù hợp"
  },
  {
   "number": 57,
   "part": 3,
   "answer": "B",
   "group": "56-58",
   "textEn": "57. What does the man say is popular? (A) A colorful package design (B) A self-service machine (C) A same-day delivery service (D) A television advertisement",
   "transcript": "W: Look at these results! Sales of pineapples have gone up a lot this month at our store.\nM: It must be the pineapple-peeling machine we installed in the fruit aisle. Customers ike watching it peel and slice their pineapple for them.\nW: It is a unique experience. I think we should install one in our other two store branches.\nM: I'm not sure about that. I think the novelty will wear off in a few weeks. Let's wait to see if sales numbers stay high before we invest in any more.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\n- popular (phổ biến) = like (thích\n- self-service machine (máy tự phục vụ) ~ pineapple-peeling machine (máy gọt vỏ dứa)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, popular\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại của người dan ông, “Customers like...” (Khách hàng thích...) là dấu hiệu của đáp án. “It must be the pineapple-peeling machine we installed in the fruit aisle. Customers like watching it peel and slice their pineapple for them.\" (Chắc hẳn là chiếc máy gọt vỏ dứa mà chúng tôi lắp đặt ở lối đi bán trái cây. Khách hàng thích xem người ta gọt vỏ và cắt dứa cho ho.) là thông tin chứa đáp án.\n- “popular” là cách diễn đạt tương đương của “like”, \"self-service machine\" là cách diễn đạt tương đương của \"pineapple-peeling machine\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 58,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "58. What does the man suggest doing? (A) Waiting for some data (B) Issuing a refund (C) Hiring more staff (D) Rearranging some merchandise",
   "transcript": "W: Look at these results! Sales of pineapples have gone up a lot this month at our store.\nM: It must be the pineapple-peeling machine we installed in the fruit aisle. Customers ike watching it peel and slice their pineapple for them.\nW: It is a unique experience. I think we should install one in our other two store branches.\nM: I'm not sure about that. I think the novelty will wear off in a few weeks. Let's wait to see if sales numbers stay high before we invest in any more.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\nwaiting for some data (chờ một số dữ liệu) ~ wait to see if sales numbers stay high (chờ xem doanh số bán hàng có giữ ở mức cao)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, suggest\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào câu hỏi cuối cùng của người đàn ông, “Let's...” (Cấu trúc gợi ý hãy cùng làm gì) là dấu hiệu sắp đến đáp án. “Let's wait to see if sales numbers stay high before we invest in any more.” (Hãy chờ xem doanh số bán hàng có giữ ở mức cao trước khi chúng ta đầu tư thêm) là thông tin chứa đáp án.\n- \"waiting for some data\" là cách diễn đạt tương đương của \"wait to see if sales numbers stay high\".\n→ Phương án (A) la phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- peel (v): got vỏ\n- install (v): lắp đặt\n- aisle (n): lối đi\n- slice (v): cắt lát\n- unique (adj): độc dao\n- branch (n): chi nhánh\n- novelty (n): sự mới lạ\n- wear off (phr verb): hao mon\n- invest (v): đầu tư"
  },
  {
   "number": 59,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "59. What are the speakers discussing? (A) Relocating their office (B) Attracting new patients (C) Scheduling appointments (D) Finding qualified staff",
   "transcript": "M: Ingrid, we've had three patients this week who had to cancel their dental appointments at the last minute.\nW: yes, that's a problem. Other patients might have taken those available appointments if we'd been able to contact them in time.\nM: You know, I have an idea. I recently scheduled a doctor's visit online, and there was an option to receive a text-message notification if an earlier slot became available. You just have to check a box. What do you think about something like that?\nW: That would be helpful. I have some time this afternoon. I'll look into software packages that include that feature.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vi vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, speakers, discussing\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại đầu tiên của người đàn ông và người phụ nữ đều nhắc đến “appointments” (cuộc hen). \"we've had three patients this week who had to cancel their dental appointments at the last minute. - Yes, that's a problem. Other patients might have taken those available appointments if we'd been able to contact them in time.\" (tuần này chúng tôi có ba bệnh nhân phải hủy cuộc hen khám răng vào phút cuối. - Vâng, đó là một vấn đề. Những bệnh nhân khác có thể đã nhận những cuộc hẹn có sẵn đó nếu chúng tôi có thể liên hệ với họ kịp thời.) là thông tin chứa đáp án.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 60,
   "part": 3,
   "answer": "D",
   "group": "59-61",
   "textEn": "60. Why does the man say, \"You just have to check a box\"? (A) To request some performance feedback (B) To express concern about a procedure (C) To correct a misunderstanding (D) To support a suggestion",
   "transcript": "M: Ingrid, we've had three patients this week who had to cancel their dental appointments at the last minute.\nW: yes, that's a problem. Other patients might have taken those available appointments if we'd been able to contact them in time.\nM: You know, I have an idea. I recently scheduled a doctor's visit online, and there was an option to receive a text-message notification if an earlier slot became available. You just have to check a box. What do you think about something like that?\nW: That would be helpful. I have some time this afternoon. I'll look into software packages that include that feature.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương: suggestion (đề nghị) = idea (ý kiến)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, man, “You just have to check a box\"\n- Dang câu hỏi: ngụ ý\n- Dựa vào lời thoại của người đàn ông, “I have an idea. | recently scheduled a doctor's visit online, and there was an option to receive a text- message notification if an earlier slot became available. You just have to check a box.” (tdi có một ý tưởng. Gần day tôi đã lên lich khám bác sĩ trực tuyến và có tùy chọn nhận thông báo bằng tin nhắn văn bản nếu có chỗ trống trước đó. Bạn chỉ cần đánh dấu vào một 6\", ta có thể rút ra rằng người đàn ông có một ý tưởng và sau đấy anh ấy trình bày ý tưởng của mình.\n- \"suggestion\" là cách diễn đạt tương đương của \"idea\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 61,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "61. What does the woman offer to do this afternoon? (A) Investigate options (B) Revise a budget (C) Contact a patient (D) Update a Web Site",
   "transcript": "M: Ingrid, we've had three patients this week who had to cancel their dental appointments at the last minute.\nW: yes, that's a problem. Other patients might have taken those available appointments if we'd been able to contact them in time.\nM: You know, I have an idea. I recently scheduled a doctor's visit online, and there was an option to receive a text-message notification if an earlier slot became available. You just have to check a box. What do you think about something like that?\nW: That would be helpful. I have some time this afternoon. I'll look into software packages that include that feature.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn dat tương đương:\ninvestigate options (xem xét các lựa chọn) = look into software packages (xem xét các gói phần mềm)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, offer, afternoon\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào câu hỏi cuối cùng của người đàn ông, \"I have some time this afternoon (Tôi có chút thời gian chiều nay) là dấu hiệu sắp đến đáp án. “I'll look into software packages that include that feature.” (Tôi sẽ xem xét các gói phần mềm có tính năng đó.) là thông tin chứa đáp án.\n„\n- \"investigate options\" là cách diễn đạt tương đương của \"look into software packages\".\n→ Phương án (A) la phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- dental (adj): thuộc về nha khoa\n- appointment (n): cuộc hen\n- at the last minute (phrase): vào phút cuối s available (adj): có sẵn\n- in time (phrase): đúng giờ\n- recently (adv): gần đây\n- notification (n): thông bao\n- look into (phr verb): xem xét\n- include (v): bao gồm\n- feature (n): đặc điểm"
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Who will the man give some gifts to? (A) Conference participants (B) Employees (C) Contest winners (D) Visitors",
   "transcript": "M: Hi, Raquel. Have you had a chance to look for something I could buy the employees for the New Year? I want to be sure I thank everyone for their hard work.\nW: Well, a good quality travel mug would be appreciated.\nM: Interesting. Which one would you recommend?\nW: Take a look at this brochure. This company has a variety of designs-sea animals, sky scenes. I like the medium mug with the Desert Roaming design.\nM: That is nice. I'll sign off on that order request once you fill out the paperwork.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\ngive gifts (tặng qua) = buy the employees (mua cho nhân viên)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, man, gifts\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người dan ông, “Have you had a chance to look for something | could buy the employees for the New Year?\" (Bạn đã thử tìm kiếm thứ gi đó mà tôi có thể mua cho nhân viên nhân dịp năm mới chưa?) là thông tin chứa đáp án.\n- \"give gifts\" là cách diễn đạt tương đương của \"buy\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 63,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "63. Look at the graphic. How much is the mug that the woman likes? (A) $15 (B) $20 (C) $23 (D) $25",
   "transcript": "M: Hi, Raquel. Have you had a chance to look for something I could buy the employees for the New Year? I want to be sure I thank everyone for their hard work.\nW: Well, a good quality travel mug would be appreciated.\nM: Interesting. Which one would you recommend?\nW: Take a look at this brochure. This company has a variety of designs-sea animals, sky scenes. I like the medium mug with the Desert Roaming design.\nM: That is nice. I'll sign off on that order request once you fill out the paperwork.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, how much, mug, woman, like\n- Dang câu hỏi: liên quan bảng biểu\n- Dựa vào lời thoại của người phụ nữ, \"I like the medium mug with the Desert Roaming design.\" là thông tin chứa đáp án. Đối chiếu với bảng biểu, chiếc cốc cỡ vừa với thiết kế Desert Roaming có giá 23 đô la.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không phù hợp"
  },
  {
   "number": 64,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "64. What does the man say he will do? (A) Submit a registration form (B) Adjust a work schedule (C) Approve an order (D) Ask for a bulk-pricing rate",
   "transcript": "M: Hi, Raquel. Have you had a chance to look for something I could buy the employees for the New Year? I want to be sure I thank everyone for their hard work.\nW: Well, a good quality travel mug would be appreciated.\nM: Interesting. Which one would you recommend?\nW: Take a look at this brochure. This company has a variety of designs-sea animals, sky scenes. I like the medium mug with the Desert Roaming design.\nM: That is nice. I'll sign off on that order request once you fill out the paperwork.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\napprove an order (phê duyệt một đơn hàng) * sign off on that order request (chấp nhận yêu cầu đặt hàng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, say, will\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người đàn ông, \"I'll...\" (Tôi sẽ...) là dấu hiệu sắp đến đáp án. “I'll sign off on that order request.” (Tôi sẽ chấp nhận yêu cầu đặt hàng) là thông tin chứa đáp án.\n- \"approve an order\" là cách diễn đạt tương đương cua \"sign off on that order request”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- appreciate (v): đánh gia\n- take a look at (collo): nhìn, xem\n- avariety of (collo): nhiều\n- sign off (phr verb): chấp nhận\n- fill out (phr verb): điền vào"
  },
  {
   "number": 65,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "65. What industry do the speakers most likely work in? (A) Tourism (B) Film (C) Engineering (D) Transportation",
   "transcript": "M1: Here's the map that you requested for next week's shoot, for the driving scene.\nW: Great-let's see. The actors will be driving north on Maple Street. Hmm...\nM1: Is something wrong?\nW: We may need to alter the route so it'll be less difficult for our camera operators to follow the action.\nM1: OK. What are you thinking?\nW: Instead of turning left on Elm Lane, let's have them turn right and park in front of the hair salon.\nM2: OK. I'll arrange for that road to be closed while we're working and alert the business owners.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, industry, speakers, most likely, work\n- Dang câu hỏi: ngụ ý\n- Dựa vào lời thoại đầu tiên của người đàn ông và người phụ nữ, “Here's the map that you requested for next week's shoot, for the driving scene. - The actors will be driving north on Maple Street.” (Day là ban đồ ma bạn đã yêu cầu cho buổi chụp hình tuần tdi, cho cảnh lái xe. - Các diễn viên sẽ lái xe về hướng bắc trên phố Maple).Ta có thể rút ra rằng “driving scene (cảnh lái xe), “actors” (diễn viên) liên quan đến ngành phim ảnh.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) không phù hợp"
  },
  {
   "number": 66,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "66. Why does the woman want to make a change? (A) Some equipment is not available. (B) A new business is opening. (C) A process will be easier. (D) Costs will be lower.",
   "transcript": "M1: Here's the map that you requested for next week's shoot, for the driving scene.\nW: Great-let's see. The actors will be driving north on Maple Street. Hmm...\nM1: Is something wrong?\nW: We may need to alter the route so it'll be less difficult for our camera operators to follow the action.\nM1: OK. What are you thinking?\nW: Instead of turning left on Elm Lane, let's have them turn right and park in front of the hair salon.\nM2: OK. I'll arrange for that road to be closed while we're working and alert the business owners.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\n- make a change (tạo ra một sự thay đổi) ~ alter (thay đổi)\n- easier (dễ hơn) less difficult (ít khó hơn)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, woman, want, make a change\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại của người phụ nữ, “We may need to alter...\" (Chúng ta có thé cần thay đổi...) là dấu hiệu sắp đến đáp án. \"We may need to alter the route so it'll be less difficult for our camera operators to follow the action.\" (Chúng ta có thé cần thay đổi lộ trình để người điều khiển máy anh của chúng tôi có thể theo dõi hành động ít khó khăn hơn.) là thông tin chứa đáp án.\n- \"make a change\" là cách diễn đạt tương đương của \"alter\", \"easier\" là cách diễn đạt tương đương của “less difficult”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 67,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "67. Look at the graphic. Which road should be closed? (A) Bangalore Avenue (B) Dublin Avenue (C) Polly Street (D) Elm Lane",
   "transcript": "M1: Here's the map that you requested for next week's shoot, for the driving scene.\nW: Great-let's see. The actors will be driving north on Maple Street. Hmm...\nM1: Is something wrong?\nW: We may need to alter the route so it'll be less difficult for our camera operators to follow the action.\nM1: OK. What are you thinking?\nW: Instead of turning left on Elm Lane, let's have them turn right and park in front of the hair salon.\nM2: OK. I'll arrange for that road to be closed while we're working and alert the business owners.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, road, closed\n- Dạng câu hỏi: liên quan bản đồ\n- Dựa vào lời thoại cuối cùng của người phụ nữ và người đàn ông, “Instead of turning left on Elm Lane, let's have them turn right and park in front of the hair salon. - I'll arrange for that road to be closed while we're working and alert the business owners.\" (Thay vì rẽ trái ở Elm Lane, hãy dé ho rẽ phải và đỗ xe trước tiệm làm tóc. - Tôi sẽ sắp xếp đóng con đường đó trong khi chúng tôi làm việc và thông báo cho các chủ doanh nghiệp.) là thông tin chứa đáp án. Đối chiếu với bản đồ, con đường trước tiệm làm tóc là đại lộ Bangalore.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không phù hợp\nTừ vựng cần lưu ý:\n- shoot(v): bắn\n- route (n): tuyến đường\n- camera operator (np): người điều khiển máy quay\n- instead of (phrase): thay vi\n- arrange (v): sắp xếp\n- alert (v): báo động"
  },
  {
   "number": 68,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "68. What are the speakers preparing for? (A) A video-game convention (B) An in-store demonstration (C) A product launch (D) A focus-group session",
   "transcript": "W: Hi, Pablo. I wanted to talk to you about the video game we designed-the one we're launching soon.\nM: Sure. Did something come up?\nW: Well, I think the jungle level looks great. But in the underwater level, there's a problem with the part where the characters discover the lost city in the ocean. As I was going over the layout, I found a glitch in the game play.\nM: Oh, OK. We still have time to fix it.\nW: Yes, but we should work on it as soon as possible. I could put some extra time in over the weekend. How about you?\nM: Probably-just let me check my calendar.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\na product launch (buổi ra mắt sản phẩm) = the one we're launching soon (cái mà chúng tôi sẽ phát hành sớm)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speakers, preparing\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại đầu tiên của người phụ nữ “I wanted to talk to you about the video game we designed-the one we're launching soon.” (Tôi muốn nói chuyện với bạn về trò chơi điện tử mà chúng tôi đã thiết kế - trò chơi mà chúng tôi sẽ sớm phát hành.) là thông tin chứa đáp án.\n- \"a product launch\" là cách diễn đạt tương đương của \"the one we're lauching soon\".\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy vì có nhắc đến \"video game\", “conversation” trong bài nói có đề cập tới nhưng không phù hợp ý hỏi.\n- Cac phương án (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 69,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "69. Look at the graphic. Which level is the woman concerned about? (A) Level 1 (B) Level 2 (C) Level 3 (D) Level 4",
   "transcript": "W: Hi, Pablo. I wanted to talk to you about the video game we designed-the one we're launching soon.\nM: Sure. Did something come up?\nW: Well, I think the jungle level looks great. But in the underwater level, there's a problem with the part where the characters discover the lost city in the ocean. As I was going over the layout, I found a glitch in the game play.\nM: Oh, OK. We still have time to fix it.\nW: Yes, but we should work on it as soon as possible. I could put some extra time in over the weekend. How about you?\nM: Probably-just let me check my calendar.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, level, woman, concerned\n- Dang câu hỏi:\n- Dựa vào lời thoại của người phụ nữ, “But in the underwater level, there's a problem with the part where the characters discover the lost city in the ocean.” (Nhưng ở mức độ dưới nước, có một vấn đề ở phần các nhân vat khám phá thành phố bị mất tích dưới đại dương.) là thông tin chứa đáp án. Đối chiếu với\nbảng, mức độ dưới nước là mức độ “Ocean Kingdom” và tương đương với mức độ 2.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không phù hợp"
  },
  {
   "number": 70,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "70. What does the woman suggest doing? (A) Contacting a colleague (B) Postponing an event (C) Working over the weekend (D) Making travel arrangements",
   "transcript": "W: Hi, Pablo. I wanted to talk to you about the video game we designed-the one we're launching soon.\nM: Sure. Did something come up?\nW: Well, I think the jungle level looks great. But in the underwater level, there's a problem with the part where the characters discover the lost city in the ocean. As I was going over the layout, I found a glitch in the game play.\nM: Oh, OK. We still have time to fix it.\nW: Yes, but we should work on it as soon as possible. I could put some extra time in over the weekend. How about you?\nM: Probably-just let me check my calendar.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, suggest\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào lời thoại cuối cùng của người phụ nữ,\"we should work on it as soon as possible. | could put some extra time in over the weekend. How about you?” (chúng ta nên giải quyết nó càng sớm càng tốt. Tôi có thể dành thêm thời gian vào cuối tuần. Còn bạn thì sao?) là thông tin chứa đáp án.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (C) phuong án bẫy vì có nhắc đến \"work over the weekend\" trong bài nói nhưng không phù hợp ý hỏi.\n- Cac phương án (B), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- launch (vì: phát hành\n- discover (v): khám phá\n- go over (v): kiểm tra\n- layout (n): bố cục\n- glitch (n): trục trac\n- fix(v): sửa chữa\n- as soon as possible (phrase): sớm nhất có thể"
  },
  {
   "number": 71,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "71. What kind of business is being advertised? (A) A health-care clinic (B) A computer service store (C) An auto repair shop (D) A real estate agency",
   "transcript": "At Volkov Tire and Auto Service, We're proud to serve the Livingstone Valley area. We offer quality automotive maintenance and repairs at affordable prices. Our mechanics are the best in the industry, and our dedication to customer service shows. Once again, readers of the Livingstone Valley Chronicle have awarded us with the title of Best in the Valley. That's five years in a row! And to celebrate, we're offering ten percent off all oil changes in July. To get this deal, you must schedule an appointment, either by phone or online. Appointments are filling up fast!",
   "explanationVi": "Đáp án đúng: C\n\nLoại hình kinh doanh nào đang được quảng cáo?\n(A) Một phòng khám chăm sóc sức khỏe\n(B) Một cửa hàng dịch vụ máy tính\n(C) Một cửa hàng sửa chữa ô tô\n(D) Một đại lý bất động sản\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what kind, business, advertised.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại: “At Volkov Tire and Auto Service” va “We offer quality automotive maintenance and repairs at affordable prices.” là thông tin chứa dap án.\nNgười đàn ông bắt đầu bài nói bằng lời giới thiệu về tên cửa hang, là “Dịch vụ lốp và ô tô Volkov\", cũng như giới thiệu thêm về dịch vụ của cửa hàng, là “cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô chất lượng với giá cả phải chăng”. Đây là dấu hiệu rõ ràng cho thấy loại hình kinh doanh nào đang được quảng cáo là một cửa hàng sửa chữa ô tô.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không phù hợp.\n\nDịch bài nói:\nM-Cn [71] Tai Dich vu lép va 6 tô Volkov, chúng tôi tu hào phục vu khu vực thung lũng Livingstone. [71] Chúng tôi cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô chất lượng với giá cả phải chăng. Thợ cơ khí của chúng tôi là những người xuất sắc nhất trong ngành, và sự tận tâm của chúng tôi đối với dịch vụ khách hàng được thể hiện rất rõ. Một lần nữa, [72] độc giá của tờ Livingstone Valley Chronicle đã trao cho chúng tôi danh hiệu \"Xuất sắc nhất thung lũng\". Đây là năm thứ năm liên tiếp! Và để kỷ niệm, chúng tôi đang có chương trình giảm giá mười phần trăm cho tất cả các lần thay dầu trong tháng Bay. [73] Đề nhận ưu đãi này, bạn phải đặt lịch hẹn qua điện thoại hoặc trực tuyến. Các lịch hẹn đang được đặt rất nhanh!"
  },
  {
   "number": 72,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "72. Why is a business celebrating? (A) It has been operating for ten years. (B) It has doubled its customer base. (C) It has won an award. (D) It has opened a new location.",
   "transcript": "At Volkov Tire and Auto Service, We're proud to serve the Livingstone Valley area. We offer quality automotive maintenance and repairs at affordable prices. Our mechanics are the best in the industry, and our dedication to customer service shows. Once again, readers of the Livingstone Valley Chronicle have awarded us with the title of Best in the Valley. That's five years in a row! And to celebrate, we're offering ten percent off all oil changes in July. To get this deal, you must schedule an appointment, either by phone or online. Appointments are filling up fast!",
   "explanationVi": "Đáp án đúng: C\n\nTại sao doanh nghiệp lại tổ chức lễ kỷ niệm?\n(A) Nó đã hoạt động được mười năm.\n(B) Nó đã tăng gấp đôi lượng khách hàng của mình.\n(C) Nó đã giành được một giải thưởng.\n(D) Nó đã mở một địa điểm mới.\nCách diễn đạt tương đương:\n- has won an award = have awarded us with the title of (giành được một giải thudng)\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: why, business, celebrating.\n- Dang câu hỏi: thông tin chỉ tiết.\n- “Once again, readers of the Livingstone Valley Chronicle...” (Một lần nữa, độc gia của tờ Livingstone Valley Chronicle...) là dấu hiệu sắp đến dap an. “readers of the Livingstone Valley Chronicle have awarded us with the title of Best in the Valley.” là thông tin chứa dap an.\n- “has won an award\" là cách diễn dat tương đương của “have awarded us with the title of”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn [71] Tai Dich vu lép va 6 tô Volkov, chúng tôi tu hào phục vu khu vực thung lũng Livingstone. [71] Chúng tôi cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô chất lượng với giá cả phải chăng. Thợ cơ khí của chúng tôi là những người xuất sắc nhất trong ngành, và sự tận tâm của chúng tôi đối với dịch vụ khách hàng được thể hiện rất rõ. Một lần nữa, [72] độc giá của tờ Livingstone Valley Chronicle đã trao cho chúng tôi danh hiệu \"Xuất sắc nhất thung lũng\". Đây là năm thứ năm liên tiếp! Và để kỷ niệm, chúng tôi đang có chương trình giảm giá mười phần trăm cho tất cả các lần thay dầu trong tháng Bay. [73] Đề nhận ưu đãi này, bạn phải đặt lịch hẹn qua điện thoại hoặc trực tuyến. Các lịch hẹn đang được đặt rất nhanh!"
  },
  {
   "number": 73,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "73. What do the listeners need to do to obtain a discount? (A) Make an appointment (B) Print out a coupon (C) Attend an open house (D) Refer a friend",
   "transcript": "At Volkov Tire and Auto Service, We're proud to serve the Livingstone Valley area. We offer quality automotive maintenance and repairs at affordable prices. Our mechanics are the best in the industry, and our dedication to customer service shows. Once again, readers of the Livingstone Valley Chronicle have awarded us with the title of Best in the Valley. That's five years in a row! And to celebrate, we're offering ten percent off all oil changes in July. To get this deal, you must schedule an appointment, either by phone or online. Appointments are filling up fast!",
   "explanationVi": "Đáp án đúng: A\n\nNgười nghe cần làm gì để được nhận khuyến mãi?\n(A) Đặt lịch hẹn trước\n(B) In ra phiêu giảm giá\n(C) Tham dự một buôi khai mạc\n(D) Giới thiệu một người bạn Cách diễn đạt tương đương:\ne« make an appointment = schedule an appointment (đặt lịch hẹn trước) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listeners, need, do, obtain, discount.\n- Dang câu hỏi: thông tin chi tiết.\n- “we're offering ten percent off all oil changes in July.” (chúng tôi dang có chương trình giảm giá mười phần trăm cho tất cả các lần thay dầu trong thang Bay.) là dấu hiệu sắp đến đáp án. “To get this deal, you must schedule an appointment, either by phone or online.” là thông tin chứa đáp án.\n- “make an appointment” là cách diễn đạt tương đương của “schedule an appointment”.\n→ Phương án (A) la phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn [71] Tai Dich vu lép va 6 tô Volkov, chúng tôi tu hào phục vu khu vực thung lũng Livingstone. [71] Chúng tôi cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô chất lượng với giá cả phải chăng. Thợ cơ khí của chúng tôi là những người xuất sắc nhất trong ngành, và sự tận tâm của chúng tôi đối với dịch vụ khách hàng được thể hiện rất rõ. Một lần nữa, [72] độc giá của tờ Livingstone Valley Chronicle đã trao cho chúng tôi danh hiệu \"Xuất sắc nhất thung lũng\". Đây là năm thứ năm liên tiếp! Và để kỷ niệm, chúng tôi đang có chương trình giảm giá mười phần trăm cho tất cả các lần thay dầu trong tháng Bay. [73] Đề nhận ưu đãi này, bạn phải đặt lịch hẹn qua điện thoại hoặc trực tuyến. Các lịch hẹn đang được đặt rất nhanh!"
  },
  {
   "number": 74,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "74. What is the podcast episode about? (A) Marketing strategies (B) Commercial real estate (C) Customer loyalty (D) Staff management",
   "transcript": "Today's episode of the Financial Parade Podcast is about the possibilities and limitations of marketing on social media. How can businesses improve on their marketing efforts and do a better job of reaching their target audience? To help us answer this, we are joined by Magali Bertrand, Marketing director at Blue Lane Consulting. Ms. Bertrand is a frequent guest on the show because she is good at taking complex business principles and breaking them down to offer clear, simple advice. But first, ld like to discuss the results of my recent survey where you all shared your approaches to product placement.",
   "explanationVi": "Đáp án đúng: A\n\nTập podcast nói về cái gì?\n(A) Chiến lược tiếp thị\n(B) Bất động sản thương mại\n(C) Lòng trung thành của khách hàng\n(D) Quản lý nhân viên\nCách diễn đạt tương đương:\nmarketing strategies (chiến lược tiếp thi) = the possibilities and limitations of marketing (những kha năng va han chế của hoạt động tiếp thị)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, podcast, about.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại: “Today's episode of the Financial Parade Podcast is about the possibilities and limitations of marketing on social media.” là thông tin chứa dap an.\n- Người dan ông bắt đầu bài nói bằng lời giới thiệu về tap mới đang phát sóng của podcast tên là “Financial Parade Podcast\", và tập đó nói về những khả năng và hạn chế của hoạt động tiếp thị.\n- “marketing strategies” là cách diễn đạt tương đương của “the possibilities and limitations of marketing”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Các phương án (B), (D) chứa thông tin không phù hợp.\n- (C) phuong án bẫy, bài nói có nhắc đến từ “target audience” liên quan đến từ “customer” ở phương án, nhưng nội dung bài nói không xoay quanh lòng trung thành của khách hàng.\n\nDịch bài nói:\nM-Cn [74] Tập Podcast Financial Parade hôm nay nói về những khả năng và hạn chế của hoạt động tiếp thị trên mạng xã hội. Làm thế nào các doanh nghiệp có thể cải thiện nỗ lực tiếp thị của mình và thực hiện công việc tiếp cận đối tượng mục tiêu tốt hơn? Đề giúp chúng ta trả lời câu hỏi nay, chúng ta có sự tham gia của Magali Bertrand, Giám đốc Tiếp thi tại Blue Lane Consulting. [75] Cô Bertrand là khách mời thường xuyên của chương trình vì cô rất giỏi trong việc lấy các nguyên tắc kinh doanh phức tạp và phân tích chúng dé đưa ra lời khuyên rõ ràng, đơn giản. Nhưng trước tiên, [76] tôi muôn thảo luận về kết quả cuộc khảo sát gân đây của tôi, nơi tất cả các bạn đã chia sẻ các phương pháp tiếp cận công việc định vị sản phẩm của mình."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "C",
   "group": "74-76",
   "textEn": "75. What does the speaker say Ms. Bertrand is good at? (A) Designing billboard ads (B) Solving budget problems (C) Explaining complicated ideas (D) Creating training programs",
   "transcript": "Today's episode of the Financial Parade Podcast is about the possibilities and limitations of marketing on social media. How can businesses improve on their marketing efforts and do a better job of reaching their target audience? To help us answer this, we are joined by Magali Bertrand, Marketing director at Blue Lane Consulting. Ms. Bertrand is a frequent guest on the show because she is good at taking complex business principles and breaking them down to offer clear, simple advice. But first, ld like to discuss the results of my recent survey where you all shared your approaches to product placement.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói nói rằng cô Bertrand giỏi việc gì?\n(A) Thiêt kê biên quảng cáo\n(B) Giải quyêt van dé ngân sách\n(C) Giải thích những ý tưởng phức tạp\n(D) Xây dựng chương trình đào tạo\nCách diễn đạt tương đương:\n- explaining complicated ideas (giải thích những ý tưởng phức tap) = taking complex business principles and breaking them down to offer clear, simple advice (lấy các nguyên tắc kinh doanh phức tap va phân tích chúng dé đưa ra lời khuyên rõ ràng, đơn giản)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, say, Ms. Bertrand, good at.\n- Dang câu hỏi: thông tin chi tiết.\n- “we are joined by Magali Bertrand, Marketing director at Blue Lane Consulting.” (chúng ta có su tham gia của Magali Bertrand, Giám đốc Tiếp thi tại Blue Lane Consulting.) là dấu hiệu sắp đến đáp án. “Ms. Bertrand is a frequent guest on the show because she is good at taking complex business principles and breaking them down to offer clear, simple advice.” là thông tin chứa đáp án.\n- “explaining complicated ideas” là cách diễn đạt tương đương của “taking complex business principles and breaking them down to offer clear, simple advice”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Các phương an (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn [74] Tập Podcast Financial Parade hôm nay nói về những khả năng và hạn chế của hoạt động tiếp thị trên mạng xã hội. Làm thế nào các doanh nghiệp có thể cải thiện nỗ lực tiếp thị của mình và thực hiện công việc tiếp cận đối tượng mục tiêu tốt hơn? Đề giúp chúng ta trả lời câu hỏi nay, chúng ta có sự tham gia của Magali Bertrand, Giám đốc Tiếp thi tại Blue Lane Consulting. [75] Cô Bertrand là khách mời thường xuyên của chương trình vì cô rất giỏi trong việc lấy các nguyên tắc kinh doanh phức tạp và phân tích chúng dé đưa ra lời khuyên rõ ràng, đơn giản. Nhưng trước tiên, [76] tôi muôn thảo luận về kết quả cuộc khảo sát gân đây của tôi, nơi tất cả các bạn đã chia sẻ các phương pháp tiếp cận công việc định vị sản phẩm của mình."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. What will the speaker discuss next? (A) Breaking news (B) Survey results (C) Upcoming contests (D) Future episode topics",
   "transcript": "Today's episode of the Financial Parade Podcast is about the possibilities and limitations of marketing on social media. How can businesses improve on their marketing efforts and do a better job of reaching their target audience? To help us answer this, we are joined by Magali Bertrand, Marketing director at Blue Lane Consulting. Ms. Bertrand is a frequent guest on the show because she is good at taking complex business principles and breaking them down to offer clear, simple advice. But first, ld like to discuss the results of my recent survey where you all shared your approaches to product placement.",
   "explanationVi": "Đáp án đúng: B\n\nNgười nói sẽ thảo luận điều gì tiếp theo?\n(A) Tin nóng hôi\n(B) Kêt quả khảo sát\n(C) Các cuộc thi săp tới\n(D) Chủ đê của những tập podcast trong tương lai Cách diễn đạt tương đương:\n- survey results ~ the results of my recent survey (kết quả khảo sát) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, discuss, next.\n- Dang câu hỏi: thông tin chi tiết.\n- “But first...” (Nhưng trước tiên...) là dấu hiệu sắp đến đáp án. “I'd like to discuss the results of my recent survey where you all shared your approaches to product placement.” là thông tin chứa đáp án.\n- “make an appointment\" là cách diễn đạt tương đương của “schedule an appointment”.\n→ Phương án (B) la phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn [74] Tập Podcast Financial Parade hôm nay nói về những khả năng và hạn chế của hoạt động tiếp thị trên mạng xã hội. Làm thế nào các doanh nghiệp có thể cải thiện nỗ lực tiếp thị của mình và thực hiện công việc tiếp cận đối tượng mục tiêu tốt hơn? Đề giúp chúng ta trả lời câu hỏi nay, chúng ta có sự tham gia của Magali Bertrand, Giám đốc Tiếp thi tại Blue Lane Consulting. [75] Cô Bertrand là khách mời thường xuyên của chương trình vì cô rất giỏi trong việc lấy các nguyên tắc kinh doanh phức tạp và phân tích chúng dé đưa ra lời khuyên rõ ràng, đơn giản. Nhưng trước tiên, [76] tôi muôn thảo luận về kết quả cuộc khảo sát gân đây của tôi, nơi tất cả các bạn đã chia sẻ các phương pháp tiếp cận công việc định vị sản phẩm của mình."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "C",
   "group": "77-79",
   "textEn": "77. What will be delivered next Wednesday? (A) Office furniture (B) Color printers (C) Potted plants (D) Framed artwork",
   "transcript": "Next Wednesday, Arlington Landscaping will deliver the potted plants we ordered to brighten up the common areas in our office. Studies have shown that plants are great stress relievers and can increase workplace productivity. We think you'll find that this is a great improvement to our work environment. If you'd like a small plant for your desk, the company will cover the cost. To choose your plant, please check the catalog in the staff room. It has photos and care instructions.",
   "explanationVi": "Đáp án đúng: C\n\nCái gì sẽ được giao vào thứ tư tuần sau?\n(A) Nội thất văn phòng\n(B) Máy in màu\n(C) Cây trồng trong chậu\n(D) Tác phẩm nghệ thuật được đóng khung\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, delivered, next Wednesday.\n- Dang câu hỏi: thông tin chỉ tiết.\n- “Next Wednesday, Arlington Landscaping will deliver...” (Thứ Tư tới, Arlington Landscaping sẽ giao...) là dấu hiệu sắp đến đáp án. “Next Wednesday, Arlington Landscaping will deliver the potted plants we ordered to brighten up the common areas in our office.” là thông tin chứa đáp an.\n- “potted plants” là đáp án được nhắc đến trực tiếp trong bai nói.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “office” nhưng lại không đề cập đến “office furniture” (nội thất văn phòng).\n- Các phương án (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br [77] Thứ Tư tới, Arlington Landscaping sẽ giao những chậu cây mà chúng tôi đã đặt dé lam bung sáng các khu vực chung trong văn phòng. [78] Các nghiên cứu da chỉ ra rằng thực vật là liều thuốc giảm căng thẳng tuyệt vời và có thể tăng năng suất làm việc. Chúng tôi nghĩ bạn sẽ thầy rằng đây là một cải tiền tuyệt vời cho môi trường làm việc của chúng ta. Nếu bạn muốn một chậu cây nhỏ dé trên ban làm việc, công ty sẽ dai thọ chi phí. Đề chọn cây của ban, [79] vui lòng kiểm tra danh mục trong phòng nhân viên. Nó có hình ảnh và hướng dẫn chăm sóc."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "C",
   "group": "77-79",
   "textEn": "78. What does the speaker say about productivity? (A) It has been improving recently. (B) It is higher in other departments. (C) It can be improved by office surroundings. (D) It can be increased by working in groups.",
   "transcript": "Next Wednesday, Arlington Landscaping will deliver the potted plants we ordered to brighten up the common areas in our office. Studies have shown that plants are great stress relievers and can increase workplace productivity. We think you'll find that this is a great improvement to our work environment. If you'd like a small plant for your desk, the company will cover the cost. To choose your plant, please check the catalog in the staff room. It has photos and care instructions.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói nói gì về năng suất?\n(A) Gan đây nó đã được cải thiện.\n(B) Nó cao hơn ở các bộ phận khác.\n(C) Nó có thể được cai thiện nhờ môi trường trong văn phòng.\n(D) Nó có thể được tăng lên bằng cách làm việc theo nhóm.\nCách diễn đạt tương đương:\n- office surroundings = work environment (môi trường làm việc) Cách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, speaker, say, about, productivity.\n- Dang câu hỏi: thông tin chi tiết.\n- Bai nói nhắc đến “increase workplace productivity” (tăng năng suất làm việc) là dấu hiệu sắp đến đáp án. “Studies have shown that plants are great stress relievers and can increase workplace productivity. We think you'll find that this is a great improvement to our work environment.” là thông tin chứa dap án.\n- “office surroundings\" là cách diễn dat tương đương của “work environment”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “increase” là từ đồng nghĩa với từ ” improving” ở phương án, nhưng nội dung bài nói nhắc đến việc liệu năng suất làm việc có thực tế đang cải thiện hay không.\n- Phương án (B) chứa thông tin không được đề cập.\n- (D) phuong án bẫy, bài nói có nhắc đến từ “increase” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br [77] Thứ Tư tới, Arlington Landscaping sẽ giao những chậu cây mà chúng tôi đã đặt dé lam bung sáng các khu vực chung trong văn phòng. [78] Các nghiên cứu da chỉ ra rằng thực vật là liều thuốc giảm căng thẳng tuyệt vời và có thể tăng năng suất làm việc. Chúng tôi nghĩ bạn sẽ thầy rằng đây là một cải tiền tuyệt vời cho môi trường làm việc của chúng ta. Nếu bạn muốn một chậu cây nhỏ dé trên ban làm việc, công ty sẽ dai thọ chi phí. Đề chọn cây của ban, [79] vui lòng kiểm tra danh mục trong phòng nhân viên. Nó có hình ảnh và hướng dẫn chăm sóc."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "79. According to the speaker, what is available in the staff room? (A) A catalog (B) A vending machine (C) Staff uniforms (D) Exercise equipment",
   "transcript": "Next Wednesday, Arlington Landscaping will deliver the potted plants we ordered to brighten up the common areas in our office. Studies have shown that plants are great stress relievers and can increase workplace productivity. We think you'll find that this is a great improvement to our work environment. If you'd like a small plant for your desk, the company will cover the cost. To choose your plant, please check the catalog in the staff room. It has photos and care instructions.",
   "explanationVi": "Đáp án đúng: A\n\nTheo người nói, trong phòng nhân viên có gì?\n(A) Một danh mục\n(B) Một máy bán hàng tự động\n(C) Đông phục nhân viên\n(D) Thiết bị tập thể dục\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, speaker, what, available, in, staff room.\n- Dang câu hỏi: thông tin chi tiết.\n- “To choose your plant, please check the...” (Để chọn cây của bạn, vui lòng kiểm tra...) là dấu hiệu sắp đến đáp án. “please check the catalog in the staff room.” là thông tin chứa đáp án.\n- “catalog” là đáp án được nhắc đến trực tiếp trong bài nói.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br [77] Thứ Tư tới, Arlington Landscaping sẽ giao những chậu cây mà chúng tôi đã đặt dé lam bung sáng các khu vực chung trong văn phòng. [78] Các nghiên cứu da chỉ ra rằng thực vật là liều thuốc giảm căng thẳng tuyệt vời và có thể tăng năng suất làm việc. Chúng tôi nghĩ bạn sẽ thầy rằng đây là một cải tiền tuyệt vời cho môi trường làm việc của chúng ta. Nếu bạn muốn một chậu cây nhỏ dé trên ban làm việc, công ty sẽ dai thọ chi phí. Đề chọn cây của ban, [79] vui lòng kiểm tra danh mục trong phòng nhân viên. Nó có hình ảnh và hướng dẫn chăm sóc."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "80. According to the speaker, what happened three years ago? (A) A council member was elected. (B) A local tax law changed (C) A train station opened. (D) A business relocated.",
   "transcript": "In local news, the abandoned shoe factory in the central business district is finally getting a makeover. The building has been empty for three years since the factory moved to its new, larger space south of town. After hearing many proposals, the town council voted last night to sell the building to developer Matthew Hughes, who will convert it into family housing: ten modern, comfortable units with a parking garage underground. Up next, it looks like the rain is on the way out, giving way to blue skies this weekend. Samantha is here to tell us all about it.",
   "explanationVi": "Đáp án đúng: D\n\nTheo người nói, chuyện gì đã xảy ra cách đây ba năm?\n(A) Một thành viên hội đồng đã được bầu.\n(B) Luật thuế địa phương đã thay đồi.\n(C) Một nhà ga xe lửa đã mở cửa.\n(D) Một doanh nghiệp đã chuyển địa điểm.\nCách diễn đạt tương đương:\n- abusiness relocated (một doanh nghiệp chuyển địa điểm) ~ the factory moved to its new, larger space south of town (nhà máy chuyển đến không gian mới, rộng hơn ở phía nam thị trấn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, speaker, what, happened, three years ago.\n- Dang câu hỏi: thông tin chi tiết.\n- “The building has been empty for three years since...\" (Tòa nha này đã bị bỏ trống trong ba năm kể từ khi...) là dấu hiệu sắp đến đáp án. “The building has been empty for three years since the factory moved to its new, larger space south of town.” là thông tin chứa đáp án.\n- “a business relocated” là cách diễn đạt tương đương của “the factory moved to its new, larger space south of town”.\n~ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “council” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n- Các phương án (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn Đền với phần tin tức địa phương, nhà máy giày bị bỏ hoang ở khu thương mại trung tâm cuối cùng cũng được cai tao. [80] Tòa nhà này đã bị bo trồng trong ba năm kể từ khi nhà máy\nchuyển đến không gian mới, rộng hơn ở phía nam thị trấn. [81] Sau khi nghe nhiều đề xuất, đêm qua hội đồng thị tran đã bỏ phiéu dé bán tòa nhà cho nhà phát triển Matthew Hughes, người sẽ chuyển đồi nó thành nhà ở cho gia đình: mười căn hộ hiện đại, tiện nghị có gara đậu xe dưới tang hầm. [82] Tiếp theo, có vẻ như mưa sắp tanh, nhường chỗ cho bầu trời xanh vào cuối tuần nay. Samantha ở đây dé nói cho chúng ta biết thêm về điều đó."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "81. Who is Matthew Hughes? (A) A banker (B) A real estate developer (C) A government official (D) A store owner",
   "transcript": "In local news, the abandoned shoe factory in the central business district is finally getting a makeover. The building has been empty for three years since the factory moved to its new, larger space south of town. After hearing many proposals, the town council voted last night to sell the building to developer Matthew Hughes, who will convert it into family housing: ten modern, comfortable units with a parking garage underground. Up next, it looks like the rain is on the way out, giving way to blue skies this weekend. Samantha is here to tell us all about it.",
   "explanationVi": "Đáp án đúng: B\n\nMatthew Hughes là ai?\n(A) Một nhân viên ngân hàng\n(B) Một nhà phát triển bất động sản\n(C) Một quan chức chính phủ\n(D) Một chủ cửa hàng\nCách diễn đạt tương đương:\n- areal estate developer (nhà phát triển bất động sản) ~ developer Matthew Hughes, who will convert it into family housing (nhà phát triển Matthew Hughes, người sẽ chuyển đổi nó thành nha ở cho gia đình)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, Matthew Hughes.\n- Dang câu hỏi: thông tin tổng quát.\n- Bai nói nhắc đến “Matthew Hughes” là dấu hiệu sắp đến đáp án. “After hearing many proposals, the town council voted last night to sell the building to developer Matthew Hughes, who will convert it into family housing: ten modern, comfortable units with a parking garage underground.” là thông tin chứa đáp án.\n- “areal estate developer” là cách diễn đạt tương đương của “developer Matthew Hughes, who will convert it into family housing”.\n~ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (D) chứa thông tin không được đề cập.\n- (C) phuong án bẫy, bài nói có nhắc đến từ “town council” liên quan đến từ “government official” nhưng Matthew Hughes không phải thành viên của hội đồng thị trấn mà là người mua tòa nhà từ hội đồng.\n\nDịch bài nói:\nM-Cn Đền với phần tin tức địa phương, nhà máy giày bị bỏ hoang ở khu thương mại trung tâm cuối cùng cũng được cai tao. [80] Tòa nhà này đã bị bo trồng trong ba năm kể từ khi nhà máy\nchuyển đến không gian mới, rộng hơn ở phía nam thị trấn. [81] Sau khi nghe nhiều đề xuất, đêm qua hội đồng thị tran đã bỏ phiéu dé bán tòa nhà cho nhà phát triển Matthew Hughes, người sẽ chuyển đồi nó thành nhà ở cho gia đình: mười căn hộ hiện đại, tiện nghị có gara đậu xe dưới tang hầm. [82] Tiếp theo, có vẻ như mưa sắp tanh, nhường chỗ cho bầu trời xanh vào cuối tuần nay. Samantha ở đây dé nói cho chúng ta biết thêm về điều đó."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "82. What will the listeners hear about next? (A) A sporting event (B) Street closures (C) The weather (D) Parking fines",
   "transcript": "In local news, the abandoned shoe factory in the central business district is finally getting a makeover. The building has been empty for three years since the factory moved to its new, larger space south of town. After hearing many proposals, the town council voted last night to sell the building to developer Matthew Hughes, who will convert it into family housing: ten modern, comfortable units with a parking garage underground. Up next, it looks like the rain is on the way out, giving way to blue skies this weekend. Samantha is here to tell us all about it.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nghe sẽ nghe về điều gì tiếp theo?\n(A) Một sự kiện thê thao\n(B) Đóng cửa đường phô\n(C) Thời tiết\n(D) Tiên phạt đậu xe\nCách diễn đạt tương đương:\n- the weather (thời tiết) ~ rain, blue skies (mưa, trời xanh) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listeners, hear, next.\n- Dang câu hỏi: thông tin chi tiết.\n- “Up next...” (Tiếp theo...) là dấu hiệu sắp đến đáp án. “Up next, it looks like the rain is on the way out, giving way to blue skies this weekend. Samantha is here to tell us all about it.” là thông tin chứa dap an.\n- “the weather” là cách diễn đạt tương đương cua “rain, blue skies”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn Đền với phần tin tức địa phương, nhà máy giày bị bỏ hoang ở khu thương mại trung tâm cuối cùng cũng được cai tao. [80] Tòa nhà này đã bị bo trồng trong ba năm kể từ khi nhà máy\nchuyển đến không gian mới, rộng hơn ở phía nam thị trấn. [81] Sau khi nghe nhiều đề xuất, đêm qua hội đồng thị tran đã bỏ phiéu dé bán tòa nhà cho nhà phát triển Matthew Hughes, người sẽ chuyển đồi nó thành nhà ở cho gia đình: mười căn hộ hiện đại, tiện nghị có gara đậu xe dưới tang hầm. [82] Tiếp theo, có vẻ như mưa sắp tanh, nhường chỗ cho bầu trời xanh vào cuối tuần nay. Samantha ở đây dé nói cho chúng ta biết thêm về điều đó."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "C",
   "group": "83-85",
   "textEn": "83. What is the speaker discussing? (A) The renovation of a train station (B) The construction of a tunnel (C) The replacement of a bridge (D) The repaving of a bicycle trail",
   "transcript": "Before we end this transportation agency meeting, I want to give you an update on the Springdale bridge replacement project. The project is moving forward. However, we are more than six months past the scheduled completion date. But this is just one of our many projects. Now, this delay is frustrating to residents who are dealing with traffic congestion. Therefore, I strongly recommend that we hold a press conference to address specific concerns.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói đang thảo luận về điều gì?\n(A) Việc cải tạo một nhà ga xe lửa\n(B) Việc xây dựng một đường hầm\n(C) Việc thay thế một cây cầu\n(D) Việc lát lại đường dành cho xe đạp\nCách diễn đạt tương đương:\n- the replacement of a bridge (việc thay thé một cây cầu) ~ the Springdale bridge replacement project (du an thay thé cau Springdale)\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, speaker, discussing.\n- Dạng câu hỏi: thông tin tổng quát.\n- Dựa vào lời thoại đầu tiên của người phụ nữ, “Before we end this transportation agency meeting...” (Trước khi chúng ta kết thúc cuộc họp cơ quan vận tải này...) là dấu hiệu sắp đến đáp án. “I want to give you an update on the Springdale bridge replacement project.” là thông tin chứa đáp án.\n- “the replacement of a bridge” là cách diễn đạt tương đương của “the Springdale bridge replacement project”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “transportation agency” liên quan đến từ “train station” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n- (B) phương án bay, bài nói có nhắc đến từ “transportation agency” liên quan đến từ “tunnel” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n- (D) phuong án bẫy, bài nói có nhắc đến từ “transportation agency” liên quan đến từ “bicycle trail” nhưng nội dung còn lại của phương án chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Trước khi chúng ta kết thúc cuộc hop cơ quan vận tai nay, [83] tôi muốn cập nhật cho các bạn về dự án thay thế cầu Springdale. Dự án vẫn đang tiến triển. Tuy nhiên, [84] chúng ta đã trễ hơn sáu tháng so với ngày hoàn thành dự kiến. Nhưng đây chỉ là một trong nhiều dự án của chúng ta. Giờ đây, sự chậm trễ này đang gây khó chịu cho những người dân đang phải đối mặt với tình trạng tắc nghẽn giao thông. Vì vậy, [85] tôi đặc biệt đề xuất chúng ta nên tổ chức một cuộc họp báo để giải quyết từng quan ngại cụ thể."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "84. Why does the speaker say, “this is just one of our many projects\"? (A) To propose a change of topic (B) To explain a delay (C) To praise some employees (D) To ask for help",
   "transcript": "Before we end this transportation agency meeting, I want to give you an update on the Springdale bridge replacement project. The project is moving forward. However, we are more than six months past the scheduled completion date. But this is just one of our many projects. Now, this delay is frustrating to residents who are dealing with traffic congestion. Therefore, I strongly recommend that we hold a press conference to address specific concerns.",
   "explanationVi": "Đáp án đúng: B\n\nTại sao người nói lại nói “đây chỉ là một trong nhiều dự án của chúng ta\n(A) Để đề xuất thay đồi chủ đề\n(B) Đề giải thích sự chậm trễ\n(C) Đê khen ngợi một sô nhân viên\n(D) Đê yêu câu giúp đỡ\n52\nCách diễn đạt tương đương:\nadelay (sự chậm trễ) ~ more than six months past the scheduled completion date (trễ hơn sáu tháng so với ngày hoàn thành dự kiến)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, say, this, just, one, of, many, projects.\n- Dang câu hỏi: ngụ ý.\n- “we are more than six months past the scheduled completion date.” và “this is just one of our many projects.” là thông tin chứa đáp an.\n- Người phụ nữ nói rằng dự án đã trễ hon sáu tháng, và ngay lập tức sau đó giải thích cho điều này bằng cách đề cập đến việc cơ quan còn có nhiều dự án khác, ngụ ý rằng sự chậm trễ này là có lý do như đã trình bày.\n- “adelay\" là cách diễn đạt tương đương của “more than six months past the scheduled completion date”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Trước khi chúng ta kết thúc cuộc hop cơ quan vận tai nay, [83] tôi muốn cập nhật cho các bạn về dự án thay thế cầu Springdale. Dự án vẫn đang tiến triển. Tuy nhiên, [84] chúng ta đã trễ hơn sáu tháng so với ngày hoàn thành dự kiến. Nhưng đây chỉ là một trong nhiều dự án của chúng ta. Giờ đây, sự chậm trễ này đang gây khó chịu cho những người dân đang phải đối mặt với tình trạng tắc nghẽn giao thông. Vì vậy, [85] tôi đặc biệt đề xuất chúng ta nên tổ chức một cuộc họp báo để giải quyết từng quan ngại cụ thể."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "85. What does the speaker suggest doing? (A) Organizing an opening ceremony (B) Scheduling a television interview (C) Revising a design (D) Meeting with the press",
   "transcript": "Before we end this transportation agency meeting, I want to give you an update on the Springdale bridge replacement project. The project is moving forward. However, we are more than six months past the scheduled completion date. But this is just one of our many projects. Now, this delay is frustrating to residents who are dealing with traffic congestion. Therefore, I strongly recommend that we hold a press conference to address specific concerns.",
   "explanationVi": "Đáp án đúng: D\n\nNgười nói đề xuất làm gì?\n(A) Tô chức lễ khai mạc\n(B) Lên lịch phỏng vấn trên truyền hình\n(C) Sửa đồi một thiết kế\n(D) Gặp gỡ báo chí\nCách diễn đạt tương đương:\n- suggest * recommend (đề xuất) s meeting with the press (gặp gỡ báo chí) = hold a press conference (tổ chức một cuộc họp báo)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listeners, suggest, doing.\n- Dang câu hỏi: thông tin chi tiết.\n- “| strongly recommend that...” (tôi đặc biệt đề xuất...) là dấu hiệu sắp đến đáp án. “| strongly recommend that we hold a press conference to address specific concerns.” là thông tin chứa đáp án.\n- “suggest” là cách diễn đạt tương đương của “recommend”.\n- “meeting with the press” là cách diễn đạt tương đương của “hold a press conference”.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Trước khi chúng ta kết thúc cuộc hop cơ quan vận tai nay, [83] tôi muốn cập nhật cho các bạn về dự án thay thế cầu Springdale. Dự án vẫn đang tiến triển. Tuy nhiên, [84] chúng ta đã trễ hơn sáu tháng so với ngày hoàn thành dự kiến. Nhưng đây chỉ là một trong nhiều dự án của chúng ta. Giờ đây, sự chậm trễ này đang gây khó chịu cho những người dân đang phải đối mặt với tình trạng tắc nghẽn giao thông. Vì vậy, [85] tôi đặc biệt đề xuất chúng ta nên tổ chức một cuộc họp báo để giải quyết từng quan ngại cụ thể."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "86. According to the speaker, what will be different about today's session? (A) It will take place outside. (B) It will be recorded. (C) Participants will work in pairs. (D) Participants will deliver presentations.",
   "transcript": "Attention, everyone. I hope you're enjoying the second day of our weekend workshop on leadership skills for entrepreneurs. During yesterday's session, we conducted a discussion about goal setting, and we did that together as a group. However, today I'll be matching you with a partner for a one-on-one discussion. So, start thinking about any improvements you'd like to make to your communication skills, because that's what you'll be sharing with each other. And later this afternoon, we'll enjoy a prepared lunch, which has been generously donated to us by Blue Star Catering Company. We're grateful to them for their support.",
   "explanationVi": "Đáp án đúng: C\n\nTheo người nói, phiên thảo luận hôm nay sẽ có gì khác biệt?\n(A) Nó sẽ diễn ra ở ngoài trời.\n(B) Nó sẽ được ghi lại.\n(C) Người tham gia sẽ làm việc theo cặp.\n(D) Người tham gia sẽ thuyết trình.\nCách diễn đạt tương đương:\n- in pairs (theo cặp) = for a one-on-one discussion (để thảo luận riêng 1:1)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, speaker, what, different, today’s session.\n- Dang câu hỏi: thông tin chi tiết.\n- “During yesterday's session, we conducted a discussion about goal setting, and we did that together as a group. However, today...” (Trong buổi hoc ngày hôm qua, chúng ta đã thao luận về việc thiết lập mục tiêu và cùng nhau thực hiện điều đó trong một nhóm lớn. Tuy nhiên, hôm nay...) là dấu hiệu sắp đến đáp án. “today I'll be matching you with a partner for a one-on-one discussion.” là thông tin chứa đáp an.\n- “in pairs” là cách diễn đạt tương đương của “for a one-on-one discussion\".\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW- Br Chú ý ý nhé mọi người. Tôi hy vọng bạn đang tận hưởng ngày thứ hai của hội thảo cuối tuần về kỹ năng lãnh đạo dành cho doanh nhân. Trong buổi học ngày hôm qua, chúng ta đã thảo luận về việc thiết lập mục tiêu và | cùng nhau thực hiện điều đó trong một nhóm lớn. Tuy\nnhiên, [86] hôm nay tôi sẽ nối mỗi người trong các bạn với một cộng sự để thảo luận riêng\n1:1. Vi i vậy, [87] hay bat dau suy nghi vé bat ky điều gì mà bạn muôn cải thiện đối với kỹ năng giao tiếp của mình, vì đó là những nội dung mà các bạn sẽ chia sẻ với nhau. Và [88] chiéu nay, chúng ta sẽ thưởng thức bữa trưa đã được chuẩn bị sẵn do Công ty Dịch vụ ăn uông Blue Star hào phóng tài trợ cho chúng ta. Chúng tôi biết ơn vì sự hỗ trợ của họ."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "87. What is the topic of today's session? (A) Improving communication skills (B) Updating accounting practices (C) Managing company finances (D) Recruiting qualified job candidates",
   "transcript": "Attention, everyone. I hope you're enjoying the second day of our weekend workshop on leadership skills for entrepreneurs. During yesterday's session, we conducted a discussion about goal setting, and we did that together as a group. However, today I'll be matching you with a partner for a one-on-one discussion. So, start thinking about any improvements you'd like to make to your communication skills, because that's what you'll be sharing with each other. And later this afternoon, we'll enjoy a prepared lunch, which has been generously donated to us by Blue Star Catering Company. We're grateful to them for their support.",
   "explanationVi": "Đáp án đúng: A\n\nChủ đề của phiên thảo luận hôm nay là gì?\n(A) Cải thiện kỹ năng giao tiếp\n(B) Cập nhật thông lệ kế toán\n(C) Quản lý tài chính công ty\n(D) Tuyển dụng những ứng viên đủ điều kiện làm việc\nCách diễn đạt tương đương:\n- improving communication skills (cải thiện kỹ năng giao tiếp) ~ any improvements you'd like to make to your communication skills (bất kỳ điều gì mà bạn muốn cải thiện đối với kỹ năng giao tiếp của mình)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, topic, today’s session.\n- Dang câu hỏi: thông tin tổng quát.\n- Bai nói nhắc đến “start thinking about...” (hãy bắt đầu suy nghĩ về...) là dấu hiệu sắp đến đáp án. “start thinking about any improvements you'd like to make to your communication skills, because that's what you'll be sharing with each other.” là thông tin chứa đáp an.\n- “improving communication skills” là cách diễn đạt tương đương của “any improvements you'd like to make to your communication skills”.\n→ Phương án (A) la phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW- Br Chú ý ý nhé mọi người. Tôi hy vọng bạn đang tận hưởng ngày thứ hai của hội thảo cuối tuần về kỹ năng lãnh đạo dành cho doanh nhân. Trong buổi học ngày hôm qua, chúng ta đã thảo luận về việc thiết lập mục tiêu và | cùng nhau thực hiện điều đó trong một nhóm lớn. Tuy\nnhiên, [86] hôm nay tôi sẽ nối mỗi người trong các bạn với một cộng sự để thảo luận riêng\n1:1. Vi i vậy, [87] hay bat dau suy nghi vé bat ky điều gì mà bạn muôn cải thiện đối với kỹ năng giao tiếp của mình, vì đó là những nội dung mà các bạn sẽ chia sẻ với nhau. Và [88] chiéu nay, chúng ta sẽ thưởng thức bữa trưa đã được chuẩn bị sẵn do Công ty Dịch vụ ăn uông Blue Star hào phóng tài trợ cho chúng ta. Chúng tôi biết ơn vì sự hỗ trợ của họ."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "88. What does the speaker say about the lunch? (A) It has been donated. (B) It is vegetarian. (C) It will arrive late. (D) It will include a dessert.",
   "transcript": "Attention, everyone. I hope you're enjoying the second day of our weekend workshop on leadership skills for entrepreneurs. During yesterday's session, we conducted a discussion about goal setting, and we did that together as a group. However, today I'll be matching you with a partner for a one-on-one discussion. So, start thinking about any improvements you'd like to make to your communication skills, because that's what you'll be sharing with each other. And later this afternoon, we'll enjoy a prepared lunch, which has been generously donated to us by Blue Star Catering Company. We're grateful to them for their support.",
   "explanationVi": "Đáp án đúng: A\n\nNgười nói nói gì về bữa trưa?\n(A) Nó đã được tài trợ.\n(B) Nó là đồ ăn chay.\n(C) Nó sẽ đến muộn.\n(D) Nó sẽ bao gồm một món tráng miệng.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, say, about, lunch.\n- Dang câu hỏi: thông tin chi tiết.\n- “later this afternoon, we'll enjoy a prepared lunch...” (chiều nay, chúng ta sẽ thưởng thức bữa trưa đã được chuẩn bị san...) là dấu hiệu sắp đến đáp án. “later this afternoon, we'll enjoy a prepared lunch, which has been generously donated to us by Blue Star Catering Company.” là thông tin chứa đáp án.\n- “donated” là đáp án được nhắc đến trực tiếp trong bài nói.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW- Br Chú ý ý nhé mọi người. Tôi hy vọng bạn đang tận hưởng ngày thứ hai của hội thảo cuối tuần về kỹ năng lãnh đạo dành cho doanh nhân. Trong buổi học ngày hôm qua, chúng ta đã thảo luận về việc thiết lập mục tiêu và | cùng nhau thực hiện điều đó trong một nhóm lớn. Tuy\nnhiên, [86] hôm nay tôi sẽ nối mỗi người trong các bạn với một cộng sự để thảo luận riêng\n1:1. Vi i vậy, [87] hay bat dau suy nghi vé bat ky điều gì mà bạn muôn cải thiện đối với kỹ năng giao tiếp của mình, vì đó là những nội dung mà các bạn sẽ chia sẻ với nhau. Và [88] chiéu nay, chúng ta sẽ thưởng thức bữa trưa đã được chuẩn bị sẵn do Công ty Dịch vụ ăn uông Blue Star hào phóng tài trợ cho chúng ta. Chúng tôi biết ơn vì sự hỗ trợ của họ."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "D",
   "group": "89-91",
   "textEn": "89. Where does the speaker most likely work? (A) At a car-rental company (B) At an appliance-repair shop (C) At a car wash (D) At an auto-mechanic shop",
   "transcript": "This is Adisa from Car Pro returing your call. In your message, you said your sedan seems sluggish and isn't accelerating well. There are a number of things that could be causing that, and prices vary with the repair solt could be as simple as a clogged oil filter, which is inexpensive to fix. But we'll have to take a look. Oh, by the way, we're closing early tomorrow, but we can get you in the day after. Well open at eight A. M.",
   "explanationVi": "Đáp án đúng: D\n\nNgười nói có khả năng cao là đang làm việc ở đâu?\n(A) Tại một công ty cho thuê xe hơi\n(B) Tại một cửa hàng sửa chữa thiết bị\n(C) Tại tiệm rửa xe\n(D) Tại một cửa hàng cơ khí ô tô\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, speaker, likely, work.\n- Dang câu hỏi: thông tin tổng quát.\n- Dựa vào lời thoại của người đàn ông, “This is Adisa from Car Pro returning your call.” va “prices vary with the repair.” là thông tin chứa đáp án.\n- Người đàn ông giới thiệu tên mình và tên công ty của mình là “Car Pro”, cũng như đề cập đến chi phí sửa chữa chiếc sedan của khách, điều này có nghĩa rằng người đàn ông có khả năng cao là đang làm việc ở một cửa hàng cơ khí ô tô.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến từ “car” nhưng không nhắc đến việc cho thuê xe hơi. s (B) phương án bẫy, bài nói có nhắc đến từ “repair” nhưng cửa hàng không sửa thiết bị nói chung mà chỉ sửa chữa xe hơi. s (C) phuong án bẫy, bài nói có nhắc đến từ “car” nhưng cửa hàng không có dịch vụ rửa xe.\n\nDịch bài nói:\nM-Cn [89] Tôi là Adisa từ Car Pro đang trả lời cuộc gọi của bạn. Trong tin nhắn của bạn, bạn nói rằng chiếc sedan của bạn có vẻ chậm chạp và tăng tốc không tốt. Có một số nguyên nhân có thể gây ra điều đó và [89] giá cả sẽ thay đổi tùy theo việc sửa chữa. [90] Có thể đơn giản chỉ là bộ lọc dầu bị tắc, và van dé này thì sửa không tốn kém. Nhưng chúng tôi sẽ phải xem xét. Ò, nhân tiện, [91] ngày mai chúng tôi đóng cửa sớm nhưng chúng tôi có thé sắp xếp cho bạn vào ngày kia. Chúng tôi sẽ mở cửa lúc 8 giờ sáng."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "90. What does the speaker imply when he says, \"Well have to take a look\"? (A) A schedule may be changed. (B) A supervisor should be consulted. (C) A cost cannot be determined yet. (D) A new policy must be followed.",
   "transcript": "This is Adisa from Car Pro returing your call. In your message, you said your sedan seems sluggish and isn't accelerating well. There are a number of things that could be causing that, and prices vary with the repair solt could be as simple as a clogged oil filter, which is inexpensive to fix. But we'll have to take a look. Oh, by the way, we're closing early tomorrow, but we can get you in the day after. Well open at eight A. M.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói có ý gì khi nói \"chúng tôi sẽ phải xem xét\"?\n(A) Lịch trình có thê được thay đôi.\n(B) Cân phải hỏi ý kiên người giám sát.\n(C) Chi phí chưa thê được xác định.\n(D) Một chính sách mới phải được tuân theo.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, imply, have to, take a look.\n- Dang câu hỏi: ngụ ý.\n- “It could be as simple as a clogged oil filter, which is inexpensive to fix.” va “we'll have to take a look.” là thông tin chứa đáp an.\n- Người dan ông nói rằng có thể đơn giản chỉ là bộ lọc dầu bị tắc, va vấn đề nay thì sửa không tốn kém, nhưng sau đó lại nói rằng “chúng tôi sẽ phải xem xét”, ngụ ý rằng vì chưa xem xét được vấn đề cụ thể của chiếc sedan nên chi phí chưa thể được xác định.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn [89] Tôi là Adisa từ Car Pro đang trả lời cuộc gọi của bạn. Trong tin nhắn của bạn, bạn nói rằng chiếc sedan của bạn có vẻ chậm chạp và tăng tốc không tốt. Có một số nguyên nhân có thể gây ra điều đó và [89] giá cả sẽ thay đổi tùy theo việc sửa chữa. [90] Có thể đơn giản chỉ là bộ lọc dầu bị tắc, và van dé này thì sửa không tốn kém. Nhưng chúng tôi sẽ phải xem xét. Ò, nhân tiện, [91] ngày mai chúng tôi đóng cửa sớm nhưng chúng tôi có thé sắp xếp cho bạn vào ngày kia. Chúng tôi sẽ mở cửa lúc 8 giờ sáng."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "91. What does the speaker say about tomorrow? (A) Some machinery will be serviced. (B) The business will close early. (C) Some new employees will start work. (D) An appointment will probably become available.",
   "transcript": "This is Adisa from Car Pro returing your call. In your message, you said your sedan seems sluggish and isn't accelerating well. There are a number of things that could be causing that, and prices vary with the repair solt could be as simple as a clogged oil filter, which is inexpensive to fix. But we'll have to take a look. Oh, by the way, we're closing early tomorrow, but we can get you in the day after. Well open at eight A. M.",
   "explanationVi": "Đáp án đúng: B\n\nNgười nói nói gì về ngày mai?\n(A) Một sô máy móc sẽ được bảo dưỡng.\n(B) Doanh nghiệp sẽ đóng cửa sớm.\n(C) Một số nhân viên mới sẽ bắt đầu làm việc.\n(D) Một cuộc hẹn có thê sẽ có săn.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, say, about, tomorrow.\n- Dang câu hỏi: thông tin chi tiết.\n- \"Oh, by the way...” (O, nhân tiện...) là dấu hiệu sắp đến đáp án. “we're closing early tomorrow’ là thông tin chứa đáp án.\n- “close early” là đáp án được nhắc đến trực tiếp trong bài nói.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (C), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Cn [89] Tôi là Adisa từ Car Pro đang trả lời cuộc gọi của bạn. Trong tin nhắn của bạn, bạn nói rằng chiếc sedan của bạn có vẻ chậm chạp và tăng tốc không tốt. Có một số nguyên nhân có thể gây ra điều đó và [89] giá cả sẽ thay đổi tùy theo việc sửa chữa. [90] Có thể đơn giản chỉ là bộ lọc dầu bị tắc, và van dé này thì sửa không tốn kém. Nhưng chúng tôi sẽ phải xem xét. Ò, nhân tiện, [91] ngày mai chúng tôi đóng cửa sớm nhưng chúng tôi có thé sắp xếp cho bạn vào ngày kia. Chúng tôi sẽ mở cửa lúc 8 giờ sáng."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "92. What type of business does the speaker most likely work at? (A) A car dealership (B) An electronics store (C) A clothing boutique (D) A furniture store",
   "transcript": "Thanks, everyone, for helping set up the showroom floor with the displays of the new bedroom and living room sets. They look great. Many of you have asked for time off next Wednesday to attend the town parade. I wasn't sure I could grant those requests, but after thinking about it, I realized that that day will probably not be a profitable day for us anyway. I'll post a new employee schedule! Oh, and one more quick announcement—I need all of you to put in an order for a new uniform. It's time we replaced them.",
   "explanationVi": "Đáp án đúng: D\n\nNgười nói có khả năng cao là đang làm việc ở loại hình doanh nghiệp nào?\n(A) Một đại lý ô tô\n(B) Một cửa hàng điện tử\n(C) Một cửa hang quan áo\n(D) Một cửa hàng đồ nội thất\nCách diễn đạt tương đương:\n- furniture (đồ nội thất) = bedroom and living room sets (bộ phòng ngủ và phòng khách)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what type, business, speaker, likely, work.\n- Dang câu hỏi: thông tin tổng quát.\n- Dựa vào lời thoại của người đàn ông, “Thanks, everyone, for helping set up the showroom floor with the displays of the new bedroom and living room sets.” là thông tin chứa dap án.\n- Người đàn ông cảm ơn người nghe vi đã hỗ trợ sắp đặt sàn showroom trưng bày bộ phòng ngủ và phòng khách mới, điều này có nghĩa rằng người đàn ông có khả năng cao là đang làm việc ở một cửa hàng đồ nội thất.\n- “furniture” là cách diễn đạt tương đương của “bedroom and living room sets\".\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không phù hợp.\n\nDịch bài nói:\nM-Au [92] Cảm ơn mọi người đã hỗ trợ sắp đặt sàn showroom trưng bày bộ phòng ngủ và phòng khách mới. Chúng trông thật tuyệt. [93] Nhiều người trong sô các bạn đã xin nghỉ thứ Tư tới đề tham dự cuộc diễu hành của thị trần. Ban đầu, tôi không chắc liệu tôi có thể chấp nhận những yêu cầu đó hay không, nhưng sau khi suy nghĩ lại, tôi nhận ra rằng ngày đó có lẽ sẽ không phải là một ngày mang lại nhiều lợi nhuận cho chúng ta. Tôi sẽ đăng một lịch làm việc mới cho nhân viên! Ô, và một thông báo nhanh nữa- [94] tôi cần tất cả các bạn đặt hàng một bộ đồng phục mới. Đã đến lúc chúng ta thay thế chúng."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "93. What does the speaker imply when he says, \"that day will probably not be a profitable day for us anyway\"? (A) Reduced profits have prevented salary increases. (B) A new sales strategy will have to be developed. (C) The listeners will be able to attend an event. (D) The listeners have been keeping accurate records.",
   "transcript": "Thanks, everyone, for helping set up the showroom floor with the displays of the new bedroom and living room sets. They look great. Many of you have asked for time off next Wednesday to attend the town parade. I wasn't sure I could grant those requests, but after thinking about it, I realized that that day will probably not be a profitable day for us anyway. I'll post a new employee schedule! Oh, and one more quick announcement—I need all of you to put in an order for a new uniform. It's time we replaced them.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói có ý gì khi nói \"ngày đó có lẽ sẽ không phải là một ngày mang lại nhiều lợi nhuận cho chúng ta\"?\n(A) Lợi nhuận giảm đã cản trở việc tăng lương.\n(B) Một chiến lược bán hàng mới sẽ phải được phát triển.\n(C) Người nghe sẽ có thể tham dự một sự kiện.\n(D) Người nghe đã lưu giữ những ghi chép chính xác.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, imply, that day, not, profitable.\n- Dang câu hỏi: ngụ ý.\n- “Many of you have asked for time off next Wednesday to attend the town parade. | wasn't sure | could grant those requests” va “that day will probably not bea profitable day for us anyway.” là thông tin chứa đáp an.\nNgười đàn ông nói rằng nhiều người da xin nghỉ vào một thời điểm sắp tới vì có một sự kiện sẽ diễn ra vào ngày đó, và lúc đầu người nói còn do dự nhưng sau đó cũng thừa nhận rằng \"ngày đó có lẽ sẽ không phải là một ngày mang lại nhiều lợi nhuận cho chúng ta\", ngụ ý rằng hôm đó người nghe sẽ đều đi tham dự sự kiện đó nên hôm ấy sẽ không có nhiều khách và không thu được nhiều lợi nhuận.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai: s (A) phương án bẫy, bài nói có nhắc đến từ “profitable” là từ phát sinh của từ “profits trong phương án nhưng nội dung còn lại của phương án chứa thông tin\nkhông được đề cập.\n- Cac phương án (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au [92] Cảm ơn mọi người đã hỗ trợ sắp đặt sàn showroom trưng bày bộ phòng ngủ và phòng khách mới. Chúng trông thật tuyệt. [93] Nhiều người trong sô các bạn đã xin nghỉ thứ Tư tới đề tham dự cuộc diễu hành của thị trần. Ban đầu, tôi không chắc liệu tôi có thể chấp nhận những yêu cầu đó hay không, nhưng sau khi suy nghĩ lại, tôi nhận ra rằng ngày đó có lẽ sẽ không phải là một ngày mang lại nhiều lợi nhuận cho chúng ta. Tôi sẽ đăng một lịch làm việc mới cho nhân viên! Ô, và một thông báo nhanh nữa- [94] tôi cần tất cả các bạn đặt hàng một bộ đồng phục mới. Đã đến lúc chúng ta thay thế chúng."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "94. What does the speaker expect the listeners to do? (A) Submit an order form (B) Provide some feedback (C) Sign a contract (D) Check a display area",
   "transcript": "Thanks, everyone, for helping set up the showroom floor with the displays of the new bedroom and living room sets. They look great. Many of you have asked for time off next Wednesday to attend the town parade. I wasn't sure I could grant those requests, but after thinking about it, I realized that that day will probably not be a profitable day for us anyway. I'll post a new employee schedule! Oh, and one more quick announcement—I need all of you to put in an order for a new uniform. It's time we replaced them.",
   "explanationVi": "Đáp án đúng: A\n\nNgười nói mong đợi người nghe làm gì?\n(A) Nộp mẫu đơn đặt hàng\n(B) Cung cấp. một số phản hồi\n(C) Ký hợp đồng\n(D) Kiểm tra khu vực trưng bày\nCách diễn đạt tương đương:\n- submit an order form (nộp mẫu đơn đặt hàng) = put in an order (đặt hàng) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, expect, listeners, do.\n- Dang câu hỏi: thông tin chi tiết.\n- “Oh, and one more quick announcement...” (0, và một thông báo nhanh nữa...) là dấu hiệu sắp đến đáp án. “I need all of you to put in an order for a new uniform.” là thông tin chứa đáp án.\n- “submit an order form” là cách diễn đạt tương đương của “put in an order”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (C)), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nM-Au [92] Cảm ơn mọi người đã hỗ trợ sắp đặt sàn showroom trưng bày bộ phòng ngủ và phòng khách mới. Chúng trông thật tuyệt. [93] Nhiều người trong sô các bạn đã xin nghỉ thứ Tư tới đề tham dự cuộc diễu hành của thị trần. Ban đầu, tôi không chắc liệu tôi có thể chấp nhận những yêu cầu đó hay không, nhưng sau khi suy nghĩ lại, tôi nhận ra rằng ngày đó có lẽ sẽ không phải là một ngày mang lại nhiều lợi nhuận cho chúng ta. Tôi sẽ đăng một lịch làm việc mới cho nhân viên! Ô, và một thông báo nhanh nữa- [94] tôi cần tất cả các bạn đặt hàng một bộ đồng phục mới. Đã đến lúc chúng ta thay thế chúng."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "95. Who most likely is the speaker? (A) A rideshare driver (B) A tour guide (C) A ticket agent (D) A baggage handler",
   "transcript": "Hi. This is Emily calling from Speedy Services. I'm picking you up from the central train station today. I see you selected a pickup location near the ticket windows, but there's heavy traffic on that street. Would it be possible to change your pickup location to right outside the station's grand concourse? it's the designated area for rideshare services. Please let me know if you agree with this change by responding to the prompt within the app.Thanks!",
   "explanationVi": "Đáp án đúng: A\n\nNgười nói rất có thể là ai?\n(A) Một tài xế đi chung xe\n(B) Một hướng dẫn viên du lịch\n(C) Một nhân viên bán vé\n(D) Người xử lý hành lý\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, likely, speaker.\n- Dang câu hỏi: thông tin tổng quát.\n- Lời thoại: “This is Emily calling from Speedy Services. I'm picking you up from the central train station today.” va “Would it be possible to change your pickup location to right outside the station's grand concourse? It's the designated area for rideshare services.” là thông tin chứa dap án.\n- Trong suốt bài nói, người phụ nữ nhắc đến những thông tin như tên công ty làm việc la “Speedy Services\", việc đang làm là “picking you up” (đón bạn), hỏi về “pickup location\" (địa điểm đón), và đặc biệt là nhắc trực tiếp đến “rideshare services” (dịch vụ đi chung xe). Đây là những dấu hiệu rõ rang cho thấy người nói rất có thể là tài xế của một dịch vụ đi chung xe.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (B), (D) chứa thông tin không phù hợp. s (C) phuong án bẫy, bài nói có nhắc đến từ “ticket” nhưng nó nằm trong lời thoại về địa điểm đón (là quầy bán vé), người nói không phải nhân viên bán vé.\n\nDịch bài nói:\nW-Am Xin chào. [95] Tôi la Emily gọi từ Speedy Services. Hôm nay tôi sẽ đón ban từ nhà ga xe lửa trung tâm. Tôi thay bạn đã chọn địa điểm đón gần quầy bán vé, nhưng hiện con phố dang kẹt xe nặng. [95, 96] Có thể thay đồi địa điểm đón của bạn sang ngay bên ngoài phòng chờ lớn của nhà ga được không? [95] Đó là khu vực dành riêng cho dịch vụ đi chung xe. [97] Vui lòng cho tôi biết nếu bạn đồng ý với thay đồi này bằng cách tra lời theo hướng dẫn trong ứng dụng. Cam ơn!"
  },
  {
   "number": 96,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "96. Look at the graphic. Where does the speaker want to meet? (A) On Market Street (B) On Twelfth Street (C) On Central Avenue (D) On Tenth Street",
   "transcript": "Hi. This is Emily calling from Speedy Services. I'm picking you up from the central train station today. I see you selected a pickup location near the ticket windows, but there's heavy traffic on that street. Would it be possible to change your pickup location to right outside the station's grand concourse? it's the designated area for rideshare services. Please let me know if you agree with this change by responding to the prompt within the app.Thanks!",
   "explanationVi": "Đáp án đúng: A\n\nNhìn vào biểu đồ. Người nói muốn gặp ở đâu?\n(A) Trên đường Market\n(B) Trên đường Twelfth\n(C) Trên Đại lộ Trung tâm\n(D) Trên đường Tenth\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Look at, graphic, where, speaker, want, meet.\n- Dang câu hỏi: liên quan bảng biểu, biểu đồ.\n- Cau hỏi yêu cầu xem biểu đồ để xác định nơi người nói muốn gặp mặt.\n- “lseeyou selected a pickup location near the ticket windows, but there's heavy traffic on that street.” (Tôi thấy bạn đã chọn dia điểm đón gần quầy bán vé, nhưng hiện con phố đang kẹt xe nang.) là dấu hiệu sắp đến đáp án. “ Would it be possible to change your pickup location to right outside the station's grand concourse?” là thông tin chứa đáp án.\n- Dựa vào biểu đồ, người nói muốn gặp ở đường Market.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không phù hợp.\n\nDịch bài nói:\nW-Am Xin chào. [95] Tôi la Emily gọi từ Speedy Services. Hôm nay tôi sẽ đón ban từ nhà ga xe lửa trung tâm. Tôi thay bạn đã chọn địa điểm đón gần quầy bán vé, nhưng hiện con phố dang kẹt xe nặng. [95, 96] Có thể thay đồi địa điểm đón của bạn sang ngay bên ngoài phòng chờ lớn của nhà ga được không? [95] Đó là khu vực dành riêng cho dịch vụ đi chung xe. [97] Vui lòng cho tôi biết nếu bạn đồng ý với thay đồi này bằng cách tra lời theo hướng dẫn trong ứng dụng. Cam ơn!"
  },
  {
   "number": 97,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "97. How can a change be confirmed? (A) By sending an e-mail (B) By providing an e-signature (C) By using an app (D) By returning a call",
   "transcript": "Hi. This is Emily calling from Speedy Services. I'm picking you up from the central train station today. I see you selected a pickup location near the ticket windows, but there's heavy traffic on that street. Would it be possible to change your pickup location to right outside the station's grand concourse? it's the designated area for rideshare services. Please let me know if you agree with this change by responding to the prompt within the app.Thanks!",
   "explanationVi": "Đáp án đúng: C\n\nLam thé nào dé xác nhận một sự thay đổi?\n(A) Bang cách gửi e-mail\n(B) Bằng cách cung cấp chữ ky điện tử\n(C) Bằng cách sử dụng một ứng dụng\n(D) Bằng cách trả lời cuộc gọi\nCách diễn đạt tương đương:\n- by using an app (bằng cách sử dụng một ứng dung) = by responding to the prompt within the app (bằng cách trả lời theo hướng dẫn trong ứng dụng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: how, change, confirmed.\n- Dang câu hỏi: thông tin chi tiết.\n- “Please let me know if you agree with this change by...” (Vui lòng cho tôi biết nếu bạn đồng ý với thay đổi này bằng cách...) là dấu hiệu sắp đến đáp án. “Please let me know if you agree with this change by responding to the prompt within the app.” là thông tin chứa đáp an.\n- “by using an app” là cách diễn đạt tương đương của “by responding to the prompt within the app”.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Am Xin chào. [95] Tôi la Emily gọi từ Speedy Services. Hôm nay tôi sẽ đón ban từ nhà ga xe lửa trung tâm. Tôi thay bạn đã chọn địa điểm đón gần quầy bán vé, nhưng hiện con phố dang kẹt xe nặng. [95, 96] Có thể thay đồi địa điểm đón của bạn sang ngay bên ngoài phòng chờ lớn của nhà ga được không? [95] Đó là khu vực dành riêng cho dịch vụ đi chung xe. [97] Vui lòng cho tôi biết nếu bạn đồng ý với thay đồi này bằng cách tra lời theo hướng dẫn trong ứng dụng. Cam ơn!"
  },
  {
   "number": 98,
   "part": 4,
   "answer": "B",
   "group": "98-100",
   "textEn": "98. Look at the graphic. who is the speaker? (A) Dr. Bajaj (B) Dr. Novikova (C) Dr. lvanda (D) Dr. Shimizu",
   "transcript": "Good morning. My presentation will look closely at the nutritional benefits of eating fruit. Patients often wonder whether the amount of sugar in fruit makes fruit unhealthy, and some even consider limiting it in their diet. But it's more nuanced than that. Last year, I published a paper reporting on my research on eating the current recommended serving of fruit each day versus eating less of it for weight-loss purposes. I'll spend the next 45 minutes going through the results, and then it'll be time for the coffee break. During the coffee break, feel free to wander to the dining room, where our sponsor has set up a booth to",
   "explanationVi": "Đáp án đúng: B\n\nNhìn vào đồ họa. Ai là người nói?\n(A) Tiền sĩ Bajaj\n(B) Tiền sĩ Novikova\n(C) Tiền sĩ Ivanda\n(D) Tiến sĩ Shimizu\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Look at, graphic, who, speaker.\n- Dạng câu hỏi: liên quan bảng biểu, biểu đồ.\n- Câu hỏi yêu cầu xem bảng biểu để xác định danh tính người nói.\n- Dựa theo lời thoại của người phụ nữ, “My presentation will look closely at the nutritional benefits of eating fruit.” là thông tin chứa đáp án.\n- Dựa vào bảng biểu, người nói là tiến sĩ Novikova.\n~ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Các phương an (A), (C), (D) chứa thông tin không phù hợp.\n\nDịch bài nói:\nW-Br Chào buồi sáng. [98] Bài thuyết trình của tôi sẽ tập trung xem xét những lợi ích dinh dưỡng của việc ăn trái cây. Bệnh nhân thường thắc mắc liệu lượng đường trong trái cây có làm cho trái cây trở nên không tot cho sức khỏe hay không, thậm chí một sô người còn cân nhắc việc hạn chế nó trong chế độ ăn uống của mình. Nhưng điều này phức tạp hơn như vậy. [99] Năm ngoái, tôi đã công bố một bài báo trình bày nghiên cứu của mình vê việc ăn khẩu phần trái cây được khuyến nghị hiện nay mỗi ngày so với việc ăn ít trái cây hơn để giảm cân. Tôi sẽ dành 45 phút tiếp theo đề trình bày kết qua, và sau đó sẽ là thời gian nghỉ giải lao dé uống ca phê. [100] Trong giờ giải lao, hãy thoải mái ghé qua phòng ăn, nơi nhà tài trợ của chúng ta đã dựng một gian hàng đề thử nghiệm một loại đồ uống dinh dưỡng mới."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "99. What did the speaker do last year? (A) She started her own medical practice. (B) She received an award. (C) She published a study. (D) She developed a fitness application.",
   "transcript": "Good morning. My presentation will look closely at the nutritional benefits of eating fruit. Patients often wonder whether the amount of sugar in fruit makes fruit unhealthy, and some even consider limiting it in their diet. But it's more nuanced than that. Last year, I published a paper reporting on my research on eating the current recommended serving of fruit each day versus eating less of it for weight-loss purposes. I'll spend the next 45 minutes going through the results, and then it'll be time for the coffee break. During the coffee break, feel free to wander to the dining room, where our sponsor has set up a booth to",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói đã làm gì vào năm ngoái?\n(A) Cô ấy bắt đầu hành nghề y của riêng mình.\n(B) Cô ấy đã nhận được một giải thưởng.\n(C) Cô ấy đã xuất bản một bài nghiên cứu.\n(D) Cô ấy đã phát triển một ứng dụng thể dục.\nCách diễn đạt tương đương:\n- astudy (một bài nghiên cứu) a paper reporting on my research (bài báo trình bày nghiên cứu của mình)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, do, last year.\n- Dang câu hỏi: thông tin chi tiết.\n- Người phụ nữ nhắc đến “Last year” (Năm ngoái) là dấu hiệu sắp đến đáp án. “Last year, | published a paper reporting on my research on eating the current recommended serving of fruit each day versus eating less of it for weight-loss purposes.” là thông tin chứa đáp an.\n- “astudy\" là cách diễn đạt tương đương của “a paper reporting on my research”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến những từ như “nutritional benefits”, “unhealthy”, “diet”, ... liên quan đến từ “medical” ở phương án, nhưng người nói không hề đề cập đến việc bắt đầu hành nghề y riêng.\n- Phương án (B) chứa thông tin không được đề cập.\n- (D) phuong án bẫy, bài nói có nhắc đến những từ như “nutritional benefits\", “unhealthy”, “diet”, ... liên quan đến từ “fitness” ở phương án, nhưng người nói không hề đề cập đến việc phát triển một ứng dụng thể dục.\n\nDịch bài nói:\nW-Br Chào buồi sáng. [98] Bài thuyết trình của tôi sẽ tập trung xem xét những lợi ích dinh dưỡng của việc ăn trái cây. Bệnh nhân thường thắc mắc liệu lượng đường trong trái cây có làm cho trái cây trở nên không tot cho sức khỏe hay không, thậm chí một sô người còn cân nhắc việc hạn chế nó trong chế độ ăn uống của mình. Nhưng điều này phức tạp hơn như vậy. [99] Năm ngoái, tôi đã công bố một bài báo trình bày nghiên cứu của mình vê việc ăn khẩu phần trái cây được khuyến nghị hiện nay mỗi ngày so với việc ăn ít trái cây hơn để giảm cân. Tôi sẽ dành 45 phút tiếp theo đề trình bày kết qua, và sau đó sẽ là thời gian nghỉ giải lao dé uống ca phê. [100] Trong giờ giải lao, hãy thoải mái ghé qua phòng ăn, nơi nhà tài trợ của chúng ta đã dựng một gian hàng đề thử nghiệm một loại đồ uống dinh dưỡng mới."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "100. According to the speaker, where can the listeners test a product? (A) In a lobby (B) In an auditorium (C) In a gift shop (D) In a dining area",
   "transcript": "Good morning. My presentation will look closely at the nutritional benefits of eating fruit. Patients often wonder whether the amount of sugar in fruit makes fruit unhealthy, and some even consider limiting it in their diet. But it's more nuanced than that. Last year, I published a paper reporting on my research on eating the current recommended serving of fruit each day versus eating less of it for weight-loss purposes. I'll spend the next 45 minutes going through the results, and then it'll be time for the coffee break. During the coffee break, feel free to wander to the dining room, where our sponsor has set up a booth to",
   "explanationVi": "Đáp án đúng: D\n\nTheo người nói, người nghe có thể thử một sản phẩm ở đâu?\n(A) Ở tiên sảnh\n(B) Trong khán phòng\n(C) Trong một cửa hàng quà tặng\n(D) Trong khu vực ăn uông\nCách diễn đạt tương đương:\n- adining area (khu vực ăn uống) = the dining room (phòng ăn) Cách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, speaker, where, listeners, test, product.\n- Dang câu hỏi: thông tin chi tiết.\n- “and then it'll be time for the coffee break.” (và sau đó sẽ là thời gian nghỉ giải lao để uống cà phê.) là dấu hiệu sắp đến đáp án. “During the coffee break, feel free to wander to the dining room, where our sponsor has set up a booth to sample a\nnew nutritional beverage.” là thông tin chứa đáp án. s “adining area” là cách diễn đạt tương đương của “the dining room’.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Cac phương án (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch bài nói:\nW-Br Chào buồi sáng. [98] Bài thuyết trình của tôi sẽ tập trung xem xét những lợi ích dinh dưỡng của việc ăn trái cây. Bệnh nhân thường thắc mắc liệu lượng đường trong trái cây có làm cho trái cây trở nên không tot cho sức khỏe hay không, thậm chí một sô người còn cân nhắc việc hạn chế nó trong chế độ ăn uống của mình. Nhưng điều này phức tạp hơn như vậy. [99] Năm ngoái, tôi đã công bố một bài báo trình bày nghiên cứu của mình vê việc ăn khẩu phần trái cây được khuyến nghị hiện nay mỗi ngày so với việc ăn ít trái cây hơn để giảm cân. Tôi sẽ dành 45 phút tiếp theo đề trình bày kết qua, và sau đó sẽ là thời gian nghỉ giải lao dé uống ca phê. [100] Trong giờ giải lao, hãy thoải mái ghé qua phòng ăn, nơi nhà tài trợ của chúng ta đã dựng một gian hàng đề thử nghiệm một loại đồ uống dinh dưỡng mới."
  }
 ],
 "4": [
  {
   "number": 1,
   "part": 1,
   "answer": "C",
   "textEn": "(A) He's cleaning the floor. (B) He's setting a plant on a shelt. (C) He's pouring some liquid into a cup. (D) He's ironing a shirt.",
   "transcript": "(A) He's cleaning the floor.\n(B) He's setting a plant on a shelt.\n(C) He's pouring some liquid into a cup.\n(D) He's ironing a shirt.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- Loại (A) vì chứa hành động không phù hợp với tranh - “cleaning the floor” (lau sàn nhà)\n- Loại (B) vì chứa hành động không phù hợp với tranh - “setting a plant on a shelf” (đặt một cái cây lên kệ). Phương án bẫy - các đối tượng như người đàn ông và cây đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (D) vì chứa hành động không phù hợp với tranh - “ironing a shirt\" (ủi một chiếc áo sơ mi)"
  },
  {
   "number": 2,
   "part": 1,
   "answer": "D",
   "textEn": "(A) They're glancing at a monitor. (B) They're putting pens in a jar. (C) They're wiping off a desk. (D) They're examining a document.",
   "transcript": "(A) They're glancing at a monitor.\n(B) They're putting pens in a jar.\n(C) They're wiping off a desk.\n(D) They're examining a document.",
   "explanationVi": "Đáp án đúng: D\n\nLoại trừ phương án sai\n- Loại (A) vì chứa hành động không phù hợp với tranh - “glancing at a monitor” (nhìn vào màn hình). Phương án bẫy - có đối tượng là màn hình máy tính xuất hiện trong tranh, nhưng hai người trong bức ảnh đầu đang không nhìn vào màn hình.\n- Loại (B) vì chứa hành động không phù hợp với tranh - “putting pens in a jar.” (đặt bút vào lo).\n- Loại (C) vì chứa hành động không phù hợp với tranh - “wiping off a desk” (lau bàn). Phương án bẫy - các đối tượng như hai người phụ nữ và bàn đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này"
  },
  {
   "number": 3,
   "part": 1,
   "answer": "A",
   "textEn": "(A) Some people are taking a ride on a boat. (B) A boat is floating under a bridge. (C) A boat is being loaded with cargo. (D) Some people are rowing a boat past a lighthouse.",
   "transcript": "(A) Some people are taking a ride on a boat.\n(B) A boat is floating under a bridge.\n(C) A boat is being loaded with cargo.\n(D) Some people are rowing a boat past a lighthouse.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai\n- Loại (B) vì chứa đối tượng không có trong tranh - “a bridge” (cây cầu).\n- Loại (C) vì chứa đối tượng không có trong tranh - “cargo” (hàng hóa).\n- Loại (D) vì chứa đối tượng không có trong tranh - “lighthouse” (ngọn hải đăng)."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "B",
   "textEn": "(A) There's a fire burning in a fireplace. (B) There's a guitar beside a fireplace. (C) Some cables have been left on the ground in a pile. (D) A television is being packed into a box.",
   "transcript": "(A) There's a fire burning in a fireplace.\n(B) There's a guitar beside a fireplace.\n(C) Some cables have been left on the ground in a pile.\n(D) A television is being packed into a box.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai\n- Loại (A) - phương án bẫy - mặc dù đối tượng lò sưởi có xuất hiện tuy nhiên đối tượng “a fire” (ngọn lửa) không có trong tranh.\n- Loại (C) vì chứa đối tượng không có trong tranh - “cables” (dây cáp).\n- Loại (D) - phương án bẫy - mặc dù đối tượng tivi có xuất hiện tuy nhiên đối tượng “a box\" (chiếc hộp) không có trong tranh."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "C",
   "textEn": "(A) Some people are riding bicycles through a field. (B) Some people are moving a picnic table. (C) There are some mountains in the distance. (D) A bicycle has fallen over on the ground.",
   "transcript": "(A) Some people are riding bicycles through a field.\n(B) Some people are moving a picnic table.\n(C) There are some mountains in the distance.\n(D) A bicycle has fallen over on the ground.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai\n- Loại (A) vì chứa hành động không phù hợp với tranh - “riding bicycles” (đạp xe)\n- Loại (B) vì chứa hành động không phù hợp với tranh - “moving a picnic table” (di chuyển bàn ăn ngoài trời)\n- Loại (D) - phương án bẫy - mặc dù đối tượng xe đạp có xuất hiện trong bức tranh, tuy nhiên câu này lại chứa thông tin không được thể hiện trong tranh - \"A bicycle has fallen over on the ground.\" (Một chiếc xe đạp bị ngã trên mặt đất.), chiếc xe đạp không hề bị ngã."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Some couches have been pushed against a wall. (B) Some lights have been hung from the ceiling. (C) Some cushions have been stacked on the floor. (D) Some flowers have been arranged in a vase.",
   "transcript": "(A) Some couches have been pushed against a wall.\n(B) Some lights have been hung from the ceiling.\n(C) Some cushions have been stacked on the floor.\n(D) Some flowers have been arranged in a vase.",
   "explanationVi": "Đáp án đúng: D\n\nLoại trừ phương án sai\n- Loại (A) - phương án bẫy - mặc dù có đối tượng ghế dài xuất hiện trong bức tranh, tuy nhiên không có thông tin nào liên quan đến việc chúng được đẩy vào tường.\n- Loại (B) - phương án bẫy - mặc dù có đối tượng đèn xuất hiện trong bức tranh, tuy nhiên chúng được gắn trên tường chứ không phải treo trên trần nhà,\n- Loại (C) - phương án bẫy - mặc dù đối tượng đệm có xuất hiện trong bức tranh, tuy nhiên chúng đang được đặt trên ghế, không phải đang xếp chồng trên sàn nhà."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "A",
   "textEn": "Does the shop open on Sundays? (A) Yes, at one o'clock. (B) Because we drove. (C) I'd like to return this item, please.",
   "transcript": "Does the shop open on Sundays?\n(A) Yes, at one o'clock.\n(B) Because we drove.\n(C) I'd like to return this item, please.",
   "explanationVi": "Đáp án đúng: A\n\nM-Au Quán có mở cửa vào chu nhật không? W-Am (A) Vâng, vào lúc một giờ.\n(B) Bởi vì chúng tôi đã lái xe.\n(C) Tôi muốn trả lại món hàng này.\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về việc \"cửa hàng có mở vào chủ nhật không” trong khi phương án trả lời cung cấp thông tin về \"vì chúng tôi lái xe\".\n- (C) Phương án bẫy. Phương án chứa từ \"item\" liên quan đến từ \"shop\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi muốn biết về việc \"cửa hàng có mở vào chủ nhật không”, trong khi phương án trả lời cung cấp thông tin về việc trả hàng."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "B",
   "textEn": "Where did these oranges come from? (A) Here's a basket you can use. (B) From a supplier in California. (C) That umbrella is a nice color.",
   "transcript": "Where did these oranges come from?\n(A) Here's a basket you can use.\n(B) From a supplier in California.\n(C) That umbrella is a nice color.",
   "explanationVi": "Đáp án đúng: B\n\nW-Br Những quả cam này đến từ đâu?\nM-Au (A) Đây là một cái giỏ bạn có thể sử dụng.\n(B) Từ một nhà cung cấp ở California.\n(C) Chiếc ô đó có màu sắc đẹp.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ \"basket\" liên quan đến từ \"oranges\" trong câu hỏi (có thể là giỏ đựng cam), nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi muốn biết “những quả cam đến từ đâu”, không phải tìm một chiếc giỏ để sử dụng.\n- (C) Phuong án bẫy về từ nhiều nghĩa. Nếu người học nhầm “oranges” (những quả cam) thành “orange\" (màu cam), người học có thể nhầm lẫn với ý khen màu sắc của chiếc ô."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "B",
   "textEn": "Should I make the dinner reservation for Friday or Saturday? (A) The Beachside Bistro. (B) Saturday is better. (C) A large plate of pasta.",
   "transcript": "Should I make the dinner reservation for Friday or Saturday?\n(A) The Beachside Bistro.\n(B) Saturday is better.\n(C) A large plate of pasta.",
   "explanationVi": "Đáp án đúng: B\n\nW-Am Tôi có nên đặt bữa tối vào thứ Sáu hoặc thứ Bảy không? W-Br (A) Quán rượu bên bờ biên.\n(B) Thứ Bay thi tot hon.\n(C) Một đĩa mì ông lớn.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ \"The Beachside Bistro\" liên quan đến từ \"reservation\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi muốn hỏi về thời gian đặt chỗ, không phải địa điểm.\n- (C) Phuong án bẫy. Phương án chứa từ \"pasta\" liên quan đến từ \"dinner\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi muốn hỏi về thời gian đặt chỗ, không phải món ăn đặt trước."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "A",
   "textEn": "Will Dr. lvanova be late today? (A) No, you shouldn't have to wait long. (B) It's just under the desk. (C) Sure, I can do that for you.",
   "transcript": "Will Dr. lvanova be late today?\n(A) No, you shouldn't have to wait long.\n(B) It's just under the desk.\n(C) Sure, I can do that for you.",
   "explanationVi": "Đáp án đúng: A\n\nM-Au Hôm nay bác sĩ Ivanova có đến muộn không? W-Br (A) Không, bạn không cần phải đợi lâu.\n(B) Nó ở ngay dưới bàn làm việc.\n(C) Chắc chắn rồi, tôi có thể làm điều đó cho bạn.\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về việc \"hôm nay bác sĩ lvanova có đến muộn không\" trong khi phương án trả lời cung cấp thông tin về \"nó ở ngay dưới bàn làm việc”.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về việc \"hôm nay bác sĩ lvanova có đến muộn không\" trong khi phương án trả lời cung cấp thông tin về \"chắc chắn rồi, tôi có thể làm điều đó cho bạn\"."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "C",
   "textEn": "Aren't there locker rooms at this gym? (A) These socks are quite comfortable. (B) She teaches an exercise class. (C) Yes, they're on the lower floor.",
   "transcript": "Aren't there locker rooms at this gym?\n(A) These socks are quite comfortable.\n(B) She teaches an exercise class.\n(C) Yes, they're on the lower floor.",
   "explanationVi": "Đáp án đúng: C\n\nM-Au Phòng tập này không có phòng chứa tủ khoá à? M-Cn (A) Những chiếc tất này khá thoải mái\n(B) Cô ấy dạy một lớp tập thể dục.\n(C) Có, chúng ở tằng dưới.\nLoại trừ phương án sai:\n- (A) Phương án bay. Từ “locker” va “socks” có phát âm gần giống nhau nên có thé gây nhầm lẫn. Tuy nhiên, thông tin câu trả lời không phù hợp với ý hỏi vì câu hỏi liên quan đến các tử khóa nhưng người trả lời lại đề cập đến các đôi vớ.\n- (B) Phuong án bẫy. Phương án chứa từ \"exercise\" liên quan đến từ \"gym\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi hỏi về phòng chứa tủ khoá, nhưng đáp án lại cung cấp thông tin “cô ấy dạy một lớp tập thể dục”."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "A",
   "textEn": "Who needs a copy of my safety training certificate? (A) Maksim does. (B) You can hang your vest on that hook. (C) No, I'm certain about that.",
   "transcript": "Who needs a copy of my safety training certificate?\n(A) Maksim does.\n(B) You can hang your vest on that hook.\n(C) No, I'm certain about that.",
   "explanationVi": "Đáp án đúng: A\n\nM-cn Ai cần ban sao chứng chỉ huấn luyện an toàn của tôi? W-Am (A) Maksim cần.\n(B) Bạn có thể treo áo vest của mình lên cái móc đó.\n(C) Không, tôi chắc chắn về điều đó.\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về việc “ai cần bản sao chứng chỉ huấn luyện an toàn của tôi\" trong khi phương án trả lời cung cấp thông tin về \"bạn có thể treo áo vest của mình lên cái móc đó\".\n- (C) Phương án có nội dung không phù hợp ý hỏi, vì không thể trả lời Yes/No cho câu hỏi Who."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "Could you phone Mr. Feras and let him know we're in the hotel lobby? (A) Thank you, it was just renovated. (B) A free continental breakfast. (C) Yes, of course.",
   "transcript": "Could you phone Mr. Feras and let him know we're in the hotel lobby?\n(A) Thank you, it was just renovated.\n(B) A free continental breakfast.\n(C) Yes, of course.",
   "explanationVi": "Đáp án đúng: C\n\nM-Cn Bạn có thể gọi điện cho ông Feras và cho ông ấy biết chúng ta đang ở sánh khách sạn được không? W-Br (A) Cảm ơn bạn, nó vừa mới được cai tạo.\n(B) Bữa sáng kiểu lục địa miễn phí.\n(C) Vâng, tất nhiên.\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về việc \"bạn có thể gọi điện cho ông Feras và cho ông ấy biết chúng ta đang ở sảnh khách sạn được không\" trong khi phương án tra lời cung cấp thông tin về “cam ơn bạn, nó vừa mới được cải tao\".\n- (B) Phuong án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về việc \"bạn có thể gọi điện cho ông Feras và cho ông ấy biết chúng ta đang ở sảnh khách sạn được không\" trong khi phương án trả lời cung cấp thông tin về \"bữa sáng kiểu lục địa miễn phí\"."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "C",
   "textEn": "Where does she sell her handmade jewelry? (A) They'll give you a discount. (B) A pair of earrings. (C) At a store in the city center.",
   "transcript": "Where does she sell her handmade jewelry?\n(A) They'll give you a discount.\n(B) A pair of earrings.\n(C) At a store in the city center.",
   "explanationVi": "Đáp án đúng: C\n\nW-Br Cô ấy bán dé trang sức thủ công 6 đâu? M-Au (A) Họ sẽ giảm giá cho bạn.\n(B) Một đôi bông tai.\n(C) Tại một cửa hàng ở trung tâm thành phó.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ \"discount\" liên quan đến từ \"sell\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi hỏi về việc bán đồ trang sức thủ công ở đâu, nhưng đáp án lại cung cấp thông tin “họ sẽ giảm giá cho bạn”.\n- (B) Phuong án bẫy. Phương án chứa từ \"earrings\" liên quan đến từ \"sell\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “một đôi bông tai\" không thể trả lời cho câu hỏi về việc bán đồ trang sức thủ công ở đâu."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "A",
   "textEn": "You're taking a business class in the afternoon, aren't you? (A) Actually, it's in the morning. (B) That office is on the corner. (C) I have the train schedule here.",
   "transcript": "You're taking a business class in the afternoon, aren't you?\n(A) Actually, it's in the morning.\n(B) That office is on the corner.\n(C) I have the train schedule here.",
   "explanationVi": "Đáp án đúng: A\n\nW-Br Chiều nay bạn học lớp kinh doanh phải không? M-Cn (A) Thực ra nó vào buôi sáng.\n(B) Văn phòng đó ở góc đường.\n(C) Tôi có lịch trình tàu ở đây.\nLoại trừ phương án sai:\n- (B) Phương án bẫy. Phương án chứa từ \"office\" liên quan đến từ \"business\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án về địa điểm văn phòng không thể trả lời cho câu hỏi “chiều nay bạn học lớp kinh doanh phải không?”.\n- (C) Phuong án bẫy về từ nhiều nghĩa. Cum “business class\" có thể nói về ghế hạng thương gia trên một loại phương tiện nào đó, bên cạnh nghĩa lớp học kinh doanh, nên người học có thể nhầm lẫn khi đáp án này có đề cập tới phương tiện là tàu."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "C",
   "textEn": "Could I see some sample floral arrangements before I order? (A) It's for an award ceremony. (B) A charge for expedited delivery. (C) Certainly, I have some right here.",
   "transcript": "Could I see some sample floral arrangements before I order?\n(A) It's for an award ceremony.\n(B) A charge for expedited delivery.\n(C) Certainly, I have some right here.",
   "explanationVi": "Đáp án đúng: C\n\nM-Au Tôi có thể xem một số mẫu cắm hoa trước khi đặt hàng không? W-Br (A) Nó dành cho lễ trao giải.\n(B) Phí giao hàng nhanh.\n(C) Chắc chắn rồi, tôi có một ít ở đây.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “award ceremony” có liên quan đến từ “floral arrangements\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi, và chủ từ số ít “it” cũng không tương đồng với “some sample floral arrangements” (số nhiều) trong câu hỏi. Câu hỏi hỏi về việc xem một số mẫu cắm hoa, không phải mục đích của chúng.\n- (B) Phương án bẫy. Phương án chứa từ \"delivery\" liên quan đến từ \"order\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án về phí giao hàng nhanh không thể trả lời cho câu hỏi “tôi có thể xem một số mẫu cắm hoa trước khi đặt hàng không?”."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "B",
   "textEn": "Don't you want to buy the black sofa? (A) Some customer reviews. (B) We already have one. (C) I take my coffee with sugar.",
   "transcript": "Don't you want to buy the black sofa?\n(A) Some customer reviews.\n(B) We already have one.\n(C) I take my coffee with sugar.",
   "explanationVi": "Đáp án đúng: B\n\nM-Cn Bạn không muốn mua chiếc ghế sofa màu đen a? M-Au (A) Một số đánh giá của khách hàng.\n(B) Chúng tôi đã có một cái rồi.\n(C) Tôi uống cà phê với đường.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “customer reviews” có liên quan đến từ “buy\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “một số đánh giá của khách hợp\" không thể trả lời câu hỏi về việc mua chiếc ghế sofa màu đen.\n- (C) Phương án có nội dung không phù hợp ý hỏi. Đáp án “tôi uống cà phê với đường” không thể trả lời câu hỏi về việc mua chiếc ghế sofa màu đen."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "A",
   "textEn": "Do you have this jacket in a larger size? (A) Oh, I'm not a sales associate. (B) I've read the information packet. (C) A very large uniform.",
   "transcript": "Do you have this jacket in a larger size?\n(A) Oh, I'm not a sales associate.\n(B) I've read the information packet.\n(C) A very large uniform.",
   "explanationVi": "Đáp án đúng: A\n\nM-Au Bạn có áo khoác này cỡ lớn hơn không? W-Am\n(A) Ò, tôi không phải là cộng tác viên bán hàng.\n(B) Tôi đã đọc gói thông tin.\n(C) Một bộ đồng phục rất lớn.\nLoại trừ phương án sai:\n- (B) Phuong án bẫy. Phương án chứa từ “packet” có phát âm gần giống với “jacket\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “tôi đã đọc gói thông tin\" không thể trả lời câu hỏi về “bạn có chiếc áo khoác này cỡ lớn không\".\n- (C) Phương án bẫy. Phương án chứa từ “large” có phát âm gần giống với từ phát sinh “larger\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “một bộ đồng phục rất lớn\" không thể trả lời câu hỏi về “bạn có chiếc áo khoác này cỡ lớn không”."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "C",
   "textEn": "Where did you first learn about the job opening? (A) Are there any outdoor tables available? (B) The door to the building is still open. (C) I read an online newspaper every morning.",
   "transcript": "Where did you first learn about the job opening?\n(A) Are there any outdoor tables available?\n(B) The door to the building is still open.\n(C) I read an online newspaper every morning.",
   "explanationVi": "Đáp án đúng: C\n\nW-Am Lần đầu tiên bạn biết đến cơ hội việc làm này là ở đâu? M-Au (A) Có bàn ngoài trời nào không?\n(B) Cánh cửa vào tòa nhà vẫn mở.\n(C) Tôi đọc báo trực tuyến mỗi sáng.\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Dap án “có bàn nào ngoài trời không” không thể trả lời câu hỏi về lần đầu tiên biết đến cơ hội làm việc.\n- (B) Phương án bẫy. Phương án chứa từ “open” có phát âm gần giống với từ phát sinh “opening” trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “cách cửa vào toà nhà vẫn mở\" không thể trả lời câu hỏi về lần đầu tiên biết đến cơ hội làm việc."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "Should I bring anything to the meeting? (A) Probably in the conference room. (B) They were hired by our manager. (C) Do we have enough handouts?",
   "transcript": "Should I bring anything to the meeting?\n(A) Probably in the conference room.\n(B) They were hired by our manager.\n(C) Do we have enough handouts?",
   "explanationVi": "Đáp án đúng: C\n\nW-Br Tôi có nên mang gì đến cuộc hop không? M-Cn (A) Có lẽ đang ở trong phòng họp.\n(B) Họ được người quản lý của chúng tôi thuê.\n(C) Chúng ta có đủ tài liệu phát tay không?\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ \"conference\" liên quan đến từ \"meeting\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Người hỏi hỏi về việc có nên mang gì tới cuộc họp không, nhưng phương án lại cung cấp thông tin “có lẽ đang ở trong phòng họp”.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi hỏi về việc có nên mang gì tới cuộc họp không, nhưng phương án lại cung cấp thông tin “họ được người quản lý của chúng tôi thuê”."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "A",
   "textEn": "What was the total charge for the hotel stay? (A) Id have to look at the receipt. (B) The fitness center is across from the reception desk. (C) III be eating breakfast in my room.",
   "transcript": "What was the total charge for the hotel stay?\n(A) Id have to look at the receipt.\n(B) The fitness center is across from the reception desk.\n(C) III be eating breakfast in my room.",
   "explanationVi": "Đáp án đúng: A\n\nW-Am Tổng chi phí lưu trú tại khách san là bao nhiêu? M-Au (A) Tôi phải xem biên lai.\n(B) Trung tâm thể dục nằm đối diện bàn tiếp tân.\n(C) Tôi sẽ ăn sáng trong phòng.\nLoại trừ phương án sai:\n- (B) Phương án bẫy. Phương án chứa từ \"reception desk\" liên quan đến từ \"hotel\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án \"trung tâm thể dục nằm đối diện bàn tiếp tân” không thể trả lời cho câu hỏi về tổng chi phí lưu trú tại khách sạn.\n- (C) Phuong án bẫy. Phương án chứa từ \"room\" liên quan đến từ \"hotel stay\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án \"tôi sẽ ăn sáng trong phòng” không thể trả lời cho câu hỏi về tổng chỉ phí lưu trú tại khách sạn."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "A",
   "textEn": "Why did you pursue a career in video game design? (A) Because I have a talent for it. (B) This is my new laptop. (C) It's on the other shelf.",
   "transcript": "Why did you pursue a career in video game design?\n(A) Because I have a talent for it.\n(B) This is my new laptop.\n(C) It's on the other shelf.",
   "explanationVi": "Đáp án đúng: A\n\nM-Cn Tại sao bạn theo đuổi nghề thiết kế trò chơi điện tử? W-Br (A) Bởi vì tôi có tài năng về việc đó.\n(B) Đây là máy tính xách tay mới của tôi.\n(C) Nó ở trên kệ khác.\nLoại trừ phương án sai:\n- (B) Phương án bẫy. Phương án chứa từ \"laptop\" liên quan đến từ \"video game design\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Thông tin \"đó là máy tính xách tay mới của tôi\" không thể trả lời cho câu hỏi về lí do theo đuổi nghề thiết kế trò chơi điện tử.\n- (C) Phương án có nội dung không phù hợp ý hỏi. Thông tin \"nó ở trên kệ khác\" không thể trả lời cho câu hỏi về lí do theo đuổi nghề thiết kế trò chơi điện tử."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "C",
   "textEn": "I'd like to attend the job fair next month. (A) The speech was inspiring. (B) Tunji updated the memo. (C) Registration closed yesterday.",
   "transcript": "I'd like to attend the job fair next month.\n(A) The speech was inspiring.\n(B) Tunji updated the memo.\n(C) Registration closed yesterday.",
   "explanationVi": "Đáp án đúng: C\n\nW-Br Tôi muốn tham dự hội chợ việc làm vào tháng tới. M-Au (A) Bai phát biểu day cam hứng.\n(B) Tunji da cap nhat ban ghi nho.\n(C) Dang ky đã dong ngày hôm qua.\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Thông tin \"bai phát biểu đầy cảm hứng\" không thể đáp lại câu nói “tối muốn tham dự hội chợ việc làm vào tháng tới”.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin \"Tunji đã cập nhật bản ghi nhớ\" không thể đáp lại câu nói “tối muốn tham dự hội chợ việc làm vào tháng tới”."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "C",
   "textEn": "Hasn't anyone called you back for the second interview yet? (A) A new phone number. (B) Yes, any available position. (C) I'm still waiting.",
   "transcript": "Hasn't anyone called you back for the second interview yet?\n(A) A new phone number.\n(B) Yes, any available position.\n(C) I'm still waiting.",
   "explanationVi": "Đáp án đúng: C\n\nW-Br Chưa có ai gọi lại cho bạn đề phỏng van lần thứ hai a? M-Cn (A) Một số điện thoại mới.\n(B) Có, bat kỳ vị trí nào còn trồng.\n(C) Tôi vẫn đang đợi.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ \"phone number\" liên quan đến từ \"called\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Thông tin \"một số điện thoại mới\" không thể trả lời cho câu hỏi “chưa có ai gọi lại cho bạn để phỏng vấn lần thứ hai à”.\n- (B) Phương án bẫy. Phương án chứa từ \"available position\" liên quan đến từ \"interview\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Thông tin \"có, bất kỳ một vị trí nào còn trống\" không thể trả lời cho câu hỏi “chưa có ai gọi lại cho bạn để phỏng vấn lần thứ hai à”."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "C",
   "textEn": "How many tickets do we need for tonight's concert? (A) The theater is on Johnson Avenue. (B) At seven thirty sharp. (C) IIl buy mine at the door.",
   "transcript": "How many tickets do we need for tonight's concert?\n(A) The theater is on Johnson Avenue.\n(B) At seven thirty sharp.\n(C) IIl buy mine at the door.",
   "explanationVi": "Đáp án đúng: C\n\nM-Au Chúng ta cần bao nhiêu vé cho buổi hòa nhạc tối nay? W-Am (A) Nhà hát nằm trên Dai lộ Johnson.\n(B) Đúng bảy giờ ba mươi.\n(C) Tôi sẽ mua của tôi ở cửa.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ \"theater\" liên quan đến từ \"concert\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Câu hỏi hỏi về số lượng vé cho buổi hoà nhạc, nhưng phương án này lại cung cấp thông tin về địa điểm của một nhà hát.\n- (B) Phuong án bẫy. Phương án chứa con số là “seven\" và “thirty” nên có thể gây ra nhầm lẫn rằng phương án này bao gồm số lượng vé, nhưng nó lại đang chỉ thời gian bảy giờ ba mươi."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "B",
   "textEn": "When are they going to decide who to hire? (A) A much higher salary. (B) A lot of good resumes have come in. (C) In the building across the street.",
   "transcript": "When are they going to decide who to hire?\n(A) A much higher salary.\n(B) A lot of good resumes have come in.\n(C) In the building across the street.",
   "explanationVi": "Đáp án đúng: B\n\nW-Am Khi nào họ sẽ quyết định thuê ai?\nM-Cn (A) Mức lương cao hơn nhiều.\n(B) Rất nhiều ban lý lich tốt đã được gửi dén.\n(C) Trong tòa nhà bên kia đường.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “higher” có phát âm tương tự với từ “hire” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “mức lương cao hơn nhiều\" không thể trả lời cho câu hỏi “khi nào họ sẽ quyết định thuê ai\".\n- (C)) Phuong án có nội dung không phù hợp ý hỏi. Thông tin \"trong toà nhà bên kia đường\" không thé trả lời cho câu hỏi “khi nào họ sẽ quyết định thuê ai\"."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "C",
   "textEn": "I had a chance to look over the contract this morning. (A) Their contact information. (B) Early next week. (C) What did you think of it?",
   "transcript": "I had a chance to look over the contract this morning.\n(A) Their contact information.\n(B) Early next week.\n(C) What did you think of it?",
   "explanationVi": "Đáp án đúng: C\n\nM-Au Sáng nay tôi đã có cơ hội xem qua hợp đồng. W-Am (A) Thông tin liên lạc của họ.\n(B) Đầu tuân tới.\n(C) Bạn nghĩ gì về nó?\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “contact” có phát âm tương tự với từ “contract” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “thông tin liên lạc của họ\" không thể được dùng để đáp lại thông tin “sáng nay tôi đã có cơ hội xem qua hợp đồng”.\n- (B) Phương án bay. Phương án có từ “next week\" có thể liên hệ với từ “morning\" chỉ thời gian trong câu hỏi, những nội dung cả câu không phù hợp ý hỏi. Đáp án\n“đầu tuần tới\" không thể được dùng để đáp lại thông tin “sáng nay tôi đã có cơ hội xem qua hợp đồng”."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "How are the database updates coming along? (A) I've been really busy with the Williams account. (B) Some customer addresses. (C) She arrives on Wednesday.",
   "transcript": "How are the database updates coming along?\n(A) I've been really busy with the Williams account.\n(B) Some customer addresses.\n(C) She arrives on Wednesday.",
   "explanationVi": "Đáp án đúng: A\n\nW-Am Các bản cập nhật cơ sở dữ liệu diễn ra như thế nào? W-Br (A) Tôi thực sự bận rộn với tài khoản Williams.\n(B) Một số địa chỉ khách hàng.\n(C) Cô ấy đến vào thứ Tư.\nLoại trừ phương án sai:\n- (B) Phương án bẫy. Phương án có từ “customer addresses\" có thể liên hệ với từ “database\" chỉ thời gian trong câu hỏi, những nội dung cả câu không phù hợp ý hỏi. Đáp án “một số địa chỉ khách hàng\" không thể được dùng để trả lời câu hỏi “các bản cập nhật cơ sở dữ liệu diễn ra như thế nào\".\n- (C) Phuong án có nội dung không phù hợp ý hỏi. Thông tin \"cô ấy đến vào thứ Tư\" không thể trả lời cho câu hỏi “các bản cập nhật cơ sở dữ liệu diễn ra như thế nào\"."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "When can I bring these boxes into the warehouse? (A) Ten in a package. (B) Thanks-I just bought it. (C) We\"I need to clear some space.",
   "transcript": "When can I bring these boxes into the warehouse?\n(A) Ten in a package.\n(B) Thanks-I just bought it.\n(C) We\"I need to clear some space.",
   "explanationVi": "Đáp án đúng: C\n\nM-Au Khi nào tôi có thể mang những hộp này vào kho? W-Am (A) Mười trong một gói.\n(B) Cảm ơn - Tôi vừa mua nó.\n(C) Chúng ta cần giải phóng một số không gian.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án có từ “package\" có thể liên hệ với từ “boxes\" chỉ thời gian trong câu hỏi, những nội dung cả câu không phù hợp ý hỏi. Đáp án “mười trong một gói\" không thể được dùng để trả lời câu hỏi “khi nào tôi có thể mang những hộp này vào kho”.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Thông tin \"cảm ơn - tôi vừa mua nó\" không thể trả lời cho câu hỏi “khi nào tôi có thể mang những hộp này vào kho\"."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "B",
   "textEn": "The market on Fifth Street is closed for a week. (A) Some new clothes. (B) Is there another one nearby? (C) The price has been marked down.",
   "transcript": "The market on Fifth Street is closed for a week.\n(A) Some new clothes.\n(B) Is there another one nearby?\n(C) The price has been marked down.",
   "explanationVi": "Đáp án đúng: B\n\nM-Cn Chợ trên phố Fifth đóng cửa trong một tuần. W-Br (A) Một sô quân áo mới.\n(B) Có cái nào khác ở gần đây không?\n(C) Giá đã được giảm xuông.\nLoại trừ phương án sai:\n- (A) Phương án bẫy về phát âm tương tự. Phương án chứa từ “clothes” có phát âm tương tự với từ “closed” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “một số quần áo mới\" không thể được dùng để đáp lại thông tin “chợ trên phố Fifth đóng cửa trong một tuần\".\n- (C) Phuong án bẫy về phát âm tương tự. Phương án chứa từ “marked” có phát âm tương tự với từ “market” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi. Đáp án “giá đã được giảm xuống\" không thể được dùng để đáp lại thông tin “chợ trên phố Fifth đóng cửa trong một tuần”."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "B",
   "textEn": "Does the company pay for professional-development courses? (A) Insook helped develop a new product. (B) We do have a significant budget surplus. (C) He's always so professional.",
   "transcript": "Does the company pay for professional-development courses?\n(A) Insook helped develop a new product.\n(B) We do have a significant budget surplus.\n(C) He's always so professional.",
   "explanationVi": "Đáp án đúng: B\n\nM-Au Công ty có chi trả cho các khóa học phát triển chuyên môn không? W-Br (A) Insook đã giúp phát triển một sản phẩm mới.\n(B) Chúng tôi có thing dư ngân sách đáng kề.\n(C) Anh ấy luôn rất chuyên nghiệp.\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “develop” có phát âm gần giống với từ phát sinh “development\" trong câu hỏi, nhưng nội dung cả câu không phù hợp ý hỏi. Thông tin “Insook đã giúp phát triển một sản phẩm mới\" không thể trả lời câu hỏi về việc công ty có chỉ trả cho các khoá học phát triển chuyên môn không.\n- (C) Phuong án bẫy. Phương án lặp lại từ “professional” trong câu hỏi nhưng nội dung không phù hợp ý hỏi. Thông tin “anh ấy luôn rất chuyên nghiệp\" không thể trả lời câu hỏi về việc công ty có chỉ trả cho các khoá học phát triển chuyên môn không."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "A",
   "group": "32-34",
   "textEn": "32. Where most likely are the speakers? (A) At a ferry terminal (B) At a swimming area (C) At a shopping mall (D) At a restaurant",
   "transcript": "W: Excuse me, but wasn't the ferry to Osaka supposed to leave at ten o'clock?\nM: Yes, but athe port authority has suspended all marine traffic due to rough water.\nW: I see. Does that mean ferries are canceled all day?\nM: This storm is expected to pass in about three hours. But operations should return to normal after that. Your ticket will be good until midnight.\nW: OK. Then I guess I'll grab some lunch nearby.\nM: I highly recommend Mary's Cafe for sandwiches and soup.",
   "explanationVi": "Đáp án đúng: A\n\n32. Người nói có thể đang ở đâu nhất?\n(A) Tại bến phà\n(B) Tại một khu vực bơi lội\n(C) Tại một trung tâm mua sắm\n(D) Tại một nhà hàng\nCách diễn đạt tương đương:\nferry terminal (bến pha) = the ferry to Osaka (pha đến Osaka)\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: where, speakers\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Từ câu hỏi của người phụ nữ “wasn't the ferry to Osaka supposed to leave at ten o'clock?\" (pha đến Osaka không phải sẽ rời khỏi lúc mười giờ sao?) va câu trả lời “Yes\" (Vâng) của người đàn ông đã thể hiện rõ những người nói có khả năng đang ở tại bến phà nhất.\n- \"ferry terminal” là cách diễn đạt tương đương của “the ferry to Osaka”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- (B) phương án bẫy, người đàn ông có nhắc đến thông tin “rough water” để ám chỉ tình hình biển động, không liên quan đến khu vực bơi lội.\n- (C) chia thông tin không được đề cập. s (D) phương án bẫy, người đàn ông có đề xuất một địa điểm ăn uống mà người phụ nữ có thể đến trong lúc chờ phà là “Mary's Café”, tuy nhiên, nhà hàng chỉ là một địa điểm gợi ý, không phải là nơi mà họ đang ở.\n\nDịch hội thoại:\nW-Am Xin lỗi, nhưng [32] pha đến Osaka không phải sẽ rời khỏi lúc mười giờ sao? M-Cn [32] Vâng, nhưng mà [33] cơ quan cảng đã tạm ngừng mọi hoạt động giao thông hàng hải do biển động.\nW-Am Tôi hiéu rồi. Điều đó có nghĩa là các chuyến pha bị hủy ca ngày luôn phải không? M-Cn Dự kiến cơn bão này sẽ qua sau khoảng ba giờ. Nhưng các hoạt động sẽ trở lại bình thường sau đó. Vé của bạn sẽ có hiệu lực cho đến nửa đêm.\nW-Am Được. [34] Vậy thì tôi nghĩ tôi sẽ đi ăn trưa gần đây.\nM-Cn Tôi đặc biệt giới thiệu Mary's Café cho món bánh mì và súp."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "33. What problem does the man mention? (A) Some repairs are needed (B) A business is understaffed. (C) The weather is bad. (D) Some tickets are sold out.",
   "transcript": "W: Excuse me, but wasn't the ferry to Osaka supposed to leave at ten o'clock?\nM: Yes, but athe port authority has suspended all marine traffic due to rough water.\nW: I see. Does that mean ferries are canceled all day?\nM: This storm is expected to pass in about three hours. But operations should return to normal after that. Your ticket will be good until midnight.\nW: OK. Then I guess I'll grab some lunch nearby.\nM: I highly recommend Mary's Cafe for sandwiches and soup.",
   "explanationVi": "Đáp án đúng: C\n\n33. Người dan ông dé cập đến van dé gì?\n(A) Cân phải sửa chữa một số thứ.\n(B) Một doanh nghiệp đang thiếu nhân lực.\n(C) Thời tiết xấu.\n(D) Một số vé đã được bán hết.\nCách diễn đạt tương đương:\nthe weather is bad (thời tiết xấu) ~ rough water (biển động)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, problem, man, mention\n- Dang câu hỏi: thông tin chi tiết\n- Từ “but\" (nhưng mà...) trong lời thoại từ người đàn ông là dấu hiệu sắp đến dap án. Câu nói \"the port authority has suspended all marine traffic due to rough water\" (cơ quan cảng đã tạm ngừng mọi hoạt động giao thông hàng hải do biển động) là thông tin chứa đáp án. Từ lời thoại này có thể thấy vấn đề mà người đàn ông đang nhắc đến là tình hình biển động (chứng tỏ thời tiết xấu) đã gây ra sự trì hoãn cho các hoạt động giao thông hàng hải.\n- “the weather is bad” là cách diễn đạt tương đương của “rough water\".\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n(A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Xin lỗi, nhưng [32] pha đến Osaka không phải sẽ rời khỏi lúc mười giờ sao? M-Cn [32] Vâng, nhưng mà [33] cơ quan cảng đã tạm ngừng mọi hoạt động giao thông hàng hải do biển động.\nW-Am Tôi hiéu rồi. Điều đó có nghĩa là các chuyến pha bị hủy ca ngày luôn phải không? M-Cn Dự kiến cơn bão này sẽ qua sau khoảng ba giờ. Nhưng các hoạt động sẽ trở lại bình thường sau đó. Vé của bạn sẽ có hiệu lực cho đến nửa đêm.\nW-Am Được. [34] Vậy thì tôi nghĩ tôi sẽ đi ăn trưa gần đây.\nM-Cn Tôi đặc biệt giới thiệu Mary's Café cho món bánh mì và súp."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "34. What will the woman do next? (A) Read a book (B) Get a meal (C) Watch a movie (D) Go to a hotel",
   "transcript": "W: Excuse me, but wasn't the ferry to Osaka supposed to leave at ten o'clock?\nM: Yes, but athe port authority has suspended all marine traffic due to rough water.\nW: I see. Does that mean ferries are canceled all day?\nM: This storm is expected to pass in about three hours. But operations should return to normal after that. Your ticket will be good until midnight.\nW: OK. Then I guess I'll grab some lunch nearby.\nM: I highly recommend Mary's Cafe for sandwiches and soup.",
   "explanationVi": "Đáp án đúng: B\n\n34. Người phụ nữ sẽ làm gì tiếp theo?\n(A) Đọc một cuốn sách\n(B) Đi ăn\n(C) Xem phim\n(D) Đi đến khách sạn\nCách diễn đạt tương đương:\nget a meal (có một bữa ăn) = grab some lunch (đi ăn trưa)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, do, next\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại của người phụ nữ “Then | guess...” (Vậy thì tôi nghĩ...) là dấu hiệu sắp đến dap an. “I'll grab some lunch nearby.\" (tôi sẽ đi ăn trưa ở gần đây) là thông tin chứa đáp án. Từ thông tin này có thể thấy hành động tiếp theo của người phụ nữ là đi ăn trong lúc đợi phà hoạt động trở lại.\n- “geta meal” là cách diễn đạt tương đương của “grab some lunch’.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n(A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- ferry (n): pha\n- port authority (n-n): cơ quan cảng\n- storm (n): bão\n- pass(v): trôi qua\n- suspend (v): đình chỉ\n- = midnight (n): nửa đêm\n- recommend (v): dé xuất, giới thiệu\n- nearby (adj): gần đó\n\nDịch hội thoại:\nW-Am Xin lỗi, nhưng [32] pha đến Osaka không phải sẽ rời khỏi lúc mười giờ sao? M-Cn [32] Vâng, nhưng mà [33] cơ quan cảng đã tạm ngừng mọi hoạt động giao thông hàng hải do biển động.\nW-Am Tôi hiéu rồi. Điều đó có nghĩa là các chuyến pha bị hủy ca ngày luôn phải không? M-Cn Dự kiến cơn bão này sẽ qua sau khoảng ba giờ. Nhưng các hoạt động sẽ trở lại bình thường sau đó. Vé của bạn sẽ có hiệu lực cho đến nửa đêm.\nW-Am Được. [34] Vậy thì tôi nghĩ tôi sẽ đi ăn trưa gần đây.\nM-Cn Tôi đặc biệt giới thiệu Mary's Café cho món bánh mì và súp."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "35. Who most likely is the woman? (A) An author (B) A librarian (C) A bookseller (D) An event organizer",
   "transcript": "W: Good morning. Are you looking for any particular library book, magazine, or newspaper?\nM: Actually, no. I'm here because I got an e-mail this morning telling me that I have an overdue book. But I returned it to the after-hours bin last night.\nW: Sometimes a book gets returned and put back on the shelves without being entered into the system first. I can take a look. Can you tell me the title?",
   "explanationVi": "Đáp án đúng: B\n\n35. Người phụ nữ có khả năng là ai nhất ?\n(A) Một tác giả\n(B) Một thủ thư\n(C) Một người bán sách\n(D) Người tổ chức sự kiện\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, woman\n- Dạng câu hỏi: thông tin tổng quát\n- Câu hỏi từ người phụ nữ “Are you looking for any particular library book, magazine, or newspaper?” (Ban có đang tìm sách, tap chí hoặc tờ báo cụ thể nào đó trong thư viện không?) là thông tin chứa đáp án. Từ lời thoại có thể nhận thấy người phụ nữ có thể là một thủ thư trông coi thư viện và đang muốn giúp đỡ khách hàng tìm kiếm tài liệu mà họ cần.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A),(D) chứa thông tin không được đề cập.\n- (C) phương án bẫy, câu hỏi từ người phụ nữ có sự tương đồng với câu hỏi của một người bán sách khi chào hỏi khách hàng, tuy nhiên, nội dung câu hỏi đã thể hiện rõ người phụ nữ đang hỗ trợ khách hàng tìm kiếm tài liệu trong thư viện.\n\nDịch hội thoại:\nW-Br Chào buồi sang. [35] Ban có dang tìm sách, tap chí hoặc tờ báo cụ thé nào đó trong thư viện không?\nM-Cn Thực ra là không. [36] Tôi đến đây vì sáng nay tôi nhận được một e-mail thông báo rằng tôi có một cuốn sách quá hạn. Nhưng tối qua tôi đã trả lại nó vào thùng chứa tài liệu trả lại ngoài giờ làm việc.\nW-Br [37] Đôi khi một cuốn sách được trả lại và đặt trở lại kệ mà không được nhập vào hệ thống trước. Tôi có thể xem qua. Bạn có thể cho tôi biết tiêu đề của quyền sách không?"
  },
  {
   "number": 36,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "36. What does the man say happened this morning? (A) He received an e-mail notification. (B) He applied for a job online. (C) He lost a receipt. (D) He made a delivery.",
   "transcript": "W: Good morning. Are you looking for any particular library book, magazine, or newspaper?\nM: Actually, no. I'm here because I got an e-mail this morning telling me that I have an overdue book. But I returned it to the after-hours bin last night.\nW: Sometimes a book gets returned and put back on the shelves without being entered into the system first. I can take a look. Can you tell me the title?",
   "explanationVi": "Đáp án đúng: A\n\n36. Người đàn ông nói chuyện gì đã xảy ra sáng nay?\n(A) Anh ấy đã nhận được thông báo qua email.\n(B) Anh ấy đã nộp đơn xin việc trực tuyến.\n(C) Anh ấy làm mất biên lai.\n(D) Anh ấy đã giao hàng.\nCách diễn đạt tương đương:\nreceived an e-mail notification (đã nhận được thông báo qua email) ~ got an e-mail (nhận được một e-mail)\nCách định vị vùng thông tin chứa đáp án:\nTừ khóa trong câu hỏi: What, man, say, happened, this morning\n- Dang câu hỏi: thông tin chi tiết\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Lời thoại từ người đàn ông “I'm here because | got an e-mail this morning telling me that | have an overdue book\" (Tôi đến đây vi sáng nay tôi nhận được một e-mail thông báo rằng tôi có một cuốn sách quá hạn) là thông tin chứa đáp án. Từ lời thoại này có thể thấy chuyện người đàn ông đã gặp vào sáng nay là nhận được một e-mail thông báo từ thư viện.\n- “received an e-mail notification” là cách diễn đạt tương đương của “got an e-mail’.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n(B), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Br Chào buồi sang. [35] Ban có dang tìm sách, tap chí hoặc tờ báo cụ thé nào đó trong thư viện không?\nM-Cn Thực ra là không. [36] Tôi đến đây vì sáng nay tôi nhận được một e-mail thông báo rằng tôi có một cuốn sách quá hạn. Nhưng tối qua tôi đã trả lại nó vào thùng chứa tài liệu trả lại ngoài giờ làm việc.\nW-Br [37] Đôi khi một cuốn sách được trả lại và đặt trở lại kệ mà không được nhập vào hệ thống trước. Tôi có thể xem qua. Bạn có thể cho tôi biết tiêu đề của quyền sách không?"
  },
  {
   "number": 37,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "37. What does the woman offer to do? (A) Attend an event (B) Fill out an online form (C) Place an order (D) Search for an item",
   "transcript": "W: Good morning. Are you looking for any particular library book, magazine, or newspaper?\nM: Actually, no. I'm here because I got an e-mail this morning telling me that I have an overdue book. But I returned it to the after-hours bin last night.\nW: Sometimes a book gets returned and put back on the shelves without being entered into the system first. I can take a look. Can you tell me the title?",
   "explanationVi": "Đáp án đúng: D\n\n37. Người phụ nữ đề nghị làm gì?\n(A) Tham dự một sự kiện\n(B) Điền vào mẫu đơn trực tuyến\n(C) Đặt hàng\n(D) Tìm kiếm một mục\nCách diễn đạt tương đương:\nsearch for (tìm kiếm) ~ take a look (xem qua)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, offer, do\n- Dang câu hỏi: thông tin chỉ tiết\n- Lời thoại từ người phụ nữ \"Sometimes a book gets returned and put back on the shelves without being entered into the system first. | can take a look.\" (Đôi khi một cuốn sách được trả lại và đặt trở lại kệ mà không được nhập vào hệ thống trước. Tôi có thể xem qua.) cho thấy cô ấy đã đề nghị tìm giúp người đàn ông quyển sách mà ông ấy đã trả lại cho thư viện nhưng chưa được cập nhật trên hệ thống.\n- \"search for” là cách diễn đạt tương đương của “take a look”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- library (n): thư viện\n- magazine (n): tạp chí\n- newspaper (n): báo\n- actually (adv): thực ra\ne¢ email (n): thư điện tử\n- shelves (n): kệ sách\n- morning (n): buổi sáng\n- overdue (adj): quá hạn\n- return (v): tra lại\n- after-hours (adj): sau giờ làm việc\n- bin (n): thùng\n- title (n): tiêu đề\n\nDịch hội thoại:\nW-Br Chào buồi sang. [35] Ban có dang tìm sách, tap chí hoặc tờ báo cụ thé nào đó trong thư viện không?\nM-Cn Thực ra là không. [36] Tôi đến đây vì sáng nay tôi nhận được một e-mail thông báo rằng tôi có một cuốn sách quá hạn. Nhưng tối qua tôi đã trả lại nó vào thùng chứa tài liệu trả lại ngoài giờ làm việc.\nW-Br [37] Đôi khi một cuốn sách được trả lại và đặt trở lại kệ mà không được nhập vào hệ thống trước. Tôi có thể xem qua. Bạn có thể cho tôi biết tiêu đề của quyền sách không?"
  },
  {
   "number": 38,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "38. What type of business does the man most likely work for? (A) A moving company (B) A furniture manufacturer (C) A painting company (D) A catering service",
   "transcript": "M: Hi. I'm Malik., I talked to you this morning on the phone about a price quote for some painting you want done.\nW: Oh, hi. Come in. Yes, I want to change the color in the dining room to something lighter.\nM: Not a problem. But I do want to stress that the quote may be higher than you expected because going from a darker color to a lighter one requires more than one coat of paint.\nW: I understand. And will you move the table and chairs out of the room before you start?\nM: That shouldn't be necessary. We can cover them with a drop cloth.",
   "explanationVi": "Đáp án đúng: C\n\n38. Người đàn ông có khả năng làm việc cho loại hình kinh doanh nào nhất?\n(A) Một công ty chuyên nhà\n(B) Một nhà sản xuất đồ nội thất\n(C) Một công ty sơn\n(D) Dịch vụ ăn uông\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what type, business, man, work\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Lời thoại từ người đàn ông \"l talked to you this morning on the phone about a price quote for some painting you want done.\" (Sáng nay tôi đã nói chuyện với bạn qua điện thoại về báo giá cho việc sơn nhà.) là thông tin chứa đáp án. Từ lời thoại này có thể nhận thấy người đàn ông làm việc cho một công ty sơn nhà hoặc là một cá nhân cung cấp dịch vụ sơn nhà.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai: s (A) phương án bẫy, người phụ nữ có hỏi đến việc “move the table and chairs out of the\nroom” (di chuyển bàn ghế ra khỏi phòng), tuy nhiên việc di chuyển này là nhằm bảo vệ bàn ghế lúc sơn nhà, chứ không nhằm mục đích chuyển nhà.\n- (B), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Au Chào. Tôi là Malik. [38] Sáng nay tôi đã nói chuyện với bạn qua điện thoại về báo giá cho việc sơn nhà. i \\ ,\nW-Br Õ, xin chào. Mời vào. Vâng, tôi muôn thay đôi màu sac trong phòng ăn sang màu nhạt hơn.\nM-Au Không thành vấn đề. Nhưng [39] tôi muốn nhấn mạnh rang báo giá có thé cao hơn bạn mong đợi vì để chuyền từ màu tối hơn sang màu nhạt hơn cần nhiều hơn một lớp sơn.\nW-Br Tôi hiểu. Và [40] bạn sẽ di chuyền bàn ghế ra khỏi phòng trước khi bắt đầu chứ? M-Au Điêu đó không cân thiệt. Chúng tôi có thê che chăn chúng băng một tâm phủ."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "39. What point does the man emphasize? (A) A deposit is required before work can begin. (B) A price may be higher than expected. (C) A discount is available for a limited time. (D) A schedule cannot be changed easily.",
   "transcript": "M: Hi. I'm Malik., I talked to you this morning on the phone about a price quote for some painting you want done.\nW: Oh, hi. Come in. Yes, I want to change the color in the dining room to something lighter.\nM: Not a problem. But I do want to stress that the quote may be higher than you expected because going from a darker color to a lighter one requires more than one coat of paint.\nW: I understand. And will you move the table and chairs out of the room before you start?\nM: That shouldn't be necessary. We can cover them with a drop cloth.",
   "explanationVi": "Đáp án đúng: B\n\nNgười đàn ông nhắn mạnh điểm gì?\n(A) Cân phải đặt cọc trước khi bat đâu công việc.\n(B) Giá có thê cao hơn dự kiên.\n(C) Giảm giá được áp dụng trong thời gian có hạn.\n(D) Lịch trình không thé thay đôi dễ dàng.\nCách diễn đạt tương đương:\n- emphasize ~ stress: nhấn mạnh s aprice may be higher than expected (giá có thể cao hơn dự kiến) ~ the quote may be higher than you expected (báo giá có thể cao hơn bạn dự kiến)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what point, man, emphasize\n- Dang câu hỏi: thông tin chi tiết\n- Từ “but” (nhưng mà...) trong lời thoại từ người đàn ông là dấu hiệu sắp đến đáp án. Lời thoại từ người đàn ông \"| do want to stress that the quote may be higher than you expected .\" (tôi muốn nhấn mạnh rằng báo giá có thể cao hơn bạn mong đợi) ho thấy ông ta đang nhấn mạnh về việc mức giá sơn tường có thể sẽ cao hơn dự kiện.\n- “emphasize” là cách diễn đạt tương đương của “stress”.\n- “a price may be higher than expected” là cách diễn đạt tương đương của “the quote may be higher than you expected”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n(A), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Chào. Tôi là Malik. [38] Sáng nay tôi đã nói chuyện với bạn qua điện thoại về báo giá cho việc sơn nhà. i \\ ,\nW-Br Õ, xin chào. Mời vào. Vâng, tôi muôn thay đôi màu sac trong phòng ăn sang màu nhạt hơn.\nM-Au Không thành vấn đề. Nhưng [39] tôi muốn nhấn mạnh rang báo giá có thé cao hơn bạn mong đợi vì để chuyền từ màu tối hơn sang màu nhạt hơn cần nhiều hơn một lớp sơn.\nW-Br Tôi hiểu. Và [40] bạn sẽ di chuyền bàn ghế ra khỏi phòng trước khi bắt đầu chứ? M-Au Điêu đó không cân thiệt. Chúng tôi có thê che chăn chúng băng một tâm phủ."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "40. What does the woman ask about? (A) Signing a contract (B) Purchasing specialized tools (C) Moving some furniture (D) Seeing some samples",
   "transcript": "M: Hi. I'm Malik., I talked to you this morning on the phone about a price quote for some painting you want done.\nW: Oh, hi. Come in. Yes, I want to change the color in the dining room to something lighter.\nM: Not a problem. But I do want to stress that the quote may be higher than you expected because going from a darker color to a lighter one requires more than one coat of paint.\nW: I understand. And will you move the table and chairs out of the room before you start?\nM: That shouldn't be necessary. We can cover them with a drop cloth.",
   "explanationVi": "Đáp án đúng: C\n\n40. Người phụ nữ hỏi về điều gì?\n(A) Ký hợp đồng\n(B) Mua dụng cụ chuyên dụng\n(C) Di chuyền một số đồ nội that\n(D) Xem một số mẫu\nCách diễn đạt tương đương:\nmove some furniture (di chuyển một số đồ nội thất) ~ move the table and chairs (di chuyển bàn ghế)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, ask\n- Dạng câu hỏi: thông tin chi tiết\n- Câu hỏi từ người phụ nữ “will you move the table and chairs out of the room before you start?\" (bạn sẽ di chuyển bàn ghế ra khỏi phòng trước khi bắt đầu chứ) là thông tin chứa đáp án. Từ lời thoại này có thể thấy người phụ nữ đang hỏi người đàn ông về việc có di chuyển một số đồ nội thất ra ngoài trước khi sơn nhà hay không.\n- “move some furniture” là cách diễn đạt tương đương của “move the table and chairs\".\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- price quote (n): báo giá\n- painting (n): việc sơn\n- require (v): yêu cầu, đòi hỏi\n- stress (v): nhấn mạnh\n- move (v): di chuyển\n- cover (v): che phủ\n- drop cloth (n): tấm vải phủ\n\nDịch hội thoại:\nM-Au Chào. Tôi là Malik. [38] Sáng nay tôi đã nói chuyện với bạn qua điện thoại về báo giá cho việc sơn nhà. i \\ ,\nW-Br Õ, xin chào. Mời vào. Vâng, tôi muôn thay đôi màu sac trong phòng ăn sang màu nhạt hơn.\nM-Au Không thành vấn đề. Nhưng [39] tôi muốn nhấn mạnh rang báo giá có thé cao hơn bạn mong đợi vì để chuyền từ màu tối hơn sang màu nhạt hơn cần nhiều hơn một lớp sơn.\nW-Br Tôi hiểu. Và [40] bạn sẽ di chuyền bàn ghế ra khỏi phòng trước khi bắt đầu chứ? M-Au Điêu đó không cân thiệt. Chúng tôi có thê che chăn chúng băng một tâm phủ."
  },
  {
   "number": 41,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "41. Where does the man work? (A) At a community park (B) At a fitness center (C) At a public beach (D) At a sports equipment store",
   "transcript": "W: Hi. This is my first time in here. Nice place! Looks like you've got lots of state-of-the-art equipment.\nM1: Yes, we just opened this week. All the exercise bikes, treadmills, and workout stations that you see are brand-new.\nW: Great! I'm considering joining. My office is right around the corner.\nM2: Well, here's a brochure with a description of our membership levels. I'm happy to answer any questions.\nW: Thanks. I do like to swim a few times a week. Do you have a pool?\nM2: We do. Why don't we start by walking around so I can show you all of our facilities?",
   "explanationVi": "Đáp án đúng: B\n\n41. Người đàn ông làm việc ở dau?\n(A) Tại một công viên cộng dong\n(B) Tại một trung tâm thê hình\n(C) Tại một bãi biển công cộng _\n(D) Tại một cửa hàng dụng cụ thê thao\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Where, man, work\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại từ người đàn ông \"we just opened this week. All the exercise bikes, treadmills, and workout stations that you see are brand-new\" (chung tôi mới mở cửa tuần này. Tất cả các xe đạp tập thể duc, máy chạy bộ và các điểm tập luyện mà bạn thấy đều là mới hoàn toàn) cho thấy rằng người đàn ông đang làm việc ở một trung tâm thể hình vì anh ta đề cập đến các thiết bị tập thể dục như xe đạp, máy chạy bộ và các trạm tập luyện (những thứ thường được tìm thấy ở một trung tâm tập thể dục hoặc phòng tập.)\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C) chứa thông tin không được đề cập.\n- (D) phuong án bay, lời khen của người phụ nữ có nhắc đến “lots of state-of-the- art equipment” (nhiều thiết bị hiện dai), tuy nhiên chúng là những thiết bị hiện đại có tại phòng tập thể hình, không phải những thiết bị được bày bán ở cửa hàng dụng cụ thể thao.\n\nDịch hội thoại:\nW-Am Xin chào. Đây là lần đầu tiên tôi đến đây. Nơi này đẹp day! Trông như bạn có nhiều thiết bị hiện đại.\nM-Au Vâng, [41] chúng tôi mới mở cửa tuần này. Tắt cả các xe đạp tập thể dục, máy chạy bộ và các điểm tập luyện mà bạn thầy đều là mới hoàn toàn.\nW-Am Tuyệt vời! [42] Tôi đang cân nhắc tham gia. Văn phòng của tôi ngay góc đường này. M-Au Vâng, [42] đây là một tờ rơi với mô tả về các cấp độ thành viên của chúng tôi. Tôi rất vui lòng trả lời bất kỳ câu hỏi nào.\nW-Am Cam on. Tôi thích bơi một vai lan mỗi tuần. Bạn có hồ bơi không?\nM-Au Có chứ. [43] Tại sao chúng ta không bắt đầu bằng cách đi dạo xung quanh đề tôi có thể chỉ cho bạn tất cả các tiện ích của chúng tôi?"
  },
  {
   "number": 42,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "42. What is the purpose of the woman's visit? (A) She is applying for a job. (B) She has a complaint. (C) She needs specific directions. (D) She is interested in a membership.",
   "transcript": "W: Hi. This is my first time in here. Nice place! Looks like you've got lots of state-of-the-art equipment.\nM1: Yes, we just opened this week. All the exercise bikes, treadmills, and workout stations that you see are brand-new.\nW: Great! I'm considering joining. My office is right around the corner.\nM2: Well, here's a brochure with a description of our membership levels. I'm happy to answer any questions.\nW: Thanks. I do like to swim a few times a week. Do you have a pool?\nM2: We do. Why don't we start by walking around so I can show you all of our facilities?",
   "explanationVi": "Đáp án đúng: D\n\n42. Mục đích chuyến thăm của người phụ nữ là gì?\n(A) Cô ây đang xin việc.\n(B) Cô ây có khiêu nại. 7 ;\n(C) Cô ay cân được hướng dan cụ thê.\n(D) Cô ây quan tâm đên tư cách thành viên.\nCách diễn đạt tương đương:\ninterested in a membership (quan tâm đến tu cách thành viên) ~ considering joining (cân nhắc tham gia)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, purpose, woman's visit\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"I'm considering joining.\" (tôi đang cân nhắc tham gia) và lời phản hồi từ người đàn ông “here's a brochure with a description of our membership levels” (đây là một tờ rơi với mô tả về các cấp độ thành viên cua chúng tôi) là thông tin\nchứa đáp án. Từ những lời thoại này có thể thấy mục đích chuyến thăm của người phụ nữ là để tìm hiểu về việc đăng ký thành viên tại phòng tập thể hình. s “interested in a membership’ là cách diễn đạt tương đương của “considering joining’.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n(A), (B), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW-Am Xin chào. Đây là lần đầu tiên tôi đến đây. Nơi này đẹp day! Trông như bạn có nhiều thiết bị hiện đại.\nM-Au Vâng, [41] chúng tôi mới mở cửa tuần này. Tắt cả các xe đạp tập thể dục, máy chạy bộ và các điểm tập luyện mà bạn thầy đều là mới hoàn toàn.\nW-Am Tuyệt vời! [42] Tôi đang cân nhắc tham gia. Văn phòng của tôi ngay góc đường này. M-Au Vâng, [42] đây là một tờ rơi với mô tả về các cấp độ thành viên của chúng tôi. Tôi rất vui lòng trả lời bất kỳ câu hỏi nào.\nW-Am Cam on. Tôi thích bơi một vai lan mỗi tuần. Bạn có hồ bơi không?\nM-Au Có chứ. [43] Tại sao chúng ta không bắt đầu bằng cách đi dạo xung quanh đề tôi có thể chỉ cho bạn tất cả các tiện ích của chúng tôi?"
  },
  {
   "number": 43,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "43. What will the woman most likely do next? (A) Join a team (B) Go on a tour (C) Make a phone call (D) Fill out an application",
   "transcript": "W: Hi. This is my first time in here. Nice place! Looks like you've got lots of state-of-the-art equipment.\nM1: Yes, we just opened this week. All the exercise bikes, treadmills, and workout stations that you see are brand-new.\nW: Great! I'm considering joining. My office is right around the corner.\nM2: Well, here's a brochure with a description of our membership levels. I'm happy to answer any questions.\nW: Thanks. I do like to swim a few times a week. Do you have a pool?\nM2: We do. Why don't we start by walking around so I can show you all of our facilities?",
   "explanationVi": "Đáp án đúng: B\n\n43. Người phụ nữ rất có thể sẽ làm gì tiếp theo?\n(A) Tham gia một nhóm\n(B) Di tham quan\n(C) Goi dién thoai\n(D) Điền vào don đăng ky\nCách diễn đạt tương đương:\ngo ona tour (đi tham quan) = walking around (đi dạo xung quanh)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, do next\n- Dang câu hỏi: thông tin chi tiết\nCụm từ mở đầu lời thoại cuối cùng của người đàn ông: “Why don't we...\" (Tại sao chúng ta không...) là dấu hiệu sắp đến đáp án. Lời đề nghị từ người đàn ông dành cho người phụ nữ \"Why don't we start by walking around so | can show you all of our facilities?” ( Tại sao chúng ta không bắt dau bằng cách đi dạo để tôi có thé chi cho bạn tất cả các tiện ích của chúng tôi?) cho thấy hành động tiếp theo của họ là tham quan phòng tập.\ns“goona tour” là cách diễn đạt tương đương của “walking around”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n(A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- state-of-the-art (adj): tiên tiến nhất\n*equipment (n): trang thiết bị\n- treadmills (n): máy chạy bộ\n- workout stations (n): các trạm tập thể dục\n- brand-new (adj): hoàn toàn mới\n- brochure (n): tờ rơi\n- description (n): mô tả\n- membership levels (n): các cấp độ hội viên\n- facilities (n): cơ sở vật chất\n\nDịch hội thoại:\nW-Am Xin chào. Đây là lần đầu tiên tôi đến đây. Nơi này đẹp day! Trông như bạn có nhiều thiết bị hiện đại.\nM-Au Vâng, [41] chúng tôi mới mở cửa tuần này. Tắt cả các xe đạp tập thể dục, máy chạy bộ và các điểm tập luyện mà bạn thầy đều là mới hoàn toàn.\nW-Am Tuyệt vời! [42] Tôi đang cân nhắc tham gia. Văn phòng của tôi ngay góc đường này. M-Au Vâng, [42] đây là một tờ rơi với mô tả về các cấp độ thành viên của chúng tôi. Tôi rất vui lòng trả lời bất kỳ câu hỏi nào.\nW-Am Cam on. Tôi thích bơi một vai lan mỗi tuần. Bạn có hồ bơi không?\nM-Au Có chứ. [43] Tại sao chúng ta không bắt đầu bằng cách đi dạo xung quanh đề tôi có thể chỉ cho bạn tất cả các tiện ích của chúng tôi?"
  },
  {
   "number": 44,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "44. Who most likely is the man? (A) A janitor (B) A property manager (C) A carpenter (D) An interior designer",
   "transcript": "M: Hello. What brings you into our leasing office today?\nW: Hi. I currently live in unit 217, but I'm wondering if there are any larger units available to rent in the building.\nM: Let me see. Apartment 410 is quite large, and the lease on it ends this November. It's a thousand per month. Does that interest you?\nW: I did just get promoted at work recently, so I can afford to spend more. So, that won't be a problem.\nM: Great. I'll call the current tenant and we can figure out a time for a viewing.",
   "explanationVi": "Đáp án đúng: B\n\n44. Người dan ông có khả năng nhất là ai?\n(A) Một người gác cổng\n(B) Một người quản lý bất động sản\n(C) Một người thợ mộc\n(D) Một nhà thiết kế nội thất\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Who, man\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Cau hỏi từ người đàn ông “What brings you into our leasing office today?\" (Hôm nay bạn đến van phòng cho thuê của chúng tôi với mục dich gi?) là thông tin chứa dap án. Từ câu hỏi này có thể suy ra rằng người đàn ông có khả năng là một người quản lý văn phòng cho thuê và đang tiếp nhận khách hàng đến thăm để tìm hiểu nhu cầu của họ.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n(A), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chao. [44] Hôm nay bạn đến văn phòng cho thuê của chúng tôi với mục đích gì? W-Am Xin chào. Hiện tại tôi đang sống trong căn hộ 217, nhưng tôi dang tìm kiếm các căn hộ lớn hon có sẵn dé thuê trong tòa nhà.\nM-Cn Đề tôi xem. Căn hộ 410 khá lớn, và hợp đồng thuê của nó sẽ kết thúc vào tháng 11 này. Giá thuê là một nghìn đô mỗi tháng. Bạn có hứng thú không?\nW-Am [45] Gần đây tôi mới được thăng chức trong công việc, vì vậy tôi có thé chi tiêu nhiều hơn. Vì vậy, đó không phải là vấn đề.\nM-Cn Tuyệt vời. [46] Tôi sẽ gọi cho người thuê hiện tại và chúng ta có thé thống nhất thời gian dé xem căn hộ."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "45. What does the woman say recently happened? (A) She earned a degree. (B) She won an award. (C) She got a promotion. (D) She transferred to a new location.",
   "transcript": "M: Hello. What brings you into our leasing office today?\nW: Hi. I currently live in unit 217, but I'm wondering if there are any larger units available to rent in the building.\nM: Let me see. Apartment 410 is quite large, and the lease on it ends this November. It's a thousand per month. Does that interest you?\nW: I did just get promoted at work recently, so I can afford to spend more. So, that won't be a problem.\nM: Great. I'll call the current tenant and we can figure out a time for a viewing.",
   "explanationVi": "Đáp án đúng: C\n\n45. Người phụ nữ nói điều gì đã xảy ra gần đây?\n(A) Cô ấy đã có được bằng cấp.\n(B) Cô ấy đã giành được một giải thưởng.\n(C) Cô ấy được thăng chức.\n(D) Cô ấy đã chuyển đến một địa điểm mới.\nCách diễn đạt tương đương:\ngot a promotion = get promoted: được thăng chức\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: What, woman, say, recently, happened\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"I did just get promoted at work recently.\" (Gần đây tôi mới được thăng chức trong công việc) cho thấy gần đây cô ấy đã được thăng tiến trong công việc.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Loại (A), (B) vì cô ấy chỉ cho biết bản thân được thăng chức, không đề cập đến việc có được bằng cấp hay giành được một giải thưởng.\n- Loại (D) vì hiện tại cô ấy vẫn đang sống ở căn hộ 217 và đang tìm kiếm căn hộ có diện tích lớn hơn chứ chưa chuyển đến địa điểm mới.\n\nDịch hội thoại:\nM-Cn Xin chao. [44] Hôm nay bạn đến văn phòng cho thuê của chúng tôi với mục đích gì? W-Am Xin chào. Hiện tại tôi đang sống trong căn hộ 217, nhưng tôi dang tìm kiếm các căn hộ lớn hon có sẵn dé thuê trong tòa nhà.\nM-Cn Đề tôi xem. Căn hộ 410 khá lớn, và hợp đồng thuê của nó sẽ kết thúc vào tháng 11 này. Giá thuê là một nghìn đô mỗi tháng. Bạn có hứng thú không?\nW-Am [45] Gần đây tôi mới được thăng chức trong công việc, vì vậy tôi có thé chi tiêu nhiều hơn. Vì vậy, đó không phải là vấn đề.\nM-Cn Tuyệt vời. [46] Tôi sẽ gọi cho người thuê hiện tại và chúng ta có thé thống nhất thời gian dé xem căn hộ."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "46. What will the man do next? (A) Make a phone call (B) Prepare a contract (C) Drop off a key (D) Log some work hours",
   "transcript": "M: Hello. What brings you into our leasing office today?\nW: Hi. I currently live in unit 217, but I'm wondering if there are any larger units available to rent in the building.\nM: Let me see. Apartment 410 is quite large, and the lease on it ends this November. It's a thousand per month. Does that interest you?\nW: I did just get promoted at work recently, so I can afford to spend more. So, that won't be a problem.\nM: Great. I'll call the current tenant and we can figure out a time for a viewing.",
   "explanationVi": "Đáp án đúng: A\n\nNgười đàn ông sẽ làm gì tiếp theo?\n(A) Gọi điện thoại\n(B) Chuẩn bị hợp đồng\n(C) Trả lại chìa khóa\n(D) Ghi lại một số giờ làm việc\nCách diễn đạt tương đương:\nmake a phone call = call: gọi điện thoại\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, man, do next\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người dan ông \"I'll call the current tenant\" (Tôi sẽ gọi cho người thuê hiện tai) là thông tin chứa đáp án. Từ lời thoại này có thể suy ra hành động tiếp theo của người đàn ông là thực hiện một cuộc gọi.\n- “make a phone call” là cách diễn đạt tương đương của “call”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n(B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- leasing office (n): văn phòng cho thuê\n- apartment (n): căn hộ\n- lease (n): hợp đồng thuê\n- rent(v): thuê\n- wonder (v): tự hỏi\n- recently (adv): gần đây\n- afford (v): có khả năng chi trả\n- figure out (phrasal verb): tìm ra\n- current tenant (n): người thuê hiện tại\n\nDịch hội thoại:\nM-Cn Xin chao. [44] Hôm nay bạn đến văn phòng cho thuê của chúng tôi với mục đích gì? W-Am Xin chào. Hiện tại tôi đang sống trong căn hộ 217, nhưng tôi dang tìm kiếm các căn hộ lớn hon có sẵn dé thuê trong tòa nhà.\nM-Cn Đề tôi xem. Căn hộ 410 khá lớn, và hợp đồng thuê của nó sẽ kết thúc vào tháng 11 này. Giá thuê là một nghìn đô mỗi tháng. Bạn có hứng thú không?\nW-Am [45] Gần đây tôi mới được thăng chức trong công việc, vì vậy tôi có thé chi tiêu nhiều hơn. Vì vậy, đó không phải là vấn đề.\nM-Cn Tuyệt vời. [46] Tôi sẽ gọi cho người thuê hiện tại và chúng ta có thé thống nhất thời gian dé xem căn hộ."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "47. According to the woman, what has recently happened at her business? (A) Customers have complained. (B) Inspections have been conducted. (C) Online orders have increased. (D) Shipments have been incomplete.",
   "transcript": "M: Hello, MS. Bajaj. I'm glad we have a chance to meet today to discuss your business. What's your company's main goal?\nW: Well, recently. my craft supply store has started receiving a lot of online orders. It's important that I get feedback from those customers about the products that I'm selling.\nM: We can design an online survey for you. It's automatically e-mailed out to your customers a week after their order is delivered. We've had a lot of success getting people to respond to those.\nW: That's a great idea, Then perhaps I could offer a future discount to any customer who completes the survey.",
   "explanationVi": "Đáp án đúng: C\n\n47. Theo người phụ nữ, chuyện gì đã xảy ra gần đây ở doanh nghiệp của cô ấy?\n(A) Khách hàng đã phan nàn.\n(B) Việc kiểm tra đã được tiền hành.\n(C) Đơn đặt hàng trực tuyến đã tăng lên.\n(D) Các lô hàng chưa được hoàn thiện.\nCách diễn đạt tương đương:\nonline orders have increased (đơn đặt hàng trực tuyến đã tăng lên) = receiving a lot of online orders (nhận được rất nhiều đơn đặt hàng trực tuyến)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, happened, her business\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"recently, my craft supply store has started receiving a lot of online orders.\" (gần đây, cửa hang cung cấp vat liệu thủ công của tôi đã bắt đầu nhận được rất nhiều đơn đặt hàng trực tuyến) là thông tin chứa đáp án. Từ lời thoại này có thể thấy số lượng đơn đặt hàng trực tuyến của công ty cô Bajaj đã tăng lên.\n- “online orders have increased” là cách diễn đạt tương đương của “receiving a lot of online orders”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Xin chào, cô Bajaj. Tôi rất vui được gặp bạn hôm nay dé thảo luận về doanh nghiệp của bạn. Mục tiêu chính của công ty của bạn là gì?\nW-Br Vâng, [47] gần đây, cửa hàng cung cap vật liệu thủ công của tôi đã bắt đầu nhận được rất nhiều đơn đặt hàng trực tuyến. Điều quan trọng là tôi nhận được phản hồi từ những khách hàng đó về các sản phẩm mà tôi đang bán.\nM-Au [48] Chúng tôi có thể thiết kế một cuộc khảo sát trực tuyến cho bạn. Nó sẽ tự động được gửi qua email đến khách hàng của bạn một tuần sau khi đơn hàng của họ được giao. Chúng tôi đã có rất nhiều thành công khi thuyết phục mọi người đáp lại những cuộc khảo sát đó.\nW-Br Đó là một ý tưởng tuyệt vời. [49] Sau đó, có lẽ tôi có thể cung cấp một phiếu giảm giá trong tương lai cho bất kỳ khách hàng nào hoàn thành cuộc khảo sát."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "48. What can the man's company do? (A) Provide safety training (B) Post demonstration videos (C) Acquire more warehouse space (D) Create customer surveys",
   "transcript": "M: Hello, MS. Bajaj. I'm glad we have a chance to meet today to discuss your business. What's your company's main goal?\nW: Well, recently. my craft supply store has started receiving a lot of online orders. It's important that I get feedback from those customers about the products that I'm selling.\nM: We can design an online survey for you. It's automatically e-mailed out to your customers a week after their order is delivered. We've had a lot of success getting people to respond to those.\nW: That's a great idea, Then perhaps I could offer a future discount to any customer who completes the survey.",
   "explanationVi": "Đáp án đúng: D\n\n48. Công ty của người đàn ông có thể làm gi?\n(A) Cung cấp đào tạo an toàn\n(B) Đăng tải video hướng dẫn\n(C) Thu mua thêm không gian kho\n(D) Tạo khảo sát khách hàng\nCách diễn đạt tương đương:\ncreate customer surveys (tạo khảo sát khách hàng) ~ design an online survey (thiết kế một cuộc khảo sát trực tuyến)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, man's company, do\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người đàn ông \"We can design an online survey for you\" (Chúng tôi có thể thiết kế một cuộc khảo sát trực tuyến cho bạn) cho thấy công ty của ông ấy chuyên cung cấp dịch vụ khảo sát khách hàng.\n- “create customer surveys\" là cách diễn đạt tương đương của “design an online survey’.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n(A), (B),(C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Xin chào, cô Bajaj. Tôi rất vui được gặp bạn hôm nay dé thảo luận về doanh nghiệp của bạn. Mục tiêu chính của công ty của bạn là gì?\nW-Br Vâng, [47] gần đây, cửa hàng cung cap vật liệu thủ công của tôi đã bắt đầu nhận được rất nhiều đơn đặt hàng trực tuyến. Điều quan trọng là tôi nhận được phản hồi từ những khách hàng đó về các sản phẩm mà tôi đang bán.\nM-Au [48] Chúng tôi có thể thiết kế một cuộc khảo sát trực tuyến cho bạn. Nó sẽ tự động được gửi qua email đến khách hàng của bạn một tuần sau khi đơn hàng của họ được giao. Chúng tôi đã có rất nhiều thành công khi thuyết phục mọi người đáp lại những cuộc khảo sát đó.\nW-Br Đó là một ý tưởng tuyệt vời. [49] Sau đó, có lẽ tôi có thể cung cấp một phiếu giảm giá trong tương lai cho bất kỳ khách hàng nào hoàn thành cuộc khảo sát."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "49. What does the woman say she could offer her customers? (A) A discount (B) Expedited shipping (C) Free product samples (D) A personal consultation",
   "transcript": "M: Hello, MS. Bajaj. I'm glad we have a chance to meet today to discuss your business. What's your company's main goal?\nW: Well, recently. my craft supply store has started receiving a lot of online orders. It's important that I get feedback from those customers about the products that I'm selling.\nM: We can design an online survey for you. It's automatically e-mailed out to your customers a week after their order is delivered. We've had a lot of success getting people to respond to those.\nW: That's a great idea, Then perhaps I could offer a future discount to any customer who completes the survey.",
   "explanationVi": "Đáp án đúng: A\n\n49. Người phụ nữ nói rằng cô ấy có thể cung cấp những gì cho khách hàng của mình?\n(A) Một phiếu giám giá\n(B) Giao hàng nhanh\n(C) Mẫu sản phẩm miễn phí\n(D) Một cuộc tư vấn cá nhân\nCách diễn đạt tương đương:\na discount (một phiếu giảm giá) ~ a future discount (một phiếu giảm giá trong tương lai)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, woman, offer, her customers\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"Then perhaps | could offer a future discount to any customer who completes the survey.\" (Sau đó, có lẽ tôi có thể cung cấp một phiếu giảm giá cho bất kỳ khách hàng nào hoàn thành cuộc khảo sát.) là thông tin chứa đáp án. Từ lời thoại này có thể xác định rằng người phụ nữ có thể sẽ cung cấp cho khách hàng một phiếu giảm giá khi họ hoàn thành bài khảo sát.\n- “a discount” là cách diễn đạt tương đương của “a future discount”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- discuss (v): thảo luận\n- main (adj): chính\n- goal (n): mục tiêu\n- recently (adv): gần đây\n- feedback (n): phan hồi\n- customers (n): khách hang\n- respond (v): phản hồi\n- order (n): don đặt hàng\n- perhaps (adv): có lẽ\n- discount (n): giảm giá\n\nDịch hội thoại:\nM-Au Xin chào, cô Bajaj. Tôi rất vui được gặp bạn hôm nay dé thảo luận về doanh nghiệp của bạn. Mục tiêu chính của công ty của bạn là gì?\nW-Br Vâng, [47] gần đây, cửa hàng cung cap vật liệu thủ công của tôi đã bắt đầu nhận được rất nhiều đơn đặt hàng trực tuyến. Điều quan trọng là tôi nhận được phản hồi từ những khách hàng đó về các sản phẩm mà tôi đang bán.\nM-Au [48] Chúng tôi có thể thiết kế một cuộc khảo sát trực tuyến cho bạn. Nó sẽ tự động được gửi qua email đến khách hàng của bạn một tuần sau khi đơn hàng của họ được giao. Chúng tôi đã có rất nhiều thành công khi thuyết phục mọi người đáp lại những cuộc khảo sát đó.\nW-Br Đó là một ý tưởng tuyệt vời. [49] Sau đó, có lẽ tôi có thể cung cấp một phiếu giảm giá trong tương lai cho bất kỳ khách hàng nào hoàn thành cuộc khảo sát."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "50. Where most likely are the speakers? (A) At a farm (B) At a landscaping company (C) At a hotel (D) At a catering firm",
   "transcript": "M1: Hello. I'm from District Flower Store, and I have your centerpiece order.\nM2: Let me get the hotel's event manager here; she's the one that ordered. Yuliya? You have a delivery from District Flower Store at reception.\nW: Hi! I'm glad you're early. The wedding's this evening, but we're already setting up the ballroom.\nM1: I'll need you to acknowledge receipt. Could you sign here? And then, where should I unload your calla lily centerpieces?\nW: Calla lilies? I ordered lilacs for the wedding centerpieces!\nM1: Oh, I wouldn't know. I just deliver.\nW: Well, let me call your boss. We need this sorted out right away.",
   "explanationVi": "Đáp án đúng: C\n\n50. Người nói có thể ở đâu nhất?\nA. Tại một trang trại\nB. Tại một công ty cảnh quan\nC. Tại một khách sạn\nD. Tại một công ty cung cấp dịch vụ ăn uống\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Where, speakers\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Lời dap từ người đàn ông khi người giao hàng đến “Let me get the hotel's event manager here; she's the one that ordered\" (Để tôi gọi người quản lý sự kiện của khách sạn tới đây; cô ấy là người đã đặt hàng) cho thấy không gian diễn ra cuộc hội thoại là ở một khách sạn vì người đàn ông đã gọi người quản lý sự kiện của khách sạn đến để xác nhận đơn hàng.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n(A), (B), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Au Xin chào. Tôi đến từ Cửa hang District Flower và tôi có đơn đặt hàng trang trí hoa của bạn.\nM-Cn [50] Dé tôi gọi người quan lý sự kiện của khách sạn tới đây; cô ấy là người đã đặt\nhang. Yuliya? Bạn có đơn hang từ Cửa hang District Flower tại quay lễ tân.\nW-Am Xin chào! Tôi mừng vì bạn đến sớm. [51] Đám cưới diễn ra vào tối nay, nhưng chúng tôi đã chuẩn bị xong phòng khiêu vũ rồi.\nM-Au Tôi cần bạn xác nhận hóa đơn. Bạn có thể ký vào đây được không? Và sau đó, tôi nên dé hoa loa kèn của ban ở đâu?\nC-Là hoa loa kèn à? Tôi đã đặt hoa tử đinh hương cho phần trang trí trung tâm tiệc cưới!\nM-Au Ô, tôi không biết. Tôi chỉ giao hàng thôi.\nW-Am Vâng, [52] dé tôi gọi cho sếp của bạn. Chúng ta cần giải quyết chuyện này ngay lập tức."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "51. What type of event is going to take place? (A) A wedding (B) A flower exposition (C) A grand opening (D) A birthday party",
   "transcript": "M1: Hello. I'm from District Flower Store, and I have your centerpiece order.\nM2: Let me get the hotel's event manager here; she's the one that ordered. Yuliya? You have a delivery from District Flower Store at reception.\nW: Hi! I'm glad you're early. The wedding's this evening, but we're already setting up the ballroom.\nM1: I'll need you to acknowledge receipt. Could you sign here? And then, where should I unload your calla lily centerpieces?\nW: Calla lilies? I ordered lilacs for the wedding centerpieces!\nM1: Oh, I wouldn't know. I just deliver.\nW: Well, let me call your boss. We need this sorted out right away.",
   "explanationVi": "Đáp án đúng: A\n\n51. Loại sự kiện nào sẽ diễn ra?\n(A) Một đám cưới\n(B) Một triển lãm hoa\n(C) Một buổi lễ khai trương\n(D) Một bữa tiệc sinh nhật\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, type, event, take place\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"The wedding's this evening.\" (Đám cưới diễn ra vào tối nay) cho thấy khách sạn đang chuẩn bị cho một bữa tiệc cưới.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B) phương án bẫy, đoạn hội thoại có nhắc đến tên một số loại hoa như “calla lily” và “lilacs”, tuy nhiên hoa được dùng với mục dich trang trí tiệc cưới, không dùng cho buổi triển lãm hoa.\n- (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Xin chào. Tôi đến từ Cửa hang District Flower và tôi có đơn đặt hàng trang trí hoa của bạn.\nM-Cn [50] Dé tôi gọi người quan lý sự kiện của khách sạn tới đây; cô ấy là người đã đặt\nhang. Yuliya? Bạn có đơn hang từ Cửa hang District Flower tại quay lễ tân.\nW-Am Xin chào! Tôi mừng vì bạn đến sớm. [51] Đám cưới diễn ra vào tối nay, nhưng chúng tôi đã chuẩn bị xong phòng khiêu vũ rồi.\nM-Au Tôi cần bạn xác nhận hóa đơn. Bạn có thể ký vào đây được không? Và sau đó, tôi nên dé hoa loa kèn của ban ở đâu?\nC-Là hoa loa kèn à? Tôi đã đặt hoa tử đinh hương cho phần trang trí trung tâm tiệc cưới!\nM-Au Ô, tôi không biết. Tôi chỉ giao hàng thôi.\nW-Am Vâng, [52] dé tôi gọi cho sếp của bạn. Chúng ta cần giải quyết chuyện này ngay lập tức."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "52. What does the woman say she will do? (A) Sign a receipt (B) Adjust a schedule (C) Add items to an order (D) Call a supervisor",
   "transcript": "M1: Hello. I'm from District Flower Store, and I have your centerpiece order.\nM2: Let me get the hotel's event manager here; she's the one that ordered. Yuliya? You have a delivery from District Flower Store at reception.\nW: Hi! I'm glad you're early. The wedding's this evening, but we're already setting up the ballroom.\nM1: I'll need you to acknowledge receipt. Could you sign here? And then, where should I unload your calla lily centerpieces?\nW: Calla lilies? I ordered lilacs for the wedding centerpieces!\nM1: Oh, I wouldn't know. I just deliver.\nW: Well, let me call your boss. We need this sorted out right away.",
   "explanationVi": "Đáp án đúng: D\n\n52. Người phụ nữ nói cô ấy sẽ làm gì?\n(A) Ký biên nhận\n(B) Điều chính lịch trình\n(C) Thêm mặt hàng vào đơn hàng\n(D) Gọi cho người giám sát\nCách diễn đạt tương đương:\ncall a supervisor (gọi cho người giám sát) ~ call your boss (gọi cho sếp của ban)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, woman, say, will do\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"let me call your boss\" (để tôi gọi cho sếp của bạn) cho thấy hành động tiếp theo mà người phụ nữ sẽ làm là gọi điện cho người giám sát đơn hàng hoa trang trí tiệc cưới.\n- “call a supervisor’ là cách diễn đạt tương đương của “call your boss”. → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy, người giao hàng có yêu cầu người quản lý sự kiện tại khách sạn ký xác nhận đơn hàng “I'll need you to acknowledge receipt. Could you sign here?” (Tôi cần bạn xác nhận hóa đơn. Bạn có thé ký vào đây được không?), tuy nhiên do có sự nhầm lẫn về loại hoa được giao nên việc ký biên nhận không phải là hành động tiếp theo của người quản lý sự kiện.\n- (B), (C)chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- event manager (n): người quản lý sự kiện\n- delivery (n): giao hàng\n- acknowledge (v): nhận biết\n- receipt (n): biên nhận\n- sign (v): ký tên\n- reception (n): lễ tan\n- early (adj): sớm\n- ballroom (n): phòng khiêu vũ\n- deliver (v): giao hàng\n- unload (v): dỡ hàng\n- calla lily (n): hoa loa kèn\n- lilacs (n): hoa tử đỉnh hương\n\nDịch hội thoại:\nM-Au Xin chào. Tôi đến từ Cửa hang District Flower và tôi có đơn đặt hàng trang trí hoa của bạn.\nM-Cn [50] Dé tôi gọi người quan lý sự kiện của khách sạn tới đây; cô ấy là người đã đặt\nhang. Yuliya? Bạn có đơn hang từ Cửa hang District Flower tại quay lễ tân.\nW-Am Xin chào! Tôi mừng vì bạn đến sớm. [51] Đám cưới diễn ra vào tối nay, nhưng chúng tôi đã chuẩn bị xong phòng khiêu vũ rồi.\nM-Au Tôi cần bạn xác nhận hóa đơn. Bạn có thể ký vào đây được không? Và sau đó, tôi nên dé hoa loa kèn của ban ở đâu?\nC-Là hoa loa kèn à? Tôi đã đặt hoa tử đinh hương cho phần trang trí trung tâm tiệc cưới!\nM-Au Ô, tôi không biết. Tôi chỉ giao hàng thôi.\nW-Am Vâng, [52] dé tôi gọi cho sếp của bạn. Chúng ta cần giải quyết chuyện này ngay lập tức."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "53. What kind of business do the men most likely work for? (A) A fencing company (B) A landscaping service (C) A roofing company (D) An auto repair shop",
   "transcript": "M1: Excuse me, Ms. Campbell. My engineer, Adisa, is still on your roof, but I just wanted to let you know we're almost done with the inspection.\nW: How does everything look?\nM1: Oh, here's Adisa now. He can answer that.\nM2: I conducted a thorough inspection. There's no structural damage. All of the support beams are intact, but we'll have to replace some of the shingles that were blown away in the storm.\nW: Well that's a relief. I was worried that I'd need major repairs.\nM2: I'm afraid you'll have to close your store while we replace the shingles. But we'll be able to finish in one day.\nM1: Does Tuesday work for you?\nW: That's fine.",
   "explanationVi": "Đáp án đúng: C\n\n53. Những người đàn ông có thể làm việc trong loại hình kinh doanh nào nhất?\n(A) Một công ty lặp hàng rào\n(B) Dịch vụ cảnh quan\n(C) Một công ty lợp mái\n(D) Một cửa hàng sửa chữa ô tô\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What kind, business, men, work\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Lời thoại từ người đàn ông \"My engineer, Adisa, is still on your roof, but | just wanted to let you know we're almost done with the inspection.\" (Kỹ sư của tôi, Adisa, vẫn đang ở trên mái nhà của bạn, nhưng tôi chỉ muốn cho bạn biết rằng chúng tôi gần như đã hoàn tất việc kiểm tra.) cho thấy những người này đang thực hiện việc kiểm tra mái nhà, cho nên khả năng cao họ làm việc cho một công ty lợp mái.\n→ Phương án (C) là phù hợp nhất. Loại phương án sai:\n- (A), (B) chứa thông tin không được đề cập.\n- (D) phương án bẫy, người nói có nhắc đến cum từ “major repairs”, tuy nhiên nó ám chỉ việc sửa mái nhà, không liên quan đến việc sửa chữa ô tô.\n\nDịch hội thoại:\nM-Cn Xin lỗi, cô Campbell. [53] Kỹ sư của tôi, Adisa, vẫn đang ở trên mái nhà của bạn, nhưng tôi chỉ muốn cho bạn biết răng chúng tôi gần như đã hoàn tất việc kiểm tra.\nW-Br Mọi thứ trông như thế nào?\nM-Cn Ò, đây là Adisa. Anh ấy có thể trả lời điều đó.\nM-Au Tôi đã tiền hành kiểm tra kỹ lưỡng. [54] Không có thiệt hại về cấu trúc. Tat cả các dim đỡ đều còn nguyên vẹn, nhưng [54] chúng tôi sẽ phải thay thế một số tam ván lợp đã bị thổi bay trong cơn bão.\nW-Br Vâng [54] thật là nhẹ nhõm. Tôi lo lắng rằng tôi sẽ cần sửa chữa nhiều.\nM-Au [55] Tôi e rằng bạn sẽ phải đóng cửa hang trong khi chúng tôi thay thé tam ván lợp. Nhưng chúng ta sẽ có thể hoàn thành trong một ngày.\nM-Cn [55] Thứ Ba có được không?\nW-Br [55] Được day."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "54. Why is the woman relieved? (A) Some damage is minor. (B) A delivery arrived early. (C) Customer reviews are positive. (D) The weather forecast is good.",
   "transcript": "M1: Excuse me, Ms. Campbell. My engineer, Adisa, is still on your roof, but I just wanted to let you know we're almost done with the inspection.\nW: How does everything look?\nM1: Oh, here's Adisa now. He can answer that.\nM2: I conducted a thorough inspection. There's no structural damage. All of the support beams are intact, but we'll have to replace some of the shingles that were blown away in the storm.\nW: Well that's a relief. I was worried that I'd need major repairs.\nM2: I'm afraid you'll have to close your store while we replace the shingles. But we'll be able to finish in one day.\nM1: Does Tuesday work for you?\nW: That's fine.",
   "explanationVi": "Đáp án đúng: A\n\n54. Tại sao người phụ nữ lại cảm thấy nhẹ nhõm?\n(A) Một số hư hại thì nhỏ.\n(B) Hàng giao đến sớm.\n(C) Đánh giá của khách hàng là tích cực.\n(D) Dự báo thời tiết tốt.\nCách diễn đạt tương đương:\nrelieved (cảm thấy nhẹ nhõm) = a relief (một cảm giác nhẹ nhõm)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, woman, relieved\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người đàn ông “There's no structural damage...but we'll have to replace some of the shingles that were blown away in the storm.\" (Không có thiệt hại về cấu trúc...nhưng chúng tôi sẽ phải thay thế một số tấm ván lợp đã bị thổi bay trong cơn bão.) cho thấy mái nhà không có hư hại nhiều, chỉ phải thay thế một số tấm ván lợp. Lời đáp của người phụ nữ cho thông tin trên “that's a relief” (thật là nhẹ nhõm) cho thấy cô\nấy cảm thấy nhẹ nhõm vì thiệt hại mà cơn bão gây ra cho mái nhà thì không quá nghiêm trọng. s “relieved” là cách diễn đạt tương đương của “a relief”.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n(B),(C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin lỗi, cô Campbell. [53] Kỹ sư của tôi, Adisa, vẫn đang ở trên mái nhà của bạn, nhưng tôi chỉ muốn cho bạn biết răng chúng tôi gần như đã hoàn tất việc kiểm tra.\nW-Br Mọi thứ trông như thế nào?\nM-Cn Ò, đây là Adisa. Anh ấy có thể trả lời điều đó.\nM-Au Tôi đã tiền hành kiểm tra kỹ lưỡng. [54] Không có thiệt hại về cấu trúc. Tat cả các dim đỡ đều còn nguyên vẹn, nhưng [54] chúng tôi sẽ phải thay thế một số tam ván lợp đã bị thổi bay trong cơn bão.\nW-Br Vâng [54] thật là nhẹ nhõm. Tôi lo lắng rằng tôi sẽ cần sửa chữa nhiều.\nM-Au [55] Tôi e rằng bạn sẽ phải đóng cửa hang trong khi chúng tôi thay thé tam ván lợp. Nhưng chúng ta sẽ có thể hoàn thành trong một ngày.\nM-Cn [55] Thứ Ba có được không?\nW-Br [55] Được day."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "55. What will the woman do on Tuesday? (A) Wash her car (B) Close her store (C) Take some measurements (D) Look at some material samples",
   "transcript": "M1: Excuse me, Ms. Campbell. My engineer, Adisa, is still on your roof, but I just wanted to let you know we're almost done with the inspection.\nW: How does everything look?\nM1: Oh, here's Adisa now. He can answer that.\nM2: I conducted a thorough inspection. There's no structural damage. All of the support beams are intact, but we'll have to replace some of the shingles that were blown away in the storm.\nW: Well that's a relief. I was worried that I'd need major repairs.\nM2: I'm afraid you'll have to close your store while we replace the shingles. But we'll be able to finish in one day.\nM1: Does Tuesday work for you?\nW: That's fine.",
   "explanationVi": "Đáp án đúng: B\n\n55. Người phụ nữ sẽ làm gì vào thứ Ba?\n(A) Rửa xe cho cô ấy\n(B) Đóng cửa hàng của cô ấy\n(C) Thực hiện một số việc đo lường\n(D) Xem một số mẫu vật liệu\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, woman, do, Tuesday\n- Dang câu hỏi: thông tin chỉ tiết\n- Lời thoại từ người đàn ông \"I'm afraid you'll have to close your store while we replace the shingles\" (Tôi e rằng bạn sẽ phải đóng cửa hang trong khi chúng tôi thay thế tấm van lợp) kèm theo câu hỏi “Does Tuesday work for you?“(Thứ Ba có được không?) và sự xác nhận từ người phụ nữ \"That's fine.” (Được thôi) cho thấy người phụ nữ đồng ý với yêu cầu đóng cửa hàng của đội sửa chữa trong lúc thi công vào ngày thứ Ba.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n(A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- engineer (n): kỹ sư\n- roof (n): mái nhà\n- almost (adv): gần như\n- inspection (n): sự kiểm tra, kiểm định\n- thorough (adj): kỹ lưỡng\n- damage (n): sự hư hại\n- replace (v): thay thé\n- shingles (n): tấm lợp s afraid (a): lo lắng, e ngại\n\nDịch hội thoại:\nM-Cn Xin lỗi, cô Campbell. [53] Kỹ sư của tôi, Adisa, vẫn đang ở trên mái nhà của bạn, nhưng tôi chỉ muốn cho bạn biết răng chúng tôi gần như đã hoàn tất việc kiểm tra.\nW-Br Mọi thứ trông như thế nào?\nM-Cn Ò, đây là Adisa. Anh ấy có thể trả lời điều đó.\nM-Au Tôi đã tiền hành kiểm tra kỹ lưỡng. [54] Không có thiệt hại về cấu trúc. Tat cả các dim đỡ đều còn nguyên vẹn, nhưng [54] chúng tôi sẽ phải thay thế một số tam ván lợp đã bị thổi bay trong cơn bão.\nW-Br Vâng [54] thật là nhẹ nhõm. Tôi lo lắng rằng tôi sẽ cần sửa chữa nhiều.\nM-Au [55] Tôi e rằng bạn sẽ phải đóng cửa hang trong khi chúng tôi thay thé tam ván lợp. Nhưng chúng ta sẽ có thể hoàn thành trong một ngày.\nM-Cn [55] Thứ Ba có được không?\nW-Br [55] Được day."
  },
  {
   "number": 56,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "56. Why does the man apologize? (A) He missed a meeting. (B) He has a poor Internet connection. (C) He failed to complete an assignment. (D) He lost his employee badge.",
   "transcript": "M: Hi, Erina. I'm sorry about missing the morning meeting! My commute was horrendous.\nW: No worries. The meeting notes will be sent out. What happened?\nM: The Metro system's renovating some station platforms, and it added an extra half hour to my commute. Trains in both directions are only using one track, and the train's my only option!\nW: Well, there is a rapid-transit bus service.\nM: I wasn't aware of that. I'm still new to this city. How do I get more information?\nW: Fll send you links to their Web site and system map.",
   "explanationVi": "Đáp án đúng: A\n\n56. Tại sao người đàn ông lại xin lỗi?\n(A) Anh ây đã bỏ lỡ một cuộc họp.\n(B) Anh ay có két nôi Internet kém.\n(C) Anh â ây không hoàn thành được bài tập.\n(D) Anh ấy làm mắt thẻ nhân viên của mình.\nCách diễn đạt tương đương:\nmissed a meeting (đã bỏ lỡ một cuộc họp) ~ missing the morning meeting (đã bỏ lỡ cuộc họp sáng nay)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, man, apologize\n- Dang câu hỏi: thông tin chi tiết\n- Cum từ mở đầu trong lời thoại của người đàn ông: “I'm sorry about...” (Tôi xin lỗi vi...) là dấu hiệu sắp đến đáp án.\n- \"I'm sorry about missing the morning meeting!\" (Tôi xin lỗi vì đã bỏ lỡ cuộc họp sáng nay!) là thông tin chứa đáp án. Từ lời thoại này có thé thấy lý do người đàn ông xin lỗi là vì bỏ lỡ một cuộc họp.\n- “missed a meeting’ là cách diễn đạt tương đương của “missing the morning meeting\".\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n(B), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Chào, Erina. [56] Tôi xin lỗi vì đã bỏ lỡ cuộc họp sáng nay! Việc đi lại của tôi thật khủng khiêp.\nW-Am Đừng lo lắng. Biên bản cuộc họp sẽ được gửi đi. Chuyện gì đã xảy ra thé? ; M-Au [57] Hệ thông tau điện ngâm đang cải tao một sô sân ga và khiên tôi mat thêm nửa giờ de đi lại. Xe lửa ở cả hai hướng chỉ sử dụng một đường ray và [57] xe lửa là lựa chọn duy nhât của tôi!\nW-Am À, có dịch vụ xe buýt nhanh đó. i\nM-Au Tôi đã không nhận thức được điều đó. Tôi vẫn còn chưa quen với thành phố này. Làm cách nào đê có thêm thông tin? 7 Ñ :\nW-Am [58] Tôi sé gửi cho ban đường dan tới trang Web và bản do hệ thong cua họ."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "B",
   "group": "56-58",
   "textEn": "57. Why does the woman say, \"Well, there is a rapid-transit bus service\"? (A) To praise improvements to a system (B) To correct a mistaken assumption (C) To express dissatisfaction (D) To justify a decision",
   "transcript": "M: Hi, Erina. I'm sorry about missing the morning meeting! My commute was horrendous.\nW: No worries. The meeting notes will be sent out. What happened?\nM: The Metro system's renovating some station platforms, and it added an extra half hour to my commute. Trains in both directions are only using one track, and the train's my only option!\nW: Well, there is a rapid-transit bus service.\nM: I wasn't aware of that. I'm still new to this city. How do I get more information?\nW: Fll send you links to their Web site and system map.",
   "explanationVi": "Đáp án đúng: B\n\n57. Tại sao người phụ nữ nói: \"À, có một dịch vụ xe buýt nhanh đó\"?\n(A) Đề khen ngợi những cải tiền của một hệ thống\n(B) Dé sửa lại một gia định sai lầm\n(C) Dé bày tỏ sự không hài lòng\n(D) Để biện minh cho một quyết định\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, woman, say, “Well, there is a rapid- transit bus service\"\n- Dang cau hỏi: ngụ ý\n- Cc thông tin xung quanh lời thoại trích dẫn sẽ dẫn đến đáp án.\n- Lời thoại của người đàn ông khi trình bày lý do bỏ lỡ cuộc họp “The Metro system's renovating some station platforms, and it added an extra half hour to my commute\" (Hệ thống tàu điện ngầm dang cdi tạo một số sân ga và khiến tôi mất thêm nửa giờ dé di lại.) và “the train's my only option” (xe lửa là lựa chọn duy nhất của tôi) cho thấy trong nhận định của người đàn ông thì chỉ có 2 phương tiện đi đến chỗ làm là tàu điện ngầm và xe lửa.\n- Câu trả lời của người phụ nữ \"Well, there is a rapid- transit bus service\" (A, có một dịch vụ xe buýt nhanh đó) cho thấy cô ấy đang sửa lại nhận định của người đàn ông về sự giới hạn trong lựa chọn giao thông bằng cách đề xuất một phương tiện khác là dịch vụ xe buýt nhanh.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- (A), (C), (D) chứa thông tin không phù hợp với ngụ ý trong câu nói của người phụ nữ.\n\nDịch hội thoại:\nM-Au Chào, Erina. [56] Tôi xin lỗi vì đã bỏ lỡ cuộc họp sáng nay! Việc đi lại của tôi thật khủng khiêp.\nW-Am Đừng lo lắng. Biên bản cuộc họp sẽ được gửi đi. Chuyện gì đã xảy ra thé? ; M-Au [57] Hệ thông tau điện ngâm đang cải tao một sô sân ga và khiên tôi mat thêm nửa giờ de đi lại. Xe lửa ở cả hai hướng chỉ sử dụng một đường ray và [57] xe lửa là lựa chọn duy nhât của tôi!\nW-Am À, có dịch vụ xe buýt nhanh đó. i\nM-Au Tôi đã không nhận thức được điều đó. Tôi vẫn còn chưa quen với thành phố này. Làm cách nào đê có thêm thông tin? 7 Ñ :\nW-Am [58] Tôi sé gửi cho ban đường dan tới trang Web và bản do hệ thong cua họ."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "58. What will the woman do next? (A) Download a ticket (B) Pick up some clients (C) Activate a key card (D) Forward some Web-site links",
   "transcript": "M: Hi, Erina. I'm sorry about missing the morning meeting! My commute was horrendous.\nW: No worries. The meeting notes will be sent out. What happened?\nM: The Metro system's renovating some station platforms, and it added an extra half hour to my commute. Trains in both directions are only using one track, and the train's my only option!\nW: Well, there is a rapid-transit bus service.\nM: I wasn't aware of that. I'm still new to this city. How do I get more information?\nW: Fll send you links to their Web site and system map.",
   "explanationVi": "Đáp án đúng: D\n\n58. Người phụ nữ sẽ làm gì tiếp theo?\n(A) Tải xuống một vé\n(B) Đón một số khách hàng\n(C) Kích hoạt thẻ từ\n(D) Chuyển tiếp một số liên kết trang web\nCách diễn đạt tương đương:\nforward some Web-site links (chuyển tiếp một số liên kết trang web) ~ send you links to their Web site (gửi cho bạn một số đường dẫn tới trang Web của họ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, woman, do next\n- Dạng câu hỏi: thông tin chi tiết\n- Dựavào lời thoại cuối của người phụ nữ, “I'll...” là dấu hiệu sắp đến đáp án.\n- Lời thoại từ người phụ nữ \"I'll send you links to their Web site and system map.\" (Tôi sẽ gửi cho bạn đường dẫn tới trang Web và bản đồ hệ thống của họ.) là thông tin phản ánh hành động tiếp theo của người phụ nữ là chuyển tiếp một số liên kết trang web.\n- “forward some Web-site links” là cách diễn đạt tương đương của “send you links to their Web site”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- commute (n): sự di chuyển, đi lại hằng ngày\n- horrendous (a): kinh khủng\n- renovate (v): cai tao\n- direction (n): hướng\n- track (n): đường ray\n- option (n): lựa chon\n- bus service (n): dich vụ xe buýt\n- link (n): liên kết\n\nDịch hội thoại:\nM-Au Chào, Erina. [56] Tôi xin lỗi vì đã bỏ lỡ cuộc họp sáng nay! Việc đi lại của tôi thật khủng khiêp.\nW-Am Đừng lo lắng. Biên bản cuộc họp sẽ được gửi đi. Chuyện gì đã xảy ra thé? ; M-Au [57] Hệ thông tau điện ngâm đang cải tao một sô sân ga và khiên tôi mat thêm nửa giờ de đi lại. Xe lửa ở cả hai hướng chỉ sử dụng một đường ray và [57] xe lửa là lựa chọn duy nhât của tôi!\nW-Am À, có dịch vụ xe buýt nhanh đó. i\nM-Au Tôi đã không nhận thức được điều đó. Tôi vẫn còn chưa quen với thành phố này. Làm cách nào đê có thêm thông tin? 7 Ñ :\nW-Am [58] Tôi sé gửi cho ban đường dan tới trang Web và bản do hệ thong cua họ."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "59. Who is the woman? (A) An architect (B) A clothing designer (C) A construction manager (D) A department store director",
   "transcript": "M: Hello, Silvia. Good to see you again. MY consultancy firm has been working hard to help you grow your clothing company.\nW: Thanks. I never expected so much attention for my clothing designs, but I'm so pleased with the reactions.\nM: OK. What do you think about approaching Regents department stores?\nW: They usually market to a younger clientele.\nM: I see, Let me get you a list of other stores we also had in mind.",
   "explanationVi": "Đáp án đúng: B\n\n59. Người phụ nữ là ai?\n(A) Một kiến trúc su\n(B) Một nhà thiết kế thời trang\n(C) Một người quản lý xây dựng\n(D) Một giám đốc cửa hàng bách hóa\nCách diễn đạt tương đương:\na clothing designer (một nhà thiết kế thời trang) ~ my clothing designs (các thiết kế thời trang của tôi)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Who, woman\n- Dạng câu hỏi: thông tin tổng quát\n- Dựa vào những lời thoại đầu tiên để tìm đáp án.\n- Lời thoại từ người đàn ông \"My consultancy firm has been working hard to help you grow your clothing company.\" (Công ty tư vấn của tôi đã làm việc chăm chi để giúp ban phát triển công ty thời trang của bạn.) và lời đáp từ người phụ nữ “| never expected so much attention for my clothing designs, but I'm so pleased with the reactions.” (Tôi chưa bao giờ mong đợi được sự chú ý nhiều như vậy đối với các thiết kế thời trang của minh, nhưng tôi rất hài lòng với phản ứng.) cho thấy người phụ nữ trong tình huống này là một nhà thiết kế thời trang, vì cô ấy đang nhận được những phản ứng tích cực đối với các thiết kế của mình.\n- “a clothing designer” là cách diễn đạt tương đương của “my clothing designs’.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C) chứa thông tin không được đề cập. s (D) phuong án bẫy, người đàn ông có nhắc đến “Regents department stores” (chuỗi cửa hàng bách hóa Regents), tuy nhiên mục đích là để đề xuất người phụ nữ gửi các mẫu thiết kế của mình đến các cửa hàng này chứ không ám chỉ người phụ nữ là giám đốc của cửa hàng bách hóa đó.\n\nDịch hội thoại:\nM-Cn Xin chào, Silvia. Rất vui được gặp lại bạn. [59] Công ty tư vấn của tôi đã làm việc chăm chi dé giúp ban phát triển công ty thời trang của bạn.\nW-Br Cảm on. [59] Tôi chưa bao giờ mong đợi được sự chú ý nhiều như vậy đối với các thiết kế thời trang của mình, nhưng tôi rất hài lòng với những phan ứng từ khách hàng.\nM-Cn Được rồi. [60] Bạn nghĩ sao về việc tiếp cận các cửa hàng bách hóa Regents?\nW-Br Họ thường nhắm đến nhóm khách hàng trẻ tuổi hon.\nM-Cn Tôi hiểu. [61] Hãy đề tôi lay cho bạn một danh sách các cửa hàng khác mà chúng tôi cũng đang nghĩ đến."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "60. Why does the woman say, “They usually market to a younger clientele\"? (A) To reject a suggestion (B) To justify a decision (C) To express disappointment (D) To ask for clarification",
   "transcript": "M: Hello, Silvia. Good to see you again. MY consultancy firm has been working hard to help you grow your clothing company.\nW: Thanks. I never expected so much attention for my clothing designs, but I'm so pleased with the reactions.\nM: OK. What do you think about approaching Regents department stores?\nW: They usually market to a younger clientele.\nM: I see, Let me get you a list of other stores we also had in mind.",
   "explanationVi": "Đáp án đúng: A\n\nTại sao người phụ nữ lại nói: \"Họ thường nhắm đến cho nhóm khách hàng trẻ tuổi hơn\"?\n(A) Dé từ choi một lời đê nghị\n(B) Đệ biện minh cho một quyêt định\n(C) Đề bay tỏ sự that vọng\n(D) Đê yêu câu làm rõ\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, woman, say, “They usually market to a younger clientele\"\n- Dang cau hỏi: ngụ ý\n- Cc thông tin xung quanh lời thoại trích dẫn sẽ dẫn đến đáp án.\n- Lời thoại từ người đàn ông “What do you think about approaching Regents department stores?\" (Cô nghĩ sao về việc tiếp cận cửa hàng bách hóa Regents?) cho thấy người đàn\nông đang hỏi ý kiến của người phụ nữ về đề xuất tiếp cận chuỗi cửa hàng bách hóa Regents.\n- Do đó, có thể thấy lời đáp từ người phụ nữ “They usually market to a younger clientele\" (Họ thường nhắm đến nhóm khách hàng trẻ tuổi hơn) là một sự từ chối gián tiếp đối với lời đề xuất trên vì cô ấy thấy được các thiết kế thời trang của mình không phù hợp với nhóm khách hàng mục tiêu của chuỗi cửa hàng bách hóa Regents.\n→ Phương án (A) là phù hợp nhất. Loại phương án sai:\n- (B), (OC, (D) chứa thông tin không phù hợp với ngụ ý trong câu nói của người phụ nữ\n\nDịch hội thoại:\nM-Cn Xin chào, Silvia. Rất vui được gặp lại bạn. [59] Công ty tư vấn của tôi đã làm việc chăm chi dé giúp ban phát triển công ty thời trang của bạn.\nW-Br Cảm on. [59] Tôi chưa bao giờ mong đợi được sự chú ý nhiều như vậy đối với các thiết kế thời trang của mình, nhưng tôi rất hài lòng với những phan ứng từ khách hàng.\nM-Cn Được rồi. [60] Bạn nghĩ sao về việc tiếp cận các cửa hàng bách hóa Regents?\nW-Br Họ thường nhắm đến nhóm khách hàng trẻ tuổi hon.\nM-Cn Tôi hiểu. [61] Hãy đề tôi lay cho bạn một danh sách các cửa hàng khác mà chúng tôi cũng đang nghĩ đến."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "61. What does the man say he will give the woman? (A) An area map (B) A list of businesses (C) Some photographs (D) Some measurements",
   "transcript": "M: Hello, Silvia. Good to see you again. MY consultancy firm has been working hard to help you grow your clothing company.\nW: Thanks. I never expected so much attention for my clothing designs, but I'm so pleased with the reactions.\nM: OK. What do you think about approaching Regents department stores?\nW: They usually market to a younger clientele.\nM: I see, Let me get you a list of other stores we also had in mind.",
   "explanationVi": "Đáp án đúng: B\n\n61. Người dan ông nói sẽ đưa gi cho người phụ nữ?\n(A) Một bản đồ khu vực\n(B) Một danh sách các doanh nghiệp\n(C) Một số bức ảnh\n(D) Một số kích cỡ đo đạc\nCách diễn đạt tương đương:\na list of businesses (một danh sách các doanh nghiệp) = a list of other stores (một danh sách các cửa hàng khác)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, man, say, he, give, woman\n- Dạng câu hỏi: thông tin chi tiết\n- Cum từ mở đầu trong lời thoại cuối của người dan ông: “Let me...” (Để tôi ...) là dấu hiệu sắp đến đáp án.\n- Lời thoại từ người đàn ông “Let me get you a list of other stores we also had in mind.\" (Hãy để tôi lấy cho ban một danh sách các cửa hàng khác mà chúng tôi cũng dang nghĩ đến.) cho thấy ông ấy sẽ đưa cho người phụ nữ một danh sách các cửa hàng kinh doanh phù hợp với các thiết kế trang phục của người phụ nữ.\n- “a list of businesses” là cách diễn đạt tương đương của “a list of other stores”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- (A), (C)), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- consultancy firm (n-n): công ty tư vấn\n- attention (n): sự chú ý\n- clothing designs (n-n): những thiết kế quần áo *approach (v): tiếp cận\n- department stores (n-n): các cửa hang bách hóa\n- clientele (n): khách hang\n\nDịch hội thoại:\nM-Cn Xin chào, Silvia. Rất vui được gặp lại bạn. [59] Công ty tư vấn của tôi đã làm việc chăm chi dé giúp ban phát triển công ty thời trang của bạn.\nW-Br Cảm on. [59] Tôi chưa bao giờ mong đợi được sự chú ý nhiều như vậy đối với các thiết kế thời trang của mình, nhưng tôi rất hài lòng với những phan ứng từ khách hàng.\nM-Cn Được rồi. [60] Bạn nghĩ sao về việc tiếp cận các cửa hàng bách hóa Regents?\nW-Br Họ thường nhắm đến nhóm khách hàng trẻ tuổi hon.\nM-Cn Tôi hiểu. [61] Hãy đề tôi lay cho bạn một danh sách các cửa hàng khác mà chúng tôi cũng đang nghĩ đến."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Look at the graphic. Who is the woman? (A) Liliana Flores (B) Svetlana Popova (C) Lauren Campbell (D) So-Jin Park",
   "transcript": "W: Luis, I noticed something while I was directing yesterday's rehearsal, I had a problem while I was trying to give some directions to the actors during act three. I wanted to ask you about it since you're in charge of lighting.\nM: Sure. What is it?\nW: One of the footlights at the front of the stage was flickering, which was distracting. It made it hard to see the actors' faces and costumes. Can you do something to fix it?\nM: Actually, I've already ordered a replacement. It should be here tomorrow.\nW: Great. Thanks. I can't believe opening night is next week. Everyone has put so much work into the show-it'll be great to have an audience.",
   "explanationVi": "Đáp án đúng: B\n\n62. Nhìn vào đồ họa. Người phụ nữ là ai?\n(A) Lihana Flores\n(B) Svetlana Popova\n(C) Lauren Campbell\n(D) Công viên So-Jin\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, who, woman\n- Dạng câu hỏi: liên quan tới biểu đồ/bảng biểu\n- Lời thoại từ người phụ nữ \"| noticed something while | was directing yesterday's rehearsal.\" (Tôi nhận thấy điều gì đó khi chi đạo buổi diễn tập ngày hôm qua.) là thông tin chứa đáp án. Từ lời thoại này có thể thấy người phụ nữ là giám đốc chỉ đạo diễn xuất. Mặt khác, khi đối chiếu với bảng danh mục về vai trò của các thành viên thì người đóng vai trò giám đốc là Svetlana Popova.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n(A), (C)), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nW- Am Luis, [62] Tôi nhận thấy. điều gì đó khi chỉ đạo buồi diễn tập ngày hôm qua. [63] Tôi gặp vấn đề khi có gắng đưa ra một số chỉ dẫn cho các diễn viên trong màn ba. Tôi muốn hỏi bạn về điều đó vì bạn chịu trách nhiệm về ánh sáng.\nM-Cn Chắc chắn rồi. [63] Sao thé?\nW-Am [63] Một trong những chiếc đèn ở phía trước sân khấu nhấp nháy, gây mat tập trung. Thật khó dé nhìn thay khuôn mặt và trang phục của các diễn viên. Bạn có thé làm gì đó đề khắc phục nó không?\nM-Cn Thực ra tôi đã đặt hàng thay thế rồi. Nó sẽ ở đây vào ngày mai.\nW-Am Tuyệt vời. Cam on. [64] Tôi không thé tin được đêm khai mạc lại diễn ra vào tuần sau. Mọi người đã bỏ rất nhiều công sức vào chương trình - Sẽ thật tuyệt khi có khán giả.\nDanh mục Liliana Flores Thiét ké canh quay 62] Svetlana Popova Giam déc Lauren Campbell Dién vién So-Jin Park Thiét ké phuc trang"
  },
  {
   "number": 63,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "63. What problem do the speakers discuss? (A) Some equipment is not working. (B) Some costumes are not ready. (C) Some music is distracting. (D) An actor is late.",
   "transcript": "W: Luis, I noticed something while I was directing yesterday's rehearsal, I had a problem while I was trying to give some directions to the actors during act three. I wanted to ask you about it since you're in charge of lighting.\nM: Sure. What is it?\nW: One of the footlights at the front of the stage was flickering, which was distracting. It made it hard to see the actors' faces and costumes. Can you do something to fix it?\nM: Actually, I've already ordered a replacement. It should be here tomorrow.\nW: Great. Thanks. I can't believe opening night is next week. Everyone has put so much work into the show-it'll be great to have an audience.",
   "explanationVi": "Đáp án đúng: A\n\n63. Những người nói đang thảo luận về van dé gì?\n(A) Một số thiết bị không hoạt động.\n(B) Một số trang phục chưa sẵn sàng.\n(C) Một số bản nhạc có thể gây mắt tập trung.\n(D) Một diễn viên đến muộn.\nCách diễn đạt tương đương:\nnot working (không hoạt động) = flickering (nhấp nháy)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, problem, speakers, discuss\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại “What is it?” (Sao thé?) là dấu hiệu nhận biết sắp đến đáp an\n- Lời thoại tiếp theo từ người phụ nữ \"One of the footlights at the front of the stage was flickering.\" (Một trong những chiếc đèn ở phía trước sân khấu nhấp nháy) cho thấy vấn đề mà họ đang thảo luận liên quan đến việc một số thiết bị không hoạt động tốt (cụ thể là những chiếc đèn ở phía trước sân khấu) gây cản trở trong quá trình tập luyện.\n- “not working” là cách diễn đạt tương đương của “flickering”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B) phương án bẫy, người nói có nhắc đến việc những chiếc đèn ở phía trước sân khấu nhấp nháy làm không thể nhìn rõ trang phục của diễn viên, không đề cập đến việc trang phục chưa sẵn sàng.\n- (C) phương án bẫy, điều gây mất tập trung là những chiếc đèn ở phía trước sân khấu, không phải do âm nhạc\n- (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nW- Am Luis, [62] Tôi nhận thấy. điều gì đó khi chỉ đạo buồi diễn tập ngày hôm qua. [63] Tôi gặp vấn đề khi có gắng đưa ra một số chỉ dẫn cho các diễn viên trong màn ba. Tôi muốn hỏi bạn về điều đó vì bạn chịu trách nhiệm về ánh sáng.\nM-Cn Chắc chắn rồi. [63] Sao thé?\nW-Am [63] Một trong những chiếc đèn ở phía trước sân khấu nhấp nháy, gây mat tập trung. Thật khó dé nhìn thay khuôn mặt và trang phục của các diễn viên. Bạn có thé làm gì đó đề khắc phục nó không?\nM-Cn Thực ra tôi đã đặt hàng thay thế rồi. Nó sẽ ở đây vào ngày mai.\nW-Am Tuyệt vời. Cam on. [64] Tôi không thé tin được đêm khai mạc lại diễn ra vào tuần sau. Mọi người đã bỏ rất nhiều công sức vào chương trình - Sẽ thật tuyệt khi có khán giả.\nDanh mục Liliana Flores Thiét ké canh quay 62] Svetlana Popova Giam déc Lauren Campbell Dién vién So-Jin Park Thiét ké phuc trang"
  },
  {
   "number": 64,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "64. What will happen next week? (A) A playwright will attend a show. (B) Publicity photos will be taken. (C) A play will open. (D) A dress rehearsal will be held.",
   "transcript": "W: Luis, I noticed something while I was directing yesterday's rehearsal, I had a problem while I was trying to give some directions to the actors during act three. I wanted to ask you about it since you're in charge of lighting.\nM: Sure. What is it?\nW: One of the footlights at the front of the stage was flickering, which was distracting. It made it hard to see the actors' faces and costumes. Can you do something to fix it?\nM: Actually, I've already ordered a replacement. It should be here tomorrow.\nW: Great. Thanks. I can't believe opening night is next week. Everyone has put so much work into the show-it'll be great to have an audience.",
   "explanationVi": "Đáp án đúng: C\n\n64. Điều gì sẽ xảy ra vào tuần tới?\n(A) Một nhà viết kịch sẽ tham dự một buổi biểu diễn.\n(B) Những bức ảnh quảng bá sẽ được chụp.\n(C) Một vở kịch sẽ mở màn.\n(D) Một buổi thử trang phục sẽ được tổ chức.\nCách diễn đạt tương đương:\nopen (mở màn) ~ opening night (đêm mở màn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, happen, next week\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại từ người phụ nữ \"l can't believe opening night is next week.\" (Tôi không thể tin được đêm khai mạc lại diễn ra vào tuần sau.) là thông tin chứa đáp án. Từ lời thoại này có thể thấy tuần tới sẽ diễn ra buổi mở màn cho vở kịch của họ.\n- “open” là cách diễn đạt tương đương của “opening night”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n(A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- direct (v): chỉ đạo\n«rehearsal (n): buổi diễn tập\n- flicker (v): nhấp nháy\n- distracting (adj): làm sao lãng, mất tập trung\n- costumes (n): trang phục\n- order (v): đặt hàng\n- replacement (n): sự thay thế\n\nDịch hội thoại:\nW- Am Luis, [62] Tôi nhận thấy. điều gì đó khi chỉ đạo buồi diễn tập ngày hôm qua. [63] Tôi gặp vấn đề khi có gắng đưa ra một số chỉ dẫn cho các diễn viên trong màn ba. Tôi muốn hỏi bạn về điều đó vì bạn chịu trách nhiệm về ánh sáng.\nM-Cn Chắc chắn rồi. [63] Sao thé?\nW-Am [63] Một trong những chiếc đèn ở phía trước sân khấu nhấp nháy, gây mat tập trung. Thật khó dé nhìn thay khuôn mặt và trang phục của các diễn viên. Bạn có thé làm gì đó đề khắc phục nó không?\nM-Cn Thực ra tôi đã đặt hàng thay thế rồi. Nó sẽ ở đây vào ngày mai.\nW-Am Tuyệt vời. Cam on. [64] Tôi không thé tin được đêm khai mạc lại diễn ra vào tuần sau. Mọi người đã bỏ rất nhiều công sức vào chương trình - Sẽ thật tuyệt khi có khán giả.\nDanh mục Liliana Flores Thiét ké canh quay 62] Svetlana Popova Giam déc Lauren Campbell Dién vién So-Jin Park Thiét ké phuc trang"
  },
  {
   "number": 65,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "65. Why is the man surprised? (A) A new vacation policy was announced. (B) A group is larger than expected. (C) A price has increased. (D) A date has been changed.",
   "transcript": "M: Hey, Hiroko. I got the e-mail invite to the company retreat. I'm surprised that it's in June this year, instead of September.\nW: Yeah, we changed the dates so we could try out this venue. I toured it last month and was really impressed. The rooms especially are so comfortable. There weren t any openings in September, though.\nM: I'm sure it'll be worth the change. Your team in Human Resources plans great events.\nW: Here, I just pulled up their Web site. Take a look. Staff can choose one of these activities on the second day of the retreat.\nM: I've never been kayaking. This looks like a good chance to try it.",
   "explanationVi": "Đáp án đúng: D\n\n65. Tại sao người đàn ông lại ngạc nhiên?\n(A) Chính sách nghỉ phép mới đã được công bô.\n(B) Một nhóm đông hơn dự kiên.\n(C) Giá đã tăng lên. ;\n(D) Một ngày đã được thay đôi.\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, man, surprised\n- Dạng câu hỏi: thông tin chi tiết\ns_ Lời thoại: “I'm surprised that...” (Tôi ngạc nhiên rằng...) là dấu hiệu nhận biết sắp đến đáp án.\n- Lời thoại từ người đàn ông \"l got the e-mail invite to the company retreat. I'm surprised that it's in June this year, instead of September.\" (Tôi nhận được email mời tham dự kỳ nghỉ dưỡng cua công ty. Tôi ngạc nhiên vì năm nay là vào tháng 6, thay vi tháng 9.) là thông tin chứa đáp án. Từ lời thoại này có thể suy ra rằng việc thay đổi thời gian diễn ra kỳ nghỉ dưỡng là điều khiến người đàn ông ngạc nhiên.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Này, Hiroko. [65] Tôi nhận được email mời tham dự kỳ nghỉ dưỡng của công ty. Tôi ngạc nhiên vì năm nay là vào tháng Sáu, thay vì tháng Chín.\nW-Br Vâng, chúng tôi đã thay đổi ngày dé có thé thử địa điểm này. [66] Tôi đã đi tham quan vào tháng trước và thực sự rất ấn tượng. Các phòng đặc biệt rất thoải mái. Tuy nhiên, không có lịch trồng vào tháng Chín.\nM-Au Tôi chắc chắn rằng sự thay đổi này là xứng đáng. Đội ngũ Quan lý Nhân sự của bạn tổ chức các sự kiện tuyệt vời.\nW-Br Đây, tôi vừa tìm thay trang web của họ. Hãy nhìn xem. Nhân viên có thể chọn một trong những hoạt động này vào ngày thứ hai của kỳ nghỉ dưỡng. ;\nM-Au [67] Tôi chưa bao giờ chèo thuyên kayak. Day có vẻ là một cơ hội tot đê thử nó."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "66. What does the woman like about a venue? (A) The comfortable rooms (B) The food selection (C) The views (D) The fitness center",
   "transcript": "M: Hey, Hiroko. I got the e-mail invite to the company retreat. I'm surprised that it's in June this year, instead of September.\nW: Yeah, we changed the dates so we could try out this venue. I toured it last month and was really impressed. The rooms especially are so comfortable. There weren t any openings in September, though.\nM: I'm sure it'll be worth the change. Your team in Human Resources plans great events.\nW: Here, I just pulled up their Web site. Take a look. Staff can choose one of these activities on the second day of the retreat.\nM: I've never been kayaking. This looks like a good chance to try it.",
   "explanationVi": "Đáp án đúng: A\n\n66. Người phụ nữ thích gì ở địa điểm đó?\n(A) Những căn phòng tiện nghi\n(B) Việc lựa chọn thực phẩm\n(C) Cảnh quan\n(D) Trung tâm thể hình\nCách diễn đạt tương đương:\nthe comfortable rooms (những căn phòng thoải mái) ~ the rooms especially are so comfortable (Các phòng đặc biệt rất thoải mái)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: What, woman, like, venue\n- Dạng câu hỏi: thông tin chi tiết\n- Lời thoại “was really impressed” ( thực sự rất ấn tượng) là dấu hiệu nhận biết sắp đến đáp án.\n- Lời thoại từ người phụ nữ \"l toured it last month and was really impressed. The rooms especially are so comfortable\" (Tôi đã di tham quan vào tháng trước và thực sự rất ấn tượng. Các phòng đặc biệt rất thoải mái.) cho thấy cô ấy thích sự thoải mái mà các căn phòng ở địa điểm tham quan mang lại.\n- \"the comfortable rooms” là cách diễn đạt tương đương của “the rooms especially are so comfortable”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Au Này, Hiroko. [65] Tôi nhận được email mời tham dự kỳ nghỉ dưỡng của công ty. Tôi ngạc nhiên vì năm nay là vào tháng Sáu, thay vì tháng Chín.\nW-Br Vâng, chúng tôi đã thay đổi ngày dé có thé thử địa điểm này. [66] Tôi đã đi tham quan vào tháng trước và thực sự rất ấn tượng. Các phòng đặc biệt rất thoải mái. Tuy nhiên, không có lịch trồng vào tháng Chín.\nM-Au Tôi chắc chắn rằng sự thay đổi này là xứng đáng. Đội ngũ Quan lý Nhân sự của bạn tổ chức các sự kiện tuyệt vời.\nW-Br Đây, tôi vừa tìm thay trang web của họ. Hãy nhìn xem. Nhân viên có thể chọn một trong những hoạt động này vào ngày thứ hai của kỳ nghỉ dưỡng. ;\nM-Au [67] Tôi chưa bao giờ chèo thuyên kayak. Day có vẻ là một cơ hội tot đê thử nó."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "67. Look at the graphic. Who will lead the activity the man is interested in? (A) Ketan Bora (B) Beatriz Romero (C) Arnaud Fournier (D) Brandon Murray",
   "transcript": "M: Hey, Hiroko. I got the e-mail invite to the company retreat. I'm surprised that it's in June this year, instead of September.\nW: Yeah, we changed the dates so we could try out this venue. I toured it last month and was really impressed. The rooms especially are so comfortable. There weren t any openings in September, though.\nM: I'm sure it'll be worth the change. Your team in Human Resources plans great events.\nW: Here, I just pulled up their Web site. Take a look. Staff can choose one of these activities on the second day of the retreat.\nM: I've never been kayaking. This looks like a good chance to try it.",
   "explanationVi": "Đáp án đúng: A\n\n67. Nhìn vào dé họa. Ai sẽ dẫn dắt hoạt động mà người đàn ông quan tâm?\n(A) Ketan Bora\n(B) Beatriz Romero\n(C) Arnaud Fournier\n(D) Brandon Murray\nCách diễn đạt tương đương:\ninterested in (quan tâm) ~ a good chance to try (một cơ hội tốt để thử)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, who, lead, activity, man, interested in\n- Dạng câu hỏi: liên quan bảng biểu/biểu đồ\n- Cau hỏi yêu cầu xem đồ họa để xác định người sẽ dẫn dắt hoạt động mà người đàn ông quan tâm\n- Lời thoại từ người dan ông \" I've never been kayaking. This looks like a good chance to try it.\" (Tôi chưa bao giờ chèo thuyền kayak. Đây có vẻ là một cơ hội tốt dé thử nó.) cho thấy hoạt động mà người đàn ông có hứng thú là chèo thuyền kayak. Đối chiếu với thông tin trên trang web thì người chịu trách nhiệm dẫn dắt hoạt động này là Ketan Bora.\n- “interested in” là cách diễn đạt tương đương của “a good chance to try”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n(B), (C), (D) chứa thông tin không phù hợp.\nTừ vựng cần lưu ý:\n- retreat (n): kỳ nghỉ dưỡng\n- impressed (adj): ấn tượng\n- especially (adv): đặc biệt\n- worth (a): đáng giá\n- pull up (phrasal verb): kéo lên etry (v): thử\n- chance (n): cơ hội\n\nDịch hội thoại:\nM-Au Này, Hiroko. [65] Tôi nhận được email mời tham dự kỳ nghỉ dưỡng của công ty. Tôi ngạc nhiên vì năm nay là vào tháng Sáu, thay vì tháng Chín.\nW-Br Vâng, chúng tôi đã thay đổi ngày dé có thé thử địa điểm này. [66] Tôi đã đi tham quan vào tháng trước và thực sự rất ấn tượng. Các phòng đặc biệt rất thoải mái. Tuy nhiên, không có lịch trồng vào tháng Chín.\nM-Au Tôi chắc chắn rằng sự thay đổi này là xứng đáng. Đội ngũ Quan lý Nhân sự của bạn tổ chức các sự kiện tuyệt vời.\nW-Br Đây, tôi vừa tìm thay trang web của họ. Hãy nhìn xem. Nhân viên có thể chọn một trong những hoạt động này vào ngày thứ hai của kỳ nghỉ dưỡng. ;\nM-Au [67] Tôi chưa bao giờ chèo thuyên kayak. Day có vẻ là một cơ hội tot đê thử nó."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "68. What is the conversation mostly about? (A) Organizing an exhibit (B) Arranging a public tour (C) Filming a documentary (D) Requesting financial support",
   "transcript": "M: Hi. you must be with the camera crew. I'm Hector, head archaeologist here at the Arnaud Castle dig site.\nW: Nice to meet you. I'm Ling. Since it's our first day of filming for our TV documentary special, we're mainly going to capture general footage of your team at work.\nM: Great! We're working in quadrant two today. We've been finding lots of pottery. so you may capture us unearthing more.\nW: I see. This excavation has been a lengthy process, right?\nM: It has. We'd actually hoped to be further along, but there've been lots of thunderstorms lately, which have slowed things down.",
   "explanationVi": "Đáp án đúng: C\n\n68. Đoạn hội thoại chủ yếu nói về điều gì?\n(A) Tổ chức một cuộc triển lãm\n(B) Sắp xếp một chuyến tham quan công cộng\n(C) Quay một bộ phim tài liệu\n(D) Yêu cầu hỗ trợ tài chính\nCách diễn đạt tương đương:\nfilming a documentary (quay một bộ phim tài liệu) = filming for our TV documentary special (quay phim tai liéu truyén hinh dac biét)\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: what, conversation, mostly about\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại từ nhà khảo cổ học trưởng \"You must be with the camera crew\" (Bạn phải ở cùng với đội quay phim chứ) và phần đầu lời giải thích từ một thành viên trong đội quay phim “Since it's our first day of filming for our TV documentary special...” (Vì đây là ngày đầu tiên quay phim tài liệu truyền hình đặc biệt của chúng ta...) cho thấy đoạn hội thoại chủ yếu nói về việc quay phim tài liệu.\n- = \"filming a documentary” là cách diễn đạt tương đương của “filming for our TV documentary special”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\n\nDịch hội thoại:\nM-Cn Xin chao. [68] Bạn phải ở cùng với đội quay phim. Tôi là Hector, nhà khảo cé học trưởng tại khu khai quật Lâu đài Arnaud.\nW-Am Tôi rất vui được gặp bạn. Tôi là Ling. [68] Vì đây là ngày đầu tiên quay phim tài liệu truyền hình đặc biệt nên chúng tôi chủ yếu sẽ ghi lại những cảnh quay chung về nhóm của bạn tại nơi làm việc.\nM-Cn Tuyệt vời! [69] Hôm nay chúng ta đang làm việc ở góc phần tư thứ hai. Chúng tôi đã tìm thay rất nhiều đồ gốm, vì vậy bạn có thể bắt gặp chúng tôi đang khai quật thêm.\nW-Am Tôi hiểu rồi. Việc khai quật này là một quá trình lâu dài phải không? |\nM-Cn Nó có. Thực ra chúng tôi đã hy vọng có thể tiền xa hơn, nhưng [70] gần đây có rất nhiều giông bão, khiến mọi thứ chậm lại."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "69. Look at the graphic. Which part of the castle is being excavated today? (A) The garden (B) The kitchen (C) The tower (D) The great hall",
   "transcript": "M: Hi. you must be with the camera crew. I'm Hector, head archaeologist here at the Arnaud Castle dig site.\nW: Nice to meet you. I'm Ling. Since it's our first day of filming for our TV documentary special, we're mainly going to capture general footage of your team at work.\nM: Great! We're working in quadrant two today. We've been finding lots of pottery. so you may capture us unearthing more.\nW: I see. This excavation has been a lengthy process, right?\nM: It has. We'd actually hoped to be further along, but there've been lots of thunderstorms lately, which have slowed things down.",
   "explanationVi": "Đáp án đúng: B\n\n69. Nhìn vào đồ họa. Phần nào của lâu dai đang được khai quật ngày hôm nay?\n(A) Khu vườn\n(B) Nhà bếp\n(C) Tòa tháp\n(D) Đại sảnh\nCách diễn đạt tương đương:\nis being excavated (đang được khai quật) ~ working in (đang làm việc ở)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, which part, castle, excavated, today\n- Dạng câu hỏi: liên quan bảng biểu/biểu đồ\n- Cau hỏi yêu cầu xem đồ họa để xác định phần nào của lâu đài đang được khai quật ngày hôm nay\n- Lời thoại từ người đàn ông “We're working in quadrant two today.\" (Hôm nay chúng ta dang làm việc ở góc phần tư thứ hai.). Từ bản đồ có thể thấy gốc phần tư thứ hai là khu vực nhà bếp.\n- “is being excavated” là cách diễn đạt tương đương của “working in”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- (A), (C), (D) chứa thông tin không phù hợp.\n\nDịch hội thoại:\nM-Cn Xin chao. [68] Bạn phải ở cùng với đội quay phim. Tôi là Hector, nhà khảo cé học trưởng tại khu khai quật Lâu đài Arnaud.\nW-Am Tôi rất vui được gặp bạn. Tôi là Ling. [68] Vì đây là ngày đầu tiên quay phim tài liệu truyền hình đặc biệt nên chúng tôi chủ yếu sẽ ghi lại những cảnh quay chung về nhóm của bạn tại nơi làm việc.\nM-Cn Tuyệt vời! [69] Hôm nay chúng ta đang làm việc ở góc phần tư thứ hai. Chúng tôi đã tìm thay rất nhiều đồ gốm, vì vậy bạn có thể bắt gặp chúng tôi đang khai quật thêm.\nW-Am Tôi hiểu rồi. Việc khai quật này là một quá trình lâu dài phải không? |\nM-Cn Nó có. Thực ra chúng tôi đã hy vọng có thể tiền xa hơn, nhưng [70] gần đây có rất nhiều giông bão, khiến mọi thứ chậm lại."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "70. According to the man, why has some work been delayed? (A) An archaeological team is very small. (B) Weather conditions have been poor. (C) A source of funding was unavailable. (D) New volunteers required special training.",
   "transcript": "M: Hi. you must be with the camera crew. I'm Hector, head archaeologist here at the Arnaud Castle dig site.\nW: Nice to meet you. I'm Ling. Since it's our first day of filming for our TV documentary special, we're mainly going to capture general footage of your team at work.\nM: Great! We're working in quadrant two today. We've been finding lots of pottery. so you may capture us unearthing more.\nW: I see. This excavation has been a lengthy process, right?\nM: It has. We'd actually hoped to be further along, but there've been lots of thunderstorms lately, which have slowed things down.",
   "explanationVi": "Đáp án đúng: B\n\n70. Theo người đàn ông, tại sao một số công việc lại bị trì hoãn?\n(A) Nhóm khảo cổ thì rất nhỏ.\n(B) Điều kiện thời tiết rất xấu.\n(C) Không có nguồn tài trợ.\n(D) Tình nguyện viên mới cần được đào tạo đặc biệt.\nCách diễn đạt tương đương:\nweather conditions have been poor (điều kiện thời tiết rất xấu) ~ there've been lots of thunderstorms (có rất nhiều giông bão)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: man, why, work, delayed\n- Dang câu hỏi: thông tin chỉ tiết\n- Từ “but” (nhưng mà...) trong lời thoại từ người đàn ông là dấu hiệu sắp đến đáp án. Lời thoại từ người đàn ông \" there've been lots of thunderstorms lately, which have slowed things down.\" (gần đây có rất nhiều giông bão, khiến moi thứ chậm lai.) da chỉ ra nguyên nhân một số công việc bị trì hoàn là do ảnh hưởng của thời tiết.\n- “weather conditions have been poor\" là cách diễn đạt tương đương của “there've been lots of thunderstorms”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C)), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- camera crew (noun phrase): đoàn làm phim\n- head archaeologist (noun phrase): nhà khảo cổ trưởng\n- capture (v): ghi lại\n- footage (n): hình ảnh\n- mainly (adv): chủ yếu\n- pottery (n): đồ gốm\n- excavation (n): cuộc khai quật\n- thunderstorms (n): cơn bão có sam sét\n\nDịch hội thoại:\nM-Cn Xin chao. [68] Bạn phải ở cùng với đội quay phim. Tôi là Hector, nhà khảo cé học trưởng tại khu khai quật Lâu đài Arnaud.\nW-Am Tôi rất vui được gặp bạn. Tôi là Ling. [68] Vì đây là ngày đầu tiên quay phim tài liệu truyền hình đặc biệt nên chúng tôi chủ yếu sẽ ghi lại những cảnh quay chung về nhóm của bạn tại nơi làm việc.\nM-Cn Tuyệt vời! [69] Hôm nay chúng ta đang làm việc ở góc phần tư thứ hai. Chúng tôi đã tìm thay rất nhiều đồ gốm, vì vậy bạn có thể bắt gặp chúng tôi đang khai quật thêm.\nW-Am Tôi hiểu rồi. Việc khai quật này là một quá trình lâu dài phải không? |\nM-Cn Nó có. Thực ra chúng tôi đã hy vọng có thể tiền xa hơn, nhưng [70] gần đây có rất nhiều giông bão, khiến mọi thứ chậm lại."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "71. What kind of business recorded the message? (A) A city planning office (B) A cybersecurity firm (C) A utility company (D) An electronics repair shop",
   "transcript": "Hello. You've reached Imperial Electric and Gas, the number one power company in the Northeast region. Please hold for the next available representative. If you're calling about reported electrical outages in Cedar Springs, rest assured that technicians are on-site now and services will be fully restored this afternoon. Or if you've recently moved and are calling to either start or stop services, please visit our Web site to fill out a form to have a work order completed. Thank you.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương\nutility company (công ty tiện ích công cộng) ~ power company (công ty điện lực)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what kind, business, recorded, message\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “You've reached Imperial Electric and Gas, the number one power company in the Northeast region.” (Bạn đã đến với Imperial Electric and Gas, công ty điện lực số một vùng Đông Bac.) là thông tin chứa đáp án. Điện lực là một trong những tiện tích công cộng.\n- “utility company” là cách diễn đạt tương đương của “power company\"\n= Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 72,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "72. What does the speaker say will happen this afternoon? (A) A problem will be resolved. (B) A shipment will be delivered. (C) Some software will be updated. (D) Some refreshments will be offered.",
   "transcript": "Hello. You've reached Imperial Electric and Gas, the number one power company in the Northeast region. Please hold for the next available representative. If you're calling about reported electrical outages in Cedar Springs, rest assured that technicians are on-site now and services will be fully restored this afternoon. Or if you've recently moved and are calling to either start or stop services, please visit our Web site to fill out a form to have a work order completed. Thank you.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương\na problem will be resolved (một vấn đề sẽ được giải quyết) ~ services will be fully restored (dịch vụ sẽ được khôi phục hoàn toàn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, happen, afternoon\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “ If you're calling about reported electrical outages in Cedar Springs, rest assured that technicians are on-site now and services will be fully restored this afternoon. ” (hãy yên tâm rằng các kỹ thuật viên hiện dang có mặt và các dịch vụ sẽ được khôi phục hoàn toàn vào chiều nay.) là thông tin chứa đáp án. Vấn đề mất điện sẽ được giải quyết khi dịch vụ được khôi phục.\n- “a problem will be resolved” là cách diễn đạt tương đương cua “services will be fully restored”\n→ Phương án (A) la phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 73,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "73. What does the speaker say is available on a Web site? (A) Customer reviews (B) Work order forms (C) Business hours (D) Product manuals",
   "transcript": "Hello. You've reached Imperial Electric and Gas, the number one power company in the Northeast region. Please hold for the next available representative. If you're calling about reported electrical outages in Cedar Springs, rest assured that technicians are on-site now and services will be fully restored this afternoon. Or if you've recently moved and are calling to either start or stop services, please visit our Web site to fill out a form to have a work order completed. Thank you.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương\nwork order forms (mẫu đơn lệnh công tác) = fill out a form to have a work order completed (điền vào biểu mẫu để có một lệnh công tác được đặt)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, available, Web site\n- Dang câu hỏi: thông tin chi tiết\n- “please visit our Web site...” (vui lòng truy cập trang Web của chúng tôi) là dấu hiệu sắp đến đáp án. Lời thoại “please visit our Web site to fill out a form to have a work order completed.” (vui lòng truy cập trang Web của chúng tôi để điền vào biểu mẫu để hoàn thành lệnh làm việc.) là thông tin chứa đáp án.\n- \"work order forms\" là cách diễn đạt tương đương của “fill out a form to have a work order completed”\n~— Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- reach (v): đến\n- region (n): vùng\n- available (adj): có sẵn\n- representative (n): người đại diện\n- electrical outrage (n.phr): mất điện\n- rest assured that (phrase): hãy yên tâm rằng\n- technician (n): kỹ thuật viên\n- on-site (adj): có mặt\n- restore (v): hồi phục\n- fill out (phr verb): điền vào"
  },
  {
   "number": 74,
   "part": 4,
   "answer": "C",
   "group": "74-76",
   "textEn": "74. According to the speaker, why is a change being made? (A) To keep track of expenses (B) To help a business expand (C) To improve security (D) To attract job applicants",
   "transcript": "This weekend, we'll be installing new security software on our internal servers. This is a little more involved than a routine update—we need to have an extra layer of protection on our customers' personal data. So, we're all being asked to help prepare for this event. Before we leave the office on Friday, we'll need to shut down our computers to enable the patch. Marta Fuentes is here to explain how well finish the installation on our devices when we come in on Monday.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương\nimprove security (cải thiện an ninh) ~ have an extra layer of protection on our customers' personal data (thêm một lớp bảo vệ dữ liệu cá nhân của khách hàng)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, change\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “This weekend, we'll be installing new security software on our internal servers.” (Cuối tuần nay, chúng tôi sé cai dat phần mềm bảo mat mới trên các máy chủ nội bộ của minh.) là dấu hiệu sắp đến đáp án. “we need to have an extra layer of protection on our customers' personal data. So, we're all being asked to help prepare for this event.” (chúng ta cần có thêm một lớp bảo vệ cho dữ liệu cá nhân của khách hàng.) là thông tin chứa đáp án.\n- “improve security” là cách diễn đạt tương đương của “have an extra layer of protection on our customers’ personal data”\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 75,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "75. What are the listeners asked to do? (A) Shut down their computers (B) Reduce their expenses (C) Consult with their department managers (D) Create an equipment inventory",
   "transcript": "This weekend, we'll be installing new security software on our internal servers. This is a little more involved than a routine update—we need to have an extra layer of protection on our customers' personal data. So, we're all being asked to help prepare for this event. Before we leave the office on Friday, we'll need to shut down our computers to enable the patch. Marta Fuentes is here to explain how well finish the installation on our devices when we come in on Monday.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương\n- shut down their computers ~ shut down our computers: tắt máy tính\n- \"asked to do\" (được yêu cầu làm gi) = need to do (can làm gì)\nCách định vi vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, listeners, asked to do\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “Before we leave the office on Friday, we'll need to shut down our computers to enable the patch. ” (Trước khi rời van phòng vào thứ Sau, chúng ta cần tat máy tính để kích hoạt bản va.) là thông tin chứa đáp án.\n- “shut down their computers” là cách diễn đạt tương đương của “shut down our computers”\n- \"asked to do” là cách diễn đạt tương đương của “need to do” ~ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 76,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "76. What department does Marta Fuentes most likely work in? (A) Legal (B) Marketing (C) Human Resources (D) Information Technology",
   "transcript": "This weekend, we'll be installing new security software on our internal servers. This is a little more involved than a routine update—we need to have an extra layer of protection on our customers' personal data. So, we're all being asked to help prepare for this event. Before we leave the office on Friday, we'll need to shut down our computers to enable the patch. Marta Fuentes is here to explain how well finish the installation on our devices when we come in on Monday.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, department, Marta Fuentes, most likely, work\n- Dang câu hỏi: thông tin chung\n- Lời thoại “Marta Fuentes is here to explain how we'll finish the installation on our devices when we come in on Monday.” (Marta Fuentes có mặt ở đây để giải thích cach chúng tôi hoàn tất quá trình cài đặt trên thiết bị của mình khi chúng tôi đến vào thứ Hai.) là thông tin chứa đáp án. Việc cài đặt trên thiết bị liên quan đến ngành Công nghệ thông tin.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) không phù hợp\nTừ vựng cần lưu ý:\n- install (v): lắp đặt\n- security (n): an ninh\n- internal (adj): bên trong\n- routine (n): chu trình\n- layer (n): lớp\n- protection (n): sự bảo vệ\n- shut down (phrasal verb): tat đi\n- enable (v): kích hoạt\n- device (n): thiết bị"
  },
  {
   "number": 77,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "77. According to the speaker, what will begin on Monday? (A) A seasonal internship program (B) Road construction (C) Landscaping maintenance (D) An equipment upgrade",
   "transcript": "Let me remind everyone that starting on Monday, the main entrance to the office building will be inaccessible while the road is being widened and repaved. This also means that our usual parking lot won't be available. But don't worry-there's plenty of space in the parking garage next to the Jay Building. For your convenience, the company will be providing a van service that will run every fifteen minutes until the project is completed. The van will operate between seven and nine A.M., and then again between four and six P.M. We'll be posting project updates on our Web site, so be sure to check it regularly.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương\nroad construction (sự xây dựng đường) = the road is being widened and repaved (con đường dang được mở rộng va lát lai)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, begin, Monday\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “Let me remind everyone that starting on Monday” (Hãy để tôi nhắc mọi người rằng bắt đầu từ thứ Hai) là dấu hiệu sắp đến đáp án. “Let me remind everyone that starting on Monday, the main entrance to the office building will be inaccessible while the road is being widened and repaved.” (Hãy để tôi nhắc mọi người rằng bắt đầu từ thứ Hai, lối vào chính của tòa nhà văn phòng sẽ không thể tiếp cận được trong khi đường đang được mở rộng và lát lại.) là thông tin chứa đáp án.\n- “road construction” là cách diễn đạt tương đương của “the road is being widened and repaved”\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 78,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "78. What will the company provide for the listeners? (A) Free lunch (B) New identification badges (C) Parking passes (D) Transportation",
   "transcript": "Let me remind everyone that starting on Monday, the main entrance to the office building will be inaccessible while the road is being widened and repaved. This also means that our usual parking lot won't be available. But don't worry-there's plenty of space in the parking garage next to the Jay Building. For your convenience, the company will be providing a van service that will run every fifteen minutes until the project is completed. The van will operate between seven and nine A.M., and then again between four and six P.M. We'll be posting project updates on our Web site, so be sure to check it regularly.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương transportation (sự vận chuyển) ~ a van service (dịch vụ xe tải)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, company, provide, listeners\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “For your convenience, the company will be providing a van service” (Dé thuận tiện cho bạn, công ty sẽ cung cap dich vu xe tai) là thông tin chứa dap án.\n- “transportation” là cách diễn đạt tương đương của “a van service”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (C) chứa thông tin không được đề cập.\n- Phương án C bẫy. Trong bài có nhắc đến thông tin “there's plenty of space in the parking garage next to the Jay Building.” liên quan đến “parking passes” nhưng đây không phải là dich vụ mà công ty cung cấp."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "79. Why should the listeners visit a Web site? (A) To download a map (B) To post feedback (C) To fill out a registration form (D) To read project updates",
   "transcript": "Let me remind everyone that starting on Monday, the main entrance to the office building will be inaccessible while the road is being widened and repaved. This also means that our usual parking lot won't be available. But don't worry-there's plenty of space in the parking garage next to the Jay Building. For your convenience, the company will be providing a van service that will run every fifteen minutes until the project is completed. The van will operate between seven and nine A.M., and then again between four and six P.M. We'll be posting project updates on our Web site, so be sure to check it regularly.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\nread (đọc) ~ check (kiểm tra)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, listeners, visit, Web site\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “We'll be posting project updates on our Web site, so be sure to check it regularly.” (Chúng tôi sẽ đăng thông tin cập nhật về dự án trên trang web của mình, vì vậy hãy nhớ kiểm tra nó thường xuyên.) là thông tin chứa đáp án.\n- “read” là cách diễn đạt tương đương của “check”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- main entrance (n.phr): cửa chính\n- inaccessible (adj): không thể tiếp cận được\n- widen (v): mở rộng\n- repave (v): lát lai\n- available (adj): có sẵn\n- plenty of (phrase): nhiều\n- convenience (n): sự thuận tiện\n- operate (v): hoạt động\n- post(v): đăng bài\n- regularly (adv): một cách thường xuyên"
  },
  {
   "number": 80,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "80. What is the speaker preparing for? (A) A client visit (B) A branch opening (C) A job fair (D) An equipment upgrade",
   "transcript": "Hi, Asako. I'm following up about the hotel you asked me to book for our client visiting from India next month. You wanted to reserve a room for her at the Maple Lodge, but it's fully booked that week. So I've been looking at other hotels in the area, and there is one on Jefferson Avenue. It's a little farther from our office, but it looks like a nice place. They also have a complimentary shuttle bus that can take our guest back and forth from our office. Call me and let me know what you think.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương\na client visit (chuyến khách hàng đến thăm) = our client visiting from India (khách hàng của chúng tôi đến thăm từ Ấn Độ)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, preparing\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “I'm following up about the hotel you asked me to book for our client visiting from India next month. “ (Tôi đang tìm hiểu về khách san mà bạn yêu cầu tôi đặt cho khách hàng của chúng ta đến thăm từ Ấn Độ vào tháng tới.) là thông tin chứa đáp án.\n- “aclient visit\" là cách diễn đạt tương đương của “our client visiting from India”\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (B), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 81,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "81. Why does the speaker say, “there is one on Jefferson Avenue\"? (A) To express surprise (B) To correct some information (C) To complain about a decision (D) To recommend an alternative",
   "transcript": "Hi, Asako. I'm following up about the hotel you asked me to book for our client visiting from India next month. You wanted to reserve a room for her at the Maple Lodge, but it's fully booked that week. So I've been looking at other hotels in the area, and there is one on Jefferson Avenue. It's a little farther from our office, but it looks like a nice place. They also have a complimentary shuttle bus that can take our guest back and forth from our office. Call me and let me know what you think.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vi vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: why, speaker, “there is one on Jefferson Avenue\"\n- Dang câu hỏi: ngụ ý\n- Lời thoại “You wanted to reserve a room for her at the Maple Lodge, but it's fully booked that week. So I've been looking at other hotels in the area and there is one on Jefferson Avenue. \" (Bạn muốn đặt phòng cho cô ấy ở Maple Lodge, nhưng tuần đó đã kín chỗ rồi. Vì vậy tôi đã xem xét các khách sạn khác trong khu vực và có một khách sạn trên Đại lộ Jefferson.) là thông tin chứa đáp án. Người nói ban đầu muốn đặt phòng ở khách sạn Maple Lodge nhưng đã hết phòng nên người đó đã tìm một khách sạn khác trên Đại lộ Jefferson.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) không phù hợp"
  },
  {
   "number": 82,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "82. What additional service is mentioned? (A) A catered meal (B) A shuttle bus (C) Technical support (D) Secure storage",
   "transcript": "Hi, Asako. I'm following up about the hotel you asked me to book for our client visiting from India next month. You wanted to reserve a room for her at the Maple Lodge, but it's fully booked that week. So I've been looking at other hotels in the area, and there is one on Jefferson Avenue. It's a little farther from our office, but it looks like a nice place. They also have a complimentary shuttle bus that can take our guest back and forth from our office. Call me and let me know what you think.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, additional service\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “They also have a complimentary shuttle bus that can take our guest back and forth from our office. ” (Họ cũng có xe buýt dua đón miễn phí có thể đưa khách qua lại văn phòng của chúng tôi.) là thông tin chứa đáp án. Người nói cho rằng họ cũng (also) có thêm một dịch vụ xe buýt đưa đón, thông tin này tương đương với chi tiết “additional service” trong câu hỏi.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- follow up (phr verb): tìm hiểu\n- book (v): đặt trước\n- reserve (v): đặt trước\n- fully booked (phrase): đã được đặt hết (kín chỗ) s complimentary (adj): miễn phí\n- back and forth (phrase): qua lại"
  },
  {
   "number": 83,
   "part": 4,
   "answer": "C",
   "group": "83-85",
   "textEn": "83. According to the speaker, why are some changes needed? (A) To retain employees (B) To attract investors (C) To satisfy customers (D) To increase productivity",
   "transcript": "I'd like to start by giving everyone an update on our latest project. As you know, in order to stay on top as a leading shipping company, we need to continually make changes to meet our customers' expectations. Since our customers prefer doing almost everything digitally, we're going to introduce a new delivery tracking service. By using a smartphone application, customers will be able to see where their package is in real time. Of course, implementing this will be a major project for us and will take place over the coming year. So next month, we'll begin working with developers from XKP Software on creating this tracking service.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương\nsatisfy customers (làm hài lòng khách hàng) ~ meet our customers’ expections (đáp ứng sự mong đợi của khách hàng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, some changes\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “we need to continually make changes...” (chúng tôi cần liên tục thực hiện các thay đổi) là dấu hiệu sắp đến đáp án. “we need to continually make changes to meet our customers' expectations.” (chúng tôi cần liên tục thực hiện các thay đổi để đáp ứng mong đợi của khách hàng.) là thông tin chứa đáp án.\n- “satisfy customers” là cách diễn đạt tương đương của “meet our customers’ expections”\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 84,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "84. What additional service does the company plan to offer? (A) Free product returns (B) Expedited bulk shipping (C) Pickup at self-service kiosks (D) Real-time package tracking",
   "transcript": "I'd like to start by giving everyone an update on our latest project. As you know, in order to stay on top as a leading shipping company, we need to continually make changes to meet our customers' expectations. Since our customers prefer doing almost everything digitally, we're going to introduce a new delivery tracking service. By using a smartphone application, customers will be able to see where their package is in real time. Of course, implementing this will be a major project for us and will take place over the coming year. So next month, we'll begin working with developers from XKP Software on creating this tracking service.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\nreal-time package tracking (theo dõi gói hàng theo thời gian thực) ~ see where their package is in real time (biết gói hàng đang ở đâu trong thời gian thực)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, additional service, company, plan to offer (thì tương lai)\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “we're going to introduce a new delivery tracking service.” (chúng tôi sẽ giới thiệu một dich vụ theo dõi giao hàng mới.chúng tôi sẽ giới thiệu một dịch vụ theo dõi giao hàng mới.) là dấu hiệu sắp đến đáp án. By using a smartphone application, customers will be able to see where their package is in real time.” (Bang cách sử dung ứng dung điện thoại thông minh, khách hàng sẽ có thé biết gói hàng của họ đang ở đâu theo thời gian thực.) là thông tin chứa đáp án.\n- “real-time package tracking” là cách diễn đạt tương đương của “see where their package is in real time”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (C) chứa thông tin không được đề cập\n- Phuong án B bẫy. Trong bài nhắc đến từ “delivery” liên quan với shipping” nhưng công ty không cung cấp dịch vụ giao hàng số lượng lớn nhanh chóng."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "85. According to the speaker, what will begin next month? (A) A workshop series (B) A new corporate policy (C) A land development project (D) A business collaboration",
   "transcript": "I'd like to start by giving everyone an update on our latest project. As you know, in order to stay on top as a leading shipping company, we need to continually make changes to meet our customers' expectations. Since our customers prefer doing almost everything digitally, we're going to introduce a new delivery tracking service. By using a smartphone application, customers will be able to see where their package is in real time. Of course, implementing this will be a major project for us and will take place over the coming year. So next month, we'll begin working with developers from XKP Software on creating this tracking service.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\na business collaboration (hợp tác kinh doanh) = working with developers from XKP Software (làm việc với các nhà phát triển đến từ XKP Software)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, additional service, company, plan to offer\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “next month” (tháng tới) là dấu hiệu sắp đến đáp án. “next month, we'll begin working with developers from XKP Software on creating this tracking service.” (tháng tới, chúng tôi sẽ bắt đầu làm việc với các nhà phát triển từ XKP Software để tạo ra dịch vụ theo dõi này.) là thông tin chứa đáp án.\n- “A business collaboration” là cách diễn đạt tương đương của “working with developers from XKP Software”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (A), (B) chứa thông tin không được đề cập\n- Phuong án C bẫy. Trong bài nhắc đến từ “project” giống phương án nhưng dự án trong bài không liên quan đến phát triển đất đai và sẽ diễn ra vào năm tới (will take place over the coming year.)\nTừ vựng cần lưu ý:\n- lastest (adj): mới nhất\nsổ leading (adj): dan đầu\n- continually (adv): một cách liên tục\n- expectation (n): sự mong đợi\n- introduce (v): giới thiệu\n- tracking (n): theo dõi\n- in real time (phrase): trong thời gian thực\n- implement (v): thực hiện\n- developer (n): nhà phát triển"
  },
  {
   "number": 86,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "86. What industry does the speaker most likely work in? (A) Civil service (B) Hospitality (C) Media (D) Architecture",
   "transcript": "I'm so happy we got the exclusive video footage of the mayor's response today. We were able to beat the other networks in getting that interview to the public! I wanted to give you all a heads-up that next month we'll be providing a behind-the-scenes tour for students who are exploring our field as a potential career path. They'll see things like the assignment coordination desk, our studios, and the control room. I'm looking for a few volunteers who can spare an hour of their time to do this. Please e-mail me if you're interested.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, industry, speaker, most likely, work\n- Dang câu hỏi: thông tin chung\n- Lời thoại “We were able to beat the other networks in getting that interview to the public!” (Chúng tôi đã có thể đánh bại các nhà mang khác trong việc đưa cuộc phỏng vấn đó đến với công chúng!) là thông tin chứa đáp án. Các nhà mạng liên quan đến ngành Phương tiện truyền thông.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) không phù hợp"
  },
  {
   "number": 87,
   "part": 4,
   "answer": "D",
   "group": "86-88",
   "textEn": "87. What is planned for next month? (A) A retirement luncheon (B) An employee-performance review (C) A computer-system upgrade (D) A tour of a facility",
   "transcript": "I'm so happy we got the exclusive video footage of the mayor's response today. We were able to beat the other networks in getting that interview to the public! I wanted to give you all a heads-up that next month we'll be providing a behind-the-scenes tour for students who are exploring our field as a potential career path. They'll see things like the assignment coordination desk, our studios, and the control room. I'm looking for a few volunteers who can spare an hour of their time to do this. Please e-mail me if you're interested.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\nA tour of facility (chuyến tham quan cơ sở) = a behind-the-scenes tour (chuyến tham quan hậu trường)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, planned, next month\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “next month\" (tháng tới) là dấu hiệu sắp đến đáp án. “next month, we'll be providing a behind-the-scenes tour for students who are exploring our field as a potential career path.” (tháng tới, chúng tôi sẽ tổ chức một chuyến tham quan hậu trường dành cho những sinh viên đang khám phá lĩnh vực của chúng tôi như một con đường sự nghiệp tiềm năng.) là thông tin chứa đáp án.\n- “A tour of facility” là cách diễn đạt tương đương của “a behind-the-scenes tour”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập"
  },
  {
   "number": 88,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "88. Who should send the speaker an e-mail? (A) Those going on vacation (B) Those willing to volunteer (C) Those wishing to provide feedback (D) Those presenting at a conference",
   "transcript": "I'm so happy we got the exclusive video footage of the mayor's response today. We were able to beat the other networks in getting that interview to the public! I wanted to give you all a heads-up that next month we'll be providing a behind-the-scenes tour for students who are exploring our field as a potential career path. They'll see things like the assignment coordination desk, our studios, and the control room. I'm looking for a few volunteers who can spare an hour of their time to do this. Please e-mail me if you're interested.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương\nthose willing to volunteer (những người sẵn sàng tình nguyện) = volunteers (tình nguyện viên)\nCách định vi vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: who, send, speaker, e-mail\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “I'm looking for a few volunteers who can spare an hour of their time to do this. Please e-mail me if you're interested.” (Tôi đang tim một vai tinh nguyện viên có thể dành một giờ để làm việc này. Xin vui lòng gửi email cho tôi nếu bạn quan tâm.) là thông tin chứa đáp án.\n- “those willing to volunteer” là cách diễn đạt tương đương của “volunteers”\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- exclusive (adj): độc quyền\n- video footage (np): đoạn video\n- response (n): phản hồi\n- beat (v): đánh bai\n- network (n): nhà mạng\n- heads-up (n): thông báo\n- behind-the-scenes (adj): hậu trường\n- explore (v): khám pha\n- potential (adj): tiềm năng\n- career path (np): con đường su nghiệp\n- volunteer (v): tình nguyện\n- spare (v): dành"
  },
  {
   "number": 89,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "89. What does the speaker's company most likely sell? (A) Beauty supplies (B) Kitchen appliances (C) Books (D) Sporting goods",
   "transcript": "Congratulations on a successful third quarter, everyone! You've all done such a great job selling our ovens and refrigerators that we've already exceeded our sales expectations for the year! To celebrate, we'd like to invite the sales team to join us for a company dinner. The dinner will be held on Thursday, December twentieth at the Canterbury Restaurant. You might want to carpool or take public transportation to the event-the restaurant is near the stadium and there's a sports event that night.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương\nkitchen appliances (thiết bị nhà bếp) = ovens and refrigerators (lò nướng và tủ lạnh)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speakers company, most likely, sell\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “You've all done such a great job selling our ovens and refrigerators that we've already exceeded our sales expectations for the year!” (Tat ca cac ban da làm rất tốt việc bán lò nướng và tủ lạnh đến nỗi doanh số bán hàng của chúng tôi đã vượt quá mong đợi trong năm!) là thông tin chứa đáp án. Lò nướng và tủ lạnh là các Thiết bị nhà bếp.\n- “kitchen appliances” là cách diễn đạt tương đương của “ovens and refrigerators”\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 90,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "90. What event does the speaker invite the listeners to? (A) A sales workshop (B) A product demonstration (C) A celebratory dinner (D) A concert",
   "transcript": "Congratulations on a successful third quarter, everyone! You've all done such a great job selling our ovens and refrigerators that we've already exceeded our sales expectations for the year! To celebrate, we'd like to invite the sales team to join us for a company dinner. The dinner will be held on Thursday, December twentieth at the Canterbury Restaurant. You might want to carpool or take public transportation to the event-the restaurant is near the stadium and there's a sports event that night.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương a celebratory dinner (bữa tối ăn mừng) a company dinner (bữa tối cùng công ty)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, event, speaker, invite, listeners\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “To celebrate, we'd like to invite the sales team to join us for a company dinner.” (Dé ăn mừng, chúng tôi muốn mời đội ngũ bán hàng đến dy bữa tối của công ty với chúng tôi.) là thông tin chứa đáp án.\n- “acelebratory dinner” là cách diễn đạt tương đương của “a company dinner”\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 91,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "91. What does the speaker mean when he says, \"there's a sports event that night”? (A) The office will be closed. (B) Parking will be limited. (C) A meeting will be rescheduled. (D) The listeners should buy some tickets.",
   "transcript": "Congratulations on a successful third quarter, everyone! You've all done such a great job selling our ovens and refrigerators that we've already exceeded our sales expectations for the year! To celebrate, we'd like to invite the sales team to join us for a company dinner. The dinner will be held on Thursday, December twentieth at the Canterbury Restaurant. You might want to carpool or take public transportation to the event-the restaurant is near the stadium and there's a sports event that night.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: what, speaker, mean, “there's a sports event that night\"\n- Dang câu hỏi: ngụ ý\n- Lời thoại “You might want to carpool or take public transportation to the event- the restaurant is near the stadium and there's a sports event that night.” (Bạn có thể muốn di chung xe hoặc đi phương tiện công cộng đến sự kiện - nhà hàng ở gần sân vận động và có một sự kiện thể thao tối hôm đó.) là thông tin chứa đáp án. Sự kiện thể thao ở sân vận động gần nhà hàng có thể rất đông người và không có chỗ đỗ xe nên người nói khuyên rằng nên đi chung xe hoặc phương tiện giao đông công cộng.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C), (D) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- successful (adj): thành công\n- quarter (n): quý\n- refrigerator (n): tủ lạnh\n- exceed (v): vượt quá\n- expectation (n): mong đợi\n- celebrate (vì: ăn mừng"
  },
  {
   "number": 92,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "92. Who most likely is the speaker? (A) An artist (B) A business owner (C) A local journalist (D) A government official",
   "transcript": "I hope you've enjoyed this tour of historic homes in Salona City. I founded this tour company five years ago, and I'm happy to announce that next month my company's expanding its offerings. We're launching a new walking tour that will focus on the various murals and statues located throughout the city center. We know tourists like you often visit the exhibitions at our art museum, but art isn't only inside the walls of a museum. Here are some brochures with information, including the times and prices.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương\nbusiness (doanh nghiệp) = a tour company (công ty du lịch)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, most likely, speaker\n- Dang câu hỏi: thông tin chung\n- Lời thoại “| founded this tour company five years ago” (Tôi đã thành lập công ty du lịch này cách đây 5 năm) là thông tin chứa đáp án. Người thành lập công ty là Một chủ doanh nghiệp.\n- “business” là cách diễn đạt tương đương của “a tour company”\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (C)), (D) không phù hợp"
  },
  {
   "number": 93,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "93. Why does the speaker say, \"art isn't only inside the walls of a museum\"? (A) To apologize for an exhibit closure (B) To disagree with an online review (C) To motivate the listeners to take another tour (D) To recommend a building renovation",
   "transcript": "I hope you've enjoyed this tour of historic homes in Salona City. I founded this tour company five years ago, and I'm happy to announce that next month my company's expanding its offerings. We're launching a new walking tour that will focus on the various murals and statues located throughout the city center. We know tourists like you often visit the exhibitions at our art museum, but art isn't only inside the walls of a museum. Here are some brochures with information, including the times and prices.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, “art isn't only inside the walls of a museum\"\n- Dang câu hỏi: ngụ ý\n- Lời thoại “We're launching a new walking tour that will focus on the various murals and statues located throughout the city center. We know tourists like you\noften visit the exhibitions at our art museum, but art isn't only inside the walls of a museum.\" (Chúng tôi sắp triển khai một chuyến đi bộ mới tập trung vào các bức tranh tường và tượng khác nhau nằm khắp trung tâm thành phố. Chúng tôi biết những khách du lịch như bạn thường đến thăm các buổi triển lãm tại bảo tàng nghệ thuật của chúng tôi, nhưng nghệ thuật không chỉ có trong những bức tường của bảo tàng.) là thông tin chứa đáp án. Người nói cho rằng nghệ thuật không chỉ gói gọn trong một bảo tàng duy nhất nên khách du lịch nên thưởng thức tác phẩm nghệ thuật nằm khắp trung tâm thành phố thông qua một chuyến đi bộ.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) không phù hợp"
  },
  {
   "number": 94,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "94. What does the speaker give to the listeners? (A) City maps (B) Gift cards (C) Name badges (D) Informational brochures",
   "transcript": "I hope you've enjoyed this tour of historic homes in Salona City. I founded this tour company five years ago, and I'm happy to announce that next month my company's expanding its offerings. We're launching a new walking tour that will focus on the various murals and statues located throughout the city center. We know tourists like you often visit the exhibitions at our art museum, but art isn't only inside the walls of a museum. Here are some brochures with information, including the times and prices.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\ninformational brochures = brochures with information: (tài liệu thông tin)\nCách định vi vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, speaker, give, listeners\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “Here are some brochures with information, including the times and prices.” (Dưới day là một số tài liệu quảng cáo có thông tin về thời gian và gia cả.) là thông tin chứa đáp án.\n- “informational brochures” là cách diễn đạt tương đương của “brochures with information”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập\nTừ vựng cần lưu ý:\n- historic (adj): thuộc về lịch sử\n- found (v): thành lập\n- offering (n): dịch vụ\n- launch (v): triển khai\n- focus on (phr verb): tập trung vào\n- various (adj): đa dạng\n- mural (n): tranh tường\n- statue (n): tượng\n- exhibition (n): triển lãm\n- brochure (n): tài liệu quảng cáo"
  },
  {
   "number": 95,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "95. What is the broadcast mainly about? (A) A renovated airport terminal (B) A redesigned city hall (C) A new train station (D) A new bridge",
   "transcript": "in local news, the Bayland Transit Agency has announced that construction has begun on the new Alexton train station, which will offer a direct rail connection to the city center. Spokesperson Claudia Schneider explained that the agency initially considered a more elaborate design with a projected cost of 300 million dollars but ultimately decided to go with a more cost-effective and straightforward proposal with a price tag of 250 million dollars. Not only is it more economical, but an earlier completion date is expected. The building will have an adjacent small park for public use, and beginning in May, residents will be invited to vote on ideas for it.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, broadcast, mainly about\n- Dang câu hỏi: thông tin chung\n- Lời thoại “the Bayland Transit Agency has announced that construction has begun on the new Alexton train station” (Cơ quan Vận tải Bayland da thông báo rằng việc xây dựng đã bắt đầu trên ga xe lửa Alexton mới) là thông tin chứa đáp án. Nội dung cả bài nói về chi phí dự kiến và đề xuất thiết kế của ga xe lửa.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 96,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "96. Look at the graphic. Which proposal was chosen? (A) Plan A (B) Plan B (C) Plan C (D) Plan D",
   "transcript": "in local news, the Bayland Transit Agency has announced that construction has begun on the new Alexton train station, which will offer a direct rail connection to the city center. Spokesperson Claudia Schneider explained that the agency initially considered a more elaborate design with a projected cost of 300 million dollars but ultimately decided to go with a more cost-effective and straightforward proposal with a price tag of 250 million dollars. Not only is it more economical, but an earlier completion date is expected. The building will have an adjacent small park for public use, and beginning in May, residents will be invited to vote on ideas for it.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\nchosen (được chọn) = go with (chọn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, proposal, chosen\n- Dang câu hỏi: liên quan bảng biểu\n- Lời thoại “the agency initially considered a more elaborate design with a projected cost of 300 million dollars but ultimately decided to go with...” (ban đầu cơ quan nay xem xét một thiết kế phức tạp hơn với chi phí dự kiến là 300 triệu đô la nhưng cuối cùng quyết định chọn một đề xuất đơn giản và hiệu quả hơn với mức giá 250 triệu đô la.ban đầu cơ quan này xem xét một thiết kế phức tạp hơn với chi phí dự kiến là 300 triệu đô la nhưng cuối cùng quyết định chọn) là thông tin sắp đến đáp án. “but ultimately decided to go with a more cost- effective and straightforward proposal with a price tag of 250 million dollars.” (nhưng cuối cùng quyết định chọn một đề xuất đơn giản và hiệu qua hơn với mức giá 250 triệu đô la.) là thông tin chứa đáp án. Ban đầu cơ quan này lựa chọn kế hoạch C nhưng cuối cùng lựa chọn kế hoạch D.\n- “chosen” là cách diễn đạt tương đương của “go with”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không phù hợp"
  },
  {
   "number": 97,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "97. According to the speaker, what will residents be able to vote on? (A) Parking options (B) Food vendors (C) Public artwork (D) Park ideas",
   "transcript": "in local news, the Bayland Transit Agency has announced that construction has begun on the new Alexton train station, which will offer a direct rail connection to the city center. Spokesperson Claudia Schneider explained that the agency initially considered a more elaborate design with a projected cost of 300 million dollars but ultimately decided to go with a more cost-effective and straightforward proposal with a price tag of 250 million dollars. Not only is it more economical, but an earlier completion date is expected. The building will have an adjacent small park for public use, and beginning in May, residents will be invited to vote on ideas for it.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, residents, vote\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “ The building will have an adjacent small park for public use, and beginning in May, residents will be invited to vote on ideas for it.” (Tòa nha sé có một công viên nhỏ liền kề dé sử dụng công cộng va bắt đầu từ thang 5, người dân sẽ được mời bỏ phiếu về ý tưởng cho nó.) là thông tin chứa đáp án.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Cac phương án (B), (C) chứa thông tin không được đề cập\n- Phương án A bẫy. Trong bài nhắc đến từ “park” liên quan đến “parking” nhưng hai từ này có ý nghĩa khác nhau. Từ “park” có nghĩa là công viên, từ “parking” có nghĩa là đỗ xe.\nTừ vựng cần lưu ý:\n- local (adj): thuộc về địa phương\n- transit agency (np): đơn vị vận chuyển\n- construction (n): sự xây dựng\n- direct (adj): trực tiếp\n- connection (n): sự kết nối\n- spokesperson (n): người phát ngôn\n- initially (adv): ban đầu\n- elaborate (adj): ti mỉ\n- projected (adj): dự kiến\n- ultimately (adv): cuối cùng\n- cost-effective (adj): tiết kiệm\n- straightforward (adj): thẳng than\n- proposal (n): đề xuất\n- price tag (np): thẻ giá\n- economical (adj): tiết kiệm\n- completion (n): sự hoàn thành\n- adjacent (adj): gần kề\n- resident (n): người dân\n- vote (v): bình chon"
  },
  {
   "number": 98,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "98. Who is the speaker? (A) A structural engineer (B) A journalist (C) A tour guide (D) A city official",
   "transcript": "Welcome, everyone, to the grand opening of the Wilton Business Center. 8 As the mayor, I'm pleased to see this kind of growth in our city. And the environmentally friendly elements incorporated into the design make this building special. In particular, this building is equipped with a water recycling system and insulation made from repurposed cloth. While today is the grand opening, one part of the building-the recreation center-will not be available for use until next month, as final touches are still being added to that floor.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương\na city official (quan chức thành phố) = the mayor (thị trưởng)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, speaker\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “As the mayor, I'm pleased to see this kind of growth in our city.\"(Vdi tư cách là thi trưởng, tôi rất vui khi thấy sự phát triển như vay ở thành phố của chúng ta.) là thông tin chứa đáp án.\n- “a city official” là cách diễn đạt tương đương của “the mayor”\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (C) chứa thông tin không được đề cập"
  },
  {
   "number": 99,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "99. Why is a building special? (A) It was constructed in a short time. (B) It has a technologically advanced security system. (C) It has environmentally friendly features. (D) It was designed by a famous architect.",
   "transcript": "Welcome, everyone, to the grand opening of the Wilton Business Center. 8 As the mayor, I'm pleased to see this kind of growth in our city. And the environmentally friendly elements incorporated into the design make this building special. In particular, this building is equipped with a water recycling system and insulation made from repurposed cloth. While today is the grand opening, one part of the building-the recreation center-will not be available for use until next month, as final touches are still being added to that floor.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương\nenvironmentally friendly features (tính năng thân thiện với môi trường) = environmentally friendly elements (yếu tố thân thiện với môi trường)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, building, special\n- Dang câu hỏi: thông tin chi tiết\n- Lời thoại “the environmentally friendly elements incorporated into the design make this building special.” (yếu tố thân thiện với môi trường được tích hợp vào thiết kế đã làm cho tòa nhà này trở nên đặc biệt.) là thông tin chứa đáp án.\n- “environmentally friendly features” là cách diễn đạt tương đương của “environmentally friendly elements”\n→ Phương án (C) là phù hợp nhất.\nLoai phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không được đề cập"
  },
  {
   "number": 100,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "100. Look at the graphic. Which floor of the building is not open yet? (A) Floor 4 (B) Floor 3 (C) Floor 2 (D) Floor 1",
   "transcript": "Welcome, everyone, to the grand opening of the Wilton Business Center. 8 As the mayor, I'm pleased to see this kind of growth in our city. And the environmentally friendly elements incorporated into the design make this building special. In particular, this building is equipped with a water recycling system and insulation made from repurposed cloth. While today is the grand opening, one part of the building-the recreation center-will not be available for use until next month, as final touches are still being added to that floor.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương\nnot open (chưa mở cửa) = not available for use (chưa được sử dung)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, floor, not open\n- Dạng câu hỏi: thông tin liên quan bảng biểu\n- Lời thoại “the recreation center will not be available for use until next month, as final touches are still being added to that floor.” (trung tam giải tri sẽ không được sử dung cho đến tháng sau vi những công đoạn hoàn thiện cuối cùng vẫn dang được hoàn thiện trên tầng đó.) là thông tin chứa đáp án. Trung tâm giải trí ở tầng 2 của tòa nhà.\n- “not open\" là cách diễn đạt tương đương của “not available for use”\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\nCác phương án (A), (B), (D) chứa thông tin không phù hợp\nTừ vựng cần lưu ý:\n- grand opening (n): khai trương\n- mayor (n): thị trưởng\ns_ growth (n): sự phát triển\n- environmentally friendly (collo): thân thiện với môi trường\n- element (n): yếu tố\n- incorporate (vì:\n- in particular (phrase): cụ thể\n- be equipped with (phr verb): dđược trang bị với\n- recycling (n): sự tái chế\n- insulation (n): sự cách nhiệt\n- repurpose (v): tái sử dụng\n- available (adj): có sẵn"
  }
 ],
 "5": [
  {
   "number": 1,
   "part": 1,
   "answer": "D",
   "textEn": "(A) The worker is carrying some plants. (B) The worker is reading a sign. (C) The worker is pushing a cart. (D) The worker is writing some notes.",
   "transcript": "(A) The worker is carrying some plants.\n(B) The worker is reading a sign.\n(C) The worker is pushing a cart.\n(D) The worker is writing some notes.",
   "explanationVi": "Đáp án đúng: D\n\nAm\nLoại trừ phương án sai:\n- Loại (A) vì chứa hành động không phù hợp với tranh - “carrying somep plants” (mang một vài cái cây). Phương án bẫy - các đối tượng như người công nhân và cây cối đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (B) vì chứa đối tượng không có trong tranh - “sign” (tấm biển).\n- Loại (C) vì chứa hành động không phù hợp với tranh - “pushing a cart” (đẩy xe đẩy). Phương án bẫy - các đối tượng như người công nhân và xe đẩy đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "A",
   "textEn": "(A) Some of the people are pulling suitcases. (B) Some of the people are relaxing on benches. (C) Some of the people are putting luggage onto a rack. (D) Some of the people are waiting in line to purchase a ticket.",
   "transcript": "(A) Some of the people are pulling suitcases.\n(B) Some of the people are relaxing on benches.\n(C) Some of the people are putting luggage onto a rack.\n(D) Some of the people are waiting in line to purchase a ticket.",
   "explanationVi": "Đáp án đúng: A\n\nCn\nLoại trừ phương án sai:\n- Loại (B) vì chứa hành động không phù hợp với tranh - “relaxing on benches” (thư giãn trên ghế dài). Phương án bẫy - các đối tượng như người và ghế dài đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (C) vì chứa đối tượng không có trong tranh - “rack” (cái giá).\n- Loại (D) vì chứa hành động không phù hợp với tranh - “waiting in line” (xếp hàng)."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "C",
   "textEn": "(A) She's looking into her backpack. (B) She's tying the laces of her boots. (C) She's hiking on an outdoor path. (D) She's walking out of a tunnel.",
   "transcript": "(A) She's looking into her backpack.\n(B) She's tying the laces of her boots.\n(C) She's hiking on an outdoor path.\n(D) She's walking out of a tunnel.",
   "explanationVi": "Đáp án đúng: C\n\nBr\nLoại trừ phương án sai:\n- Loại (A) vì chứa hành động không phù hợp với tranh - “looking into her backpack” (nhìn vào ba lô). Phương án bẫy - các đối tượng như người phụ nữ và cái ba lô đều xuất hiện trong tranh, tuy nhiên không có hành động “looking into” (nhìn vào).\n- Loại (B) vì chứa hành động không phù hợp với tranh - “tying the laces” (buộc dây giày). Phương án bẫy - các đối tượng như người phụ nữ và đôi bốt đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này.\n- Loại (D) vì chứa đối tượng không có trong tranh - “tunnel” (đường hầm)."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "D",
   "textEn": "(A) He's holding the handle of a shopping cart. (B) He's plugging a cord into a wall outlet. (C) He's looking into a Kitchen cupboard. (D) He's kneeling down on a tile floor.",
   "transcript": "(A) He's holding the handle of a shopping cart.\n(B) He's plugging a cord into a wall outlet.\n(C) He's looking into a Kitchen cupboard.\n(D) He's kneeling down on a tile floor.",
   "explanationVi": "Đáp án đúng: D\n\nAu\nLoại trừ phương án sai:\n- Loại (A) vì chứa đối tượng không có trong tranh - “shopping cart\" (chiếc xe đẩy mua sắm).\n- Loại (B) vi chứa đối tượng không có trong tranh - “wall outlet” (6 cắm điện). Phương án bẫy - các đối tượng như người đàn ông và dây điện đều xuất hiện trong tranh, tuy nhiên không có hành động “plugging” (cắm vào).\n- Loại (C) vì chứa hành động không phù hợp với tranh - “looking into a kitchen cupboard” (nhìn vào tủ bếp). Phương án bẫy - các đối tượng như người đàn ông và tủ bếp đều xuất hiện trong tranh, tuy nhiên không có sự tương tác giữa hai đối tượng này."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "A",
   "textEn": "(A) Seats have been arranged under some umbrellas. (B) Some street signs are being taken down. (C) Some bushes are being trimmed. (D) Some chairs are being folded and stacked.",
   "transcript": "(A) Seats have been arranged under some umbrellas.\n(B) Some street signs are being taken down.\n(C) Some bushes are being trimmed.\n(D) Some chairs are being folded and stacked.",
   "explanationVi": "Đáp án đúng: A\n\nAm\nLoại trừ phương án sai:\n- Loại (B) vì chứa đối tượng không có trong tranh - “street signs” (biển báo đường phố).\n- Loại (C) vì chứa hành động không phù hợp với tranh - “trimmed” (cắt tỉa). Phương án bẫy - có đối tượng bụi cây xuất hiện trong tranh, tuy nhiên không có hành động “trimmed” (được cắt tỉa).\n- Loại (D) vì chứa hành động không phù hợp với tranh - “folded and stacked” (gấp lại và xếp chồng lên nhau). Phương án bẫy - có đối tượng những chiếc ghế xuất hiện trong tranh, tuy nhiên không có hành động “folded and stacked” (gấp lại và xếp chồng lên nhau)."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some cushions have been laid on the floor. (B) Books have been piled up by a glass door. (C) A light fixture is suspended from the Ceiling. (D) A rug has been rolled up against a wall.",
   "transcript": "(A) Some cushions have been laid on the floor.\n(B) Books have been piled up by a glass door.\n(C) A light fixture is suspended from the Ceiling.\n(D) A rug has been rolled up against a wall.",
   "explanationVi": "Đáp án đúng: B\n\nCn\nLoại trừ phương án sai:\n- Loại (A) vì chứa thông tin không được thể hiện trong tranh - “laid on the floor\" (được đặt trên sàn). Phương án bẫy - có đối tượng chiếc đệm xuất hiện trong tranh, tuy nhiên không có chúng được đặt trên ghế, không phải trên sàn.\n- Loại (C) vì chứa thông tin không được thể hiện trong tranh - “suspended from the ceiling” (được treo trên trần nhà). Phương án bẫy - có đối tượng đèn chiếu sáng xuất hiện trong tranh, tuy nhiên chúng được treo trên tường, không phải trên trần.\n- Loại (D) vì chứa thông tin không được thể hiện trong tranh - “rolled up” (được cuộn). Phương án bẫy - có đối tượng tấm thảm xuất hiện trong tranh, tuy nhiên không có hành động “rolled up” (được cuộn lên)."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "A",
   "textEn": "There's a meeting in the conference room soon, right? (A) Yes, it's for the whole department. (B) No, put it in the closet. (C) The rent is too high.",
   "transcript": "There's a meeting in the conference room soon, right?\n(A) Yes, it's for the whole department.\n(B) No, put it in the closet.\n(C) The rent is too high.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về “cuộc họp sắp diễn ra trong phòng họp”, trong khi phương án trả lời cung cấp thông tin về “việc đặt cái gì đó vào tủ”.\n- (C) Phuong án bẫy. Phương án chứa từ “rent” liên quan đến từ “conference room” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về cuộc họp. Đây là một câu nói không liên quan đến chủ đề của đoạn hội thoại."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "C",
   "textEn": "Why hasn't the mural in the lobby been painted yet? (A) Red and yellow. (B) Please pick up the ladder. (C) Because the artist is out of town.",
   "transcript": "Why hasn't the mural in the lobby been painted yet?\n(A) Red and yellow.\n(B) Please pick up the ladder.\n(C) Because the artist is out of town.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về màu sắc, phù hợp với câu hỏi với “what (color)\", không phù hợp với câu hỏi về nguyên nhân với \"Why\".\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về “lý do tại sao bức tranh chưa được vẽ xong”, trong khi phương án trả lời cung cấp thông tin về “việc nhặt cái thang lên”."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "C",
   "textEn": "Do you prefer writing in the morning or the afternoon? (A) My publisher requested edits. (B) Thanks for providing a solution. (C) Mornings are usually better for me.",
   "transcript": "Do you prefer writing in the morning or the afternoon?\n(A) My publisher requested edits.\n(B) Thanks for providing a solution.\n(C) Mornings are usually better for me.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về “sở thích của người trả lời về việc viết vào buổi sáng hay buổi chiều”, trong khi phương án trả lời cung cấp thông tin về việc “nhà xuất bản yêu cầu chỉnh sửa”.\n- _(B) Phương án bẫy. Phương án chứa từ “solution” liên quan đến từ “prefer” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về sở thích của người trả lời. Đây là một câu cảm ơn không liên quan đến chủ đề của đoạn hội thoại."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "B",
   "textEn": "I suggest we paint the waiting room light blue. (A) Doctor Park has an opening at three. (B) That's a good idea. (C) I prefer the red jacket.",
   "transcript": "I suggest we paint the waiting room light blue.\n(A) Doctor Park has an opening at three.\n(B) That's a good idea.\n(C) I prefer the red jacket.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu. Người hỏi muốn biết ý kiến của người trả lời về “việc sơn phòng chờ màu xanh nhạt”, trong khi phương án trả lời cung cấp thông tin về việc “bác sĩ Park có lịch trống vào lúc ba giờ”.\n- (C) Phuong án bẫy. Phương án chứa từ “red” liên quan đến từ “blue” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về “việc sơn phòng chờ”. Đây là một câu nói về “sở thích cá nhân” không liên quan đến chủ đề của đoạn hội thoại."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "B",
   "textEn": "Did you know that the music school is closed on Sundays? (A) Forty dollars an hour. (B) No, I didn't know that. (C) I saw the piano recital.",
   "transcript": "Did you know that the music school is closed on Sundays?\n(A) Forty dollars an hour.\n(B) No, I didn't know that.\n(C) I saw the piano recital.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về giá tiền, phù hợp với câu hỏi với \"How much\", không phù hợp với câu hỏi \"Yes/ No”.\n- (C) Phuong án bẫy. Phương án chứa từ “piano” liên quan đến từ “music” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về việc trường nhạc đóng cửa. Đây là một câu nói về việc xem buổi biểu diễn piano không liên quan đến chủ đề của đoạn hội thoại."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "A",
   "textEn": "How do I find the office manager? (A) The receptionist would know. (B) Desk lamps and headsets. (C) Twelve euros.",
   "transcript": "How do I find the office manager?\n(A) The receptionist would know.\n(B) Desk lamps and headsets.\n(C) Twelve euros.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết cách tìm gặp người quản lý văn phòng, trong khi phương án trả lời cung cấp thông tin về đèn bàn và tai nghe.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết cách tìm gặp người quản lý văn phòng, trong khi phương án trả lời cung cấp thông tin về số tiền."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "B",
   "textEn": "When did you place the order for the lumber? (A) Yes, it's a great place for hiking. (B) It's out of stock right now. (C) The warehouse on William Street.",
   "transcript": "When did you place the order for the lumber?\n(A) Yes, it's a great place for hiking.\n(B) It's out of stock right now.\n(C) The warehouse on William Street.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về ý kiến, phù hợp với câu hỏi với \"Yes/ No question\", không phù hợp với câu hỏi về thời gian với \"When”.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về nơi chốn, phù hợp với câu hỏi với \"Where\", không phù hợp với câu hỏi về thời gian với \"When”."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "C",
   "textEn": "Where is the new packaging machine? (A) Ten packages a minute. (B) We met last Thursday. (C) We decided to keep the old one.",
   "transcript": "Where is the new packaging machine?\n(A) Ten packages a minute.\n(B) We met last Thursday.\n(C) We decided to keep the old one.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án bẫy. Phương án chứa từ “packages” liên quan đến từ “packaging” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về vị trí của máy đóng gói mới.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về thời gian, phù hợp với câu hỏi với \"when\", không phù hợp với câu hỏi về nơi chốn với “Where”."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "B",
   "textEn": "I'll be out of the office this afternoon. (A) An awfully long commute. (B) OK-I'll update your schedule. (C) It's right down the hallway.",
   "transcript": "I'll be out of the office this afternoon.\n(A) An awfully long commute.\n(B) OK-I'll update your schedule.\n(C) It's right down the hallway.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu. Người nói thông báo sẽ vắng mặt vào buổi chiều, trong khi phương án trả lời cung cấp thông tin về một quãng đường.\n- (C)Phuong án có nội dung không phù hợp để phản hồi cho câu phát biểu. Người nói thông báo sẽ vắng mặt vào buổi chiều, trong khi phương án trả lời cung cấp thông tin về vị trí của một địa điểm."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "A",
   "textEn": "Are you taking a vacation once this project is over? (A) Yes-I'm planning a trip to Barcelona. (B) This is your second time, isn't it? (C) Blueprints for a high-rise building.",
   "transcript": "Are you taking a vacation once this project is over?\n(A) Yes-I'm planning a trip to Barcelona.\n(B) This is your second time, isn't it?\n(C) Blueprints for a high-rise building.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai: s _(B) Phương án bẫy. Phương án chứa từ “second time” liên quan đến từ “once”\ntrong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về kế hoạch nghỉ phép.\n- (C) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về kế hoạch nghỉ phép, trong khi phương án trả lời cung cấp thông tin về bản thiết kế của một tòa nhà cao tầng."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "B",
   "textEn": "Let's post the sales report to our team's Web page. (A) We're sharing a taxi to the airport. (B) I can do that. (C) A recent hiring decision.",
   "transcript": "Let's post the sales report to our team's Web page.\n(A) We're sharing a taxi to the airport.\n(B) I can do that.\n(C) A recent hiring decision.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu. Người hỏi đề nghị đăng báo cáo bán hàng lên trang web của nhóm, trong khi phương án trả lời nói về việc chia sẻ taxi đến sân bay.\n- (C)) Phương án có nội dung không phù hợp để phản hồi cho câu phát biểu.. Người hỏi đề nghị một hành động cụ thể, trong khi phương án trả lời chỉ đưa ra một thông tin chung chung về một quyết định tuyển dụng gần đây."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "A",
   "textEn": "Which airline are you planning on using? (A) The usual one. (B) A one-way ticket. (C) Yes, you can use mine.",
   "transcript": "Which airline are you planning on using?\n(A) The usual one.\n(B) A one-way ticket.\n(C) Yes, you can use mine.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết tên hãng hàng không mà người trả lời dự định sử dụng, trong khi phương án trả lời chỉ nói về loại vé một chiều. Đây là một chỉ tiết không liên quan đến câu hỏi.\n- (C)) Phương án không phù hợp với cách hỏi. Người hỏi dùng từ “which” để hỏi về một lựa chọn cụ thể trong một số lựa chọn có sẵn, trong khi phương án trả lời dùng từ “yes” để trả lời một câu hỏi có hay không."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "B",
   "textEn": "Where's this shipment of parts being sent? (A) Around five thirty this evening. (B) To the assembly plant in Dublin. (C) Just half the order.",
   "transcript": "Where's this shipment of parts being sent?\n(A) Around five thirty this evening.\n(B) To the assembly plant in Dublin.\n(C) Just half the order.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về thời gian, phù hợp với câu hỏi với \"when\", không phù hợp với câu hỏi về nơi chốn với \"Where”. s (C)) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết địa điểm mà lô hàng linh kiện được gửi đến, trong khi phương án trả lời chỉ nói về số lượng hàng gửi."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "Who paid for lunch? (A) I just ate. (B) It closes at five. (C) Alberto did.",
   "transcript": "Who paid for lunch?\n(A) I just ate.\n(B) It closes at five.\n(C) Alberto did.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết ai đã\nthanh toán tiền ăn trưa, trong khi phương án trả lời chỉ nói về việc người trả lời vừa ăn xong.\n- (B) Phương án có nội dung không phù hợp ý hỏi. Phương án cung cấp thông tin về thời gian, phù hợp với câu hỏi với \"when\", không phù hợp với câu hỏi về một ai đó với \"Who”"
  },
  {
   "number": 21,
   "part": 2,
   "answer": "B",
   "textEn": "How many employees work in your department? (A) I don't mind taking notes at the meeting. (B) A couple dozen, I think. (C) It's seven meters long.",
   "transcript": "How many employees work in your department?\n(A) I don't mind taking notes at the meeting.\n(B) A couple dozen, I think.\n(C) It's seven meters long.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết số lượng nhân viên làm việc trong bộ phận của người trả lời, trong khi phương án trả lời chỉ nói về việc người trả lời không phiền khi ghi chú trong cuộc họp.\n- (C)) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết số lượng nhân viên làm việc trong bộ phận của người trả lời, trong khi phương án trả lời chỉ nói về chiều dài của một vật gì đó."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "A",
   "textEn": "We should leave for our training course soon, Shouldn't we? (A) We still have a few minutes. (B) There's a map on the wall. (C) Two sessions per day.",
   "transcript": "We should leave for our training course soon, Shouldn't we?\n(A) We still have a few minutes.\n(B) There's a map on the wall.\n(C) Two sessions per day.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi đề nghị rời đi sớm để đến khóa đào tạo, trong khi phương án trả lời cung cấp thông tin về bản đồ trên tường.\n- (C) Phuong án bẫy. Phương án chứa từ “sessions” liên quan đến từ “training course” trong câu hỏi nhưng nội dung cả câu không phù hợp để trả lời người hỏi về việc có nên rời đi sớm hay không."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "B",
   "textEn": "Isn't there a limit on travel expenses? (A) To fix the vending machine. (B) One hundred dollars per day. (C) Next to the travel agency.",
   "transcript": "Isn't there a limit on travel expenses?\n(A) To fix the vending machine.\n(B) One hundred dollars per day.\n(C) Next to the travel agency.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về giới hạn chỉ phí đi lại, trong khi phương án trả lời cung cấp thông tin về việc sửa máy bán hàng tự động.\n- (C) Phuong án bẫy. Phương án chứa từ “travel agency” liên quan đến từ “travel expenses\" trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về giới hạn chi phí đi lai."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "C",
   "textEn": "When should I tell the director that I'm interested in the management position? (A) Yes, we're extending our business hours. (B) Didn't Andrey direct the play? (C) I'm not on the hiring team.",
   "transcript": "When should I tell the director that I'm interested in the management position?\n(A) Yes, we're extending our business hours.\n(B) Didn't Andrey direct the play?\n(C) I'm not on the hiring team.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai: s (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi dùng từ “when” để\nhỏi về thời điểm thích hợp để nói chuyện với giám đốc, trong khi phương án trả lời dùng từ “yes” để trả lời một câu hỏi có hay không (Yes/No Questions).\n- _(B) Phương án bẫy. Phương án chứa từ “direct”, là từ phát sinh của từ “director” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "C",
   "textEn": "... The layout of the footwear department has changed. (A) There's a charging station in the cafe. (B) Yes, a three-bedroom apartment. (C) The store has a new manager.",
   "transcript": "... The layout of the footwear department has changed.\n(A) There's a charging station in the cafe.\n(B) Yes, a three-bedroom apartment.\n(C) The store has a new manager.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về lý do thay đổi bố cục của khu vực giày dép, trong khi phương án trả lời cung cấp thông tin về trạm sạc ở quán cà phê.\n- _(B) Phương án bẫy. Phương án chứa từ “apartment” liên quan đến từ “layout” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về lý do thay đổi bố cục."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "B",
   "textEn": "Can you look at this month's revenue report? (A) The news program is informative. (B) I have some free time tomorrow afternoon. (C) He started that position in July.",
   "transcript": "Can you look at this month's revenue report?\n(A) The news program is informative.\n(B) I have some free time tomorrow afternoon.\n(C) He started that position in July.",
   "explanationVi": "Đáp án đúng: B\n\nLoại trừ phương án sai:\n- (A) Phương án không trả lời được câu hỏi. Người hỏi muốn biết người trả lời có thể xem báo cáo doanh thu của tháng này hay không, trong khi phương án trả lời cung cấp thông tin về chương trình tin tức.\n- (C)) Phuong án không tra lời được câu hỏi. Người hỏi muốn biết người trả lời có thể xem báo cáo doanh thu của tháng này hay không, trong khi phương án trả lời chỉ nói về việc ai đó bắt đầu vị trí mới vào tháng bảy. Đây là một chỉ tiết không liên quan đến câu hỏi."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "C",
   "textEn": "Why haven't the windows been replaced yet? (A) Not too much wind, no. (B) Look in the filing cabinet. (C) Did you see the cost estimate?",
   "transcript": "Why haven't the windows been replaced yet?\n(A) Not too much wind, no.\n(B) Look in the filing cabinet.\n(C) Did you see the cost estimate?",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về lý do chưa thay cửa sổ, trong khi phương án trả lời cung cấp thông tin về tình trạng của gió.\n- (B) Phương án bẫy. Phương án chứa từ “filing cabinet” liên quan đến từ “windows” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về lý do chưa thay cửa sổ."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "C",
   "textEn": "Isn't your suitcase going to be heavier than the permitted weight? (A) The building permit arrived today. (B) There are seats in the lobby. (C) MIl have to pay a little bit extra.",
   "transcript": "Isn't your suitcase going to be heavier than the permitted weight?\n(A) The building permit arrived today.\n(B) There are seats in the lobby.\n(C) MIl have to pay a little bit extra.",
   "explanationVi": "Đáp án đúng: C\n\nLoại trừ phương án sai:\n- (A) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về trọng\nlượng của vali, trong khi phương án trả lời cung cấp thông tin về giấy phép xây dựng.\n- _(B) Phương án bẫy. Phương án chứa từ “lobby” liên quan đến từ “suitcase” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về trọng lượng của vali."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "A",
   "textEn": "Who manufactures the engines for our machines? (A) Koji is in charge of supplier contracts. (B) I'm sorry-the storage room is full. (C) That's a cargo airplane.",
   "transcript": "Who manufactures the engines for our machines?\n(A) Koji is in charge of supplier contracts.\n(B) I'm sorry-the storage room is full.\n(C) That's a cargo airplane.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- (B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về nhà sản xuất động cơ cho máy móc, trong khi phương án trả lời cung cấp thông tin về tình trạng của kho hàng.\n- (C) Phuong án bẫy. Phương án chứa từ “airplane” liên quan đến từ “engines” trong câu hỏi nhưng nội dung cả câu không phù hợp ý hỏi về nhà sản xuất động cơ cho máy móc."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "A",
   "textEn": "Should we meet at the department store on Fifth Street or the one on Grover Lane? (A) Let's ask Patricia first. (B) No, I don't mind. (C) How much does it cost?",
   "transcript": "Should we meet at the department store on Fifth Street or the one on Grover Lane?\n(A) Let's ask Patricia first.\n(B) No, I don't mind.\n(C) How much does it cost?",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n(B) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về địa điểm gặp nhau, trong khi phương án trả lời cung cấp thông tin về thái độ của người trả lời.\n(C) Phương án có nội dung không phù hợp ý hỏi. Người hỏi muốn biết về địa điểm gặp nhau, trong khi phương án trả lời lại hỏi về việc giá cả."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "A",
   "textEn": "Which band is playing at the club tonight? (A) There's always a comedy show on Thursday nights. (B) Yes, I've played the piano for many years. (C) Their number one hit.",
   "transcript": "Which band is playing at the club tonight?\n(A) There's always a comedy show on Thursday nights.\n(B) Yes, I've played the piano for many years.\n(C) Their number one hit.",
   "explanationVi": "Đáp án đúng: A\n\nLoại trừ phương án sai:\n- _(B) Phương án bẫy. Phương án nay chứa từ “played” có phát âm tương tự với từ “playing” trong câu hỏi, nhưng nội dung cả câu không phù hợp để trả lời câu hỏi. Người hỏi hỏi về ban nhạc sẽ biểu diễn ở câu lạc bộ, trong khi phương án trả lời cung cấp thông tin về kinh nghiệm chơi đàn piano của người trả lời. Người hỏi dùng từ “which” để hỏi về một lựa chọn cụ thể trong một số lựa chọn có sẵn, trong khi phương án trả lời dùng từ “yes” để trả lời một câu hỏi có hay không.\n- (C) Phương án này có nội dung không phù hợp với ý hỏi. Người hỏi hỏi về ban nhạc sẽ biểu diễn ở câu lạc bộ, trong khi phương án trả lời cung cấp thông tin về bài hát nổi tiếng nhất của một ban nhạc."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "32. What problem does the woman describe? (A) A room is not available. (B) A window will not open. (C) A projector is not working. (D) The weather has changed suddenly.",
   "transcript": "W: Hi, Shenchao. I'm practicing my presentation in the conference room across the hall, and the projector in there keeps shutting off. I think it's overheating. Has this happened to you?\nM: Oh, that projector is old. It really needs to be replaced. If I were you, I'd just move to room 204 and practice there. Also, that room has a window. It's much nicer.\nW: OK. Thanks.\nM: By the way, you'll need a special cable to connect to the control panel in that room. Here, you can use this one. Just leave it plugged in when you're finished.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương: - is not working (không hoạt động) = keeps shutting off (liên tục tắt)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, problem, woman, describe\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời chào va lời giới thiệu về việc người phụ nữ đang làm: “Hi, Shenchao. I'm practicing...” (Xin chào, Shenchao. Tôi đang luyện tập...) là dấu hiệu sắp đến đáp án.\n- “I'm practicing my presentation in the conference room across the hall, and the projector in there keeps shutting off.” là thông tin chứa đáp an.\n- “is not working\" là cách diễn đạt tương đương của “keeps shutting off’.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy, bài nói có nhắc đến phòng họp và phòng 204, nhưng cả hai phòng này đều đang và có thể được sử dụng để luyện tập.\n- (B) phương án bẫy, bài nói có nhắc đến “window\" nhưng không đề cập đến việc nó sẽ mở hay không.\n- (D) chứa thông tin không được đề cập."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "A",
   "group": "32-34",
   "textEn": "33. What does the man suggest doing? (A) Moving to a different room (B) Calling a technician (C) Canceling an event (D) Ordering some supplies",
   "transcript": "W: Hi, Shenchao. I'm practicing my presentation in the conference room across the hall, and the projector in there keeps shutting off. I think it's overheating. Has this happened to you?\nM: Oh, that projector is old. It really needs to be replaced. If I were you, I'd just move to room 204 and practice there. Also, that room has a window. It's much nicer.\nW: OK. Thanks.\nM: By the way, you'll need a special cable to connect to the control panel in that room. Here, you can use this one. Just leave it plugged in when you're finished.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\n- moving to a different room (chuyển đến một phòng khác) ~ move to room 204 (chuyển đến phòng 204)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, suggest, doing\n- Dạng câu hỏi: thông tin chỉ tiết\n- Câu điều kiện loại 2 dùng để đưa ra lời khuyên trong lời thoại của người đàn ông “If | were you...” (Nếu tôi là bạn...) là dấu hiệu sắp đến đáp án.\n- “If | were you, I'd just move to room 204 and practice there.” là thông tin chứa đáp an.\n- \"moving to a different room” là cách diễn dat tương đương của “move to room 204”. ~ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "34. What does the man hand to the woman? (A) An umbrella (B) Some keys (C) A cable (D) Some printouts",
   "transcript": "W: Hi, Shenchao. I'm practicing my presentation in the conference room across the hall, and the projector in there keeps shutting off. I think it's overheating. Has this happened to you?\nM: Oh, that projector is old. It really needs to be replaced. If I were you, I'd just move to room 204 and practice there. Also, that room has a window. It's much nicer.\nW: OK. Thanks.\nM: By the way, you'll need a special cable to connect to the control panel in that room. Here, you can use this one. Just leave it plugged in when you're finished.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, hand to, woman\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại của người đàn ông “By the way...” (Nhân tiện...) là dấu hiệu sắp đến đáp án.\n- “you'll need a special cable to connect to the control panel in that room. Here, you can use this one.” là thông tin chứa đáp án.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- conference room (n) phòng hội nghị\n- projector (n) máy chiếu\n- cable (n) dây cáp\n- control panel (n) bảng điều khiển\n- overheating (adj) quá nóng, nhiệt độ qua cao\n- replace (v) thay thế\n- plug in (v) cắm vào"
  },
  {
   "number": 35,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "35. What industry does Amanda Hoffman work in? (A) Hospitality (B) Healthcare (C) Publishing (D) Information technology",
   "transcript": "W: Hi. I'm Amanda Hoffman, and I'm on the panel of publishing experts. I was told to check in here at the registration desk.\nM: Yes, Ms. Hoffman. Welcome to the Portland Literary Conference. Here's your registration packet, which includes a gift card to thank you for participating.\nW: Oh, thank you. Just to confirm, the panel discussion begins at three P.M., right?\nM: Yes, but we do ask that all panel members arrive ten minutes beforehand. I hope you enjoy the conference!",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what industry, Amanda Hoffman, work in\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời chào của người phụ nữ: “Hi, I'm Amanda Hoffman...” (Xin chào, tôi là Amanda Hoffman...) là dấu hiệu sắp đến đáp án.\n- “I'm Amanda Hoffman, and I'm on the panel of publishing experts.” là thông tin chứa dap an.\n→ Phương án (C) la phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "36. According to the man, what is included in the registration packet? (A) A map (B) A gift card (C) A schedule of events (D) A certificate of attendance",
   "transcript": "W: Hi. I'm Amanda Hoffman, and I'm on the panel of publishing experts. I was told to check in here at the registration desk.\nM: Yes, Ms. Hoffman. Welcome to the Portland Literary Conference. Here's your registration packet, which includes a gift card to thank you for participating.\nW: Oh, thank you. Just to confirm, the panel discussion begins at three P.M., right?\nM: Yes, but we do ask that all panel members arrive ten minutes beforehand. I hope you enjoy the conference!",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, man, what, included, registration packet\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời giới thiệu của người đàn ông: “Here's your registration packet...” (Đây là gói đăng ký của bạn...) là dấu hiệu sắp đến đáp án.\n- “Here's your registration packet, which includes a gift card to thank you for participating.” là thông tin chứa đáp án.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "37. What does the man tell the woman to do? (A) Arrive early (B) Pay a fee (C) Wear a name badge (D) Choose a menu option",
   "transcript": "W: Hi. I'm Amanda Hoffman, and I'm on the panel of publishing experts. I was told to check in here at the registration desk.\nM: Yes, Ms. Hoffman. Welcome to the Portland Literary Conference. Here's your registration packet, which includes a gift card to thank you for participating.\nW: Oh, thank you. Just to confirm, the panel discussion begins at three P.M., right?\nM: Yes, but we do ask that all panel members arrive ten minutes beforehand. I hope you enjoy the conference!",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\n- arrive early (đến sớm) = arrive ten minutes beforehand (đến trước 10 phút)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, tell, woman, to do\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại cuối của người đàn ông: “Yes, but we do ask...” (Đúng vậy, nhưng chúng tôi yêu cầu...) là dấu hiệu sắp đến đáp án.\n- “we do ask that all panel members arrive ten minutes beforehand.” là thông tin chứa dap an.\n- “arrive early” là cách diễn đạt tương đương cua “arrive ten minutes beforehand”. ~ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- registration (n) đăng ký\n- packet(n) bộ, gói\n- confirm (v) xác nhận\n- beforehand (adv) trước đó, trước khi\n- gift card (n) thẻ quà tặng\n- participate (v) tham gia\n- discussion (n) thao luận"
  },
  {
   "number": 38,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "38. What event will the woman attend this weekend? (A) A wedding (B) A birthday party (C) A retirement dinner (D) A graduation celebration",
   "transcript": "W: I'm looking for a gift for my brother's birthday party this weekend. He loves teas, and you have so many varieties!\nM: Well, I could recommend a quality brand if you know what type he enjoys.\nW: Oh, I'm not sure. Hmm. Maybe I should get him a gift card so he can choose his own.\nM: That's a good idea.\nW: I'll get one for 50 dollars. Do your cards have an expiration date?\nM: Yes. We ask that they be used within one year of purchase.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, event, will, woman, attend, this weekend\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại đầu của người phụ nữ: “I'm looking for a gift for my brother's birthday party this weekend.” (Tôi đang tìm một món quà cho bữa tiệc sinh nhật của anh trai tôi vào cuối tuần này.) là thông tin chứa đáp án.\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What does the man offer to do? (A) Authorize free shipping (B) Apply a discount (C) Provide a sample (D) Make a recommendation",
   "transcript": "W: I'm looking for a gift for my brother's birthday party this weekend. He loves teas, and you have so many varieties!\nM: Well, I could recommend a quality brand if you know what type he enjoys.\nW: Oh, I'm not sure. Hmm. Maybe I should get him a gift card so he can choose his own.\nM: That's a good idea.\nW: I'll get one for 50 dollars. Do your cards have an expiration date?\nM: Yes. We ask that they be used within one year of purchase.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\n- make a recommendation (đưa ra đề xuất) ~ recommend (đề xuất)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, offer, to do\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại đầu của người dan ông: “| could...” (Tôi có thé...) là dấu hiệu sắp đến đáp án.\n- “| could recommend a quality brand if you know what type he enjoys.” là thông tin chứa dap an.\n- \"make a recommendation” là cách diễn đạt tương đương của “recommend”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "40. What does the woman ask about? (A) An expiration date (B) A manufacturers guarantee (C) The origin of a product (D) The cost of a product",
   "transcript": "W: I'm looking for a gift for my brother's birthday party this weekend. He loves teas, and you have so many varieties!\nM: Well, I could recommend a quality brand if you know what type he enjoys.\nW: Oh, I'm not sure. Hmm. Maybe I should get him a gift card so he can choose his own.\nM: That's a good idea.\nW: I'll get one for 50 dollars. Do your cards have an expiration date?\nM: Yes. We ask that they be used within one year of purchase.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, ask, about\n- Dạng câu hỏi: thông tin chỉ tiết\n- Câu hỏi có trợ động từ “do” ở đầu câu: “Do your cards...” (Thẻ của bạn...) là dấu hiệu sắp đến đáp án.\n- “Do your cards have an expiration date?” là thông tin chứa đáp án. → Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- recommend (v) đề xuất\n- expiration date (n) ngày hết hạn\n- varieties (n) các loại\n- quality (adj) chất lượng\n- brand (n) thương hiệu\n- purchase (v) mua\n- within (prep) trong"
  },
  {
   "number": 41,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "41. Why is the woman visiting? (A) To promote a product (B) To sign a contract (C) To tour a facility (D) To inspect some equipment",
   "transcript": "M1: Thanks for meeting with us, Ms. Raj. We're excited to learn about the product your company has developed for factories like ours.\nW: I'm happy to tell you about it. It's an application to monitor factory machines. It identifies problems in operations and generates a report about the efficiency of each machine.\nM2: That sounds great! We have about 100 machine operators here. How much training would be involved?\nW: About an hour's worth. We provide a video with step-by-step instructions.\nM1: Excellent. That's good to know.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: why, woman, visiting\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại thứ 2 về mục đích buổi gặp mặt của người đàn ông sau lời cảm ơn người phụ nữ: “We're excited to...” (Chúng tôi rất vui mừng...) là dấu hiệu sắp đến đáp án.\n- \"We're excited to learn about the product your company has developed for factories like ours.” là thông tin chứa dap án.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "42. What did the woman's company design? (A) A digital security system (B) A device to lift heavy objects (C) An application to monitor machines (D) Protective clothing for workers",
   "transcript": "M1: Thanks for meeting with us, Ms. Raj. We're excited to learn about the product your company has developed for factories like ours.\nW: I'm happy to tell you about it. It's an application to monitor factory machines. It identifies problems in operations and generates a report about the efficiency of each machine.\nM2: That sounds great! We have about 100 machine operators here. How much training would be involved?\nW: About an hour's worth. We provide a video with step-by-step instructions.\nM1: Excellent. That's good to know.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman's company, design\n- Dạng câu hỏi: thông tin chỉ tiết\n- Dựa vào lời thoại thứ 2 khi giới thiệu sản phẩm của người phụ nữ “It's an application to monitor factory machines.” (Đây là một ứng dụng để giám sát máy móc nhà may.), có thể biết được rằng công ty của người phụ nữ đã thiết kế ứng dụng này.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "43. What does the woman say her company can provide? (A) A new client discount (B) A training video (C) An extended warranty (D) Customer testimonials",
   "transcript": "M1: Thanks for meeting with us, Ms. Raj. We're excited to learn about the product your company has developed for factories like ours.\nW: I'm happy to tell you about it. It's an application to monitor factory machines. It identifies problems in operations and generates a report about the efficiency of each machine.\nM2: That sounds great! We have about 100 machine operators here. How much training would be involved?\nW: About an hour's worth. We provide a video with step-by-step instructions.\nM1: Excellent. That's good to know.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\n- a training video (một video đào tạo) = a video with step-by-step instructions (một video có hướng dẫn từng bước)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, womand, say, her company, provide\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại chứa từ khoá “provide” của người phụ nữ: “We provide” (Chúng tôi cung cấp...) là dấu hiệu sắp đến đáp án.\n- \"We provide a video with step-by-step instructions.” là thông tin chứa dap án.\n- “a training video” là cách diễn đạt tương đương của “a video with step-by-step instructions”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- monitor (v) giám sát\n- identify (v) xác định\n- operation (n) hoạt động, vận hành\n- generate (v) tạo ra\n- efficiency (n) hiệu suất, hiệu quả «instruction (n) hướng dẫn\n- training (n) đào tạo"
  },
  {
   "number": 44,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "44. Who most likely is the man? (A) A theater employee (B) A taxi driver (C) A train conductor (D) A construction worker",
   "transcript": "W: Hi. /'d like to go to the Baldwin Theater. The address is 91 Circle Drive.\nM: Sure, but did you know they're resurfacing Circle Drive? I just dropped someone off in that area.\nW: Oh, really? I've got a ticket to a play, and the show starts at seven thirty. They don't let you in if you're late.\nM: Well, let me see. can turn onto Felton Street and cut over to Lancaster Drive. It's a little out of the way, but it'll get you close to the theater.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, most likely, man\n- Dạng câu hỏi: thông tin tổng quát\n- Khi người phụ nữ nói ra nhu cầu của minh “I'd like to go to the Baldwin Theater.” (Tôi\nmuốn đến Nhà hát Baldwin.), người đã ông đã trả lời “Sure” nên có thể suy ra anh ta đã nhận lời đưa người phụ nữ tới đó. Sau đó, người đàn ông nói thêm “I just dropped\nsomeone off in that area.” (Tôi vừa thả người xuống khu vực đó.), tức là anh ta từng chở thêm người khác đến địa điểm họ muốn. Như vậy, đây có thể là một tài xế taxi.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy. Người phụ nữ đề cập tới “theater” là điểm đến của mình, không phải công việc của người đàn ông.\n- (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "45. What is causing a problem? (A) A truck is too heavy. (B) An event has been delayed. (C) A parking area is full. (D) A road is closed.",
   "transcript": "W: Hi. /'d like to go to the Baldwin Theater. The address is 91 Circle Drive.\nM: Sure, but did you know they're resurfacing Circle Drive? I just dropped someone off in that area.\nW: Oh, really? I've got a ticket to a play, and the show starts at seven thirty. They don't let you in if you're late.\nM: Well, let me see. can turn onto Felton Street and cut over to Lancaster Drive. It's a little out of the way, but it'll get you close to the theater.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, causing, problem\n- Dạng câu hỏi: thông tin chỉ tiết\n- Người đàn ông cho biết “but did you know they're resurfacing Circle Drive?” (nhưng bạn có biết ho dang tdi tạo lại Circle Drive không?) và sau đó nói rằng “I can turn onto Felton Street and cut over to Lancaster Drive.” (Tôi có thể rẽ vào phố Felton và rẽ qua đường Lancaster Drive.), tức việc tái tạo lại đường khiến con đường đó bị đóng, và vì vậy người lái xe phải thay đổi lộ trình.\n~ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "46. What does the man say he will do? (A) Ask for a refund (B) Take a different route (C) Postpone a trip (D) File a complaint",
   "transcript": "W: Hi. /'d like to go to the Baldwin Theater. The address is 91 Circle Drive.\nM: Sure, but did you know they're resurfacing Circle Drive? I just dropped someone off in that area.\nW: Oh, really? I've got a ticket to a play, and the show starts at seven thirty. They don't let you in if you're late.\nM: Well, let me see. can turn onto Felton Street and cut over to Lancaster Drive. It's a little out of the way, but it'll get you close to the theater.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\n- take a different route (đi một con đường khác) = turn onto Felton Street and cut over to Lancaster Drive (rẽ vào Phố Felton và rẽ qua Lancaster Drive)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, say, will do\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại của người đàn ông sau khi nghe vấn đề của người phụ nữ: “Well, let me see. | can...” (Để tôi xem nào. Tôi có thé...) là dấu hiệu sắp đến đáp án.\n- “| can turn onto Felton Street and cut over to Lancaster Drive.” là thông tin chứa đáp án.\n- “take a different route” là cách diễn đạt tương đương của “turn onto Felton Street and cut over to Lancaster Drive”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- resurfacing (n): việc làm lại mặt đường\n- drop off (phrasal verb): thả ai đó, để ai đó xuống\n- out of the way (phrase): xa, ngoài tuyến đường chính\n- ticket (n) vé\n- play (n) vở kịch\n- turn onto (phrasal verb) rẽ vào\n- cut over (phrasal verb) chuyển qua"
  },
  {
   "number": 47,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "47. Why does the woman say, \"Last year we sent only two representatives\"? (A) To explain a delay (B) To compliment a team (C) To point out that an event was unsuccessful (D) To question a decision",
   "transcript": "W: Do you have a minute to discuss the budget for the upcoming Vancouver meeting? I've looked over the travel requests you submitted for your team. Last year we sent only two representatives.\nM: Ms. Tamura has just given us approval to send three. In fact, the clients are looking to expand their online service options, and the third representative we're bringing is particularly knowledgeable about that.\nW: OK. I guess we'll have to find savings somewhere else, then.\nM: I've already looked into some new meeting venues. The Renova Hotel is offering discounted corporate rates this month.",
   "explanationVi": "Đáp án đúng: D\n\nCách định vi vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: why, woman, say, Last year we sent only two representatives\n- Dạng câu hỏi: ngụ ý\n- Khi người phụ nữ nói “l've looked over the travel requests you submitted for your team.” (Tôi đã xem qua các yêu cầu đi lại mà bạn đã gửi cho nhóm của mình.), thông tin này là cơ sở cho ý kiến hoặc quan ngại liên quan đến số lượng đại diện được gửi đi, được thể hiện qua câu tiếp theo \"Last year we sent only two representatives.\" Lời thoại của người đàn ông \"Ms. Tamura has just given us approval to send three.\" (Cô Tamura vừa\ncho phép chúng ta gửi ba người) ngụ ý quyết định chỉ vừa được đưa ra, vì vậy người phụ nữ chưa biết.\n- Người phụ nữ lo ngại hoặc đặt câu hỏi về quyết định gửi ba người. → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "48. According to the man, what do some clients want to do? (A) Increase their online offerings (B) Obtain additional financing (C) Open a new office (D) Recruit more employees",
   "transcript": "W: Do you have a minute to discuss the budget for the upcoming Vancouver meeting? I've looked over the travel requests you submitted for your team. Last year we sent only two representatives.\nM: Ms. Tamura has just given us approval to send three. In fact, the clients are looking to expand their online service options, and the third representative we're bringing is particularly knowledgeable about that.\nW: OK. I guess we'll have to find savings somewhere else, then.\nM: I've already looked into some new meeting venues. The Renova Hotel is offering discounted corporate rates this month.",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\n- increase their online offerings (tăng cường các dịch vụ trực tuyến của họ) ~ expand their online service options (mở rộng các tùy chọn dịch vụ trực tuyến của họ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, man, what, clients, want to do\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại chứa từ khoá “clients” của người dan ông sau: “the clients are...” (các khách hàng đang...) là dấu hiệu sắp đến đáp án.\n- “the clients are looking to expand their online service options” là thông tin chứa đáp án.\n- “increase their online offerings” là cách diễn đạt tương đương của “expand their online service options”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "49. According to the man, what is the Renova Hotel offering this month? (A) A new shuttle service (B) A discount for businesses (C) A flexible cancellation policy (D) Complimentary meals",
   "transcript": "W: Do you have a minute to discuss the budget for the upcoming Vancouver meeting? I've looked over the travel requests you submitted for your team. Last year we sent only two representatives.\nM: Ms. Tamura has just given us approval to send three. In fact, the clients are looking to expand their online service options, and the third representative we're bringing is particularly knowledgeable about that.\nW: OK. I guess we'll have to find savings somewhere else, then.\nM: I've already looked into some new meeting venues. The Renova Hotel is offering discounted corporate rates this month.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\n- a discount for businesses (giảm giá cho doanh nghiệp) = discounted corporate rates (mức giá ưu đãi dành cho doanh nghiệp)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, man, Renova Hotel, offering, this month\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại chứa từ khoá “Renova Hotel” và “offering” của người đàn ông: “The Renova Hotel is offering...\" (Khách san Renova Hotel đang đưa ra...) là dấu hiệu sắp đến đáp án.\n- \"The Renova Hotel is offering discounted corporate rates this month.” là thông tin chứa dap an.\n- “a discount for businesses” là cách diễn đạt tương đương của “discounted corporate rates”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- budget (n) ngân sách\n- upcoming (adj) sắp tới, sắp diễn ra\n- representatives (n) đại diện *approval (n) sự chấp thuận, sự phê duyệt\n- venues (n) địa điểm, nơi tổ chức\n- expand (v) mở rộng\n- knowledgeable (adj) am hiểu"
  },
  {
   "number": 50,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "50. What problem does the woman mention? (A) A decrease in ticket sales (B) A lack of exhibition space (C) A colleague's resignation (D) A damaged painting",
   "transcript": "W: Good morning. I wanted to meet today to discuss the recent decline in our museum's ticket sales. You're the outreach coordinator, so I'm hoping you might have some ideas on how we can attract more community involvement.\nM: Well, I recently read an article about a museum in Chicago that has a room where visitors can paint on the walls. It's become very popular. We could try it here-we have that huge room on the third floor that isn't being used.\nW: That's a great idea. Can you draft a list of the supplies we would need to make sure we have the budget for them?",
   "explanationVi": "Đáp án đúng: A\n\nCách diễn đạt tương đương:\n- a decrease in ticket sales (doanh số bán vé giảm) = the recent decline in our museum's ticket sales (sự sụt giảm gần day về doanh số bán vé của bảo tàng chúng ta)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what problem, woman, mention\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại sau lời chào buổi sáng của người phụ nữ, đề cập tới mục đích buổi gặp mặt: “| wanted to meet today to...” (Tôi muốn gặp mặt hôm nay dé...) là dấu hiệu sắp đến đáp án.\n- “| wanted to meet today to discuss the recent decline in our museum's ticket sales.” là thông tin chứa đáp án.\n- \"a decrease in ticket sales” là cách diễn đạt tương đương của “the recent decline in our museum's ticket sales”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "51. What does the man suggest doing? (A) Relocating an exhibit (B) Consulting a specialist (C) Adding security measure (D) Introducing a new activity",
   "transcript": "W: Good morning. I wanted to meet today to discuss the recent decline in our museum's ticket sales. You're the outreach coordinator, so I'm hoping you might have some ideas on how we can attract more community involvement.\nM: Well, I recently read an article about a museum in Chicago that has a room where visitors can paint on the walls. It's become very popular. We could try it here-we have that huge room on the third floor that isn't being used.\nW: That's a great idea. Can you draft a list of the supplies we would need to make sure we have the budget for them?",
   "explanationVi": "Đáp án đúng: D\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, suggest, doing\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại của người đàn ông: “I recently read an article about a museum in Chicago that has a room where visitors can paint on the walls. It's become very popular. We could try it here\" (Tôi gan đây đã doc một bài báo về một bảo tàng ở Chicago có một căn phòng nơi du khách có thể vẽ lên tường. Nó đã trở nên rất phổ biến. Chúng ta có thể thử ở đây) là thông tin chứa đáp án. Người đàn ông kể về việc bảo tàng ở Chicago cho phép vẽ lên tường, và nói rằng có thể thử ở đây (tức bảo tàng của họ), từ đó suy ra ông đề nghị việc giới thiệu hoạt động này tới người tham quan.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "52. What will the man most likely do next? (A) Write a press release (B) Attend a budget meeting (C) Make a list of supplies (D) Plan a site visit",
   "transcript": "W: Good morning. I wanted to meet today to discuss the recent decline in our museum's ticket sales. You're the outreach coordinator, so I'm hoping you might have some ideas on how we can attract more community involvement.\nM: Well, I recently read an article about a museum in Chicago that has a room where visitors can paint on the walls. It's become very popular. We could try it here-we have that huge room on the third floor that isn't being used.\nW: That's a great idea. Can you draft a list of the supplies we would need to make sure we have the budget for them?",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương: - make a list of supplies = draft a list of the supplies (lên danh sách vat tu)\nCách định vị vùng thông tin chứa dap án:\n- Từ khóa trong câu hỏi: what, will, man, most likely, do, next\n- Dạng câu hỏi: chi tiết\n- “Can you draft a list of the supplies we would need to make sure we have the budget for them?” (Bạn có thể soạn thảo một danh sách các vật tư mà chúng ta cần để đảm bảo rằng chúng ta có đủ ngân sách cho chúng không?) là thông tin chứa đáp án. Khi người phụ nữ cho rằng ý tưởng đề nghị hoạt động vẽ lên tường của người đàn ông rất thú vị, bà đã hỏi liệu người đàn ông có thể doạn thảo danh sách vật tư không. Từ đó, có thể suy ra rằng việc lên danh sách này là việc tiếp theo người đàn ông sẽ làm.\n- \"make a list of supplies” là cách diễn đạt tương đương của “draft a list of the supplies”. → Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (D) chứa thông tin không được đề cập.\n- (B) phương án bẫy. Người phụ nữ có đề cập đến “budget” nhưng đây là mục đích của việc soạn thảo danh sách vật tư, và không có chỉ tiết nào cho thấy người đàn ông sẽ tham dự cuộc họp ngân sách.\nTừ vựng cần lưu ý:\n- outreach coordinator (n) người phụ trách tiếp cận cộng đồng\n- community involvement (n) sự tham gia của cộng đồng\n- draft (v) soạn thao\n- supplies (n) nguyên liệu, vat tư\n- budget (n) ngân sách\n- decline (n) suy giảm\n- article (n) bài báo"
  },
  {
   "number": 53,
   "part": 3,
   "answer": "D",
   "group": "53-55",
   "textEn": "53. Where most likely are the speakers? (A) At a clothing factory (B) At a bookstore (C) At a tailor's shop (D) At a furniture store",
   "transcript": "W1: Thilo, this is Ms. Gao, a new customer. She's purchasing an upholstered sofa. We just walked around our showroom, and she's decided on our Hudson model.\nM: One of our best sellers!\nW2: It is really comfortable.\nW1: Can you assist her with the paperwork for our payment plan?\nM: Sure. Happy to help you, Ms. Gao. Are you getting the standard fabric?\nW2: No-I'd like to select a custom fabric.\nM: Just so you know, the price will increase some with a custom order.\nW2: I think it's worth the extra cost. It'll really brighten up my living room.\nM: Wonderful. Now in order to set up a payment plan, Mil need to see some identification. A driver's license will do.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\n- furniture (nội thất) ~ sofa (ghế sofa)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, most likely, speakers\n- Dạng câu hỏi: thông tin tổng quát\n- Thông tin “this is Ms. Gao, a new customer. She's purchasing an upholstered sofa.” cho thấy có một khách hàng tới mua ghế sofa, nên có thể suy ra cô ấy và những người còn lại đang ở một cửa hàng này bán đồ nội thất.\n- “furniture” là cách diễn đạt tương đương của “sofa”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "54. According to the man, why will a product cost more? (A) It includes an extended warranty. (B) It is a custom order. (C) A rebate has expired. (D) Shipping will be expedited.",
   "transcript": "W1: Thilo, this is Ms. Gao, a new customer. She's purchasing an upholstered sofa. We just walked around our showroom, and she's decided on our Hudson model.\nM: One of our best sellers!\nW2: It is really comfortable.\nW1: Can you assist her with the paperwork for our payment plan?\nM: Sure. Happy to help you, Ms. Gao. Are you getting the standard fabric?\nW2: No-I'd like to select a custom fabric.\nM: Just so you know, the price will increase some with a custom order.\nW2: I think it's worth the extra cost. It'll really brighten up my living room.\nM: Wonderful. Now in order to set up a payment plan, Mil need to see some identification. A driver's license will do.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\n- cost more (có giá cao hon) = the price will increase (giá sẽ tăng)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: according, man, why, product, cost more\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại nhắc tới giá cả của người đàn ông: “the price will...” (giá sẽ...) là dấu hiệu sắp đến đáp án.\n- “the price will increase some with a custom order.” là thông tin chứa đáp án.\n- “cost more” là cách diễn đạt tương đương của “the price will increase”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "55. What does the man request? (A) A purchase receipt (B) A delivery address (C) A form of identification (D) An account number",
   "transcript": "W1: Thilo, this is Ms. Gao, a new customer. She's purchasing an upholstered sofa. We just walked around our showroom, and she's decided on our Hudson model.\nM: One of our best sellers!\nW2: It is really comfortable.\nW1: Can you assist her with the paperwork for our payment plan?\nM: Sure. Happy to help you, Ms. Gao. Are you getting the standard fabric?\nW2: No-I'd like to select a custom fabric.\nM: Just so you know, the price will increase some with a custom order.\nW2: I think it's worth the extra cost. It'll really brighten up my living room.\nM: Wonderful. Now in order to set up a payment plan, Mil need to see some identification. A driver's license will do.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, request\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại đề cập tới mục đích lập kế hoạch thanh toán (và sau đó đề cập tới thứ cần có để đạt được mục đích này) của người đàn ông: “Now in order to set up a payment plan...”\n(Bây giờ để thiết lập kế hoạch thanh toán...) là dấu hiệu sắp đến đáp án.\n- “Now in order to set up a payment plan, I'll need to see some identification.” là thông tin chứa đáp an.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- upholstered (adj) được bọc, được trang trí bằng lớp vải\n- showroom (n) phòng trưng bày sản phẩm *paperwork (n) công việc giấy tờ, thủ tục văn bản\n- payment plan (n) kế hoạch thanh toán\n- set up (phrasal verb) thiết lập, sắp xếp\n- identification (n) giấy tờ tùy thân\n- custom (adj) tùy chỉnh\n, theo yêu cầu"
  },
  {
   "number": 56,
   "part": 3,
   "answer": "B",
   "group": "56-58",
   "textEn": "56. Where most likely are the speakers? (A) At a hotel (B) At a factory (C) At a retail store (D) At a trade show",
   "transcript": "W: Good morning, Mr. Tong. I'm here to check on my order, How are the chairs coming along?\nM: The machines have been assembling them. They're almost ready. Right over here.\nW: Wow, they look so nice!\nM: Look at the curved shape of the back. The only way you can get that unique shape is by means of the specialized laser we use.\nW: Amazing! Can I also see the pullout sofa?\nM: Not right now. It's being treated with mineral oil. But later today I should be able to take a photo and send it to you.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: where, most likely, speakers\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại “How are the chairs coming along?” (Những chiếc ghế như thế nào rồi?) của người phụ nữ đề cập tới những chiếc ghế, còn lời thoại của người đàn ông “The machines have been assembling them.” (Máy móc đã đang lắp ráp chúng.) nhắc tới máy móc. Như vậy, họ đang ở một nơi có máy móc đang lắp ráp những chiếc ghế, suy ra đây có thể là một nhà máy.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "57. What feature does the man emphasize about some chairs? (A) The color (B) The price (C) The shape (D) The durability",
   "transcript": "W: Good morning, Mr. Tong. I'm here to check on my order, How are the chairs coming along?\nM: The machines have been assembling them. They're almost ready. Right over here.\nW: Wow, they look so nice!\nM: Look at the curved shape of the back. The only way you can get that unique shape is by means of the specialized laser we use.\nW: Amazing! Can I also see the pullout sofa?\nM: Not right now. It's being treated with mineral oil. But later today I should be able to take a photo and send it to you.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, feature, man, emphasize, chairs\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại của người đàn ông “Look at the curved shape of the back. The only way you can get that unique shape is by means of the specialized laser we use.” (Hãy nhìn vào hình dạng cong của mặt sau. Cách duy nhất để bạn có được hình dạng độc đáo đó là sử dụng tia laser chuyên dụng mà chúng tôi sử dụng.) là thông tin chứa đáp án.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "58. What does the man say he will do later? (A) Modity a design (B) E-mail a contract (C) Create an invoice (D) Send a photo",
   "transcript": "W: Good morning, Mr. Tong. I'm here to check on my order, How are the chairs coming along?\nM: The machines have been assembling them. They're almost ready. Right over here.\nW: Wow, they look so nice!\nM: Look at the curved shape of the back. The only way you can get that unique shape is by means of the specialized laser we use.\nW: Amazing! Can I also see the pullout sofa?\nM: Not right now. It's being treated with mineral oil. But later today I should be able to take a photo and send it to you.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\n- send a photo (gửi một bức anh) = take a photo and send it to you (chụp một bức anh và gửi nó cho bạn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, say, will do, later\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại chứa từ khoá “later” của người dan ông: “later today...” (ngày hôm nay...) là dấu hiệu sắp đến đáp án.\n- “later today | should be able to take a photo and send it to you.” là thông tin chứa đáp án.\n- “send a photo” là cách diễn đạt tương đương của “take a photo and send it to you”. → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- assemble (v): lắp ráp\n- curved (adj): cong, uốn cong\n- specialized (adj): chuyên biệt, chuyên ngành\n- pullout sofa (n): ghế sofa có thể kéo ra thành giường\n- order (n) đơn đặt hàng\n- laser (n) tia laser\n- mineral oil (n) dau khoáng"
  },
  {
   "number": 59,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "59. What will happen next month? (A) An award will be given. (B) A new product will launch. (C) A colleague will retire. (D) An office will relocate.",
   "transcript": "M: Hi, So-Jin. I just heard that Ms. Yoon is retiring next month.\nW: I'll be sorry to see her go. She was my mentor when I first joined the firm, and we've worked on dozens of projects together.\nM: It's a bit hard to imagine our sales team without her. Has anybody approached you about leading the team after she's gone?\nW: Yes, and I've thought about it. It's a big step up, even for someone like me who's worked in Sales for eight years. And Human Resources hasn't even posted the job description yet.\nM: Well, we need someone with experience.",
   "explanationVi": "Đáp án đúng: C\n\nCách diễn đạt tương đương:\n- acolleague will retire (một đồng nghiệp sẽ nghỉ hưu) = Ms. Yoon is retiring (cô Yoon sẽ nghỉ hưu)\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, will, happen, next month\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại đầu tiên của người đàn ông: “I just heard...” (Tôi vừa nghe tin...) là dấu hiệu sắp đến đáp án.\n- \"| just heard that Ms. Yoon is retiring next month.” là thông tin chứa đáp án.\n- “a colleague will retire” là cách diễn dat tương đương của “Ms. Yoon is retiring”. → Phương án (C) la phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "60. What department do the speakers work in? (A) Sales (B) Human Resources (C) Legal (D) Accounting",
   "transcript": "M: Hi, So-Jin. I just heard that Ms. Yoon is retiring next month.\nW: I'll be sorry to see her go. She was my mentor when I first joined the firm, and we've worked on dozens of projects together.\nM: It's a bit hard to imagine our sales team without her. Has anybody approached you about leading the team after she's gone?\nW: Yes, and I've thought about it. It's a big step up, even for someone like me who's worked in Sales for eight years. And Human Resources hasn't even posted the job description yet.\nM: Well, we need someone with experience.",
   "explanationVi": "Đáp án đúng: A\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what department, speakers, work in\n- Dạng câu hỏi: thông tin chỉ tiết\n- “It's a bit hard to imagine our sales team without her.\" (Thật khó để tưởng tượng đội ngũ bán hàng của chúng ta khi không có cô ấy.) là thông tin chứa đáp án.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "61. What does the man imply when he says, \"we need someone with experience\"? (A) The team has grown very quickly. (B) The woman should apply for a job. (C) A job description should be revised. (D) A new manager is not experienced enough.",
   "transcript": "M: Hi, So-Jin. I just heard that Ms. Yoon is retiring next month.\nW: I'll be sorry to see her go. She was my mentor when I first joined the firm, and we've worked on dozens of projects together.\nM: It's a bit hard to imagine our sales team without her. Has anybody approached you about leading the team after she's gone?\nW: Yes, and I've thought about it. It's a big step up, even for someone like me who's worked in Sales for eight years. And Human Resources hasn't even posted the job description yet.\nM: Well, we need someone with experience.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, man, imply, we need someone with experience\n- Dạng câu hỏi: ngụ ý\n- Khi người đàn ông hỏi “Has anybody approached you about leading the team after she's gone?\" (Có ai tiếp cận bạn về việc lãnh đạo nhóm sau khi cô ấy đi không?) và người phụ nữ trả lời \"Yes, and I've thought about it\", ngụ ý rằng người phụ nữ đã được tiếp cận về việc dẫn dắt nhóm và đã nghĩ về điều đó. Người phụ nữ cũng bày tỏ “It's a big step up, even for someone like me who's worked in Sales for eight years. And Human Resources hasn't even posted the job description yet.” (Đó là một bước tiến lớn, ngay cả đối với một người đã làm việc ở bộ phận Bán hàng được 8 năm như tôi. Và bộ phận Nhân sự thậm chí còn chưa đăng bản mô tả công việc.) Người phụ nữ làm việc được 8 năm trong ngành, chứng tỏ cô ấy đã có nhiều kinh nghiệm.\n→ Việc người đàn ông tiếp tục nói \"Well, we need someone with experience\" ngụ ý rằng người phụ nữ có thể là người phù hợp với vị trí đó.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- firm (n): công ty\n- approach (v): tiếp cận, đề xuất\n- step up (phrasal verb): bước lên, tiến lên\n- Human Resources (n): phòng Nhân sự\n- retire (v) về hưu\n- mentor (n) người hướng dẫn\n- dozens (n) hàng chục"
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Why are the speakers in New York? (A) They saw a play. (B) They attended a conference. (C) They met with some clients. (D) They viewed some real estate.",
   "transcript": "W: Rajesh, it was nice to see you here in New York again this year.\nM: Same here. I look forward to attending the Theater Technology Conference again next year.\nW: I really enjoyed your talk, especially the information you provided on acoustics. Is it published anywhere? I'd like to have a closer look.\nM: Actually, it is. You can find the article in last November's issue of Theater Sound. It's posted online.\nW: Great. I'll look it up.\nM: Oh—my train leaves in fourteen minutes. I have to get going. Safe travels, Camille!",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speakers, in, New York\n- Dạng câu hỏi: thông tin tổng quát\n- Lời thoại đầu tiên của người phụ nữ “it was nice to see you here in New York again this year.” (thật vui khi được gặp lại bạn ở New York năm nay.) là dấu hiệu của đáp án vì có từ khoá “New York\". Người đàn ông dap lại “l look forward to attending the Theater Technology Conference again next year.” (Tôi rất mong sẽ lại được tham dự Hội nghị Công nghệ Sân khấu vào năm tới.), từ đây có thể suy ra hiện tại họ đang ở New York vì hội nghị này, năm ngoái họ đã có mặt ở hội nghị và mong chờ năm sau cũng thế.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy. Phương án có nhắc tới “play”, một từ có thể liên hệ tới “theater”, nhưng bài nghe không bao gồm chi tiết nào liên quan tới vở kịch.\n- (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "63. What does the woman ask the man about? (A) Locating some information (B) Applying for a position (C) Opening a branch office (D) Making a reservation",
   "transcript": "W: Rajesh, it was nice to see you here in New York again this year.\nM: Same here. I look forward to attending the Theater Technology Conference again next year.\nW: I really enjoyed your talk, especially the information you provided on acoustics. Is it published anywhere? I'd like to have a closer look.\nM: Actually, it is. You can find the article in last November's issue of Theater Sound. It's posted online.\nW: Great. I'll look it up.\nM: Oh—my train leaves in fourteen minutes. I have to get going. Safe travels, Camille!",
   "explanationVi": "Đáp án đúng: A\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, ask, man, about\n- Dạng câu hỏi: thông tin chỉ tiết\n- “| really enjoyed your talk, especially the information you provided on acoustics. Is it published anywhere?” (Tôi thực sự thích bài nói của bạn, đặc biệt là thông tin ban cung cấp về âm học. Nó có được xuất bản ở đâu không?) là thông tin chứa đáp án. Như vậy, người phụ nữ muốn tìm hiểu thêm về lĩnh vực âm học nên đã hỏi người đàn ông về việc liệu những thông tin đó có được xuất bản không, hay chính là muốn tìm kiếm những thông tin đó ở đâu.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "64. Look at the graphic. Where will the man travel to next? (A) Shady Grove (B) Braddock Bay (C) Largo (D) Ashburn",
   "transcript": "W: Rajesh, it was nice to see you here in New York again this year.\nM: Same here. I look forward to attending the Theater Technology Conference again next year.\nW: I really enjoyed your talk, especially the information you provided on acoustics. Is it published anywhere? I'd like to have a closer look.\nM: Actually, it is. You can find the article in last November's issue of Theater Sound. It's posted online.\nW: Great. I'll look it up.\nM: Oh—my train leaves in fourteen minutes. I have to get going. Safe travels, Camille!",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, where, man, travel to, next\n- Dạng câu hỏi: liên quan đến bảng biểu/biểu đồ.\n- Câu hỏi yêu cầu xem đồ họa để xác định địa điểm tiếp theo người đàn ông sẽ tới\n- Dựa theo thông tin trong lời thoại người đàn ông và \"my train leaves in fourteen minutes\" là thông tin chứa đáp án.\n- Dựa vào đồ họa, chuyến tàu vào 14 phút sau đó có điểm đến là Largo. → Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không phù hợp.\nTừ vựng cần lưu ý:\n- conference (n) hội nghị\n- acoustics (n) âm học\n- publish (v) xuất bản\n- look up (phrasal verb) tra cứu, tìm kiếm (thông tin)\n- issue (n) số (báo, tap chí)\n- posted (adj) được đăng tai\n- provide (v) cung cấp\n- leave (v) rời khỏi"
  },
  {
   "number": 65,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "65. What does the woman ask the man about? (A) Whether a coupon is valid (B) Whether a food is spicy (C) Whether a drink is included (D) Whether any seats are available",
   "transcript": "M: Welcome to Orlando's Deli. If you'd like to try one of our daily specials, they're on the board behind me.\nW: Wow, that's a great menu. The vegetable curry looks good. Is it spicy?\nM: No, it's very mild-but we just sold out, unfortunately.\nW: In that case, I'll have the lasagna.\nM: Great choice. By the way, we just opened our new patio this week in case you'd like to sit outside.\nW: Actually. it is a beautiful day. And your patio looks lovely.",
   "explanationVi": "Đáp án đúng: B\n\nCách diễn đạt tương đương:\n- a food (một món ăn) = the vegetable curry (món cà ri rau củ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, ask, man, about\n- Dạng câu hỏi: thông tin chỉ tiết\n- “The vegetable curry looks good. Is it spicy?” (Cà ri rau củ trông ngon quá. Nó cay không?) là thông tin chứa dap án.\n- “a food\" là cách diễn đạt tương đương của “the vegetable curry\". ~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "66. Look at the graphic. Which special does the woman order? (A) Special 1 (B) Special 2 (C) Special 3 (D) Special 4",
   "transcript": "M: Welcome to Orlando's Deli. If you'd like to try one of our daily specials, they're on the board behind me.\nW: Wow, that's a great menu. The vegetable curry looks good. Is it spicy?\nM: No, it's very mild-but we just sold out, unfortunately.\nW: In that case, I'll have the lasagna.\nM: Great choice. By the way, we just opened our new patio this week in case you'd like to sit outside.\nW: Actually. it is a beautiful day. And your patio looks lovely.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, which special, woman, order\n- Dạng câu hỏi: câu hỏi liên quan bảng biểu/biểu đồ\n- Câu hỏi yêu cầu xem đồ họa để xác định người phụ nữ gọi món đặc biệt số mấy.\n- Dựa theo thông tin gọi món của người phụ nữ, “I'll have the lasagna\" là thông tin chứa đáp án.\n- Dựa vào đồ họa, món lasagna là món đặc biệt số 3.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "67. What will the woman most likely do next? (A) Move her car (B) Go to a patio (C) Make a reservation (D) Meet some friends",
   "transcript": "M: Welcome to Orlando's Deli. If you'd like to try one of our daily specials, they're on the board behind me.\nW: Wow, that's a great menu. The vegetable curry looks good. Is it spicy?\nM: No, it's very mild-but we just sold out, unfortunately.\nW: In that case, I'll have the lasagna.\nM: Great choice. By the way, we just opened our new patio this week in case you'd like to sit outside.\nW: Actually. it is a beautiful day. And your patio looks lovely.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, most likely, do, next\n- Dạng câu hỏi: ngụ ý\n- Lời thoại của người đàn ông “we just opened our new patio this week in case you'd like to sit outside.” (chúng tôi vừa khai trương sân hiên mới trong tuần nay trong trường hợp bạn muốn ngồi ngoài) nhằm mục đích giới thiệu khu vực mới với người phụ nữ. Người phụ nữ đưa ra lời khen “And your patio looks lovely.” (Và sân hiên của bạn trông thật đáng yêu.) nên có thể suy ra cô ấy sẽ đi ra ngoài sân.\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- board (n) bảng\n- spicy (adj) cay\n- mild (adj): nhẹ nhàng, không cay\n- sold out (phrasal verb): bán hết, hết hang\n- patio (n): sân hiên, sân trong\n- daily specials (n) các món đặc biệt hàng ngày sổ lovely (adj) đẹp dé, dễ thương"
  },
  {
   "number": 68,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "68. What is the woman happy about? (A) She happened to meet some friends. (B) The weather is perfect for an activity. (C) The park was closer than expected. (D) There are few people in the park.",
   "transcript": "W: I'm excited about our hike today here at Marina Park. And I'm so glad we got to the park early before it gets crowded. Which trail should we hike?\nM1: Let's take a look at the map. We're at the visitor center, and there's a shuttle that stops at different trailheads.\nW: Right. It looks like the Creek Trail and the Pond Trail are fairly short. I'd like to do a more challenging hike.\nM2: OK. How about the Waterfall Trail?\nW: That sounds good. And look—there's a video about the park. We can watch while we wait.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\n- happy (hạnh phúc) = glad (vui vẻ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, woman, happy about\n- Dạng câu hỏi: thông tin chỉ tiết\n- \"I'm so glad we got to the park early before it gets crowded.” (Tôi rất vui vì chúng tôi đã đến công viên sớm trước khi nó đông đúc.) là thông tin chứa đáp án. Như vậy, người phụ nữ vui vì không có nhiều người trong công viên.\n- “happy\" là cách diễn đạt tương đương của “glad\".\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "69. Look at the graphic. How far will the speakers hike? (A) 7 kilometers (B) 5 kilometers (C) 2 kilometers (D) I kilometer",
   "transcript": "W: I'm excited about our hike today here at Marina Park. And I'm so glad we got to the park early before it gets crowded. Which trail should we hike?\nM1: Let's take a look at the map. We're at the visitor center, and there's a shuttle that stops at different trailheads.\nW: Right. It looks like the Creek Trail and the Pond Trail are fairly short. I'd like to do a more challenging hike.\nM2: OK. How about the Waterfall Trail?\nW: That sounds good. And look—there's a video about the park. We can watch while we wait.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vi vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, how far, speakers, hike\n- Dạng câu hỏi: câu hỏi liên quan bảng biểu/biểu đồ\n- Câu hỏi yêu cầu xem đồ họa để xác định khoảng cách mà những người nói phải đi.\n- Dựa theo đề xuất đi bộ của người đàn ông “How about the Waterfall Trail?” (Vay còn đường mon Waterfall thì sao?) và sự đồng tình của người phụ nữ “That sounds good.” (Điều đó nghe thật tuyệt), có thể thấy rằng họ chọn đường mòn Waterfall.\n- Dựa vào đồ họa, đường mòn Waterfall dài 5km.\n~ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C)), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "70. What can the speakers do while waiting for the shuttle? (A) Buy some snacks (B) Watch a video (C) Visit a gift shop (D) Rent some equipment",
   "transcript": "W: I'm excited about our hike today here at Marina Park. And I'm so glad we got to the park early before it gets crowded. Which trail should we hike?\nM1: Let's take a look at the map. We're at the visitor center, and there's a shuttle that stops at different trailheads.\nW: Right. It looks like the Creek Trail and the Pond Trail are fairly short. I'd like to do a more challenging hike.\nM2: OK. How about the Waterfall Trail?\nW: That sounds good. And look—there's a video about the park. We can watch while we wait.",
   "explanationVi": "Đáp án đúng: B\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speakers, do, while, waiting, shuttle\n- Dạng câu hỏi: thông tin chỉ tiết\n- Lời thoại cuối mang nội dung phát hiện điều gì đó của người phụ nữ: “And look...” (Và nhìn này...) là dấu hiệu sắp đến đáp án.\n- \"there's a video about the park. We can watch while we wait.” là thông tin chứa đáp án. → Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần lưu ý:\n- hike (n) chuyến đi bộ đường dài, leo núi\n«trail (n) đường mòn, con đường dẫn đến nơi nào đó\n- visitor center (n) trung tâm thông tin du khách\n- shuttle (n) xe buýt đưa đón\n- trailhead (n) đầu đường mòn\n- challenging (adj) đầy thách thức\n- waterfall (n) thác nước"
  },
  {
   "number": 71,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "71. What did the listener do yesterday? (A) She placed an order. (B) She scheduled an event. (C) She called a manager. (D) She painted some rooms.",
   "transcript": "Hi, Ms. Cho. I'm calling from Springdale Lights. TYesterday, you ordered 24 of our purple solar lanterns for your upcoming event. Unfortunately, our supplier won't be able to get us purple lanterns for another three weeks, so we only have yellow ones in stock. We would like to offer you a ten percent discount on them to apologize for this. Please call us back to confirm whether you'd like the vellow solar lights, and well set them aside for you.",
   "explanationVi": "Đáp án đúng: A\n\n71. Hôm qua người nghe đã làm gì?\n(A) Cô ây đã đặt hàng.\n(B) Cô ây đã lên lịch một sự kiện.\n(C) Cô ấy đã gọi cho người quản lý.\n(D) Cô ây đã sơn một sô phòng.\nCách diễn đạt tương đương:\n- placed an order = ordered: đặt hang\nCách định vị vùng thông tin chứa dap an:\n- Từ khóa trong câu hỏi: what, listener, do, yesterday\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Từ “Yesterday...” (ngày hôm qua...) là dấu hiệu sắp đến đáp án. Lời thoại “Yesterday, you ordered 24 of our purple solar lanterns for your upcoming event.” (Hôm qua, cô đã đặt mua 24 chiếc đèn lồng năng lượng mặt trời màu tím của chúng tôi cho sự kiện sắp tới của mình.) cho thấy người nghe đã đặt một đơn hàng gồm 24 chiếc đèn lồng năng lượng mặt trời từ Springdale Lights.\n- “placed an order” là cách diễn đạt tương đương của “ordered”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "72. What problem does the speaker mention? (A) A price has increased. (B) A machine needs to be repaired. (C) A product is not available. (D) A performance has been canceled.",
   "transcript": "Hi, Ms. Cho. I'm calling from Springdale Lights. TYesterday, you ordered 24 of our purple solar lanterns for your upcoming event. Unfortunately, our supplier won't be able to get us purple lanterns for another three weeks, so we only have yellow ones in stock. We would like to offer you a ten percent discount on them to apologize for this. Please call us back to confirm whether you'd like the vellow solar lights, and well set them aside for you.",
   "explanationVi": "Đáp án đúng: C\n\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, problem, speaker, mention\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Từ “Unfortunately...” (Thật không may...) là dấu hiệu sắp đến đáp án. Lời thoại “Unfortunately, our supplier won't be able to get us purple lanterns for another three weeks” (Thật không may, nhà cung cấp của chúng tôi sẽ không thé cung cấp cho chúng tôi những chiếc đèn lồng màu tím trong ba tuần nữa) là thông tin chứa đáp án. Từ lời thoại này có thể thấy vấn đề mà người nói đề cập đến là sự không có sẵn của một mặt hàng (cụ thể là loại đèn lồng màu tím mà người nghe đã đặt mua trước đó).\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "73. What does the speaker offer the listener? (A) Expedited shipping (B) A full refund (C) A free consultation (D) A discount",
   "transcript": "Hi, Ms. Cho. I'm calling from Springdale Lights. TYesterday, you ordered 24 of our purple solar lanterns for your upcoming event. Unfortunately, our supplier won't be able to get us purple lanterns for another three weeks, so we only have yellow ones in stock. We would like to offer you a ten percent discount on them to apologize for this. Please call us back to confirm whether you'd like the vellow solar lights, and well set them aside for you.",
   "explanationVi": "Đáp án đúng: D\n\nCách diễn đạt tương đương:\n- a discount ( một sự giảm giá) ~ a ten percent discount (một sự giảm giá 10%)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, offer, listener\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Cụm từ “We would like to offer you...” (chúng tôi muốn đề xuất cho bạn...) là dấu hiệu sắp đến đáp án. Lời thoại “We would like to offer you a ten percent discount on them to apologize for this.” (Chúng tôi muốn đề xuất giảm giá 10% cho bạn để xin lỗi về điều này) cho thấy người nói muốn đề xuất một ưu đãi đặc biệt cho người nghe như một cách để xin lỗi cho sự cố thiếu nguồn hàng của mình.\n- \"a discount\" là cách diễn đạt tương đương của “a ten percent discount”. → Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- solar lanterns (a-n): đèn lồng hoạt động bằng năng lượng mặt trời\n- supplier (n): nhà cung cấp\n- stock (n): hàng tồn kho\n- discount (n): giảm giá\n- confirm (v): xác nhận\n- set aside (phrasal verb): dành riêng"
  },
  {
   "number": 74,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "74. According to the speaker, what is special about Osterwind Estate? (A) It houses many historic paintings. (B) It was designed by its owner. (C) It includes a botanical garden. (D) It is used as a museum.",
   "transcript": "Welcome to Osterwind Estate. The former owner, Ms. Yuping Wei, was a famous painter. What's special about this estate is that Ms. Wei designed it herself, including the landscaping. We're asking volunteers to clear debris from the walkways around the gardens in preparation for the estate's first season as a public park. You can pick up a bag and gloves from the patio area. And remember, be sure to see me as you check out before you leave. All volunteers are eligible for a complimentary visitor pass that you can use to access the estate and attend any events held here all summer long.",
   "explanationVi": "Đáp án đúng: B\n\n74. Theo diễn giả, Osterwind Estate có gì đặc biệt?\n(A) Nó chứa nhiều bức tranh lịch sử.\n(B) Nó được thiết kế bởi chu nhân của nó.\n(C) Nó bao gồm một vườn bách thảo.\n(D) Nó được sử dụng làm bảo tàng.\nCách diễn đạt tương đương:\n- designed by its owner (được thiết kế bởi chủ nhân của nó) = Ms. Wei designed it herself (ba Wei đã tự tay thiết kế nó)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, special, Osterwind Estate\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Cụm từ “What's special about this estate is that...” (Điều đặc biệt ở khu bất động sản này là...) là dấu hiệu sắp đến đáp án. Lời thoại “What's special about this estate is that Ms. Wei designed it herself, including the landscaping\" (Điều đặc biệt ở khu bất động sản này là bà Wei đã tự tay thiết kế nó, bao gồm cả cảnh quan) chứng tỏ theo người nói thì việc Osterwind Estate được thiết kế bởi chính chủ nhân của nó đã khiến khu đất này trở nên đặc biệt.\n- \"designed by its owner\" là cách diễn đạt tương đương của “Ms. Wei designed it herself”. → Phương án (B) là phù hợp nhất. Loại phương án sai:\n- (A), phương án bẫy. Người nói có nhắc đến thông tin người chủ cũ của Osterwind Estate là một họa sĩ, tuy nhiên không đề cập đến việc Osterwind Estate có chứa nhiều bức tranh lịch sử.\n- (C), phương án bẫy. Người nói có nhắc đến những khu vườn, tuy nhiên đó không phải là điều khiến cho Osterwind Estate trở nên đặc biệt.\n- Loại (D) chứa thông tin không được đề cập."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "75. Why are the listeners at Osterwind Estate? (A) To attend an awards ceremony (B) To apply for landscaping jobs (C) To take a tour of a building (D) To clean up some gardens",
   "transcript": "Welcome to Osterwind Estate. The former owner, Ms. Yuping Wei, was a famous painter. What's special about this estate is that Ms. Wei designed it herself, including the landscaping. We're asking volunteers to clear debris from the walkways around the gardens in preparation for the estate's first season as a public park. You can pick up a bag and gloves from the patio area. And remember, be sure to see me as you check out before you leave. All volunteers are eligible for a complimentary visitor pass that you can use to access the estate and attend any events held here all summer long.",
   "explanationVi": "Đáp án đúng: D\n\n75. Tại sao những người nghe lại ở Osterwind Estate?\n(A) Đề tham dự một lễ trao giải\n(B) Đề xin việc làm cảnh quan\n(C) Đệ tham quan một tòa nhà\n(D) Đê dọn dẹp một sô khu vườn\nCách diễn đạt tương đương:\n- clean up some gardens (dọn dẹp một số khu vườn) ~ clear debris from the walkways around the gardens (dọn dẹp rác thải từ các con đường xung quanh khu vườn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, listeners, Osterwind Estate\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại từ người nói “We're asking volunteers to clear debris from the walkways around the gardens in preparation for the estate's first season as a public park. You can pick up a bag and gloves from the patio area.” (Chúng tôi đang tim người tình nguyện dé dọn dep rác thải từ các con đường xung quanh khu vườn để chuẩn bị cho mùa xuân đầu tiên của khu đất này như một công viên công cộng. Bạn có thể lấy một chiếc túi và găng tay từ khu vực hiên.) chứng tỏ những người nghe là những người tình nguyện đến Osterwind Estate để dọn dẹp rác thải xung quanh khu vườn.\n- “clean up some gardens” là cách diễn đạt tương đương của “clear debris from the walkways around the gardens”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Loại (A), (C) vì chứa thông tin không được đề cập.\n- (B) phương án bẫy, người nói có nhắc đến thông tin về “landscaping” (cảnh quan) do chính cựu chủ nhân của Osterwind Estate thiết kế, ngoài ra, không có thông tin nào trong bài đề cập đến việc Osterwind Estate cần tuyển người chăm sóc cảnh quan."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. What will the listeners receive? (A) Gift-shop coupons (B) Free passes (C) Lunch boxeS (D) T-shirts",
   "transcript": "Welcome to Osterwind Estate. The former owner, Ms. Yuping Wei, was a famous painter. What's special about this estate is that Ms. Wei designed it herself, including the landscaping. We're asking volunteers to clear debris from the walkways around the gardens in preparation for the estate's first season as a public park. You can pick up a bag and gloves from the patio area. And remember, be sure to see me as you check out before you leave. All volunteers are eligible for a complimentary visitor pass that you can use to access the estate and attend any events held here all summer long.",
   "explanationVi": "Đáp án đúng: B\n\n76. Người nghe sẽ nhận được gì?\n(A) Những phiéu giảm giá quà tặng\n(B) Những chiếc vé miễn phí\n(C) Những hộp cơm trưa\n(D) Áo phông\nCách diễn đạt tương đương: - receive (nhận được) = are eligible for (đủ điều kiện để nhận được)\n- free passes (những chiếc vé miễn phí) ~ a complimentary visitor pass (một thẻ tham quan miễn phí)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listener, receive\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại từ người nói “All volunteers are eligible for a complimentary visitor pass that you can use to access the estate and attend any events held here all summer long.” (Tất cả các tình nguyện viên đều có thể nhận được một thẻ tham quan miễn phí mà ban có thể sử dụng để vào khu đất và tham dự bất kỳ sự kiện nào được tổ chức ở đây suốt cả mùa hè.) cho thấy những người nghe (tình nguyện viên) sẽ nhận được một chiếc vé vào Osterwind Estate để tham quan miễn phí.\n- “receive” là cách diễn đạt tương đương của “are eligible for”.\n- “free passes\" là cách diễn đạt tương đương của “a complimentary visitor pass”. → Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- former owner (adj-n): chủ sở hữu trước day\n- volunteer (n): tình nguyện viên - walkway (n): lối đi bộ\n- public park (adj-n): công viên công cộng s complimentary (adj): miễn phí s visitor pass (n-n): thẻ vào cửa cho khách tham quan"
  },
  {
   "number": 77,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "77. Who most likely is the listener? (A) A travel agent (B) An administrative assistant (C) A flight attendant (D) A security guard",
   "transcript": "Good morning, Ms. Espinosa. This is Marcel Fournier. It's Saturday morning, and I'm on my way to the airport. This is a little out of the ordinary, but I'm calling because in my haste I left a note with Mr. Hang's mobile phone number on my office desk. He's picking me up from the airport, and I'll be stuck if I can't reach him. ml need you to go into the office and text me with the number. I know this is inconvenient. rl check my messages once I land in San Diego.",
   "explanationVi": "Đáp án đúng: B\n\nAi có nhiều khả năng là người nghe nhất?\n(A) Một đại lý du lịch\n(B) Một trợ lý hành chính\n(C) Một tiép viên hàng không\n(D) Một nhân viên bảo vệ\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, listener\n- Dạng câu hỏi: Thông tin tổng quát\n- Từ lời thoại “I'm calling because in my haste | left a note with Mr. Hang's mobile phone number on my office desk.” (tôi gọi điện vì vội vàng nên tôi đã để lại mảnh giấy ghi số điện thoại di động của ông Hang trên bàn làm việc của tôi.) và “ I'll need you to go into the office and text me with the number” (Tôi cần bạn vào văn phòng và nhắn tin cho tôi số điện thoại của ông\nấy.) có thể suy ra người nghe có khả năng là trợ lý của người nói nhất vì một trợ lý hành chính thường sẽ chịu trách nhiệm về việc hỗ trợ và thực hiện các công việc văn phòng theo yêu cầu của người quản lý.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- (A), (C) là các phương án bẫy, người nói có đề cập đến bối cảnh đang trên đường tới sân bay, tuy nhiên,việc gọi điện để nhờ ai đó lấy số điện thoại mà mình đã quên tại nơi làm việc không phải là một nhiệm vụ liên quan trực tiếp đến công việc của đại lý du lịch hoặc tiếp viên hàng không.\n- (D) chứa thông tin không phù hợp."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "78. Why does the speaker say, \"I know this is inconvenient\"? (A) To suggest a deadline extension (B) To report on an additional cost (C) To offer an alternative solution (D) To apologize for a request",
   "transcript": "Good morning, Ms. Espinosa. This is Marcel Fournier. It's Saturday morning, and I'm on my way to the airport. This is a little out of the ordinary, but I'm calling because in my haste I left a note with Mr. Hang's mobile phone number on my office desk. He's picking me up from the airport, and I'll be stuck if I can't reach him. ml need you to go into the office and text me with the number. I know this is inconvenient. rl check my messages once I land in San Diego.",
   "explanationVi": "Đáp án đúng: D\n\n78. Tại sao người nói nói: “Tôi biết điều này bất tiện”?\n(A) Dé đề nghị gia hạn thời hạn\n(B) Dé báo cáo về chi phí bồ sung\n(C) Dé đưa ra một giải pháp thay thé\n(D) Để xin lỗi vì một yêu cầu\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, say, \"I know this is inconvenient\"\n- Dạng câu hỏi: ngụ ý\n- Các thông tin xung quanh lời thoại trích dẫn sẽ dẫn đến đáp án.\n- Lời thoại trước câu nói được trích dẫn “ I'll need you to go into the office and text me with the number.\" (Tôi cần bạn vào văn phòng và nhắn tin cho tôi số điện thoại của ông ấy.) cho thấy người nói yêu cầu người nghe thực hiện một công việc phiền toái là đến văn phòng vào ngày mà người nghe đáng lẽ nên được nghỉ (sáng thứ Bảy), do đó, khi người nói nói \"l know this is inconvenient\" (Tôi biết điều này khá bất tiện) chính là một cách gián tiếp để thừa nhận và xin lỗi vì sự phiền toái mà yêu cầu của họ có thể gây ra.\n→ Phương án (D) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không phù hợp."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "79. What will the speaker do when he arrives in San Diego? (A) Retrieve his messages (B) Check in to a hotel (C) Change a flight reservation (D) Visit a company office",
   "transcript": "Good morning, Ms. Espinosa. This is Marcel Fournier. It's Saturday morning, and I'm on my way to the airport. This is a little out of the ordinary, but I'm calling because in my haste I left a note with Mr. Hang's mobile phone number on my office desk. He's picking me up from the airport, and I'll be stuck if I can't reach him. ml need you to go into the office and text me with the number. I know this is inconvenient. rl check my messages once I land in San Diego.",
   "explanationVi": "Đáp án đúng: A\n\n79. Người nói sẽ làm gì khi đến San Diego?\n(A) Kiểm tra lại tin nhắn của anh ấy\n(B) Đăng ký vào khách sạn\n(C) Thay đổi đặt chỗ chuyển bay\n(D) Thăm văn phòng công ty\nCách diễn đạt tương đương:\n- arrives in (đến) = land in (đáp xuống)\n- retrieve his messages (kiểm tra lại tin nhắn của anh ấy) ~ check my messages (kiểm tra lại tin nhắn của tôi)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, do, when, he, arrives, San Diego\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “ I'll check my messages once | land in San Diego.\" (Tôi sẽ kiểm tra tin nhắn khi đáp xuống San Diego.) cho thấy việc người nói sẽ làm khi đến San Diego là kiểm tra lại tin nhắn để lấy số điện thoại của ông Hang.\n- “arrives in” là cách diễn đạt tương đương của “land in”.\n- “retrieve his messages” là cách diễn đạt tương đương của “check my messages”.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- airport (n): sân bay\n- haste (n): sự vội vã, hấp tap\n- note (n): ghi chú\n- stuck (adj): bị ket etext (v): gửi tin nhắn văn bản\n- inconvenient (adj): bất tiện s message (n): tin nhắn"
  },
  {
   "number": 80,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "80. What does the speaker say her videos are usually about? (A) How to plan trips (B) How to reuse items (C) How to organize closets (D) How to draw landscapes",
   "transcript": "Hi, everyone! Thanks for watching today. If you're new to my channel, you should know that my videos focus on ways that we can repurpose common objects so that they don't end up in landfills. In this video, you'll learn how to make candles from old and leftover crayons. Your first step is to collect the items you'll need. You may already have some old crayons around the house, or you can ask your friends and neighbors for theirs. MIl be covering a lot of steps, but don't worry, a full written version of the instructions is available on my Web site. I recommend downloading those later for future reference.",
   "explanationVi": "Đáp án đúng: B\n\nNgười nói nói video của cô ay thường nói về điều gì?\n(A) Cách lên kê hoạch cho chuyên đi\n(B) Cách tái sử dụng các vật phâm\n(C) Cách săp xêp tủ quân áo\n(D) Cách vẽ phong cảnh\nCách diễn đạt tương đương: - about (về) ~ focus on (tập trung vào)\n- reuse items ( tái sử dụng các vật phẩm) ~ repurpose common objects (tái sử dụng những vật dụng thông thường)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, say, her videos, about\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “my videos focus on ways that we can repurpose common objects so that they don't end up in landfills’ (những video của tôi tập trung vào những cách chúng ta có thể tái sử dụng những vật dụng thông thường để chúng không bị vứt vào bãi rác.) cho thấy những video của người nói thường nói về những cách tái sử dụng các vật phẩm.\n- “about” là cách diễn đạt tương đương của “focus on”.\n- “reuse items” là cách diễn đạt tương đương của “repurpose common objects\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "81. What first step does the speaker mention? (A) Writing a list (B) Finding coupons (C) Gathering supplies (D) Looking at images online",
   "transcript": "Hi, everyone! Thanks for watching today. If you're new to my channel, you should know that my videos focus on ways that we can repurpose common objects so that they don't end up in landfills. In this video, you'll learn how to make candles from old and leftover crayons. Your first step is to collect the items you'll need. You may already have some old crayons around the house, or you can ask your friends and neighbors for theirs. MIl be covering a lot of steps, but don't worry, a full written version of the instructions is available on my Web site. I recommend downloading those later for future reference.",
   "explanationVi": "Đáp án đúng: C\n\n81. Người nói đề cập đến bước đầu tiên nào?\n(A) Viết một danh sách\n(B) Tìm phiếu giảm giá\n(C) Thu thập vật liệu\n(D) Xem hình ảnh trực tuyến\nCách diễn đạt tương đương:\n- gathering supplies (thu thập vật liệu) ~ collect the items (thu thập những vật phẩm)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, first step, speaker, mention\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Cụm từ “Your first step is...” (Bước đầu tiên của bạn là) là dấu hiệu sắp đến đáp án. Lời thoại “Your first step is to collect the items you'll need” (Bước đầu tiên của bạn là thu thập những vật phẩm bạn cần.) cho thấy bước đầu tiên trong quy trình tài chế mà người nói đề cập đến là thu thập những vật liệu cần thiết.\n- \"gathering supplies” là cách diễn đạt tương đương của “collect the items\". → Phương án (C) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "82. According to the speaker, what can the listeners do on a Web site? (A) Enter a contest (B) Subscribe to a video channel (C) Submit some photographs (D) Download some instructions",
   "transcript": "Hi, everyone! Thanks for watching today. If you're new to my channel, you should know that my videos focus on ways that we can repurpose common objects so that they don't end up in landfills. In this video, you'll learn how to make candles from old and leftover crayons. Your first step is to collect the items you'll need. You may already have some old crayons around the house, or you can ask your friends and neighbors for theirs. MIl be covering a lot of steps, but don't worry, a full written version of the instructions is available on my Web site. I recommend downloading those later for future reference.",
   "explanationVi": "Đáp án đúng: D\n\nTheo người nói, người nghe có thể làm gì trên một trang Web?\n(A) Tham gia một cuộc thi\n(B) Đăng ký kênh video\n(C) Gửi một số bức ảnh\n(D) Tải xuống một số hướng dẫn\nCách diễn đạt tương đương:\n- download some instructions (tải xuống một số hướng dẫn) ~ downloading those (tải chúng xuống)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, listener, do, Web site\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại từ người nói “a full written version of the instructions is available on my Web site. | recommend downloading those later for future reference.” (phiên bản hướng dẫn đầy đủ có sẵn trên trang web của tôi. Tôi khuyên bạn nên tải chúng xuống sau để tham khảo trong tương\nlai.) cho thấy điều người nghe có thể làm là tải xuống một số hướng dẫn có sẵn trên website.\n- “download some instructions” là cách diễn đạt tương đương của \"downloading those”. → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- channel (n): kênh truyền thông s repurpose (v): tai sử dụng\n- landfill (n): bãi rác\n- candle (n): nến\n- crayon (n): bút màu\n- collect (v): thu thập «instruction (n): sự hướng dẫn"
  },
  {
   "number": 83,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "83. What is the speech mainly about? (A) A financial report (B) A round of promotions (C) A product prototype (D) A construction project",
   "transcript": "Thank you all for coming to this press conference. As you know, the Grand Falls Bridge improvement work has been underway for almost a year. We're nearing the final stage of sanding and painting the newly built portions, I know the fishing community has expressed concern over the potential environmental impact of this project on our local marine life. Well, all required studies were conducted a year ago. I'll take some questions now. After that, our special-events coordinator will discuss the bridge-opening ceremony that's being planned.",
   "explanationVi": "Đáp án đúng: D\n\nBài phát biểu chủ yếu nói về điều gì?\n(A) Một báo cáo tài chính\n(B) Một đợt khuyên mai\n(C) Mot nguyén mau san pham\n(D) Một dự án xây dựng\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speech, about\n- Dạng câu hỏi: Thông tin tổng quát\n- Lời thoại “the Grand Falls Bridge improvement work has been underway for almost a\nyear” (công việc cải tạo Cầu Grand Falls đã được tiến hành gần một năm) là thông tin chứa đáp án. Từ lời thoại này có thể thấy bài phát biểu sẽ chủ yếu bàn luận về một dự án xây dựng (cụ thể là cầu Grand Falls).\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "84. Why does the speaker say, \"all required studies were conducted a year ago”? (A) To correct a timeline error (B) To provide reassurance (C) To deny responsibility for a problem (D) To argue that a new study is needed",
   "transcript": "Thank you all for coming to this press conference. As you know, the Grand Falls Bridge improvement work has been underway for almost a year. We're nearing the final stage of sanding and painting the newly built portions, I know the fishing community has expressed concern over the potential environmental impact of this project on our local marine life. Well, all required studies were conducted a year ago. I'll take some questions now. After that, our special-events coordinator will discuss the bridge-opening ceremony that's being planned.",
   "explanationVi": "Đáp án đúng: B\n\n84. Tại sao người nói nói, \"tất cả các nghiên cứu bắt buộc đã được thực hiện cách đây một năm\"?\n(A) Để sửa lỗi dòng thời gian\n(B) Đề mang lại sự yên tâm\n(C) Đề từ chối trách nhiệm về một vấn đề\n(D) Để tranh luận rằng cần có một nghiên cứu mới\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, say, \"all required studies were conducted a year ago\"\n- Dạng câu hỏi: ngụ ý\n- Các thông tin xung quanh lời thoại trích dẫn sẽ dẫn đến đáp án.\n- Lời thoại trước câu nói được trích dẫn “ | know the fishing community has expressed concern over the potential environmental impact of this project on our local marine life.” (Tôi biết cộng đồng ngư dân đã bày tỏ lo ngại về tác động môi trường tiềm Gn của dự án này đối với sinh vật biển địa phương của chúng ta.) cho thấy rằng có sự lo ngại từ cộng đồng ngư dân về tác động môi trường của dự án. Do đó, lời nói \"all required studies were conducted a year ago\" (tất cả các nghiên cứu cần thiết đã được tiến hành cách đây một năm) được sử dụng để đưa ra sự yên tâm, làm giảm đi những lo ngại của cộng đồng.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "C",
   "group": "83-85",
   "textEn": "85. What will the next speaker discuss? (A) A job fair (B) A school opening (C) A ceremony (D) A sporting event",
   "transcript": "Thank you all for coming to this press conference. As you know, the Grand Falls Bridge improvement work has been underway for almost a year. We're nearing the final stage of sanding and painting the newly built portions, I know the fishing community has expressed concern over the potential environmental impact of this project on our local marine life. Well, all required studies were conducted a year ago. I'll take some questions now. After that, our special-events coordinator will discuss the bridge-opening ceremony that's being planned.",
   "explanationVi": "Đáp án đúng: C\n\n85. Người nói tiếp theo sẽ thảo luận về điều gì?\n(A) Một hội chợ việc làm\n(B) Một lễ khai giảng trường học\n(C) Một buổi lễ\n(D) Một sự kiện thể thao\nCách diễn đạt tương đương:\n- a ceremony (một buổi lễ) ~ the bridge-opening ceremony (lễ khánh thành cây cầu)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, next, speaker, discuss\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Cụm từ “After that, ...\" (Sau đó, ...) là dấu hiệu nhận biết sắp đến đáp án. Lời thoại “After that, our special-events coordinator will discuss the bridge-opening ceremony that's being planned.” (Sau đó, người điều phối các sự kiện đặc biệt của chúng tôi sé thảo luận về lễ khánh thành cây cầu đang được lên kế hoạch.) cho thấy người nói tiếp theo (cụ thể là người điều phối các sự kiện) sẽ thảo luận thông tin về một buổi lễ.\n- \"a ceremony” là cách diễn đạt tương đương của “ the bridge-opening ceremony’. → Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- press conference (n): cuộc họp báo\n- underway (adj): đang diễn ra, đang thực hiện\n- fishing community (n): cộng đồng ngư dan\n- environmental impact (n): tác động môi trường\n- studies (n): các nghiên cứu\n- coordinator (n): người điều phối"
  },
  {
   "number": 86,
   "part": 4,
   "answer": "D",
   "group": "86-88",
   "textEn": "86. Who most likely is the speaker? (A) A salesperson (B) A government official (C) An interior designer (D) A building manager",
   "transcript": "Hello, Mr. Smith. I hope you're getting settled into your office space in our building. I'm calling about some large packages that arrived for your company last week. We're keeping them for you in the storage room downstairs. The lease agreement says management will hold packages for five days. It's been ten days, Please give me a call and let me know when you can come down to claim them so I can be there to open the storage room door for you.",
   "explanationVi": "Đáp án đúng: D\n\n86. Ai có nhiều khả năng là người nói nhất?\n(A) Một nhân viên bán hàng\n(B) Một quan chức chính phủ\n(C) Một nhà thiết kế nội thất\n(D) Một người quản lý tòa nhà\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, speaker\n- Dạng câu hỏi: Thông tin tổng quát\n- Lời thoại sau câu chào hỏi “ | hope you're getting settled into your office space in our building.” ( Tôi hy vọng ông cảm thấy thoải mái trong không gian văn phòng của mình ở tòa nhà của chúng tôi.) cho thấy người nói rất có thể là một quản lý tòa nhà vì câu nói này đã phản ánh một hành động thường gặp của một quản lý tòa nhà khi hỏi thăm về sự thích nghi với môi trường mới của những người mới chuyển đến.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- (A) phương án bẫy. Người nói có nhắc đến việc “some large packages that arrived for your company last week” (một số kiện hàng lớn đã đến công ty của ông vào tuần trước), tương đối giống với thông báo của một nhân viên bán hàng đến khách hàng, tuy nhiên dựa vào lời hỏi thăm trước đó “ | hope you're getting settled into your office space in our building” có thể xác định người nói không phải nhân viên bán hang.\n- Các phương án (B), (C) chứa thông tin không phù hợp."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "87. Why does the speaker say, \"It's been ten days\"? (A) To explain an expense (B) To point out a problem (C) To make an offer (D) To thank a colleague",
   "transcript": "Hello, Mr. Smith. I hope you're getting settled into your office space in our building. I'm calling about some large packages that arrived for your company last week. We're keeping them for you in the storage room downstairs. The lease agreement says management will hold packages for five days. It's been ten days, Please give me a call and let me know when you can come down to claim them so I can be there to open the storage room door for you.",
   "explanationVi": "Đáp án đúng: B\n\n87. Tại sao người nói lại nói “Đã mười ngày rồi”?\n(A) Để giải thích một khoản chi phí\n(B) Đề chí ra một vấn đề\n(C) Dé đưa ra lời đề nghị\n(D) Dé cảm ơn một đồng nghiệp\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: Why, speaker, say, \"It's been ten days\"\n- Dạng câu hỏi: ngụ ý\n- Các thông tin xung quanh lời thoại trích dẫn sẽ dẫn đến đáp án.\n- Lời thoại “The lease agreement says management will hold packages for five days” (Hợp đồng cho thuê nói rằng ban quan lý sé giữ các kiện hàng trong năm ngày.) là thông tin chứa dap án. Người nói cho biết ban quản lý chỉ có thể giữ các kiện hàng trong 5 ngày trở lại thôi, nên có thể suy ra câu trích dẫn \"It's been ten days\" (Đã mười ngày rồi) ngụ ý rằng có một vấn đề liên quan đến việc giữ kiện hàng lâu hơn quy định trong hợp đồng.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "88. What does the speaker offer to do? (A) Open the door to a room (B) Reset a password (C) Send a copy of a document (D) Refund a payment",
   "transcript": "Hello, Mr. Smith. I hope you're getting settled into your office space in our building. I'm calling about some large packages that arrived for your company last week. We're keeping them for you in the storage room downstairs. The lease agreement says management will hold packages for five days. It's been ten days, Please give me a call and let me know when you can come down to claim them so I can be there to open the storage room door for you.",
   "explanationVi": "Đáp án đúng: A\n\n88. Người nói đề nghị làm gì?\n(A) Mở cửa một căn phòng\n(B) Đặt lại mật khâu\n(C) Gửi bản sao của tài liệu\n(D) Hoàn trả khoản thanh toán\nCách diễn đạt tương đương:\n- open the door to a room (mở cửa một căn phòng) = open the storage room door (mở cửa phòng trữ đồ)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what,speaker, offer to do\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “ | can be there to open the storage room door for you.\" (tôi có thể ở đó mở cửa phòng trữ đồ cho ông) cho thấy người nói đề nghị mở cửa một căn phòng (cụ thể là phòng trữ đồ) cho người nghe.\n- “open the door to a room” là cách diễn đạt tương đương của “open the storage room door\".\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (B), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- settled (adj): ổn định, cảm thấy thoải mái\n- office space (n-n): không gian văn phòng\n- package (n): kiện hàng\n- storage room (n-n): phòng lưu trữ\n- lease agreement (n-n): hợp đồng thuê\n- management (n): sự quản lý\n- claim (v): nhận, lấy lại"
  },
  {
   "number": 89,
   "part": 4,
   "answer": "D",
   "group": "89-91",
   "textEn": "89. What is mentioned about Ferndale Valley? (A) It is heavily forested. (B) It attracts many tourists. (C) It is developing quickly. (D) It is very windy.",
   "transcript": "Our next story concerns Ferndale Valley. It's well-known that the area is one of the windiest locations in the region, and one company would like to take advantage of that natural energy source. Breeze Capture hopes to install dozens of wind turbines by the end of next year. The company is looking for local farmers who are interested in leasing some of their land for the project. In addition to being paid for the land use, participants will also be compensated for the energy that is generated by the turbines. For more information, e-mail info@breezecapture.com.",
   "explanationVi": "Đáp án đúng: D\n\nĐiều gì được nhắc đến về Thung lũng Ferndale?\n(A) Nó có nhiêu rừng rậm.\n(B) Nó thu hút nhiêu khách du lịch.\n(C) Nó đang phát triên nhanh chóng.\n(D) Nó có rât nhiêu gió.\nCách diễn đạt tương đương:\n- very windy (có rất nhiều gió) ~ one of the windiest locations (một trong những điểm có gió mạnh nhất trong khu vực)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, mentioned, Ferndale Valley\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “Our next story concems Ferndale Valley. It's well-known that the area is one of the windiest locations in the region” ( Câu chuyện tiếp theo của chúng tôi liên quan đến Ferndale Valley. Nơi này được biết đến là một trong những điểm có gió mạnh nhất trong khu vực) cho thấy Thung lũng Ferndale là một địa điểm có rất nhiều gió.\n- \"very windy\" là cách diễn đạt tương đương của “one of the windiest location”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không được đề cập."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "90. Who will participate in a project? (A) Biologists (B) Farmers (C) Airline pilots (D) Real estate agents",
   "transcript": "Our next story concerns Ferndale Valley. It's well-known that the area is one of the windiest locations in the region, and one company would like to take advantage of that natural energy source. Breeze Capture hopes to install dozens of wind turbines by the end of next year. The company is looking for local farmers who are interested in leasing some of their land for the project. In addition to being paid for the land use, participants will also be compensated for the energy that is generated by the turbines. For more information, e-mail info@breezecapture.com.",
   "explanationVi": "Đáp án đúng: B\n\n90. Ai sẽ tham gia vào một dự án?\n(A) Các nhà sinh học\n(B) Những người nông dân\n(C) Những phi công hàng không\n(D) Những đại lý bất động sản\nCách diễn đạt tương đương:\n- farmers (những người nông dan) = local farmers (những người nông dân địa phương)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: who, participate, project\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “The company is looking for local farmers who are interested in leasing some of their land for the project.” (Công ty đang tìm kiếm những người nông dân địa phương quan tâm đến việc cho thuê một phần đất của họ cho dự án) cho thấy những người nông dân địa phương sẽ là đối tượng tham gia vào dự án bằng cách cho thuê đất của họ.\n- \"farmers\" là cách diễn đạt tương đương của “local farmers\".\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "91. What will the participants receive? (A) Tickets to an industry event (B) Technical assistance (C) Financial compensation (D) Advertising advice",
   "transcript": "Our next story concerns Ferndale Valley. It's well-known that the area is one of the windiest locations in the region, and one company would like to take advantage of that natural energy source. Breeze Capture hopes to install dozens of wind turbines by the end of next year. The company is looking for local farmers who are interested in leasing some of their land for the project. In addition to being paid for the land use, participants will also be compensated for the energy that is generated by the turbines. For more information, e-mail info@breezecapture.com.",
   "explanationVi": "Đáp án đúng: C\n\n91. Người tham gia sẽ nhận được gi?\n(A) Vé tham dự một sự kiện trong ngành\n(B) Sự hô trợ kỹ thuật\n(C) Sự bôi thường tài chính\n(D) Tư vấn quảng cáo\nCách diễn đạt tương đương:\n- compensation (sự bồi thường) ~ be compensated for (được bồi thường cho)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, participants, receive\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “In addition to being paid for the land use, participants will also be compensated for the energy that is generated by the turbines.” (Ngoài việc được trả tiền sử dụng đất, các tham gia viên cũng sẽ được bồi thường cho năng lượng được tạo ra bởi các cánh quạt gió.) là thông tin chứa đáp án. Từ lời thoại này có thể thấy những người tham gia sẽ nhận được một khoản tiền bồi thường.\n- “compensation” là cách diễn đạt tương đương của “be compensated for\". → Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- concern (v): liên quan đến senergy source (n): nguồn năng lượng\n- wind turbines (n): tuabin gió\n- land use (n): việc sử dụng đất đai\n- compensate (v): đền bù, bồi thường\n- generate (v): tạo ra, phát ra"
  },
  {
   "number": 92,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "92. What kind of business does the speaker work for? (A) A construction firm (B) A landscaping service (C) A storage company (D) An auto repair shop",
   "transcript": "Hello, Mr. Kimura. I'm calling from Feras Portable Storage. You recently ordered a container to store and move your household belongings in. I'm calling to confirm that your container will be delivered tomorrow morning at nine o'clock. The driver will place it in your driveway. After the delivery, if you could, please complete the customer feedback survey that well e-mail you. It will help us to improve our service. Thanks.",
   "explanationVi": "Đáp án đúng: C\n\nNgười nói làm việc cho loại hình kinh doanh nào?\n(A) Một công ty xây dựng\n(B) Dịch vụ cảnh quan\n(C) Một công ty lưu trữ\n(D) Một cửa hàng sửa chữa ô tô\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, kind of business, speaker, work\n- Dạng câu hỏi: Thông tin tổng quát\n- Cụm tt\" I'm calling from...” (Tôi gọi đến ter...) là dấu hiệu sắp đến đáp án. Lời thoại “I'm calling from Feras Portable Storage. You recently ordered a container to store and move your.\nhousehold belongings in” (Tôi gọi từ Feras Portable Storage. Gần đây ông gần đây đã đặt mua một chiếc container để lưu trữ và di chuyển tài sản gia đình của mình.) cho thấy người nói làm việc cho một công ty lưu trữ mang tên “Feras Portable Storage”.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "93. Why is the speaker calling? (A) To apologize for a cancellation (B) To confirm a delivery (C) To share a price quote (D) To update some contact information",
   "transcript": "Hello, Mr. Kimura. I'm calling from Feras Portable Storage. You recently ordered a container to store and move your household belongings in. I'm calling to confirm that your container will be delivered tomorrow morning at nine o'clock. The driver will place it in your driveway. After the delivery, if you could, please complete the customer feedback survey that well e-mail you. It will help us to improve our service. Thanks.",
   "explanationVi": "Đáp án đúng: B\n\n93. Tại sao người nói lại gọi?\n(A) Dé xin lỗi vì một sự hủy bỏ\n(B) Dé xác nhận việc giao hàng\n(C) Dé chia sẻ báo giá.\n(D) Đê cập nhật một sô thông tin liên lạc\nCách diễn đạt tương đương:\n- confirm a delivery (xác nhận việc giao hang) = confirm that your container will be delivered (xác nhận rằng container của ông sẽ được giao vào sáng mai)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: why, speaker, calling\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Cụm từ “I'm calling to...” (Tôi gọi dé...) là dấu hiệu sắp đến đáp án. Lời thoại “ I'm calling to confirm that your container will be delivered tomorrow morning at nine o'clock.” (Tôi gọi để xác nhận rằng container của ông sẽ được giao vào sáng mai lúc 9 giờ) chứng tỏ rằng mục đích cuộc\ngọi là để xác nhận ngày giờ giao hàng đến ông Kimura.\n- “confirm a delivery\" là cách diễn đạt tương đương của “confirm that your container will be delivered”.\n→ Phương án (B) là phù hợp nhất. Loại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "94. What does the speaker ask the listener to do? (A) Purchase a warranty (B) Complete a survey (C) Clean up an area (D) Apply for a permit",
   "transcript": "Hello, Mr. Kimura. I'm calling from Feras Portable Storage. You recently ordered a container to store and move your household belongings in. I'm calling to confirm that your container will be delivered tomorrow morning at nine o'clock. The driver will place it in your driveway. After the delivery, if you could, please complete the customer feedback survey that well e-mail you. It will help us to improve our service. Thanks.",
   "explanationVi": "Đáp án đúng: B\n\n94, Người nói yêu cầu người nghe làm gi?\n(A) Mua bảo hành\n(B) Hoàn thành một cuộc khảo sát\n(C) Dọn dẹp một khu vực\n(D) Xin giấy phép\nCách diễn đạt tương đương:\n- complete a survey (hoàn thành một cuộc khảo sát) ~ complete the customer feedback survey (hoàn thành bảng khảo sát phản hồi từ khách hàng)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, speaker, ask, listener, do\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “please complete the customer feedback survey that we'll e-mail you” (xin vui lòng hoàn thành bảng khảo sát phản hồi từ khách hàng mà chúng tôi sẽ gửi qua email cho ông.) là thông tin chứa đáp án. Từ lời thoại này có thể thấy người nói yêu cầu người nghe hoàn thành một bảng khảo sát phản hồi sau khi nhận được hàng.\n- \"complete a survey” là cách diễn đạt tương đương của “complete the customer feedback survey”.\n→ Phương án (B) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (C), (D) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- household belongings (n): tài sản gia đình\n- confirm (v): xác nhận\n- deliver (v): giao hàng\n- driveway (n): đường lái xe vào nhà\n- customer feedback survey (n): bảng khảo sát phản hồi từ khách hang\n- improve (v): cải thiện"
  },
  {
   "number": 95,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "95. What is the purpose of the talk? (A) To discuss a schedule (B) To consider changing suppliers (C) To train employees (D) To develop an inventory system",
   "transcript": "This is the custodial staff's cabinet for cleaning supplies. As part of your training, you'll be expected to learn which cleaning solutions are used for different surfaces in the hotel, such as carpet and tile flooring. The spray bottle on the top shelf, Baxlon, is for glass surfaces. The product directly under the spray bottle is brand new. It was just released this month, and it's excellent for polishing furniture. Oh, and every Tuesday at one o'clock, a delivery truck brings any supplies that we're low on. Don't forget to check that.",
   "explanationVi": "Đáp án đúng: C\n\n95. Mục dich của buổi nói chuyện là gi?\n(A) Đề thảo luận về lịch trình\n(B) Dé xem xét việc thay đồi nhà cung cấp\n(C) Đề đào tạo nhân viên\n(D) Để phát triển hệ thống kiểm kê\nCách diễn đạt tương đương:\n- train employees (đào tạo nhân viên) ~ as part of your training (là một phần trong quá trình đào tạo của bạn)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, purpose, the talk\n- Dạng câu hỏi: Thông tin tổng quát\n- Từ lời thoại “This is the custodial staff's cabinet for cleaning supplies. As part of your training, you'll be expected to learn which cleaning solutions are used for different surfaces in the hotel, such as carpet and tile flooring.” (Đây là tủ của nhân viên vệ sinh để chứa dụng cụ làm sạch. Là một phần của quá trình đào tạo của bạn, bạn sẽ được kỳ vọng để biết các dung dịch làm sạch nào được sử dụng cho các bề mặt khác nhau trong khách sạn, như thảm và sàn gạch) có thể suy ra được mục đích của buổi nói chuyện là để đào tạo nhân viên cách sử dụng đúng các dung dịch làm sạch cho các bề mặt khác nhau trong khách sạn.\n- \"train employees” là cách diễn đạt tương đương cua “as part of your training”. → Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "96. Look at the graphic. Which product does the speaker say is new? (A) Klennlee (B) Baxlon (C) Z-Factor (D) Clean Sure",
   "transcript": "This is the custodial staff's cabinet for cleaning supplies. As part of your training, you'll be expected to learn which cleaning solutions are used for different surfaces in the hotel, such as carpet and tile flooring. The spray bottle on the top shelf, Baxlon, is for glass surfaces. The product directly under the spray bottle is brand new. It was just released this month, and it's excellent for polishing furniture. Oh, and every Tuesday at one o'clock, a delivery truck brings any supplies that we're low on. Don't forget to check that.",
   "explanationVi": "Đáp án đúng: D\n\n96. Nhìn vào đồ họa. Sản phẩm nào người nói nói là mới?\n(A) Klennlee\n(B) Baxlon\n(C) Z-Factor\n(D) Clean Sure\nCách diễn đạt tương đương: - new (mới) ~ brand new (hoàn toàn mới)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, product, speaker, say, new\n- Dạng câu hỏi: liên quan tới biểu đồ/bảng biểu\n- Lời thoại “The spray bottle on the top shelf, Baxlon, is for glass surfaces. The product directly under the spray bottle is brand new.” (Chai phun ở kệ trên cùng, Baxlon, được sử dụng cho các bề mặt kính. Sản phẩm ngay dưới chai phun là mới hoàn toàn.) là thông tin chứa đáp án. Dựa vào lời thoại này và đối chiếu với hình vẽ minh họa, có thể thấy sản phẩm nằm dưới chai phun hiệu Baxlon là “Clean Sure”.\n- “new” là cách diễn đạt tương đương của “brand new”.\n→ Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không phù hợp."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "97. What happens at one o'clock on Tuesdays? (A) An expense report is due. (B) A work shift begins. (C) A staff meeting is held. (D) A delivery arrives.",
   "transcript": "This is the custodial staff's cabinet for cleaning supplies. As part of your training, you'll be expected to learn which cleaning solutions are used for different surfaces in the hotel, such as carpet and tile flooring. The spray bottle on the top shelf, Baxlon, is for glass surfaces. The product directly under the spray bottle is brand new. It was just released this month, and it's excellent for polishing furniture. Oh, and every Tuesday at one o'clock, a delivery truck brings any supplies that we're low on. Don't forget to check that.",
   "explanationVi": "Đáp án đúng: D\n\n97. Điều gì xảy ra vào lúc một giờ ngày thứ Ba?\n(A) Một báo cáo chi phí sap den hạn.\n(B) Một ca làm việc băt đâu. :\n(C) Một cuộc họp nhân viên được tô chức.\n(D) Hàng giao đên.\nCách diễn đạt tương đương:\n- on Tuesdays (vào các ngày thứ Ba) ~ every Tuesday (mỗi thứ Ba)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, happens, one o'clock, on Tuesdays\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “every Tuesday at one o'clock, a delivery truck brings any supplies that we're low on.” (mỗi thứ ba vào lúc một giờ, một chiếc xe tải giao hàng sẽ mang đến bất kỳ nguồn hàng nào\nmà chúng ta sắp hết.) là thông tin chứa đáp án. Từ lời thoại có thể thấy sẽ có một chuyến hang giao đến vào lúc một giờ mỗi thứ Ba hàng tuần.\n- “on Tuesdays” là cách diễn đạt tương đương của “every Tuesday”. → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- custodial staff (n): nhân viên vệ sinh\n- cabinet (n): tủ\n- cleaning supplies (n): dụng cụ vệ sinh\n- training (n): đào tao\n- cleaning solutions (n): dung dịch vệ sinh\n- spray bottle (n): chai xịt\n- glass surfaces (n): bề mặt kính\n- delivery truck (n): xe tải giao hàng"
  },
  {
   "number": 98,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "98. what is the topic of the course? (A) Marketing (B) Investing (C) Documentary filmmaking (D) Software development",
   "transcript": "Welcome back to this professional development workshop. We'll continue from where we left off in our discussion on advertising through social media using videos, and we'll end today's meeting by performing a group task. Last week, we discussed the planning phase for a video marketing campaign. Today, we'll move on to the production phase. During this phase, you'll need to ensure that high-quality equipment is used for lighting and camera work and that you have the best video editors you can get for the job. We're very lucky to have an expert here today to talk about her experience with the process. Please give your attention to Usha Madan.",
   "explanationVi": "Đáp án đúng: A\n\n98, Chủ đề của khóa học là gì?\n(A) Quảng cáo\n(B) Đầu tư\n(C) Làm phim tài liệu\n(D) Phát triển phần mềm\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, topic, course\n- Dạng câu hỏi: Thông tin tổng quát\n- Lời thoại “We'll continue from where we left off in our discussion on advertising through social media using videos” (Chúng ta sẽ tiếp tục từ chỗ chúng ta dừng lại trong cuộc thảo luận về quảng cáo qua mạng xã hội bằng video) là thông tin chứa đáp án. Từ lời thoại có thể xác định chủ đề\ncủa khóa học là về cách thức quảng cáo qua mạng xã hội bằng video.\n→ Phương án (A) là phù hợp nhất.\nLoại phương án sai:\n- (B) phương án bẫy. người nói có nhắc đến cụm từ “professional development workshop” (hội thảo phát triển nghề nghiệp), không phải là một hội thảo chuyên về phát triển phần mềm.\n- Các phương án (C), (D) chứa thông tin không được đề cập."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "99. Look at the graphic. Which step will be discussed today? (A) Step 1 (B) Step 2 (C) Step 3 (D) Step 4",
   "transcript": "Welcome back to this professional development workshop. We'll continue from where we left off in our discussion on advertising through social media using videos, and we'll end today's meeting by performing a group task. Last week, we discussed the planning phase for a video marketing campaign. Today, we'll move on to the production phase. During this phase, you'll need to ensure that high-quality equipment is used for lighting and camera work and that you have the best video editors you can get for the job. We're very lucky to have an expert here today to talk about her experience with the process. Please give your attention to Usha Madan.",
   "explanationVi": "Đáp án đúng: C\n\n99, Nhìn vào đồ họa. Bước nào sẽ được thảo luận trong hôm nay?\n(A) Bước 1\n(B) Bước 2\n(C) Bước 3\n(D) Bước 4\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: graphic, which step, discussed, today\n- Dạng câu hỏi: liên quan tới biểu đồ/bảng biểu\n- Từ lời thoại “Today, we'll move on to the production phase” (Hôm nay, chúng ta sẽ đến với giai đoạn sản xuất) có thể thấy bước được được thảo luận hôm nay là bước sản xuất. Khi đối chiều lên sơ đồ, bước sản xuất sẽ tương ứng với bước 3.\n→ Phương án (C) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (D) chứa thông tin không phù hợp."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "100. What will the listeners do next? (A) Read a handout (B) Watch a video (C) Take a coffee break (D) Listen to a guest speaker",
   "transcript": "Welcome back to this professional development workshop. We'll continue from where we left off in our discussion on advertising through social media using videos, and we'll end today's meeting by performing a group task. Last week, we discussed the planning phase for a video marketing campaign. Today, we'll move on to the production phase. During this phase, you'll need to ensure that high-quality equipment is used for lighting and camera work and that you have the best video editors you can get for the job. We're very lucky to have an expert here today to talk about her experience with the process. Please give your attention to Usha Madan.",
   "explanationVi": "Đáp án đúng: D\n\n100. Người nghe sẽ làm gì tiếp theo?\n(A) Đọc một tài liệu\n(B) Xem video\n(C) Nghỉ giải lao uông cà phê\n(D) Nghe một diễn giả khách mời\nCách diễn đạt tương đương:\n- listen to (lắng nghe) = give your attention to (dành sự chú ý đến)\nCách định vị vùng thông tin chứa đáp án:\n- Từ khóa trong câu hỏi: what, will, listeners, next\n- Dạng câu hỏi: Thông tin chỉ tiết\n- Lời thoại “We're very lucky to have an expert here today to talk about her experience with the process. Please give your attention to Usha Madan” (Chúng ta rất may mắn khi có một chuyên gia ở đây hôm nay để nói về kinh nghiệm của cô ấy với quá trình này. Xin vui lòng dành sự chú ý đến Usha Madan.) là thông tin chứa đáp án. Từ lời thoại có thể suy ra những người nghe sẽ lắng nghe những chia sẻ kinh nghiệm từ một vị khách mời.\n„\n- “listen to” là cách diễn đạt tương đương của “give your attention to”. → Phương án (D) là phù hợp nhất.\nLoại phương án sai:\n- Các phương án (A), (B), (C) chứa thông tin không được đề cập.\nTừ vựng cần chú ý:\n- social media (n): mạng xã hội\n- group task (n): nhiệm vụ nhóm\n- planning phase (n): giai đoạn lập kế hoạch\n- production phase (n): giai đoạn sản xuất\n- high-quality (adj): chất lượng cao\n- equipment (n): thiết bị\n- expert (n): chuyên gia\n- experience (n): kinh nghiệm"
  }
 ]
};

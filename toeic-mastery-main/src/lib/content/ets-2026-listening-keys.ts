import "server-only";

/** One Listening question's key from "ETS 2026 Listening — Script & Đáp án"
 * (Test 1–5): answer, English transcript (Part 1/2: the spoken lines; Part
 * 3/4: the conversation/talk only, never the printed questions — it may be
 * read aloud by TTS when a question has no audio), and a Vietnamese
 * explanation (translation of the transcript and, for Part 3/4, of the
 * question and its options). Imported into DB questions from
 * /admin/explanations. Answers are verified against both the per-question
 * "Đáp án" line and each file's quick answer table. */
export interface ListeningKeyQuestion {
  number: number;
  part: number;
  answer: string;
  /** "32-34" for Part 3/4 groups. */
  group?: string;
  /** Printed English text (question + options; Part 1: the options) —
   * used to match the key to the right DB question by content. */
  textEn: string;
  transcript: string;
  explanationVi: string;
}

/** A key from either ETS 2026 set — Reading keys carry no transcript. */
export type KeyQuestion = Omit<ListeningKeyQuestion, "transcript"> & { transcript?: string };

export const ETS_2026_LISTENING_KEYS: Record<number, ListeningKeyQuestion[]> = {
 "1": [
  {
   "number": 1,
   "part": 1,
   "answer": "B",
   "textEn": "(A) The woman is carrying a tray of food. (B) The woman is wearing a jacket. (C) The woman is tying up her hair. (D) The woman is removing her hat.",
   "transcript": "(A) The woman is carrying a tray of food.\n(B) The woman is wearing a jacket.\n(C) The woman is tying up her hair.\n(D) The woman is removing her hat.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Người phụ nữ đang bưng một khay thức ăn.\n(B) Người phụ nữ đang mặc một chiếc áo khoác.\n(C) Người phụ nữ đang buộc tóc.\n(D) Người phụ nữ đang cởi mũ."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Some people are standing next to a filing cabinet. (B) Some people are searching through a desk. (C) Some people are watching a presentation. (D) Some people are looking at a book.",
   "transcript": "(A) Some people are standing next to a filing cabinet.\n(B) Some people are searching through a desk.\n(C) Some people are watching a presentation.\n(D) Some people are looking at a book.",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Một số người đang đứng cạnh tủ đựng hồ sơ.\n(B) Một số người đang tìm kiếm đồ trong bàn làm việc.\n(C) Một số người đang xem một bài thuyết trình.\n(D) Một số người đang nhìn vào một cuốn sách."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "C",
   "textEn": "(A) A woman is holding a phone up to her ear. (B) A woman is pouring a beverage into a glass. (C) Some light fixtures are hanging from the ceiling. (D) Some tiles are being installed in a hallway.",
   "transcript": "(A) A woman is holding a phone up to her ear.\n(B) A woman is pouring a beverage into a glass.\n(C) Some light fixtures are hanging from the ceiling.\n(D) Some tiles are being installed in a hallway.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Một người phụ nữ đang áp điện thoại vào tai.\n(B) Một người phụ nữ đang rót đồ uống vào ly.\n(C) Một số đèn chiếu sáng đang treo trên trần nhà.\n(D) Một số viên gạch đang được lắp đặt ở hành lang."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "A",
   "textEn": "(A) A wooden crate is filled with vegetables. (B) One of the men is putting vegetables into a shopping bag. (C) A backpack has been set on the ground. (D) One of the men is reaching into a bucket.",
   "transcript": "(A) A wooden crate is filled with vegetables.\n(B) One of the men is putting vegetables into a shopping bag.\n(C) A backpack has been set on the ground.\n(D) One of the men is reaching into a bucket.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một chiếc thùng gỗ chứa đầy rau củ.\n(B) Một trong những người đàn ông đang cho rau vào túi mua hàng.\n(C) Một chiếc ba lô đã được đặt trên mặt đất.\n(D) Một trong những người đàn ông đang thò tay vào một cái xô."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "A",
   "textEn": "(A) Painting supplies have been laid out on the floor. (B) He's laying a brush down on a windowsill. (C) He's lifting a can of paint by its handle. (D) Cans of paint have been placed on a step stool.",
   "transcript": "(A) Painting supplies have been laid out on the floor.\n(B) He's laying a brush down on a windowsill.\n(C) He's lifting a can of paint by its handle.\n(D) Cans of paint have been placed on a step stool.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Các dụng cụ sơn đã được bày ra trên sàn nhà.\n(B) Anh ấy đang đặt một chiếc chổi sơn xuống bậu cửa sổ.\n(C) Anh ấy đang nhấc một lon sơn bằng tay cầm.\n(D) Những lon sơn đã được đặt trên một cái ghế bậc thang."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "C",
   "textEn": "(A) A path is covered with fallen branches. (B) A tree is lying across a grassy area. (C) Some water has pooled on a path. (D) Some cyclists are riding through a field.",
   "transcript": "(A) A path is covered with fallen branches.\n(B) A tree is lying across a grassy area.\n(C) Some water has pooled on a path.\n(D) Some cyclists are riding through a field.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Con đường bị bao phủ bởi những cành cây gãy.\n(B) Một cái cây đang nằm ngang qua một bãi cỏ.\n(C) Có nước đọng thành vũng trên đường.\n(D) Một số người đi xe đạp đang đi qua một cánh đồng."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "B",
   "textEn": "Where is the conference being held? (A) A three-day vacation. (B) At the Riverview Hotel. (C) In the supply cabinet.",
   "transcript": "Where is the conference being held?\n(A) A three-day vacation.\n(B) At the Riverview Hotel.\n(C) In the supply cabinet.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nHội nghị được tổ chức ở đâu?\n(A) Một kỳ nghỉ ba ngày.\n(B) Tại khách sạn Riverview.\n(C) Trong tủ vật tư."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "C",
   "textEn": "When does the warehouse manager arrive? (A) Sure, no problem. (B) About twelve shipping boxes. (C) Not until this afternoon.",
   "transcript": "When does the warehouse manager arrive?\n(A) Sure, no problem.\n(B) About twelve shipping boxes.\n(C) Not until this afternoon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nKhi nào quản lý kho hàng đến?\n(A) Chắc chắn rồi, không vấn đề gì.\n(B) Khoảng 12 thùng hàng.\n(C) Phải đến chiều nay."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "B",
   "textEn": "There's a nice park nearby, right? (A) Did you order paper for the copier? (B) Yes-it's next to Greendale Lake. (C) They're in the parking garage.",
   "transcript": "There's a nice park nearby, right?\n(A) Did you order paper for the copier?\n(B) Yes-it's next to Greendale Lake.\n(C) They're in the parking garage.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCó một công viên đẹp ở gần đây, đúng không?\n(A) Bạn đã đặt giấy cho máy photocopy chưa?\n(B) Đúng vậy - nó nằm cạnh hồ Greendale.\n(C) Họ đang ở trong nhà để xe."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "A",
   "textEn": "Who sent the meeting minutes to the accounting department? (A) Our office assistant. (B) They have a savings account. (C) Cash and credit cards.",
   "transcript": "Who sent the meeting minutes to the accounting department?\n(A) Our office assistant.\n(B) They have a savings account.\n(C) Cash and credit cards.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nAi đã gửi biên bản cuộc họp cho bộ phận kế toán?\n(A) Trợ lý văn phòng của chúng tôi.\n(B) Họ có một tài khoản tiết kiệm.\n(C) Tiền mặt và thẻ tín dụng."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "B",
   "textEn": "I'd like to know what you think of our new finance analyst. (A) I've prepared the decorations for tomorrow. (B) He seems very competent. (C) It's finally stopped raining.",
   "transcript": "I'd like to know what you think of our new finance analyst.\n(A) I've prepared the decorations for tomorrow.\n(B) He seems very competent.\n(C) It's finally stopped raining.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi muốn biết bạn nghĩ gì về nhà phân tích tài chính mới.\n(A) Tôi đã chuẩn bị đồ trang trí cho ngày mai.\n(B) Anh ấy có vẻ rất có năng lực.\n(C) Cuối cùng trời cũng tạnh mưa."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "B",
   "textEn": "Let's go on the company retreat. (A) Oh, did he? (B) Yes, that's a good idea. (C) He tried to solve that problem.",
   "transcript": "Let's go on the company retreat.\n(A) Oh, did he?\n(B) Yes, that's a good idea.\n(C) He tried to solve that problem.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nChúng ta hãy đi dã ngoại công ty đi.\n(A) Ồ, anh ấy đã làm vậy sao?\n(B) Vâng, đó là một ý kiến hay.\n(C) Anh ấy đã cố gắng giải quyết vấn đề đó."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "What time can I pick up my glasses? (A) No, it's not very heavy. (B) About twenty meters. (C) We close at six o'clock.",
   "transcript": "What time can I pick up my glasses?\n(A) No, it's not very heavy.\n(B) About twenty meters.\n(C) We close at six o'clock.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nMấy giờ tôi có thể lấy kính của mình?\n(A) Không, nó không nặng lắm.\n(B) Khoảng 20 mét.\n(C) Chúng tôi đóng cửa lúc 6 giờ."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "C",
   "textEn": "The sales team knows how to use the tracking software, don't they? (A) It's on the lower shelf. (B) A twelve-thirty departure. (C) I haven't seen them using it yet.",
   "transcript": "The sales team knows how to use the tracking software, don't they?\n(A) It's on the lower shelf.\n(B) A twelve-thirty departure.\n(C) I haven't seen them using it yet.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nNhóm bán hàng biết cách sử dụng phần mềm theo dõi, đúng không?\n(A) Nó ở ngăn dưới.\n(B) Chuyến khởi hành lúc 12:30.\n(C) Tôi vẫn chưa thấy họ sử dụng nó."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "A",
   "textEn": "Are you going to the hardware store on Mill Street? (A) That store hasn't opened yet. (B) The blue package you sent me. (C) Some nails and a hammer.",
   "transcript": "Are you going to the hardware store on Mill Street?\n(A) That store hasn't opened yet.\n(B) The blue package you sent me.\n(C) Some nails and a hammer.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn có định đến cửa hàng ngũ kim trên phố Mill không?\n(A) Cửa hàng đó vẫn chưa mở cửa.\n(B) Gói hàng màu xanh bạn gửi cho tôi.\n(C) Một vài chiếc đinh và một cái búa."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "B",
   "textEn": "Would you be able to write the introduction for the workshop? (A) That was a great book. (B) OK, I'd be happy to. (C) He doesn't have any more.",
   "transcript": "Would you be able to write the introduction for the workshop?\n(A) That was a great book.\n(B) OK, I'd be happy to.\n(C) He doesn't have any more.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn có thể viết lời giới thiệu cho hội thảo được không?\n(A) Đó là một cuốn sách tuyệt vời.\n(B) Được chứ, tôi rất sẵn lòng.\n(C) Anh ấy không còn cái nào nữa."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "B",
   "textEn": "I picked up some flowers for Tunji's retirement party. (A) No, pick any day. (B) That was thoughtful. (C) A delivery driver.",
   "transcript": "I picked up some flowers for Tunji's retirement party.\n(A) No, pick any day.\n(B) That was thoughtful.\n(C) A delivery driver.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi đã mua một ít hoa cho tiệc nghỉ hưu của Tunji.\n(A) Không, hãy chọn bất kỳ ngày nào.\n(B) Thật là chu đáo.\n(C) Một tài xế giao hàng."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "A",
   "textEn": "Which meeting room did you tell the interns to go to? (A) The Jefferson Room. (B) The meeting was fun, thanks. (C) Yes, it's a conference call.",
   "transcript": "Which meeting room did you tell the interns to go to?\n(A) The Jefferson Room.\n(B) The meeting was fun, thanks.\n(C) Yes, it's a conference call.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn đã bảo các thực tập sinh đi đến phòng họp nào?\n(A) Phòng Jefferson.\n(B) Cuộc họp rất vui, cảm ơn.\n(C) Vâng, đó là một cuộc họp qua điện thoại."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "B",
   "textEn": "Is your dental appointment next Tuesday? (A) You can borrow mine. (B) I'll have to check my calendar. (C) Yes, it was a good meeting.",
   "transcript": "Is your dental appointment next Tuesday?\n(A) You can borrow mine.\n(B) I'll have to check my calendar.\n(C) Yes, it was a good meeting.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCuộc hẹn nha khoa của bạn là vào thứ Ba tới phải không?\n(A) Bạn có thể mượn cái của tôi.\n(B) Tôi sẽ phải kiểm tra lịch của mình.\n(C) Vâng, đó là một cuộc họp tốt."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "Why aren't there any brochures in the lobby? (A) No, I haven't received my confirmation e-mail yet. (B) My winter coat. (C) Because someone just took the last one.",
   "transcript": "Why aren't there any brochures in the lobby?\n(A) No, I haven't received my confirmation e-mail yet.\n(B) My winter coat.\n(C) Because someone just took the last one.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTại sao không có bất kỳ tập quảng cáo nào ở sảnh?\n(A) Không, tôi vẫn chưa nhận được email xác nhận.\n(B) Áo khoác mùa đông của tôi.\n(C) Vì ai đó vừa mới lấy cái cuối cùng rồi."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "A",
   "textEn": "What's the process for submitting my expense report? (A) You send it to the finance department. (B) The end of the day. (C) That's correct.",
   "transcript": "What's the process for submitting my expense report?\n(A) You send it to the finance department.\n(B) The end of the day.\n(C) That's correct.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nQuy trình nộp báo cáo chi phí của tôi là gì?\n(A) Bạn gửi nó cho bộ phận tài chính.\n(B) Cuối ngày.\n(C) Đúng vậy."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "C",
   "textEn": "Do you sell your products online or in stores? (A) About twenty percent off. (B) A product demonstration. (C) Only online.",
   "transcript": "Do you sell your products online or in stores?\n(A) About twenty percent off.\n(B) A product demonstration.\n(C) Only online.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn bán sản phẩm trực tuyến hay tại cửa hàng?\n(A) Giảm giá khoảng 20%.\n(B) Một buổi trình diễn sản phẩm.\n(C) Chỉ bán trực tuyến."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "A",
   "textEn": "How often do you charge this device? (A) Whenever the light turns red. (B) A wireless one. (C) At the hardware store.",
   "transcript": "How often do you charge this device?\n(A) Whenever the light turns red.\n(B) A wireless one.\n(C) At the hardware store.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn có thường xuyên sạc thiết bị này không?\n(A) Bất cứ khi nào đèn chuyển sang màu đỏ.\n(B) Một cái không dây.\n(C) Tại cửa hàng ngũ kim."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "A",
   "textEn": "The tickets to Friday night's concert cost ten dollars each. (A) Actually, they're fifteen. (B) No, I can't play the guitar. (C) It's in aisle five.",
   "transcript": "The tickets to Friday night's concert cost ten dollars each.\n(A) Actually, they're fifteen.\n(B) No, I can't play the guitar.\n(C) It's in aisle five.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nVé xem buổi hòa nhạc tối thứ Sáu giá 10 đô la mỗi vé.\n(A) Thực ra, chúng có giá 15 đô la.\n(B) Không, tôi không biết chơi ghi-ta.\n(C) Nó ở lối đi số 5."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "A",
   "textEn": "Can't you update the database today? (A) I did it yesterday. (B) That's an interesting movie. (C) No, just me.",
   "transcript": "Can't you update the database today?\n(A) I did it yesterday.\n(B) That's an interesting movie.\n(C) No, just me.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn không thể cập nhật cơ sở dữ liệu hôm nay sao?\n(A) Tôi đã làm việc đó hôm qua rồi.\n(B) Đó là một bộ phim thú vị.\n(C) Không, chỉ có tôi thôi."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "B",
   "textEn": "How are we going to fit the extra supplies in that closet? (A) I've already read them. (B) Natalie's in charge of supplies. (C) It's the door at the end of the hallway.",
   "transcript": "How are we going to fit the extra supplies in that closet?\n(A) I've already read them.\n(B) Natalie's in charge of supplies.\n(C) It's the door at the end of the hallway.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nLàm thế nào để chúng ta xếp thêm vật tư vào cái tủ đó?\n(A) Tôi đã đọc chúng rồi.\n(B) Natalie phụ trách vật tư.\n(C) Đó là cánh cửa ở cuối hành lang."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "B",
   "textEn": "Have all the new windows been installed? (A) Sure, I'll close the blinds. (B) The construction crew is almost finished. (C) This isn't the tallest ladder available.",
   "transcript": "Have all the new windows been installed?\n(A) Sure, I'll close the blinds.\n(B) The construction crew is almost finished.\n(C) This isn't the tallest ladder available.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTất cả các cửa sổ mới đã được lắp đặt xong chưa?\n(A) Chắc chắn rồi, tôi sẽ đóng rèm.\n(B) Đội thi công gần như đã hoàn thành.\n(C) Đây không phải là cái thang cao nhất hiện có."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "Would you rather go to lunch now or at noon? (A) I'm taking a client to lunch. (B) On the corner of Fourth and Main. (C) The daily special is soup and a sandwich.",
   "transcript": "Would you rather go to lunch now or at noon?\n(A) I'm taking a client to lunch.\n(B) On the corner of Fourth and Main.\n(C) The daily special is soup and a sandwich.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn muốn đi ăn trưa bây giờ hay vào buổi trưa?\n(A) Tôi đang đưa một khách hàng đi ăn trưa.\n(B) Ở góc đường số 4 và phố Main.\n(C) Món đặc biệt hàng ngày là súp và bánh mì kẹp."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "You're taking the training in the afternoon, aren't you? (A) The new head of the accounting department. (B) No, I take my coffee black. (C) Well, it depends on my schedule.",
   "transcript": "You're taking the training in the afternoon, aren't you?\n(A) The new head of the accounting department.\n(B) No, I take my coffee black.\n(C) Well, it depends on my schedule.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn sẽ tham gia đào tạo vào buổi chiều, đúng không?\n(A) Trưởng bộ phận kế toán mới.\n(B) Không, tôi uống cà phê đen.\n(C) Chà, nó còn tùy thuộc vào lịch trình của tôi."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "C",
   "textEn": "Shouldn't Ms. Ishida look over the financial projections? (A) I just got this monitor. (B) To the south entrance. (C) I'm meeting with her at ten.",
   "transcript": "Shouldn't Ms. Ishida look over the financial projections?\n(A) I just got this monitor.\n(B) To the south entrance.\n(C) I'm meeting with her at ten.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nChẳng phải bà Ishida nên xem qua các dự báo tài chính sao?\n(A) Tôi vừa mới nhận được cái màn hình này.\n(B) Đến lối vào phía Nam.\n(C) Tôi sẽ họp với bà ấy lúc 10 giờ."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "C",
   "textEn": "When are you going to choose a new project manager? (A) The projector's not working correctly. (B) Next to the front entrance. (C) I'm really busy this week.",
   "transcript": "When are you going to choose a new project manager?\n(A) The projector's not working correctly.\n(B) Next to the front entrance.\n(C) I'm really busy this week.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nKhi nào bạn định chọn quản lý dự án mới?\n(A) Máy chiếu hoạt động không đúng cách.\n(B) Cạnh lối vào phía trước.\n(C) Tuần này tôi thực sự rất bận."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "32. What type of food product does the speakers' company sell? (A) Candy (B) Cheese (C) Bread (D) Pasta",
   "transcript": "W: Hey, Oliver. Did you see the focus group results for our new spicy cheddar cheese? Everyone really liked it.\nM: Yes. It should be a great addition to our company's line of cheeses.\nW: Several people mentioned that they'd like to use it in recipes-to add to sauces, for example.\nM: So maybe we should consider selling a shredded version that would melt easily when cooked.\nW: I'm sure we could do that. I'll get in touch with the production manager with that request.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n32. Công ty của những người nói bán loại thực phẩm nào?\n(A) Kẹo\n(B) Phô mai\n(C) Bánh mì\n(D) Mì Ý\n\nDịch hội thoại:\nNữ: Này Oliver. Anh đã thấy kết quả khảo sát nhóm khách hàng mục tiêu cho loại phô mai cheddar cay mới của chúng ta chưa? Mọi người thực sự rất thích nó.\nNam: Vâng. Nó sẽ là một sự bổ sung tuyệt vời cho dòng phô mai của công ty chúng ta.\nNữ: Một vài người đề cập rằng họ muốn sử dụng nó trong các công thức nấu ăn - ví dụ như thêm vào nước sốt.\nNam: Vậy có lẽ chúng ta nên cân nhắc bán phiên bản dạng bào sợi để nó có thể tan chảy dễ dàng khi nấu.\nNữ: Tôi chắc chắn chúng ta có thể làm được. Tôi sẽ liên lạc với quản lý sản xuất về yêu cầu đó."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "33. What does the man suggest? (A) Lowering prices (B) Hiring more workers (C) Publishing a recipe (D) Offering additional options",
   "transcript": "W: Hey, Oliver. Did you see the focus group results for our new spicy cheddar cheese? Everyone really liked it.\nM: Yes. It should be a great addition to our company's line of cheeses.\nW: Several people mentioned that they'd like to use it in recipes-to add to sauces, for example.\nM: So maybe we should consider selling a shredded version that would melt easily when cooked.\nW: I'm sure we could do that. I'll get in touch with the production manager with that request.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n33. Người đàn ông đề xuất điều gì?\n(A) Giảm giá\n(B) Thuê thêm nhân công\n(C) Công bố một công thức nấu ăn\n(D) Cung cấp thêm các lựa chọn bổ sung\n\nDịch hội thoại:\nNữ: Này Oliver. Anh đã thấy kết quả khảo sát nhóm khách hàng mục tiêu cho loại phô mai cheddar cay mới của chúng ta chưa? Mọi người thực sự rất thích nó.\nNam: Vâng. Nó sẽ là một sự bổ sung tuyệt vời cho dòng phô mai của công ty chúng ta.\nNữ: Một vài người đề cập rằng họ muốn sử dụng nó trong các công thức nấu ăn - ví dụ như thêm vào nước sốt.\nNam: Vậy có lẽ chúng ta nên cân nhắc bán phiên bản dạng bào sợi để nó có thể tan chảy dễ dàng khi nấu.\nNữ: Tôi chắc chắn chúng ta có thể làm được. Tôi sẽ liên lạc với quản lý sản xuất về yêu cầu đó."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "34. What does the woman say she will do? (A) Send a schedule update (B) Contact a production manager (C) Visit the company headquarters (D) Plan an advertising campaign",
   "transcript": "W: Hey, Oliver. Did you see the focus group results for our new spicy cheddar cheese? Everyone really liked it.\nM: Yes. It should be a great addition to our company's line of cheeses.\nW: Several people mentioned that they'd like to use it in recipes-to add to sauces, for example.\nM: So maybe we should consider selling a shredded version that would melt easily when cooked.\nW: I'm sure we could do that. I'll get in touch with the production manager with that request.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n34. Người phụ nữ nói cô ấy sẽ làm gì?\n(A) Gửi cập nhật lịch trình\n(B) Liên lạc với quản lý sản xuất\n(C) Thăm trụ sở chính của công ty\n(D) Lập kế hoạch cho một chiến dịch quảng cáo\n\nDịch hội thoại:\nNữ: Này Oliver. Anh đã thấy kết quả khảo sát nhóm khách hàng mục tiêu cho loại phô mai cheddar cay mới của chúng ta chưa? Mọi người thực sự rất thích nó.\nNam: Vâng. Nó sẽ là một sự bổ sung tuyệt vời cho dòng phô mai của công ty chúng ta.\nNữ: Một vài người đề cập rằng họ muốn sử dụng nó trong các công thức nấu ăn - ví dụ như thêm vào nước sốt.\nNam: Vậy có lẽ chúng ta nên cân nhắc bán phiên bản dạng bào sợi để nó có thể tan chảy dễ dàng khi nấu.\nNữ: Tôi chắc chắn chúng ta có thể làm được. Tôi sẽ liên lạc với quản lý sản xuất về yêu cầu đó."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "35. Why is the man calling? (A) To sign up for lessons (B) To enter a competition (C) To buy tickets to an event (D) To ask about branded merchandise",
   "transcript": "M: Hi. I'm calling to book three tickets for this Thursday's tennis match. Are there any seats left?\nW: Just a few! Tickets for Thursday's match have been selling quickly.\nM: I'm not surprised! After all, Ife Rotimi won the regional championship tournament last month. Everyone wants to see her play after her incredible performance.\nW: Well, there's only one group of three seats together. Advance payment is required to hold them.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n35. Tại sao người đàn ông gọi điện?\n(A) Để đăng ký các bài học\n(B) Để tham gia một cuộc thi\n(C) Để mua vé xem một sự kiện\n(D) Để hỏi về hàng hóa có thương hiệu\n\nDịch hội thoại:\nNam: Xin chào. Tôi gọi điện để đặt ba vé cho trận đấu quần vợt vào thứ Năm này. Còn chỗ trống nào không?\nNữ: Chỉ còn vài chỗ thôi! Vé cho trận đấu thứ Năm đang bán rất nhanh.\nNam: Tôi không ngạc nhiên đâu! Suy cho cùng, Ife Rotimi đã giành chức vô địch giải đấu khu vực vào tháng trước. Mọi người đều muốn xem cô ấy thi đấu sau màn trình diễn đáng kinh ngạc đó.\nNữ: Chà, chỉ còn duy nhất một cụm ba ghế cạnh nhau. Cần phải thanh toán trước để giữ chỗ."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "36. What did Ife Rotimi do last month? (A) She won a regional tournament. (B) She gave a television interview. (C) She started an institute. (D) She hired a new coach.",
   "transcript": "M: Hi. I'm calling to book three tickets for this Thursday's tennis match. Are there any seats left?\nW: Just a few! Tickets for Thursday's match have been selling quickly.\nM: I'm not surprised! After all, Ife Rotimi won the regional championship tournament last month. Everyone wants to see her play after her incredible performance.\nW: Well, there's only one group of three seats together. Advance payment is required to hold them.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n36. Ife Rotimi đã làm gì vào tháng trước?\n(A) Cô ấy đã thắng một giải đấu khu vực.\n(B) Cô ấy đã thực hiện một cuộc phỏng vấn truyền hình.\n(C) Cô ấy đã thành lập một học viện.\n(D) Cô ấy đã thuê một huấn luyện viên mới.\n\nDịch hội thoại:\nNam: Xin chào. Tôi gọi điện để đặt ba vé cho trận đấu quần vợt vào thứ Năm này. Còn chỗ trống nào không?\nNữ: Chỉ còn vài chỗ thôi! Vé cho trận đấu thứ Năm đang bán rất nhanh.\nNam: Tôi không ngạc nhiên đâu! Suy cho cùng, Ife Rotimi đã giành chức vô địch giải đấu khu vực vào tháng trước. Mọi người đều muốn xem cô ấy thi đấu sau màn trình diễn đáng kinh ngạc đó.\nNữ: Chà, chỉ còn duy nhất một cụm ba ghế cạnh nhau. Cần phải thanh toán trước để giữ chỗ."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "37. What does the woman say is required? (A) A parking permit (B) A photo ID (C) Contact information (D) Advance payment",
   "transcript": "M: Hi. I'm calling to book three tickets for this Thursday's tennis match. Are there any seats left?\nW: Just a few! Tickets for Thursday's match have been selling quickly.\nM: I'm not surprised! After all, Ife Rotimi won the regional championship tournament last month. Everyone wants to see her play after her incredible performance.\nW: Well, there's only one group of three seats together. Advance payment is required to hold them.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n37. Người phụ nữ nói điều gì là bắt buộc?\n(A) Giấy phép đậu xe\n(B) Giấy tờ tùy thân có ảnh\n(C) Thông tin liên lạc\n(D) Thanh toán trước\n\nDịch hội thoại:\nNam: Xin chào. Tôi gọi điện để đặt ba vé cho trận đấu quần vợt vào thứ Năm này. Còn chỗ trống nào không?\nNữ: Chỉ còn vài chỗ thôi! Vé cho trận đấu thứ Năm đang bán rất nhanh.\nNam: Tôi không ngạc nhiên đâu! Suy cho cùng, Ife Rotimi đã giành chức vô địch giải đấu khu vực vào tháng trước. Mọi người đều muốn xem cô ấy thi đấu sau màn trình diễn đáng kinh ngạc đó.\nNữ: Chà, chỉ còn duy nhất một cụm ba ghế cạnh nhau. Cần phải thanh toán trước để giữ chỗ."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "38. What event are the speakers planning? (A) A fund-raising dinner (B) An art gallery opening (C) An awards ceremony (D) A children's book fair",
   "transcript": "W: Thanks for agreeing to help me organize the library's annual fund-raising dinner, Klaus. We hope the event brings in enough money to expand our children's book section.\nM: What task would you like me to start with?\nW: Well, I could use some help sending out the invitations.\nM: OK, I can take care of that. Is there a list of attendees available?\nW: It's in my computer files. I'll e-mail it to you.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n38. Các diễn giả đang lên kế hoạch cho sự kiện gì?\n(A) Một bữa tối gây quỹ\n(B) Khai trương phòng trưng bày nghệ thuật\n(C) Một lễ trao giải\n(D) Một hội chợ sách thiếu nhi\n\nDịch hội thoại:\nNữ: Cảm ơn anh đã đồng ý giúp tôi tổ chức bữa tiệc tối gây quỹ thường niên của thư viện, Klaus. Chúng tôi hy vọng sự kiện sẽ mang lại đủ tiền để mở rộng phần sách dành cho thiếu nhi.\nNam: Tôi nên bắt đầu với công việc nào đây?\nNữ: Chà, tôi cần sự giúp đỡ trong việc gửi thư mời.\nNam: Được rồi, tôi có thể đảm nhận việc đó. Có sẵn danh sách người tham dự không?\nNữ: Nó nằm trong tệp máy tính của tôi. Tôi sẽ gửi email cho anh."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What task does the woman ask the man to help with? (A) Arranging a shuttle service (B) Choosing a catering firm (C) Preparing a speech (D) Sending out invitations",
   "transcript": "W: Thanks for agreeing to help me organize the library's annual fund-raising dinner, Klaus. We hope the event brings in enough money to expand our children's book section.\nM: What task would you like me to start with?\nW: Well, I could use some help sending out the invitations.\nM: OK, I can take care of that. Is there a list of attendees available?\nW: It's in my computer files. I'll e-mail it to you.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n39. Người phụ nữ nhờ người đàn ông giúp đỡ việc gì?\n(A) Sắp xếp dịch vụ xe đưa đón\n(B) Chọn một công ty cung cấp tiệc tận nơi\n(C) Chuẩn bị bài phát biểu\n(D) Gửi thiệp mời\n\nDịch hội thoại:\nNữ: Cảm ơn anh đã đồng ý giúp tôi tổ chức bữa tiệc tối gây quỹ thường niên của thư viện, Klaus. Chúng tôi hy vọng sự kiện sẽ mang lại đủ tiền để mở rộng phần sách dành cho thiếu nhi.\nNam: Tôi nên bắt đầu với công việc nào đây?\nNữ: Chà, tôi cần sự giúp đỡ trong việc gửi thư mời.\nNam: Được rồi, tôi có thể đảm nhận việc đó. Có sẵn danh sách người tham dự không?\nNữ: Nó nằm trong tệp máy tính của tôi. Tôi sẽ gửi email cho anh."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "40. What does the woman say she will do? (A) E-mail a list (B) Speak with a colleague (C) Provide a password (D) Post a job opening",
   "transcript": "W: Thanks for agreeing to help me organize the library's annual fund-raising dinner, Klaus. We hope the event brings in enough money to expand our children's book section.\nM: What task would you like me to start with?\nW: Well, I could use some help sending out the invitations.\nM: OK, I can take care of that. Is there a list of attendees available?\nW: It's in my computer files. I'll e-mail it to you.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n40. What does the woman say she will do?\n(A) E-mail a list\n(B) Speak with a colleague\n(C) Provide a password\n(D) Post a job opening\n\nDịch hội thoại:\nNữ: Cảm ơn anh đã đồng ý giúp tôi tổ chức bữa tiệc tối gây quỹ thường niên của thư viện, Klaus. Chúng tôi hy vọng sự kiện sẽ mang lại đủ tiền để mở rộng phần sách dành cho thiếu nhi.\nNam: Tôi nên bắt đầu với công việc nào đây?\nNữ: Chà, tôi cần sự giúp đỡ trong việc gửi thư mời.\nNam: Được rồi, tôi có thể đảm nhận việc đó. Có sẵn danh sách người tham dự không?\nNữ: Nó nằm trong tệp máy tính của tôi. Tôi sẽ gửi email cho anh."
  },
  {
   "number": 41,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "41. What event are the speakers preparing for? (A) A new-employee orientation (B) A grand opening (C) A community festival (D) A trade show",
   "transcript": "W: Hey, Brian and Matteo. I found some great pens to give away at the community festival to promote our business.\nM1: Great. Can we put our cleaning service logo on them?\nW: Yes, for no extra charge. And they're biodegradable. They're made from paper.\nM2: So when we hand them out, we can mention that.\nM1: As well as talk about the organic cleaning supplies our company uses.\nW: OK. I'll go ahead and order several cases.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n41. Các diễn giả đang chuẩn bị cho sự kiện gì?\n(A) Buổi định hướng nhân viên mới\n(B) Lễ khai trương\n(C) Một lễ hội cộng đồng\n(D) Một hội chợ triển lãm thương mại\n\nDịch hội thoại:\nNữ: Chào Brian và Matteo. Tôi đã tìm thấy một số chiếc bút rất tuyệt để phát tặng tại lễ hội cộng đồng nhằm quảng bá doanh nghiệp của chúng ta.\nNam 1: Tuyệt quá. Chúng ta có thể in logo dịch vụ vệ sinh của mình lên đó không?\nNữ: Có chứ, không mất thêm phí đâu. Và chúng có thể phân hủy sinh học. Chúng được làm từ giấy.\nNam 2: Vậy khi chúng ta phát bút, chúng ta có thể đề cập đến điều đó.\nNam 1: Cũng như nói về các vật dụng vệ sinh hữu cơ mà công ty chúng ta sử dụng.\nNữ: Được rồi. Tôi sẽ tiến hành đặt hàng vài thùng."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "42. What is mentioned about some pens? (A) They are available in multiple colors. (B) They use permanent ink. (C) They are preferred by book authors. (D) They are made from paper.",
   "transcript": "W: Hey, Brian and Matteo. I found some great pens to give away at the community festival to promote our business.\nM1: Great. Can we put our cleaning service logo on them?\nW: Yes, for no extra charge. And they're biodegradable. They're made from paper.\nM2: So when we hand them out, we can mention that.\nM1: As well as talk about the organic cleaning supplies our company uses.\nW: OK. I'll go ahead and order several cases.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n42. Điều gì được đề cập về một số chiếc bút?\n(A) Chúng có nhiều màu sắc khác nhau.\n(B) Chúng sử dụng mực vĩnh cửu.\n(C) Chúng được các tác giả sách ưa chuộng.\n(D) Chúng được làm từ giấy.\n\nDịch hội thoại:\nNữ: Chào Brian và Matteo. Tôi đã tìm thấy một số chiếc bút rất tuyệt để phát tặng tại lễ hội cộng đồng nhằm quảng bá doanh nghiệp của chúng ta.\nNam 1: Tuyệt quá. Chúng ta có thể in logo dịch vụ vệ sinh của mình lên đó không?\nNữ: Có chứ, không mất thêm phí đâu. Và chúng có thể phân hủy sinh học. Chúng được làm từ giấy.\nNam 2: Vậy khi chúng ta phát bút, chúng ta có thể đề cập đến điều đó.\nNam 1: Cũng như nói về các vật dụng vệ sinh hữu cơ mà công ty chúng ta sử dụng.\nNữ: Được rồi. Tôi sẽ tiến hành đặt hàng vài thùng."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "43. What does the woman offer to do? (A) Reserve a booth (B) Place an order (C) Organize a focus group (D) Revise a budget",
   "transcript": "W: Hey, Brian and Matteo. I found some great pens to give away at the community festival to promote our business.\nM1: Great. Can we put our cleaning service logo on them?\nW: Yes, for no extra charge. And they're biodegradable. They're made from paper.\nM2: So when we hand them out, we can mention that.\nM1: As well as talk about the organic cleaning supplies our company uses.\nW: OK. I'll go ahead and order several cases.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n43. Người phụ nữ đề nghị làm gì?\n(A) Đặt một gian hàng\n(B) Đặt hàng\n(C) Tổ chức một nhóm khảo sát tập trung\n(D) Xem xét lại ngân sách\n\nDịch hội thoại:\nNữ: Chào Brian và Matteo. Tôi đã tìm thấy một số chiếc bút rất tuyệt để phát tặng tại lễ hội cộng đồng nhằm quảng bá doanh nghiệp của chúng ta.\nNam 1: Tuyệt quá. Chúng ta có thể in logo dịch vụ vệ sinh của mình lên đó không?\nNữ: Có chứ, không mất thêm phí đâu. Và chúng có thể phân hủy sinh học. Chúng được làm từ giấy.\nNam 2: Vậy khi chúng ta phát bút, chúng ta có thể đề cập đến điều đó.\nNam 1: Cũng như nói về các vật dụng vệ sinh hữu cơ mà công ty chúng ta sử dụng.\nNữ: Được rồi. Tôi sẽ tiến hành đặt hàng vài thùng."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "44. Where does the woman work? (A) At a delivery service (B) At an electronics store (C) At a recycling facility (D) At a real estate agency",
   "transcript": "W: Jamestown Recycling Facility. How can I help you?\nM: Hi. I'm preparing to move soon, and I have some electronics, such as televisions and computers, that I'd like to get rid of before I put my house on the market.\nW: Yes, that's right. We'll take all electronics.\nM: Great. I just have one question. Do you provide a pickup service?\nW: No, unfortunately you'll have to bring everything here yourself. However, on our Web site we list a number of companies that can remove and dispose of the items for you.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n44. Người phụ nữ làm việc ở đâu?\n(A) Tại một dịch vụ giao hàng\n(B) Tại một cửa hàng điện tử\n(C) Tại một cơ sở tái chế\n(D) Tại một công ty bất động sản\n\nDịch hội thoại:\nNữ: Cơ sở tái chế Jamestown xin nghe. Tôi có thể giúp gì cho ông?\nNam: Chào cô. Tôi sắp chuyển nhà và tôi có một số thiết bị điện tử như tivi, máy tính muốn bỏ đi trước khi rao bán nhà.\nNữ: Vâng, đúng vậy. Chúng tôi nhận tất cả các thiết bị điện tử.\nNam: Tuyệt. Tôi chỉ có một câu hỏi. Các bạn có cung cấp dịch vụ đến tận nơi lấy hàng không?\nNữ: Không, tiếc là ông sẽ phải tự mang mọi thứ đến đây. Tuy nhiên, trên trang web của chúng tôi có liệt kê một số công ty có thể đến dọn dẹp và xử lý các món đồ đó giúp ông."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "45. What does the man want to dispose of? (A) Yard waste (B) Used furniture (C) Electronics (D) Books",
   "transcript": "W: Jamestown Recycling Facility. How can I help you?\nM: Hi. I'm preparing to move soon, and I have some electronics, such as televisions and computers, that I'd like to get rid of before I put my house on the market.\nW: Yes, that's right. We'll take all electronics.\nM: Great. I just have one question. Do you provide a pickup service?\nW: No, unfortunately you'll have to bring everything here yourself. However, on our Web site we list a number of companies that can remove and dispose of the items for you.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n45. Người đàn ông muốn vứt bỏ cái gì?\n(A) Rác thải sân vườn\n(B) Đồ nội thất cũ\n(C) Đồ điện tử\n(D) Sách\n\nDịch hội thoại:\nNữ: Cơ sở tái chế Jamestown xin nghe. Tôi có thể giúp gì cho ông?\nNam: Chào cô. Tôi sắp chuyển nhà và tôi có một số thiết bị điện tử như tivi, máy tính muốn bỏ đi trước khi rao bán nhà.\nNữ: Vâng, đúng vậy. Chúng tôi nhận tất cả các thiết bị điện tử.\nNam: Tuyệt. Tôi chỉ có một câu hỏi. Các bạn có cung cấp dịch vụ đến tận nơi lấy hàng không?\nNữ: Không, tiếc là ông sẽ phải tự mang mọi thứ đến đây. Tuy nhiên, trên trang web của chúng tôi có liệt kê một số công ty có thể đến dọn dẹp và xử lý các món đồ đó giúp ông."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "46. What does the woman say can be found on a Web site? (A) A list of companies (B) Hours of operation (C) A permit application (D) Directions to a site",
   "transcript": "W: Jamestown Recycling Facility. How can I help you?\nM: Hi. I'm preparing to move soon, and I have some electronics, such as televisions and computers, that I'd like to get rid of before I put my house on the market.\nW: Yes, that's right. We'll take all electronics.\nM: Great. I just have one question. Do you provide a pickup service?\nW: No, unfortunately you'll have to bring everything here yourself. However, on our Web site we list a number of companies that can remove and dispose of the items for you.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n46. Người phụ nữ nói rằng có thể tìm thấy gì trên một trang web?\n(A) Danh sách các công ty\n(B) Giờ hoạt động\n(C) Đơn xin giấy phép\n(D) Hướng dẫn đến một địa điểm\n\nDịch hội thoại:\nNữ: Cơ sở tái chế Jamestown xin nghe. Tôi có thể giúp gì cho ông?\nNam: Chào cô. Tôi sắp chuyển nhà và tôi có một số thiết bị điện tử như tivi, máy tính muốn bỏ đi trước khi rao bán nhà.\nNữ: Vâng, đúng vậy. Chúng tôi nhận tất cả các thiết bị điện tử.\nNam: Tuyệt. Tôi chỉ có một câu hỏi. Các bạn có cung cấp dịch vụ đến tận nơi lấy hàng không?\nNữ: Không, tiếc là ông sẽ phải tự mang mọi thứ đến đây. Tuy nhiên, trên trang web của chúng tôi có liệt kê một số công ty có thể đến dọn dẹp và xử lý các món đồ đó giúp ông."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "47. How do the speakers know each other? (A) They took a class together. (B) They used to work for the same company. (C) They grew up in the same neighborhood. (D) They met on a train.",
   "transcript": "M: Zaina! What a surprise! I haven't seen you since we took that class for business owners together last year.\nW: Great, thanks. I was just in the neighborhood and thought I'd stop in for a cookie or a piece of cake. You have so many delicious baked goods here.\nM: Thank you! It's been a good year for business. I'm even considering opening a second location.\nW: Really? Well, I noticed that Sunnyvale Restaurant went out of business, and the building's up for lease. It's very close to the local university.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n47. Làm thế nào các diễn giả biết nhau?\n(A) Họ đã học cùng lớp.\n(B) Họ từng làm việc cho cùng một công ty.\n(C) Họ lớn lên trong cùng một khu phố.\n(D) Họ gặp nhau trên tàu hỏa.\n\nDịch hội thoại:\nNam: Zaina! Thật bất ngờ quá! Tôi đã không gặp cô kể từ khi chúng ta cùng học lớp dành cho chủ doanh nghiệp vào năm ngoái.\nNữ: Tôi vẫn khỏe, cảm ơn anh. Tôi vừa có việc ở khu này và nghĩ mình nên ghé vào mua một chiếc bánh quy hoặc một miếng bánh ngọt. Ở đây anh có nhiều đồ nướng ngon quá.\nNam: Cảm ơn cô! Năm nay việc kinh doanh rất thuận lợi. Tôi thậm chí đang cân nhắc mở cơ sở thứ hai.\nNữ: Thật sao? Chà, tôi thấy nhà hàng Sunnyvale đã đóng cửa và tòa nhà đó đang cho thuê. Nó rất gần trường đại học địa phương."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "48. What type of business does the man most likely own? (A) A fitness center (B) A real estate agency (C) A culinary school (D) A bakery",
   "transcript": "M: Zaina! What a surprise! I haven't seen you since we took that class for business owners together last year.\nW: Great, thanks. I was just in the neighborhood and thought I'd stop in for a cookie or a piece of cake. You have so many delicious baked goods here.\nM: Thank you! It's been a good year for business. I'm even considering opening a second location.\nW: Really? Well, I noticed that Sunnyvale Restaurant went out of business, and the building's up for lease. It's very close to the local university.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n48. Người đàn ông có khả năng sở hữu loại hình kinh doanh nào nhất?\n(A) Trung tâm thể dục\n(B) Đại lý bất động sản\n(C) Trường dạy nấu ăn\n(D) Tiệm bánh\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Zaina! Thật bất ngờ quá! Tôi đã không gặp cô kể từ khi chúng ta cùng học lớp dành cho chủ doanh nghiệp vào năm ngoái.\nNữ: Tôi vẫn khỏe, cảm ơn anh. Tôi vừa có việc ở khu này và nghĩ mình nên ghé vào mua một chiếc bánh quy hoặc một miếng bánh ngọt. Ở đây anh có nhiều đồ nướng ngon quá.\nNam: Cảm ơn cô! Năm nay việc kinh doanh rất thuận lợi. Tôi thậm chí đang cân nhắc mở cơ sở thứ hai.\nNữ: Thật sao? Chà, tôi thấy nhà hàng Sunnyvale đã đóng cửa và tòa nhà đó đang cho thuê. Nó rất gần trường đại học địa phương."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "49. What advantage does the woman point out about a rental space? (A) Its price (B) Its size (C) Its location (D) Its design",
   "transcript": "M: Zaina! What a surprise! I haven't seen you since we took that class for business owners together last year.\nW: Great, thanks. I was just in the neighborhood and thought I'd stop in for a cookie or a piece of cake. You have so many delicious baked goods here.\nM: Thank you! It's been a good year for business. I'm even considering opening a second location.\nW: Really? Well, I noticed that Sunnyvale Restaurant went out of business, and the building's up for lease. It's very close to the local university.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n49. Người phụ nữ chỉ ra ưu điểm nào về không gian cho thuê?\n(A) Giá cả\n(B) Kích thước\n(C) Vị trí\n(D) Thiết kế\n\nDịch hội thoại:\nNam: Zaina! Thật bất ngờ quá! Tôi đã không gặp cô kể từ khi chúng ta cùng học lớp dành cho chủ doanh nghiệp vào năm ngoái.\nNữ: Tôi vẫn khỏe, cảm ơn anh. Tôi vừa có việc ở khu này và nghĩ mình nên ghé vào mua một chiếc bánh quy hoặc một miếng bánh ngọt. Ở đây anh có nhiều đồ nướng ngon quá.\nNam: Cảm ơn cô! Năm nay việc kinh doanh rất thuận lợi. Tôi thậm chí đang cân nhắc mở cơ sở thứ hai.\nNữ: Thật sao? Chà, tôi thấy nhà hàng Sunnyvale đã đóng cửa và tòa nhà đó đang cho thuê. Nó rất gần trường đại học địa phương."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "50. Who most likely are the speakers? (A) Film actors (B) Museum directors (C) Video game developers (D) Investigative journalists",
   "transcript": "W: Hi, Koji. I think our new video game is nearly ready to be released. Are you aware of any improvements that need to be made before then?\nM: Actually, I just finished testing the game this morning. I found a problem in the third stage of the game. There were a few times when my character couldn't move.\nW: Oh, that's strange!\nM: I double-checked the problem using a different controller. The same issue came up.\nW: Oh. I think Pauline had a similar problem with a game she tested. Maybe you should ask her about it.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n50. Các diễn giả có khả năng cao là ai?\n(A) Diễn viên điện ảnh\n(B) Giám đốc bảo tàng\n(C) Nhà phát triển trò chơi điện tử\n(D) Nhà báo điều tra\n\nDịch hội thoại:\nNữ: Chào Koji. Tôi nghĩ trò chơi điện tử mới của chúng ta gần như đã sẵn sàng để phát hành. Anh có biết có cải tiến nào cần thực hiện trước đó không?\nNam: Thực ra, tôi vừa mới kiểm tra xong trò chơi sáng nay. Tôi đã tìm thấy một vấn đề ở màn thứ ba. Có vài lần nhân vật của tôi không thể di chuyển được.\nNữ: Ồ, lạ thật đấy!\nNam: Tôi đã kiểm tra lại vấn đề bằng cách sử dụng một bộ điều khiển khác. Vấn đề tương tự vẫn xảy ra.\nNữ: Ồ. Tôi nghĩ Pauline cũng gặp vấn đề tương tự với một trò chơi cô ấy đã kiểm tra. Có lẽ anh nên hỏi cô ấy về việc đó."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "B",
   "group": "50-52",
   "textEn": "51. What did the man recently do? (A) He secured some funding. (B) He tested a product. (C) He read a script. (D) He conducted an interview.",
   "transcript": "W: Hi, Koji. I think our new video game is nearly ready to be released. Are you aware of any improvements that need to be made before then?\nM: Actually, I just finished testing the game this morning. I found a problem in the third stage of the game. There were a few times when my character couldn't move.\nW: Oh, that's strange!\nM: I double-checked the problem using a different controller. The same issue came up.\nW: Oh. I think Pauline had a similar problem with a game she tested. Maybe you should ask her about it.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n51. Người đàn ông đã làm gì gần đây?\n(A) Ông ấy đã đảm bảo được một số nguồn tài trợ.\n(B) Ông ấy đã thử nghiệm một sản phẩm.\n(C) Ông ấy đã đọc một kịch bản\n(D) Ông ấy đã thực hiện một cuộc phỏng vấn.\n\nDịch hội thoại:\nNữ: Chào Koji. Tôi nghĩ trò chơi điện tử mới của chúng ta gần như đã sẵn sàng để phát hành. Anh có biết có cải tiến nào cần thực hiện trước đó không?\nNam: Thực ra, tôi vừa mới kiểm tra xong trò chơi sáng nay. Tôi đã tìm thấy một vấn đề ở màn thứ ba. Có vài lần nhân vật của tôi không thể di chuyển được.\nNữ: Ồ, lạ thật đấy!\nNam: Tôi đã kiểm tra lại vấn đề bằng cách sử dụng một bộ điều khiển khác. Vấn đề tương tự vẫn xảy ra.\nNữ: Ồ. Tôi nghĩ Pauline cũng gặp vấn đề tương tự với một trò chơi cô ấy đã kiểm tra. Có lẽ anh nên hỏi cô ấy về việc đó."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "52. What does the woman suggest? (A) Consulting a colleague (B) Planning an event (C) Negotiating a contract (D) Giving a client an update",
   "transcript": "W: Hi, Koji. I think our new video game is nearly ready to be released. Are you aware of any improvements that need to be made before then?\nM: Actually, I just finished testing the game this morning. I found a problem in the third stage of the game. There were a few times when my character couldn't move.\nW: Oh, that's strange!\nM: I double-checked the problem using a different controller. The same issue came up.\nW: Oh. I think Pauline had a similar problem with a game she tested. Maybe you should ask her about it.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n52. Người phụ nữ gợi ý điều gì?\n(A) Tham khảo ý kiến đồng nghiệp\n(B) Lên kế hoạch cho một sự kiện\n(C) Thương lượng một hợp đồng\n(D) Cập nhật thông tin cho khách hàng\n\nDịch hội thoại:\nNữ: Chào Koji. Tôi nghĩ trò chơi điện tử mới của chúng ta gần như đã sẵn sàng để phát hành. Anh có biết có cải tiến nào cần thực hiện trước đó không?\nNam: Thực ra, tôi vừa mới kiểm tra xong trò chơi sáng nay. Tôi đã tìm thấy một vấn đề ở màn thứ ba. Có vài lần nhân vật của tôi không thể di chuyển được.\nNữ: Ồ, lạ thật đấy!\nNam: Tôi đã kiểm tra lại vấn đề bằng cách sử dụng một bộ điều khiển khác. Vấn đề tương tự vẫn xảy ra.\nNữ: Ồ. Tôi nghĩ Pauline cũng gặp vấn đề tương tự với một trò chơi cô ấy đã kiểm tra. Có lẽ anh nên hỏi cô ấy về việc đó."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "53. Who most likely is the man? (A) A delivery driver (B) A security guard (C) A maintenance worker (D) A customer service representative",
   "transcript": "M: You've reached the maintenance office at Hillview Apartment Complex.\nW: Hi. This is Palavi Sen from unit 35B. I'm calling because the new thermostat in my apartment isn't working. It keeps shutting off and turning on randomly, so my apartment is getting cold.\nM: When did this issue start?\nW: A few hours ago. The thermostat was just installed yesterday.\nM: OK. I can come and take a look at it tomorrow morning.\nW: But it's supposed to be below freezing tonight!",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n53. Người đàn ông có khả năng cao là ai?\n(A) Một lái xe giao hàng\n(B) Một nhân viên bảo vệ\n(C) Một nhân viên bảo trì\n(D) Một đại diện dịch vụ khách hàng\n\nDịch hội thoại:\nNam: Đây là văn phòng bảo trì tại khu chung cư Hillview.\nNữ: Xin chào. Tôi là Palavi Sen ở căn hộ 35B. Tôi gọi vì bộ điều chỉnh nhiệt mới trong căn hộ của tôi không hoạt động. Nó cứ tự tắt rồi bật ngẫu nhiên, khiến căn hộ của tôi trở nên rất lạnh.\nNam: Vấn đề này bắt đầu từ khi nào?\nNữ: Cách đây vài giờ. Bộ điều chỉnh nhiệt vừa mới được lắp đặt vào ngày hôm qua.\nNam: Được rồi. Tôi có thể ghé qua kiểm tra vào sáng mai.\nNữ: Nhưng dự báo đêm nay nhiệt độ sẽ xuống dưới mức đóng băng đấy!"
  },
  {
   "number": 54,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "54. What problem does the woman describe? (A) A device is malfunctioning. (B) A key is missing. (C) A parking area is unavailable. (D) A package was not received.",
   "transcript": "M: You've reached the maintenance office at Hillview Apartment Complex.\nW: Hi. This is Palavi Sen from unit 35B. I'm calling because the new thermostat in my apartment isn't working. It keeps shutting off and turning on randomly, so my apartment is getting cold.\nM: When did this issue start?\nW: A few hours ago. The thermostat was just installed yesterday.\nM: OK. I can come and take a look at it tomorrow morning.\nW: But it's supposed to be below freezing tonight!",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n54. Người phụ nữ mô tả vấn đề gì?\n(A) Một thiết bị đang bị hỏng.\n(B) Một chiếc chìa khóa bị mất.\n(C) Khu vực đỗ xe không có sẵn.\n(D) Một gói hàng chưa được nhận.\n\nDịch hội thoại:\nNam: Đây là văn phòng bảo trì tại khu chung cư Hillview.\nNữ: Xin chào. Tôi là Palavi Sen ở căn hộ 35B. Tôi gọi vì bộ điều chỉnh nhiệt mới trong căn hộ của tôi không hoạt động. Nó cứ tự tắt rồi bật ngẫu nhiên, khiến căn hộ của tôi trở nên rất lạnh.\nNam: Vấn đề này bắt đầu từ khi nào?\nNữ: Cách đây vài giờ. Bộ điều chỉnh nhiệt vừa mới được lắp đặt vào ngày hôm qua.\nNam: Được rồi. Tôi có thể ghé qua kiểm tra vào sáng mai.\nNữ: Nhưng dự báo đêm nay nhiệt độ sẽ xuống dưới mức đóng băng đấy!"
  },
  {
   "number": 55,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "55. What does the woman mean when she says, \"it's supposed to be below freezing tonight\"? (A) She is surprised by the weather forecast. (B) She wants a service to be completed sooner. (C) She will move some items indoors. (D) She would prefer to park near her apartment.",
   "transcript": "M: You've reached the maintenance office at Hillview Apartment Complex.\nW: Hi. This is Palavi Sen from unit 35B. I'm calling because the new thermostat in my apartment isn't working. It keeps shutting off and turning on randomly, so my apartment is getting cold.\nM: When did this issue start?\nW: A few hours ago. The thermostat was just installed yesterday.\nM: OK. I can come and take a look at it tomorrow morning.\nW: But it's supposed to be below freezing tonight!",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n55. Người phụ nữ có ý gì khi nói \"trời dự kiến sẽ lạnh dưới mức đóng băng tối nay\"?\n(A) Cô ấy ngạc nhiên về dự báo thời tiết.\n(B) Cô ấy muốn một dịch vụ được hoàn thành sớm hơn.\n(C) Cô ấy sẽ chuyển một số đồ vật vào trong nhà.\n(D) Cô ấy muốn đỗ xe gần căn hộ của mình hơn\n\nDịch hội thoại:\nNam: Đây là văn phòng bảo trì tại khu chung cư Hillview.\nNữ: Xin chào. Tôi là Palavi Sen ở căn hộ 35B. Tôi gọi vì bộ điều chỉnh nhiệt mới trong căn hộ của tôi không hoạt động. Nó cứ tự tắt rồi bật ngẫu nhiên, khiến căn hộ của tôi trở nên rất lạnh.\nNam: Vấn đề này bắt đầu từ khi nào?\nNữ: Cách đây vài giờ. Bộ điều chỉnh nhiệt vừa mới được lắp đặt vào ngày hôm qua.\nNam: Được rồi. Tôi có thể ghé qua kiểm tra vào sáng mai.\nNữ: Nhưng dự báo đêm nay nhiệt độ sẽ xuống dưới mức đóng băng đấy!"
  },
  {
   "number": 56,
   "part": 3,
   "answer": "B",
   "group": "56-58",
   "textEn": "56. Why do the men want to speak to the woman? (A) To review a building design (B) To discuss a loan (C) To develop an advertising plan (D) To purchase some supplies",
   "transcript": "W: Good morning! Welcome to Jasper Bank.\nM1: Thanks for meeting with us to discuss a loan for our business.\nW: Why don't you tell me more about your business? I understand it's a repair shop?\nM2: Well, ten years ago, we opened as a snowmobile repair shop, but after a few years, we also started renting out snowmobiles and other sports equipment.\nM1: Yes, and because winter tourism has increased recently, we'd like to expand our space so that we can carry more inventory.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n56. Tại sao những người đàn ông muốn nói chuyện với người phụ nữ?\n(A) Để xem xét một thiết kế tòa nhà\n(B) Để thảo luận về một khoản vay\n(C) Để phát triển một kế hoạch quảng cáo\n(D) Để mua một số vật tư\n\nDịch hội thoại:\nNữ: Chào buổi sáng! Chào mừng hai ông đến với ngân hàng Jasper.\nNam 1: Cảm ơn cô đã gặp chúng tôi để thảo luận về khoản vay cho doanh nghiệp của chúng tôi.\nNữ: Hai ông có thể cho tôi biết thêm về doanh nghiệp của mình không? Tôi hiểu đó là một cửa hàng sửa chữa?\nNam 2: Chà, mười năm trước chúng tôi mở một cửa hàng sửa chữa xe trượt tuyết, nhưng sau vài năm, chúng tôi cũng bắt đầu cho thuê xe trượt tuyết và các thiết bị thể thao khác.\nNam 1: Vâng, và vì du lịch mùa đông tăng lên gần đây, chúng tôi muốn mở rộng không gian để có thể chứa được nhiều hàng tồn kho hơn."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "57. What type of business do the men own? (A) A sports equipment store (B) A winter apparel store (C) An automobile dealership (D) A hotel chain",
   "transcript": "W: Good morning! Welcome to Jasper Bank.\nM1: Thanks for meeting with us to discuss a loan for our business.\nW: Why don't you tell me more about your business? I understand it's a repair shop?\nM2: Well, ten years ago, we opened as a snowmobile repair shop, but after a few years, we also started renting out snowmobiles and other sports equipment.\nM1: Yes, and because winter tourism has increased recently, we'd like to expand our space so that we can carry more inventory.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n57. Những người đàn ông sở hữu loại hình kinh doanh nào?\n(A) Cửa hàng thiết bị thể thao\n(B) Cửa hàng quần áo mùa đông\n(C) Đại lý ô tô\n(D) Chuỗi khách sạn\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Chào buổi sáng! Chào mừng hai ông đến với ngân hàng Jasper.\nNam 1: Cảm ơn cô đã gặp chúng tôi để thảo luận về khoản vay cho doanh nghiệp của chúng tôi.\nNữ: Hai ông có thể cho tôi biết thêm về doanh nghiệp của mình không? Tôi hiểu đó là một cửa hàng sửa chữa?\nNam 2: Chà, mười năm trước chúng tôi mở một cửa hàng sửa chữa xe trượt tuyết, nhưng sau vài năm, chúng tôi cũng bắt đầu cho thuê xe trượt tuyết và các thiết bị thể thao khác.\nNam 1: Vâng, và vì du lịch mùa đông tăng lên gần đây, chúng tôi muốn mở rộng không gian để có thể chứa được nhiều hàng tồn kho hơn."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "58. According to the men, what has changed recently? (A) Roads have become more accessible. (B) Costs have decreased. (C) Tourism has increased. (D) Weather patterns have shifted",
   "transcript": "W: Good morning! Welcome to Jasper Bank.\nM1: Thanks for meeting with us to discuss a loan for our business.\nW: Why don't you tell me more about your business? I understand it's a repair shop?\nM2: Well, ten years ago, we opened as a snowmobile repair shop, but after a few years, we also started renting out snowmobiles and other sports equipment.\nM1: Yes, and because winter tourism has increased recently, we'd like to expand our space so that we can carry more inventory.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n58. Theo những người đàn ông, điều gì đã thay đổi gần đây?\n(A) Đường xá đã trở nên dễ tiếp cận hơn.\n(B) Chi phí đã giảm xuống.\n(C) Du lịch đã tăng lên.\n(D) Các hình thái thời tiết đã thay đổi.\n\nDịch hội thoại:\nNữ: Chào buổi sáng! Chào mừng hai ông đến với ngân hàng Jasper.\nNam 1: Cảm ơn cô đã gặp chúng tôi để thảo luận về khoản vay cho doanh nghiệp của chúng tôi.\nNữ: Hai ông có thể cho tôi biết thêm về doanh nghiệp của mình không? Tôi hiểu đó là một cửa hàng sửa chữa?\nNam 2: Chà, mười năm trước chúng tôi mở một cửa hàng sửa chữa xe trượt tuyết, nhưng sau vài năm, chúng tôi cũng bắt đầu cho thuê xe trượt tuyết và các thiết bị thể thao khác.\nNam 1: Vâng, và vì du lịch mùa đông tăng lên gần đây, chúng tôi muốn mở rộng không gian để có thể chứa được nhiều hàng tồn kho hơn."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "59. What does the man want to do? (A) Provide training opportunities (B) Upgrade machinery (C) Hire additional employees (D) Reorganize the factory layout",
   "transcript": "M: Many of our factory workers have expressed interest in upgrading their skills. I'd like to implement a peer-training program, where learners shadow more-experienced employees and observe how they do their jobs.\nW: I'm afraid that might become a burden for our long-time employees. They'll have to slow down their work to explain what they're doing.\nM: What if we videotaped experienced employees doing specific tasks? High-quality video can be recorded and edited with a smartphone.\nW: I like that idea. It would allow us to capture our workers' expertise without slowing down the production line.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n59. Người đàn ông muốn làm gì?\n(A) Cung cấp các cơ hội đào tạo\n(B) Nâng cấp máy móc\n(C) Thuê thêm nhân viên\n(D) Tổ chức lại bố cục nhà máy\n\nDịch hội thoại:\nNam: Nhiều công nhân nhà máy của chúng ta bày tỏ sự quan tâm đến việc nâng cao kỹ năng. Tôi muốn triển khai chương trình đào tạo chéo, nơi người học sẽ theo sát những nhân viên giàu kinh nghiệm để quan sát cách họ làm việc.\nNữ: Tôi e rằng điều đó có thể trở thành gánh nặng cho những nhân viên lâu năm. Họ sẽ phải làm chậm công việc của mình để giải thích những gì họ đang làm.\nNam: Nếu chúng ta quay video những nhân viên giàu kinh nghiệm thực hiện các nhiệm vụ cụ thể thì sao? Video chất lượng cao có thể được ghi lại và chỉnh sửa bằng điện thoại thông minh.\nNữ: Tôi thích ý tưởng đó. Nó cho phép chúng ta ghi lại chuyên môn của công nhân mà không làm chậm dây chuyền sản xuất."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "60. What is the woman concerned about? (A) Increasing expenses (B) Introducing errors (C) Reducing productivity (D) Causing confusion",
   "transcript": "M: Many of our factory workers have expressed interest in upgrading their skills. I'd like to implement a peer-training program, where learners shadow more-experienced employees and observe how they do their jobs.\nW: I'm afraid that might become a burden for our long-time employees. They'll have to slow down their work to explain what they're doing.\nM: What if we videotaped experienced employees doing specific tasks? High-quality video can be recorded and edited with a smartphone.\nW: I like that idea. It would allow us to capture our workers' expertise without slowing down the production line.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n60. Người phụ nữ lo lắng về điều gì?\n(A) Chi phí gia tăng\n(B) Gây ra lỗi\n(C) Giảm năng suất\n(D) Gây ra sự bối rối\n\nDịch hội thoại:\nNam: Nhiều công nhân nhà máy của chúng ta bày tỏ sự quan tâm đến việc nâng cao kỹ năng. Tôi muốn triển khai chương trình đào tạo chéo, nơi người học sẽ theo sát những nhân viên giàu kinh nghiệm để quan sát cách họ làm việc.\nNữ: Tôi e rằng điều đó có thể trở thành gánh nặng cho những nhân viên lâu năm. Họ sẽ phải làm chậm công việc của mình để giải thích những gì họ đang làm.\nNam: Nếu chúng ta quay video những nhân viên giàu kinh nghiệm thực hiện các nhiệm vụ cụ thể thì sao? Video chất lượng cao có thể được ghi lại và chỉnh sửa bằng điện thoại thông minh.\nNữ: Tôi thích ý tưởng đó. Nó cho phép chúng ta ghi lại chuyên môn của công nhân mà không làm chậm dây chuyền sản xuất."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "61. What does the man mean when he says, \"High-quality video can be recorded and edited with a smartphone\"? (A) A new policy should be established. (B) An idea is easy to implement. (C) Data security is a concern. (D) Some information should be verified.",
   "transcript": "M: Many of our factory workers have expressed interest in upgrading their skills. I'd like to implement a peer-training program, where learners shadow more-experienced employees and observe how they do their jobs.\nW: I'm afraid that might become a burden for our long-time employees. They'll have to slow down their work to explain what they're doing.\nM: What if we videotaped experienced employees doing specific tasks? High-quality video can be recorded and edited with a smartphone.\nW: I like that idea. It would allow us to capture our workers' expertise without slowing down the production line.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n61. Người đàn ông có ý gì khi nói \"Video chất lượng cao có thể được quay và chỉnh sửa bằng điện thoại thông minh\"?\n(A) Một chính sách mới nên được thiết lập.\n(B) Một ý tưởng rất dễ thực hiện.\n(C) Bảo mật dữ liệu là một mối lo ngại.\n(D) Một số thông tin cần được xác minh.\n\nDịch hội thoại:\nNam: Nhiều công nhân nhà máy của chúng ta bày tỏ sự quan tâm đến việc nâng cao kỹ năng. Tôi muốn triển khai chương trình đào tạo chéo, nơi người học sẽ theo sát những nhân viên giàu kinh nghiệm để quan sát cách họ làm việc.\nNữ: Tôi e rằng điều đó có thể trở thành gánh nặng cho những nhân viên lâu năm. Họ sẽ phải làm chậm công việc của mình để giải thích những gì họ đang làm.\nNam: Nếu chúng ta quay video những nhân viên giàu kinh nghiệm thực hiện các nhiệm vụ cụ thể thì sao? Video chất lượng cao có thể được ghi lại và chỉnh sửa bằng điện thoại thông minh.\nNữ: Tôi thích ý tưởng đó. Nó cho phép chúng ta ghi lại chuyên môn của công nhân mà không làm chậm dây chuyền sản xuất."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "62. Where is the woman? (A) At a restaurant (B) At a travel agency (C) At an airport (D) At a warehouse",
   "transcript": "W: Hi, Suresh, I'm at the airport waiting for my flight. I want to meet with a potential investor while I'm in Chicago. Her name's Marta Gomez.\nM: OK. Which day would you prefer to meet with her?\nW: How about right after my meeting with the Chicago staff?\nM: OK. By the way, did you see that our company won an award for our contributions to the community? It was just announced this morning.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n62. Người phụ nữ đang ở đâu?\n(A) Tại một nhà hàng\n(B) Tại một đại lý du lịch\n(C) Tại sân bay\n(D) Tại một nhà kho\n\nDịch hội thoại:\nNữ: Chào Suresh, tôi đang ở sân bay đợi chuyến bay. Tôi muốn gặp một nhà đầu tư tiềm năng trong khi ở Chicago. Tên cô ấy là Marta Gomez.\nNam: Được rồi. Cô muốn gặp cô ấy vào ngày nào?\nNữ: Ngay sau cuộc họp của tôi với nhân viên ở Chicago thì sao?\nNam: Được thôi. Nhân tiện, cô có thấy công ty chúng ta vừa giành được giải thưởng vì những đóng góp cho cộng đồng không? Nó vừa được công bố sáng nay."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "63. Look at the graphic. When does the woman prefer to meet with an investor? (A) On Monday (B) On Tuesday (C) On Wednesday (D) On Thursday",
   "transcript": "W: Hi, Suresh, I'm at the airport waiting for my flight. I want to meet with a potential investor while I'm in Chicago. Her name's Marta Gomez.\nM: OK. Which day would you prefer to meet with her?\nW: How about right after my meeting with the Chicago staff?\nM: OK. By the way, did you see that our company won an award for our contributions to the community? It was just announced this morning.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n63. Nhìn vào hình ảnh. Khi nào người phụ nữ muốn gặp nhà đầu tư?\n(A) Thứ Hai\n(B) Thứ Ba\n(C) Thứ Tư\n(D) Thứ Năm\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Chào Suresh, tôi đang ở sân bay đợi chuyến bay. Tôi muốn gặp một nhà đầu tư tiềm năng trong khi ở Chicago. Tên cô ấy là Marta Gomez.\nNam: Được rồi. Cô muốn gặp cô ấy vào ngày nào?\nNữ: Ngay sau cuộc họp của tôi với nhân viên ở Chicago thì sao?\nNam: Được thôi. Nhân tiện, cô có thấy công ty chúng ta vừa giành được giải thưởng vì những đóng góp cho cộng đồng không? Nó vừa được công bố sáng nay."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "D",
   "group": "62-64",
   "textEn": "64. What good news does the man share? (A) A colleague received a promotion. (B) A conference proposal was accepted. (C) An airline ticket has been upgraded. (D) A company won an award.",
   "transcript": "W: Hi, Suresh, I'm at the airport waiting for my flight. I want to meet with a potential investor while I'm in Chicago. Her name's Marta Gomez.\nM: OK. Which day would you prefer to meet with her?\nW: How about right after my meeting with the Chicago staff?\nM: OK. By the way, did you see that our company won an award for our contributions to the community? It was just announced this morning.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n64. Người đàn ông chia sẻ tin tốt nào?\n(A) Một đồng nghiệp đã được thăng chức.\n(B) Đề xuất hội nghị đã được chấp nhận.\n(C) Vé máy bay đã được nâng hạng.\n(D) Một công ty đã giành được giải thưởng.\n\nDịch hội thoại:\nNữ: Chào Suresh, tôi đang ở sân bay đợi chuyến bay. Tôi muốn gặp một nhà đầu tư tiềm năng trong khi ở Chicago. Tên cô ấy là Marta Gomez.\nNam: Được rồi. Cô muốn gặp cô ấy vào ngày nào?\nNữ: Ngay sau cuộc họp của tôi với nhân viên ở Chicago thì sao?\nNam: Được thôi. Nhân tiện, cô có thấy công ty chúng ta vừa giành được giải thưởng vì những đóng góp cho cộng đồng không? Nó vừa được công bố sáng nay."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "65. Where do the speakers work? (A) At an amusement park (B) At an art museum (C) At a concert hall (D) At a botanical garden",
   "transcript": "M: Marion, we keep getting calls from people who want to visit the botanical garden but can't find parking information. Isn't it on our Web site?\nW: It is, but you have to click on the \"About Us\" page and scroll to the bottom of that page. Maybe people don't see it.\nM: Oh, I think we should move that information from the \"About Us\" page and make a separate page for directions and parking information.\nW: I'd be happy to make that change. But we're in the middle of updating our software, so it'll have to wait until Monday.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n65. Các diễn giả làm việc ở đâu?\n(A) Tại một công viên giải trí\n(B) Tại một bảo tàng nghệ thuật\n(C) Tại một phòng hòa nhạc\n(D) Tại một vườn bách thảo\n\nDịch hội thoại:\nNam: Marion này, chúng ta liên tục nhận được cuộc gọi từ những người muốn tham quan vườn bách thảo nhưng không tìm thấy thông tin bãi đậu xe. Nó không có trên trang web của chúng ta sao?\nNữ: Có chứ, nhưng anh phải nhấp vào trang \"Về chúng tôi\" và cuộn xuống cuối trang đó. Có lẽ mọi người không thấy nó.\nNam: Ồ, tôi nghĩ chúng ta nên chuyển thông tin đó từ trang \"Về chúng tôi\" và tạo một trang riêng cho chỉ đường và thông tin đậu xe.\nNữ: Tôi rất sẵn lòng thực hiện thay đổi đó. Nhưng chúng ta đang trong quá trình cập nhật phần mềm, vì vậy việc này sẽ phải đợi đến thứ Hai."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "66. Look at the graphic. Which page on the Web site does the man want to change? (A) Page 1 (B) Page 2 (C) Page 3 (D) Page 4",
   "transcript": "M: Marion, we keep getting calls from people who want to visit the botanical garden but can't find parking information. Isn't it on our Web site?\nW: It is, but you have to click on the \"About Us\" page and scroll to the bottom of that page. Maybe people don't see it.\nM: Oh, I think we should move that information from the \"About Us\" page and make a separate page for directions and parking information.\nW: I'd be happy to make that change. But we're in the middle of updating our software, so it'll have to wait until Monday.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n66. Nhìn vào hình ảnh. Trang nào trên trang web mà người đàn ông muốn thay đổi?\n(A) Trang 1\n(B) Trang 2\n(C) Trang 3\n(D) Trang 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Marion này, chúng ta liên tục nhận được cuộc gọi từ những người muốn tham quan vườn bách thảo nhưng không tìm thấy thông tin bãi đậu xe. Nó không có trên trang web của chúng ta sao?\nNữ: Có chứ, nhưng anh phải nhấp vào trang \"Về chúng tôi\" và cuộn xuống cuối trang đó. Có lẽ mọi người không thấy nó.\nNam: Ồ, tôi nghĩ chúng ta nên chuyển thông tin đó từ trang \"Về chúng tôi\" và tạo một trang riêng cho chỉ đường và thông tin đậu xe.\nNữ: Tôi rất sẵn lòng thực hiện thay đổi đó. Nhưng chúng ta đang trong quá trình cập nhật phần mềm, vì vậy việc này sẽ phải đợi đến thứ Hai."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "67. Why does the woman say she cannot complete a task until Monday? (A) She requires approval from a manager. (B) She is attending a workshop. (C) Some software is being updated. (D) Some clients will be arriving soon.",
   "transcript": "M: Marion, we keep getting calls from people who want to visit the botanical garden but can't find parking information. Isn't it on our Web site?\nW: It is, but you have to click on the \"About Us\" page and scroll to the bottom of that page. Maybe people don't see it.\nM: Oh, I think we should move that information from the \"About Us\" page and make a separate page for directions and parking information.\nW: I'd be happy to make that change. But we're in the middle of updating our software, so it'll have to wait until Monday.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n67. Tại sao người phụ nữ nói cô ấy không thể hoàn thành công việc cho đến thứ Hai?\n(A) Cô ấy cần sự chấp thuận từ quản lý.\n(B) Cô ấy đang tham dự một buổi hội thảo.\n(C) Một số phần mềm đang được cập nhật.\n(D) Một số khách hàng sẽ sớm đến\n\nDịch hội thoại:\nNam: Marion này, chúng ta liên tục nhận được cuộc gọi từ những người muốn tham quan vườn bách thảo nhưng không tìm thấy thông tin bãi đậu xe. Nó không có trên trang web của chúng ta sao?\nNữ: Có chứ, nhưng anh phải nhấp vào trang \"Về chúng tôi\" và cuộn xuống cuối trang đó. Có lẽ mọi người không thấy nó.\nNam: Ồ, tôi nghĩ chúng ta nên chuyển thông tin đó từ trang \"Về chúng tôi\" và tạo một trang riêng cho chỉ đường và thông tin đậu xe.\nNữ: Tôi rất sẵn lòng thực hiện thay đổi đó. Nhưng chúng ta đang trong quá trình cập nhật phần mềm, vì vậy việc này sẽ phải đợi đến thứ Hai."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "68. What news does the man share? (A) A station road will be closed for repair. (B) A project has been approved. (C) A parking area has been expanded. (D) An office will relocate.",
   "transcript": "M: Good news! We have finally received the go-ahead for our department's project to install bicycle racks at the train station downtown.\nW: At last! So, now we need to decide where to place the racks. How about by the station entrance?\nM: Hmm. If we asked riders, I bet they'd say that the most convenient spot is as close to the platform as possible.\nW: Let's do that. I'll contact some companies for estimates.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n68. Người đàn ông chia sẻ tin tức gì?\n(A) Một con đường trạm sẽ bị đóng cửa để sửa chữa.\n(B) Một dự án đã được phê duyệt.\n(C) Một khu vực đỗ xe đã được mở rộng.\n(D) Một văn phòng sẽ chuyển địa điểm.\n\nDịch hội thoại:\nNam: Tin tốt đây! Cuối cùng chúng ta đã nhận được sự đồng ý cho dự án của bộ phận mình về việc lắp đặt giá để xe đạp tại ga tàu trung tâm thành phố.\nNữ: Cuối cùng cũng được rồi! Vậy bây giờ chúng ta cần quyết định nơi đặt các giá để xe. Ngay cạnh lối vào nhà ga thì sao?\nNam: Hừm. Nếu chúng ta hỏi những người đi xe, tôi cá là họ sẽ nói rằng vị trí thuận tiện nhất là càng gần sân ga càng tốt.\nNữ: Hãy làm như vậy đi. Tôi sẽ liên hệ với một số công ty để lấy báo giá."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "69. Look at the graphic. Where do the speakers decide to install some bicycle racks? (A) Near the covered parking area (B) Near the long-term parking area (C) Near the short-term parking area (D) Near the overflow parking area",
   "transcript": "M: Good news! We have finally received the go-ahead for our department's project to install bicycle racks at the train station downtown.\nW: At last! So, now we need to decide where to place the racks. How about by the station entrance?\nM: Hmm. If we asked riders, I bet they'd say that the most convenient spot is as close to the platform as possible.\nW: Let's do that. I'll contact some companies for estimates.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n69. Nhìn vào hình ảnh. Các diễn giả quyết định lắp đặt một số giá để xe đạp ở đâu?\n(A) Gần khu vực đỗ xe có mái che\n(B) Gần khu vực đỗ xe dài hạn\n(C) Gần khu vực đỗ xe ngắn hạn\n(D) Gần khu vực đỗ xe dự phòng\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Tin tốt đây! Cuối cùng chúng ta đã nhận được sự đồng ý cho dự án của bộ phận mình về việc lắp đặt giá để xe đạp tại ga tàu trung tâm thành phố.\nNữ: Cuối cùng cũng được rồi! Vậy bây giờ chúng ta cần quyết định nơi đặt các giá để xe. Ngay cạnh lối vào nhà ga thì sao?\nNam: Hừm. Nếu chúng ta hỏi những người đi xe, tôi cá là họ sẽ nói rằng vị trí thuận tiện nhất là càng gần sân ga càng tốt.\nNữ: Hãy làm như vậy đi. Tôi sẽ liên hệ với một số công ty để lấy báo giá."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "70. Why does the woman say she will contact some companies? (A) To arrange a loan (B) To apply for a permit (C) To ask for estimates (D) To create a proposal",
   "transcript": "M: Good news! We have finally received the go-ahead for our department's project to install bicycle racks at the train station downtown.\nW: At last! So, now we need to decide where to place the racks. How about by the station entrance?\nM: Hmm. If we asked riders, I bet they'd say that the most convenient spot is as close to the platform as possible.\nW: Let's do that. I'll contact some companies for estimates.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n70. Tại sao người phụ nữ nói cô ấy sẽ liên lạc với một số công ty?\n(A) Để sắp xếp một khoản vay\n(B) Để nộp đơn xin giấy phép\n(C) Để yêu cầu báo giá/ước tính chi phí\n(D) Để tạo một bản đề xuất\n\nDịch hội thoại:\nNam: Tin tốt đây! Cuối cùng chúng ta đã nhận được sự đồng ý cho dự án của bộ phận mình về việc lắp đặt giá để xe đạp tại ga tàu trung tâm thành phố.\nNữ: Cuối cùng cũng được rồi! Vậy bây giờ chúng ta cần quyết định nơi đặt các giá để xe. Ngay cạnh lối vào nhà ga thì sao?\nNam: Hừm. Nếu chúng ta hỏi những người đi xe, tôi cá là họ sẽ nói rằng vị trí thuận tiện nhất là càng gần sân ga càng tốt.\nNữ: Hãy làm như vậy đi. Tôi sẽ liên hệ với một số công ty để lấy báo giá."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "71. What type of products does the business repair? (A) Computers (B) Vehicles (C) Light fixtures (D) Kitchen appliances",
   "transcript": "You've reached Select Repair Service. We specialize in all makes and models of automobiles. Our factory-trained specialists will keep your vehicle running in top condition. As an added benefit, we offer extended warranties on all vehicles we service. Please note that Select Repair Service will be closing on Friday, June 30, so we can complete our quarterly inventory of supplies.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n71. Doanh nghiệp sửa chữa loại sản phẩm nào?\n(A) Máy tính\n(B) Xe cộ\n(C) Thiết bị chiếu sáng\n(D) Thiết bị nhà bếp\n\nDịch bài nói:\nBạn đã gọi đến Dịch vụ Sửa chữa Select. Chúng tôi chuyên về tất cả các hãng và dòng xe ô tô. Các chuyên gia được đào tạo tại nhà máy của chúng tôi sẽ giữ cho xe của bạn hoạt động trong điều kiện tốt nhất. Như một lợi ích bổ sung, chúng tôi cung cấp gói bảo hành mở rộng cho tất cả các xe chúng tôi bảo dưỡng. Xin lưu ý rằng Dịch vụ Sửa chữa Select sẽ đóng cửa vào thứ Sáu, ngày 30 tháng 6, để chúng tôi có thể hoàn thành việc kiểm kê vật tư hàng quý."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "72. What special benefit does the speaker mention? (A) Free pickup (B) Online scheduling (C) Extended warranties (D) A membership loyalty program",
   "transcript": "You've reached Select Repair Service. We specialize in all makes and models of automobiles. Our factory-trained specialists will keep your vehicle running in top condition. As an added benefit, we offer extended warranties on all vehicles we service. Please note that Select Repair Service will be closing on Friday, June 30, so we can complete our quarterly inventory of supplies.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n72. Người nói đề cập đến lợi ích đặc biệt nào?\n(A) Lấy hàng miễn phí\n(B) Lên lịch trực tuyến\n(C) Gia hạn bảo hành\n(D) Chương trình khách hàng thân thiết\n\nDịch bài nói:\nBạn đã gọi đến Dịch vụ Sửa chữa Select. Chúng tôi chuyên về tất cả các hãng và dòng xe ô tô. Các chuyên gia được đào tạo tại nhà máy của chúng tôi sẽ giữ cho xe của bạn hoạt động trong điều kiện tốt nhất. Như một lợi ích bổ sung, chúng tôi cung cấp gói bảo hành mở rộng cho tất cả các xe chúng tôi bảo dưỡng. Xin lưu ý rằng Dịch vụ Sửa chữa Select sẽ đóng cửa vào thứ Sáu, ngày 30 tháng 6, để chúng tôi có thể hoàn thành việc kiểm kê vật tư hàng quý."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "73. Why will a business close on Friday? (A) For an inventory count (B) For employee training (C) For a company celebration (D) For equipment installation",
   "transcript": "You've reached Select Repair Service. We specialize in all makes and models of automobiles. Our factory-trained specialists will keep your vehicle running in top condition. As an added benefit, we offer extended warranties on all vehicles we service. Please note that Select Repair Service will be closing on Friday, June 30, so we can complete our quarterly inventory of supplies.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n73. Tại sao doanh nghiệp sẽ đóng cửa vào thứ Sáu?\n(A) Để kiểm kê hàng hóa\n(B) Để đào tạo nhân viên\n(C) Để kỷ niệm công ty\n(D) Để lắp đặt thiết bị\n\nDịch bài nói:\nBạn đã gọi đến Dịch vụ Sửa chữa Select. Chúng tôi chuyên về tất cả các hãng và dòng xe ô tô. Các chuyên gia được đào tạo tại nhà máy của chúng tôi sẽ giữ cho xe của bạn hoạt động trong điều kiện tốt nhất. Như một lợi ích bổ sung, chúng tôi cung cấp gói bảo hành mở rộng cho tất cả các xe chúng tôi bảo dưỡng. Xin lưu ý rằng Dịch vụ Sửa chữa Select sẽ đóng cửa vào thứ Sáu, ngày 30 tháng 6, để chúng tôi có thể hoàn thành việc kiểm kê vật tư hàng quý."
  },
  {
   "number": 74,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "74. Who most likely is the speaker? (A) A facilities manager (B) A human resources representative (C) A security officer (D) A corporate executive",
   "transcript": "Welcome, new employees! My name is Diego, and I facilitate all orientation sessions. Before we start today, you will need to set up your employee account. If you look at the first page of your training binder, you'll see your username and a temporary password. Once that's complete, you'll have access to all your department's files. Please note that you can only access them from your company computer.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n74. Người nói có khả năng cao là ai?\n(A) Quản lý cơ sở vật chất\n(B) Đại diện nhân sự\n(C) Nhân viên an ninh\n(D) Giám đốc điều hành\n\nDịch bài nói:\nChào mừng các nhân viên mới! Tôi tên là Diego, và tôi là người điều phối tất cả các buổi định hướng. Trước khi bắt đầu hôm nay, các bạn sẽ cần thiết lập tài khoản nhân viên của mình. Nếu các bạn nhìn vào trang đầu tiên của bìa hồ sơ đào tạo, các bạn sẽ thấy tên đăng nhập và mật khẩu tạm thời của mình. Sau khi hoàn tất, các bạn sẽ có quyền truy cập vào tất cả các tệp của bộ phận mình. Xin lưu ý rằng các bạn chỉ có thể truy cập chúng từ máy tính của công ty."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "75. According to the speaker, what will the listeners find in a binder? (A) A map of the building (B) An employment contract (C) An identification badge (D) Log-in credentials",
   "transcript": "Welcome, new employees! My name is Diego, and I facilitate all orientation sessions. Before we start today, you will need to set up your employee account. If you look at the first page of your training binder, you'll see your username and a temporary password. Once that's complete, you'll have access to all your department's files. Please note that you can only access them from your company computer.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n75. Theo người nói, người nghe sẽ tìm thấy gì trong bìa kẹp hồ sơ?\n(A) Bản đồ tòa nhà\n(B) Hợp đồng lao động\n(C) Thẻ nhận dạng\n(D) Thông tin đăng nhập\n\nDịch bài nói:\nChào mừng các nhân viên mới! Tôi tên là Diego, và tôi là người điều phối tất cả các buổi định hướng. Trước khi bắt đầu hôm nay, các bạn sẽ cần thiết lập tài khoản nhân viên của mình. Nếu các bạn nhìn vào trang đầu tiên của bìa hồ sơ đào tạo, các bạn sẽ thấy tên đăng nhập và mật khẩu tạm thời của mình. Sau khi hoàn tất, các bạn sẽ có quyền truy cập vào tất cả các tệp của bộ phận mình. Xin lưu ý rằng các bạn chỉ có thể truy cập chúng từ máy tính của công ty."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "76. What does the speaker say about department files? (A) They are only accessible from company computers. (B) They must be password protected. (C) They must follow a specific naming convention. (D) They must be archived annually.",
   "transcript": "Welcome, new employees! My name is Diego, and I facilitate all orientation sessions. Before we start today, you will need to set up your employee account. If you look at the first page of your training binder, you'll see your username and a temporary password. Once that's complete, you'll have access to all your department's files. Please note that you can only access them from your company computer.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n76. Người nói nói gì về các tập tin của bộ phận?\n(A) Chỉ có thể truy cập từ máy tính công ty.\n(B) Chúng phải được bảo vệ bằng mật khẩu.\n(C) Chúng phải tuân theo một quy ước đặt tên cụ thể.\n(D) Chúng phải được lưu trữ hàng năm.\n\nDịch bài nói:\nChào mừng các nhân viên mới! Tôi tên là Diego, và tôi là người điều phối tất cả các buổi định hướng. Trước khi bắt đầu hôm nay, các bạn sẽ cần thiết lập tài khoản nhân viên của mình. Nếu các bạn nhìn vào trang đầu tiên của bìa hồ sơ đào tạo, các bạn sẽ thấy tên đăng nhập và mật khẩu tạm thời của mình. Sau khi hoàn tất, các bạn sẽ có quyền truy cập vào tất cả các tệp của bộ phận mình. Xin lưu ý rằng các bạn chỉ có thể truy cập chúng từ máy tính của công ty."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "77. Where does the speaker work? (A) At a laundry facility (B) At an amusement park (C) At a sports stadium (D) At a fitness center",
   "transcript": "Hello. This is Heather Ross calling from Denville Amusement Park. About a month ago, I ordered one of your new video-game machines, Space Defenders. I'm really happy with my purchase, since the game has been incredibly popular with our park guests! I heard you may be releasing a new game soon. Could you call me back and let me know if that's true?",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n77. Người nói làm việc ở đâu?\n(A) Tại một cơ sở giặt ủi\n(B) Tại một công viên giải trí\n(C) Tại một sân vận động thể thao\n(D) Tại một trung tâm thể hình\n\nDịch bài nói:\nXin chào. Tôi là Heather Ross gọi từ Công viên Giải trí Denville. Khoảng một tháng trước, tôi đã đặt mua một trong những máy chơi game mới của các bạn, Space Defenders. Tôi thực sự hài lòng với đơn hàng này, vì trò chơi này cực kỳ phổ biến với khách ghé thăm công viên của chúng tôi! Tôi nghe nói các bạn sắp phát hành một trò chơi mới. Bạn có thể gọi lại và cho tôi biết điều đó có đúng không?"
  },
  {
   "number": 78,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "78. What does the speaker say about an item she ordered a month ago? (A) It arrived later than expected. (B) It was damaged during delivery. (C) She needs help assembling it. (D) She is pleased with it.",
   "transcript": "Hello. This is Heather Ross calling from Denville Amusement Park. About a month ago, I ordered one of your new video-game machines, Space Defenders. I'm really happy with my purchase, since the game has been incredibly popular with our park guests! I heard you may be releasing a new game soon. Could you call me back and let me know if that's true?",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n78. Người nói nói gì về món đồ cô ấy đã đặt một tháng trước?\n(A) Nó đến muộn hơn dự kiến.\n(B) Nó bị hỏng trong quá trình vận chuyển.\n(C) Cô ấy cần giúp đỡ để lắp ráp nó.\n(D) Cô ấy hài lòng với nó.\n\nDịch bài nói:\nXin chào. Tôi là Heather Ross gọi từ Công viên Giải trí Denville. Khoảng một tháng trước, tôi đã đặt mua một trong những máy chơi game mới của các bạn, Space Defenders. Tôi thực sự hài lòng với đơn hàng này, vì trò chơi này cực kỳ phổ biến với khách ghé thăm công viên của chúng tôi! Tôi nghe nói các bạn sắp phát hành một trò chơi mới. Bạn có thể gọi lại và cho tôi biết điều đó có đúng không?"
  },
  {
   "number": 79,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "79. What does the speaker ask the listener to confirm? (A) Whether a new product will be available soon (B) When a replacement part will be shipped (C) How long a warranty lasts (D) Who to contact about future orders",
   "transcript": "Hello. This is Heather Ross calling from Denville Amusement Park. About a month ago, I ordered one of your new video-game machines, Space Defenders. I'm really happy with my purchase, since the game has been incredibly popular with our park guests! I heard you may be releasing a new game soon. Could you call me back and let me know if that's true?",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n79. Người nói yêu cầu người nghe xác nhận điều gì?\n(A) Liệu sản phẩm mới có sớm ra mắt không\n(B) Khi nào bộ phận thay thế sẽ được gửi đi\n(C) Thời gian bảo hành kéo dài bao lâu\n(D) Ai là người liên hệ về các đơn hàng tương lai\n\nDịch bài nói:\nXin chào. Tôi là Heather Ross gọi từ Công viên Giải trí Denville. Khoảng một tháng trước, tôi đã đặt mua một trong những máy chơi game mới của các bạn, Space Defenders. Tôi thực sự hài lòng với đơn hàng này, vì trò chơi này cực kỳ phổ biến với khách ghé thăm công viên của chúng tôi! Tôi nghe nói các bạn sắp phát hành một trò chơi mới. Bạn có thể gọi lại và cho tôi biết điều đó có đúng không?"
  },
  {
   "number": 80,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "80. What type of product does the speaker's company make? (A) Furniture (B) Luggage (C) Bedding (D) Clothing",
   "transcript": "The first agenda item for our board meeting is the annual sales report. We're all disappointed by the drop in our clothing sales. So I'm recommending that we start manufacturing some clothing locally. I hired a consultant to put together a list of locations we could use. He'll be at our next board meeting to explain the pros and cons of each.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n80. Công ty của người nói sản xuất loại sản phẩm nào?\n(A) Nội thất\n(B) Hành lý/Van li\n(C) Đồ dùng phòng ngủ (chăn ga gối nệm)\n(D) Quần áo\n\nDịch bài nói:\nMục đầu tiên trong chương trình nghị sự cho cuộc họp hội đồng quản trị của chúng ta là báo cáo doanh số hàng năm. Tất cả chúng ta đều thất vọng vì doanh số bán quần áo sụt giảm. Vì vậy, tôi đề xuất chúng ta bắt đầu sản xuất một số mặt hàng quần áo tại địa phương. Tôi đã thuê một tư vấn viên để lập danh sách các địa điểm chúng ta có thể sử dụng. Anh ấy sẽ có mặt trong cuộc họp tiếp theo để giải thích ưu và nhược điểm của từng nơi."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "81. What does the speaker recommend doing? (A) Manufacturing some products locally (B) Offering free shipping (C) Participating in a trade show (D) Developing a new product line",
   "transcript": "The first agenda item for our board meeting is the annual sales report. We're all disappointed by the drop in our clothing sales. So I'm recommending that we start manufacturing some clothing locally. I hired a consultant to put together a list of locations we could use. He'll be at our next board meeting to explain the pros and cons of each.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n81. Người nói đề xuất làm điều gì?\n(A) Sản xuất một số sản phẩm tại địa phương\n(B) Cung cấp dịch vụ giao hàng miễn phí\n(C) Tham gia một hội chợ triển lãm thương mại\n(D) Phát triển một dòng sản phẩm mới\n\nDịch bài nói:\nMục đầu tiên trong chương trình nghị sự cho cuộc họp hội đồng quản trị của chúng ta là báo cáo doanh số hàng năm. Tất cả chúng ta đều thất vọng vì doanh số bán quần áo sụt giảm. Vì vậy, tôi đề xuất chúng ta bắt đầu sản xuất một số mặt hàng quần áo tại địa phương. Tôi đã thuê một tư vấn viên để lập danh sách các địa điểm chúng ta có thể sử dụng. Anh ấy sẽ có mặt trong cuộc họp tiếp theo để giải thích ưu và nhược điểm của từng nơi."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "82. What will happen at the next meeting? (A) A vote will take place. (B) A consultant will give a presentation. (C) Some contracts will be updated. (D) Safety procedures will be reviewed.",
   "transcript": "The first agenda item for our board meeting is the annual sales report. We're all disappointed by the drop in our clothing sales. So I'm recommending that we start manufacturing some clothing locally. I hired a consultant to put together a list of locations we could use. He'll be at our next board meeting to explain the pros and cons of each.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n82. Điều gì sẽ xảy ra tại cuộc họp tiếp theo?\n(A) Một cuộc bỏ phiếu sẽ diễn ra.\n(B) Một cố vấn sẽ trình bày.\n(C) Một số hợp đồng sẽ được cập nhật.\n(D) Các quy trình an toàn sẽ được xem xét lại.\n\nDịch bài nói:\nMục đầu tiên trong chương trình nghị sự cho cuộc họp hội đồng quản trị của chúng ta là báo cáo doanh số hàng năm. Tất cả chúng ta đều thất vọng vì doanh số bán quần áo sụt giảm. Vì vậy, tôi đề xuất chúng ta bắt đầu sản xuất một số mặt hàng quần áo tại địa phương. Tôi đã thuê một tư vấn viên để lập danh sách các địa điểm chúng ta có thể sử dụng. Anh ấy sẽ có mặt trong cuộc họp tiếp theo để giải thích ưu và nhược điểm của từng nơi."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "83. What is the announcement mainly about? (A) A promotional event (B) A vacation package (C) A building renovation (D) A travel delay",
   "transcript": "Attention, passengers. All trains to Midway Station are delayed for track repairs. They expect to complete the repair within the hour. A bus will be departing for that destination in fifteen minutes. Also, a reminder that the station café opens at eight A.M., and there are food kiosks on platform one.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n83. Thông báo chủ yếu nói về điều gì?\n(A) Một sự kiện quảng cáo\n(B) Một gói kỳ nghỉ\n(C) Một cuộc cải tạo tòa nhà\n(D) Một sự trì hoãn chuyến đi\n\nDịch bài nói:\nXin hành khách chú ý. Tất cả các đoàn tàu đến ga Midway đều bị hoãn để sửa chữa đường ray. Họ dự kiến sẽ hoàn thành việc sửa chữa trong vòng một giờ tới. Một chiếc xe buýt sẽ khởi hành đến điểm đến đó trong 15 phút nữa. Ngoài ra, xin nhắc lại rằng quán cà phê tại nhà ga mở cửa lúc 8 giờ sáng, và có các quầy thực phẩm tại sân ga số 1."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "84. Why does the speaker say, \"A bus will be departing for that destination in fifteen minutes\"? (A) To suggest an alternative arrangement (B) To explain an extended wait time (C) To recommend changing the travel date (D) To inform customers about a new destination",
   "transcript": "Attention, passengers. All trains to Midway Station are delayed for track repairs. They expect to complete the repair within the hour. A bus will be departing for that destination in fifteen minutes. Also, a reminder that the station café opens at eight A.M., and there are food kiosks on platform one.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n84. Tại sao người nói lại nói \"Một chiếc xe buýt sẽ khởi hành đến điểm đến đó trong 15 phút nữa\"?\n(A) Để gợi ý một sự sắp xếp thay thế\n(B) Để giải thích thời gian chờ kéo dài\n(C) Để khuyên nên thay đổi ngày đi\n(D) Để thông báo cho khách hàng về điểm đến mới\n\nDịch bài nói:\nXin hành khách chú ý. Tất cả các đoàn tàu đến ga Midway đều bị hoãn để sửa chữa đường ray. Họ dự kiến sẽ hoàn thành việc sửa chữa trong vòng một giờ tới. Một chiếc xe buýt sẽ khởi hành đến điểm đến đó trong 15 phút nữa. Ngoài ra, xin nhắc lại rằng quán cà phê tại nhà ga mở cửa lúc 8 giờ sáng, và có các quầy thực phẩm tại sân ga số 1."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "85. What does the speaker remind the listeners about? (A) How to download a mobile application (B) Where a waiting area is located (C) How to reserve tickets (D) Where to buy food",
   "transcript": "Attention, passengers. All trains to Midway Station are delayed for track repairs. They expect to complete the repair within the hour. A bus will be departing for that destination in fifteen minutes. Also, a reminder that the station café opens at eight A.M., and there are food kiosks on platform one.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n85. Người nói nhắc nhở người nghe về điều gì?\n(A) Cách tải xuống một ứng dụng di động\n(B) Nơi đặt khu vực chờ\n(C) Cách đặt vé\n(D) Nơi mua thức ăn\n\nDịch bài nói:\nXin hành khách chú ý. Tất cả các đoàn tàu đến ga Midway đều bị hoãn để sửa chữa đường ray. Họ dự kiến sẽ hoàn thành việc sửa chữa trong vòng một giờ tới. Một chiếc xe buýt sẽ khởi hành đến điểm đến đó trong 15 phút nữa. Ngoài ra, xin nhắc lại rằng quán cà phê tại nhà ga mở cửa lúc 8 giờ sáng, và có các quầy thực phẩm tại sân ga số 1."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "86. Where does the speaker most likely work? (A) At a graphic design company (B) At a law firm (C) At a photography studio (D) At a museum",
   "transcript": "I'm calling about the work my design team's doing to update your company logo. I've just e-mailed two versions for you to review. Take your time to think about which one you'd like to choose. I'll be on vacation all next week, but if you call the office, my assistant will set up a meeting for when I get back.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n86. Người nói có khả năng cao là làm việc ở đâu?\n(A) Tại một công ty thiết kế đồ họa\n(B) Tại một văn phòng luật\n(C) Tại một studio chụp ảnh\n(D) Tại một bảo tàng\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nTôi gọi điện về công việc mà nhóm thiết kế của tôi đang thực hiện để cập nhật logo công ty bạn. Tôi vừa gửi email hai phiên bản để bạn xem xét. Hãy dành thời gian để suy nghĩ xem bạn muốn chọn cái nào. Tôi sẽ đi nghỉ suốt tuần tới, nhưng nếu bạn gọi đến văn phòng, trợ lý của tôi sẽ sắp xếp một cuộc họp khi tôi quay lại."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "87. What did the listener receive by e-mail? (A) A newsletter (B) Some images (C) An invoice (D) Some contracts",
   "transcript": "I'm calling about the work my design team's doing to update your company logo. I've just e-mailed two versions for you to review. Take your time to think about which one you'd like to choose. I'll be on vacation all next week, but if you call the office, my assistant will set up a meeting for when I get back.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n87. Người nghe đã nhận được gì qua email?\n(A) Một bản tin\n(B) Một số hình ảnh\n(C) Một hóa đơn\n(D) Một số hợp đồng\n\nDịch bài nói:\nTôi gọi điện về công việc mà nhóm thiết kế của tôi đang thực hiện để cập nhật logo công ty bạn. Tôi vừa gửi email hai phiên bản để bạn xem xét. Hãy dành thời gian để suy nghĩ xem bạn muốn chọn cái nào. Tôi sẽ đi nghỉ suốt tuần tới, nhưng nếu bạn gọi đến văn phòng, trợ lý của tôi sẽ sắp xếp một cuộc họp khi tôi quay lại."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "88. Why is the speaker unavailable next week? (A) She will be working at another branch. (B) She will be with other clients. (C) She will be on vacation. (D) She will be at an industry conference.",
   "transcript": "I'm calling about the work my design team's doing to update your company logo. I've just e-mailed two versions for you to review. Take your time to think about which one you'd like to choose. I'll be on vacation all next week, but if you call the office, my assistant will set up a meeting for when I get back.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n88. Tại sao người nói không có mặt vào tuần tới?\n(A) Cô ấy sẽ làm việc tại một chi nhánh khác.\n(B) Cô ấy sẽ bận với những khách hàng khác.\n(C) Cô ấy sẽ đi nghỉ mát.\n(D) Cô ấy sẽ tham dự một hội nghị ngành.\n\nDịch bài nói:\nTôi gọi điện về công việc mà nhóm thiết kế của tôi đang thực hiện để cập nhật logo công ty bạn. Tôi vừa gửi email hai phiên bản để bạn xem xét. Hãy dành thời gian để suy nghĩ xem bạn muốn chọn cái nào. Tôi sẽ đi nghỉ suốt tuần tới, nhưng nếu bạn gọi đến văn phòng, trợ lý của tôi sẽ sắp xếp một cuộc họp khi tôi quay lại."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "D",
   "group": "89-91",
   "textEn": "89. Who most likely are the listeners? (A) Investors (B) Government officials (C) Engineers (D) Journalists",
   "transcript": "I've scheduled this press conference to officially respond to your inquiries regarding fuel-efficient engines. We hired a firm to determine if this upgrade would be feasible for our trains. It reported that the upgrade would be economical only for trains less than five years old. All of ours are at least ten years old. If you're interested in more details, e-mail our media relations department to receive a summary of the findings.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n89. Người nghe có khả năng cao là ai?\n(A) Các nhà đầu tư\n(B) Các quan chức chính phủ\n(C) Các kỹ sư\n(D) Các nhà báo\n\nDịch bài nói:\nTôi đã lên lịch cuộc họp báo này để phản hồi chính thức các thắc mắc của các bạn về động cơ tiết kiệm nhiên liệu. Chúng tôi đã thuê một công ty để xác định xem việc nâng cấp này có khả thi cho các đoàn tàu của chúng tôi không. Họ báo cáo rằng việc nâng cấp chỉ tiết kiệm cho các tàu có tuổi đời dưới 5 năm. Tất cả tàu của chúng tôi đều ít nhất 10 năm tuổi. Nếu bạn quan tâm đến chi tiết hơn, hãy gửi email cho bộ phận quan hệ truyền thông để nhận bản tóm tắt kết quả."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "90. What does the speaker mean when she says, \"All of ours are at least ten years old\"? (A) An event needs to be relocated. (B) An upgrade is not feasible. (C) A project team has a lot of experience. (D) Some company policies are outdated.",
   "transcript": "I've scheduled this press conference to officially respond to your inquiries regarding fuel-efficient engines. We hired a firm to determine if this upgrade would be feasible for our trains. It reported that the upgrade would be economical only for trains less than five years old. All of ours are at least ten years old. If you're interested in more details, e-mail our media relations department to receive a summary of the findings.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n90. Người nói có ý gì khi nói \"Tất cả của chúng tôi đều ít nhất mười năm tuổi\"?\n(A) Một sự kiện cần được chuyển địa điểm.\n(B) Việc nâng cấp là không khả thi.\n(C) Nhóm dự án có rất nhiều kinh nghiệm.\n(D) Một số chính sách của công ty đã lỗi thời.\n\nDịch bài nói:\nTôi đã lên lịch cuộc họp báo này để phản hồi chính thức các thắc mắc của các bạn về động cơ tiết kiệm nhiên liệu. Chúng tôi đã thuê một công ty để xác định xem việc nâng cấp này có khả thi cho các đoàn tàu của chúng tôi không. Họ báo cáo rằng việc nâng cấp chỉ tiết kiệm cho các tàu có tuổi đời dưới 5 năm. Tất cả tàu của chúng tôi đều ít nhất 10 năm tuổi. Nếu bạn quan tâm đến chi tiết hơn, hãy gửi email cho bộ phận quan hệ truyền thông để nhận bản tóm tắt kết quả."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "91. According to the speaker, what can be requested by e-mail? (A) Some presentation slides (B) Some product samples (C) A report summary (D) A discounted ticket",
   "transcript": "I've scheduled this press conference to officially respond to your inquiries regarding fuel-efficient engines. We hired a firm to determine if this upgrade would be feasible for our trains. It reported that the upgrade would be economical only for trains less than five years old. All of ours are at least ten years old. If you're interested in more details, e-mail our media relations department to receive a summary of the findings.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n91. Theo người nói, cái gì có thể được yêu cầu qua email?\n(A) Một số trang thuyết trình\n(B) Một số mẫu sản phẩm\n(C) Bản tóm tắt báo cáo\n(D) Vé giảm giá\n\nDịch bài nói:\nTôi đã lên lịch cuộc họp báo này để phản hồi chính thức các thắc mắc của các bạn về động cơ tiết kiệm nhiên liệu. Chúng tôi đã thuê một công ty để xác định xem việc nâng cấp này có khả thi cho các đoàn tàu của chúng tôi không. Họ báo cáo rằng việc nâng cấp chỉ tiết kiệm cho các tàu có tuổi đời dưới 5 năm. Tất cả tàu của chúng tôi đều ít nhất 10 năm tuổi. Nếu bạn quan tâm đến chi tiết hơn, hãy gửi email cho bộ phận quan hệ truyền thông để nhận bản tóm tắt kết quả."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "92. What does the speaker want to do? (A) Increase online sales (B) Upgrade a payment system (C) Create a new product line (D) Add store locations",
   "transcript": "I want to explore the use of a more modernized payment system in our cosmetics stores. This system would allow any sales associate to take customer payments from a tablet anywhere in the store. The main complaint about shopping at our stores is waiting in long lines to pay. I've decided to conduct a trial run at our store in the Center City Mall.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n92. Người nói muốn làm gì?\n(A) Tăng doanh số bán hàng trực tuyến\n(B) Nâng cấp hệ thống thanh toán\n(C) Tạo ra một dòng sản phẩm mới\n(D) Thêm các địa điểm cửa hàng\n\nDịch bài nói:\nTôi muốn tìm hiểu việc sử dụng hệ thống thanh toán hiện đại hơn trong các cửa hàng mỹ phẩm của chúng ta. Hệ thống này cho phép bất kỳ nhân viên bán hàng nào cũng có thể nhận thanh toán của khách từ máy tính bảng ở bất kỳ đâu trong cửa hàng. Lời phàn nàn chính về việc mua sắm tại cửa hàng là việc phải chờ đợi trong dòng người dài để thanh toán. Tôi đã quyết định thực hiện một đợt chạy thử tại cửa hàng ở Trung tâm thương mại Center City."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "93. According to the speaker, what is the customers' main complaint? (A) Long lines (B) High prices (C) Unavailable items (D) Unfriendly staff",
   "transcript": "I want to explore the use of a more modernized payment system in our cosmetics stores. This system would allow any sales associate to take customer payments from a tablet anywhere in the store. The main complaint about shopping at our stores is waiting in long lines to pay. I've decided to conduct a trial run at our store in the Center City Mall.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n93. Theo người nói, lời phàn nàn chính của khách hàng là gì?\n(A) Xếp hàng dài\n(B) Giá cao\n(C) Các món đồ không có sẵn\n(D) Nhân viên không thân thiện\n\nDịch bài nói:\nTôi muốn tìm hiểu việc sử dụng hệ thống thanh toán hiện đại hơn trong các cửa hàng mỹ phẩm của chúng ta. Hệ thống này cho phép bất kỳ nhân viên bán hàng nào cũng có thể nhận thanh toán của khách từ máy tính bảng ở bất kỳ đâu trong cửa hàng. Lời phàn nàn chính về việc mua sắm tại cửa hàng là việc phải chờ đợi trong dòng người dài để thanh toán. Tôi đã quyết định thực hiện một đợt chạy thử tại cửa hàng ở Trung tâm thương mại Center City."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "94. Why does the speaker say, \"that's our busiest location\"? (A) To request some feedback (B) To compliment some staff (C) To express frustration (D) To justify a choice",
   "transcript": "I want to explore the use of a more modernized payment system in our cosmetics stores. This system would allow any sales associate to take customer payments from a tablet anywhere in the store. The main complaint about shopping at our stores is waiting in long lines to pay. I've decided to conduct a trial run at our store in the Center City Mall.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n94. Tại sao người nói lại nói \"đó là địa điểm bận rộn nhất của chúng tôi\"?\n(A) Để yêu cầu một số phản hồi\n(B) Để khen ngợi một số nhân viên\n(C) Để bày tỏ sự thất vọng\n(D) Để giải thích cho một sự lựa chọn\n\nDịch bài nói:\nTôi muốn tìm hiểu việc sử dụng hệ thống thanh toán hiện đại hơn trong các cửa hàng mỹ phẩm của chúng ta. Hệ thống này cho phép bất kỳ nhân viên bán hàng nào cũng có thể nhận thanh toán của khách từ máy tính bảng ở bất kỳ đâu trong cửa hàng. Lời phàn nàn chính về việc mua sắm tại cửa hàng là việc phải chờ đợi trong dòng người dài để thanh toán. Tôi đã quyết định thực hiện một đợt chạy thử tại cửa hàng ở Trung tâm thương mại Center City."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "95. According to the speaker, what is special about the Reston Office Tower? (A) It features an indoor garden. (B) It exhibits work from local artists. (C) It runs on solar power. (D) It has won many awards.",
   "transcript": "The downtown Reston Office Tower is completed. The most extraordinary feature of the building is its beautiful garden, located in the lobby. We interviewed the CEO of Barnum Financial Services about its new offices. He said he and his team are excited to move in in January. A recording of the full interview is available on our Web site.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n95. Theo người nói, Tháp Văn phòng Reston có điểm gì đặc biệt?\n(A) Nó có một khu vườn trong nhà.\n(B) Nó trưng bày tác phẩm từ các nghệ sĩ địa phương.\n(C) Nó chạy bằng năng lượng mặt trời.\n(D) Nó đã giành được nhiều giải thưởng.\n\nDịch bài nói:\nTòa tháp văn phòng Reston ở trung tâm thành phố đã hoàn thành. Đặc điểm phi thường nhất của tòa nhà là khu vườn tuyệt đẹp nằm ở sảnh đợi. Chúng tôi đã phỏng vấn Giám đốc điều hành của Barnum Financial Services về các văn phòng mới của họ. Ông ấy nói ông và nhóm của mình rất hào hứng khi chuyển đến vào tháng Giêng. Bản ghi âm buổi phỏng vấn đầy đủ hiện có trên trang web của chúng tôi."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "96. Look at the graphic. Which floors will be occupied in January? (A) Floors 1-5 (B) Floors 6-10 (C) Floors 11-14 (D) Floors 15-17",
   "transcript": "The downtown Reston Office Tower is completed. The most extraordinary feature of the building is its beautiful garden, located in the lobby. We interviewed the CEO of Barnum Financial Services about its new offices. He said he and his team are excited to move in in January. A recording of the full interview is available on our Web site.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n96. Nhìn vào đồ họa. Những tầng nào sẽ được sử dụng vào tháng Giêng?\n(A) Tầng 1-5\n(B) Tầng 6-10\n(C) Tầng 11-14\n(D) Tầng 15-17\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nTòa tháp văn phòng Reston ở trung tâm thành phố đã hoàn thành. Đặc điểm phi thường nhất của tòa nhà là khu vườn tuyệt đẹp nằm ở sảnh đợi. Chúng tôi đã phỏng vấn Giám đốc điều hành của Barnum Financial Services về các văn phòng mới của họ. Ông ấy nói ông và nhóm của mình rất hào hứng khi chuyển đến vào tháng Giêng. Bản ghi âm buổi phỏng vấn đầy đủ hiện có trên trang web của chúng tôi."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "97. What does the speaker say is available on a Web site? (A) Some photographs (B) An event schedule (C) A floor layout (D) A recorded interview",
   "transcript": "The downtown Reston Office Tower is completed. The most extraordinary feature of the building is its beautiful garden, located in the lobby. We interviewed the CEO of Barnum Financial Services about its new offices. He said he and his team are excited to move in in January. A recording of the full interview is available on our Web site.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n97. Người nói nói rằng cái gì có sẵn trên một trang web?\n(A) Một số bức ảnh\n(B) Lịch trình sự kiện\n(C) Sơ đồ mặt bằng tầng\n(D) Một cuộc phỏng vấn được ghi âm\n\nDịch bài nói:\nTòa tháp văn phòng Reston ở trung tâm thành phố đã hoàn thành. Đặc điểm phi thường nhất của tòa nhà là khu vườn tuyệt đẹp nằm ở sảnh đợi. Chúng tôi đã phỏng vấn Giám đốc điều hành của Barnum Financial Services về các văn phòng mới của họ. Ông ấy nói ông và nhóm của mình rất hào hứng khi chuyển đến vào tháng Giêng. Bản ghi âm buổi phỏng vấn đầy đủ hiện có trên trang web của chúng tôi."
  },
  {
   "number": 98,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "98. Who most likely are the listeners? (A) Safety engineers (B) Laboratory technicians (C) Legal consultants (D) Business investors",
   "transcript": "Thank you for attending this meeting for prospective investors. ZZ Mining has been planning to expand our operations by opening an additional silver mine. The site with 390 grams per ton has a larger deposit, so that's where we'll build the new mine. Our next step is to apply for the necessary permits. We'll do that next week.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n98. Người nghe có khả năng cao là ai?\n(A) Các kỹ sư an toàn\n(B) Các kỹ thuật viên phòng thí nghiệm\n(C) Các tư vấn pháp lý\n(D) Các nhà đầu tư kinh doanh\n\nDịch bài nói:\nCảm ơn các bạn đã tham dự cuộc họp này dành cho các nhà đầu tư tiềm năng. ZZ Mining đã lên kế hoạch mở rộng hoạt động bằng cách mở thêm một mỏ bạc. Địa điểm có gram bạc mỗi tấn có trữ lượng lớn hơn, vì vậy đó là nơi chúng tôi sẽ xây dựng mỏ mới. Bước tiếp theo của chúng tôi là xin các giấy phép cần thiết. Chúng tôi sẽ thực hiện việc đó vào tuần tới."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "99. Look at the graphic. Where will a new mine be built? (A) At site 1 (B) At site 2 (C) At site 3 (D) At site 4",
   "transcript": "Thank you for attending this meeting for prospective investors. ZZ Mining has been planning to expand our operations by opening an additional silver mine. The site with 390 grams per ton has a larger deposit, so that's where we'll build the new mine. Our next step is to apply for the necessary permits. We'll do that next week.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n99. Nhìn vào đồ họa. Một mỏ mới sẽ được xây dựng ở đâu?\n(A) Tại vị trí 1\n(B) Tại vị trí 2\n(C) Tại vị trí 3\n(D) Tại vị trí 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nCảm ơn các bạn đã tham dự cuộc họp này dành cho các nhà đầu tư tiềm năng. ZZ Mining đã lên kế hoạch mở rộng hoạt động bằng cách mở thêm một mỏ bạc. Địa điểm có gram bạc mỗi tấn có trữ lượng lớn hơn, vì vậy đó là nơi chúng tôi sẽ xây dựng mỏ mới. Bước tiếp theo của chúng tôi là xin các giấy phép cần thiết. Chúng tôi sẽ thực hiện việc đó vào tuần tới."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "100. What does the speaker say is the next step? (A) Applying for permits (B) Installing equipment (C) Hiring additional staff (D) Updating a manual",
   "transcript": "Thank you for attending this meeting for prospective investors. ZZ Mining has been planning to expand our operations by opening an additional silver mine. The site with 390 grams per ton has a larger deposit, so that's where we'll build the new mine. Our next step is to apply for the necessary permits. We'll do that next week.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n100. Người nói nói bước tiếp theo là gì?\n(A) Đệ đơn xin giấy phép\n(B) Lắp đặt thiết bị\n(C) Thuê thêm nhân viên\n(D) Cập nhật một bản hướng dẫn\n\nDịch bài nói:\nCảm ơn các bạn đã tham dự cuộc họp này dành cho các nhà đầu tư tiềm năng. ZZ Mining đã lên kế hoạch mở rộng hoạt động bằng cách mở thêm một mỏ bạc. Địa điểm có gram bạc mỗi tấn có trữ lượng lớn hơn, vì vậy đó là nơi chúng tôi sẽ xây dựng mỏ mới. Bước tiếp theo của chúng tôi là xin các giấy phép cần thiết. Chúng tôi sẽ thực hiện việc đó vào tuần tới."
  }
 ],
 "2": [
  {
   "number": 1,
   "part": 1,
   "answer": "B",
   "textEn": "(A) A man is closing a metal gate. (B) A man is walking down a stone path. (C) Some potted plants line a walkway. (D) Some flags are hanging from balconies.",
   "transcript": "(A) A man is closing a metal gate.\n(B) A man is walking down a stone path.\n(C) Some potted plants line a walkway.\n(D) Some flags are hanging from balconies.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một người đàn ông đang đóng cổng kim loại.\n(B) Một người đàn ông đang đi bộ xuống lối đi đá.\n(C) Một số chậu cây xếp dọc lối đi.\n(D) Một số cờ đang treo từ ban công."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Some shopping bags have been placed on a train platform. (B) Some people are lined up to buy train tickets. (C) A woman is pulling her luggage behind her. (D) A man is leaning against a railing.",
   "transcript": "(A) Some shopping bags have been placed on a train platform.\n(B) Some people are lined up to buy train tickets.\n(C) A woman is pulling her luggage behind her.\n(D) A man is leaning against a railing.",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Một số túi mua sắm đã được đặt trên sân ga tàu.\n(B) Một số người đang xếp hàng để mua vé tàu.\n(C) Một người phụ nữ đang kéo hành lý phía sau.\n(D) Một người đàn ông đang dựa vào lan can."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some wooden planks are leaning against a wall. (B) A vehicle is parked next to a building. (C) Some stones have been stacked on a pallet. (D) A package has been left near a door.",
   "transcript": "(A) Some wooden planks are leaning against a wall.\n(B) A vehicle is parked next to a building.\n(C) Some stones have been stacked on a pallet.\n(D) A package has been left near a door.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một số ván gỗ đang dựa vào tường.\n(B) Một phương tiện đang đỗ bên cạnh tòa nhà.\n(C) Một số viên đá đã được xếp chồng lên pallet.\n(D) Một gói hàng đã được để lại gần cửa."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "A",
   "textEn": "(A) A man is holding up his phone. (B) A man is pinning a note to a bulletin board. (C) A man is dropping an item into a bin. (D) A man is washing some windows.",
   "transcript": "(A) A man is holding up his phone.\n(B) A man is pinning a note to a bulletin board.\n(C) A man is dropping an item into a bin.\n(D) A man is washing some windows.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một người đàn ông đang giơ điện thoại lên.\n(B) Một người đàn ông đang ghim ghi chú lên bảng thông báo.\n(C) Một người đàn ông đang thả vật phẩm vào thùng.\n(D) Một người đàn ông đang rửa cửa sổ."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "C",
   "textEn": "(A)She's tying the back of her apron. (B)She's reaching for food on a shelf. (C)She's working at a counter. (D)She's putting food into a refrigerator.",
   "transcript": "(A)She's tying the back of her apron.\n(B)She's reaching for food on a shelf.\n(C)She's working at a counter.\n(D)She's putting food into a refrigerator.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Cô ấy đang buộc dây tạp dề phía sau.\n(B) Cô ấy đang với tay lấy thức ăn trên kệ.\n(C)Cô ấy đang làm việc tại quầy.\n(D) Cô ấy đang đặt thức ăn vào tủ lạnh."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "A",
   "textEn": "(A)He's setting up a buffet. (B)He's putting plates on dining tables. (C)He's watering some plants in a garden. (D)He's carrying food up a stairway.",
   "transcript": "(A)He's setting up a buffet.\n(B)He's putting plates on dining tables.\n(C)He's watering some plants in a garden.\n(D)He's carrying food up a stairway.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Anh ấy đang chuẩn bị bàn tiệc buffet.\n(B) Anh ấy đang đặt đĩa lên bàn ăn.\n(C) Anh ấy đang tưới nước cho cây trong vườn.\n(D) Anh ấy đang mang thức ăn lên cầu thang."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "A",
   "textEn": "Will you order the pasta or the chicken? (A)I'll have the pasta. (B)Yes, I studied Italian. (C)I think we should paint the kitchen.",
   "transcript": "Will you order the pasta or the chicken?\n(A)I'll have the pasta.\n(B)Yes, I studied Italian.\n(C)I think we should paint the kitchen.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn sẽ gọi mì Ý hay gà?\n(A)Tôi sẽ lấy mì Ý.\n(B)Vâng, tôi đã học tiếng Ý.\n(C)Tôi nghĩ chúng ta nên sơn lại bếp."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "B",
   "textEn": "Who should I talk to about getting a ticket to Bangkok? (A)How about after the conference? (B)The agent at the ticket counter. (C)In front of the theater.",
   "transcript": "Who should I talk to about getting a ticket to Bangkok?\n(A)How about after the conference?\n(B)The agent at the ticket counter.\n(C)In front of the theater.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi nên nói chuyện với ai để mua vé đến Bangkok?\n(A)Sau hội nghị thì sao?\n(B)Nhân viên tại quầy vé.\n(C)Trước rạp hát."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "C",
   "textEn": "Would you like the report to be e-mailed or printed out? (A)An electric heater. (B)Page 25. (C)Either way is fine.",
   "transcript": "Would you like the report to be e-mailed or printed out?\n(A)An electric heater.\n(B)Page 25.\n(C)Either way is fine.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn muốn nhận báo cáo qua email hay in ra?\n(A)Máy sưởi điện.\n(B)Trang 25.\n(C)Cách nào cũng được."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "A",
   "textEn": "Have you decided how much to charge for your concert tickets? (A)Yes—fifteen dollars each. (B)I've read about that. (C)A jazz band.",
   "transcript": "Have you decided how much to charge for your concert tickets?\n(A)Yes—fifteen dollars each.\n(B)I've read about that.\n(C)A jazz band.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn đã quyết định giá vé buổi hòa nhạc là bao nhiêu chưa?\n(A)Rồi—mười lăm đô la mỗi vé.\n(B)Tôi đã đọc về điều đó.\n(C)Ban nhạc jazz."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "C",
   "textEn": "How often does the store offer a sales promotion? (A) A discount on appliances. (B) Sure, I can buy some. (C) Every three months.",
   "transcript": "How often does the store offer a sales promotion?\n(A) A discount on appliances.\n(B) Sure, I can buy some.\n(C) Every three months.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCửa hàng tổ chức khuyến mãi bao lâu một lần?\n(A) Giảm giá đồ gia dụng.\n(B) Chắc chắn rồi, tôi có thể mua vài cái.\n(C) Mỗi ba tháng."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "C",
   "textEn": "The tour starts at noon today, doesn't it? (A) Please start this washing machine. (B) He's playing a folk tune. (C) No—it's been postponed an hour.",
   "transcript": "The tour starts at noon today, doesn't it?\n(A) Please start this washing machine.\n(B) He's playing a folk tune.\n(C) No—it's been postponed an hour.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nChuyến tham quan bắt đầu lúc trưa nay, phải không?\n(A) Vui lòng khởi động máy giặt này.\n(B) Anh ấy đang chơi giai điệu dân gian.\n(C) Không—nó đã bị hoãn một giờ."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "A",
   "textEn": "Let's begin our meeting about the Taylor project. (A) Good idea—we have a lot to get through. (B) Some project proposals. (C) No, in room 725.",
   "transcript": "Let's begin our meeting about the Taylor project.\n(A) Good idea—we have a lot to get through.\n(B) Some project proposals.\n(C) No, in room 725.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nHãy bắt đầu cuộc họp về dự án Taylor.\n(A) Ý hay—chúng ta có nhiều việc phải làm.\n(B) Một số đề xuất dự án.\n(C) Không, ở phòng 725."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "A",
   "textEn": "There's a dental clinic on Main Street, isn't there? (A) Yes, it's very convenient. (B) A toothbrush and toothpaste. (C) I'll have the main dish, thanks.",
   "transcript": "There's a dental clinic on Main Street, isn't there?\n(A) Yes, it's very convenient.\n(B) A toothbrush and toothpaste.\n(C) I'll have the main dish, thanks.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCó phòng khám nha khoa trên phố Main, phải không?\n(A) Có, rất tiện lợi.\n(B) Bàn chải đánh răng và kem đánh răng.\n(C) Tôi sẽ lấy món chính, cảm ơn."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "B",
   "textEn": "Where is the book reading going to take place? (A) Sure—I can give you a tour later. (B) At the library. (C) It lasts a while.",
   "transcript": "Where is the book reading going to take place?\n(A) Sure—I can give you a tour later.\n(B) At the library.\n(C) It lasts a while.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBuổi đọc sách sẽ diễn ra ở đâu?\n(A) Chắc chắn—tôi có thể dẫn bạn tham quan sau.\n(B) Tại thư viện.\n(C) Nó kéo dài một lúc."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "C",
   "textEn": "When's the bus going to be here? (A) A round-trip ticket. (B) Let's break for lunch. (C) At 3:30 P.M.",
   "transcript": "When's the bus going to be here?\n(A) A round-trip ticket.\n(B) Let's break for lunch.\n(C) At 3:30 P.M.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nXe buýt sẽ đến đây lúc nào?\n(A) Vé khứ hồi.\n(B) Hãy nghỉ ăn trưa.\n(C) Lúc 3:30 chiều."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "A",
   "textEn": "The estimated price for this car insurance is higher than we expected. (A) We'll check to see if there's a cheaper rate. (B) There's another filling station nearby. (C) The parking garage on the corner.",
   "transcript": "The estimated price for this car insurance is higher than we expected.\n(A) We'll check to see if there's a cheaper rate.\n(B) There's another filling station nearby.\n(C) The parking garage on the corner.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nGiá ước tính cho bảo hiểm xe hơi này cao hơn chúng tôi mong đợi.\n(A) Chúng tôi sẽ kiểm tra xem có mức phí rẻ hơn không.\n(B) Có trạm xăng khác gần đây.\n(C) Nhà để xe ở góc phố."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "B",
   "textEn": "Why haven't the renovations been completed yet? (A) It's on the top shelf. (B) Because some materials were delayed. (C) Some guests haven't received an invitation.",
   "transcript": "Why haven't the renovations been completed yet?\n(A) It's on the top shelf.\n(B) Because some materials were delayed.\n(C) Some guests haven't received an invitation.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTại sao việc cải tạo chưa hoàn thành?\n(A) Nó ở trên kệ trên cùng.\n(B) Vì một số vật liệu bị chậm trễ.\n(C) Một số khách chưa nhận được lời mời."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "C",
   "textEn": "I'll give you my office number in case you have questions about the data. (A) The theater is reserved for that date. (B) The file cabinet needs to be moved. (C) Thanks—I appreciate that.",
   "transcript": "I'll give you my office number in case you have questions about the data.\n(A) The theater is reserved for that date.\n(B) The file cabinet needs to be moved.\n(C) Thanks—I appreciate that.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTôi sẽ cho bạn số văn phòng của tôi phòng trường hợp bạn có câu hỏi về dữ liệu.\n(A) Rạp hát đã được đặt cho ngày đó.\n(B) Tủ hồ sơ cần được di chuyển.\n(C) Cảm ơn—Tôi đánh giá cao điều đó."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "Which parking area should we use? (A) The fee is fifteen dollars. (B) About a twenty-minute delay. (C) The one by Smith's Pharmacy.",
   "transcript": "Which parking area should we use?\n(A) The fee is fifteen dollars.\n(B) About a twenty-minute delay.\n(C) The one by Smith's Pharmacy.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nChúng ta nên sử dụng khu vực đỗ xe nào?\n(A) Phí là mười lăm đô la.\n(B) Khoảng hai mươi phút trì hoãn.\n(C) Cái gần Smith's Pharmacy."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "B",
   "textEn": "Let's take a taxi to the airport. (A) My seats are in section 21. (B) Sure, that will be the easiest. (C) The café is a few blocks away.",
   "transcript": "Let's take a taxi to the airport.\n(A) My seats are in section 21.\n(B) Sure, that will be the easiest.\n(C) The café is a few blocks away.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nHãy bắt taxi đến sân bay.\n(A) Ghế của tôi ở phần 21.\n(B) Chắc chắn rồi, đó sẽ là cách dễ nhất.\n(C) Quán cà phê cách vài khối nhà."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "C",
   "textEn": "Our team training session was well attended, wasn't it? (A) They were delivered yesterday. (B) No, just down the hall. (C) Actually, not everyone was there.",
   "transcript": "Our team training session was well attended, wasn't it?\n(A) They were delivered yesterday.\n(B) No, just down the hall.\n(C) Actually, not everyone was there.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBuổi đào tạo đội ngũ của chúng ta có nhiều người tham dự, phải không?\n(A) Chúng được giao hôm qua.\n(B) Không, chỉ xuống hành lang.\n(C) Thực ra, không phải mọi người đều có mặt."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "A",
   "textEn": "Why's the company discontinuing its newsletter? (A) Only the print version. (B) Two to three times per week. (C) How far is the main office building?",
   "transcript": "Why's the company discontinuing its newsletter?\n(A) Only the print version.\n(B) Two to three times per week.\n(C) How far is the main office building?",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nTại sao công ty ngừng bản tin?\n(A) Chỉ phiên bản in.\n(B) Hai đến ba lần mỗi tuần.\n(C) Tòa nhà văn phòng chính cách bao xa?"
  },
  {
   "number": 24,
   "part": 2,
   "answer": "A",
   "textEn": "Weren't you planning to take the afternoon off? (A) The clients wanted to meet today. (B) I took it off the middle shelf. (C) He created a great project plan.",
   "transcript": "Weren't you planning to take the afternoon off?\n(A) The clients wanted to meet today.\n(B) I took it off the middle shelf.\n(C) He created a great project plan.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn không định nghỉ chiều nay sao?\n(A) Khách hàng muốn gặp hôm nay.\n(B) Tôi lấy nó từ kệ giữa.\n(C) Anh ấy đã tạo kế hoạch dự án tuyệt vời."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "Dr. Molina sees patients in her Middleville office. (A) The instructor was so patient with the students. (B) Oh, that's only two kilometers from my house. (C) We have some digital thermometers in stock.",
   "transcript": "Dr. Molina sees patients in her Middleville office.\n(A) The instructor was so patient with the students.\n(B) Oh, that's only two kilometers from my house.\n(C) We have some digital thermometers in stock.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBác sĩ Molina khám bệnh nhân tại văn phòng Middleville của bà ấy.\n(A) Người hướng dẫn rất kiên nhẫn với học sinh.\n(B) Ồ, chỉ cách nhà tôi hai kilômét.\n(C) Chúng tôi có một số nhiệt kế kỹ thuật số trong kho."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "B",
   "textEn": "Who's going out for lunch? (A) I enjoyed that book too. (B) I'll be leaving work before then. (C) What are you doing this weekend?",
   "transcript": "Who's going out for lunch?\n(A) I enjoyed that book too.\n(B) I'll be leaving work before then.\n(C) What are you doing this weekend?",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nAi đi ăn trưa ngoài?\n(A) Tôi cũng thích cuốn sách đó.\n(B) Tôi sẽ rời văn phòng trước lúc đó.\n(C) Bạn làm gì cuối tuần này?"
  },
  {
   "number": 27,
   "part": 2,
   "answer": "B",
   "textEn": "Do the tickets go on sale this week or next? (A) The cafeteria downstairs. (B) They're already sold out. (C) Sure, no problem.",
   "transcript": "Do the tickets go on sale this week or next?\n(A) The cafeteria downstairs.\n(B) They're already sold out.\n(C) Sure, no problem.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nVé bán tuần này hay tuần sau?\n(A) Căng tin dưới lầu.\n(B) Chúng đã bán hết.\n(C) Chắc chắn rồi, không vấn đề."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "When will you finish updating the sales data? (A) I'm waiting for information from one more store. (B) In the top drawer. (C) Sales increased by five percent.",
   "transcript": "When will you finish updating the sales data?\n(A) I'm waiting for information from one more store.\n(B) In the top drawer.\n(C) Sales increased by five percent.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn sẽ hoàn thành cập nhật dữ liệu bán hàng khi nào?\n(A) Tôi đang chờ thông tin từ một cửa hàng nữa.\n(B) Trong ngăn kéo trên cùng.\n(C) Doanh số tăng năm phần trăm."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "B",
   "textEn": "Who's leading the planning session tomorrow? (A) Leadership strategies. (B) I'll be out of the office. (C) Just a few hours.",
   "transcript": "Who's leading the planning session tomorrow?\n(A) Leadership strategies.\n(B) I'll be out of the office.\n(C) Just a few hours.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nAi dẫn dắt buổi lập kế hoạch ngày mai?\n(A) Chiến lược lãnh đạo.\n(B) Tôi sẽ ra khỏi văn phòng.\n(C) Chỉ vài giờ."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "C",
   "textEn": "Aren't we meeting with the clients this evening? (A) No, it's on the opposite side. (B) The television was fixed. (C) My flight to Japan leaves at six.",
   "transcript": "Aren't we meeting with the clients this evening?\n(A) No, it's on the opposite side.\n(B) The television was fixed.\n(C) My flight to Japan leaves at six.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nChúng ta không gặp khách hàng tối nay sao?\n(A)Không, nó ở phía đối diện.\n(B)Ti vi đã được sửa.\n(C)Chuyến bay của tôi đến Nhật Bản khởi hành lúc sáu giờ."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "C",
   "textEn": "They invited me to the opening, didn't they? (A) I plan to submit my application. (B) A membership fee. (C) Check your inbox.",
   "transcript": "They invited me to the opening, didn't they?\n(A) I plan to submit my application.\n(B) A membership fee.\n(C) Check your inbox.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nHọ đã mời tôi đến lễ khai trương, phải không?\n(A)Tôi dự định nộp đơn.\n(B)Phí hội viên.\n(C)Kiểm tra hộp thư đến của bạn."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "32. What kind of work does the man do? (A) He is a tour guide. (B) He is a landlord. (C) He repairs appliances. (D) He delivers food.",
   "transcript": "W: How were your deliveries?\nM: Not bad, except at that new residential building on South Street. I had to call them on my phone to come pick up their food. At first, I tried to call on the building intercom, but it's still broken.\nW: You're not the first to say that. Last week, a customer called to complain that their food was cold by the time they found it.\nM: Maybe we just can't make deliveries there until the landlord fixes the intercom system.\nW: I'm going to update the instructions on our mobile app telling customers to meet us at the building's front door. Let's see if that helps.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n32. Người đàn ông làm công việc gì?\n(A) Anh ấy là hướng dẫn viên du lịch.\n(B) Anh ấy là chủ nhà cho thuê.\n(C) Anh ấy sửa chữa đồ gia dụng.\n(D) Anh ấy giao thức ăn.\n\nDịch hội thoại:\nW: Các chuyến giao hàng hôm nay thế nào?\nM: Không tệ, ngoại trừ ở tòa nhà chung cư mới trên phố South. Tôi phải gọi điện cho họ để họ ra lấy đồ ăn. Ban đầu tôi thử gọi qua hệ thống liên lạc nội bộ của tòa nhà, nhưng nó vẫn bị hỏng.\nW: Anh không phải người đầu tiên nói vậy đâu. Tuần trước, một khách hàng gọi điện phàn nàn rằng đồ ăn đã nguội lạnh khi họ tìm thấy.\nM: Có lẽ chúng ta không thể giao hàng ở đó cho đến khi chủ nhà sửa hệ thống liên lạc nội bộ.\nW: Tôi sẽ cập nhật hướng dẫn trên ứng dụng di động của chúng ta, bảo khách hàng ra gặp chúng ta ở cửa chính tòa nhà. Xem thử cách này có giúp không."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "33. What has caused problems for the speakers’ business? (A) Road construction (B) Cold weather (C) An expired permit (D) A broken intercom",
   "transcript": "W: How were your deliveries?\nM: Not bad, except at that new residential building on South Street. I had to call them on my phone to come pick up their food. At first, I tried to call on the building intercom, but it's still broken.\nW: You're not the first to say that. Last week, a customer called to complain that their food was cold by the time they found it.\nM: Maybe we just can't make deliveries there until the landlord fixes the intercom system.\nW: I'm going to update the instructions on our mobile app telling customers to meet us at the building's front door. Let's see if that helps.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n33. Điều gì đã gây ra vấn đề cho công việc kinh doanh của các diễn giả?\n(A) Công trình xây dựng đường\n(B) Thời tiết lạnh\n(C) Giấy phép đã hết hạn\n(D) Hệ thống liên lạc nội bộ bị hỏng\n\nDịch hội thoại:\nW: Các chuyến giao hàng hôm nay thế nào?\nM: Không tệ, ngoại trừ ở tòa nhà chung cư mới trên phố South. Tôi phải gọi điện cho họ để họ ra lấy đồ ăn. Ban đầu tôi thử gọi qua hệ thống liên lạc nội bộ của tòa nhà, nhưng nó vẫn bị hỏng.\nW: Anh không phải người đầu tiên nói vậy đâu. Tuần trước, một khách hàng gọi điện phàn nàn rằng đồ ăn đã nguội lạnh khi họ tìm thấy.\nM: Có lẽ chúng ta không thể giao hàng ở đó cho đến khi chủ nhà sửa hệ thống liên lạc nội bộ.\nW: Tôi sẽ cập nhật hướng dẫn trên ứng dụng di động của chúng ta, bảo khách hàng ra gặp chúng ta ở cửa chính tòa nhà. Xem thử cách này có giúp không."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "A",
   "group": "32-34",
   "textEn": "34. What will the woman update on a mobile application? (A) Instructions (B) Prices (C) Photographs (D) Hours of operation",
   "transcript": "W: How were your deliveries?\nM: Not bad, except at that new residential building on South Street. I had to call them on my phone to come pick up their food. At first, I tried to call on the building intercom, but it's still broken.\nW: You're not the first to say that. Last week, a customer called to complain that their food was cold by the time they found it.\nM: Maybe we just can't make deliveries there until the landlord fixes the intercom system.\nW: I'm going to update the instructions on our mobile app telling customers to meet us at the building's front door. Let's see if that helps.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n34. Người phụ nữ sẽ cập nhật gì trên ứng dụng di động?\n(A) Hướng dẫn\n(B) Giá cả\n(C) Ảnh chụp\n(D) Giờ hoạt động\n\nDịch hội thoại:\nW: Các chuyến giao hàng hôm nay thế nào?\nM: Không tệ, ngoại trừ ở tòa nhà chung cư mới trên phố South. Tôi phải gọi điện cho họ để họ ra lấy đồ ăn. Ban đầu tôi thử gọi qua hệ thống liên lạc nội bộ của tòa nhà, nhưng nó vẫn bị hỏng.\nW: Anh không phải người đầu tiên nói vậy đâu. Tuần trước, một khách hàng gọi điện phàn nàn rằng đồ ăn đã nguội lạnh khi họ tìm thấy.\nM: Có lẽ chúng ta không thể giao hàng ở đó cho đến khi chủ nhà sửa hệ thống liên lạc nội bộ.\nW: Tôi sẽ cập nhật hướng dẫn trên ứng dụng di động của chúng ta, bảo khách hàng ra gặp chúng ta ở cửa chính tòa nhà. Xem thử cách này có giúp không."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "35. What industry do the speakers most likely work in? (A) Fitness (B) Entertainment (C) Landscaping (D) Travel",
   "transcript": "W: We're getting close to the time of year when we need to begin planning our Theater in the Park series for the summer. We have lots of decisions to make about shows, dates, and performers.\nM: You're right. I'll set up a meeting for this month. You know, I had an idea. Why don't we invite community residents to volunteer to help with building sets, painting, and setting up the stage?\nW: We could, but I don't know if we'll be able to use volunteers this year. We'll need approval to start that kind of program. It'll take time. Let's check into that for next year.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n35. Các diễn giả rất có khả năng làm việc trong ngành nào?\n(A) Thể dục thể hình\n(B) Giải trí\n(C) Thiết kế cảnh quan\n(D) Du lịch\n\nDịch hội thoại:\nW: Chúng ta đang đến gần thời điểm trong năm mà chúng ta cần bắt đầu lập kế hoạch cho chuỗi Theater in the Park cho mùa hè. Chúng ta có rất nhiều quyết định phải đưa ra về các buổi biểu diễn, ngày tháng, và người biểu diễn.\nM: Đúng vậy. Tôi sẽ sắp xếp một cuộc họp cho tháng này. Bạn biết đấy, tôi có một ý tưởng. Tại sao chúng ta không mời cư dân cộng đồng tình nguyện giúp đỡ xây dựng bối cảnh, sơn phết, và thiết lập sân khấu?\nW: Chúng ta có thể, nhưng tôi không biết liệu chúng ta có thể sử dụng tình nguyện viên năm nay không. Chúng ta sẽ cần sự phê duyệt để bắt đầu loại chương trình đó. Nó sẽ mất thời gian. Hãy kiểm tra điều đó cho năm sau."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "36. What does the man suggest? (A) Providing online access to videos (B) Creating volunteer opportunities (C) Offering free transportation (D) Adding additional time slots",
   "transcript": "W: We're getting close to the time of year when we need to begin planning our Theater in the Park series for the summer. We have lots of decisions to make about shows, dates, and performers.\nM: You're right. I'll set up a meeting for this month. You know, I had an idea. Why don't we invite community residents to volunteer to help with building sets, painting, and setting up the stage?\nW: We could, but I don't know if we'll be able to use volunteers this year. We'll need approval to start that kind of program. It'll take time. Let's check into that for next year.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n36. Người đàn ông gợi ý điều gì?\n(A) Cung cấp quyền truy cập trực tuyến vào video\n(B) Tạo cơ hội tình nguyện\n(C) Cung cấp phương tiện di chuyển miễn phí\n(D) Thêm các khung giờ bổ sung\n\nDịch hội thoại:\nW: Chúng ta đang đến gần thời điểm trong năm mà chúng ta cần bắt đầu lập kế hoạch cho chuỗi Theater in the Park cho mùa hè. Chúng ta có rất nhiều quyết định phải đưa ra về các buổi biểu diễn, ngày tháng, và người biểu diễn.\nM: Đúng vậy. Tôi sẽ sắp xếp một cuộc họp cho tháng này. Bạn biết đấy, tôi có một ý tưởng. Tại sao chúng ta không mời cư dân cộng đồng tình nguyện giúp đỡ xây dựng bối cảnh, sơn phết, và thiết lập sân khấu?\nW: Chúng ta có thể, nhưng tôi không biết liệu chúng ta có thể sử dụng tình nguyện viên năm nay không. Chúng ta sẽ cần sự phê duyệt để bắt đầu loại chương trình đó. Nó sẽ mất thời gian. Hãy kiểm tra điều đó cho năm sau."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "37. Why do the speakers need to wait? (A) Promotional items have not been ordered. (B) A facility is not available. (C) A budget is too small. (D) A program has not been approved.",
   "transcript": "W: We're getting close to the time of year when we need to begin planning our Theater in the Park series for the summer. We have lots of decisions to make about shows, dates, and performers.\nM: You're right. I'll set up a meeting for this month. You know, I had an idea. Why don't we invite community residents to volunteer to help with building sets, painting, and setting up the stage?\nW: We could, but I don't know if we'll be able to use volunteers this year. We'll need approval to start that kind of program. It'll take time. Let's check into that for next year.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n37. Tại sao các diễn giả phải chờ đợi?\n(A) Các mặt hàng khuyến mãi chưa được đặt hàng.\n(B) Một cơ sở vật chất chưa sẵn sàng.\n(C) Ngân sách quá nhỏ.\n(D) Một chương trình chưa được phê duyệt.\n\nDịch hội thoại:\nW: Chúng ta đang đến gần thời điểm trong năm mà chúng ta cần bắt đầu lập kế hoạch cho chuỗi Theater in the Park cho mùa hè. Chúng ta có rất nhiều quyết định phải đưa ra về các buổi biểu diễn, ngày tháng, và người biểu diễn.\nM: Đúng vậy. Tôi sẽ sắp xếp một cuộc họp cho tháng này. Bạn biết đấy, tôi có một ý tưởng. Tại sao chúng ta không mời cư dân cộng đồng tình nguyện giúp đỡ xây dựng bối cảnh, sơn phết, và thiết lập sân khấu?\nW: Chúng ta có thể, nhưng tôi không biết liệu chúng ta có thể sử dụng tình nguyện viên năm nay không. Chúng ta sẽ cần sự phê duyệt để bắt đầu loại chương trình đó. Nó sẽ mất thời gian. Hãy kiểm tra điều đó cho năm sau."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "38. Who is the woman? (A) A store owner (B) A television celebrity (C) A business consultant (D) An event sponsor",
   "transcript": "M: Back to our podcast with special guest Kimberly Stuart, who's currently advising our city on business development projects. Before the break, we promised to address the decline of shopping downtown.\nW: Yes—and it's been the worst at the kind of stores that sell unique items like antiques and jewelry. These items have always been purchased at brick-and-mortar stores but are now being purchased mostly online.\nM: So, do those stores have a future?\nW: I think they do, especially if we make a point of organizing live community activities downtown, such as concerts or festivals. When people walk around town, they are likely to browse at stores—and make purchases.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n38. Người phụ nữ là ai?\n(A) Chủ cửa hàng\n(B) Người nổi tiếng trên truyền hình\n(C) Cố vấn kinh doanh\n(D) Nhà tài trợ sự kiện\n\nDịch hội thoại:\nM: Trở lại với podcast của chúng ta cùng khách mời đặc biệt Kimberly Stuart, người hiện đang tư vấn cho thành phố chúng ta về các dự án phát triển kinh doanh. Trước giờ nghỉ, chúng ta đã hứa sẽ đề cập đến sự suy giảm mua sắm ở khu trung tâm.\nW: Vâng—và tình hình tồi tệ nhất ở các cửa hàng bán các mặt hàng độc đáo như đồ cổ và trang sức. Những mặt hàng này luôn được mua tại các cửa hàng truyền thống nhưng giờ chủ yếu được mua trực tuyến.\nM: Vậy, những cửa hàng đó có tương lai không?\nW: Tôi nghĩ là có, đặc biệt nếu chúng ta chú trọng tổ chức các hoạt động cộng đồng trực tiếp ở khu trung tâm, chẳng hạn như hòa nhạc hoặc lễ hội. Khi mọi người đi dạo quanh thị trấn, họ có khả năng ghé thăm các cửa hàng—và mua hàng."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What does the woman say about online shopping? (A) It is cheaper than buying in person. (B) It makes shopping a social experience. (C) It is reducing traffic problems in the city. (D) It is affecting specialty shops.",
   "transcript": "M: Back to our podcast with special guest Kimberly Stuart, who's currently advising our city on business development projects. Before the break, we promised to address the decline of shopping downtown.\nW: Yes—and it's been the worst at the kind of stores that sell unique items like antiques and jewelry. These items have always been purchased at brick-and-mortar stores but are now being purchased mostly online.\nM: So, do those stores have a future?\nW: I think they do, especially if we make a point of organizing live community activities downtown, such as concerts or festivals. When people walk around town, they are likely to browse at stores—and make purchases.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n39. Người phụ nữ nói gì về mua sắm trực tuyến?\n(A) Nó rẻ hơn so với mua trực tiếp.\n(B) Nó biến việc mua sắm thành trải nghiệm xã hội.\n(C) Nó đang giảm vấn đề giao thông trong thành phố.\n(D) Nó đang ảnh hưởng đến các cửa hàng chuyên biệt.\n\nDịch hội thoại:\nM: Trở lại với podcast của chúng ta cùng khách mời đặc biệt Kimberly Stuart, người hiện đang tư vấn cho thành phố chúng ta về các dự án phát triển kinh doanh. Trước giờ nghỉ, chúng ta đã hứa sẽ đề cập đến sự suy giảm mua sắm ở khu trung tâm.\nW: Vâng—và tình hình tồi tệ nhất ở các cửa hàng bán các mặt hàng độc đáo như đồ cổ và trang sức. Những mặt hàng này luôn được mua tại các cửa hàng truyền thống nhưng giờ chủ yếu được mua trực tuyến.\nM: Vậy, những cửa hàng đó có tương lai không?\nW: Tôi nghĩ là có, đặc biệt nếu chúng ta chú trọng tổ chức các hoạt động cộng đồng trực tiếp ở khu trung tâm, chẳng hạn như hòa nhạc hoặc lễ hội. Khi mọi người đi dạo quanh thị trấn, họ có khả năng ghé thăm các cửa hàng—và mua hàng."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "40. What does the woman suggest doing? (A) Offering clearance sales (B) Holding live events (C) Meeting with store owners (D) Retraining store staff",
   "transcript": "M: Back to our podcast with special guest Kimberly Stuart, who's currently advising our city on business development projects. Before the break, we promised to address the decline of shopping downtown.\nW: Yes—and it's been the worst at the kind of stores that sell unique items like antiques and jewelry. These items have always been purchased at brick-and-mortar stores but are now being purchased mostly online.\nM: So, do those stores have a future?\nW: I think they do, especially if we make a point of organizing live community activities downtown, such as concerts or festivals. When people walk around town, they are likely to browse at stores—and make purchases.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n40. Người phụ nữ gợi ý làm gì?\n(A) Tổ chức các đợt giảm giá thanh lý\n(B) Tổ chức các sự kiện trực tiếp\n(C) Gặp gỡ chủ cửa hàng\n(D) Đào tạo lại nhân viên cửa hàng\n\nDịch hội thoại:\nM: Trở lại với podcast của chúng ta cùng khách mời đặc biệt Kimberly Stuart, người hiện đang tư vấn cho thành phố chúng ta về các dự án phát triển kinh doanh. Trước giờ nghỉ, chúng ta đã hứa sẽ đề cập đến sự suy giảm mua sắm ở khu trung tâm.\nW: Vâng—và tình hình tồi tệ nhất ở các cửa hàng bán các mặt hàng độc đáo như đồ cổ và trang sức. Những mặt hàng này luôn được mua tại các cửa hàng truyền thống nhưng giờ chủ yếu được mua trực tuyến.\nM: Vậy, những cửa hàng đó có tương lai không?\nW: Tôi nghĩ là có, đặc biệt nếu chúng ta chú trọng tổ chức các hoạt động cộng đồng trực tiếp ở khu trung tâm, chẳng hạn như hòa nhạc hoặc lễ hội. Khi mọi người đi dạo quanh thị trấn, họ có khả năng ghé thăm các cửa hàng—và mua hàng."
  },
  {
   "number": 41,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "41. Why have a company’s sales increased? (A) A rebate program was started. (B) A competitor went out of business. (C) A celebrity endorsed the company. (D) A product won an award.",
   "transcript": "M: Our company has seen a huge spike in sales ever since it launched the rebate program for customers. With the rebate, customers get money back. And they're telling their friends, increasing our sales.\nW: Yes. The rebate's been great for our company because now more homeowners have an incentive to install solar panels on their properties, since they're rewarded for the electricity their solar panels produce. But our technicians can't keep up with the high demand.\nM: You're right. I'm planning to hire more technicians. I've already received some résumés from potential candidates.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n41. Tại sao doanh số của công ty tăng lên?\n(A) Một chương trình hoàn tiền đã được khởi động.\n(B) Một đối thủ cạnh tranh đã ngừng kinh doanh.\n(C) Một người nổi tiếng đã quảng bá cho công ty.\n(D) Một sản phẩm đã giành được giải thưởng.\n\nDịch hội thoại:\nM: Công ty chúng ta đã chứng kiến sự tăng vọt lớn về doanh số kể từ khi khởi động chương trình hoàn tiền cho khách hàng. Với hoàn tiền, khách hàng nhận lại tiền. Và họ đang kể cho bạn bè, tăng doanh số của chúng ta.\nW: Vâng. Chương trình hoàn tiền rất tốt cho công ty chúng ta vì giờ đây nhiều chủ nhà hơn có động lực lắp đặt tấm pin mặt trời trên tài sản của họ, vì họ được thưởng cho điện mà tấm pin mặt trời sản xuất. Nhưng các kỹ thuật viên của chúng ta không theo kịp nhu cầu cao.\nM: Đúng vậy. Tôi đang lên kế hoạch thuê thêm kỹ thuật viên. Tôi đã nhận được một số sơ yếu lý lịch từ các ứng viên tiềm năng."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "42. What industry do the speakers most likely work in? (A) Banking (B) Telecommunications (C) Solar energy (D) Music",
   "transcript": "M: Our company has seen a huge spike in sales ever since it launched the rebate program for customers. With the rebate, customers get money back. And they're telling their friends, increasing our sales.\nW: Yes. The rebate's been great for our company because now more homeowners have an incentive to install solar panels on their properties, since they're rewarded for the electricity their solar panels produce. But our technicians can't keep up with the high demand.\nM: You're right. I'm planning to hire more technicians. I've already received some résumés from potential candidates.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n42. Các diễn giả rất có khả năng làm việc trong ngành nào?\n(A) Ngân hàng\n(B) Viễn thông\n(C) Năng lượng mặt trời\n(D) Âm nhạc\n\nDịch hội thoại:\nM: Công ty chúng ta đã chứng kiến sự tăng vọt lớn về doanh số kể từ khi khởi động chương trình hoàn tiền cho khách hàng. Với hoàn tiền, khách hàng nhận lại tiền. Và họ đang kể cho bạn bè, tăng doanh số của chúng ta.\nW: Vâng. Chương trình hoàn tiền rất tốt cho công ty chúng ta vì giờ đây nhiều chủ nhà hơn có động lực lắp đặt tấm pin mặt trời trên tài sản của họ, vì họ được thưởng cho điện mà tấm pin mặt trời sản xuất. Nhưng các kỹ thuật viên của chúng ta không theo kịp nhu cầu cao.\nM: Đúng vậy. Tôi đang lên kế hoạch thuê thêm kỹ thuật viên. Tôi đã nhận được một số sơ yếu lý lịch từ các ứng viên tiềm năng."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "43. What does the man say he is planning to do? (A) Hire new employees (B) Provide additional training (C) Upgrade some equipment (D) Open another location",
   "transcript": "M: Our company has seen a huge spike in sales ever since it launched the rebate program for customers. With the rebate, customers get money back. And they're telling their friends, increasing our sales.\nW: Yes. The rebate's been great for our company because now more homeowners have an incentive to install solar panels on their properties, since they're rewarded for the electricity their solar panels produce. But our technicians can't keep up with the high demand.\nM: You're right. I'm planning to hire more technicians. I've already received some résumés from potential candidates.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n43. Người đàn ông nói anh ấy đang lên kế hoạch làm gì?\n(A) Tuyển dụng nhân viên mới\n(B) Cung cấp thêm đào tạo\n(C) Nâng cấp một số thiết bị\n(D) Mở thêm một chi nhánh\n\nDịch hội thoại:\nM: Công ty chúng ta đã chứng kiến sự tăng vọt lớn về doanh số kể từ khi khởi động chương trình hoàn tiền cho khách hàng. Với hoàn tiền, khách hàng nhận lại tiền. Và họ đang kể cho bạn bè, tăng doanh số của chúng ta.\nW: Vâng. Chương trình hoàn tiền rất tốt cho công ty chúng ta vì giờ đây nhiều chủ nhà hơn có động lực lắp đặt tấm pin mặt trời trên tài sản của họ, vì họ được thưởng cho điện mà tấm pin mặt trời sản xuất. Nhưng các kỹ thuật viên của chúng ta không theo kịp nhu cầu cao.\nM: Đúng vậy. Tôi đang lên kế hoạch thuê thêm kỹ thuật viên. Tôi đã nhận được một số sơ yếu lý lịch từ các ứng viên tiềm năng."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "44. What upcoming event are the speakers discussing? (A) A trade show (B) A client meeting (C) An awards ceremony (D) A press conference",
   "transcript": "M: Fernanda, I was just looking at the company calendar, and I noticed that the national electronics trade show is coming up soon.\nW: Oh, that's right! It'll be a great opportunity for us to showcase the product that we've been developing—our new robotic vacuum cleaner.\nM: We'll need to decide who we want to send to represent our company at the trade show.\nW: Well, I know just the right person—Kavi. Kavi does a good job of clearly explaining highly technical concepts in a way that everyone can understand.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n44. Các diễn giả đang thảo luận về sự kiện sắp tới nào?\n(A) Triển lãm thương mại\n(B) Cuộc họp khách hàng\n(C) Lễ trao giải\n(D) Hội nghị báo chí\n\nDịch hội thoại:\nM: Fernanda, tôi vừa xem lịch công ty, và tôi nhận thấy hội chợ thương mại điện tử quốc gia sắp diễn ra.\nW: Ồ, đúng rồi! Đó sẽ là cơ hội tuyệt vời để chúng ta trưng bày sản phẩm mà chúng ta đang phát triển—máy hút bụi robot mới của chúng ta.\nM: Chúng ta cần quyết định ai chúng ta muốn gửi đi đại diện cho công ty tại hội chợ.\nW: Ừm, tôi biết chính xác người phù hợp—Kavi. Kavi làm tốt công việc giải thích rõ ràng các khái niệm kỹ thuật cao cấp theo cách mà mọi người đều có thể hiểu."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "45. What product has the speakers’ company recently developed? (A) A video game (B) A mobile phone (C) A lawn mower (D) A vacuum cleaner",
   "transcript": "M: Fernanda, I was just looking at the company calendar, and I noticed that the national electronics trade show is coming up soon.\nW: Oh, that's right! It'll be a great opportunity for us to showcase the product that we've been developing—our new robotic vacuum cleaner.\nM: We'll need to decide who we want to send to represent our company at the trade show.\nW: Well, I know just the right person—Kavi. Kavi does a good job of clearly explaining highly technical concepts in a way that everyone can understand.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n45. Công ty của các diễn giả gần đây đã phát triển sản phẩm gì?\n(A) Trò chơi điện tử\n(B) Điện thoại di động\n(C) Máy cắt cỏ\n(D) Máy hút bụi\n\nDịch hội thoại:\nM: Fernanda, tôi vừa xem lịch công ty, và tôi nhận thấy hội chợ thương mại điện tử quốc gia sắp diễn ra.\nW: Ồ, đúng rồi! Đó sẽ là cơ hội tuyệt vời để chúng ta trưng bày sản phẩm mà chúng ta đang phát triển—máy hút bụi robot mới của chúng ta.\nM: Chúng ta cần quyết định ai chúng ta muốn gửi đi đại diện cho công ty tại hội chợ.\nW: Ừm, tôi biết chính xác người phù hợp—Kavi. Kavi làm tốt công việc giải thích rõ ràng các khái niệm kỹ thuật cao cấp theo cách mà mọi người đều có thể hiểu."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "46. Why does the woman recommend Kavi? (A) He is a good communicator. (B) He enjoys traveling. (C) He leads a product development team. (D) He lives near the event venue.",
   "transcript": "M: Fernanda, I was just looking at the company calendar, and I noticed that the national electronics trade show is coming up soon.\nW: Oh, that's right! It'll be a great opportunity for us to showcase the product that we've been developing—our new robotic vacuum cleaner.\nM: We'll need to decide who we want to send to represent our company at the trade show.\nW: Well, I know just the right person—Kavi. Kavi does a good job of clearly explaining highly technical concepts in a way that everyone can understand.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n46. Tại sao người phụ nữ giới thiệu Kavi?\n(A) Anh ấy là người giao tiếp tốt.\n(B) Anh ấy thích đi du lịch.\n(C) Anh ấy dẫn dắt một đội ngũ phát triển sản phẩm.\n(D) Anh ấy sống gần địa điểm sự kiện.\n\nDịch hội thoại:\nM: Fernanda, tôi vừa xem lịch công ty, và tôi nhận thấy hội chợ thương mại điện tử quốc gia sắp diễn ra.\nW: Ồ, đúng rồi! Đó sẽ là cơ hội tuyệt vời để chúng ta trưng bày sản phẩm mà chúng ta đang phát triển—máy hút bụi robot mới của chúng ta.\nM: Chúng ta cần quyết định ai chúng ta muốn gửi đi đại diện cho công ty tại hội chợ.\nW: Ừm, tôi biết chính xác người phù hợp—Kavi. Kavi làm tốt công việc giải thích rõ ràng các khái niệm kỹ thuật cao cấp theo cách mà mọi người đều có thể hiểu."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "47. Where do the speakers most likely work? (A) At a publishing house (B) At a dental clinic (C) At a financial firm (D) At a real estate agency",
   "transcript": "M: Dr. Fuentes, sorry to interrupt. Do you have a minute?\nW: Yes. My nine o'clock dental cleaning patient just canceled.\nM: I know you're looking for a new receptionist. I'd like to recommend someone for the position.\nW: Oh. Who do you have in mind?\nM: Well, a former colleague of mine has just moved back to town. Her name's Kelly Graham, and she has several years of experience.\nW: OK. Could you tell Kelly to send me her résumé? I'd be happy to look it over.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n47. Các diễn giả rất có khả năng làm việc ở đâu?\n(A) Tại một nhà xuất bản\n(B) Tại một phòng khám nha khoa\n(C) Tại một công ty tài chính\n(D) Tại một công ty bất động sản\n\nDịch hội thoại:\nM: Bác sĩ Fuentes, xin lỗi vì làm gián đoạn. Bà có một phút không?\nW: Có. Bệnh nhân làm sạch răng lúc 9 giờ của tôi vừa hủy.\nM: Tôi biết bà đang tìm lễ tân mới. Tôi muốn giới thiệu ai đó cho vị trí đó.\nW: Ồ. Bà đang nghĩ đến ai?\nM: Ừm, một đồng nghiệp cũ của tôi vừa chuyển về thị trấn. Tên cô ấy là Kelly Graham, và cô ấy có vài năm kinh nghiệm.\nW: OK. Ông có thể bảo Kelly gửi sơ yếu lý lịch cho tôi không? Tôi sẽ vui lòng xem qua."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "48. What does the man tell the woman about? (A) A new product (B) A schedule change (C) A policy update (D) A job candidate",
   "transcript": "M: Dr. Fuentes, sorry to interrupt. Do you have a minute?\nW: Yes. My nine o'clock dental cleaning patient just canceled.\nM: I know you're looking for a new receptionist. I'd like to recommend someone for the position.\nW: Oh. Who do you have in mind?\nM: Well, a former colleague of mine has just moved back to town. Her name's Kelly Graham, and she has several years of experience.\nW: OK. Could you tell Kelly to send me her résumé? I'd be happy to look it over.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n48. Người đàn ông nói gì với người phụ nữ?\n(A) Về một sản phẩm mới\n(B) Về sự thay đổi lịch trình\n(C) Về cập nhật chính sách\n(D) Về một ứng viên việc làm\n\nDịch hội thoại:\nM: Bác sĩ Fuentes, xin lỗi vì làm gián đoạn. Bà có một phút không?\nW: Có. Bệnh nhân làm sạch răng lúc 9 giờ của tôi vừa hủy.\nM: Tôi biết bà đang tìm lễ tân mới. Tôi muốn giới thiệu ai đó cho vị trí đó.\nW: Ồ. Bà đang nghĩ đến ai?\nM: Ừm, một đồng nghiệp cũ của tôi vừa chuyển về thị trấn. Tên cô ấy là Kelly Graham, và cô ấy có vài năm kinh nghiệm.\nW: OK. Ông có thể bảo Kelly gửi sơ yếu lý lịch cho tôi không? Tôi sẽ vui lòng xem qua."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "49. Why will the man most likely contact Kelly Graham? (A) To plan an office celebration (B) To arrange a training session (C) To request a document (D) To order some supplies",
   "transcript": "M: Dr. Fuentes, sorry to interrupt. Do you have a minute?\nW: Yes. My nine o'clock dental cleaning patient just canceled.\nM: I know you're looking for a new receptionist. I'd like to recommend someone for the position.\nW: Oh. Who do you have in mind?\nM: Well, a former colleague of mine has just moved back to town. Her name's Kelly Graham, and she has several years of experience.\nW: OK. Could you tell Kelly to send me her résumé? I'd be happy to look it over.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n49. Tại sao người đàn ông rất có khả năng liên hệ với Kelly Graham?\n(A) Để lên kế hoạch cho một buổi tiệc văn phòng\n(B) Để sắp xếp một buổi đào tạo\n(C) Để yêu cầu một tài liệu\n(D) Để đặt mua một số vật tư\n\nDịch hội thoại:\nM: Bác sĩ Fuentes, xin lỗi vì làm gián đoạn. Bà có một phút không?\nW: Có. Bệnh nhân làm sạch răng lúc 9 giờ của tôi vừa hủy.\nM: Tôi biết bà đang tìm lễ tân mới. Tôi muốn giới thiệu ai đó cho vị trí đó.\nW: Ồ. Bà đang nghĩ đến ai?\nM: Ừm, một đồng nghiệp cũ của tôi vừa chuyển về thị trấn. Tên cô ấy là Kelly Graham, và cô ấy có vài năm kinh nghiệm.\nW: OK. Ông có thể bảo Kelly gửi sơ yếu lý lịch cho tôi không? Tôi sẽ vui lòng xem qua."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "50. What industry do the men work in? (A) Travel (B) Manufacturing (C) Video production (D) Construction",
   "transcript": "M1: Ms. Gao? I'm Hector, and this is my colleague Sergey. Thanks for meeting with us.\nW: It's a pleasure to meet you both. How can I help you?\nM2: We're making some training videos for our client, FiveStar Industries.\nM1: We found your advertisement in a trade publication. We need someone to choose appropriate filming sites at FiveStar's factories, and it said you have lots of experience scouting for industrial locations.\nW: Sure. I'd want to start by touring their factories. Can you schedule a time for me to do that next week?\nM2: Yes, I'll call them today to arrange it.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n50. Những người đàn ông làm việc trong ngành nào?\n(A) Du lịch\n(B) Sản xuất\n(C) Sản xuất video\n(D) Xây dựng\n\nDịch hội thoại:\nM1: Cô Gao? Tôi là Hector, và đây là đồng nghiệp của tôi Sergey. Cảm ơn vì đã gặp chúng tôi.\nW: Rất vui được gặp cả hai. Tôi có thể giúp gì?\nM2: Chúng tôi đang làm một số video đào tạo cho khách hàng của chúng tôi, FiveStar Industries.\nM1: Chúng tôi tìm thấy quảng cáo của cô trong một ấn phẩm thương mại. Chúng tôi cần ai đó chọn địa điểm quay phim phù hợp tại các nhà máy của FiveStar, và nó nói cô có nhiều kinh nghiệm tìm kiếm địa điểm công nghiệp.\nW: Chắc chắn. Tôi muốn bắt đầu bằng việc tham quan các nhà máy của họ. Các ông có thể sắp xếp thời gian cho tôi làm điều đó tuần tới không?\nM2: Có, tôi sẽ gọi họ hôm nay để sắp xếp."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "B",
   "group": "50-52",
   "textEn": "51. How did the men learn about the woman? (A) From her Web site (B) From a trade publication (C) From a colleague (D) From a recruitment agency",
   "transcript": "M1: Ms. Gao? I'm Hector, and this is my colleague Sergey. Thanks for meeting with us.\nW: It's a pleasure to meet you both. How can I help you?\nM2: We're making some training videos for our client, FiveStar Industries.\nM1: We found your advertisement in a trade publication. We need someone to choose appropriate filming sites at FiveStar's factories, and it said you have lots of experience scouting for industrial locations.\nW: Sure. I'd want to start by touring their factories. Can you schedule a time for me to do that next week?\nM2: Yes, I'll call them today to arrange it.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n51. Những người đàn ông biết về người phụ nữ qua đâu?\n(A) Từ trang web của cô ấy\n(B) Từ một ấn phẩm thương mại\n(C) Từ một đồng nghiệp\n(D) Từ một công ty tuyển dụng\n\nDịch hội thoại:\nM1: Cô Gao? Tôi là Hector, và đây là đồng nghiệp của tôi Sergey. Cảm ơn vì đã gặp chúng tôi.\nW: Rất vui được gặp cả hai. Tôi có thể giúp gì?\nM2: Chúng tôi đang làm một số video đào tạo cho khách hàng của chúng tôi, FiveStar Industries.\nM1: Chúng tôi tìm thấy quảng cáo của cô trong một ấn phẩm thương mại. Chúng tôi cần ai đó chọn địa điểm quay phim phù hợp tại các nhà máy của FiveStar, và nó nói cô có nhiều kinh nghiệm tìm kiếm địa điểm công nghiệp.\nW: Chắc chắn. Tôi muốn bắt đầu bằng việc tham quan các nhà máy của họ. Các ông có thể sắp xếp thời gian cho tôi làm điều đó tuần tới không?\nM2: Có, tôi sẽ gọi họ hôm nay để sắp xếp."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "B",
   "group": "50-52",
   "textEn": "52. What does the woman want to do next week? (A) Attend an orientation session (B) Visit some facilities (C) Interview some applicants (D) Finalize a contract",
   "transcript": "M1: Ms. Gao? I'm Hector, and this is my colleague Sergey. Thanks for meeting with us.\nW: It's a pleasure to meet you both. How can I help you?\nM2: We're making some training videos for our client, FiveStar Industries.\nM1: We found your advertisement in a trade publication. We need someone to choose appropriate filming sites at FiveStar's factories, and it said you have lots of experience scouting for industrial locations.\nW: Sure. I'd want to start by touring their factories. Can you schedule a time for me to do that next week?\nM2: Yes, I'll call them today to arrange it.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n52. Người phụ nữ muốn làm gì vào tuần tới?\n(A) Tham gia buổi định hướng\n(B) Thăm một số cơ sở\n(C) Phỏng vấn một số ứng viên\n(D) Hoàn tất hợp đồng\n\nDịch hội thoại:\nM1: Cô Gao? Tôi là Hector, và đây là đồng nghiệp của tôi Sergey. Cảm ơn vì đã gặp chúng tôi.\nW: Rất vui được gặp cả hai. Tôi có thể giúp gì?\nM2: Chúng tôi đang làm một số video đào tạo cho khách hàng của chúng tôi, FiveStar Industries.\nM1: Chúng tôi tìm thấy quảng cáo của cô trong một ấn phẩm thương mại. Chúng tôi cần ai đó chọn địa điểm quay phim phù hợp tại các nhà máy của FiveStar, và nó nói cô có nhiều kinh nghiệm tìm kiếm địa điểm công nghiệp.\nW: Chắc chắn. Tôi muốn bắt đầu bằng việc tham quan các nhà máy của họ. Các ông có thể sắp xếp thời gian cho tôi làm điều đó tuần tới không?\nM2: Có, tôi sẽ gọi họ hôm nay để sắp xếp."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "53. What type of business do the speakers work for? (A) A law firm (B) An advertising agency (C) An engineering firm (D) An event-planning company",
   "transcript": "M: Our engineering firm has been asked to cut the corporate travel budget by twenty percent, but it won't be easy. The engineering consultants have to travel to meet with clients.\nW: Right, and they often travel on short notice. Flight arrangements made at the last minute are expensive, especially for nonstop flights. It would be cheaper if they took connecting flights.\nM: Yes, but that can take a lot of time.\nW: True. Maybe we can make up for the cost of the flights by economizing on hotels. Let's look into that.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n53. Các diễn giả làm việc cho loại hình kinh doanh nào?\n(A) Công ty luật\n(B) Công ty quảng cáo\n(C) Công ty kỹ thuật\n(D) Công ty tổ chức sự kiện\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Công ty kỹ thuật của chúng ta được yêu cầu cắt giảm ngân sách du lịch doanh nghiệp 20%, nhưng sẽ không dễ dàng. Các tư vấn viên kỹ thuật phải du lịch để gặp khách hàng.\nW: Đúng, và họ thường du lịch đột xuất. Sắp xếp chuyến bay vào phút chót rất đắt, đặc biệt là chuyến bay thẳng. Sẽ rẻ hơn nếu họ bay chuyển tiếp.\nM: Vâng, nhưng điều đó có thể mất nhiều thời gian.\nW: Đúng. Có lẽ chúng ta có thể bù đắp chi phí chuyến bay bằng cách tiết kiệm khách sạn. Hãy xem xét điều đó."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "54. Why does the man say, “that can take a lot of time”? (A) To reject a suggestion (B) To express sympathy (C) To request additional pay (D) To offer assistance",
   "transcript": "M: Our engineering firm has been asked to cut the corporate travel budget by twenty percent, but it won't be easy. The engineering consultants have to travel to meet with clients.\nW: Right, and they often travel on short notice. Flight arrangements made at the last minute are expensive, especially for nonstop flights. It would be cheaper if they took connecting flights.\nM: Yes, but that can take a lot of time.\nW: True. Maybe we can make up for the cost of the flights by economizing on hotels. Let's look into that.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n54. Tại sao người đàn ông nói “điều đó có thể mất rất nhiều thời gian”?\n(A) Để từ chối một gợi ý\n(B) Để bày tỏ sự đồng cảm\n(C) Để yêu cầu thêm tiền lương\n(D) Để đề nghị hỗ trợ\n\nDịch hội thoại:\nM: Công ty kỹ thuật của chúng ta được yêu cầu cắt giảm ngân sách du lịch doanh nghiệp 20%, nhưng sẽ không dễ dàng. Các tư vấn viên kỹ thuật phải du lịch để gặp khách hàng.\nW: Đúng, và họ thường du lịch đột xuất. Sắp xếp chuyến bay vào phút chót rất đắt, đặc biệt là chuyến bay thẳng. Sẽ rẻ hơn nếu họ bay chuyển tiếp.\nM: Vâng, nhưng điều đó có thể mất nhiều thời gian.\nW: Đúng. Có lẽ chúng ta có thể bù đắp chi phí chuyến bay bằng cách tiết kiệm khách sạn. Hãy xem xét điều đó."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "55. What does the woman suggest? (A) Contacting some former clients (B) Making reservations early (C) Staying at affordable hotels (D) Consulting with an expert",
   "transcript": "M: Our engineering firm has been asked to cut the corporate travel budget by twenty percent, but it won't be easy. The engineering consultants have to travel to meet with clients.\nW: Right, and they often travel on short notice. Flight arrangements made at the last minute are expensive, especially for nonstop flights. It would be cheaper if they took connecting flights.\nM: Yes, but that can take a lot of time.\nW: True. Maybe we can make up for the cost of the flights by economizing on hotels. Let's look into that.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n55. Người phụ nữ gợi ý gì?\n(A) Liên hệ với một số khách hàng cũ\n(B) Đặt chỗ sớm\n(C) Ở tại các khách sạn giá phải chăng\n(D) Tham khảo ý kiến chuyên gia\n\nDịch hội thoại:\nM: Công ty kỹ thuật của chúng ta được yêu cầu cắt giảm ngân sách du lịch doanh nghiệp 20%, nhưng sẽ không dễ dàng. Các tư vấn viên kỹ thuật phải du lịch để gặp khách hàng.\nW: Đúng, và họ thường du lịch đột xuất. Sắp xếp chuyến bay vào phút chót rất đắt, đặc biệt là chuyến bay thẳng. Sẽ rẻ hơn nếu họ bay chuyển tiếp.\nM: Vâng, nhưng điều đó có thể mất nhiều thời gian.\nW: Đúng. Có lẽ chúng ta có thể bù đắp chi phí chuyến bay bằng cách tiết kiệm khách sạn. Hãy xem xét điều đó."
  },
  {
   "number": 56,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "56. What industry do the men most likely work in? (A) Fashion (B) Cosmetics (C) Advertising (D) Technology",
   "transcript": "M1: Thanks for meeting with us, Ms. Azuma. This is Scott Ajibade, one of our senior project managers.\nM2: I admire your work, Ms. Azuma.\nW: Thank you. I was surprised by your invitation. I typically design jewelry, but your company's known for making computers and mobile phones.\nM1: Scott's team is currently working on a smartwatch. But there's a lot of competition, as you know.\nM2: We're hoping you can create a fresh design that will help our product stand out.\nW: Do you already have an idea of what the watch should look like, or are we starting from scratch?\nM2: I have some preliminary sketches we can look at, but none of them seem quite right.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n56. Những người đàn ông rất có khả năng làm việc trong ngành nào?\n(A) Thời trang\n(B) Mỹ phẩm\n(C) Quảng cáo\n(D) Công nghệ\n\nDịch hội thoại:\nM1: Cảm ơn vì đã gặp chúng tôi, cô Azuma. Đây là Scott Ajibade, một trong những quản lý dự án cấp cao của chúng tôi.\nM2: Tôi ngưỡng mộ công việc của cô, cô Azuma.\nW: Cảm ơn. Tôi ngạc nhiên vì lời mời của các ông. Tôi thường thiết kế trang sức, nhưng công ty của các ông nổi tiếng với việc làm máy tính và điện thoại di động.\nM1: Đội của Scott hiện đang làm việc trên đồng hồ thông minh. Nhưng có nhiều cạnh tranh, như cô biết.\nM2: Chúng tôi hy vọng cô có thể tạo ra thiết kế mới mẻ giúp sản phẩm của chúng tôi nổi bật.\nW: Các ông đã có ý tưởng về đồng hồ nên trông như thế nào chưa, hay chúng ta bắt đầu từ con số không?\nM2: Tôi có một số bản phác thảo sơ bộ chúng ta có thể xem, nhưng không cái nào dường như khá đúng."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "57. Why did the men request a meeting? (A) To negotiate a merger (B) To ask for funding (C) To discuss a product design (D) To suggest a marketing strategy",
   "transcript": "M1: Thanks for meeting with us, Ms. Azuma. This is Scott Ajibade, one of our senior project managers.\nM2: I admire your work, Ms. Azuma.\nW: Thank you. I was surprised by your invitation. I typically design jewelry, but your company's known for making computers and mobile phones.\nM1: Scott's team is currently working on a smartwatch. But there's a lot of competition, as you know.\nM2: We're hoping you can create a fresh design that will help our product stand out.\nW: Do you already have an idea of what the watch should look like, or are we starting from scratch?\nM2: I have some preliminary sketches we can look at, but none of them seem quite right.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n57. Tại sao những người đàn ông yêu cầu một cuộc họp?\n(A) Để đàm phán sáp nhập\n(B) Để xin tài trợ\n(C) Để thảo luận về thiết kế sản phẩm\n(D) Để đề xuất chiến lược tiếp thị\n\nDịch hội thoại:\nM1: Cảm ơn vì đã gặp chúng tôi, cô Azuma. Đây là Scott Ajibade, một trong những quản lý dự án cấp cao của chúng tôi.\nM2: Tôi ngưỡng mộ công việc của cô, cô Azuma.\nW: Cảm ơn. Tôi ngạc nhiên vì lời mời của các ông. Tôi thường thiết kế trang sức, nhưng công ty của các ông nổi tiếng với việc làm máy tính và điện thoại di động.\nM1: Đội của Scott hiện đang làm việc trên đồng hồ thông minh. Nhưng có nhiều cạnh tranh, như cô biết.\nM2: Chúng tôi hy vọng cô có thể tạo ra thiết kế mới mẻ giúp sản phẩm của chúng tôi nổi bật.\nW: Các ông đã có ý tưởng về đồng hồ nên trông như thế nào chưa, hay chúng ta bắt đầu từ con số không?\nM2: Tôi có một số bản phác thảo sơ bộ chúng ta có thể xem, nhưng không cái nào dường như khá đúng."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "58. What will the speakers most likely do next? (A) Set a release date (B) Sign a contract (C) Collect customer feedback (D) Review some drawings",
   "transcript": "M1: Thanks for meeting with us, Ms. Azuma. This is Scott Ajibade, one of our senior project managers.\nM2: I admire your work, Ms. Azuma.\nW: Thank you. I was surprised by your invitation. I typically design jewelry, but your company's known for making computers and mobile phones.\nM1: Scott's team is currently working on a smartwatch. But there's a lot of competition, as you know.\nM2: We're hoping you can create a fresh design that will help our product stand out.\nW: Do you already have an idea of what the watch should look like, or are we starting from scratch?\nM2: I have some preliminary sketches we can look at, but none of them seem quite right.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n58. Các diễn giả rất có khả năng sẽ làm gì tiếp theo?\n(A) Đặt ngày phát hành\n(B) Ký hợp đồng\n(C) Thu thập phản hồi từ khách hàng\n(D) Xem xét một số bản vẽ\n\nDịch hội thoại:\nM1: Cảm ơn vì đã gặp chúng tôi, cô Azuma. Đây là Scott Ajibade, một trong những quản lý dự án cấp cao của chúng tôi.\nM2: Tôi ngưỡng mộ công việc của cô, cô Azuma.\nW: Cảm ơn. Tôi ngạc nhiên vì lời mời của các ông. Tôi thường thiết kế trang sức, nhưng công ty của các ông nổi tiếng với việc làm máy tính và điện thoại di động.\nM1: Đội của Scott hiện đang làm việc trên đồng hồ thông minh. Nhưng có nhiều cạnh tranh, như cô biết.\nM2: Chúng tôi hy vọng cô có thể tạo ra thiết kế mới mẻ giúp sản phẩm của chúng tôi nổi bật.\nW: Các ông đã có ý tưởng về đồng hồ nên trông như thế nào chưa, hay chúng ta bắt đầu từ con số không?\nM2: Tôi có một số bản phác thảo sơ bộ chúng ta có thể xem, nhưng không cái nào dường như khá đúng."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "59. What type of business does the woman work in? (A) A hair salon (B) A real estate agency (C) An interior design firm (D) A car rental company",
   "transcript": "W: Hi. I'd like to purchase some new carpeting. It's for the waiting room at my hair salon.\nM: We have many different styles. Are you looking for something different?\nW: Well, we get a lot of customers walking through, and our current carpeting is a light color.\nM: No matter what color you get, all our carpets are durable and can take high amounts of foot traffic. For businesses like yours, I recommend placing a protective mat near the door.\nW: That's a good idea.\nM: Also, I offer free cleaning services for a year for all purchases.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n59. Người phụ nữ làm việc trong loại hình kinh doanh nào?\n(A) Tiệm làm tóc\n(B) Công ty bất động sản\n(C) Công ty thiết kế nội thất\n(D) Công ty cho thuê xe\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nW: Xin chào. Tôi muốn mua thảm mới. Nó dành cho phòng chờ tại tiệm làm tóc của tôi.\nM: Chúng tôi có nhiều kiểu khác nhau. Cô đang tìm cái gì khác biệt?\nW: Ừm, chúng tôi có nhiều khách hàng đi qua, và thảm hiện tại của chúng tôi có màu sáng.\nM: Dù màu gì, tất cả thảm của chúng tôi đều bền và có thể chịu lượng người đi lại cao. Đối với doanh nghiệp như của cô, tôi khuyên nên đặt thảm bảo vệ gần cửa.\nW: Đó là ý hay.\nM: Ngoài ra, tôi cung cấp dịch vụ vệ sinh miễn phí trong một năm cho tất cả các mua hàng."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "D",
   "group": "59-61",
   "textEn": "60. Why does the woman say, “our current carpeting is a light color”? (A) To suggest an expense was not justified (B) To express surprise about a decision (C) To describe a problem with an order (D) To indicate the need to make a change",
   "transcript": "W: Hi. I'd like to purchase some new carpeting. It's for the waiting room at my hair salon.\nM: We have many different styles. Are you looking for something different?\nW: Well, we get a lot of customers walking through, and our current carpeting is a light color.\nM: No matter what color you get, all our carpets are durable and can take high amounts of foot traffic. For businesses like yours, I recommend placing a protective mat near the door.\nW: That's a good idea.\nM: Also, I offer free cleaning services for a year for all purchases.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n60. Tại sao người phụ nữ nói “thảm hiện tại của chúng tôi có màu sáng”?\n(A) Để gợi ý rằng một khoản chi không hợp lý\n(B) Để bày tỏ sự ngạc nhiên về một quyết định\n(C) Để mô tả vấn đề với một đơn hàng\n(D) Để chỉ ra nhu cầu thay đổi\n\nDịch hội thoại:\nW: Xin chào. Tôi muốn mua thảm mới. Nó dành cho phòng chờ tại tiệm làm tóc của tôi.\nM: Chúng tôi có nhiều kiểu khác nhau. Cô đang tìm cái gì khác biệt?\nW: Ừm, chúng tôi có nhiều khách hàng đi qua, và thảm hiện tại của chúng tôi có màu sáng.\nM: Dù màu gì, tất cả thảm của chúng tôi đều bền và có thể chịu lượng người đi lại cao. Đối với doanh nghiệp như của cô, tôi khuyên nên đặt thảm bảo vệ gần cửa.\nW: Đó là ý hay.\nM: Ngoài ra, tôi cung cấp dịch vụ vệ sinh miễn phí trong một năm cho tất cả các mua hàng."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "61. What does the man’s business offer? (A) A bulk discount (B) Same-day delivery (C) Free cleaning services (D) Monthly inspections",
   "transcript": "W: Hi. I'd like to purchase some new carpeting. It's for the waiting room at my hair salon.\nM: We have many different styles. Are you looking for something different?\nW: Well, we get a lot of customers walking through, and our current carpeting is a light color.\nM: No matter what color you get, all our carpets are durable and can take high amounts of foot traffic. For businesses like yours, I recommend placing a protective mat near the door.\nW: That's a good idea.\nM: Also, I offer free cleaning services for a year for all purchases.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n61. Công ty của người đàn ông cung cấp gì?\n(A) Giảm giá số lượng lớn\n(B) Giao hàng trong ngày\n(C) Dịch vụ vệ sinh miễn phí\n(D) Kiểm tra hàng tháng\n\nDịch hội thoại:\nW: Xin chào. Tôi muốn mua thảm mới. Nó dành cho phòng chờ tại tiệm làm tóc của tôi.\nM: Chúng tôi có nhiều kiểu khác nhau. Cô đang tìm cái gì khác biệt?\nW: Ừm, chúng tôi có nhiều khách hàng đi qua, và thảm hiện tại của chúng tôi có màu sáng.\nM: Dù màu gì, tất cả thảm của chúng tôi đều bền và có thể chịu lượng người đi lại cao. Đối với doanh nghiệp như của cô, tôi khuyên nên đặt thảm bảo vệ gần cửa.\nW: Đó là ý hay.\nM: Ngoài ra, tôi cung cấp dịch vụ vệ sinh miễn phí trong một năm cho tất cả các mua hàng."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. What did the man’s client request? (A) A large shipment (B) A shortened timeline (C) A change in design (D) A more expensive material",
   "transcript": "M: I really need this coffee break. My morning meeting with my client was really challenging.\nW: What were you discussing?\nM: The project schedule. They asked us to provide the prototype design to them three weeks earlier than originally planned.\nW: Well. Then today's cup is my treat. Which one would you like?\nM: That's so nice of you! I'll go with the White Cloud Coffee. I like a little milk in mine.\nW: Good choice. So, I have some news to share with you. Did you hear about David?\nM: No, what's going on?\nW: Apparently, he's planning to retire next month.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n62. Khách hàng của người đàn ông yêu cầu gì?\n(A) Một lô hàng lớn\n(B) Rút ngắn thời gian\n(C) Thay đổi thiết kế\n(D) Vật liệu đắt hơn\n\nDịch hội thoại:\nM: Tôi thực sự cần nghỉ ngơi uống cà phê. Cuộc họp sáng nay với khách hàng thật sự khó khăn.\nW: Các anh thảo luận gì vậy?\nM: Lịch trình dự án. Họ yêu cầu chúng tôi cung cấp thiết kế mẫu ba tuần sớm hơn kế hoạch ban đầu.\nW: Ừm. Vậy hôm nay tôi mời. Anh muốn loại nào?\nM: Thật tốt quá! Tôi sẽ lấy White Cloud Coffee. Tôi thích có chút sữa trong cà phê.\nW: Lựa chọn tốt. Vậy, tôi có tin tức để chia sẻ với anh. Anh có nghe về David không?\nM: Không, chuyện gì vậy?\nW: Có vẻ như anh ấy đang lên kế hoạch nghỉ hưu tháng tới."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "63. Look at the graphic. How much does the man’s coffee cost? (A) $2.00 (B) $3.25 (C) $3.75 (D) $4.25",
   "transcript": "M: I really need this coffee break. My morning meeting with my client was really challenging.\nW: What were you discussing?\nM: The project schedule. They asked us to provide the prototype design to them three weeks earlier than originally planned.\nW: Well. Then today's cup is my treat. Which one would you like?\nM: That's so nice of you! I'll go with the White Cloud Coffee. I like a little milk in mine.\nW: Good choice. So, I have some news to share with you. Did you hear about David?\nM: No, what's going on?\nW: Apparently, he's planning to retire next month.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n63. Nhìn vào biểu đồ. Cà phê của người đàn ông có giá bao nhiêu?\n(A) $2.00\n(B) $3.25\n(C) $3.75\n(D) $4.25\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Tôi thực sự cần nghỉ ngơi uống cà phê. Cuộc họp sáng nay với khách hàng thật sự khó khăn.\nW: Các anh thảo luận gì vậy?\nM: Lịch trình dự án. Họ yêu cầu chúng tôi cung cấp thiết kế mẫu ba tuần sớm hơn kế hoạch ban đầu.\nW: Ừm. Vậy hôm nay tôi mời. Anh muốn loại nào?\nM: Thật tốt quá! Tôi sẽ lấy White Cloud Coffee. Tôi thích có chút sữa trong cà phê.\nW: Lựa chọn tốt. Vậy, tôi có tin tức để chia sẻ với anh. Anh có nghe về David không?\nM: Không, chuyện gì vậy?\nW: Có vẻ như anh ấy đang lên kế hoạch nghỉ hưu tháng tới."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "64. What does the woman say about David? (A) He is retiring. (B) He is organizing a party. (C) He is on vacation. (D) He accepted another position.",
   "transcript": "M: I really need this coffee break. My morning meeting with my client was really challenging.\nW: What were you discussing?\nM: The project schedule. They asked us to provide the prototype design to them three weeks earlier than originally planned.\nW: Well. Then today's cup is my treat. Which one would you like?\nM: That's so nice of you! I'll go with the White Cloud Coffee. I like a little milk in mine.\nW: Good choice. So, I have some news to share with you. Did you hear about David?\nM: No, what's going on?\nW: Apparently, he's planning to retire next month.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n64. Người phụ nữ nói gì về David?\n(A) Anh ấy sắp nghỉ hưu.\n(B) Anh ấy đang tổ chức một bữa tiệc.\n(C) Anh ấy đang đi nghỉ.\n(D) Anh ấy đã nhận một vị trí khác.\n\nDịch hội thoại:\nM: Tôi thực sự cần nghỉ ngơi uống cà phê. Cuộc họp sáng nay với khách hàng thật sự khó khăn.\nW: Các anh thảo luận gì vậy?\nM: Lịch trình dự án. Họ yêu cầu chúng tôi cung cấp thiết kế mẫu ba tuần sớm hơn kế hoạch ban đầu.\nW: Ừm. Vậy hôm nay tôi mời. Anh muốn loại nào?\nM: Thật tốt quá! Tôi sẽ lấy White Cloud Coffee. Tôi thích có chút sữa trong cà phê.\nW: Lựa chọn tốt. Vậy, tôi có tin tức để chia sẻ với anh. Anh có nghe về David không?\nM: Không, chuyện gì vậy?\nW: Có vẻ như anh ấy đang lên kế hoạch nghỉ hưu tháng tới."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "65. What does the man most likely do? (A) Install windows (B) Repair roofs (C) Remove trees (D) Plant gardens",
   "transcript": "M: This is Bradley from Windows Galore. How can I help you?\nW: Hello! I'd like to have screens added to my windows at home. I was wondering if you would be available to stop by and take a look. I live at 42 West Third Street, by the way.\nM: OK—that's not far. Let me see. I could come any morning this week.\nW: How about in the afternoon?\nM: Hmm. I could reschedule my Tuesday afternoon appointment. I'll check and get back to you—I have your number now. And your name is?\nW: Hoffman—Claudia Hoffman. Thank you. Talk to you soon.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n65. Người đàn ông rất có khả năng làm gì?\n(A) Lắp đặt cửa sổ\n(B) Sửa chữa mái nhà\n(C) Cắt bỏ cây\n(D) Trồng vườn\n\nDịch hội thoại:\nM: Đây là Bradley từ Windows Galore. Tôi có thể giúp gì cho bạn?\nW: Xin chào! Tôi muốn thêm màn chắn vào cửa sổ nhà tôi. Tôi tự hỏi liệu bạn có thể ghé qua và xem không. Nhân tiện, tôi sống ở 42 West Third Street.\nM: OK—không xa lắm. Để tôi xem. Tôi có thể đến bất kỳ buổi sáng nào trong tuần này.\nW: Buổi chiều thì sao?\nM: Hmm. Tôi có thể sắp xếp lại cuộc hẹn chiều thứ Ba. Tôi sẽ kiểm tra và liên lạc lại với bạn—bây giờ tôi có số của bạn rồi. Và tên bạn là?\nW: Hoffman—Claudia Hoffman. Cảm ơn. Nói chuyện sau."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "66. What does the woman provide? (A) A floor layout (B) An address (C) A form of payment (D) Proof of insurance",
   "transcript": "M: This is Bradley from Windows Galore. How can I help you?\nW: Hello! I'd like to have screens added to my windows at home. I was wondering if you would be available to stop by and take a look. I live at 42 West Third Street, by the way.\nM: OK—that's not far. Let me see. I could come any morning this week.\nW: How about in the afternoon?\nM: Hmm. I could reschedule my Tuesday afternoon appointment. I'll check and get back to you—I have your number now. And your name is?\nW: Hoffman—Claudia Hoffman. Thank you. Talk to you soon.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n66. Người phụ nữ cung cấp gì?\n(A) Bản bố trí sàn nhà\n(B) Địa chỉ\n(C) Hình thức thanh toán\n(D) Giấy chứng nhận bảo hiểm\n\nDịch hội thoại:\nM: Đây là Bradley từ Windows Galore. Tôi có thể giúp gì cho bạn?\nW: Xin chào! Tôi muốn thêm màn chắn vào cửa sổ nhà tôi. Tôi tự hỏi liệu bạn có thể ghé qua và xem không. Nhân tiện, tôi sống ở 42 West Third Street.\nM: OK—không xa lắm. Để tôi xem. Tôi có thể đến bất kỳ buổi sáng nào trong tuần này.\nW: Buổi chiều thì sao?\nM: Hmm. Tôi có thể sắp xếp lại cuộc hẹn chiều thứ Ba. Tôi sẽ kiểm tra và liên lạc lại với bạn—bây giờ tôi có số của bạn rồi. Và tên bạn là?\nW: Hoffman—Claudia Hoffman. Cảm ơn. Nói chuyện sau."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "67. Look at the graphic. Which appointment will the man try to reschedule? (A) The inspector’s visit (B) The bank loan meeting (C) The dental cleaning (D) The café project",
   "transcript": "M: This is Bradley from Windows Galore. How can I help you?\nW: Hello! I'd like to have screens added to my windows at home. I was wondering if you would be available to stop by and take a look. I live at 42 West Third Street, by the way.\nM: OK—that's not far. Let me see. I could come any morning this week.\nW: How about in the afternoon?\nM: Hmm. I could reschedule my Tuesday afternoon appointment. I'll check and get back to you—I have your number now. And your name is?\nW: Hoffman—Claudia Hoffman. Thank you. Talk to you soon.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n67. Nhìn vào biểu đồ. Cuộc hẹn nào người đàn ông sẽ cố gắng sắp xếp lại?\n(A) Cuộc thăm của thanh tra\n(B) Cuộc họp vay ngân hàng\n(C) Làm sạch răng\n(D) Dự án quán cà phê\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Đây là Bradley từ Windows Galore. Tôi có thể giúp gì cho bạn?\nW: Xin chào! Tôi muốn thêm màn chắn vào cửa sổ nhà tôi. Tôi tự hỏi liệu bạn có thể ghé qua và xem không. Nhân tiện, tôi sống ở 42 West Third Street.\nM: OK—không xa lắm. Để tôi xem. Tôi có thể đến bất kỳ buổi sáng nào trong tuần này.\nW: Buổi chiều thì sao?\nM: Hmm. Tôi có thể sắp xếp lại cuộc hẹn chiều thứ Ba. Tôi sẽ kiểm tra và liên lạc lại với bạn—bây giờ tôi có số của bạn rồi. Và tên bạn là?\nW: Hoffman—Claudia Hoffman. Cảm ơn. Nói chuyện sau."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "68. What industry do the speakers most likely work in? (A) Legal (B) Construction (C) Agriculture (D) Robotics",
   "transcript": "M: Ms. Kwon, thank you for sending me to the upcoming robotics conference. I didn't expect an opportunity like this so soon after being hired here.\nW: It's important for you to be familiar with current robot designs. There are always new trends and technologies coming out, and I want you to stay ahead of developments in our industry.\nM: I agree. Plus, it'll give me the chance to introduce myself to potential clients.\nW: Oh, about that: here's a handout I provide to all new hires. It includes some helpful tips— especially this one. Do you have your business cards yet?\nM: Hmm. I haven't received them, but I'll call the printer today for an update.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n68. Các diễn giả rất có khả năng làm việc trong ngành nào?\n(A) Pháp lý\n(B) Xây dựng\n(C) Nông nghiệp\n(D) Robot\n\nDịch hội thoại:\nM: Cô Kwon, cảm ơn vì đã gửi tôi đến hội nghị robot sắp tới. Tôi không ngờ có cơ hội như thế này sớm sau khi được thuê ở đây.\nW: Điều quan trọng là bạn phải quen thuộc với các thiết kế robot hiện tại. Luôn có xu hướng và công nghệ mới xuất hiện, và tôi muốn bạn dẫn đầu các phát triển trong ngành của chúng ta.\nM: Tôi đồng ý. Ngoài ra, nó sẽ cho tôi cơ hội giới thiệu bản thân với khách hàng tiềm năng.\nW: Ồ, về điều đó: đây là tài liệu tôi cung cấp cho tất cả nhân viên mới. Nó bao gồm một số mẹo hữu ích— đặc biệt là cái này. Bạn đã có danh thiếp chưa?\nM: Hmm. Tôi chưa nhận được, nhưng tôi sẽ gọi cho nhà in hôm nay để cập nhật."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "69. Why does the woman want the man to attend a conference? (A) To learn more about the latest industry trends (B) To accept a reward on behalf of the company (C) To host a panel discussion (D) To screen job candidates",
   "transcript": "M: Ms. Kwon, thank you for sending me to the upcoming robotics conference. I didn't expect an opportunity like this so soon after being hired here.\nW: It's important for you to be familiar with current robot designs. There are always new trends and technologies coming out, and I want you to stay ahead of developments in our industry.\nM: I agree. Plus, it'll give me the chance to introduce myself to potential clients.\nW: Oh, about that: here's a handout I provide to all new hires. It includes some helpful tips— especially this one. Do you have your business cards yet?\nM: Hmm. I haven't received them, but I'll call the printer today for an update.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n69. Tại sao người phụ nữ muốn người đàn ông tham dự hội nghị?\n(A) Để tìm hiểu thêm về xu hướng ngành mới nhất\n(B) Để nhận giải thưởng thay mặt công ty\n(C) Để dẫn dắt một buổi thảo luận nhóm\n(D) Để sàng lọc ứng viên việc làm\n\nDịch hội thoại:\nM: Cô Kwon, cảm ơn vì đã gửi tôi đến hội nghị robot sắp tới. Tôi không ngờ có cơ hội như thế này sớm sau khi được thuê ở đây.\nW: Điều quan trọng là bạn phải quen thuộc với các thiết kế robot hiện tại. Luôn có xu hướng và công nghệ mới xuất hiện, và tôi muốn bạn dẫn đầu các phát triển trong ngành của chúng ta.\nM: Tôi đồng ý. Ngoài ra, nó sẽ cho tôi cơ hội giới thiệu bản thân với khách hàng tiềm năng.\nW: Ồ, về điều đó: đây là tài liệu tôi cung cấp cho tất cả nhân viên mới. Nó bao gồm một số mẹo hữu ích— đặc biệt là cái này. Bạn đã có danh thiếp chưa?\nM: Hmm. Tôi chưa nhận được, nhưng tôi sẽ gọi cho nhà in hôm nay để cập nhật."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "70. Look at the graphic. Which tip does the woman point out? (A) Tip 1 (B) Tip 2 (C) Tip 3 (D) Tip 4",
   "transcript": "M: Ms. Kwon, thank you for sending me to the upcoming robotics conference. I didn't expect an opportunity like this so soon after being hired here.\nW: It's important for you to be familiar with current robot designs. There are always new trends and technologies coming out, and I want you to stay ahead of developments in our industry.\nM: I agree. Plus, it'll give me the chance to introduce myself to potential clients.\nW: Oh, about that: here's a handout I provide to all new hires. It includes some helpful tips— especially this one. Do you have your business cards yet?\nM: Hmm. I haven't received them, but I'll call the printer today for an update.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n70. Nhìn vào biểu đồ. Mẹo nào người phụ nữ đề cập đến?\n(A) Mẹo 1\n(B) Mẹo 2\n(C) Mẹo 3\n(D) Mẹo 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Cô Kwon, cảm ơn vì đã gửi tôi đến hội nghị robot sắp tới. Tôi không ngờ có cơ hội như thế này sớm sau khi được thuê ở đây.\nW: Điều quan trọng là bạn phải quen thuộc với các thiết kế robot hiện tại. Luôn có xu hướng và công nghệ mới xuất hiện, và tôi muốn bạn dẫn đầu các phát triển trong ngành của chúng ta.\nM: Tôi đồng ý. Ngoài ra, nó sẽ cho tôi cơ hội giới thiệu bản thân với khách hàng tiềm năng.\nW: Ồ, về điều đó: đây là tài liệu tôi cung cấp cho tất cả nhân viên mới. Nó bao gồm một số mẹo hữu ích— đặc biệt là cái này. Bạn đã có danh thiếp chưa?\nM: Hmm. Tôi chưa nhận được, nhưng tôi sẽ gọi cho nhà in hôm nay để cập nhật."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "71. Where do the listeners most likely work? (A) At a taxi service (B) At a car repair shop (C) At a shipping company (D) At a driving school",
   "transcript": "Crew, please stop working on that truck repair for a second. Many of you complained about how slow and hard it is to use the car lift, so I purchased a new one and it was delivered this morning! It can lift much heavier vehicles, and it's faster. The only problem is we're missing the bottles of hydraulic fluid that were supposed to be included in the shipment. So, we're stuck using the old car lift for a few more days. Oh, and one more thing—when talking to customers, please remember to mention that we're now offering a discount on oil changes if they schedule a vehicle inspection with us.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n71. Người nghe rất có khả năng làm việc ở đâu?\n(A) Tại dịch vụ taxi\n(B) Tại cửa hàng sửa chữa ô tô\n(C) Tại công ty vận chuyển\n(D) Tại trường dạy lái xe\n\nDịch bài nói:\nĐội ngũ, xin vui lòng dừng sửa chữa chiếc xe tải đó một giây. Nhiều bạn phàn nàn về việc sử dụng thang nâng xe chậm và khó khăn như thế nào, vì vậy tôi đã mua một cái mới và nó được giao sáng nay! Nó có thể nâng các phương tiện nặng hơn nhiều, và nhanh hơn. Vấn đề duy nhất là chúng ta thiếu các chai dầu thủy lực lẽ ra phải được bao gồm trong lô hàng. Vì vậy, chúng ta buộc phải sử dụng thang nâng xe cũ thêm vài ngày nữa. Ồ, và một điều nữa—khi nói chuyện với khách hàng, hãy nhớ đề cập rằng chúng ta đang cung cấp giảm giá cho việc thay dầu nếu họ lên lịch kiểm tra xe với chúng ta."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "72. What problem does the speaker mention? (A) A training manual should be updated. (B) An invoice was incorrect. (C) Frequent maintenance is required. (D) Some supplies are missing.",
   "transcript": "Crew, please stop working on that truck repair for a second. Many of you complained about how slow and hard it is to use the car lift, so I purchased a new one and it was delivered this morning! It can lift much heavier vehicles, and it's faster. The only problem is we're missing the bottles of hydraulic fluid that were supposed to be included in the shipment. So, we're stuck using the old car lift for a few more days. Oh, and one more thing—when talking to customers, please remember to mention that we're now offering a discount on oil changes if they schedule a vehicle inspection with us.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n72. Người nói đề cập đến vấn đề gì?\n(A) Sổ tay hướng dẫn đào tạo cần được cập nhật.\n(B) Hóa đơn không chính xác.\n(C) Cần bảo dưỡng thường xuyên.\n(D) Một số vật tư bị thiếu.\n\nDịch bài nói:\nĐội ngũ, xin vui lòng dừng sửa chữa chiếc xe tải đó một giây. Nhiều bạn phàn nàn về việc sử dụng thang nâng xe chậm và khó khăn như thế nào, vì vậy tôi đã mua một cái mới và nó được giao sáng nay! Nó có thể nâng các phương tiện nặng hơn nhiều, và nhanh hơn. Vấn đề duy nhất là chúng ta thiếu các chai dầu thủy lực lẽ ra phải được bao gồm trong lô hàng. Vì vậy, chúng ta buộc phải sử dụng thang nâng xe cũ thêm vài ngày nữa. Ồ, và một điều nữa—khi nói chuyện với khách hàng, hãy nhớ đề cập rằng chúng ta đang cung cấp giảm giá cho việc thay dầu nếu họ lên lịch kiểm tra xe với chúng ta."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "73. What should the listeners remind customers about? (A) Some schedule changes (B) An online survey (C) A promotional offer (D) A safety policy",
   "transcript": "Crew, please stop working on that truck repair for a second. Many of you complained about how slow and hard it is to use the car lift, so I purchased a new one and it was delivered this morning! It can lift much heavier vehicles, and it's faster. The only problem is we're missing the bottles of hydraulic fluid that were supposed to be included in the shipment. So, we're stuck using the old car lift for a few more days. Oh, and one more thing—when talking to customers, please remember to mention that we're now offering a discount on oil changes if they schedule a vehicle inspection with us.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n73. Người nghe nên nhắc nhở khách hàng về điều gì?\n(A) Một số thay đổi lịch trình\n(B) Khảo sát trực tuyến\n(C) Ưu đãi khuyến mãi\n(D) Chính sách an toàn\n\nDịch bài nói:\nĐội ngũ, xin vui lòng dừng sửa chữa chiếc xe tải đó một giây. Nhiều bạn phàn nàn về việc sử dụng thang nâng xe chậm và khó khăn như thế nào, vì vậy tôi đã mua một cái mới và nó được giao sáng nay! Nó có thể nâng các phương tiện nặng hơn nhiều, và nhanh hơn. Vấn đề duy nhất là chúng ta thiếu các chai dầu thủy lực lẽ ra phải được bao gồm trong lô hàng. Vì vậy, chúng ta buộc phải sử dụng thang nâng xe cũ thêm vài ngày nữa. Ồ, và một điều nữa—khi nói chuyện với khách hàng, hãy nhớ đề cập rằng chúng ta đang cung cấp giảm giá cho việc thay dầu nếu họ lên lịch kiểm tra xe với chúng ta."
  },
  {
   "number": 74,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "74. What does the company sell? (A) Office furniture (B) Kitchen appliances (C) Garden tools (D) Tablet computers",
   "transcript": "As you know, we've had an extremely successful fourth quarter selling desks and chairs to our corporate clients on the West Coast. In fact, we've done so well that we're planning to give ten percent of this month's profits to a local charity in December. They have a great reputation for teaching computer skills to children for free. If you'd like to see a video clip of our CEO talking about this initiative, just visit our social media site.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n74. Công ty bán gì?\n(A) Đồ nội thất văn phòng\n(B) Đồ gia dụng nhà bếp\n(C) Dụng cụ làm vườn\n(D) Máy tính bảng\n\nDịch bài nói:\nNhư các bạn biết, chúng ta đã có một quý thứ tư cực kỳ thành công trong việc bán bàn ghế cho khách hàng doanh nghiệp ở Bờ Tây. Thực tế, chúng ta đã làm rất tốt đến nỗi chúng ta đang lên kế hoạch tặng mười phần trăm lợi nhuận tháng này cho một tổ chức từ thiện địa phương vào tháng Mười Hai. Họ có danh tiếng tốt trong việc dạy kỹ năng máy tính miễn phí cho trẻ em. Nếu bạn muốn xem video clip về CEO của chúng ta nói về sáng kiến này, chỉ cần truy cập trang mạng xã hội của chúng ta."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "75. What does the speaker say will happen in December? (A) A promotional sale will begin. (B) Special equipment will be delivered. (C) Some temporary staff will be hired. (D) Some profits will be donated to a charity.",
   "transcript": "As you know, we've had an extremely successful fourth quarter selling desks and chairs to our corporate clients on the West Coast. In fact, we've done so well that we're planning to give ten percent of this month's profits to a local charity in December. They have a great reputation for teaching computer skills to children for free. If you'd like to see a video clip of our CEO talking about this initiative, just visit our social media site.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n75. Người nói nói gì sẽ xảy ra vào tháng Mười Hai?\n(A) Một đợt giảm giá khuyến mãi sẽ bắt đầu.\n(B) Thiết bị đặc biệt sẽ được giao.\n(C) Một số nhân viên tạm thời sẽ được tuyển dụng.\n(D) Một phần lợi nhuận sẽ được quyên góp cho tổ chức từ thiện.\n\nDịch bài nói:\nNhư các bạn biết, chúng ta đã có một quý thứ tư cực kỳ thành công trong việc bán bàn ghế cho khách hàng doanh nghiệp ở Bờ Tây. Thực tế, chúng ta đã làm rất tốt đến nỗi chúng ta đang lên kế hoạch tặng mười phần trăm lợi nhuận tháng này cho một tổ chức từ thiện địa phương vào tháng Mười Hai. Họ có danh tiếng tốt trong việc dạy kỹ năng máy tính miễn phí cho trẻ em. Nếu bạn muốn xem video clip về CEO của chúng ta nói về sáng kiến này, chỉ cần truy cập trang mạng xã hội của chúng ta."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. According to the speaker, what can the listeners find on a social media site? (A) A manual (B) A video (C) Some photographs (D) A price list",
   "transcript": "As you know, we've had an extremely successful fourth quarter selling desks and chairs to our corporate clients on the West Coast. In fact, we've done so well that we're planning to give ten percent of this month's profits to a local charity in December. They have a great reputation for teaching computer skills to children for free. If you'd like to see a video clip of our CEO talking about this initiative, just visit our social media site.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n76. Theo người nói, người nghe có thể tìm thấy gì trên trang mạng xã hội?\n(A) Sổ tay hướng dẫn\n(B) Video\n(C) Một số ảnh chụp\n(D) Danh sách giá\n\nDịch bài nói:\nNhư các bạn biết, chúng ta đã có một quý thứ tư cực kỳ thành công trong việc bán bàn ghế cho khách hàng doanh nghiệp ở Bờ Tây. Thực tế, chúng ta đã làm rất tốt đến nỗi chúng ta đang lên kế hoạch tặng mười phần trăm lợi nhuận tháng này cho một tổ chức từ thiện địa phương vào tháng Mười Hai. Họ có danh tiếng tốt trong việc dạy kỹ năng máy tính miễn phí cho trẻ em. Nếu bạn muốn xem video clip về CEO của chúng ta nói về sáng kiến này, chỉ cần truy cập trang mạng xã hội của chúng ta."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "C",
   "group": "77-79",
   "textEn": "77. What is the episode mainly about? (A) Hiring (B) Accounting (C) Fund-raising (D) Publishing",
   "transcript": "",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n77. Tập podcast chủ yếu nói về gì?\n(A) Tuyển dụng\n(B) Kế toán\n(C) Quyên góp\n(D) Xuất bản\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 77-79 (không khớp với câu hỏi), nên chưa có transcript/dịch bài nói cho nhóm này."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "C",
   "group": "77-79",
   "textEn": "78. What does the speaker mean when he says, \"these things are constantly changing\"? (A) He recommends professional development courses. (B) He questions the value of an investment. (C) Some information will be excluded. (D) Using technology is important.",
   "transcript": "",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n78. Người nói có ý gì khi nói \"những điều này luôn thay đổi\"?\n(A) Ông ấy khuyên nên tham gia các khóa học phát triển chuyên môn.\n(B) Ông ấy đặt câu hỏi về giá trị của một khoản đầu tư.\n(C) Một số thông tin sẽ bị loại trừ.\n(D) Sử dụng công nghệ là quan trọng.\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 77-79 (không khớp với câu hỏi), nên chưa có transcript/dịch bài nói cho nhóm này."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "79. What does the speaker say is important for organizations to do? (A) Be leaders in their industries (B) Establish successful advertising methods (C) Collect community feedback (D) Use familiar and current strategies",
   "transcript": "",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n79. Người nói nói điều gì quan trọng đối với các tổ chức?\n(A) Làm lãnh đạo trong ngành của họ\n(B) Thiết lập các phương pháp quảng cáo thành công\n(C) Thu thập phản hồi từ cộng đồng\n(D) Sử dụng chiến lược quen thuộc và hiện tại\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 77-79 (không khớp với câu hỏi), nên chưa có transcript/dịch bài nói cho nhóm này."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "80. What does the speaker say the company sells? (A) Home appliances (B) Office supplies (C) Sporting goods (D) Entertainment systems",
   "transcript": "As the company president, I'm excited to share that we've sold a record number of home appliances for two years in a row, and I'd like to reward your hard work. First, everyone will be eligible for a one-time monetary bonus. Your supervisor will speak with you about how it'll be calculated and when you'll receive it. Also, I'd like to offer more flexibility in your schedule, so all employees will be permitted to work remotely twice a week. You'll just need to note those days on your calendar, so everyone knows where you are.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n80. Người nói nói công ty bán gì?\n(A) Đồ gia dụng\n(B) Văn phòng phẩm\n(C) Dụng cụ thể thao\n(D) Hệ thống giải trí\n\nDịch bài nói:\nLà chủ tịch công ty, tôi rất hào hứng khi chia sẻ rằng chúng ta đã bán được số lượng kỷ lục các thiết bị gia dụng trong hai năm liên tiếp, và tôi muốn thưởng cho sự làm việc chăm chỉ của các bạn. Đầu tiên, mọi người sẽ đủ điều kiện nhận thưởng tiền một lần. Người giám sát của bạn sẽ nói chuyện với bạn về cách tính và khi nào bạn nhận được. Ngoài ra, tôi muốn cung cấp thêm sự linh hoạt trong lịch trình của bạn, vì vậy tất cả nhân viên sẽ được phép làm việc từ xa hai lần một tuần. Bạn chỉ cần ghi chú những ngày đó trên lịch, để mọi người biết bạn ở đâu."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "81. What will the listeners discuss with their supervisors? (A) A new sales goal (B) Training opportunities (C) A financial bonus (D) Increasing efficiency",
   "transcript": "As the company president, I'm excited to share that we've sold a record number of home appliances for two years in a row, and I'd like to reward your hard work. First, everyone will be eligible for a one-time monetary bonus. Your supervisor will speak with you about how it'll be calculated and when you'll receive it. Also, I'd like to offer more flexibility in your schedule, so all employees will be permitted to work remotely twice a week. You'll just need to note those days on your calendar, so everyone knows where you are.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n81. Người nghe sẽ thảo luận gì với người giám sát?\n(A) Mục tiêu bán hàng mới\n(B) Cơ hội đào tạo\n(C) Thưởng tài chính\n(D) Tăng hiệu quả\n\nDịch bài nói:\nLà chủ tịch công ty, tôi rất hào hứng khi chia sẻ rằng chúng ta đã bán được số lượng kỷ lục các thiết bị gia dụng trong hai năm liên tiếp, và tôi muốn thưởng cho sự làm việc chăm chỉ của các bạn. Đầu tiên, mọi người sẽ đủ điều kiện nhận thưởng tiền một lần. Người giám sát của bạn sẽ nói chuyện với bạn về cách tính và khi nào bạn nhận được. Ngoài ra, tôi muốn cung cấp thêm sự linh hoạt trong lịch trình của bạn, vì vậy tất cả nhân viên sẽ được phép làm việc từ xa hai lần một tuần. Bạn chỉ cần ghi chú những ngày đó trên lịch, để mọi người biết bạn ở đâu."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "82. How will the company offer more flexibility? (A) By introducing shared workspaces (B) By allowing employees to switch assignments (C) By permitting remote work (D) By increasing vacation time",
   "transcript": "As the company president, I'm excited to share that we've sold a record number of home appliances for two years in a row, and I'd like to reward your hard work. First, everyone will be eligible for a one-time monetary bonus. Your supervisor will speak with you about how it'll be calculated and when you'll receive it. Also, I'd like to offer more flexibility in your schedule, so all employees will be permitted to work remotely twice a week. You'll just need to note those days on your calendar, so everyone knows where you are.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n82. Công ty sẽ cung cấp thêm sự linh hoạt như thế nào?\n(A) Bằng cách giới thiệu không gian làm việc chung\n(B) Bằng cách cho phép nhân viên hoán đổi nhiệm vụ\n(C) Bằng cách cho phép làm việc từ xa\n(D) Bằng cách tăng thời gian nghỉ phép\n\nDịch bài nói:\nLà chủ tịch công ty, tôi rất hào hứng khi chia sẻ rằng chúng ta đã bán được số lượng kỷ lục các thiết bị gia dụng trong hai năm liên tiếp, và tôi muốn thưởng cho sự làm việc chăm chỉ của các bạn. Đầu tiên, mọi người sẽ đủ điều kiện nhận thưởng tiền một lần. Người giám sát của bạn sẽ nói chuyện với bạn về cách tính và khi nào bạn nhận được. Ngoài ra, tôi muốn cung cấp thêm sự linh hoạt trong lịch trình của bạn, vì vậy tất cả nhân viên sẽ được phép làm việc từ xa hai lần một tuần. Bạn chỉ cần ghi chú những ngày đó trên lịch, để mọi người biết bạn ở đâu."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "83. What is the purpose of the meeting? (A) To evaluate vendor contracts (B) To review hiring policies (C) To revise budget proposals (D) To assess editing software",
   "transcript": "I called this meeting today because I wanted to talk about changes to how our company hires new employees. It came to my attention that some people were confused when reading about these new hiring policies in the latest company newsletter. I posted a link in the meeting invitation to this information, and I asked you to bring your laptops so that you can follow along on your own screen. After we review the policies, you can see Sumit in the back of the room if you'd like a printed copy. He has several of them.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n83. Mục đích của cuộc họp là gì?\n(A) Đánh giá hợp đồng nhà cung cấp\n(B) Xem xét chính sách tuyển dụng\n(C) Sửa đổi đề xuất ngân sách\n(D) Đánh giá phần mềm chỉnh sửa\n\nDịch bài nói:\nTôi gọi cuộc họp hôm nay vì tôi muốn nói về những thay đổi trong cách công ty chúng ta tuyển dụng nhân viên mới. Tôi chú ý rằng một số người bị bối rối khi đọc về những chính sách tuyển dụng mới này trong bản tin công ty mới nhất. Tôi đã đăng liên kết trong lời mời họp đến thông tin này, và tôi yêu cầu các bạn mang theo laptop để các bạn có thể theo dõi trên màn hình của riêng mình. Sau khi chúng ta xem xét các chính sách, bạn có thể gặp Sumit ở phía sau phòng nếu bạn muốn một bản in. Anh ấy có vài bản."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "84. What did the speaker ask the listeners to bring to the meeting? (A) A list of concerns (B) A completed survey (C) A project timeline (D) A laptop computer",
   "transcript": "I called this meeting today because I wanted to talk about changes to how our company hires new employees. It came to my attention that some people were confused when reading about these new hiring policies in the latest company newsletter. I posted a link in the meeting invitation to this information, and I asked you to bring your laptops so that you can follow along on your own screen. After we review the policies, you can see Sumit in the back of the room if you'd like a printed copy. He has several of them.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n84. Người nói yêu cầu người nghe mang gì đến cuộc họp?\n(A) Danh sách các vấn đề quan tâm\n(B) Khảo sát đã hoàn thành\n(C) Lịch trình dự án\n(D) Máy tính xách tay\n\nDịch bài nói:\nTôi gọi cuộc họp hôm nay vì tôi muốn nói về những thay đổi trong cách công ty chúng ta tuyển dụng nhân viên mới. Tôi chú ý rằng một số người bị bối rối khi đọc về những chính sách tuyển dụng mới này trong bản tin công ty mới nhất. Tôi đã đăng liên kết trong lời mời họp đến thông tin này, và tôi yêu cầu các bạn mang theo laptop để các bạn có thể theo dõi trên màn hình của riêng mình. Sau khi chúng ta xem xét các chính sách, bạn có thể gặp Sumit ở phía sau phòng nếu bạn muốn một bản in. Anh ấy có vài bản."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "85. Why might some of the listeners look for Sumit? (A) To get a document (B) To ask additional questions (C) To volunteer for an event (D) To check the status of a request",
   "transcript": "I called this meeting today because I wanted to talk about changes to how our company hires new employees. It came to my attention that some people were confused when reading about these new hiring policies in the latest company newsletter. I posted a link in the meeting invitation to this information, and I asked you to bring your laptops so that you can follow along on your own screen. After we review the policies, you can see Sumit in the back of the room if you'd like a printed copy. He has several of them.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n85. Tại sao một số người nghe có thể tìm Sumit?\n(A) Để lấy tài liệu\n(B) Để hỏi thêm câu hỏi\n(C) Để tình nguyện tham gia sự kiện\n(D) Để kiểm tra tình trạng yêu cầu\n\nDịch bài nói:\nTôi gọi cuộc họp hôm nay vì tôi muốn nói về những thay đổi trong cách công ty chúng ta tuyển dụng nhân viên mới. Tôi chú ý rằng một số người bị bối rối khi đọc về những chính sách tuyển dụng mới này trong bản tin công ty mới nhất. Tôi đã đăng liên kết trong lời mời họp đến thông tin này, và tôi yêu cầu các bạn mang theo laptop để các bạn có thể theo dõi trên màn hình của riêng mình. Sau khi chúng ta xem xét các chính sách, bạn có thể gặp Sumit ở phía sau phòng nếu bạn muốn một bản in. Anh ấy có vài bản."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "86. What did the speaker recently receive? (A) Sales results (B) Production schedules (C) An inspection report (D) An advertising proposal",
   "transcript": "As head of the product design team, I have the sales results from the last quarter, and they're disappointing. It's clear that consumers are no longer interested in the types of toys and games we've been producing. My guess is that people are getting tired of noisy, blinking electronics. We have a lot of work to do. There's a new trend toward outdoor toys and games, where people can be physically active. I've already come up with some prototypes of new games. I brought a few of them, and now I'll show you how they work.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n86. Người nói gần đây nhận được gì?\n(A) Kết quả bán hàng\n(B) Lịch sản xuất\n(C) Báo cáo kiểm tra\n(D) Đề xuất quảng cáo\n\nDịch bài nói:\nLà trưởng nhóm thiết kế sản phẩm, tôi có kết quả bán hàng từ quý trước, và chúng thật thất vọng. Rõ ràng là người tiêu dùng không còn quan tâm đến loại đồ chơi và trò chơi mà chúng ta đã sản xuất. Tôi đoán là mọi người đang mệt mỏi với đồ điện tử ồn ào, nhấp nháy. Chúng ta có nhiều việc phải làm. Có xu hướng mới hướng đến đồ chơi và trò chơi ngoài trời, nơi mọi người có thể hoạt động thể chất. Tôi đã nghĩ ra một số mẫu thử của trò chơi mới. Tôi mang theo vài cái, và bây giờ tôi sẽ cho bạn thấy chúng hoạt động như thế nào."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "D",
   "group": "86-88",
   "textEn": "87. What does the speaker mean when he says, \"We have a lot of work to do\"? (A) Extra shifts will be scheduled. (B) A job opening will be posted soon. (C) Customer orders have increased. (D) A change is necessary.",
   "transcript": "As head of the product design team, I have the sales results from the last quarter, and they're disappointing. It's clear that consumers are no longer interested in the types of toys and games we've been producing. My guess is that people are getting tired of noisy, blinking electronics. We have a lot of work to do. There's a new trend toward outdoor toys and games, where people can be physically active. I've already come up with some prototypes of new games. I brought a few of them, and now I'll show you how they work.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n87. Người nói có ý gì khi nói \"Chúng ta có rất nhiều việc phải làm\"?\n(A) Sẽ sắp xếp thêm ca làm việc.\n(B) Một vị trí tuyển dụng sẽ được đăng sớm.\n(C) Đơn hàng của khách hàng đã tăng.\n(D) Cần thay đổi.\n\nDịch bài nói:\nLà trưởng nhóm thiết kế sản phẩm, tôi có kết quả bán hàng từ quý trước, và chúng thật thất vọng. Rõ ràng là người tiêu dùng không còn quan tâm đến loại đồ chơi và trò chơi mà chúng ta đã sản xuất. Tôi đoán là mọi người đang mệt mỏi với đồ điện tử ồn ào, nhấp nháy. Chúng ta có nhiều việc phải làm. Có xu hướng mới hướng đến đồ chơi và trò chơi ngoài trời, nơi mọi người có thể hoạt động thể chất. Tôi đã nghĩ ra một số mẫu thử của trò chơi mới. Tôi mang theo vài cái, và bây giờ tôi sẽ cho bạn thấy chúng hoạt động như thế nào."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "88. What will the speaker do next? (A) Distribute some manuals (B) Give a demonstration (C) Answer some questions (D) Show a video",
   "transcript": "As head of the product design team, I have the sales results from the last quarter, and they're disappointing. It's clear that consumers are no longer interested in the types of toys and games we've been producing. My guess is that people are getting tired of noisy, blinking electronics. We have a lot of work to do. There's a new trend toward outdoor toys and games, where people can be physically active. I've already come up with some prototypes of new games. I brought a few of them, and now I'll show you how they work.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n88. Người nói sẽ làm gì tiếp theo?\n(A) Phát hành một số sổ tay\n(B) Thực hiện trình diễn\n(C) Trả lời một số câu hỏi\n(D) Chiếu video\n\nDịch bài nói:\nLà trưởng nhóm thiết kế sản phẩm, tôi có kết quả bán hàng từ quý trước, và chúng thật thất vọng. Rõ ràng là người tiêu dùng không còn quan tâm đến loại đồ chơi và trò chơi mà chúng ta đã sản xuất. Tôi đoán là mọi người đang mệt mỏi với đồ điện tử ồn ào, nhấp nháy. Chúng ta có nhiều việc phải làm. Có xu hướng mới hướng đến đồ chơi và trò chơi ngoài trời, nơi mọi người có thể hoạt động thể chất. Tôi đã nghĩ ra một số mẫu thử của trò chơi mới. Tôi mang theo vài cái, và bây giờ tôi sẽ cho bạn thấy chúng hoạt động như thế nào."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "89. Where does the speaker work? (A) At a museum (B) At a park (C) At a library (D) At a theater",
   "transcript": "Hello. You've reached Ji-Soo Yoon at the visitor center of the Pine Valley Nature Preserve. I am currently out of the office. Please be aware that visitor access to the park will be limited during the month of March while our facilities are undergoing renovations. If you are calling for information about helping to maintain our hiking trails, please refer to the volunteer page on our Web site. We welcome the assistance of motivated individuals. For all other inquiries, please leave a message after the tone.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n89. Người nói làm việc ở đâu?\n(A) Tại bảo tàng\n(B) Tại công viên\n(C) Tại thư viện\n(D) Tại nhà hát\n\nDịch bài nói:\nXin chào. Bạn đã gọi đến Ji-Soo Yoon tại trung tâm du khách của Khu bảo tồn Thiên nhiên Pine Valley. Tôi hiện đang ra khỏi văn phòng. Xin lưu ý rằng việc tiếp cận công viên của du khách sẽ bị hạn chế trong tháng Ba trong khi các cơ sở của chúng tôi đang được cải tạo. Nếu bạn gọi để lấy thông tin về việc giúp duy trì các đường mòn leo núi của chúng tôi, vui lòng tham khảo trang tình nguyện viên trên trang web của chúng tôi. Chúng tôi chào đón sự hỗ trợ của các cá nhân có động lực. Đối với tất cả các câu hỏi khác, vui lòng để lại tin nhắn sau tiếng bíp."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "90. What will happen in March? (A) A new facility will open. (B) An exhibition will take place. (C) Renovations will take place. (D) Operating hours will be extended.",
   "transcript": "Hello. You've reached Ji-Soo Yoon at the visitor center of the Pine Valley Nature Preserve. I am currently out of the office. Please be aware that visitor access to the park will be limited during the month of March while our facilities are undergoing renovations. If you are calling for information about helping to maintain our hiking trails, please refer to the volunteer page on our Web site. We welcome the assistance of motivated individuals. For all other inquiries, please leave a message after the tone.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n90. Điều gì sẽ xảy ra vào tháng Ba?\n(A) Một cơ sở mới sẽ mở cửa.\n(B) Một triển lãm sẽ được tổ chức.\n(C) Công việc cải tạo sẽ diễn ra.\n(D) Giờ hoạt động sẽ được mở rộng.\n\nDịch bài nói:\nXin chào. Bạn đã gọi đến Ji-Soo Yoon tại trung tâm du khách của Khu bảo tồn Thiên nhiên Pine Valley. Tôi hiện đang ra khỏi văn phòng. Xin lưu ý rằng việc tiếp cận công viên của du khách sẽ bị hạn chế trong tháng Ba trong khi các cơ sở của chúng tôi đang được cải tạo. Nếu bạn gọi để lấy thông tin về việc giúp duy trì các đường mòn leo núi của chúng tôi, vui lòng tham khảo trang tình nguyện viên trên trang web của chúng tôi. Chúng tôi chào đón sự hỗ trợ của các cá nhân có động lực. Đối với tất cả các câu hỏi khác, vui lòng để lại tin nhắn sau tiếng bíp."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "A",
   "group": "89-91",
   "textEn": "91. What does the speaker say can be found online? (A) Volunteer information (B) A calendar of upcoming events (C) Ticket prices (D) An area map",
   "transcript": "Hello. You've reached Ji-Soo Yoon at the visitor center of the Pine Valley Nature Preserve. I am currently out of the office. Please be aware that visitor access to the park will be limited during the month of March while our facilities are undergoing renovations. If you are calling for information about helping to maintain our hiking trails, please refer to the volunteer page on our Web site. We welcome the assistance of motivated individuals. For all other inquiries, please leave a message after the tone.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n91. Người nói nói điều gì có thể tìm thấy trực tuyến?\n(A) Thông tin tình nguyện viên\n(B) Lịch các sự kiện sắp tới\n(C) Giá vé\n(D) Bản đồ khu vực\n\nDịch bài nói:\nXin chào. Bạn đã gọi đến Ji-Soo Yoon tại trung tâm du khách của Khu bảo tồn Thiên nhiên Pine Valley. Tôi hiện đang ra khỏi văn phòng. Xin lưu ý rằng việc tiếp cận công viên của du khách sẽ bị hạn chế trong tháng Ba trong khi các cơ sở của chúng tôi đang được cải tạo. Nếu bạn gọi để lấy thông tin về việc giúp duy trì các đường mòn leo núi của chúng tôi, vui lòng tham khảo trang tình nguyện viên trên trang web của chúng tôi. Chúng tôi chào đón sự hỗ trợ của các cá nhân có động lực. Đối với tất cả các câu hỏi khác, vui lòng để lại tin nhắn sau tiếng bíp."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "92. Who are today's guests on the podcast? (A) Government officials (B) Business owners (C) Real estate developers (D) Cooking-school instructors",
   "transcript": "Today, I'll be interviewing the owners of Salazar Olive Oil, one of the best in California for the past two decades. Now—if you're hearing about this olive oil for the first time, you're not alone. The Salazar family has kept the operation small. I'm interested in discussing their business philosophy as well as their new project: an olive oil tasting class on their farm. You'll find out how to register during the interview so you can sign up!",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n92. Khách mời hôm nay trên podcast là ai?\n(A) Quan chức chính phủ\n(B) Chủ doanh nghiệp\n(C) Nhà phát triển bất động sản\n(D) Giảng viên trường nấu ăn\n\nDịch bài nói:\nHôm nay, tôi sẽ phỏng vấn chủ sở hữu của Salazar Olive Oil, một trong những loại tốt nhất ở California trong hai thập kỷ qua. Bây giờ—nếu bạn đang nghe về dầu ô liu này lần đầu tiên, bạn không phải là người duy nhất. Gia đình Salazar đã giữ hoạt động nhỏ. Tôi quan tâm đến việc thảo luận về triết lý kinh doanh của họ cũng như dự án mới của họ: lớp nếm dầu ô liu trên trang trại của họ. Bạn sẽ tìm hiểu cách đăng ký trong cuộc phỏng vấn để bạn có thể đăng ký!"
  },
  {
   "number": 93,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "93. Why does the speaker say, \"The Salazar family has kept the operation small\"? (A) To indicate why a product is only sold online (B) To justify the high price of a product (C) To suggest that a company is having financial difficulties (D) To explain why a product is not well-known",
   "transcript": "Today, I'll be interviewing the owners of Salazar Olive Oil, one of the best in California for the past two decades. Now—if you're hearing about this olive oil for the first time, you're not alone. The Salazar family has kept the operation small. I'm interested in discussing their business philosophy as well as their new project: an olive oil tasting class on their farm. You'll find out how to register during the interview so you can sign up!",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n93. Tại sao người nói nói \"Gia đình Salazar đã giữ hoạt động nhỏ\"?\n(A) Để chỉ ra lý do sản phẩm chỉ bán trực tuyến\n(B) Để biện minh cho giá cao của sản phẩm\n(C) Để gợi ý rằng công ty đang gặp khó khăn tài chính\n(D) Để giải thích tại sao sản phẩm không nổi tiếng\n\nDịch bài nói:\nHôm nay, tôi sẽ phỏng vấn chủ sở hữu của Salazar Olive Oil, một trong những loại tốt nhất ở California trong hai thập kỷ qua. Bây giờ—nếu bạn đang nghe về dầu ô liu này lần đầu tiên, bạn không phải là người duy nhất. Gia đình Salazar đã giữ hoạt động nhỏ. Tôi quan tâm đến việc thảo luận về triết lý kinh doanh của họ cũng như dự án mới của họ: lớp nếm dầu ô liu trên trang trại của họ. Bạn sẽ tìm hiểu cách đăng ký trong cuộc phỏng vấn để bạn có thể đăng ký!"
  },
  {
   "number": 94,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "94. What will the listeners be able to do after the podcast? (A) Request some product samples (B) Subscribe to a newsletter (C) Enter a contest (D) Sign up for a class",
   "transcript": "Today, I'll be interviewing the owners of Salazar Olive Oil, one of the best in California for the past two decades. Now—if you're hearing about this olive oil for the first time, you're not alone. The Salazar family has kept the operation small. I'm interested in discussing their business philosophy as well as their new project: an olive oil tasting class on their farm. You'll find out how to register during the interview so you can sign up!",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n94. Người nghe sẽ có thể làm gì sau podcast?\n(A) Yêu cầu một số mẫu sản phẩm\n(B) Đăng ký nhận bản tin\n(C) Tham gia cuộc thi\n(D) Đăng ký lớp học\n\nDịch bài nói:\nHôm nay, tôi sẽ phỏng vấn chủ sở hữu của Salazar Olive Oil, một trong những loại tốt nhất ở California trong hai thập kỷ qua. Bây giờ—nếu bạn đang nghe về dầu ô liu này lần đầu tiên, bạn không phải là người duy nhất. Gia đình Salazar đã giữ hoạt động nhỏ. Tôi quan tâm đến việc thảo luận về triết lý kinh doanh của họ cũng như dự án mới của họ: lớp nếm dầu ô liu trên trang trại của họ. Bạn sẽ tìm hiểu cách đăng ký trong cuộc phỏng vấn để bạn có thể đăng ký!"
  },
  {
   "number": 95,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "95. According to the speaker, why was a transit route changed? (A) Some streets are being resurfaced. (B) Some roads are closed for a bicycle race. (C) A group of residents is hosting a fund-raising concert. (D) A local politician will be speaking in a park.",
   "transcript": "Welcome to the Abingdon Transit Station. Please be advised that the Circle Route bus is not currently stopping at the station entrance because of some street resurfacing work. A temporary bus stop has been set up around the corner in front of the post office. Signs are posted directing you to the new stop. Bus timetables will be affected by the change in the route. Use the Abingdon Transit mobile phone app to view live updates for when the next bus is due.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n95. Theo người nói, tại sao tuyến đường xe buýt bị thay đổi?\n(A) Một số đường phố đang được lát lại.\n(B) Một số đường bị đóng cửa cho cuộc đua xe đạp.\n(C) Một nhóm cư dân đang tổ chức buổi hòa nhạc gây quỹ.\n(D) Một chính trị gia địa phương sẽ phát biểu trong công viên.\n\nDịch bài nói:\nChào mừng đến Ga Abingdon Transit. Xin lưu ý rằng xe buýt Circle Route hiện không dừng tại lối vào ga vì một số công việc tái lát đường phố. Một điểm dừng xe buýt tạm thời đã được thiết lập quanh góc ở phía trước bưu điện. Các biển chỉ dẫn được đăng hướng dẫn bạn đến điểm dừng mới. Lịch trình xe buýt sẽ bị ảnh hưởng bởi sự thay đổi tuyến đường. Sử dụng ứng dụng điện thoại di động Abingdon Transit để xem cập nhật trực tiếp cho khi xe buýt tiếp theo đến hạn."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "B",
   "group": "95-97",
   "textEn": "96. Look at the graphic. Where will the listeners find a new bus stop? (A) On Plum Lane (B) On Peach Street (C) On Cherry Avenue (D) On Quincy Drive",
   "transcript": "Welcome to the Abingdon Transit Station. Please be advised that the Circle Route bus is not currently stopping at the station entrance because of some street resurfacing work. A temporary bus stop has been set up around the corner in front of the post office. Signs are posted directing you to the new stop. Bus timetables will be affected by the change in the route. Use the Abingdon Transit mobile phone app to view live updates for when the next bus is due.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n96. Nhìn vào hình ảnh. Người nghe sẽ tìm điểm dừng xe buýt mới ở đâu?\n(A) Trên Plum Lane\n(B) Trên Peach Street\n(C) Trên Cherry Avenue\n(D) Trên Quincy Drive\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nChào mừng đến Ga Abingdon Transit. Xin lưu ý rằng xe buýt Circle Route hiện không dừng tại lối vào ga vì một số công việc tái lát đường phố. Một điểm dừng xe buýt tạm thời đã được thiết lập quanh góc ở phía trước bưu điện. Các biển chỉ dẫn được đăng hướng dẫn bạn đến điểm dừng mới. Lịch trình xe buýt sẽ bị ảnh hưởng bởi sự thay đổi tuyến đường. Sử dụng ứng dụng điện thoại di động Abingdon Transit để xem cập nhật trực tiếp cho khi xe buýt tiếp theo đến hạn."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "97. Why should the listeners check a mobile phone application? (A) To apply for a job (B) To scan a promotional code (C) To view bus schedule updates (D) To purchase bus tickets",
   "transcript": "Welcome to the Abingdon Transit Station. Please be advised that the Circle Route bus is not currently stopping at the station entrance because of some street resurfacing work. A temporary bus stop has been set up around the corner in front of the post office. Signs are posted directing you to the new stop. Bus timetables will be affected by the change in the route. Use the Abingdon Transit mobile phone app to view live updates for when the next bus is due.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n97. Tại sao người nghe nên kiểm tra ứng dụng điện thoại di động?\n(A) Để nộp đơn xin việc\n(B) Để quét mã khuyến mãi\n(C) Để xem cập nhật lịch trình xe buýt\n(D) Để mua vé xe buýt\n\nDịch bài nói:\nChào mừng đến Ga Abingdon Transit. Xin lưu ý rằng xe buýt Circle Route hiện không dừng tại lối vào ga vì một số công việc tái lát đường phố. Một điểm dừng xe buýt tạm thời đã được thiết lập quanh góc ở phía trước bưu điện. Các biển chỉ dẫn được đăng hướng dẫn bạn đến điểm dừng mới. Lịch trình xe buýt sẽ bị ảnh hưởng bởi sự thay đổi tuyến đường. Sử dụng ứng dụng điện thoại di động Abingdon Transit để xem cập nhật trực tiếp cho khi xe buýt tiếp theo đến hạn."
  },
  {
   "number": 98,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "98. Where does the speaker work? (A) At a restaurant (B) At a public library (C) At a community center (D) At a hospital",
   "transcript": "Hello, everyone! We're happy to announce that the February continuing education workshops here at the community center were very successful. Thank you for working so hard to make sure they ran smoothly. Every workshop was completely full. In fact, we had to create a waiting list for the Monday night workshop. Beginning in March, we'll offer that same workshop on Fridays. Now, many participants complained about the lack of vending machines in the building. Bianca will be contacting vending services next week to ask about pricing.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n98. Người nói làm việc ở đâu?\n(A) Tại nhà hàng\n(B) Tại thư viện công cộng\n(C) Tại trung tâm cộng đồng\n(D) Tại bệnh viện\n\nDịch bài nói:\nXin chào mọi người! Chúng tôi vui mừng thông báo rằng các hội thảo giáo dục liên tục tháng Hai tại trung tâm cộng đồng đã rất thành công. Cảm ơn bạn vì đã làm việc chăm chỉ để đảm bảo chúng diễn ra suôn sẻ. Mọi hội thảo đều đầy đủ. Thực tế, chúng tôi phải tạo danh sách chờ cho hội thảo tối thứ Hai. Bắt đầu từ tháng Ba, chúng tôi sẽ cung cấp hội thảo tương tự vào thứ Sáu. Bây giờ, nhiều người tham gia phàn nàn về việc thiếu máy bán hàng tự động trong tòa nhà. Bianca sẽ liên hệ với dịch vụ máy bán hàng tự động tuần tới để hỏi về giá cả."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "99. Look at the graphic. Which workshop will be offered on Fridays starting in March? (A) Podcasting (B) Entrepreneurship for Beginners (C) Introduction to Coding (D) Accounting for Small Businesses",
   "transcript": "Hello, everyone! We're happy to announce that the February continuing education workshops here at the community center were very successful. Thank you for working so hard to make sure they ran smoothly. Every workshop was completely full. In fact, we had to create a waiting list for the Monday night workshop. Beginning in March, we'll offer that same workshop on Fridays. Now, many participants complained about the lack of vending machines in the building. Bianca will be contacting vending services next week to ask about pricing.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n99. Nhìn vào hình ảnh. Hội thảo nào sẽ được tổ chức vào thứ Sáu bắt đầu từ tháng Ba?\n(A) Podcasting\n(B) Entrepreneurship for Beginners\n(C) Introduction to Coding\n(D) Accounting for Small Businesses\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nXin chào mọi người! Chúng tôi vui mừng thông báo rằng các hội thảo giáo dục liên tục tháng Hai tại trung tâm cộng đồng đã rất thành công. Cảm ơn bạn vì đã làm việc chăm chỉ để đảm bảo chúng diễn ra suôn sẻ. Mọi hội thảo đều đầy đủ. Thực tế, chúng tôi phải tạo danh sách chờ cho hội thảo tối thứ Hai. Bắt đầu từ tháng Ba, chúng tôi sẽ cung cấp hội thảo tương tự vào thứ Sáu. Bây giờ, nhiều người tham gia phàn nàn về việc thiếu máy bán hàng tự động trong tòa nhà. Bianca sẽ liên hệ với dịch vụ máy bán hàng tự động tuần tới để hỏi về giá cả."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "100. What will Bianca do next week? (A) Request feedback from participants (B) Order office supplies (C) Update registration information (D) Contact some vendors",
   "transcript": "Hello, everyone! We're happy to announce that the February continuing education workshops here at the community center were very successful. Thank you for working so hard to make sure they ran smoothly. Every workshop was completely full. In fact, we had to create a waiting list for the Monday night workshop. Beginning in March, we'll offer that same workshop on Fridays. Now, many participants complained about the lack of vending machines in the building. Bianca will be contacting vending services next week to ask about pricing.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n100. Bianca sẽ làm gì vào tuần tới?\n(A) Yêu cầu phản hồi từ người tham gia\n(B) Đặt mua văn phòng phẩm\n(C) Cập nhật thông tin đăng ký\n(D) Liên hệ với một số nhà cung cấp\n\nDịch bài nói:\nXin chào mọi người! Chúng tôi vui mừng thông báo rằng các hội thảo giáo dục liên tục tháng Hai tại trung tâm cộng đồng đã rất thành công. Cảm ơn bạn vì đã làm việc chăm chỉ để đảm bảo chúng diễn ra suôn sẻ. Mọi hội thảo đều đầy đủ. Thực tế, chúng tôi phải tạo danh sách chờ cho hội thảo tối thứ Hai. Bắt đầu từ tháng Ba, chúng tôi sẽ cung cấp hội thảo tương tự vào thứ Sáu. Bây giờ, nhiều người tham gia phàn nàn về việc thiếu máy bán hàng tự động trong tòa nhà. Bianca sẽ liên hệ với dịch vụ máy bán hàng tự động tuần tới để hỏi về giá cả."
  }
 ],
 "3": [
  {
   "number": 1,
   "part": 1,
   "answer": "D",
   "textEn": "(A) He's fixing a file drawer. (B) He's rolling up his sleeves. (C) He's closing a laptop computer. (D) He's drinking from a mug.",
   "transcript": "(A) He's fixing a file drawer.\n(B) He's rolling up his sleeves.\n(C) He's closing a laptop computer.\n(D) He's drinking from a mug.",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Anh ấy đang sửa chữa một ngăn kéo hồ sơ.\n(B) Anh ấy đang xắn tay áo lên.\n(C) Anh ấy đang đóng máy tính xách tay.\n(D) Anh ấy đang uống từ một chiếc cốc."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "A",
   "textEn": "(A) Some bushes are covered with snow. (B) Some flowers are being planted. (C) A person is walking in the road. (D) A person is cleaning some windows.",
   "transcript": "(A) Some bushes are covered with snow.\n(B) Some flowers are being planted.\n(C) A person is walking in the road.\n(D) A person is cleaning some windows.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một số bụi cây được phủ tuyết.\n(B) Một số hoa đang được trồng.\n(C) Một người đang đi bộ trên đường.\n(D) Một người đang lau chùi một số cửa sổ."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "D",
   "textEn": "(A) A man is changing a tire on his car. (B) A man is opening a car door. (C) A man is putting fuel into his car. (D) A man is spreading out a map on top of his car.",
   "transcript": "(A) A man is changing a tire on his car.\n(B) A man is opening a car door.\n(C) A man is putting fuel into his car.\n(D) A man is spreading out a map on top of his car.",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Một người đàn ông đang thay lốp xe hơi của mình.\n(B) Một người đàn ông đang mở cửa xe hơi.\n(C) Một người đàn ông đang đổ nhiên liệu vào xe hơi của mình.\n(D) Một người đàn ông đang trải bản đồ lên trên nóc xe hơi của mình."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "B",
   "textEn": "(A) They're leaving a restaurant. (B) They're seated next to each other. (C) One of the women is looking in her handbag. (D) One of the women is folding a scarf.",
   "transcript": "(A) They're leaving a restaurant.\n(B) They're seated next to each other.\n(C) One of the women is looking in her handbag.\n(D) One of the women is folding a scarf.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Họ đang rời khỏi một nhà hàng.\n(B) Họ đang ngồi cạnh nhau.\n(C) Một trong những người phụ nữ đang nhìn vào túi xách của mình.\n(D) Một trong những người phụ nữ đang gấp khăn quàng cổ."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "C",
   "textEn": "(A) A selection of luggage is on display. (B) A lamp and some papers are on a desk. (C) Some boxes are arranged under some lamps. (D) Some wire has been rolled up on the floor.",
   "transcript": "(A) A selection of luggage is on display.\n(B) A lamp and some papers are on a desk.\n(C) Some boxes are arranged under some lamps.\n(D) Some wire has been rolled up on the floor.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Một loạt hành lý đang được trưng bày.\n(B) Một chiếc đèn và một số giấy tờ đang ở trên bàn.\n(C) Một số hộp được sắp xếp dưới một số đèn.\n(D) Một số dây đã được cuộn lại trên sàn."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "A",
   "textEn": "(A) A cyclist is riding past a pedestrian. (B) A tent is set up next to a lake. (C) Some people are resting on a stone wall. (D) Some people are swimming in a lake.",
   "transcript": "(A) A cyclist is riding past a pedestrian.\n(B) A tent is set up next to a lake.\n(C) Some people are resting on a stone wall.\n(D) Some people are swimming in a lake.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một người đi xe đạp đang chạy qua một người đi bộ.\n(B) Một chiếc lều được dựng lên bên cạnh hồ.\n(C) Một số người đang nghỉ ngơi trên bức tường đá.\n(D) Một số người đang bơi trong hồ."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "A",
   "textEn": "Where's the coffeemaker? (A) On the bottom shelf. (B) A large serving spoon. (C) It was discounted.",
   "transcript": "Where's the coffeemaker?\n(A) On the bottom shelf.\n(B) A large serving spoon.\n(C) It was discounted.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Máy pha cà phê ở đâu?\n(A) Ở kệ dưới cùng.\n(B) Một cái thìa phục vụ lớn.\n(C) Nó đã được giảm giá."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "B",
   "textEn": "Why are you calling the clients? (A) A spreadsheet with their contact information. (B) Because they canceled their order. (C) I can walk you there.",
   "transcript": "Why are you calling the clients?\n(A) A spreadsheet with their contact information.\n(B) Because they canceled their order.\n(C) I can walk you there.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Tại sao anh đang gọi cho khách hàng?\n(A) Một bảng tính chứa thông tin liên lạc của họ.\n(B) Bởi vì họ đã hủy đơn hàng.\n(C) Tôi có thể dẫn bạn đến đó."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "B",
   "textEn": "Would you like to attend our next company retreat? (A) I'm parked next to that tree. (B) Yes, I'd like that. (C) Just some grilled vegetables.",
   "transcript": "Would you like to attend our next company retreat?\n(A) I'm parked next to that tree.\n(B) Yes, I'd like that.\n(C) Just some grilled vegetables.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Bạn có muốn tham dự buổi dã ngoại công ty tiếp theo của chúng ta không?\n(A) Tôi đỗ xe bên cạnh cái cây đó.\n(B) Vâng, tôi thích điều đó.\n(C) Chỉ một ít rau nướng thôi."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "B",
   "textEn": "Who can update the Web site? (A) I like the new Web site, too. (B) Kento said he could do it. (C) That's the right password.",
   "transcript": "Who can update the Web site?\n(A) I like the new Web site, too.\n(B) Kento said he could do it.\n(C) That's the right password.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Ai có thể cập nhật trang web?\n(A) Tôi cũng thích trang web mới.\n(B) Kento nói anh ấy có thể làm điều đó.\n(C) Đó là mật khẩu đúng."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "A",
   "textEn": "Does your desk face the door or the window? (A) It faces the door. (B) About forty minutes. (C) Because the room is too small.",
   "transcript": "Does your desk face the door or the window?\n(A) It faces the door.\n(B) About forty minutes.\n(C) Because the room is too small.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Bàn làm việc của bạn hướng về phía cửa hay cửa sổ?\n(A) Nó hướng về phía cửa.\n(B) Khoảng bốn mươi phút.\n(C) Bởi vì phòng quá nhỏ."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "A",
   "textEn": "When will your performance take place? (A) Next Tuesday. (B) No, I just checked. (C) We shopped there yesterday.",
   "transcript": "When will your performance take place?\n(A) Next Tuesday.\n(B) No, I just checked.\n(C) We shopped there yesterday.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Buổi biểu diễn của bạn sẽ diễn ra khi nào?\n(A) Thứ Ba tuần tới.\n(B) Không, tôi vừa kiểm tra.\n(C) Chúng tôi đã mua sắm ở đó hôm qua."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "What will you get for completing the program? (A) How many hours a week? (B) OK, thanks for asking. (C) A certificate in accounting.",
   "transcript": "What will you get for completing the program?\n(A) How many hours a week?\n(B) OK, thanks for asking.\n(C) A certificate in accounting.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Bạn sẽ nhận được gì khi hoàn thành chương trình?\n(A) Bao nhiêu giờ một tuần?\n(B) Được rồi, cảm ơn vì đã hỏi.\n(C) Một chứng chỉ về kế toán."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "C",
   "textEn": "How did the company get its name? (A) There's a new guest list. (B) Oh, about three years ago. (C) It's named after the owner.",
   "transcript": "How did the company get its name?\n(A) There's a new guest list.\n(B) Oh, about three years ago.\n(C) It's named after the owner.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Công ty được đặt tên như vậy bằng cách nào?\n(A) Có một danh sách khách mời mới.\n(B) Ồ, khoảng ba năm trước.\n(C) Nó được đặt theo tên của chủ sở hữu."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "C",
   "textEn": "Your kitchen looks nice painted in this shade of yellow. (A) Twenty color copies, please. (B) Dinner will be ready in ten minutes. (C) Yes, it really brightens up the room.",
   "transcript": "Your kitchen looks nice painted in this shade of yellow.\n(A) Twenty color copies, please.\n(B) Dinner will be ready in ten minutes.\n(C) Yes, it really brightens up the room.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Nhà bếp của bạn trông đẹp khi được sơn màu vàng nhạt này.\n(A) Hai mươi bản sao màu, xin vui lòng.\n(B) Bữa tối sẽ sẵn sàng trong mười phút.\n(C) Vâng, nó thực sự làm sáng căn phòng lên."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "B",
   "textEn": "Are you considering hiring a public relations firm? (A) I wasn't at that press conference. (B) No, we decided not to. (C) It's in the closet.",
   "transcript": "Are you considering hiring a public relations firm?\n(A) I wasn't at that press conference.\n(B) No, we decided not to.\n(C) It's in the closet.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Bạn có đang cân nhắc việc thuê một công ty quan hệ công chúng không?\n(A) Tôi không tham dự hội nghị báo chí đó.\n(B) Không, chúng tôi quyết định không làm.\n(C) Nó ở trong tủ."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "C",
   "textEn": "Does this hallway lead to the lobby or to the courtyard? (A) My brother mentioned that. (B) How much does the box weigh? (C) To the lobby, I think.",
   "transcript": "Does this hallway lead to the lobby or to the courtyard?\n(A) My brother mentioned that.\n(B) How much does the box weigh?\n(C) To the lobby, I think.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Hành lang này dẫn đến sảnh hay đến sân trong?\n(A) Anh trai tôi đã đề cập đến điều đó.\n(B) Cái hộp nặng bao nhiêu?\n(C) Dẫn đến sảnh, tôi nghĩ vậy."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "B",
   "textEn": "The company's headquarters is in Houston, right? (A) This quarter's budget. (B) Let me look at the directory. (C) From nine to three.",
   "transcript": "The company's headquarters is in Houston, right?\n(A) This quarter's budget.\n(B) Let me look at the directory.\n(C) From nine to three.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Trụ sở công ty ở Houston, phải không?\n(A) Ngân sách quý này.\n(B) Để tôi xem danh bạ.\n(C) Từ chín giờ đến ba giờ."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "C",
   "textEn": "Aren't the windows in the warehouse supposed to be replaced? (A) Sure, I'll frame the picture. (B) No, I don't have any. (C) Mr. Bora ordered them.",
   "transcript": "Aren't the windows in the warehouse supposed to be replaced?\n(A) Sure, I'll frame the picture.\n(B) No, I don't have any.\n(C) Mr. Bora ordered them.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Cửa sổ trong kho không phải được thay thế sao?\n(A) Chắc chắn, tôi sẽ đóng khung bức ảnh.\n(B) Không, tôi không có cái nào.\n(C) Ông Bora đã đặt hàng chúng."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "Who's leading the workshop on Friday? (A) Nice seeing you, too! (B) The other team has a ten-point lead. (C) It'll be Olga.",
   "transcript": "Who's leading the workshop on Friday?\n(A) Nice seeing you, too!\n(B) The other team has a ten-point lead.\n(C) It'll be Olga.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Ai sẽ dẫn dắt buổi hội thảo vào thứ Sáu?\n(A) Rất vui được gặp bạn!\n(B) Đội kia đang dẫn trước mười điểm.\n(C) Sẽ là Olga."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "C",
   "textEn": "Should we join our department's book club? (A) An award-winning author. (B) The office supplies are in the storage room. (C) They could use a few more people.",
   "transcript": "Should we join our department's book club?\n(A) An award-winning author.\n(B) The office supplies are in the storage room.\n(C) They could use a few more people.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Chúng ta có nên tham gia câu lạc bộ sách của bộ phận chúng ta không?\n(A) Một tác giả đoạt giải.\n(B) Đồ dùng văn phòng ở trong phòng lưu trữ.\n(C) Họ có thể cần thêm vài người nữa."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "B",
   "textEn": "Shouldn't this package be returned? (A) Several packets of stamps from the post office. (B) Yes, it has to go back to the manufacturer. (C) Didn't she return from her trip last week?",
   "transcript": "Shouldn't this package be returned?\n(A) Several packets of stamps from the post office.\n(B) Yes, it has to go back to the manufacturer.\n(C) Didn't she return from her trip last week?",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Gói hàng này không nên được trả lại sao?\n(A) Một số gói tem từ bưu điện.\n(B) Vâng, nó phải được gửi trả lại cho nhà sản xuất.\n(C) Cô ấy không trở về từ chuyến đi của mình tuần trước sao?"
  },
  {
   "number": 23,
   "part": 2,
   "answer": "C",
   "textEn": "When will the training sessions for the new security measures take place? (A) Yes, it was a complete success. (B) The upstairs conference room is large enough. (C) Not until the start of next month.",
   "transcript": "When will the training sessions for the new security measures take place?\n(A) Yes, it was a complete success.\n(B) The upstairs conference room is large enough.\n(C) Not until the start of next month.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Các buổi đào tạo cho các biện pháp an ninh mới sẽ diễn ra khi nào?\n(A) Vâng, đó là một thành công hoàn toàn.\n(B) Phòng hội nghị tầng trên đủ lớn.\n(C) Không cho đến đầu tháng sau."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "A",
   "textEn": "Do you want the draft of the proposal e-mailed to you or printed out? (A) Erina will be the one reviewing it. (B) They're too expensive. (C) I can arrange a client dinner.",
   "transcript": "Do you want the draft of the proposal e-mailed to you or printed out?\n(A) Erina will be the one reviewing it.\n(B) They're too expensive.\n(C) I can arrange a client dinner.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Bạn muốn bản nháp đề xuất được gửi email cho bạn hay in ra?\n(A) Erina sẽ là người xem xét nó.\n(B) Chúng quá đắt.\n(C) Tôi có thể sắp xếp một bữa tối với khách hàng."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "Which day is most convenient for you? (A) Yes, I'd appreciate it. (B) Well, the conference begins on Thursday. (C) Yes, it's under the passenger seat.",
   "transcript": "Which day is most convenient for you?\n(A) Yes, I'd appreciate it.\n(B) Well, the conference begins on Thursday.\n(C) Yes, it's under the passenger seat.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Ngày nào là tiện nhất cho bạn?\n(A) Vâng, tôi đánh giá cao điều đó.\n(B) Ừm, hội nghị bắt đầu vào thứ Năm.\n(C) Vâng, nó ở dưới ghế hành khách."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "B",
   "textEn": "Our department's looking for more interns. (A) My phone has an extended warranty. (B) What are the qualifications? (C) Yes, you completed your project.",
   "transcript": "Our department's looking for more interns.\n(A) My phone has an extended warranty.\n(B) What are the qualifications?\n(C) Yes, you completed your project.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Bộ phận của chúng ta đang tìm kiếm thêm thực tập sinh.\n(A) Điện thoại của tôi có bảo hành mở rộng.\n(B) Yêu cầu trình độ là gì?\n(C) Vâng, bạn đã hoàn thành dự án của mình."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "A",
   "textEn": "How was your lunch at the park? (A) I had an unexpected client meeting. (B) Three sugars, please. (C) It's on the top shelf.",
   "transcript": "How was your lunch at the park?\n(A) I had an unexpected client meeting.\n(B) Three sugars, please.\n(C) It's on the top shelf.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Bữa trưa của bạn ở công viên thế nào?\n(A) Tôi có một cuộc họp khách hàng bất ngờ.\n(B) Ba muỗng đường, xin vui lòng.\n(C) Nó ở trên kệ trên cùng."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "Does your company send out the same promotional material every month? (A) We're going to try something new. (B) The bank across the street. (C) Niko just got promoted.",
   "transcript": "Does your company send out the same promotional material every month?\n(A) We're going to try something new.\n(B) The bank across the street.\n(C) Niko just got promoted.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Công ty của bạn có gửi cùng một tài liệu quảng cáo mỗi tháng không?\n(A) Chúng tôi sẽ thử cái gì đó mới.\n(B) Ngân hàng đối diện đường.\n(C) Niko vừa được thăng chức."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "Where can I look at floor plans for our new office building? (A) Yes, I'd like some coffee. (B) A few more résumés. (C) I can ask the architect.",
   "transcript": "Where can I look at floor plans for our new office building?\n(A) Yes, I'd like some coffee.\n(B) A few more résumés.\n(C) I can ask the architect.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Tôi có thể xem sơ đồ mặt bằng cho tòa nhà văn phòng mới của chúng ta ở đâu?\n(A) Vâng, tôi muốn một ít cà phê.\n(B) Vài sơ yếu lý lịch nữa.\n(C) Tôi có thể hỏi kiến trúc sư."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "C",
   "textEn": "Can I use the company car to pick up the clients from the airport? (A) Shenchao is the best project manager I know. (B) No, thanks—I've already been there. (C) The keys are on the desk over there.",
   "transcript": "Can I use the company car to pick up the clients from the airport?\n(A) Shenchao is the best project manager I know.\n(B) No, thanks—I've already been there.\n(C) The keys are on the desk over there.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Tôi có thể sử dụng xe công ty để đón khách hàng từ sân bay không?\n(A) Shenchao là quản lý dự án tốt nhất mà tôi biết.\n(B) Không, cảm ơn—Tôi đã đến đó rồi.\n(C) Chìa khóa ở trên bàn kia."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "C",
   "textEn": "How often should our heating system be inspected? (A) Approximately $400. (B) Because I have a meeting at that time. (C) The recommendation is in the manual.",
   "transcript": "How often should our heating system be inspected?\n(A) Approximately $400.\n(B) Because I have a meeting at that time.\n(C) The recommendation is in the manual.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Hệ thống sưởi ấm của chúng ta nên được kiểm tra bao lâu một lần?\n(A) Khoảng 400 đô la.\n(B) Bởi vì tôi có cuộc họp vào lúc đó.\n(C) Khuyến nghị ở trong sách hướng dẫn."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "32. Where do the speakers most likely work? (A) At a shipping company (B) At a restaurant (C) At a gift shop (D) At a farm",
   "transcript": "M: Hi, Chef Ayaka. I was looking over this week's sales, and I noticed that a lot of people ordered the beef stew special.\nW: Yeah. It's been very popular with patrons. In fact, I want to add it to the regular menu.\nM: Good idea. Beef prices change frequently, though, so we might need to consider that when we set the price for the dish if we're going to offer it daily.\nW: OK. I'll call our supplier too. We need to make sure they can get us enough beef each week.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n32. Những người nói chuyện có khả năng làm việc ở đâu nhất?\n(A) Tại một công ty vận chuyển\n(B) Tại một nhà hàng\n(C) Tại một cửa hàng quà tặng\n(D) Tại một trang trại\n\nDịch hội thoại:\nNam: Chào, đầu bếp Ayaka. Tôi vừa xem qua doanh số tuần này và nhận thấy nhiều người đặt món bò hầm đặc biệt.\nNữ: Đúng vậy. Món này rất được khách hàng ưa chuộng. Thực ra tôi muốn thêm nó vào menu chính thức.\nNam: Ý hay đấy. Tuy nhiên giá thịt bò thay đổi thường xuyên, nên nếu chúng ta định bán hàng ngày thì khi định giá món ăn cần cân nhắc điều đó.\nNữ: Được rồi. Tôi cũng sẽ gọi cho nhà cung cấp. Chúng ta cần đảm bảo họ có thể cung cấp đủ thịt bò mỗi tuần."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "33. What does the man suggest considering? (A) An advertising strategy (B) An online menu (C) The price of an item (D) The results of a survey",
   "transcript": "M: Hi, Chef Ayaka. I was looking over this week's sales, and I noticed that a lot of people ordered the beef stew special.\nW: Yeah. It's been very popular with patrons. In fact, I want to add it to the regular menu.\nM: Good idea. Beef prices change frequently, though, so we might need to consider that when we set the price for the dish if we're going to offer it daily.\nW: OK. I'll call our supplier too. We need to make sure they can get us enough beef each week.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n33. Người đàn ông đề xuất xem xét điều gì?\n(A) Một chiến lược quảng cáo\n(B) Một thực đơn trực tuyến\n(C) Giá của một mặt hàng\n(D) Kết quả của một khảo sát\n\nDịch hội thoại:\nNam: Chào, đầu bếp Ayaka. Tôi vừa xem qua doanh số tuần này và nhận thấy nhiều người đặt món bò hầm đặc biệt.\nNữ: Đúng vậy. Món này rất được khách hàng ưa chuộng. Thực ra tôi muốn thêm nó vào menu chính thức.\nNam: Ý hay đấy. Tuy nhiên giá thịt bò thay đổi thường xuyên, nên nếu chúng ta định bán hàng ngày thì khi định giá món ăn cần cân nhắc điều đó.\nNữ: Được rồi. Tôi cũng sẽ gọi cho nhà cung cấp. Chúng ta cần đảm bảo họ có thể cung cấp đủ thịt bò mỗi tuần."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "34. What does the woman say she will do? (A) Pay a deposit (B) Contact a supplier (C) Reschedule a delivery (D) Arrange some merchandise",
   "transcript": "M: Hi, Chef Ayaka. I was looking over this week's sales, and I noticed that a lot of people ordered the beef stew special.\nW: Yeah. It's been very popular with patrons. In fact, I want to add it to the regular menu.\nM: Good idea. Beef prices change frequently, though, so we might need to consider that when we set the price for the dish if we're going to offer it daily.\nW: OK. I'll call our supplier too. We need to make sure they can get us enough beef each week.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n34. Người phụ nữ nói rằng cô ấy sẽ làm gì?\n(A) Trả tiền đặt cọc\n(B) Liên hệ với nhà cung cấp\n(C) Sắp xếp lại lịch giao hàng\n(D) Sắp xếp một số hàng hóa\n\nDịch hội thoại:\nNam: Chào, đầu bếp Ayaka. Tôi vừa xem qua doanh số tuần này và nhận thấy nhiều người đặt món bò hầm đặc biệt.\nNữ: Đúng vậy. Món này rất được khách hàng ưa chuộng. Thực ra tôi muốn thêm nó vào menu chính thức.\nNam: Ý hay đấy. Tuy nhiên giá thịt bò thay đổi thường xuyên, nên nếu chúng ta định bán hàng ngày thì khi định giá món ăn cần cân nhắc điều đó.\nNữ: Được rồi. Tôi cũng sẽ gọi cho nhà cung cấp. Chúng ta cần đảm bảo họ có thể cung cấp đủ thịt bò mỗi tuần."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "35. Where is the conversation most likely taking place? (A) At a fitness center (B) At a hotel (C) At a train station (D) At a corporate office",
   "transcript": "M1: Excuse me, does train 1401 stop at the Lexington Street station?\nW: Yes. It's a twenty-minute ride. M2 Oh good, that gives us plenty of time to get to the party.\nW: The train leaves from platform twelve in three minutes.\nM2: Let's head over there now, Sergey. I'm really looking forward to our company gala event tonight.\nM1: Me too. Hey, did you happen to bring an umbrella? I forgot mine. It might rain on our walk from the station.\nM2: I did! We can share it.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n35. Cuộc trò chuyện có khả năng diễn ra ở đâu nhất?\n(A) Tại một trung tâm thể hình\n(B) Tại một khách sạn\n(C) Tại một ga tàu\n(D) Tại một văn phòng công ty\n\nDịch hội thoại:\nNam1: Xin lỗi, tàu 1401 có dừng ở ga Lexington Street không?\nNữ: Có. Chuyến đó khoảng 20 phút.\nNam2: Ồ tốt quá, vậy thì chúng ta có đủ thời gian đến bữa tiệc.\nNữ: Tàu sẽ khởi hành từ sân ga số 12 sau 3 phút nữa.\nNam2: Đi sang đó ngay đi Sergey. Tối nay tôi thực sự mong chờ sự kiện gala của công ty.\nNam1: Tôi cũng vậy. Này, cậu có mang theo ô không? Tôi quên mang rồi. Trên đường đi bộ từ ga có thể trời mưa.\nNam2: Tôi mang rồi! Chúng ta dùng chung nhé."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "36. What type of event will the men attend this evening? (A) A company gala (B) An opera (C) A sports match (D) A lecture",
   "transcript": "M1: Excuse me, does train 1401 stop at the Lexington Street station?\nW: Yes. It's a twenty-minute ride. M2 Oh good, that gives us plenty of time to get to the party.\nW: The train leaves from platform twelve in three minutes.\nM2: Let's head over there now, Sergey. I'm really looking forward to our company gala event tonight.\nM1: Me too. Hey, did you happen to bring an umbrella? I forgot mine. It might rain on our walk from the station.\nM2: I did! We can share it.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n36. Tối nay, những người đàn ông sẽ tham dự loại sự kiện nào?\n(A) Một buổi gala của công ty\n(B) Một buổi opera\n(C) Một trận đấu thể thao\n(D) Một buổi thuyết trình\n\nDịch hội thoại:\nNam1: Xin lỗi, tàu 1401 có dừng ở ga Lexington Street không?\nNữ: Có. Chuyến đó khoảng 20 phút.\nNam2: Ồ tốt quá, vậy thì chúng ta có đủ thời gian đến bữa tiệc.\nNữ: Tàu sẽ khởi hành từ sân ga số 12 sau 3 phút nữa.\nNam2: Đi sang đó ngay đi Sergey. Tối nay tôi thực sự mong chờ sự kiện gala của công ty.\nNam1: Tôi cũng vậy. Này, cậu có mang theo ô không? Tôi quên mang rồi. Trên đường đi bộ từ ga có thể trời mưa.\nNam2: Tôi mang rồi! Chúng ta dùng chung nhé."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "37. What did Sergey forget to bring? (A) Gloves (B) Sunglasses (C) A hat (D) An umbrella",
   "transcript": "M1: Excuse me, does train 1401 stop at the Lexington Street station?\nW: Yes. It's a twenty-minute ride. M2 Oh good, that gives us plenty of time to get to the party.\nW: The train leaves from platform twelve in three minutes.\nM2: Let's head over there now, Sergey. I'm really looking forward to our company gala event tonight.\nM1: Me too. Hey, did you happen to bring an umbrella? I forgot mine. It might rain on our walk from the station.\nM2: I did! We can share it.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n37. Sergey đã quên mang theo gì?\n(A) Găng tay\n(B) Kính râm\n(C) Mũ\n(D) Ô (dù)\n\nDịch hội thoại:\nNam1: Xin lỗi, tàu 1401 có dừng ở ga Lexington Street không?\nNữ: Có. Chuyến đó khoảng 20 phút.\nNam2: Ồ tốt quá, vậy thì chúng ta có đủ thời gian đến bữa tiệc.\nNữ: Tàu sẽ khởi hành từ sân ga số 12 sau 3 phút nữa.\nNam2: Đi sang đó ngay đi Sergey. Tối nay tôi thực sự mong chờ sự kiện gala của công ty.\nNam1: Tôi cũng vậy. Này, cậu có mang theo ô không? Tôi quên mang rồi. Trên đường đi bộ từ ga có thể trời mưa.\nNam2: Tôi mang rồi! Chúng ta dùng chung nhé."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "38. What has Mr. Hoffman decided to do? (A) Extend store hours (B) Start a delivery service (C) Offer a rewards program (D) Stop selling certain products",
   "transcript": "W: I talked to Mr. Hoffman this morning, and he said he's decided to start a delivery service for our customers who have a difficult time picking up their prescriptions.\nM: That's a good idea. I know a lot of people find it inconvenient to come in person to get their medications. But many of our customers buy other things while they're here.\nW: Oh, they'll be able to make other purchases too, to be delivered with their medicine. In fact, I'm supposed to draft a job posting for delivery drivers. Could you help me do that?",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n38. Ông Hoffman đã quyết định làm gì?\n(A) Mở rộng giờ hoạt động của cửa hàng\n(B) Bắt đầu dịch vụ giao hàng\n(C) Cung cấp chương trình khách hàng thân thiết\n(D) Ngừng bán một số sản phẩm\n\nDịch hội thoại:\nNữ: Sáng nay tôi đã nói chuyện với ông Hoffman, và ông ấy nói đã quyết định bắt đầu dịch vụ giao hàng cho những khách hàng gặp khó khăn khi tự đến lấy đơn thuốc.\nNam: Ý hay đấy. Tôi biết nhiều người thấy bất tiện khi phải đến trực tiếp để lấy thuốc. Nhưng nhiều khách hàng của chúng ta cũng mua thêm đồ khác khi đến đây.\nNữ: Ồ, họ vẫn có thể mua thêm các sản phẩm khác và được giao cùng thuốc. Thực ra tôi phải soạn một bài đăng tuyển dụng tài xế giao hàng. Anh có thể giúp tôi không?"
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What business do the speakers most likely work for? (A) A bakery (B) A flower shop (C) A grocery store (D) A pharmacy",
   "transcript": "W: I talked to Mr. Hoffman this morning, and he said he's decided to start a delivery service for our customers who have a difficult time picking up their prescriptions.\nM: That's a good idea. I know a lot of people find it inconvenient to come in person to get their medications. But many of our customers buy other things while they're here.\nW: Oh, they'll be able to make other purchases too, to be delivered with their medicine. In fact, I'm supposed to draft a job posting for delivery drivers. Could you help me do that?",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n39. Những người nói chuyện có khả năng làm việc cho doanh nghiệp nào?\n(A) Một tiệm bánh\n(B) Một cửa hàng hoa\n(C) Một cửa hàng tạp hóa\n(D) Một hiệu thuốc\n\nDịch hội thoại:\nNữ: Sáng nay tôi đã nói chuyện với ông Hoffman, và ông ấy nói đã quyết định bắt đầu dịch vụ giao hàng cho những khách hàng gặp khó khăn khi tự đến lấy đơn thuốc.\nNam: Ý hay đấy. Tôi biết nhiều người thấy bất tiện khi phải đến trực tiếp để lấy thuốc. Nhưng nhiều khách hàng của chúng ta cũng mua thêm đồ khác khi đến đây.\nNữ: Ồ, họ vẫn có thể mua thêm các sản phẩm khác và được giao cùng thuốc. Thực ra tôi phải soạn một bài đăng tuyển dụng tài xế giao hàng. Anh có thể giúp tôi không?"
  },
  {
   "number": 40,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "40. What does the woman ask the man to help her do? (A) Mail some packages (B) Take inventory (C) Create a job posting (D) Help some customers",
   "transcript": "W: I talked to Mr. Hoffman this morning, and he said he's decided to start a delivery service for our customers who have a difficult time picking up their prescriptions.\nM: That's a good idea. I know a lot of people find it inconvenient to come in person to get their medications. But many of our customers buy other things while they're here.\nW: Oh, they'll be able to make other purchases too, to be delivered with their medicine. In fact, I'm supposed to draft a job posting for delivery drivers. Could you help me do that?",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n40. Người phụ nữ nhờ người đàn ông giúp điều gì?\n(A) Gửi một số bưu kiện\n(B) Kiểm kê hàng hóa\n(C) Tạo một bài đăng tuyển dụng\n(D) Hỗ trợ một số khách hàng\n\nDịch hội thoại:\nNữ: Sáng nay tôi đã nói chuyện với ông Hoffman, và ông ấy nói đã quyết định bắt đầu dịch vụ giao hàng cho những khách hàng gặp khó khăn khi tự đến lấy đơn thuốc.\nNam: Ý hay đấy. Tôi biết nhiều người thấy bất tiện khi phải đến trực tiếp để lấy thuốc. Nhưng nhiều khách hàng của chúng ta cũng mua thêm đồ khác khi đến đây.\nNữ: Ồ, họ vẫn có thể mua thêm các sản phẩm khác và được giao cùng thuốc. Thực ra tôi phải soạn một bài đăng tuyển dụng tài xế giao hàng. Anh có thể giúp tôi không?"
  },
  {
   "number": 41,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "41. What problem does the woman mention? (A) A product is faulty. (B) A company's sales are decreasing. (C) Some materials are damaged. (D) A sales department is understaffed.",
   "transcript": "W: Marcel, I don't know if you reviewed the latest report. Unfortunately, our sales are continuing to drop.\nM: Yes, competition is at an all-time high. More and more companies are selling clothing and gear for outdoor recreation.\nW: We need better ways to make our brand stand out.\nM: Well, we could probably benefit from having more direct input from athletes who use our gear. I was thinking maybe we could hire a professional rock climber to consult with our designers.\nW: That's an interesting idea. Is there anyone you have in mind?\nM: I'll e-mail you a list this afternoon.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n41. Người phụ nữ đề cập đến vấn đề gì?\n(A) Một sản phẩm bị lỗi\n(B) Doanh số công ty đang giảm\n(C) Một số nguyên liệu bị hỏng\n(D) Bộ phận kinh doanh thiếu nhân sự\n\nDịch hội thoại:\nNữ: Marcel, tôi không biết anh đã xem báo cáo mới nhất chưa. Thật không may, doanh số của chúng ta tiếp tục giảm.\nNam: Đúng vậy, cạnh tranh đang ở mức cao kỷ lục. Ngày càng nhiều công ty bán quần áo và đồ dùng cho hoạt động ngoài trời.\nNữ: Chúng ta cần những cách tốt hơn để làm nổi bật thương hiệu.\nNam: Ừm, có lẽ chúng ta sẽ được lợi nếu có thêm ý kiến trực tiếp từ các vận động viên sử dụng đồ của chúng ta. Tôi đang nghĩ có thể thuê một vận động viên leo núi chuyên nghiệp để tư vấn cho đội thiết kế.\nNữ: Ý tưởng thú vị đấy. Anh có nghĩ đến ai cụ thể không?\nNam: Chiều nay tôi sẽ gửi email cho em danh sách."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "42. Where do the speakers most likely work? (A) At a publishing firm (B) At a sporting goods company (C) At a travel agency (D) At a state park",
   "transcript": "W: Marcel, I don't know if you reviewed the latest report. Unfortunately, our sales are continuing to drop.\nM: Yes, competition is at an all-time high. More and more companies are selling clothing and gear for outdoor recreation.\nW: We need better ways to make our brand stand out.\nM: Well, we could probably benefit from having more direct input from athletes who use our gear. I was thinking maybe we could hire a professional rock climber to consult with our designers.\nW: That's an interesting idea. Is there anyone you have in mind?\nM: I'll e-mail you a list this afternoon.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n42. Những người nói chuyện có khả năng làm việc ở đâu nhất?\n(A) Tại một công ty xuất bản\n(B) Tại một công ty đồ thể thao\n(C) Tại một đại lý du lịch\n(D) Tại một công viên tiểu bang\n\nDịch hội thoại:\nNữ: Marcel, tôi không biết anh đã xem báo cáo mới nhất chưa. Thật không may, doanh số của chúng ta tiếp tục giảm.\nNam: Đúng vậy, cạnh tranh đang ở mức cao kỷ lục. Ngày càng nhiều công ty bán quần áo và đồ dùng cho hoạt động ngoài trời.\nNữ: Chúng ta cần những cách tốt hơn để làm nổi bật thương hiệu.\nNam: Ừm, có lẽ chúng ta sẽ được lợi nếu có thêm ý kiến trực tiếp từ các vận động viên sử dụng đồ của chúng ta. Tôi đang nghĩ có thể thuê một vận động viên leo núi chuyên nghiệp để tư vấn cho đội thiết kế.\nNữ: Ý tưởng thú vị đấy. Anh có nghĩ đến ai cụ thể không?\nNam: Chiều nay tôi sẽ gửi email cho em danh sách."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "43. What does the man say he will do this afternoon? (A) Sign a document (B) Ship an order (C) Review customer feedback (D) Send a list",
   "transcript": "W: Marcel, I don't know if you reviewed the latest report. Unfortunately, our sales are continuing to drop.\nM: Yes, competition is at an all-time high. More and more companies are selling clothing and gear for outdoor recreation.\nW: We need better ways to make our brand stand out.\nM: Well, we could probably benefit from having more direct input from athletes who use our gear. I was thinking maybe we could hire a professional rock climber to consult with our designers.\nW: That's an interesting idea. Is there anyone you have in mind?\nM: I'll e-mail you a list this afternoon.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n43. Người đàn ông nói rằng chiều nay anh ấy sẽ làm gì?\n(A) Ký một tài liệu\n(B) Gửi một đơn hàng\n(C) Xem xét phản hồi của khách hàng\n(D) Gửi một danh sách\n\nDịch hội thoại:\nNữ: Marcel, tôi không biết anh đã xem báo cáo mới nhất chưa. Thật không may, doanh số của chúng ta tiếp tục giảm.\nNam: Đúng vậy, cạnh tranh đang ở mức cao kỷ lục. Ngày càng nhiều công ty bán quần áo và đồ dùng cho hoạt động ngoài trời.\nNữ: Chúng ta cần những cách tốt hơn để làm nổi bật thương hiệu.\nNam: Ừm, có lẽ chúng ta sẽ được lợi nếu có thêm ý kiến trực tiếp từ các vận động viên sử dụng đồ của chúng ta. Tôi đang nghĩ có thể thuê một vận động viên leo núi chuyên nghiệp để tư vấn cho đội thiết kế.\nNữ: Ý tưởng thú vị đấy. Anh có nghĩ đến ai cụ thể không?\nNam: Chiều nay tôi sẽ gửi email cho em danh sách."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "44. Why is the woman calling? (A) To verify some facts (B) To confirm a deadline (C) To inquire about an article (D) To apply for a position",
   "transcript": "W: Hello. I was featured in an article in your newspaper about five years ago. And now when I click on the link, nothing happens.\nM: Oh, the public links expire after three years, but I can search for your article in our database. I just need keywords from the article to use in the search.\nW: It was about my internship at a dental office.\nM: OK. Let me check our archives.\nW: Thanks. I was still in college when the article came out, but now I'm starting my own practice. And I'd like to hang the article on the wall.\nM: Oh! Congratulations.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n44. Tại sao người phụ nữ gọi điện?\n(A) Để xác minh thông tin\n(B) Để xác nhận thời hạn\n(C) Để hỏi về một bài báo\n(D) Để ứng tuyển vị trí\n\nDịch hội thoại:\nNữ: Xin chào. Khoảng 5 năm trước tôi đã được đăng bài trên báo của quý báo. Giờ khi tôi click vào link thì không hiện gì cả.\nNam: Ồ, các link công khai hết hạn sau 3 năm, nhưng tôi có thể tìm bài báo của cô trong cơ sở dữ liệu. Tôi chỉ cần vài từ khóa từ bài báo để tìm kiếm.\nNữ: Đó là về kỳ thực tập của tôi tại một phòng khám nha khoa.\nNam: Được rồi. Để tôi kiểm tra kho lưu trữ.\nNữ: Cảm ơn. Lúc bài báo đăng tôi còn đang học đại học, nhưng giờ tôi đang mở phòng khám riêng. Tôi muốn treo bài báo lên tường. Nam: Ồ! Chúc mừng nhé."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "45. What does the man offer to do? (A) Search a database (B) Renew a subscription (C) Consult with colleagues (D) Send an updated schedule",
   "transcript": "W: Hello. I was featured in an article in your newspaper about five years ago. And now when I click on the link, nothing happens.\nM: Oh, the public links expire after three years, but I can search for your article in our database. I just need keywords from the article to use in the search.\nW: It was about my internship at a dental office.\nM: OK. Let me check our archives.\nW: Thanks. I was still in college when the article came out, but now I'm starting my own practice. And I'd like to hang the article on the wall.\nM: Oh! Congratulations.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n45. Người đàn ông đề nghị làm gì?\n(A) Tìm trong cơ sở dữ liệu\n(B) Gia hạn đăng ký\n(C) Tham khảo ý kiến đồng nghiệp\n(D) Gửi lịch trình cập nhật\n\nDịch hội thoại:\nNữ: Xin chào. Khoảng 5 năm trước tôi đã được đăng bài trên báo của quý báo. Giờ khi tôi click vào link thì không hiện gì cả.\nNam: Ồ, các link công khai hết hạn sau 3 năm, nhưng tôi có thể tìm bài báo của cô trong cơ sở dữ liệu. Tôi chỉ cần vài từ khóa từ bài báo để tìm kiếm.\nNữ: Đó là về kỳ thực tập của tôi tại một phòng khám nha khoa.\nNam: Được rồi. Để tôi kiểm tra kho lưu trữ.\nNữ: Cảm ơn. Lúc bài báo đăng tôi còn đang học đại học, nhưng giờ tôi đang mở phòng khám riêng. Tôi muốn treo bài báo lên tường. Nam: Ồ! Chúc mừng nhé."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "46. Why does the man congratulate the woman? (A) She appeared on television (B) She was nominated for an award (C) She is publishing a book (D) She is starting her own business",
   "transcript": "W: Hello. I was featured in an article in your newspaper about five years ago. And now when I click on the link, nothing happens.\nM: Oh, the public links expire after three years, but I can search for your article in our database. I just need keywords from the article to use in the search.\nW: It was about my internship at a dental office.\nM: OK. Let me check our archives.\nW: Thanks. I was still in college when the article came out, but now I'm starting my own practice. And I'd like to hang the article on the wall.\nM: Oh! Congratulations.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n46. Tại sao người đàn ông chúc mừng người phụ nữ?\n(A) Cô ấy xuất hiện trên TV\n(B) Cô ấy được đề cử giải thưởng\n(C) Cô ấy sắp xuất bản sách\n(D) Cô ấy bắt đầu kinh doanh riêng\n\nDịch hội thoại:\nNữ: Xin chào. Khoảng 5 năm trước tôi đã được đăng bài trên báo của quý báo. Giờ khi tôi click vào link thì không hiện gì cả.\nNam: Ồ, các link công khai hết hạn sau 3 năm, nhưng tôi có thể tìm bài báo của cô trong cơ sở dữ liệu. Tôi chỉ cần vài từ khóa từ bài báo để tìm kiếm.\nNữ: Đó là về kỳ thực tập của tôi tại một phòng khám nha khoa.\nNam: Được rồi. Để tôi kiểm tra kho lưu trữ.\nNữ: Cảm ơn. Lúc bài báo đăng tôi còn đang học đại học, nhưng giờ tôi đang mở phòng khám riêng. Tôi muốn treo bài báo lên tường. Nam: Ồ! Chúc mừng nhé."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "47. Where does the conversation most likely take place? (A) At a furniture store (B) At an electronics store (C) At a sporting goods store (D) At a building supply store",
   "transcript": "",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n47. Cuộc trò chuyện có khả năng diễn ra ở đâu?\n(A) Cửa hàng nội thất\n(B) Cửa hàng điện tử\n(C) Cửa hàng đồ thể thao\n(D) Cửa hàng vật liệu xây dựng\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 47-49 (không khớp với câu hỏi), nên chưa có transcript/dịch hội thoại cho nhóm này."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "48. Why does the man want a refund? (A) He found a less expensive option (B) He bought the wrong size (C) He does not like the color of an item (D) He noticed an item is damaged",
   "transcript": "",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n48. Tại sao người đàn ông muốn hoàn tiền?\n(A) Anh ấy tìm được lựa chọn rẻ hơn\n(B) Anh ấy mua sai kích cỡ\n(C) Anh ấy không thích màu\n(D) Anh ấy phát hiện sản phẩm bị hỏng\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 47-49 (không khớp với câu hỏi), nên chưa có transcript/dịch hội thoại cho nhóm này."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "49. What does the woman imply when she says, “Let me find the manager”? (A) She needs to attend to other customers (B) She does not have the authority to complete a request (C) A transaction was not processed correctly (D) A quality complaint needs to be documented",
   "transcript": "",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n49. Người phụ nữ ngụ ý điều gì khi nói “Để tôi tìm quản lý”?\n(A) Cô ấy cần hỗ trợ khách hàng khác\n(B) Cô ấy không có quyền xử lý yêu cầu\n(C) Giao dịch bị xử lý sai\n(D) Cần ghi nhận khiếu nại chất lượng\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 47-49 (không khớp với câu hỏi), nên chưa có transcript/dịch hội thoại cho nhóm này."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "50. What most likely is the man’s job? (A) Plumber (B) Auto mechanic (C) Food delivery person (D) Computer technician",
   "transcript": "",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n50. Nghề nghiệp có khả năng nhất của người đàn ông là gì?\n(A) Thợ sửa ống nước\n(B) Thợ sửa ô tô\n(C) Nhân viên giao đồ ăn\n(D) Kỹ thuật viên máy tính\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 50-52 (không khớp với câu hỏi), nên chưa có transcript/dịch hội thoại cho nhóm này."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "51. What did the woman do while the man was gone? (A) She created an advertisement (B) She finalized a contract (C) She addressed a customer complaint (D) She had new software installed",
   "transcript": "",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n51. Người phụ nữ đã làm gì khi người đàn ông đi vắng?\n(A) Tạo quảng cáo\n(B) Hoàn tất hợp đồng\n(C) Xử lý khiếu nại khách hàng\n(D) Cài đặt phần mềm mới\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 50-52 (không khớp với câu hỏi), nên chưa có transcript/dịch hội thoại cho nhóm này."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "52. What does the woman say has recently changed? (A) Costs have been reduced (B) A competitor has opened a location nearby (C) The number of customers has increased (D) Safety regulations have been introduced",
   "transcript": "",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n52. Điều gì gần đây đã thay đổi theo lời người phụ nữ?\n(A) Chi phí đã giảm\n(B) Đối thủ đã mở chi nhánh gần đây\n(C) Số lượng khách hàng tăng\n(D) Có quy định an toàn mới\n\nLưu ý: tài liệu gốc ghi nhầm transcript của nhóm câu 50-52 (không khớp với câu hỏi), nên chưa có transcript/dịch hội thoại cho nhóm này."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "53. What type of company do the speakers work for? (A) An investment firm (B) An advertising agency (C) A staffing service (D) A construction company",
   "transcript": "M: Hi, Jin-Ah. I've got good news. We signed a contract to create an ad campaign for a new client.\nW: That's great! Who is it?\nM: It's HMD Incorporated, an organic snack company. They just developed a new line of snacks made entirely from vegetables. They want to market the snacks to sports teams as well as individuals.\nW: Well, that sounds exciting but hard to understand. I guess we'll need to learn more about the products first.\nM: Exactly. We'll have the client come in to give us nutritional information, and provide us with some samples. I'll schedule a meeting with them soon.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n53. Những người nói chuyện làm việc cho loại công ty nào?\n(A) Công ty đầu tư\n(B) Công ty quảng cáo\n(C) Dịch vụ nhân sự\n(D) Công ty xây dựng\n\nDịch hội thoại:\nNam: Chào Jin-Ah. Tôi có tin tốt. Chúng ta đã ký hợp đồng để tạo chiến dịch quảng cáo cho một khách hàng mới.\nNữ: Tuyệt vời! Đó là ai vậy?\nNam: Đó là HMD Incorporated, một công ty đồ ăn vặt hữu cơ. Họ vừa phát triển một dòng đồ ăn vặt mới làm hoàn toàn từ rau củ. Họ muốn tiếp thị đồ ăn vặt cho các đội thể thao cũng như cá nhân.\nNữ: Nghe hay đấy nhưng khó hiểu. Tôi đoán chúng ta cần tìm hiểu thêm về sản phẩm trước.\nNam: Chính xác. Chúng ta sẽ để khách hàng đến để cung cấp thông tin dinh dưỡng và cung cấp mẫu cho chúng ta. Tôi sẽ lên lịch họp với họ sớm."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "54. What has HMD Incorporated recently done? (A) It has built a new headquarters (B) It has donated to a charity (C) It has developed a new line of products (D) It has won an industry award",
   "transcript": "M: Hi, Jin-Ah. I've got good news. We signed a contract to create an ad campaign for a new client.\nW: That's great! Who is it?\nM: It's HMD Incorporated, an organic snack company. They just developed a new line of snacks made entirely from vegetables. They want to market the snacks to sports teams as well as individuals.\nW: Well, that sounds exciting but hard to understand. I guess we'll need to learn more about the products first.\nM: Exactly. We'll have the client come in to give us nutritional information, and provide us with some samples. I'll schedule a meeting with them soon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n54. Gần đây HMD Incorporated đã làm gì?\n(A) Xây trụ sở mới\n(B) Quyên góp từ thiện\n(C) Phát triển dòng sản phẩm mới\n(D) Thắng giải thưởng ngành\n\nDịch hội thoại:\nNam: Chào Jin-Ah. Tôi có tin tốt. Chúng ta đã ký hợp đồng để tạo chiến dịch quảng cáo cho một khách hàng mới.\nNữ: Tuyệt vời! Đó là ai vậy?\nNam: Đó là HMD Incorporated, một công ty đồ ăn vặt hữu cơ. Họ vừa phát triển một dòng đồ ăn vặt mới làm hoàn toàn từ rau củ. Họ muốn tiếp thị đồ ăn vặt cho các đội thể thao cũng như cá nhân.\nNữ: Nghe hay đấy nhưng khó hiểu. Tôi đoán chúng ta cần tìm hiểu thêm về sản phẩm trước.\nNam: Chính xác. Chúng ta sẽ để khách hàng đến để cung cấp thông tin dinh dưỡng và cung cấp mẫu cho chúng ta. Tôi sẽ lên lịch họp với họ sớm."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "D",
   "group": "53-55",
   "textEn": "55. What does the man say he will do? (A) Update his team’s goals (B) Conduct some research (C) Apply for a permit (D) Arrange for a meeting",
   "transcript": "M: Hi, Jin-Ah. I've got good news. We signed a contract to create an ad campaign for a new client.\nW: That's great! Who is it?\nM: It's HMD Incorporated, an organic snack company. They just developed a new line of snacks made entirely from vegetables. They want to market the snacks to sports teams as well as individuals.\nW: Well, that sounds exciting but hard to understand. I guess we'll need to learn more about the products first.\nM: Exactly. We'll have the client come in to give us nutritional information, and provide us with some samples. I'll schedule a meeting with them soon.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n55. Người đàn ông nói rằng anh ấy sẽ làm gì?\n(A) Cập nhật mục tiêu nhóm\n(B) Thực hiện nghiên cứu\n(C) Nộp đơn xin giấy phép\n(D) Sắp xếp cuộc họp\n\nDịch hội thoại:\nNam: Chào Jin-Ah. Tôi có tin tốt. Chúng ta đã ký hợp đồng để tạo chiến dịch quảng cáo cho một khách hàng mới.\nNữ: Tuyệt vời! Đó là ai vậy?\nNam: Đó là HMD Incorporated, một công ty đồ ăn vặt hữu cơ. Họ vừa phát triển một dòng đồ ăn vặt mới làm hoàn toàn từ rau củ. Họ muốn tiếp thị đồ ăn vặt cho các đội thể thao cũng như cá nhân.\nNữ: Nghe hay đấy nhưng khó hiểu. Tôi đoán chúng ta cần tìm hiểu thêm về sản phẩm trước.\nNam: Chính xác. Chúng ta sẽ để khách hàng đến để cung cấp thông tin dinh dưỡng và cung cấp mẫu cho chúng ta. Tôi sẽ lên lịch họp với họ sớm."
  },
  {
   "number": 56,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "56. What did the man perform a maintenance check on? (A) A motorcycle (B) A car (C) A bus (D) An airplane",
   "transcript": "W1: Oliver, have you finished the maintenance check on the small airplane that came in this morning? The owner's hoping to fly it this weekend.\nM: I finished checking it earlier this morning. It needs a new fuel injection pump, so I've asked Camille to order one. Oh, here she comes. Camille, will the new pump arrive today?\nW2: Unfortunately, no. The manufacturer said there'll be a delay, and it won't arrive until Monday.\nW1: I better let the customer know. She was planning to fly the plane to Toronto this weekend for a friend's wedding. She'll need to find another way to get there.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n56. Người đàn ông đã kiểm tra bảo trì cái gì?\n(A) Xe máy\n(B) Ô tô\n(C) Xe buýt\n(D) Máy bay\n\nDịch hội thoại:\nNữ1: Oliver, anh đã hoàn thành kiểm tra bảo dưỡng cho chiếc máy bay nhỏ đến sáng nay chưa? Chủ nhân hy vọng bay nó cuối tuần này.\nNam: Tôi đã hoàn thành kiểm tra sáng sớm nay. Nó cần bơm phun nhiên liệu mới, nên tôi đã yêu cầu Camille đặt hàng một cái. Ồ, cô ấy đến rồi. Camille, bơm mới có đến hôm nay không?\nNữ2: Thật tiếc, không. Nhà sản xuất nói sẽ bị trì hoãn, và sẽ không đến đến thứ Hai.\nNữ1: Tôi nên thông báo cho khách hàng. Cô ấy dự định bay máy bay đến Toronto cuối tuần này cho đám cưới bạn. Cô ấy cần tìm cách khác để đến đó."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "57. What news does Camille share? (A) A delivery will be delayed. (B) An expense will increase. (C) A staff member is unavailable. (D) A rainstorm is predicted.",
   "transcript": "W1: Oliver, have you finished the maintenance check on the small airplane that came in this morning? The owner's hoping to fly it this weekend.\nM: I finished checking it earlier this morning. It needs a new fuel injection pump, so I've asked Camille to order one. Oh, here she comes. Camille, will the new pump arrive today?\nW2: Unfortunately, no. The manufacturer said there'll be a delay, and it won't arrive until Monday.\nW1: I better let the customer know. She was planning to fly the plane to Toronto this weekend for a friend's wedding. She'll need to find another way to get there.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n57. Camille chia sẻ tin tức gì?\n(A) Một đơn giao hàng sẽ bị trì hoãn\n(B) Chi phí sẽ tăng\n(C) Một nhân viên không thể đến\n(D) Dự báo có mưa bão\n\nDịch hội thoại:\nNữ1: Oliver, anh đã hoàn thành kiểm tra bảo dưỡng cho chiếc máy bay nhỏ đến sáng nay chưa? Chủ nhân hy vọng bay nó cuối tuần này.\nNam: Tôi đã hoàn thành kiểm tra sáng sớm nay. Nó cần bơm phun nhiên liệu mới, nên tôi đã yêu cầu Camille đặt hàng một cái. Ồ, cô ấy đến rồi. Camille, bơm mới có đến hôm nay không?\nNữ2: Thật tiếc, không. Nhà sản xuất nói sẽ bị trì hoãn, và sẽ không đến đến thứ Hai.\nNữ1: Tôi nên thông báo cho khách hàng. Cô ấy dự định bay máy bay đến Toronto cuối tuần này cho đám cưới bạn. Cô ấy cần tìm cách khác để đến đó."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "58. Why is the customer traveling to Toronto? (A) To participate in a competition (B) To present at a conference (C) To attend a wedding (D) To sign a contract",
   "transcript": "W1: Oliver, have you finished the maintenance check on the small airplane that came in this morning? The owner's hoping to fly it this weekend.\nM: I finished checking it earlier this morning. It needs a new fuel injection pump, so I've asked Camille to order one. Oh, here she comes. Camille, will the new pump arrive today?\nW2: Unfortunately, no. The manufacturer said there'll be a delay, and it won't arrive until Monday.\nW1: I better let the customer know. She was planning to fly the plane to Toronto this weekend for a friend's wedding. She'll need to find another way to get there.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n58. Tại sao khách hàng đi đến Toronto?\n(A) Tham gia một cuộc thi\n(B) Thuyết trình tại hội nghị\n(C) Dự đám cưới\n(D) Ký hợp đồng\n\nDịch hội thoại:\nNữ1: Oliver, anh đã hoàn thành kiểm tra bảo dưỡng cho chiếc máy bay nhỏ đến sáng nay chưa? Chủ nhân hy vọng bay nó cuối tuần này.\nNam: Tôi đã hoàn thành kiểm tra sáng sớm nay. Nó cần bơm phun nhiên liệu mới, nên tôi đã yêu cầu Camille đặt hàng một cái. Ồ, cô ấy đến rồi. Camille, bơm mới có đến hôm nay không?\nNữ2: Thật tiếc, không. Nhà sản xuất nói sẽ bị trì hoãn, và sẽ không đến đến thứ Hai.\nNữ1: Tôi nên thông báo cho khách hàng. Cô ấy dự định bay máy bay đến Toronto cuối tuần này cho đám cưới bạn. Cô ấy cần tìm cách khác để đến đó."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "59. What type of business does the man work for? (A) An electric company (B) An Internet provider (C) A landscaping service (D) A water supplier",
   "transcript": "M: Hello, you've reached the customer service line for Quality Internet Service. How can I help you?\nW: I'm Mona Shannak, and my account number's PK62H5. I'd like to close my account on June thirtieth.\nM: Oh, have you been experiencing issues with the service?\nW: Actually, my company has asked me to relocate to Spain.\nM: That's exciting! I'll take care of your request for you then.\nW: Thank you—I appreciate that.\nM: When I'm done updating your records, would you be willing to stay on the phone line to take a survey about your experience as a customer?\nW: Certainly.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n59. Người đàn ông làm việc cho loại hình kinh doanh nào?\n(A) Công ty điện lực\n(B) Nhà cung cấp Internet\n(C) Dịch vụ làm cảnh quan\n(D) Công ty cung cấp nước\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Chào, bạn đã gọi đến đường dây dịch vụ khách hàng của Quality Internet Service. Tôi có thể giúp gì cho bạn?\nNữ: Tôi là Mona Shannak, và số tài khoản của tôi là PK62H5. Tôi muốn đóng tài khoản vào ngày 30 tháng Sáu.\nNam: Ồ, bạn có gặp vấn đề với dịch vụ không?\nNữ: Thực ra, công ty tôi yêu cầu tôi chuyển đến Tây Ban Nha.\nNam: Hay đấy! Tôi sẽ xử lý yêu cầu của bạn.\nNữ: Cảm ơn—Tôi đánh giá cao điều đó.\nNam: Khi tôi cập nhật xong hồ sơ, bạn có sẵn lòng ở lại đường dây để tham gia khảo sát về trải nghiệm khách hàng không? Nữ: Chắc chắn rồi."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "60. What does the woman imply when she says, “my company has asked me to relocate to Spain”? (A) She enjoys traveling for business. (B) She was surprised by a job transfer. (C) She has no complaints about the service. (D) She would like paperwork sent to a different address.",
   "transcript": "M: Hello, you've reached the customer service line for Quality Internet Service. How can I help you?\nW: I'm Mona Shannak, and my account number's PK62H5. I'd like to close my account on June thirtieth.\nM: Oh, have you been experiencing issues with the service?\nW: Actually, my company has asked me to relocate to Spain.\nM: That's exciting! I'll take care of your request for you then.\nW: Thank you—I appreciate that.\nM: When I'm done updating your records, would you be willing to stay on the phone line to take a survey about your experience as a customer?\nW: Certainly.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n60. Người phụ nữ hàm ý điều gì khi nói “công ty yêu cầu tôi chuyển công tác đến Tây Ban Nha”?\n(A) Cô ấy thích đi công tác\n(B) Cô ấy bất ngờ vì được điều chuyển\n(C) Cô ấy không phàn nàn gì về dịch vụ\n(D) Cô ấy muốn gửi giấy tờ đến địa chỉ khác\n\nDịch hội thoại:\nNam: Chào, bạn đã gọi đến đường dây dịch vụ khách hàng của Quality Internet Service. Tôi có thể giúp gì cho bạn?\nNữ: Tôi là Mona Shannak, và số tài khoản của tôi là PK62H5. Tôi muốn đóng tài khoản vào ngày 30 tháng Sáu.\nNam: Ồ, bạn có gặp vấn đề với dịch vụ không?\nNữ: Thực ra, công ty tôi yêu cầu tôi chuyển đến Tây Ban Nha.\nNam: Hay đấy! Tôi sẽ xử lý yêu cầu của bạn.\nNữ: Cảm ơn—Tôi đánh giá cao điều đó.\nNam: Khi tôi cập nhật xong hồ sơ, bạn có sẵn lòng ở lại đường dây để tham gia khảo sát về trải nghiệm khách hàng không? Nữ: Chắc chắn rồi."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "D",
   "group": "59-61",
   "textEn": "61. What does the woman agree to do? (A) Pay a bill (B) Read a policy (C) Return a call (D) Complete a survey",
   "transcript": "M: Hello, you've reached the customer service line for Quality Internet Service. How can I help you?\nW: I'm Mona Shannak, and my account number's PK62H5. I'd like to close my account on June thirtieth.\nM: Oh, have you been experiencing issues with the service?\nW: Actually, my company has asked me to relocate to Spain.\nM: That's exciting! I'll take care of your request for you then.\nW: Thank you—I appreciate that.\nM: When I'm done updating your records, would you be willing to stay on the phone line to take a survey about your experience as a customer?\nW: Certainly.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n61. Người phụ nữ đồng ý làm gì?\n(A) Thanh toán hóa đơn\n(B) Đọc một quy định\n(C) Gọi lại cuộc gọi\n(D) Hoàn thành khảo sát\n\nDịch hội thoại:\nNam: Chào, bạn đã gọi đến đường dây dịch vụ khách hàng của Quality Internet Service. Tôi có thể giúp gì cho bạn?\nNữ: Tôi là Mona Shannak, và số tài khoản của tôi là PK62H5. Tôi muốn đóng tài khoản vào ngày 30 tháng Sáu.\nNam: Ồ, bạn có gặp vấn đề với dịch vụ không?\nNữ: Thực ra, công ty tôi yêu cầu tôi chuyển đến Tây Ban Nha.\nNam: Hay đấy! Tôi sẽ xử lý yêu cầu của bạn.\nNữ: Cảm ơn—Tôi đánh giá cao điều đó.\nNam: Khi tôi cập nhật xong hồ sơ, bạn có sẵn lòng ở lại đường dây để tham gia khảo sát về trải nghiệm khách hàng không? Nữ: Chắc chắn rồi."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "62. Look at the graphic. Which dollar amount will the man change? (A) $2.37 (B) $4.55 (C) $7.86 (D) $2.91",
   "transcript": "W: Marco, you'll be restocking the cleaning products this morning, right? While you're doing that, could you also put the updated sale-price labels on the hand soap dispensers? They're on the shelf right above the laundry detergent.\nM: No problem—that shouldn't take long. What else can I help with?\nW: Can you make room for our new international foods section at the front of the store?\nM: Oh, did the shipment finally arrive? That snowstorm up north really affected delivery schedules.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n62. Nhìn vào hình minh họa. Người đàn ông sẽ thay đổi mức giá nào?\n(A) $2.37\n(B) $4.55\n(C) $7.86\n(D) $2.91\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Marco, anh sẽ bổ sung sản phẩm làm sạch sáng nay phải không? Trong khi làm vậy, anh có thể dán nhãn giá khuyến mãi cập nhật lên bình xà phòng tay không? Chúng ở kệ ngay trên bột giặt.\nNam: Không vấn đề—sẽ không mất lâu. Tôi có thể giúp gì nữa?\nNữ: Anh có thể dọn chỗ cho khu vực thực phẩm quốc tế mới ở phía trước cửa hàng không?\nNam: Ồ, lô hàng cuối cùng đã đến? Bão tuyết ở phía bắc thực sự ảnh hưởng đến lịch giao hàng."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "63. What will be added at the front of the store? (A) An additional checkout stand (B) A holiday display (C) A special food section (D) A seating area",
   "transcript": "W: Marco, you'll be restocking the cleaning products this morning, right? While you're doing that, could you also put the updated sale-price labels on the hand soap dispensers? They're on the shelf right above the laundry detergent.\nM: No problem—that shouldn't take long. What else can I help with?\nW: Can you make room for our new international foods section at the front of the store?\nM: Oh, did the shipment finally arrive? That snowstorm up north really affected delivery schedules.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n63. Cửa hàng sẽ thêm gì ở phía trước?\n(A) Thêm quầy tính tiền\n(B) Trưng bày theo chủ đề lễ hội\n(C) Khu thực phẩm đặc biệt\n(D) Khu vực ghế ngồi\n\nDịch hội thoại:\nNữ: Marco, anh sẽ bổ sung sản phẩm làm sạch sáng nay phải không? Trong khi làm vậy, anh có thể dán nhãn giá khuyến mãi cập nhật lên bình xà phòng tay không? Chúng ở kệ ngay trên bột giặt.\nNam: Không vấn đề—sẽ không mất lâu. Tôi có thể giúp gì nữa?\nNữ: Anh có thể dọn chỗ cho khu vực thực phẩm quốc tế mới ở phía trước cửa hàng không?\nNam: Ồ, lô hàng cuối cùng đã đến? Bão tuyết ở phía bắc thực sự ảnh hưởng đến lịch giao hàng."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "D",
   "group": "62-64",
   "textEn": "64. According to the man, why did a shipment arrive late? (A) He forgot to place an order. (B) It was delivered to the wrong address. (C) Some supplies were unavailable. (D) Weather conditions were poor.",
   "transcript": "W: Marco, you'll be restocking the cleaning products this morning, right? While you're doing that, could you also put the updated sale-price labels on the hand soap dispensers? They're on the shelf right above the laundry detergent.\nM: No problem—that shouldn't take long. What else can I help with?\nW: Can you make room for our new international foods section at the front of the store?\nM: Oh, did the shipment finally arrive? That snowstorm up north really affected delivery schedules.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n64. Theo lời người đàn ông, tại sao lô hàng đến muộn?\n(A) Anh ấy quên đặt hàng\n(B) Hàng được giao nhầm địa chỉ\n(C) Một số vật tư không có sẵn\n(D) Thời tiết xấu\n\nDịch hội thoại:\nNữ: Marco, anh sẽ bổ sung sản phẩm làm sạch sáng nay phải không? Trong khi làm vậy, anh có thể dán nhãn giá khuyến mãi cập nhật lên bình xà phòng tay không? Chúng ở kệ ngay trên bột giặt.\nNam: Không vấn đề—sẽ không mất lâu. Tôi có thể giúp gì nữa?\nNữ: Anh có thể dọn chỗ cho khu vực thực phẩm quốc tế mới ở phía trước cửa hàng không?\nNam: Ồ, lô hàng cuối cùng đã đến? Bão tuyết ở phía bắc thực sự ảnh hưởng đến lịch giao hàng."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "65. What does the man say he needs to have done? (A) He needs to schedule a job interview. (B) He needs to cancel a doctor’s appointment. (C) He needs to have his photograph taken. (D) He needs to renew his driver’s license.",
   "transcript": "W: Thanks for calling Kwon Photography Studio.\nM: Hello. I need to have a photo taken for a Canadian passport.\nW: OK. You can make an appointment Monday through Friday. Just bring in a copy of the application so we can see the size requirements.\nM: I work nine to five every day at my current job. Do you have any openings after five P.M.?\nW: No problem. We're open until six P.M. one day a week.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n65. Người đàn ông nói anh ấy cần làm gì?\n(A) Anh ấy cần đặt lịch phỏng vấn xin việc.\n(B) Anh ấy cần hủy một cuộc hẹn bác sĩ.\n(C) Anh ấy cần chụp ảnh.\n(D) Anh ấy cần gia hạn bằng lái xe.\n\nDịch hội thoại:\nNữ: Cảm ơn đã gọi đến Kwon Photography Studio.\nNam: Chào. Tôi cần chụp ảnh cho hộ chiếu Canada.\nNữ: OK. Bạn có thể đặt lịch từ thứ Hai đến thứ Sáu. Chỉ cần mang theo bản sao đơn xin để chúng tôi xem yêu cầu kích thước.\nNam: Tôi làm việc từ chín đến năm mỗi ngày ở công việc hiện tại. Bạn có lịch trống sau năm giờ chiều không?\nNữ: Không vấn đề. Chúng tôi mở đến sáu giờ chiều một ngày mỗi tuần."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "66. What does the woman ask the man to bring to an appointment? (A) An application form (B) Some references (C) A study guide (D) A payment receipt",
   "transcript": "W: Thanks for calling Kwon Photography Studio.\nM: Hello. I need to have a photo taken for a Canadian passport.\nW: OK. You can make an appointment Monday through Friday. Just bring in a copy of the application so we can see the size requirements.\nM: I work nine to five every day at my current job. Do you have any openings after five P.M.?\nW: No problem. We're open until six P.M. one day a week.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n66. Người phụ nữ yêu cầu người đàn ông mang gì đến cuộc hẹn?\n(A) Một mẫu đơn đăng ký\n(B) Một vài thư giới thiệu\n(C) Một tài liệu ôn tập\n(D) Một biên lai thanh toán\n\nDịch hội thoại:\nNữ: Cảm ơn đã gọi đến Kwon Photography Studio.\nNam: Chào. Tôi cần chụp ảnh cho hộ chiếu Canada.\nNữ: OK. Bạn có thể đặt lịch từ thứ Hai đến thứ Sáu. Chỉ cần mang theo bản sao đơn xin để chúng tôi xem yêu cầu kích thước.\nNam: Tôi làm việc từ chín đến năm mỗi ngày ở công việc hiện tại. Bạn có lịch trống sau năm giờ chiều không?\nNữ: Không vấn đề. Chúng tôi mở đến sáu giờ chiều một ngày mỗi tuần."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "67. Look at the graphic. Which day will the man request an appointment for? (A) Monday (B) Tuesday (C) Wednesday (D) Thursday",
   "transcript": "W: Thanks for calling Kwon Photography Studio.\nM: Hello. I need to have a photo taken for a Canadian passport.\nW: OK. You can make an appointment Monday through Friday. Just bring in a copy of the application so we can see the size requirements.\nM: I work nine to five every day at my current job. Do you have any openings after five P.M.?\nW: No problem. We're open until six P.M. one day a week.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n67. Nhìn vào bảng, người đàn ông sẽ yêu cầu lịch hẹn vào ngày nào?\n(A) Thứ Hai\n(B) Thứ Ba\n(C) Thứ Tư\n(D) Thứ Năm\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Cảm ơn đã gọi đến Kwon Photography Studio.\nNam: Chào. Tôi cần chụp ảnh cho hộ chiếu Canada.\nNữ: OK. Bạn có thể đặt lịch từ thứ Hai đến thứ Sáu. Chỉ cần mang theo bản sao đơn xin để chúng tôi xem yêu cầu kích thước.\nNam: Tôi làm việc từ chín đến năm mỗi ngày ở công việc hiện tại. Bạn có lịch trống sau năm giờ chiều không?\nNữ: Không vấn đề. Chúng tôi mở đến sáu giờ chiều một ngày mỗi tuần."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "68. What event did the woman attend last week? (A) A professional conference (B) A training workshop (C) A car auction (D) A product demonstration",
   "transcript": "M: Hi, Marina. Do you have receipts for your expenses from the dental hygienists' conference you attended last week?\nW: Yes, I have them. I was just going to scan them and send them to you by e-mail.\nM: Thanks very much. Once I receive them, I'll process your request for reimbursement. Don't forget to fill out the travel expenses form and include it in your e-mail, too.\nW: OK. Remind me, what should I use for the department code?\nM: Oh, sorry. I forgot to tell you. Use number 1009.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n68. Tuần trước người phụ nữ đã tham dự sự kiện gì?\n(A) Một hội nghị chuyên nghiệp\n(B) Một buổi đào tạo\n(C) Một cuộc đấu giá xe hơi\n(D) Một buổi giới thiệu sản phẩm\n\nDịch hội thoại:\nNam: Chào Marina. Bạn có biên nhận cho chi phí từ hội nghị vệ sinh răng miệng bạn tham dự tuần trước không?\nNữ: Có, tôi có chúng. Tôi vừa định quét và gửi cho bạn qua email.\nNam: Cảm ơn rất nhiều. Khi tôi nhận được, tôi sẽ xử lý yêu cầu hoàn tiền của bạn. Đừng quên điền biểu mẫu chi phí du lịch và đính kèm vào email.\nNữ: OK. Nhắc tôi, tôi nên dùng gì cho mã bộ phận?\nNam: Ồ, xin lỗi. Tôi quên nói với bạn. Sử dụng số 1009."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "69. What will the man do with the documents the woman provides? (A) Process a request (B) Postpone a reservation (C) Make a schedule (D) Finalize a report",
   "transcript": "M: Hi, Marina. Do you have receipts for your expenses from the dental hygienists' conference you attended last week?\nW: Yes, I have them. I was just going to scan them and send them to you by e-mail.\nM: Thanks very much. Once I receive them, I'll process your request for reimbursement. Don't forget to fill out the travel expenses form and include it in your e-mail, too.\nW: OK. Remind me, what should I use for the department code?\nM: Oh, sorry. I forgot to tell you. Use number 1009.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n69. Người đàn ông sẽ làm gì với các tài liệu người phụ nữ đưa?\n(A) Xử lý một yêu cầu\n(B) Hoãn một đặt chỗ\n(C) Tạo một lịch trình\n(D) Hoàn tất một báo cáo\n\nDịch hội thoại:\nNam: Chào Marina. Bạn có biên nhận cho chi phí từ hội nghị vệ sinh răng miệng bạn tham dự tuần trước không?\nNữ: Có, tôi có chúng. Tôi vừa định quét và gửi cho bạn qua email.\nNam: Cảm ơn rất nhiều. Khi tôi nhận được, tôi sẽ xử lý yêu cầu hoàn tiền của bạn. Đừng quên điền biểu mẫu chi phí du lịch và đính kèm vào email.\nNữ: OK. Nhắc tôi, tôi nên dùng gì cho mã bộ phận?\nNam: Ồ, xin lỗi. Tôi quên nói với bạn. Sử dụng số 1009."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "70. Look at the graphic. Which section does the woman ask about? (A) Section 2 (B) Section 3 (C) Section 4 (D) Section 5",
   "transcript": "M: Hi, Marina. Do you have receipts for your expenses from the dental hygienists' conference you attended last week?\nW: Yes, I have them. I was just going to scan them and send them to you by e-mail.\nM: Thanks very much. Once I receive them, I'll process your request for reimbursement. Don't forget to fill out the travel expenses form and include it in your e-mail, too.\nW: OK. Remind me, what should I use for the department code?\nM: Oh, sorry. I forgot to tell you. Use number 1009.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n70. Nhìn vào biểu mẫu. Người phụ nữ hỏi về mục nào?\n(A) Mục 2\n(B) Mục 3\n(C) Mục 4\n(D) Mục 5\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Chào Marina. Bạn có biên nhận cho chi phí từ hội nghị vệ sinh răng miệng bạn tham dự tuần trước không?\nNữ: Có, tôi có chúng. Tôi vừa định quét và gửi cho bạn qua email.\nNam: Cảm ơn rất nhiều. Khi tôi nhận được, tôi sẽ xử lý yêu cầu hoàn tiền của bạn. Đừng quên điền biểu mẫu chi phí du lịch và đính kèm vào email.\nNữ: OK. Nhắc tôi, tôi nên dùng gì cho mã bộ phận?\nNam: Ồ, xin lỗi. Tôi quên nói với bạn. Sử dụng số 1009."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "71. Which event is being planned? (A) A holiday parade (B) A music festival (C) A sports competition (D) A company picnic",
   "transcript": "The town's annual music festival is only a few months away, and our committee still has a lot of planning to do. We already have a list of performers who have agreed to appear. Fortunately, we can use the same stage and equipment we've used in the past. However, we don't have enough fencing to create a larger seating area. Eniola, since you're in charge of accounts, would you check sometime today to see whether we have money for extra fencing?",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n71. Sự kiện nào đang được lên kế hoạch?\n(A) Một cuộc diễu hành ngày lễ\n(B) Một lễ hội âm nhạc\n(C) Một cuộc thi thể thao\n(D) Một buổi dã ngoại công ty\n\nDịch bài nói:\nNữ: Lễ hội âm nhạc hàng năm của thị trấn chỉ còn vài tháng nữa, và ủy ban của chúng ta vẫn còn nhiều việc phải lập kế hoạch. Chúng ta đã có danh sách các nghệ sĩ đồng ý biểu diễn. May mắn thay, chúng ta có thể sử dụng sân khấu và thiết bị giống như trước đây. Tuy nhiên, chúng ta không có đủ hàng rào để tạo khu vực chỗ ngồi lớn hơn. Eniola, vì bạn phụ trách tài chính, bạn có thể kiểm tra hôm nay xem chúng ta có tiền cho hàng rào thêm không?"
  },
  {
   "number": 72,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "72. What problem does the speaker mention? (A) A stage needs to be repainted. (B) Some participants have canceled. (C) There is not enough fencing. (D) A parking area cannot be used.",
   "transcript": "The town's annual music festival is only a few months away, and our committee still has a lot of planning to do. We already have a list of performers who have agreed to appear. Fortunately, we can use the same stage and equipment we've used in the past. However, we don't have enough fencing to create a larger seating area. Eniola, since you're in charge of accounts, would you check sometime today to see whether we have money for extra fencing?",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n72. Người nói đề cập đến vấn đề gì?\n(A) Sân khấu cần được sơn lại\n(B) Một số người tham gia đã hủy\n(C) Không đủ hàng rào\n(D) Khu vực đỗ xe không thể sử dụng\n\nDịch bài nói:\nNữ: Lễ hội âm nhạc hàng năm của thị trấn chỉ còn vài tháng nữa, và ủy ban của chúng ta vẫn còn nhiều việc phải lập kế hoạch. Chúng ta đã có danh sách các nghệ sĩ đồng ý biểu diễn. May mắn thay, chúng ta có thể sử dụng sân khấu và thiết bị giống như trước đây. Tuy nhiên, chúng ta không có đủ hàng rào để tạo khu vực chỗ ngồi lớn hơn. Eniola, vì bạn phụ trách tài chính, bạn có thể kiểm tra hôm nay xem chúng ta có tiền cho hàng rào thêm không?"
  },
  {
   "number": 73,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "73. What will Enolia most likely do today? (A) Select a caterer (B) Hire a maintenance worker (C) Confirm a start time (D) Check a budget",
   "transcript": "The town's annual music festival is only a few months away, and our committee still has a lot of planning to do. We already have a list of performers who have agreed to appear. Fortunately, we can use the same stage and equipment we've used in the past. However, we don't have enough fencing to create a larger seating area. Eniola, since you're in charge of accounts, would you check sometime today to see whether we have money for extra fencing?",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n73. Hôm nay Enolia có khả năng sẽ làm điều gì?\n(A) Chọn đơn vị cung cấp tiệc\n(B) Thuê một nhân viên bảo trì\n(C) Xác nhận giờ bắt đầu\n(D) Kiểm tra ngân sách\n\nDịch bài nói:\nNữ: Lễ hội âm nhạc hàng năm của thị trấn chỉ còn vài tháng nữa, và ủy ban của chúng ta vẫn còn nhiều việc phải lập kế hoạch. Chúng ta đã có danh sách các nghệ sĩ đồng ý biểu diễn. May mắn thay, chúng ta có thể sử dụng sân khấu và thiết bị giống như trước đây. Tuy nhiên, chúng ta không có đủ hàng rào để tạo khu vực chỗ ngồi lớn hơn. Eniola, vì bạn phụ trách tài chính, bạn có thể kiểm tra hôm nay xem chúng ta có tiền cho hàng rào thêm không?"
  },
  {
   "number": 74,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "74. What type of event are the listeners most likely attending? (A) A trade show (B) A press conference (C) A charity auction (D) A grand opening ceremony",
   "transcript": "Hello, everyone! Thanks for stopping by my booth. I hope you've been enjoying all the manufacturing exhibits and demonstrations. I'm Carmen Fuentes, and I'm a sales representative at LT Plastic Injectors. Today I'm delighted to show you one of our new injection molding machines. It's currently fitted with a mold to make plastic bottle caps. This machine is able to create 96 bottle caps every two seconds. That's incredibly fast! And for today only, we're offering a ten percent discount on orders for this machine just for attending our demonstration.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n74. Người nghe có khả năng đang tham dự loại sự kiện nào?\n(A) Một triển lãm thương mại\n(B) Một cuộc họp báo\n(C) Một buổi đấu giá từ thiện\n(D) Một lễ khai trương\n\nDịch bài nói:\nNữ: Xin chào mọi người! Cảm ơn đã ghé thăm gian hàng của tôi. Tôi hy vọng bạn đã thích thú với tất cả các triển lãm và trình diễn sản xuất. Tôi là Carmen Fuentes, và tôi là đại diện bán hàng tại LT Plastic Injectors. Hôm nay tôi rất vui được giới thiệu một trong những máy ép phun mới của chúng tôi. Nó hiện đang được lắp khuôn để làm nắp chai nhựa. Máy này có thể tạo ra 96 nắp chai mỗi hai giây. Thật sự nhanh chóng! Và chỉ hôm nay, chúng tôi giảm giá 10% cho đơn hàng máy này chỉ vì tham gia trình diễn."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "C",
   "group": "74-76",
   "textEn": "75. What does the speaker emphasize about a machine? (A) Its durability (B) Its ease of use (C) Its speed (D) Its energy efficiency",
   "transcript": "Hello, everyone! Thanks for stopping by my booth. I hope you've been enjoying all the manufacturing exhibits and demonstrations. I'm Carmen Fuentes, and I'm a sales representative at LT Plastic Injectors. Today I'm delighted to show you one of our new injection molding machines. It's currently fitted with a mold to make plastic bottle caps. This machine is able to create 96 bottle caps every two seconds. That's incredibly fast! And for today only, we're offering a ten percent discount on orders for this machine just for attending our demonstration.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n75. Người nói nhấn mạnh điều gì về chiếc máy đó?\n(A) Độ bền\n(B) Dễ sử dụng\n(C) Tốc độ\n(D) Hiệu quả năng lượng\n\nDịch bài nói:\nNữ: Xin chào mọi người! Cảm ơn đã ghé thăm gian hàng của tôi. Tôi hy vọng bạn đã thích thú với tất cả các triển lãm và trình diễn sản xuất. Tôi là Carmen Fuentes, và tôi là đại diện bán hàng tại LT Plastic Injectors. Hôm nay tôi rất vui được giới thiệu một trong những máy ép phun mới của chúng tôi. Nó hiện đang được lắp khuôn để làm nắp chai nhựa. Máy này có thể tạo ra 96 nắp chai mỗi hai giây. Thật sự nhanh chóng! Và chỉ hôm nay, chúng tôi giảm giá 10% cho đơn hàng máy này chỉ vì tham gia trình diễn."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. What does the speaker offer the listeners? (A) A free sample (B) A product discount (C) A meal voucher (D) A training brochure",
   "transcript": "Hello, everyone! Thanks for stopping by my booth. I hope you've been enjoying all the manufacturing exhibits and demonstrations. I'm Carmen Fuentes, and I'm a sales representative at LT Plastic Injectors. Today I'm delighted to show you one of our new injection molding machines. It's currently fitted with a mold to make plastic bottle caps. This machine is able to create 96 bottle caps every two seconds. That's incredibly fast! And for today only, we're offering a ten percent discount on orders for this machine just for attending our demonstration.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n76. Người nói cung cấp điều gì cho người nghe?\n(A) Một mẫu thử miễn phí\n(B) Một giảm giá sản phẩm\n(C) Một phiếu ăn\n(D) Một tờ giới thiệu đào tạo\n\nDịch bài nói:\nNữ: Xin chào mọi người! Cảm ơn đã ghé thăm gian hàng của tôi. Tôi hy vọng bạn đã thích thú với tất cả các triển lãm và trình diễn sản xuất. Tôi là Carmen Fuentes, và tôi là đại diện bán hàng tại LT Plastic Injectors. Hôm nay tôi rất vui được giới thiệu một trong những máy ép phun mới của chúng tôi. Nó hiện đang được lắp khuôn để làm nắp chai nhựa. Máy này có thể tạo ra 96 nắp chai mỗi hai giây. Thật sự nhanh chóng! Và chỉ hôm nay, chúng tôi giảm giá 10% cho đơn hàng máy này chỉ vì tham gia trình diễn."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "C",
   "group": "77-79",
   "textEn": "77. What industry does the speaker work in? (A) Real estate (B) Construction (C) Technology (D) Manufacturing",
   "transcript": "The company leadership here at PCF Technologies has decided to make a major change. Historically, we've been one of the largest manufacturers of computer chips. However, starting next month, our company will launch a research and development division and start designing chips, too. We've decided to make this change to allow us to have more control over the quality of the technology we produce. As a result, some employees will have new work assignments going forward. Those assignments will be communicated later in the morning.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n77. Người nói làm việc trong ngành nào?\n(A) Bất động sản\n(B) Xây dựng\n(C) Công nghệ\n(D) Sản xuất\n\nDịch bài nói:\nNữ: Ban lãnh đạo công ty tại PCF Technologies đã quyết định thực hiện một thay đổi lớn. Lịch sử, chúng tôi là một trong những nhà sản xuất chip máy tính lớn nhất. Tuy nhiên, bắt đầu từ tháng tới, công ty chúng tôi sẽ ra mắt bộ phận nghiên cứu và phát triển và bắt đầu thiết kế chip. Chúng tôi quyết định thay đổi này để có thêm kiểm soát về chất lượng công nghệ chúng tôi sản xuất. Kết quả là, một số nhân viên sẽ có nhiệm vụ công việc mới trong tương lai. Những nhiệm vụ đó sẽ được thông báo sau trong buổi sáng."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "78. Why is the company making a change? (A) To create employment opportunities (B) To reduce manufacturing costs (C) To comply with a government policy (D) To increase control over quality",
   "transcript": "The company leadership here at PCF Technologies has decided to make a major change. Historically, we've been one of the largest manufacturers of computer chips. However, starting next month, our company will launch a research and development division and start designing chips, too. We've decided to make this change to allow us to have more control over the quality of the technology we produce. As a result, some employees will have new work assignments going forward. Those assignments will be communicated later in the morning.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n78. Tại sao công ty lại thực hiện thay đổi?\n(A) Để tạo ra các cơ hội việc làm\n(B) Để giảm chi phí sản xuất\n(C) Để tuân thủ chính sách của chính phủ\n(D) Để tăng cường kiểm soát chất lượng\n\nDịch bài nói:\nNữ: Ban lãnh đạo công ty tại PCF Technologies đã quyết định thực hiện một thay đổi lớn. Lịch sử, chúng tôi là một trong những nhà sản xuất chip máy tính lớn nhất. Tuy nhiên, bắt đầu từ tháng tới, công ty chúng tôi sẽ ra mắt bộ phận nghiên cứu và phát triển và bắt đầu thiết kế chip. Chúng tôi quyết định thay đổi này để có thêm kiểm soát về chất lượng công nghệ chúng tôi sản xuất. Kết quả là, một số nhân viên sẽ có nhiệm vụ công việc mới trong tương lai. Những nhiệm vụ đó sẽ được thông báo sau trong buổi sáng."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "79. What will the speaker work on later in the morning? (A) Work assignments (B) Calendar invitations (C) A press release (D) Product specifications",
   "transcript": "The company leadership here at PCF Technologies has decided to make a major change. Historically, we've been one of the largest manufacturers of computer chips. However, starting next month, our company will launch a research and development division and start designing chips, too. We've decided to make this change to allow us to have more control over the quality of the technology we produce. As a result, some employees will have new work assignments going forward. Those assignments will be communicated later in the morning.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n79. Cuối buổi sáng, người nói sẽ làm gì?\n(A) Phân công công việc\n(B) Gửi lời mời trên lịch\n(C) Viết thông cáo báo chí\n(D) Hoàn thiện thông số sản phẩm\n\nDịch bài nói:\nNữ: Ban lãnh đạo công ty tại PCF Technologies đã quyết định thực hiện một thay đổi lớn. Lịch sử, chúng tôi là một trong những nhà sản xuất chip máy tính lớn nhất. Tuy nhiên, bắt đầu từ tháng tới, công ty chúng tôi sẽ ra mắt bộ phận nghiên cứu và phát triển và bắt đầu thiết kế chip. Chúng tôi quyết định thay đổi này để có thêm kiểm soát về chất lượng công nghệ chúng tôi sản xuất. Kết quả là, một số nhân viên sẽ có nhiệm vụ công việc mới trong tương lai. Những nhiệm vụ đó sẽ được thông báo sau trong buổi sáng."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "80. What is the focus of the podcast? (A) Technology (B) Art (C) Financial (D) Sports",
   "transcript": "Hello! Welcome to Ag-Cast—a podcast all about the latest news in agriculture. Before we get started with today's episode, I'd like to note that I provided the wrong dates for the Farming Exposition during last week's episode. The start date of the event is March thirty-first, not the twenty-first. I'm sorry about that. OK, let's move on to today's guest. Ms. Junko Adachi is the director at Fertilizer-ONE—a nonprofit organization that provides small farms with low-cost fertilizer. During her time as director, the organization has helped over 1,000 small farms increase their yields!",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n80. Chủ đề của podcast là gì?\n(A) Công nghệ\n(B) Nghệ thuật\n(C) Tài chính\n(D) Thể thao\n\nDịch bài nói:\nNam: Xin chào! Chào mừng đến với Ag-Cast—một podcast về tất cả tin tức mới nhất trong nông nghiệp. Trước khi bắt đầu tập hôm nay, tôi muốn lưu ý rằng tôi đã cung cấp sai ngày cho Triển lãm Nông nghiệp trong tập tuần trước. Ngày bắt đầu sự kiện là ngày 31 tháng Ba, không phải 21. Tôi xin lỗi về điều đó. OK, hãy chuyển sang khách mời hôm nay. Bà Junko Adachi là giám đốc tại Fertilizer-ONE—một tổ chức phi lợi nhuận cung cấp phân bón giá rẻ cho các nông trại nhỏ. Trong thời gian làm giám đốc, tổ chức đã giúp hơn 1.000 nông trại nhỏ tăng năng suất!"
  },
  {
   "number": 81,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "81. Why does the speaker apologize? (A) For having some audio problems (B) For delaying some Web site updates (C) For forgetting to thank a sponsor (D) For providing an incorrect date",
   "transcript": "Hello! Welcome to Ag-Cast—a podcast all about the latest news in agriculture. Before we get started with today's episode, I'd like to note that I provided the wrong dates for the Farming Exposition during last week's episode. The start date of the event is March thirty-first, not the twenty-first. I'm sorry about that. OK, let's move on to today's guest. Ms. Junko Adachi is the director at Fertilizer-ONE—a nonprofit organization that provides small farms with low-cost fertilizer. During her time as director, the organization has helped over 1,000 small farms increase their yields!",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n81. Tại sao người nói lại xin lỗi?\n(A) Vì gặp một số vấn đề về âm thanh\n(B) Vì trì hoãn một số cập nhật trên trang web\n(C) Vì quên cảm ơn một nhà tài trợ\n(D) Vì đã cung cấp sai ngày tháng\n\nDịch bài nói:\nNam: Xin chào! Chào mừng đến với Ag-Cast—một podcast về tất cả tin tức mới nhất trong nông nghiệp. Trước khi bắt đầu tập hôm nay, tôi muốn lưu ý rằng tôi đã cung cấp sai ngày cho Triển lãm Nông nghiệp trong tập tuần trước. Ngày bắt đầu sự kiện là ngày 31 tháng Ba, không phải 21. Tôi xin lỗi về điều đó. OK, hãy chuyển sang khách mời hôm nay. Bà Junko Adachi là giám đốc tại Fertilizer-ONE—một tổ chức phi lợi nhuận cung cấp phân bón giá rẻ cho các nông trại nhỏ. Trong thời gian làm giám đốc, tổ chức đã giúp hơn 1.000 nông trại nhỏ tăng năng suất!"
  },
  {
   "number": 82,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "82. Who is Junko Adachi? (A) The director of a nonprofit organization (B) The president of a national bank (C) A successful inventor (D) A well-known author",
   "transcript": "Hello! Welcome to Ag-Cast—a podcast all about the latest news in agriculture. Before we get started with today's episode, I'd like to note that I provided the wrong dates for the Farming Exposition during last week's episode. The start date of the event is March thirty-first, not the twenty-first. I'm sorry about that. OK, let's move on to today's guest. Ms. Junko Adachi is the director at Fertilizer-ONE—a nonprofit organization that provides small farms with low-cost fertilizer. During her time as director, the organization has helped over 1,000 small farms increase their yields!",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n82. Junko Adachi là ai?\n(A) Giám đốc một tổ chức phi lợi nhuận\n(B) Chủ tịch một ngân hàng quốc gia\n(C) Một nhà phát minh thành công\n(D) Một tác giả nổi tiếng\n\nDịch bài nói:\nNam: Xin chào! Chào mừng đến với Ag-Cast—một podcast về tất cả tin tức mới nhất trong nông nghiệp. Trước khi bắt đầu tập hôm nay, tôi muốn lưu ý rằng tôi đã cung cấp sai ngày cho Triển lãm Nông nghiệp trong tập tuần trước. Ngày bắt đầu sự kiện là ngày 31 tháng Ba, không phải 21. Tôi xin lỗi về điều đó. OK, hãy chuyển sang khách mời hôm nay. Bà Junko Adachi là giám đốc tại Fertilizer-ONE—một tổ chức phi lợi nhuận cung cấp phân bón giá rẻ cho các nông trại nhỏ. Trong thời gian làm giám đốc, tổ chức đã giúp hơn 1.000 nông trại nhỏ tăng năng suất!"
  },
  {
   "number": 83,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "83. What industry does the speaker work in? (A) Real estate (B) Construction (C) Technology (D) Manufacturing",
   "transcript": "Hi, Mr. Flores. This is Susana, the supervisor of the construction crew working on your renovation project. I'm calling because we've run into an issue with the front window replacements. Your house was built a long time ago and has settled over the years. Unfortunately, this has caused some frame alignment issues. We will not be able to install the new bay window you requested for the front room without more extensive work than the budget will cover. Our work is done for today, but we'll need to know how to proceed by tomorrow. I'll be available for the next couple of hours.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n83. Người nói làm việc trong ngành nào?\n(A) Bất động sản\n(B) Xây dựng\n(C) Công nghệ\n(D) Sản xuất\n\nDịch bài nói:\nNữ: Chào ông Flores. Đây là Susana, giám sát viên của đội xây dựng đang làm việc trên dự án cải tạo của ông. Tôi gọi vì chúng tôi gặp vấn đề với việc thay thế cửa sổ phía trước. Nhà ông được xây dựng từ lâu và đã lún theo thời gian. Thật không may, điều này gây ra một số vấn đề căn chỉnh khung. Chúng tôi sẽ không thể lắp đặt cửa sổ lồi mới mà ông yêu cầu cho phòng trước mà không cần công việc mở rộng hơn ngân sách cho phép. Công việc hôm nay đã xong, nhưng chúng tôi cần biết cách tiến hành vào ngày mai. Tôi sẽ sẵn sàng trong vài giờ tới."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "84. According to the speaker, what has caused a problem? (A) Bad weather (B) An employee absence (C) A supply shortage (D) The age of a building",
   "transcript": "Hi, Mr. Flores. This is Susana, the supervisor of the construction crew working on your renovation project. I'm calling because we've run into an issue with the front window replacements. Your house was built a long time ago and has settled over the years. Unfortunately, this has caused some frame alignment issues. We will not be able to install the new bay window you requested for the front room without more extensive work than the budget will cover. Our work is done for today, but we'll need to know how to proceed by tomorrow. I'll be available for the next couple of hours.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n84. Theo người nói, điều gì đã gây ra vấn đề?\n(A) Thời tiết xấu\n(B) Một nhân viên vắng mặt\n(C) Thiếu nguồn cung\n(D) Tòa nhà cũ\n\nDịch bài nói:\nNữ: Chào ông Flores. Đây là Susana, giám sát viên của đội xây dựng đang làm việc trên dự án cải tạo của ông. Tôi gọi vì chúng tôi gặp vấn đề với việc thay thế cửa sổ phía trước. Nhà ông được xây dựng từ lâu và đã lún theo thời gian. Thật không may, điều này gây ra một số vấn đề căn chỉnh khung. Chúng tôi sẽ không thể lắp đặt cửa sổ lồi mới mà ông yêu cầu cho phòng trước mà không cần công việc mở rộng hơn ngân sách cho phép. Công việc hôm nay đã xong, nhưng chúng tôi cần biết cách tiến hành vào ngày mai. Tôi sẽ sẵn sàng trong vài giờ tới."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "85. Why does the speaker say, “I’ll be available for the next couple of hours”? (A) To inform the listener of new business hours (B) To confirm the listener’s appointment (C) To remind the listener to submit a payment (D) To encourage the listener to call back soon",
   "transcript": "Hi, Mr. Flores. This is Susana, the supervisor of the construction crew working on your renovation project. I'm calling because we've run into an issue with the front window replacements. Your house was built a long time ago and has settled over the years. Unfortunately, this has caused some frame alignment issues. We will not be able to install the new bay window you requested for the front room without more extensive work than the budget will cover. Our work is done for today, but we'll need to know how to proceed by tomorrow. I'll be available for the next couple of hours.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n85. Tại sao người nói nói “Tôi sẽ có mặt trong vài giờ tới”?\n(A) Để thông báo giờ làm việc mới\n(B) Để xác nhận cuộc hẹn\n(C) Để nhắc người nghe nộp tiền thanh toán\n(D) Để khuyến khích người nghe gọi lại sớm\n\nDịch bài nói:\nNữ: Chào ông Flores. Đây là Susana, giám sát viên của đội xây dựng đang làm việc trên dự án cải tạo của ông. Tôi gọi vì chúng tôi gặp vấn đề với việc thay thế cửa sổ phía trước. Nhà ông được xây dựng từ lâu và đã lún theo thời gian. Thật không may, điều này gây ra một số vấn đề căn chỉnh khung. Chúng tôi sẽ không thể lắp đặt cửa sổ lồi mới mà ông yêu cầu cho phòng trước mà không cần công việc mở rộng hơn ngân sách cho phép. Công việc hôm nay đã xong, nhưng chúng tôi cần biết cách tiến hành vào ngày mai. Tôi sẽ sẵn sàng trong vài giờ tới."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "86. Who most likely is the speaker? (A) A marketing consultant (B) A bank manager (C) A hospital director (D) A factory owner",
   "transcript": "You may remember that our bank branch was evaluated by auditors from our headquarters last week. Well, I received their report today. They looked at everything from how we handle recordkeeping for accounts and transactions to how our bank tellers interact with individual customers. Above all, they were impressed with the quality of our customer service, specifically how we greet customers and direct them to the right associate. However, we received low ratings on marketing our other products. I'd like all supervisors to talk to their staff about strategies to pitch our products and services to customers.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n86. Người nói có khả năng là ai?\n(A) Một cố vấn marketing\n(B) Một quản lý ngân hàng\n(C) Giám đốc bệnh viện\n(D) Chủ nhà máy\n\nDịch bài nói:\nNam: Bạn có thể nhớ rằng chi nhánh ngân hàng của chúng ta đã được kiểm toán viên từ trụ sở đánh giá tuần trước. Vâng, tôi nhận được báo cáo của họ hôm nay. Họ xem xét mọi thứ từ cách chúng ta xử lý ghi chép hồ sơ cho tài khoản và giao dịch đến cách nhân viên quầy của ngân hàng tương tác với khách hàng cá nhân. Trên hết, họ ấn tượng với chất lượng dịch vụ khách hàng của chúng ta, cụ thể là cách chúng ta chào đón khách hàng và hướng dẫn họ đến nhân viên phù hợp. Tuy nhiên, chúng ta nhận được đánh giá thấp về việc tiếp thị các sản phẩm khác. Tôi muốn tất cả giám sát viên nói chuyện với nhân viên của họ về chiến lược quảng bá sản phẩm và dịch vụ cho khách hàng."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "87. According to the speaker, what were some auditors impressed with? (A) Customer service (B) Employee satisfaction (C) Community outreach (D) Worker safety",
   "transcript": "You may remember that our bank branch was evaluated by auditors from our headquarters last week. Well, I received their report today. They looked at everything from how we handle recordkeeping for accounts and transactions to how our bank tellers interact with individual customers. Above all, they were impressed with the quality of our customer service, specifically how we greet customers and direct them to the right associate. However, we received low ratings on marketing our other products. I'd like all supervisors to talk to their staff about strategies to pitch our products and services to customers.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n87. Theo người nói, kiểm toán viên ấn tượng với điều gì?\n(A) Dịch vụ khách hàng\n(B) Sự hài lòng của nhân viên\n(C) Hoạt động cộng đồng\n(D) An toàn lao động\n\nDịch bài nói:\nNam: Bạn có thể nhớ rằng chi nhánh ngân hàng của chúng ta đã được kiểm toán viên từ trụ sở đánh giá tuần trước. Vâng, tôi nhận được báo cáo của họ hôm nay. Họ xem xét mọi thứ từ cách chúng ta xử lý ghi chép hồ sơ cho tài khoản và giao dịch đến cách nhân viên quầy của ngân hàng tương tác với khách hàng cá nhân. Trên hết, họ ấn tượng với chất lượng dịch vụ khách hàng của chúng ta, cụ thể là cách chúng ta chào đón khách hàng và hướng dẫn họ đến nhân viên phù hợp. Tuy nhiên, chúng ta nhận được đánh giá thấp về việc tiếp thị các sản phẩm khác. Tôi muốn tất cả giám sát viên nói chuyện với nhân viên của họ về chiến lược quảng bá sản phẩm và dịch vụ cho khách hàng."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "88. What does the speaker ask supervisors to do? (A) Reward staff for their efficiency (B) Review marketing strategies with their teams (C) Schedule team-building exercises (D) Recommend staff for promotions",
   "transcript": "You may remember that our bank branch was evaluated by auditors from our headquarters last week. Well, I received their report today. They looked at everything from how we handle recordkeeping for accounts and transactions to how our bank tellers interact with individual customers. Above all, they were impressed with the quality of our customer service, specifically how we greet customers and direct them to the right associate. However, we received low ratings on marketing our other products. I'd like all supervisors to talk to their staff about strategies to pitch our products and services to customers.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n88. Người nói yêu cầu các giám sát viên làm gì?\n(A) Thưởng cho nhân viên làm việc hiệu quả\n(B) Xem lại chiến lược marketing với đội\n(C) Lên lịch hoạt động gắn kết nhóm\n(D) Đề cử nhân viên thăng chức\n\nDịch bài nói:\nNam: Bạn có thể nhớ rằng chi nhánh ngân hàng của chúng ta đã được kiểm toán viên từ trụ sở đánh giá tuần trước. Vâng, tôi nhận được báo cáo của họ hôm nay. Họ xem xét mọi thứ từ cách chúng ta xử lý ghi chép hồ sơ cho tài khoản và giao dịch đến cách nhân viên quầy của ngân hàng tương tác với khách hàng cá nhân. Trên hết, họ ấn tượng với chất lượng dịch vụ khách hàng của chúng ta, cụ thể là cách chúng ta chào đón khách hàng và hướng dẫn họ đến nhân viên phù hợp. Tuy nhiên, chúng ta nhận được đánh giá thấp về việc tiếp thị các sản phẩm khác. Tôi muốn tất cả giám sát viên nói chuyện với nhân viên của họ về chiến lược quảng bá sản phẩm và dịch vụ cho khách hàng."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "89. Why does the speaker call employees in early? (A) He wants to pass out some gifts. (B) He expects a busy night. (C) The owner will give a speech. (D) New uniforms have arrived.",
   "transcript": "Oh good. I'm glad to see everyone is here early, as requested. We have an unusually busy night ahead of us—due to the addition of six large group reservations. We'll set up for those first in the overflow room. Tables will need to come out of storage. I'll unlock the door after this meeting. But before you start your shift, make sure to try tonight's specials. They're in their usual spot under the heat lamps. Be sure you promote the truffles dish in particular. We'd like to see if this could be a permanent menu item. Management will be watching closely. Its price point is high, but it really is delicious.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n89. Tại sao người nói gọi nhân viên đến sớm?\n(A) Anh ấy muốn phát quà\n(B) Anh ấy dự đoán buổi tối rất bận\n(C) Chủ sẽ phát biểu\n(D) Đồng phục mới đã về\n\nDịch bài nói:\nNam: Ồ tốt. Tôi vui vì mọi người đến sớm như yêu cầu. Chúng ta có một đêm bận rộn bất thường phía trước—do thêm sáu nhóm đặt chỗ lớn. Chúng ta sẽ chuẩn bị cho họ trước ở phòng dư. Bàn cần lấy từ kho. Tôi sẽ mở khóa cửa sau cuộc họp này. Nhưng trước khi bắt đầu ca làm, hãy chắc chắn thử món đặc biệt tối nay. Chúng ở vị trí thường lệ dưới đèn sưởi. Hãy chắc chắn quảng bá món nấm truffle đặc biệt. Chúng tôi muốn xem liệu có thể là món thường trực không. Ban quản lý sẽ theo dõi chặt chẽ. Giá cao, nhưng thực sự ngon."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "90. What should be retrieved from storage? (A) Promotional signs (B) Heat lamps (C) Extra tables (D) Storage containers",
   "transcript": "Oh good. I'm glad to see everyone is here early, as requested. We have an unusually busy night ahead of us—due to the addition of six large group reservations. We'll set up for those first in the overflow room. Tables will need to come out of storage. I'll unlock the door after this meeting. But before you start your shift, make sure to try tonight's specials. They're in their usual spot under the heat lamps. Be sure you promote the truffles dish in particular. We'd like to see if this could be a permanent menu item. Management will be watching closely. Its price point is high, but it really is delicious.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n90. Cần lấy gì từ kho?\n(A) Biển quảng cáo\n(B) Đèn sưởi\n(C) Bàn phụ\n(D) Thùng chứa\n\nDịch bài nói:\nNam: Ồ tốt. Tôi vui vì mọi người đến sớm như yêu cầu. Chúng ta có một đêm bận rộn bất thường phía trước—do thêm sáu nhóm đặt chỗ lớn. Chúng ta sẽ chuẩn bị cho họ trước ở phòng dư. Bàn cần lấy từ kho. Tôi sẽ mở khóa cửa sau cuộc họp này. Nhưng trước khi bắt đầu ca làm, hãy chắc chắn thử món đặc biệt tối nay. Chúng ở vị trí thường lệ dưới đèn sưởi. Hãy chắc chắn quảng bá món nấm truffle đặc biệt. Chúng tôi muốn xem liệu có thể là món thường trực không. Ban quản lý sẽ theo dõi chặt chẽ. Giá cao, nhưng thực sự ngon."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "A",
   "group": "89-91",
   "textEn": "91. What does the speaker mean when he says, “Management will be watching closely”? (A) A decision about an item will be made soon. (B) A client may not renew a contract. (C) A large profit is expected. (D) More people might be hired.",
   "transcript": "Oh good. I'm glad to see everyone is here early, as requested. We have an unusually busy night ahead of us—due to the addition of six large group reservations. We'll set up for those first in the overflow room. Tables will need to come out of storage. I'll unlock the door after this meeting. But before you start your shift, make sure to try tonight's specials. They're in their usual spot under the heat lamps. Be sure you promote the truffles dish in particular. We'd like to see if this could be a permanent menu item. Management will be watching closely. Its price point is high, but it really is delicious.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n91. Người nói có ý gì khi nói “Ban quản lý sẽ theo dõi sát sao”?\n(A) Một quyết định sắp được đưa ra\n(B) Khách hàng có thể không gia hạn hợp đồng\n(C) Lợi nhuận lớn được kỳ vọng\n(D) Có thể sẽ tuyển thêm người\n\nDịch bài nói:\nNam: Ồ tốt. Tôi vui vì mọi người đến sớm như yêu cầu. Chúng ta có một đêm bận rộn bất thường phía trước—do thêm sáu nhóm đặt chỗ lớn. Chúng ta sẽ chuẩn bị cho họ trước ở phòng dư. Bàn cần lấy từ kho. Tôi sẽ mở khóa cửa sau cuộc họp này. Nhưng trước khi bắt đầu ca làm, hãy chắc chắn thử món đặc biệt tối nay. Chúng ở vị trí thường lệ dưới đèn sưởi. Hãy chắc chắn quảng bá món nấm truffle đặc biệt. Chúng tôi muốn xem liệu có thể là món thường trực không. Ban quản lý sẽ theo dõi chặt chẽ. Giá cao, nhưng thực sự ngon."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "92. What type of news is the broadcast about? (A) Travel (B) Art (C) Financial (D) Sports",
   "transcript": "Hello, and welcome to WBCO financial news. Tonight, we're talking about the prices we pay online for goods and services. In particular, we'll look at why you may pay more if you shop during times of peak demand. Called surge pricing, this trend first started with computer software that allowed large airlines to track demand and quickly change their ticket prices. That technology is now widely available. You may find that even small businesses charge more when demand is higher. Our guest today is Professor Yun Hang, a leading expert on the topic. Last month he was the featured speaker at the International Economics Summit.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n92. Phát sóng tin tức nói về chủ đề gì?\n(A) Du lịch\n(B) Nghệ thuật\n(C) Tài chính\n(D) Thể thao\n\nDịch bài nói:\nNữ: Xin chào, và chào mừng đến với tin tức tài chính WBCO. Tối nay, chúng ta nói về giá chúng ta trả trực tuyến cho hàng hóa và dịch vụ. Đặc biệt, chúng ta sẽ xem tại sao bạn có thể trả nhiều hơn nếu mua sắm trong thời gian nhu cầu cao điểm. Gọi là giá tăng vọt, xu hướng này bắt đầu với phần mềm máy tính cho phép hãng hàng không lớn theo dõi nhu cầu và thay đổi giá vé nhanh chóng. Công nghệ đó giờ phổ biến rộng rãi. Bạn có thể thấy ngay cả doanh nghiệp nhỏ cũng tính phí cao hơn khi nhu cầu cao. Khách mời hôm nay là Giáo sư Yun Hang, chuyên gia hàng đầu về chủ đề. Tháng trước ông là diễn giả nổi bật tại Hội nghị Thượng đỉnh Kinh tế Quốc tế."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "93. Why does the speaker say, “That technology is now widely available”? (A) To praise a marketing plan (B) To recommend a computer application (C) To explain the growth of a trend (D) To correct some wrong information",
   "transcript": "Hello, and welcome to WBCO financial news. Tonight, we're talking about the prices we pay online for goods and services. In particular, we'll look at why you may pay more if you shop during times of peak demand. Called surge pricing, this trend first started with computer software that allowed large airlines to track demand and quickly change their ticket prices. That technology is now widely available. You may find that even small businesses charge more when demand is higher. Our guest today is Professor Yun Hang, a leading expert on the topic. Last month he was the featured speaker at the International Economics Summit.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n93. Tại sao người nói nói “Công nghệ đó hiện đã phổ biến rộng rãi”?\n(A) Để khen một kế hoạch marketing\n(B) Để khuyến nghị một ứng dụng\n(C) Để giải thích xu hướng\n(D) Để sửa thông tin sai\n\nDịch bài nói:\nNữ: Xin chào, và chào mừng đến với tin tức tài chính WBCO. Tối nay, chúng ta nói về giá chúng ta trả trực tuyến cho hàng hóa và dịch vụ. Đặc biệt, chúng ta sẽ xem tại sao bạn có thể trả nhiều hơn nếu mua sắm trong thời gian nhu cầu cao điểm. Gọi là giá tăng vọt, xu hướng này bắt đầu với phần mềm máy tính cho phép hãng hàng không lớn theo dõi nhu cầu và thay đổi giá vé nhanh chóng. Công nghệ đó giờ phổ biến rộng rãi. Bạn có thể thấy ngay cả doanh nghiệp nhỏ cũng tính phí cao hơn khi nhu cầu cao. Khách mời hôm nay là Giáo sư Yun Hang, chuyên gia hàng đầu về chủ đề. Tháng trước ông là diễn giả nổi bật tại Hội nghị Thượng đỉnh Kinh tế Quốc tế."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "94. What did Professor Yun Hang do last month? (A) He spoke at a conference. (B) He published a book. (C) He started a business. (D) He won an award.",
   "transcript": "Hello, and welcome to WBCO financial news. Tonight, we're talking about the prices we pay online for goods and services. In particular, we'll look at why you may pay more if you shop during times of peak demand. Called surge pricing, this trend first started with computer software that allowed large airlines to track demand and quickly change their ticket prices. That technology is now widely available. You may find that even small businesses charge more when demand is higher. Our guest today is Professor Yun Hang, a leading expert on the topic. Last month he was the featured speaker at the International Economics Summit.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n94. Tháng trước Giáo sư Yun Hang đã làm gì?\n(A) Phát biểu tại hội nghị\n(B) Xuất bản sách\n(C) Khởi nghiệp\n(D) Nhận giải thưởng\n\nDịch bài nói:\nNữ: Xin chào, và chào mừng đến với tin tức tài chính WBCO. Tối nay, chúng ta nói về giá chúng ta trả trực tuyến cho hàng hóa và dịch vụ. Đặc biệt, chúng ta sẽ xem tại sao bạn có thể trả nhiều hơn nếu mua sắm trong thời gian nhu cầu cao điểm. Gọi là giá tăng vọt, xu hướng này bắt đầu với phần mềm máy tính cho phép hãng hàng không lớn theo dõi nhu cầu và thay đổi giá vé nhanh chóng. Công nghệ đó giờ phổ biến rộng rãi. Bạn có thể thấy ngay cả doanh nghiệp nhỏ cũng tính phí cao hơn khi nhu cầu cao. Khách mời hôm nay là Giáo sư Yun Hang, chuyên gia hàng đầu về chủ đề. Tháng trước ông là diễn giả nổi bật tại Hội nghị Thượng đỉnh Kinh tế Quốc tế."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "95. Why is the speaker calling? (A) To file a complaint (B) To purchase some tickets (C) To revise an order (D) To promote a product",
   "transcript": "Hi. This is Liam from Oceania Flowers. I'm calling about our print order for coupons. We originally said we needed the coupons by Friday, but we now need them to be ready by Wednesday instead. We just found out yesterday that our application to the National Florists Association was approved. We'll be attending their annual Floral Show in Richmond this weekend. Oh, one other thing—we'd also like to change the limit to five items on the coupon. Can you take care of that before you start printing? Thank you!",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n95. Tại sao người nói gọi điện?\n(A) Để khiếu nại\n(B) Để mua vé\n(C) Để sửa đơn hàng\n(D) Để quảng bá sản phẩm\n\nDịch bài nói:\nNam: Chào. Đây là Liam từ Oceania Flowers. Tôi gọi về đơn in phiếu giảm giá. Ban đầu chúng tôi nói cần phiếu vào thứ Sáu, nhưng giờ cần sẵn sàng vào thứ Tư thay thế. Chúng tôi vừa biết hôm qua đơn xin vào Hiệp hội Florists Quốc gia được phê duyệt. Chúng tôi sẽ tham dự Triển lãm Hoa hàng năm của họ ở Richmond cuối tuần này. Ồ, một việc nữa—chúng tôi cũng muốn thay đổi giới hạn thành năm mặt hàng trên phiếu. Bạn có thể xử lý trước khi in không? Cảm ơn!"
  },
  {
   "number": 96,
   "part": 4,
   "answer": "B",
   "group": "95-97",
   "textEn": "96. What did the speaker find out yesterday? (A) A printer was replaced. (B) An application was approved. (C) A sales event was announced. (D) A lease was extended.",
   "transcript": "Hi. This is Liam from Oceania Flowers. I'm calling about our print order for coupons. We originally said we needed the coupons by Friday, but we now need them to be ready by Wednesday instead. We just found out yesterday that our application to the National Florists Association was approved. We'll be attending their annual Floral Show in Richmond this weekend. Oh, one other thing—we'd also like to change the limit to five items on the coupon. Can you take care of that before you start printing? Thank you!",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n96. Hôm qua người nói phát hiện điều gì?\n(A) Một máy in đã được thay\n(B) Một đơn đã được phê duyệt\n(C) Một sự kiện giảm giá được công bố\n(D) Một hợp đồng thuê được gia hạn\n\nDịch bài nói:\nNam: Chào. Đây là Liam từ Oceania Flowers. Tôi gọi về đơn in phiếu giảm giá. Ban đầu chúng tôi nói cần phiếu vào thứ Sáu, nhưng giờ cần sẵn sàng vào thứ Tư thay thế. Chúng tôi vừa biết hôm qua đơn xin vào Hiệp hội Florists Quốc gia được phê duyệt. Chúng tôi sẽ tham dự Triển lãm Hoa hàng năm của họ ở Richmond cuối tuần này. Ồ, một việc nữa—chúng tôi cũng muốn thay đổi giới hạn thành năm mặt hàng trên phiếu. Bạn có thể xử lý trước khi in không? Cảm ơn!"
  },
  {
   "number": 97,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "97. Look at the graphic. Which number does the speaker want to change? (A) 2005 (B) 25 (C) 2 (D) 6",
   "transcript": "Hi. This is Liam from Oceania Flowers. I'm calling about our print order for coupons. We originally said we needed the coupons by Friday, but we now need them to be ready by Wednesday instead. We just found out yesterday that our application to the National Florists Association was approved. We'll be attending their annual Floral Show in Richmond this weekend. Oh, one other thing—we'd also like to change the limit to five items on the coupon. Can you take care of that before you start printing? Thank you!",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n97. Nhìn vào hình. Người nói muốn thay đổi số nào?\n(A) 2005\n(B) 25\n(C) 2\n(D) 6\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nNam: Chào. Đây là Liam từ Oceania Flowers. Tôi gọi về đơn in phiếu giảm giá. Ban đầu chúng tôi nói cần phiếu vào thứ Sáu, nhưng giờ cần sẵn sàng vào thứ Tư thay thế. Chúng tôi vừa biết hôm qua đơn xin vào Hiệp hội Florists Quốc gia được phê duyệt. Chúng tôi sẽ tham dự Triển lãm Hoa hàng năm của họ ở Richmond cuối tuần này. Ồ, một việc nữa—chúng tôi cũng muốn thay đổi giới hạn thành năm mặt hàng trên phiếu. Bạn có thể xử lý trước khi in không? Cảm ơn!"
  },
  {
   "number": 98,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "98. Who most likely is the listener? (A) An actor (B) A photographer (C) A writer (D) An athlete",
   "transcript": "Hi, Takuma. Good news—you got your first television audition! It's for a role in a TV drama. I've sent an e-mail with the script and details. Since you're auditioning to join the cast of an ongoing show, you should watch some videos of previous episodes so you understand the role. One last note—since you're new to the city, you might be wondering about the best bus route to take. You could take the green line to Orchard, but I'd recommend taking the yellow line to the last stop. It's a longer route, but the last stop is closer to the studio.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n98. Người nghe có khả năng là ai?\n(A) Diễn viên\n(B) Nhiếp ảnh gia\n(C) Nhà văn\n(D) Vận động viên\n\nDịch bài nói:\nNam: Chào Takuma. Tin tốt—bạn có buổi thử giọng truyền hình đầu tiên! Đó là vai trong phim truyền hình. Tôi đã gửi email với kịch bản và chi tiết. Vì bạn thử giọng để tham gia dàn diễn viên của chương trình đang diễn ra, bạn nên xem video các tập trước để hiểu vai. Một lưu ý cuối—vì bạn mới đến thành phố, bạn có thể đang tự hỏi tuyến bus tốt nhất. Bạn có thể đi tuyến xanh đến Orchard, nhưng tôi khuyên đi tuyến vàng đến điểm dừng cuối. Đó là tuyến dài hơn, nhưng điểm dừng cuối gần studio hơn."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "B",
   "group": "98-100",
   "textEn": "99. According to the speaker, what should the listener do to prepare? (A) Update a résumé (B) Review some videos (C) Contact a colleague (D) Make a recording",
   "transcript": "Hi, Takuma. Good news—you got your first television audition! It's for a role in a TV drama. I've sent an e-mail with the script and details. Since you're auditioning to join the cast of an ongoing show, you should watch some videos of previous episodes so you understand the role. One last note—since you're new to the city, you might be wondering about the best bus route to take. You could take the green line to Orchard, but I'd recommend taking the yellow line to the last stop. It's a longer route, but the last stop is closer to the studio.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n99. Theo người nói, người nghe nên chuẩn bị gì?\n(A) Cập nhật CV\n(B) Xem lại một số video\n(C) Liên hệ đồng nghiệp\n(D) Ghi âm một đoạn\n\nDịch bài nói:\nNam: Chào Takuma. Tin tốt—bạn có buổi thử giọng truyền hình đầu tiên! Đó là vai trong phim truyền hình. Tôi đã gửi email với kịch bản và chi tiết. Vì bạn thử giọng để tham gia dàn diễn viên của chương trình đang diễn ra, bạn nên xem video các tập trước để hiểu vai. Một lưu ý cuối—vì bạn mới đến thành phố, bạn có thể đang tự hỏi tuyến bus tốt nhất. Bạn có thể đi tuyến xanh đến Orchard, nhưng tôi khuyên đi tuyến vàng đến điểm dừng cuối. Đó là tuyến dài hơn, nhưng điểm dừng cuối gần studio hơn."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "100. Look at the graphic. Which bus stop does the speaker recommend getting off at? (A) Orchard (B) Heath (C) Grove (D) Meadow",
   "transcript": "Hi, Takuma. Good news—you got your first television audition! It's for a role in a TV drama. I've sent an e-mail with the script and details. Since you're auditioning to join the cast of an ongoing show, you should watch some videos of previous episodes so you understand the role. One last note—since you're new to the city, you might be wondering about the best bus route to take. You could take the green line to Orchard, but I'd recommend taking the yellow line to the last stop. It's a longer route, but the last stop is closer to the studio.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n100. Nhìn vào bản đồ xe buýt. Người nói khuyên xuống tại trạm nào?\n(A) Orchard\n(B) Heath\n(C) Grove\n(D) Meadow\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nNam: Chào Takuma. Tin tốt—bạn có buổi thử giọng truyền hình đầu tiên! Đó là vai trong phim truyền hình. Tôi đã gửi email với kịch bản và chi tiết. Vì bạn thử giọng để tham gia dàn diễn viên của chương trình đang diễn ra, bạn nên xem video các tập trước để hiểu vai. Một lưu ý cuối—vì bạn mới đến thành phố, bạn có thể đang tự hỏi tuyến bus tốt nhất. Bạn có thể đi tuyến xanh đến Orchard, nhưng tôi khuyên đi tuyến vàng đến điểm dừng cuối. Đó là tuyến dài hơn, nhưng điểm dừng cuối gần studio hơn."
  }
 ],
 "4": [
  {
   "number": 1,
   "part": 1,
   "answer": "C",
   "textEn": "(A) She's crossing a busy street. (B) She's removing her eyeglasses. (C) She's standing next to a bin. (D) She's getting into a taxicab.",
   "transcript": "(A) She's crossing a busy street.\n(B) She's removing her eyeglasses.\n(C) She's standing next to a bin.\n(D) She's getting into a taxicab.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Cô ấy đang băng qua một con phố đông đúc.\n(B) Cô ấy đang tháo kính mắt.\n(C) Cô ấy đang đứng bên cạnh một thùng rác.\n(D) Cô ấy đang lên taxi."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Some trucks have stopped at a traffic signal. (B) Some lights are being installed above a garage door. (C) A garden is being planted along a fence. (D) Several vehicles are parked outside a building.",
   "transcript": "(A) Some trucks have stopped at a traffic signal.\n(B) Some lights are being installed above a garage door.\n(C) A garden is being planted along a fence.\n(D) Several vehicles are parked outside a building.",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Một số xe tải đã dừng tại tín hiệu giao thông.\n(B) Một số đèn đang được lắp đặt phía trên cửa gara.\n(C) Một khu vườn đang được trồng dọc theo hàng rào.\n(D) Một số phương tiện đang đậu ngoài một tòa nhà."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "A",
   "textEn": "(A) A woman is following a man down a corridor. (B) A woman is putting together some cardboard boxes. (C) A man is emptying a large container. (D) A man is climbing up a ladder.",
   "transcript": "(A) A woman is following a man down a corridor.\n(B) A woman is putting together some cardboard boxes.\n(C) A man is emptying a large container.\n(D) A man is climbing up a ladder.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một người phụ nữ đang đi theo một người đàn ông dọc hành lang.\n(B) Một người phụ nữ đang ghép các hộp carton lại với nhau.\n(C) Một người đàn ông đang đổ rỗng một thùng chứa lớn.\n(D) Một người đàn ông đang leo lên thang."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "B",
   "textEn": "(A) He's clearing some snow off a path. (B) He's pulling a cart on a walkway. (C) He's leaning over to tie his shoe. (D) He's taking some items out of a basket.",
   "transcript": "(A) He's clearing some snow off a path.\n(B) He's pulling a cart on a walkway.\n(C) He's leaning over to tie his shoe.\n(D) He's taking some items out of a basket.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Anh ấy đang dọn tuyết khỏi lối đi.\n(B) Anh ấy đang kéo một chiếc xe đẩy trên lối đi bộ.\n(C) Anh ấy đang cúi xuống để buộc dây giày.\n(D) Anh ấy đang lấy một số vật dụng ra khỏi giỏ."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "A",
   "textEn": "(A) One of the women is carrying a bag on her shoulder. (B) One of the women is placing her luggage on a scale. (C) Some suitcases have been lined up against the wall. (D) Some clothes are being packed in a bag.",
   "transcript": "(A) One of the women is carrying a bag on her shoulder.\n(B) One of the women is placing her luggage on a scale.\n(C) Some suitcases have been lined up against the wall.\n(D) Some clothes are being packed in a bag.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một trong những người phụ nữ đang mang túi trên vai.\n(B) Một trong những người phụ nữ đang đặt hành lý lên cân.\n(C) Một số vali đã được xếp dọc theo tường.\n(D) Một số quần áo đang được đóng gói vào túi."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some customers are drinking from coffee cups. (B) Some coffee cups have been placed on a counter. (C) Some aprons are hanging from hooks. (D) One of the workers is wiping down a counter.",
   "transcript": "(A) Some customers are drinking from coffee cups.\n(B) Some coffee cups have been placed on a counter.\n(C) Some aprons are hanging from hooks.\n(D) One of the workers is wiping down a counter.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một số khách hàng đang uống từ cốc cà phê.\n(B) Một số cốc cà phê đã được đặt trên quầy.\n(C) Một số tạp dề đang treo trên móc.\n(D) Một trong những công nhân đang lau chùi quầy."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "C",
   "textEn": "Will you let me know when the catering order arrives? (A) A reservation for two. (B) The front office. (C) Sure, I'll text you.",
   "transcript": "Will you let me know when the catering order arrives?\n(A) A reservation for two.\n(B) The front office.\n(C) Sure, I'll text you.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Bạn sẽ cho tôi biết khi đơn hàng dịch vụ ăn uống đến chứ?\n(A) Đặt chỗ cho hai người.\n(B) Văn phòng phía trước.\n(C) Chắc chắn rồi, tôi sẽ nhắn tin cho bạn."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "C",
   "textEn": "Why is the manager being replaced? (A) Let's do that. (B) I prefer working with a team. (C) Because she's leaving the company.",
   "transcript": "Why is the manager being replaced?\n(A) Let's do that.\n(B) I prefer working with a team.\n(C) Because she's leaving the company.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Tại sao quản lý bị thay thế?\n(A) Hãy làm điều đó.\n(B) Tôi thích làm việc với nhóm.\n(C) Bởi vì cô ấy đang rời khỏi công ty."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "C",
   "textEn": "Ms. Cho should close the store early on Friday. (A) I prefer a salad. (B) Cash register four. (C) Yes, I agree.",
   "transcript": "Ms. Cho should close the store early on Friday.\n(A) I prefer a salad.\n(B) Cash register four.\n(C) Yes, I agree.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Cô Cho nên đóng cửa hàng sớm vào thứ Sáu.\n(A) Tôi thích salad hơn.\n(B) Máy tính tiền số bốn.\n(C) Vâng, tôi đồng ý."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "B",
   "textEn": "Why did you decide to become a pilot? (A) Is there free Internet access? (B) I enjoy traveling. (C) He's on vacation in Argentina.",
   "transcript": "Why did you decide to become a pilot?\n(A) Is there free Internet access?\n(B) I enjoy traveling.\n(C) He's on vacation in Argentina.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Tại sao bạn quyết định trở thành phi công?\n(A) Có truy cập Internet miễn phí không?\n(B) Tôi thích du lịch.\n(C) Anh ấy đang nghỉ phép ở Argentina."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "C",
   "textEn": "Have you always commuted by train? (A) The training starts at two o'clock. (B) I think the station is on Mulberry Avenue. (C) Yes, because I don't have a car.",
   "transcript": "Have you always commuted by train?\n(A) The training starts at two o'clock.\n(B) I think the station is on Mulberry Avenue.\n(C) Yes, because I don't have a car.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Bạn có luôn đi làm bằng tàu không?\n(A) Buổi đào tạo bắt đầu lúc hai giờ.\n(B) Tôi nghĩ ga ở trên đại lộ Mulberry.\n(C) Vâng, vì tôi không có xe hơi."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "A",
   "textEn": "When does your manager usually come in? (A) Early in the morning. (B) No, I just left it there. (C) I haven't—thanks.",
   "transcript": "When does your manager usually come in?\n(A) Early in the morning.\n(B) No, I just left it there.\n(C) I haven't—thanks.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Quản lý của bạn thường đến lúc nào?\n(A) Sáng sớm.\n(B) Không, tôi vừa để nó ở đó.\n(C) Tôi chưa—cảm ơn."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "A",
   "textEn": "Isn't there a discount on this computer monitor? (A) Yes, a ten percent discount. (B) An inventory check. (C) Mine is broken.",
   "transcript": "Isn't there a discount on this computer monitor?\n(A) Yes, a ten percent discount.\n(B) An inventory check.\n(C) Mine is broken.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Không có giảm giá cho màn hình máy tính này sao?\n(A) Có, giảm 10 phần trăm.\n(B) Kiểm tra hàng tồn kho.\n(C) Cái của tôi bị hỏng."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "B",
   "textEn": "How is the new group of interns doing? (A) No, we have five people in total. (B) I haven't heard any negative feedback at all. (C) Let's pose for a group photo over there.",
   "transcript": "How is the new group of interns doing?\n(A) No, we have five people in total.\n(B) I haven't heard any negative feedback at all.\n(C) Let's pose for a group photo over there.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Nhóm thực tập sinh mới thế nào?\n(A) Không, chúng tôi có tổng cộng năm người.\n(B) Tôi chưa nghe phản hồi tiêu cực nào cả.\n(C) Hãy chụp ảnh nhóm ở đằng kia."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "C",
   "textEn": "They're carrying those boxes to the storage room. (A) That's a good price. (B) No, the store opens at noon today. (C) I'll go with them.",
   "transcript": "They're carrying those boxes to the storage room.\n(A) That's a good price.\n(B) No, the store opens at noon today.\n(C) I'll go with them.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Họ đang mang những hộp đó đến phòng lưu trữ.\n(A) Đó là giá tốt.\n(B) Không, cửa hàng mở cửa lúc trưa nay.\n(C) Tôi sẽ đi với họ."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "A",
   "textEn": "Where can I send the money? (A) To my bank account. (B) I think that's expensive, too. (C) By next Tuesday.",
   "transcript": "Where can I send the money?\n(A) To my bank account.\n(B) I think that's expensive, too.\n(C) By next Tuesday.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Tôi có thể gửi tiền đến đâu?\n(A) Đến tài khoản ngân hàng của tôi.\n(B) Tôi nghĩ cái đó cũng đắt.\n(C) Trước thứ Ba tuần tới."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "A",
   "textEn": "Who's coming in tomorrow to help us prepare for the grand opening? (A) Rebecca and Malik. (B) An online job posting. (C) Some sales data.",
   "transcript": "Who's coming in tomorrow to help us prepare for the grand opening?\n(A) Rebecca and Malik.\n(B) An online job posting.\n(C) Some sales data.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Ai sẽ đến vào ngày mai để giúp chúng ta chuẩn bị cho lễ khai trương?\n(A) Rebecca và Malik.\n(B) Một bài đăng tuyển dụng trực tuyến.\n(C) Một số dữ liệu bán hàng."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "B",
   "textEn": "How often does the bus stop at this location? (A) I'll be visiting the office. (B) About every twenty minutes. (C) A city council meeting.",
   "transcript": "How often does the bus stop at this location?\n(A) I'll be visiting the office.\n(B) About every twenty minutes.\n(C) A city council meeting.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Xe buýt dừng ở vị trí này bao lâu một lần?\n(A) Tôi sẽ đến thăm văn phòng.\n(B) Khoảng mỗi hai mươi phút.\n(C) Một cuộc họp hội đồng thành phố."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "A",
   "textEn": "What's the candidate review process? (A) We review the résumés first. (B) A few good reviews. (C) OK—I'll just follow them.",
   "transcript": "What's the candidate review process?\n(A) We review the résumés first.\n(B) A few good reviews.\n(C) OK—I'll just follow them.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Quy trình xem xét ứng viên là gì?\n(A) Chúng tôi xem xét sơ yếu lý lịch trước.\n(B) Một vài đánh giá tốt.\n(C) Được rồi—Tôi sẽ chỉ theo họ."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "C",
   "textEn": "There's coffee in the break room, right? (A) That shift starts at noon. (B) We decided to paint this room gray. (C) Yes—I just made a fresh pot.",
   "transcript": "There's coffee in the break room, right?\n(A) That shift starts at noon.\n(B) We decided to paint this room gray.\n(C) Yes—I just made a fresh pot.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Có cà phê trong phòng nghỉ, phải không?\n(A) Ca làm việc đó bắt đầu lúc trưa.\n(B) Chúng tôi quyết định sơn phòng này màu xám.\n(C) Vâng—Tôi vừa pha một bình mới."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "B",
   "textEn": "Who's going to the company picnic today? (A) About two hours long. (B) I'm leaving in a few minutes. (C) A two-year maintenance contract.",
   "transcript": "Who's going to the company picnic today?\n(A) About two hours long.\n(B) I'm leaving in a few minutes.\n(C) A two-year maintenance contract.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Ai sẽ đi dã ngoại công ty hôm nay?\n(A) Khoảng hai giờ.\n(B) Tôi sẽ rời đi trong vài phút.\n(C) Hợp đồng bảo trì hai năm."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "A",
   "textEn": "Will the bakery be open tomorrow? (A) No, it's closed until mid-August. (B) Have you checked the oven? (C) The pound cake is delicious.",
   "transcript": "Will the bakery be open tomorrow?\n(A) No, it's closed until mid-August.\n(B) Have you checked the oven?\n(C) The pound cake is delicious.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Tiệm bánh sẽ mở cửa ngày mai chứ?\n(A) Không, đóng cửa đến giữa tháng Tám.\n(B) Bạn đã kiểm tra lò nướng chưa?\n(C) Bánh pound ngon."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "B",
   "textEn": "Are you installing the new software on Monday or Tuesday? (A) Thanks, but they already have one. (B) I'll be out of the office all week. (C) It was an older model laptop.",
   "transcript": "Are you installing the new software on Monday or Tuesday?\n(A) Thanks, but they already have one.\n(B) I'll be out of the office all week.\n(C) It was an older model laptop.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Bạn đang cài đặt phần mềm mới vào thứ Hai hay thứ Ba?\n(A) Cảm ơn, nhưng họ đã có một cái.\n(B) Tôi sẽ vắng văn phòng cả tuần.\n(C) Đó là mẫu laptop cũ hơn."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "C",
   "textEn": "Let me find a sales associate to help you. (A) At the top of the list. (B) My article is ready to be uploaded. (C) I just found what I'm looking for.",
   "transcript": "Let me find a sales associate to help you.\n(A) At the top of the list.\n(B) My article is ready to be uploaded.\n(C) I just found what I'm looking for.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Để tôi tìm nhân viên bán hàng giúp bạn.\n(A) Ở đầu danh sách.\n(B) Bài viết của tôi sẵn sàng để tải lên.\n(C) Tôi vừa tìm thấy thứ tôi đang tìm."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "You're offering discounts to students, right? (A) No, that's not my wallet. (B) You'll need valid identification. (C) I'm doing inventory this weekend.",
   "transcript": "You're offering discounts to students, right?\n(A) No, that's not my wallet.\n(B) You'll need valid identification.\n(C) I'm doing inventory this weekend.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Bạn đang cung cấp giảm giá cho sinh viên, phải không?\n(A) Không, đó không phải ví của tôi.\n(B) Bạn sẽ cần giấy tờ tùy thân hợp lệ.\n(C) Tôi đang kiểm kê hàng tồn kho cuối tuần này."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "A",
   "textEn": "The sales department posted an advertisement for an assistant. (A) I didn't know they were hiring. (B) An additional charge for shipping. (C) No, I haven't been there.",
   "transcript": "The sales department posted an advertisement for an assistant.\n(A) I didn't know they were hiring.\n(B) An additional charge for shipping.\n(C) No, I haven't been there.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Bộ phận bán hàng đã đăng quảng cáo tuyển trợ lý.\n(A) Tôi không biết họ đang tuyển dụng.\n(B) Phí vận chuyển bổ sung.\n(C) Không, tôi chưa từng đến đó."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "A",
   "textEn": "Does the new accounting software work well? (A) I haven't downloaded it yet. (B) We're not offering a discount. (C) That was my reaction too.",
   "transcript": "Does the new accounting software work well?\n(A) I haven't downloaded it yet.\n(B) We're not offering a discount.\n(C) That was my reaction too.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Phần mềm kế toán mới có hoạt động tốt không?\n(A) Tôi chưa tải xuống.\n(B) Chúng tôi không cung cấp giảm giá.\n(C) Đó cũng là phản ứng của tôi."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "A",
   "textEn": "When's the finance department going to confirm our first-quarter budget? (A) Their deadline is next week. (B) Yes, I'll be there. (C) In the mail room.",
   "transcript": "When's the finance department going to confirm our first-quarter budget?\n(A) Their deadline is next week.\n(B) Yes, I'll be there.\n(C) In the mail room.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCâu hỏi: Bộ phận tài chính sẽ xác nhận ngân sách quý đầu tiên của chúng ta khi nào?\n(A) Hạn chót của họ là tuần tới.\n(B) Vâng, tôi sẽ ở đó.\n(C) Trong phòng thư."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "B",
   "textEn": "Who canceled the conference call? (A) The upstairs conference room. (B) It's been rescheduled. (C) Yes, you can.",
   "transcript": "Who canceled the conference call?\n(A) The upstairs conference room.\n(B) It's been rescheduled.\n(C) Yes, you can.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Ai đã hủy cuộc gọi hội nghị?\n(A) Phòng hội nghị tầng trên.\n(B) Nó đã được lên lịch lại.\n(C) Vâng, bạn có thể."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "C",
   "textEn": "Can you please transfer the service to my new phone? (A) Let's put it in the backseat. (B) At the Maple Street station. (C) There is a processing fee.",
   "transcript": "Can you please transfer the service to my new phone?\n(A) Let's put it in the backseat.\n(B) At the Maple Street station.\n(C) There is a processing fee.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCâu hỏi: Bạn có thể chuyển dịch vụ sang điện thoại mới của tôi không?\n(A) Hãy đặt nó ở ghế sau.\n(B) Tại ga Maple Street.\n(C) Có phí xử lý."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "B",
   "textEn": "How was today's manufacturing seminar? (A) A new pair of shoes. (B) We didn't get there in time. (C) There's a user's manual in the drawer.",
   "transcript": "How was today's manufacturing seminar?\n(A) A new pair of shoes.\n(B) We didn't get there in time.\n(C) There's a user's manual in the drawer.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nCâu hỏi: Buổi hội thảo sản xuất hôm nay thế nào?\n(A) Một đôi giày mới.\n(B) Chúng tôi không đến kịp giờ.\n(C) Có hướng dẫn sử dụng trong ngăn kéo."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "32. Who most likely is the woman? (A) A landscape architect (B) An interior designer (C) A real estate agent (D) A building inspector",
   "transcript": "W: Good morning. Thanks for coming to tour this apartment building. M I'm glad I could visit in person. I've always wanted to live in this neighborhood—it's so beautiful. This building is brand-new, isn't it?\nW: Yes. In fact, you'd be among the very first tenants if you decide to move here. Before you look at some apartments, would you please sign your name here in our guest book? M Oh, of course..",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n32. Người phụ nữ có khả năng là ai?\n(A) Kiến trúc sư cảnh quan\n(B) Nhà thiết kế nội thất\n(C) Nhân viên môi giới bất động sản\n(D) Giám đốc tòa nhà\n\nDịch hội thoại:\nNữ: Chào buổi sáng. Cảm ơn vì đã đến tham quan tòa nhà chung cư này.\nNam: Tôi rất vui vì có thể đến trực tiếp. Tôi luôn muốn sống ở khu phố này—nó thật đẹp. Tòa nhà này là mới xây, phải không?\nNữ: Đúng vậy. Thực ra, nếu bạn quyết định chuyển đến đây, bạn sẽ là một trong những người thuê đầu tiên. Trước khi xem một số căn hộ, bạn vui lòng ký tên vào sổ khách ở đây chứ?\nNam: Ồ, tất nhiên.."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "A",
   "group": "32-34",
   "textEn": "33. What is the man looking forward to? (A) Living in a particular area (B) Walking to work (C) Going on vacation (D) Saving money for a house",
   "transcript": "W: Good morning. Thanks for coming to tour this apartment building. M I'm glad I could visit in person. I've always wanted to live in this neighborhood—it's so beautiful. This building is brand-new, isn't it?\nW: Yes. In fact, you'd be among the very first tenants if you decide to move here. Before you look at some apartments, would you please sign your name here in our guest book? M Oh, of course..",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n33. Người phụ nữ đang mong chờ điều gì?\n(A) Sống tại một khu vực cụ thể\n(B) Đi bộ đi làm\n(C) Đi nghỉ mát\n(D) Tiết kiệm tiền mua nhà\n\nDịch hội thoại:\nNữ: Chào buổi sáng. Cảm ơn vì đã đến tham quan tòa nhà chung cư này.\nNam: Tôi rất vui vì có thể đến trực tiếp. Tôi luôn muốn sống ở khu phố này—nó thật đẹp. Tòa nhà này là mới xây, phải không?\nNữ: Đúng vậy. Thực ra, nếu bạn quyết định chuyển đến đây, bạn sẽ là một trong những người thuê đầu tiên. Trước khi xem một số căn hộ, bạn vui lòng ký tên vào sổ khách ở đây chứ?\nNam: Ồ, tất nhiên.."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "C",
   "group": "32-34",
   "textEn": "34. What does the woman ask for? (A) Some references (B) Some identification (C) A signature (D) A payment",
   "transcript": "W: Good morning. Thanks for coming to tour this apartment building. M I'm glad I could visit in person. I've always wanted to live in this neighborhood—it's so beautiful. This building is brand-new, isn't it?\nW: Yes. In fact, you'd be among the very first tenants if you decide to move here. Before you look at some apartments, would you please sign your name here in our guest book? M Oh, of course..",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n34. Người phụ nữ yêu cầu điều gì?\n(A) Một số thư giới thiệu\n(B) Một số giấy tờ tùy thân\n(C) Một chữ ký\n(D) Một khoản thanh toán\n\nDịch hội thoại:\nNữ: Chào buổi sáng. Cảm ơn vì đã đến tham quan tòa nhà chung cư này.\nNam: Tôi rất vui vì có thể đến trực tiếp. Tôi luôn muốn sống ở khu phố này—nó thật đẹp. Tòa nhà này là mới xây, phải không?\nNữ: Đúng vậy. Thực ra, nếu bạn quyết định chuyển đến đây, bạn sẽ là một trong những người thuê đầu tiên. Trước khi xem một số căn hộ, bạn vui lòng ký tên vào sổ khách ở đây chứ?\nNam: Ồ, tất nhiên.."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "35. What most likely is the man’s job? (A) Boat crew member (B) Restaurant owner (C) Seafood inspector (D) Delivery truck driver",
   "transcript": "W: Chen, I hope all is going well on your first day. I saw you have some scheduled seafood deliveries across the bay in the Morgan District. Why haven't you left yet?\nM: I wasn't going to head over to that particular area for another hour. Do the restaurants in the Morgan District want their deliveries earlier than scheduled?\nW: No, but I'm concerned about Bay Bridge traffic. It's routinely congested with vehicles. So you should always add at least an extra hour to your trip out there.\nM: Thanks for the tip. I'll also check traffic Webcams on the highway agency's Web site.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n35. Công việc của người đàn ông có khả năng là gì?\n(A) Thành viên thủy thủ đoàn tàu\n(B) Chủ nhà hàng\n(C) Thanh tra hải sản\n(D) Tài xế giao hàng\n\nDịch hội thoại:\nNữ: Chen, hy vọng mọi thứ suôn sẻ trong ngày đầu tiên của bạn. Tôi thấy bạn có lịch giao hải sản qua vịnh đến Quận Morgan. Tại sao bạn chưa khởi hành?\nNam: Tôi định một giờ nữa mới đi đến khu vực đó. Các nhà hàng ở Quận Morgan có muốn nhận hàng sớm hơn lịch không?\nNữ: Không, nhưng tôi lo về tắc nghẽn trên Cầu Bay. Nó thường xuyên kẹt xe. Vì vậy bạn nên luôn thêm ít nhất một giờ nữa cho chuyến đi đến đó.\nNam: Cảm ơn lời khuyên. Tôi cũng sẽ kiểm tra webcam giao thông trên trang web của cơ quan đường cao tốc."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "36. Why is the woman concerned? (A) A road has been temporarily closed. (B) A permit has expired. (C) Traffic may cause a delay. (D) Some supplies are no longer available.",
   "transcript": "W: Chen, I hope all is going well on your first day. I saw you have some scheduled seafood deliveries across the bay in the Morgan District. Why haven't you left yet?\nM: I wasn't going to head over to that particular area for another hour. Do the restaurants in the Morgan District want their deliveries earlier than scheduled?\nW: No, but I'm concerned about Bay Bridge traffic. It's routinely congested with vehicles. So you should always add at least an extra hour to your trip out there.\nM: Thanks for the tip. I'll also check traffic Webcams on the highway agency's Web site.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n36. Tại sao người phụ nữ lo lắng?\n(A) Một con đường đã bị đóng tạm thời\n(B) Giấy phép đã hết hạn\n(C) Giao thông có thể bị chậm\n(D) Một số vật tư không còn có sẵn\n\nDịch hội thoại:\nNữ: Chen, hy vọng mọi thứ suôn sẻ trong ngày đầu tiên của bạn. Tôi thấy bạn có lịch giao hải sản qua vịnh đến Quận Morgan. Tại sao bạn chưa khởi hành?\nNam: Tôi định một giờ nữa mới đi đến khu vực đó. Các nhà hàng ở Quận Morgan có muốn nhận hàng sớm hơn lịch không?\nNữ: Không, nhưng tôi lo về tắc nghẽn trên Cầu Bay. Nó thường xuyên kẹt xe. Vì vậy bạn nên luôn thêm ít nhất một giờ nữa cho chuyến đi đến đó.\nNam: Cảm ơn lời khuyên. Tôi cũng sẽ kiểm tra webcam giao thông trên trang web của cơ quan đường cao tốc."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "37. What does the man say he will check? (A) Some webcams (B) A list of ingredients (C) An address (D) Some maps",
   "transcript": "W: Chen, I hope all is going well on your first day. I saw you have some scheduled seafood deliveries across the bay in the Morgan District. Why haven't you left yet?\nM: I wasn't going to head over to that particular area for another hour. Do the restaurants in the Morgan District want their deliveries earlier than scheduled?\nW: No, but I'm concerned about Bay Bridge traffic. It's routinely congested with vehicles. So you should always add at least an extra hour to your trip out there.\nM: Thanks for the tip. I'll also check traffic Webcams on the highway agency's Web site.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n37. Người đàn ông nói rằng anh ấy sẽ kiểm tra gì?\n(A) Một số webcam\n(B) Danh sách nguyên liệu\n(C) Một địa chỉ\n(D) Một số bản đồ\n\nDịch hội thoại:\nNữ: Chen, hy vọng mọi thứ suôn sẻ trong ngày đầu tiên của bạn. Tôi thấy bạn có lịch giao hải sản qua vịnh đến Quận Morgan. Tại sao bạn chưa khởi hành?\nNam: Tôi định một giờ nữa mới đi đến khu vực đó. Các nhà hàng ở Quận Morgan có muốn nhận hàng sớm hơn lịch không?\nNữ: Không, nhưng tôi lo về tắc nghẽn trên Cầu Bay. Nó thường xuyên kẹt xe. Vì vậy bạn nên luôn thêm ít nhất một giờ nữa cho chuyến đi đến đó.\nNam: Cảm ơn lời khuyên. Tôi cũng sẽ kiểm tra webcam giao thông trên trang web của cơ quan đường cao tốc."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "38. According to the man, what does Pelicon produce? (A) Household cleaners (B) Cosmetics (C) Industrial textiles (D) Pharmaceuticals",
   "transcript": "M: This morning I got an e-mail from Pelicon, a local producer of beauty products. They're interested in purchasing lanolin from us to use in their new line of all-natural makeup.\nW: I'm not sure about that. We're a fairly small farm, and we already sell lanolin to another local business. I'm worried that we don't produce enough lanolin to meet the demand of another client. I don't want to expand and take on more wool production.\nM: But our contract with the business we currently supply lanolin to has almost expired—there's no guarantee it will be renewed. I think you should at least read Pelicon's proposal.\nW: Sure. Can you forward me the e-mail?",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n38. Theo người đàn ông, Pelicon sản xuất gì?\n(A) Chất tẩy rửa gia dụng\n(B) Mỹ phẩm\n(C) Vải công nghiệp\n(D) Dược phẩm\n\nDịch hội thoại:\nNam: Sáng nay tôi nhận được email từ Pelicon, một nhà sản xuất sản phẩm làm đẹp địa phương. Họ quan tâm đến việc mua lanolin từ chúng ta để sử dụng trong dòng trang điểm tự nhiên hoàn toàn mới.\nNữ: Tôi không chắc về điều đó. Chúng ta là một trang trại khá nhỏ, và chúng ta đã bán lanolin cho một doanh nghiệp địa phương khác. Tôi lo rằng chúng ta không sản xuất đủ lanolin để đáp ứng nhu cầu của một khách hàng khác. Tôi không muốn mở rộng và đảm nhận sản xuất len nhiều hơn.\nNam: Nhưng hợp đồng của chúng ta với doanh nghiệp mà chúng ta hiện đang cung cấp lanolin sắp hết hạn—không có gì đảm bảo sẽ được gia hạn. Tôi nghĩ bạn nên ít nhất đọc đề xuất của Pelicon.\nNữ: Được rồi. Bạn có thể chuyển email cho tôi không?"
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What does the woman say she is concerned about? (A) Hiring skilled workers (B) Securing a bank loan (C) Finding transportation (D) Making enough product",
   "transcript": "M: This morning I got an e-mail from Pelicon, a local producer of beauty products. They're interested in purchasing lanolin from us to use in their new line of all-natural makeup.\nW: I'm not sure about that. We're a fairly small farm, and we already sell lanolin to another local business. I'm worried that we don't produce enough lanolin to meet the demand of another client. I don't want to expand and take on more wool production.\nM: But our contract with the business we currently supply lanolin to has almost expired—there's no guarantee it will be renewed. I think you should at least read Pelicon's proposal.\nW: Sure. Can you forward me the e-mail?",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n39. Người phụ nữ nói cô ấy đang lo lắng về điều gì?\n(A) Tuyển dụng công nhân lành nghề\n(B) Đảm bảo khoản vay ngân hàng\n(C) Đảm bảo phương tiện vận chuyển\n(D) Làm đủ sản phẩm\n\nDịch hội thoại:\nNam: Sáng nay tôi nhận được email từ Pelicon, một nhà sản xuất sản phẩm làm đẹp địa phương. Họ quan tâm đến việc mua lanolin từ chúng ta để sử dụng trong dòng trang điểm tự nhiên hoàn toàn mới.\nNữ: Tôi không chắc về điều đó. Chúng ta là một trang trại khá nhỏ, và chúng ta đã bán lanolin cho một doanh nghiệp địa phương khác. Tôi lo rằng chúng ta không sản xuất đủ lanolin để đáp ứng nhu cầu của một khách hàng khác. Tôi không muốn mở rộng và đảm nhận sản xuất len nhiều hơn.\nNam: Nhưng hợp đồng của chúng ta với doanh nghiệp mà chúng ta hiện đang cung cấp lanolin sắp hết hạn—không có gì đảm bảo sẽ được gia hạn. Tôi nghĩ bạn nên ít nhất đọc đề xuất của Pelicon.\nNữ: Được rồi. Bạn có thể chuyển email cho tôi không?"
  },
  {
   "number": 40,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "40. Why does the man recommend reading an e-mail? (A) To consider a business proposal (B) To prepare for a client meeting (C) To view some construction plans (D) To learn the details of a complaint",
   "transcript": "M: This morning I got an e-mail from Pelicon, a local producer of beauty products. They're interested in purchasing lanolin from us to use in their new line of all-natural makeup.\nW: I'm not sure about that. We're a fairly small farm, and we already sell lanolin to another local business. I'm worried that we don't produce enough lanolin to meet the demand of another client. I don't want to expand and take on more wool production.\nM: But our contract with the business we currently supply lanolin to has almost expired—there's no guarantee it will be renewed. I think you should at least read Pelicon's proposal.\nW: Sure. Can you forward me the e-mail?",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n40. Tại sao người đàn ông đề nghị đọc một email?\n(A) Để xem xét một đề xuất kinh doanh\n(B) Để chuẩn bị cho buổi gặp khách hàng\n(C) Để xem một số bản vẽ xây dựng\n(D) Để biết chi tiết của một khiếu nại\n\nDịch hội thoại:\nNam: Sáng nay tôi nhận được email từ Pelicon, một nhà sản xuất sản phẩm làm đẹp địa phương. Họ quan tâm đến việc mua lanolin từ chúng ta để sử dụng trong dòng trang điểm tự nhiên hoàn toàn mới.\nNữ: Tôi không chắc về điều đó. Chúng ta là một trang trại khá nhỏ, và chúng ta đã bán lanolin cho một doanh nghiệp địa phương khác. Tôi lo rằng chúng ta không sản xuất đủ lanolin để đáp ứng nhu cầu của một khách hàng khác. Tôi không muốn mở rộng và đảm nhận sản xuất len nhiều hơn.\nNam: Nhưng hợp đồng của chúng ta với doanh nghiệp mà chúng ta hiện đang cung cấp lanolin sắp hết hạn—không có gì đảm bảo sẽ được gia hạn. Tôi nghĩ bạn nên ít nhất đọc đề xuất của Pelicon.\nNữ: Được rồi. Bạn có thể chuyển email cho tôi không?"
  },
  {
   "number": 41,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "41. What will the woman do next month? (A) Reorganize a department (B) Attend a conference (C) Relocate to an overseas office (D) Take a vacation",
   "transcript": "M: Nisreen? This is Lewis. I heard you're going to be working for our company overseas, in the New Zealand office. What a great opportunity!\nW: Yes, thank you. I start next month, and I'm really excited.\nM: I'm calling to touch base with you about some of our vendor contracts. It's time to renew the contracts, and I wanted to ask you to take care of that before you left.\nW: No problem. I know where those files are located on our shared computer drive. I'll just need the password to access them.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n41. Tháng tới người phụ nữ sẽ làm gì?\n(A) Tái tổ chức một bộ phận\n(B) Tham dự hội nghị\n(C) Chuyển tới văn phòng nước ngoài\n(D) Nghỉ phép\n\nDịch hội thoại:\nNam: Nisreen? Đây là Lewis. Tôi nghe nói bạn sẽ làm việc cho công ty chúng ta ở nước ngoài, tại văn phòng New Zealand. Thật là cơ hội tuyệt vời!\nNữ: Vâng, cảm ơn. Tôi bắt đầu tháng tới, và tôi rất hào hứng.\nNam: Tôi gọi để thảo luận với bạn về một số hợp đồng nhà cung cấp của chúng ta. Đã đến lúc gia hạn hợp đồng, và tôi muốn yêu cầu bạn xử lý việc đó trước khi đi.\nNữ: Không vấn đề. Tôi biết các tệp đó nằm ở đâu trên ổ đĩa máy tính chia sẻ của chúng ta. Tôi chỉ cần mật khẩu để truy cập chúng."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "42. What does the man want the woman to do? (A) Help with some contracts (B) Prepare a project timeline (C) Update some software (D) Call a sales representative",
   "transcript": "M: Nisreen? This is Lewis. I heard you're going to be working for our company overseas, in the New Zealand office. What a great opportunity!\nW: Yes, thank you. I start next month, and I'm really excited.\nM: I'm calling to touch base with you about some of our vendor contracts. It's time to renew the contracts, and I wanted to ask you to take care of that before you left.\nW: No problem. I know where those files are located on our shared computer drive. I'll just need the password to access them.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n42. Người đàn ông muốn người phụ nữ làm gì?\n(A) Hỗ trợ xử lý hợp đồng\n(B) Chuẩn bị tiến độ dự án\n(C) Cập nhật phần mềm\n(D) Gọi cho đại diện bán hàng\n\nDịch hội thoại:\nNam: Nisreen? Đây là Lewis. Tôi nghe nói bạn sẽ làm việc cho công ty chúng ta ở nước ngoài, tại văn phòng New Zealand. Thật là cơ hội tuyệt vời!\nNữ: Vâng, cảm ơn. Tôi bắt đầu tháng tới, và tôi rất hào hứng.\nNam: Tôi gọi để thảo luận với bạn về một số hợp đồng nhà cung cấp của chúng ta. Đã đến lúc gia hạn hợp đồng, và tôi muốn yêu cầu bạn xử lý việc đó trước khi đi.\nNữ: Không vấn đề. Tôi biết các tệp đó nằm ở đâu trên ổ đĩa máy tính chia sẻ của chúng ta. Tôi chỉ cần mật khẩu để truy cập chúng."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "43. What does the woman ask the man for? (A) Some employee names (B) Some credit card information (C) A file password (D) A telephone number",
   "transcript": "M: Nisreen? This is Lewis. I heard you're going to be working for our company overseas, in the New Zealand office. What a great opportunity!\nW: Yes, thank you. I start next month, and I'm really excited.\nM: I'm calling to touch base with you about some of our vendor contracts. It's time to renew the contracts, and I wanted to ask you to take care of that before you left.\nW: No problem. I know where those files are located on our shared computer drive. I'll just need the password to access them.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n43. Người phụ nữ yêu cầu người đàn ông cung cấp điều gì?\n(A) Một số tên nhân viên\n(B) Một số thông tin thẻ tín dụng\n(C) Một mật khẩu tệp\n(D) Một số điện thoại\n\nDịch hội thoại:\nNam: Nisreen? Đây là Lewis. Tôi nghe nói bạn sẽ làm việc cho công ty chúng ta ở nước ngoài, tại văn phòng New Zealand. Thật là cơ hội tuyệt vời!\nNữ: Vâng, cảm ơn. Tôi bắt đầu tháng tới, và tôi rất hào hứng.\nNam: Tôi gọi để thảo luận với bạn về một số hợp đồng nhà cung cấp của chúng ta. Đã đến lúc gia hạn hợp đồng, và tôi muốn yêu cầu bạn xử lý việc đó trước khi đi.\nNữ: Không vấn đề. Tôi biết các tệp đó nằm ở đâu trên ổ đĩa máy tính chia sẻ của chúng ta. Tôi chỉ cần mật khẩu để truy cập chúng."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "44. Why is the woman calling? (A) To negotiate a payment (B) To reschedule an appearance (C) To book a venue (D) To ask about security",
   "transcript": "W: Hi. This is Giovanni Marino's agent. I'm calling to reschedule his planned appearance on the Sunday Morning Show.\nM: Right. We have him booked to appear on the show in July to promote his new movie.\nW: Unfortunately, the movie he's acting in is behind schedule, and he'll now be on location through the end of August.\nM: Hmm, I see. Let me look at our guest calendar. I have a slot I'm looking to fill on September fourteenth—would that work?\nW: Yes, that would be great, thanks. M All right. I'll update the contract with the new date and e-mail it to you.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n44. Tại sao người phụ nữ gọi điện?\n(A) Để thương lượng khoản thanh toán\n(B) Để sắp xếp lại một buổi xuất hiện\n(C) Để đặt phòng\n(D) Để hỏi về vấn đề an ninh\n\nDịch hội thoại:\nNữ: Chào. Đây là đại diện của Giovanni Marino. Tôi gọi để lên lịch lại lịch xuất hiện đã lên kế hoạch của anh ấy trên Sunday Morning Show.\nNam: Đúng rồi. Chúng tôi đã đặt lịch cho anh ấy xuất hiện trên chương trình vào tháng Bảy để quảng bá bộ phim mới.\nNữ: Thật không may, bộ phim anh ấy đang đóng bị chậm tiến độ, và anh ấy sẽ ở địa điểm quay đến cuối tháng Tám.\nNam: Hmm, tôi hiểu rồi. Để tôi xem lịch khách mời. Tôi có một khoảng trống cần lấp vào ngày 14 tháng Chín—có được không?\nNữ: Vâng, sẽ tuyệt vời, cảm ơn.\nNam: Được rồi. Tôi sẽ cập nhật hợp đồng với ngày mới và gửi email cho bạn."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "45. Who most likely is Giovanni Marino? (A) An actor (B) A politician (C) A writer (D) A photographer",
   "transcript": "W: Hi. This is Giovanni Marino's agent. I'm calling to reschedule his planned appearance on the Sunday Morning Show.\nM: Right. We have him booked to appear on the show in July to promote his new movie.\nW: Unfortunately, the movie he's acting in is behind schedule, and he'll now be on location through the end of August.\nM: Hmm, I see. Let me look at our guest calendar. I have a slot I'm looking to fill on September fourteenth—would that work?\nW: Yes, that would be great, thanks. M All right. I'll update the contract with the new date and e-mail it to you.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n45. Giovanni Marino có khả năng là ai?\n(A) Diễn viên\n(B) Chính trị gia\n(C) Nhà văn\n(D) Nhiếp ảnh gia\n\nDịch hội thoại:\nNữ: Chào. Đây là đại diện của Giovanni Marino. Tôi gọi để lên lịch lại lịch xuất hiện đã lên kế hoạch của anh ấy trên Sunday Morning Show.\nNam: Đúng rồi. Chúng tôi đã đặt lịch cho anh ấy xuất hiện trên chương trình vào tháng Bảy để quảng bá bộ phim mới.\nNữ: Thật không may, bộ phim anh ấy đang đóng bị chậm tiến độ, và anh ấy sẽ ở địa điểm quay đến cuối tháng Tám.\nNam: Hmm, tôi hiểu rồi. Để tôi xem lịch khách mời. Tôi có một khoảng trống cần lấp vào ngày 14 tháng Chín—có được không?\nNữ: Vâng, sẽ tuyệt vời, cảm ơn.\nNam: Được rồi. Tôi sẽ cập nhật hợp đồng với ngày mới và gửi email cho bạn."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "46. What will the man send in an e-mail? (A) A revised contract (B) A reimbursement form (C) An invitation to a video conference (D) Directions to a location",
   "transcript": "W: Hi. This is Giovanni Marino's agent. I'm calling to reschedule his planned appearance on the Sunday Morning Show.\nM: Right. We have him booked to appear on the show in July to promote his new movie.\nW: Unfortunately, the movie he's acting in is behind schedule, and he'll now be on location through the end of August.\nM: Hmm, I see. Let me look at our guest calendar. I have a slot I'm looking to fill on September fourteenth—would that work?\nW: Yes, that would be great, thanks. M All right. I'll update the contract with the new date and e-mail it to you.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n46. Người đàn ông sẽ gửi gì qua email?\n(A) Hợp đồng sửa đổi\n(B) Mẫu hoàn tiền\n(C) Lời mời tham gia cuộc họp trực tuyến\n(D) Chỉ đường đến một địa điểm\n\nDịch hội thoại:\nNữ: Chào. Đây là đại diện của Giovanni Marino. Tôi gọi để lên lịch lại lịch xuất hiện đã lên kế hoạch của anh ấy trên Sunday Morning Show.\nNam: Đúng rồi. Chúng tôi đã đặt lịch cho anh ấy xuất hiện trên chương trình vào tháng Bảy để quảng bá bộ phim mới.\nNữ: Thật không may, bộ phim anh ấy đang đóng bị chậm tiến độ, và anh ấy sẽ ở địa điểm quay đến cuối tháng Tám.\nNam: Hmm, tôi hiểu rồi. Để tôi xem lịch khách mời. Tôi có một khoảng trống cần lấp vào ngày 14 tháng Chín—có được không?\nNữ: Vâng, sẽ tuyệt vời, cảm ơn.\nNam: Được rồi. Tôi sẽ cập nhật hợp đồng với ngày mới và gửi email cho bạn."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "47. What are the speakers discussing? (A) A conference schedule (B) A company policy (C) A catering menu (D) A supply order",
   "transcript": "M1: Hello, Usha. Hi, Pablo.\nW: Hey, Konstantin. We're talking about our thoughts on the new company policy for remote workers. On the days I have to come into the office, I always worry about finding an appropriate workstation.\nM2: Yeah, I don't like the unpredictability either. Why can't we just sign up for our workstation sometime in advance? What do you think about it?\nM1: These are good points. Let's all go to the director to discuss this with her.\nM2: I believe she's in her office, so now's a good time.\nW: Oh, I can't go now. I have a report to finalize by noon.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n47. Hai người đang thảo luận về điều gì?\n(A) Lịch hội nghị\n(B) Chính sách công ty\n(C) Đặt đồ ăn\n(D) Đơn đặt hàng\n\nDịch hội thoại:\nNam1: Chào Usha. Chào Pablo.\nNữ: Chào Konstantin. Chúng tôi đang nói về suy nghĩ của mình về chính sách công ty mới dành cho nhân viên làm việc từ xa. Vào những ngày tôi phải đến văn phòng, tôi luôn lo lắng về việc tìm một chỗ làm việc phù hợp.\nNam2: Vâng, tôi cũng không thích sự không chắc chắn đó. Tại sao chúng ta không thể đăng ký chỗ làm việc trước? Bạn nghĩ sao?\nNam1: Những điểm tốt đấy. Hãy cùng đến gặp giám đốc để thảo luận với bà ấy.\nNam2: Tôi tin bà ấy đang ở văn phòng, vậy bây giờ là lúc tốt.\nNữ: Ồ, tôi không thể đi bây giờ. Tôi có báo cáo cần hoàn tất trước trưa."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "48. What does the man want to do? (A) Rent a car (B) Go to a restaurant (C) Speak with a manager (D) Change some flight reservations",
   "transcript": "M1: Hello, Usha. Hi, Pablo.\nW: Hey, Konstantin. We're talking about our thoughts on the new company policy for remote workers. On the days I have to come into the office, I always worry about finding an appropriate workstation.\nM2: Yeah, I don't like the unpredictability either. Why can't we just sign up for our workstation sometime in advance? What do you think about it?\nM1: These are good points. Let's all go to the director to discuss this with her.\nM2: I believe she's in her office, so now's a good time.\nW: Oh, I can't go now. I have a report to finalize by noon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n48. Người đàn ông muốn làm gì?\n(A) Thuê một chiếc xe\n(B) Đi đến một nhà hàng\n(C) Nói chuyện với người quản lý\n(D) Thay đổi đặt vé máy bay\n\nDịch hội thoại:\nNam1: Chào Usha. Chào Pablo.\nNữ: Chào Konstantin. Chúng tôi đang nói về suy nghĩ của mình về chính sách công ty mới dành cho nhân viên làm việc từ xa. Vào những ngày tôi phải đến văn phòng, tôi luôn lo lắng về việc tìm một chỗ làm việc phù hợp.\nNam2: Vâng, tôi cũng không thích sự không chắc chắn đó. Tại sao chúng ta không thể đăng ký chỗ làm việc trước? Bạn nghĩ sao?\nNam1: Những điểm tốt đấy. Hãy cùng đến gặp giám đốc để thảo luận với bà ấy.\nNam2: Tôi tin bà ấy đang ở văn phòng, vậy bây giờ là lúc tốt.\nNữ: Ồ, tôi không thể đi bây giờ. Tôi có báo cáo cần hoàn tất trước trưa."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "49. What does the woman say she needs to do now? (A) Work on a report (B) Meet with a client (C) Print some materials (D) Check her e-mails",
   "transcript": "M1: Hello, Usha. Hi, Pablo.\nW: Hey, Konstantin. We're talking about our thoughts on the new company policy for remote workers. On the days I have to come into the office, I always worry about finding an appropriate workstation.\nM2: Yeah, I don't like the unpredictability either. Why can't we just sign up for our workstation sometime in advance? What do you think about it?\nM1: These are good points. Let's all go to the director to discuss this with her.\nM2: I believe she's in her office, so now's a good time.\nW: Oh, I can't go now. I have a report to finalize by noon.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n49. Người phụ nữ nói cô ấy cần làm gì bây giờ?\n(A) Làm việc trong một báo cáo\n(B) Gặp khách hàng\n(C) In một số tài liệu\n(D) Kiểm tra email\n\nDịch hội thoại:\nNam1: Chào Usha. Chào Pablo.\nNữ: Chào Konstantin. Chúng tôi đang nói về suy nghĩ của mình về chính sách công ty mới dành cho nhân viên làm việc từ xa. Vào những ngày tôi phải đến văn phòng, tôi luôn lo lắng về việc tìm một chỗ làm việc phù hợp.\nNam2: Vâng, tôi cũng không thích sự không chắc chắn đó. Tại sao chúng ta không thể đăng ký chỗ làm việc trước? Bạn nghĩ sao?\nNam1: Những điểm tốt đấy. Hãy cùng đến gặp giám đốc để thảo luận với bà ấy.\nNam2: Tôi tin bà ấy đang ở văn phòng, vậy bây giờ là lúc tốt.\nNữ: Ồ, tôi không thể đi bây giờ. Tôi có báo cáo cần hoàn tất trước trưa."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "B",
   "group": "50-52",
   "textEn": "50. Who most likely is the woman? (A) A journalist (B) A librarian (C) A film producer (D) A software developer",
   "transcript": "W: OK, Mr. Jebreen. Here's your new library card. Remember that you can borrow books, CDs, and DVDs from our collection with it.\nM: Thank you. I read somewhere that people can also borrow digital items.\nW: Yes! We offer the Cloud-Camel application. All you have to do is download the app and use the information on your card to set up an account.\nM: That's great. I go on a business trip every month, so having easy access to online content will be convenient.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n50. Người phụ nữ đó có khả năng là ai nhất?\n(A) Một nhà báo\n(B) Một thủ thư\n(C) Một nhà sản xuất phim\n(D) Một nhà phát triển phần mềm\n\nDịch hội thoại:\nNữ: OK, ông Jebreen. Đây là thẻ thư viện mới của ông. Nhớ rằng ông có thể mượn sách, CD và DVD từ bộ sưu tập của chúng tôi bằng nó.\nNam: Cảm ơn. Tôi đọc đâu đó rằng mọi người cũng có thể mượn các mặt hàng kỹ thuật số.\nNữ: Vâng! Chúng tôi cung cấp ứng dụng Cloud-Camel. Tất cả những gì ông phải làm là tải ứng dụng và sử dụng thông tin trên thẻ để thiết lập tài khoản. Nam: Tuyệt vời. Tôi đi công tác mỗi tháng, vì vậy việc dễ dàng truy cập nội dung trực tuyến sẽ tiện lợi."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "51. What does the woman recommend that the man do? (A) Consult a manual (B) Sign up for a class (C) Listen to some music (D) Use a particular mobile app",
   "transcript": "W: OK, Mr. Jebreen. Here's your new library card. Remember that you can borrow books, CDs, and DVDs from our collection with it.\nM: Thank you. I read somewhere that people can also borrow digital items.\nW: Yes! We offer the Cloud-Camel application. All you have to do is download the app and use the information on your card to set up an account.\nM: That's great. I go on a business trip every month, so having easy access to online content will be convenient.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n51. Người phụ nữ khuyên người đàn ông nên làm gì?\n(A) Tham khảo sách hướng dẫn\n(B) Đăng ký một lớp học\n(C) Nghe nhạc\n(D) Sử dụng một ứng dụng di động cụ thể\n\nDịch hội thoại:\nNữ: OK, ông Jebreen. Đây là thẻ thư viện mới của ông. Nhớ rằng ông có thể mượn sách, CD và DVD từ bộ sưu tập của chúng tôi bằng nó.\nNam: Cảm ơn. Tôi đọc đâu đó rằng mọi người cũng có thể mượn các mặt hàng kỹ thuật số.\nNữ: Vâng! Chúng tôi cung cấp ứng dụng Cloud-Camel. Tất cả những gì ông phải làm là tải ứng dụng và sử dụng thông tin trên thẻ để thiết lập tài khoản. Nam: Tuyệt vời. Tôi đi công tác mỗi tháng, vì vậy việc dễ dàng truy cập nội dung trực tuyến sẽ tiện lợi."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "52. What does the woman say happens each month? (A) He publishes a blog post. (B) He meets with a social group. (C) He travels for work. (D) He volunteers for a community event.",
   "transcript": "W: OK, Mr. Jebreen. Here's your new library card. Remember that you can borrow books, CDs, and DVDs from our collection with it.\nM: Thank you. I read somewhere that people can also borrow digital items.\nW: Yes! We offer the Cloud-Camel application. All you have to do is download the app and use the information on your card to set up an account.\nM: That's great. I go on a business trip every month, so having easy access to online content will be convenient.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n52. Người phụ nữ nói điều gì xảy ra mỗi tháng?\n(A) Anh ấy đăng một bài viết trên blog.\n(B) Anh ấy gặp gỡ một nhóm xã hội.\n(C) Anh ấy đi công tác.\n(D) Anh ấy tình nguyện tham gia một sự kiện cộng đồng.\n\nDịch hội thoại:\nNữ: OK, ông Jebreen. Đây là thẻ thư viện mới của ông. Nhớ rằng ông có thể mượn sách, CD và DVD từ bộ sưu tập của chúng tôi bằng nó.\nNam: Cảm ơn. Tôi đọc đâu đó rằng mọi người cũng có thể mượn các mặt hàng kỹ thuật số.\nNữ: Vâng! Chúng tôi cung cấp ứng dụng Cloud-Camel. Tất cả những gì ông phải làm là tải ứng dụng và sử dụng thông tin trên thẻ để thiết lập tài khoản. Nam: Tuyệt vời. Tôi đi công tác mỗi tháng, vì vậy việc dễ dàng truy cập nội dung trực tuyến sẽ tiện lợi."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "D",
   "group": "53-55",
   "textEn": "53. What does the woman want the man to look at? (A) A marketing plan (B) A conference calendar (C) Schedule changes (D) Survey results",
   "transcript": "W: Have you reviewed the data from the workplace survey? You really should. It looks like most staff feel positive about the direction that the company is going in. But almost 40 percent feel like their individual contributions aren't being recognized.\nM: Well, the company's certainly had other priorities. I wonder how the management team's going to respond.\nW: I've suggested many times that they give out awards every quarter for exceptional performance. Maybe now they'll finally start doing it.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n53. Người phụ nữ muốn người đàn ông xem gì?\n(A) Kế hoạch tiếp thị\n(B) Lịch hội nghị\n(C) Thay đổi lịch trình\n(D) Kết quả khảo sát\n\nDịch hội thoại:\nNữ: Bạn đã xem xét dữ liệu từ cuộc khảo sát nơi làm việc chưa? Bạn thực sự nên làm vậy. Có vẻ như hầu hết nhân viên cảm thấy tích cực về hướng đi của công ty. Nhưng gần 40 phần trăm cảm thấy những đóng góp cá nhân của họ không được công nhận.\nNam: Chà, công ty chắc chắn có những ưu tiên khác. Tôi tự hỏi đội ngũ quản lý sẽ phản ứng thế nào.\nNữ: Tôi đã gợi ý nhiều lần rằng họ nên trao giải thưởng hàng quý cho hiệu suất xuất sắc. Có lẽ bây giờ họ cuối cùng sẽ bắt đầu làm điều đó."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "54. What does the man imply when he says, “The company’s certainly had other priorities”? (A) His workload has decreased. (B) He is not responsible for some results. (C) Some criticism is accurate. (D) Some decisions led to a successful outcome.",
   "transcript": "W: Have you reviewed the data from the workplace survey? You really should. It looks like most staff feel positive about the direction that the company is going in. But almost 40 percent feel like their individual contributions aren't being recognized.\nM: Well, the company's certainly had other priorities. I wonder how the management team's going to respond.\nW: I've suggested many times that they give out awards every quarter for exceptional performance. Maybe now they'll finally start doing it.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n54. Người đàn ông ngụ ý gì khi nói, “Công ty chắc chắn đã có những ưu tiên khác”?\n(A) Khối lượng công việc của anh ấy đã giảm.\n(B) Anh ấy không chịu trách nhiệm về một số kết quả.\n(C) Một số lời chỉ trích là chính xác.\n(D) Một số quyết định đã dẫn đến kết quả thành công.\n\nDịch hội thoại:\nNữ: Bạn đã xem xét dữ liệu từ cuộc khảo sát nơi làm việc chưa? Bạn thực sự nên làm vậy. Có vẻ như hầu hết nhân viên cảm thấy tích cực về hướng đi của công ty. Nhưng gần 40 phần trăm cảm thấy những đóng góp cá nhân của họ không được công nhận.\nNam: Chà, công ty chắc chắn có những ưu tiên khác. Tôi tự hỏi đội ngũ quản lý sẽ phản ứng thế nào.\nNữ: Tôi đã gợi ý nhiều lần rằng họ nên trao giải thưởng hàng quý cho hiệu suất xuất sắc. Có lẽ bây giờ họ cuối cùng sẽ bắt đầu làm điều đó."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "55. What has the woman suggested in the past? (A) Rewarding staff performance (B) Extending business hours (C) Encouraging professional development (D) Organizing team-building events",
   "transcript": "W: Have you reviewed the data from the workplace survey? You really should. It looks like most staff feel positive about the direction that the company is going in. But almost 40 percent feel like their individual contributions aren't being recognized.\nM: Well, the company's certainly had other priorities. I wonder how the management team's going to respond.\nW: I've suggested many times that they give out awards every quarter for exceptional performance. Maybe now they'll finally start doing it.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n55. Người phụ nữ đã đề xuất điều gì trong quá khứ?\n(A) Khen thưởng thành tích của nhân viên\n(B) Kéo dài giờ làm việc\n(C) Khuyến khích phát triển chuyên môn\n(D) Tổ chức các sự kiện xây dựng đội nhóm\n\nDịch hội thoại:\nNữ: Bạn đã xem xét dữ liệu từ cuộc khảo sát nơi làm việc chưa? Bạn thực sự nên làm vậy. Có vẻ như hầu hết nhân viên cảm thấy tích cực về hướng đi của công ty. Nhưng gần 40 phần trăm cảm thấy những đóng góp cá nhân của họ không được công nhận.\nNam: Chà, công ty chắc chắn có những ưu tiên khác. Tôi tự hỏi đội ngũ quản lý sẽ phản ứng thế nào.\nNữ: Tôi đã gợi ý nhiều lần rằng họ nên trao giải thưởng hàng quý cho hiệu suất xuất sắc. Có lẽ bây giờ họ cuối cùng sẽ bắt đầu làm điều đó."
  },
  {
   "number": 56,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "56. What type of business do the women own? (A) A hair salon (B) A recording studio (C) A clothing company (D) A fitness center",
   "transcript": "W1: Hi, Ajijola. As I mentioned on the phone, my colleague and I recently started a clothing company and are hoping your branding firm can help us promote our line of athletic apparel. You think we should focus on advertising on social media, right?\nM: Right. Contrary to popular belief, television is definitely not the entire advertising landscape. Advertising on the Internet is also a great way for a company to increase its visibility.\nW2: I heard you recommended working with an online influencer.\nM: Yes—Saskia Hoffman. Saskia's very knowledgeable about exercise, and lots of people use her online exercise routines. Her viewers will pay attention to what she recommends and wears.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n56. Người phụ nữ sở hữu loại hình kinh doanh nào?\n(A) Tiệm làm tóc\n(B) Studio thu âm\n(C) Cửa hàng quần áo\n(D) Trung tâm thể hình\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ1: Chào, Ajijola. Như tôi đã đề cập qua điện thoại, đồng nghiệp của tôi và tôi gần đây đã thành lập một công ty quần áo và hy vọng công ty thương hiệu của bạn có thể giúp chúng tôi quảng bá dòng quần áo thể thao. Bạn nghĩ chúng ta nên tập trung vào quảng cáo trên mạng xã hội, phải không?\nNam: Đúng vậy. Trái với niềm tin phổ biến, truyền hình chắc chắn không phải là toàn bộ bối cảnh quảng cáo. Quảng cáo trên Internet cũng là một cách tuyệt vời để công ty tăng khả năng hiển thị.\nNữ2: Tôi nghe bạn khuyến nghị làm việc với một người ảnh hưởng trực tuyến.\nNam: Vâng—Saskia Hoffman. Saskia rất am hiểu về tập luyện, và nhiều người sử dụng các bài tập trực tuyến của cô ấy. Khán giả của cô ấy sẽ chú ý đến những gì cô ấy khuyến nghị và mặc."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "57. What does the man say regarding television? (A) It is an industry he once worked in. (B) It reaches more people than magazines. (C) It needs more programs about sports. (D) It is not the only advertising platform available.",
   "transcript": "W1: Hi, Ajijola. As I mentioned on the phone, my colleague and I recently started a clothing company and are hoping your branding firm can help us promote our line of athletic apparel. You think we should focus on advertising on social media, right?\nM: Right. Contrary to popular belief, television is definitely not the entire advertising landscape. Advertising on the Internet is also a great way for a company to increase its visibility.\nW2: I heard you recommended working with an online influencer.\nM: Yes—Saskia Hoffman. Saskia's very knowledgeable about exercise, and lots of people use her online exercise routines. Her viewers will pay attention to what she recommends and wears.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n57. Người phụ nữ nói gì về truyền hình?\n(A) Đó là ngành bà từng làm\n(B) Nó tiếp cận được nhiều người hơn tạp chí\n(C) Nó cần nhiều chương trình về thể thao hơn\n(D) Nó không phải nền tảng quảng cáo duy nhất\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ1: Chào, Ajijola. Như tôi đã đề cập qua điện thoại, đồng nghiệp của tôi và tôi gần đây đã thành lập một công ty quần áo và hy vọng công ty thương hiệu của bạn có thể giúp chúng tôi quảng bá dòng quần áo thể thao. Bạn nghĩ chúng ta nên tập trung vào quảng cáo trên mạng xã hội, phải không?\nNam: Đúng vậy. Trái với niềm tin phổ biến, truyền hình chắc chắn không phải là toàn bộ bối cảnh quảng cáo. Quảng cáo trên Internet cũng là một cách tuyệt vời để công ty tăng khả năng hiển thị.\nNữ2: Tôi nghe bạn khuyến nghị làm việc với một người ảnh hưởng trực tuyến.\nNam: Vâng—Saskia Hoffman. Saskia rất am hiểu về tập luyện, và nhiều người sử dụng các bài tập trực tuyến của cô ấy. Khán giả của cô ấy sẽ chú ý đến những gì cô ấy khuyến nghị và mặc."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "58. According to the man, why would Saskia Hoffman be a good choice? (A) She recently won an award. (B) She lives nearby. (C) She charges affordable rates. (D) She is well known in her field.",
   "transcript": "W1: Hi, Ajijola. As I mentioned on the phone, my colleague and I recently started a clothing company and are hoping your branding firm can help us promote our line of athletic apparel. You think we should focus on advertising on social media, right?\nM: Right. Contrary to popular belief, television is definitely not the entire advertising landscape. Advertising on the Internet is also a great way for a company to increase its visibility.\nW2: I heard you recommended working with an online influencer.\nM: Yes—Saskia Hoffman. Saskia's very knowledgeable about exercise, and lots of people use her online exercise routines. Her viewers will pay attention to what she recommends and wears.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n58. Theo người đàn ông, tại sao Saskia Hoffman là lựa chọn tốt?\n(A) Cô ấy vừa nhận giải thưởng\n(B) Cô ấy sống gần đây\n(C) Cô ấy tính giá phải chăng\n(D) Cô ấy nổi tiếng trong lĩnh vực của mình\n\nDịch hội thoại:\nNữ1: Chào, Ajijola. Như tôi đã đề cập qua điện thoại, đồng nghiệp của tôi và tôi gần đây đã thành lập một công ty quần áo và hy vọng công ty thương hiệu của bạn có thể giúp chúng tôi quảng bá dòng quần áo thể thao. Bạn nghĩ chúng ta nên tập trung vào quảng cáo trên mạng xã hội, phải không?\nNam: Đúng vậy. Trái với niềm tin phổ biến, truyền hình chắc chắn không phải là toàn bộ bối cảnh quảng cáo. Quảng cáo trên Internet cũng là một cách tuyệt vời để công ty tăng khả năng hiển thị.\nNữ2: Tôi nghe bạn khuyến nghị làm việc với một người ảnh hưởng trực tuyến.\nNam: Vâng—Saskia Hoffman. Saskia rất am hiểu về tập luyện, và nhiều người sử dụng các bài tập trực tuyến của cô ấy. Khán giả của cô ấy sẽ chú ý đến những gì cô ấy khuyến nghị và mặc."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "59. What does the speakers’ company manufacture? (A) Art supplies (B) Puzzles (C) Shipping materials (D) Power tools",
   "transcript": "W: Hi, Shinji. I wanted to ask you about the order we got from the department store chain. You know, the one that placed an order for 5,000 jigsaw puzzles?\nM: Yes. They want the order in a week so they can stock them before the holiday.\nW: A week is not a long time.\nM: We've had short timelines before. Anyway, our illustrators sent some new puzzle illustrations, right? I heard they're making a special edition.\nW: Yes, and I'm so excited! I've got the sketches right here. Let me show you.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n59. Công ty của hai người sản xuất gì?\n(A) Vật liệu mỹ thuật\n(B) Trò chơi xếp hình\n(C) Vật liệu vận chuyển\n(D) Dụng cụ điện\n\nDịch hội thoại:\nNữ: Chào, Shinji. Tôi muốn hỏi bạn về đơn hàng chúng ta nhận được từ chuỗi cửa hàng bách hóa. Bạn biết đấy, cái đặt hàng 5.000 câu đố ghép hình?\nNam: Vâng. Họ muốn đơn hàng trong một tuần để có thể dự trữ trước kỳ nghỉ.\nNữ: Một tuần không phải là thời gian dài.\nNam: Chúng ta đã có thời hạn ngắn trước đây. Dù sao, các họa sĩ minh họa của chúng ta đã gửi một số minh họa câu đố mới, phải không? Tôi nghe họ đang làm phiên bản đặc biệt.\nNữ: Vâng, và tôi rất hào hứng! Tôi có bản phác thảo ngay đây. Để tôi cho bạn xem."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "D",
   "group": "59-61",
   "textEn": "60. What does the woman imply when she says, “A week is not a long time”? (A) Some prices will likely increase. (B) Some temporary employees have been hired. (C) A colleague’s work is excellent. (D) An order may not be filled.",
   "transcript": "W: Hi, Shinji. I wanted to ask you about the order we got from the department store chain. You know, the one that placed an order for 5,000 jigsaw puzzles?\nM: Yes. They want the order in a week so they can stock them before the holiday.\nW: A week is not a long time.\nM: We've had short timelines before. Anyway, our illustrators sent some new puzzle illustrations, right? I heard they're making a special edition.\nW: Yes, and I'm so excited! I've got the sketches right here. Let me show you.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n60. Người phụ nữ ngụ ý điều gì khi nói “Một tuần không phải là lâu đâu”?\n(A) Giá có thể tăng\n(B) Một số nhân viên tạm thời đã được thuê\n(C) Một đồng nghiệp làm việc xuất sắc\n(D) Một đơn hàng có thể không được hoàn tất\n\nDịch hội thoại:\nNữ: Chào, Shinji. Tôi muốn hỏi bạn về đơn hàng chúng ta nhận được từ chuỗi cửa hàng bách hóa. Bạn biết đấy, cái đặt hàng 5.000 câu đố ghép hình?\nNam: Vâng. Họ muốn đơn hàng trong một tuần để có thể dự trữ trước kỳ nghỉ.\nNữ: Một tuần không phải là thời gian dài.\nNam: Chúng ta đã có thời hạn ngắn trước đây. Dù sao, các họa sĩ minh họa của chúng ta đã gửi một số minh họa câu đố mới, phải không? Tôi nghe họ đang làm phiên bản đặc biệt.\nNữ: Vâng, và tôi rất hào hứng! Tôi có bản phác thảo ngay đây. Để tôi cho bạn xem."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "61. What will the woman do next? (A) Review a contract (B) Print out an invoice (C) Share some illustrations (D) Confirm a client meeting",
   "transcript": "W: Hi, Shinji. I wanted to ask you about the order we got from the department store chain. You know, the one that placed an order for 5,000 jigsaw puzzles?\nM: Yes. They want the order in a week so they can stock them before the holiday.\nW: A week is not a long time.\nM: We've had short timelines before. Anyway, our illustrators sent some new puzzle illustrations, right? I heard they're making a special edition.\nW: Yes, and I'm so excited! I've got the sketches right here. Let me show you.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n61. Người phụ nữ sẽ làm gì tiếp theo?\n(A) Xem lại hợp đồng\n(B) In hóa đơn\n(C) Chia sẻ một số hình minh họa\n(D) Xác nhận cuộc họp với khách hàng\n\nDịch hội thoại:\nNữ: Chào, Shinji. Tôi muốn hỏi bạn về đơn hàng chúng ta nhận được từ chuỗi cửa hàng bách hóa. Bạn biết đấy, cái đặt hàng 5.000 câu đố ghép hình?\nNam: Vâng. Họ muốn đơn hàng trong một tuần để có thể dự trữ trước kỳ nghỉ.\nNữ: Một tuần không phải là thời gian dài.\nNam: Chúng ta đã có thời hạn ngắn trước đây. Dù sao, các họa sĩ minh họa của chúng ta đã gửi một số minh họa câu đố mới, phải không? Tôi nghe họ đang làm phiên bản đặc biệt.\nNữ: Vâng, và tôi rất hào hứng! Tôi có bản phác thảo ngay đây. Để tôi cho bạn xem."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Where does the man most likely work? (A) At an airport (B) At a bank (C) At a real estate agency (D) At a department store",
   "transcript": "M: Hi, Ms. Rossi. I understand you're concerned about a charge that appears on the statement for your business account.\nW: Yes, I have a question about the charge on May 3. I don't remember purchasing anything for that amount.\nM: Let me review your statement now. Hmm. It looks like that purchase was made abroad. So an international transaction fee was added to the purchase amount.\nW: Oh, yes—I was out of the country at that time. Thanks for clarifying. Can you provide me with a list of all the bank fees for transactions made abroad?\nM: Yes, of course. Here's a document that lists all the information.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n62. Người đàn ông có khả năng làm việc ở đâu?\n(A) Sân bay\n(B) Ngân hàng\n(C) Đại lý bất động sản\n(D) Cửa hàng bách hóa\n\nDịch hội thoại:\nNam: Chào, bà Rossi. Tôi hiểu bà đang lo lắng về một khoản phí xuất hiện trên bảng kê khai tài khoản kinh doanh của bà.\nNữ: Vâng, tôi có câu hỏi về khoản phí vào ngày 3 tháng 5. Tôi không nhớ mua bất cứ thứ gì với số tiền đó.\nNam: Để tôi xem lại bảng kê của bà ngay. Hmm. Có vẻ như giao dịch đó được thực hiện ở nước ngoài. Vì vậy phí giao dịch quốc tế đã được thêm vào số tiền mua.\nNữ: Ồ, vâng—Tôi đã ra khỏi nước lúc đó. Cảm ơn vì đã làm rõ. Ông có thể cung cấp cho tôi danh sách tất cả các phí ngân hàng cho các giao dịch thực hiện ở nước ngoài không?\nNam: Vâng, tất nhiên. Đây là tài liệu liệt kê tất cả thông tin."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "63. Look at the graphic. Which amount does the woman ask about? (A) $203.00 (B) $350.00 (C) $75.50 (D) $83.15",
   "transcript": "M: Hi, Ms. Rossi. I understand you're concerned about a charge that appears on the statement for your business account.\nW: Yes, I have a question about the charge on May 3. I don't remember purchasing anything for that amount.\nM: Let me review your statement now. Hmm. It looks like that purchase was made abroad. So an international transaction fee was added to the purchase amount.\nW: Oh, yes—I was out of the country at that time. Thanks for clarifying. Can you provide me with a list of all the bank fees for transactions made abroad?\nM: Yes, of course. Here's a document that lists all the information.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n63. Nhìn vào biểu đồ. Người phụ nữ hỏi về khoản tiền nào?\n(A) $203.00\n(B) $350.00\n(C) $75.50\n(D) $83.15\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Chào, bà Rossi. Tôi hiểu bà đang lo lắng về một khoản phí xuất hiện trên bảng kê khai tài khoản kinh doanh của bà.\nNữ: Vâng, tôi có câu hỏi về khoản phí vào ngày 3 tháng 5. Tôi không nhớ mua bất cứ thứ gì với số tiền đó.\nNam: Để tôi xem lại bảng kê của bà ngay. Hmm. Có vẻ như giao dịch đó được thực hiện ở nước ngoài. Vì vậy phí giao dịch quốc tế đã được thêm vào số tiền mua.\nNữ: Ồ, vâng—Tôi đã ra khỏi nước lúc đó. Cảm ơn vì đã làm rõ. Ông có thể cung cấp cho tôi danh sách tất cả các phí ngân hàng cho các giao dịch thực hiện ở nước ngoài không?\nNam: Vâng, tất nhiên. Đây là tài liệu liệt kê tất cả thông tin."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "64. What does the man give the woman? (A) An updated statement (B) A list of fees (C) A discount card (D) A brochure",
   "transcript": "M: Hi, Ms. Rossi. I understand you're concerned about a charge that appears on the statement for your business account.\nW: Yes, I have a question about the charge on May 3. I don't remember purchasing anything for that amount.\nM: Let me review your statement now. Hmm. It looks like that purchase was made abroad. So an international transaction fee was added to the purchase amount.\nW: Oh, yes—I was out of the country at that time. Thanks for clarifying. Can you provide me with a list of all the bank fees for transactions made abroad?\nM: Yes, of course. Here's a document that lists all the information.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n64. Người đàn ông đưa cho người phụ nữ cái gì?\n(A) Sao kê đã cập nhật\n(B) Danh sách các khoản phí\n(C) Thẻ giảm giá\n(D) Tờ rơi\n\nDịch hội thoại:\nNam: Chào, bà Rossi. Tôi hiểu bà đang lo lắng về một khoản phí xuất hiện trên bảng kê khai tài khoản kinh doanh của bà.\nNữ: Vâng, tôi có câu hỏi về khoản phí vào ngày 3 tháng 5. Tôi không nhớ mua bất cứ thứ gì với số tiền đó.\nNam: Để tôi xem lại bảng kê của bà ngay. Hmm. Có vẻ như giao dịch đó được thực hiện ở nước ngoài. Vì vậy phí giao dịch quốc tế đã được thêm vào số tiền mua.\nNữ: Ồ, vâng—Tôi đã ra khỏi nước lúc đó. Cảm ơn vì đã làm rõ. Ông có thể cung cấp cho tôi danh sách tất cả các phí ngân hàng cho các giao dịch thực hiện ở nước ngoài không?\nNam: Vâng, tất nhiên. Đây là tài liệu liệt kê tất cả thông tin."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "65. What does the man thank the woman for doing? (A) Printing programs (B) Setting up lighting (C) Reserving a venue (D) Paying a performer",
   "transcript": "M: Magali, were you able to reserve the performing arts center for the piano concert?\nW: Yes. I booked their main auditorium for that day. They're sending me the contract.\nM: Thanks for doing that.\nW: No problem. Hopefully, it'll be as successful as last year.\nM: We sold 2,000 tickets last year, but we had three celebrity performers. I'm worried we won't sell as many tickets this year.\nW: Well, Xinyu Gu is a very popular pianist. And she's staying after the concert to sign autographs. Which reminds me, where should we set up the table for that?\nM: Good question. Hmm. The café should be closed by then. Let's set it up next to the café.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n65. Người đàn ông cảm ơn người phụ nữ vì điều gì?\n(A) In chương trình\n(B) Lắp đặt hệ thống ánh sáng\n(C) Đặt chỗ địa điểm\n(D) Trả tiền cho người biểu diễn\n\nDịch hội thoại:\nNam: Magali, bạn có thể đặt chỗ trung tâm nghệ thuật biểu diễn cho buổi hòa nhạc piano không?\nNữ: Vâng. Tôi đã đặt hội trường chính của họ cho ngày đó. Họ đang gửi hợp đồng cho tôi.\nNam: Cảm ơn vì đã làm điều đó.\nNữ: Không vấn đề. Hy vọng sẽ thành công như năm ngoái.\nNam: Chúng ta bán 2.000 vé năm ngoái, nhưng chúng ta có ba nghệ sĩ nổi tiếng. Tôi lo lắng chúng ta sẽ không bán được nhiều vé năm nay.\nNữ: Chà, Xinyu Gu là một nghệ sĩ piano rất nổi tiếng. Và cô ấy ở lại sau buổi hòa nhạc để ký tặng. Điều đó nhắc tôi, chúng ta nên đặt bàn cho việc đó ở đâu?\nNam: Câu hỏi hay. Hmm. Quán cà phê nên đóng cửa lúc đó. Hãy đặt nó bên cạnh quán cà phê."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "66. What does the man say he is worried about? (A) Reviews from critics (B) Ticket sales (C) A performance schedule (D) The cost of merchandise",
   "transcript": "M: Magali, were you able to reserve the performing arts center for the piano concert?\nW: Yes. I booked their main auditorium for that day. They're sending me the contract.\nM: Thanks for doing that.\nW: No problem. Hopefully, it'll be as successful as last year.\nM: We sold 2,000 tickets last year, but we had three celebrity performers. I'm worried we won't sell as many tickets this year.\nW: Well, Xinyu Gu is a very popular pianist. And she's staying after the concert to sign autographs. Which reminds me, where should we set up the table for that?\nM: Good question. Hmm. The café should be closed by then. Let's set it up next to the café.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n66. Người đàn ông nói rằng anh ấy lo lắng về điều gì?\n(A) Bài đánh giá từ giới phê bình\n(B) Doanh số bán vé\n(C) Lịch diễn\n(D) Chi phí hàng hóa\n\nDịch hội thoại:\nNam: Magali, bạn có thể đặt chỗ trung tâm nghệ thuật biểu diễn cho buổi hòa nhạc piano không?\nNữ: Vâng. Tôi đã đặt hội trường chính của họ cho ngày đó. Họ đang gửi hợp đồng cho tôi.\nNam: Cảm ơn vì đã làm điều đó.\nNữ: Không vấn đề. Hy vọng sẽ thành công như năm ngoái.\nNam: Chúng ta bán 2.000 vé năm ngoái, nhưng chúng ta có ba nghệ sĩ nổi tiếng. Tôi lo lắng chúng ta sẽ không bán được nhiều vé năm nay.\nNữ: Chà, Xinyu Gu là một nghệ sĩ piano rất nổi tiếng. Và cô ấy ở lại sau buổi hòa nhạc để ký tặng. Điều đó nhắc tôi, chúng ta nên đặt bàn cho việc đó ở đâu?\nNam: Câu hỏi hay. Hmm. Quán cà phê nên đóng cửa lúc đó. Hãy đặt nó bên cạnh quán cà phê."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "67. Look at the graphic. Where will a table be set up? (A) At location 1 (B) At location 2 (C) At location 3 (D) At location 4",
   "transcript": "M: Magali, were you able to reserve the performing arts center for the piano concert?\nW: Yes. I booked their main auditorium for that day. They're sending me the contract.\nM: Thanks for doing that.\nW: No problem. Hopefully, it'll be as successful as last year.\nM: We sold 2,000 tickets last year, but we had three celebrity performers. I'm worried we won't sell as many tickets this year.\nW: Well, Xinyu Gu is a very popular pianist. And she's staying after the concert to sign autographs. Which reminds me, where should we set up the table for that?\nM: Good question. Hmm. The café should be closed by then. Let's set it up next to the café.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n67. Nhìn vào biểu đồ. Bàn sẽ được đặt ở vị trí nào?\n(A) Vị trí 1\n(B) Vị trí 2\n(C) Vị trí 3\n(D) Vị trí 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Magali, bạn có thể đặt chỗ trung tâm nghệ thuật biểu diễn cho buổi hòa nhạc piano không?\nNữ: Vâng. Tôi đã đặt hội trường chính của họ cho ngày đó. Họ đang gửi hợp đồng cho tôi.\nNam: Cảm ơn vì đã làm điều đó.\nNữ: Không vấn đề. Hy vọng sẽ thành công như năm ngoái.\nNam: Chúng ta bán 2.000 vé năm ngoái, nhưng chúng ta có ba nghệ sĩ nổi tiếng. Tôi lo lắng chúng ta sẽ không bán được nhiều vé năm nay.\nNữ: Chà, Xinyu Gu là một nghệ sĩ piano rất nổi tiếng. Và cô ấy ở lại sau buổi hòa nhạc để ký tặng. Điều đó nhắc tôi, chúng ta nên đặt bàn cho việc đó ở đâu?\nNam: Câu hỏi hay. Hmm. Quán cà phê nên đóng cửa lúc đó. Hãy đặt nó bên cạnh quán cà phê."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "68. Why is the woman at the garden center? (A) To enroll in a course (B) To join a gardening club (C) To buy some supplies (D) To return a purchase",
   "transcript": "M: Welcome to the garden center. Can I help you?\nW: Hi. I've started growing rose bushes, and I've heard they require special care. Are there any products you can recommend?\nM: Yes! But first, I'd like to show you a great resource on our Web site. Have you seen our blog?\nW: No, I haven't.\nM: We have monthly posts on many gardening topics, and there's a recent one about growing roses.\nW: I'll check it out! Thanks so much.\nM: You're welcome. Now— let me show you our fertilizers. They're in aisle six.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n68. Tại sao người phụ nữ ở trung tâm làm vườn?\n(A) Đăng ký một khóa học\n(B) Tham gia câu lạc bộ làm vườn\n(C) Mua một số vật dụng\n(D) Trả lại hàng\n\nDịch hội thoại:\nNam: Chào mừng đến với trung tâm vườn. Tôi có thể giúp gì cho bạn?\nNữ: Chào. Tôi đã bắt đầu trồng bụi hoa hồng, và tôi nghe chúng cần chăm sóc đặc biệt. Có sản phẩm nào bạn có thể khuyến nghị không?\nNam: Vâng! Nhưng trước tiên, tôi muốn cho bạn xem một tài nguyên tuyệt vời trên trang web của chúng tôi. Bạn đã xem blog của chúng tôi chưa?\nNữ: Không, chưa.\nNam: Chúng tôi có bài đăng hàng tháng về nhiều chủ đề làm vườn, và có một bài gần đây về trồng hoa hồng.\nNữ: Tôi sẽ kiểm tra! Cảm ơn rất nhiều.\nNam: Không có chi. Bây giờ— để tôi cho bạn xem phân bón của chúng tôi. Chúng ở lối đi sáu."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "69. Look at the graphic. Which month's post will the woman most likely read? (A) May’s post (B) June’s post (C) July’s post (D) August’s post",
   "transcript": "M: Welcome to the garden center. Can I help you?\nW: Hi. I've started growing rose bushes, and I've heard they require special care. Are there any products you can recommend?\nM: Yes! But first, I'd like to show you a great resource on our Web site. Have you seen our blog?\nW: No, I haven't.\nM: We have monthly posts on many gardening topics, and there's a recent one about growing roses.\nW: I'll check it out! Thanks so much.\nM: You're welcome. Now— let me show you our fertilizers. They're in aisle six.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n69. Nhìn vào biểu đồ. Bài đăng của tháng nào người phụ nữ có khả năng đọc?\n(A) Bài đăng tháng 5\n(B) Bài đăng tháng 6\n(C) Bài đăng tháng 7\n(D) Bài đăng tháng 8\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNam: Chào mừng đến với trung tâm vườn. Tôi có thể giúp gì cho bạn?\nNữ: Chào. Tôi đã bắt đầu trồng bụi hoa hồng, và tôi nghe chúng cần chăm sóc đặc biệt. Có sản phẩm nào bạn có thể khuyến nghị không?\nNam: Vâng! Nhưng trước tiên, tôi muốn cho bạn xem một tài nguyên tuyệt vời trên trang web của chúng tôi. Bạn đã xem blog của chúng tôi chưa?\nNữ: Không, chưa.\nNam: Chúng tôi có bài đăng hàng tháng về nhiều chủ đề làm vườn, và có một bài gần đây về trồng hoa hồng.\nNữ: Tôi sẽ kiểm tra! Cảm ơn rất nhiều.\nNam: Không có chi. Bây giờ— để tôi cho bạn xem phân bón của chúng tôi. Chúng ở lối đi sáu."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "70. What kind of products will the man show to the woman? (A) Indoor plants (B) Fertilizer (C) Gardening tools (D) Irrigation systems",
   "transcript": "M: Welcome to the garden center. Can I help you?\nW: Hi. I've started growing rose bushes, and I've heard they require special care. Are there any products you can recommend?\nM: Yes! But first, I'd like to show you a great resource on our Web site. Have you seen our blog?\nW: No, I haven't.\nM: We have monthly posts on many gardening topics, and there's a recent one about growing roses.\nW: I'll check it out! Thanks so much.\nM: You're welcome. Now— let me show you our fertilizers. They're in aisle six.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n70. Người đàn ông sẽ giới thiệu cho người phụ nữ loại sản phẩm nào?\n(A) Cây trồng trong nhà\n(B) Phân bón thân thiện với môi trường\n(C) Dụng cụ làm vườn\n(D) Hệ thống tưới tiêu\n\nDịch hội thoại:\nNam: Chào mừng đến với trung tâm vườn. Tôi có thể giúp gì cho bạn?\nNữ: Chào. Tôi đã bắt đầu trồng bụi hoa hồng, và tôi nghe chúng cần chăm sóc đặc biệt. Có sản phẩm nào bạn có thể khuyến nghị không?\nNam: Vâng! Nhưng trước tiên, tôi muốn cho bạn xem một tài nguyên tuyệt vời trên trang web của chúng tôi. Bạn đã xem blog của chúng tôi chưa?\nNữ: Không, chưa.\nNam: Chúng tôi có bài đăng hàng tháng về nhiều chủ đề làm vườn, và có một bài gần đây về trồng hoa hồng.\nNữ: Tôi sẽ kiểm tra! Cảm ơn rất nhiều.\nNam: Không có chi. Bây giờ— để tôi cho bạn xem phân bón của chúng tôi. Chúng ở lối đi sáu."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "71. What field does the speaker most likely work in? (A) Finance (B) Transportation (C) Construction (D) Robotics",
   "transcript": "Attention, Casella Transit customers. Maintenance work on the red and yellow lines will begin next week. You can expect some disruptions to regular service, so please plan ahead. Use the latest version of our mobile phone application for real-time updates. You can receive notifications regarding delays if your train is impacted. Want to save on commuter rides? Purchase your e-ticket through the mobile app as well. Printing a ticket at a kiosk is now subject to additional fees.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n71. Người nói có khả năng làm việc trong lĩnh vực nào?\n(A) Tài chính\n(B) Giao thông vận tải\n(C) Xây dựng\n(D) Người máy\n\nDịch bài nói:\nKhách hàng của Casella Transit chú ý. Công việc bảo trì trên tuyến đỏ và vàng sẽ bắt đầu vào tuần tới. Bạn có thể mong đợi một số gián đoạn đối với dịch vụ thông thường, vì vậy hãy lập kế hoạch trước. Sử dụng phiên bản mới nhất của ứng dụng điện thoại di động của chúng tôi để cập nhật thời gian thực. Bạn có thể nhận thông báo liên quan đến sự chậm trễ nếu tàu của bạn bị ảnh hưởng. Muốn tiết kiệm cho các chuyến đi làm? Mua vé điện tử qua ứng dụng di động cũng vậy. In vé tại ki-ốt bây giờ phải chịu phí bổ sung."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "72. What does the speaker say the listeners can receive notifications about? (A) Route changes (B) Mobile app updates (C) New products (D) Schedule delays",
   "transcript": "Attention, Casella Transit customers. Maintenance work on the red and yellow lines will begin next week. You can expect some disruptions to regular service, so please plan ahead. Use the latest version of our mobile phone application for real-time updates. You can receive notifications regarding delays if your train is impacted. Want to save on commuter rides? Purchase your e-ticket through the mobile app as well. Printing a ticket at a kiosk is now subject to additional fees.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n72. Người nói cho biết người nghe có thể nhận thông báo về điều gì?\n(A) Thay đổi tuyến đường\n(B) Cập nhật ứng dụng điện thoại\n(C) Sản phẩm mới\n(D) Trì hoãn lịch trình\n\nDịch bài nói:\nKhách hàng của Casella Transit chú ý. Công việc bảo trì trên tuyến đỏ và vàng sẽ bắt đầu vào tuần tới. Bạn có thể mong đợi một số gián đoạn đối với dịch vụ thông thường, vì vậy hãy lập kế hoạch trước. Sử dụng phiên bản mới nhất của ứng dụng điện thoại di động của chúng tôi để cập nhật thời gian thực. Bạn có thể nhận thông báo liên quan đến sự chậm trễ nếu tàu của bạn bị ảnh hưởng. Muốn tiết kiệm cho các chuyến đi làm? Mua vé điện tử qua ứng dụng di động cũng vậy. In vé tại ki-ốt bây giờ phải chịu phí bổ sung."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "73. According to the speaker, how can the listeners reduce a cost? (A) By purchasing a digital ticket (B) By reserving multiple permits (C) By traveling at less busy hours (D) By joining a loyalty program",
   "transcript": "Attention, Casella Transit customers. Maintenance work on the red and yellow lines will begin next week. You can expect some disruptions to regular service, so please plan ahead. Use the latest version of our mobile phone application for real-time updates. You can receive notifications regarding delays if your train is impacted. Want to save on commuter rides? Purchase your e-ticket through the mobile app as well. Printing a ticket at a kiosk is now subject to additional fees.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n73. Theo người nói, người nghe có thể giảm chi phí bằng cách nào?\n(A) Mua vé điện tử\n(B) Đặt nhiều giấy phép\n(C) Đi lại vào giờ ít đông\n(D) Tham gia chương trình khách hàng thân thiết\n\nDịch bài nói:\nKhách hàng của Casella Transit chú ý. Công việc bảo trì trên tuyến đỏ và vàng sẽ bắt đầu vào tuần tới. Bạn có thể mong đợi một số gián đoạn đối với dịch vụ thông thường, vì vậy hãy lập kế hoạch trước. Sử dụng phiên bản mới nhất của ứng dụng điện thoại di động của chúng tôi để cập nhật thời gian thực. Bạn có thể nhận thông báo liên quan đến sự chậm trễ nếu tàu của bạn bị ảnh hưởng. Muốn tiết kiệm cho các chuyến đi làm? Mua vé điện tử qua ứng dụng di động cũng vậy. In vé tại ki-ốt bây giờ phải chịu phí bổ sung."
  },
  {
   "number": 74,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "74. What is the purpose of the meeting? (A) To explain a restoration project (B) To prepare for a public event (C) To train some new tour guides (D) To recruit some volunteers",
   "transcript": "Good morning, Glenman House Living Museum staff. Recently, researchers discovered the original plans for the house's gardens from the eighteenth century. So, we're going to restore the gardens based on those plans! Even though we have the original designs, making an authentic re-creation won't be an easy task. We don't know what specific varieties of plants were grown back then. That's why we're so lucky to have Vivek Hazarika consulting on this project. As a gardener who has managed the grounds of many historic estates, he has extensive expertise in what would have been planted at the time.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n74. Mục đích của cuộc họp là gì?\n(A) Giải thích dự án trùng tu\n(B) Chuẩn bị cho một sự kiện công cộng\n(C) Huấn luyện một số hướng dẫn viên mới\n(D) Tuyển một số tình nguyện viên\n\nDịch bài nói:\nChào buổi sáng, nhân viên Bảo tàng Glenman House Living. Gần đây, các nhà nghiên cứu đã phát hiện ra kế hoạch gốc cho khu vườn của ngôi nhà từ thế kỷ"
  },
  {
   "number": 75,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "75. According to the speaker, why will a task be challenging? (A) Funding has not been secured. (B) Unfavorable weather is predicted. (C) Some permits have been delayed. (D) Some important information is missing.",
   "transcript": "Good morning, Glenman House Living Museum staff. Recently, researchers discovered the original plans for the house's gardens from the eighteenth century. So, we're going to restore the gardens based on those plans! Even though we have the original designs, making an authentic re-creation won't be an easy task. We don't know what specific varieties of plants were grown back then. That's why we're so lucky to have Vivek Hazarika consulting on this project. As a gardener who has managed the grounds of many historic estates, he has extensive expertise in what would have been planted at the time.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n75. Theo người nói, tại sao một nhiệm vụ sẽ khó khăn?\n(A) Kinh phí chưa được đảm bảo.\n(B) Dự báo thời tiết không thuận lợi.\n(C) Một số giấy phép bị chậm.\n(D) Một số thông tin quan trọng bị thiếu.\n\nDịch bài nói:\nChào buổi sáng, nhân viên Bảo tàng Glenman House Living. Gần đây, các nhà nghiên cứu đã phát hiện ra kế hoạch gốc cho khu vườn của ngôi nhà từ thế kỷ"
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. Who is Vivek Hazarika? (A) An architect (B) A gardener (C) A salesperson (D) An archaeologist",
   "transcript": "Good morning, Glenman House Living Museum staff. Recently, researchers discovered the original plans for the house's gardens from the eighteenth century. So, we're going to restore the gardens based on those plans! Even though we have the original designs, making an authentic re-creation won't be an easy task. We don't know what specific varieties of plants were grown back then. That's why we're so lucky to have Vivek Hazarika consulting on this project. As a gardener who has managed the grounds of many historic estates, he has extensive expertise in what would have been planted at the time.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n76. Vivek Hazarika là ai?\n(A) Kiến trúc sư\n(B) Người làm vườn\n(C) Nhân viên bán hàng\n(D) Nhà khảo cổ\n\nDịch bài nói:\nChào buổi sáng, nhân viên Bảo tàng Glenman House Living. Gần đây, các nhà nghiên cứu đã phát hiện ra kế hoạch gốc cho khu vườn của ngôi nhà từ thế kỷ"
  },
  {
   "number": 77,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "77. What is the purpose of the session? (A) To discuss customer feedback (B) To explain an attendance policy (C) To discourage mobile phone use (D) To train new sales staff",
   "transcript": "Welcome, new sales representatives, to today's session on cold calling, a sales technique where we call potential clients who haven't heard of us yet. Toward the end of the session you'll each be given a list of prospective parties to call. Now, the people you're contacting are busy and may not be receptive. Your job's to persuade them that what you have to say is worth their while. Be friendly and avoid using scripts. Now we'll listen to some cold call recordings to learn what works and what doesn't.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n77. Mục đích của buổi họp là gì?\n(A) Thảo luận phản hồi của khách hàng\n(B) Giải thích chính sách điểm danh\n(C) Hạn chế việc dùng điện thoại\n(D) Đào tạo nhân viên bán hàng mới\n\nDịch bài nói:\nChào mừng, các đại diện bán hàng mới, đến buổi học hôm nay về cuộc gọi lạnh, một kỹ thuật bán hàng nơi chúng ta gọi cho các khách hàng tiềm năng chưa từng nghe về chúng ta. Vào cuối buổi học, mỗi người sẽ được đưa danh sách các bên tiềm năng để gọi. Bây giờ, những người bạn liên lạc đang bận rộn và có thể không tiếp nhận. Công việc của bạn là thuyết phục họ rằng những gì bạn nói đáng giá thời gian của họ. Hãy thân thiện và tránh sử dụng kịch bản. Bây giờ chúng ta sẽ nghe một số bản ghi cuộc gọi lạnh để học những gì hiệu quả và những gì không."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "78. What will be on a list that the listeners will receive? (A) Potential clients to contact (B) Employees who have exceeded sales goals (C) Projects offered by the company (D) Departments within the company",
   "transcript": "Welcome, new sales representatives, to today's session on cold calling, a sales technique where we call potential clients who haven't heard of us yet. Toward the end of the session you'll each be given a list of prospective parties to call. Now, the people you're contacting are busy and may not be receptive. Your job's to persuade them that what you have to say is worth their while. Be friendly and avoid using scripts. Now we'll listen to some cold call recordings to learn what works and what doesn't.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n78. Danh sách người nghe nhận được sẽ bao gồm gì?\n(A) Khách hàng tiềm năng\n(B) Nhân viên đạt vượt chỉ tiêu\n(C) Dự án công ty cung cấp\n(D) Các phòng ban trong công ty\n\nDịch bài nói:\nChào mừng, các đại diện bán hàng mới, đến buổi học hôm nay về cuộc gọi lạnh, một kỹ thuật bán hàng nơi chúng ta gọi cho các khách hàng tiềm năng chưa từng nghe về chúng ta. Vào cuối buổi học, mỗi người sẽ được đưa danh sách các bên tiềm năng để gọi. Bây giờ, những người bạn liên lạc đang bận rộn và có thể không tiếp nhận. Công việc của bạn là thuyết phục họ rằng những gì bạn nói đáng giá thời gian của họ. Hãy thân thiện và tránh sử dụng kịch bản. Bây giờ chúng ta sẽ nghe một số bản ghi cuộc gọi lạnh để học những gì hiệu quả và những gì không."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "79. What will the listeners do next? (A) Memorize prepared scripts (B) Listen to recorded calls (C) Take a brief survey (D) Brainstorm conversational topics",
   "transcript": "Welcome, new sales representatives, to today's session on cold calling, a sales technique where we call potential clients who haven't heard of us yet. Toward the end of the session you'll each be given a list of prospective parties to call. Now, the people you're contacting are busy and may not be receptive. Your job's to persuade them that what you have to say is worth their while. Be friendly and avoid using scripts. Now we'll listen to some cold call recordings to learn what works and what doesn't.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n79. Người nghe sẽ làm gì tiếp theo?\n(A) Học thuộc bài nói mẫu\n(B) Nghe các cuộc gọi ghi âm\n(C) Làm khảo sát ngắn\n(D) Động não chủ đề hội thoại\n\nDịch bài nói:\nChào mừng, các đại diện bán hàng mới, đến buổi học hôm nay về cuộc gọi lạnh, một kỹ thuật bán hàng nơi chúng ta gọi cho các khách hàng tiềm năng chưa từng nghe về chúng ta. Vào cuối buổi học, mỗi người sẽ được đưa danh sách các bên tiềm năng để gọi. Bây giờ, những người bạn liên lạc đang bận rộn và có thể không tiếp nhận. Công việc của bạn là thuyết phục họ rằng những gì bạn nói đáng giá thời gian của họ. Hãy thân thiện và tránh sử dụng kịch bản. Bây giờ chúng ta sẽ nghe một số bản ghi cuộc gọi lạnh để học những gì hiệu quả và những gì không."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "80. What does the speaker’s company sell? (A) Sound systems (B) Light fixtures (C) Umbrellas (D) Refrigerators",
   "transcript": "Ms. Stewart, this is Rodrigo Gomez, president of Gomez and Sons. I want to apologize personally for the problems your restaurant experienced using our patio umbrellas. At our company, we pride ourselves on doing everything in-house, from graphic design to production. This gives us greater control over the quality of our products. But we do use outside suppliers for parts. Apparently, we received some inferior metal components. We will send you a replacement set of umbrellas at no cost today, constructed with new metal parts.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n80. Công ty người nói bán gì?\n(A) Hệ thống âm thanh\n(B) Đèn chiếu sáng\n(C) Ô/ dù\n(D) Tủ lạnh\n\nDịch bài nói:\nBà Stewart, đây là Rodrigo Gomez, chủ tịch của Gomez and Sons. Tôi muốn xin lỗi cá nhân về những vấn đề mà nhà hàng của bà gặp phải khi sử dụng ô dù sân hiên của chúng tôi. Tại công ty chúng tôi, chúng tôi tự hào về việc làm mọi thứ nội bộ, từ thiết kế đồ họa đến sản xuất. Điều này cho chúng tôi quyền kiểm soát lớn hơn về chất lượng sản phẩm. Nhưng chúng tôi sử dụng nhà cung cấp bên ngoài cho các bộ phận. Rõ ràng, chúng tôi đã nhận được một số thành phần kim loại kém chất lượng. Chúng tôi sẽ gửi cho bà một bộ ô dù thay thế miễn phí hôm nay, được xây dựng với các bộ phận kim loại mới."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "C",
   "group": "80-82",
   "textEn": "81. Why does the speaker say, “we do use outside suppliers for parts”? (A) To recommend a different company (B) To justify an increased price (C) To explain the source of a problem (D) To decline a proposal",
   "transcript": "Ms. Stewart, this is Rodrigo Gomez, president of Gomez and Sons. I want to apologize personally for the problems your restaurant experienced using our patio umbrellas. At our company, we pride ourselves on doing everything in-house, from graphic design to production. This gives us greater control over the quality of our products. But we do use outside suppliers for parts. Apparently, we received some inferior metal components. We will send you a replacement set of umbrellas at no cost today, constructed with new metal parts.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n81. Tại sao người nói lại nói “chúng tôi có dùng nhà cung cấp bên ngoài cho linh kiện”?\n(A) Đề xuất một công ty khác\n(B) Giải thích giá tăng\n(C) Giải thích nguyên nhân của vấn đề\n(D) Từ chối một đề xuất\n\nDịch bài nói:\nBà Stewart, đây là Rodrigo Gomez, chủ tịch của Gomez and Sons. Tôi muốn xin lỗi cá nhân về những vấn đề mà nhà hàng của bà gặp phải khi sử dụng ô dù sân hiên của chúng tôi. Tại công ty chúng tôi, chúng tôi tự hào về việc làm mọi thứ nội bộ, từ thiết kế đồ họa đến sản xuất. Điều này cho chúng tôi quyền kiểm soát lớn hơn về chất lượng sản phẩm. Nhưng chúng tôi sử dụng nhà cung cấp bên ngoài cho các bộ phận. Rõ ràng, chúng tôi đã nhận được một số thành phần kim loại kém chất lượng. Chúng tôi sẽ gửi cho bà một bộ ô dù thay thế miễn phí hôm nay, được xây dựng với các bộ phận kim loại mới."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "82. What does the speaker say he will do today? (A) Interview some applicants (B) Send a shipment (C) Train some staff (D) Update a spreadsheet",
   "transcript": "Ms. Stewart, this is Rodrigo Gomez, president of Gomez and Sons. I want to apologize personally for the problems your restaurant experienced using our patio umbrellas. At our company, we pride ourselves on doing everything in-house, from graphic design to production. This gives us greater control over the quality of our products. But we do use outside suppliers for parts. Apparently, we received some inferior metal components. We will send you a replacement set of umbrellas at no cost today, constructed with new metal parts.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n82. Người nói nói rằng hôm nay ông ấy sẽ làm gì?\n(A) Phỏng vấn ứng viên\n(B) Gửi một kiện hàng\n(C) Huấn luyện nhân viên\n(D) Cập nhật bảng tính\n\nDịch bài nói:\nBà Stewart, đây là Rodrigo Gomez, chủ tịch của Gomez and Sons. Tôi muốn xin lỗi cá nhân về những vấn đề mà nhà hàng của bà gặp phải khi sử dụng ô dù sân hiên của chúng tôi. Tại công ty chúng tôi, chúng tôi tự hào về việc làm mọi thứ nội bộ, từ thiết kế đồ họa đến sản xuất. Điều này cho chúng tôi quyền kiểm soát lớn hơn về chất lượng sản phẩm. Nhưng chúng tôi sử dụng nhà cung cấp bên ngoài cho các bộ phận. Rõ ràng, chúng tôi đã nhận được một số thành phần kim loại kém chất lượng. Chúng tôi sẽ gửi cho bà một bộ ô dù thay thế miễn phí hôm nay, được xây dựng với các bộ phận kim loại mới."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "83. What type of business is being advertised? (A) An event planning company (B) A financial advising service (C) An attorney’s office (D) A staffing agency",
   "transcript": "Temp-Time Work Solutions has hundreds of qualified, temporary workers available to meet any of your staffing needs. Please call us to help your business fill open positions. We are the largest temp agency in the region, with branch offices in six locations. Let Temp-Time help you find the right person to complete just about any job! Call us at 555-0145 and mention this ad to get a twenty percent discount off our fee.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n83. Loại hình doanh nghiệp nào đang được quảng cáo?\n(A) Công ty tổ chức sự kiện\n(B) Dịch vụ tư vấn tài chính\n(C) Văn phòng luật sư\n(D) Công ty cung ứng nhân sự\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nTemp-Time Work Solutions có hàng trăm công nhân tạm thời đủ điều kiện sẵn sàng để đáp ứng bất kỳ nhu cầu nhân sự nào của bạn. Vui lòng gọi cho chúng tôi để giúp doanh nghiệp của bạn lấp đầy các vị trí mở. Chúng tôi là cơ quan tạm thời lớn nhất trong khu vực, với văn phòng chi nhánh ở sáu địa điểm. Hãy để Temp-Time giúp bạn tìm người phù hợp để hoàn thành gần như bất kỳ công việc nào! Gọi cho chúng tôi tại 555-0145 và đề cập đến quảng cáo này để nhận giảm 20 phần trăm phí của chúng tôi."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "84. What aspect of a business does the speaker emphasize? (A) Its large size (B) Its reasonable prices (C) Its business hours (D) Its long history",
   "transcript": "Temp-Time Work Solutions has hundreds of qualified, temporary workers available to meet any of your staffing needs. Please call us to help your business fill open positions. We are the largest temp agency in the region, with branch offices in six locations. Let Temp-Time help you find the right person to complete just about any job! Call us at 555-0145 and mention this ad to get a twenty percent discount off our fee.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n84. Người nói nhấn mạnh điều gì về doanh nghiệp?\n(A) Quy mô lớn\n(B) Giá cả hợp lý\n(C) Giờ hoạt động\n(D) Lịch sử lâu đời\n\nDịch bài nói:\nTemp-Time Work Solutions có hàng trăm công nhân tạm thời đủ điều kiện sẵn sàng để đáp ứng bất kỳ nhu cầu nhân sự nào của bạn. Vui lòng gọi cho chúng tôi để giúp doanh nghiệp của bạn lấp đầy các vị trí mở. Chúng tôi là cơ quan tạm thời lớn nhất trong khu vực, với văn phòng chi nhánh ở sáu địa điểm. Hãy để Temp-Time giúp bạn tìm người phù hợp để hoàn thành gần như bất kỳ công việc nào! Gọi cho chúng tôi tại 555-0145 và đề cập đến quảng cáo này để nhận giảm 20 phần trăm phí của chúng tôi."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "85. How can the listeners receive a discount? (A) By mentioning an advertisement (B) By referring friends (C) By paying with a credit card (D) By using a coupon",
   "transcript": "Temp-Time Work Solutions has hundreds of qualified, temporary workers available to meet any of your staffing needs. Please call us to help your business fill open positions. We are the largest temp agency in the region, with branch offices in six locations. Let Temp-Time help you find the right person to complete just about any job! Call us at 555-0145 and mention this ad to get a twenty percent discount off our fee.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n85. Người nghe có thể nhận được giảm giá bằng cách nào?\n(A) Nhắc đến quảng cáo\n(B) Giới thiệu bạn bè\n(C) Thanh toán bằng thẻ tín dụng\n(D) Dùng phiếu giảm giá\n\nDịch bài nói:\nTemp-Time Work Solutions có hàng trăm công nhân tạm thời đủ điều kiện sẵn sàng để đáp ứng bất kỳ nhu cầu nhân sự nào của bạn. Vui lòng gọi cho chúng tôi để giúp doanh nghiệp của bạn lấp đầy các vị trí mở. Chúng tôi là cơ quan tạm thời lớn nhất trong khu vực, với văn phòng chi nhánh ở sáu địa điểm. Hãy để Temp-Time giúp bạn tìm người phù hợp để hoàn thành gần như bất kỳ công việc nào! Gọi cho chúng tôi tại 555-0145 và đề cập đến quảng cáo này để nhận giảm 20 phần trăm phí của chúng tôi."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "86. What does the speaker mean when he says, “this is an important opportunity”? (A) A new client has an urgent problem. (B) Some information is needed from the listeners. (C) Some deadlines are flexible. (D) The listeners have done a good job.",
   "transcript": "I've just received details about this year's hospitality conference. It looks like it'll be particularly informative this year. It'll be held at the end of the month. Now, I know I've set your project due dates for the end of the month as well, but this is an important opportunity. The conference will feature an expo of vendors who serve hotel chains, which could be useful given that we'll be opening hotels in two new cities next year! Speaking of which, Thilo visited both of those construction sites last week and is now going to give us a progress report.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n86. Người nói muốn nói gì khi nói “đây là một cơ hội quan trọng”?\n(A) Một khách hàng mới có vấn đề khẩn cấp.\n(B) Cần một số thông tin từ người nghe.\n(C) Một số thời hạn có thể linh hoạt.\n(D) Người nghe đã làm tốt.\n\nDịch bài nói:\nTôi vừa nhận được chi tiết về hội nghị khách sạn năm nay. Có vẻ như năm nay sẽ đặc biệt hữu ích. Nó sẽ được tổ chức vào cuối tháng. Bây giờ, tôi biết tôi đã đặt ngày hạn dự án của bạn vào cuối tháng, nhưng đây là cơ hội quan trọng. Hội nghị sẽ có triển lãm của các nhà cung cấp phục vụ chuỗi khách sạn, điều này có thể hữu ích vì chúng ta sẽ mở khách sạn ở hai thành phố mới vào năm tới! Nói về điều đó, Thilo đã thăm cả hai công trường xây dựng đó tuần trước và bây giờ sẽ đưa ra báo cáo tiến độ cho chúng ta."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "87. What will the speaker’s business do next year? (A) Redesign advertising materials (B) Open new locations (C) Hire a new vendor (D) Implement a security policy",
   "transcript": "I've just received details about this year's hospitality conference. It looks like it'll be particularly informative this year. It'll be held at the end of the month. Now, I know I've set your project due dates for the end of the month as well, but this is an important opportunity. The conference will feature an expo of vendors who serve hotel chains, which could be useful given that we'll be opening hotels in two new cities next year! Speaking of which, Thilo visited both of those construction sites last week and is now going to give us a progress report.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n87. Sang năm doanh nghiệp của người nói sẽ làm gì?\n(A) Thiết kế lại tài liệu quảng cáo\n(B) Mở thêm chi nhánh\n(C) Thuê nhà cung cấp mới\n(D) Triển khai chính sách an ninh\n\nDịch bài nói:\nTôi vừa nhận được chi tiết về hội nghị khách sạn năm nay. Có vẻ như năm nay sẽ đặc biệt hữu ích. Nó sẽ được tổ chức vào cuối tháng. Bây giờ, tôi biết tôi đã đặt ngày hạn dự án của bạn vào cuối tháng, nhưng đây là cơ hội quan trọng. Hội nghị sẽ có triển lãm của các nhà cung cấp phục vụ chuỗi khách sạn, điều này có thể hữu ích vì chúng ta sẽ mở khách sạn ở hai thành phố mới vào năm tới! Nói về điều đó, Thilo đã thăm cả hai công trường xây dựng đó tuần trước và bây giờ sẽ đưa ra báo cáo tiến độ cho chúng ta."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "88. What will Thilo do next? (A) Practice his conference presentation (B) Provide a construction update (C) Summarize some financial data (D) Contact a supply vendor",
   "transcript": "I've just received details about this year's hospitality conference. It looks like it'll be particularly informative this year. It'll be held at the end of the month. Now, I know I've set your project due dates for the end of the month as well, but this is an important opportunity. The conference will feature an expo of vendors who serve hotel chains, which could be useful given that we'll be opening hotels in two new cities next year! Speaking of which, Thilo visited both of those construction sites last week and is now going to give us a progress report.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n88. Thilo sẽ làm gì tiếp theo?\n(A) Luyện bài thuyết trình\n(B) Cung cấp cập nhật về xây dựng\n(C) Tóm tắt dữ liệu tài chính\n(D) Liên hệ với nhà cung cấp\n\nDịch bài nói:\nTôi vừa nhận được chi tiết về hội nghị khách sạn năm nay. Có vẻ như năm nay sẽ đặc biệt hữu ích. Nó sẽ được tổ chức vào cuối tháng. Bây giờ, tôi biết tôi đã đặt ngày hạn dự án của bạn vào cuối tháng, nhưng đây là cơ hội quan trọng. Hội nghị sẽ có triển lãm của các nhà cung cấp phục vụ chuỗi khách sạn, điều này có thể hữu ích vì chúng ta sẽ mở khách sạn ở hai thành phố mới vào năm tới! Nói về điều đó, Thilo đã thăm cả hai công trường xây dựng đó tuần trước và bây giờ sẽ đưa ra báo cáo tiến độ cho chúng ta."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "D",
   "group": "89-91",
   "textEn": "89. What does the speaker say is new about this year’s event? (A) It takes place outdoors. (B) It is sponsored by a major publication. (C) It has been sold out for months. (D) It is being streamed live.",
   "transcript": "Welcome to the annual Soundtrack Music Awards show. This year, we're streaming this event live over the Internet for the very first time! Tonight's honoree, Olga Alabi, founded the I-Beat music label in 1996. She has worked tirelessly to bring original soundtrack music to film audiences around the world. Over the years, she has been responsible for discovering and developing some of today's leading composers. In fact, after Ms. Alabi receives her award, some of her most famous clients will perform for us.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n89. Điều gì mới về sự kiện năm nay?\n(A) Diễn ra ngoài trời\n(B) Được tài trợ bởi một tạp chí lớn\n(C) Cháy vé nhiều tháng\n(D) Được phát trực tiếp\n\nDịch bài nói:\nChào mừng đến với chương trình Giải thưởng Âm nhạc Soundtrack hàng năm. Năm nay, chúng tôi đang phát trực tiếp sự kiện này qua Internet lần đầu tiên! Người được vinh danh tối nay, Olga Alabi, đã thành lập nhãn hiệu âm nhạc I-Beat vào năm 1996. Bà ấy đã làm việc không mệt mỏi để mang nhạc nền gốc đến khán giả phim trên toàn thế giới. Qua nhiều năm, bà ấy chịu trách nhiệm phát hiện và phát triển một số nhà soạn nhạc hàng đầu ngày nay. Thực tế, sau khi bà Alabi nhận giải thưởng, một số khách hàng nổi tiếng nhất của bà sẽ biểu diễn cho chúng ta."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "90. Why is Ms. Alabi being recognized? (A) She is a talented songwriter. (B) She invented a musical instrument. (C) She started a major record label. (D) She supports several charities.",
   "transcript": "Welcome to the annual Soundtrack Music Awards show. This year, we're streaming this event live over the Internet for the very first time! Tonight's honoree, Olga Alabi, founded the I-Beat music label in 1996. She has worked tirelessly to bring original soundtrack music to film audiences around the world. Over the years, she has been responsible for discovering and developing some of today's leading composers. In fact, after Ms. Alabi receives her award, some of her most famous clients will perform for us.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n90. Tại sao bà Alabi được vinh danh?\n(A) Bà ấy là nhạc sĩ tài năng\n(B) Bà ấy phát minh nhạc cụ\n(C) Bà ấy lập hãng thu âm lớn\n(D) Bà ấy hỗ trợ nhiều tổ chức từ thiện\n\nDịch bài nói:\nChào mừng đến với chương trình Giải thưởng Âm nhạc Soundtrack hàng năm. Năm nay, chúng tôi đang phát trực tiếp sự kiện này qua Internet lần đầu tiên! Người được vinh danh tối nay, Olga Alabi, đã thành lập nhãn hiệu âm nhạc I-Beat vào năm 1996. Bà ấy đã làm việc không mệt mỏi để mang nhạc nền gốc đến khán giả phim trên toàn thế giới. Qua nhiều năm, bà ấy chịu trách nhiệm phát hiện và phát triển một số nhà soạn nhạc hàng đầu ngày nay. Thực tế, sau khi bà Alabi nhận giải thưởng, một số khách hàng nổi tiếng nhất của bà sẽ biểu diễn cho chúng ta."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "91. According to the speaker, what will happen after Ms. Alabi receives her award? (A) Photographs will be taken. (B) Dinner will be served. (C) Some musicians will perform. (D) Some interviews will be held.",
   "transcript": "Welcome to the annual Soundtrack Music Awards show. This year, we're streaming this event live over the Internet for the very first time! Tonight's honoree, Olga Alabi, founded the I-Beat music label in 1996. She has worked tirelessly to bring original soundtrack music to film audiences around the world. Over the years, she has been responsible for discovering and developing some of today's leading composers. In fact, after Ms. Alabi receives her award, some of her most famous clients will perform for us.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n91. Sau khi bà Alabi nhận giải sẽ có điều gì?\n(A) Chụp ảnh\n(B) Phục vụ bữa tối\n(C) Biểu diễn âm nhạc\n(D) Thực hiện phỏng vấn\n\nDịch bài nói:\nChào mừng đến với chương trình Giải thưởng Âm nhạc Soundtrack hàng năm. Năm nay, chúng tôi đang phát trực tiếp sự kiện này qua Internet lần đầu tiên! Người được vinh danh tối nay, Olga Alabi, đã thành lập nhãn hiệu âm nhạc I-Beat vào năm 1996. Bà ấy đã làm việc không mệt mỏi để mang nhạc nền gốc đến khán giả phim trên toàn thế giới. Qua nhiều năm, bà ấy chịu trách nhiệm phát hiện và phát triển một số nhà soạn nhạc hàng đầu ngày nay. Thực tế, sau khi bà Alabi nhận giải thưởng, một số khách hàng nổi tiếng nhất của bà sẽ biểu diễn cho chúng ta."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "92. Which department does the speaker most likely work in? (A) Sales (B) Accounting (C) Human resources (D) Information technology",
   "transcript": "OK, team, let's discuss our first-quarter sales figures. Unfortunately, retail sales of our smartwatches and other products have continued to fall. Our president has proposed expanding the product line to include a virtual reality headset. And those have been popular lately. You can expect a lot more information at a future meeting. Next on the agenda, Raya will be demonstrating the new software we'll be using to track consumer purchasing trends.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n92. Người nói có khả năng làm việc trong bộ phận nào?\n(A) Kinh doanh\n(B) Kế toán\n(C) Nhân sự\n(D) Công nghệ thông tin\n\nDịch bài nói:\nOK, đội ngũ, hãy thảo luận về con số bán hàng quý đầu tiên của chúng ta. Thật không may, doanh số bán lẻ đồng hồ thông minh và các sản phẩm khác của chúng ta tiếp tục giảm. Chủ tịch của chúng ta đã đề xuất mở rộng dòng sản phẩm để bao gồm tai nghe thực tế ảo. Và những thứ đó rất phổ biến gần đây. Bạn có thể mong đợi nhiều thông tin hơn tại cuộc họp tương lai. Tiếp theo trên nghị trình, Raya sẽ trình diễn phần mềm mới mà chúng ta sẽ sử dụng để theo dõi xu hướng mua sắm của người tiêu dùng."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "93. Why does the speaker say, “those have been popular lately”? (A) To express disbelief (B) To explain a shortage (C) To agree with a proposal (D) To make a correction",
   "transcript": "OK, team, let's discuss our first-quarter sales figures. Unfortunately, retail sales of our smartwatches and other products have continued to fall. Our president has proposed expanding the product line to include a virtual reality headset. And those have been popular lately. You can expect a lot more information at a future meeting. Next on the agenda, Raya will be demonstrating the new software we'll be using to track consumer purchasing trends.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n93. Tại sao người nói nói “những thứ đó gần đây rất phổ biến”?\n(A) Để bày tỏ sự ngạc nhiên\n(B) Để giải thích việc thiếu hàng\n(C) Để đồng ý với đề xuất\n(D) Để sửa thông tin\n\nDịch bài nói:\nOK, đội ngũ, hãy thảo luận về con số bán hàng quý đầu tiên của chúng ta. Thật không may, doanh số bán lẻ đồng hồ thông minh và các sản phẩm khác của chúng ta tiếp tục giảm. Chủ tịch của chúng ta đã đề xuất mở rộng dòng sản phẩm để bao gồm tai nghe thực tế ảo. Và những thứ đó rất phổ biến gần đây. Bạn có thể mong đợi nhiều thông tin hơn tại cuộc họp tương lai. Tiếp theo trên nghị trình, Raya sẽ trình diễn phần mềm mới mà chúng ta sẽ sử dụng để theo dõi xu hướng mua sắm của người tiêu dùng."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "94. What will the listeners do next? (A) Take a lunch break (B) Ask questions about a policy (C) Read a report (D) View a demonstration",
   "transcript": "OK, team, let's discuss our first-quarter sales figures. Unfortunately, retail sales of our smartwatches and other products have continued to fall. Our president has proposed expanding the product line to include a virtual reality headset. And those have been popular lately. You can expect a lot more information at a future meeting. Next on the agenda, Raya will be demonstrating the new software we'll be using to track consumer purchasing trends.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n94. Người nghe sẽ làm gì tiếp theo?\n(A) Nghỉ trưa\n(B) Hỏi về chính sách\n(C) Đọc báo cáo\n(D) Xem trình diễn\n\nDịch bài nói:\nOK, đội ngũ, hãy thảo luận về con số bán hàng quý đầu tiên của chúng ta. Thật không may, doanh số bán lẻ đồng hồ thông minh và các sản phẩm khác của chúng ta tiếp tục giảm. Chủ tịch của chúng ta đã đề xuất mở rộng dòng sản phẩm để bao gồm tai nghe thực tế ảo. Và những thứ đó rất phổ biến gần đây. Bạn có thể mong đợi nhiều thông tin hơn tại cuộc họp tương lai. Tiếp theo trên nghị trình, Raya sẽ trình diễn phần mềm mới mà chúng ta sẽ sử dụng để theo dõi xu hướng mua sắm của người tiêu dùng."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "95. Where are the listeners? (A) At a farm (B) At a factory (C) At a museum (D) At a stadium",
   "transcript": "Please follow me, and we'll begin today's tour. Now, I know not everyone who takes this all-access tour is a football fan. Many of our visitors are just curious about how a modern sports facility of this size operates. Well, you'll get to see that and much more. And fortunately, today's forecast shows a mix of sun and clouds, with no rain. That's just the right combination for spending some time outside on the field comfortably. Also, as a heads-up, a shuttle bus will meet us at the end of the tour to bring us all back to the parking lot.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n95. Người nghe đang ở đâu?\n(A) Trang trại\n(B) Nhà máy\n(C) Bảo tàng\n(D) Sân vận động\n\nDịch bài nói:\nVui lòng theo tôi, và chúng ta sẽ bắt đầu tour hôm nay. Bây giờ, tôi biết không phải ai tham gia tour toàn quyền này cũng là fan bóng đá. Nhiều du khách của chúng tôi chỉ tò mò về cách một cơ sở thể thao hiện đại kích thước này hoạt động. Chà, bạn sẽ được thấy điều đó và nhiều hơn nữa. Và may mắn thay, dự báo hôm nay cho thấy sự kết hợp giữa nắng và mây, không mưa. Đó là sự kết hợp vừa phải để dành thời gian ngoài trời trên sân một cách thoải mái. Ngoài ra, như một lưu ý, một xe buýt đưa đón sẽ gặp chúng ta ở cuối tour để đưa tất cả chúng ta về bãi đậu xe."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "96. Look at the graphic. When is the tour taking place? (A) On Monday (B) On Tuesday (C) On Wednesday (D) On Thursday",
   "transcript": "Please follow me, and we'll begin today's tour. Now, I know not everyone who takes this all-access tour is a football fan. Many of our visitors are just curious about how a modern sports facility of this size operates. Well, you'll get to see that and much more. And fortunately, today's forecast shows a mix of sun and clouds, with no rain. That's just the right combination for spending some time outside on the field comfortably. Also, as a heads-up, a shuttle bus will meet us at the end of the tour to bring us all back to the parking lot.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n96. Theo biểu đồ, chuyến tham quan diễn ra vào ngày nào?\n(A) Thứ Hai\n(B) Thứ Ba\n(C) Thứ Tư\n(D) Thứ Năm\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nVui lòng theo tôi, và chúng ta sẽ bắt đầu tour hôm nay. Bây giờ, tôi biết không phải ai tham gia tour toàn quyền này cũng là fan bóng đá. Nhiều du khách của chúng tôi chỉ tò mò về cách một cơ sở thể thao hiện đại kích thước này hoạt động. Chà, bạn sẽ được thấy điều đó và nhiều hơn nữa. Và may mắn thay, dự báo hôm nay cho thấy sự kết hợp giữa nắng và mây, không mưa. Đó là sự kết hợp vừa phải để dành thời gian ngoài trời trên sân một cách thoải mái. Ngoài ra, như một lưu ý, một xe buýt đưa đón sẽ gặp chúng ta ở cuối tour để đưa tất cả chúng ta về bãi đậu xe."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "97. What will happen at the end of the tour? (A) Pictures will be taken. (B) Food will be served. (C) Gifts will be given out. (D) A shuttle bus will arrive.",
   "transcript": "Please follow me, and we'll begin today's tour. Now, I know not everyone who takes this all-access tour is a football fan. Many of our visitors are just curious about how a modern sports facility of this size operates. Well, you'll get to see that and much more. And fortunately, today's forecast shows a mix of sun and clouds, with no rain. That's just the right combination for spending some time outside on the field comfortably. Also, as a heads-up, a shuttle bus will meet us at the end of the tour to bring us all back to the parking lot.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n97. Điều gì sẽ xảy ra vào cuối chuyến tham quan?\n(A) Chụp ảnh\n(B) Phục vụ đồ ăn\n(C) Tặng quà\n(D) Xe đưa đón sẽ đến\n\nDịch bài nói:\nVui lòng theo tôi, và chúng ta sẽ bắt đầu tour hôm nay. Bây giờ, tôi biết không phải ai tham gia tour toàn quyền này cũng là fan bóng đá. Nhiều du khách của chúng tôi chỉ tò mò về cách một cơ sở thể thao hiện đại kích thước này hoạt động. Chà, bạn sẽ được thấy điều đó và nhiều hơn nữa. Và may mắn thay, dự báo hôm nay cho thấy sự kết hợp giữa nắng và mây, không mưa. Đó là sự kết hợp vừa phải để dành thời gian ngoài trời trên sân một cách thoải mái. Ngoài ra, như một lưu ý, một xe buýt đưa đón sẽ gặp chúng ta ở cuối tour để đưa tất cả chúng ta về bãi đậu xe."
  },
  {
   "number": 98,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "98. What type of event is being held tonight? (A) A grand opening (B) A company anniversary (C) A retirement party (D) A wedding celebration",
   "transcript": "As you all know, we're hosting a large event tonight. It's a dinner party to celebrate the retirement of a longtime employee of Jalton Incorporated. The chefs are already prepping dinner, and I need you all to set up the ballroom. Here's the assignment list. There's just one change. Amanda couldn't make it, so Kota's covering for her and will take Amanda's assignment. Now, I have a meeting with a potential client at noon, but otherwise, I'll be available all day if anything comes up.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n98. Sự kiện diễn ra tối nay là gì?\n(A) Khai trương\n(B) Kỷ niệm công ty\n(C) Tiệc nghỉ hưu\n(D) Lễ cưới\n\nDịch bài nói:\nNhư tất cả các bạn biết, chúng ta đang tổ chức một sự kiện lớn tối nay. Đó là bữa tiệc tối để kỷ niệm sự nghỉ hưu của một nhân viên lâu năm của Jalton Incorporated. Các đầu bếp đã chuẩn bị bữa tối, và tôi cần tất cả các bạn thiết lập phòng khiêu vũ. Đây là danh sách phân công. Chỉ có một thay đổi. Amanda không thể đến, vì vậy Kota đang thay thế cho cô ấy và sẽ đảm nhận phân công của Amanda. Bây giờ, tôi có cuộc họp với một khách hàng tiềm năng vào buổi trưa, nhưng ngoài ra, tôi sẽ sẵn sàng cả ngày nếu có gì xảy ra."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "B",
   "group": "98-100",
   "textEn": "99. Look at the graphic. Which assignment will Kota be responsible for? (A) Organizing the food-serving station (B) Hanging decorations (C) Creating flower arrangements (D) Setting up tables and chairs",
   "transcript": "As you all know, we're hosting a large event tonight. It's a dinner party to celebrate the retirement of a longtime employee of Jalton Incorporated. The chefs are already prepping dinner, and I need you all to set up the ballroom. Here's the assignment list. There's just one change. Amanda couldn't make it, so Kota's covering for her and will take Amanda's assignment. Now, I have a meeting with a potential client at noon, but otherwise, I'll be available all day if anything comes up.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n99. Theo bảng phân công, Kota sẽ chịu trách nhiệm cho việc gì?\n(A) Tổ chức khu phục vụ đồ ăn\n(B) Trang trí\n(C) Làm hoa trang trí\n(D) Sắp bàn ghế\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nNhư tất cả các bạn biết, chúng ta đang tổ chức một sự kiện lớn tối nay. Đó là bữa tiệc tối để kỷ niệm sự nghỉ hưu của một nhân viên lâu năm của Jalton Incorporated. Các đầu bếp đã chuẩn bị bữa tối, và tôi cần tất cả các bạn thiết lập phòng khiêu vũ. Đây là danh sách phân công. Chỉ có một thay đổi. Amanda không thể đến, vì vậy Kota đang thay thế cho cô ấy và sẽ đảm nhận phân công của Amanda. Bây giờ, tôi có cuộc họp với một khách hàng tiềm năng vào buổi trưa, nhưng ngoài ra, tôi sẽ sẵn sàng cả ngày nếu có gì xảy ra."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "100. What does the speaker say she has to do at noon? (A) Go to the airport (B) Pick up some tablecloths (C) Cook a meal (D) Attend a meeting",
   "transcript": "As you all know, we're hosting a large event tonight. It's a dinner party to celebrate the retirement of a longtime employee of Jalton Incorporated. The chefs are already prepping dinner, and I need you all to set up the ballroom. Here's the assignment list. There's just one change. Amanda couldn't make it, so Kota's covering for her and will take Amanda's assignment. Now, I have a meeting with a potential client at noon, but otherwise, I'll be available all day if anything comes up.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n100. Người nói nói rằng cô ấy phải làm gì vào buổi trưa?\n(A) Ra sân bay\n(B) Lấy khăn trải bàn\n(C) Nấu ăn\n(D) Dự họp\n\nDịch bài nói:\nNhư tất cả các bạn biết, chúng ta đang tổ chức một sự kiện lớn tối nay. Đó là bữa tiệc tối để kỷ niệm sự nghỉ hưu của một nhân viên lâu năm của Jalton Incorporated. Các đầu bếp đã chuẩn bị bữa tối, và tôi cần tất cả các bạn thiết lập phòng khiêu vũ. Đây là danh sách phân công. Chỉ có một thay đổi. Amanda không thể đến, vì vậy Kota đang thay thế cho cô ấy và sẽ đảm nhận phân công của Amanda. Bây giờ, tôi có cuộc họp với một khách hàng tiềm năng vào buổi trưa, nhưng ngoài ra, tôi sẽ sẵn sàng cả ngày nếu có gì xảy ra."
  }
 ],
 "5": [
  {
   "number": 1,
   "part": 1,
   "answer": "C",
   "textEn": "(A) She's pushing a large container down a hallway. (B) She's looking at information on a laptop screen. (C) She's sorting through paper files. (D) She's placing a hat on top of a file cabinet.",
   "transcript": "(A) She's pushing a large container down a hallway.\n(B) She's looking at information on a laptop screen.\n(C) She's sorting through paper files.\n(D) She's placing a hat on top of a file cabinet.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Cô ấy đang đẩy một container lớn xuống hành lang.\n(B) Cô ấy đang xem thông tin trên màn hình laptop.\n(C) Cô ấy đang sắp xếp các tập hồ sơ giấy.\n(D) Cô ấy đang đặt một chiếc mũ lên trên tủ hồ sơ."
  },
  {
   "number": 2,
   "part": 1,
   "answer": "B",
   "textEn": "(A) A worker is painting lines on the floor. (B) A worker is using a machine to move some boxes. (C) A worker is sealing some packages. (D) A worker is repairing a motor.",
   "transcript": "(A) A worker is painting lines on the floor.\n(B) A worker is using a machine to move some boxes.\n(C) A worker is sealing some packages.\n(D) A worker is repairing a motor.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một công nhân đang vẽ/sơn các đường kẻ trên sàn.\n(B) Một công nhân đang dùng máy để di chuyển một số thùng hộp.\n(C) Một công nhân đang niêm phong/dán kín một số gói hàng.\n(D) Một công nhân đang sửa chữa một động cơ."
  },
  {
   "number": 3,
   "part": 1,
   "answer": "A",
   "textEn": "(A) There are beverages available inside a tent. (B) There are some people riding in an automobile. (C) The man is reaching for a water bottle. (D) The woman is moving some furniture.",
   "transcript": "(A) There are beverages available inside a tent.\n(B) There are some people riding in an automobile.\n(C) The man is reaching for a water bottle.\n(D) The woman is moving some furniture.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Có đồ uống có sẵn bên trong một cái lều.\n(B) Có một số người đang ngồi trong xe hơi.\n(C) Người đàn ông đang với tay lấy một chai nước.\n(D) Người phụ nữ đang di chuyển một số đồ nội thất."
  },
  {
   "number": 4,
   "part": 1,
   "answer": "D",
   "textEn": "(A) The door of a clothing store has been propped open. (B) Customers are waiting to enter a clothing store. (C) One of the customers is trying on a jacket. (D) Clothing is displayed outside on racks.",
   "transcript": "(A) The door of a clothing store has been propped open.\n(B) Customers are waiting to enter a clothing store.\n(C) One of the customers is trying on a jacket.\n(D) Clothing is displayed outside on racks.",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Cửa của một cửa hàng quần áo đã được chống mở (mở toang ra).\n(B) Khách hàng đang chờ để vào cửa hàng quần áo.\n(C) Một trong những khách hàng đang thử một chiếc áo khoác.\n(D) Quần áo đang được trưng bày bên ngoài trên các giá treo."
  },
  {
   "number": 5,
   "part": 1,
   "answer": "B",
   "textEn": "(A) One of the men is lowering some window shades. (B) One of the men is writing on a poster board. (C) One of the women is putting on a sweater. (D) One of the women is reading from a notebook.",
   "transcript": "(A) One of the men is lowering some window shades.\n(B) One of the men is writing on a poster board.\n(C) One of the women is putting on a sweater.\n(D) One of the women is reading from a notebook.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một trong những người đàn ông đang hạ một số rèm cửa sổ xuống.\n(B) Một trong những người đàn ông đang viết lên bảng áp phích.\n(C) Một trong những người phụ nữ đang mặc áo len.\n(D) Một trong những người phụ nữ đang đọc từ cuốn sổ tay."
  },
  {
   "number": 6,
   "part": 1,
   "answer": "B",
   "textEn": "(A) One of the cars is stopped at a stop sign. (B) Some tires are stacked against a building. (C) Some vehicles are being washed. (D) A motorcycle is going through a gate.",
   "transcript": "(A) One of the cars is stopped at a stop sign.\n(B) Some tires are stacked against a building.\n(C) Some vehicles are being washed.\n(D) A motorcycle is going through a gate.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một trong những chiếc xe hơi đang dừng lại ở biển báo dừng.\n(B) Một số lốp xe được xếp chồng vào tường của một tòa nhà.\n(C) Một số phương tiện đang được rửa.\n(D) Một chiếc xe máy đang đi qua cổng."
  },
  {
   "number": 7,
   "part": 2,
   "answer": "B",
   "textEn": "Where did you put the invoice from Stanson Incorporated? (A) No, not yet. (B) On your desk. (C) The post office is crowded today.",
   "transcript": "Where did you put the invoice from Stanson Incorporated?\n(A) No, not yet.\n(B) On your desk.\n(C) The post office is crowded today.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn đã đặt hóa đơn từ Stanson Incorporated ở đâu?\n(A) Không, vẫn chưa.\n(B) Trên bàn làm việc của bạn.\n(C) Bưu điện hôm nay đông đúc lắm."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "B",
   "textEn": "Is the inspector coming this afternoon or tomorrow morning? (A) The exterior light isn't working. (B) He'll be here tomorrow. (C) I'll take the next right turn.",
   "transcript": "Is the inspector coming this afternoon or tomorrow morning?\n(A) The exterior light isn't working.\n(B) He'll be here tomorrow.\n(C) I'll take the next right turn.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nThanh tra viên sẽ đến chiều nay hay sáng mai?\n(A) Đèn bên ngoài không hoạt động.\n(B) Ông ấy sẽ đến đây vào ngày mai.\n(C) Tôi sẽ rẽ phải ở ngã rẽ tiếp theo."
  },
  {
   "number": 9,
   "part": 2,
   "answer": "B",
   "textEn": "What's the total cost to remodel the office lobby? (A) The view from this window is great. (B) Over 50,000 dollars. (C) No, a sofa and table.",
   "transcript": "What's the total cost to remodel the office lobby?\n(A) The view from this window is great.\n(B) Over 50,000 dollars.\n(C) No, a sofa and table.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nChi phí tổng để cải tạo sảnh văn phòng là bao nhiêu?\n(A) Quang cảnh từ cửa sổ này tuyệt vời.\n(B) Hơn 50.000 đô la.\n(C) Không, một ghế sofa và bàn."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "C",
   "textEn": "Are you getting the same type of desk or a different one? (A) It's conveniently located. (B) I can pick it up for you. (C) The same type.",
   "transcript": "Are you getting the same type of desk or a different one?\n(A) It's conveniently located.\n(B) I can pick it up for you.\n(C) The same type.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn đang mua cùng loại bàn làm việc hay loại khác?\n(A) Nó nằm ở vị trí thuận tiện.\n(B) Tôi có thể lấy nó cho bạn.\n(C) Cùng loại."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "B",
   "textEn": "We're taking the clients to the theater this evening. (A) He already ate. (B) I'll reserve a taxi. (C) From Australia.",
   "transcript": "We're taking the clients to the theater this evening.\n(A) He already ate.\n(B) I'll reserve a taxi.\n(C) From Australia.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nChúng tôi sẽ đưa khách hàng đến rạp hát tối nay.\n(A) Anh ấy đã ăn rồi.\n(B) Tôi sẽ đặt taxi.\n(C) Từ Úc."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "C",
   "textEn": "When is your budget report due? (A) It was too expensive. (B) I don't need one. (C) By Tuesday at the latest.",
   "transcript": "When is your budget report due?\n(A) It was too expensive.\n(B) I don't need one.\n(C) By Tuesday at the latest.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBáo cáo ngân sách của bạn hạn chót là khi nào?\n(A) Nó quá đắt.\n(B) Tôi không cần.\n(C) Muộn nhất là thứ Ba."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "Who can I talk to about getting a membership at this fitness center? (A) A monthly bill. (B) Some new workout equipment. (C) I can help you with that.",
   "transcript": "Who can I talk to about getting a membership at this fitness center?\n(A) A monthly bill.\n(B) Some new workout equipment.\n(C) I can help you with that.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTôi có thể nói chuyện với ai về việc đăng ký thành viên tại trung tâm thể dục này?\n(A) Hóa đơn hàng tháng.\n(B) Một số thiết bị tập luyện mới.\n(C) Tôi có thể giúp bạn."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "B",
   "textEn": "Are you planning to buy a house in the city? (A) A housecleaning company. (B) I don't want to move. (C) I'll be waiting at the post office.",
   "transcript": "Are you planning to buy a house in the city?\n(A) A housecleaning company.\n(B) I don't want to move.\n(C) I'll be waiting at the post office.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn có kế hoạch mua nhà ở thành phố không?\n(A) Một công ty dọn nhà.\n(B) Tôi không muốn chuyển đi.\n(C) Tôi sẽ chờ ở bưu điện."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "B",
   "textEn": "How did you decide on a venue for the fund-raising event? (A) A small contribution. (B) I got a recommendation from a friend. (C) To buy books for the library.",
   "transcript": "How did you decide on a venue for the fund-raising event?\n(A) A small contribution.\n(B) I got a recommendation from a friend.\n(C) To buy books for the library.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn đã quyết định địa điểm cho sự kiện gây quỹ như thế nào?\n(A) Một khoản đóng góp nhỏ.\n(B) Tôi nhận được lời giới thiệu từ bạn bè.\n(C) Để mua sách cho thư viện."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "C",
   "textEn": "Could you help Ms. Ishida update the expense reports? (A) It's an electric vehicle. (B) This restaurant is expensive. (C) I'll have time after my meeting.",
   "transcript": "Could you help Ms. Ishida update the expense reports?\n(A) It's an electric vehicle.\n(B) This restaurant is expensive.\n(C) I'll have time after my meeting.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn có thể giúp cô Ishida cập nhật báo cáo chi phí không?\n(A) Đó là xe điện.\n(B) Nhà hàng này đắt đỏ.\n(C) Tôi sẽ có thời gian sau cuộc họp."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "C",
   "textEn": "The sales representatives really appreciated the training we led. (A) The new transportation center nearby. (B) No, but there is a manual online. (C) Yes, they seemed to find it helpful.",
   "transcript": "The sales representatives really appreciated the training we led.\n(A) The new transportation center nearby.\n(B) No, but there is a manual online.\n(C) Yes, they seemed to find it helpful.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nCác đại diện bán hàng thực sự đánh giá cao buổi đào tạo chúng tôi dẫn dắt.\n(A) Trung tâm giao thông mới gần đó.\n(B) Không, nhưng có hướng dẫn trực tuyến.\n(C) Có, họ dường như thấy nó hữu ích."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "A",
   "textEn": "Do you know who was promoted to senior director? (A) It hasn't been announced yet. (B) I received my promotional gift yesterday. (C) I've seen that film.",
   "transcript": "Do you know who was promoted to senior director?\n(A) It hasn't been announced yet.\n(B) I received my promotional gift yesterday.\n(C) I've seen that film.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn có biết ai được thăng chức lên giám đốc cấp cao không?\n(A) Nó chưa được công bố.\n(B) Tôi nhận quà khuyến mãi của mình hôm qua.\n(C) Tôi đã xem phim đó."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "B",
   "textEn": "Isn't the registration deadline tomorrow? (A) Here's a map that you can use. (B) No, it's next week. (C) My office is on the ninth floor.",
   "transcript": "Isn't the registration deadline tomorrow?\n(A) Here's a map that you can use.\n(B) No, it's next week.\n(C) My office is on the ninth floor.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nHạn chót đăng ký không phải là ngày mai sao?\n(A) Đây là bản đồ bạn có thể sử dụng.\n(B) Không, là tuần sau.\n(C) Văn phòng của tôi ở tầng chín."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "B",
   "textEn": "Would you like some help installing that new software? (A) No, I'm sure we sent it out yesterday. (B) Thanks, but I know how to do it. (C) He can type very fast.",
   "transcript": "Would you like some help installing that new software?\n(A) No, I'm sure we sent it out yesterday.\n(B) Thanks, but I know how to do it.\n(C) He can type very fast.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn có cần giúp đỡ để cài đặt phần mềm mới không?\n(A) Không, tôi chắc chúng tôi đã gửi nó hôm qua.\n(B) Cảm ơn, nhưng tôi biết cách làm.\n(C) Anh ấy có thể đánh máy rất nhanh."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "C",
   "textEn": "Our factory makes the best cookies in the city. (A) A cup of sugar. (B) He worked an afternoon shift. (C) Aren't they delicious?",
   "transcript": "Our factory makes the best cookies in the city.\n(A) A cup of sugar.\n(B) He worked an afternoon shift.\n(C) Aren't they delicious?",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nNhà máy của chúng tôi làm bánh quy ngon nhất thành phố.\n(A) Một cốc đường.\n(B) Anh ấy làm ca chiều.\n(C) Chúng thật ngon đúng không?"
  },
  {
   "number": 22,
   "part": 2,
   "answer": "C",
   "textEn": "The fruit market is still selling mangoes, isn't it? (A) No thanks—I don't need anything. (B) There's a waiting area in the lobby. (C) Yes, I bought some there yesterday.",
   "transcript": "The fruit market is still selling mangoes, isn't it?\n(A) No thanks—I don't need anything.\n(B) There's a waiting area in the lobby.\n(C) Yes, I bought some there yesterday.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nChợ trái cây vẫn bán xoài, phải không?\n(A) Không cảm ơn—Tôi không cần gì.\n(B) Có khu vực chờ ở sảnh.\n(C) Có, tôi mua một ít ở đó hôm qua."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "C",
   "textEn": "Why are you staying in the office for lunch? (A) No, they weren't. (B) Just a salad and soup, please. (C) Because it is raining.",
   "transcript": "Why are you staying in the office for lunch?\n(A) No, they weren't.\n(B) Just a salad and soup, please.\n(C) Because it is raining.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTại sao bạn ở lại văn phòng ăn trưa?\n(A) Không, chúng không phải.\n(B) Chỉ salad và súp thôi, làm ơn.\n(C) Vì trời đang mưa."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "C",
   "textEn": "How did the company basketball team play last night? (A) Sure, I'll have a few. (B) How can I sign up? (C) The game was canceled.",
   "transcript": "How did the company basketball team play last night?\n(A) Sure, I'll have a few.\n(B) How can I sign up?\n(C) The game was canceled.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nĐội bóng rổ của công ty chơi thế nào tối qua?\n(A) Chắc chắn, tôi sẽ lấy vài cái.\n(B) Tôi đăng ký thế nào?\n(C) Trận đấu bị hủy."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "Isn't our department's quarterly report supposed to be sent out today? (A) No, he drinks coffee. (B) There's a lot of information to include. (C) Some office supplies.",
   "transcript": "Isn't our department's quarterly report supposed to be sent out today?\n(A) No, he drinks coffee.\n(B) There's a lot of information to include.\n(C) Some office supplies.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBáo cáo hàng quý của bộ phận chúng ta không phải gửi hôm nay sao?\n(A) Không, anh ấy uống cà phê.\n(B) Có nhiều thông tin cần bao gồm.\n(C) Một số vật dụng văn phòng."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "B",
   "textEn": "Would you like a copy of the article I mentioned? (A) No, I'm not. (B) Yes, I'd appreciate that. (C) A Thursday morning appointment.",
   "transcript": "Would you like a copy of the article I mentioned?\n(A) No, I'm not.\n(B) Yes, I'd appreciate that.\n(C) A Thursday morning appointment.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn có muốn một bản sao bài báo tôi đề cập không?\n(A) Không, tôi không.\n(B) Có, tôi đánh giá cao điều đó.\n(C) Một cuộc hẹn sáng thứ Năm."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "A",
   "textEn": "Did you decide on the design for the new logo? (A) There are so many good options. (B) Please adjust that sign by the door. (C) Maybe he'll arrive today.",
   "transcript": "Did you decide on the design for the new logo?\n(A) There are so many good options.\n(B) Please adjust that sign by the door.\n(C) Maybe he'll arrive today.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn đã quyết định thiết kế cho logo mới chưa?\n(A) Có quá nhiều lựa chọn tốt.\n(B) Làm ơn điều chỉnh biển báo bên cửa.\n(C) Có lẽ anh ấy sẽ đến hôm nay."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "C",
   "textEn": "Our bookstore is having a sale today, isn't it? (A) Sure, you can use my printer. (B) I really enjoyed that book. (C) It's only a small discount.",
   "transcript": "Our bookstore is having a sale today, isn't it?\n(A) Sure, you can use my printer.\n(B) I really enjoyed that book.\n(C) It's only a small discount.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nHiệu sách của chúng ta đang giảm giá hôm nay, phải không?\n(A) Chắc chắn, bạn có thể dùng máy in của tôi.\n(B) Tôi thực sự thích cuốn sách đó.\n(C) Chỉ giảm giá nhỏ thôi."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "Why haven't the painters arrived yet? (A) The keys are in the desk drawer. (B) No, that's all right. (C) I heard that traffic is heavy this morning.",
   "transcript": "Why haven't the painters arrived yet?\n(A) The keys are in the desk drawer.\n(B) No, that's all right.\n(C) I heard that traffic is heavy this morning.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTại sao thợ sơn chưa đến vậy?\n(A) Chìa khóa ở trong ngăn kéo bàn.\n(B) Không, không sao đâu.\n(C) Tôi nghe nói giao thông sáng nay đông đúc."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "B",
   "textEn": "Should I bring some flowers or some food to the party? (A) He's right down the hall. (B) Don't you live next to a florist's shop? (C) A few more hours.",
   "transcript": "Should I bring some flowers or some food to the party?\n(A) He's right down the hall.\n(B) Don't you live next to a florist's shop?\n(C) A few more hours.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi nên mang hoa hay thức ăn đến bữa tiệc?\n(A) Anh ấy ở ngay cuối hành lang.\n(B) Bạn không sống cạnh tiệm hoa sao?\n(C) Thêm vài giờ nữa."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "A",
   "textEn": "The meeting can wait until tomorrow. (A) I'll make sure the room is set up. (B) Did you bring an umbrella? (C) No, he wasn't.",
   "transcript": "The meeting can wait until tomorrow.\n(A) I'll make sure the room is set up.\n(B) Did you bring an umbrella?\n(C) No, he wasn't.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCuộc họp có thể chờ đến ngày mai.\n(A) Tôi sẽ đảm bảo phòng được chuẩn bị.\n(B) Bạn có mang ô không?\n(C) Không, anh ấy không phải."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "D",
   "group": "32-34",
   "textEn": "32. What does the woman ask the man to do for her? (A) Greet a client in the lobby (B) Present a product pitch (C) Organize some binders (D) Make some photocopies",
   "transcript": "W: Hello, Tariq. Could you do me a favor?\nM: Sure—what is it?\nW: I'm meeting with the Gerhard Group at ten A.M. for the product pitch, and I need copies of your market analysis report made for each representative.\nM: Aren't you at the office right now?\nW: Actually, I came in early today, but I couldn't get the copy machine to work.\nM: Seriously? We bought it last month!\nW: I'm afraid so.\nM: I just got off the train. I'll stop at Business Express on McAllister Street and take care of it on my way to the office.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n32. Người phụ nữ yêu cầu người đàn ông làm gì cho cô ấy?\n(A) Chào đón khách trong sảnh\n(B) Trình bày một bài giới thiệu sản phẩm\n(C) Sắp xếp một số bìa còng\n(D) Sao chép một số tài liệu\n\nDịch hội thoại:\nW: Chào Tariq. Bạn có thể giúp tôi một việc không?\nM: Chắc chắn rồi—việc gì vậy? W Tôi sẽ gặp nhóm Gerhard lúc 10 giờ sáng để trình bày sản phẩm, và tôi cần bản sao báo cáo phân tích thị trường của bạn cho từng đại diện.\nM: Bạn không đang ở văn phòng sao?\nW: Thực ra, tôi đến sớm hôm nay, nhưng không thể làm máy photocopy hoạt động.\nM: Thật sao? Chúng ta mua nó tháng trước mà!\nW: Tôi e là vậy. M Tôi vừa xuống tàu. Tôi sẽ ghé Business Express trên phố McAllister và xử lý việc đó trên đường đến văn phòng."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "33. What does the man say about some equipment? (A) It is operating smoothly. (B) It was purchased recently. (C) It needs to be plugged in. (D) It has not yet been updated.",
   "transcript": "W: Hello, Tariq. Could you do me a favor?\nM: Sure—what is it?\nW: I'm meeting with the Gerhard Group at ten A.M. for the product pitch, and I need copies of your market analysis report made for each representative.\nM: Aren't you at the office right now?\nW: Actually, I came in early today, but I couldn't get the copy machine to work.\nM: Seriously? We bought it last month!\nW: I'm afraid so.\nM: I just got off the train. I'll stop at Business Express on McAllister Street and take care of it on my way to the office.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n33. Người đàn ông nói gì về một số thiết bị?\n(A) Nó đang hoạt động trơn tru.\n(B) Nó vừa được mua gần đây.\n(C) Nó cần được cắm điện.\n(D) Nó chưa được cập nhật.\n\nDịch hội thoại:\nW: Chào Tariq. Bạn có thể giúp tôi một việc không?\nM: Chắc chắn rồi—việc gì vậy? W Tôi sẽ gặp nhóm Gerhard lúc 10 giờ sáng để trình bày sản phẩm, và tôi cần bản sao báo cáo phân tích thị trường của bạn cho từng đại diện.\nM: Bạn không đang ở văn phòng sao?\nW: Thực ra, tôi đến sớm hôm nay, nhưng không thể làm máy photocopy hoạt động.\nM: Thật sao? Chúng ta mua nó tháng trước mà!\nW: Tôi e là vậy. M Tôi vừa xuống tàu. Tôi sẽ ghé Business Express trên phố McAllister và xử lý việc đó trên đường đến văn phòng."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "34. Where is the man? (A) At the office (B) At a train station (C) At a store (D) At a client’s headquarters",
   "transcript": "W: Hello, Tariq. Could you do me a favor?\nM: Sure—what is it?\nW: I'm meeting with the Gerhard Group at ten A.M. for the product pitch, and I need copies of your market analysis report made for each representative.\nM: Aren't you at the office right now?\nW: Actually, I came in early today, but I couldn't get the copy machine to work.\nM: Seriously? We bought it last month!\nW: I'm afraid so.\nM: I just got off the train. I'll stop at Business Express on McAllister Street and take care of it on my way to the office.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n34. Người phụ nữ đang ở đâu?\n(A) Tại văn phòng\n(B) Tại trạm tàu\n(C) Tại cửa hàng\n(D) Tại trụ sở của khách hàng\n\nDịch hội thoại:\nW: Chào Tariq. Bạn có thể giúp tôi một việc không?\nM: Chắc chắn rồi—việc gì vậy? W Tôi sẽ gặp nhóm Gerhard lúc 10 giờ sáng để trình bày sản phẩm, và tôi cần bản sao báo cáo phân tích thị trường của bạn cho từng đại diện.\nM: Bạn không đang ở văn phòng sao?\nW: Thực ra, tôi đến sớm hôm nay, nhưng không thể làm máy photocopy hoạt động.\nM: Thật sao? Chúng ta mua nó tháng trước mà!\nW: Tôi e là vậy. M Tôi vừa xuống tàu. Tôi sẽ ghé Business Express trên phố McAllister và xử lý việc đó trên đường đến văn phòng."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "B",
   "group": "35-37",
   "textEn": "35. Where does the woman most likely work? (A) At a furniture store (B) At a moving company (C) At a post office (D) At an office supply store",
   "transcript": "W: Delton Van Lines. How can I help you?\nM: Hello. I'm the office manager at Woodsom Insurance Company. We are relocating to a new office in June and would like to book your services.\nW: Certainly! But before we reserve a date for the move, we'll need to come to your current location and estimate the cost of moving your furniture and equipment.\nM: We have a staff meeting tomorrow morning, so no one's available to show you around then. But tomorrow afternoon works.\nW: Perfect! Our representative can be there at two. I'll just need to know where you're located.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n35. Người phụ nữ nhiều khả năng làm việc ở đâu?\n(A) Tại cửa hàng đồ nội thất\n(B) Tại một công ty chuyển nhà\n(C) Tại bưu điện\n(D) Tại cửa hàng cung cấp văn phòng phẩm\n\nDịch hội thoại:\nW: Delton Van Lines. Tôi có thể giúp gì cho bạn?\nM: Chào. Tôi là quản lý văn phòng tại Công ty Bảo hiểm Woodsom. Chúng tôi sẽ chuyển đến văn phòng mới vào tháng Sáu và muốn đặt dịch vụ của bạn.\nW: Chắc chắn rồi! Nhưng trước khi đặt ngày chuyển, chúng tôi cần đến vị trí hiện tại của bạn để ước tính chi phí di chuyển đồ nội thất và thiết bị.\nM: Chúng tôi có cuộc họp nhân viên sáng mai, nên không ai rảnh để hướng dẫn bạn lúc đó. Nhưng chiều mai thì được.\nW: Hoàn hảo! Đại diện của chúng tôi có thể đến lúc 2 giờ. Tôi chỉ cần biết vị trí của bạn."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "36. Why will a representative visit the man’s company tomorrow? (A) To provide an estimate (B) To sign a contract (C) To give a presentation (D) To place an order",
   "transcript": "W: Delton Van Lines. How can I help you?\nM: Hello. I'm the office manager at Woodsom Insurance Company. We are relocating to a new office in June and would like to book your services.\nW: Certainly! But before we reserve a date for the move, we'll need to come to your current location and estimate the cost of moving your furniture and equipment.\nM: We have a staff meeting tomorrow morning, so no one's available to show you around then. But tomorrow afternoon works.\nW: Perfect! Our representative can be there at two. I'll just need to know where you're located.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n36. Tại sao đại diện sẽ đến công ty của người đàn ông vào ngày mai?\n(A) Để cung cấp báo giá\n(B) Để ký hợp đồng\n(C) Để trình bày\n(D) Để đặt một đơn hàng\n\nDịch hội thoại:\nW: Delton Van Lines. Tôi có thể giúp gì cho bạn?\nM: Chào. Tôi là quản lý văn phòng tại Công ty Bảo hiểm Woodsom. Chúng tôi sẽ chuyển đến văn phòng mới vào tháng Sáu và muốn đặt dịch vụ của bạn.\nW: Chắc chắn rồi! Nhưng trước khi đặt ngày chuyển, chúng tôi cần đến vị trí hiện tại của bạn để ước tính chi phí di chuyển đồ nội thất và thiết bị.\nM: Chúng tôi có cuộc họp nhân viên sáng mai, nên không ai rảnh để hướng dẫn bạn lúc đó. Nhưng chiều mai thì được.\nW: Hoàn hảo! Đại diện của chúng tôi có thể đến lúc 2 giờ. Tôi chỉ cần biết vị trí của bạn."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "C",
   "group": "35-37",
   "textEn": "37. What information will the man most likely provide next? (A) A company’s operating hours (B) An account number (C) A street address (D) A telephone number",
   "transcript": "W: Delton Van Lines. How can I help you?\nM: Hello. I'm the office manager at Woodsom Insurance Company. We are relocating to a new office in June and would like to book your services.\nW: Certainly! But before we reserve a date for the move, we'll need to come to your current location and estimate the cost of moving your furniture and equipment.\nM: We have a staff meeting tomorrow morning, so no one's available to show you around then. But tomorrow afternoon works.\nW: Perfect! Our representative can be there at two. I'll just need to know where you're located.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n37. Người phụ nữ sẽ cung cấp điều gì tiếp theo?\n(A) Giờ làm việc của một công ty\n(B) Một số lượng tài khoản\n(C) Một bài trình bày\n(D) Một số điện thoại\n\nDịch hội thoại:\nW: Delton Van Lines. Tôi có thể giúp gì cho bạn?\nM: Chào. Tôi là quản lý văn phòng tại Công ty Bảo hiểm Woodsom. Chúng tôi sẽ chuyển đến văn phòng mới vào tháng Sáu và muốn đặt dịch vụ của bạn.\nW: Chắc chắn rồi! Nhưng trước khi đặt ngày chuyển, chúng tôi cần đến vị trí hiện tại của bạn để ước tính chi phí di chuyển đồ nội thất và thiết bị.\nM: Chúng tôi có cuộc họp nhân viên sáng mai, nên không ai rảnh để hướng dẫn bạn lúc đó. Nhưng chiều mai thì được.\nW: Hoàn hảo! Đại diện của chúng tôi có thể đến lúc 2 giờ. Tôi chỉ cần biết vị trí của bạn."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "C",
   "group": "38-40",
   "textEn": "38. What department does the man work in? (A) Legal (B) Accounting (C) Human resources (D) Public relations",
   "transcript": "M: Doctor MacMillan, I'm calling from the human resources department. I'm in charge of your onboarding, and I wanted to confirm your start date. It's the first of April, right?\nW: Right. That's when I'll be joining the scientific research team. And as you probably know, I'm still finishing up a research paper with my current institution.\nM: Yes, the director did tell me that. Your contract includes time for you to finish up your previous commitments. I can send it to you this afternoon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n38. Người đàn ông làm việc ở phòng ban nào?\n(A) Pháp lý\n(B) Kế toán\n(C) Nhân sự\n(D) Quan hệ công chúng\n\nDịch hội thoại:\nM: Bác sĩ MacMillan, tôi gọi từ bộ phận nhân sự. Tôi phụ trách việc onboarding của bạn, và tôi muốn xác nhận ngày bắt đầu. Là ngày 1 tháng Tư, đúng không?\nW: Đúng vậy. Đó là khi tôi sẽ tham gia đội ngũ nghiên cứu khoa học. Và như bạn có lẽ biết, tôi vẫn đang hoàn tất một bài nghiên cứu với tổ chức hiện tại.\nM: Vâng, giám đốc đã kể cho tôi. Hợp đồng của bạn bao gồm thời gian để hoàn tất các cam kết trước đó. Tôi có thể gửi nó cho bạn chiều nay."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "39. What kind of work has the woman been hired to do? (A) Scientific research (B) Book editing (C) Office management (D) Legal advising",
   "transcript": "M: Doctor MacMillan, I'm calling from the human resources department. I'm in charge of your onboarding, and I wanted to confirm your start date. It's the first of April, right?\nW: Right. That's when I'll be joining the scientific research team. And as you probably know, I'm still finishing up a research paper with my current institution.\nM: Yes, the director did tell me that. Your contract includes time for you to finish up your previous commitments. I can send it to you this afternoon.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n39. Người phụ nữ được thuê để làm loại công việc gì?\n(A) Nghiên cứu khoa học\n(B) Biên tập sách\n(C) Quản lý văn phòng\n(D) Tư vấn pháp lý\n\nDịch hội thoại:\nM: Bác sĩ MacMillan, tôi gọi từ bộ phận nhân sự. Tôi phụ trách việc onboarding của bạn, và tôi muốn xác nhận ngày bắt đầu. Là ngày 1 tháng Tư, đúng không?\nW: Đúng vậy. Đó là khi tôi sẽ tham gia đội ngũ nghiên cứu khoa học. Và như bạn có lẽ biết, tôi vẫn đang hoàn tất một bài nghiên cứu với tổ chức hiện tại.\nM: Vâng, giám đốc đã kể cho tôi. Hợp đồng của bạn bao gồm thời gian để hoàn tất các cam kết trước đó. Tôi có thể gửi nó cho bạn chiều nay."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "40. What will the man send the woman this afternoon? (A) A password (B) A travel reimbursement (C) A security badge (D) A contract",
   "transcript": "M: Doctor MacMillan, I'm calling from the human resources department. I'm in charge of your onboarding, and I wanted to confirm your start date. It's the first of April, right?\nW: Right. That's when I'll be joining the scientific research team. And as you probably know, I'm still finishing up a research paper with my current institution.\nM: Yes, the director did tell me that. Your contract includes time for you to finish up your previous commitments. I can send it to you this afternoon.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n40. Chiều nay người đàn ông sẽ gửi gì cho người phụ nữ?\n(A) Mật khẩu\n(B) Khoản hoàn trả chi phí đi lại\n(C) Thẻ an ninh\n(D) Hợp đồng\n\nDịch hội thoại:\nM: Bác sĩ MacMillan, tôi gọi từ bộ phận nhân sự. Tôi phụ trách việc onboarding của bạn, và tôi muốn xác nhận ngày bắt đầu. Là ngày 1 tháng Tư, đúng không?\nW: Đúng vậy. Đó là khi tôi sẽ tham gia đội ngũ nghiên cứu khoa học. Và như bạn có lẽ biết, tôi vẫn đang hoàn tất một bài nghiên cứu với tổ chức hiện tại.\nM: Vâng, giám đốc đã kể cho tôi. Hợp đồng của bạn bao gồm thời gian để hoàn tất các cam kết trước đó. Tôi có thể gửi nó cho bạn chiều nay."
  },
  {
   "number": 41,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "41. What recently happened at the business? (A) Its monthly rent increased. (B) It received many orders. (C) It was featured in a magazine. (D) It passed an inspection.",
   "transcript": "W1: We've been getting a lot of online orders for our chocolate candies lately. I'm glad to see the increase in orders, but I'm worried about meeting the demands. Are we going to be able to fill and ship all these orders?\nM: I think we should hire a few more people to work in the mornings. They could help with packaging and shipping. What do you think, Rebecca?\nW2: I agree. I also think that we should ask if our delivery service can pick up our packages twice a day instead of just once a day—maybe every morning and afternoon. I'll call them today.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n41. Gần đây điều gì đã xảy ra tại doanh nghiệp?\n(A) Tiền thuê hàng tháng tăng lên\n(B) Nó nhận được nhiều đơn hàng mới\n(C) Nó được giới thiệu trên tạp chí\n(D) Nó vượt qua một cuộc kiểm tra\n\nDịch hội thoại:\nW1: Chúng ta gần đây nhận được nhiều đơn hàng trực tuyến cho kẹo sô cô la. Tôi vui vì thấy đơn hàng tăng, nhưng lo về việc đáp ứng nhu cầu. Chúng ta có thể hoàn tất và giao hết các đơn hàng này không?\nM: Tôi nghĩ chúng ta nên thuê thêm vài người làm việc buổi sáng. Họ có thể giúp đóng gói và vận chuyển. Bạn nghĩ sao, Rebecca?\nW2: Tôi đồng ý. Tôi cũng nghĩ chúng ta nên hỏi dịch vụ giao hàng có thể lấy hàng hai lần một ngày thay vì chỉ một lần—có lẽ sáng và chiều. Tôi sẽ gọi họ hôm nay."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "D",
   "group": "41-43",
   "textEn": "42. According to the man, what will help the business? (A) Purchasing updated equipment (B) Offering different products (C) Extending store hours (D) Hiring more employees",
   "transcript": "W1: We've been getting a lot of online orders for our chocolate candies lately. I'm glad to see the increase in orders, but I'm worried about meeting the demands. Are we going to be able to fill and ship all these orders?\nM: I think we should hire a few more people to work in the mornings. They could help with packaging and shipping. What do you think, Rebecca?\nW2: I agree. I also think that we should ask if our delivery service can pick up our packages twice a day instead of just once a day—maybe every morning and afternoon. I'll call them today.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n42. Theo người đàn ông, điều gì sẽ giúp khách hàng?\n(A) Mua thiết bị cập nhật\n(B) Cung cấp các sản phẩm khác\n(C) Mở rộng giờ làm việc\n(D) Thuê thêm nhân viên\n\nDịch hội thoại:\nW1: Chúng ta gần đây nhận được nhiều đơn hàng trực tuyến cho kẹo sô cô la. Tôi vui vì thấy đơn hàng tăng, nhưng lo về việc đáp ứng nhu cầu. Chúng ta có thể hoàn tất và giao hết các đơn hàng này không?\nM: Tôi nghĩ chúng ta nên thuê thêm vài người làm việc buổi sáng. Họ có thể giúp đóng gói và vận chuyển. Bạn nghĩ sao, Rebecca?\nW2: Tôi đồng ý. Tôi cũng nghĩ chúng ta nên hỏi dịch vụ giao hàng có thể lấy hàng hai lần một ngày thay vì chỉ một lần—có lẽ sáng và chiều. Tôi sẽ gọi họ hôm nay."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "43. Who does Rebecca say she will call today? (A) A packaging designer (B) An Internet service provider (C) A delivery service (D) A bank",
   "transcript": "W1: We've been getting a lot of online orders for our chocolate candies lately. I'm glad to see the increase in orders, but I'm worried about meeting the demands. Are we going to be able to fill and ship all these orders?\nM: I think we should hire a few more people to work in the mornings. They could help with packaging and shipping. What do you think, Rebecca?\nW2: I agree. I also think that we should ask if our delivery service can pick up our packages twice a day instead of just once a day—maybe every morning and afternoon. I'll call them today.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n43. Rebecca nói cô ấy sẽ gọi cho ai hôm nay?\n(A) Một nhà thiết kế bao bì\n(B) Một nhà cung cấp dịch vụ Internet\n(C) Một dịch vụ giao hàng\n(D) Một ngân hàng\n\nDịch hội thoại:\nW1: Chúng ta gần đây nhận được nhiều đơn hàng trực tuyến cho kẹo sô cô la. Tôi vui vì thấy đơn hàng tăng, nhưng lo về việc đáp ứng nhu cầu. Chúng ta có thể hoàn tất và giao hết các đơn hàng này không?\nM: Tôi nghĩ chúng ta nên thuê thêm vài người làm việc buổi sáng. Họ có thể giúp đóng gói và vận chuyển. Bạn nghĩ sao, Rebecca?\nW2: Tôi đồng ý. Tôi cũng nghĩ chúng ta nên hỏi dịch vụ giao hàng có thể lấy hàng hai lần một ngày thay vì chỉ một lần—có lẽ sáng và chiều. Tôi sẽ gọi họ hôm nay."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "44. What do the speakers manufacture? (A) Shoes (B) Luggage (C) Furniture (D) Sports equipment",
   "transcript": "W: I spoke to the Mancini brothers. They just shipped our leather order—the hazelnut color. But it'll take a while to arrive. We don't have enough in stock to complete the ten sofa orders that we've received the past few days.\nM: What about the local leather supplier that brought us some samples last week? We could ask them whether they have enough for ten sofas.\nW: To be honest, I wasn't very impressed with the quality of their leather. I'd rather wait. I'll reach out to the customers about the delay.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n44. Người nói sản xuất gì?\n(A) Giày\n(B) Hành lý\n(C) Đồ nội thất\n(D) Thiết bị thể thao\n\nDịch hội thoại:\nW: Tôi đã nói với anh em Mancini. Họ vừa gửi đơn hàng da của chúng ta—màu hạt dẻ. Nhưng sẽ mất thời gian để đến. Chúng ta không có đủ hàng tồn kho để hoàn tất mười đơn hàng sofa mà chúng ta nhận được vài ngày qua.\nM: Còn nhà cung cấp da địa phương mang mẫu cho chúng ta tuần trước thì sao? Chúng ta có thể hỏi họ xem có đủ cho mười sofa không.\nW: Thật lòng, tôi không ấn tượng lắm với chất lượng da của họ. Tôi thà chờ. Tôi sẽ liên lạc với khách hàng về sự chậm trễ."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "A",
   "group": "44-46",
   "textEn": "45. Who does the man suggest contacting? (A) A leather supplier (B) A delivery driver (C) An interior designer (D) A machine technician",
   "transcript": "W: I spoke to the Mancini brothers. They just shipped our leather order—the hazelnut color. But it'll take a while to arrive. We don't have enough in stock to complete the ten sofa orders that we've received the past few days.\nM: What about the local leather supplier that brought us some samples last week? We could ask them whether they have enough for ten sofas.\nW: To be honest, I wasn't very impressed with the quality of their leather. I'd rather wait. I'll reach out to the customers about the delay.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n45. Người đàn ông gợi ý liên hệ với ai?\n(A) Một nhà cung cấp da\n(B) Một tài xế giao hàng\n(C) Một nhà thiết kế nội thất\n(D) Một kỹ thuật viên máy móc\n\nDịch hội thoại:\nW: Tôi đã nói với anh em Mancini. Họ vừa gửi đơn hàng da của chúng ta—màu hạt dẻ. Nhưng sẽ mất thời gian để đến. Chúng ta không có đủ hàng tồn kho để hoàn tất mười đơn hàng sofa mà chúng ta nhận được vài ngày qua.\nM: Còn nhà cung cấp da địa phương mang mẫu cho chúng ta tuần trước thì sao? Chúng ta có thể hỏi họ xem có đủ cho mười sofa không.\nW: Thật lòng, tôi không ấn tượng lắm với chất lượng da của họ. Tôi thà chờ. Tôi sẽ liên lạc với khách hàng về sự chậm trễ."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "46. Why is the woman opposed to making a change? (A) She has contracts with clients. (B) She is concerned about quality. (C) Overhead expenses will increase. (D) A license will expire soon.",
   "transcript": "W: I spoke to the Mancini brothers. They just shipped our leather order—the hazelnut color. But it'll take a while to arrive. We don't have enough in stock to complete the ten sofa orders that we've received the past few days.\nM: What about the local leather supplier that brought us some samples last week? We could ask them whether they have enough for ten sofas.\nW: To be honest, I wasn't very impressed with the quality of their leather. I'd rather wait. I'll reach out to the customers about the delay.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n46. Tại sao người phụ nữ phản đối việc thay đổi?\n(A) Cô ấy có hợp đồng với khách hàng\n(B) Cô ấy lo lắng về chất lượng\n(C) Chi phí vận hành sẽ tăng\n(D) Giấy phép sẽ sớm hết hạn\n\nDịch hội thoại:\nW: Tôi đã nói với anh em Mancini. Họ vừa gửi đơn hàng da của chúng ta—màu hạt dẻ. Nhưng sẽ mất thời gian để đến. Chúng ta không có đủ hàng tồn kho để hoàn tất mười đơn hàng sofa mà chúng ta nhận được vài ngày qua.\nM: Còn nhà cung cấp da địa phương mang mẫu cho chúng ta tuần trước thì sao? Chúng ta có thể hỏi họ xem có đủ cho mười sofa không.\nW: Thật lòng, tôi không ấn tượng lắm với chất lượng da của họ. Tôi thà chờ. Tôi sẽ liên lạc với khách hàng về sự chậm trễ."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "47. What are the speakers meeting to discuss? (A) Safety regulations (B) Equipment upgrades (C) Budget cuts (D) Consultant recommendations",
   "transcript": "W: Thanks for coming in, Marcos. I just got the results from the consulting firm we hired. They have some ideas about how we can increase sales of our denim blue jeans.\nM: I hope so. What does our target audience want?\nW: Well, they think it's time we updated our brand with new styles or colors.\nM: You know, it takes a lot of effort to develop and launch new styles.\nW: Yes. But, if we don't do it, another company will.\nM: You're right. I'll ask Junko to come up with some new designs for us to consider.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n47. Người nói gặp nhau để thảo luận điều gì?\n(A) Các vấn đề an toàn\n(B) Nâng cấp thiết bị\n(C) Chi phí ngân sách\n(D) Các khuyến nghị tư vấn\n\nDịch hội thoại:\nW: Cảm ơn vì đã đến, Marcos. Tôi vừa nhận kết quả từ công ty tư vấn chúng ta thuê. Họ có một số ý tưởng về cách tăng doanh số quần jeans denim xanh.\nM: Tôi hy vọng vậy. Khán giả mục tiêu của chúng ta muốn gì?\nW: Ừ, họ nghĩ đã đến lúc cập nhật thương hiệu với kiểu dáng hoặc màu sắc mới.\nM: Bạn biết đấy, cần nhiều nỗ lực để phát triển và ra mắt kiểu dáng mới.\nW: Vâng. Nhưng nếu chúng ta không làm, công ty khác sẽ làm.\nM: Bạn đúng. Tôi sẽ yêu cầu Junko đưa ra một số thiết kế mới để chúng ta xem xét."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "C",
   "group": "47-49",
   "textEn": "48. What does the man mean when he says, “it takes a lot of effort to develop and launch new styles”? (A) He is excited about a challenge. (B) He is surprised at a competitor’s choices. (C) He is doubtful about a suggestion. (D) He thinks more employees should be hired.",
   "transcript": "W: Thanks for coming in, Marcos. I just got the results from the consulting firm we hired. They have some ideas about how we can increase sales of our denim blue jeans.\nM: I hope so. What does our target audience want?\nW: Well, they think it's time we updated our brand with new styles or colors.\nM: You know, it takes a lot of effort to develop and launch new styles.\nW: Yes. But, if we don't do it, another company will.\nM: You're right. I'll ask Junko to come up with some new designs for us to consider.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n48. Người đàn ông có ý gì khi nói “phải mất rất nhiều nỗ lực để phát triển và tung ra những kiểu mới”?\n(A) Anh ấy hào hứng với một thử thách\n(B) Anh ấy ngạc nhiên về lựa chọn của đối thủ\n(C) Anh ấy nghi ngờ về một đề xuất\n(D) Anh ấy nghĩ rằng nhiều nhân viên nên tham gia hơn\n\nDịch hội thoại:\nW: Cảm ơn vì đã đến, Marcos. Tôi vừa nhận kết quả từ công ty tư vấn chúng ta thuê. Họ có một số ý tưởng về cách tăng doanh số quần jeans denim xanh.\nM: Tôi hy vọng vậy. Khán giả mục tiêu của chúng ta muốn gì?\nW: Ừ, họ nghĩ đã đến lúc cập nhật thương hiệu với kiểu dáng hoặc màu sắc mới.\nM: Bạn biết đấy, cần nhiều nỗ lực để phát triển và ra mắt kiểu dáng mới.\nW: Vâng. Nhưng nếu chúng ta không làm, công ty khác sẽ làm.\nM: Bạn đúng. Tôi sẽ yêu cầu Junko đưa ra một số thiết kế mới để chúng ta xem xét."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "49. Who most likely is Junko? (A) A focus group leader (B) A clothing designer (C) A sales associate (D) An accountant",
   "transcript": "W: Thanks for coming in, Marcos. I just got the results from the consulting firm we hired. They have some ideas about how we can increase sales of our denim blue jeans.\nM: I hope so. What does our target audience want?\nW: Well, they think it's time we updated our brand with new styles or colors.\nM: You know, it takes a lot of effort to develop and launch new styles.\nW: Yes. But, if we don't do it, another company will.\nM: You're right. I'll ask Junko to come up with some new designs for us to consider.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n49. Junko nhiều khả năng là ai?\n(A) Người điều hành nhóm thảo luận\n(B) Nhà thiết kế quần áo\n(C) Người bán hàng\n(D) Kế toán\n\nDịch hội thoại:\nW: Cảm ơn vì đã đến, Marcos. Tôi vừa nhận kết quả từ công ty tư vấn chúng ta thuê. Họ có một số ý tưởng về cách tăng doanh số quần jeans denim xanh.\nM: Tôi hy vọng vậy. Khán giả mục tiêu của chúng ta muốn gì?\nW: Ừ, họ nghĩ đã đến lúc cập nhật thương hiệu với kiểu dáng hoặc màu sắc mới.\nM: Bạn biết đấy, cần nhiều nỗ lực để phát triển và ra mắt kiểu dáng mới.\nW: Vâng. Nhưng nếu chúng ta không làm, công ty khác sẽ làm.\nM: Bạn đúng. Tôi sẽ yêu cầu Junko đưa ra một số thiết kế mới để chúng ta xem xét."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "50. Why did the man miss a meeting? (A) He was stuck in traffic. (B) He had a medical appointment. (C) He was speaking with a client. (D) He was away on vacation.",
   "transcript": "M: Hi, Gabriela. Thanks for agreeing to give me the highlights of the budget discussion from the monthly meeting. I'm back from vacation and still catching up.\nW: Sure. Here's a copy of the report. Everyone on the board of Tennis United agreed to the fee increase for the tennis camp for young players.\nM: Good. And why do we have T-shirts listed as an expense item?\nW: Although the next tournament's in the fall, the T-shirts were ordered very early. That way we received half off the price, since the supplier wanted to get rid of his summer inventory.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n50. Tại sao người đàn ông bỏ lỡ một cuộc họp?\n(A) Anh ấy mắc kẹt trong giao thông\n(B) Anh ấy có cuộc hẹn y tế\n(C) Anh ấy đang nói chuyện với khách hàng\n(D) Anh ấy đang đi nghỉ\n\nDịch hội thoại:\nM: Chào Gabriela. Cảm ơn vì đã đồng ý cập nhật cho tôi những điểm chính về cuộc thảo luận ngân sách trong cuộc họp hàng tháng. Tôi vừa về từ kỳ nghỉ và vẫn đang bắt kịp công việc.\nW: Không có gì. Đây là bản sao báo cáo. Mọi người trong hội đồng quản trị của Tennis United đều đồng ý tăng phí cho trại tennis dành cho các vận động viên trẻ.\nM: Tốt rồi. Và tại sao chúng ta lại có áo thun trong hạng mục chi phí?\nW: Mặc dù giải đấu tiếp theo diễn ra vào mùa thu, nhưng áo thun đã được đặt hàng rất sớm. Nhờ vậy chúng ta được giảm nửa giá, vì nhà cung cấp muốn thanh lý hàng tồn kho mùa hè."
  },
  {
   "number": 51,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "51. Which sport does the speakers’ organization promote? (A) Tennis (B) Volleyball (C) Swimming (D) Gymnastics",
   "transcript": "M: Hi, Gabriela. Thanks for agreeing to give me the highlights of the budget discussion from the monthly meeting. I'm back from vacation and still catching up.\nW: Sure. Here's a copy of the report. Everyone on the board of Tennis United agreed to the fee increase for the tennis camp for young players.\nM: Good. And why do we have T-shirts listed as an expense item?\nW: Although the next tournament's in the fall, the T-shirts were ordered very early. That way we received half off the price, since the supplier wanted to get rid of his summer inventory.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n51. Tổ chức của người nói quảng bá môn thể thao nào?\n(A) Quần vợt\n(B) Bóng chuyền\n(C) Bơi lội\n(D) Thể dục dụng cụ\n\nDịch hội thoại:\nM: Chào Gabriela. Cảm ơn vì đã đồng ý cập nhật cho tôi những điểm chính về cuộc thảo luận ngân sách trong cuộc họp hàng tháng. Tôi vừa về từ kỳ nghỉ và vẫn đang bắt kịp công việc.\nW: Không có gì. Đây là bản sao báo cáo. Mọi người trong hội đồng quản trị của Tennis United đều đồng ý tăng phí cho trại tennis dành cho các vận động viên trẻ.\nM: Tốt rồi. Và tại sao chúng ta lại có áo thun trong hạng mục chi phí?\nW: Mặc dù giải đấu tiếp theo diễn ra vào mùa thu, nhưng áo thun đã được đặt hàng rất sớm. Nhờ vậy chúng ta được giảm nửa giá, vì nhà cung cấp muốn thanh lý hàng tồn kho mùa hè."
  },
  {
   "number": 52,
   "part": 3,
   "answer": "C",
   "group": "50-52",
   "textEn": "52. Why were T-shirts ordered early? (A) To avoid potential delays (B) To get free delivery (C) To receive a discount (D) To meet heavy demand",
   "transcript": "M: Hi, Gabriela. Thanks for agreeing to give me the highlights of the budget discussion from the monthly meeting. I'm back from vacation and still catching up.\nW: Sure. Here's a copy of the report. Everyone on the board of Tennis United agreed to the fee increase for the tennis camp for young players.\nM: Good. And why do we have T-shirts listed as an expense item?\nW: Although the next tournament's in the fall, the T-shirts were ordered very early. That way we received half off the price, since the supplier wanted to get rid of his summer inventory.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n52. Tại sao áo phông được đặt hàng sớm?\n(A) Để tránh trì hoãn tiềm năng\n(B) Để được giao hàng miễn phí\n(C) Để nhận được chiết khấu\n(D) Để đáp ứng nhu cầu cao\n\nDịch hội thoại:\nM: Chào Gabriela. Cảm ơn vì đã đồng ý cập nhật cho tôi những điểm chính về cuộc thảo luận ngân sách trong cuộc họp hàng tháng. Tôi vừa về từ kỳ nghỉ và vẫn đang bắt kịp công việc.\nW: Không có gì. Đây là bản sao báo cáo. Mọi người trong hội đồng quản trị của Tennis United đều đồng ý tăng phí cho trại tennis dành cho các vận động viên trẻ.\nM: Tốt rồi. Và tại sao chúng ta lại có áo thun trong hạng mục chi phí?\nW: Mặc dù giải đấu tiếp theo diễn ra vào mùa thu, nhưng áo thun đã được đặt hàng rất sớm. Nhờ vậy chúng ta được giảm nửa giá, vì nhà cung cấp muốn thanh lý hàng tồn kho mùa hè."
  },
  {
   "number": 53,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "53. What industry do the speakers most likely work in? (A) Energy (B) Finance (C) Construction (D) Manufacturing",
   "transcript": "W: The first item on today's meeting agenda is our bid to renovate the Morrisville Bridge. Do we have an update on that yet?\nM1: Yes—unfortunately we didn't get the contract.\nM2: Yes, the only explanation given was that another construction company submitted a proposal with a shorter timeline.\nW: So, what do we know about this competitor? Have they worked on other local projects?\nM1: The only thing I heard was their name—CDQ Construction Company.\nW: Well, I'd like to know more about them. Can you two do some research before our next meeting?",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n53. Người nói có khả năng làm việc trong ngành nào?\n(A) Năng lượng\n(B) Tài chính\n(C) Xây dựng\n(D) Sản xuất\n\nDịch hội thoại:\nW: Mục đầu tiên trong nghị sự họp hôm nay là đề xuất của chúng ta về việc cải tạo cầu Morrisville. Chúng ta có cập nhật gì về việc đó chưa?\nM1: Vâng—thật tiếc là chúng ta không trúng thầu.\nM2: Vâng, lý do duy nhất được đưa ra là một công ty xây dựng khác đã nộp đề xuất với thời gian ngắn hơn.\nW: Vậy chúng ta biết gì về đối thủ này? Họ có tham gia các dự án địa phương khác không?\nM1: Điều duy nhất tôi nghe được là tên của họ—Công ty Xây dựng CDQ.\nW: Ừm, tôi muốn biết thêm về họ. Hai anh có thể nghiên cứu trước cuộc họp tiếp theo không?"
  },
  {
   "number": 54,
   "part": 3,
   "answer": "D",
   "group": "53-55",
   "textEn": "54. What is the reason a company did not get a contract? (A) Some costs were too high. (B) A facility failed an inspection. (C) Some paperwork was submitted late. (D) A competitor can complete a project faster.",
   "transcript": "W: The first item on today's meeting agenda is our bid to renovate the Morrisville Bridge. Do we have an update on that yet?\nM1: Yes—unfortunately we didn't get the contract.\nM2: Yes, the only explanation given was that another construction company submitted a proposal with a shorter timeline.\nW: So, what do we know about this competitor? Have they worked on other local projects?\nM1: The only thing I heard was their name—CDQ Construction Company.\nW: Well, I'd like to know more about them. Can you two do some research before our next meeting?",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n54. Lý do công ty không nhận được hợp đồng là gì?\n(A) Một số chi phí quá cao\n(B) Một cơ sở không vượt qua kiểm tra\n(C) Một số giấy tờ nộp muộn\n(D) Đối thủ cạnh tranh có thể hoàn thành dự án nhanh hơn\n\nDịch hội thoại:\nW: Mục đầu tiên trong nghị sự họp hôm nay là đề xuất của chúng ta về việc cải tạo cầu Morrisville. Chúng ta có cập nhật gì về việc đó chưa?\nM1: Vâng—thật tiếc là chúng ta không trúng thầu.\nM2: Vâng, lý do duy nhất được đưa ra là một công ty xây dựng khác đã nộp đề xuất với thời gian ngắn hơn.\nW: Vậy chúng ta biết gì về đối thủ này? Họ có tham gia các dự án địa phương khác không?\nM1: Điều duy nhất tôi nghe được là tên của họ—Công ty Xây dựng CDQ.\nW: Ừm, tôi muốn biết thêm về họ. Hai anh có thể nghiên cứu trước cuộc họp tiếp theo không?"
  },
  {
   "number": 55,
   "part": 3,
   "answer": "B",
   "group": "53-55",
   "textEn": "55. What does the woman ask the man to do? (A) Visit a facility (B) Conduct some research (C) Review a proposal (D) Contact some vendors",
   "transcript": "W: The first item on today's meeting agenda is our bid to renovate the Morrisville Bridge. Do we have an update on that yet?\nM1: Yes—unfortunately we didn't get the contract.\nM2: Yes, the only explanation given was that another construction company submitted a proposal with a shorter timeline.\nW: So, what do we know about this competitor? Have they worked on other local projects?\nM1: The only thing I heard was their name—CDQ Construction Company.\nW: Well, I'd like to know more about them. Can you two do some research before our next meeting?",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n55. Người phụ nữ yêu cầu người đàn ông làm gì tiếp theo?\n(A) Tham quan một cơ sở\n(B) Thực hiện một số nghiên cứu\n(C) Viết một đề xuất\n(D) Liên hệ một số nhà cung cấp\n\nDịch hội thoại:\nW: Mục đầu tiên trong nghị sự họp hôm nay là đề xuất của chúng ta về việc cải tạo cầu Morrisville. Chúng ta có cập nhật gì về việc đó chưa?\nM1: Vâng—thật tiếc là chúng ta không trúng thầu.\nM2: Vâng, lý do duy nhất được đưa ra là một công ty xây dựng khác đã nộp đề xuất với thời gian ngắn hơn.\nW: Vậy chúng ta biết gì về đối thủ này? Họ có tham gia các dự án địa phương khác không?\nM1: Điều duy nhất tôi nghe được là tên của họ—Công ty Xây dựng CDQ.\nW: Ừm, tôi muốn biết thêm về họ. Hai anh có thể nghiên cứu trước cuộc họp tiếp theo không?"
  },
  {
   "number": 56,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "56. What did the company do last month? (A) It opened a second location. (B) It merged with another business. (C) It launched a new product. (D) It conducted an employee survey.",
   "transcript": "W: Did you see that the results of last month's employee survey have been compiled? All the staff feedback is available.\nM: Yes, and I just finished reviewing the comments.\nW: You know, I noticed one recurring complaint. The size of the break room is too small. Perhaps we could enlarge the break room by having the wall taken down between it and the meeting room next door.\nM: Well, we do have money available in the budget.\nW: Then could you reach out to your contact at the construction company?\nM: I can't do it this afternoon, since I need to see a dentist, but I will definitely make the call.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n56. Tháng trước công ty đã làm gì?\n(A) Mở địa điểm thứ hai\n(B) Hợp nhất với doanh nghiệp khác\n(C) Ra mắt sản phẩm mới\n(D) Tiến hành khảo sát nhân viên\n\nDịch hội thoại:\nW: Anh có thấy kết quả khảo sát nhân viên tháng trước đã được tổng hợp chưa? Tất cả phản hồi từ nhân viên đều sẵn sàng.\nM: Vâng, và tôi vừa xem xong các bình luận.\nW: Anh biết đấy, tôi nhận thấy một khiếu nại lặp lại nhiều lần. Kích thước phòng nghỉ quá nhỏ. Có lẽ chúng ta có thể mở rộng phòng nghỉ bằng cách phá bỏ bức tường giữa nó và phòng họp bên cạnh.\nM: Ừm, chúng ta vẫn còn tiền trong ngân sách.\nW: Vậy anh có thể liên hệ với người quen ở công ty xây dựng không?\nM: Tôi không thể làm chiều nay vì phải gặp nha sĩ, nhưng tôi chắc chắn sẽ gọi."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "57. Why does the man say, “we do have money available in the budget”? (A) To request another budget analysis (B) To suggest hiring additional employees (C) To agree with a proposed renovation (D) To recommend an increase in advertising",
   "transcript": "W: Did you see that the results of last month's employee survey have been compiled? All the staff feedback is available.\nM: Yes, and I just finished reviewing the comments.\nW: You know, I noticed one recurring complaint. The size of the break room is too small. Perhaps we could enlarge the break room by having the wall taken down between it and the meeting room next door.\nM: Well, we do have money available in the budget.\nW: Then could you reach out to your contact at the construction company?\nM: I can't do it this afternoon, since I need to see a dentist, but I will definitely make the call.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n57. Tại sao người đàn ông nói “chúng ta không còn tiền trong ngân sách”?\n(A) Để yêu cầu phân tích ngân sách tốt hơn\n(B) Để đề xuất thuê thêm nhân viên\n(C) Để đồng ý với việc cải tạo được đề xuất\n(D) Để khuyến nghị tăng chi tiêu quảng cáo\n\nDịch hội thoại:\nW: Anh có thấy kết quả khảo sát nhân viên tháng trước đã được tổng hợp chưa? Tất cả phản hồi từ nhân viên đều sẵn sàng.\nM: Vâng, và tôi vừa xem xong các bình luận.\nW: Anh biết đấy, tôi nhận thấy một khiếu nại lặp lại nhiều lần. Kích thước phòng nghỉ quá nhỏ. Có lẽ chúng ta có thể mở rộng phòng nghỉ bằng cách phá bỏ bức tường giữa nó và phòng họp bên cạnh.\nM: Ừm, chúng ta vẫn còn tiền trong ngân sách.\nW: Vậy anh có thể liên hệ với người quen ở công ty xây dựng không?\nM: Tôi không thể làm chiều nay vì phải gặp nha sĩ, nhưng tôi chắc chắn sẽ gọi."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "58. What does the man say he has to do this afternoon? (A) Have his car repaired (B) Give a presentation (C) Go to a dentist appointment (D) Attend a reception",
   "transcript": "W: Did you see that the results of last month's employee survey have been compiled? All the staff feedback is available.\nM: Yes, and I just finished reviewing the comments.\nW: You know, I noticed one recurring complaint. The size of the break room is too small. Perhaps we could enlarge the break room by having the wall taken down between it and the meeting room next door.\nM: Well, we do have money available in the budget.\nW: Then could you reach out to your contact at the construction company?\nM: I can't do it this afternoon, since I need to see a dentist, but I will definitely make the call.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n58. Người đàn ông nói anh ấy phải làm gì chiều nay?\n(A) Sửa xe\n(B) Thuyết trình\n(C) Đến gặp nha sĩ\n(D) Dự tiệc chiêu đãi\n\nDịch hội thoại:\nW: Anh có thấy kết quả khảo sát nhân viên tháng trước đã được tổng hợp chưa? Tất cả phản hồi từ nhân viên đều sẵn sàng.\nM: Vâng, và tôi vừa xem xong các bình luận.\nW: Anh biết đấy, tôi nhận thấy một khiếu nại lặp lại nhiều lần. Kích thước phòng nghỉ quá nhỏ. Có lẽ chúng ta có thể mở rộng phòng nghỉ bằng cách phá bỏ bức tường giữa nó và phòng họp bên cạnh.\nM: Ừm, chúng ta vẫn còn tiền trong ngân sách.\nW: Vậy anh có thể liên hệ với người quen ở công ty xây dựng không?\nM: Tôi không thể làm chiều nay vì phải gặp nha sĩ, nhưng tôi chắc chắn sẽ gọi."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "59. Where does the woman work? (A) At a recycling company (B) At an appliance store (C) At a manufacturing company (D) At an architectural firm",
   "transcript": "W: Thanks for calling Hang's Metal Recycling Company. How can I help you?\nM: Hi. I'm with Shannak Construction Company. We've got a lot of brass metal scrap from a recent remodeling job. Are you currently buying metal scrap?\nW: Yes, we are. We currently pay two dollars a pound.\nM: Oh, there's another recycling center that pays two dollars and twenty-five cents a pound. Would you be willing to match their price?\nW: Yes, we have a price-match guarantee.\nM: Great. I'll bring the metal to you this afternoon, then.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n59. Người phụ nữ làm việc ở đâu?\n(A) Tại trung tâm tái chế\n(B) Tại cửa hàng thiết bị\n(C) Tại công ty sản xuất\n(D) Tại công ty kiến trúc\n\nDịch hội thoại:\nW: Cảm ơn đã gọi đến Công ty Tái chế Kim loại Hang. Tôi có thể giúp gì cho anh?\nM: Chào. Tôi từ Công ty Xây dựng Shannak. Chúng tôi có nhiều phế liệu kim loại đồng từ công việc sửa chữa cải tạo gần đây. Công ty có đang mua phế liệu kim loại không?\nW: Vâng, chúng tôi đang mua. Hiện tại chúng tôi trả hai đô la một pound.\nM: Ồ, có một trung tâm tái chế khác trả hai đô la hai mươi lăm cent một pound. Công ty có sẵn lòng khớp giá đó không?\nW: Vâng, chúng tôi có chính sách khớp giá.\nM: Tuyệt vời. Vậy tôi sẽ mang kim loại đến chiều nay."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "B",
   "group": "59-61",
   "textEn": "60. What does the man ask the woman to do? (A) Revise a contract (B) Match a competitor’s offer (C) Refund a delivery fee (D) Sign in at a security desk",
   "transcript": "W: Thanks for calling Hang's Metal Recycling Company. How can I help you?\nM: Hi. I'm with Shannak Construction Company. We've got a lot of brass metal scrap from a recent remodeling job. Are you currently buying metal scrap?\nW: Yes, we are. We currently pay two dollars a pound.\nM: Oh, there's another recycling center that pays two dollars and twenty-five cents a pound. Would you be willing to match their price?\nW: Yes, we have a price-match guarantee.\nM: Great. I'll bring the metal to you this afternoon, then.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n60. Người đàn ông yêu cầu người phụ nữ làm gì?\n(A) Sửa hợp đồng\n(B) So khớp đề nghị của đối thủ\n(C) Hoàn tiền phí giao hàng\n(D) Ký vào phiếu bảo dưỡng\n\nDịch hội thoại:\nW: Cảm ơn đã gọi đến Công ty Tái chế Kim loại Hang. Tôi có thể giúp gì cho anh?\nM: Chào. Tôi từ Công ty Xây dựng Shannak. Chúng tôi có nhiều phế liệu kim loại đồng từ công việc sửa chữa cải tạo gần đây. Công ty có đang mua phế liệu kim loại không?\nW: Vâng, chúng tôi đang mua. Hiện tại chúng tôi trả hai đô la một pound.\nM: Ồ, có một trung tâm tái chế khác trả hai đô la hai mươi lăm cent một pound. Công ty có sẵn lòng khớp giá đó không?\nW: Vâng, chúng tôi có chính sách khớp giá.\nM: Tuyệt vời. Vậy tôi sẽ mang kim loại đến chiều nay."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "61. What does the man say he will do this afternoon? (A) Conduct an inspection (B) Sign a document (C) Deliver some materials (D) Update a Web site",
   "transcript": "W: Thanks for calling Hang's Metal Recycling Company. How can I help you?\nM: Hi. I'm with Shannak Construction Company. We've got a lot of brass metal scrap from a recent remodeling job. Are you currently buying metal scrap?\nW: Yes, we are. We currently pay two dollars a pound.\nM: Oh, there's another recycling center that pays two dollars and twenty-five cents a pound. Would you be willing to match their price?\nW: Yes, we have a price-match guarantee.\nM: Great. I'll bring the metal to you this afternoon, then.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n61. Chiều nay người đàn ông sẽ làm gì?\n(A) Tiến hành kiểm tra\n(B) Ký tài liệu\n(C) Giao một số vật liệu\n(D) Cập nhật trang web\n\nDịch hội thoại:\nW: Cảm ơn đã gọi đến Công ty Tái chế Kim loại Hang. Tôi có thể giúp gì cho anh?\nM: Chào. Tôi từ Công ty Xây dựng Shannak. Chúng tôi có nhiều phế liệu kim loại đồng từ công việc sửa chữa cải tạo gần đây. Công ty có đang mua phế liệu kim loại không?\nW: Vâng, chúng tôi đang mua. Hiện tại chúng tôi trả hai đô la một pound.\nM: Ồ, có một trung tâm tái chế khác trả hai đô la hai mươi lăm cent một pound. Công ty có sẵn lòng khớp giá đó không?\nW: Vâng, chúng tôi có chính sách khớp giá.\nM: Tuyệt vời. Vậy tôi sẽ mang kim loại đến chiều nay."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Look at the graphic. Which project phase was just completed? (A) Phase 1 (B) Phase 2 (C) Phase 3 (D) Phase 4",
   "transcript": "W: Hi, I just got off the phone with management. They're not happy. The construction of the train tunnel isn't progressing fast enough.\nM: Yeah, I'm not surprised. The drilling is done now. The thing is, we can't start installing the support columns until we have all the materials for the concrete.\nW: When are the materials going to get here?\nM: A week, maybe two.\nW: Let's see if the shipment can be expedited. Can you do that?\nM: Sure. I'll call the supplier to ask about getting it here sooner.\nW: In the meantime, I'm going to write an e-mail to management to explain how we're attempting to resolve the situation.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n62. Hãy nhìn vào hình ảnh. Giai đoạn nào của dự án vừa được hoàn thành?\n(A) Giai đoạn 1\n(B) Giai đoạn 2\n(C) Giai đoạn 3\n(D) Giai đoạn 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nW: Chào, tôi vừa kết thúc cuộc gọi với ban quản lý. Họ không hài lòng. Việc xây dựng đường hầm tàu hỏa không tiến triển đủ nhanh.\nM: Ừ, tôi không ngạc nhiên. Việc khoan đã hoàn tất. Vấn đề là chúng ta không thể bắt đầu lắp đặt cột chống đỡ cho đến khi có đầy đủ vật liệu cho bê tông.\nW: Vật liệu sẽ đến khi nào?\nM: Một tuần, có lẽ hai tuần.\nW: Hãy xem liệu lô hàng có thể được đẩy nhanh không. Anh có thể làm điều đó không?\nM: Chắc chắn. Tôi sẽ gọi nhà cung cấp để hỏi về việc giao sớm hơn.\nW: Trong lúc đó, tôi sẽ viết email cho ban quản lý để giải thích cách chúng ta đang cố gắng giải quyết tình hình."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "A",
   "group": "62-64",
   "textEn": "63. What does the woman ask the man to do? (A) Request an earlier delivery date (B) Consult with a safety inspector (C) Post some construction plans (D) Forward an invoice",
   "transcript": "W: Hi, I just got off the phone with management. They're not happy. The construction of the train tunnel isn't progressing fast enough.\nM: Yeah, I'm not surprised. The drilling is done now. The thing is, we can't start installing the support columns until we have all the materials for the concrete.\nW: When are the materials going to get here?\nM: A week, maybe two.\nW: Let's see if the shipment can be expedited. Can you do that?\nM: Sure. I'll call the supplier to ask about getting it here sooner.\nW: In the meantime, I'm going to write an e-mail to management to explain how we're attempting to resolve the situation.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n63. Người phụ nữ yêu cầu người đàn ông làm gì?\n(A) Yêu cầu giao hàng sớm hơn\n(B) Tham khảo ý kiến c ủa thanh tra an toàn\n(C) Đăng tải một số bản vẽ xây dựng\n(D) Gửi hóa đơn\n\nDịch hội thoại:\nW: Chào, tôi vừa kết thúc cuộc gọi với ban quản lý. Họ không hài lòng. Việc xây dựng đường hầm tàu hỏa không tiến triển đủ nhanh.\nM: Ừ, tôi không ngạc nhiên. Việc khoan đã hoàn tất. Vấn đề là chúng ta không thể bắt đầu lắp đặt cột chống đỡ cho đến khi có đầy đủ vật liệu cho bê tông.\nW: Vật liệu sẽ đến khi nào?\nM: Một tuần, có lẽ hai tuần.\nW: Hãy xem liệu lô hàng có thể được đẩy nhanh không. Anh có thể làm điều đó không?\nM: Chắc chắn. Tôi sẽ gọi nhà cung cấp để hỏi về việc giao sớm hơn.\nW: Trong lúc đó, tôi sẽ viết email cho ban quản lý để giải thích cách chúng ta đang cố gắng giải quyết tình hình."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "D",
   "group": "62-64",
   "textEn": "64. What does the woman intend to do next? (A) Review some data (B) Move a vehicle (C) Increase the size of a crew (D) Contact the management team",
   "transcript": "W: Hi, I just got off the phone with management. They're not happy. The construction of the train tunnel isn't progressing fast enough.\nM: Yeah, I'm not surprised. The drilling is done now. The thing is, we can't start installing the support columns until we have all the materials for the concrete.\nW: When are the materials going to get here?\nM: A week, maybe two.\nW: Let's see if the shipment can be expedited. Can you do that?\nM: Sure. I'll call the supplier to ask about getting it here sooner.\nW: In the meantime, I'm going to write an e-mail to management to explain how we're attempting to resolve the situation.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n64. Người phụ nữ dự định làm gì tiếp theo?\n(A) Xem xét một số dữ liệu\n(B) Di chuyển một phương tiện\n(C) Tăng số lượng nhân công\n(D) Liên hệ với đội ngũ quản lý\n\nDịch hội thoại:\nW: Chào, tôi vừa kết thúc cuộc gọi với ban quản lý. Họ không hài lòng. Việc xây dựng đường hầm tàu hỏa không tiến triển đủ nhanh.\nM: Ừ, tôi không ngạc nhiên. Việc khoan đã hoàn tất. Vấn đề là chúng ta không thể bắt đầu lắp đặt cột chống đỡ cho đến khi có đầy đủ vật liệu cho bê tông.\nW: Vật liệu sẽ đến khi nào?\nM: Một tuần, có lẽ hai tuần.\nW: Hãy xem liệu lô hàng có thể được đẩy nhanh không. Anh có thể làm điều đó không?\nM: Chắc chắn. Tôi sẽ gọi nhà cung cấp để hỏi về việc giao sớm hơn.\nW: Trong lúc đó, tôi sẽ viết email cho ban quản lý để giải thích cách chúng ta đang cố gắng giải quyết tình hình."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "A",
   "group": "65-67",
   "textEn": "65. What type of business do the speakers work for? (A) A restaurant (B) A law firm (C) An office-supply store (D) A flower shop",
   "transcript": "M: The city just posted its new parking rates, and we need to talk about how they'll affect our restaurant's food delivery service. I'm worried we'll lose money because we'll need to pay more for parking while the delivery driver takes the food to customers.\nW: Wow. Parking in our main delivery area is up to fifteen dollars an hour? That is a problem. But offering free delivery attracts a lot of business. What else can we do to lower expenses?\nM: We could start using bicycle delivery whenever possible. That should help.\nW: Good idea. I'll talk to our drivers to see who's willing to switch to bicycle deliveries for customers nearby. Some people really like the exercise.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n65. Loại hình kinh doanh của người nói là gì?\n(A) Nhà hàng\n(B) Công ty luật\n(C) Cửa hàng cung cấp văn phòng phẩm\n(D) Cửa hàng hoa\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Thành phố vừa công bố mức phí đỗ xe mới, và chúng ta cần thảo luận về cách chúng ảnh hưởng đến dịch vụ giao đồ ăn của nhà hàng. Tôi lo chúng ta sẽ lỗ vì phải trả thêm phí đỗ xe trong lúc tài xế giao thức ăn cho khách.\nW: Ồ. Phí đỗ xe ở khu vực giao hàng chính lên đến mười lăm đô la một giờ cơ à? Đó là vấn đề lớn. Nhưng cung cấp giao hàng miễn phí sẽ thu hút nhiều khách hàng. Chúng ta có thể làm gì khác để giảm chi phí không?\nM: Chúng ta có thể bắt đầu sử dụng giao hàng bằng xe đạp khi có thể. Điều đó sẽ giúp ích.\nW: Ý hay đấy. Tôi sẽ nói chuyện với các tài xế để xem ai sẵn lòng chuyển sang giao bằng xe đạp cho khách ở gần đây không. Một số người thực sự thích tập luyện mà."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "66. Look at the graphic. In which area of the city does the business make most of its deliveries? (A) The waterfront district (B) The historic district (C) The residential district (D) The downtown district",
   "transcript": "M: The city just posted its new parking rates, and we need to talk about how they'll affect our restaurant's food delivery service. I'm worried we'll lose money because we'll need to pay more for parking while the delivery driver takes the food to customers.\nW: Wow. Parking in our main delivery area is up to fifteen dollars an hour? That is a problem. But offering free delivery attracts a lot of business. What else can we do to lower expenses?\nM: We could start using bicycle delivery whenever possible. That should help.\nW: Good idea. I'll talk to our drivers to see who's willing to switch to bicycle deliveries for customers nearby. Some people really like the exercise.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n66. Nhìn vào biểu đồ. Khu vực nào của thành phố doanh nghiệp thực hiện hầu hết các chuyến giao hàng?\n(A) Khu vực ven sông\n(B) Khu vực lịch sử\n(C) Khu dân cư\n(D) Khu trung tâm\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Thành phố vừa công bố mức phí đỗ xe mới, và chúng ta cần thảo luận về cách chúng ảnh hưởng đến dịch vụ giao đồ ăn của nhà hàng. Tôi lo chúng ta sẽ lỗ vì phải trả thêm phí đỗ xe trong lúc tài xế giao thức ăn cho khách.\nW: Ồ. Phí đỗ xe ở khu vực giao hàng chính lên đến mười lăm đô la một giờ cơ à? Đó là vấn đề lớn. Nhưng cung cấp giao hàng miễn phí sẽ thu hút nhiều khách hàng. Chúng ta có thể làm gì khác để giảm chi phí không?\nM: Chúng ta có thể bắt đầu sử dụng giao hàng bằng xe đạp khi có thể. Điều đó sẽ giúp ích.\nW: Ý hay đấy. Tôi sẽ nói chuyện với các tài xế để xem ai sẵn lòng chuyển sang giao bằng xe đạp cho khách ở gần đây không. Một số người thực sự thích tập luyện mà."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "B",
   "group": "65-67",
   "textEn": "67. How does the man propose lowering business expenses? (A) By reducing packaging waste (B) By introducing bicycle delivery (C) By switching to a new supplier (D) By moving to a smaller building",
   "transcript": "M: The city just posted its new parking rates, and we need to talk about how they'll affect our restaurant's food delivery service. I'm worried we'll lose money because we'll need to pay more for parking while the delivery driver takes the food to customers.\nW: Wow. Parking in our main delivery area is up to fifteen dollars an hour? That is a problem. But offering free delivery attracts a lot of business. What else can we do to lower expenses?\nM: We could start using bicycle delivery whenever possible. That should help.\nW: Good idea. I'll talk to our drivers to see who's willing to switch to bicycle deliveries for customers nearby. Some people really like the exercise.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n67. Người đàn ông đề xuất giảm chi phí kinh doanh bằng cách nào?\n(A) Giảm rác bao bì\n(B) Giới thiệu dịch vụ giao hàng bằng xe đạp\n(C) Chuyển sang nhà cung cấp mới\n(D) Chuyển đến tòa nhà nhỏ hơn\n\nDịch hội thoại:\nM: Thành phố vừa công bố mức phí đỗ xe mới, và chúng ta cần thảo luận về cách chúng ảnh hưởng đến dịch vụ giao đồ ăn của nhà hàng. Tôi lo chúng ta sẽ lỗ vì phải trả thêm phí đỗ xe trong lúc tài xế giao thức ăn cho khách.\nW: Ồ. Phí đỗ xe ở khu vực giao hàng chính lên đến mười lăm đô la một giờ cơ à? Đó là vấn đề lớn. Nhưng cung cấp giao hàng miễn phí sẽ thu hút nhiều khách hàng. Chúng ta có thể làm gì khác để giảm chi phí không?\nM: Chúng ta có thể bắt đầu sử dụng giao hàng bằng xe đạp khi có thể. Điều đó sẽ giúp ích.\nW: Ý hay đấy. Tôi sẽ nói chuyện với các tài xế để xem ai sẵn lòng chuyển sang giao bằng xe đạp cho khách ở gần đây không. Một số người thực sự thích tập luyện mà."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "68. Who most likely is the woman? (A) A hotel manager (B) An interior designer (C) A construction worker (D) A real estate agent",
   "transcript": "M: When customers walk into Southern Regional Bank, I want them to feel confident about entrusting their money to us. As I mentioned the last time we met, I'm hoping your interior design firm can give our lobby a more polished, professional look.\nW: Our proposal does just that. Here—take a look. The cover page includes a summary of the renovations.\nW: Hmm. Do you really think we need skylights? That would be a big expense.\nW: There aren't many windows in your lobby, so it's the best way to bring more natural light into the room. Besides, our proposed renovations would actually come in under budget. If you turn to page four, you'll see the cost breakdown.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n68. Người phụ nữ nhiều khả năng là ai?\n(A) Quản lý khách sạn\n(B) Nhà thiết kế nội thất\n(C) Công nhân xây dựng\n(D) Nhân viên môi giới bất động sản\n\nDịch hội thoại:\nM: Khi khách hàng bước vào Ngân hàng Khu vực Miền Nam, tôi muốn họ cảm thấy tự tin khi giao phó tiền bạc cho chúng tôi. Như tôi đã đề cập lần gặp trước, tôi hy vọng công ty thiết kế nội thất của quý vị có thể mang lại vẻ ngoài chuyên nghiệp, bóng bẩy hơn cho sảnh của chúng tôi.\nW: Đề xuất của chúng tôi làm chính xác điều đó. Đây- hãy xem qua. Trang bìa bao gồm tóm tắt các công việc cho lần cải tạo này.\nM: Ừm. Bên cô có thực sự nghĩ chúng ta cần giếng trời không? Đó sẽ là chi phí lớn.\nW: Sảnh của các anh không có nhiều cửa sổ, nên đó là cách tốt nhất để đưa thêm ánh sáng tự nhiên vào phòng. Hơn nữa, các công việc cải tạo đề xuất của chúng tôi thực tế sẽ dưới ngân sách. Nếu anh lật sang trang bốn, anh sẽ thấy phân tích chi phí cụ thể."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "A",
   "group": "68-70",
   "textEn": "69. Look at the graphic. Which step does the man ask about? (A) Step 1 (B) Step 2 (C) Step 3 (D) Step 4",
   "transcript": "M: When customers walk into Southern Regional Bank, I want them to feel confident about entrusting their money to us. As I mentioned the last time we met, I'm hoping your interior design firm can give our lobby a more polished, professional look.\nW: Our proposal does just that. Here—take a look. The cover page includes a summary of the renovations.\nW: Hmm. Do you really think we need skylights? That would be a big expense.\nW: There aren't many windows in your lobby, so it's the best way to bring more natural light into the room. Besides, our proposed renovations would actually come in under budget. If you turn to page four, you'll see the cost breakdown.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n69. Nhìn vào biểu đồ. Người đàn ông hỏi về bước nào?\n(A) Bước 1\n(B) Bước 2\n(C) Bước 3\n(D) Bước 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nM: Khi khách hàng bước vào Ngân hàng Khu vực Miền Nam, tôi muốn họ cảm thấy tự tin khi giao phó tiền bạc cho chúng tôi. Như tôi đã đề cập lần gặp trước, tôi hy vọng công ty thiết kế nội thất của quý vị có thể mang lại vẻ ngoài chuyên nghiệp, bóng bẩy hơn cho sảnh của chúng tôi.\nW: Đề xuất của chúng tôi làm chính xác điều đó. Đây- hãy xem qua. Trang bìa bao gồm tóm tắt các công việc cho lần cải tạo này.\nM: Ừm. Bên cô có thực sự nghĩ chúng ta cần giếng trời không? Đó sẽ là chi phí lớn.\nW: Sảnh của các anh không có nhiều cửa sổ, nên đó là cách tốt nhất để đưa thêm ánh sáng tự nhiên vào phòng. Hơn nữa, các công việc cải tạo đề xuất của chúng tôi thực tế sẽ dưới ngân sách. Nếu anh lật sang trang bốn, anh sẽ thấy phân tích chi phí cụ thể."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "70. What will the man most likely do next? (A) Send a contract (B) Go to the lobby (C) Look at some photographs (D) Review a cost estimate",
   "transcript": "M: When customers walk into Southern Regional Bank, I want them to feel confident about entrusting their money to us. As I mentioned the last time we met, I'm hoping your interior design firm can give our lobby a more polished, professional look.\nW: Our proposal does just that. Here—take a look. The cover page includes a summary of the renovations.\nW: Hmm. Do you really think we need skylights? That would be a big expense.\nW: There aren't many windows in your lobby, so it's the best way to bring more natural light into the room. Besides, our proposed renovations would actually come in under budget. If you turn to page four, you'll see the cost breakdown.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n70. Người đàn ông có thể làm gì tiếp theo?\n(A) Gửi hợp đồng\n(B) Đi ra sảnh\n(C) Xem một số ảnh\n(D) Xem lại bảng chi phí\n\nDịch hội thoại:\nM: Khi khách hàng bước vào Ngân hàng Khu vực Miền Nam, tôi muốn họ cảm thấy tự tin khi giao phó tiền bạc cho chúng tôi. Như tôi đã đề cập lần gặp trước, tôi hy vọng công ty thiết kế nội thất của quý vị có thể mang lại vẻ ngoài chuyên nghiệp, bóng bẩy hơn cho sảnh của chúng tôi.\nW: Đề xuất của chúng tôi làm chính xác điều đó. Đây- hãy xem qua. Trang bìa bao gồm tóm tắt các công việc cho lần cải tạo này.\nM: Ừm. Bên cô có thực sự nghĩ chúng ta cần giếng trời không? Đó sẽ là chi phí lớn.\nW: Sảnh của các anh không có nhiều cửa sổ, nên đó là cách tốt nhất để đưa thêm ánh sáng tự nhiên vào phòng. Hơn nữa, các công việc cải tạo đề xuất của chúng tôi thực tế sẽ dưới ngân sách. Nếu anh lật sang trang bốn, anh sẽ thấy phân tích chi phí cụ thể."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "71. Who most likely is the speaker? (A) A department manager (B) A news reporter (C) A marketing consultant (D) A computer programmer",
   "transcript": "Welcome to the monthly company staff meeting. Before I begin my report on last month's sales figures, I want to congratulate our fantastic IT team! The sales tracking system they built allows us to easily share results with colleagues from other branches. All employees are required to attend a training session on how to use it. A registration link will be sent out this afternoon. Now, let's look at last month's figures. We need to decide if we're ready to expand into more markets.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n71. Người nói có khả năng là ai?\n(A) Quản lý bộ phận\n(B) Phóng viên\n(C) Cố vấn marketing\n(D) Lập trình viên máy tính\n\nDịch bài nói:\nChào mừng đến với cuộc họp nhân viên hàng tháng của công ty. Trước khi bắt đầu báo cáo về số liệu bán hàng tháng trước, tôi muốn chúc mừng đội ngũ IT tuyệt vời của chúng ta! Hệ thống theo dõi bán hàng mà họ xây dựng cho phép chúng ta dễ dàng chia sẻ kết quả với đồng nghiệp từ các chi nhánh khác. Tất cả nhân viên phải tham gia buổi đào tạo về cách sử dụng hệ thống. Liên kết đăng ký sẽ được gửi vào chiều nay. Bây giờ, hãy xem số liệu tháng trước. Chúng ta cần quyết định xem liệu đã sẵn sàng mở rộng sang nhiều thị trường hơn chưa."
  },
  {
   "number": 72,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "72. Why does the speaker congratulate a team? (A) For keeping expenses low (B) For creating a useful tool (C) For meeting a tight deadline (D) For achieving the most sales",
   "transcript": "Welcome to the monthly company staff meeting. Before I begin my report on last month's sales figures, I want to congratulate our fantastic IT team! The sales tracking system they built allows us to easily share results with colleagues from other branches. All employees are required to attend a training session on how to use it. A registration link will be sent out this afternoon. Now, let's look at last month's figures. We need to decide if we're ready to expand into more markets.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n72. Tại sao người nói chúc mừng một nhóm?\n(A) Giữ chi phí thấp\n(B) Tạo ra một công cụ hữu ích\n(C) Hoàn thành hạn chót gấp\n(D) Đạt doanh số cao nhất\n\nDịch bài nói:\nChào mừng đến với cuộc họp nhân viên hàng tháng của công ty. Trước khi bắt đầu báo cáo về số liệu bán hàng tháng trước, tôi muốn chúc mừng đội ngũ IT tuyệt vời của chúng ta! Hệ thống theo dõi bán hàng mà họ xây dựng cho phép chúng ta dễ dàng chia sẻ kết quả với đồng nghiệp từ các chi nhánh khác. Tất cả nhân viên phải tham gia buổi đào tạo về cách sử dụng hệ thống. Liên kết đăng ký sẽ được gửi vào chiều nay. Bây giờ, hãy xem số liệu tháng trước. Chúng ta cần quyết định xem liệu đã sẵn sàng mở rộng sang nhiều thị trường hơn chưa."
  },
  {
   "number": 73,
   "part": 4,
   "answer": "A",
   "group": "71-73",
   "textEn": "73. What are the listeners required to do? (A) Register for some training (B) Review a floor plan (C) Participate in a mentoring program (D) Provide copies of certifications",
   "transcript": "Welcome to the monthly company staff meeting. Before I begin my report on last month's sales figures, I want to congratulate our fantastic IT team! The sales tracking system they built allows us to easily share results with colleagues from other branches. All employees are required to attend a training session on how to use it. A registration link will be sent out this afternoon. Now, let's look at last month's figures. We need to decide if we're ready to expand into more markets.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n73. Người nghe được yêu cầu làm gì?\n(A) Đăng ký một khóa đào tạo\n(B) Xem lại sơ đồ mặt bằng\n(C) Tham gia chương trình cố vấn\n(D) Nộp bản sao chứng chỉ\n\nDịch bài nói:\nChào mừng đến với cuộc họp nhân viên hàng tháng của công ty. Trước khi bắt đầu báo cáo về số liệu bán hàng tháng trước, tôi muốn chúc mừng đội ngũ IT tuyệt vời của chúng ta! Hệ thống theo dõi bán hàng mà họ xây dựng cho phép chúng ta dễ dàng chia sẻ kết quả với đồng nghiệp từ các chi nhánh khác. Tất cả nhân viên phải tham gia buổi đào tạo về cách sử dụng hệ thống. Liên kết đăng ký sẽ được gửi vào chiều nay. Bây giờ, hãy xem số liệu tháng trước. Chúng ta cần quyết định xem liệu đã sẵn sàng mở rộng sang nhiều thị trường hơn chưa."
  },
  {
   "number": 74,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "74. What are the listeners invited to do? (A) Download a calendar (B) Reserve tickets (C) Submit a picture (D) Share a story",
   "transcript": "Hello. You've reached the communications team of Business As Usual, the talk show about starting a new business. If you are calling because you'd like to appear on our show, we'd love to hear your story! To record your story idea, please press one. Please note: it is necessary to keep your message under 60 seconds. Submissions that are more than a minute long will not be reviewed. The typical timeline for the review process is two weeks, with longer wait times expected around holidays.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n74. Người nghe được mời làm gì?\n(A) Tải lịch\n(B) Đặt chỗ\n(C) Gửi ảnh\n(D) Chia sẻ câu chuyện\n\nDịch bài nói:\nXin chào. Bạn đã liên lạc với đội ngũ truyền thông của Business As Usual, chương trình talk show về khởi nghiệp. Nếu bạn gọi vì muốn xuất hiện trên chương trình, chúng tôi rất mong nghe câu chuyện của bạn! Để ghi âm ý tưởng câu chuyện, vui lòng nhấn phím một. Lưu ý: cần giữ thông điệp dưới 60 giây. Các bản ghi vượt quá một phút sẽ không được xem xét. Thời gian đánh giá thông thường là hai tuần, với thời gian chờ đợi lâu hơn dự kiến quanh các kỳ nghỉ lễ."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "75. What guideline does the speaker emphasize? (A) Recordings must be kept short. (B) Electronic devices must be turned off. (C) Professional references must be provided. (D) Vehicles must be parked in a designated area.",
   "transcript": "Hello. You've reached the communications team of Business As Usual, the talk show about starting a new business. If you are calling because you'd like to appear on our show, we'd love to hear your story! To record your story idea, please press one. Please note: it is necessary to keep your message under 60 seconds. Submissions that are more than a minute long will not be reviewed. The typical timeline for the review process is two weeks, with longer wait times expected around holidays.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n75. Quy định nào người nói nhấn mạnh?\n(A) Bản ghi phải ngắn\n(B) Thiết bị điện tử phải tắt\n(C) Phải nộp thư giới thiệu\n(D) Xe phải đỗ đúng khu vực\n\nDịch bài nói:\nXin chào. Bạn đã liên lạc với đội ngũ truyền thông của Business As Usual, chương trình talk show về khởi nghiệp. Nếu bạn gọi vì muốn xuất hiện trên chương trình, chúng tôi rất mong nghe câu chuyện của bạn! Để ghi âm ý tưởng câu chuyện, vui lòng nhấn phím một. Lưu ý: cần giữ thông điệp dưới 60 giây. Các bản ghi vượt quá một phút sẽ không được xem xét. Thời gian đánh giá thông thường là hai tuần, với thời gian chờ đợi lâu hơn dự kiến quanh các kỳ nghỉ lễ."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. According to the speaker, what may cause a delay? (A) Bad weather (B) Holiday traffic (C) A construction project (D) Staff changes",
   "transcript": "Hello. You've reached the communications team of Business As Usual, the talk show about starting a new business. If you are calling because you'd like to appear on our show, we'd love to hear your story! To record your story idea, please press one. Please note: it is necessary to keep your message under 60 seconds. Submissions that are more than a minute long will not be reviewed. The typical timeline for the review process is two weeks, with longer wait times expected around holidays.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n76. Điều gì có thể gây chậm trễ?\n(A) Thời tiết xấu\n(B) Ùn tắc giao thông dịp lễ\n(C) Công trình xây dựng\n(D) Thay đổi nhân sự\n\nDịch bài nói:\nXin chào. Bạn đã liên lạc với đội ngũ truyền thông của Business As Usual, chương trình talk show về khởi nghiệp. Nếu bạn gọi vì muốn xuất hiện trên chương trình, chúng tôi rất mong nghe câu chuyện của bạn! Để ghi âm ý tưởng câu chuyện, vui lòng nhấn phím một. Lưu ý: cần giữ thông điệp dưới 60 giây. Các bản ghi vượt quá một phút sẽ không được xem xét. Thời gian đánh giá thông thường là hai tuần, với thời gian chờ đợi lâu hơn dự kiến quanh các kỳ nghỉ lễ."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "A",
   "group": "77-79",
   "textEn": "77. What is the focus of a tour? (A) Food (B) Architecture (C) Sports (D) Art",
   "transcript": "Welcome to the culinary tour of downtown Springfield. Today, you'll taste a variety of local foods. Normally I'd start by taking you inside Zelda's Bakery to try one of their famous corn muffins, but we have such a large group today. Instead, we're going to head directly to the open-air market. There you'll find a wide selection of the homemade breads, jams, and pastries that we're noted for. After that, we'll head to the original Springfield cornmill, which is still in use today. And remember to keep your tour ticket. It's good for one free entry at the local museum.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n77. Chuyến tham quan tập trung vào chủ đề gì?\n(A) Ẩm thực\n(B) Kiến trúc\n(C) Thể thao\n(D) Nghệ thuật\n\nDịch bài nói:\nChào mừng đến với tour ẩm thực tại trung tâm Springfield. Hôm nay, quý vị sẽ nếm thử nhiều món ăn địa phương đa dạng. Thường thì tôi sẽ bắt đầu bằng việc dẫn quý vị vào Zelda's Bakery để thử một trong những chiếc muffin ngô nổi tiếng, nhưng hôm nay nhóm chúng ta khá đông. Thay vào đó, chúng ta sẽ đi thẳng đến chợ trời. Ở đó, quý vị sẽ tìm thấy nhiều lựa chọn bánh mì tự làm, mứt và bánh ngọt mà chúng ta nổi tiếng. Sau đó, chúng ta sẽ đến nhà máy xay ngô Springfield nguyên bản, vẫn còn hoạt động đến nay. Và nhớ giữ vé tour nhé. Nó có giá trị cho một lần vào cửa miễn phí tại bảo tàng địa phương."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "78. What does the speaker imply when she says, “we have such a large group today”? (A) She is happy about the popularity of a tour. (B) She will need to use a microphone. (C) An additional tour guide is needed. (D) A shop is not big enough for everyone.",
   "transcript": "Welcome to the culinary tour of downtown Springfield. Today, you'll taste a variety of local foods. Normally I'd start by taking you inside Zelda's Bakery to try one of their famous corn muffins, but we have such a large group today. Instead, we're going to head directly to the open-air market. There you'll find a wide selection of the homemade breads, jams, and pastries that we're noted for. After that, we'll head to the original Springfield cornmill, which is still in use today. And remember to keep your tour ticket. It's good for one free entry at the local museum.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n78. Khi nói “chúng ta có một nhóm rất đông hôm nay”, người nói muốn ám chỉ điều gì?\n(A) Bà ấy vui vì tour rất đông\n(B) Bà ấy cần dùng micro\n(C) Cần thêm hướng dẫn viên\n(D) Cửa hàng quá nhỏ cho tất cả mọi người\n\nDịch bài nói:\nChào mừng đến với tour ẩm thực tại trung tâm Springfield. Hôm nay, quý vị sẽ nếm thử nhiều món ăn địa phương đa dạng. Thường thì tôi sẽ bắt đầu bằng việc dẫn quý vị vào Zelda's Bakery để thử một trong những chiếc muffin ngô nổi tiếng, nhưng hôm nay nhóm chúng ta khá đông. Thay vào đó, chúng ta sẽ đi thẳng đến chợ trời. Ở đó, quý vị sẽ tìm thấy nhiều lựa chọn bánh mì tự làm, mứt và bánh ngọt mà chúng ta nổi tiếng. Sau đó, chúng ta sẽ đến nhà máy xay ngô Springfield nguyên bản, vẫn còn hoạt động đến nay. Và nhớ giữ vé tour nhé. Nó có giá trị cho một lần vào cửa miễn phí tại bảo tàng địa phương."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "79. What will a ticket allow the listeners to do? (A) Attend a performance (B) Visit a museum (C) Participate in a class (D) Enter a contest",
   "transcript": "Welcome to the culinary tour of downtown Springfield. Today, you'll taste a variety of local foods. Normally I'd start by taking you inside Zelda's Bakery to try one of their famous corn muffins, but we have such a large group today. Instead, we're going to head directly to the open-air market. There you'll find a wide selection of the homemade breads, jams, and pastries that we're noted for. After that, we'll head to the original Springfield cornmill, which is still in use today. And remember to keep your tour ticket. It's good for one free entry at the local museum.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n79. Vé sẽ cho phép người nghe làm gì?\n(A) Xem biểu diễn\n(B) Tham quan bảo tàng\n(C) Tham gia lớp học\n(D) Tham gia cuộc thi\n\nDịch bài nói:\nChào mừng đến với tour ẩm thực tại trung tâm Springfield. Hôm nay, quý vị sẽ nếm thử nhiều món ăn địa phương đa dạng. Thường thì tôi sẽ bắt đầu bằng việc dẫn quý vị vào Zelda's Bakery để thử một trong những chiếc muffin ngô nổi tiếng, nhưng hôm nay nhóm chúng ta khá đông. Thay vào đó, chúng ta sẽ đi thẳng đến chợ trời. Ở đó, quý vị sẽ tìm thấy nhiều lựa chọn bánh mì tự làm, mứt và bánh ngọt mà chúng ta nổi tiếng. Sau đó, chúng ta sẽ đến nhà máy xay ngô Springfield nguyên bản, vẫn còn hoạt động đến nay. Và nhớ giữ vé tour nhé. Nó có giá trị cho một lần vào cửa miễn phí tại bảo tàng địa phương."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "80. What industry was the Novikov Award created for? (A) Aviation (B) Chemical engineering (C) Medical research (D) Television production",
   "transcript": "The Novikov Award is named after Maksim Novikov, the founder of Novikov Aviation. It is given each year to a company that has made outstanding contributions to the aviation industry. The company chosen for the award this year was frustrated by the lack of qualified job applicants and decided to do something about it. Zenith Aviation's apprenticeship program has trained hundreds of workers for careers in aircraft maintenance and repair. Dozens of firms nationwide have copied the program. Before I present the award, please direct your attention to the screen for a video highlighting the program's effectiveness.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n80. Giải thưởng Novikov dành cho ngành nào?\n(A) Hàng không\n(B) Kỹ thuật hóa học\n(C) Nghiên cứu y học\n(D) Sản xuất truyền hình\n\nDịch bài nói:\nGiải thưởng Novikov được đặt theo tên Maksim Novikov, người sáng lập Novikov Aviation. Nó được trao hàng năm cho một công ty có đóng góp xuất sắc cho ngành hàng không. Công ty được chọn cho giải thưởng năm nay từng thất vọng vì thiếu ứng viên đủ điều kiện và quyết định làm gì đó. Chương trình học việc của Zenith Aviation đã đào tạo hàng trăm công nhân cho sự nghiệp bảo dưỡng và sửa chữa máy bay. Hàng chục công ty trên toàn quốc đã sao chép chương trình. Trước khi trao giải, vui lòng hướng sự chú ý đến màn hình để xem video nhấn mạnh hiệu quả của chương trình."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "81. Why was this year’s award recipient selected? (A) For launching a unique advertising campaign (B) For developing a successful training program (C) For maintaining a perfect safety record (D) For making a scientific discovery",
   "transcript": "The Novikov Award is named after Maksim Novikov, the founder of Novikov Aviation. It is given each year to a company that has made outstanding contributions to the aviation industry. The company chosen for the award this year was frustrated by the lack of qualified job applicants and decided to do something about it. Zenith Aviation's apprenticeship program has trained hundreds of workers for careers in aircraft maintenance and repair. Dozens of firms nationwide have copied the program. Before I present the award, please direct your attention to the screen for a video highlighting the program's effectiveness.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n81. Tại sao người nhận giải năm nay được chọn?\n(A) Khởi động chiến dịch quảng cáo độc đáo\n(B) Phát triển chương trình đào tạo thành công\n(C) Duy trì hồ sơ an toàn hoàn hảo\n(D) Khám phá khoa học\n\nDịch bài nói:\nGiải thưởng Novikov được đặt theo tên Maksim Novikov, người sáng lập Novikov Aviation. Nó được trao hàng năm cho một công ty có đóng góp xuất sắc cho ngành hàng không. Công ty được chọn cho giải thưởng năm nay từng thất vọng vì thiếu ứng viên đủ điều kiện và quyết định làm gì đó. Chương trình học việc của Zenith Aviation đã đào tạo hàng trăm công nhân cho sự nghiệp bảo dưỡng và sửa chữa máy bay. Hàng chục công ty trên toàn quốc đã sao chép chương trình. Trước khi trao giải, vui lòng hướng sự chú ý đến màn hình để xem video nhấn mạnh hiệu quả của chương trình."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "A",
   "group": "80-82",
   "textEn": "82. What does the speaker ask the listeners to do? (A) Get ready to watch a video (B) Applaud the winner (C) Share copies of a handout (D) Read a set of directions",
   "transcript": "The Novikov Award is named after Maksim Novikov, the founder of Novikov Aviation. It is given each year to a company that has made outstanding contributions to the aviation industry. The company chosen for the award this year was frustrated by the lack of qualified job applicants and decided to do something about it. Zenith Aviation's apprenticeship program has trained hundreds of workers for careers in aircraft maintenance and repair. Dozens of firms nationwide have copied the program. Before I present the award, please direct your attention to the screen for a video highlighting the program's effectiveness.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n82. Người nói yêu cầu người nghe làm gì?\n(A) Sẵn sàng xem video\n(B) Vỗ tay cho người thắng giải\n(C) Chia sẻ bản phát tay\n(D) Đọc hướng dẫn\n\nDịch bài nói:\nGiải thưởng Novikov được đặt theo tên Maksim Novikov, người sáng lập Novikov Aviation. Nó được trao hàng năm cho một công ty có đóng góp xuất sắc cho ngành hàng không. Công ty được chọn cho giải thưởng năm nay từng thất vọng vì thiếu ứng viên đủ điều kiện và quyết định làm gì đó. Chương trình học việc của Zenith Aviation đã đào tạo hàng trăm công nhân cho sự nghiệp bảo dưỡng và sửa chữa máy bay. Hàng chục công ty trên toàn quốc đã sao chép chương trình. Trước khi trao giải, vui lòng hướng sự chú ý đến màn hình để xem video nhấn mạnh hiệu quả của chương trình."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "C",
   "group": "83-85",
   "textEn": "83. Who is the speaker presenting to? (A) Loan officers (B) Construction workers (C) City council members (D) Bus drivers",
   "transcript": "Thank you for allowing me the opportunity to speak at this city council meeting. On behalf of the transportation department, I'd like to present a proposal to fund the replacement of all 350 bus-stop shelters in our city. We feel this is a worthwhile investment because the current shelters aren't in good shape. Many of them have cracked glass and broken benches. We want to go with Urban Retreat because its shelters are made of durable materials. While less expensive options are available, its models include a display for advertisements. These shelters could provide the city with a new source of income.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n83. Người nói đang trình bày với ai?\n(A) Nhân viên tín dụng\n(B) Công nhân xây dựng\n(C) Hội đồng thành phố\n(D) Tài xế xe buýt\n\nDịch bài nói:\nCảm ơn vì đã cho tôi cơ hội phát biểu tại cuộc họp hội đồng thành phố này. Thay mặt sở giao thông, tôi xin trình bày đề xuất tài trợ thay thế toàn bộ 350 mái che trạm xe buýt trong thành phố. Chúng tôi tin đây là khoản đầu tư đáng giá vì các mái che hiện tại không còn tốt. Nhiều cái có kính nứt và ghế ngồi hỏng. Chúng tôi muốn chọn Urban Retreat vì mái che của họ làm từ vật liệu bền. Mặc dù có lựa chọn rẻ hơn, nhưng mẫu của họ bao gồm màn hình quảng cáo. Những mái che này có thể mang lại nguồn thu mới cho thành phố."
  },
  {
   "number": 84,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "84. What does the speaker say about some existing structures? (A) They are in disrepair. (B) They are very small. (C) They were not assembled correctly. (D) They were installed last year.",
   "transcript": "Thank you for allowing me the opportunity to speak at this city council meeting. On behalf of the transportation department, I'd like to present a proposal to fund the replacement of all 350 bus-stop shelters in our city. We feel this is a worthwhile investment because the current shelters aren't in good shape. Many of them have cracked glass and broken benches. We want to go with Urban Retreat because its shelters are made of durable materials. While less expensive options are available, its models include a display for advertisements. These shelters could provide the city with a new source of income.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n84. Người nói nói gì về một số cấu trúc hiện có?\n(A) Chúng đang xuống cấp\n(B) Chúng quá nhỏ\n(C) Lắp ráp sai\n(D) Lắp đặt năm ngoái\n\nDịch bài nói:\nCảm ơn vì đã cho tôi cơ hội phát biểu tại cuộc họp hội đồng thành phố này. Thay mặt sở giao thông, tôi xin trình bày đề xuất tài trợ thay thế toàn bộ 350 mái che trạm xe buýt trong thành phố. Chúng tôi tin đây là khoản đầu tư đáng giá vì các mái che hiện tại không còn tốt. Nhiều cái có kính nứt và ghế ngồi hỏng. Chúng tôi muốn chọn Urban Retreat vì mái che của họ làm từ vật liệu bền. Mặc dù có lựa chọn rẻ hơn, nhưng mẫu của họ bao gồm màn hình quảng cáo. Những mái che này có thể mang lại nguồn thu mới cho thành phố."
  },
  {
   "number": 85,
   "part": 4,
   "answer": "B",
   "group": "83-85",
   "textEn": "85. Why does the speaker say, “its models include a display for advertisements”? (A) To respond to a request for information (B) To justify a cost (C) To express surprise (D) To suggest adding to a product line",
   "transcript": "Thank you for allowing me the opportunity to speak at this city council meeting. On behalf of the transportation department, I'd like to present a proposal to fund the replacement of all 350 bus-stop shelters in our city. We feel this is a worthwhile investment because the current shelters aren't in good shape. Many of them have cracked glass and broken benches. We want to go with Urban Retreat because its shelters are made of durable materials. While less expensive options are available, its models include a display for advertisements. These shelters could provide the city with a new source of income.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n85. Tại sao người nói nói “mẫu này có chỗ cho quảng cáo”?\n(A) Để trả lời yêu cầu thông tin\n(B) Để biện minh chi phí\n(C) Để thể hiện sự ngạc nhiên\n(D) Gợi ý thêm sản phẩm mới\n\nDịch bài nói:\nCảm ơn vì đã cho tôi cơ hội phát biểu tại cuộc họp hội đồng thành phố này. Thay mặt sở giao thông, tôi xin trình bày đề xuất tài trợ thay thế toàn bộ 350 mái che trạm xe buýt trong thành phố. Chúng tôi tin đây là khoản đầu tư đáng giá vì các mái che hiện tại không còn tốt. Nhiều cái có kính nứt và ghế ngồi hỏng. Chúng tôi muốn chọn Urban Retreat vì mái che của họ làm từ vật liệu bền. Mặc dù có lựa chọn rẻ hơn, nhưng mẫu của họ bao gồm màn hình quảng cáo. Những mái che này có thể mang lại nguồn thu mới cho thành phố."
  },
  {
   "number": 86,
   "part": 4,
   "answer": "D",
   "group": "86-88",
   "textEn": "86. What does the speaker’s company sell? (A) Clothing (B) Flowers (C) Toys (D) Wallpaper",
   "transcript": "Hi. It's Sarai. I'm calling about the new wallpaper patterns that your team submitted. We all really like the geometric prints. I'm almost certain that all of those will be approved for production in several different color schemes. And the wallpaper patterns for children's rooms are all so imaginative. You have some truly creative people on your design team. However, the animal-themed prints you sent—the thing is, we have a full supply of those in stock. Call me back so we can discuss it.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n86. Công ty của người nói bán gì?\n(A) Quần áo\n(B) Hoa\n(C) Đồ chơi\n(D) Giấy dán tường\n\nDịch bài nói:\nChào. Tôi là Sarai. Tôi gọi về các mẫu giấy dán tường mới mà đội ngũ của bạn gửi. Chúng tôi đều rất thích các họa tiết hình học. Tôi gần như chắc chắn rằng tất cả sẽ được phê duyệt sản xuất với nhiều bảng màu khác nhau. Và các mẫu giấy dán tường cho phòng trẻ em đều rất sáng tạo. Đội ngũ thiết kế của bạn có những người thực sự sáng tạo. Tuy nhiên, các họa tiết chủ đề động vật mà bạn gửi—vấn đề là chúng tôi có đầy hàng tồn kho cho loại đó. Gọi lại cho tôi để thảo luận nhé."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "87. Why does the speaker praise the listener’s team? (A) They stayed under budget. (B) They won an award. (C) They showed creativity. (D) They completed some work on schedule.",
   "transcript": "Hi. It's Sarai. I'm calling about the new wallpaper patterns that your team submitted. We all really like the geometric prints. I'm almost certain that all of those will be approved for production in several different color schemes. And the wallpaper patterns for children's rooms are all so imaginative. You have some truly creative people on your design team. However, the animal-themed prints you sent—the thing is, we have a full supply of those in stock. Call me back so we can discuss it.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n87. Tại sao người nói khen nhóm người nghe?\n(A) Hoàn thành dưới ngân sách\n(B) Thắng giải thưởng\n(C) Thể hiện sự sáng tạo\n(D) Hoàn thành công việc đúng tiến độ\n\nDịch bài nói:\nChào. Tôi là Sarai. Tôi gọi về các mẫu giấy dán tường mới mà đội ngũ của bạn gửi. Chúng tôi đều rất thích các họa tiết hình học. Tôi gần như chắc chắn rằng tất cả sẽ được phê duyệt sản xuất với nhiều bảng màu khác nhau. Và các mẫu giấy dán tường cho phòng trẻ em đều rất sáng tạo. Đội ngũ thiết kế của bạn có những người thực sự sáng tạo. Tuy nhiên, các họa tiết chủ đề động vật mà bạn gửi—vấn đề là chúng tôi có đầy hàng tồn kho cho loại đó. Gọi lại cho tôi để thảo luận nhé."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "88. Why does the speaker say, “we have a full supply of those in stock”? (A) To report that inventory has been completed (B) To offer to share some supplies with another store (C) To explain that some designs are not needed (D) To confirm that a customer’s order can be filled",
   "transcript": "Hi. It's Sarai. I'm calling about the new wallpaper patterns that your team submitted. We all really like the geometric prints. I'm almost certain that all of those will be approved for production in several different color schemes. And the wallpaper patterns for children's rooms are all so imaginative. You have some truly creative people on your design team. However, the animal-themed prints you sent—the thing is, we have a full supply of those in stock. Call me back so we can discuss it.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n88. Tại sao người nói nói “chúng tôi có đầy đủ hàng trong kho”?\n(A) Báo cáo kiểm kho đã hoàn tất\n(B) Gợi ý chia sẻ hàng với cửa hàng khác\n(C) Giải thích không cần một số mẫu\n(D) Xác nhận đơn hàng có thể hoàn tất\n\nDịch bài nói:\nChào. Tôi là Sarai. Tôi gọi về các mẫu giấy dán tường mới mà đội ngũ của bạn gửi. Chúng tôi đều rất thích các họa tiết hình học. Tôi gần như chắc chắn rằng tất cả sẽ được phê duyệt sản xuất với nhiều bảng màu khác nhau. Và các mẫu giấy dán tường cho phòng trẻ em đều rất sáng tạo. Đội ngũ thiết kế của bạn có những người thực sự sáng tạo. Tuy nhiên, các họa tiết chủ đề động vật mà bạn gửi—vấn đề là chúng tôi có đầy hàng tồn kho cho loại đó. Gọi lại cho tôi để thảo luận nhé."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "89. According to the speaker, what will be opening soon? (A) A restaurant (B) A sports arena (C) A performing arts center (D) A train station",
   "transcript": "In local news, the opening of the Stewart Performing Arts Center tomorrow night has attracted widespread attention. This state-of-the-art center holds three different theaters. The designer won an award for the building's insulated walls. They have rubber material that absorbs sound from the other theaters and nearby trains. On top of this, the interior decoration is magnificent. If you'd like to see some photos, browse upcoming shows, and plan your visit, go to the theater's Web site. We warn you, though—many shows are already sold out!",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n89. Theo người nói, cái gì sắp mở cửa?\n(A) Nhà hàng\n(B) Sân vận động\n(C) Trung tâm nghệ thuật biểu diễn\n(D) Ga tàu\n\nDịch bài nói:\nTrong tin địa phương, lễ khai trương Trung tâm Nghệ thuật Biểu diễn Stewart vào tối mai đã thu hút sự chú ý rộng rãi. Trung tâm hiện đại này có ba nhà hát khác nhau. Nhà thiết kế đã thắng giải cho các bức tường cách âm của tòa nhà. Chúng có vật liệu cao su hấp thụ âm thanh từ các nhà hát khác và tàu hỏa gần đó. Hơn nữa, trang trí nội thất rất lộng lẫy. Nếu bạn muốn xem ảnh, duyệt các buổi biểu diễn sắp tới và lập kế hoạch thăm quan, hãy truy cập website của nhà hát. Chúng tôi cảnh báo trước—nhiều buổi biểu diễn đã bán hết vé!"
  },
  {
   "number": 90,
   "part": 4,
   "answer": "D",
   "group": "89-91",
   "textEn": "90. Why did the building’s designer win an award? (A) For using solar power (B) For creating a rooftop garden (C) For installing a moving light display (D) For employing sound-absorbing walls",
   "transcript": "In local news, the opening of the Stewart Performing Arts Center tomorrow night has attracted widespread attention. This state-of-the-art center holds three different theaters. The designer won an award for the building's insulated walls. They have rubber material that absorbs sound from the other theaters and nearby trains. On top of this, the interior decoration is magnificent. If you'd like to see some photos, browse upcoming shows, and plan your visit, go to the theater's Web site. We warn you, though—many shows are already sold out!",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n90. Tại sao nhà thiết kế tòa nhà nhận giải?\n(A) Dùng năng lượng mặt trời\n(B) Tạo vườn trên mái\n(C) Lắp đặt hệ thống đèn di chuyển\n(D) Dùng tường cách âm\n\nDịch bài nói:\nTrong tin địa phương, lễ khai trương Trung tâm Nghệ thuật Biểu diễn Stewart vào tối mai đã thu hút sự chú ý rộng rãi. Trung tâm hiện đại này có ba nhà hát khác nhau. Nhà thiết kế đã thắng giải cho các bức tường cách âm của tòa nhà. Chúng có vật liệu cao su hấp thụ âm thanh từ các nhà hát khác và tàu hỏa gần đó. Hơn nữa, trang trí nội thất rất lộng lẫy. Nếu bạn muốn xem ảnh, duyệt các buổi biểu diễn sắp tới và lập kế hoạch thăm quan, hãy truy cập website của nhà hát. Chúng tôi cảnh báo trước—nhiều buổi biểu diễn đã bán hết vé!"
  },
  {
   "number": 91,
   "part": 4,
   "answer": "A",
   "group": "89-91",
   "textEn": "91. What does the speaker emphasize about upcoming events? (A) Many of them are sold out. (B) Some of them will be affected by the weather. (C) Public transportation will be free. (D) Discounts are available for large groups.",
   "transcript": "In local news, the opening of the Stewart Performing Arts Center tomorrow night has attracted widespread attention. This state-of-the-art center holds three different theaters. The designer won an award for the building's insulated walls. They have rubber material that absorbs sound from the other theaters and nearby trains. On top of this, the interior decoration is magnificent. If you'd like to see some photos, browse upcoming shows, and plan your visit, go to the theater's Web site. We warn you, though—many shows are already sold out!",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n91. Người nói nhấn mạnh điều gì về sự kiện sắp tới?\n(A) Nhiều sự kiện đã bán hết\n(B) Một số bị ảnh hưởng bởi thời tiết\n(C) Giao thông công cộng miễn phí\n(D) Có giảm giá cho nhóm lớn\n\nDịch bài nói:\nTrong tin địa phương, lễ khai trương Trung tâm Nghệ thuật Biểu diễn Stewart vào tối mai đã thu hút sự chú ý rộng rãi. Trung tâm hiện đại này có ba nhà hát khác nhau. Nhà thiết kế đã thắng giải cho các bức tường cách âm của tòa nhà. Chúng có vật liệu cao su hấp thụ âm thanh từ các nhà hát khác và tàu hỏa gần đó. Hơn nữa, trang trí nội thất rất lộng lẫy. Nếu bạn muốn xem ảnh, duyệt các buổi biểu diễn sắp tới và lập kế hoạch thăm quan, hãy truy cập website của nhà hát. Chúng tôi cảnh báo trước—nhiều buổi biểu diễn đã bán hết vé!"
  },
  {
   "number": 92,
   "part": 4,
   "answer": "D",
   "group": "92-94",
   "textEn": "92. Who is Mona Alamri? (A) A local official (B) A ship captain (C) A marine scientist (D) An engineer",
   "transcript": "Regular listeners of the Going Electric podcast may be familiar with today's guest because she was on the podcast last year. Dr. Mona Alamri is a leading transportation engineer. In today's episode, she'll be talking about electric ships that can operate with zero emissions. These high-speed ships may completely change the way people and goods are moved along the world's coastlines. But, before I welcome Dr. Alamri, please note there is a change to next month's schedule—most notably, I'll be on vacation for three weeks.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n92. Mona Alamri là ai?\n(A) Quan chức địa phương\n(B) Thuyền trưởng\n(C) Nhà khoa học hải dương\n(D) Kỹ sư\n\nDịch bài nói:\nNhững người nghe thường xuyên của podcast Going Electric có thể quen thuộc với vị khách hôm nay vì cô ấy đã xuất hiện năm ngoái. Tiến sĩ Mona Alamri là kỹ sư giao thông hàng đầu. Trong tập hôm nay, cô ấy sẽ nói về tàu điện có thể hoạt động không phát thải. Những con tàu tốc độ cao này có thể thay đổi hoàn toàn cách di chuyển người và hàng hóa dọc theo bờ biển thế giới. Nhưng trước khi chào đón Tiến sĩ Alamri, lưu ý có thay đổi trong lịch tháng tới—đáng chú ý nhất là tôi sẽ nghỉ phép ba tuần."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "93. What is the focus of today’s podcast episode? (A) Coastal mapping (B) Offshore wind farms (C) Electric ships (D) Bridge construction",
   "transcript": "Regular listeners of the Going Electric podcast may be familiar with today's guest because she was on the podcast last year. Dr. Mona Alamri is a leading transportation engineer. In today's episode, she'll be talking about electric ships that can operate with zero emissions. These high-speed ships may completely change the way people and goods are moved along the world's coastlines. But, before I welcome Dr. Alamri, please note there is a change to next month's schedule—most notably, I'll be on vacation for three weeks.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n93. Chủ đề podcast hôm nay là gì?\n(A) Bản đồ bờ biển\n(B) Tuabin gió ngoài khơi\n(C) Tàu điện\n(D) Xây dựng cầu\n\nDịch bài nói:\nNhững người nghe thường xuyên của podcast Going Electric có thể quen thuộc với vị khách hôm nay vì cô ấy đã xuất hiện năm ngoái. Tiến sĩ Mona Alamri là kỹ sư giao thông hàng đầu. Trong tập hôm nay, cô ấy sẽ nói về tàu điện có thể hoạt động không phát thải. Những con tàu tốc độ cao này có thể thay đổi hoàn toàn cách di chuyển người và hàng hóa dọc theo bờ biển thế giới. Nhưng trước khi chào đón Tiến sĩ Alamri, lưu ý có thay đổi trong lịch tháng tới—đáng chú ý nhất là tôi sẽ nghỉ phép ba tuần."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "94. What does the speaker alert the listeners to? (A) A schedule change (B) A volunteer opportunity (C) An updated Web site (D) A project start date",
   "transcript": "Regular listeners of the Going Electric podcast may be familiar with today's guest because she was on the podcast last year. Dr. Mona Alamri is a leading transportation engineer. In today's episode, she'll be talking about electric ships that can operate with zero emissions. These high-speed ships may completely change the way people and goods are moved along the world's coastlines. But, before I welcome Dr. Alamri, please note there is a change to next month's schedule—most notably, I'll be on vacation for three weeks.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n94. Người nói cảnh báo người nghe điều gì?\n(A) Lịch trình thay đổi\n(B) Cơ hội tình nguyện\n(C) Trang web cập nhật\n(D) Ngày bắt đầu dự án\n\nDịch bài nói:\nNhững người nghe thường xuyên của podcast Going Electric có thể quen thuộc với vị khách hôm nay vì cô ấy đã xuất hiện năm ngoái. Tiến sĩ Mona Alamri là kỹ sư giao thông hàng đầu. Trong tập hôm nay, cô ấy sẽ nói về tàu điện có thể hoạt động không phát thải. Những con tàu tốc độ cao này có thể thay đổi hoàn toàn cách di chuyển người và hàng hóa dọc theo bờ biển thế giới. Nhưng trước khi chào đón Tiến sĩ Alamri, lưu ý có thay đổi trong lịch tháng tới—đáng chú ý nhất là tôi sẽ nghỉ phép ba tuần."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "95. Where are the listeners? (A) At a bicycle race (B) At a marathon (C) At a parade (D) At a festival",
   "transcript": "Good morning, everyone, and welcome to the fifteenth annual Summerhaven Bicycle Race. The profits from this year's race will help our town fix the Grant Park footbridge, which is in serious need of maintenance. Please take a look at the map to familiarize yourselves with the route the cyclists will be taking. Remember, there's a beverage stand located between city hall and the art museum, so you can stay hydrated while you watch the race.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n95. Người nghe đang ở đâu?\n(A) Cuộc đua xe đạp\n(B) Cuộc chạy marathon\n(C) Cuộc diễu hành\n(D) Lễ hội\n\nDịch bài nói:\nChào buổi sáng mọi người, và chào mừng đến với Cuộc đua Xe đạp Summer Haven hàng năm lần thứ mười lăm. Lợi nhuận từ cuộc đua năm nay sẽ giúp thị trấn chúng ta sửa chữa cầu đi bộ Grant Park, đang rất cần bảo dưỡng. Vui lòng xem bản đồ để làm quen với lộ trình mà các tay đua sẽ đi. Nhớ nhé, có quầy đồ uống nằm giữa tòa thị chính và bảo tàng nghệ thuật, để bạn có thể giữ nước trong lúc xem đua."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "96. What will proceed from the event support? (A) Creating an athletic field (B) Renovating a city library (C) Repairing a bridge (D) Building a new playground",
   "transcript": "Good morning, everyone, and welcome to the fifteenth annual Summerhaven Bicycle Race. The profits from this year's race will help our town fix the Grant Park footbridge, which is in serious need of maintenance. Please take a look at the map to familiarize yourselves with the route the cyclists will be taking. Remember, there's a beverage stand located between city hall and the art museum, so you can stay hydrated while you watch the race.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n96. Doanh thu từ sự kiện sẽ hỗ trợ điều gì?\n(A) Sân thể thao\n(B) Cải tạo thư viện thành phố\n(C) Sửa chữa cầu\n(D) Xây sân chơi mới\n\nDịch bài nói:\nChào buổi sáng mọi người, và chào mừng đến với Cuộc đua Xe đạp Summer Haven hàng năm lần thứ mười lăm. Lợi nhuận từ cuộc đua năm nay sẽ giúp thị trấn chúng ta sửa chữa cầu đi bộ Grant Park, đang rất cần bảo dưỡng. Vui lòng xem bản đồ để làm quen với lộ trình mà các tay đua sẽ đi. Nhớ nhé, có quầy đồ uống nằm giữa tòa thị chính và bảo tàng nghệ thuật, để bạn có thể giữ nước trong lúc xem đua."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "B",
   "group": "95-97",
   "textEn": "97. Look at the graphic. On which street does the speaker say the listeners can find a beverage stand? (A) Fifth Street (B) Rose Street (C) Spring Street (D) Dill Street",
   "transcript": "Good morning, everyone, and welcome to the fifteenth annual Summerhaven Bicycle Race. The profits from this year's race will help our town fix the Grant Park footbridge, which is in serious need of maintenance. Please take a look at the map to familiarize yourselves with the route the cyclists will be taking. Remember, there's a beverage stand located between city hall and the art museum, so you can stay hydrated while you watch the race.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n97. Theo hình, người nghe có thể tìm quầy đồ uống ở đường nào?\n(A) Fifth Street\n(B) Rose Street\n(C) Spring Street\n(D) Dill Street\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nChào buổi sáng mọi người, và chào mừng đến với Cuộc đua Xe đạp Summer Haven hàng năm lần thứ mười lăm. Lợi nhuận từ cuộc đua năm nay sẽ giúp thị trấn chúng ta sửa chữa cầu đi bộ Grant Park, đang rất cần bảo dưỡng. Vui lòng xem bản đồ để làm quen với lộ trình mà các tay đua sẽ đi. Nhớ nhé, có quầy đồ uống nằm giữa tòa thị chính và bảo tàng nghệ thuật, để bạn có thể giữ nước trong lúc xem đua."
  },
  {
   "number": 98,
   "part": 4,
   "answer": "D",
   "group": "98-100",
   "textEn": "98. What industry is the mobile app intended for? (A) Entertainment (B) Travel (C) Education (D) Finance",
   "transcript": "In today's meeting, we'll discuss where we are in our software development process for Universal Banking. In-depth user research will help us create a better online banking application. Sarai will start by telling us about her research into Universal Banking's target customers. What features do they need in a banking app, and how comfortable are they with technology? But before Sarai begins her presentation, let me remind you that as summer begins next week, so do summer hours. You'll be able to stop working at 2:00 o'clock on Friday afternoons, so we'll be moving our regular meeting to Friday mornings.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n98. Ứng dụng di động thuộc ngành nào?\n(A) Giải trí\n(B) Du lịch\n(C) Giáo dục\n(D) Tài chính\n\nDịch bài nói:\nTrong cuộc họp hôm nay, chúng ta sẽ thảo luận vị trí hiện tại trong quy trình phát triển phần mềm cho Universal Banking. Nghiên cứu người dùng sâu sẽ giúp chúng ta tạo ứng dụng ngân hàng trực tuyến tốt hơn. Sarai sẽ bắt đầu bằng cách kể về nghiên cứu của cô ấy về khách hàng mục tiêu của Universal Banking. Họ cần tính năng gì trong app ngân hàng, và họ thoải mái với công nghệ đến mức nào? Nhưng trước khi Sarai bắt đầu bài thuyết trình, để tôi nhắc rằng khi hè bắt đầu tuần tới, giờ hè cũng vậy. Bạn sẽ có thể ngừng làm việc lúc 2 giờ chiều thứ Sáu, nên chúng ta sẽ dời cuộc họp định kỳ sang sáng thứ Sáu."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "99. Look at the graphic. Which stage of market research will Sarai talk about? (A) Stage 1 (B) Stage 2 (C) Stage 3 (D) Stage 4",
   "transcript": "In today's meeting, we'll discuss where we are in our software development process for Universal Banking. In-depth user research will help us create a better online banking application. Sarai will start by telling us about her research into Universal Banking's target customers. What features do they need in a banking app, and how comfortable are they with technology? But before Sarai begins her presentation, let me remind you that as summer begins next week, so do summer hours. You'll be able to stop working at 2:00 o'clock on Friday afternoons, so we'll be moving our regular meeting to Friday mornings.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n99. Theo bảng, Sarai sẽ nói về giai đoạn nào?\n(A) Giai đoạn 1\n(B) Giai đoạn 2\n(C) Giai đoạn 3\n(D) Giai đoạn 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nTrong cuộc họp hôm nay, chúng ta sẽ thảo luận vị trí hiện tại trong quy trình phát triển phần mềm cho Universal Banking. Nghiên cứu người dùng sâu sẽ giúp chúng ta tạo ứng dụng ngân hàng trực tuyến tốt hơn. Sarai sẽ bắt đầu bằng cách kể về nghiên cứu của cô ấy về khách hàng mục tiêu của Universal Banking. Họ cần tính năng gì trong app ngân hàng, và họ thoải mái với công nghệ đến mức nào? Nhưng trước khi Sarai bắt đầu bài thuyết trình, để tôi nhắc rằng khi hè bắt đầu tuần tới, giờ hè cũng vậy. Bạn sẽ có thể ngừng làm việc lúc 2 giờ chiều thứ Sáu, nên chúng ta sẽ dời cuộc họp định kỳ sang sáng thứ Sáu."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "100. What will begin next Friday? (A) A seasonal work schedule (B) A business conference (C) A construction project (D) A contract negotiation",
   "transcript": "In today's meeting, we'll discuss where we are in our software development process for Universal Banking. In-depth user research will help us create a better online banking application. Sarai will start by telling us about her research into Universal Banking's target customers. What features do they need in a banking app, and how comfortable are they with technology? But before Sarai begins her presentation, let me remind you that as summer begins next week, so do summer hours. You'll be able to stop working at 2:00 o'clock on Friday afternoons, so we'll be moving our regular meeting to Friday mornings.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n100. Điều gì sẽ bắt đầu vào thứ Sáu tới?\n(A) Lịch làm việc theo mùa\n(B) Hội nghị kinh doanh\n(C) Dự án xây dựng\n(D) Đàm phán hợp đồng\n\nDịch bài nói:\nTrong cuộc họp hôm nay, chúng ta sẽ thảo luận vị trí hiện tại trong quy trình phát triển phần mềm cho Universal Banking. Nghiên cứu người dùng sâu sẽ giúp chúng ta tạo ứng dụng ngân hàng trực tuyến tốt hơn. Sarai sẽ bắt đầu bằng cách kể về nghiên cứu của cô ấy về khách hàng mục tiêu của Universal Banking. Họ cần tính năng gì trong app ngân hàng, và họ thoải mái với công nghệ đến mức nào? Nhưng trước khi Sarai bắt đầu bài thuyết trình, để tôi nhắc rằng khi hè bắt đầu tuần tới, giờ hè cũng vậy. Bạn sẽ có thể ngừng làm việc lúc 2 giờ chiều thứ Sáu, nên chúng ta sẽ dời cuộc họp định kỳ sang sáng thứ Sáu."
  }
 ],
 "8": [
  {
   "number": 1,
   "part": 1,
   "answer": "D",
   "textEn": "(A) A wooden post is being painted (B) Flowerpots have been placed under some chairs (C) A rug has spread out on the ground (D) Some furniture has been placed on a covered patio",
   "transcript": "(A) A wooden post is being painted\n(B) Flowerpots have been placed under some chairs\n(C) A rug has spread out on the ground\n(D) Some furniture has been placed on a covered patio",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Một cọc gỗ đang được sơn\n(B) Một số chậu hoa đã được đặt dưới vài chiếc ghế\n(C) Một tấm thảm được trải trên mặt đất\n(D) Một số đồ nội thất được đặt trên hiên có mái che"
  },
  {
   "number": 2,
   "part": 1,
   "answer": "B",
   "textEn": "(A) Some people are exiting a parked vehicle (B) A woman is walking past a pedestrian crosswalk (C) Some cars are crossing an intersection (D) A woman is taping a flyer to a light pole",
   "transcript": "(A) Some people are exiting a parked vehicle\n(B) A woman is walking past a pedestrian crosswalk\n(C) Some cars are crossing an intersection\n(D) A woman is taping a flyer to a light pole",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\n(A) Một vài người đang rời khỏi một chiếc xe đang đỗ\n(B) Một người phụ nữ đang đi ngang qua vạch sang đường dành cho người đi bộ\n(C) Một số chiếc xe đang băng qua ngã tư\n(D) Một người phụ nữ đang dán một tờ rơi lên cột đèn"
  },
  {
   "number": 3,
   "part": 1,
   "answer": "A",
   "textEn": "(A) A man is standing behind a counter (B) A man is setting up a display of items (C) Some floor tiles are being repaired (D) Customers are lined up at a cash register",
   "transcript": "(A) A man is standing behind a counter\n(B) A man is setting up a display of items\n(C) Some floor tiles are being repaired\n(D) Customers are lined up at a cash register",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Một người đàn ông đang đứng phía sau quầy\n(B) Một người đàn ông đang sắp xếp một khu trưng bày các món đồ\n(C) Một số viên gạch lát sàn đang được sửa chữa\n(D) Khách hàng đang xếp hàng tại quầy thu ngân"
  },
  {
   "number": 4,
   "part": 1,
   "answer": "D",
   "textEn": "(A) Some desks are pushed up against a window (B) A light fixture is hanging from the ceiling (C) Some armchairs have been stacked in a corner (D) A fence is visible through the window",
   "transcript": "(A) Some desks are pushed up against a window\n(B) A light fixture is hanging from the ceiling\n(C) Some armchairs have been stacked in a corner\n(D) A fence is visible through the window",
   "explanationVi": "Đáp án đúng: D\n\nDịch nghĩa:\n(A) Một số bàn làm việc được đẩy sát vào cửa sổ\n(B) Một bộ đèn đang treo trên trần nhà\n(C) Một số ghế bành được xếp chồng ở một góc\n(D) Một hàng rào có thể nhìn thấy qua cửa sổ"
  },
  {
   "number": 5,
   "part": 1,
   "answer": "C",
   "textEn": "(A) The women are assembling a shelving unit (B) One of the women is packing some store decorations (C) One of the women is holding up a book (D) The women are unloading a shipment of books",
   "transcript": "(A) The women are assembling a shelving unit\n(B) One of the women is packing some store decorations\n(C) One of the women is holding up a book\n(D) The women are unloading a shipment of books",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\n(A) Những người phụ nữ đang lắp ráp một kệ trưng bày\n(B) Một trong những người phụ nữ đang đóng gói một số đồ trang trí của cửa hàng\n(C) Một trong những người phụ nữ đang cầm một quyển sách\n(D) Những người phụ nữ đang dỡ một lô sách"
  },
  {
   "number": 6,
   "part": 1,
   "answer": "A",
   "textEn": "(A) They’re climbing some stairs (B) They’re sitting in a park (C) They’re raking some leaves (D) They’re planting some trees",
   "transcript": "(A) They’re climbing some stairs\n(B) They’re sitting in a park\n(C) They’re raking some leaves\n(D) They’re planting some trees",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\n(A) Họ đang leo cầu thang\n(B) Họ đang ngồi trong công viên\n(C) Họ đang cào lá cây\n(D) Họ đang trồng một số cây"
  },
  {
   "number": 7,
   "part": 2,
   "answer": "C",
   "textEn": "Can I pick up my prescription glasses here? (A) It’s a new magazine subscription. (B) The window glass needs to be repaired. (C) Yes, they’ll be ready soon.",
   "transcript": "Can I pick up my prescription glasses here?\n(A) It’s a new magazine subscription.\n(B) The window glass needs to be repaired.\n(C) Yes, they’ll be ready soon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTôi có thể đến đây nhận kính thuốc của mình không?\n(A) Đó là một đăng ký tạp chí mới.\n(B) Kính cửa sổ cần được sửa chữa.\n(C) Vâng, chúng sẽ sẵn sàng sớm thôi."
  },
  {
   "number": 8,
   "part": 2,
   "answer": "B",
   "textEn": "Have you signed up for delivery updates? (A) I’m sorry—you can’t park here. (B) Yes, I get alerts on my phone. (C) Where’s the security desk?",
   "transcript": "Have you signed up for delivery updates?\n(A) I’m sorry—you can’t park here.\n(B) Yes, I get alerts on my phone.\n(C) Where’s the security desk?",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBạn đã đăng ký nhận cập nhật về việc giao hàng chưa?\n(A) Xin lỗi — bạn không được đỗ xe ở đây.\n(B) Rồi, tôi nhận thông báo trên điện thoại.\n(C) Bàn an ninh ở đâu?"
  },
  {
   "number": 9,
   "part": 2,
   "answer": "C",
   "textEn": "Where are the notes from the client meeting? (A) No, I already have plans. (B) Yes, eight o’clock is fine. (C) I saved them on my laptop.",
   "transcript": "Where are the notes from the client meeting?\n(A) No, I already have plans.\n(B) Yes, eight o’clock is fine.\n(C) I saved them on my laptop.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nGhi chú từ cuộc họp với khách hàng ở đâu?\n(A) Không, tôi đã có kế hoạch rồi.\n(B) Vâng, tám giờ là được.\n(C) Tôi đã lưu chúng trong máy tính xách tay."
  },
  {
   "number": 10,
   "part": 2,
   "answer": "A",
   "textEn": "Does Dr. Cao schedule appointments in the morning or in the afternoon? (A) She leaves at noon. (B) I agree, that’s a good point. (C) Flight number 223.",
   "transcript": "Does Dr. Cao schedule appointments in the morning or in the afternoon?\n(A) She leaves at noon.\n(B) I agree, that’s a good point.\n(C) Flight number 223.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBác sĩ Cao sắp xếp lịch hẹn vào buổi sáng hay buổi chiều?\n(A) Cô ấy rời đi lúc trưa.\n(B) Tôi đồng ý, đó là một ý hay.\n(C) Chuyến bay số 223."
  },
  {
   "number": 11,
   "part": 2,
   "answer": "C",
   "textEn": "Can you bring these agendas to the staff meeting? (A) The new travel agency. (B) I’d prefer blue paint for the walls. (C) Sure, I’ll take them with me.",
   "transcript": "Can you bring these agendas to the staff meeting?\n(A) The new travel agency.\n(B) I’d prefer blue paint for the walls.\n(C) Sure, I’ll take them with me.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn có thể mang những bản chương trình nghị sự này đến cuộc họp nhân viên không?\n(A) Công ty du lịch mới.\n(B) Tôi thích sơn tường màu xanh dương hơn.\n(C) Được chứ, tôi sẽ mang theo."
  },
  {
   "number": 12,
   "part": 2,
   "answer": "B",
   "textEn": "It'll be nice to get a bonus this month. (A) My office wasn’t cleaned last night. (B) The money will be deposited tomorrow. (C) The weather has been very nice.",
   "transcript": "It'll be nice to get a bonus this month.\n(A) My office wasn’t cleaned last night.\n(B) The money will be deposited tomorrow.\n(C) The weather has been very nice.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nSẽ thật tuyệt nếu được nhận tiền thưởng trong tháng này.\n(A) Văn phòng của tôi tối qua chưa được dọn dẹp.\n(B) Tiền sẽ được chuyển vào ngày mai.\n(C) Thời tiết dạo này rất đẹp."
  },
  {
   "number": 13,
   "part": 2,
   "answer": "C",
   "textEn": "When is the city council going to vote on the new housing development? (A) Yes, I’m going. (B) It’s near the library. (C) At the next meeting.",
   "transcript": "When is the city council going to vote on the new housing development?\n(A) Yes, I’m going.\n(B) It’s near the library.\n(C) At the next meeting.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nKhi nào hội đồng thành phố sẽ bỏ phiếu về dự án nhà ở mới?\n(A) Vâng, tôi sẽ đi.\n(B) Nó ở gần thư viện.\n(C) Tại cuộc họp tiếp theo."
  },
  {
   "number": 14,
   "part": 2,
   "answer": "A",
   "textEn": "Why can’t we keep the factory open for an overnight shift? (A) Management might be changing that policy. (B) No, production costs haven’t increased. (C) Only a thirty-minute commute.",
   "transcript": "Why can’t we keep the factory open for an overnight shift?\n(A) Management might be changing that policy.\n(B) No, production costs haven’t increased.\n(C) Only a thirty-minute commute.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nTại sao chúng ta không thể để nhà máy hoạt động ca đêm?\n(A) Ban quản lý có thể đang thay đổi chính sách đó.\n(B) Không, chi phí sản xuất không tăng.\n(C) Chỉ mất ba mươi phút đi lại thôi."
  },
  {
   "number": 15,
   "part": 2,
   "answer": "A",
   "textEn": "I put out more of our informational brochures in the waiting room. (A) Thanks for doing that. (B) No, he’s still waiting. (C) About eight pages, I think.",
   "transcript": "I put out more of our informational brochures in the waiting room.\n(A) Thanks for doing that.\n(B) No, he’s still waiting.\n(C) About eight pages, I think.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nTôi đã đặt thêm các tờ brochure thông tin của công ty trong phòng chờ.\n(A) Cảm ơn vì đã làm việc đó.\n(B) Không, anh ấy vẫn đang chờ.\n(C) Khoảng tám trang thì phải."
  },
  {
   "number": 16,
   "part": 2,
   "answer": "B",
   "textEn": "What’s the starting pay rate for a software engineer at your firm? (A) Shifts are from nine to five. (B) Around 50 dollars an hour. (C) Our customer satisfaction rates are high.",
   "transcript": "What’s the starting pay rate for a software engineer at your firm?\n(A) Shifts are from nine to five.\n(B) Around 50 dollars an hour.\n(C) Our customer satisfaction rates are high.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nMức lương khởi điểm cho kỹ sư phần mềm ở công ty bạn là bao nhiêu?\n(A) Ca làm việc từ chín giờ đến năm giờ.\n(B) Khoảng 50 đô la một giờ.\n(C) Tỷ lệ hài lòng của khách hàng chúng tôi rất cao."
  },
  {
   "number": 17,
   "part": 2,
   "answer": "A",
   "textEn": "That flight is scheduled to take off at seven P.M., right? (A) Stormy weather is predicted. (B) A seat on the aisle. (C) In the lower right corner.",
   "transcript": "That flight is scheduled to take off at seven P.M., right?\n(A) Stormy weather is predicted.\n(B) A seat on the aisle.\n(C) In the lower right corner.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nChuyến bay đó dự kiến cất cánh lúc 7 giờ tối, đúng không?\n(A) Dự báo sẽ có thời tiết xấu.\n(B) Một chỗ ngồi cạnh lối đi.\n(C) Ở góc dưới bên phải."
  },
  {
   "number": 18,
   "part": 2,
   "answer": "A",
   "textEn": "Should we take the client to Asako’s Steakhouse? (A) He’s a vegetarian. (B) I don’t have any extra copies. (C) It was a very interesting report.",
   "transcript": "Should we take the client to Asako’s Steakhouse?\n(A) He’s a vegetarian.\n(B) I don’t have any extra copies.\n(C) It was a very interesting report.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nChúng ta có nên đưa khách hàng đến nhà hàng bít tết Asako không?\n(A) Anh ấy là người ăn chay.\n(B) Tôi không có bản sao nào thêm.\n(C) Đó là một báo cáo rất thú vị."
  },
  {
   "number": 19,
   "part": 2,
   "answer": "C",
   "textEn": "How often do you travel abroad? (A) An overseas assignment. (B) I love Italian food. (C) Twice a year.",
   "transcript": "How often do you travel abroad?\n(A) An overseas assignment.\n(B) I love Italian food.\n(C) Twice a year.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn đi nước ngoài bao lâu một lần?\n(A) Một nhiệm vụ ở nước ngoài.\n(B) Tôi thích đồ ăn Ý.\n(C) Hai lần một năm."
  },
  {
   "number": 20,
   "part": 2,
   "answer": "B",
   "textEn": "The product launch was a success, wasn’t it? (A) No, I haven’t eaten yet. (B) Yes, we already have a lot of orders. (C) He’ll meet you next week.",
   "transcript": "The product launch was a success, wasn’t it?\n(A) No, I haven’t eaten yet.\n(B) Yes, we already have a lot of orders.\n(C) He’ll meet you next week.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nBuổi ra mắt sản phẩm đã thành công, phải không?\n(A) Không, tôi chưa ăn gì cả.\n(B) Đúng vậy, chúng tôi đã có rất nhiều đơn hàng.\n(C) Anh ấy sẽ gặp bạn vào tuần sau."
  },
  {
   "number": 21,
   "part": 2,
   "answer": "A",
   "textEn": "How many books are in this mystery series? (A) There are seven. (B) You can book an appointment online. (C) A serious topic.",
   "transcript": "How many books are in this mystery series?\n(A) There are seven.\n(B) You can book an appointment online.\n(C) A serious topic.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nCó bao nhiêu cuốn sách trong loạt truyện trinh thám này?\n(A) Có bảy cuốn.\n(B) Bạn có thể đặt lịch hẹn trực tuyến.\n(C) Một chủ đề nghiêm túc."
  },
  {
   "number": 22,
   "part": 2,
   "answer": "A",
   "textEn": "Can we finalize the budget today? (A) We haven’t received the report from marketing (B) No, I don’t need anything from the store (C) A representative from the bank",
   "transcript": "Can we finalize the budget today?\n(A) We haven’t received the report from marketing\n(B) No, I don’t need anything from the store\n(C) A representative from the bank",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nChúng ta có thể chốt ngân sách hôm nay không?\n(A) Chúng tôi vẫn chưa nhận được báo cáo từ bộ phận tiếp thị.\n(B) Không, tôi không cần mua gì từ cửa hàng.\n(C) Một đại diện từ ngân hàng."
  },
  {
   "number": 23,
   "part": 2,
   "answer": "A",
   "textEn": "Who should I talk to about moving some bookshelves? (A) Mr. Kim can help you. (B) Yes, I moved to Chicago a few years ago. (C) To the new office.",
   "transcript": "Who should I talk to about moving some bookshelves?\n(A) Mr. Kim can help you.\n(B) Yes, I moved to Chicago a few years ago.\n(C) To the new office.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nTôi nên nói chuyện với ai về việc di chuyển vài kệ sách?\n(A) Ông Kim có thể giúp bạn.\n(B) Vâng, tôi đã chuyển đến Chicago vài năm trước.\n(C) Đến văn phòng mới."
  },
  {
   "number": 24,
   "part": 2,
   "answer": "C",
   "textEn": "Wouldn’t you rather lead the workshop next week? (A) Twenty dollars per person. (B) That meeting was productive. (C) Abidemi is a better teacher.",
   "transcript": "Wouldn’t you rather lead the workshop next week?\n(A) Twenty dollars per person.\n(B) That meeting was productive.\n(C) Abidemi is a better teacher.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBạn không muốn dẫn dắt buổi hội thảo vào tuần tới sao?\n(A) Hai mươi đô la mỗi người.\n(B) Cuộc họp đó rất hiệu quả.\n(C) Abidemi là một giáo viên giỏi hơn."
  },
  {
   "number": 25,
   "part": 2,
   "answer": "B",
   "textEn": "When does the bookstore open? (A) A new travel guide. (B) At eight o’clock. (C) On the shelf.",
   "transcript": "When does the bookstore open?\n(A) A new travel guide.\n(B) At eight o’clock.\n(C) On the shelf.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nHiệu sách mở cửa khi nào?\n(A) Một cuốn cẩm nang du lịch mới.\n(B) Lúc tám giờ.\n(C) Trên kệ."
  },
  {
   "number": 26,
   "part": 2,
   "answer": "A",
   "textEn": "Can’t you help me install this furniture? (A) Sure, if you can wait a minute. (B) It’s not very comfortable. (C) That’s a good sofa.",
   "transcript": "Can’t you help me install this furniture?\n(A) Sure, if you can wait a minute.\n(B) It’s not very comfortable.\n(C) That’s a good sofa.",
   "explanationVi": "Đáp án đúng: A\n\nDịch nghĩa:\nBạn không thể giúp tôi lắp đặt bộ nội thất này sao?\n(A) Được thôi, nếu bạn có thể đợi một lát.\n(B) Nó không được thoải mái lắm.\n(C) Đó là một chiếc sofa đẹp."
  },
  {
   "number": 27,
   "part": 2,
   "answer": "B",
   "textEn": "Where can I find the eating utensils? (A) The meal was delicious. (B) In the drawer next to the sink. (C) That’s very kind.",
   "transcript": "Where can I find the eating utensils?\n(A) The meal was delicious.\n(B) In the drawer next to the sink.\n(C) That’s very kind.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi có thể tìm dụng cụ ăn uống ở đâu?\n(A) Bữa ăn rất ngon.\n(B) Trong ngăn kéo bên cạnh bồn rửa.\n(C) Bạn thật tốt bụng."
  },
  {
   "number": 28,
   "part": 2,
   "answer": "B",
   "textEn": "What can I do for you, ma’am? (A) Tomorrow would be fine. (B) My key card doesn’t work. (C) Thanks, I will.",
   "transcript": "What can I do for you, ma’am?\n(A) Tomorrow would be fine.\n(B) My key card doesn’t work.\n(C) Thanks, I will.",
   "explanationVi": "Đáp án đúng: B\n\nDịch nghĩa:\nTôi có thể giúp gì cho bà, thưa bà?\n(A) Ngày mai thì được.\n(B) Thẻ ra vào của tôi không hoạt động.\n(C) Cảm ơn, tôi sẽ làm vậy."
  },
  {
   "number": 29,
   "part": 2,
   "answer": "C",
   "textEn": "Why is the conference in London this year? (A) Yes, they’re coming too. (B) Just last week. (C) Because it’s convenient to travel there.",
   "transcript": "Why is the conference in London this year?\n(A) Yes, they’re coming too.\n(B) Just last week.\n(C) Because it’s convenient to travel there.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nTại sao hội nghị năm nay lại tổ chức ở London?\n(A) Vâng, họ cũng sẽ đến.\n(B) Chỉ mới tuần trước thôi.\n(C) Vì đi lại đến đó rất thuận tiện."
  },
  {
   "number": 30,
   "part": 2,
   "answer": "C",
   "textEn": "Dr. Tong’s arriving at the laboratory tomorrow. (A) No, an extra microscope. (B) Fifty dollars a day. (C) I saw him this morning.",
   "transcript": "Dr. Tong’s arriving at the laboratory tomorrow.\n(A) No, an extra microscope.\n(B) Fifty dollars a day.\n(C) I saw him this morning.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nBác sĩ Tong sẽ đến phòng thí nghiệm vào ngày mai.\n(A) Không, thêm một kính hiển vi.\n(B) Năm mươi đô la một ngày.\n(C) Tôi đã gặp ông ấy sáng nay."
  },
  {
   "number": 31,
   "part": 2,
   "answer": "C",
   "textEn": "The restaurant is finally getting a new stove. (A) The recipe requires a saucepan. (B) Can I have a salad for lunch? (C) I hope it arrives soon.",
   "transcript": "The restaurant is finally getting a new stove.\n(A) The recipe requires a saucepan.\n(B) Can I have a salad for lunch?\n(C) I hope it arrives soon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch nghĩa:\nNhà hàng cuối cùng cũng sắp có một chiếc bếp mới.\n(A) Công thức nấu ăn cần một cái nồi.\n(B) Tôi có thể gọi một phần salad cho bữa trưa không?\n(C) Tôi hy vọng nó sẽ sớm được giao đến."
  },
  {
   "number": 32,
   "part": 3,
   "answer": "A",
   "group": "32-34",
   "textEn": "32. Who most likely are the speakers? (A) Electricians (B) Real estate agents (C) House painters (D) Decorators",
   "transcript": "W: Luca, after we finishes rewiring the electricity in this room, the client asked if we could also fix the ceiling light in the kitchen. It flickers off and on sometimes.\nM: Hmm. I know which light you're talking about, and that fixture's really old. It'd be better to replace it.\nW: I agree—it wouldn't be worth repairing. I have a catalog of fixtures in my truck. Let me go get it so we can show the client.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n32. Who most likely are the speakers? Hai người nói chuyện này có khả năng nhất là ai?\n(A) Thợ điện\n(B) Nhân viên bất động sản\n(C) Thợ sơn nhà\n(D) Thợ trang trí nội thất\n\nDịch hội thoại:\nNữ: Luca, sau khi chúng ta hoàn thành việc nối lại điện trong phòng này, khách hàng hỏi liệu chúng ta có thể sửa đèn trần trong bếp không. Nó thỉnh thoảng chớp tắt.\nNam: Hmm. Tôi biết đèn nào bạn đang nói, và thiết bị đó thực sự cũ rồi. Tốt hơn nên thay thế nó.\nNữ: Tôi đồng ý- sửa chữa thì không đáng. Tôi có catalog thiết bị trong xe tải. Để tôi đi lấy để chúng ta có thể cho khách hàng xem."
  },
  {
   "number": 33,
   "part": 3,
   "answer": "B",
   "group": "32-34",
   "textEn": "33. What do the speakers agree to do? (A) Come back on another day (B) Replace an item (C) Apply a discount (D) Try a new technique",
   "transcript": "W: Luca, after we finishes rewiring the electricity in this room, the client asked if we could also fix the ceiling light in the kitchen. It flickers off and on sometimes.\nM: Hmm. I know which light you're talking about, and that fixture's really old. It'd be better to replace it.\nW: I agree—it wouldn't be worth repairing. I have a catalog of fixtures in my truck. Let me go get it so we can show the client.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n33. What do the speakers agree to do? Hai người đồng ý sẽ làm gì?\n(A) Quay lại vào một ngày khác\n(B) Thay một món đồ\n(C) Giảm giá\n(D) Thử một kỹ thuật mới\n\nDịch hội thoại:\nNữ: Luca, sau khi chúng ta hoàn thành việc nối lại điện trong phòng này, khách hàng hỏi liệu chúng ta có thể sửa đèn trần trong bếp không. Nó thỉnh thoảng chớp tắt.\nNam: Hmm. Tôi biết đèn nào bạn đang nói, và thiết bị đó thực sự cũ rồi. Tốt hơn nên thay thế nó.\nNữ: Tôi đồng ý- sửa chữa thì không đáng. Tôi có catalog thiết bị trong xe tải. Để tôi đi lấy để chúng ta có thể cho khách hàng xem."
  },
  {
   "number": 34,
   "part": 3,
   "answer": "A",
   "group": "32-34",
   "textEn": "34. What will the woman do next? (A) Go to her truck (B) Call her manager (C) Calculate a bill (D) Revise a schedule",
   "transcript": "W: Luca, after we finishes rewiring the electricity in this room, the client asked if we could also fix the ceiling light in the kitchen. It flickers off and on sometimes.\nM: Hmm. I know which light you're talking about, and that fixture's really old. It'd be better to replace it.\nW: I agree—it wouldn't be worth repairing. I have a catalog of fixtures in my truck. Let me go get it so we can show the client.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n34. What will the woman do next? Người phụ nữ sẽ làm gì tiếp theo?\n(A) Đi ra xe tải\n(B) Gọi cho quản lý của cô ấy\n(C) Tính hóa đơn\n(D) Điều chỉnh lại lịch trình\n\nDịch hội thoại:\nNữ: Luca, sau khi chúng ta hoàn thành việc nối lại điện trong phòng này, khách hàng hỏi liệu chúng ta có thể sửa đèn trần trong bếp không. Nó thỉnh thoảng chớp tắt.\nNam: Hmm. Tôi biết đèn nào bạn đang nói, và thiết bị đó thực sự cũ rồi. Tốt hơn nên thay thế nó.\nNữ: Tôi đồng ý- sửa chữa thì không đáng. Tôi có catalog thiết bị trong xe tải. Để tôi đi lấy để chúng ta có thể cho khách hàng xem."
  },
  {
   "number": 35,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "35. Where do the speakers work? (A) At a laboratory (B) At a cafeteria (C) At a grocery store (D) At a hotel",
   "transcript": "M: Hey, Silvia. Did you leave the refrigerator door in the laboratory open this morning?\nW: No, I just arrived at the lab. I haven't opened the refrigerator yet. Why?\nM: Well, the temperature is off by a few degrees. We just purchased that refrigerator last month, so it should be in perfect working order.\nW: Oh, I see. I'll be working late tonight. Would you like me to check the temperature every few hours?\nM: That's OK. I can monitor it from home with my smartphone. Thanks, anyway.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n35. Where do the speakers work? Hai người đang làm việc ở đâu?\n(A) Trong phòng thí nghiệm\n(B) Trong căng tin\n(C) Ở siêu thị\n(D) Ở khách sạn\n\nDịch hội thoại:\nNam: Này Silvia. Bạn có để cửa tủ lạnh trong phòng thí nghiệm mở sáng nay không?\nNữ: Không, tôi vừa đến lab. Tôi chưa mở tủ lạnh. Sao vậy?\nNam: Ừm, nhiệt độ lệch vài độ. Chúng ta vừa mua tủ lạnh đó tháng trước, nên nó hẳn phải hoạt động bình thường.\nNữ: Ồ, tôi hiểu. Tôi sẽ làm việc muộn tối nay. Bạn có muốn tôi kiểm tra nhiệt độ mỗi vài giờ không?\nNam: Không sao. Tôi có thể giám sát từ nhà bằng smartphone. Dù sao cũng cảm ơn cô."
  },
  {
   "number": 36,
   "part": 3,
   "answer": "D",
   "group": "35-37",
   "textEn": "36. What problem does the man mention? (A) Some data are incomplete (B) A deadline was missed (C) Funding may be insufficient (D) Equipment might be faulty",
   "transcript": "M: Hey, Silvia. Did you leave the refrigerator door in the laboratory open this morning?\nW: No, I just arrived at the lab. I haven't opened the refrigerator yet. Why?\nM: Well, the temperature is off by a few degrees. We just purchased that refrigerator last month, so it should be in perfect working order.\nW: Oh, I see. I'll be working late tonight. Would you like me to check the temperature every few hours?\nM: That's OK. I can monitor it from home with my smartphone. Thanks, anyway.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n36. What problem does the man mention? Người đàn ông đề cập đến vấn đề gì?\n(A) Một số dữ liệu chưa hoàn chỉnh\n(B) Một hạn chót đã bị lỡ\n(C) Kinh phí có thể không đủ\n(D) Thiết bị có thể bị lỗi\n\nDịch hội thoại:\nNam: Này Silvia. Bạn có để cửa tủ lạnh trong phòng thí nghiệm mở sáng nay không?\nNữ: Không, tôi vừa đến lab. Tôi chưa mở tủ lạnh. Sao vậy?\nNam: Ừm, nhiệt độ lệch vài độ. Chúng ta vừa mua tủ lạnh đó tháng trước, nên nó hẳn phải hoạt động bình thường.\nNữ: Ồ, tôi hiểu. Tôi sẽ làm việc muộn tối nay. Bạn có muốn tôi kiểm tra nhiệt độ mỗi vài giờ không?\nNam: Không sao. Tôi có thể giám sát từ nhà bằng smartphone. Dù sao cũng cảm ơn cô."
  },
  {
   "number": 37,
   "part": 3,
   "answer": "A",
   "group": "35-37",
   "textEn": "37. What does the man say he will do? (A) Monitor a situation (B) Place an order (C) Make a phone call (D) Compile test results",
   "transcript": "M: Hey, Silvia. Did you leave the refrigerator door in the laboratory open this morning?\nW: No, I just arrived at the lab. I haven't opened the refrigerator yet. Why?\nM: Well, the temperature is off by a few degrees. We just purchased that refrigerator last month, so it should be in perfect working order.\nW: Oh, I see. I'll be working late tonight. Would you like me to check the temperature every few hours?\nM: That's OK. I can monitor it from home with my smartphone. Thanks, anyway.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n37. What does the man say he will do? Người đàn ông nói anh ấy sẽ làm gì?\n(A) Theo dõi tình hình\n(B) Đặt hàng\n(C) Gọi điện thoại\n(D) Tổng hợp kết quả kiểm tra\n\nDịch hội thoại:\nNam: Này Silvia. Bạn có để cửa tủ lạnh trong phòng thí nghiệm mở sáng nay không?\nNữ: Không, tôi vừa đến lab. Tôi chưa mở tủ lạnh. Sao vậy?\nNam: Ừm, nhiệt độ lệch vài độ. Chúng ta vừa mua tủ lạnh đó tháng trước, nên nó hẳn phải hoạt động bình thường.\nNữ: Ồ, tôi hiểu. Tôi sẽ làm việc muộn tối nay. Bạn có muốn tôi kiểm tra nhiệt độ mỗi vài giờ không?\nNam: Không sao. Tôi có thể giám sát từ nhà bằng smartphone. Dù sao cũng cảm ơn cô."
  },
  {
   "number": 38,
   "part": 3,
   "answer": "B",
   "group": "38-40",
   "textEn": "38. What are the speakers mainly discussing? (A) Starting a book club (B) Digitizing some books (C) Partnering with another business (D) Opening a new library location",
   "transcript": "W: Hiroki, good news! We've received the grant money we requested to digitize our rare book collection.\nM: Excellent! I'm glad we'll finally be able to expand access to our collections. Right now, only local residents can see those books.\nW: True. You know, I'm not sure how the digitization process works.\nM: Well, Archester Library is running a workshop next month on digitization practices. I think we should attend.\nW: Great idea. Let's register right away.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n38. Hai người chủ yếu đang thảo luận điều gì?\n(A) Thành lập một câu lạc bộ sách\n(B) Số hóa một số cuốn sách\n(C) Hợp tác với một doanh nghiệp khác\n(D) Mở một chi nhánh thư viện mới\n\nDịch hội thoại:\nNữ: Hiroki, tin tốt! Chúng ta đã nhận được khoản trợ cấp chúng ta yêu cầu để số hóa bộ sưu tập sách hiếm.\nNam: Tuyệt vời! Tôi vui vì cuối cùng chúng ta có thể mở rộng cách truy cập vào bộ sưu tập này. Hiện tại, chỉ cư dân địa phương mới xem được những sách đó.\nNữ: Đúng vậy. Bạn biết đấy, tôi không chắc quy trình số hóa hoạt động thế nào.\nNam: Ừm, Thư viện Archester đang tổ chức hội thảo tháng tới về thực hành số hóa. Tôi nghĩ chúng ta nên tham dự.\nNữ: Ý tưởng hay. Hãy đăng ký ngay."
  },
  {
   "number": 39,
   "part": 3,
   "answer": "D",
   "group": "38-40",
   "textEn": "39. What does the man like about a project? (A) Costs will be reduced (B) A process will be faster (C) An organization will receive publicity (D) Access to some materials will be expanded",
   "transcript": "W: Hiroki, good news! We've received the grant money we requested to digitize our rare book collection.\nM: Excellent! I'm glad we'll finally be able to expand access to our collections. Right now, only local residents can see those books.\nW: True. You know, I'm not sure how the digitization process works.\nM: Well, Archester Library is running a workshop next month on digitization practices. I think we should attend.\nW: Great idea. Let's register right away.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n39. Người đàn ông thích điểm nào trong dự án?\n(A) Chi phí sẽ được giảm\n(B) Quy trình sẽ nhanh hơn\n(C) Tổ chức sẽ được quảng bá\n(D) Quyền truy cập vào một số tài liệu sẽ được mở rộng\n\nDịch hội thoại:\nNữ: Hiroki, tin tốt! Chúng ta đã nhận được khoản trợ cấp chúng ta yêu cầu để số hóa bộ sưu tập sách hiếm.\nNam: Tuyệt vời! Tôi vui vì cuối cùng chúng ta có thể mở rộng cách truy cập vào bộ sưu tập này. Hiện tại, chỉ cư dân địa phương mới xem được những sách đó.\nNữ: Đúng vậy. Bạn biết đấy, tôi không chắc quy trình số hóa hoạt động thế nào.\nNam: Ừm, Thư viện Archester đang tổ chức hội thảo tháng tới về thực hành số hóa. Tôi nghĩ chúng ta nên tham dự.\nNữ: Ý tưởng hay. Hãy đăng ký ngay."
  },
  {
   "number": 40,
   "part": 3,
   "answer": "A",
   "group": "38-40",
   "textEn": "40. What does the man suggest doing? (A) Attending a workshop (B) Hiring additional employees (C) Investing in new equipment (D) Changing a program design",
   "transcript": "W: Hiroki, good news! We've received the grant money we requested to digitize our rare book collection.\nM: Excellent! I'm glad we'll finally be able to expand access to our collections. Right now, only local residents can see those books.\nW: True. You know, I'm not sure how the digitization process works.\nM: Well, Archester Library is running a workshop next month on digitization practices. I think we should attend.\nW: Great idea. Let's register right away.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n40. Người đàn ông gợi ý làm gì?\n(A) Tham dự một hội thảo\n(B) Thuê thêm nhân viên\n(C) Đầu tư vào thiết bị mới\n(D) Thay đổi thiết kế chương trình\n\nDịch hội thoại:\nNữ: Hiroki, tin tốt! Chúng ta đã nhận được khoản trợ cấp chúng ta yêu cầu để số hóa bộ sưu tập sách hiếm.\nNam: Tuyệt vời! Tôi vui vì cuối cùng chúng ta có thể mở rộng cách truy cập vào bộ sưu tập này. Hiện tại, chỉ cư dân địa phương mới xem được những sách đó.\nNữ: Đúng vậy. Bạn biết đấy, tôi không chắc quy trình số hóa hoạt động thế nào.\nNam: Ừm, Thư viện Archester đang tổ chức hội thảo tháng tới về thực hành số hóa. Tôi nghĩ chúng ta nên tham dự.\nNữ: Ý tưởng hay. Hãy đăng ký ngay."
  },
  {
   "number": 41,
   "part": 3,
   "answer": "C",
   "group": "41-43",
   "textEn": "41. Who most likely are the speakers? (A) Information technology specialists (B) Artists (C) Architects (D) Newspaper journalists",
   "transcript": "W: Jong-Gyu, I have some amazing news. Our proposal was approved!\nM: You mean our design for the new wing of the city hall building? That's fantastic.\nW: Yes! I just spoke with a representative from the mayor's office. The mayor wants to meet with us next week.\nM: It's a good thing we took those aerial photographs of the site. We should use those to create a 3-D model of the building.\nW: You're right. Then we can bring that to the meeting.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n41. Hai người này khả năng cao là ai?\n(A) Chuyên viên công nghệ thông tin\n(B) Nghệ sĩ\n(C) Kiến trúc sư\n(D) Phóng viên báo\n\nDịch hội thoại:\nNữ: Jong-Gyu, tôi có tin tuyệt vời. Đề xuất của chúng ta đã được phê duyệt!\nNam: Ý bạn là thiết kế của chúng ta cho cánh mới của tòa thị chính? Thật tuyệt vời.\nNữ: Vâng! Tôi vừa nói chuyện với đại diện từ văn phòng thị trưởng. Thị trưởng muốn gặp chúng ta tuần tới.\nNam: Thật tốt khi chúng ta chụp những ảnh hàng không của địa điểm đó. Chúng ta nên dùng chúng để tạo mô hình 3D của tòa nhà.\nNữ: Bạn đúng. Sau đó chúng ta có thể mang đến cuộc họp."
  },
  {
   "number": 42,
   "part": 3,
   "answer": "A",
   "group": "41-43",
   "textEn": "42. What will take place next week? (A) A meeting with a government official (B) A tour of a construction site (C) A community celebration (D) A trade show",
   "transcript": "W: Jong-Gyu, I have some amazing news. Our proposal was approved!\nM: You mean our design for the new wing of the city hall building? That's fantastic.\nW: Yes! I just spoke with a representative from the mayor's office. The mayor wants to meet with us next week.\nM: It's a good thing we took those aerial photographs of the site. We should use those to create a 3-D model of the building.\nW: You're right. Then we can bring that to the meeting.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n42. Điều gì sẽ diễn ra vào tuần tới?\n(A) Một cuộc họp với quan chức chính phủ\n(B) Một chuyến tham quan công trường\n(C) Một lễ hội cộng đồng\n(D) Một triển lãm thương mại\n\nDịch hội thoại:\nNữ: Jong-Gyu, tôi có tin tuyệt vời. Đề xuất của chúng ta đã được phê duyệt!\nNam: Ý bạn là thiết kế của chúng ta cho cánh mới của tòa thị chính? Thật tuyệt vời.\nNữ: Vâng! Tôi vừa nói chuyện với đại diện từ văn phòng thị trưởng. Thị trưởng muốn gặp chúng ta tuần tới.\nNam: Thật tốt khi chúng ta chụp những ảnh hàng không của địa điểm đó. Chúng ta nên dùng chúng để tạo mô hình 3D của tòa nhà.\nNữ: Bạn đúng. Sau đó chúng ta có thể mang đến cuộc họp."
  },
  {
   "number": 43,
   "part": 3,
   "answer": "B",
   "group": "41-43",
   "textEn": "43. What does the man want to do? (A) Review a contract (B) Create a model (C) Reserve a meeting room (D) Update a Web site",
   "transcript": "W: Jong-Gyu, I have some amazing news. Our proposal was approved!\nM: You mean our design for the new wing of the city hall building? That's fantastic.\nW: Yes! I just spoke with a representative from the mayor's office. The mayor wants to meet with us next week.\nM: It's a good thing we took those aerial photographs of the site. We should use those to create a 3-D model of the building.\nW: You're right. Then we can bring that to the meeting.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n43. Người đàn ông muốn làm gì?\n(A) Xem lại hợp đồng\n(B) Tạo mô hình\n(C) Đặt phòng họp\n(D) Cập nhật trang web\n\nDịch hội thoại:\nNữ: Jong-Gyu, tôi có tin tuyệt vời. Đề xuất của chúng ta đã được phê duyệt!\nNam: Ý bạn là thiết kế của chúng ta cho cánh mới của tòa thị chính? Thật tuyệt vời.\nNữ: Vâng! Tôi vừa nói chuyện với đại diện từ văn phòng thị trưởng. Thị trưởng muốn gặp chúng ta tuần tới.\nNam: Thật tốt khi chúng ta chụp những ảnh hàng không của địa điểm đó. Chúng ta nên dùng chúng để tạo mô hình 3D của tòa nhà.\nNữ: Bạn đúng. Sau đó chúng ta có thể mang đến cuộc họp."
  },
  {
   "number": 44,
   "part": 3,
   "answer": "B",
   "group": "44-46",
   "textEn": "44. Where does the man most likely work? (A) At a university library (B) At a government facility (C) At a home improvement store (D) At a county park",
   "transcript": "W: Hi. I heard the county is sponsoring a program for residents to have their garden soil analyzed here at the county agriculture building.\nM: That's right. Interested residents get a free soil analysis.\nW: Great. How long will it take to get the results? I want to plant a vegetable garden this spring, and I'm very curious about my soil quality.\nM: It only takes two to three days. Do you have your sample with you?\nW: Yes. I have it right here.\nM: OK. Here's a label. Please write your name and phone number on it. Then I'll submit your sample.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n44. Người đàn ông khả năng cao làm việc ở đâu?\n(A) Thư viện đại học\n(B) Cơ quan chính phủ\n(C) Cửa hàng sửa chữa nhà cửa\n(D) Công viên hạt (khu công viên cộng đồng)\n\nDịch hội thoại:\nNữ: Chào. Tôi nghe nói quận đang tài trợ chương trình cho cư dân phân tích đất vườn tại tòa nhà nông nghiệp quận.\nNam: Đúng vậy. Cư dân quan tâm sẽ được phân tích đất miễn phí.\nNữ: Tuyệt. Mất bao lâu để tôi có kết quả? Tôi muốn trồng vườn rau mùa xuân này, và tôi rất tò mò về chất lượng đất của mình.\nNam: Chỉ mất hai đến ba ngày. Bạn có mẫu với bạn không?\nNữ: Vâng. Tôi có ngay đây.\nNam: OK. Đây là nhãn. Vui lòng viết tên và số điện thoại của bạn lên đó. Sau đó tôi sẽ nộp mẫu của bạn."
  },
  {
   "number": 45,
   "part": 3,
   "answer": "D",
   "group": "44-46",
   "textEn": "45. What does the woman want to do in the spring? (A) Write a book (B) Apply for a job (C) Take a course (D) Plant a garden",
   "transcript": "W: Hi. I heard the county is sponsoring a program for residents to have their garden soil analyzed here at the county agriculture building.\nM: That's right. Interested residents get a free soil analysis.\nW: Great. How long will it take to get the results? I want to plant a vegetable garden this spring, and I'm very curious about my soil quality.\nM: It only takes two to three days. Do you have your sample with you?\nW: Yes. I have it right here.\nM: OK. Here's a label. Please write your name and phone number on it. Then I'll submit your sample.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n45. Người phụ nữ muốn làm gì vào mùa xuân?\n(A) Viết sách\n(B) Nộp đơn xin việc\n(C) Tham gia một khóa học\n(D) Trồng một khu vườn\n\nDịch hội thoại:\nNữ: Chào. Tôi nghe nói quận đang tài trợ chương trình cho cư dân phân tích đất vườn tại tòa nhà nông nghiệp quận.\nNam: Đúng vậy. Cư dân quan tâm sẽ được phân tích đất miễn phí.\nNữ: Tuyệt. Mất bao lâu để tôi có kết quả? Tôi muốn trồng vườn rau mùa xuân này, và tôi rất tò mò về chất lượng đất của mình.\nNam: Chỉ mất hai đến ba ngày. Bạn có mẫu với bạn không?\nNữ: Vâng. Tôi có ngay đây.\nNam: OK. Đây là nhãn. Vui lòng viết tên và số điện thoại của bạn lên đó. Sau đó tôi sẽ nộp mẫu của bạn."
  },
  {
   "number": 46,
   "part": 3,
   "answer": "C",
   "group": "44-46",
   "textEn": "46. What does the man ask the woman to do? (A) Make a payment (B) Visit a Web site (C) Provide contact information (D) Wait for a supervisor",
   "transcript": "W: Hi. I heard the county is sponsoring a program for residents to have their garden soil analyzed here at the county agriculture building.\nM: That's right. Interested residents get a free soil analysis.\nW: Great. How long will it take to get the results? I want to plant a vegetable garden this spring, and I'm very curious about my soil quality.\nM: It only takes two to three days. Do you have your sample with you?\nW: Yes. I have it right here.\nM: OK. Here's a label. Please write your name and phone number on it. Then I'll submit your sample.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n46. Người đàn ông yêu cầu người phụ nữ làm gì?\n(A) Thanh toán\n(B) Truy cập một trang web\n(C) Cung cấp thông tin liên hệ\n(D) Chờ một người giám sát\n\nDịch hội thoại:\nNữ: Chào. Tôi nghe nói quận đang tài trợ chương trình cho cư dân phân tích đất vườn tại tòa nhà nông nghiệp quận.\nNam: Đúng vậy. Cư dân quan tâm sẽ được phân tích đất miễn phí.\nNữ: Tuyệt. Mất bao lâu để tôi có kết quả? Tôi muốn trồng vườn rau mùa xuân này, và tôi rất tò mò về chất lượng đất của mình.\nNam: Chỉ mất hai đến ba ngày. Bạn có mẫu với bạn không?\nNữ: Vâng. Tôi có ngay đây.\nNam: OK. Đây là nhãn. Vui lòng viết tên và số điện thoại của bạn lên đó. Sau đó tôi sẽ nộp mẫu của bạn."
  },
  {
   "number": 47,
   "part": 3,
   "answer": "B",
   "group": "47-49",
   "textEn": "47. What are the speakers working on? (A) A piece of music (B) A television cartoon (C) A theater production (D) An advertisement",
   "transcript": "M: Hi, Liliana. Here's the current script for the cartoon episode to be televised in three months. The animation department wants us to complete the episode's storyboards in five weeks.\nW: I'll go grab some lunch for us before we get started. Do you like Danny's Café on the corner?\nM: Sounds good. Thank you. After you get back, we can read through the script so we can check the timing of each scene.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n47. Hai người đang làm việc về cái gì?\n(A) Một bản nhạc\n(B) Một phim hoạt hình truyền hình\n(C) Một vở kịch\n(D) Một quảng cáo\n\nDịch hội thoại:\nNam: Chào Liliana. Đây là kịch bản hiện tại cho tập phim hoạt hình sẽ được phát sóng trong ba tháng. Bộ phận hoạt hình muốn chúng ta hoàn thành storyboard của tập trong năm tuần.\nNữ: Tôi sẽ đi lấy bữa trưa cho chúng ta trước khi bắt đầu. Bạn có thích Danny's Café ở góc phố không?\nNam: Nghe hay đó. Cảm ơn. Sau khi bạn về, chúng ta có thể đọc qua kịch bản để kiểm tra thời gian của mỗi cảnh."
  },
  {
   "number": 48,
   "part": 3,
   "answer": "A",
   "group": "47-49",
   "textEn": "48. What does the woman say she will do? (A) Pick up some lunch (B) Set up an interview (C) Buy some art supplies (D) Turn on some equipment",
   "transcript": "M: Hi, Liliana. Here's the current script for the cartoon episode to be televised in three months. The animation department wants us to complete the episode's storyboards in five weeks.\nW: I'll go grab some lunch for us before we get started. Do you like Danny's Café on the corner?\nM: Sounds good. Thank you. After you get back, we can read through the script so we can check the timing of each scene.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n48. Người phụ nữ nói cô ấy sẽ làm gì?\n(A) Lấy đồ ăn trưa\n(B) Sắp xếp một buổi phỏng vấn\n(C) Mua đồ mỹ thuật\n(D) Bật một số thiết bị\n\nDịch hội thoại:\nNam: Chào Liliana. Đây là kịch bản hiện tại cho tập phim hoạt hình sẽ được phát sóng trong ba tháng. Bộ phận hoạt hình muốn chúng ta hoàn thành storyboard của tập trong năm tuần.\nNữ: Tôi sẽ đi lấy bữa trưa cho chúng ta trước khi bắt đầu. Bạn có thích Danny's Café ở góc phố không?\nNam: Nghe hay đó. Cảm ơn. Sau khi bạn về, chúng ta có thể đọc qua kịch bản để kiểm tra thời gian của mỗi cảnh."
  },
  {
   "number": 49,
   "part": 3,
   "answer": "D",
   "group": "47-49",
   "textEn": "49. What does the man suggest that they do later? (A) Download some software (B) Review some expenses (C) Contact a performer (D) Read a script",
   "transcript": "M: Hi, Liliana. Here's the current script for the cartoon episode to be televised in three months. The animation department wants us to complete the episode's storyboards in five weeks.\nW: I'll go grab some lunch for us before we get started. Do you like Danny's Café on the corner?\nM: Sounds good. Thank you. After you get back, we can read through the script so we can check the timing of each scene.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n49. Người đàn ông đề nghị họ làm gì sau đó?\n(A) Tải một số phần mềm\n(B) Xem lại một số chi phí\n(C) Liên hệ với một nghệ sĩ biểu diễn\n(D) Đọc kịch bản\n\nDịch hội thoại:\nNam: Chào Liliana. Đây là kịch bản hiện tại cho tập phim hoạt hình sẽ được phát sóng trong ba tháng. Bộ phận hoạt hình muốn chúng ta hoàn thành storyboard của tập trong năm tuần.\nNữ: Tôi sẽ đi lấy bữa trưa cho chúng ta trước khi bắt đầu. Bạn có thích Danny's Café ở góc phố không?\nNam: Nghe hay đó. Cảm ơn. Sau khi bạn về, chúng ta có thể đọc qua kịch bản để kiểm tra thời gian của mỗi cảnh."
  },
  {
   "number": 50,
   "part": 3,
   "answer": "D",
   "group": "50-52",
   "textEn": "50. What does Ms. Stewart like about a restaurant? (A) Its varied menu (B) Its positive reviews (C) Its convenient location (D) Its outdoor seating",
   "transcript": "W1: Hi, my name is Kelly Stewart. I really love your restaurant's outdoor dining area. I'd like to reserve the patio for a party of twenty-five next Thursday evening.\nW2: Hi, Ms. Stewart. I'm Sakura. Unfortunately, I believe another large group reserved the patio for Thursday. Let me quickly check with the manager. Manager Gomez? Do we have a group reservation for the patio this Thursday evening?\nM: Actually, that group changed their reservation to Wednesday.\nW1: Great! Is there a special menu for large groups?\nM: We offer a special menu for large groups that charges a flat rate per person. Let me go get that for you. Sakura, can you take down the customer's reservation details?",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n50. Cô Stewart thích điều gì ở nhà hàng?\n(A) Thực đơn đa dạng\n(B) Những bài đánh giá tích cực\n(C) Vị trí thuận tiện\n(D) Khu vực ngồi ngoài trời\n\nDịch hội thoại:\nNữ1: Chào, tên tôi là Kelly Stewart. Tôi thực sự thích khu vực ăn ngoài trời của nhà hàng các bạn. Tôi muốn đặt chỗ patio cho nhóm 25 người vào tối thứ Năm tới.\nNữ2: Chào cô Stewart. Tôi là Sakura. Rất tiếc, tôi nghĩ một nhóm lớn khác đã đặt patio cho thứ Năm. Để tôi kiểm tra nhanh với quản lý nhé. Quản lý Gomez? Chúng ta có đặt nhóm cho patio tối thứ Năm này không?\nNam: Thực ra, nhóm đó đã đổi đặt chỗ sang thứ Tư.\nNữ1: Tốt quá! Có menu đặc biệt cho nhóm lớn không?\nNam: Chúng tôi có menu đặc biệt cho nhóm lớn và tính phí cố định mỗi người. Để tôi lấy cho cô xen. Sakura, cô có thể ghi chi tiết đặt chỗ của khách không?"
  },
  {
   "number": 51,
   "part": 3,
   "answer": "B",
   "group": "50-52",
   "textEn": "51. What problem does Sakura mention? (A) A kitchen appliance is broken (B) A space may not be available (C) A daily special is no longer offered (D) A delivery may be delayed",
   "transcript": "W1: Hi, my name is Kelly Stewart. I really love your restaurant's outdoor dining area. I'd like to reserve the patio for a party of twenty-five next Thursday evening.\nW2: Hi, Ms. Stewart. I'm Sakura. Unfortunately, I believe another large group reserved the patio for Thursday. Let me quickly check with the manager. Manager Gomez? Do we have a group reservation for the patio this Thursday evening?\nM: Actually, that group changed their reservation to Wednesday.\nW1: Great! Is there a special menu for large groups?\nM: We offer a special menu for large groups that charges a flat rate per person. Let me go get that for you. Sakura, can you take down the customer's reservation details?",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n51. Sakura nói vấn đề gì?\n(A) Một thiết bị bếp bị hỏng\n(B) Có thể không có không gian trống\n(C) Món đặc biệt hằng ngày không còn nữa\n(D) Việc giao hàng có thể bị trì hoãn\n\nDịch hội thoại:\nNữ1: Chào, tên tôi là Kelly Stewart. Tôi thực sự thích khu vực ăn ngoài trời của nhà hàng các bạn. Tôi muốn đặt chỗ patio cho nhóm 25 người vào tối thứ Năm tới.\nNữ2: Chào cô Stewart. Tôi là Sakura. Rất tiếc, tôi nghĩ một nhóm lớn khác đã đặt patio cho thứ Năm. Để tôi kiểm tra nhanh với quản lý nhé. Quản lý Gomez? Chúng ta có đặt nhóm cho patio tối thứ Năm này không?\nNam: Thực ra, nhóm đó đã đổi đặt chỗ sang thứ Tư.\nNữ1: Tốt quá! Có menu đặc biệt cho nhóm lớn không?\nNam: Chúng tôi có menu đặc biệt cho nhóm lớn và tính phí cố định mỗi người. Để tôi lấy cho cô xen. Sakura, cô có thể ghi chi tiết đặt chỗ của khách không?"
  },
  {
   "number": 52,
   "part": 3,
   "answer": "A",
   "group": "50-52",
   "textEn": "52. What will the man do next? (A) Provide a menu (B) Speak to a chef (C) Prepare a dining area (D) Order restaurant supplies",
   "transcript": "W1: Hi, my name is Kelly Stewart. I really love your restaurant's outdoor dining area. I'd like to reserve the patio for a party of twenty-five next Thursday evening.\nW2: Hi, Ms. Stewart. I'm Sakura. Unfortunately, I believe another large group reserved the patio for Thursday. Let me quickly check with the manager. Manager Gomez? Do we have a group reservation for the patio this Thursday evening?\nM: Actually, that group changed their reservation to Wednesday.\nW1: Great! Is there a special menu for large groups?\nM: We offer a special menu for large groups that charges a flat rate per person. Let me go get that for you. Sakura, can you take down the customer's reservation details?",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n52. Người đàn ông sẽ làm gì tiếp theo?\n(A) Đưa thực đơn\n(B) Nói chuyện với đầu bếp\n(C) Chuẩn bị khu vực ăn uống\n(D) Đặt thêm hàng cho nhà hàng\n\nDịch hội thoại:\nNữ1: Chào, tên tôi là Kelly Stewart. Tôi thực sự thích khu vực ăn ngoài trời của nhà hàng các bạn. Tôi muốn đặt chỗ patio cho nhóm 25 người vào tối thứ Năm tới.\nNữ2: Chào cô Stewart. Tôi là Sakura. Rất tiếc, tôi nghĩ một nhóm lớn khác đã đặt patio cho thứ Năm. Để tôi kiểm tra nhanh với quản lý nhé. Quản lý Gomez? Chúng ta có đặt nhóm cho patio tối thứ Năm này không?\nNam: Thực ra, nhóm đó đã đổi đặt chỗ sang thứ Tư.\nNữ1: Tốt quá! Có menu đặc biệt cho nhóm lớn không?\nNam: Chúng tôi có menu đặc biệt cho nhóm lớn và tính phí cố định mỗi người. Để tôi lấy cho cô xen. Sakura, cô có thể ghi chi tiết đặt chỗ của khách không?"
  },
  {
   "number": 53,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "53. Where are the speakers? (A) At a trade show (B) At a press conference (C) At a job fair (D) At a factory opening",
   "transcript": "W: Hi! How are you enjoying the agricultural trade show?\nM: I've seen some great demonstrations. That being said, one of the reasons I came to this show was to visit your booth. I've been watching some promotional videos online about the machinery that you sell.\nW: Is this our new line of automated farming technology?\nM: That's right. I watched a video about a machine that can transplant seedlings from small pots to bigger pots. It handles 10,000 plants in an hour?\nW: It sure does! And we have several payment options. Let me give you some details about our financing plans.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n53. Hai người đang ở đâu?\n(A) Tại một triển lãm thương mại\n(B) Tại buổi họp báo\n(C) Tại hội chợ việc làm\n(D) Tại lễ khai trương nhà máy\n\nDịch hội thoại:\nNữ: Chào! Anh xem triển lãm thương mại nông nghiệp như thế nào rồi?\nNam: Tôi đã xem được một số buổi trình diễn tuyệt vời. Dù vậy, một trong những lý do tôi đến triển lãm này là để thăm gian hàng của các bạn. Tôi đã xem một số video quảng cáo trực tuyến về máy móc mà các bạn bán.\nNữ: Đây có phải là dòng công nghệ nông nghiệp tự động mới của chúng tôi không?\nNam: Đúng vậy. Tôi đã xem video về một máy có thể cấy cây con từ chậu nhỏ sang chậu lớn. Nó xử lý 10.000 cây trong một giờ ư?\nNữ: Đúng vậy đấy! Và chúng tôi có nhiều lựa chọn thanh toán. Để tôi cho anh một số chi tiết về lựa chọn chi trả của chúng tôi."
  },
  {
   "number": 54,
   "part": 3,
   "answer": "A",
   "group": "53-55",
   "textEn": "54. Why does the man say, “It handles 10,000 plants in an hour”? (A) To express amazement (B) To justify an expense (C) To correct an error (D) To recommend caution",
   "transcript": "W: Hi! How are you enjoying the agricultural trade show?\nM: I've seen some great demonstrations. That being said, one of the reasons I came to this show was to visit your booth. I've been watching some promotional videos online about the machinery that you sell.\nW: Is this our new line of automated farming technology?\nM: That's right. I watched a video about a machine that can transplant seedlings from small pots to bigger pots. It handles 10,000 plants in an hour?\nW: It sure does! And we have several payment options. Let me give you some details about our financing plans.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n54. Tại sao người đàn ông nói “Nó xử lý 10.000 cây trong một giờ”?\n(A) Để bày tỏ sự kinh ngạc\n(B) Để biện minh cho một khoản chi\n(C) Để sửa một lỗi sai\n(D) Để đưa ra lời cảnh báo\n\nDịch hội thoại:\nNữ: Chào! Anh xem triển lãm thương mại nông nghiệp như thế nào rồi?\nNam: Tôi đã xem được một số buổi trình diễn tuyệt vời. Dù vậy, một trong những lý do tôi đến triển lãm này là để thăm gian hàng của các bạn. Tôi đã xem một số video quảng cáo trực tuyến về máy móc mà các bạn bán.\nNữ: Đây có phải là dòng công nghệ nông nghiệp tự động mới của chúng tôi không?\nNam: Đúng vậy. Tôi đã xem video về một máy có thể cấy cây con từ chậu nhỏ sang chậu lớn. Nó xử lý 10.000 cây trong một giờ ư?\nNữ: Đúng vậy đấy! Và chúng tôi có nhiều lựa chọn thanh toán. Để tôi cho anh một số chi tiết về lựa chọn chi trả của chúng tôi."
  },
  {
   "number": 55,
   "part": 3,
   "answer": "C",
   "group": "53-55",
   "textEn": "55. What will the speakers do next? (A) Exchange business cards (B) Watch a product demonstration (C) Review financing options (D) Contact an event organizer",
   "transcript": "W: Hi! How are you enjoying the agricultural trade show?\nM: I've seen some great demonstrations. That being said, one of the reasons I came to this show was to visit your booth. I've been watching some promotional videos online about the machinery that you sell.\nW: Is this our new line of automated farming technology?\nM: That's right. I watched a video about a machine that can transplant seedlings from small pots to bigger pots. It handles 10,000 plants in an hour?\nW: It sure does! And we have several payment options. Let me give you some details about our financing plans.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n55. Hai người sẽ làm gì tiếp theo?\n(A) Trao đổi danh thiếp\n(B) Xem một buổi trình diễn sản phẩm\n(C) Xem xét các phương án tài chính\n(D) Liên hệ với người tổ chức sự kiện\n\nDịch hội thoại:\nNữ: Chào! Anh xem triển lãm thương mại nông nghiệp như thế nào rồi?\nNam: Tôi đã xem được một số buổi trình diễn tuyệt vời. Dù vậy, một trong những lý do tôi đến triển lãm này là để thăm gian hàng của các bạn. Tôi đã xem một số video quảng cáo trực tuyến về máy móc mà các bạn bán.\nNữ: Đây có phải là dòng công nghệ nông nghiệp tự động mới của chúng tôi không?\nNam: Đúng vậy. Tôi đã xem video về một máy có thể cấy cây con từ chậu nhỏ sang chậu lớn. Nó xử lý 10.000 cây trong một giờ ư?\nNữ: Đúng vậy đấy! Và chúng tôi có nhiều lựa chọn thanh toán. Để tôi cho anh một số chi tiết về lựa chọn chi trả của chúng tôi."
  },
  {
   "number": 56,
   "part": 3,
   "answer": "A",
   "group": "56-58",
   "textEn": "56. Where is the conversation taking place? (A) At an airport (B) At a travel agency (C) At a bus station (D) At a train station",
   "transcript": "W: OK. You're all set to board flight 1216 to Toronto. Thank you for flying with us. Unfortunately, I've just learned that the flight is delayed because of inclement weather in Canada.\nM1: Oh, no! My colleague here and I are presenting at a conference in Toronto this evening. Do you have any idea how long the delay might be?\nW: We'll be hearing from Toronto regularly. I'm sorry, but that's all we know at this point.\nM2: It's all right, Jinyu. I doubt we'll get there in time. Maybe the organizers can reschedule us for tomorrow. I'll call them.\nW: In the meantime, I can offer you meal vouchers if you like.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n56. Cuộc trò chuyện đang diễn ra ở đâu?\n(A) Sân bay\n(B) Đại lý du lịch\n(C) Trạm xe buýt\n(D) Ga tàu\n\nDịch hội thoại:\nNữ: OK. Các bạn đã sẵn sàng lên chuyến bay 1216 đến Toronto. Cảm ơn vì đã bay cùng chúng tôi. Rất tiếc, tôi vừa biết rằng chuyến bay bị trì hoãn vì thời tiết xấu ở Canada.\nNam1: Ồ không! Đồng nghiệp của tôi ở đây và tôi sẽ trình bày tại một hội nghị ở Toronto tối nay. Cô có biết trì hoãn bao lâu không?\nNữ: Chúng tôi sẽ nhận tin từ Toronto liên tục. Xin lỗi, nhưng đó là tất cả những gì chúng tôi biết lúc này.\nNam2: Không sao, Jinyu. Tôi không nghĩ chúng ta sẽ đến kịp giờ. Có lẽ ban tổ chức có thể sắp xếp lại cho chúng ta vào ngày mai. Tôi sẽ gọi họ.\nNữ: Trong lúc đó, tôi có thể cung cấp phiếu ăn cho các anh nếu muốn."
  },
  {
   "number": 57,
   "part": 3,
   "answer": "D",
   "group": "56-58",
   "textEn": "57. Why are the men traveling to Toronto? (A) To attend a sports event (B) To meet with a client (C) To tour a factory (D) To present at a conference",
   "transcript": "W: OK. You're all set to board flight 1216 to Toronto. Thank you for flying with us. Unfortunately, I've just learned that the flight is delayed because of inclement weather in Canada.\nM1: Oh, no! My colleague here and I are presenting at a conference in Toronto this evening. Do you have any idea how long the delay might be?\nW: We'll be hearing from Toronto regularly. I'm sorry, but that's all we know at this point.\nM2: It's all right, Jinyu. I doubt we'll get there in time. Maybe the organizers can reschedule us for tomorrow. I'll call them.\nW: In the meantime, I can offer you meal vouchers if you like.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n57. Tại sao hai người đàn ông đi Toronto?\n(A) Dự một sự kiện thể thao\n(B) Gặp khách hàng\n(C) Tham quan nhà máy\n(D) Thuyết trình tại hội nghị\n\nDịch hội thoại:\nNữ: OK. Các bạn đã sẵn sàng lên chuyến bay 1216 đến Toronto. Cảm ơn vì đã bay cùng chúng tôi. Rất tiếc, tôi vừa biết rằng chuyến bay bị trì hoãn vì thời tiết xấu ở Canada.\nNam1: Ồ không! Đồng nghiệp của tôi ở đây và tôi sẽ trình bày tại một hội nghị ở Toronto tối nay. Cô có biết trì hoãn bao lâu không?\nNữ: Chúng tôi sẽ nhận tin từ Toronto liên tục. Xin lỗi, nhưng đó là tất cả những gì chúng tôi biết lúc này.\nNam2: Không sao, Jinyu. Tôi không nghĩ chúng ta sẽ đến kịp giờ. Có lẽ ban tổ chức có thể sắp xếp lại cho chúng ta vào ngày mai. Tôi sẽ gọi họ.\nNữ: Trong lúc đó, tôi có thể cung cấp phiếu ăn cho các anh nếu muốn."
  },
  {
   "number": 58,
   "part": 3,
   "answer": "C",
   "group": "56-58",
   "textEn": "58. What does the woman offer to do? (A) Rebook a trip (B) Restart a computer system (C) Provide some vouchers (D) Call a hotel",
   "transcript": "W: OK. You're all set to board flight 1216 to Toronto. Thank you for flying with us. Unfortunately, I've just learned that the flight is delayed because of inclement weather in Canada.\nM1: Oh, no! My colleague here and I are presenting at a conference in Toronto this evening. Do you have any idea how long the delay might be?\nW: We'll be hearing from Toronto regularly. I'm sorry, but that's all we know at this point.\nM2: It's all right, Jinyu. I doubt we'll get there in time. Maybe the organizers can reschedule us for tomorrow. I'll call them.\nW: In the meantime, I can offer you meal vouchers if you like.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n58. Người phụ nữ đề nghị làm gì?\n(A) Đặt lại chuyến đi\n(B) Khởi động lại hệ thống máy tính\n(C) Cung cấp phiếu giảm giá\n(D) Gọi khách sạn\n\nDịch hội thoại:\nNữ: OK. Các bạn đã sẵn sàng lên chuyến bay 1216 đến Toronto. Cảm ơn vì đã bay cùng chúng tôi. Rất tiếc, tôi vừa biết rằng chuyến bay bị trì hoãn vì thời tiết xấu ở Canada.\nNam1: Ồ không! Đồng nghiệp của tôi ở đây và tôi sẽ trình bày tại một hội nghị ở Toronto tối nay. Cô có biết trì hoãn bao lâu không?\nNữ: Chúng tôi sẽ nhận tin từ Toronto liên tục. Xin lỗi, nhưng đó là tất cả những gì chúng tôi biết lúc này.\nNam2: Không sao, Jinyu. Tôi không nghĩ chúng ta sẽ đến kịp giờ. Có lẽ ban tổ chức có thể sắp xếp lại cho chúng ta vào ngày mai. Tôi sẽ gọi họ.\nNữ: Trong lúc đó, tôi có thể cung cấp phiếu ăn cho các anh nếu muốn."
  },
  {
   "number": 59,
   "part": 3,
   "answer": "A",
   "group": "59-61",
   "textEn": "59. What has the man been doing? (A) Repairing a vehicle (B) Painting a fence (C) Training an assistant (D) Cleaning out a shed",
   "transcript": "M: So, Raquel, I've been working on repairing this tractor, but I'm not having much luck. I think it's the hydraulic system. I cleaned the pump, but it's not running any better. I've done this before, and it usually fixes it.\nW: I see. Maybe it's a problem with a piston in the hydraulic cylinder. But a repair that big should be under warranty. It was Hamdy Equipment that sold it to us.\nM: Good point. I'll give them a call later. I've spent too much time on this tractor. I need to go over to the fields to check on the peppers and cucumbers -it may be time to pick them.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n59. Người đàn ông đã làm gì?\n(A) Sửa xe\n(B) Sơn hàng rào\n(C) Đào tạo một trợ lý\n(D) Dọn dẹp nhà kho\n\nDịch hội thoại:\nNam: Vậy, Raquel, tôi đã làm việc sửa chữa máy xúc này, nhưng không khả quan lắm. Tôi nghĩ là do hệ thống thủy lực. Tôi đã làm sạch bơm, nhưng nó cũng không chạy tốt hơn. Tôi đã làm điều này trước đây, và thường thì sửa được.\nNữ: Tôi hiểu. Có lẽ là vấn đề với piston trong xi lanh thủy lực. Nhưng một sửa chữa lớn như vậy nên được bảo hành. Handy Equipment đã bán cho chúng ta.\nNam: Ý hay. Tôi sẽ gọi họ sau. Tôi đã dành quá nhiều thời gian cho máy xúc này. Tôi cần đi ra cánh đồng để kiểm tra ớt và dưa chuột- có thể đã đến lúc hái chúng."
  },
  {
   "number": 60,
   "part": 3,
   "answer": "C",
   "group": "59-61",
   "textEn": "60. Why does the woman say, “It was Hamdy Equipment that sold it to us”? (A) To complain about a decision (B) To correct some misinformation (C) To make a suggestion (D) To give a compliment",
   "transcript": "M: So, Raquel, I've been working on repairing this tractor, but I'm not having much luck. I think it's the hydraulic system. I cleaned the pump, but it's not running any better. I've done this before, and it usually fixes it.\nW: I see. Maybe it's a problem with a piston in the hydraulic cylinder. But a repair that big should be under warranty. It was Hamdy Equipment that sold it to us.\nM: Good point. I'll give them a call later. I've spent too much time on this tractor. I need to go over to the fields to check on the peppers and cucumbers -it may be time to pick them.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n60. Tại sao người phụ nữ nói “Hamdy Equipment đã bán nó cho chúng tôi”?\n(A) Phàn nàn về một quyết định\n(B) Sửa thông tin sai\n(C) Đưa ra một gợi ý\n(D) Khen ngợi\n\nDịch hội thoại:\nNam: Vậy, Raquel, tôi đã làm việc sửa chữa máy xúc này, nhưng không khả quan lắm. Tôi nghĩ là do hệ thống thủy lực. Tôi đã làm sạch bơm, nhưng nó cũng không chạy tốt hơn. Tôi đã làm điều này trước đây, và thường thì sửa được.\nNữ: Tôi hiểu. Có lẽ là vấn đề với piston trong xi lanh thủy lực. Nhưng một sửa chữa lớn như vậy nên được bảo hành. Handy Equipment đã bán cho chúng ta.\nNam: Ý hay. Tôi sẽ gọi họ sau. Tôi đã dành quá nhiều thời gian cho máy xúc này. Tôi cần đi ra cánh đồng để kiểm tra ớt và dưa chuột- có thể đã đến lúc hái chúng."
  },
  {
   "number": 61,
   "part": 3,
   "answer": "D",
   "group": "59-61",
   "textEn": "61. What will the man check next? (A) An invoice (B) A manual (C) Some cattle (D) Some vegetables",
   "transcript": "M: So, Raquel, I've been working on repairing this tractor, but I'm not having much luck. I think it's the hydraulic system. I cleaned the pump, but it's not running any better. I've done this before, and it usually fixes it.\nW: I see. Maybe it's a problem with a piston in the hydraulic cylinder. But a repair that big should be under warranty. It was Hamdy Equipment that sold it to us.\nM: Good point. I'll give them a call later. I've spent too much time on this tractor. I need to go over to the fields to check on the peppers and cucumbers -it may be time to pick them.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n61. Người đàn ông sẽ kiểm tra gì tiếp theo?\n(A) Hóa đơn\n(B) Sổ hướng dẫn\n(C) Một số gia súc\n(D) Một số rau củ\n\nDịch hội thoại:\nNam: Vậy, Raquel, tôi đã làm việc sửa chữa máy xúc này, nhưng không khả quan lắm. Tôi nghĩ là do hệ thống thủy lực. Tôi đã làm sạch bơm, nhưng nó cũng không chạy tốt hơn. Tôi đã làm điều này trước đây, và thường thì sửa được.\nNữ: Tôi hiểu. Có lẽ là vấn đề với piston trong xi lanh thủy lực. Nhưng một sửa chữa lớn như vậy nên được bảo hành. Handy Equipment đã bán cho chúng ta.\nNam: Ý hay. Tôi sẽ gọi họ sau. Tôi đã dành quá nhiều thời gian cho máy xúc này. Tôi cần đi ra cánh đồng để kiểm tra ớt và dưa chuột- có thể đã đến lúc hái chúng."
  },
  {
   "number": 62,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "62. Who most likely is the woman? (A) A mechanic (B) A customer (C) An auto parts supplier (D) A social media coordinator",
   "transcript": "W: Hi. I'm here to pick up my car. My name's Olga Popova. You replaced one of my tires.\nM: Yes, Ms. Popova. Your car is ready. Your bill is $133.\nW: That's quite a bit more than listed on your Web site. I thought the cost would be $98.\nM: Let me look at the work order. It looks like I billed you for the wrong tire. Apologies- let me fix that. Also, if you'd like to share your e-mail, I can sign you up for our rewards program.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n62. Người phụ nữ khả năng cao là ai?\n(A) Thợ sửa xe\n(B) Khách hàng\n(C) Nhà cung cấp phụ tùng ô tô\n(D) Điều phối viên mạng xã hội\n\nDịch hội thoại:\nNữ: Chào. Tôi đến để lấy xe. Tên tôi là Olga Popova. Anh đã thay một lốp xe của tôi.\nNam: Vâng, cô Popova. Xe của cô đã sẵn sàng. Hóa đơn là 133 đô la.\nNữ: Đó khá là nhiều hơn so với liệt kê trên website của anh. Tôi nghĩ chi phí sẽ là 98 đô la.\nNam: Để tôi xem lệnh làm việc. Có vẻ tôi đã tính hóa đơn cho lốp sai. Xin lỗi- để tôi sửa. Ngoài ra, nếu cô muốn chia sẻ email, tôi có thể đăng ký cô vào chương trình tính thưởng của chúng tôi."
  },
  {
   "number": 63,
   "part": 3,
   "answer": "B",
   "group": "62-64",
   "textEn": "63. Look at the graphic. Which tire model should have been listed on an invoice? (A) City Cruiser (B) Snow King (C) High Summit (D) Sport Plus",
   "transcript": "W: Hi. I'm here to pick up my car. My name's Olga Popova. You replaced one of my tires.\nM: Yes, Ms. Popova. Your car is ready. Your bill is $133.\nW: That's quite a bit more than listed on your Web site. I thought the cost would be $98.\nM: Let me look at the work order. It looks like I billed you for the wrong tire. Apologies- let me fix that. Also, if you'd like to share your e-mail, I can sign you up for our rewards program.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n63. Nhìn vào hình. Mẫu lốp nào lẽ ra phải được ghi trên hóa đơn?\n(A) City Cruiser\n(B) Snow King\n(C) High Summit\n(D) Sport Plus\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Chào. Tôi đến để lấy xe. Tên tôi là Olga Popova. Anh đã thay một lốp xe của tôi.\nNam: Vâng, cô Popova. Xe của cô đã sẵn sàng. Hóa đơn là 133 đô la.\nNữ: Đó khá là nhiều hơn so với liệt kê trên website của anh. Tôi nghĩ chi phí sẽ là 98 đô la.\nNam: Để tôi xem lệnh làm việc. Có vẻ tôi đã tính hóa đơn cho lốp sai. Xin lỗi- để tôi sửa. Ngoài ra, nếu cô muốn chia sẻ email, tôi có thể đăng ký cô vào chương trình tính thưởng của chúng tôi."
  },
  {
   "number": 64,
   "part": 3,
   "answer": "C",
   "group": "62-64",
   "textEn": "64. What does the man invite the woman to share? (A) Some consultant names (B) Some feedback (C) An e-mail address (D) A collection of photographs",
   "transcript": "W: Hi. I'm here to pick up my car. My name's Olga Popova. You replaced one of my tires.\nM: Yes, Ms. Popova. Your car is ready. Your bill is $133.\nW: That's quite a bit more than listed on your Web site. I thought the cost would be $98.\nM: Let me look at the work order. It looks like I billed you for the wrong tire. Apologies- let me fix that. Also, if you'd like to share your e-mail, I can sign you up for our rewards program.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n64. Người đàn ông mời người phụ nữ chia sẻ gì?\n(A) Một số tên tư vấn\n(B) Một số phản hồi\n(C) Một địa chỉ email\n(D) Một bộ sưu tập ảnh\n\nDịch hội thoại:\nNữ: Chào. Tôi đến để lấy xe. Tên tôi là Olga Popova. Anh đã thay một lốp xe của tôi.\nNam: Vâng, cô Popova. Xe của cô đã sẵn sàng. Hóa đơn là 133 đô la.\nNữ: Đó khá là nhiều hơn so với liệt kê trên website của anh. Tôi nghĩ chi phí sẽ là 98 đô la.\nNam: Để tôi xem lệnh làm việc. Có vẻ tôi đã tính hóa đơn cho lốp sai. Xin lỗi- để tôi sửa. Ngoài ra, nếu cô muốn chia sẻ email, tôi có thể đăng ký cô vào chương trình tính thưởng của chúng tôi."
  },
  {
   "number": 65,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "65. Why does the woman want to buy a new pillow? (A) Her pillow is old. (B) Her pillow is too small. (C) She heard about a new model. (D) She developed a pain in her neck.",
   "transcript": "W: Hi. I want to buy a new pillow. I recently started waking up with a stiff neck, so I want something that will help me sleep better.\nM: I can assist you with that. The first thing you should consider is the position you sleep in. Do you sleep on your back, your stomach, or your side?\nW: On my side.\nM: OK. For side sleepers, we recommend the Star Pillow. It's a firm pillow that will give you good support.\nW: Sounds great. One question, though. What's inside the pillow? I have an allergy to feathers.\nM: This particular model is made with only nonallergenic materials.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n65. Tại sao người phụ nữ muốn mua gối mới?\n(A) Gối của cô ấy đã cũ\n(B) Gối của cô ấy quá nhỏ\n(C) Cô ấy nghe về một mẫu mới\n(D) Cô ấy bị đau cổ\n\nDịch hội thoại:\nNữ: Chào. Tôi muốn mua gối mới. Gần đây tôi bắt đầu thức dậy với cổ cứng, vì vậy tôi muốn thứ gì đó giúp tôi ngủ ngon hơn.\nNam: Tôi có thể giúp cô. Điều đầu tiên cô nên xem xét là tư thế ngủ. Cô ngủ ngửa, sấp hay nghiêng?\nNữ: Tôi nằm nghiêng.\nNam: OK. Đối với người ngủ nghiêng, chúng tôi khuyến nghị Star Pillow. Đó là gối cứng sẽ hỗ trợ tốt cho cô.\nNữ: Nghe được đó. Tuy nhiên, tôi có một câu hỏi. Bên trong gối là gì? Tôi dị ứng với lông vũ.\nNam: Mẫu này được làm chỉ với vật liệu không gây dị ứng."
  },
  {
   "number": 66,
   "part": 3,
   "answer": "C",
   "group": "65-67",
   "textEn": "66. Look at the graphic. How much is the pillow that the man recommends? (A) $20 (B) $25 (C) $30 (D) $45",
   "transcript": "W: Hi. I want to buy a new pillow. I recently started waking up with a stiff neck, so I want something that will help me sleep better.\nM: I can assist you with that. The first thing you should consider is the position you sleep in. Do you sleep on your back, your stomach, or your side?\nW: On my side.\nM: OK. For side sleepers, we recommend the Star Pillow. It's a firm pillow that will give you good support.\nW: Sounds great. One question, though. What's inside the pillow? I have an allergy to feathers.\nM: This particular model is made with only nonallergenic materials.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n66. Nhìn vào hình. Cái gối người đàn ông khuyên có giá bao nhiêu?\n(A) \n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Chào. Tôi muốn mua gối mới. Gần đây tôi bắt đầu thức dậy với cổ cứng, vì vậy tôi muốn thứ gì đó giúp tôi ngủ ngon hơn.\nNam: Tôi có thể giúp cô. Điều đầu tiên cô nên xem xét là tư thế ngủ. Cô ngủ ngửa, sấp hay nghiêng?\nNữ: Tôi nằm nghiêng.\nNam: OK. Đối với người ngủ nghiêng, chúng tôi khuyến nghị Star Pillow. Đó là gối cứng sẽ hỗ trợ tốt cho cô.\nNữ: Nghe được đó. Tuy nhiên, tôi có một câu hỏi. Bên trong gối là gì? Tôi dị ứng với lông vũ.\nNam: Mẫu này được làm chỉ với vật liệu không gây dị ứng."
  },
  {
   "number": 67,
   "part": 3,
   "answer": "D",
   "group": "65-67",
   "textEn": "67. What does the woman ask about? (A) A product warranty (B) A promotional discount (C) The store’s business hours (D) The materials used in a product",
   "transcript": "W: Hi. I want to buy a new pillow. I recently started waking up with a stiff neck, so I want something that will help me sleep better.\nM: I can assist you with that. The first thing you should consider is the position you sleep in. Do you sleep on your back, your stomach, or your side?\nW: On my side.\nM: OK. For side sleepers, we recommend the Star Pillow. It's a firm pillow that will give you good support.\nW: Sounds great. One question, though. What's inside the pillow? I have an allergy to feathers.\nM: This particular model is made with only nonallergenic materials.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n67. Người phụ nữ hỏi về điều gì?\n(A) Bảo hành sản phẩm\n(B) Khuyến mãi giảm giá\n(C) Giờ mở cửa của cửa hàng\n(D) Chất liệu làm sản phẩm\n\nDịch hội thoại:\nNữ: Chào. Tôi muốn mua gối mới. Gần đây tôi bắt đầu thức dậy với cổ cứng, vì vậy tôi muốn thứ gì đó giúp tôi ngủ ngon hơn.\nNam: Tôi có thể giúp cô. Điều đầu tiên cô nên xem xét là tư thế ngủ. Cô ngủ ngửa, sấp hay nghiêng?\nNữ: Tôi nằm nghiêng.\nNam: OK. Đối với người ngủ nghiêng, chúng tôi khuyến nghị Star Pillow. Đó là gối cứng sẽ hỗ trợ tốt cho cô.\nNữ: Nghe được đó. Tuy nhiên, tôi có một câu hỏi. Bên trong gối là gì? Tôi dị ứng với lông vũ.\nNam: Mẫu này được làm chỉ với vật liệu không gây dị ứng."
  },
  {
   "number": 68,
   "part": 3,
   "answer": "B",
   "group": "68-70",
   "textEn": "68. What is the man’s area of expertise? (A) Packaging new products (B) Developing software (C) Designing fitness equipment (D) Training employees",
   "transcript": "W: Welcome to the team. I hear you have a lot of experience designing software. We need some new ideas for our business software package we're developing.\nM: Thanks. I also help set up for the sales presentations. I just fixed a problem with the sound equipment in the conference room. By the way, you're in sales, right? Aren't you presenting to a new client next week?\nW: Yes, I love sales. But I especially like the step where we're getting a lot of questions from clients. I can address doubts or objections and show them how the software really meets their needs.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n68. Chuyên môn của người đàn ông là gì?\n(A) Đóng gói sản phẩm mới\n(B) Phát triển phần mềm\n(C) Thiết kế thiết bị thể dục\n(D) Đào tạo nhân viên\n\nDịch hội thoại:\nNữ: Chào mừng đến với đội. Tôi nghe anh có nhiều kinh nghiệm thiết kế phần mềm. Chúng tôi cần một số ý tưởng mới cho gói phần mềm kinh doanh mà chúng tôi đang phát triển.\nNam: Cảm ơn. Tôi cũng giúp thiết lập cho các buổi trình bày bán hàng. Tôi vừa sửa vấn đề với thiết bị âm thanh trong phòng hội nghị. Nhân tiện, anh ở bộ phận bán hàng phải không? Tuần tới anh không trình bày cho khách hàng mới sao?\nNữ: Vâng, tôi yêu bán hàng. Nhưng tôi đặc biệt thích bước mà chúng tôi nhận được nhiều câu hỏi từ khách hàng. Tôi có thể giải quyết nghi ngờ hoặc phản đối và cho họ thấy phần mềm thực sự đáp ứng nhu cầu của họ như thế nào."
  },
  {
   "number": 69,
   "part": 3,
   "answer": "D",
   "group": "68-70",
   "textEn": "69. According to the man, what did he recently do? (A) Reserve a conference room (B) Complete some paperwork (C) Meet with a supervisor (D) Fix some equipment",
   "transcript": "W: Welcome to the team. I hear you have a lot of experience designing software. We need some new ideas for our business software package we're developing.\nM: Thanks. I also help set up for the sales presentations. I just fixed a problem with the sound equipment in the conference room. By the way, you're in sales, right? Aren't you presenting to a new client next week?\nW: Yes, I love sales. But I especially like the step where we're getting a lot of questions from clients. I can address doubts or objections and show them how the software really meets their needs.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n69. Theo người đàn ông, anh ấy đã làm gì gần đây?\n(A) Đặt trước phòng họp\n(B) Hoàn tất một số giấy tờ\n(C) Gặp một người giám sát\n(D) Sửa một thiết bị\n\nDịch hội thoại:\nNữ: Chào mừng đến với đội. Tôi nghe anh có nhiều kinh nghiệm thiết kế phần mềm. Chúng tôi cần một số ý tưởng mới cho gói phần mềm kinh doanh mà chúng tôi đang phát triển.\nNam: Cảm ơn. Tôi cũng giúp thiết lập cho các buổi trình bày bán hàng. Tôi vừa sửa vấn đề với thiết bị âm thanh trong phòng hội nghị. Nhân tiện, anh ở bộ phận bán hàng phải không? Tuần tới anh không trình bày cho khách hàng mới sao?\nNữ: Vâng, tôi yêu bán hàng. Nhưng tôi đặc biệt thích bước mà chúng tôi nhận được nhiều câu hỏi từ khách hàng. Tôi có thể giải quyết nghi ngờ hoặc phản đối và cho họ thấy phần mềm thực sự đáp ứng nhu cầu của họ như thế nào."
  },
  {
   "number": 70,
   "part": 3,
   "answer": "C",
   "group": "68-70",
   "textEn": "70. Look at the graphic. Which step of the sales process does the woman especially enjoy? (A) Step 1 (B) Step 2 (C) Step 3 (D) Step 4",
   "transcript": "W: Welcome to the team. I hear you have a lot of experience designing software. We need some new ideas for our business software package we're developing.\nM: Thanks. I also help set up for the sales presentations. I just fixed a problem with the sound equipment in the conference room. By the way, you're in sales, right? Aren't you presenting to a new client next week?\nW: Yes, I love sales. But I especially like the step where we're getting a lot of questions from clients. I can address doubts or objections and show them how the software really meets their needs.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n70. Nhìn vào sơ đồ. Người phụ nữ đặc biệt thích bước nào trong quy trình bán hàng?\n(A) Bước 1\n(B) Bước 2\n(C) Bước 3\n(D) Bước 4\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch hội thoại:\nNữ: Chào mừng đến với đội. Tôi nghe anh có nhiều kinh nghiệm thiết kế phần mềm. Chúng tôi cần một số ý tưởng mới cho gói phần mềm kinh doanh mà chúng tôi đang phát triển.\nNam: Cảm ơn. Tôi cũng giúp thiết lập cho các buổi trình bày bán hàng. Tôi vừa sửa vấn đề với thiết bị âm thanh trong phòng hội nghị. Nhân tiện, anh ở bộ phận bán hàng phải không? Tuần tới anh không trình bày cho khách hàng mới sao?\nNữ: Vâng, tôi yêu bán hàng. Nhưng tôi đặc biệt thích bước mà chúng tôi nhận được nhiều câu hỏi từ khách hàng. Tôi có thể giải quyết nghi ngờ hoặc phản đối và cho họ thấy phần mềm thực sự đáp ứng nhu cầu của họ như thế nào."
  },
  {
   "number": 71,
   "part": 4,
   "answer": "D",
   "group": "71-73",
   "textEn": "71. Who most likely is the speaker? (A) A geologist (B) A boat captain (C) A maintenance supervisor (D) A city official",
   "transcript": "Thank you for attending Port Jefferson's city council meeting. We have a lot on our agenda today. The first topic up for discussion is a request from the head of the city's water system. He wants to buy two UAVs—or underwater autonomous vehicles. These remotely operated vehicles can be used to inspect, maintain, and repair equipment underwater. Now, each UAV costs 30,000 dollars, so this is a big decision for us. But for perspective, the city spends more than that every year to hire divers to repair broken equipment. Let's hear more about it from the chief engineer. He's going to give us some details about the vehicles.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n71. Người nói có khả năng là ai?\n(A) Một nhà địa chất\n(B) Một thuyền trưởng\n(C) Một giám sát viên bảo trì\n(D) Một quan chức thành phố\n\nDịch bài nói:\nCảm ơn mọi người đã tham dự cuộc họp hội đồng thành phố Port Jefferson. Hôm nay chúng ta có rất nhiều nội dung trong chương trình nghị sự. Chủ đề đầu tiên cần thảo luận là một đề xuất từ trưởng bộ phận hệ thống nước của thành phố. Ông ấy muốn mua hai UAV — hay còn gọi là phương tiện tự hành dưới nước. Những thiết bị điều khiển từ xa này có thể được dùng để kiểm tra, bảo trì và sửa chữa các thiết bị dưới nước. Hiện mỗi chiếc UAV có giá"
  },
  {
   "number": 72,
   "part": 4,
   "answer": "B",
   "group": "71-73",
   "textEn": "72. What is the speaker mainly discussing? (A) Conducting a safety inspection (B) Buying some new equipment (C) Building a new facility (D) Recruiting qualified staff",
   "transcript": "Thank you for attending Port Jefferson's city council meeting. We have a lot on our agenda today. The first topic up for discussion is a request from the head of the city's water system. He wants to buy two UAVs—or underwater autonomous vehicles. These remotely operated vehicles can be used to inspect, maintain, and repair equipment underwater. Now, each UAV costs 30,000 dollars, so this is a big decision for us. But for perspective, the city spends more than that every year to hire divers to repair broken equipment. Let's hear more about it from the chief engineer. He's going to give us some details about the vehicles.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n72. Người nói chủ yếu đang thảo luận về điều gì?\n(A) Tiến hành kiểm tra an toàn\n(B) Mua một số thiết bị mới\n(C) Xây dựng một cơ sở mới\n(D) Tuyển dụng nhân sự có trình độ\n\nDịch bài nói:\nCảm ơn mọi người đã tham dự cuộc họp hội đồng thành phố Port Jefferson. Hôm nay chúng ta có rất nhiều nội dung trong chương trình nghị sự. Chủ đề đầu tiên cần thảo luận là một đề xuất từ trưởng bộ phận hệ thống nước của thành phố. Ông ấy muốn mua hai UAV — hay còn gọi là phương tiện tự hành dưới nước. Những thiết bị điều khiển từ xa này có thể được dùng để kiểm tra, bảo trì và sửa chữa các thiết bị dưới nước. Hiện mỗi chiếc UAV có giá"
  },
  {
   "number": 73,
   "part": 4,
   "answer": "C",
   "group": "71-73",
   "textEn": "73. What will happen next? (A) A survey will be administered. (B) A video will be shown. (C) An expert will speak. (D) A process will be demonstrated.",
   "transcript": "Thank you for attending Port Jefferson's city council meeting. We have a lot on our agenda today. The first topic up for discussion is a request from the head of the city's water system. He wants to buy two UAVs—or underwater autonomous vehicles. These remotely operated vehicles can be used to inspect, maintain, and repair equipment underwater. Now, each UAV costs 30,000 dollars, so this is a big decision for us. But for perspective, the city spends more than that every year to hire divers to repair broken equipment. Let's hear more about it from the chief engineer. He's going to give us some details about the vehicles.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n73. Điều gì sẽ xảy ra tiếp theo?\n(A) Một cuộc khảo sát sẽ được thực hiện.\n(B) Một video sẽ được chiếu.\n(C) Một chuyên gia sẽ phát biểu.\n(D) Một quy trình sẽ được trình diễn.\n\nDịch bài nói:\nCảm ơn mọi người đã tham dự cuộc họp hội đồng thành phố Port Jefferson. Hôm nay chúng ta có rất nhiều nội dung trong chương trình nghị sự. Chủ đề đầu tiên cần thảo luận là một đề xuất từ trưởng bộ phận hệ thống nước của thành phố. Ông ấy muốn mua hai UAV — hay còn gọi là phương tiện tự hành dưới nước. Những thiết bị điều khiển từ xa này có thể được dùng để kiểm tra, bảo trì và sửa chữa các thiết bị dưới nước. Hiện mỗi chiếc UAV có giá"
  },
  {
   "number": 74,
   "part": 4,
   "answer": "D",
   "group": "74-76",
   "textEn": "74. What type of industry does the speaker most likely work in? (A) Transportation (B) Hospitality (C) Construction (D) Pharmaceutical",
   "transcript": "Team, I'd like you to meet Alka Raj. She is the new safety and compliance officer for our pharmaceutical lab. Alka will primarily review our safety practices and ensure they meet or exceed all current pharmaceutical industry standards. I'm thrilled that she's here just in time to finish inspections before the due date to file our workplace safety paperwork. This will ensure that all the paperwork is submitted on time.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n74. Người nói có khả năng làm việc trong lĩnh vực nào?\n(A) Giao thông vận tải\n(B) Dịch vụ khách sạn\n(C) Xây dựng\n(D) Dược phẩm\n\nDịch bài nói:\nCả đội, tôi muốn giới thiệu với mọi người Alka Raj. Cô ấy là nhân viên an toàn và tuân thủ mới của phòng thí nghiệm dược phẩm của chúng ta. Alka sẽ chủ yếu xem xét các quy trình an toàn và đảm bảo rằng chúng đáp ứng hoặc vượt qua tất cả các tiêu chuẩn hiện hành trong ngành dược phẩm. Tôi rất vui vì cô ấy có mặt kịp thời để hoàn tất các cuộc kiểm tra trước hạn nộp hồ sơ an toàn nơi làm việc. Điều này sẽ đảm bảo toàn bộ thủ tục giấy tờ được nộp đúng thời hạn."
  },
  {
   "number": 75,
   "part": 4,
   "answer": "A",
   "group": "74-76",
   "textEn": "75. What will be Alka Raj’s job responsibility? (A) Ensuring compliance with safety practices (B) Creating product development schedules (C) Ordering new equipment (D) Hiring and training staff",
   "transcript": "Team, I'd like you to meet Alka Raj. She is the new safety and compliance officer for our pharmaceutical lab. Alka will primarily review our safety practices and ensure they meet or exceed all current pharmaceutical industry standards. I'm thrilled that she's here just in time to finish inspections before the due date to file our workplace safety paperwork. This will ensure that all the paperwork is submitted on time.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n75. Trách nhiệm công việc của Alka Raj sẽ là gì?\n(A) Đảm bảo tuân thủ các quy định an toàn\n(B) Lập lịch phát triển sản phẩm\n(C) Đặt mua thiết bị mới\n(D) Tuyển dụng và đào tạo nhân viên\n\nDịch bài nói:\nCả đội, tôi muốn giới thiệu với mọi người Alka Raj. Cô ấy là nhân viên an toàn và tuân thủ mới của phòng thí nghiệm dược phẩm của chúng ta. Alka sẽ chủ yếu xem xét các quy trình an toàn và đảm bảo rằng chúng đáp ứng hoặc vượt qua tất cả các tiêu chuẩn hiện hành trong ngành dược phẩm. Tôi rất vui vì cô ấy có mặt kịp thời để hoàn tất các cuộc kiểm tra trước hạn nộp hồ sơ an toàn nơi làm việc. Điều này sẽ đảm bảo toàn bộ thủ tục giấy tờ được nộp đúng thời hạn."
  },
  {
   "number": 76,
   "part": 4,
   "answer": "B",
   "group": "74-76",
   "textEn": "76. Why does the speaker say he is thrilled? (A) An employee will be promoted. (B) Some deadlines will be met. (C) Product sales have increased. (D) A trip abroad has been approved.",
   "transcript": "Team, I'd like you to meet Alka Raj. She is the new safety and compliance officer for our pharmaceutical lab. Alka will primarily review our safety practices and ensure they meet or exceed all current pharmaceutical industry standards. I'm thrilled that she's here just in time to finish inspections before the due date to file our workplace safety paperwork. This will ensure that all the paperwork is submitted on time.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n76. Tại sao người nói nói rằng ông ấy rất phấn khởi?\n(A) Một nhân viên sẽ được thăng chức.\n(B) Một số hạn chót sẽ được đáp ứng.\n(C) Doanh số sản phẩm đã tăng.\n(D) Một chuyến công tác nước ngoài đã được phê duyệt.\n\nDịch bài nói:\nCả đội, tôi muốn giới thiệu với mọi người Alka Raj. Cô ấy là nhân viên an toàn và tuân thủ mới của phòng thí nghiệm dược phẩm của chúng ta. Alka sẽ chủ yếu xem xét các quy trình an toàn và đảm bảo rằng chúng đáp ứng hoặc vượt qua tất cả các tiêu chuẩn hiện hành trong ngành dược phẩm. Tôi rất vui vì cô ấy có mặt kịp thời để hoàn tất các cuộc kiểm tra trước hạn nộp hồ sơ an toàn nơi làm việc. Điều này sẽ đảm bảo toàn bộ thủ tục giấy tờ được nộp đúng thời hạn."
  },
  {
   "number": 77,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "77. What problem does the speaker mention? (A) Some clients are unhappy. (B) Some offices are too cold. (C) Some construction is too noisy. (D) Some colleagues are sick.",
   "transcript": "Now, let's move on to another important topic. I know it's too cold in your offices right now to work comfortably. Even though we like to keep the conference room open for client meetings, you can work there until Marion adjusts the temperature. I've e-mailed her twice, but she hasn't responded yet. It's frustrating that we can't control the temperature in our own offices. That's Marion's job. In the meantime, let me know if any other building issues have come up, and I'll report them to her.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n77. Vấn đề nào người nói đề cập đến?\n(A) Một số khách hàng không hài lòng.\n(B) Một số văn phòng quá lạnh.\n(C) Việc xây dựng gây quá nhiều tiếng ồn.\n(D) Một số đồng nghiệp bị ốm.\n\nDịch bài nói:\nBây giờ, hãy chuyển sang một chủ đề quan trọng khác. Tôi biết rằng hiện tại văn phòng của mọi người quá lạnh để làm việc thoải mái. Mặc dù chúng ta muốn giữ phòng họp mở để tiếp khách, mọi người vẫn có thể làm việc ở đó cho đến khi Marion điều chỉnh lại nhiệt độ. Tôi đã gửi email cho cô ấy hai lần nhưng vẫn chưa nhận được phản hồi. Thật khó chịu khi chúng ta không thể tự điều chỉnh nhiệt độ trong chính văn phòng của mình. Đó là công việc của Marion. Trong lúc chờ đợi, nếu có vấn đề nào khác trong tòa nhà phát sinh, hãy báo cho tôi và tôi sẽ chuyển lại cho cô ấy."
  },
  {
   "number": 78,
   "part": 4,
   "answer": "B",
   "group": "77-79",
   "textEn": "78. What are the listeners temporarily allowed to do? (A) Use their personal e-mail accounts (B) Work from a conference room (C) Go home early (D) Close some windows",
   "transcript": "Now, let's move on to another important topic. I know it's too cold in your offices right now to work comfortably. Even though we like to keep the conference room open for client meetings, you can work there until Marion adjusts the temperature. I've e-mailed her twice, but she hasn't responded yet. It's frustrating that we can't control the temperature in our own offices. That's Marion's job. In the meantime, let me know if any other building issues have come up, and I'll report them to her.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n78. Người nghe tạm thời được phép làm gì?\n(A) Sử dụng tài khoản e-mail cá nhân\n(B) Làm việc từ phòng họp\n(C) Về nhà sớm\n(D) Đóng một số cửa sổ\n\nDịch bài nói:\nBây giờ, hãy chuyển sang một chủ đề quan trọng khác. Tôi biết rằng hiện tại văn phòng của mọi người quá lạnh để làm việc thoải mái. Mặc dù chúng ta muốn giữ phòng họp mở để tiếp khách, mọi người vẫn có thể làm việc ở đó cho đến khi Marion điều chỉnh lại nhiệt độ. Tôi đã gửi email cho cô ấy hai lần nhưng vẫn chưa nhận được phản hồi. Thật khó chịu khi chúng ta không thể tự điều chỉnh nhiệt độ trong chính văn phòng của mình. Đó là công việc của Marion. Trong lúc chờ đợi, nếu có vấn đề nào khác trong tòa nhà phát sinh, hãy báo cho tôi và tôi sẽ chuyển lại cho cô ấy."
  },
  {
   "number": 79,
   "part": 4,
   "answer": "D",
   "group": "77-79",
   "textEn": "79. Who most likely is Marion? (A) A cafeteria employee (B) A parking garage attendant (C) A product supplier (D) A building manager",
   "transcript": "Now, let's move on to another important topic. I know it's too cold in your offices right now to work comfortably. Even though we like to keep the conference room open for client meetings, you can work there until Marion adjusts the temperature. I've e-mailed her twice, but she hasn't responded yet. It's frustrating that we can't control the temperature in our own offices. That's Marion's job. In the meantime, let me know if any other building issues have come up, and I'll report them to her.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n79. Marion có khả năng là ai?\n(A) Nhân viên căn tin\n(B) Nhân viên giữ xe\n(C) Nhà cung cấp sản phẩm\n(D) Quản lý tòa nhà\n\nDịch bài nói:\nBây giờ, hãy chuyển sang một chủ đề quan trọng khác. Tôi biết rằng hiện tại văn phòng của mọi người quá lạnh để làm việc thoải mái. Mặc dù chúng ta muốn giữ phòng họp mở để tiếp khách, mọi người vẫn có thể làm việc ở đó cho đến khi Marion điều chỉnh lại nhiệt độ. Tôi đã gửi email cho cô ấy hai lần nhưng vẫn chưa nhận được phản hồi. Thật khó chịu khi chúng ta không thể tự điều chỉnh nhiệt độ trong chính văn phòng của mình. Đó là công việc của Marion. Trong lúc chờ đợi, nếu có vấn đề nào khác trong tòa nhà phát sinh, hãy báo cho tôi và tôi sẽ chuyển lại cho cô ấy."
  },
  {
   "number": 80,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "80. Where is the meeting taking place? (A) At a pharmacy (B) At a hospital (C) At a car dealership (D) At a jewelry store",
   "transcript": "I just want to have a quick meeting while we have all the nurses from the night shift and day shift here at the same time. First, per our safety policy, jewelry is not allowed when you're working with patients. This is because rings or bracelets could easily puncture gloves. Also, remember that medical staff are not permitted to bring food or drinks into the clinical areas. Of course, the break room is open 24 hours a day. Please talk to me if you have any questions.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n80. Cuộc họp đang diễn ra ở đâu?\n(A) Tại một nhà thuốc\n(B) Tại một bệnh viện\n(C) Tại một đại lý ô tô\n(D) Tại một cửa hàng trang sức\n\nDịch bài nói:\nTôi chỉ muốn họp nhanh một chút khi chúng ta có đầy đủ y tá của ca đêm và ca ngày ở đây cùng lúc. Đầu tiên, theo quy định an toàn, nhân viên không được đeo trang sức khi làm việc với bệnh nhân. Vì nhẫn hoặc vòng tay có thể dễ dàng làm rách găng tay. Ngoài ra, hãy nhớ rằng nhân viên y tế không được mang đồ ăn hoặc thức uống vào khu vực lâm sàng. Tất nhiên, phòng nghỉ luôn mở cửa 24 giờ mỗi ngày. Nếu có câu hỏi nào, hãy trao đổi trực tiếp với tôi."
  },
  {
   "number": 81,
   "part": 4,
   "answer": "B",
   "group": "80-82",
   "textEn": "81. What is the speaker mainly discussing? (A) Business travel (B) Company policies (C) Parking (D) Vacation",
   "transcript": "I just want to have a quick meeting while we have all the nurses from the night shift and day shift here at the same time. First, per our safety policy, jewelry is not allowed when you're working with patients. This is because rings or bracelets could easily puncture gloves. Also, remember that medical staff are not permitted to bring food or drinks into the clinical areas. Of course, the break room is open 24 hours a day. Please talk to me if you have any questions.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n81. Người nói chủ yếu đang thảo luận về điều gì?\n(A) Chuyến công tác\n(B) Các chính sách của công ty\n(C) Việc đậu xe\n(D) Kỳ nghỉ\n\nDịch bài nói:\nTôi chỉ muốn họp nhanh một chút khi chúng ta có đầy đủ y tá của ca đêm và ca ngày ở đây cùng lúc. Đầu tiên, theo quy định an toàn, nhân viên không được đeo trang sức khi làm việc với bệnh nhân. Vì nhẫn hoặc vòng tay có thể dễ dàng làm rách găng tay. Ngoài ra, hãy nhớ rằng nhân viên y tế không được mang đồ ăn hoặc thức uống vào khu vực lâm sàng. Tất nhiên, phòng nghỉ luôn mở cửa 24 giờ mỗi ngày. Nếu có câu hỏi nào, hãy trao đổi trực tiếp với tôi."
  },
  {
   "number": 82,
   "part": 4,
   "answer": "D",
   "group": "80-82",
   "textEn": "82. Why does the speaker say, “the break room is open 24 hours a day”? (A) To disagree with an idea (B) To ask for assistance (C) To explain a schedule (D) To suggest an alternative",
   "transcript": "I just want to have a quick meeting while we have all the nurses from the night shift and day shift here at the same time. First, per our safety policy, jewelry is not allowed when you're working with patients. This is because rings or bracelets could easily puncture gloves. Also, remember that medical staff are not permitted to bring food or drinks into the clinical areas. Of course, the break room is open 24 hours a day. Please talk to me if you have any questions.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n82. Tại sao người nói nói rằng “phòng nghỉ mở cửa 24/24”?\n(A) Để phản đối một ý kiến\n(B) Để yêu cầu giúp đỡ\n(C) Để giải thích một lịch trình\n(D) Để đề xuất một lựa chọn khác\n\nDịch bài nói:\nTôi chỉ muốn họp nhanh một chút khi chúng ta có đầy đủ y tá của ca đêm và ca ngày ở đây cùng lúc. Đầu tiên, theo quy định an toàn, nhân viên không được đeo trang sức khi làm việc với bệnh nhân. Vì nhẫn hoặc vòng tay có thể dễ dàng làm rách găng tay. Ngoài ra, hãy nhớ rằng nhân viên y tế không được mang đồ ăn hoặc thức uống vào khu vực lâm sàng. Tất nhiên, phòng nghỉ luôn mở cửa 24 giờ mỗi ngày. Nếu có câu hỏi nào, hãy trao đổi trực tiếp với tôi."
  },
  {
   "number": 83,
   "part": 4,
   "answer": "A",
   "group": "83-85",
   "textEn": "83. Who is the advertisement intended for? (A) Store owners (B) Tour guides (C) Interior designers (D) Paper manufacturers",
   "transcript": "Ready to get your customers' attention? Postela makes high-quality posters that are easy to order and easy to display in your store. Whether you need just one or 2,000 posters, Postela has you covered. As always, Postela offers great discounts on bulk orders. Order 100 or more posters for as low as 80 cents per poster. And what's really unique, Postela has officially licensed images from your favorite movies, video games, and sports teams that can be easily added to your posters. In your order, just make sure to indicate the images and message you'd like included. The crew at Postela will take care of the rest!",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n83. Quảng cáo này dành cho ai?\n(A) Chủ cửa hàng\n(B) Hướng dẫn viên du lịch\n(C) Nhà thiết kế nội thất\n(D) Nhà sản xuất giấy\n\nDịch bài nói:\nSẵn sàng thu hút sự chú ý của khách hàng chưa? Postela cung cấp các áp phích chất lượng cao, dễ đặt hàng và dễ trưng bày trong cửa hàng của bạn. Dù bạn cần chỉ một tấm hay đến 2.000 tấm, Postela đều đáp ứng được. Như mọi khi, Postela có mức giảm giá tuyệt vời cho các đơn đặt số lượng lớn. Đặt từ 100 áp phích trở lên, bạn sẽ chỉ phải trả thấp nhất 80 cent cho mỗi tấm. Và điều thực sự đặc biệt là Postela sở hữu hình ảnh được cấp phép chính thức từ các bộ phim, trò chơi điện tử và đội thể thao yêu thích của bạn — những hình ảnh này có thể dễ dàng thêm vào áp phích của bạn. Khi đặt hàng, chỉ cần chọn hình ảnh và thông điệp bạn muốn đưa vào. Đội ngũ Postela sẽ lo hết phần còn lại!"
  },
  {
   "number": 84,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "84. How can the listeners receive a discount? (A) By entering a code (B) By writing a review (C) By using a special link (D) By ordering large quantities",
   "transcript": "Ready to get your customers' attention? Postela makes high-quality posters that are easy to order and easy to display in your store. Whether you need just one or 2,000 posters, Postela has you covered. As always, Postela offers great discounts on bulk orders. Order 100 or more posters for as low as 80 cents per poster. And what's really unique, Postela has officially licensed images from your favorite movies, video games, and sports teams that can be easily added to your posters. In your order, just make sure to indicate the images and message you'd like included. The crew at Postela will take care of the rest!",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n84. Người nghe có thể nhận được giảm giá bằng cách nào?\n(A) Nhập một mã\n(B) Viết đánh giá\n(C) Sử dụng một liên kết đặc biệt\n(D) Đặt hàng số lượng lớn\n\nDịch bài nói:\nSẵn sàng thu hút sự chú ý của khách hàng chưa? Postela cung cấp các áp phích chất lượng cao, dễ đặt hàng và dễ trưng bày trong cửa hàng của bạn. Dù bạn cần chỉ một tấm hay đến 2.000 tấm, Postela đều đáp ứng được. Như mọi khi, Postela có mức giảm giá tuyệt vời cho các đơn đặt số lượng lớn. Đặt từ 100 áp phích trở lên, bạn sẽ chỉ phải trả thấp nhất 80 cent cho mỗi tấm. Và điều thực sự đặc biệt là Postela sở hữu hình ảnh được cấp phép chính thức từ các bộ phim, trò chơi điện tử và đội thể thao yêu thích của bạn — những hình ảnh này có thể dễ dàng thêm vào áp phích của bạn. Khi đặt hàng, chỉ cần chọn hình ảnh và thông điệp bạn muốn đưa vào. Đội ngũ Postela sẽ lo hết phần còn lại!"
  },
  {
   "number": 85,
   "part": 4,
   "answer": "D",
   "group": "83-85",
   "textEn": "85. What does the speaker emphasize about a product? (A) Shipping costs are included. (B) It is available in many sizes. (C) There are several framing options. (D) Licensed images are available.",
   "transcript": "Ready to get your customers' attention? Postela makes high-quality posters that are easy to order and easy to display in your store. Whether you need just one or 2,000 posters, Postela has you covered. As always, Postela offers great discounts on bulk orders. Order 100 or more posters for as low as 80 cents per poster. And what's really unique, Postela has officially licensed images from your favorite movies, video games, and sports teams that can be easily added to your posters. In your order, just make sure to indicate the images and message you'd like included. The crew at Postela will take care of the rest!",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n85. Người nói nhấn mạnh điều gì về một sản phẩm?\n(A) Đã bao gồm phí vận chuyển\n(B) Có sẵn với nhiều kích cỡ\n(C) Có nhiều lựa chọn khung\n(D) Có hình ảnh bản quyền\n\nDịch bài nói:\nSẵn sàng thu hút sự chú ý của khách hàng chưa? Postela cung cấp các áp phích chất lượng cao, dễ đặt hàng và dễ trưng bày trong cửa hàng của bạn. Dù bạn cần chỉ một tấm hay đến 2.000 tấm, Postela đều đáp ứng được. Như mọi khi, Postela có mức giảm giá tuyệt vời cho các đơn đặt số lượng lớn. Đặt từ 100 áp phích trở lên, bạn sẽ chỉ phải trả thấp nhất 80 cent cho mỗi tấm. Và điều thực sự đặc biệt là Postela sở hữu hình ảnh được cấp phép chính thức từ các bộ phim, trò chơi điện tử và đội thể thao yêu thích của bạn — những hình ảnh này có thể dễ dàng thêm vào áp phích của bạn. Khi đặt hàng, chỉ cần chọn hình ảnh và thông điệp bạn muốn đưa vào. Đội ngũ Postela sẽ lo hết phần còn lại!"
  },
  {
   "number": 86,
   "part": 4,
   "answer": "C",
   "group": "86-88",
   "textEn": "86. What is the announcement mostly about? (A) A renovated station (B) A frequent-traveler program (C) Services on a train (D) Some new train destinations",
   "transcript": "Hello, and welcome to this West Peak Rail service to Archerville. On our train today, you should take advantage of all the services we have to offer—including our café car, which is fully stocked with refreshments, and the observation car, with its floor-to-ceiling windows. Our wireless Internet service has also been upgraded! You can connect to our complimentary service using the access code printed on your ticket. Now, we're operating on schedule right now, but there's significant maintenance work on the track ahead. I'll continue to provide updates throughout our journey.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n86. Thông báo chủ yếu nói về điều gì?\n(A) Một nhà ga được nâng cấp\n(B) Chương trình dành cho khách đi tàu thường xuyên\n(C) Các dịch vụ trên tàu\n(D) Một số điểm đến mới của tàu\n\nDịch bài nói:\nXin chào và chào mừng quý khách lên chuyến tàu West Peak Rail đến thành phố Archerville. Trên chuyến tàu hôm nay, quý khách có thể tận dụng tất cả các dịch vụ mà chúng tôi cung cấp — bao gồm toa cà phê, nơi phục vụ đầy đủ đồ ăn thức uống, và toa quan sát với cửa sổ kính toàn cảnh từ sàn đến trần. Dịch vụ Wi-Fi của chúng tôi cũng vừa được nâng cấp! Quý khách có thể kết nối miễn phí bằng mã truy cập in trên vé. Hiện chúng tôi đang chạy đúng giờ, nhưng phía trước có một đoạn đường đang bảo trì lớn. Tôi sẽ tiếp tục cập nhật thông tin trong suốt hành trình."
  },
  {
   "number": 87,
   "part": 4,
   "answer": "A",
   "group": "86-88",
   "textEn": "87. According to the speaker, what can be found on a ticket? (A) An access code (B) A discount coupon (C) An assistance telephone number (D) A layout of the train",
   "transcript": "Hello, and welcome to this West Peak Rail service to Archerville. On our train today, you should take advantage of all the services we have to offer—including our café car, which is fully stocked with refreshments, and the observation car, with its floor-to-ceiling windows. Our wireless Internet service has also been upgraded! You can connect to our complimentary service using the access code printed on your ticket. Now, we're operating on schedule right now, but there's significant maintenance work on the track ahead. I'll continue to provide updates throughout our journey.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n87. Theo người nói, vé có thể bao gồm thông tin gì?\n(A) Một mã truy cập\n(B) Một phiếu giảm giá\n(C) Một số điện thoại hỗ trợ\n(D) Sơ đồ của toa tàu\n\nDịch bài nói:\nXin chào và chào mừng quý khách lên chuyến tàu West Peak Rail đến thành phố Archerville. Trên chuyến tàu hôm nay, quý khách có thể tận dụng tất cả các dịch vụ mà chúng tôi cung cấp — bao gồm toa cà phê, nơi phục vụ đầy đủ đồ ăn thức uống, và toa quan sát với cửa sổ kính toàn cảnh từ sàn đến trần. Dịch vụ Wi-Fi của chúng tôi cũng vừa được nâng cấp! Quý khách có thể kết nối miễn phí bằng mã truy cập in trên vé. Hiện chúng tôi đang chạy đúng giờ, nhưng phía trước có một đoạn đường đang bảo trì lớn. Tôi sẽ tiếp tục cập nhật thông tin trong suốt hành trình."
  },
  {
   "number": 88,
   "part": 4,
   "answer": "B",
   "group": "86-88",
   "textEn": "88. What does the speaker mean when he says, “there’s significant maintenance work on the track ahead”? (A) The listeners cannot visit a specific station. (B) The listeners should anticipate some delays. (C) The listeners may need to plan alternate routes. (D) The listeners will receive a ticket refund.",
   "transcript": "Hello, and welcome to this West Peak Rail service to Archerville. On our train today, you should take advantage of all the services we have to offer—including our café car, which is fully stocked with refreshments, and the observation car, with its floor-to-ceiling windows. Our wireless Internet service has also been upgraded! You can connect to our complimentary service using the access code printed on your ticket. Now, we're operating on schedule right now, but there's significant maintenance work on the track ahead. I'll continue to provide updates throughout our journey.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n88. Người nói có ý gì khi nói rằng “phía trước có bảo trì lớn trên đường ray”?\n(A) Người nghe không thể đến một nhà ga nhất định.\n(B) Người nghe nên chuẩn bị cho việc chậm trễ.\n(C) Người nghe có thể cần lên kế hoạch tuyến đường thay thế.\n(D) Người nghe sẽ nhận được hoàn tiền vé.\n\nDịch bài nói:\nXin chào và chào mừng quý khách lên chuyến tàu West Peak Rail đến thành phố Archerville. Trên chuyến tàu hôm nay, quý khách có thể tận dụng tất cả các dịch vụ mà chúng tôi cung cấp — bao gồm toa cà phê, nơi phục vụ đầy đủ đồ ăn thức uống, và toa quan sát với cửa sổ kính toàn cảnh từ sàn đến trần. Dịch vụ Wi-Fi của chúng tôi cũng vừa được nâng cấp! Quý khách có thể kết nối miễn phí bằng mã truy cập in trên vé. Hiện chúng tôi đang chạy đúng giờ, nhưng phía trước có một đoạn đường đang bảo trì lớn. Tôi sẽ tiếp tục cập nhật thông tin trong suốt hành trình."
  },
  {
   "number": 89,
   "part": 4,
   "answer": "B",
   "group": "89-91",
   "textEn": "89. Who is the speaker? (A) A plumber (B) A city employee (C) A bank supervisor (D) A swimming pool cleaner",
   "transcript": "Hi. This is Marina Aljohani. I'm the superintendent of the Trenton municipal water department. I'm calling because we need to replace several maintenance hole covers on our city streets. These covers are essential for preventing too much debris from entering the water system. I noticed on your Web site that your company casts many different types of metal products, including maintenance hole covers. I'd like to find out how much it would cost to make 30 new covers. Please call our office at 555-0102. While I'll be away most of next week, Lihong Hao, the assistant superintendent, will be in the office. She can take your call. Thank you.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n89. Người nói là ai?\n(A) Một thợ sửa ống nước\n(B) Một nhân viên thành phố\n(C) Một giám sát ngân hàng\n(D) Người dọn dẹp hồ bơi\n\nDịch bài nói:\nXin chào. Tôi là Marina Aljohani, giám sát trưởng của Sở Nước thành phố Trenton. Tôi gọi vì chúng tôi cần thay thế một số nắp hố kỹ thuật trên các tuyến đường trong thành phố. Những nắp này rất quan trọng để ngăn không cho quá nhiều rác và vật cản lọt vào hệ thống nước. Tôi thấy trên trang web của quý công ty rằng các bạn đúc nhiều loại sản phẩm kim loại khác nhau, bao gồm cả nắp hố kỹ thuật. Tôi muốn biết chi phí để sản xuất 30 nắp mới là bao nhiêu. Vui lòng gọi lại cho văn phòng chúng tôi theo số 555-0102. Trong khi tôi sẽ đi vắng phần lớn tuần tới, cô Lihong Hao, trợ lý giám sát, sẽ có mặt tại văn phòng. Cô ấy có thể nhận cuộc gọi của bạn. Xin cảm ơn."
  },
  {
   "number": 90,
   "part": 4,
   "answer": "A",
   "group": "89-91",
   "textEn": "90. Why is the woman calling? (A) To request a price quote (B) To cancel an order (C) To report a malfunction (D) To respond to an inquiry",
   "transcript": "Hi. This is Marina Aljohani. I'm the superintendent of the Trenton municipal water department. I'm calling because we need to replace several maintenance hole covers on our city streets. These covers are essential for preventing too much debris from entering the water system. I noticed on your Web site that your company casts many different types of metal products, including maintenance hole covers. I'd like to find out how much it would cost to make 30 new covers. Please call our office at 555-0102. While I'll be away most of next week, Lihong Hao, the assistant superintendent, will be in the office. She can take your call. Thank you.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n90. Tại sao người phụ nữ gọi điện?\n(A) Để yêu cầu báo giá\n(B) Để hủy một đơn hàng\n(C) Để báo sự cố\n(D) Để phản hồi một yêu cầu thông tin\n\nDịch bài nói:\nXin chào. Tôi là Marina Aljohani, giám sát trưởng của Sở Nước thành phố Trenton. Tôi gọi vì chúng tôi cần thay thế một số nắp hố kỹ thuật trên các tuyến đường trong thành phố. Những nắp này rất quan trọng để ngăn không cho quá nhiều rác và vật cản lọt vào hệ thống nước. Tôi thấy trên trang web của quý công ty rằng các bạn đúc nhiều loại sản phẩm kim loại khác nhau, bao gồm cả nắp hố kỹ thuật. Tôi muốn biết chi phí để sản xuất 30 nắp mới là bao nhiêu. Vui lòng gọi lại cho văn phòng chúng tôi theo số 555-0102. Trong khi tôi sẽ đi vắng phần lớn tuần tới, cô Lihong Hao, trợ lý giám sát, sẽ có mặt tại văn phòng. Cô ấy có thể nhận cuộc gọi của bạn. Xin cảm ơn."
  },
  {
   "number": 91,
   "part": 4,
   "answer": "C",
   "group": "89-91",
   "textEn": "91. What does the speaker say about Lihong Hao? (A) She has a professional certification. (B) She is an environmental expert. (C) She will be available next week. (D) She has recently been promoted.",
   "transcript": "Hi. This is Marina Aljohani. I'm the superintendent of the Trenton municipal water department. I'm calling because we need to replace several maintenance hole covers on our city streets. These covers are essential for preventing too much debris from entering the water system. I noticed on your Web site that your company casts many different types of metal products, including maintenance hole covers. I'd like to find out how much it would cost to make 30 new covers. Please call our office at 555-0102. While I'll be away most of next week, Lihong Hao, the assistant superintendent, will be in the office. She can take your call. Thank you.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n91. Người nói nói gì về Lihong Hao?\n(A) Cô ấy có chứng chỉ nghề nghiệp.\n(B) Cô ấy là chuyên gia môi trường.\n(C) Cô ấy sẽ có mặt vào tuần tới.\n(D) Cô ấy vừa được thăng chức.\n\nDịch bài nói:\nXin chào. Tôi là Marina Aljohani, giám sát trưởng của Sở Nước thành phố Trenton. Tôi gọi vì chúng tôi cần thay thế một số nắp hố kỹ thuật trên các tuyến đường trong thành phố. Những nắp này rất quan trọng để ngăn không cho quá nhiều rác và vật cản lọt vào hệ thống nước. Tôi thấy trên trang web của quý công ty rằng các bạn đúc nhiều loại sản phẩm kim loại khác nhau, bao gồm cả nắp hố kỹ thuật. Tôi muốn biết chi phí để sản xuất 30 nắp mới là bao nhiêu. Vui lòng gọi lại cho văn phòng chúng tôi theo số 555-0102. Trong khi tôi sẽ đi vắng phần lớn tuần tới, cô Lihong Hao, trợ lý giám sát, sẽ có mặt tại văn phòng. Cô ấy có thể nhận cuộc gọi của bạn. Xin cảm ơn."
  },
  {
   "number": 92,
   "part": 4,
   "answer": "A",
   "group": "92-94",
   "textEn": "92. What industry does the speaker most likely work in? (A) Construction (B) Transportation (C) Marketing (D) Shipping",
   "transcript": "Hi, Ms. Alvarez. I'm calling to let you know I e-mailed the price estimate you requested for the replacement of your metal roof. I'm sure you've received lower estimates from other businesses. But you should know, I only use the highest-quality materials in my work. Please check out the reviews on my Web site if you have any doubts. I know you hoped that I'd complete the project before you go away on your vacation, but I'm completely booked for the month of March. I could start at the beginning of April, though. I look forward to hearing back from you soon.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n92. Người nói có khả năng làm việc trong ngành nào?\n(A) Xây dựng\n(B) Giao thông vận tải\n(C) Marketing\n(D) Vận chuyển hàng hóa\n\nDịch bài nói:\nChào cô Alvarez. Tôi gọi để thông báo rằng tôi đã gửi email báo giá mà cô yêu cầu cho việc thay thế mái kim loại của cô. Tôi chắc rằng cô đã nhận được những báo giá thấp hơn từ các bên khác. Nhưng cô nên biết rằng tôi chỉ sử dụng vật liệu chất lượng cao nhất trong công việc của mình. Nếu còn nghi ngờ, xin hãy xem các bài đánh giá trên trang web của tôi. Tôi biết cô hy vọng tôi có thể hoàn thành dự án trước kỳ nghỉ của cô, nhưng toàn bộ tháng Ba tôi đã kín lịch. Tuy nhiên, tôi có thể bắt đầu vào đầu tháng Tư. Tôi mong sớm nhận được phản hồi từ cô."
  },
  {
   "number": 93,
   "part": 4,
   "answer": "B",
   "group": "92-94",
   "textEn": "93. Why does the speaker say, “I only use the highest-quality materials in my work”? (A) To recommend a product (B) To justify a price (C) To refuse an offer (D) To request a promotion",
   "transcript": "Hi, Ms. Alvarez. I'm calling to let you know I e-mailed the price estimate you requested for the replacement of your metal roof. I'm sure you've received lower estimates from other businesses. But you should know, I only use the highest-quality materials in my work. Please check out the reviews on my Web site if you have any doubts. I know you hoped that I'd complete the project before you go away on your vacation, but I'm completely booked for the month of March. I could start at the beginning of April, though. I look forward to hearing back from you soon.",
   "explanationVi": "Đáp án đúng: B\n\nDịch câu hỏi:\n93. Tại sao người nói nói “Tôi chỉ sử dụng vật liệu chất lượng cao nhất trong công việc của mình”?\n(A) Để giới thiệu một sản phẩm\n(B) Để giải thích mức giá\n(C) Để từ chối một đề nghị\n(D) Để yêu cầu được thăng chức\n\nDịch bài nói:\nChào cô Alvarez. Tôi gọi để thông báo rằng tôi đã gửi email báo giá mà cô yêu cầu cho việc thay thế mái kim loại của cô. Tôi chắc rằng cô đã nhận được những báo giá thấp hơn từ các bên khác. Nhưng cô nên biết rằng tôi chỉ sử dụng vật liệu chất lượng cao nhất trong công việc của mình. Nếu còn nghi ngờ, xin hãy xem các bài đánh giá trên trang web của tôi. Tôi biết cô hy vọng tôi có thể hoàn thành dự án trước kỳ nghỉ của cô, nhưng toàn bộ tháng Ba tôi đã kín lịch. Tuy nhiên, tôi có thể bắt đầu vào đầu tháng Tư. Tôi mong sớm nhận được phản hồi từ cô."
  },
  {
   "number": 94,
   "part": 4,
   "answer": "C",
   "group": "92-94",
   "textEn": "94. What does the speaker say could happen in April? (A) An employee could retire. (B) An invoice could arrive. (C) A project could begin. (D) A price could increase.",
   "transcript": "Hi, Ms. Alvarez. I'm calling to let you know I e-mailed the price estimate you requested for the replacement of your metal roof. I'm sure you've received lower estimates from other businesses. But you should know, I only use the highest-quality materials in my work. Please check out the reviews on my Web site if you have any doubts. I know you hoped that I'd complete the project before you go away on your vacation, but I'm completely booked for the month of March. I could start at the beginning of April, though. I look forward to hearing back from you soon.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n94. Người nói nói rằng điều gì có thể xảy ra vào tháng Tư?\n(A) Một nhân viên có thể nghỉ hưu\n(B) Một hóa đơn có thể đến\n(C) Một dự án có thể bắt đầu\n(D) Một mức giá có thể tăng\n\nDịch bài nói:\nChào cô Alvarez. Tôi gọi để thông báo rằng tôi đã gửi email báo giá mà cô yêu cầu cho việc thay thế mái kim loại của cô. Tôi chắc rằng cô đã nhận được những báo giá thấp hơn từ các bên khác. Nhưng cô nên biết rằng tôi chỉ sử dụng vật liệu chất lượng cao nhất trong công việc của mình. Nếu còn nghi ngờ, xin hãy xem các bài đánh giá trên trang web của tôi. Tôi biết cô hy vọng tôi có thể hoàn thành dự án trước kỳ nghỉ của cô, nhưng toàn bộ tháng Ba tôi đã kín lịch. Tuy nhiên, tôi có thể bắt đầu vào đầu tháng Tư. Tôi mong sớm nhận được phản hồi từ cô."
  },
  {
   "number": 95,
   "part": 4,
   "answer": "D",
   "group": "95-97",
   "textEn": "95. What is the talk mainly about? (A) Merging with another company (B) Revising an inspection process (C) Building a new manufacturing plant (D) Selling products internationally",
   "transcript": "The time is right for Snowville Refrigeration to begin marketing our commercial refrigerators internationally. Due to supply chain problems, many companies that manufacture refrigerators are low on inventory. Their customers are on long wait lists to receive their products. However, our most popular model is in stock—we currently have 380 of them available. Considering this, I'm going to assemble a team to come up with a viable marketing plan.",
   "explanationVi": "Đáp án đúng: D\n\nDịch câu hỏi:\n95. Bài nói chủ yếu nói về điều gì?\n(A) Sáp nhập với một công ty khác\n(B) Sửa đổi quy trình kiểm tra\n(C) Xây dựng một nhà máy mới\n(D) Bán sản phẩm ra thị trường quốc tế\n\nDịch bài nói:\nĐây là thời điểm thích hợp để Snowville Refrigeration bắt đầu tiếp thị tủ lạnh thương mại của chúng ta ra thị trường quốc tế. Do các vấn đề trong chuỗi cung ứng, nhiều công ty sản xuất tủ lạnh hiện đang hết hàng. Khách hàng của họ phải chờ đợi rất lâu để nhận được sản phẩm. Tuy nhiên, mẫu bán chạy nhất của chúng ta lại đang có sẵn — hiện chúng ta có 380 chiếc trong kho. Vì vậy, tôi sẽ tập hợp một nhóm để xây dựng một kế hoạch tiếp thị khả thi."
  },
  {
   "number": 96,
   "part": 4,
   "answer": "C",
   "group": "95-97",
   "textEn": "96. Look at the graphic. What is the company’s top-selling refrigerator model? (A) JH-883 (B) JK-966 (C) LH-655 (D) LK-303",
   "transcript": "The time is right for Snowville Refrigeration to begin marketing our commercial refrigerators internationally. Due to supply chain problems, many companies that manufacture refrigerators are low on inventory. Their customers are on long wait lists to receive their products. However, our most popular model is in stock—we currently have 380 of them available. Considering this, I'm going to assemble a team to come up with a viable marketing plan.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n96. Nhìn vào bảng. Mẫu tủ lạnh bán chạy nhất của công ty là mẫu nào?\n(A) JH-883\n(B) JK-966\n(C) LH-655\n(D) LK-303\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nĐây là thời điểm thích hợp để Snowville Refrigeration bắt đầu tiếp thị tủ lạnh thương mại của chúng ta ra thị trường quốc tế. Do các vấn đề trong chuỗi cung ứng, nhiều công ty sản xuất tủ lạnh hiện đang hết hàng. Khách hàng của họ phải chờ đợi rất lâu để nhận được sản phẩm. Tuy nhiên, mẫu bán chạy nhất của chúng ta lại đang có sẵn — hiện chúng ta có 380 chiếc trong kho. Vì vậy, tôi sẽ tập hợp một nhóm để xây dựng một kế hoạch tiếp thị khả thi."
  },
  {
   "number": 97,
   "part": 4,
   "answer": "A",
   "group": "95-97",
   "textEn": "97. What does the speaker say he will do? (A) Put together a team (B) Visit a business partner (C) Sign a contract (D) Prepare a presentation",
   "transcript": "The time is right for Snowville Refrigeration to begin marketing our commercial refrigerators internationally. Due to supply chain problems, many companies that manufacture refrigerators are low on inventory. Their customers are on long wait lists to receive their products. However, our most popular model is in stock—we currently have 380 of them available. Considering this, I'm going to assemble a team to come up with a viable marketing plan.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n97. Người nói nói rằng ông ấy sẽ làm gì?\n(A) Tập hợp một nhóm\n(B) Thăm một đối tác kinh doanh\n(C) Ký một hợp đồng\n(D) Chuẩn bị một bài thuyết trình\n\nDịch bài nói:\nĐây là thời điểm thích hợp để Snowville Refrigeration bắt đầu tiếp thị tủ lạnh thương mại của chúng ta ra thị trường quốc tế. Do các vấn đề trong chuỗi cung ứng, nhiều công ty sản xuất tủ lạnh hiện đang hết hàng. Khách hàng của họ phải chờ đợi rất lâu để nhận được sản phẩm. Tuy nhiên, mẫu bán chạy nhất của chúng ta lại đang có sẵn — hiện chúng ta có 380 chiếc trong kho. Vì vậy, tôi sẽ tập hợp một nhóm để xây dựng một kế hoạch tiếp thị khả thi."
  },
  {
   "number": 98,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "98. What does the speaker encourage the listeners to do? (A) Visit a gift shop (B) Buy an annual membership (C) Use public transportation (D) Make a reservation online",
   "transcript": "Thank you for calling the Wilson Park visitor center. Due to the high volume of visitors in the summer, as well as limited parking, we encourage everyone to take the city bus to the park. Most of the tours are booked for today, but we still have spots open for the mountain bike tour. And remember, there are plenty of things you can do around the park on your own. As you enter the park, brochures are available with maps of all the hiking trails located throughout the park.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n98. Người nói khuyến khích người nghe làm gì?\n(A) Ghé cửa hàng quà tặng\n(B) Mua thẻ thành viên năm\n(C) Sử dụng phương tiện công cộng\n(D) Đặt chỗ trực tuyến\n\nDịch bài nói:\nCảm ơn bạn đã gọi đến trung tâm khách truy cập của Công viên Wilson. Do lượng khách rất đông vào mùa hè và bãi đậu xe có hạn, chúng tôi khuyến khích mọi người đi xe buýt thành phố đến công viên. Hầu hết các tour hôm nay đã được đặt kín, nhưng chúng tôi vẫn còn chỗ cho tour đạp xe leo núi. Và xin nhớ rằng có rất nhiều hoạt động bạn có thể tự làm trong khu vực công viên. Khi vào cổng, bạn có thể lấy các tờ rơi có bản đồ tất cả các tuyến đường đi bộ trong khắp công viên."
  },
  {
   "number": 99,
   "part": 4,
   "answer": "C",
   "group": "98-100",
   "textEn": "99. Look at the graphic. When can the listeners book a tour today? (A) At 10:00 A.M. (B) At 12:30 P.M. (C) At 1:45 P.M. (D) At 3:30 P.M.",
   "transcript": "Thank you for calling the Wilson Park visitor center. Due to the high volume of visitors in the summer, as well as limited parking, we encourage everyone to take the city bus to the park. Most of the tours are booked for today, but we still have spots open for the mountain bike tour. And remember, there are plenty of things you can do around the park on your own. As you enter the park, brochures are available with maps of all the hiking trails located throughout the park.",
   "explanationVi": "Đáp án đúng: C\n\nDịch câu hỏi:\n99. Nhìn vào bảng. Người nghe có thể đặt tour hôm nay vào lúc nào?\n(A) 10:00 sáng\n(B) 12:30 trưa\n(C) 1:45 chiều\n(D) 3:30 chiều\n\n(Câu hỏi có hình — xem hình trong đề.)\n\nDịch bài nói:\nCảm ơn bạn đã gọi đến trung tâm khách truy cập của Công viên Wilson. Do lượng khách rất đông vào mùa hè và bãi đậu xe có hạn, chúng tôi khuyến khích mọi người đi xe buýt thành phố đến công viên. Hầu hết các tour hôm nay đã được đặt kín, nhưng chúng tôi vẫn còn chỗ cho tour đạp xe leo núi. Và xin nhớ rằng có rất nhiều hoạt động bạn có thể tự làm trong khu vực công viên. Khi vào cổng, bạn có thể lấy các tờ rơi có bản đồ tất cả các tuyến đường đi bộ trong khắp công viên."
  },
  {
   "number": 100,
   "part": 4,
   "answer": "A",
   "group": "98-100",
   "textEn": "100. What does the speaker say about some brochures? (A) They contain trail maps. (B) They contain discount coupons. (C) They list a schedule of holidays. (D) They list volunteer opportunities.",
   "transcript": "Thank you for calling the Wilson Park visitor center. Due to the high volume of visitors in the summer, as well as limited parking, we encourage everyone to take the city bus to the park. Most of the tours are booked for today, but we still have spots open for the mountain bike tour. And remember, there are plenty of things you can do around the park on your own. As you enter the park, brochures are available with maps of all the hiking trails located throughout the park.",
   "explanationVi": "Đáp án đúng: A\n\nDịch câu hỏi:\n100. Người nói nói gì về một số tờ giới thiệu?\n(A) Chúng có bản đồ đường mòn.\n(B) Chúng có phiếu giảm giá.\n(C) Chúng liệt kê lịch các ngày nghỉ lễ.\n(D) Chúng liệt kê các cơ hội tình nguyện.\n\nDịch bài nói:\nCảm ơn bạn đã gọi đến trung tâm khách truy cập của Công viên Wilson. Do lượng khách rất đông vào mùa hè và bãi đậu xe có hạn, chúng tôi khuyến khích mọi người đi xe buýt thành phố đến công viên. Hầu hết các tour hôm nay đã được đặt kín, nhưng chúng tôi vẫn còn chỗ cho tour đạp xe leo núi. Và xin nhớ rằng có rất nhiều hoạt động bạn có thể tự làm trong khu vực công viên. Khi vào cổng, bạn có thể lấy các tờ rơi có bản đồ tất cả các tuyến đường đi bộ trong khắp công viên."
  }
 ]
};

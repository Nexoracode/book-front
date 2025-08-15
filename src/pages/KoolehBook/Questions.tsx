import ContentHeader from "../../components/Assets/ContentHeader";
import { HelpQuestion1Solid } from "../../components/Icons/HelpQuestion1Solid";

type Props = {};

const questions = [
  {
    question: "1. مخاطبین این کوله چه کسانی هستند؟",
    answer: `مخاطبین کوله مهدیار تمام کسانی هستند که دغدغه کار فرهنگی دارند از معلم مربی گرفته تا طلبه و استاد دانشگاه پدر و مادر نوجوان جوان دانشجو دانش آموز فعالین مسجد و غیره 
در اینجا با محدودیت مخاطب طرف نیستیم با محدودیت کسایی طرفیم که دغدغه داشته باشند `,
  },
  {
    question: "2.نحوه پشتیبانی به چه شکل است؟",
    answer: ` پشتیبانی ما به دو صورت هست شکل اول ارتباط کامل و صحبت و راهنمایی مسئول هر استان یا شهر 
و طریقه دوم پاسخگویی همیشگی برای تمام افرادی که این کتاب را تهیه می‌کنند و راهنمایی `,
  },
  {
    question: "3. موضوعات آموزش چیاست؟",
    answer: `بخش‌های آموزشی کتاب به ترتیب زیر هست

رشد فردی
اعتقادی
سیاسی
امر به معروف
مهدویت 
احکام شرعی
 اخلاق و ویژگی ها
مهارت ها( میدانی، مجازی  ، تولید محتوا )`,
  },
  {
    question: "4. آموزش های تخصصی و عمومی چه تفاوتی دارند؟",
    answer: `آموزش های عمومی : 
تمامی اون چیزهایی که یک فعال فرهنگی برای هر گونه فعالیتی به اونها نیاز داره و این محتوا رو همه ی فعالین باید ببینن
آموزش های تخصصی: 
این مدل آموزش برای کسب یک مهارت بیشتر هستش مثل تولید و تدوین ویدئو با گوشی همراه، که طبیعتا نیاز نیست همه ی فعالین این مهارت رو فرا بگیرند و اگر مهدیار این مهارت هارو فرانگیرد، لزوما خللی در کارش پیش نمیاد.`,
  },
];
export default function Questions({}: Props) {
  return (
    <div className="space-y-2 mt-8">
      <ContentHeader Icon={HelpQuestion1Solid} title="سوالات متداول" />
      {questions.map((item, index) => (
        <div
          key={index}
          className="collapse collapse-arrow bg-base-100 border border-base-300"
        >
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">{item.question}</div>
          <div className="collapse-content text-sm">{item.answer}</div>
        </div>
      ))}
    </div>
  );
}

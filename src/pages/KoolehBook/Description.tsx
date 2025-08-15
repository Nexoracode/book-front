import Content from "../../components/Assets/Content";
import ContentHeader from "../../components/Assets/ContentHeader";
import KoolehIcon from "../../components/Icons/KoolehIcon";

type Props = {};

export default function Description({}: Props) {
  return (
    <div>
      <ContentHeader Icon={KoolehIcon} title="کوله مهدیار چی هست؟" />
      <Content>
        همه چی از نیاز شروع شد کسانی که میخواستن در هر لباس و در هر شغلی که
        هستند، سهمی داشته باشن اونایی که میخواستن برای مهدیارشدن تلاش کنن کوله
        مهدیار کلی ابزار کلی محتوا کلی ایده ولی اینها به دست ما نیست بلکه اینبار
        شما کارگزار اصلی پروژه مهدوی هستید
      </Content>
      <h4 className="mt-4 font-semibold text-neutral-700">دو محور اصلی دارد</h4>
      <Content>
        1. محتوا : من به عنوان یک فعال فرهنگی نیاز به محتوا دارم که بتونم کارمو
        به خوبی انجام بدم ... که در این مرحله محتوا کامل به دستت داده میشه ...
        این محتوا در همه دسته ها هست : رشد فردی، اعتقادی، احکام شرعی، سیاسی، امر
        به معروف و....
        <br />
        2. ایده و ابزار شما میتونی برای مناسبت های مختلف ایده های مختلفی رو برای
        ارائه دارید ... که این ایده ها رفته رفته کامل میشه و چندین قسمت، در شهر
        های مختلف بوجود میاد
      </Content>
    </div>
  );
}

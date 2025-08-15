type Props = {};

export default function PageTitle({}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="relative pr-5">
        <span className="bg-rose-400 rounded-full top-[50%] -translate-y-[50%] h-9 w-1.5 absolute right-1"></span>
        <p className="text-2xl mb-1 text-neutral-700">درباره کتاب</p>
        <h1 className="text-2xl font-semibold text-neutral-800">کوله مهدیار</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <img
            width={45}
            height={45}
            className="rounded-full"
            src="/profile.jpg"
          />
          <span className="text-neutral-600">مدرس دوره</span>
        </div>
        <div className="w-0.5 border-dashed border-l border-neutral-400 h-20"></div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold text-neutral-800">230</span>
          <span className="text-neutral-600">تعداد صفحات</span>
        </div>
        <div className="w-0.5 border-dashed border-l border-neutral-400 h-20"></div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold text-neutral-800">11 خرداد 1404</span>
          <span className="text-neutral-600">تاریخ نشر</span>
        </div>
      </div>
    </div>
  );
}

export default function EitaaBanner() {
  return (
    <section dir="rtl" className="w-full px-4 my-9">
      <div className="max-w-6xl mx-auto">
        {/* Gradient border wrapper */}
        <div className="relative p-[2px] rounded-3xl bg-gradient-to-tr from-primary/70 via-secondary/70 to-accent/70 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
          {/* Glass card */}
          <div className="relative rounded-3xl bg-base-100/85 backdrop-blur-xl overflow-hidden">
            {/* soft background lights */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-secondary/15 blur-3xl" />
            <div className="pointer-events-none absolute top-10 left-1/3 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-12">
              {/* text + CTA */}
              <div className="order-2 md:order-1 space-y-5 text-center md:text-right">
                <span className="badge badge-primary badge-lg rounded-xl">
                  اطلاع‌رسانی
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                    برای خرید کتاب
                  </span>{" "}
                  به کانال <span className="text-base-content">آرشاپ</span> در
                  ایتا مراجعه کنید
                </h2>

                {/* action */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
                  <a
                    href={"https://eitaa.com/Rshop_ir"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-blue-500/25 btn-lg rounded-2xl gap-3 shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
                  >
                    <img
                      src={"/eitaa.png"}
                      alt="لوگوی ایتا"
                      className="w-6 h-6 object-contain"
                    />
                    ورود به کانال ایتا
                  </a>

                  {/* لینک ثانویه (اختیاری) */}
                  <a
                    href={"https://eitaa.com/Rshop_ir"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost rounded-2xl"
                  >
                    @rshop_ir
                  </a>
                </div>

                {/* نقاط قوت کوتاه برای خلوت نبودن */}
                <ul className="grid grid-cols-1 gap-3 text-sm text-base-content/70">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/70" />{" "}
                    موجودی و تخفیف‌های به‌روز
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary/70" />{" "}
                    پشتیبانی سریع آرشاپ
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent/70" /> ارسال
                    به سراسر کشور
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-info/70" />{" "}
                    کتاب‌های چاپی و دیجیتال
                  </li>
                </ul>
              </div>

              {/* book image side */}
              <div className="order-1 md:order-2">
                <div className="relative">
                  {/* glow behind card */}
                  <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 via-secondary/25 to-accent/25 blur-2xl opacity-70" />
                  <div className="card bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-base-200/60 overflow-hidden">
                    <figure className="relative py-6">
                      <img
                        src={"rshop_logo_h.png"}
                        alt="کتاب"
                        className="w-[200px] object-contain"
                      />
                      {/* bottom gradient for readability if there is text over image later */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-100/80 to-transparent" />
                    </figure>
                    <div className="card-body py-4 px-5">
                      <p className="font-bold text-center text-base-content/70">
                        جدیدترین عناوین کتاب در کانال آرشاپ منتشر می‌شود.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom ribbon */}
            <div className="px-6 md:px-12 pb-6">
              <div className="rounded-2xl bg-base-200/70 backdrop-blur-md p-3 md:p-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-center text-base-content/70">
                  برای اطلاع از موجودی و تخفیف‌های زمان‌دار، کانال را دنبال
                  کنید.
                </span>
                <a
                  href={"https://web.eitaa.com/#@rshop_ir"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn  btn-soft btn-sm rounded-xl"
                >
                  مشاهده آخرین پست‌ها
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

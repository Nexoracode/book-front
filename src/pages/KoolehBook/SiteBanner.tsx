import ContainerLayout from "../../components/Assets/ContainerLayout";
import Paper from "../../components/Assets/Paper";

type Props = {};

export default function SiteBanner({}: Props) {
  return (
    <Paper>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(36,0,0,1) 0%, rgba(2,2,74,1) 35%, rgba(16,73,26,1) 65%, rgba(0,60,73,1) 100%)",
        }}
        className="w-full rounded-md  flex items-end h-[30rem] bg-red-400"
      >
        <ContainerLayout className="flex items-end">
          <div className="flex flex-1 w-[50%] flex-col items-center pb-4">
            <img
              className="rounded-md mb-24 invert-100"
              src="/Kooleh-Black.png"
              width={200}
              height={400}
            />

            {/* <button className="flex text-white bg-primary-100 p-3 rounded-md w-md text-center justify-center cursor-pointer">
              <SupportIcon width={24} height={24} />
              پیش خرید کتاب کوله مهدیار
            </button> */}
         {/*    <p className="text-white/80 text-sm mt-2 font-semibold ">
              این کتاب در 11 خرداد منتشر می شود
            </p> */}
          </div>
          <div className="flex-1 w-[50%]">
            <img src="/seyed.png" width={600} />
          </div>
        </ContainerLayout>
      </div>
    </Paper>
  );
}

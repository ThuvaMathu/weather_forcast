import GoogleAutoComplete, { IAutocompletValue } from "./google_auto_complete";
import loaderRing from "../../assets/svg/loader.svg";

type Props = {
  onChange?: (data: IAutocompletValue | undefined) => void;
  isLoading?: boolean;
};

export default function Search({ onChange, isLoading }: Props) {
  return (
    <>
      <div className=" w-full flex ">
        {/* <Search /> */}
        <div className="  max-w-sm w-full flex gap-1">
          <GoogleAutoComplete
            onChange={(data) => {
              onChange && onChange(data);
            }}
          />{" "}
          <div className=" w-8 flex justify-center items-center ">
            {isLoading && <img src={loaderRing} alt="" className=" w-8 h-8 " />}
          </div>
        </div>
      </div>
    </>
  );
}

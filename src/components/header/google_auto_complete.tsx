import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { StylesConfig } from "react-select";
import { GrSearch } from "react-icons/gr";
export interface IAutocompletValue {
  postcode: string;
  suburb: string;
  latlng: string;
}

interface IAutoCompleteAddress {
  onChange?: (data: IAutocompletValue | undefined) => void;
  value?: string;
}
export default function GoogleAutoComplete({ onChange }: IAutoCompleteAddress) {
  const handlePlaceSelect = async (place: any) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place?.value.place_id}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        // `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place?.value.place_id}&key=AIzaSyCLe5tFsRqO5Cgc4TEFJHswcbeiQJgqrpo`
      );
      const data = await response.json();
      const addressComponents = data.results[0]?.address_components;
      const latlon = data?.results[0].geometry.location;
      let postcode: string = "";
      let suburb: string = "";
      // console.log(data?.results[0].geometry.location);
      addressComponents?.forEach((component: any) => {
        if (component.types.includes("postal_code")) {
          postcode = component.long_name;
        }
        if (component.types.includes("locality")) {
          suburb = component.long_name;
        }
      });
      onChange &&
        onChange({
          postcode: postcode,
          suburb: suburb,
          latlng: `${latlon?.lat},${latlon?.lng}`,
        });
    } catch (err) {
      console.error(err);
    }
  };
  const colourStyles: StylesConfig<any> = {
    control: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: "white",
      borderRadius: "12px",
      paddingLeft: "48px",
      paddingRight: "1px",
      // paddingTop: "8px",
      // paddingBottom: "8px",
      height: "54px",
      fontSize: "16px",
      "&:hover": { borderColor: "#588157" },
      "&:focus": { borderColor: "#588157" },
      borderColor: "#588157",
      fontWeight: 500,
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      fontSize: "16px",
      color: "#667085",
    }),
    dropdownIndicator: (base: any) => ({
      display: "none",
      color: "gray",
      paddingLeft: 1,
      paddingRight: 1,
      marginLeft: 1,
      marginRight: 1,
      borderLeft: "none",
    }),
  };
  return (
    <>
      <div className=" relative w-full  ">
        <GooglePlacesAutocomplete
          // apiKey={process.env?.REACT_APP_GOOGLE_API_KEY!}
          apiKey={"AIzaSyCLe5tFsRqO5Cgc4TEFJHswcbeiQJgqrpo"}
          apiOptions={{ language: "en", region: "au" }}
          autocompletionRequest={{
            componentRestrictions: { country: "au" },
          }}
          debounce={500}
          minLengthAutocomplete={2}
          onLoadFailed={(error) =>
            console.error("Could not inject Google script", error)
          }
          selectProps={{
            className: " ",
            onChange: handlePlaceSelect,
            styles: colourStyles,
            placeholder: "Search city",
            //value: value
          }}
        />
        <div className=" absolute z-0 top-[16px] left-5 ">
          <GrSearch size={20} className=" text-primary-700" />
        </div>
      </div>
    </>
  );
}

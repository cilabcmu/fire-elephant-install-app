import { ChangeEvent, FC, useEffect, useState } from "react";
import { useStatusContext } from "../App";
import { FormType, useForm } from "../hooks/useForm";
import { STATUS, StatusContextType, UpdateLocationCheckSDType } from "../public/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { UPDATE_LOCATION } from "../api/mutationGQL";

interface ButtonStatusProps {
  status: string;
  onCheckDevice?: () => void;
  onClear?: () => void;
}

interface ClearButtonProps {
  onClick?: () => void;
}

interface InputIDProps {
  deviceID: string | undefined;
  onChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  status: string;
  isDisable: boolean
}

interface InputCoordinateProps {
  labelId: string;
  labelText: string;
  coordinate: string | undefined;
  onChangeCoordinate: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisable: boolean;
}
interface ProcessTextProps {
  text: string;
}

enum ProcessTextType {
  gps = "กำลังตรวจสอบ GPS",
  requiredField = "* กรุณากรอกให้ครบ",
  locationOutArea = "* ตำแหน่งอุปกรณ์เกินขอบเขต",
}

const coordinateToKilometers = (position_a: [number, number], position_b: [number, number]): number => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.

  const lon1 = (position_a[0] * Math.PI) / 180;
  const lon2 = (position_b[0] * Math.PI) / 180;
  const lat1 = (position_a[1] * Math.PI) / 180;
  const lat2 = (position_b[1] * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 3956;

  // calculate the result
  return c * r;
};

const centerCoordinate: [number, number] = [18.787237, 98.986587]; // Wat Chedi Luang Chiang Mai.
const maxCoordinate: [number, number] = [18.872823, 98.781724];

const maxDistance: number = coordinateToKilometers(centerCoordinate, maxCoordinate);

const ButtonStatus: FC<ButtonStatusProps> = ({ status, onCheckDevice, onClear }) => {
  const buttonStyle = "w-44 text-white py-2 px-4 rounded-lg";
  switch (status) {
    case STATUS.waitID:
      return (
        <button className={`${buttonStyle} bg-blue-500 hover:bg-blue-600`} type="button" onClick={onCheckDevice}>
          ดำเนินการ
        </button>
      );
    case STATUS.loading:
      return (
        <button className={`${buttonStyle} bg-blue-500 disabled:bg-blue-300  animate-bounce`} type="button" disabled={true}>
          กำลังดำเนินการ
        </button>
      );
    case STATUS.found:
      return (
        <button className={`${buttonStyle} bg-green-500 hover:bg-green-600`} type="button" onClick={onClear}>
          ล้างข้อมูล
        </button>
      );
    case STATUS.notFound:
      return (
        <button className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`} type="button" onClick={onCheckDevice}>
          ดำเนินการอีกครั้ง
        </button>
      );
    default:
      return (
        <button className={`${buttonStyle} bg-red-500 hover:bg-red-600`} type="button" onClick={onCheckDevice}>
          ดำเนินการอีกครั้ง
        </button>
      );
  }
};

const InputID: FC<InputIDProps> = ({ deviceID, onChangeForm, status, isDisable }) => {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 inline-block" htmlFor="id">
        device id
      </label>

      <input
        className={`appearance-none h-12 block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white disabled:bg-gray-200`}
        id="id"
        type="number"
        name="id"
        placeholder="กรอกไอดีอุปกรณ์"
        value={deviceID}
        onChange={onChangeForm}
        disabled={status == STATUS.found || isDisable}
      />
    </>
  );
};

const InputCoordinate: FC<InputCoordinateProps> = ({ labelId, labelText, coordinate, onChangeCoordinate, isDisable }) => {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={labelId}>
        {labelText}
      </label>
      <input
        className="disabled:bg-gray-200 appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white"
        id={labelId}
        name={labelId}
        type="number"
        placeholder="ละจิจูด"
        value={coordinate}
        onChange={onChangeCoordinate}
        disabled={isDisable}
      />
    </>
  );
};

const ProcessText: FC<ProcessTextProps> = ({ text }) => {
  const isGpS: boolean = text === ProcessTextType.gps;
  const color: string = isGpS ? "text-neutral-400" : "text-red-500";
  return (
    <div className={`flex flex-row text-sm ${color}`}>
      {isGpS && (
        <div className="pt-2 pr-1">
          <FontAwesomeIcon className={"animate-spin"} icon={faSpinner} />
        </div>
      )}
      <div className="pt-2">{text}</div>
    </div>
  );
};

const ClearButton: FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <div className="flex flex-row text-neutral-400 text-md" onClick={onClick}>
      <p className="pt-2 underline underline-offset-4">ล้างข้อมูล</p>
    </div>
  );
};

const initForm: FormType = {
  id: "",
  lat: "",
  long: "",
};

const Form: FC = () => {
  const [updateLocation, { data, loading, error }] = useMutation(UPDATE_LOCATION);

  const { status, setStatus, isAutoGPS, systemMode } = useStatusContext() as StatusContextType;

  const [form, onChangeForm, setForm, onClearForm] = useForm(initForm);

  const [processText, setProcessText] = useState(ProcessTextType.gps);

  const [isProcessing, setIsProcessing] = useState(isAutoGPS);

  const isEmpty: boolean = Object.values(form).some((x) => !x);

  const disableLatLong: boolean = (isProcessing && processText === ProcessTextType.gps) || status == STATUS.found;

  const isRecordMode: boolean = systemMode === 'record'

  if (isAutoGPS && !form?.lat && !form?.long && isProcessing) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const lat: string = latitude.toFixed(6).toString();
        const long: string = longitude.toFixed(6).toString();
        if (latitude && longitude) {
          setForm({ ...form, lat: lat, long: long });
        }
        setIsProcessing(false);
      },
      (err) => {
        console.log('fetch gps err:',err.message);
        setIsProcessing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  const onClear: () => void = () => {
    setStatus(STATUS.waitID);
    onClearForm();
    setProcessText(ProcessTextType.gps);
    isAutoGPS ? setIsProcessing(true) : setIsProcessing(false);
  };

  const onRecord: () => Promise<void> = async () => {
    if (!isEmpty) {
      const distanceFromCenter: number = coordinateToKilometers([parseFloat(form?.lat), parseFloat(form?.long)], centerCoordinate);

      if (distanceFromCenter >= maxDistance) {
        setProcessText(ProcessTextType.locationOutArea);
        setIsProcessing(true);
        return;
      }

      await updateLocation({
        variables: {
          lat: parseFloat(form?.lat),
          lng: parseFloat(form?.long),
          dn_v: parseInt(form?.id),
        },
      });
      return;
    }

    setProcessText(ProcessTextType.requiredField);
    setIsProcessing(true);
  };

  const onCheck: () => Promise<void> = async () => {
    if (form.id) {
      
      await updateLocation({
        variables: {
          lat: -1,
          lng: -1,
          dn_v: parseInt(form?.id),
        }
      });

      return;
    }
    setProcessText(ProcessTextType.requiredField);
    setIsProcessing(true);
  };

  if (error) console.log("error:", error);

  useEffect(() => {
    if (loading) {
      setStatus(STATUS.loading);
    }
    if (data) {
      const { latlngMessage, latlngStatus, status, statusMessage }: UpdateLocationCheckSDType = data.updateLocationCheckSD;
      if (status && latlngStatus) {
        setStatus(STATUS.found);
      } else if (!latlngStatus) {
        setStatus(STATUS.noDevice); // TODO: change a new status
      } else if (!status) {
        setStatus(STATUS.notFound);
      } else {
        console.log("latlngMessage: ", latlngMessage);
        console.log("statusMessage: ", statusMessage);
        setStatus(STATUS.notFound);
      }
      setIsProcessing(false);
    }
  }, [loading]);

  return (
    <div className="flex flex-col justify-center items-center w-9/12 ">
      <form className="w-full mb-3">
        <div className="w-full px-3">
          <InputID deviceID={form.id} onChangeForm={onChangeForm} status={status} isDisable={isRecordMode ? isProcessing : false}/>
        </div>
        {isRecordMode ? (
          <div className="flex flex-wrap ">
            <div className="w-2/4 px-3 ">
              <InputCoordinate
                labelId="lat"
                labelText="latitude"
                coordinate={form.lat}
                onChangeCoordinate={onChangeForm}
                isDisable={disableLatLong}
              />
            </div>
            <div className="w-2/4  md:w-1/2 px-3">
              <InputCoordinate
                labelId="long"
                labelText="longitude"
                coordinate={form.long}
                onChangeCoordinate={onChangeForm}
                isDisable={disableLatLong}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
      {<ButtonStatus status={status} onCheckDevice={systemMode === "record" ? onRecord : onCheck} onClear={onClear} />}
      {isProcessing && <ProcessText text={processText} />}
      <ClearButton onClick={onClear} />
    </div>
  );
};

export default Form;
